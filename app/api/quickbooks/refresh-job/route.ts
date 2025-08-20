/**
 * QuickBooks Token Refresh Scheduler API
 *
 * Endpoint to run the background token refresh job
 * GET/POST /api/quickbooks/refresh-job
 */

import { NextRequest, NextResponse } from 'next/server';
import { runTokenRefreshJob } from '@/lib/tokenScheduler';

export async function GET(_request: NextRequest) {
  try {
    console.log('[REFRESH JOB API] Running token refresh job...');

    const result = await runTokenRefreshJob();

    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch (error: any) {
    console.error('[REFRESH JOB API] Failed to run refresh job:', error);

    return NextResponse.json(
      {
        success: false,
        refreshed: false,
        message: error.message || 'Failed to run refresh job',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(_request: NextRequest) {
  return GET(_request);
}
