import { NextResponse } from "next/server";
import { getQuickBooksService } from "@/lib/quickbooks";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/quickbooks/import-customers
 * Imports all customers from QuickBooks Online into the local DES-BOMS database.
 * Upserts (creates or updates) customers by QuickBooks Id and email.
 */
export async function POST() {
  try {
    const qbService = await getQuickBooksService();
    if (!qbService) {
      return NextResponse.json({ error: "QuickBooks not configured." }, { status: 503 });
    }

    // Fetch all customers from QuickBooks
    const response = await qbService["makeQBRequest"]("GET", "query?query=SELECT * FROM Customer");
    const qbCustomers = response.data.QueryResponse?.Customer || [];

    let imported = 0;
    for (const qb of qbCustomers) {
      if (!qb.PrimaryEmailAddr?.Address) continue; // Require email for upsert
      await prisma.customer.upsert({
        where: { email: qb.PrimaryEmailAddr.Address },
        update: {
          name: qb.DisplayName || qb.CompanyName || qb.FullyQualifiedName || qb.Name || "QuickBooks Customer",
          phone: qb.PrimaryPhone?.FreeFormNumber || null,
          billingAddress: qb.BillAddr?.Line1 || null,
          shippingAddress: qb.ShipAddr?.Line1 || null,
          quickbooksId: qb.Id,
          syncStatus: "SYNCED",
          syncError: null,
        },
        create: {
          name: qb.DisplayName || qb.CompanyName || qb.FullyQualifiedName || qb.Name || "QuickBooks Customer",
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

    return NextResponse.json({ message: `Imported ${imported} customers from QuickBooks.` });
  } catch (error) {
    console.error("Failed to import customers from QuickBooks:", error);
    return NextResponse.json({ error: "Failed to import customers from QuickBooks." }, { status: 500 });
  }
}
