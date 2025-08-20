import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  generateBOMBasedRoutingSteps,
  getFullBOMStructure,
} from '@/lib/bomUtils';

// BOM-aware batch generation with material requirements
interface WorkflowStep {
  stepNumber: number;
  workstationId: string;
  description: string;
  estimatedTime: number;
  required: boolean;
  partType?: string;
  partNumber?: string;
  materialRequirements?: string[];
}

interface MaterialRequirement {
  partId: string;
  partNumber: string;
  partName: string;
  partType: string;
  totalQuantityRequired: number;
  unitOfMeasure?: string;
  standardCost?: number;
  totalCost: number;
}

interface BatchSuggestion {
  lineItemId: string;
  partNumber: string;
  partName: string;
  partType?: string;
  totalQuantity: number;
  materialRequirements?: MaterialRequirement[];
  suggestedBatches: Array<{
    batchNumber: number;
    quantity: number;
    priority: 'RUSH' | 'STANDARD' | 'HOLD';
    estimatedStartDate?: Date;
    estimatedCompletionDate?: Date;
    workflowSteps: WorkflowStep[];
    materialCost?: number;
  }>;
}

// Configuration for batch generation
interface GenerationConfig {
  maxBatchSize: number;
  minBatchSize: number;
  preferredBatchSize: number;
  priorityStrategy: 'RUSH_FIRST' | 'BALANCED' | 'EFFICIENCY';
  allowSplitting: boolean;
  rushThreshold: number;
  qualityControlLevel: 'BASIC' | 'STANDARD' | 'ENHANCED';
  estimationBuffer: number;
  defaultRoutingStrategy: 'BOM_BASED' | 'MANUAL';
}

// Helper function to process a single line item
async function processLineItem(
  lineItem: any,
  order: any,
  config: GenerationConfig
): Promise<BatchSuggestion> {
  try {
    // Get BOM structure and routing suggestions
    const bomStructure = await getFullBOMStructure(
      lineItem.partId,
      lineItem.quantity
    );
    const routingSuggestions = await generateBOMBasedRoutingSteps(
      lineItem.partId,
      lineItem.quantity
    );

    // Determine optimal batch sizing
    const batches = calculateOptimalBatches(lineItem.quantity, config);

    // Get available workstations for routing
    const workstations = await prisma.workstation.findMany({
      where: { active: true },
      select: { id: true, name: true, category: true },
    });

    // Create workflow steps with proper workstation assignments
    const workflowSteps = await createWorkflowStepsFromBOM(
      routingSuggestions.suggestedSteps,
      workstations
    );

    return createSuccessfulBatchSuggestion(
      lineItem,
      order,
      batches,
      workflowSteps,
      bomStructure,
      config
    );
  } catch (error) {
    console.error(`Error processing line item ${lineItem.id}:`, error);
    return createFallbackBatchSuggestion(lineItem, config);
  }
}

// Helper function to create successful batch suggestion
function createSuccessfulBatchSuggestion(
  lineItem: any,
  order: any,
  batches: any[],
  workflowSteps: WorkflowStep[],
  bomStructure: any,
  config: GenerationConfig
): BatchSuggestion {
  const suggestedBatches = batches.map((batch, index) => ({
    batchNumber: index + 1,
    quantity: batch.quantity,
    priority: determineBatchPriority(order.priority, batch.quantity, config) as
      | 'RUSH'
      | 'STANDARD'
      | 'HOLD',
    estimatedStartDate: calculateStartDate(index, workflowSteps),
    estimatedCompletionDate: calculateCompletionDate(index, workflowSteps),
    workflowSteps: workflowSteps.map(step => ({
      ...step,
      // Scale material requirements by batch quantity
      materialRequirements: step.materialRequirements?.map(
        req => `${req} (for ${batch.quantity} units)`
      ),
    })),
    materialCost:
      bomStructure?.materialRequirements.reduce(
        (sum: number, req: any) =>
          sum + (req.totalCost * batch.quantity) / lineItem.quantity,
        0
      ) || 0,
  }));

  return {
    lineItemId: lineItem.id,
    partNumber: lineItem.part.partNumber,
    partName: lineItem.part.partName,
    partType: lineItem.part.partType,
    totalQuantity: lineItem.quantity,
    materialRequirements: bomStructure?.materialRequirements || [],
    suggestedBatches,
  };
}

