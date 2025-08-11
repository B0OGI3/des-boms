import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';

// POST /api/uploads - Handle file uploads for line items
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const lineItemId = formData.get('lineItemId') as string;
    const fileType = formData.get('fileType') as string;
    const uploadedBy = formData.get('uploadedBy') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!lineItemId) {
      return NextResponse.json(
        { success: false, error: 'Line item ID is required' },
        { status: 400 }
      );
    }

    // Validate file type (per spec: PDF, DWG, CAD models, specifications, certifications)
    const allowedTypes = [
      'application/pdf',
      'image/vnd.dwg',
      'application/acad',
      'application/x-dwg',
      'image/x-dwg',
      'application/dwg',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/zip',
      'application/x-zip-compressed',
      'model/step',
      'model/iges',
      'application/step',
      'application/iges'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { 
          success: false, 
          error: `File type ${file.type} not allowed. Supported: PDF, DWG, CAD models, images, documents` 
        },
        { status: 400 }
      );
    }

    // Create uploads directory structure
    const uploadsDir = join(process.cwd(), 'uploads', 'line-items', lineItemId);
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}_${originalName}`;
    const filePath = join(uploadsDir, fileName);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Save file metadata to database
    const fileAttachment = await prisma.fileAttachment.create({
      data: {
        fileName: originalName,
        storedFileName: fileName,
        filePath: `/uploads/line-items/${lineItemId}/${fileName}`,
        fileType: fileType || 'OTHER',
        mimeType: file.type,
        fileSize: file.size,
        uploadedBy: uploadedBy || 'Unknown',
        lineItemId: lineItemId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: fileAttachment,
    });

  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      },
      { status: 500 }
    );
  }
}

// GET /api/uploads - Get file attachments for a line item
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lineItemId = searchParams.get('lineItemId');

    if (!lineItemId) {
      return NextResponse.json(
        { success: false, error: 'Line item ID is required' },
        { status: 400 }
      );
    }

    const attachments = await prisma.fileAttachment.findMany({
      where: { lineItemId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: attachments,
    });

  } catch (error) {
    console.error('Error fetching attachments:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch attachments' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/uploads - Delete a file attachment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const attachmentId = searchParams.get('id');

    if (!attachmentId) {
      return NextResponse.json(
        { success: false, error: 'Attachment ID is required' },
        { status: 400 }
      );
    }

    // Get attachment details
    const attachment = await prisma.fileAttachment.findUnique({
      where: { id: attachmentId },
    });

    if (!attachment) {
      return NextResponse.json(
        { success: false, error: 'Attachment not found' },
        { status: 404 }
      );
    }

    // Delete from database
    await prisma.fileAttachment.delete({
      where: { id: attachmentId },
    });

    // Note: In production, you might also want to delete the physical file
    // from the filesystem, but for this implementation we'll keep it for safety

    return NextResponse.json({
      success: true,
      message: 'Attachment deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting attachment:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete attachment' 
      },
      { status: 500 }
    );
  }
}
