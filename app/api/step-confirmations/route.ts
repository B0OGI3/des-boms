/**
 * Step Confirmations API
 * Handles operator confirmations for routing steps
 * Implements Section 4.1 of BOMS specification
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

/**
 * GET /api/step-confirmations - Get confirmations for a step
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stepId = searchParams.get('stepId');
    const workstationId = searchParams.get('workstationId');
    const operatorId = searchParams.get('operatorId');

    const where: any = {};
    
    if (stepId) {
      where.stepId = stepId;
    }
    
    if (workstationId) {
      where.workstationId = workstationId;
    }
    
    if (operatorId) {
      where.operatorId = operatorId;
    }

    const confirmations = await prisma.stepConfirmation.findMany({
      where,
      include: {
        routingStep: {
          include: {
            batch: {
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
              },
            },
            workstation: true,
          },
        },
      },
      orderBy: {
        startTime: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: confirmations,
    });

  } catch (error) {
    console.error('Error fetching step confirmations:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch step confirmations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/step-confirmations - Create a new step confirmation
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const stepId = formData.get('stepId') as string;
    const operatorName = formData.get('operatorName') as string;
    const operatorId = formData.get('operatorId') as string || null;
    const action = formData.get('action') as 'start' | 'complete' | 'pause' | 'flag';
    const notes = formData.get('notes') as string || null;
    const photo = formData.get('photo') as File || null;

    // Validate required fields
    if (!stepId || !operatorName || !action) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: stepId, operatorName, action' 
        },
        { status: 400 }
      );
    }

    // Check if step exists
    const routingStep = await prisma.routingStep.findUnique({
      where: { id: stepId },
      include: {
        batch: true,
        workstation: true,
      },
    });

    if (!routingStep) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Routing step not found' 
        },
        { status: 404 }
      );
    }

    // Handle photo upload if provided
    let photoUrl = null;
    if (photo) {
      // File storage using base64 data URLs for now
      // In production, consider implementing proper file storage (S3, Azure Blob, etc.)
      // For now, we'll just log that a photo was provided
      console.log('Photo upload received:', photo.name, photo.size);
      photoUrl = `/uploads/step-photos/${stepId}-${Date.now()}-${photo.name}`;
    }

    // Determine confirmation status and step status based on action
    let confirmationStatus: 'STARTED' | 'COMPLETED' | 'PAUSED';
    let newStepStatus: 'IN_PROGRESS' | 'COMPLETED' | 'PENDING' | 'FAILED';
    const flagged = action === 'flag';

    switch (action) {
      case 'start':
        confirmationStatus = 'STARTED';
        newStepStatus = 'IN_PROGRESS';
        break;
      case 'complete':
        confirmationStatus = 'COMPLETED';
        newStepStatus = 'COMPLETED';
        break;
      case 'pause':
        confirmationStatus = 'PAUSED';
        newStepStatus = 'PENDING';
        break;
      case 'flag':
        confirmationStatus = 'STARTED';
        newStepStatus = 'FAILED';
        break;
      default:
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid action. Must be: start, complete, pause, or flag' 
          },
          { status: 400 }
        );
    }

    // Create the confirmation record
    const confirmation = await prisma.stepConfirmation.create({
      data: {
        stepId,
        workstationId: routingStep.workstationId,
        operatorName,
        operatorId,
        startTime: action === 'start' || action === 'flag' ? new Date() : undefined,
        endTime: action === 'complete' ? new Date() : undefined,
        notes,
        photoUrl,
        flagged,
        status: confirmationStatus,
      },
    });

    // Update the routing step status
    await prisma.routingStep.update({
      where: { id: stepId },
      data: {
        status: newStepStatus,
      },
    });

    // If this is a completion, check if we need to update batch status
    if (action === 'complete') {
      const allSteps = await prisma.routingStep.findMany({
        where: { 
          batchId: routingStep.batchId,
          required: true,
        },
      });

      const completedSteps = allSteps.filter(step => step.status === 'COMPLETED');
      
      // If all required steps are completed, mark batch as completed
      if (completedSteps.length === allSteps.length) {
        await prisma.batch.update({
          where: { id: routingStep.batchId },
          data: {
            status: 'COMPLETED',
            actualCompletion: new Date(),
          },
        });
      }
    }

    // Return the confirmation with related data
    const fullConfirmation = await prisma.stepConfirmation.findUnique({
      where: { id: confirmation.id },
      include: {
        routingStep: {
          include: {
            batch: {
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
              },
            },
            workstation: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: fullConfirmation,
      message: `Step ${action} recorded successfully`,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating step confirmation:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create step confirmation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
