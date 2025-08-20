import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/orders/[id]/batches - Get all batches for a specific order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;

    // Get the order with all its line items and their batches
    const order = await prisma.purchaseOrder.findUnique({
      where: { id: orderId },
      include: {
        lineItems: {
          include: {
            part: true,
            batches: {
              include: {
                routingSteps: {
                  include: {
                    workstation: true,
                    confirmations: {
                      orderBy: {
                        createdAt: 'desc',
                      },
                    },
                  },
                  orderBy: {
                    stepNumber: 'asc',
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found',
        },
        { status: 404 }
      );
    }

    // Helper functions to transform data
    const transformConfirmation = (confirmation: any) => ({
      id: confirmation.id,
      operatorName: confirmation.operatorName,
      operatorId: confirmation.operatorId,
      startTime: confirmation.startTime?.toISOString(),
      endTime: confirmation.endTime?.toISOString(),
      status: confirmation.status,
      notes: confirmation.notes,
      flagged: confirmation.flagged,
    });

    const transformRoutingStep = (step: any) => ({
      id: step.id,
      stepNumber: step.stepNumber,
      description: step.description,
      status: step.status,
      estimatedTime: step.estimatedTime,
      notes: step.notes,
      workstation: {
        id: step.workstation.id,
        name: step.workstation.name,
        description: step.workstation.description,
      },
      confirmations: step.confirmations.map(transformConfirmation),
    });

    const transformBatch = (batch: any, lineItem: any) => ({
      id: batch.id,
      batchId: batch.batchId,
      quantity: batch.quantity,
      status: batch.status,
      priority: batch.priority,
      startDate: batch.startDate?.toISOString(),
      estimatedCompletion: batch.estimatedCompletion?.toISOString(),
      actualCompletion: batch.actualCompletion?.toISOString(),
      notes: batch.notes,
      createdAt: batch.createdAt.toISOString(),
      updatedAt: batch.updatedAt.toISOString(),
      lineItem: {
        id: lineItem.id,
        quantity: lineItem.quantity,
        part: {
          id: lineItem.part.id,
          partNumber: lineItem.part.partNumber,
          partName: lineItem.part.partName,
          partType: lineItem.part.partType,
          drawingNumber: lineItem.part.drawingNumber,
          revisionLevel: lineItem.part.revisionLevel,
          description: lineItem.part.description,
        },
      },
      routingSteps: batch.routingSteps.map(transformRoutingStep),
    });

    // Flatten all batches from all line items
    const allBatches = order.lineItems.flatMap(lineItem =>
      lineItem.batches.map(batch => transformBatch(batch, lineItem))
    );

    return NextResponse.json({
      success: true,
      data: allBatches,
      count: allBatches.length,
      order: {
        id: order.id,
        systemOrderId: order.systemOrderId,
        poNumber: order.poNumber,
        dueDate: order.dueDate?.toISOString(),
        priority: order.priority,
        orderStatus: order.orderStatus,
      },
    });
  } catch (error) {
    console.error('Error fetching order batches:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch order batches',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
