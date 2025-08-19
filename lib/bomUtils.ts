/**
 * BOM (Bill of Materials) Utilities for DES-BOMS
 * 
 * Handles hierarchical BOM structures:
 * - Finished Goods (FG-) can contain Semi-Finished (SF-) and Raw Materials (RM-)
 * - Semi-Finished (SF-) can contain Raw Materials (RM-)
 * - Raw Materials (RM-) are base components (no sub-components)
 */

import { PrismaClient, PartType } from '../generated/prisma';

const prisma = new PrismaClient();

export interface BOMComponent {
  id: string;
  quantity: number;
  unitOfMeasure?: string;
  scrapFactor?: number;
  operation?: string;
  notes?: string;
  childPart: {
    id: string;
    partNumber: string;
    partName: string;
    partType: PartType;
    description?: string;
    standardCost?: number;
    unitOfMeasure?: string;
  };
  subComponents?: BOMComponent[];
  totalRequiredQuantity?: number; // Calculated based on parent requirements
}

export interface BOMStructure {
  parentPart: {
    id: string;
    partNumber: string;
    partName: string;
    partType: PartType;
    description?: string;
    standardCost?: number;
  };
  components: BOMComponent[];
  materialRequirements: MaterialRequirement[];
  totalMaterialCost: number;
  levels: number;
}

export interface MaterialRequirement {
  partId: string;
  partNumber: string;
  partName: string;
  partType: PartType;
  totalQuantityRequired: number;
  unitOfMeasure?: string;
  standardCost?: number;
  totalCost: number;
  sources: {
    fromComponent: string; // Which parent component requires this
    quantity: number;
    operation?: string;
  }[];
}

/**
 * Validate BOM hierarchy rules
 */
export function validateBOMHierarchy(parentType: PartType, childType: PartType): { valid: boolean; error?: string } {
  switch (parentType) {
    case 'FINISHED':
      // Finished goods can contain SF or RM
      if (childType === 'SEMI_FINISHED' || childType === 'RAW_MATERIAL') {
        return { valid: true };
      }
      return { valid: false, error: 'Finished goods can only contain Semi-Finished parts or Raw Materials' };
    
    case 'SEMI_FINISHED':
      // Semi-finished can only contain RM
      if (childType === 'RAW_MATERIAL') {
        return { valid: true };
      }
      return { valid: false, error: 'Semi-Finished parts can only contain Raw Materials' };
    
    case 'RAW_MATERIAL':
      // Raw materials cannot contain other parts
      return { valid: false, error: 'Raw Materials cannot contain other components' };
    
    default:
      return { valid: false, error: 'Unknown part type' };
  }
}

/**
 * Get full BOM structure with all levels
 */
