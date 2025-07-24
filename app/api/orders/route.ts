import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '../../../generated/prisma';

interface LineItemInput {
  partNumber: string;
  partName: string;
  drawingNumber?: string;
  revisionLevel?: string;
  quantity: number;
  unitPrice?: number;
  dueDate?: string;
  notes?: string;
}

// GET /api/orders - Get all purchase orders with optional filtering
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get('customerId');
  const priority = searchParams.get('priority');
  const search = searchParams.get('search');
  // Note: Status filtering is handled in the application layer since it's calculated from batch data
  
  try {
    const where: Prisma.PurchaseOrderWhereInput = {};
    
    // Filter by customer
    if (customerId) where.customerId = customerId;
    
    // Filter by priority
    if (priority && priority !== 'ALL') {
      where.priority = priority as Prisma.PurchaseOrderWhereInput['priority'];
    }
    
    // Search functionality - search across multiple fields
    if (search?.trim()) {
      const searchTerm = search.trim();
      where.OR = [
        // Search by PO number
        {
          poNumber: {
            contains: searchTerm,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        },
        // Search by system order ID
        {
          systemOrderId: {
            contains: searchTerm,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        },
        // Search by customer name
        {
          customer: {
            name: {
              contains: searchTerm,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
        },
        // Search by customer contact name
        {
          customer: {
            contactName: {
              not: null,
              contains: searchTerm,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
        },
        // Search by line item part number
        {
          lineItems: {
            some: {
              partNumber: {
                contains: searchTerm,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
          },
        },
        // Search by line item part name
        {
          lineItems: {
            some: {
              partName: {
                contains: searchTerm,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
          },
        },
        // Search by line item drawing number
        {
          lineItems: {
            some: {
              drawingNumber: {
                not: null,
                contains: searchTerm,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
          },
        },
        // Search by notes
        {
          notes: {
            not: null,
            contains: searchTerm,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        },
      ];
    }

    const orders = await prisma.purchaseOrder.findMany({
      where,
      include: {
        customer: true,
        lineItems: {
          include: {
            fileAttachments: true,
            batches: {
              include: {
                routingSteps: {
                  include: {
                    workstation: true,
                    confirmations: true,
                  },
                },
                qcRecords: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    console.error('Search params:', { customerId, priority, search });
    
    // More detailed error logging
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error code:', error.code);
      console.error('Prisma error message:', error.message);
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch orders',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new purchase order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerId,
      poNumber,
      dueDate,
      priority = 'NORMAL',
      notes,
      lineItems = [],
    } = body;

    // Map frontend priority values to database enum values (DES-BOMS spec: Rush / Standard / Hold)
    const priorityMapping: Record<string, 'RUSH' | 'STANDARD' | 'HOLD'> = {
      'RUSH': 'RUSH',
      'STANDARD': 'STANDARD',
      'HOLD': 'HOLD',
      // Legacy mappings for backwards compatibility
      'LOW': 'HOLD',
      'NORMAL': 'STANDARD',
      'HIGH': 'RUSH'
    };

    const dbPriority = priorityMapping[priority] || 'STANDARD';

    // Validate required fields
    if (!customerId || !poNumber || !dueDate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: customerId, poNumber, dueDate',
        },
        { status: 400 }
      );
    }

    // Generate DES-YYYY-ORDERNUMINORDER format
    const currentYear = new Date().getFullYear();
    const orderCount = await prisma.purchaseOrder.count();
    const orderNumber = (orderCount + 1).toString().padStart(3, '0');
    const systemOrderId = `DES-${currentYear}-${orderNumber}`;

    // Create the purchase order with line items
    const order = await prisma.purchaseOrder.create({
      data: {
        systemOrderId,
        customerId,
        poNumber,
        dueDate: new Date(dueDate),
        priority: dbPriority,
        notes,
        lineItems: {
          create: lineItems.map((item: LineItemInput) => ({
            partNumber: item.partNumber,
            partName: item.partName,
            drawingNumber: item.drawingNumber,
            revisionLevel: item.revisionLevel,
            quantity: item.quantity,
            dueDate: item.dueDate ? new Date(item.dueDate) : null,
            notes: item.notes,
          })),
        },
      },
      include: {
        customer: true,
        lineItems: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Purchase order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