// Helper function to create fallback batch suggestion
function createFallbackBatchSuggestion(
  lineItem: any,
  config: GenerationConfig
): BatchSuggestion {
  const fallbackBatches = calculateOptimalBatches(lineItem.quantity, config);

  return {
    lineItemId: lineItem.id,
    partNumber: lineItem.part.partNumber,
    partName: lineItem.part.partName,
    partType: lineItem.part.partType,
    totalQuantity: lineItem.quantity,
    materialRequirements: [],
    suggestedBatches: fallbackBatches.map((batch, index) => ({
      batchNumber: index + 1,
      quantity: batch.quantity,
      priority: 'STANDARD' as const,
      workflowSteps: [
        {
          stepNumber: 1,
          workstationId: 'default',
          description: 'Manual routing required - no BOM available',
          estimatedTime: 60,
          required: true,
          materialRequirements: ['Manual material selection required'],
        },
      ],
      materialCost: 0,
    })),
  };
}

/**
 * Generate BOM-aware batch suggestions with material requirements
 */
async function generateBOMBasedBatchSuggestions(
  orderId: string,
  config: GenerationConfig
): Promise<BatchSuggestion[]> {
  const order = await prisma.purchaseOrder.findUnique({
    where: { id: orderId },
    include: {
      lineItems: {
        include: {
          part: true,
        },
      },
      customer: true,
    },
  });

  if (!order) {
    throw new Error('Order not found');
  }

  const suggestions: BatchSuggestion[] = [];

  for (const lineItem of order.lineItems) {
    const suggestion = await processLineItem(lineItem, order, config);
    suggestions.push(suggestion);
  }

  return suggestions;
}

// Helper function to handle remaining quantity logic
function handleRemainingQuantity(
  remainingQuantity: number,
  config: GenerationConfig,
  batches: Array<{ quantity: number; reasoning?: string }>
): number {
  if (
    remainingQuantity <= config.maxBatchSize &&
    remainingQuantity >= config.minBatchSize
  ) {
    // Remaining quantity can be a final batch
    return remainingQuantity;
  }

  if (remainingQuantity > config.maxBatchSize) {
    // Use preferred batch size or max batch size
    let batchSize = Math.min(config.preferredBatchSize, config.maxBatchSize);

    // Adjust to avoid small final batch
    const projectedRemainder = remainingQuantity - batchSize;
    if (projectedRemainder > 0 && projectedRemainder < config.minBatchSize) {
      batchSize = Math.floor(remainingQuantity / 2);
    }
    return batchSize;
  }

  // Remaining quantity is less than min batch size
  return handleSmallRemainder(remainingQuantity, config, batches);
}

// Helper function to handle small remainder quantities
function handleSmallRemainder(
  remainingQuantity: number,
  config: GenerationConfig,
  batches: Array<{ quantity: number; reasoning?: string }>
): number {
  if (batches.length > 0 && config.allowSplitting) {
    // Combine with previous batch
    batches[batches.length - 1].quantity += remainingQuantity;
    return 0; // Indicates the remainder was absorbed
  }

  // Exception for final small batch
  return remainingQuantity;
}

/**
 * Helper function to calculate optimal batch sizes
 */
