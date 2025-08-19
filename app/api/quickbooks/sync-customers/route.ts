
import { NextResponse } from "next/server";
import { getQuickBooksService } from "@/lib/quickbooks";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/quickbooks/sync-customers
 * Imports all customers from QuickBooks, upserts them, and deletes any local customers that no longer exist in QuickBooks.
 */


// --- Types ---
export type QBCustomer = {
  Id?: string;
  DisplayName: string;
  PrimaryEmailAddr?: { Address: string };
  PrimaryPhone?: { FreeFormNumber: string };
  BillAddr?: { Line1?: string };
  ShipAddr?: { Line1?: string };
};

// --- Helpers ---
async function upsertQBCustomer(qb: QBCustomer): Promise<void> {
  if (!qb.PrimaryEmailAddr?.Address || !qb.Id) return;
  await prisma.customer.upsert({
    where: { email: qb.PrimaryEmailAddr.Address },
    update: {
      name: qb.DisplayName || "QuickBooks Customer",
      phone: qb.PrimaryPhone?.FreeFormNumber || null,
      billingAddress: qb.BillAddr?.Line1 || null,
      shippingAddress: qb.ShipAddr?.Line1 || null,
      quickbooksId: qb.Id,
      syncStatus: "SYNCED",
      syncError: null,
    },
    create: {
      name: qb.DisplayName || "QuickBooks Customer",
      email: qb.PrimaryEmailAddr.Address,
      phone: qb.PrimaryPhone?.FreeFormNumber || null,
      billingAddress: qb.BillAddr?.Line1 || null,
      shippingAddress: qb.ShipAddr?.Line1 || null,
      quickbooksId: qb.Id,
      syncStatus: "SYNCED",
      syncError: null,
    },
  });
}

async function deleteLocalCustomersNotInQB(qbIds: Set<string>): Promise<string[]> {
  const localCustomers = await prisma.customer.findMany();
  const toDelete = localCustomers.filter((c) => c.quickbooksId && !qbIds.has(c.quickbooksId));
  const deleted: string[] = [];
  for (const c of toDelete) {
    await prisma.customer.delete({ where: { id: c.id } });
    deleted.push(c.id);
  }
  return deleted;
}


// --- Service Initialization Helper ---
async function initializeQuickBooksService(): Promise<{ service: any } | { error: NextResponse }> {
  try {
    const qbService = await getQuickBooksService();
    console.log('[SYNC] QuickBooks service obtained:', !!qbService);
    
    if (!qbService) {
      console.log('[SYNC] QuickBooks service is null - not configured');
      return { error: NextResponse.json({ error: "QuickBooks not configured." }, { status: 503 }) };
    }
    
    return { service: qbService };
  } catch (err) {
    console.error('[SYNC] Error getting QuickBooks service:', err);
    return { error: NextResponse.json({ error: "Failed to get QuickBooks service", details: err instanceof Error ? err.message : String(err) }, { status: 500 }) };
  }
}

// --- Customer Fetching Helper ---
async function fetchQuickBooksCustomers(qbService: any): Promise<{ customers: QBCustomer[] } | { error: NextResponse }> {
  try {
    console.log('[SYNC] Calling getAllCustomers...');
    const qbCustomers = await qbService.getAllCustomers();
    console.log('[SYNC] Got customers from QuickBooks:', qbCustomers.length);
    return { customers: qbCustomers };
  } catch (err) {
    console.error("[SYNC] QuickBooks getAllCustomers error:", err);
    return { error: NextResponse.json({ error: "QuickBooks API error", details: err instanceof Error ? err.message : String(err) }, { status: 500 }) };
  }
}

// --- Customer Import Helper ---
async function importCustomers(qbCustomers: QBCustomer[]): Promise<{ imported: number } | { error: NextResponse }> {
  let imported = 0;
  for (const qb of qbCustomers) {
    try {
      await upsertQBCustomer(qb);
      imported++;
    } catch (err) {
      console.error("Prisma upsert error for customer", qb.PrimaryEmailAddr?.Address, err);
      return { error: NextResponse.json({ error: "Database upsert error", details: err instanceof Error ? err.message : String(err), customer: qb.PrimaryEmailAddr?.Address }, { status: 500 }) };
    }
  }
  return { imported };
}

// --- Customer Cleanup Helper ---
async function cleanupLocalCustomers(qbIds: Set<string>): Promise<{ deleted: string[] } | { error: NextResponse }> {
  try {
    const deleted = await deleteLocalCustomersNotInQB(qbIds);
    return { deleted };
  } catch (err) {
    console.error("Prisma delete error for customer", err);
    return { error: NextResponse.json({ error: "Database delete error", details: err instanceof Error ? err.message : String(err) }, { status: 500 }) };
  }
}


// --- Main Handler ---
export async function POST() {
  console.log('[SYNC] Starting QuickBooks sync-customers...');
  
  // Initialize QuickBooks service
  const serviceResult = await initializeQuickBooksService();
  if ('error' in serviceResult) return serviceResult.error;
  const qbService = serviceResult.service;

  // Fetch customers from QuickBooks
  const customersResult = await fetchQuickBooksCustomers(qbService);
  if ('error' in customersResult) return customersResult.error;
  const qbCustomers = customersResult.customers;

  const qbIds = new Set<string>(qbCustomers.map((c: QBCustomer) => c.Id).filter((id: string | undefined): id is string => Boolean(id)));

  // Import customers to database
  const importResult = await importCustomers(qbCustomers);
  if ('error' in importResult) return importResult.error;
  const imported = importResult.imported;

  // Clean up local customers not in QuickBooks
  const cleanupResult = await cleanupLocalCustomers(qbIds);
  if ('error' in cleanupResult) return cleanupResult.error;
  const deleted = cleanupResult.deleted;

  return NextResponse.json({ imported, deleted });
}
