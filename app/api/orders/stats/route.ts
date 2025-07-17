import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/orders/stats - Get order statistics
export async function GET() {
  try {
    // Get basic order counts
    const [
      totalOrders,
      rushOrders,
      overdueOrders,
      orders
    ] = await Promise.all([
      prisma.purchaseOrder.count(),
      prisma.purchaseOrder.count({
        where: { priority: 'RUSH' }
      }),
      prisma.purchaseOrder.count({
        where: {
          dueDate: { lt: new Date() }
        }
      }),
      prisma.purchaseOrder.findMany({
        include: {
          customer: true,
          lineItems: {
            include: {
              batches: {
                include: {
                  routingSteps: true
                }
              }
            }
          }
        }
      })
    ]);

    // Calculate derived statistics
    let totalValue = 0;
    let pendingOrders = 0;
    let inProgressOrders = 0;
    let completedOrders = 0;

    for (const order of orders) {
      // Calculate order value based on line items (you may need to adjust this based on your pricing model)
      const orderValue = order.lineItems.reduce((sum, item) => {
        // For now, we'll use a simple calculation - you might want to add pricing to your schema
        return sum + (item.quantity * 100); // Assuming $100 per unit as placeholder
      }, 0);
      totalValue += orderValue;

      // Determine order status based on batch completion
      const allBatches = order.lineItems.flatMap(item => item.batches);
      const completedBatches = allBatches.filter(batch => batch.status === 'COMPLETED').length;
      const inProgressBatches = allBatches.filter(batch => batch.status === 'IN_PROGRESS').length;

      if (allBatches.length === 0) {
        pendingOrders++;
      } else if (completedBatches === allBatches.length) {
        completedOrders++;
      } else if (inProgressBatches > 0) {
        inProgressOrders++;
      } else {
        pendingOrders++;
      }
    }

    const avgOrderValue = totalOrders > 0 ? totalValue / totalOrders : 0;

    const stats = {
      totalOrders,
      pendingOrders,
      inProgressOrders,
      completedOrders,
      rushOrders,
      overdueOrders,
      totalValue,
      avgOrderValue
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching order statistics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch order statistics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
