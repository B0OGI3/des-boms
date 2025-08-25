import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { PrismaTransaction, BatchRecord } from '../../../../types/prisma';

interface LineItemInput {
  id?: string; // For existing line items
  partId?: string; // For backend update logic
  partNumber: string;
  partName: string;
  drawingNumber?: string;
  revisionLevel?: string;
  quantity: number;
  unitPrice?: number;
  dueDate?: string;
  notes?: string;
}

// Helper function to delete line items with cascaded dependencies
async function deleteLineItemsWithDependencies(
  prisma: PrismaTransaction,
  toDelete: string[],
  orderId: string
) {
  if (toDelete.length === 0) return;

  // Get all batches associated with line items to be deleted
  const batchesToDelete = await prisma.batch.findMany({
    where: { lineItemId: { in: toDelete } },
    select: { id: true },
  });
  const batchIds = batchesToDelete.map((batch: BatchRecord) => batch.id);

  if (batchIds.length > 0) {
    // Get all routing steps for these batches
    const routingStepsToDelete = await prisma.routingStep.findMany({
      where: { batchId: { in: batchIds } },
      select: { id: true },
    });
    const stepIds = routingStepsToDelete.map((step: { id: string }) => step.id);

    // Delete in order: StepConfirmations → RoutingSteps → QCRecords → Batches → LineItems
    if (stepIds.length > 0) {
      await prisma.stepConfirmation.deleteMany({
        where: { stepId: { in: stepIds } },
      });
    }

    await prisma.routingStep.deleteMany({
      where: { batchId: { in: batchIds } },
    });

    await prisma.qCRecord.deleteMany({
      where: { batchId: { in: batchIds } },
    });

    await prisma.batch.deleteMany({
      where: { id: { in: batchIds } },
    });
  }

  // Finally delete the line items themselves
  await prisma.orderLineItem.deleteMany({
    where: {
      id: { in: toDelete },
      orderId: orderId,
    },
  });
}

// Helper function to process line items (update existing or create new)
async function processLineItems(
  prisma: PrismaTransaction,
  lineItems: LineItemInput[],
  orderId: string
) {
  for (const item of lineItems) {
    // Only pass fields that exist in the OrderLineItem model
    const itemData = {
      partId: item.partId, // must be provided by frontend or resolved before this call
      quantity: item.quantity,
      unitPrice:
        typeof item.unitPrice === 'string'
          ? parseFloat(item.unitPrice)
          : (item.unitPrice ?? 0),
      dueDate: item.dueDate ? new Date(item.dueDate) : null,
      notes: typeof item.notes === 'undefined' ? null : item.notes,
    };

    if (item.id) {
      // Update existing line item
      await prisma.orderLineItem.update({
        where: { id: item.id },
        data: itemData,
      });
    } else {
      // Create new line item
      await prisma.orderLineItem.create({
        data: {
          ...itemData,
          orderId: orderId,
        },
      });
    }
  }
}

// Helper function to handle line items updates
async function handleLineItemsUpdate(
  prisma: PrismaTransaction,
  lineItems: LineItemInput[] | undefined,
  existingOrder: { lineItems: Array<{ id: string }> },
  orderId: string
) {
  if (!lineItems || !Array.isArray(lineItems)) return;

  // Get existing line item IDs
  const existingLineItemIds = existingOrder.lineItems.map(
    (item: { id: string }) => item.id
  );
  const submittedLineItemIds = lineItems
    .filter((item: LineItemInput) => item.id)
    .map((item: LineItemInput) => item.id);

  // Delete removed line items and their cascaded dependencies
  const toDelete = existingLineItemIds.filter(
    (id: string) => !submittedLineItemIds.includes(id)
  );
  await deleteLineItemsWithDependencies(prisma, toDelete, orderId);

  // Update or create line items
  await processLineItems(prisma, lineItems, orderId);
}

