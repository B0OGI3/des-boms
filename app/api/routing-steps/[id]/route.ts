/**
 * Individual Routing Step API
 * GET /api/routing-steps/[id] - Get specific routing step
 * PUT /api/routing-steps/[id] - Update routing step
 * DELETE /api/routing-steps/[id] - Delete routing step
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

/**
 * GET /api/routing-steps/[id] - Get specific routing step
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const routingStep = await prisma.routingStep.findUnique({
      where: { id },
      include: {
        workstation: true,
        batch: {
          include: {
            lineItem: {
              include: {
                part: true,
                purchaseOrder: {
                  include: {
                    customer: true
                  }
                }
              }
            }
          }
        },
        confirmations: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!routingStep) {
      return NextResponse.json(
        { success: false, error: 'Routing step not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: routingStep
    });

  } catch (error) {
    console.error('Error fetching routing step:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch routing step',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/routing-steps/[id] - Update routing step
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const {
      workstationId,
      description,
      estimatedTime,
      notes,
      status,
      required
    } = body;

    // Check if routing step exists
    const existingStep = await prisma.routingStep.findUnique({
      where: { id }
    });

    if (!existingStep) {
      return NextResponse.json(
        { success: false, error: 'Routing step not found' },
        { status: 404 }
      );
    }

    // Update the routing step
    const updatedStep = await prisma.routingStep.update({
      where: { id },
      data: {
        ...(workstationId && { workstationId }),
        ...(description && { description }),
        ...(estimatedTime !== undefined && { estimatedTime }),
        ...(notes !== undefined && { notes }),
        ...(status && { status }),
        ...(required !== undefined && { required })
      },
      include: {
        workstation: true,
        batch: {
          include: {
            lineItem: {
              include: {
                part: true,
                purchaseOrder: {
                  include: {
                    customer: true
                  }
                }
              }
            }
          }
        },
        confirmations: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedStep,
      message: 'Routing step updated successfully'
    });

  } catch (error) {
    console.error('Error updating routing step:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update routing step',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/routing-steps/[id] - Delete routing step
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if routing step exists
    const existingStep = await prisma.routingStep.findUnique({
      where: { id },
      include: {
        confirmations: true
      }
    });

    if (!existingStep) {
      return NextResponse.json(
        { success: false, error: 'Routing step not found' },
        { status: 404 }
      );
    }

    // Don't allow deletion if step has been started (has confirmations)
    if (existingStep.confirmations.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Cannot delete routing step that has operator confirmations' 
        },
        { status: 400 }
      );
    }

    // Delete the routing step
    await prisma.routingStep.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Routing step deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting routing step:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete routing step',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
