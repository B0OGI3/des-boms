/**
 * BOM (Bill of Materials) API
 * Manages hierarchical BOM structures with proper part type relationships
 * - Finished Goods (FG-) can contain Semi-Finished (SF-) and Raw Materials (RM-)
 * - Semi-Finished (SF-) can contain Raw Materials (RM-)
 * - Raw Materials (RM-) cannot contain other components
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { 
  getFullBOMStructure, 
  validateBOMComponentAddition, 
  getRawMaterialsForPart,
  getBOMManufacturingSequence
} from '../../../lib/bomUtils';

/**
 * GET /api/bom - Get hierarchical BOM structure for a part
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const partId = searchParams.get('partId');
    const partNumber = searchParams.get('partNumber');
    const quantity = parseInt(searchParams.get('quantity') || '1');
    const materialsOnly = searchParams.get('materialsOnly') === 'true';
    const manufacturingSequence = searchParams.get('manufacturingSequence') === 'true';

    if (!partId && !partNumber) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Either partId or partNumber must be provided' 
        },
        { status: 400 }
      );
    }

    // Find the part
    let targetPartId = partId;
    if (!targetPartId && partNumber) {
      const part = await prisma.part.findUnique({
        where: { partNumber },
        select: { id: true }
      });
      if (!part) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Part not found' 
          },
          { status: 404 }
        );
      }
      targetPartId = part.id;
    }

    // Handle different response types
    if (materialsOnly) {
      const materials = await getRawMaterialsForPart(targetPartId!, quantity);
      return NextResponse.json({
        success: true,
        data: {
          partId: targetPartId,
          quantity,
          rawMaterials: materials,
          totalRawMaterialCost: materials.reduce((sum, mat) => sum + mat.totalCost, 0)
        }
      });
    }

    if (manufacturingSequence) {
      const sequence = await getBOMManufacturingSequence(targetPartId!, quantity);
      return NextResponse.json({
        success: true,
        data: {
          partId: targetPartId,
          quantity,
          manufacturingSteps: sequence
        }
      });
    }

    // Get full BOM structure
    const bomStructure = await getFullBOMStructure(targetPartId!, quantity);

    if (!bomStructure) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Part not found or no BOM structure available' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: bomStructure
    });

  } catch (error) {
    console.error('Error fetching BOM:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch BOM',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bom - Add a component to a BOM with hierarchy validation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      parentPartId,
      childPartId,
      quantity,
      unitOfMeasure,
      scrapFactor,
      operation,
      notes
    } = body;

    // Validate required fields
    if (!parentPartId || !childPartId || !quantity) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: parentPartId, childPartId, quantity' 
        },
        { status: 400 }
      );
    }

    // Validate BOM component addition (hierarchy rules + circular references)
    const validation = await validateBOMComponentAddition(parentPartId, childPartId);
    if (!validation.valid) {
      return NextResponse.json(
        { 
          success: false, 
          error: validation.error 
        },
        { status: 400 }
      );
    }

    // Get child part to inherit unit of measure if not provided
    const childPart = await prisma.part.findUnique({ 
      where: { id: childPartId },
      select: { unitOfMeasure: true, partType: true, partNumber: true }
    });

    // Create the BOM component
    const bomComponent = await prisma.bOMComponent.create({
      data: {
        parentPartId,
        childPartId,
        quantity: parseFloat(quantity),
        unitOfMeasure: unitOfMeasure || childPart?.unitOfMeasure,
        scrapFactor: scrapFactor ? parseFloat(scrapFactor) : null,
        operation,
        notes
      },
      include: {
        parentPart: {
          select: {
            id: true,
            partNumber: true,
            partName: true,
            partType: true
          }
        },
        childPart: {
          select: {
            id: true,
            partNumber: true,
            partName: true,
            partType: true,
            standardCost: true,
            unitOfMeasure: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: bomComponent,
      message: `Successfully added ${bomComponent.childPart.partNumber} to ${bomComponent.parentPart.partNumber} BOM`
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating BOM component:', error);
    
    // Handle unique constraint violations
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'This component relationship already exists in the BOM'
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create BOM component',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
