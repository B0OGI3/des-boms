import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '../../../generated/prisma';

// GET /api/qc - Get QC records with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get('batchId');
    const inspector = searchParams.get('inspector');
    const result = searchParams.get('result');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    
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
          },
        },
      },
      orderBy: {
        inspectionDate: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: qcRecords,
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
    const {
      batchId,
      inspector,
      result,
      notes,
      inspectionDate,
    } = body;

    // Validate required fields
    if (!batchId || !inspector || !result) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: batchId, inspector, result',
        },
        { status: 400 }
      );
    }

    // Validate result enum
    if (!['PASS', 'FAIL', 'REWORK_REQUIRED'].includes(result)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid result. Must be PASS, FAIL, or REWORK_REQUIRED',
        },
        { status: 400 }
      );
    }

    const qcRecord = await prisma.qCRecord.create({
      data: {
        batchId,
        inspector,
        result,
        notes,
        inspectionDate: inspectionDate ? new Date(inspectionDate) : new Date(),
      },
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
          },
        },
      },
    });

    // Update batch status based on QC result
    let newBatchStatus: 'COMPLETED' | 'CANCELLED' | 'IN_PROGRESS' | null = null;
    if (result === 'PASS') {
      newBatchStatus = 'COMPLETED';
    } else if (result === 'FAIL') {
      newBatchStatus = 'CANCELLED';
    } else if (result === 'REWORK_REQUIRED') {
      newBatchStatus = 'IN_PROGRESS';
      // Optionally reset routing steps for rework
    }

    if (newBatchStatus) {
      await prisma.batch.update({
        where: { id: batchId },
        data: { status: newBatchStatus },
      });
    }

    return NextResponse.json({
      success: true,
      data: qcRecord,
      message: 'QC record created successfully',
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

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: id',
        },
        { status: 400 }
      );
    }

    // Validate result enum if provided
    if (result && !['PASS', 'FAIL', 'REWORK_REQUIRED'].includes(result)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid result. Must be PASS, FAIL, or REWORK_REQUIRED',
        },
        { status: 400 }
      );
    }

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
                part: true, // Include Parts Master data
                purchaseOrder: {
                  include: {
                    customer: true,
                  },
                },
              },
            },
          },
        },
      },
    });

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
