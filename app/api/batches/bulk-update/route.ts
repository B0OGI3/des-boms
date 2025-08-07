/**
 * API route for bulk updating batches
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { BatchPriority, BatchStatus } from '../../../../generated/prisma';

interface BulkUpdateRequest {
  batchIds: string[];
  updates: {
    priority?: 'RUSH' | 'STANDARD' | 'HOLD';
    status?: 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  };
}

export async function PATCH(request: NextRequest) {
  try {
    const body: BulkUpdateRequest = await request.json();
    const { batchIds, updates } = body;

    if (!batchIds || batchIds.length === 0) {
      return NextResponse.json(
        { error: 'No batch IDs provided' },
        { status: 400 }
      );
    }

    // Validate updates object
    if (!updates || Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No updates provided' },
        { status: 400 }
      );
    }

    // Prepare update data for Prisma
    // Using any due to complex Prisma type unions for update operations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    
    if (updates.priority) {
      updateData.priority = updates.priority as BatchPriority;
    }
    
    if (updates.status) {
      updateData.status = updates.status as BatchStatus;
    }
    
    // Add updated timestamp
    updateData.updatedAt = new Date();

    // Update batches in database
    const result = await prisma.batch.updateMany({
      where: {
        id: {
          in: batchIds
        }
      },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${result.count} batches`,
      updatedCount: result.count,
      updates,
    });

  } catch (error) {
    console.error('Error in bulk update:', error);
    
    return NextResponse.json(
      { error: 'Failed to update batches', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
