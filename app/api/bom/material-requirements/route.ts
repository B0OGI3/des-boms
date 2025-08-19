import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getFullBOMStructure, calculateBatchMaterialRequirements } from '@/lib/bomUtils';

/**
 * BOM Material Requirements API
 * 
 * Provides BOM-aware material requirements for batches and routing steps,
 * enabling workstations to understand exactly what materials are needed.
 */

/**
 * GET /api/bom/material-requirements?batchId=xxx
 * Get BOM-based material requirements for a specific batch
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get('batchId');
    const partId = searchParams.get('partId');
    const quantity = searchParams.get('quantity');

    if (!batchId && !partId) {
      return NextResponse.json(
        { success: false, error: 'Either batchId or partId is required' },
        { status: 400 }
      );
    }

    let targetPartId = partId;
    let targetQuantity = quantity ? parseInt(quantity) : 1;
    let batchInfo = null;

    // If batchId is provided, get the part and quantity from the batch
    if (batchId) {
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
          },
          materialConsumption: {
            include: {
              materialPart: true
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

      targetPartId = batch.lineItem.part.id;
      targetQuantity = batch.quantity;
      batchInfo = {
        id: batch.id,
        batchId: batch.batchId,
        status: batch.status,
        priority: batch.priority,
        part: batch.lineItem.part,
        customer: batch.lineItem.purchaseOrder.customer,
        materialConsumption: batch.materialConsumption
      };
    }

    if (!targetPartId) {
      return NextResponse.json(
        { success: false, error: 'Part ID could not be determined' },
        { status: 400 }
      );
    }

    // Get the full BOM structure for this part
    const bomStructure = await getFullBOMStructure(targetPartId, targetQuantity);
    
    if (!bomStructure) {
      return NextResponse.json(
        { success: false, error: 'Could not retrieve BOM structure for part' },
        { status: 404 }
      );
    }

    // Calculate material requirements for the batch
    let materialRequirements = [];
    if (batchId) {
      // Use batch-specific calculation
      materialRequirements = await calculateBatchMaterialRequirements(batchId);
    } else {
      // For direct part requests, use BOM structure material requirements
      materialRequirements = bomStructure.materialRequirements || [];
    }

    // Enhance material requirements (simplified without inventory tracking)
    const enhancedRequirements = materialRequirements.map(req => {
      return {
        ...req,
        available: true, // Simplified - assume materials are available
        shortage: 0 // No shortage calculation without inventory tracking
      };
    });

    // Calculate total material cost
    const totalMaterialCost = enhancedRequirements.reduce((sum, req) => sum + req.totalCost, 0);

    // Check for any material shortages (simplified)
    const shortages = enhancedRequirements.filter(req => !req.available);
    const hasShortages = shortages.length > 0;

    return NextResponse.json({
      success: true,
      data: {
        batch: batchInfo,
        bomStructure,
        materialRequirements: enhancedRequirements,
        summary: {
          totalMaterialCost,
          totalMaterialTypes: enhancedRequirements.length,
          hasShortages,
          shortageCount: shortages.length,
          shortages: shortages.map(s => ({
            partNumber: s.partNumber,
            partName: s.partName,
            required: s.totalQuantityRequired,
            available: 0, // Simplified - no inventory tracking
            shortage: s.shortage
          }))
        }
      }
    });

  } catch (error) {
    console.error('Error getting BOM material requirements:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get BOM material requirements',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bom/material-requirements
 * Calculate material requirements for multiple parts/batches
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { success: false, error: 'Items array is required' },
        { status: 400 }
      );
    }

    const results = [];

    for (const item of items) {
      const { partId, quantity = 1, description } = item;

      if (!partId) {
        results.push({
          partId: null,
          error: 'Part ID is required',
          description
        });
        continue;
      }

      try {
        // For direct part calculation, we would need to create a temporary batch or use BOM structure
        // This is simplified - in a real implementation you'd calculate from BOM structure
        const part = await prisma.part.findUnique({
          where: { id: partId },
          select: {
            id: true,
            partNumber: true,
            partName: true,
            partType: true
          }
        });

        if (!part) {
          results.push({
            partId,
            error: 'Part not found',
            description,
            success: false
          });
          continue;
        }

        // Get BOM structure and calculate material requirements
        const bomStructure = await getFullBOMStructure(partId, quantity);
        const materialRequirements = bomStructure?.materialRequirements || [];

        const totalCost = materialRequirements.reduce((sum, req) => sum + req.totalCost, 0);

        results.push({
          partId,
          part,
          quantity,
          description,
          materialRequirements,
          totalMaterialCost: totalCost,
          success: true
        });

      } catch (error) {
        results.push({
          partId,
          error: error instanceof Error ? error.message : 'Unknown error',
          description,
          success: false
        });
      }
    }

    // Calculate aggregate requirements across all items
    const allMaterials = new Map();
    let totalCost = 0;

    results.forEach(result => {
      if (result.success && result.materialRequirements) {
        result.materialRequirements.forEach((req: any) => {
          const key = req.partId;
          if (allMaterials.has(key)) {
            const existing = allMaterials.get(key);
            existing.totalQuantityRequired += req.totalQuantityRequired;
            existing.totalCost += req.totalCost;
          } else {
            allMaterials.set(key, { ...req });
          }
        });
        totalCost += result.totalMaterialCost || 0;
      }
    });

    const aggregatedRequirements = Array.from(allMaterials.values());

    return NextResponse.json({
      success: true,
      data: {
        items: results,
        aggregated: {
          materialRequirements: aggregatedRequirements,
          totalMaterialCost: totalCost,
          totalItems: items.length,
          successfulItems: results.filter(r => r.success).length
        }
      }
    });

  } catch (error) {
    console.error('Error calculating batch material requirements:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to calculate material requirements',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
