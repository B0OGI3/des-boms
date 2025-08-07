/**
 * Line Items API - For batch creation workflow
 * GET /api/orders/line-items?status=active
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get line items that have available quantity for batching
    const lineItems = await prisma.orderLineItem.findMany({
      where: {
        purchaseOrder: {
          // Only include orders that aren't completed/cancelled
          // Note: Orders don't have status in schema, they're derived from batch status
          priority: {
            in: ['RUSH', 'STANDARD', 'HOLD']
          }
        }
      },
      include: {
        purchaseOrder: {
          include: {
            customer: true
          }
        },
        batches: {
          select: {
            quantity: true,
            status: true
          }
        }
      },
      orderBy: [
        { purchaseOrder: { priority: 'desc' } },
        { purchaseOrder: { dueDate: 'asc' } }
      ]
    });

    // Calculate available quantities
    const availableLineItems = lineItems.map((lineItem: any) => {
      const batchedQuantity = lineItem.batches
        .filter((batch: any) => batch.status !== 'CANCELLED')
        .reduce((sum: number, batch: any) => sum + batch.quantity, 0);
      
      const availableQuantity = lineItem.quantity - batchedQuantity;
      
      return {
        id: lineItem.id,
        partNumber: lineItem.partNumber,
        partName: lineItem.partName,
        quantity: lineItem.quantity,
        availableQuantity,
        batchedQuantity,
        purchaseOrder: {
          id: lineItem.purchaseOrder.id,
          systemOrderId: lineItem.purchaseOrder.systemOrderId,
          poNumber: lineItem.purchaseOrder.poNumber,
          customer: {
            name: lineItem.purchaseOrder.customer.name
          }
        }
      };
    }).filter((item: any) => item.availableQuantity > 0); // Only show items with available quantity

    return NextResponse.json({
      success: true,
      data: availableLineItems,
      count: availableLineItems.length
    });

  } catch (error) {
    console.error('Error fetching line items:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch line items',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
