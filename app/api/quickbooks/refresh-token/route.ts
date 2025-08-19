/**
 * QuickBooks Token Refresh API
 * 
 * Attempts to refresh the QuickBooks access token using the refresh token
 */

import { NextResponse } from "next/server";
import { getQuickBooksService } from "@/lib/quickbooks";

/**
 * POST /api/quickbooks/refresh-token - Refresh QuickBooks access token
 */
export async function POST() {
  try {
    console.log('[REFRESH] Attempting to refresh QuickBooks token...');
    
    const qbService = await getQuickBooksService();
    
    if (!qbService) {
      return NextResponse.json({ 
        error: "QuickBooks not configured or tokens missing" 
      }, { status: 503 });
    }

    // If we got the service successfully, the token refresh worked
    return NextResponse.json({ 
      success: true,
      message: "Token refreshed successfully" 
    });

  } catch (error) {
    console.error('[REFRESH] Token refresh failed:', error);
    
    return NextResponse.json({ 
      error: "Token refresh failed",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
