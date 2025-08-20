import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/parts/[id]/dependencies - Get part dependencies information
 */
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    // Get part with all its dependencies
    const part = await prisma.part.findUnique({
      where: { id },
      include: {
        // Orders using this part
        orderLineItems: {
          select: {
            id: true,
            quantity: true,
            purchaseOrder: {
              select: {
                id: true,
                poNumber: true,
                customer: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        // Parts that use this part as a component (this part is the CHILD)
        childBOMs: {
          select: {
            id: true,
            quantity: true,
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
        // Parts that this part uses as components (this part is the PARENT)
        parentBOMs: {
          select: {
            id: true,
            quantity: true,
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

    if (!part) {
      return NextResponse.json(
        {
          success: false,
          error: 'Part not found',
        },
        { status: 404 }
      );
    }

    // Format the dependencies information
    const dependencies = {
      partInfo: {
        id: part.id,
        partNumber: part.partNumber,
        partName: part.partName,
        partType: part.partType,
      },
      orders: part.orderLineItems.map(item => ({
        orderId: item.purchaseOrder.id,
        poNumber: item.purchaseOrder.poNumber,
        customerName: item.purchaseOrder.customer.name,
        quantity: item.quantity,
      })),
      usedInParts: part.childBOMs.map(bom => ({
        partId: bom.parentPart.id,
        partNumber: bom.parentPart.partNumber,
        partName: bom.parentPart.partName,
        partType: bom.parentPart.partType,
        quantity: bom.quantity,
      })),
      containsParts: part.parentBOMs.map(bom => ({
        partId: bom.childPart.id,
        partNumber: bom.childPart.partNumber,
        partName: bom.childPart.partName,
        partType: bom.childPart.partType,
        quantity: bom.quantity,
      })),
      summary: {
        totalOrders: part.orderLineItems.length,
        totalParentParts: part.childBOMs.length,
        totalChildParts: part.parentBOMs.length,
        canDelete: calculateCanDelete(part),
        isFG: part.partType === 'FINISHED',
        isSF: part.partType === 'SEMI_FINISHED',
      },
    };

    return NextResponse.json({
      success: true,
      data: dependencies,
    });
  } catch (error) {
    console.error('Error getting part dependencies:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get part dependencies',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Helper function to calculate if a part can be deleted based on new rules
function calculateCanDelete(part: any) {
  // FG parts can always be deleted
  if (part.partType === 'FINISHED') {
    return true;
  }

  // Check order dependencies - blocks all part types
  if (part.orderLineItems.length > 0) {
    return false;
  }

  // Check child BOM dependencies - blocks all part types
  if (part.parentBOMs.length > 0) {
    return false;
  }

  // Check parent BOM dependencies
  if (part.childBOMs.length > 0) {
    // SF parts can be deleted unless used in FG assemblies
    if (part.partType === 'SEMI_FINISHED') {
      const fgParents = part.childBOMs.filter(
        (bom: any) => bom.parentPart.partType === 'FINISHED'
      );
      return fgParents.length === 0;
    }
    // RM parts blocked by any parent relationship
    return false;
  }

  // No dependencies found
  return true;
}
