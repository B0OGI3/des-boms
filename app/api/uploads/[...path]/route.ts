import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';

// Helper function to determine MIME type from file extension
function getMimeType(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf': return 'application/pdf';
    case 'dwg': return 'application/acad';
    case 'step':
    case 'stp': return 'application/step';
    case 'iges':
    case 'igs': return 'application/iges';
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'png': return 'image/png';
    case 'txt': return 'text/plain';
    default: return 'application/octet-stream';
  }
}

/**
 * GET /api/uploads/[...path] - Serve uploaded files
 * Supports serving files by path or by file ID
 * Examples:
 * - GET /api/uploads/line-items/123/drawing.pdf
 * - GET /api/uploads/file/abc123def456
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    
    if (!path || path.length === 0) {
      return NextResponse.json(
        { error: 'File path required' },
        { status: 400 }
      );
    }

    let filePath: string;
    let fileName: string;
    let mimeType: string;

    // Handle file by ID: /api/uploads/file/[fileId]
    if (path[0] === 'file' && path[1]) {
      const fileId = path[1];
      const fileRecord = await prisma.fileAttachment.findUnique({
        where: { id: fileId }
      });

      if (!fileRecord) {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        );
      }

      // Construct file path from stored information
      const uploadsDir = join(process.cwd(), 'uploads');
      filePath = join(uploadsDir, fileRecord.filePath.replace('/uploads/', ''));
      fileName = fileRecord.fileName;
      mimeType = fileRecord.mimeType;
    } 
    // Handle direct file path: /api/uploads/line-items/[lineItemId]/[filename]
    else {
      const uploadsDir = join(process.cwd(), 'uploads');
      filePath = join(uploadsDir, ...path);
      fileName = path[path.length - 1];
      mimeType = getMimeType(fileName);
    }

    // Read and serve the file
    const fileBuffer = await readFile(filePath);
    
    const response = new NextResponse(new Uint8Array(fileBuffer));
    response.headers.set('Content-Type', mimeType);
    response.headers.set('Content-Disposition', `inline; filename="${fileName}"`);
    response.headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    return response;

  } catch (error) {
    console.error('File serve error:', error);
    
    if ((error as any).code === 'ENOENT') {
      return NextResponse.json(
        { error: 'File not found on disk' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to serve file' },
      { status: 500 }
    );
  }
}
