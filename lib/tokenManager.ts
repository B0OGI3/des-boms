/**
 * QuickBooks Token Manager
 * 
 * Handles automatic token refresh and .env file updates for QuickBooks integration.
 * Provides both manual and automatic token refresh capabilities.
 */

import fs from 'fs';
import path from 'path';
import axios from 'axios';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  token_type?: string;
}

interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  expiresAt?: Date;
}

export class QuickBooksTokenManager {
  private static instance: QuickBooksTokenManager;
  private readonly envPath: string;
  private readonly tokenExpiryBuffer = 5 * 60 * 1000; // 5 minutes buffer before expiry

  private constructor() {
    // Support both .env.local and .env files
    const envLocalPath = path.join(process.cwd(), '.env.local');
    const envPath = path.join(process.cwd(), '.env');
    
    this.envPath = fs.existsSync(envLocalPath) ? envLocalPath : envPath;
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): QuickBooksTokenManager {
    if (!QuickBooksTokenManager.instance) {
      QuickBooksTokenManager.instance = new QuickBooksTokenManager();
    }
    return QuickBooksTokenManager.instance;
  }

  /**
   * Check if current tokens need refresh
   */
  public needsRefresh(): boolean {
    const accessToken = process.env.QB_ACCESS_TOKEN;
    const refreshToken = process.env.QB_REFRESH_TOKEN;
    
    if (!accessToken || !refreshToken) {
      console.log('[TOKEN] No tokens found - refresh needed');
      return true;
    }

    // QuickBooks access tokens typically expire after 1 hour
    // Since we don't store expiry time, we'll attempt refresh on any auth error
    return false;
  }

