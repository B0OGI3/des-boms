/**
 * Parts Master API
 * Manages parts with unique IDs, BOM structures, and material types
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { generatePartNumber, getPartTypeDescription } from '../../../lib/partNumberGenerator';
import { validateBOMHierarchy } from '../../../lib/bomUtils';

interface WhereClause {
  partType?: 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
  OR?: Array<{
    partNumber?: { contains: string; mode: 'insensitive' };
    partName?: { contains: string; mode: 'insensitive' };
    description?: { contains: string; mode: 'insensitive' };
  }>;
}

/**
 * GET /api/parts - List all parts with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const partType = searchParams.get('partType') as 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL' | null;
    const search = searchParams.get('search');
    const includeBOM = searchParams.get('includeBOM') === 'true';

    const where: WhereClause = {};
    
    if (partType) {
      where.partType = partType;
    }
    
    if (search) {
      where.OR = [
        { partNumber: { contains: search, mode: 'insensitive' } },
        { partName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const parts = await prisma.part.findMany({
      where,
      include: {
        parentBOMs: includeBOM ? {
          include: {
            childPart: true
          }
        } : false,
        childBOMs: includeBOM ? {
          include: {
            parentPart: true
          }
        } : false,
        orderLineItems: {
          include: {
            purchaseOrder: {
              include: {
                customer: true
              }
            }
          }
        },
        _count: {
          select: {
            parentBOMs: true,
            childBOMs: true,
            orderLineItems: true
          }
        }
      },
      orderBy: {
        partNumber: 'asc'
      }
    });

    // Add part type descriptions
    const enhancedParts = parts.map((part) => ({
      ...part,
      partTypeDescription: getPartTypeDescription(part.partType)
    }));

    return NextResponse.json({
      success: true,
      data: enhancedParts,
      meta: {
        total: parts.length,
        filters: {
          partType,
          search,
          includeBOM
        }
      }
    });

  } catch (error) {
    console.error('Error fetching parts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch parts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function to validate BOM components
async function validateBOMComponents(bomData: any, partType: string) {
  if (!bomData?.components?.length) {
    return { isValid: true };
  }

  try {
    // Get child parts for validation
    const childPartIds = bomData.components.map((comp: any) => comp.childPartId);
    const childParts = await prisma.part.findMany({
      where: { id: { in: childPartIds } },
      select: { id: true, partType: true, partNumber: true }
    });

    // Validate that all child parts exist
    const foundPartIds = childParts.map(p => p.id);
    const missingPartIds = childPartIds.filter((id: string) => !foundPartIds.includes(id));
    if (missingPartIds.length > 0) {
      return {
        isValid: false,
        error: 'Some component parts not found',
        details: `Missing part IDs: ${missingPartIds.join(', ')}`
      };
    }

    // Basic hierarchy validation - prevent infinite loops
    for (const childPart of childParts) {
      const hierarchyCheck = validateBOMHierarchy(partType as any, childPart.partType);
      if (!hierarchyCheck.valid) {
        return {
          isValid: false,
          error: 'BOM hierarchy validation failed',
          details: `${childPart.partNumber}: ${hierarchyCheck.error || 'Hierarchy validation failed'}`
        };
      }
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: 'BOM validation failed',
      details: error instanceof Error ? error.message : 'Unknown validation error'
    };
  }
}

// Helper function to create BOM entries
async function createBOMEntries(tx: any, parentPartId: string, bomData: any) {
  if (!bomData?.components?.length) {
    return;
  }

  const bomEntries = bomData.components.map((comp: any) => ({
    parentPartId,
    childPartId: comp.childPartId,
    quantity: parseFloat(comp.quantity.toString()),
    unitOfMeasure: comp.unitOfMeasure || 'EA',
    notes: comp.notes || null
  }));

  await tx.bOMComponent.createMany({
    data: bomEntries
  });
}

// Helper function to parse request body
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

// Helper function to validate part data
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
    notes
  } = partData;

  if (!partName || !partType) {
    return {
      isValid: false,
      error: 'Missing required fields: partName, partType'
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
      notes
    }
  };
}

// Helper function to create part data object
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
    standardCost: validatedData.standardCost ? parseFloat(validatedData.standardCost.toString()) : null,
    leadTime: validatedData.leadTime ? parseInt(validatedData.leadTime.toString()) : null,
    active: Boolean(validatedData.active),
    notes: validatedData.notes || null
  };
}

/**
 * POST /api/parts - Create a new part with optional BOM
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Parse request body format
    const { partData, bomData } = parseRequestBody(body);

    // Validate part data
    const validation = validatePartData(partData);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: validation.error
        },
        { status: 400 }
      );
    }

    const validatedData = validation.data!;

    // Use provided part number or generate one
    let partNumber = validatedData.providedPartNumber;
    if (!partNumber) {
      partNumber = await generatePartNumber({ partType: validatedData.partType });
    }

    // Check if part number already exists
    const existingPart = await prisma.part.findUnique({
      where: { partNumber },
      select: { id: true }
    });

    if (existingPart) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Part number already exists',
          details: `Part number "${partNumber}" is already in use`
        },
        { status: 409 }
      );
    }

    // Validate BOM components if provided
    const bomValidation = await validateBOMComponents(bomData, validatedData.partType);
    if (!bomValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: bomValidation.error || 'BOM validation failed',
          details: bomValidation.details
        },
        { status: 400 }
      );
    }

    // Use transaction to create part and BOM atomically
    const result = await prisma.$transaction(async (tx) => {
      // Create the part
      const partDataObj = createPartDataObject(validatedData, partNumber);
      const newPart = await tx.part.create({ data: partDataObj });

      // Create BOM entries if provided
      await createBOMEntries(tx, newPart.id, bomData);

      return newPart;
    });

    // Fetch the complete part with BOM for response
    const partWithBOM = await prisma.part.findUnique({
      where: { id: result.id },
      include: {
        parentBOMs: {
          include: {
            childPart: {
              select: {
                id: true,
                partNumber: true,
                partName: true,
                partType: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        ...partWithBOM,
        partTypeDescription: getPartTypeDescription(result.partType)
      },
      message: bomData?.components?.length 
        ? `Part created successfully with ${bomData.components.length} BOM components`
        : 'Part created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating part:', error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Part number already exists',
            details: 'This part number is already in use'
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create part',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
