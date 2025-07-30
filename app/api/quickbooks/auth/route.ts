/**
 * QuickBooks OAuth Initiation Handler
 * 
 * Redirects users to QuickBooks for OAuth authorization.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createOAuthClient } from '@/lib/quickbooks';

/**
 * GET /api/quickbooks/auth - Initiate OAuth flow with QuickBooks
 */
export async function GET(request: NextRequest) {
  try {
    // Create OAuth client
    const oauthClient = createOAuthClient();

    // Generate authorization URL
    const authUri = oauthClient.authorizeUri({
      scope: 'com.intuit.quickbooks.accounting', // Required scope for customer management
      state: 'DES-BOMS-' + Date.now(), // State parameter for security
    });

    console.log('Redirecting to QuickBooks OAuth:', authUri);

    // Redirect user to QuickBooks authorization page
    return NextResponse.redirect(authUri);

  } catch (error) {
    console.error('Error initiating QuickBooks OAuth:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initiate QuickBooks authorization',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
