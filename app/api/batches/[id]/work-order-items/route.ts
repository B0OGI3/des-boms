import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const batchId = params.id;

    const workOrderItems = await prisma.workOrderItem.findMany({
      where: { batchId },
      include: {
        batch: {
          include: {
            lineItem: {
              include: {
                part: true,
                purchaseOrder: {
                  include: {
                    customer: true
                  }
                }
              }
            }
          }
        },
        stepProgress: {
          include: {
            routingStep: {
              include: {
                workstation: true
              }
            }
          },
          orderBy: {
            routingStep: {
              stepNumber: 'asc'
            }
          }
        },
        qualityChecks: {
          orderBy: {
            checkedAt: 'desc'
          }
        },
        materialUsage: {
          include: {
            materialPart: true,
            routingStep: {
              include: {
                workstation: true
              }
            }
          }
        }
      },
      orderBy: {
        itemNumber: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      data: workOrderItems,
      message: `Found ${workOrderItems.length} work order items`
    });

  } catch (error) {
    console.error('[WORK_ORDER_ITEMS_GET]', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch work order items',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const batchId = params.id;
    const body = await request.json();
    const { quantity = 1, generateSerialNumbers = true } = body;

    // Get batch details
    const batch = await prisma.batch.findUnique({
      where: { id: batchId },
      include: {
        lineItem: {
          include: {
            part: true
          }
        },
        routingSteps: {
          orderBy: {
            stepNumber: 'asc'
          }
        }
      }
    });

    if (!batch) {
      return NextResponse.json(
        { success: false, message: 'Batch not found' },
        { status: 404 }
      );
    }

    // Generate work order items for each piece in the batch
    const workOrderItems = [];
    const stepProgressRecords = [];

    for (let i = 1; i <= quantity; i++) {
      const serialNumber = generateSerialNumbers 
        ? `${batch.batchId}-${String(i).padStart(3, '0')}`
        : `${batch.batchId}-ITEM-${i}`;

      // Create work order item
      const workOrderItem = await prisma.workOrderItem.create({
        data: {
          batchId,
          serialNumber,
          itemNumber: i,
          status: 'QUEUED',
          notes: `Individual tracking for ${batch.lineItem.part.partNumber}`
        }
      });

      workOrderItems.push(workOrderItem);

      // Create step progress records for each routing step
      for (const step of batch.routingSteps) {
        const stepProgress = await prisma.workOrderStepProgress.create({
          data: {
            workOrderItemId: workOrderItem.id,
            routingStepId: step.id,
            status: 'PENDING'
          }
        });
        stepProgressRecords.push(stepProgress);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        workOrderItems,
        stepProgressCount: stepProgressRecords.length,
        message: `Created ${workOrderItems.length} work order items with ${stepProgressRecords.length} step progress records`
      }
    });

  } catch (error) {
    console.error('[WORK_ORDER_ITEMS_CREATE]', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create work order items',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const batchId = params.id;
    const body = await request.json();
    const { workOrderItemId, updates } = body;

    const updatedItem = await prisma.workOrderItem.update({
      where: { 
        id: workOrderItemId,
        batchId // Ensure item belongs to this batch
      },
      data: {
        ...updates,
        updatedAt: new Date()
      },
      include: {
        stepProgress: {
          include: {
            routingStep: {
              include: {
                workstation: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedItem,
      message: 'Work order item updated successfully'
    });

  } catch (error) {
    console.error('[WORK_ORDER_ITEM_UPDATE]', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update work order item',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
