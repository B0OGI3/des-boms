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
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const priority = searchParams.get('priority');
    
    const where: Prisma.PurchaseOrderWhereInput = {};
    if (customerId) where.customerId = customerId;
    if (priority) where.priority = priority as Prisma.PurchaseOrderWhereInput['priority'];

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
      priority = 'STANDARD',
      notes,
      lineItems = [],
    } = body;

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
        priority,
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
