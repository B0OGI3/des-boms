/**
 * QuickBooks Token Refresh Scheduler
 * 
 * Background service to automatically refresh QuickBooks tokens before they expire.
 * Can be used as a periodic background job or API endpoint.
 */

import { getTokenManager, autoRefreshTokens } from '@/lib/tokenManager';

/**
 * Background token refresh job
 * Call this periodically (e.g., every 30 minutes) to keep tokens fresh
 */
export async function runTokenRefreshJob(): Promise<{
  success: boolean;
  refreshed: boolean;
  message: string;
  timestamp: string;
}> {
  const timestamp = new Date().toISOString();
  
  try {
    console.log('[SCHEDULER] Running token refresh job at:', timestamp);
    
    const tokenManager = getTokenManager();
    const status = tokenManager.getTokenStatus();
    
    if (!status.hasTokens) {
      console.log('[SCHEDULER] No tokens configured, skipping refresh');
      return {
        success: true,
        refreshed: false,
        message: 'No tokens configured - OAuth setup required',
        timestamp
      };
    }

    // Attempt auto-refresh (only refreshes if tokens are invalid)
    const refreshed = await autoRefreshTokens();
    
    if (refreshed) {
      console.log('[SCHEDULER] Tokens were refreshed successfully');
      return {
        success: true,
        refreshed: true,
        message: 'Tokens refreshed automatically',
        timestamp
      };
    } else {
      console.log('[SCHEDULER] Tokens are still valid, no refresh needed');
      return {
        success: true,
        refreshed: false,
        message: 'Tokens are valid, no refresh needed',
        timestamp
      };
    }

  } catch (error: any) {
    console.error('[SCHEDULER] Token refresh job failed:', error);
    return {
      success: false,
      refreshed: false,
      message: error.message || 'Token refresh failed',
      timestamp
    };
  }
}

/**
 * Start periodic token refresh (for use in background services)
 * @param intervalMinutes How often to check tokens (default: 30 minutes)
 */
export function startTokenRefreshScheduler(intervalMinutes: number = 30): NodeJS.Timeout {
  const intervalMs = intervalMinutes * 60 * 1000;
  
  console.log(`[SCHEDULER] Starting token refresh scheduler (every ${intervalMinutes} minutes)`);
  
  // Run immediately
  runTokenRefreshJob().catch(error => {
    console.error('[SCHEDULER] Initial token refresh failed:', error);
  });
  
  // Then run periodically
  return setInterval(async () => {
    try {
      await runTokenRefreshJob();
    } catch (error) {
      console.error('[SCHEDULER] Scheduled token refresh failed:', error);
    }
  }, intervalMs);
}

/**
 * Stop the token refresh scheduler
 */
export function stopTokenRefreshScheduler(timer: NodeJS.Timeout): void {
  clearInterval(timer);
  console.log('[SCHEDULER] Token refresh scheduler stopped');
}
