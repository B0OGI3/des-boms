import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Smart routing types and functions
interface RoutingTemplate {
  templateId: string;
  name: string;
  steps: Array<{
    stepNumber: number;
    description: string;
    workstationCategory: string;
    estimatedTime: number;
    required: boolean;
  }>;
  businessRules: {
    applicablePartTypes: string[];
    minQuantity?: number;
    maxQuantity?: number;
    priority?: string[];
  };
}

// Smart routing templates
const ROUTING_TEMPLATES: RoutingTemplate[] = [
  {
    templateId: 'standard',
    name: 'Standard Manufacturing',
    steps: [
      { stepNumber: 1, description: 'Material Preparation', workstationCategory: 'MACHINING', estimatedTime: 2, required: true },
      { stepNumber: 2, description: 'Primary Manufacturing', workstationCategory: 'MACHINING', estimatedTime: 4, required: true },
      { stepNumber: 3, description: 'Quality Inspection', workstationCategory: 'INSPECTION', estimatedTime: 1, required: true },
      { stepNumber: 4, description: 'Finishing Operations', workstationCategory: 'FINISHING', estimatedTime: 2, required: true }
    ],
    businessRules: {
      applicablePartTypes: ['FINISHED_GOOD', 'SEMI_FINISHED'],
    }
  },
  {
    templateId: 'rush',
    name: 'Rush Priority',
    steps: [
      { stepNumber: 1, description: 'Express Material Prep', workstationCategory: 'MACHINING', estimatedTime: 1, required: true },
      { stepNumber: 2, description: 'Priority Manufacturing', workstationCategory: 'MACHINING', estimatedTime: 3, required: true },
      { stepNumber: 3, description: 'Final Inspection', workstationCategory: 'INSPECTION', estimatedTime: 1, required: true }
    ],
    businessRules: {
      applicablePartTypes: ['FINISHED_GOOD', 'SEMI_FINISHED'],
      priority: ['RUSH']
    }
  },
  {
    templateId: 'high-volume',
    name: 'High Volume Production',
    steps: [
      { stepNumber: 1, description: 'Bulk Material Setup', workstationCategory: 'MACHINING', estimatedTime: 3, required: true },
      { stepNumber: 2, description: 'High-Speed Manufacturing', workstationCategory: 'MACHINING', estimatedTime: 5, required: true },
      { stepNumber: 3, description: 'Batch Quality Control', workstationCategory: 'INSPECTION', estimatedTime: 2, required: true },
      { stepNumber: 4, description: 'Surface Treatment', workstationCategory: 'FINISHING', estimatedTime: 2, required: true },
      { stepNumber: 5, description: 'Final Packaging', workstationCategory: 'FINISHING', estimatedTime: 1, required: true }
    ],
    businessRules: {
      applicablePartTypes: ['FINISHED_GOOD', 'SEMI_FINISHED'],
      minQuantity: 50
    }
  }
];

// Smart routing selection logic
function selectOptimalTemplate(part: any, batchQuantity: number, priority: string): RoutingTemplate {
  // Priority-based selection
  if (priority === 'RUSH') {
    const rushTemplate = ROUTING_TEMPLATES.find(t => t.templateId === 'rush');
    if (rushTemplate?.businessRules.applicablePartTypes.includes(part.partType)) {
      return rushTemplate;
    }
  }

  // Volume-based selection
  if (batchQuantity >= 50) {
    const highVolumeTemplate = ROUTING_TEMPLATES.find(t => t.templateId === 'high-volume');
    if (highVolumeTemplate?.businessRules.applicablePartTypes.includes(part.partType)) {
      return highVolumeTemplate;
    }
  }

  // Default to standard template
  const standardTemplate = ROUTING_TEMPLATES.find(t => t.templateId === 'standard');
  return standardTemplate || ROUTING_TEMPLATES[0];
}

