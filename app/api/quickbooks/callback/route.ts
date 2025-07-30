/**
 * QuickBooks OAuth Callback Handler
 * 
 * Handles the OAuth redirect from QuickBooks after user authorization.
 * Exchanges the authorization code for access tokens.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createOAuthClient } from '@/lib/quickbooks';

/**
 * GET /api/quickbooks/callback - Handle OAuth callback from QuickBooks
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const realmId = searchParams.get('realmId'); // This is the company ID
    const error = searchParams.get('error');

    // Check for OAuth errors
    if (error) {
      console.error('QuickBooks OAuth error:', error);
      return NextResponse.redirect(
        new URL(`/quickbooks/error?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    // Validate required parameters
    if (!code || !realmId) {
      console.error('Missing required OAuth parameters:', { code: !!code, realmId: !!realmId });
      return NextResponse.redirect(
        new URL('/quickbooks/error?error=missing_parameters', request.url)
      );
    }

    // Create OAuth client
    const oauthClient = createOAuthClient();

    // Exchange authorization code for tokens
    const authResponse = await oauthClient.createToken(request.url);
    
    if (!authResponse?.token) {
      throw new Error('Failed to get access token from QuickBooks');
    }

    const accessToken = authResponse.token.access_token;
    const refreshToken = authResponse.token.refresh_token;

    console.log('QuickBooks OAuth successful:', {
      companyId: realmId,
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
    });

    // In a production app, you would store these tokens securely in your database
    // For now, we'll show them to the user so they can add to environment variables
    
    // Redirect to success page with tokens (in production, store these securely)
    const successUrl = new URL('/quickbooks/success', request.url);
    successUrl.searchParams.set('companyId', realmId);
    successUrl.searchParams.set('accessToken', accessToken);
    if (refreshToken) {
      successUrl.searchParams.set('refreshToken', refreshToken);
    }

    return NextResponse.redirect(successUrl);

  } catch (error) {
    console.error('Error in QuickBooks OAuth callback:', error);
    return NextResponse.redirect(
      new URL(`/quickbooks/error?error=${encodeURIComponent('oauth_failed')}`, request.url)
    );
  }
}
