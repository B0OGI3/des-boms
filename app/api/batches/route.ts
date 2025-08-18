/**
 * Updated Batch API - Now includes Parts Master data
 * Fixed to work with the new Parts Master system
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

/**
 * Smart Routing Determination Logic
 */
async function determineSmartRouting(tx: any, batch: any, routingOptions: any) {
  const { templateId, customSteps, useRecommended = true, considerPriority = true } = routingOptions;
  
  // Priority 1: Custom steps (highest priority)
  if (customSteps && Array.isArray(customSteps)) {
    return await createRoutingSteps(tx, batch.id, customSteps);
  }
  
  // Priority 2: Specific template ID
  if (templateId) {
    const template = await getRoutingTemplate(templateId);
    if (template) {
      return await createRoutingSteps(tx, batch.id, template.steps);
    }
  }
  
  // Priority 3: Smart routing based on business rules
  const smartTemplate = await selectSmartTemplate(batch, considerPriority);
  if (smartTemplate) {
    return await createRoutingSteps(tx, batch.id, smartTemplate.steps);
  }
  
  // Priority 4: Part's recommended template
  if (useRecommended && batch.lineItem.part.recommendedRoutingTemplateId) {
    const template = await getRoutingTemplate(batch.lineItem.part.recommendedRoutingTemplateId);
    if (template) {
      return await createRoutingSteps(tx, batch.id, template.steps);
    }
  }
  
  // Fallback: No routing steps created
  return [];
}

/**
 * Get routing template with steps
 */
async function getRoutingTemplate(templateId: string) {
  // For now, return mock templates. In production, this would query the database.
  const templates: any = {
    'template-standard': {
      name: 'Standard Machining',
      steps: [
        { workstationId: 'ws-mill-1', description: 'Rough milling operations', estimatedTime: 90, stepNumber: 1 },
        { workstationId: 'ws-turn-1', description: 'Turning operations', estimatedTime: 60, stepNumber: 2 },
        { workstationId: 'ws-inspect-1', description: 'Final inspection', estimatedTime: 20, stepNumber: 3 }
      ]
    },
    'template-rush': {
      name: 'Rush Production',
      steps: [
        { workstationId: 'ws-mill-2', description: 'Priority milling', estimatedTime: 60, stepNumber: 1 },
        { workstationId: 'ws-inspect-1', description: 'Quick inspection', estimatedTime: 10, stepNumber: 2 }
      ]
    },
    'template-high-volume': {
      name: 'High Volume Production',
      steps: [
        { workstationId: 'ws-mill-1', description: 'Batch milling setup', estimatedTime: 120, stepNumber: 1 },
        { workstationId: 'ws-mill-1', description: 'Batch milling run', estimatedTime: 180, stepNumber: 2 },
        { workstationId: 'ws-inspect-2', description: 'Batch inspection', estimatedTime: 30, stepNumber: 3 }
      ]
    },
    'template-assembly': {
      name: 'Assembly Only',
      steps: [
        { workstationId: 'ws-assembly-1', description: 'Final assembly', estimatedTime: 45, stepNumber: 1 },
        { workstationId: 'ws-inspect-1', description: 'Assembly inspection', estimatedTime: 15, stepNumber: 2 }
      ]
    }
  };
  
  return templates[templateId] || null;
}

/**
 * Select optimal template based on batch characteristics
 */
async function selectSmartTemplate(batch: any, considerPriority: boolean) {
  // Rush orders get expedited routing
  if (considerPriority && batch.priority === 'RUSH') {
    return await getRoutingTemplate('template-rush');
  }
  
  // High volume batches get optimized routing
  if (batch.quantity > 100) {
    return await getRoutingTemplate('template-high-volume');
  }
  
  // Assembly parts skip machining
  if (batch.lineItem.part.partType === 'FINISHED' && 
      batch.lineItem.part.partName.toLowerCase().includes('assembly')) {
    return await getRoutingTemplate('template-assembly');
  }
  
  // Default to standard template
  return await getRoutingTemplate('template-standard');
}

/**
 * Create routing steps from template steps
 */
async function createRoutingSteps(tx: any, batchId: string, templateSteps: any[]) {
  const routingSteps = [];
  
  for (const stepData of templateSteps) {
    const step = await tx.routingStep.create({
      data: {
        batchId,
        stepNumber: stepData.stepNumber,
        workstationId: stepData.workstationId,
        description: stepData.description,
        required: stepData.required ?? true,
        estimatedTime: stepData.estimatedTime,
        notes: stepData.notes,
        status: 'PENDING'
      },
      include: {
        workstation: true
      }
    });
    
    routingSteps.push(step);
  }
  
  return routingSteps;
}

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
    const orderId = searchParams.get('orderId');

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (orderId) {
      where.lineItem = {
        purchaseOrder: {
          id: orderId
        }
      };
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
 * POST /api/batches - Create a new batch with smart routing
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      lineItemId,
      quantity,
      priority,
      notes,
      // Smart routing options
      routingOptions = {}
    } = body;

    // Validate required fields
    if (!lineItemId || !quantity) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: lineItemId, quantity' },
        { status: 400 }
      );
    }

    // Check if line item exists and get its part data with routing template info
    const lineItem = await prisma.orderLineItem.findUnique({
      where: { id: lineItemId },
      include: {
        part: true, // Include Parts Master data
        purchaseOrder: {
          include: {
            customer: true
          }
        }
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

    // Create batch and routing steps in a transaction
    const result = await prisma.$transaction(async (tx: any) => {
      // Create the batch
      const newBatch = await tx.batch.create({
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
              part: true,
              purchaseOrder: {
                include: {
                  customer: true,
                },
              },
            },
          },
        }
      });

      // Determine routing steps using smart routing logic
      const routingSteps = await determineSmartRouting(tx, newBatch, routingOptions);

      // Determine routing source type
      let routingSource = 'none';
      if (routingSteps.length > 0) {
        if (routingOptions.templateId) {
          routingSource = 'template';
        } else if (routingOptions.customSteps) {
          routingSource = 'custom';
        } else {
          routingSource = 'smart-default';
        }
      }

      return {
        batch: newBatch,
        routingSteps,
        routingSource
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        ...result.batch,
        routingSteps: result.routingSteps
      },
      message: `Batch created with ${result.routingSteps.length} routing steps (${result.routingSource})`,
      routingInfo: {
        stepsCreated: result.routingSteps.length,
        source: result.routingSource
      }
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
