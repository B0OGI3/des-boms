/**
 * Auto-generate PO numbers for orders
 * Format: PO-YYYYMMDD-XXXX (where XXXX is a sequential number for that day)
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get today's date in YYYYMMDD format
    const today = new Date();
    const dateStr = today.getFullYear().toString() + 
                   (today.getMonth() + 1).toString().padStart(2, '0') + 
                   today.getDate().toString().padStart(2, '0');
    
    // Find all orders created today to get the next sequence number
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    
    const todayOrders = await prisma.purchaseOrder.findMany({
      where: {
        createdAt: {
          gte: todayStart,
          lt: todayEnd
        }
      },
      select: {
        poNumber: true
      }
    });
    
    // Extract sequence numbers from today's PO numbers
    const todaySequences = todayOrders
      .map((order: { poNumber: string }) => {
        const regex = new RegExp(`^PO-${dateStr}-(\\d{4})$`);
        const match = regex.exec(order.poNumber);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((seq: number) => seq > 0);
    
    // Get the next sequence number
    const nextSequence = todaySequences.length > 0 ? Math.max(...todaySequences) + 1 : 1;
    
    // Generate the PO number
    const poNumber = `PO-${dateStr}-${nextSequence.toString().padStart(4, '0')}`;
    
    return NextResponse.json({ poNumber });
    
  } catch (error) {
    console.error('Error generating PO number:', error);
    return NextResponse.json(
      { error: 'Failed to generate PO number' },
      { status: 500 }
    );
  }
}