export async function getFullBOMStructure(partId: string, requiredQuantity: number = 1): Promise<BOMStructure | null> {
  const part = await prisma.part.findUnique({
    where: { id: partId },
    include: {
      childBOMs: {
        include: {
          childPart: {
            include: {
              childBOMs: {
                include: {
                  childPart: true
                }
              }
            }
          }
        },
        orderBy: {
          childPart: {
            partNumber: 'asc'
          }
        }
      }
    }
  });

  if (!part) {
    return null;
  }

  const materialRequirements: Map<string, MaterialRequirement> = new Map();
  let totalMaterialCost = 0;

  // Recursively process BOM components
  function processComponents(components: any[], parentQuantity: number, level: number, parentName: string): BOMComponent[] {
    return components.map(bom => {
      const requiredQty = parseFloat(bom.quantity.toString()) * parentQuantity;
      const scrapFactor = bom.scrapFactor ? parseFloat(bom.scrapFactor.toString()) : 0;
      const totalQtyWithScrap = requiredQty * (1 + scrapFactor);
      
      const component: BOMComponent = {
        id: bom.id,
        quantity: parseFloat(bom.quantity.toString()),
        unitOfMeasure: bom.unitOfMeasure,
        scrapFactor: bom.scrapFactor ? parseFloat(bom.scrapFactor.toString()) : undefined,
        operation: bom.operation,
        notes: bom.notes,
        totalRequiredQuantity: totalQtyWithScrap,
        childPart: {
          id: bom.childPart.id,
          partNumber: bom.childPart.partNumber,
          partName: bom.childPart.partName,
          partType: bom.childPart.partType,
          description: bom.childPart.description,
          standardCost: bom.childPart.standardCost ? parseFloat(bom.childPart.standardCost.toString()) : undefined,
          unitOfMeasure: bom.childPart.unitOfMeasure
        }
      };

      // Process sub-components if they exist
      if (bom.childPart.childBOMs && bom.childPart.childBOMs.length > 0) {
        component.subComponents = processComponents(
          bom.childPart.childBOMs, 
          totalQtyWithScrap, 
          level + 1, 
          bom.childPart.partName
        );
      }

      // Track material requirements
      const partId = bom.childPart.id;
      if (materialRequirements.has(partId)) {
        const existing = materialRequirements.get(partId)!;
        existing.totalQuantityRequired += totalQtyWithScrap;
        existing.totalCost = existing.totalQuantityRequired * (existing.standardCost || 0);
        existing.sources.push({
          fromComponent: parentName,
          quantity: totalQtyWithScrap,
          operation: bom.operation
        });
      } else {
        const standardCost = component.childPart.standardCost || 0;
        const totalCost = totalQtyWithScrap * standardCost;
        totalMaterialCost += totalCost;

        materialRequirements.set(partId, {
          partId: bom.childPart.id,
          partNumber: bom.childPart.partNumber,
          partName: bom.childPart.partName,
          partType: bom.childPart.partType,
          totalQuantityRequired: totalQtyWithScrap,
          unitOfMeasure: bom.childPart.unitOfMeasure,
          standardCost,
          totalCost,
          sources: [{
            fromComponent: parentName,
            quantity: totalQtyWithScrap,
            operation: bom.operation
          }]
        });
      }

      return component;
    });
  }

  const components = processComponents(part.childBOMs, requiredQuantity, 1, part.partName);

  return {
    parentPart: {
      id: part.id,
      partNumber: part.partNumber,
      partName: part.partName,
      partType: part.partType,
      description: part.description || undefined,
      standardCost: part.standardCost ? parseFloat(part.standardCost.toString()) : undefined
    },
    components,
    materialRequirements: Array.from(materialRequirements.values()),
    totalMaterialCost,
    levels: getMaxLevel(components)
  };
}

/**
 * Get maximum depth of BOM structure
 */
function getMaxLevel(components: BOMComponent[]): number {
  if (components.length === 0) return 0;
  
  let maxLevel = 1;
  for (const component of components) {
    if (component.subComponents) {
      const subLevel = 1 + getMaxLevel(component.subComponents);
      maxLevel = Math.max(maxLevel, subLevel);
    }
  }
  return maxLevel;
}

/**
 * Calculate material requirements for a batch
 */
export async function calculateBatchMaterialRequirements(batchId: string): Promise<MaterialRequirement[]> {
  const batch = await prisma.batch.findUnique({
    where: { id: batchId },
    include: {
      lineItem: {
        include: {
          part: true
        }
      }
    }
  });

  if (!batch) {
    throw new Error('Batch not found');
  }

  const bomStructure = await getFullBOMStructure(batch.lineItem.partId, batch.quantity);
  
  if (!bomStructure) {
    throw new Error('Could not retrieve BOM structure for batch');
  }

  return bomStructure.materialRequirements;
}

/**
 * Validate that a BOM component relationship is allowed
 */
