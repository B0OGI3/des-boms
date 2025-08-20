/**
 * Order Line Items API - DELETE endpoint
 * Handles deletion of specific line items from orders
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';

/**
 * DELETE /api/orders/[id]/line-items/[lineItemId] - Delete a line item from an order
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; lineItemId: string }> }
) {
  try {
    const { id, lineItemId } = await params;

    // Validate parameters
    if (!id || !lineItemId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters: id and lineItemId',
        },
        { status: 400 }
      );
    }

    // Check if the order exists
    const order = await prisma.purchaseOrder.findUnique({
      where: { id: id },
      select: {
        id: true,
        poNumber: true,
        orderStatus: true,
        _count: {
          select: {
            lineItems: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found',
          details: `No order found with ID: ${id}`,
        },
        { status: 404 }
      );
    }

    // Check if order can be modified
    if (order.orderStatus === 'COMPLETED' || order.orderStatus === 'SHIPPED') {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot delete parts from completed or shipped orders',
          details: `Order ${order.poNumber} has status: ${order.orderStatus}`,
        },
        { status: 400 }
      );
    }

    // Check if this is the last line item
    if (order._count.lineItems <= 1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot delete the last line item from an order',
          details:
            'Orders must have at least one line item. Consider deleting the entire order instead.',
        },
        { status: 400 }
      );
    }

    // Check if the line item exists and belongs to this order
    const lineItem = await prisma.orderLineItem.findFirst({
      where: {
        id: lineItemId,
        orderId: id,
      },
      include: {
        part: {
          select: {
            partNumber: true,
            partName: true,
          },
        },
      },
    });

    if (!lineItem) {
      return NextResponse.json(
        {
          success: false,
          error: 'Line item not found',
          details: `No line item found with ID: ${lineItemId} in order: ${id}`,
        },
        { status: 404 }
      );
    }

    // Use transaction to delete line item
    const result = await prisma.$transaction(async (tx: any) => {
      // Delete the line item
      await tx.orderLineItem.delete({
        where: { id: lineItemId },
      });

      // Get remaining count
      const remainingCount = await tx.orderLineItem.count({
        where: { orderId: id },
      });

      return {
        deletedLineItem: lineItem,
        newItemCount: remainingCount,
      };
    });

    return NextResponse.json({
      success: true,
      message: `Part ${result.deletedLineItem.part.partNumber} removed from order ${order.poNumber}`,
      data: {
        orderId: id,
        deletedPartNumber: result.deletedLineItem.part.partNumber,
        deletedPartName: result.deletedLineItem.part.partName,
        newItemCount: result.newItemCount,
      },
    });
  } catch (error) {
    console.error('Error deleting line item:', error);

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('Foreign key constraint')) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Cannot delete part - it may be referenced by batches or other records',
            details:
              'This part cannot be deleted because it is referenced by production batches or other manufacturing records.',
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete line item',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
