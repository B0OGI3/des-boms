import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/batches/[id] - Get a specific batch
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const batch = await prisma.batch.findUnique({
      where: { id },
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
        routingSteps: {
          include: {
            workstation: true,
            confirmations: true,
          },
          orderBy: {
            stepNumber: 'asc',
          },
        },
        qcRecords: true,
      },
    });

    if (!batch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: batch,
    });
  } catch (error) {
    console.error('Error fetching batch:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch batch' },
      { status: 500 }
    );
  }
}

// PUT /api/batches/[id] - Update a specific batch
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return updateBatch(request, params);
}

// PATCH /api/batches/[id] - Partially update a specific batch
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return updateBatch(request, params);
}

// Shared update logic for PUT and PATCH
async function updateBatch(
  request: NextRequest,
  params: Promise<{ id: string }>
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { 
      status, 
      priority, 
      quantity, 
      notes, 
      startDate, 
      estimatedCompletion 
    } = body;

    // Validate that batch exists
    const existingBatch = await prisma.batch.findUnique({
      where: { id },
    });

    if (!existingBatch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Prepare update data - using any due to complex Prisma type unions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    
    if (status !== undefined) {
      updateData.status = status;
      
      // If starting the batch, set startDate
      if (status === 'IN_PROGRESS' && !existingBatch.startDate) {
        updateData.startDate = new Date();
      }
      
      // If completing the batch, set actualCompletion
      if (status === 'COMPLETED') {
        updateData.actualCompletion = new Date();
      }
    }
    
    if (priority !== undefined) updateData.priority = priority;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (notes !== undefined) updateData.notes = notes;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (estimatedCompletion !== undefined) {
      updateData.estimatedCompletion = new Date(estimatedCompletion);
    }

    const updatedBatch = await prisma.batch.update({
      where: { id },
      data: updateData,
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
        routingSteps: {
          include: {
            workstation: true,
            confirmations: true,
          },
          orderBy: {
            stepNumber: 'asc',
          },
        },
        qcRecords: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedBatch,
      message: 'Batch updated successfully',
    });
  } catch (error) {
    console.error('Error updating batch:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update batch' },
      { status: 500 }
    );
  }
}

// DELETE /api/batches/[id] - Delete a specific batch
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if batch exists
    const existingBatch = await prisma.batch.findUnique({
      where: { id },
    });

    if (!existingBatch) {
      return NextResponse.json(
        { success: false, error: 'Batch not found' },
        { status: 404 }
      );
    }

    // Delete the batch (cascade will handle related records)
    await prisma.batch.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Batch deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting batch:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete batch' },
      { status: 500 }
    );
  }
}
