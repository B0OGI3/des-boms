/**
 * Routing Steps API - For workstation management
 * GET /api/routing-steps - Get routing steps with filtering
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
