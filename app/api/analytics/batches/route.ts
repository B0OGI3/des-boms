import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '7d';

    // Calculate date range based on timeframe
    const now = new Date();
    const startDate = new Date();
    
    switch (timeframe) {
      case '24h':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Get comprehensive batch analytics
    const [
      totalBatches,
      completedBatches,
      overdueBatches,
      inProgressBatches,
      priorityDistribution,
      recentActivity,
      completionTrends
    ] = await Promise.all([
      // Total batches in timeframe
      prisma.batch.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),

      // Completed batches
      prisma.batch.count({
        where: {
          status: 'COMPLETED',
          actualCompletion: { gte: startDate }
        }
      }),

      // Overdue batches (estimated completion < now, not completed)
      prisma.batch.count({
        where: {
          estimatedCompletion: { lt: now },
          status: { not: 'COMPLETED' }
        }
      }),

      // In progress batches
      prisma.batch.count({
        where: {
          status: 'IN_PROGRESS'
        }
      }),

      // Priority distribution
      prisma.batch.groupBy({
        by: ['priority'],
        where: {
          createdAt: { gte: startDate }
        },
        _count: {
          id: true
        }
      }),

      // Recent activity (last 10 updates)
      prisma.batch.findMany({
        where: {
          updatedAt: { gte: startDate }
        },
        orderBy: {
          updatedAt: 'desc'
        },
        take: 10
      }),

      // Completion trends (batches completed each day)
      prisma.batch.findMany({
        where: {
          status: 'COMPLETED',
          actualCompletion: { gte: startDate }
        },
        select: {
          actualCompletion: true
        }
      })
    ]);

    // Get workstation utilization data separately
    const workstationUtilization = await prisma.routingStep.groupBy({
      by: ['workstationId'],
      where: {
        batch: {
          createdAt: { gte: startDate }
        }
      },
      _count: {
        id: true
      }
    });

    // Get workstation names for utilization data
    const workstationIds = workstationUtilization.map(w => w.workstationId);
    const workstations = await prisma.workstation.findMany({
      where: {
        id: { in: workstationIds }
      }
    });

    // Process workstation utilization data
    const workstationData = workstationUtilization.map(util => {
      const workstation = workstations.find(w => w.id === util.workstationId);
      return {
        workstation: workstation?.name || 'Unknown',
        batches: util._count.id,
        utilization: Math.round((util._count.id / totalBatches) * 100)
      };
    });

    // Calculate efficiency metrics
    const completionRate = totalBatches > 0 ? Math.round((completedBatches / totalBatches) * 100) : 0;
    const overdueRate = totalBatches > 0 ? Math.round((overdueBatches / totalBatches) * 100) : 0;

    // Process completion trends
    const trendsData = completionTrends.reduce((acc, trend) => {
      if (trend.actualCompletion) {
        const date = trend.actualCompletion.toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Generate trend array for the last 7 days
    const trendArray = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      trendArray.push({
        date: dateStr,
        completed: trendsData[dateStr] || 0
      });
    }

    const analytics = {
      summary: {
        totalBatches,
        completedBatches,
        inProgressBatches,
        overdueBatches,
        completionRate,
        overdueRate
      },
      workstationUtilization: workstationData,
      priorityDistribution: priorityDistribution.map(p => ({
        priority: p.priority,
        count: p._count.id,
        percentage: Math.round((p._count.id / totalBatches) * 100)
      })),
      completionTrends: trendArray,
      recentActivity: recentActivity.map(batch => ({
        id: batch.id,
        batchId: batch.batchId,
        status: batch.status,
        priority: batch.priority,
        quantity: batch.quantity,
        lineItemId: batch.lineItemId,
        updatedAt: batch.updatedAt
      })),
      timeframe,
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json(analytics);

  } catch (error) {
    console.error('Error fetching batch analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