// GET /api/orders/[id] - Get a specific purchase order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: {
        customer: true,
        lineItems: {
          include: {
            part: true, // Include Parts Master data
            fileAttachments: true,
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

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch order',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT /api/orders/[id] - Update a purchase order
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { poNumber, dueDate, priority, notes, lineItems } = body;

    // Map frontend priority values to database enum values (DES-BOMS spec: Rush / Standard / Hold)
    const priorityMapping: Record<string, 'RUSH' | 'STANDARD' | 'HOLD'> = {
      RUSH: 'RUSH',
      STANDARD: 'STANDARD',
      HOLD: 'HOLD',
      // Legacy mappings for backwards compatibility
      LOW: 'HOLD',
      NORMAL: 'STANDARD',
      HIGH: 'RUSH',
    };

    const dbPriority = priorityMapping[priority] || 'STANDARD';

    // Check if order exists
    const existingOrder = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: { lineItems: true },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Start a transaction to update order and line items
    const updatedOrder = await prisma.$transaction(async prisma => {
      // Update the purchase order
      await prisma.purchaseOrder.update({
        where: { id },
        data: {
          poNumber,
          dueDate: dueDate ? new Date(dueDate) : undefined,
          priority: dbPriority,
          notes,
        },
      });

      // Handle line items updates using helper function
      await handleLineItemsUpdate(prisma, lineItems, existingOrder, id);

      // Fetch the updated order with all relations
      return await prisma.purchaseOrder.findUnique({
        where: { id },
        include: {
          customer: true,
          lineItems: {
            include: {
              fileAttachments: true,
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
    });

    console.log('Transaction completed successfully');
    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: 'Order updated successfully',
    });
  } catch (error) {
    console.error('Error updating order:', error);
    console.error(
      'Error stack:',
      error instanceof Error ? error.stack : 'No stack trace'
    );
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update order',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Helper function to check if order has active batches
async function hasActiveBatches(order: {
  lineItems: Array<{ batches: Array<{ status: string }> }>;
}): Promise<boolean> {
  return order.lineItems.some(
    (lineItem: { batches: Array<{ status: string }> }) =>
      lineItem.batches.some(
        (batch: { status: string }) =>
          batch.status === 'IN_PROGRESS' || batch.status === 'QUEUED'
      )
  );
}

// Helper function to collect all IDs for deletion
async function collectDeletionIds(
  tx: PrismaTransaction,
  lineItemIds: string[]
) {
  if (lineItemIds.length === 0) {
    return { batchIds: [], stepIds: [] };
  }

  const batches = await tx.batch.findMany({
    where: { lineItemId: { in: lineItemIds } },
    select: { id: true },
  });
  const batchIds = batches.map((batch: BatchRecord) => batch.id);

  if (batchIds.length === 0) {
    return { batchIds: [], stepIds: [] };
  }

  const routingSteps = await tx.routingStep.findMany({
    where: { batchId: { in: batchIds } },
    select: { id: true },
  });
  const stepIds = routingSteps.map((step: { id: string }) => step.id);

  return { batchIds, stepIds };
}

// Helper function to delete related data in proper order
async function deleteRelatedData(
  tx: PrismaTransaction,
  stepIds: string[],
  batchIds: string[],
  lineItemIds: string[]
) {
  // Delete step confirmations first (if any steps exist)
  if (stepIds.length > 0) {
    await tx.stepConfirmation.deleteMany({
      where: { stepId: { in: stepIds } },
    });

    await tx.routingStep.deleteMany({
      where: { id: { in: stepIds } },
    });
  }

  // Delete QC records (if any batches exist)
  if (batchIds.length > 0) {
    await tx.qCRecord.deleteMany({
      where: { batchId: { in: batchIds } },
    });

    await tx.batch.deleteMany({
      where: { id: { in: batchIds } },
    });
  }

  // Delete file attachments and line items (if any line items exist)
  if (lineItemIds.length > 0) {
    await tx.fileAttachment.deleteMany({
      where: { lineItemId: { in: lineItemIds } },
    });

    await tx.orderLineItem.deleteMany({
      where: { id: { in: lineItemIds } },
    });
  }
}

// DELETE /api/orders/[id] - Delete a purchase order
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if order exists and get related data
    const existingOrder = await prisma.purchaseOrder.findUnique({
      where: { id },
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
            fileAttachments: true,
          },
        },
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if there are any active batches that would prevent deletion
    if (await hasActiveBatches(existingOrder)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot delete order with active production batches',
          details:
            'Please complete or cancel all batches before deleting the order',
        },
        { status: 400 }
      );
    }

    // Delete the order and all related data in a transaction
    await prisma.$transaction(async tx => {
      const lineItemIds = existingOrder.lineItems.map(item => item.id);
      const { batchIds, stepIds } = await collectDeletionIds(tx, lineItemIds);

      // Delete all related data in proper order
      await deleteRelatedData(tx, stepIds, batchIds, lineItemIds);

      // Finally delete the purchase order
      await tx.purchaseOrder.delete({
        where: { id },
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    console.error(
      'Error stack:',
      error instanceof Error ? error.stack : 'No stack trace'
    );
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete order',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
