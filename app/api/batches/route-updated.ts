/**
 * Updated Batch API - Now includes Parts Master data
 * Fixed to work with the new Parts Master system
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

/**
 * GET /api/batches - Get batches with parts data from Parts Master
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const searchTerm = searchParams.get('search');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const workstationId = searchParams.get('workstationId');

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (searchTerm) {
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
              workstationId: workstationId
            }
          }
        },
        include: {
          lineItem: {
            include: {
              part: true, // Include Parts Master data
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
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      });
    } else {
      batches = await prisma.batch.findMany({
        where,
        include: {
          lineItem: {
            include: {
              part: true, // Include Parts Master data
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
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      });
    }

    // Get total count for pagination
    const totalCount = await prisma.batch.count({ where });

    return NextResponse.json({
      success: true,
      data: batches,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
      count: batches.length,
    });

  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch batches',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/batches - Create a new batch
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      lineItemId,
      quantity,
      priority,
      notes
    } = body;

    // Validate required fields
    if (!lineItemId || !quantity) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: lineItemId, quantity' },
        { status: 400 }
      );
    }

    // Check if line item exists and get its part data
    const lineItem = await prisma.orderLineItem.findUnique({
      where: { id: lineItemId },
      include: {
        part: true,
        purchaseOrder: true
      }
    });

    if (!lineItem) {
      return NextResponse.json(
        { success: false, error: 'Line item not found' },
        { status: 404 }
      );
    }

    // Generate batch ID
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
    
    // Get the last batch number for today
    const lastBatch = await prisma.batch.findFirst({
      where: {
        batchId: { startsWith: `DES-${dateStr.slice(2)}-` }
      },
      orderBy: { batchId: 'desc' }
    });

    let batchNumber = 1;
    if (lastBatch) {
      const lastNumber = parseInt(lastBatch.batchId.split('-').pop() || '0');
      batchNumber = lastNumber + 1;
    }

    const batchId = `DES-${dateStr.slice(2)}-${batchNumber.toString().padStart(3, '0')}`;

    // Calculate estimated completion (default to 7 days)
    const estimatedCompletion = new Date();
    estimatedCompletion.setDate(estimatedCompletion.getDate() + 7);

    // Create the batch
    const newBatch = await prisma.batch.create({
      data: {
        batchId,
        lineItemId,
        quantity: parseInt(quantity),
        priority: priority || 'STANDARD',
        notes,
        startDate: new Date(),
        estimatedCompletion,
        status: 'QUEUED'
      },
      include: {
        lineItem: {
          include: {
            part: true, // Include Parts Master data
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
        },
        qcRecords: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: newBatch,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating batch:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create batch',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
