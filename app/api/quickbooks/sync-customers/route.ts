import { NextResponse } from "next/server";
import { getQuickBooksService } from "@/lib/quickbooks";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/quickbooks/sync-customers
 * Imports all customers from QuickBooks, upserts them, and deletes any local customers that no longer exist in QuickBooks.
 */
export async function POST() {
  try {
    const qbService = await getQuickBooksService();
    if (!qbService) {
      return NextResponse.json({ error: "QuickBooks not configured." }, { status: 503 });
    }

    // Fetch all customers from QuickBooks
    const qbCustomers = await qbService.getAllCustomers();
    const qbIds = new Set(qbCustomers.map((c) => c.Id));

    // Upsert QuickBooks customers into local DB
    let imported = 0;
    for (const qb of qbCustomers) {
      if (!qb.PrimaryEmailAddr?.Address) continue; // Require email for upsert
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
      imported++;
    }

    // Delete local customers not in QuickBooks (with quickbooksId, but not in QB)
    const localCustomers = await prisma.customer.findMany();
    const toDelete = localCustomers.filter((c) => c.quickbooksId && !qbIds.has(c.quickbooksId));
    const deleted: string[] = [];
    for (const c of toDelete) {
      await prisma.customer.delete({ where: { id: c.id } });
      deleted.push(c.id);
    }

    return NextResponse.json({ imported, deleted });
  } catch (error) {
    console.error("Sync customers error:", error);
    return NextResponse.json({ error: "Failed to sync customers" }, { status: 500 });
  }
}
