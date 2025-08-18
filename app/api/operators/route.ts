import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/operators - Get all operators or search by ID/name
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const operatorId = searchParams.get('operatorId');
    const search = searchParams.get('search');
    const activeOnly = searchParams.get('active') === 'true';

    if (operatorId) {
      // Get specific operator
      const operator = await prisma.workstationOperator.findUnique({
        where: { operatorId },
        include: {
          operatorSessions: {
            where: {
              logoutTime: null, // Current active session
            },
            include: {
              workstation: true,
            },
            orderBy: {
              loginTime: 'desc',
            },
            take: 1,
          },
        },
      });

      if (!operator) {
        return NextResponse.json(
          {
            success: false,
            error: 'Operator not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: operator,
      });
    }

    // Get all operators with optional filtering
    const where: any = {};
    if (activeOnly) where.active = true;
    if (search) {
      where.OR = [
        { operatorId: { contains: search, mode: 'insensitive' } },
        { operatorName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const operators = await prisma.workstationOperator.findMany({
      where,
      include: {
        operatorSessions: {
          where: {
            logoutTime: null, // Current active sessions
          },
          include: {
            workstation: true,
          },
          orderBy: {
            loginTime: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        operatorName: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: operators,
      count: operators.length,
    });
  } catch (error) {
    console.error('Error fetching operators:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch operators',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Helper function to handle operator login
async function handleOperatorLogin(operatorData: {
  operatorId: string;
  operatorName: string;
  email?: string;
  phone?: string;
  certifications: string[];
  shift: 'DAY' | 'SWING' | 'NIGHT' | 'FLEXIBLE';
  hourlyRate?: string;
  workstationId: string;
}) {
  const { operatorId, operatorName, email, phone, certifications, shift, hourlyRate, workstationId } = operatorData;

  // Check if operator exists
  let operator = await prisma.workstationOperator.findUnique({
    where: { operatorId },
  });

  // Create operator if doesn't exist (auto-registration)
  if (!operator) {
    operator = await prisma.workstationOperator.create({
      data: {
        operatorId,
        operatorName,
        email,
        phone,
        certifications,
        shift: shift as any,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
        currentWorkstationId: workstationId,
        loginTime: new Date(),
      },
    });
  } else {
    // Update current workstation and login time
    operator = await prisma.workstationOperator.update({
      where: { operatorId },
      data: {
        currentWorkstationId: workstationId,
        loginTime: new Date(),
        logoutTime: null,
      },
    });
  }

  // End any existing active sessions for this operator
  await prisma.operatorSession.updateMany({
    where: {
      operatorId,
      logoutTime: null,
    },
    data: {
      logoutTime: new Date(),
      notes: 'Auto-logout due to new session',
    },
  });

  // Create new session
  const session = await prisma.operatorSession.create({
    data: {
      operatorId,
      workstationId,
      shift: shift as any,
      loginTime: new Date(),
    },
  });

  return { operator, session };
}

// Helper function to handle operator creation
async function handleOperatorCreation(operatorData: {
  operatorId: string;
  operatorName: string;
  email?: string;
  phone?: string;
  certifications: string[];
  shift: 'DAY' | 'SWING' | 'NIGHT' | 'FLEXIBLE';
  hourlyRate?: string;
}) {
  const { operatorId, operatorName, email, phone, certifications, shift, hourlyRate } = operatorData;

  // Check if operator already exists
  const existingOperator = await prisma.workstationOperator.findUnique({
    where: { operatorId },
  });

  if (existingOperator) {
    throw new Error('Operator ID already exists');
  }

  // Create new operator
  const operator = await prisma.workstationOperator.create({
    data: {
      operatorId,
      operatorName,
      email,
      phone,
      certifications,
      shift: shift as any,
      hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
    },
  });

  return operator;
}

// POST /api/operators - Create operator or start login session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      operatorId, 
      operatorName, 
      email, 
      phone, 
      certifications = [], 
      shift = 'DAY',
      hourlyRate,
      workstationId, // For login session
      action = 'create' // 'create' or 'login'
    } = body;

    // Validate required fields
    if (!operatorId || !operatorName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: operatorId, operatorName',
        },
        { status: 400 }
      );
    }

    // Handle login action
    if (action === 'login') {
      if (!workstationId) {
        return NextResponse.json(
          {
            success: false,
            error: 'workstationId required for login',
          },
          { status: 400 }
        );
      }

      const { operator, session } = await handleOperatorLogin({
        operatorId,
        operatorName,
        email,
        phone,
        certifications,
        shift,
        hourlyRate,
        workstationId,
      });

      return NextResponse.json({
        success: true,
        data: { operator, session },
        message: 'Operator logged in successfully',
      });
    }

    // Handle creation action
    try {
      const operator = await handleOperatorCreation({
        operatorId,
        operatorName,
        email,
        phone,
        certifications,
        shift,
        hourlyRate,
      });

      return NextResponse.json({
        success: true,
        data: operator,
        message: 'Operator created successfully',
      });
    } catch (creationError) {
      if (creationError instanceof Error && creationError.message === 'Operator ID already exists') {
        return NextResponse.json(
          {
            success: false,
            error: 'Operator ID already exists',
          },
          { status: 409 }
        );
      }
      throw creationError;
    }
  } catch (error) {
    console.error('Error creating operator or login:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process operator request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT /api/operators - Update operator or logout
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { operatorId, action = 'update', notes } = body;

    if (!operatorId) {
      return NextResponse.json(
        {
          success: false,
          error: 'operatorId is required',
        },
        { status: 400 }
      );
    }

    if (action === 'logout') {
      // Handle operator logout
      const operator = await prisma.workstationOperator.update({
        where: { operatorId },
        data: {
          currentWorkstationId: null,
          logoutTime: new Date(),
        },
      });

      // End active sessions
      await prisma.operatorSession.updateMany({
        where: {
          operatorId,
          logoutTime: null,
        },
        data: {
          logoutTime: new Date(),
          notes: notes || 'Manual logout',
        },
      });

      return NextResponse.json({
        success: true,
        data: operator,
        message: 'Operator logged out successfully',
      });
    } else {
      // Handle regular operator update
      const { operatorName, email, phone, certifications, shift, hourlyRate, active } = body;

      const operator = await prisma.workstationOperator.update({
        where: { operatorId },
        data: {
          ...(operatorName && { operatorName }),
          ...(email !== undefined && { email }),
          ...(phone !== undefined && { phone }),
          ...(certifications && { certifications }),
          ...(shift && { shift }),
          ...(hourlyRate !== undefined && { hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null }),
          ...(active !== undefined && { active }),
        },
      });

      return NextResponse.json({
        success: true,
        data: operator,
        message: 'Operator updated successfully',
      });
    }
  } catch (error) {
    console.error('Error updating operator:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update operator',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
