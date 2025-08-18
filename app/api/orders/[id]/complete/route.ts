import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/orders/[id]/complete - Mark order as complete
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      completedBy,
      completionNotes,
    } = body;

    const orderId = params.id;

    // Validate required fields
    if (!completedBy) {
      return NextResponse.json(
        {
          success: false,
          error: 'completedBy is required',
        },
        { status: 400 }
      );
    }

    // First, verify the order exists and get its current state
    const existingOrder = await prisma.purchaseOrder.findUnique({
      where: { id: orderId },
      include: {
        lineItems: {
          include: {
            batches: {
              include: {
                routingSteps: {
                  include: {
                    confirmations: true,
                  },
                },
                qcRecords: true,
              },
            },
          },
        },
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found',
        },
        { status: 404 }
      );
    }

    // Check if order is already completed or shipped
    if (existingOrder.orderStatus === 'COMPLETED' || existingOrder.orderStatus === 'SHIPPED') {
      return NextResponse.json(
        {
          success: false,
          error: `Order is already ${existingOrder.orderStatus.toLowerCase()}`,
        },
        { status: 400 }
      );
    }

    // Validate that all batches are completed and passed QC
    const allBatches = existingOrder.lineItems.flatMap(item => item.batches);
    
    if (allBatches.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot complete order: No batches have been created yet',
        },
        { status: 400 }
      );
    }

    const incompleteBatches = allBatches.filter(batch => batch.status !== 'COMPLETED');
    if (incompleteBatches.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot complete order: ${incompleteBatches.length} batch(es) are not yet completed`,
        },
        { status: 400 }
      );
    }

    // Check QC status - ensure all batches have passed QC
    const batchesWithFailedQC = allBatches.filter(batch => {
      const sortedQCRecords = batch.qcRecords
        .toSorted((a, b) => new Date(b.inspectionDate).getTime() - new Date(a.inspectionDate).getTime());
      const latestQC = sortedQCRecords[0];
      return latestQC && latestQC.result === 'FAIL';
    });

    if (batchesWithFailedQC.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot complete order: Some batches have failed QC inspection',
        },
        { status: 400 }
      );
    }

    // Update the order to completed status
    const updatedOrder = await prisma.purchaseOrder.update({
      where: { id: orderId },
      data: {
        orderStatus: 'COMPLETED',
        completedAt: new Date(),
        completedBy,
        completionNotes,
      },
      include: {
        customer: true,
        lineItems: {
          include: {
            part: true,
            batches: {
              include: {
                routingSteps: {
                  include: {
                    workstation: true,
                    confirmations: true,
                  },
                },
                qcRecords: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: 'Order marked as completed successfully',
    });

  } catch (error) {
    console.error('Error completing order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to complete order',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/orders/[id]/complete - Reopen a completed order (undo completion)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { reopenedBy, reopenNotes } = body;

    const orderId = params.id;

    // Validate required fields
    if (!reopenedBy) {
      return NextResponse.json(
        {
          success: false,
          error: 'reopenedBy is required',
        },
        { status: 400 }
      );
    }

    // Verify the order exists and is completed
    const existingOrder = await prisma.purchaseOrder.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found',
        },
        { status: 404 }
      );
    }

    if (existingOrder.orderStatus !== 'COMPLETED' && existingOrder.orderStatus !== 'SHIPPED') {
      return NextResponse.json(
        {
          success: false,
          error: 'Can only reopen completed or shipped orders',
        },
        { status: 400 }
      );
    }

    if (existingOrder.orderStatus === 'SHIPPED') {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot reopen shipped orders',
        },
        { status: 400 }
      );
    }

    // Reopen the order
    const updatedOrder = await prisma.purchaseOrder.update({
      where: { id: orderId },
      data: {
        orderStatus: 'ACTIVE',
        completedAt: null,
        completedBy: null,
        completionNotes: reopenNotes ? `Reopened by ${reopenedBy}: ${reopenNotes}` : `Reopened by ${reopenedBy}`,
      },
      include: {
        customer: true,
        lineItems: {
          include: {
            part: true,
            batches: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: 'Order reopened successfully',
    });

  } catch (error) {
    console.error('Error reopening order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to reopen order',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