function calculateOptimalBatches(
  totalQuantity: number,
  config: GenerationConfig
): Array<{ quantity: number; reasoning?: string }> {
  const batches: Array<{ quantity: number; reasoning?: string }> = [];

  if (
    totalQuantity <= config.maxBatchSize &&
    totalQuantity >= config.minBatchSize
  ) {
    // Single batch is optimal
    return [
      {
        quantity: totalQuantity,
        reasoning: `Total quantity ${totalQuantity} fits within single batch parameters`,
      },
    ];
  }

  if (totalQuantity <= config.maxBatchSize) {
    // Single batch, even if smaller than preferred
    return [
      {
        quantity: totalQuantity,
        reasoning: `Single batch for small quantity ${totalQuantity}`,
      },
    ];
  }

  // Multiple batches needed
  let remainingQuantity = totalQuantity;
  while (remainingQuantity > 0) {
    const batchSize = handleRemainingQuantity(
      remainingQuantity,
      config,
      batches
    );

    if (batchSize === 0) {
      // Remainder was absorbed into previous batch
      break;
    }

    batches.push({
      quantity: batchSize,
      reasoning: `Batch ${batches.length + 1} optimized for ${batchSize} units`,
    });
    remainingQuantity -= batchSize;
  }

  return batches;
}

/**
 * Create workflow steps from BOM-based suggestions
 */
async function createWorkflowStepsFromBOM(
  bomSteps: any[],
  workstations: Array<{ id: string; name: string; category: string }>
): Promise<WorkflowStep[]> {
  return bomSteps.map(step => ({
    stepNumber: step.stepNumber,
    workstationId: findBestWorkstation(step.operation, workstations),
    description: step.description,
    estimatedTime: step.estimatedTime,
    required: step.required,
    partType: step.partType,
    partNumber: step.partNumber,
    materialRequirements: step.materialRequirements,
  }));
}

/**
 * Find best workstation for an operation
 */
function findBestWorkstation(
  operation: string,
  workstations: Array<{ id: string; name: string; category: string }>
): string {
  // Map operations to workstation categories
  const operationMap: { [key: string]: string } = {
    PREP: 'PREP',
    MACHINING: 'MACHINING',
    ASSEMBLY: 'ASSEMBLY',
    WELDING: 'WELDING',
    INSPECTION: 'INSPECTION',
    PACKAGING: 'PACKAGING',
    FINISHING: 'FINISHING',
  };

  const targetCategory = operationMap[operation.toUpperCase()] || 'MACHINING';

  // Find workstation with matching category
  const matchingWorkstation = workstations.find(
    ws => ws.category === targetCategory
  );

  // Return matching workstation or first available workstation
  return matchingWorkstation?.id || workstations[0]?.id || 'default';
}

/**
 * Determine batch priority based on order and batch characteristics
 */
function determineBatchPriority(
  orderPriority: string,
  batchQuantity: number,
  config: GenerationConfig
): string {
  if (orderPriority === 'RUSH') {
    return 'RUSH';
  }

  if (
    config.priorityStrategy === 'RUSH_FIRST' &&
    batchQuantity <= config.rushThreshold
  ) {
    return 'RUSH';
  }

  return 'STANDARD';
}

/**
 * Calculate estimated start date for batch
 */
function calculateStartDate(
  batchIndex: number,
  workflowSteps: WorkflowStep[]
): Date {
  const startDate = new Date();
  const totalPreviousTime =
    batchIndex *
    workflowSteps.reduce((sum, step) => sum + step.estimatedTime, 0);

  // Add minutes to start date
  startDate.setMinutes(startDate.getMinutes() + totalPreviousTime);
  return startDate;
}

/**
 * Calculate estimated completion date for batch
 */
function calculateCompletionDate(
  batchIndex: number,
  workflowSteps: WorkflowStep[]
): Date {
  const batchTime = workflowSteps.reduce(
    (sum, step) => sum + step.estimatedTime,
    0
  );
  const totalTime = batchIndex * batchTime + batchTime;

  const completionDate = new Date();
  completionDate.setMinutes(completionDate.getMinutes() + totalTime);
  return completionDate;
}

