/**
 * QuickBooks Debug API
 * 
 * Simple test endpoint to debug QuickBooks connection issues
 */

import { NextResponse } from "next/server";
import { getQuickBooksService } from "@/lib/quickbooks";

/**
 * GET /api/quickbooks/debug - Debug QuickBooks connection
 */
export async function GET() {
  try {
    console.log('[DEBUG] Starting QuickBooks debug...');
    
    // Check environment variables
    const hasClientId = !!process.env.QB_CLIENT_ID;
    const hasClientSecret = !!process.env.QB_CLIENT_SECRET;
    const hasAccessToken = !!process.env.QB_ACCESS_TOKEN;
    const hasRefreshToken = !!process.env.QB_REFRESH_TOKEN;
    const hasCompanyId = !!process.env.QB_COMPANY_ID;
    
    console.log('[DEBUG] Environment check:', {
      hasClientId,
      hasClientSecret,
      hasAccessToken,
      hasRefreshToken,
      hasCompanyId,
      sandbox: process.env.QB_SANDBOX
    });

    // Try to get the service
    console.log('[DEBUG] Attempting to get QuickBooks service...');
    const qbService = await getQuickBooksService();
    
    if (!qbService) {
      return NextResponse.json({ 
        error: "QuickBooks service is null",
        environment: {
          hasClientId,
          hasClientSecret,
          hasAccessToken,
          hasRefreshToken,
          hasCompanyId
        }
      }, { status: 503 });
    }

    console.log('[DEBUG] QuickBooks service obtained successfully');
    
    // Try a simple API call
    console.log('[DEBUG] Testing getAllCustomers...');
    const customers = await qbService.getAllCustomers();
    
    console.log('[DEBUG] Success! Got', customers.length, 'customers');
    
    return NextResponse.json({ 
      success: true,
      customerCount: customers.length,
      environment: {
        hasClientId,
        hasClientSecret,
        hasAccessToken: hasAccessToken ? 'present' : 'missing',
        hasRefreshToken: hasRefreshToken ? 'present' : 'missing',
        hasCompanyId: hasCompanyId ? 'present' : 'missing',
        sandbox: process.env.QB_SANDBOX
      }
    });

  } catch (error) {
    console.error('[DEBUG] Error occurred:', error);
    
    return NextResponse.json({ 
      error: "Debug test failed",
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
