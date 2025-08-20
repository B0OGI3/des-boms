/**
 * Individual Parts API
 * Manages individual part operations: GET, PUT, DELETE
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getPartTypeDescription } from '../../../../lib/partNumberGenerator';
import { validateBOMHierarchy } from '../../../../lib/bomUtils';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/parts/[id] - Get a specific part by ID
 */
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const part = await prisma.part.findUnique({
      where: { id },
      include: {
        parentBOMs: {
          include: {
            childPart: {
              select: {
                id: true,
                partNumber: true,
                partName: true,
                partType: true,
              },
            },
          },
        },
        childBOMs: {
          include: {
            parentPart: {
              select: {
                id: true,
                partNumber: true,
                partName: true,
                partType: true,
              },
            },
          },
        },
        orderLineItems: {
          include: {
            purchaseOrder: {
              include: {
                customer: true,
              },
            },
          },
        },
        _count: {
          select: {
            parentBOMs: true,
            childBOMs: true,
            orderLineItems: true,
          },
        },
      },
    });

    if (!part) {
      return NextResponse.json(
        {
          success: false,
          error: 'Part not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...part,
        partTypeDescription: getPartTypeDescription(part.partType),
      },
    });
  } catch (error) {
    console.error('Error fetching part:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch part',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/parts/[id] - Update a specific part
 */
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Parse request body format
    const { partData, bomData } = parseRequestBody(body);

    // Check if part exists
    const existingPart = await getExistingPart(id);
    if (!existingPart) {
      return NextResponse.json(
        {
          success: false,
          error: 'Part not found',
        },
        { status: 404 }
      );
    }

    // Validate part data
    const validationResult = await validatePartUpdate(
      partData,
      bomData,
      existingPart,
      id
    );
    if (validationResult.error) {
      return validationResult.error;
    }

    const validatedData = validationResult.data;

    // Update part and BOM
    const result = await updatePartWithTransaction(
      id,
      validatedData,
      bomData,
      existingPart
    );

    // Return complete updated part
    return await getUpdatedPartResponse(result.id);
  } catch (error) {
    console.error('Error updating part:', error);
    return handleUpdateError(error);
  }
}

// Helper function to get existing part
async function getExistingPart(id: string) {
  return await prisma.part.findUnique({
    where: { id },
    select: { id: true, partNumber: true, partType: true },
  });
}

// Helper function to validate part update
async function validatePartUpdate(
  partData: any,
  bomData: any,
  existingPart: any,
  id: string
) {
  // Validate part data
  const validation = validatePartData(partData);
  if (!validation.isValid) {
    return {
      error: NextResponse.json(
        {
          success: false,
          error: validation.error,
        },
        { status: 400 }
      ),
    };
  }

  const validatedData = validation.data!;

  // Check for part number conflicts
  const conflictError = await checkPartNumberConflict(
    validatedData,
    existingPart,
    id
  );
  if (conflictError) {
    return { error: conflictError };
  }

  // Validate BOM if provided
  const bomError = await validateBOMIfProvided(bomData, validatedData.partType);
  if (bomError) {
    return { error: bomError };
  }

  return { data: validatedData };
}

// Helper function to check part number conflicts
async function checkPartNumberConflict(
  validatedData: any,
  existingPart: any,
  id: string
) {
  if (
    validatedData.providedPartNumber &&
    validatedData.providedPartNumber !== existingPart.partNumber
  ) {
    const conflictingPart = await prisma.part.findUnique({
      where: { partNumber: validatedData.providedPartNumber },
      select: { id: true },
    });

    if (conflictingPart && conflictingPart.id !== id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Part number already exists',
          details: `Part number "${validatedData.providedPartNumber}" is already in use`,
        },
        { status: 409 }
      );
    }
  }
  return null;
}

