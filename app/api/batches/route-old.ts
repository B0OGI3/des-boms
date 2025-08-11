import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '../../../generated/prisma';

interface RoutingStepInput {
  workstationId: string;
  description: string;
  required?: boolean;
  estimatedTime?: number;
  notes?: string;
}

// GET /api/batches - Get all batches with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const workstationId = searchParams.get('workstationId');
    const priority = searchParams.get('priority');
    const overdue = searchParams.get('overdue') === 'true';
    const search = searchParams.get('search');
    
    const where: Prisma.BatchWhereInput = {};
    if (status) where.status = status as Prisma.BatchWhereInput['status'];
    if (priority) where.priority = priority as Prisma.BatchWhereInput['priority'];
    
    // Handle overdue filtering
    if (overdue) {
      where.AND = [
        {
          estimatedCompletion: {
            lt: new Date()
          }
        },
        {
          status: {
            in: ['QUEUED', 'IN_PROGRESS']
          }
        }
      ];
    }
    
    // Handle search across multiple fields
    if (search?.trim()) {
      const searchTerm = search.trim();
      where.OR = [
        { batchId: { contains: searchTerm, mode: 'insensitive' } },
        { notes: { contains: searchTerm, mode: 'insensitive' } },
        { lineItem: { part: { partNumber: { contains: searchTerm, mode: 'insensitive' } } } },
        { lineItem: { part: { partName: { contains: searchTerm, mode: 'insensitive' } } } },
        { lineItem: { purchaseOrder: { customer: { name: { contains: searchTerm, mode: 'insensitive' } } } } },
        { lineItem: { purchaseOrder: { systemOrderId: { contains: searchTerm, mode: 'insensitive' } } } }
      ];
    }

    // If filtering by workstation, we need to join through routing steps
    let batches;
    if (workstationId) {
      batches = await prisma.batch.findMany({
        where: {
          ...where,
          routingSteps: {
            some: {
              workstationId,
              status: 'PENDING',
            },
          },
        },
        include: {
          lineItem: {
            include: {
              purchaseOrder: {
                include: {
                  customer: true,
                },
              },
            },
          },
          routingSteps: {
            include: {
              workstation: true,
              confirmations: true,
            },
            orderBy: {
              stepNumber: 'asc',
            },
          },
          qcRecords: true,
        },
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'asc' },
        ],
      });
    } else {
      batches = await prisma.batch.findMany({
        where,
        include: {
          lineItem: {
            include: {
              purchaseOrder: {
                include: {
                  customer: true,
                },
              },
            },
          },
          routingSteps: {
            include: {
              workstation: true,
              confirmations: true,
            },
            orderBy: {
              stepNumber: 'asc',
            },
          },
          qcRecords: true,
        },
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'asc' },
        ],
      });
    }

    return NextResponse.json({
      success: true,
      data: batches,
      count: batches.length,
    });
  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch batches',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/batches - Create a new batch
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      lineItemId,
      quantity,
      startDate,
      estimatedCompletion,
      priority = 'STANDARD',
      notes,
      routingSteps = [],
    } = body;

    // Validate required fields
    if (!lineItemId || !quantity) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: lineItemId, quantity',
        },
        { status: 400 }
      );
    }

    // Generate batch ID in format: DES-YYYY-MMDD-###
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const datePrefix = `DES-${year}-${month}${day}`;
    
    // Get the next sequence number for today
    const existingBatches = await prisma.batch.findMany({
      where: {
        batchId: {
          startsWith: datePrefix,
        },
      },
    });
    
    const sequenceNumber = String(existingBatches.length + 1).padStart(3, '0');
    const batchId = `${datePrefix}-${sequenceNumber}`;

    // Create the batch with routing steps
    const batch = await prisma.batch.create({
      data: {
        batchId,
        lineItemId,
        quantity,
        startDate: startDate ? new Date(startDate) : null,
        estimatedCompletion: estimatedCompletion ? new Date(estimatedCompletion) : null,
        priority,
        notes,
        routingSteps: {
          create: routingSteps.map((step: RoutingStepInput, index: number) => ({
            stepNumber: index + 1,
            workstationId: step.workstationId,
            description: step.description,
            required: step.required ?? true,
            estimatedTime: step.estimatedTime,
            notes: step.notes,
          })),
        },
      },
      include: {
        lineItem: {
          include: {
            purchaseOrder: {
              include: {
                customer: true,
              },
            },
          },
        },
        routingSteps: {
          include: {
            workstation: true,
          },
          orderBy: {
            stepNumber: 'asc',
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: batch,
      message: 'Batch created successfully',
    });
  } catch (error) {
    console.error('Error creating batch:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create batch',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