export async function validateBOMComponentAddition(parentPartId: string, childPartId: string): Promise<{ valid: boolean; error?: string }> {
  // Check if parts exist and get their types
  const [parentPart, childPart] = await Promise.all([
    prisma.part.findUnique({ where: { id: parentPartId }, select: { partType: true, partNumber: true } }),
    prisma.part.findUnique({ where: { id: childPartId }, select: { partType: true, partNumber: true } })
  ]);

  if (!parentPart || !childPart) {
    return { valid: false, error: 'Parent part or child part not found' };
  }

  // Check hierarchy rules
  const hierarchyCheck = validateBOMHierarchy(parentPart.partType, childPart.partType);
  if (!hierarchyCheck.valid) {
    return hierarchyCheck;
  }

  // Check for circular references by seeing if parent is used in child's BOM
  const circularCheck = await checkCircularReference(parentPartId, childPartId);
  if (!circularCheck.valid) {
    return circularCheck;
  }

  return { valid: true };
}

/**
 * Check for circular references in BOM structure
 */
async function checkCircularReference(parentPartId: string, childPartId: string): Promise<{ valid: boolean; error?: string }> {
  // Simple check: ensure parent is not in child's BOM tree
  const childBomStructure = await getFullBOMStructure(childPartId);
  
  if (childBomStructure) {
    const containsParent = checkIfPartExistsInBOM(childBomStructure.components, parentPartId);
    if (containsParent) {
      return { valid: false, error: 'Adding this component would create a circular reference' };
    }
  }

  return { valid: true };
}

/**
 * Check if a part ID exists anywhere in a BOM structure
 */
function checkIfPartExistsInBOM(components: BOMComponent[], partId: string): boolean {
  for (const component of components) {
    if (component.childPart.id === partId) {
      return true;
    }
    if (component.subComponents && checkIfPartExistsInBOM(component.subComponents, partId)) {
      return true;
    }
  }
  return false;
}

/**
 * Get all raw materials required for a finished good or semi-finished part
 */
export async function getRawMaterialsForPart(partId: string, quantity: number = 1): Promise<MaterialRequirement[]> {
  const bomStructure = await getFullBOMStructure(partId, quantity);
  
  if (!bomStructure) {
    return [];
  }

  // Filter to only raw materials
  return bomStructure.materialRequirements.filter(req => req.partType === 'RAW_MATERIAL');
}

/**
 * Export BOM structure to a flat list for manufacturing planning
 */
export interface ManufacturingStep {
  level: number;
  partId: string;
  partNumber: string;
  partName: string;
  partType: PartType;
  quantity: number;
  operation?: string;
  dependencies: string[]; // Part IDs that must be completed first
}

export async function getBOMManufacturingSequence(partId: string, quantity: number = 1): Promise<ManufacturingStep[]> {
  const bomStructure = await getFullBOMStructure(partId, quantity);
  
  if (!bomStructure) {
    return [];
  }

  const steps: ManufacturingStep[] = [];
  
  function processLevel(components: BOMComponent[], level: number, parentDependencies: string[] = []) {
    for (const component of components) {
      const step: ManufacturingStep = {
        level,
        partId: component.childPart.id,
        partNumber: component.childPart.partNumber,
        partName: component.childPart.partName,
        partType: component.childPart.partType,
        quantity: component.totalRequiredQuantity || component.quantity,
        operation: component.operation,
        dependencies: [...parentDependencies]
      };

      steps.push(step);

      if (component.subComponents) {
        processLevel(component.subComponents, level + 1, [...parentDependencies, component.childPart.id]);
      }
    }
  }

  processLevel(bomStructure.components, 1);
  
  // Sort by level (deeper levels first, so dependencies are built first)
  return steps.sort((a, b) => b.level - a.level);
}

/**
 * Integration utility for Smart Batch Generation
 * Suggests routing steps based on BOM structure and part types
 */
