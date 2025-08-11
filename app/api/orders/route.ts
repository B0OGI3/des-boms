import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '../../../generated/prisma';
import { generatePartNumber } from '@/lib/partNumberGenerator';

interface LineItemInput {
  partId?: string; // Reference to existing Parts Master record
  // For creating new parts on-the-fly (fallback)
  partNumber?: string;
  partName?: string;
  drawingNumber?: string;
  revisionLevel?: string;
  // Line item specific fields
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
              part: {
                partNumber: {
                  contains: searchTerm,
                  mode: 'insensitive' as Prisma.QueryMode,
                },
              },
            },
          },
        },
        // Search by line item part name
        {
          lineItems: {
            some: {
              part: {
                partName: {
                  contains: searchTerm,
                  mode: 'insensitive' as Prisma.QueryMode,
                },
              },
            },
          },
        },
        // Search by line item drawing number
        {
          lineItems: {
            some: {
              part: {
                drawingNumber: {
                  not: null,
                  contains: searchTerm,
                  mode: 'insensitive' as Prisma.QueryMode,
                },
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
            part: true, // Include Parts Master data
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

    // Process line items - create parts if needed
    const processedLineItems = await Promise.all(
      lineItems.map(async (item: LineItemInput) => {
        let partId = item.partId;
        
        // If no partId provided, create a new part
        if (!partId && item.partName) {
          // Use provided part number or generate one
          const partNumber = item.partNumber || await generatePartNumber({ partType: 'FINISHED' });
          
          const newPart = await prisma.part.create({
            data: {
              partNumber,
              partName: item.partName,
              partType: 'FINISHED', // Default to finished goods
              drawingNumber: item.drawingNumber,
              revisionLevel: item.revisionLevel,
            },
          });
          partId = newPart.id;
        }
        
        if (!partId) {
          throw new Error('Either partId or partName must be provided for each line item');
        }
        
        return {
          partId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          dueDate: item.dueDate ? new Date(item.dueDate) : null,
          notes: item.notes,
        };
      })
    );

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
          create: processedLineItems,
        },
      },
      include: {
        customer: true,
        lineItems: {
          include: {
            part: true, // Include Parts Master data
          },
        },
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
