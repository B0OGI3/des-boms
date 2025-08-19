#!/usr/bin/env node
/**
 * QuickBooks Token Auto-Refresh Script
 * 
 * Standalone script to refresh QuickBooks tokens and update .env file.
 * Can be run manually or as a scheduled task/cron job.
 * 
 * Usage:
 *   node refresh-qb-tokens.js [--force] [--validate-only]
 * 
 * Options:
 *   --force        Force refresh even if tokens appear valid
 *   --validate-only Only validate tokens, don't refresh
 *   --quiet        Minimal output
 */

const path = require('path');
const fs = require('fs');

// Set up environment
require('dotenv').config({ path: path.join(__dirname, '.env.local') });
require('dotenv').config(); // fallback to .env

// Parse command line arguments
const args = process.argv.slice(2);
const forceRefresh = args.includes('--force');
const validateOnly = args.includes('--validate-only');
const quiet = args.includes('--quiet');

function log(message) {
  if (!quiet) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}

function error(message) {
  console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
}

// Simple token validation function
async function validateTokens() {
  const axios = require('axios');
  
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
  } catch (err) {
    // Token validation failed - this is expected when tokens are expired
    log(`Token validation failed: ${err.message || 'Unknown error'}`);
    return false;
  }
}

// Token refresh function
async function refreshTokens() {
  const axios = require('axios');
  
  const refreshToken = process.env.QB_REFRESH_TOKEN;
  const clientId = process.env.QB_CLIENT_ID;
  const clientSecret = process.env.QB_CLIENT_SECRET;
  
  if (!refreshToken || !clientId || !clientSecret) {
    throw new Error('Missing QuickBooks credentials for token refresh');
  }
  
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  const response = await axios.post(
    'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
      timeout: 10000,
    }
  );
  
  const { access_token, refresh_token } = response.data;
  
  if (!access_token || !refresh_token) {
    throw new Error('Invalid token response from QuickBooks');
  }
  
  return {
    accessToken: access_token,
    refreshToken: refresh_token,
  };
}

// Update .env file
function updateEnvFile(accessToken, refreshToken) {
  const envPath = fs.existsSync('.env.local') ? '.env.local' : '.env';
  
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  const lines = envContent.split('\n');
  const updatedLines = [];
  let foundAccessToken = false;
  let foundRefreshToken = false;
  
  // Update existing lines
  for (const line of lines) {
    if (line.startsWith('QB_ACCESS_TOKEN=')) {
      updatedLines.push(`QB_ACCESS_TOKEN="${accessToken}"`);
      foundAccessToken = true;
    } else if (line.startsWith('QB_REFRESH_TOKEN=')) {
      updatedLines.push(`QB_REFRESH_TOKEN="${refreshToken}"`);
      foundRefreshToken = true;
    } else if (line.startsWith('# QuickBooks tokens updated:')) {
      // Skip old timestamp comments
      continue;
    } else {
      updatedLines.push(line);
    }
  }
  
  // Add missing tokens
  if (!foundAccessToken) {
    updatedLines.push(`QB_ACCESS_TOKEN="${accessToken}"`);
  }
  if (!foundRefreshToken) {
    updatedLines.push(`QB_REFRESH_TOKEN="${refreshToken}"`);
  }
  
  // Add timestamp
  updatedLines.push(`# QuickBooks tokens updated: ${new Date().toISOString()}`);
  
  // Write file
  const updatedContent = updatedLines.join('\n');
  fs.writeFileSync(envPath, updatedContent);
  
  log(`Environment file updated: ${envPath}`);
}

// Main function
async function main() {
  try {
    log('QuickBooks Token Auto-Refresh Starting...');
    
    // Check if we have the required environment variables
    if (!process.env.QB_CLIENT_ID || !process.env.QB_CLIENT_SECRET) {
      error('Missing QB_CLIENT_ID or QB_CLIENT_SECRET environment variables');
      process.exit(1);
    }
    
    if (!process.env.QB_REFRESH_TOKEN) {
      error('Missing QB_REFRESH_TOKEN - OAuth setup required first');
      process.exit(1);
    }
    
    // Validate current tokens
    log('Validating current tokens...');
    const isValid = await validateTokens();
    
    if (validateOnly) {
      if (isValid) {
        log('✅ Tokens are valid');
        process.exit(0);
      } else {
        log('❌ Tokens are invalid');
        process.exit(1);
      }
    }
    
    if (isValid && !forceRefresh) {
      log('✅ Tokens are already valid, no refresh needed');
      process.exit(0);
    }
    
    if (forceRefresh) {
      log('🔄 Force refresh requested...');
    } else {
      log('🔄 Tokens are invalid, refreshing...');
    }
    
    // Refresh tokens
    const newTokens = await refreshTokens();
    
    // Update .env file
    updateEnvFile(newTokens.accessToken, newTokens.refreshToken);
    
    log('✅ Tokens refreshed successfully');
    log(`   Access Token: ${newTokens.accessToken.substring(0, 20)}...`);
    log(`   Refresh Token: ${newTokens.refreshToken.substring(0, 20)}...`);
    
    // Validate new tokens
    process.env.QB_ACCESS_TOKEN = newTokens.accessToken;
    process.env.QB_REFRESH_TOKEN = newTokens.refreshToken;
    
    const newIsValid = await validateTokens();
    if (newIsValid) {
      log('✅ New tokens validated successfully');
    } else {
      log('⚠️  Warning: New tokens failed validation');
    }
    
  } catch (err) {
    error(err.message);
    
    if (err.message.includes('refresh_token')) {
      error('Refresh token is invalid or expired');
      error('Please re-authenticate with QuickBooks:');
      error('  http://localhost:3000/api/quickbooks/auth');
    }
    
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, validateTokens, refreshTokens, updateEnvFile };