export async function generateBOMBasedRoutingSteps(partId: string, quantity: number = 1): Promise<{
  suggestedSteps: Array<{
    stepNumber: number;
    operation: string;
    description: string;
    estimatedTime: number;
    required: boolean;
    partType: PartType;
    partNumber: string;
    materialRequirements?: string[];
  }>;
  materialRequirements: MaterialRequirement[];
}> {
  const bomStructure = await getFullBOMStructure(partId, quantity);
  
  if (!bomStructure) {
    return { suggestedSteps: [], materialRequirements: [] };
  }

  const suggestedSteps: any[] = [];
  let stepNumber = 1;

  // Get the manufacturing sequence
  const manufacturingSteps = await getBOMManufacturingSequence(partId, quantity);
  
  // Group by part type to create logical manufacturing steps
  const finishedParts = manufacturingSteps.filter(step => step.partType === 'FINISHED');
  const semiFinishedParts = manufacturingSteps.filter(step => step.partType === 'SEMI_FINISHED');
  const rawMaterialParts = manufacturingSteps.filter(step => step.partType === 'RAW_MATERIAL');

  // 1. Material Preparation Steps (Raw Materials)
  if (rawMaterialParts.length > 0) {
    suggestedSteps.push({
      stepNumber: stepNumber++,
      operation: 'PREP',
      description: 'Material preparation and cutting',
      estimatedTime: rawMaterialParts.length * 15, // 15 min per material type
      required: true,
      partType: 'RAW_MATERIAL',
      partNumber: 'PREP-MATERIALS',
      materialRequirements: rawMaterialParts.map(rm => `${rm.partNumber}: ${rm.quantity} units`)
    });
  }

  // 2. Semi-Finished Manufacturing Steps
  semiFinishedParts.forEach(sfPart => {
    // Determine operation based on part name/description
    let operation = 'MACHINING';
    let estimatedTime = 120; // Default 2 hours
    
    if (sfPart.partName.toLowerCase().includes('weld')) {
      operation = 'WELDING';
      estimatedTime = 90;
    } else if (sfPart.partName.toLowerCase().includes('cast')) {
      operation = 'CASTING';
      estimatedTime = 240;
    } else if (sfPart.partName.toLowerCase().includes('form')) {
      operation = 'FORMING';
      estimatedTime = 60;
    }

    suggestedSteps.push({
      stepNumber: stepNumber++,
      operation,
      description: `Manufacture ${sfPart.partName}`,
      estimatedTime,
      required: true,
      partType: sfPart.partType,
      partNumber: sfPart.partNumber,
      materialRequirements: sfPart.dependencies.length > 0 
        ? [`Requires: ${sfPart.dependencies.join(', ')}`]
        : undefined
    });
  });

  // 3. Assembly Steps (Finished Goods)
  finishedParts.forEach(fgPart => {
    suggestedSteps.push({
      stepNumber: stepNumber++,
      operation: 'ASSEMBLY',
      description: `Assemble ${fgPart.partName}`,
      estimatedTime: 90, // 1.5 hours for assembly
      required: true,
      partType: fgPart.partType,
      partNumber: fgPart.partNumber,
      materialRequirements: fgPart.dependencies.length > 0 
        ? [`Components: ${fgPart.dependencies.join(', ')}`]
        : undefined
    });
  });

  // 4. Final Steps
  suggestedSteps.push({
    stepNumber: stepNumber++,
    operation: 'INSPECTION',
    description: 'Final quality inspection',
    estimatedTime: 30,
    required: true,
    partType: 'FINISHED',
    partNumber: bomStructure.parentPart.partNumber,
    materialRequirements: ['QC checklist', 'Measuring tools']
  });

  suggestedSteps.push({
    stepNumber: stepNumber++,
    operation: 'PACKAGING',
    description: 'Final packaging and labeling',
    estimatedTime: 15,
    required: false,
    partType: 'FINISHED',
    partNumber: bomStructure.parentPart.partNumber,
    materialRequirements: ['Packaging materials', 'Labels']
  });

  return {
    suggestedSteps,
    materialRequirements: bomStructure.materialRequirements
  };
}
