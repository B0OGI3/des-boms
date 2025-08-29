/**
 * Step Confirmations API
 * Handles operator confirmations for routing steps
 * Implements Section 4.1 of BOMS specification
 * REQUIRES AUTHENTICATED OPERATOR SIGN-OFF
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

/**
 * Type aliases for step confirmation actions and statuses
 */
type StepAction = 'start' | 'complete' | 'pause' | 'flag';
type ConfirmationStatus = 'STARTED' | 'COMPLETED' | 'PAUSED';
type StepStatus = 'IN_PROGRESS' | 'COMPLETED' | 'PENDING' | 'FAILED';

/**
 * Type for parsed step confirmation form data
 */
type StepConfirmationFormData = {
  stepId: string;
  operatorName: string;
  operatorId: string | null;
  action: StepAction;
  notes: string | null;
  photo: File | null;
  workstationId: string;
};

/**
 * Type for status determination result
 */
type StatusResult = {
  confirmationStatus: ConfirmationStatus;
  newStepStatus: StepStatus;
  flagged: boolean;
};

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
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Helper function to validate operator authentication
 */
async function validateOperatorSession(
  operatorId: string,
  workstationId: string
): Promise<{
  valid: boolean;
  operator?: any;
  session?: any;
  error?: string;
}> {
  try {
    // Check if operator exists and is active
    const operator = await prisma.workstationOperator.findUnique({
      where: { operatorId },
      include: {
        operatorSessions: {
          where: {
            workstationId,
            logoutTime: null, // Active session
          },
          orderBy: {
            loginTime: 'desc',
          },
          take: 1,
        },
      },
    });

    if (!operator) {
      return { valid: false, error: 'Operator not found' };
    }

    if (!operator.active) {
      return { valid: false, error: 'Operator account is inactive' };
    }

    // Check for active session at this workstation
    const activeSession = operator.operatorSessions[0];
    if (!activeSession) {
      return {
        valid: false,
        error: 'No active session found for this operator at this workstation',
      };
    }

    // Check if session is still valid (not older than 12 hours)
    const sessionAge = Date.now() - new Date(activeSession.loginTime).getTime();
    const maxSessionAge = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

    if (sessionAge > maxSessionAge) {
      // Auto-logout expired session
      await prisma.operatorSession.update({
        where: { id: activeSession.id },
        data: {
          logoutTime: new Date(),
          notes: 'Session expired (12+ hours)',
        },
      });
      return { valid: false, error: 'Session expired. Please log in again.' };
    }

    return { valid: true, operator, session: activeSession };
  } catch (error) {
    console.error('Error validating operator session:', error);
    return { valid: false, error: 'Failed to validate operator session' };
  }
}

/**
 * Helper function to parse and validate form data
 */
function parseStepConfirmationForm(
  formData: FormData
): StepConfirmationFormData {
  const stepId = formData.get('stepId') as string;
  const operatorName = formData.get('operatorName') as string;
  const operatorId = (formData.get('operatorId') as string) || null;
  const action = formData.get('action') as StepAction;
  const notes = (formData.get('notes') as string) || null;
  const photo = (formData.get('photo') as File) || null;
  const workstationId = formData.get('workstationId') as string;

  return {
    stepId,
    operatorName,
    operatorId,
    action,
    notes,
    photo,
    workstationId,
  };
}

/**
 * Helper function to validate required fields
 */
function validateRequiredFields(data: StepConfirmationFormData) {
  if (!data.stepId || !data.operatorName || !data.action) {
    return 'Missing required fields: stepId, operatorName, action';
  }

  if (!data.operatorId) {
    return 'Operator authentication required. Please log in before confirming steps.';
  }

  if (!data.workstationId) {
    return 'Workstation ID required for operator validation';
  }

  return null; // No validation errors
}

/**
 * Helper function to determine confirmation and step status
 */
function determineStatus(action: StepAction): StatusResult {
  const flagged = action === 'flag';

  switch (action) {
    case 'start':
      return {
        confirmationStatus: 'STARTED',
        newStepStatus: 'IN_PROGRESS',
        flagged,
      };
    case 'complete':
      return {
        confirmationStatus: 'COMPLETED',
        newStepStatus: 'COMPLETED',
        flagged,
      };
    case 'pause':
      return {
        confirmationStatus: 'PAUSED',
        newStepStatus: 'PENDING',
        flagged,
      };
    case 'flag':
      return {
        confirmationStatus: 'STARTED',
        newStepStatus: 'FAILED',
        flagged,
      };
    default:
      throw new Error(
        'Invalid action. Must be: start, complete, pause, or flag'
      );
  }
}

/**
 * Helper function to handle photo upload
 */
function handlePhotoUpload(photo: File | null, stepId: string): string | null {
  if (!photo) return null;

  console.log('Photo upload received:', photo.name, photo.size);
  return `/uploads/step-photos/${stepId}-${Date.now()}-${photo.name}`;
}

/**
 * Helper function to update batch status if all steps are completed
 */
async function updateBatchStatusIfComplete(routingStep: any) {
  const allSteps = await prisma.routingStep.findMany({
    where: {
      batchId: routingStep.batchId,
      required: true,
    },
  });

  const completedSteps = allSteps.filter(step => step.status === 'COMPLETED');

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

/**
 * POST /api/step-confirmations - Create a new step confirmation
 * REQUIRES AUTHENTICATED OPERATOR SIGN-OFF
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const formDataParsed = parseStepConfirmationForm(formData);

    // Validate required fields
    const validationError = validateRequiredFields(formDataParsed);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    const {
      stepId,
      operatorName,
      operatorId,
      action,
      notes,
      photo,
      workstationId,
    } = formDataParsed;

    // Validate operator session
    const sessionValidation = await validateOperatorSession(
      operatorId!,
      workstationId
    );
    if (!sessionValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: `Authentication failed: ${sessionValidation.error}`,
        },
        { status: 401 }
      );
    }

    const authenticatedOperator = sessionValidation.operator!;

    // Verify operator name matches authenticated operator
    if (operatorName !== authenticatedOperator.operatorName) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Operator name mismatch. Please use your authenticated credentials.',
        },
        { status: 401 }
      );
    }

    // Check if step exists
    const routingStep = await prisma.routingStep.findUnique({
      where: { id: stepId },
      include: { batch: true, workstation: true },
    });

    if (!routingStep) {
      return NextResponse.json(
        { success: false, error: 'Routing step not found' },
        { status: 404 }
      );
    }

    // Verify workstation matches authenticated session
    if (routingStep.workstationId !== workstationId) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Step workstation does not match authenticated workstation session',
        },
        { status: 403 }
      );
    }

    // Handle photo upload
    const photoUrl = handlePhotoUpload(photo, stepId);

    // Determine status values
    const { confirmationStatus, newStepStatus, flagged } =
      determineStatus(action);

    // Create the confirmation record
    const confirmation = await prisma.stepConfirmation.create({
      data: {
        stepId,
        workstationId,
        operatorName: authenticatedOperator.operatorName,
        operatorId: authenticatedOperator.operatorId,
        startTime:
          action === 'start' || action === 'flag' ? new Date() : undefined,
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
      data: { status: newStepStatus },
    });

    // Update batch status if completed
    if (action === 'complete') {
      await updateBatchStatusIfComplete(routingStep);
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
                      include: { customer: true },
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

    return NextResponse.json(
      {
        success: true,
        data: fullConfirmation,
        message: `Step ${action} recorded successfully by ${authenticatedOperator.operatorName}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating step confirmation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create step confirmation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
