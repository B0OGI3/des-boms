import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch aggregated stats from the database
    const [inventoryCount, batchCount, customerCount] = await Promise.all([
      prisma.orderLineItem.count(),
      prisma.batch.count(),
      prisma.customer.count(),
    ]);

    // Return the stats as a JSON response
    return NextResponse.json({
      inventory: inventoryCount,
      batches: batchCount,
      customers: customerCount,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
