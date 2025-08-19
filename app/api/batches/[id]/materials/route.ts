import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/batches/[id]/materials - Get material requirements and consumption for a batch
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get batch with material consumption and BOM structure
    const batch = await prisma.batch.findUnique({
      where: { id },
      include: {
        lineItem: {
          include: {
            part: {
              include: {
                parentBOMs: {
                  include: {
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
                }
              }
            }
          }
        },
        materialConsumption: {
          include: {
            materialPart: {
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
        }
      }
    });

    if (!batch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Calculate required materials from BOM
    const requiredMaterials = batch.lineItem.part.parentBOMs.map(bomEntry => ({
      partId: bomEntry.childPart.id,
      partNumber: bomEntry.childPart.partNumber,
      partName: bomEntry.childPart.partName,
      partType: bomEntry.childPart.partType,
      requiredQuantity: Number(bomEntry.quantity) * batch.quantity,
      unitOfMeasure: bomEntry.unitOfMeasure || bomEntry.childPart.unitOfMeasure,
      standardCost: Number(bomEntry.childPart.standardCost || 0),
      totalRequiredCost: Number(bomEntry.childPart.standardCost || 0) * Number(bomEntry.quantity) * batch.quantity
    }));

    // Calculate consumed materials
    const consumedMaterials = batch.materialConsumption.map(consumption => ({
      partId: consumption.materialPart.id,
      partNumber: consumption.materialPart.partNumber,
      partName: consumption.materialPart.partName,
      partType: consumption.materialPart.partType,
      consumedQuantity: Number(consumption.quantityUsed),
      unitCost: Number(consumption.unitCost || 0),
      totalConsumedCost: Number(consumption.quantityUsed) * Number(consumption.unitCost || 0),
      consumedAt: consumption.consumedAt,
      operatorId: consumption.operatorId,
      notes: consumption.notes
    }));

    // Calculate variance between required and consumed
    const materialVariance = requiredMaterials.map(required => {
      const consumed = consumedMaterials.find(c => c.partId === required.partId);
      const actualQuantity = consumed?.consumedQuantity || 0;
      const variance = actualQuantity - required.requiredQuantity;
      const variancePercent = required.requiredQuantity > 0 
        ? (variance / required.requiredQuantity) * 100 
        : 0;

      let status = 'ON_TARGET';
      if (Math.abs(variancePercent) > 5) {
        status = variancePercent > 5 ? 'OVER_CONSUMED' : 'UNDER_CONSUMED';
      }

      return {
        ...required,
        actualQuantity,
        variance,
        variancePercent,
        status
      };
    });

    // Summary statistics
    const summary = {
      totalRequiredCost: requiredMaterials.reduce((sum, m) => sum + m.totalRequiredCost, 0),
      totalConsumedCost: consumedMaterials.reduce((sum, m) => sum + m.totalConsumedCost, 0),
      materialVarianceCost: 0,
      materialsOnTarget: materialVariance.filter(m => m.status === 'ON_TARGET').length,
      materialsOverConsumed: materialVariance.filter(m => m.status === 'OVER_CONSUMED').length,
      materialsUnderConsumed: materialVariance.filter(m => m.status === 'UNDER_CONSUMED').length
    };
    summary.materialVarianceCost = summary.totalConsumedCost - summary.totalRequiredCost;

    return NextResponse.json({
      success: true,
      data: {
        batchId: batch.batchId,
        partNumber: batch.lineItem.part.partNumber,
        partName: batch.lineItem.part.partName,
        batchQuantity: batch.quantity,
        requiredMaterials,
        consumedMaterials,
        materialVariance,
        summary
      }
    });

  } catch (error) {
    console.error('Error fetching batch materials:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch batch materials',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/batches/[id]/materials - Record material consumption
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { materialPartId, quantityUsed, operatorId, notes } = await request.json();

    // Validate required fields
    if (!materialPartId || !quantityUsed || quantityUsed <= 0) {
      return NextResponse.json(
        { success: false, error: 'Material part ID and positive quantity are required' },
        { status: 400 }
      );
    }

    // Verify batch exists
    const batch = await prisma.batch.findUnique({
      where: { id },
      select: { id: true, batchId: true }
    });

    if (!batch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Verify material part exists
    const materialPart = await prisma.part.findUnique({
      where: { id: materialPartId },
      select: { id: true, partNumber: true, standardCost: true }
    });

    if (!materialPart) {
      return NextResponse.json(
        { success: false, error: 'Material part not found' },
        { status: 404 }
      );
    }

    // Check if consumption record already exists (update or create)
    const existingConsumption = await prisma.materialConsumption.findUnique({
      where: {
        batchId_materialPartId: {
          batchId: id,
          materialPartId
        }
      }
    });

    let consumption;
    if (existingConsumption) {
      // Update existing consumption
      consumption = await prisma.materialConsumption.update({
        where: { id: existingConsumption.id },
        data: {
          quantityUsed,
          unitCost: materialPart.standardCost || 0,
          operatorId: operatorId || 'UNKNOWN',
          notes: notes || null,
          consumedAt: new Date()
        },
        include: {
          materialPart: {
            select: {
              partNumber: true,
              partName: true,
              partType: true
            }
          }
        }
      });
    } else {
      // Create new consumption record
      consumption = await prisma.materialConsumption.create({
        data: {
          batchId: id,
          materialPartId,
          quantityUsed,
          unitCost: materialPart.standardCost || 0,
          operatorId: operatorId || 'UNKNOWN',
          notes: notes || null,
          consumedAt: new Date()
        },
        include: {
          materialPart: {
            select: {
              partNumber: true,
              partName: true,
              partType: true
            }
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: consumption,
      message: existingConsumption 
        ? 'Material consumption updated successfully'
        : 'Material consumption recorded successfully'
    });

  } catch (error) {
    console.error('Error recording material consumption:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to record material consumption',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
