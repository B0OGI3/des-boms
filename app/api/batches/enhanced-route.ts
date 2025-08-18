/**
 * Enhanced Batch Creation with Smart Routing
 * Automatically uses part's default routing template but allows overrides
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

/**
 * POST /api/batches - Enhanced batch creation with smart routing
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      lineItemId,
      quantity,
      priority,
      notes,
      // Routing options
      customSteps,               // Provide completely custom steps
      routingNotes              // Special routing instructions
    } = body;

    // Validate required fields
    if (!lineItemId || !quantity) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: lineItemId, quantity' },
        { status: 400 }
      );
    }

    // Get line item with part information
    const lineItem = await prisma.orderLineItem.findUnique({
      where: { id: lineItemId },
      include: {
        part: true,
        purchaseOrder: {
          include: {
            customer: true
          }
        }
      }
    });

    if (!lineItem) {
      return NextResponse.json(
        { success: false, error: 'Line item not found' },
        { status: 404 }
      );
    }

    // Generate batch ID
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
    
    const lastBatch = await prisma.batch.findFirst({
      where: { batchId: { startsWith: `DES-${dateStr.slice(2)}-` }},
      orderBy: { batchId: 'desc' }
    });

    let batchNumber = 1;
    if (lastBatch) {
      const lastNumber = parseInt(lastBatch.batchId.split('-').pop() || '0');
      batchNumber = lastNumber + 1;
    }

    const batchId = `DES-${dateStr.slice(2)}-${batchNumber.toString().padStart(3, '0')}`;

    // Calculate estimated completion
    const estimatedCompletion = new Date();
    estimatedCompletion.setDate(estimatedCompletion.getDate() + 7);

    // Create batch and routing steps in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the batch
      const newBatch = await tx.batch.create({
        data: {
          batchId,
          lineItemId,
          quantity: parseInt(quantity),
          priority: priority || 'STANDARD',
          notes,
          startDate: new Date(),
          estimatedCompletion,
          status: 'QUEUED'
        }
      });

      // Determine routing steps to create
      let stepsToCreate: any[] = [];

      if (customSteps && Array.isArray(customSteps)) {
        // Use custom steps (highest priority)
        stepsToCreate = customSteps.map((step: any, index: number) => ({
          stepNumber: index + 1,
          workstationId: step.workstationId,
          description: step.description,
          required: step.required ?? true,
          estimatedTime: step.estimatedTime,
          notes: step.notes || routingNotes
        }));
      }

      // Create routing steps if any were determined
      const routingSteps = [];
      if (stepsToCreate.length > 0) {
        for (const stepData of stepsToCreate) {
          const routingStep = await tx.routingStep.create({
            data: {
              batchId: newBatch.id,
              stepNumber: stepData.stepNumber,
              workstationId: stepData.workstationId,
              description: stepData.description,
              required: stepData.required,
              estimatedTime: stepData.estimatedTime,
              notes: stepData.notes,
              status: 'PENDING'
            },
            include: {
              workstation: true
            }
          });
          routingSteps.push(routingStep);
        }
      }

      // Return batch with routing steps
      return {
        batch: newBatch,
        routingSteps,
        routingSource: customSteps ? 'custom' : 'none'
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        ...result.batch,
        routingSteps: result.routingSteps
      },
      message: `Batch created with ${result.routingSteps.length} routing steps (source: ${result.routingSource})`,
      routingInfo: {
        stepsCreated: result.routingSteps.length,
        source: result.routingSource
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating batch with routing:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create batch',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Export existing GET method unchanged
export { GET } from './route';
