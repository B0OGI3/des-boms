import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/orders/[id]/ship - Mark order as shipped
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { shippedBy, shippingNotes, trackingNumber, carrier } = body;

    const { id: orderId } = await params;

    // Validate required fields
    if (!shippedBy) {
      return NextResponse.json(
        {
          success: false,
          error: 'shippedBy is required',
        },
        { status: 400 }
      );
    }

    // First, verify the order exists and is completed
    const existingOrder = await prisma.purchaseOrder.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found',
        },
        { status: 404 }
      );
    }

    // Check order status for shipping eligibility
    if (existingOrder.orderStatus === 'SHIPPED') {
      return NextResponse.json(
        {
          success: false,
          error: 'Order is already shipped',
        },
        { status: 400 }
      );
    }

    if (existingOrder.orderStatus !== 'COMPLETED') {
      return NextResponse.json(
        {
          success: false,
          error: 'Order must be completed before shipping',
        },
        { status: 400 }
      );
    }

    // Build shipping notes with tracking info
    let fullShippingNotes = shippingNotes || '';
    if (trackingNumber) {
      fullShippingNotes += `\nTracking: ${trackingNumber}`;
    }
    if (carrier) {
      fullShippingNotes += `\nCarrier: ${carrier}`;
    }

    // Update the order to shipped status
    const updatedOrder = await prisma.purchaseOrder.update({
      where: { id: orderId },
      data: {
        orderStatus: 'SHIPPED',
        shippedAt: new Date(),
        shippedBy,
        shippingNotes: fullShippingNotes.trim(),
      },
      include: {
        customer: true,
        lineItems: {
          include: {
            part: true,
            batches: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: 'Order marked as shipped successfully',
    });
  } catch (error) {
    console.error('Error shipping order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to ship order',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
