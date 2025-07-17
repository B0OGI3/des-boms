import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '../../../generated/prisma';

// GET /api/confirmations - Get step confirmations with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workstationId = searchParams.get('workstationId');
    const operatorName = searchParams.get('operatorName');
    const stepId = searchParams.get('stepId');
    const status = searchParams.get('status');
    
    const where: Prisma.StepConfirmationWhereInput = {};
    if (workstationId) where.workstationId = workstationId;
    if (operatorName) where.operatorName = operatorName;
    if (stepId) where.stepId = stepId;
    if (status) where.status = status as Prisma.StepConfirmationWhereInput['status'];

    const confirmations = await prisma.stepConfirmation.findMany({
      where,
      include: {
        routingStep: {
          include: {
            batch: {
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
              },
            },
            workstation: true,
          },
        },
        workstation: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: confirmations,
      count: confirmations.length,
    });
  } catch (error) {
    console.error('Error fetching confirmations:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch confirmations',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/confirmations - Create a step confirmation (operator starts step)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      stepId,
      workstationId,
      operatorName,
      operatorId,
      notes,
      action = 'START', // START or COMPLETE
    } = body;

    // Validate required fields
    if (!stepId || !workstationId || !operatorName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: stepId, workstationId, operatorName',
        },
        { status: 400 }
      );
    }

    // Check if there's already an active confirmation for this step
    const existingConfirmation = await prisma.stepConfirmation.findFirst({
      where: {
        stepId,
        status: {
          in: ['STARTED', 'PAUSED'],
        },
      },
    });

    let confirmation;

    if (action === 'START') {
      if (existingConfirmation) {
        return NextResponse.json(
          {
            success: false,
            error: 'Step is already started by another operator',
          },
          { status: 409 }
        );
      }

      // Create new confirmation and update step status
      confirmation = await prisma.stepConfirmation.create({
        data: {
          stepId,
          workstationId,
          operatorName,
          operatorId,
          startTime: new Date(),
          notes,
          status: 'STARTED',
        },
        include: {
          routingStep: {
            include: {
              batch: true,
              workstation: true,
            },
          },
        },
      });

      // Update routing step status
      await prisma.routingStep.update({
        where: { id: stepId },
        data: { status: 'IN_PROGRESS' },
      });

    } else if (action === 'COMPLETE') {
      if (!existingConfirmation) {
        return NextResponse.json(
          {
            success: false,
            error: 'Step must be started before it can be completed',
          },
          { status: 400 }
        );
      }

      // Update existing confirmation
      confirmation = await prisma.stepConfirmation.update({
        where: { id: existingConfirmation.id },
        data: {
          endTime: new Date(),
          notes: notes || existingConfirmation.notes,
          status: 'COMPLETED',
        },
        include: {
          routingStep: {
            include: {
              batch: true,
              workstation: true,
            },
          },
        },
      });

      // Update routing step status
      await prisma.routingStep.update({
        where: { id: stepId },
        data: { status: 'COMPLETED' },
      });

      // Check if all steps are completed and update batch status
      const allSteps = await prisma.routingStep.findMany({
        where: { batchId: confirmation.routingStep.batchId },
      });

      const completedSteps = allSteps.filter(step => 
        step.status === 'COMPLETED' || step.status === 'SKIPPED'
      );

      if (completedSteps.length === allSteps.length) {
        await prisma.batch.update({
          where: { id: confirmation.routingStep.batchId },
          data: { 
            status: 'COMPLETED',
            actualCompletion: new Date(),
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: confirmation,
      message: `Step ${action.toLowerCase()}ed successfully`,
    });
  } catch (error) {
    console.error('Error creating confirmation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create confirmation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT /api/confirmations - Update confirmation (for flagging issues, adding photos, etc.)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, notes, photoUrl, flagged, status } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: id',
        },
        { status: 400 }
      );
    }

    const confirmation = await prisma.stepConfirmation.update({
      where: { id },
      data: {
        ...(notes !== undefined && { notes }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(flagged !== undefined && { flagged }),
        ...(status !== undefined && { status }),
      },
      include: {
        routingStep: {
          include: {
            batch: true,
            workstation: true,
          },
        },
      },
    });

    // If step is flagged, update routing step status
    if (flagged) {
      await prisma.routingStep.update({
        where: { id: confirmation.stepId },
        data: { status: 'FAILED' },
      });
    }

    return NextResponse.json({
      success: true,
      data: confirmation,
      message: 'Confirmation updated successfully',
    });
  } catch (error) {
    console.error('Error updating confirmation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update confirmation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
