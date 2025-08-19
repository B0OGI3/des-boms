import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Material Consumption API
 * 
 * Handles tracking and recording of material consumption during manufacturing
 * with full BOM hierarchy awareness and cost calculation.
 */

interface MaterialConsumptionRecord {
  batchId: string;
  materialPartId: string;
  quantityUsed: number;
  unitCost?: number;
  operatorId?: string;
  notes?: string;
}

/**
 * GET /api/material-consumption
 * Retrieve material consumption records with filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get('batchId');
    const partId = searchParams.get('partId');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    const where: any = {};

    if (batchId) {
      where.batchId = batchId;
    }

    if (partId) {
      where.materialPartId = partId;
    }

    if (dateFrom || dateTo) {
      where.consumedAt = {};
      if (dateFrom) {
        where.consumedAt.gte = new Date(dateFrom);
      }
      if (dateTo) {
        where.consumedAt.lte = new Date(dateTo);
      }
    }

    const consumptionRecords = await prisma.materialConsumption.findMany({
      where,
      include: {
        batch: {
          include: {
            lineItem: {
              include: {
                part: true,
                purchaseOrder: {
                  include: {
                    customer: true
                  }
                }
              }
            }
          }
        },
        materialPart: true
      },
      orderBy: {
        consumedAt: 'desc'
      }
    });

    // Calculate summary statistics
    const totalCost = consumptionRecords.reduce((sum, record) => 
      sum + (Number(record.unitCost) || 0) * Number(record.quantityUsed), 0
    );

    const materialSummary = consumptionRecords.reduce((acc, record) => {
      const partId = record.materialPartId;
      if (!acc[partId]) {
        acc[partId] = {
          partNumber: record.materialPart.partNumber,
          partName: record.materialPart.partName,
          partType: record.materialPart.partType,
          totalQuantityUsed: 0,
          totalCost: 0,
          batchCount: 0
        };
      }
      acc[partId].totalQuantityUsed += Number(record.quantityUsed);
      acc[partId].totalCost += (Number(record.unitCost) || 0) * Number(record.quantityUsed);
      acc[partId].batchCount += 1;
      return acc;
    }, {} as any);

    return NextResponse.json({
      success: true,
      data: consumptionRecords,
      summary: {
        totalRecords: consumptionRecords.length,
        totalCost,
        materialSummary: Object.values(materialSummary)
      }
    });

  } catch (error) {
    console.error('Error fetching material consumption:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch material consumption records',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/material-consumption
 * Record material consumption for a batch
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { records } = body;

    if (!records || !Array.isArray(records)) {
      return NextResponse.json(
        { success: false, error: 'Records array is required' },
        { status: 400 }
      );
    }

    const results = await prisma.$transaction(async (tx) => {
      const createdRecords = [];

      for (const record of records as MaterialConsumptionRecord[]) {
        const { batchId, materialPartId, quantityUsed, unitCost, operatorId, notes } = record;

        // Validate that the batch exists
        const batch = await tx.batch.findUnique({
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
          throw new Error(`Batch ${batchId} not found`);
        }

        // Validate that the material part exists
        const materialPart = await tx.part.findUnique({
          where: { id: materialPartId }
        });

        if (!materialPart) {
          throw new Error(`Material part ${materialPartId} not found`);
        }

        // Get the current cost if not provided
        let actualUnitCost = unitCost;
        if (!actualUnitCost) {
          actualUnitCost = Number(materialPart.standardCost) || 0;
        }

        // Create the consumption record
        const consumptionRecord = await tx.materialConsumption.create({
          data: {
            batchId,
            materialPartId,
            quantityUsed,
            unitCost: actualUnitCost,
            consumedAt: new Date(),
            operatorId,
            notes
          },
          include: {
            materialPart: true,
            batch: {
              include: {
                lineItem: {
                  include: {
                    part: true
                  }
                }
              }
            }
          }
        });

        createdRecords.push(consumptionRecord);
      }

      return createdRecords;
    });

    return NextResponse.json({
      success: true,
      data: results,
      message: `Successfully recorded ${results.length} material consumption records`
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

/**
 * PUT /api/material-consumption
 * Update existing material consumption record
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, quantityUsed, unitCost, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Record ID is required' },
        { status: 400 }
      );
    }

    const updatedRecord = await prisma.materialConsumption.update({
      where: { id },
      data: {
        quantityUsed: quantityUsed !== undefined ? quantityUsed : undefined,
        unitCost: unitCost !== undefined ? unitCost : undefined,
        notes: notes !== undefined ? notes : undefined,
        updatedAt: new Date()
      },
      include: {
        materialPart: true,
        batch: {
          include: {
            lineItem: {
              include: {
                part: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedRecord,
      message: 'Material consumption record updated successfully'
    });

  } catch (error) {
    console.error('Error updating material consumption:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update material consumption record',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/material-consumption
 * Delete material consumption record
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Record ID is required' },
        { status: 400 }
      );
    }

    await prisma.materialConsumption.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Material consumption record deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting material consumption:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete material consumption record',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
