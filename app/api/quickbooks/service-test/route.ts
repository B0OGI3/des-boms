/**
 * QuickBooks Service Import Test API
 * 
 * Test QuickBooks service imports step by step to identify the exact issue
 */

import { NextResponse } from "next/server";

/**
 * GET /api/quickbooks/service-test - Test QuickBooks service import
 */
export async function GET() {
  try {
    console.log('[SERVICE-TEST] Starting QuickBooks service import test...');
    
    // Step 1: Test basic imports
    console.log('[SERVICE-TEST] Step 1: Testing basic imports...');
    await import('axios');
    await import('intuit-oauth');
    console.log('[SERVICE-TEST] Basic imports successful');

    // Step 2: Test QuickBooks lib import
    console.log('[SERVICE-TEST] Step 2: Testing QuickBooks lib import...');
    const qbLib = await import('@/lib/quickbooks');
    console.log('[SERVICE-TEST] QuickBooks lib imported successfully');

    // Step 3: Test getQuickBooksService function existence
    console.log('[SERVICE-TEST] Step 3: Testing getQuickBooksService function...');
    const { getQuickBooksService } = qbLib;
    console.log('[SERVICE-TEST] getQuickBooksService function found:', typeof getQuickBooksService);

    // Step 4: Test environment variable access within service
    console.log('[SERVICE-TEST] Step 4: Testing environment variables...');
    const accessToken = process.env.QB_ACCESS_TOKEN || '';
    const refreshToken = process.env.QB_REFRESH_TOKEN || '';
    const companyId = process.env.QB_COMPANY_ID || '';
    
    console.log('[SERVICE-TEST] Environment vars:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      hasCompanyId: !!companyId,
      accessTokenLength: accessToken.length,
      refreshTokenLength: refreshToken.length,
      companyIdLength: companyId.length
    });

    // Step 5: Try to create the service (this is where it might fail)
    console.log('[SERVICE-TEST] Step 5: Attempting to call getQuickBooksService...');
    const qbService = await getQuickBooksService();
    console.log('[SERVICE-TEST] getQuickBooksService result:', qbService ? 'Service created' : 'Service is null');

    return NextResponse.json({ 
      success: true,
      message: "Service test completed successfully",
      results: {
        importsWorking: true,
        functionExists: typeof getQuickBooksService === 'function',
        environmentVars: {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          hasCompanyId: !!companyId,
          accessTokenLength: accessToken.length,
          refreshTokenLength: refreshToken.length
        },
        serviceCreated: !!qbService
      }
    });

  } catch (error) {
    console.error('[SERVICE-TEST] Error occurred at step:', error);
    
    return NextResponse.json({ 
      error: "Service test failed",
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
