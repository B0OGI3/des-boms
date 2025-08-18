import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '../../../generated/prisma';

// GET /api/workstations - Get all workstations with current job queue and operator info
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    const includeQueue = searchParams.get('includeQueue') === 'true';
    const includeOperators = searchParams.get('includeOperators') === 'true';
    
    const where: Prisma.WorkstationWhereInput = {};
    if (activeOnly) where.active = true;

    const workstations = await prisma.workstation.findMany({
      where,
      include: {
        ...(includeQueue && {
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
        }),
        ...(includeOperators && {
          currentOperators: {
            where: {
              active: true,
            },
            orderBy: {
              operatorName: 'asc',
            },
          },
          operatorSessions: {
            where: {
              logoutTime: null, // Current active sessions
            },
            orderBy: {
              loginTime: 'desc',
            },
          },
        }),
        capacity: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Transform data to include calculated fields
    const transformedWorkstations = workstations.map(workstation => ({
      ...workstation,
      status: workstation.operatorSessions?.length > 0 ? 'ACTIVE' : 'IDLE',
      currentOperator: workstation.operatorSessions?.[0]?.operatorId || null,
      activeJobs: workstation.routingSteps?.filter(step => step.status === 'IN_PROGRESS').length || 0,
      queuedJobs: workstation.routingSteps?.filter(step => step.status === 'PENDING').length || 0,
    }));

    return NextResponse.json({
      success: true,
      data: transformedWorkstations,
      count: transformedWorkstations.length,
    });
  } catch (error) {
    console.error('Error fetching workstations:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch workstations',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/workstations - Create a new workstation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, active = true } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: name',
        },
        { status: 400 }
      );
    }

    // Check if workstation name already exists
    const existingWorkstation = await prisma.workstation.findUnique({
      where: { name },
    });

    if (existingWorkstation) {
      return NextResponse.json(
        {
          success: false,
          error: 'Workstation name already exists',
        },
        { status: 409 }
      );
    }

    const workstation = await prisma.workstation.create({
      data: {
        name,
        description,
        active,
      },
    });

    return NextResponse.json({
      success: true,
      data: workstation,
      message: 'Workstation created successfully',
    });
  } catch (error) {
    console.error('Error creating workstation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create workstation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT /api/workstations - Update workstation
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, active } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: id',
        },
        { status: 400 }
      );
    }

    const workstation = await prisma.workstation.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(active !== undefined && { active }),
      },
    });

    return NextResponse.json({
      success: true,
      data: workstation,
      message: 'Workstation updated successfully',
    });
  } catch (error) {
    console.error('Error updating workstation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update workstation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
