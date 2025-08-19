import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../../lib/prisma';

// Helper function to handle 'start' action
async function handleStartAction(stepProgress: any, itemId: string, routingStepId: string, operatorId: string, notes?: string) {
  const updatedStepProgress = await prisma.workOrderStepProgress.update({
    where: { id: stepProgress.id },
    data: {
      status: 'IN_PROGRESS',
      startedAt: new Date(),
      operatorId,
      notes
    }
  });

  let updatedWorkOrderItem;
  if (stepProgress.routingStep.stepNumber === 1) {
    updatedWorkOrderItem = await prisma.workOrderItem.update({
      where: { id: itemId },
      data: {
        status: 'IN_PROGRESS',
        startedAt: new Date(),
        currentStepId: routingStepId
      }
    });
  } else {
    updatedWorkOrderItem = await prisma.workOrderItem.update({
      where: { id: itemId },
      data: {
        currentStepId: routingStepId
      }
    });
  }

  return { updatedStepProgress, updatedWorkOrderItem };
}

// Helper function to create quality check record
async function createQualityCheck(qualityData: any, itemId: string, routingStepId: string, operatorId: string) {
  if (!qualityData) return;
  
  await prisma.workOrderQualityCheck.create({
    data: {
      workOrderItemId: itemId,
      routingStepId,
      checkType: qualityData.checkType || 'IN_PROCESS',
      result: qualityData.result,
      checkedBy: qualityData.checkedBy || operatorId,
      measurements: qualityData.measurements ? JSON.stringify(qualityData.measurements) : null,
      defects: qualityData.defects,
      notes: qualityData.notes
    }
  });
}

// Helper function to create material usage records
async function createMaterialUsageRecords(materialUsage: any[], itemId: string, routingStepId: string, operatorId: string) {
  if (!materialUsage?.length) return;
  
  for (const usage of materialUsage) {
    await prisma.workOrderMaterialUsage.create({
      data: {
        workOrderItemId: itemId,
        materialPartId: usage.materialPartId,
        routingStepId,
        quantityUsed: usage.quantityUsed,
        unitCost: usage.unitCost,
        operatorId,
        notes: usage.notes
      }
    });
  }
}

// Helper function to update work order item status after completion
async function updateWorkOrderItemAfterCompletion(itemId: string) {
  const allStepProgress = await prisma.workOrderStepProgress.findMany({
    where: { workOrderItemId: itemId },
    include: { routingStep: true }
  });

  const completedSteps = allStepProgress.filter((sp: any) => sp.status === 'COMPLETED');
  const totalSteps = allStepProgress.length;

  if (completedSteps.length === totalSteps) {
    return await prisma.workOrderItem.update({
      where: { id: itemId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        currentStepId: null
      }
    });
  } else {
    // Find next step
    const nextStep = allStepProgress
      .filter((sp: any) => sp.status === 'PENDING')
      .sort((a: any, b: any) => a.routingStep.stepNumber - b.routingStep.stepNumber)[0];

    return await prisma.workOrderItem.update({
      where: { id: itemId },
      data: {
        currentStepId: nextStep?.routingStepId || null
      }
    });
  }
}

// Helper function to handle 'complete' action
async function handleCompleteAction(
  stepProgress: any, 
  itemId: string, 
  routingStepId: string, 
  options: {
    operatorId: string;
    actualTime?: number;
    notes?: string;
    qualityData?: any;
    materialUsage?: any[];
  }
) {
  const { operatorId, actualTime, notes, qualityData, materialUsage } = options;
  
  const updatedStepProgress = await prisma.workOrderStepProgress.update({
    where: { id: stepProgress.id },
    data: {
      status: 'COMPLETED',
      completedAt: new Date(),
      operatorId,
      actualTime,
      notes
    }
  });

  // Record quality check if provided
  await createQualityCheck(qualityData, itemId, routingStepId, operatorId);

  // Record material usage if provided
  await createMaterialUsageRecords(materialUsage || [], itemId, routingStepId, operatorId);

  // Update work order item status
  const updatedWorkOrderItem = await updateWorkOrderItemAfterCompletion(itemId);

  return { updatedStepProgress, updatedWorkOrderItem };
}

// Helper function to handle 'hold' action
async function handleHoldAction(stepProgress: any, itemId: string, operatorId: string, notes?: string) {
  const updatedStepProgress = await prisma.workOrderStepProgress.update({
    where: { id: stepProgress.id },
    data: {
      status: 'PENDING',
      operatorId,
      notes
    }
  });

  const updatedWorkOrderItem = await prisma.workOrderItem.update({
    where: { id: itemId },
    data: {
      status: 'ON_HOLD',
      notes: notes || 'Item placed on hold'
    }
  });

  return { updatedStepProgress, updatedWorkOrderItem };
}

// Helper function to handle 'rework' action
async function handleReworkAction(stepProgress: any, itemId: string, routingStepId: string, operatorId: string, notes?: string) {
  const updatedStepProgress = await prisma.workOrderStepProgress.update({
    where: { id: stepProgress.id },
    data: {
      status: 'PENDING',
      operatorId,
      notes
    }
  });

  const updatedWorkOrderItem = await prisma.workOrderItem.update({
    where: { id: itemId },
    data: {
      status: 'REWORK',
      currentStepId: routingStepId,
      notes: notes || 'Item requires rework'
    }
  });

  return { updatedStepProgress, updatedWorkOrderItem };
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const { id: batchId, itemId } = params;
    const body = await request.json();
    const { 
      routingStepId, 
      action, // 'start', 'complete', 'hold', 'rework'
      operatorId, 
      notes, 
      actualTime,
      qualityData,
      materialUsage 
    } = body;

    // Verify work order item exists and belongs to batch
    const workOrderItem = await prisma.workOrderItem.findFirst({
      where: {
        id: itemId,
        batchId
      },
      include: {
        stepProgress: {
          where: {
            routingStepId
          },
          include: {
            routingStep: true
          }
        }
      }
    });

    if (!workOrderItem) {
      return NextResponse.json(
        { success: false, message: 'Work order item not found' },
        { status: 404 }
      );
    }

    const stepProgress = workOrderItem.stepProgress[0];
    if (!stepProgress) {
      return NextResponse.json(
        { success: false, message: 'Step progress record not found' },
        { status: 404 }
      );
    }

    let result;

    // Handle different actions using helper functions
    switch (action) {
      case 'start':
        result = await handleStartAction(stepProgress, itemId, routingStepId, operatorId, notes);
        break;

      case 'complete':
        result = await handleCompleteAction(
          stepProgress, 
          itemId, 
          routingStepId, 
          {
            operatorId,
            actualTime,
            notes,
            qualityData,
            materialUsage
          }
        );
        break;

      case 'hold':
        result = await handleHoldAction(stepProgress, itemId, operatorId, notes);
        break;

      case 'rework':
        result = await handleReworkAction(stepProgress, itemId, routingStepId, operatorId, notes);
        break;

      default:
        return NextResponse.json(
          { success: false, message: `Invalid action: ${action}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: {
        stepProgress: result.updatedStepProgress,
        workOrderItem: result.updatedWorkOrderItem,
        action
      },
      message: `Successfully ${action}ed step for work order item ${workOrderItem.serialNumber}`
    });

  } catch (error) {
    console.error('[WORK_ORDER_STEP_PROGRESS]', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update step progress',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
