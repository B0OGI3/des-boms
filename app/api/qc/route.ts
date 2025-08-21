import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '../../../generated/prisma';

// Helper function to validate QC update request
function validateQCUpdateRequest(body: any) {
  const { id, result } = body;

  if (!id) {
    return { isValid: false, error: 'Missing required field: id' };
  }

  if (result && !['PASS', 'FAIL', 'REWORK_REQUIRED'].includes(result)) {
    return {
      isValid: false,
      error: 'Invalid result. Must be PASS, FAIL, or REWORK_REQUIRED',
    };
  }

  return { isValid: true };
}

// Helper function to find existing QC record
async function findExistingQCRecord(id: string) {
  const existingRecord = await prisma.qCRecord.findUnique({
    where: { id },
    include: {
      batch: true,
    },
  });

  if (!existingRecord) {
    return { found: false, error: 'QC record not found', record: null };
  }

  return { found: true, record: existingRecord };
}

// Helper function to update batch status after QC change
async function updateBatchStatusAfterQCChange(
  existingRecord: any,
  newResult: string
) {
  if (newResult && newResult !== existingRecord.result) {
    const batchUpdate = getBatchStatusUpdate(newResult);

    if (batchUpdate) {
      await prisma.batch.update({
        where: { id: existingRecord.batchId },
        data: batchUpdate,
      });
    }
  }
}

// Helper function to validate QC request body
function validateQCRequest(body: any) {
  const { batchId, inspector, result } = body;

  if (!batchId || !inspector || !result) {
    return {
      isValid: false,
      error: 'Missing required fields: batchId, inspector, result',
    };
  }

  if (!['PASS', 'FAIL', 'REWORK_REQUIRED'].includes(result)) {
    return {
      isValid: false,
      error: 'Invalid result. Must be PASS, FAIL, or REWORK_REQUIRED',
    };
  }

  return { isValid: true };
}

// Helper function to validate batch for QC
async function validateBatchForQC(batchId: string) {
  const batch = await prisma.batch.findUnique({
    where: { id: batchId },
    include: {
      routingSteps: {
        include: {
          confirmations: true,
        },
      },
      lineItem: {
        include: {
          part: true,
          purchaseOrder: {
            include: {
              customer: true,
            },
          },
        },
      },
    },
  });

  if (!batch) {
    return { isValid: false, error: 'Batch not found', batch: null };
  }

  if (batch.status !== 'COMPLETED') {
    return {
      isValid: false,
      error: 'Batch must be completed before QC inspection',
      batch: null,
    };
  }

  return { isValid: true, batch };
}

// Helper function to handle rework scenario
async function handleReworkScenario(tx: any, batchId: string) {
  // Reset routing steps for rework
  await tx.routingStep.updateMany({
    where: { batchId },
    data: { status: 'PENDING' },
  });

  // Clear existing confirmations for rework
  await tx.stepConfirmation.deleteMany({
    where: {
      routingStep: {
        batchId,
      },
    },
  });
}

// Helper function to check and update order completion
async function checkOrderCompletion(tx: any, batch: any, inspector: string) {
  const orderBatches = await tx.batch.findMany({
    where: {
      lineItem: {
        orderId: batch.lineItem.orderId,
      },
    },
    include: {
      qcRecords: true,
    },
  });

  // Check if all batches are completed and have passing QC
  const allBatchesQCPassed = orderBatches.every(
    (b: any) =>
      b.status === 'COMPLETED' &&
      b.qcRecords.some((qc: any) => qc.result === 'PASS')
  );

  if (allBatchesQCPassed) {
    return {
      orderStatus: 'COMPLETED' as const,
      completedAt: new Date(),
      completedBy: inspector,
      completionNotes: `All batches completed and passed QC. Final QC by ${inspector}.`,
    };
  }

  return null;
}

// Helper function to determine batch status update
function getBatchStatusUpdate(
  result: string
): {
  status: 'COMPLETED' | 'CANCELLED' | 'IN_PROGRESS';
  actualCompletion?: null;
} | null {
  switch (result) {
    case 'PASS':
      return { status: 'COMPLETED' };
    case 'FAIL':
      return { status: 'CANCELLED' };
    case 'REWORK_REQUIRED':
      return { status: 'IN_PROGRESS', actualCompletion: null };
    default:
      return null;
  }
}

