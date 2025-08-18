/**
 * Routing Steps API - For workstation management
 * GET /api/routing-steps - Get routing steps with filtering
 * POST /api/routing-steps - Create new routing steps for a batch
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '../../../generated/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workstationId = searchParams.get('workstationId');
    const status = searchParams.get('status');
    const batchId = searchParams.get('batchId');
    const operatorName = searchParams.get('operatorName');

    // Build where clause
    const where: Prisma.RoutingStepWhereInput = {};
    
    if (workstationId) {
      where.workstationId = workstationId;
    }
    
    if (status) {
      const statusArray = status.split(',');
      where.status = { in: statusArray as any };
    }
    
    if (batchId) {
      where.batchId = batchId;
    }

    // If filtering by operator, look for confirmations
    if (operatorName) {
      where.confirmations = {
        some: {
          operatorName: {
            contains: operatorName,
            mode: 'insensitive'
          }
        }
      };
    }

    const routingSteps = await prisma.routingStep.findMany({
      where,
      include: {
        workstation: true,
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
        confirmations: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: [
        { batch: { priority: 'desc' } }, // Rush orders first
        { stepNumber: 'asc' }
      ]
    });

    // Transform the data to include latest confirmation info
    const transformedSteps = routingSteps.map(step => {
      const latestConfirmation = step.confirmations[0];
      
      return {
        id: step.id,
        stepNumber: step.stepNumber,
        description: step.description,
        estimatedTime: step.estimatedTime,
        notes: step.notes,
        status: step.status,
        startTime: latestConfirmation?.startTime || null,
        endTime: latestConfirmation?.endTime || null,
        operatorName: latestConfirmation?.operatorName || null,
        batch: {
          id: step.batch.id,
          batchId: step.batch.batchId,
          priority: step.batch.priority,
          status: step.batch.status,
          lineItem: {
            partNumber: step.batch.lineItem.part.partNumber,
            partName: step.batch.lineItem.part.partName,
            purchaseOrder: {
              customer: {
                name: step.batch.lineItem.purchaseOrder.customer.name
              }
            }
          }
        },
        workstation: {
          id: step.workstation.id,
          name: step.workstation.name,
          description: step.workstation.description
        }
      };
    });

    return NextResponse.json({
      success: true,
      data: transformedSteps,
      count: transformedSteps.length
    });

  } catch (error) {
    console.error('Error fetching routing steps:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch routing steps',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/routing-steps - Create routing steps for a batch
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { batchId, routingSteps } = body;

    // Validate required fields
    if (!batchId || !routingSteps || !Array.isArray(routingSteps)) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: batchId, routingSteps' },
        { status: 400 }
      );
    }

    // Check if batch exists
    const batch = await prisma.batch.findUnique({
      where: { id: batchId }
    });

    if (!batch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Create routing steps in a transaction
    const createdSteps = await prisma.$transaction(async (tx) => {
      const steps = [];
      
      for (let i = 0; i < routingSteps.length; i++) {
        const stepData = routingSteps[i];
        
        const step = await tx.routingStep.create({
          data: {
            batchId,
            stepNumber: i + 1,
            workstationId: stepData.workstationId,
            description: stepData.description,
            required: stepData.required ?? true,
            estimatedTime: stepData.estimatedTime,
            notes: stepData.notes,
            status: 'PENDING'
          },
          include: {
            workstation: true,
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
            }
          }
        });
        
        steps.push(step);
      }
      
      return steps;
    });

    return NextResponse.json({
      success: true,
      data: createdSteps,
      message: `Created ${createdSteps.length} routing steps`
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating routing steps:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create routing steps',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
