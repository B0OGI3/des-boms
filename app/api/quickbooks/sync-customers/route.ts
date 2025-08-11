
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


// --- Main Handler ---
export async function POST() {
  console.log('[SYNC] Starting QuickBooks sync-customers...');
  
  let qbService;
  try {
    qbService = await getQuickBooksService();
    console.log('[SYNC] QuickBooks service obtained:', !!qbService);
  } catch (err) {
    console.error('[SYNC] Error getting QuickBooks service:', err);
    return NextResponse.json({ error: "Failed to get QuickBooks service", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
  
  if (!qbService) {
    console.log('[SYNC] QuickBooks service is null - not configured');
    return NextResponse.json({ error: "QuickBooks not configured." }, { status: 503 });
  }

  let qbCustomers: QBCustomer[] = [];
  try {
    console.log('[SYNC] Calling getAllCustomers...');
    qbCustomers = await qbService.getAllCustomers();
    console.log('[SYNC] Got customers from QuickBooks:', qbCustomers.length);
  } catch (err) {
    console.error("[SYNC] QuickBooks getAllCustomers error:", err);
    return NextResponse.json({ error: "QuickBooks API error", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }

  const qbIds = new Set<string>(qbCustomers.map((c) => c.Id).filter((id): id is string => Boolean(id)));

  // Upsert customers
  let imported = 0;
  for (const qb of qbCustomers) {
    try {
      await upsertQBCustomer(qb);
      imported++;
    } catch (err) {
      console.error("Prisma upsert error for customer", qb.PrimaryEmailAddr?.Address, err);
      return NextResponse.json({ error: "Database upsert error", details: err instanceof Error ? err.message : String(err), customer: qb.PrimaryEmailAddr?.Address }, { status: 500 });
    }
  }

  // Delete local customers not in QuickBooks
  let deleted: string[] = [];
  try {
    deleted = await deleteLocalCustomersNotInQB(qbIds);
  } catch (err) {
    console.error("Prisma delete error for customer", err);
    return NextResponse.json({ error: "Database delete error", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }

  return NextResponse.json({ imported, deleted });
}