// GET /api/qc - Get QC records with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get('batchId');
    const inspector = searchParams.get('inspector');
    const result = searchParams.get('result');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const needsQC = searchParams.get('needsQC');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const where: Prisma.QCRecordWhereInput = {};
    if (batchId) where.batchId = batchId;
    if (inspector) where.inspector = inspector;
    if (result) where.result = result as Prisma.QCRecordWhereInput['result'];

    if (dateFrom || dateTo) {
      where.inspectionDate = {};
      if (dateFrom) where.inspectionDate.gte = new Date(dateFrom);
      if (dateTo) where.inspectionDate.lte = new Date(dateTo);
    }

    const qcRecords = await prisma.qCRecord.findMany({
      where,
      include: {
        batch: {
          include: {
            lineItem: {
              include: {
                part: true, // Include Parts Master data
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
                confirmations: {
                  include: {
                    operator: true,
                  },
                },
              },
              orderBy: {
                stepNumber: 'asc',
              },
            },
            materialConsumption: {
              include: {
                materialPart: true,
              },
            },
          },
        },
      },
      orderBy: {
        inspectionDate: 'desc',
      },
      skip,
      take: limit,
    });

    // If filtering for batches that need QC, get completed batches without QC records
    let batchesNeedingQC: any[] = [];
    if (needsQC === 'true') {
      batchesNeedingQC = await prisma.batch.findMany({
        where: {
          status: 'COMPLETED',
          qcRecords: {
            none: {},
          },
        },
        include: {
          lineItem: {
            include: {
              part: true,
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
              confirmations: {
                include: {
                  operator: true,
                },
              },
            },
            orderBy: {
              stepNumber: 'asc',
            },
          },
          materialConsumption: {
            include: {
              materialPart: true,
            },
          },
          qcRecords: true,
        },
        orderBy: {
          actualCompletion: 'desc',
        },
        take: 20, // Limit to most recent 20 batches needing QC
      });
    }

    // Get total count for pagination
    const totalCount = await prisma.qCRecord.count({ where });

    return NextResponse.json({
      success: true,
      data: qcRecords,
      batchesNeedingQC: batchesNeedingQC,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
      count: qcRecords.length,
    });
  } catch (error) {
    console.error('Error fetching QC records:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch QC records',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/qc - Create a new QC record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { batchId, inspector, result, notes, inspectionDate } = body;

    // Validate request
    const validation = validateQCRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Validate batch
    const batchValidation = await validateBatchForQC(batchId);
    if (!batchValidation.isValid) {
      const statusCode =
        batchValidation.error === 'Batch not found' ? 404 : 400;
      return NextResponse.json(
        { success: false, error: batchValidation.error },
        { status: statusCode }
      );
    }

    const batch = batchValidation.batch!;

    // Create QC record and update batch status in transaction
    const result_data = await prisma.$transaction(async tx => {
      const qcRecord = await tx.qCRecord.create({
        data: {
          batchId,
          inspector,
          result,
          notes,
          inspectionDate: inspectionDate
            ? new Date(inspectionDate)
            : new Date(),
        },
        include: {
          batch: {
            include: {
              lineItem: {
                include: {
                  part: true,
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
                  confirmations: {
                    include: {
                      operator: true,
                    },
                  },
                },
                orderBy: {
                  stepNumber: 'asc',
                },
              },
              materialConsumption: {
                include: {
                  materialPart: true,
                },
              },
            },
          },
        },
      });

      // Handle rework scenario
      if (result === 'REWORK_REQUIRED') {
        await handleReworkScenario(tx, batchId);
      }

      // Update batch status
      const batchUpdate = getBatchStatusUpdate(result);
      if (batchUpdate) {
        await tx.batch.update({
          where: { id: batchId },
          data: batchUpdate,
        });
      }

      // Check and update order completion for PASS result
      if (result === 'PASS') {
        const orderUpdate = await checkOrderCompletion(tx, batch, inspector);
        if (orderUpdate) {
          await tx.purchaseOrder.update({
            where: { id: batch.lineItem.orderId },
            data: orderUpdate,
          });
        }
      }

      return qcRecord;
    });

    // Determine status message
    const statusMessages = {
      PASS: 'Approved',
      FAIL: 'Rejected',
      REWORK_REQUIRED: 'Requires Rework',
    };
    const statusMessage = statusMessages[result as keyof typeof statusMessages];

    return NextResponse.json({
      success: true,
      data: result_data,
      message: `QC record created successfully. Batch status: ${statusMessage}`,
    });
  } catch (error) {
    console.error('Error creating QC record:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create QC record',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT /api/qc - Update QC record
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, inspector, result, notes } = body;

    // Validate request
    const validation = validateQCUpdateRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Find existing record
    const recordLookup = await findExistingQCRecord(id);
    if (!recordLookup.found) {
      return NextResponse.json(
        { success: false, error: recordLookup.error },
        { status: 404 }
      );
    }

    const existingRecord = recordLookup.record!;

    // Update QC record
    const qcRecord = await prisma.qCRecord.update({
      where: { id },
      data: {
        ...(inspector && { inspector }),
        ...(result && { result }),
        ...(notes !== undefined && { notes }),
      },
      include: {
        batch: {
          include: {
            lineItem: {
              include: {
                part: true,
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
                confirmations: {
                  include: {
                    operator: true,
                  },
                },
              },
              orderBy: {
                stepNumber: 'asc',
              },
            },
            materialConsumption: {
              include: {
                materialPart: true,
              },
            },
          },
        },
      },
    });

    // Update batch status if result changed
    await updateBatchStatusAfterQCChange(existingRecord, result);

    return NextResponse.json({
      success: true,
      data: qcRecord,
      message: 'QC record updated successfully',
    });
  } catch (error) {
    console.error('Error updating QC record:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update QC record',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/qc - Delete QC record (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameter: id',
        },
        { status: 400 }
      );
    }

    // Check if QC record exists
    const existingRecord = await prisma.qCRecord.findUnique({
      where: { id },
      include: {
        batch: true,
      },
    });

    if (!existingRecord) {
      return NextResponse.json(
        {
          success: false,
          error: 'QC record not found',
        },
        { status: 404 }
      );
    }

    // Delete QC record and potentially reset batch status
    await prisma.$transaction(async tx => {
      // Delete the QC record
      await tx.qCRecord.delete({
        where: { id },
      });

      // Check if there are other QC records for this batch
      const remainingQCRecords = await tx.qCRecord.findMany({
        where: { batchId: existingRecord.batchId },
      });

      // If no QC records remain, reset batch to COMPLETED status
      if (remainingQCRecords.length === 0) {
        await tx.batch.update({
          where: { id: existingRecord.batchId },
          data: { status: 'COMPLETED' },
        });
      }
    });

    return NextResponse.json({
      success: true,
      message: 'QC record deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting QC record:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete QC record',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
