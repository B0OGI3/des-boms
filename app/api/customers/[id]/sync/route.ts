/**
 * QuickBooks Sync API Routes
 * 
 * Handles QuickBooks integration operations like manual sync,
 * sync status checking, and webhook handling.
 */

import { prisma } from "@/lib/prisma";
import { getQuickBooksService } from "@/lib/quickbooks";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/customers/[id]/sync - Get sync status for a customer
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const customer = await prisma.customer.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        quickbooksId: true,
        syncStatus: true,
        lastSyncedAt: true,
        syncError: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      customerId: customer.id,
      customerName: customer.name,
      quickbooksId: customer.quickbooksId,
      syncStatus: customer.syncStatus,
      lastSyncedAt: customer.lastSyncedAt,
      syncError: customer.syncError,
      isQuickBooksConfigured: !!(process.env.QB_CONSUMER_KEY && process.env.QB_CONSUMER_SECRET),
    });
  } catch (error) {
    console.error('Error getting sync status:', error);
    return NextResponse.json(
      { error: "Failed to get sync status" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/customers/[id]/sync - Manually trigger sync for a customer
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if customer exists
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // Get QuickBooks service
    const qbService = await getQuickBooksService();
    if (!qbService) {
      return NextResponse.json(
        { error: "QuickBooks not configured. Please set up QuickBooks integration first." },
        { status: 503 }
      );
    }

    // Trigger sync (this will run in background)
    qbService.syncCustomerToQuickBooks(id).catch(error => {
      console.error(`Manual QuickBooks sync failed for customer ${id}:`, error);
    });

    return NextResponse.json({
      message: "QuickBooks sync initiated",
      customerId: id,
      status: "UPDATING"
    });
  } catch (error) {
    console.error('Error triggering manual sync:', error);
    return NextResponse.json(
      { error: "Failed to trigger sync" },
      { status: 500 }
    );
  }
}