  /**
   * Refresh QuickBooks OAuth tokens
   */
  public async refreshTokens(): Promise<TokenInfo> {
    const refreshToken = process.env.QB_REFRESH_TOKEN;
    const clientId = process.env.QB_CLIENT_ID;
    const clientSecret = process.env.QB_CLIENT_SECRET;

    if (!refreshToken || !clientId || !clientSecret) {
      throw new Error('Missing QuickBooks credentials for token refresh');
    }

    console.log('[TOKEN] Refreshing QuickBooks tokens...');

    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', refreshToken);

      const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      
      const response = await axios.post<TokenResponse>(
        'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${basicAuth}`,
          },
          timeout: 10000, // 10 second timeout
        }
      );

      const { access_token, refresh_token, expires_in } = response.data;

      if (!access_token || !refresh_token) {
        throw new Error('Invalid token response from QuickBooks');
      }

      const tokenInfo: TokenInfo = {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expires_in ? new Date(Date.now() + expires_in * 1000) : undefined,
      };

      console.log('[TOKEN] Tokens refreshed successfully');
      return tokenInfo;

    } catch (error: any) {
      console.error('[TOKEN] Failed to refresh tokens:', error.response?.data || error.message);
      throw new Error(`Token refresh failed: ${error.response?.data?.error_description || error.message}`);
    }
  }

  /**
   * Update environment file with new tokens
   */
  public async updateEnvFile(tokenInfo: TokenInfo): Promise<void> {
    try {
      console.log('[TOKEN] Updating environment file...');

      // Read current env file
      let envContent = '';
      if (fs.existsSync(this.envPath)) {
        envContent = fs.readFileSync(this.envPath, 'utf8');
      }

      // Split into lines
      const lines = envContent.split('\n');
      const updatedLines: string[] = [];
      let foundAccessToken = false;
      let foundRefreshToken = false;

      // Process existing lines
      for (const line of lines) {
        if (line.startsWith('QB_ACCESS_TOKEN=')) {
          updatedLines.push(`QB_ACCESS_TOKEN="${tokenInfo.accessToken}"`);
          foundAccessToken = true;
        } else if (line.startsWith('QB_REFRESH_TOKEN=')) {
          updatedLines.push(`QB_REFRESH_TOKEN="${tokenInfo.refreshToken}"`);
          foundRefreshToken = true;
        } else {
          updatedLines.push(line);
        }
      }

      // Add missing tokens
      if (!foundAccessToken) {
        updatedLines.push(`QB_ACCESS_TOKEN="${tokenInfo.accessToken}"`);
      }
      if (!foundRefreshToken) {
        updatedLines.push(`QB_REFRESH_TOKEN="${tokenInfo.refreshToken}"`);
      }

      // Add timestamp comment
      const timestamp = new Date().toISOString();
      updatedLines.push(`# QuickBooks tokens updated: ${timestamp}`);

      // Write updated file
      const updatedContent = updatedLines.join('\n');
      fs.writeFileSync(this.envPath, updatedContent);

      // Update process.env for immediate use
      process.env.QB_ACCESS_TOKEN = tokenInfo.accessToken;
      process.env.QB_REFRESH_TOKEN = tokenInfo.refreshToken;

      console.log('[TOKEN] Environment file updated successfully');
      console.log(`[TOKEN] Updated file: ${this.envPath}`);

    } catch (error: any) {
      console.error('[TOKEN] Failed to update environment file:', error.message);
      throw new Error(`Failed to update environment file: ${error.message}`);
    }
  }

  /**
   * Perform complete token refresh and update env file
   */
  public async refreshAndUpdate(): Promise<TokenInfo> {
    try {
      const tokenInfo = await this.refreshTokens();
      await this.updateEnvFile(tokenInfo);
      return tokenInfo;
    } catch (error) {
      console.error('[TOKEN] Failed to refresh and update tokens:', error);
      throw error;
    }
  }

  /**
   * Get current token status
   */
  public getTokenStatus(): {
    hasTokens: boolean;
    accessToken?: string;
    refreshToken?: string;
    companyId?: string;
  } {
    return {
      hasTokens: !!(process.env.QB_ACCESS_TOKEN && process.env.QB_REFRESH_TOKEN),
      accessToken: process.env.QB_ACCESS_TOKEN ? process.env.QB_ACCESS_TOKEN.substring(0, 20) + '...' : undefined,
      refreshToken: process.env.QB_REFRESH_TOKEN ? process.env.QB_REFRESH_TOKEN.substring(0, 20) + '...' : undefined,
      companyId: process.env.QB_COMPANY_ID,
    };
  }

  /**
   * Validate current tokens by making a test API call
   */
  public async validateCurrentTokens(): Promise<boolean> {
    const accessToken = process.env.QB_ACCESS_TOKEN;
    const companyId = process.env.QB_COMPANY_ID;

    if (!accessToken || !companyId) {
      return false;
    }

    try {
      const baseUrl = process.env.QB_SANDBOX === 'true' 
        ? 'https://sandbox-quickbooks.api.intuit.com'
        : 'https://quickbooks.api.intuit.com';

      const response = await axios.get(
        `${baseUrl}/v3/company/${companyId}/companyinfo/${companyId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );

      return response.status === 200;
    } catch (error: any) {
      console.log('[TOKEN] Token validation failed:', error.response?.status || error.message);
      return false;
    }
  }
}

/**
 * Convenience function to get the token manager instance
 */
export function getTokenManager(): QuickBooksTokenManager {
  return QuickBooksTokenManager.getInstance();
}

/**
 * Auto-refresh tokens if needed (call this periodically)
 */
export async function autoRefreshTokens(): Promise<boolean> {
  const tokenManager = getTokenManager();
  
  try {
    // First validate current tokens
    const isValid = await tokenManager.validateCurrentTokens();
    
    if (!isValid) {
      console.log('[TOKEN] Current tokens are invalid, attempting refresh...');
      await tokenManager.refreshAndUpdate();
      console.log('[TOKEN] Tokens refreshed successfully');
      return true;
    } else {
      console.log('[TOKEN] Current tokens are valid');
      return false;
    }
  } catch (error) {
    console.error('[TOKEN] Auto-refresh failed:', error);
    return false;
  }
}
