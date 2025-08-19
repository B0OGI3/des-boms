/**
 * QuickBooks API Call Test
 * 
 * Test actual QuickBooks API calls to identify authentication issues
 */

import { NextResponse } from "next/server";
import { getQuickBooksService } from "@/lib/quickbooks";

/**
 * GET /api/quickbooks/api-test - Test QuickBooks API call
 */
export async function GET() {
  try {
    console.log('[API-TEST] Starting QuickBooks API call test...');
    
    // Get the service
    console.log('[API-TEST] Getting QuickBooks service...');
    const qbService = await getQuickBooksService();
    
    if (!qbService) {
      return NextResponse.json({ 
        error: "QuickBooks service is null"
      }, { status: 503 });
    }

    console.log('[API-TEST] Service obtained, attempting API call...');
    
    // Try to get customers
    const customers = await qbService.getAllCustomers();
    
    console.log('[API-TEST] API call successful! Got', customers.length, 'customers');
    
    return NextResponse.json({ 
      success: true,
      message: "API call successful",
      customerCount: customers.length,
      sampleCustomer: customers.length > 0 ? {
        id: customers[0].Id,
        name: customers[0].DisplayName
      } : null
    });

  } catch (error: any) {
    console.error('[API-TEST] Error occurred:', error);
    
    // Try to get more details about the error
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers
    };
    
    console.error('[API-TEST] Error details:', errorDetails);
    
    return NextResponse.json({ 
      error: "API call failed",
      details: errorDetails,
      fullError: error instanceof Error ? error.stack : String(error)
    }, { status: 500 });
  }
}