/**
 * POST /api/orders/[id]/generate-batches
 * Generate BOM-aware batch suggestions for an order
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const body = await request.json();

    const config: GenerationConfig = {
      maxBatchSize: 100,
      minBatchSize: 10,
      preferredBatchSize: 50,
      priorityStrategy: 'BALANCED',
      allowSplitting: true,
      rushThreshold: 75,
      qualityControlLevel: 'STANDARD',
      estimationBuffer: 20,
      defaultRoutingStrategy: 'BOM_BASED',
      ...body.config,
    };

    const suggestions = await generateBOMBasedBatchSuggestions(orderId, config);

    return NextResponse.json({
      success: true,
      data: suggestions,
      summary: {
        totalLineItems: suggestions.length,
        totalBatches: suggestions.reduce(
          (sum, s) => sum + s.suggestedBatches.length,
          0
        ),
        totalMaterialCost: suggestions.reduce(
          (sum, s) =>
            sum +
            s.suggestedBatches.reduce(
              (batchSum, b) => batchSum + (b.materialCost || 0),
              0
            ),
          0
        ),
        estimatedCompletionTime: Math.max(
          ...suggestions.flatMap(s =>
            s.suggestedBatches.map(b =>
              b.workflowSteps.reduce((sum, step) => sum + step.estimatedTime, 0)
            )
          )
        ),
      },
    });
  } catch (error) {
    console.error('Error generating batch suggestions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate batch suggestions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/orders/[id]/generate-batches
 * Create approved batches with BOM-based routing
 */
export async function PUT(
  request: NextRequest,
  { params: _params }: { params: { id: string } }
) {
  try {
    const { approvedBatches } = await request.json();

    if (!approvedBatches || !Array.isArray(approvedBatches)) {
      return NextResponse.json(
        { success: false, error: 'approvedBatches array is required' },
        { status: 400 }
      );
    }

    const results = await prisma.$transaction(async tx => {
      const createdBatches = [];

      for (const batchData of approvedBatches) {
        const { lineItemId, quantity, priority, workflowSteps } = batchData;

        // Generate batch ID
        const batchId = await generateBatchId(tx);

        // Create the batch
        const batch = await tx.batch.create({
          data: {
            batchId,
            lineItemId,
            quantity,
            priority: priority || 'STANDARD',
            status: 'QUEUED',
            estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days default
          },
        });

        // Create routing steps with BOM-based workflow
        if (workflowSteps && workflowSteps.length > 0) {
          for (const step of workflowSteps) {
            await tx.routingStep.create({
              data: {
                batchId: batch.id,
                stepNumber: step.stepNumber,
                workstationId: step.workstationId,
                description: step.description,
                estimatedTime: step.estimatedTime,
                required: step.required,
                notes: step.materialRequirements?.join('; ') || null,
                status: 'PENDING',
              },
            });
          }
        }

        createdBatches.push({
          batch,
          routingSteps: workflowSteps?.length || 0,
        });
      }

      return createdBatches;
    });

    return NextResponse.json({
      success: true,
      data: results,
      message: `Successfully created ${results.length} batches with BOM-based routing`,
    });
  } catch (error) {
    console.error('Error creating batches:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create batches',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Generate unique batch ID in format DES-YYYY-MMDD-###
 */
async function generateBatchId(tx: any): Promise<string> {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const datePrefix = `DES-${year}-${month}${day}`;

  // Find the highest sequence number for today
  const existingBatches = await tx.batch.findMany({
    where: {
      batchId: {
        startsWith: datePrefix,
      },
    },
    select: {
      batchId: true,
    },
    orderBy: {
      batchId: 'desc',
    },
    take: 1,
  });

  let sequenceNumber = 1;
  if (existingBatches.length > 0) {
    const lastBatchId = existingBatches[0].batchId;
    const sequencePart = lastBatchId.split('-').pop();
    if (sequencePart) {
      sequenceNumber = parseInt(sequencePart, 10) + 1;
    }
  }

  return `${datePrefix}-${String(sequenceNumber).padStart(3, '0')}`;
}