// Generate smart routing for a batch
async function generateSmartRoutingForBatch(tx: any, batch: any, part: any) {
  try {
    // Select optimal routing template
    const template = selectOptimalTemplate(part, batch.quantity, batch.priority);
    
    // Get workstations by category
    const workstations = await tx.workstation.findMany({
      where: { active: true }
    });

    // Create routing steps from template
    for (const stepTemplate of template.steps) {
      // Find appropriate workstation for this step
      const suitableWorkstations = workstations.filter((ws: any) => 
        ws.category === stepTemplate.workstationCategory
      );
      
      // Select first available workstation or fall back to any active workstation
      const selectedWorkstation = suitableWorkstations[0] || workstations[0];
      
      if (selectedWorkstation) {
        await tx.routingStep.create({
          data: {
            batchId: batch.id,
            stepNumber: stepTemplate.stepNumber,
            workstationId: selectedWorkstation.id,
            description: stepTemplate.description,
            required: stepTemplate.required,
            estimatedTime: stepTemplate.estimatedTime,
            notes: `Auto-generated from ${template.name} template`,
            status: 'PENDING'
          }
        });
      }
    }

    console.log(`Generated ${template.steps.length} routing steps for batch ${batch.batchId} using ${template.name} template`);
  } catch (error) {
    console.error('Error generating smart routing for batch:', error);
    // Don't throw - let batch creation succeed even if routing fails
  }
}

interface GenerationConfig {
  maxBatchSize: number;
  minBatchSize: number;
  preferredBatchSize: number;
  priorityStrategy: 'BALANCED' | 'EFFICIENCY' | 'QUALITY' | 'SPEED';
  allowSplitting: boolean;
  rushThreshold: number;
  qualityControlLevel: 'STANDARD' | 'ENHANCED' | 'STRICT';
  estimationBuffer: number;
}

interface BatchSuggestion {
  lineItemId: string;
  partNumber: string;
  partName: string;
  totalQuantity: number;
  suggestedBatches: Array<{
    batchNumber: number;
    quantity: number;
    priority: 'RUSH' | 'STANDARD';
    estimatedDuration: number; // in days
    workflowSteps: Array<{
      id: string;
      stepNumber: number;
      workstationId: string;
      description: string;
      estimatedTime: number;
      status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED' | 'FAILED';
    }>;
    reasoning: string;
  }>;
}

// Smart batch sizing algorithm with customization
function calculateOptimalBatchSize(
  quantity: number, 
  partType: string, 
  priority: string, 
  config: GenerationConfig
): number {
  // Use configured preferred size as base
  let baseSize = config.preferredBatchSize;
  
  // Adjust based on part type and strategy
  const partMultipliers = {
    'FINISHED_GOOD': config.priorityStrategy === 'QUALITY' ? 0.7 : 1.0,
    'SEMI_FINISHED': config.priorityStrategy === 'EFFICIENCY' ? 1.3 : 1.0,
    'RAW_MATERIAL': config.priorityStrategy === 'EFFICIENCY' ? 1.5 : 1.2
  };
  
  const partMultiplier = partMultipliers[partType as keyof typeof partMultipliers] || 1.0;
  baseSize = Math.ceil(baseSize * partMultiplier);
  
  // Strategy adjustments
  switch (config.priorityStrategy) {
    case 'SPEED':
      baseSize = Math.ceil(baseSize * 0.8); // Smaller batches for faster turnaround
      break;
    case 'QUALITY':
      baseSize = Math.ceil(baseSize * 0.6); // Much smaller batches for quality control
      break;
    case 'EFFICIENCY':
      baseSize = Math.ceil(baseSize * 1.2); // Larger batches for efficiency
      break;
    case 'BALANCED':
    default:
      // Use base size as-is
      break;
  }
  
  // Priority adjustment
  if (priority === 'RUSH') {
    baseSize = Math.ceil(baseSize * 0.7); // Smaller batches for rush orders
  }
  
  // Ensure within configured bounds
  const optimalSize = Math.max(config.minBatchSize, Math.min(baseSize, config.maxBatchSize));
  
  // Don't exceed total quantity
  return Math.min(optimalSize, quantity);
}

