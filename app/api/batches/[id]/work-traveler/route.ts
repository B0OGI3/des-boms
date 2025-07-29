import { NextRequest, NextResponse } from 'next/server';

// POST /api/batches/[id]/work-traveler - Generate work traveler PDF
// Note: This endpoint is temporarily disabled due to PDFKit font compatibility issues
// with Next.js server environment. Users should use the print function instead.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Work traveler PDF request for batch ID:', id);

    // Return a more user-friendly error for now
    return NextResponse.json(
      { 
        success: false, 
        error: 'PDF generation is temporarily unavailable',
        message: 'Please use the print function in the Work Traveler modal as an alternative. PDF generation will be restored in a future update.',
        code: 'PDF_GENERATION_DISABLED'
      },
      { status: 503 } // Service Temporarily Unavailable
    );

  } catch (error) {
    console.error('Error in work traveler endpoint:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process work traveler request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
