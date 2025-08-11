/**
 * QuickBooks Configuration API
 * 
 * Provides information about QuickBooks integration status
 * and configuration for the frontend.
 */

import { NextResponse } from "next/server";

/**
 * GET /api/quickbooks/status - Get QuickBooks integration status
 */
export async function GET() {
  try {
    const isConfigured = !!(
      process.env.QB_CLIENT_ID && 
      process.env.QB_CLIENT_SECRET
    );

    const hasTokens = !!(
      process.env.QB_ACCESS_TOKEN && 
      process.env.QB_REFRESH_TOKEN && 
      process.env.QB_COMPANY_ID
    );

    // Determine status
    let status: string;
    let message: string;
    
    if (hasTokens) {
      status = 'connected';
      message = 'QuickBooks integration is active';
    } else if (isConfigured) {
      status = 'configured';
      message = 'QuickBooks is configured but not connected. OAuth setup required.';
    } else {
      status = 'not_configured';
      message = 'QuickBooks integration not configured';
    }

    return NextResponse.json({
      isConfigured,
      hasValidTokens: hasTokens,
      isSandbox: process.env.QB_SANDBOX === 'true',
      status,
      message
    });
  } catch (error) {
    console.error('Error checking QuickBooks status:', error);
    return NextResponse.json(
      { 
        isConfigured: false,
        hasValidTokens: false,
        status: 'error',
        message: 'Failed to check QuickBooks status'
      },
      { status: 500 }
    );
  }
}