// Generate batch suggestions for a line item
function generateBatchSuggestions(
  lineItem: any,
  orderPriority: string,
  availableWorkstations: any[],
  config: GenerationConfig
): BatchSuggestion['suggestedBatches'] {
  const { quantity, part } = lineItem;
  const optimalBatchSize = calculateOptimalBatchSize(quantity, part.partType, orderPriority, config);
  
  const batches = [];
  let remainingQuantity = quantity;
  let batchNumber = 1;
  
  // Determine if this should be RUSH based on configuration
  const shouldRush = orderPriority === 'RUSH' || 
    (orderPriority === 'STANDARD' && Math.random() * 100 < config.rushThreshold);
  
  while (remainingQuantity > 0 && (config.allowSplitting || batchNumber === 1)) {
    const batchQuantity = Math.min(optimalBatchSize, remainingQuantity);
    
    // Determine batch priority - first batch gets order priority for rush orders
    const batchPriority: 'RUSH' | 'STANDARD' = shouldRush ? 'RUSH' : 'STANDARD';
    
    // *** SELECT SMART ROUTING TEMPLATE AND CREATE WORKFLOW STEPS ***
    const template = selectOptimalTemplate(part, batchQuantity, batchPriority);
    
    // Convert template steps to workflow steps
    const workflowSteps = template.steps.map(step => ({
      id: `temp-step-${Date.now()}-${step.stepNumber}`,
      stepNumber: step.stepNumber,
      workstationId: '', // Will be assigned when batch is created
      description: step.description,
      estimatedTime: step.estimatedTime,
      status: 'PENDING' as const
    }));
    
    // Estimate duration based on batch size, part complexity, and QC level
    let baseDuration = Math.ceil(batchQuantity / 25); // Base: 25 parts per day
    
    // Quality control adjustments
    const qcMultiplier = {
      'STANDARD': 1.0,
      'ENHANCED': 1.3,
      'STRICT': 1.6
    }[config.qualityControlLevel];
    
    baseDuration = Math.ceil(baseDuration * qcMultiplier);
    
    // Apply estimation buffer
    const estimatedDuration = Math.ceil(baseDuration * (1 + config.estimationBuffer / 100));
    
    // Generate reasoning based on configuration
    let reasoning = '';
    if (config.priorityStrategy === 'QUALITY') {
      reasoning = `Small batch (${batchQuantity}) for enhanced quality control (${config.qualityControlLevel.toLowerCase()}) using ${template.name}`;
    } else if (config.priorityStrategy === 'SPEED') {
      reasoning = `Optimized batch (${batchQuantity}) for fast turnaround with ${config.estimationBuffer}% buffer using ${template.name}`;
    } else if (config.priorityStrategy === 'EFFICIENCY') {
      reasoning = `Large batch (${batchQuantity}) for maximum manufacturing efficiency using ${template.name}`;
    } else {
      reasoning = `Balanced batch (${batchQuantity}) considering quality and efficiency using ${template.name}`;
    }
    
    batches.push({
      batchNumber,
      quantity: batchQuantity,
      priority: batchPriority,
      estimatedDuration,
      workflowSteps,
      reasoning
    });
    
    remainingQuantity -= batchQuantity;
    batchNumber++;
    
    // Safety check to prevent infinite loops
    if (batchNumber > 50) break;
  }
  
  return batches;
}

