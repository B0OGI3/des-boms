/**
 * BOM (Bill of Materials) API
 * Manages BOM structures and component relationships
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

/**
 * GET /api/bom - Get BOM structure for a part
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const partId = searchParams.get('partId');
    const partNumber = searchParams.get('partNumber');
    const levels = parseInt(searchParams.get('levels') || '1');

    if (!partId && !partNumber) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Either partId or partNumber must be provided' 
        },
        { status: 400 }
      );
    }

    // Find the parent part
    const whereClause = partId ? { id: partId } : { partNumber: partNumber! };
    const parentPart = await prisma.part.findUnique({
      where: whereClause,
      include: {
        childBOMs: {
          include: {
            childPart: {
              include: {
                childBOMs: levels > 1 ? {
                  include: {
                    childPart: true
                  }
                } : false
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

    if (!parentPart) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Part not found' 
        },
        { status: 404 }
      );
    }

    // Calculate total material costs
    let totalMaterialCost = 0;
    const bomStructure = parentPart.childBOMs.map((bom: any) => {
      const componentCost = (parseFloat(bom.childPart.standardCost) || 0) * parseFloat(bom.quantity);
      totalMaterialCost += componentCost;
      
      return {
        id: bom.id,
        quantity: bom.quantity,
        unitOfMeasure: bom.unitOfMeasure,
        scrapFactor: bom.scrapFactor,
        operation: bom.operation,
        notes: bom.notes,
        componentCost,
        childPart: {
          id: bom.childPart.id,
          partNumber: bom.childPart.partNumber,
          partName: bom.childPart.partName,
          partType: bom.childPart.partType,
          description: bom.childPart.description,
          standardCost: bom.childPart.standardCost,
          unitOfMeasure: bom.childPart.unitOfMeasure,
          subComponents: levels > 1 ? bom.childPart.childBOMs.length : 0
        }
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        parentPart: {
          id: parentPart.id,
          partNumber: parentPart.partNumber,
          partName: parentPart.partName,
          partType: parentPart.partType,
          description: parentPart.description,
          standardCost: parentPart.standardCost
        },
        bomComponents: bomStructure,
        summary: {
          totalComponents: bomStructure.length,
          totalMaterialCost,
          levels
        }
      }
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
 * POST /api/bom - Add a component to a BOM
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

    // Check if parts exist
    const [parentPart, childPart] = await Promise.all([
      prisma.part.findUnique({ where: { id: parentPartId } }),
      prisma.part.findUnique({ where: { id: childPartId } })
    ]);

    if (!parentPart || !childPart) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Parent part or child part not found' 
        },
        { status: 404 }
      );
    }

    // Check for circular references
    if (parentPartId === childPartId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'A part cannot be a component of itself' 
        },
        { status: 400 }
      );
    }

    // Create the BOM component
    const bomComponent = await prisma.bOMComponent.create({
      data: {
        parentPartId,
        childPartId,
        quantity: parseFloat(quantity),
        unitOfMeasure: unitOfMeasure || childPart.unitOfMeasure,
        scrapFactor: scrapFactor ? parseFloat(scrapFactor) : null,
        operation,
        notes
      },
      include: {
        parentPart: true,
        childPart: true
      }
    });

    return NextResponse.json({
      success: true,
      data: bomComponent
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating BOM component:', error);
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
