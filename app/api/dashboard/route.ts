import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/dashboard - Get comprehensive dashboard data for shop floor monitoring
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view') || 'admin'; // 'admin' or 'workstation'
    const workstationId = searchParams.get('workstationId');

    // Get overall statistics
    const [
      totalOrders,
      totalBatches,
      activeBatches,
      completedBatches,
      queuedBatches,
      onHoldBatches,
      totalWorkstations,
      activeWorkstations,
      rushOrders,
      pendingQC,
    ] = await Promise.all([
      prisma.purchaseOrder.count(),
      prisma.batch.count(),
      prisma.batch.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.batch.count({ where: { status: 'COMPLETED' } }),
      prisma.batch.count({ where: { status: 'QUEUED' } }),
      prisma.batch.count({ where: { status: 'ON_HOLD' } }),
      prisma.workstation.count(),
      prisma.workstation.count({ where: { active: true } }),
      prisma.purchaseOrder.count({ where: { priority: 'RUSH' } }),
      prisma.batch.count({
        where: {
          status: 'COMPLETED',
          qcRecords: { none: {} },
        },
      }),
    ]);

    // Get workstation status with current jobs
    const workstations = await prisma.workstation.findMany({
      where: workstationId ? { id: workstationId } : { active: true },
      include: {
        routingSteps: {
          where: {
            status: {
              in: ['PENDING', 'IN_PROGRESS'],
            },
          },
          include: {
            batch: {
              include: {
                lineItem: {
                  include: {
                    purchaseOrder: {
                      include: {
                        customer: true,
                      },
                    },
                  },
                },
              },
            },
            confirmations: {
              where: {
                status: {
                  in: ['STARTED', 'PAUSED'],
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
          },
          orderBy: [
            { batch: { priority: 'desc' } },
            { batch: { createdAt: 'asc' } },
          ],
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Get recent alerts and issues
    const flaggedSteps = await prisma.stepConfirmation.findMany({
      where: {
        flagged: true,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
      include: {
        routingStep: {
          include: {
            batch: {
              include: {
                lineItem: {
                  include: {
                    purchaseOrder: {
                      include: {
                        customer: true,
                      },
                    },
                  },
                },
              },
            },
            workstation: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // Get overdue batches
    const overdueBatches = await prisma.batch.findMany({
      where: {
        status: {
          in: ['QUEUED', 'IN_PROGRESS'],
        },
        estimatedCompletion: {
          lt: new Date(),
        },
      },
      include: {
        lineItem: {
          include: {
            purchaseOrder: {
              include: {
                customer: true,
              },
            },
          },
        },
        routingSteps: {
          include: {
            workstation: true,
          },
          orderBy: {
            stepNumber: 'asc',
          },
        },
      },
      orderBy: {
        estimatedCompletion: 'asc',
      },
    });

    // Get recent completions (last 24 hours)
    const recentCompletions = await prisma.batch.findMany({
      where: {
        status: 'COMPLETED',
        actualCompletion: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      include: {
        lineItem: {
          include: {
            purchaseOrder: {
              include: {
                customer: true,
              },
            },
          },
        },
        qcRecords: {
          orderBy: {
            inspectionDate: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        actualCompletion: 'desc',
      },
      take: 10,
    });

    // Calculate workstation efficiency
    const workstationEfficiency = workstations.map(ws => {
      const activeSteps = ws.routingSteps.filter(step => step.status === 'IN_PROGRESS');
      const queuedSteps = ws.routingSteps.filter(step => step.status === 'PENDING');
      
      return {
        workstationId: ws.id,
        name: ws.name,
        status: activeSteps.length > 0 ? 'ACTIVE' : queuedSteps.length > 0 ? 'QUEUED' : 'IDLE',
        activeJobs: activeSteps.length,
        queuedJobs: queuedSteps.length,
        currentOperator: activeSteps[0]?.confirmations[0]?.operatorName || null,
        currentBatch: activeSteps[0]?.batch?.batchId || null,
      };
    });

    const dashboardData = {
      overview: {
        totalOrders,
        totalBatches,
        activeBatches,
        completedBatches,
        queuedBatches,
        onHoldBatches,
        totalWorkstations,
        activeWorkstations,
        rushOrders,
        pendingQC,
      },
      workstations: view === 'workstation' && workstationId ? 
        workstations.filter(ws => ws.id === workstationId) : 
        workstations,
      workstationEfficiency,
      alerts: {
        flaggedSteps,
        overdueBatches,
      },
      recentActivity: {
        completions: recentCompletions,
      },
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dashboard data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