// Helper function to validate BOM if provided
async function validateBOMIfProvided(bomData: any, partType: string) {
  if (bomData) {
    const bomValidation = await validateBOMComponents(bomData, partType);
    if (!bomValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: bomValidation.error || 'BOM validation failed',
          details: bomValidation.details,
        },
        { status: 400 }
      );
    }
  }
  return null;
}

// Helper function to update part with transaction
async function updatePartWithTransaction(
  id: string,
  validatedData: any,
  bomData: any,
  existingPart: any
) {
  return await prisma.$transaction(async tx => {
    // Update the part
    const partNumber =
      validatedData.providedPartNumber || existingPart.partNumber;
    const partDataObj = createPartDataObject(validatedData, partNumber);

    const updatedPart = await tx.part.update({
      where: { id },
      data: partDataObj,
    });

    // Update BOM if provided
    if (bomData !== null) {
      // Delete existing BOM components
      await tx.bOMComponent.deleteMany({
        where: { parentPartId: id },
      });

      // Create new BOM entries
      await createBOMEntries(tx, id, bomData);
    }

    return updatedPart;
  });
}

// Helper function to get updated part response
async function getUpdatedPartResponse(partId: string) {
  const partWithBOM = await prisma.part.findUnique({
    where: { id: partId },
    include: {
      parentBOMs: {
        include: {
          childPart: {
            select: {
              id: true,
              partNumber: true,
              partName: true,
              partType: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    success: true,
    data: {
      ...partWithBOM,
      partTypeDescription: getPartTypeDescription(partWithBOM!.partType),
    },
    message: 'Part updated successfully',
  });
}

// Helper function to handle update errors
function handleUpdateError(error: any) {
  // Handle specific Prisma errors
  if (error instanceof Error) {
    if (error.message.includes('Unique constraint')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Part number already exists',
          details: 'This part number is already in use',
        },
        { status: 409 }
      );
    }
  }

  return NextResponse.json(
    {
      success: false,
      error: 'Failed to update part',
      details: error instanceof Error ? error.message : 'Unknown error',
    },
    { status: 500 }
  );
}

/**
 * DELETE /api/parts/[id] - Delete a specific part
 */
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    // Check if part exists and get dependencies
    const existingPart = await getPartWithDependencies(id);
    if (!existingPart) {
      return NextResponse.json(
        {
          success: false,
          error: 'Part not found',
        },
        { status: 404 }
      );
    }

    // Check for dependencies that would prevent deletion
    const dependencyError = checkDeletionDependencies(existingPart);
    if (dependencyError) {
      return dependencyError;
    }

    // Delete part and related data
    await deletePartWithTransaction(id);

    return NextResponse.json({
      success: true,
      message: 'Part deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting part:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete part',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Helper function to get part with dependencies
async function getPartWithDependencies(id: string) {
  return await prisma.part.findUnique({
    where: { id },
    include: {
      orderLineItems: {
        select: {
          id: true,
          purchaseOrder: {
            select: {
              id: true,
              poNumber: true,
            },
          },
        },
      },
      parentBOMs: {
        select: {
          id: true,
          parentPart: {
            select: {
              id: true,
              partNumber: true,
              partName: true,
            },
          },
        },
      },
      childBOMs: {
        select: {
          id: true,
          childPart: {
            select: {
              id: true,
              partNumber: true,
              partName: true,
            },
          },
        },
      },
    },
  });
}

// Helper function to check deletion dependencies
function checkDeletionDependencies(part: any) {
  // Allow FG (Finished Goods) parts to be deleted regardless of dependencies
  if (part.partType === 'FINISHED') {
    console.log(
      `Allowing deletion of FG part ${part.partNumber} - ${part.partName} despite dependencies`
    );
    return null;
  }

  const dependencies = [];
  const details = [];

  // Check order dependencies
  const orderDependency = checkOrderDependencies(part);
  if (orderDependency) {
    dependencies.push(orderDependency.dependency);
    details.push(orderDependency.detail);
  }

  // Check BOM parent dependencies (parts that use this part)
  const parentDependency = checkParentBOMDependencies(part);
  if (parentDependency) {
    dependencies.push(parentDependency.dependency);
    details.push(...parentDependency.details);
  }

  // Check BOM child dependencies (parts this part uses)
  const childDependency = checkChildBOMDependencies(part);
  if (childDependency) {
    dependencies.push(childDependency.dependency);
    details.push(childDependency.detail);
  }

  if (dependencies.length > 0) {
    const partTypeNote = getPartTypeNote(part.partType);
    return NextResponse.json(
      {
        success: false,
        error: 'Cannot delete part with dependencies',
        details: `This part has dependencies: ${dependencies.join(', ')}.\n\nSpecific dependencies:\n${details.join('\n')}${partTypeNote}`,
      },
      { status: 400 }
    );
  }

  return null;
}

// Helper function to check order dependencies
function checkOrderDependencies(part: any) {
  if (part.orderLineItems.length > 0) {
    const orderNumbers = part.orderLineItems
      .map((item: any) => item.purchaseOrder.poNumber)
      .join(', ');
    return {
      dependency: `${part.orderLineItems.length} order line items`,
      detail: `Orders: ${orderNumbers}`,
    };
  }
  return null;
}

// Helper function to check parent BOM dependencies
function checkParentBOMDependencies(part: any) {
  if (part.parentBOMs.length === 0) return null;

  if (part.partType === 'SEMI_FINISHED') {
    return checkSFParentDependencies(part);
  } else {
    // For RM parts, all parent relationships block deletion
    const parentParts = part.parentBOMs
      .map(
        (bom: any) =>
          `${bom.parentPart.partNumber} (${bom.parentPart.partName})`
      )
      .join(', ');
    return {
      dependency: `${part.parentBOMs.length} BOM components`,
      details: [`Used as component in: ${parentParts}`],
    };
  }
}

// Helper function to check SF part dependencies specifically
function checkSFParentDependencies(part: any) {
  const fgParents = part.parentBOMs.filter(
    (bom: any) => bom.parentPart.partType === 'FINISHED'
  );
  const nonFgParents = part.parentBOMs.filter(
    (bom: any) => bom.parentPart.partType !== 'FINISHED'
  );

  const details = [];
  let dependency = null;

  if (fgParents.length > 0) {
    dependency = `${fgParents.length} FG assemblies`;
    const fgParentParts = fgParents
      .map(
        (bom: any) =>
          `${bom.parentPart.partNumber} (${bom.parentPart.partName})`
      )
      .join(', ');
    details.push(`Used in FG parts: ${fgParentParts}`);
  }

  // For non-FG parents, just show info but don't block deletion
  if (nonFgParents.length > 0) {
    const nonFgParentParts = nonFgParents
      .map(
        (bom: any) =>
          `${bom.parentPart.partNumber} (${bom.parentPart.partName})`
      )
      .join(', ');
    details.push(
      `Also used in SF/RM parts (won't block deletion): ${nonFgParentParts}`
    );
  }

  return dependency ? { dependency, details } : null;
}

// Helper function to check child BOM dependencies
function checkChildBOMDependencies(part: any) {
  if (part.childBOMs.length > 0) {
    const childParts = part.childBOMs
      .map(
        (bom: any) => `${bom.childPart.partNumber} (${bom.childPart.partName})`
      )
      .join(', ');
    return {
      dependency: `used in ${part.childBOMs.length} other parts' BOMs`,
      detail: `Has BOM components: ${childParts}`,
    };
  }
  return null;
}

// Helper function to get part type specific notes
function getPartTypeNote(partType: string) {
  return partType === 'SEMI_FINISHED'
    ? '\n\nNote: SF parts can be deleted unless used in FG assemblies. FG parts can always be deleted.'
    : '\n\nNote: FG parts can be deleted regardless of dependencies. SF parts can be deleted unless used in FG assemblies.';
}

// Helper function to delete part with transaction
async function deletePartWithTransaction(id: string) {
  await prisma.$transaction(async tx => {
    // Delete BOM components (if any remaining)
    await tx.bOMComponent.deleteMany({
      where: {
        OR: [{ parentPartId: id }, { childPartId: id }],
      },
    });

    // Delete the part
    await tx.part.delete({
      where: { id },
    });
  });
}

// Helper functions (reused from main parts route)
function parseRequestBody(body: any) {
  let partData;
  let bomData = null;

  if (body.part && body.bom !== undefined) {
    // New format: { part: {...}, bom: {...} }
    partData = body.part;
    bomData = body.bom;
  } else {
    // Old format: direct part properties
    partData = body;
  }

  return { partData, bomData };
}

function validatePartData(partData: any) {
  const {
    partNumber: providedPartNumber,
    partName,
    partType,
    drawingNumber,
    revisionLevel,
    description,
    materialSpec,
    unitOfMeasure,
    standardCost,
    leadTime,
    active = true,
    notes,
  } = partData;

  if (!partName || !partType) {
    return {
      isValid: false,
      error: 'Missing required fields: partName, partType',
    };
  }

  return {
    isValid: true,
    data: {
      providedPartNumber,
      partName,
      partType,
      drawingNumber,
      revisionLevel,
      description,
      materialSpec,
      unitOfMeasure,
      standardCost,
      leadTime,
      active,
      notes,
    },
  };
}

function createPartDataObject(validatedData: any, partNumber: string) {
  return {
    partNumber,
    partName: validatedData.partName,
    partType: validatedData.partType,
    drawingNumber: validatedData.drawingNumber || null,
    revisionLevel: validatedData.revisionLevel || null,
    description: validatedData.description || null,
    materialSpec: validatedData.materialSpec || null,
    unitOfMeasure: validatedData.unitOfMeasure || null,
    standardCost: validatedData.standardCost
      ? parseFloat(validatedData.standardCost.toString())
      : null,
    leadTime: validatedData.leadTime
      ? parseInt(validatedData.leadTime.toString())
      : null,
    active: Boolean(validatedData.active),
    notes: validatedData.notes || null,
  };
}

async function validateBOMComponents(bomData: any, partType: string) {
  if (!bomData?.components?.length) {
    return { isValid: true };
  }

  try {
    // Get child parts for validation
    const childPartIds = bomData.components.map(
      (comp: any) => comp.childPartId
    );
    const childParts = await prisma.part.findMany({
      where: { id: { in: childPartIds } },
      select: { id: true, partType: true, partNumber: true },
    });

    // Validate that all child parts exist
    const foundPartIds = childParts.map(p => p.id);
    const missingPartIds = childPartIds.filter(
      (id: string) => !foundPartIds.includes(id)
    );
    if (missingPartIds.length > 0) {
      return {
        isValid: false,
        error: 'Some component parts not found',
        details: `Missing part IDs: ${missingPartIds.join(', ')}`,
      };
    }

    // Basic hierarchy validation - prevent infinite loops
    for (const childPart of childParts) {
      const hierarchyCheck = validateBOMHierarchy(
        partType as any,
        childPart.partType
      );
      if (!hierarchyCheck.valid) {
        return {
          isValid: false,
          error: 'BOM hierarchy validation failed',
          details: `${childPart.partNumber}: ${hierarchyCheck.error || 'Hierarchy validation failed'}`,
        };
      }
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: 'BOM validation failed',
      details:
        error instanceof Error ? error.message : 'Unknown validation error',
    };
  }
}

async function createBOMEntries(tx: any, parentPartId: string, bomData: any) {
  if (!bomData?.components?.length) {
    return;
  }

  const bomEntries = bomData.components.map((comp: any) => ({
    parentPartId,
    childPartId: comp.childPartId,
    quantity: parseFloat(comp.quantity.toString()),
    unitOfMeasure: comp.unitOfMeasure || 'EA',
    notes: comp.notes || null,
  }));

  await tx.bOMComponent.createMany({
    data: bomEntries,
  });
}
