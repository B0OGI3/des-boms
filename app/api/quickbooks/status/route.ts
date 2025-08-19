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
      // Actually validate the tokens by making a simple API call
      try {
        const companyId = process.env.QB_COMPANY_ID;
        const isSandbox = process.env.QB_SANDBOX === 'true';
        const baseUrl = isSandbox 
          ? 'https://sandbox-quickbooks.api.intuit.com'
          : 'https://quickbooks.api.intuit.com';
        const url = `${baseUrl}/v3/company/${companyId}/companyinfo/${companyId}`;
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${process.env.QB_ACCESS_TOKEN}`,
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          status = 'connected';
          message = 'QuickBooks integration is active';
        } else if (response.status === 401) {
          status = 'token_expired';
          message = 'QuickBooks tokens have expired. Please reconnect.';
        } else {
          status = 'error';
          message = `QuickBooks API error: ${response.status} ${response.statusText}`;
        }
      } catch (error) {
        console.error('QuickBooks token validation error:', error);
        status = 'error';
        message = 'Failed to validate QuickBooks connection';
      }
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
