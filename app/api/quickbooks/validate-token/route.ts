/**
 * QuickBooks Token Validation API
 * 
 * Simple endpoint to test if QuickBooks tokens are valid without performing operations
 */

import { NextResponse } from "next/server";
import { getQuickBooksService } from "@/lib/quickbooks";

/**
 * GET /api/quickbooks/validate-token - Validate QuickBooks tokens
 */
export async function GET() {
  try {
    console.log('[VALIDATE] Starting QuickBooks token validation...');
    
    const qbService = await getQuickBooksService();
    
    if (!qbService) {
      return NextResponse.json({ 
        valid: false,
        error: "QuickBooks not configured",
        status: "not_configured"
      });
    }

    // Try a simple API call to validate the token
    // We'll use the company info endpoint which is lightweight
    const companyId = process.env.QB_COMPANY_ID;
    const isSandbox = process.env.QB_SANDBOX === 'true';
    const baseUrl = isSandbox 
      ? 'https://sandbox-quickbooks.api.intuit.com'
      : 'https://quickbooks.api.intuit.com';
    const url = `${baseUrl}/v3/company/${companyId}/companyinfo/${companyId}`;
    
    console.log('[VALIDATE] Making request to:', url);
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.QB_ACCESS_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      console.log('[VALIDATE] Token is valid');
      return NextResponse.json({ 
        valid: true,
        status: "connected"
      });
    } else if (response.status === 401) {
      console.log('[VALIDATE] Token is invalid (401)');
      return NextResponse.json({ 
        valid: false,
        error: "Token expired or invalid",
        status: "token_expired"
      });
    } else {
      const errorText = await response.text();
      console.log('[VALIDATE] API error:', response.status, response.statusText, errorText);
      return NextResponse.json({ 
        valid: false,
        error: `API error: ${response.status} ${response.statusText}`,
        details: errorText,
        status: "error"
      });
    }

  } catch (error) {
    console.error('[VALIDATE] Error occurred:', error);
    
    // Check if it's an axios error with invalid_grant
    if (error instanceof Error && error.message.includes('invalid_grant')) {
      return NextResponse.json({ 
        valid: false,
        error: "Refresh token expired",
        status: "token_expired"
      });
    }
    
    return NextResponse.json({ 
      error: "Token validation failed",
      details: error instanceof Error ? error.message : String(error),
      status: "error"
    }, { status: 500 });
  }
}
