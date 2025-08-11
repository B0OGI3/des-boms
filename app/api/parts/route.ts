/**
 * Parts Master API
 * Manages parts with unique IDs, BOM structures, and material types
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { generatePartNumber, getPartTypeDescription } from '../../../lib/partNumberGenerator';

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

/**
 * POST /api/parts - Create a new part
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
    } = body;

    // Validate required fields
    if (!partName || !partType) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: partName, partType' 
        },
        { status: 400 }
      );
    }

    // Use provided part number or generate one
    let partNumber = providedPartNumber;
    if (!partNumber) {
      partNumber = await generatePartNumber({ partType });
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

    // Create the part
    const newPart = await prisma.part.create({
      data: {
        partNumber,
        partName,
        partType,
        drawingNumber: drawingNumber || null,
        revisionLevel: revisionLevel || null,
        description: description || null,
        materialSpec: materialSpec || null,
        unitOfMeasure: unitOfMeasure || null,
        standardCost: standardCost ? parseFloat(standardCost.toString()) : null,
        leadTime: leadTime ? parseInt(leadTime.toString()) : null,
        active: Boolean(active),
        notes: notes || null
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        ...newPart,
        partTypeDescription: getPartTypeDescription(newPart.partType)
      },
      message: 'Part created successfully'
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
