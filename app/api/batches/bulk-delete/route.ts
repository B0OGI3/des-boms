/**
 * API route for bulk deleting batches
 */

import { NextRequest, NextResponse } from 'next/server';

interface BulkDeleteRequest {
  batchIds: string[];
}

export async function DELETE(request: NextRequest) {
  try {
    const body: BulkDeleteRequest = await request.json();
    const { batchIds } = body;

    if (!batchIds || batchIds.length === 0) {
      return NextResponse.json(
        { error: 'No batch IDs provided' },
        { status: 400 }
      );
    }

    // Mock implementation - in real app would use Prisma
    console.log(`Bulk deleting ${batchIds.length} batches:`, batchIds);

    // Simulate database deletion
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock response
    const result = {
      success: true,
      message: `Successfully deleted ${batchIds.length} batches`,
      deletedCount: batchIds.length,
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in bulk delete:', error);
    
    return NextResponse.json(
      { error: 'Failed to delete batches', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
