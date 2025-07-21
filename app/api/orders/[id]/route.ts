import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface LineItemInput {
  id?: string; // For existing line items
  partNumber: string;
  partName: string;
  drawingNumber?: string;
  revisionLevel?: string;
  quantity: number;
  unitPrice?: number;
  dueDate?: string;
  notes?: string;
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
    console.log('PUT /api/orders/[id] - Starting request processing');
    const { id } = await params;
    console.log('Order ID from params:', id);
    
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const { 
      poNumber, 
      dueDate, 
      priority, 
      notes,
      lineItems 
    } = body;

    // Check if order exists
    console.log('Checking if order exists...');
    const existingOrder = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: { lineItems: true },
    });

    console.log('Existing order found:', existingOrder ? 'Yes' : 'No');
    if (!existingOrder) {
      console.log('Order not found with ID:', id);
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    console.log('Starting transaction to update order...');
    // Start a transaction to update order and line items
    const updatedOrder = await prisma.$transaction(async (prisma) => {
      console.log('Updating purchase order...');
      // Update the purchase order
      const order = await prisma.purchaseOrder.update({
        where: { id },
        data: {
          poNumber,
          dueDate: dueDate ? new Date(dueDate) : undefined,
          priority,
          notes,
        },
      });

      // Handle line items updates
      if (lineItems && Array.isArray(lineItems)) {
        // Get existing line item IDs
        const existingLineItemIds = existingOrder.lineItems.map(item => item.id);
        const submittedLineItemIds = lineItems
          .filter((item: LineItemInput) => item.id)
          .map((item: LineItemInput) => item.id);

        // Delete removed line items and their cascaded dependencies
        const toDelete = existingLineItemIds.filter(id => !submittedLineItemIds.includes(id));
        if (toDelete.length > 0) {
          // Get all batches associated with line items to be deleted
          const batchesToDelete = await prisma.batch.findMany({
            where: { lineItemId: { in: toDelete } },
            select: { id: true }
          });
          const batchIds = batchesToDelete.map(batch => batch.id);

          if (batchIds.length > 0) {
            // Get all routing steps for these batches
            const routingStepsToDelete = await prisma.routingStep.findMany({
              where: { batchId: { in: batchIds } },
              select: { id: true }
            });
            const stepIds = routingStepsToDelete.map(step => step.id);

            // Delete in order: StepConfirmations → RoutingSteps → QCRecords → Batches → LineItems
            if (stepIds.length > 0) {
              await prisma.stepConfirmation.deleteMany({
                where: { stepId: { in: stepIds } }
              });
            }

            await prisma.routingStep.deleteMany({
              where: { batchId: { in: batchIds } }
            });

            await prisma.qCRecord.deleteMany({
              where: { batchId: { in: batchIds } }
            });

            await prisma.batch.deleteMany({
              where: { id: { in: batchIds } }
            });
          }
          
          // Finally delete the line items themselves
          await prisma.orderLineItem.deleteMany({
            where: { 
              id: { in: toDelete },
              orderId: id 
            },
          });
        }

        // Update or create line items
        for (const item of lineItems) {
          const itemData = {
            partNumber: item.partNumber,
            partName: item.partName,
            drawingNumber: item.drawingNumber,
            revisionLevel: item.revisionLevel,
            quantity: item.quantity,
            dueDate: item.dueDate ? new Date(item.dueDate) : null,
            notes: item.notes,
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
                orderId: id,
              },
            });
          }
        }
      }

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
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
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

// DELETE /api/orders/[id] - Delete a purchase order
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if order exists
    const existingOrder = await prisma.purchaseOrder.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Delete the order (cascading delete will handle line items)
    await prisma.purchaseOrder.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting order:', error);
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
