/**
 * Batch Routing Integration API
 * POST /api/batches/[id]/routing - Create routing steps for a batch using templates
 * PUT /api/batches/[id]/routing - Update routing steps for a batch
 * GET /api/batches/[id]/routing - Get routing steps for a batch
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

/**
 * GET /api/batches/[id]/routing - Get routing steps for a batch
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const batch = await prisma.batch.findUnique({
      where: { id },
      include: {
        routingSteps: {
          include: {
            workstation: true,
            confirmations: {
              orderBy: {
                createdAt: 'desc'
              }
            }
          },
          orderBy: {
            stepNumber: 'asc'
          }
        },
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
    });

    if (!batch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        batch: {
          id: batch.id,
          batchId: batch.batchId,
          status: batch.status,
          priority: batch.priority,
          lineItem: {
            partNumber: batch.lineItem.part.partNumber,
            partName: batch.lineItem.part.partName,
            partType: batch.lineItem.part.partType
          }
        },
        routingSteps: batch.routingSteps
      }
    });

  } catch (error) {
    console.error('Error fetching batch routing:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch batch routing',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/batches/[id]/routing - Create routing steps for a batch
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { templateId, customSteps } = body;

    // Check if batch exists
    const batch = await prisma.batch.findUnique({
      where: { id },
      include: {
        routingSteps: true
      }
    });

    if (!batch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Check if batch already has routing steps
    if (batch.routingSteps.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Batch already has routing steps. Use PUT to update existing steps.' 
        },
        { status: 400 }
      );
    }

    let stepsToCreate = [];

    if (templateId) {
      // Use routing template to create steps
      const template = await prisma.routingTemplate.findUnique({
        where: { id: templateId },
        include: {
          templateSteps: {
            include: {
              workstation: true
            },
            orderBy: {
              stepNumber: 'asc'
            }
          }
        }
      });

      if (!template) {
        return NextResponse.json(
          { success: false, error: 'Routing template not found' },
          { status: 404 }
        );
      }

      stepsToCreate = template.templateSteps.map((templateStep: any) => ({
        stepNumber: templateStep.stepNumber,
        workstationId: templateStep.workstationId,
        description: templateStep.description,
        required: templateStep.required,
        estimatedTime: templateStep.estimatedTime,
        notes: templateStep.notes
      }));
    } else if (customSteps && Array.isArray(customSteps)) {
      // Use custom steps
      stepsToCreate = customSteps.map((step, index) => ({
        stepNumber: index + 1,
        workstationId: step.workstationId,
        description: step.description,
        required: step.required ?? true,
        estimatedTime: step.estimatedTime,
        notes: step.notes
      }));
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Either templateId or customSteps must be provided' 
        },
        { status: 400 }
      );
    }

    // Create routing steps in a transaction
    const createdSteps = await prisma.$transaction(async (tx: any) => {
      const steps = [];
      
      for (const stepData of stepsToCreate) {
        const step = await tx.routingStep.create({
          data: {
            batchId: id,
            stepNumber: stepData.stepNumber,
            workstationId: stepData.workstationId,
            description: stepData.description,
            required: stepData.required,
            estimatedTime: stepData.estimatedTime,
            notes: stepData.notes,
            status: 'PENDING'
          },
          include: {
            workstation: true
          }
        });
        
        steps.push(step);
      }
      
      return steps;
    });

    return NextResponse.json({
      success: true,
      data: createdSteps,
      message: `Created ${createdSteps.length} routing steps for batch ${batch.batchId}`
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating batch routing:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create batch routing',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/batches/[id]/routing - Update routing steps for a batch
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { steps } = await request.json();

    // Validate input
    if (!steps || !Array.isArray(steps)) {
      return NextResponse.json(
        { success: false, error: 'Steps array is required' },
        { status: 400 }
      );
    }

    // Check if batch exists
    const batch = await prisma.batch.findUnique({
      where: { id },
      include: { routingSteps: true }
    });

    if (!batch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Start a transaction to update routing steps
    const result = await prisma.$transaction(async (tx: any) => {
      // Delete existing routing steps
      await tx.routingStep.deleteMany({
        where: { batchId: id }
      });

      // Create new routing steps
      const routingSteps = await Promise.all(
        steps.map((step: any) =>
          tx.routingStep.create({
            data: {
              batchId: id,
              stepNumber: step.stepNumber,
              workstationId: step.workstationId,
              estimatedTime: step.estimatedMinutes || step.estimatedTime || 60,
              description: step.description,
              status: 'PENDING',
              required: step.required ?? true,
              notes: step.notes || ''
            },
            include: {
              workstation: true
            }
          })
        )
      );

      // Update batch status if needed
      let updateData: any = {};
      
      // If adding routing steps to a queued batch, keep it queued
      // The routing update itself doesn't change status
      
      const updatedBatch = await tx.batch.update({
        where: { id },
        data: updateData,
        include: {
          routingSteps: {
            include: {
              workstation: true
            },
            orderBy: {
              stepNumber: 'asc'
            }
          }
        }
      });

      return { batch: updatedBatch, routingSteps };
    });

    return NextResponse.json({
      success: true,
      data: {
        batch: result.batch,
        routingSteps: result.routingSteps
      },
      message: `Updated routing with ${steps.length} steps`
    });

  } catch (error) {
    console.error('Error updating batch routing:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update batch routing',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
