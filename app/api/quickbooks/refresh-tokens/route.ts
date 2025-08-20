/**
 * QuickBooks Token Refresh API Endpoint
 *
 * Manually refresh QuickBooks tokens and update .env file
 * GET /api/quickbooks/refresh-tokens
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTokenManager } from '@/lib/tokenManager';

export async function GET(_request: NextRequest) {
  try {
    console.log('[REFRESH API] Manual token refresh requested');

    const tokenManager = getTokenManager();

    // Check current token status
    const status = tokenManager.getTokenStatus();

    if (!status.hasTokens) {
      return NextResponse.json(
        {
          success: false,
          error: 'No QuickBooks tokens found',
          message: 'Please complete OAuth authentication first',
        },
        { status: 400 }
      );
    }

    // Validate current tokens first
    console.log('[REFRESH API] Validating current tokens...');
    const isValid = await tokenManager.validateCurrentTokens();

    if (isValid) {
      return NextResponse.json({
        success: true,
        message: 'Tokens are already valid',
        refreshed: false,
        status: status,
      });
    }

    // Refresh tokens and update .env file
    console.log('[REFRESH API] Refreshing tokens...');
    await tokenManager.refreshAndUpdate();

    // Get updated status
    const updatedStatus = tokenManager.getTokenStatus();

    return NextResponse.json({
      success: true,
      message: 'Tokens refreshed successfully',
      refreshed: true,
      status: updatedStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[REFRESH API] Token refresh failed:', error);

    const errorMessage = error.message || 'Unknown error occurred';

    // Check for specific error types
    if (errorMessage.includes('refresh_token')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid refresh token',
          message:
            'Refresh token is invalid or expired. Please re-authenticate with QuickBooks.',
          reAuthRequired: true,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Token refresh failed',
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function POST(_request: NextRequest) {
  // Same functionality as GET, but allows for future expansion
  return GET(_request);
}
