/**
 * Basic Environment Test API
 *
 * Simple test endpoint to check environment variables without importing QuickBooks service
 */

import { NextResponse } from 'next/server';
import axios from 'axios';
import OAuthClient from 'intuit-oauth';

/**
 * GET /api/quickbooks/env-test - Test environment variables only
 */
export async function GET() {
  try {
    console.log('[ENV-TEST] Checking environment variables...');

    const envCheck = {
      QB_CLIENT_ID: !!process.env.QB_CLIENT_ID,
      QB_CLIENT_SECRET: !!process.env.QB_CLIENT_SECRET,
      QB_ACCESS_TOKEN: !!process.env.QB_ACCESS_TOKEN,
      QB_REFRESH_TOKEN: !!process.env.QB_REFRESH_TOKEN,
      QB_COMPANY_ID: !!process.env.QB_COMPANY_ID,
      QB_SANDBOX: process.env.QB_SANDBOX,
      QB_REDIRECT_URI: !!process.env.QB_REDIRECT_URI,
    };

    console.log('[ENV-TEST] Environment check result:', envCheck);

    // Test basic axios import
    let axiosTest;
    try {
      axiosTest = !!axios;
      console.log('[ENV-TEST] Axios import:', axiosTest);
    } catch (err) {
      console.error('[ENV-TEST] Axios import error:', err);
      axiosTest = false;
    }

    // Test intuit-oauth import
    let oauthTest;
    try {
      oauthTest = !!OAuthClient;
      console.log('[ENV-TEST] intuit-oauth import:', oauthTest);
    } catch (err) {
      console.error('[ENV-TEST] intuit-oauth import error:', err);
      oauthTest = false;
    }

    return NextResponse.json({
      success: true,
      message: 'Environment test completed',
      environment: envCheck,
      dependencies: {
        axios: axiosTest,
        'intuit-oauth': oauthTest,
      },
    });
  } catch (error) {
    console.error('[ENV-TEST] Error occurred:', error);

    return NextResponse.json(
      {
        error: 'Environment test failed',
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