// POST /api/orders/[id]/generate-batches - Generate smart batch suggestions
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Parse request body for configuration
    const body = await request.json().catch(() => ({}));
    const config: GenerationConfig = {
      maxBatchSize: 100,
      minBatchSize: 10,
      preferredBatchSize: 50,
      priorityStrategy: 'BALANCED',
      allowSplitting: true,
      rushThreshold: 75,
      qualityControlLevel: 'STANDARD',
      estimationBuffer: 20,
      ...body.config // Override with user configuration
    };

    // Get order with line items
    const order = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: {
        customer: true,
        lineItems: {
          include: {
            part: true,
            batches: true, // To check existing batches
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Get available workstations for reference
    const workstations = await prisma.workstation.findMany({
      where: { active: true },
    });

    // Generate suggestions for each line item that doesn't have complete batching
    const suggestions: BatchSuggestion[] = [];

    for (const lineItem of order.lineItems) {
      // Calculate how much quantity is already batched
      const existingBatchQuantity = lineItem.batches.reduce(
        (sum, batch) => sum + batch.quantity, 
        0
      );
      
      const remainingQuantity = lineItem.quantity - existingBatchQuantity;
      
      // Only suggest batches if there's remaining quantity
      if (remainingQuantity > 0) {
        const suggestedBatches = generateBatchSuggestions(
          { ...lineItem, quantity: remainingQuantity },
          order.priority,
          workstations,
          config
        );

        suggestions.push({
          lineItemId: lineItem.id,
          partNumber: lineItem.part.partNumber,
          partName: lineItem.part.partName,
          totalQuantity: remainingQuantity,
          suggestedBatches,
        });
      }
    }

    // Calculate summary statistics
    const totalSuggestedBatches = suggestions.reduce(
      (sum, suggestion) => sum + suggestion.suggestedBatches.length,
      0
    );
    
    const estimatedCompletionDays = Math.max(
      ...suggestions.flatMap(s => s.suggestedBatches.map(b => b.estimatedDuration))
    );

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        orderNumber: order.systemOrderId,
        customerName: order.customer.name,
        orderPriority: order.priority,
        suggestions,
        summary: {
          totalLineItems: suggestions.length,
          totalBatches: totalSuggestedBatches,
          estimatedCompletionDays,
          canAutoGenerate: suggestions.length > 0,
        },
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

// PUT /api/orders/[id]/generate-batches - Create batches from approved suggestions
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await params; // Validate params exist
    const { approvedSuggestions } = await request.json();

    if (!approvedSuggestions || !Array.isArray(approvedSuggestions)) {
      return NextResponse.json(
        { success: false, error: 'Invalid approved suggestions format' },
        { status: 400 }
      );
    }

    const createdBatches: any[] = [];

    // Create batches in a transaction with smart routing
    await prisma.$transaction(async (tx) => {
      for (const suggestion of approvedSuggestions) {
        for (const batch of suggestion.suggestedBatches) {
          const batchId = await generateBatchId(tx);

          // Get the part information for smart routing
          const lineItem = await tx.orderLineItem.findUnique({
            where: { id: suggestion.lineItemId },
            include: { part: true }
          });

          if (!lineItem) continue;

          // Calculate estimated completion date
          const estimatedCompletion = new Date();
          estimatedCompletion.setDate(estimatedCompletion.getDate() + batch.estimatedDuration);

          // Create the batch
          const newBatch = await tx.batch.create({
            data: {
              batchId,
              lineItemId: suggestion.lineItemId,
              quantity: batch.quantity,
              priority: batch.priority,
              notes: `Auto-generated: ${batch.reasoning}`,
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
            },
          });

          // *** CREATE ROUTING STEPS FROM WORKFLOW STEPS ***
          if (batch.workflowSteps && batch.workflowSteps.length > 0) {
            // Get workstations for assignment
            const workstations = await tx.workstation.findMany({
              where: { active: true }
            });

            for (const workflowStep of batch.workflowSteps) {
              // Assign workstation if not already assigned
              let workstationId = workflowStep.workstationId;
              if (!workstationId) {
                // Find a suitable workstation (fallback to first available)
                const suitableWorkstation = workstations[0];
                workstationId = suitableWorkstation?.id || '';
              }

              if (workstationId) {
                await tx.routingStep.create({
                  data: {
                    batchId: newBatch.id,
                    stepNumber: workflowStep.stepNumber,
                    workstationId: workstationId,
                    description: workflowStep.description,
                    required: true,
                    estimatedTime: workflowStep.estimatedTime,
                    notes: 'Generated from smart batch workflow steps',
                    status: workflowStep.status || 'PENDING'
                  }
                });
              }
            }
          } else {
            // Fallback to legacy smart routing generation if no workflow steps
            await generateSmartRoutingForBatch(tx, newBatch, lineItem.part);
          }

          createdBatches.push(newBatch);
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        createdBatches: createdBatches.length,
        batches: createdBatches,
      },
      message: `Successfully created ${createdBatches.length} batches with smart routing`,
    });
  } catch (error) {
    console.error('Error creating batches from suggestions:', error);
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

// Helper function to generate batch ID
async function generateBatchId(tx: any): Promise<string> {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
  
  // Get the last batch number for today
  const lastBatch = await tx.batch.findFirst({
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

  return `DES-${dateStr.slice(2)}-${batchNumber.toString().padStart(3, '0')}`;
}
