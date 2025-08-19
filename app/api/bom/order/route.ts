/**
 * BOM Order API - Material requirements and manufacturing planning for orders
 * Tracks material consumption from Finished Goods → Semi-Finished → Raw Materials
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { 
  getFullBOMStructure, 
  calculateBatchMaterialRequirements,
  getBOMManufacturingSequence,
  MaterialRequirement
} from '../../../../lib/bomUtils';

/**
 * GET /api/bom/order?orderId=xxx - Get material requirements for entire order
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const batchId = searchParams.get('batchId');
    const includeManufacturingSequence = searchParams.get('manufacturingSequence') === 'true';

    if (!orderId && !batchId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Either orderId or batchId must be provided' 
        },
        { status: 400 }
      );
    }

    if (batchId) {
      // Get material requirements for a specific batch
      const materialRequirements = await calculateBatchMaterialRequirements(batchId);
      
      const batch = await prisma.batch.findUnique({
        where: { id: batchId },
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
      });

      let manufacturingSequence = null;
      if (includeManufacturingSequence && batch) {
        manufacturingSequence = await getBOMManufacturingSequence(batch.lineItem.partId, batch.quantity);
      }

      return NextResponse.json({
        success: true,
        data: {
          batch: {
            id: batch?.id,
            batchId: batch?.batchId,
            quantity: batch?.quantity,
            part: batch?.lineItem.part,
            customer: batch?.lineItem.purchaseOrder.customer.name
          },
          materialRequirements,
          manufacturingSequence,
          summary: {
            totalRawMaterials: materialRequirements.filter(req => req.partType === 'RAW_MATERIAL').length,
            totalSemiFinished: materialRequirements.filter(req => req.partType === 'SEMI_FINISHED').length,
            totalMaterialCost: materialRequirements.reduce((sum, req) => sum + req.totalCost, 0)
          }
        }
      });
    }

    // Get material requirements for entire order
    const order = await prisma.purchaseOrder.findUnique({
      where: { id: orderId! },
      include: {
        customer: true,
        lineItems: {
          include: {
            part: true,
            batches: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Order not found' 
        },
        { status: 404 }
      );
    }

    // Calculate material requirements for each line item
    const lineItemRequirements = await Promise.all(
      order.lineItems.map(async (lineItem) => {
        const bomStructure = await getFullBOMStructure(lineItem.partId, lineItem.quantity);
        
        let manufacturingSequence = null;
        if (includeManufacturingSequence) {
          manufacturingSequence = await getBOMManufacturingSequence(lineItem.partId, lineItem.quantity);
        }

        return {
          lineItem: {
            id: lineItem.id,
            part: lineItem.part,
            quantity: lineItem.quantity,
            dueDate: lineItem.dueDate,
            notes: lineItem.notes
          },
          bomStructure,
          manufacturingSequence,
          batches: lineItem.batches.map(batch => ({
            id: batch.id,
            batchId: batch.batchId,
            quantity: batch.quantity,
            status: batch.status
          }))
        };
      })
    );

    // Consolidate material requirements across all line items
    const consolidatedMaterials: { [partId: string]: MaterialRequirement } = {};
    
    lineItemRequirements.forEach(item => {
      if (item.bomStructure) {
        item.bomStructure.materialRequirements.forEach(req => {
          if (consolidatedMaterials[req.partId]) {
            consolidatedMaterials[req.partId].totalQuantityRequired += req.totalQuantityRequired;
            consolidatedMaterials[req.partId].totalCost += req.totalCost;
            consolidatedMaterials[req.partId].sources.push(...req.sources);
          } else {
            consolidatedMaterials[req.partId] = { ...req };
          }
        });
      }
    });

    const consolidatedRequirements = Object.values(consolidatedMaterials);

    return NextResponse.json({
      success: true,
      data: {
        order: {
          id: order.id,
          systemOrderId: order.systemOrderId,
          poNumber: order.poNumber,
          customer: order.customer,
          dueDate: order.dueDate,
          priority: order.priority
        },
        lineItems: lineItemRequirements,
        consolidatedMaterialRequirements: consolidatedRequirements,
        summary: {
          totalLineItems: order.lineItems.length,
          totalRawMaterials: consolidatedRequirements.filter(req => req.partType === 'RAW_MATERIAL').length,
          totalSemiFinished: consolidatedRequirements.filter(req => req.partType === 'SEMI_FINISHED').length,
          totalMaterialCost: consolidatedRequirements.reduce((sum, req) => sum + req.totalCost, 0),
          estimatedManufacturingSteps: lineItemRequirements.reduce((sum, item) => 
            sum + (item.manufacturingSequence?.length || 0), 0)
        }
      }
    });

  } catch (error) {
    console.error('Error fetching order material requirements:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch order material requirements',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bom/order - Create material consumption records for a batch
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { batchId, materialConsumption, operatorId } = body;

    if (!batchId || !materialConsumption || !Array.isArray(materialConsumption)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: batchId, materialConsumption (array)' 
        },
        { status: 400 }
      );
    }

    // Validate batch exists
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
      return NextResponse.json(
        { 
          success: false, 
          error: 'Batch not found' 
        },
        { status: 404 }
      );
    }

    // Create material consumption records
    const consumptionRecords = await Promise.all(
      materialConsumption.map(async (consumption: any) => {
        const { materialPartId, quantityUsed, unitCost, notes } = consumption;

        // Validate material part exists
        const materialPart = await prisma.part.findUnique({
          where: { id: materialPartId }
        });

        if (!materialPart) {
          throw new Error(`Material part ${materialPartId} not found`);
        }

        return prisma.materialConsumption.create({
          data: {
            batchId,
            materialPartId,
            quantityUsed: parseFloat(quantityUsed),
            unitCost: unitCost ? parseFloat(unitCost) : null,
            operatorId,
            notes,
            consumedAt: new Date()
          },
          include: {
            materialPart: {
              select: {
                partNumber: true,
                partName: true,
                partType: true,
                unitOfMeasure: true
              }
            }
          }
        });
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        batchId,
        consumptionRecords,
        totalRecords: consumptionRecords.length,
        totalCost: consumptionRecords.reduce((sum, record) => 
          sum + (parseFloat(record.quantityUsed.toString()) * (parseFloat(record.unitCost?.toString() || '0'))), 0)
      },
      message: `Successfully recorded material consumption for batch ${batch.batchId}`
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating material consumption records:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create material consumption records',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
