/**
 * API route for exporting batches to CSV
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const batchIds = searchParams.get('batchIds')?.split(',') || [];

    if (batchIds.length === 0) {
      return NextResponse.json(
        { error: 'No batch IDs provided' },
        { status: 400 }
      );
    }

    // Mock batch data for export
    const mockBatches = batchIds.map((id, index) => ({
      id,
      batchId: `B${String(index + 1).padStart(6, '0')}`,
      partNumber: `P${String(index + 1000).padStart(4, '0')}`,
      partName: `Component ${index + 1}`,
      quantity: Math.floor(Math.random() * 100) + 1,
      priority: ['RUSH', 'STANDARD', 'HOLD'][Math.floor(Math.random() * 3)],
      status: ['QUEUED', 'IN_PROGRESS', 'COMPLETED'][Math.floor(Math.random() * 3)],
      customerName: `Customer ${String.fromCharCode(65 + (index % 26))}`,
      orderNumber: `SO-${String(index + 1000).padStart(4, '0')}`,
      createdAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    }));

    // Generate CSV content
    const headers = [
      'Batch ID',
      'Part Number',
      'Part Name',
      'Quantity',
      'Priority',
      'Status',
      'Customer',
      'Order Number',
      'Created Date',
      'Estimated Completion'
    ];

    const csvRows = [
      headers.join(','),
      ...mockBatches.map(batch => [
        batch.batchId,
        batch.partNumber,
        `"${batch.partName}"`,
        batch.quantity,
        batch.priority,
        batch.status,
        `"${batch.customerName}"`,
        batch.orderNumber,
        new Date(batch.createdAt).toLocaleDateString(),
        new Date(batch.estimatedCompletion).toLocaleDateString()
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');

    // Create response with CSV content
    const response = new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="batches-export-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });

    return response;

  } catch (error) {
    console.error('Error exporting batches:', error);
    
    return NextResponse.json(
      { error: 'Failed to export batches', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
