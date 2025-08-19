/**
 * QuickBooks Token Update Helper
 * 
 * Use this after completing the OAuth flow to update your .env.local file
 * Run with: node update-qb-tokens.js ACCESS_TOKEN COMPANY_ID [REFRESH_TOKEN]
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const accessToken = args[0];
const companyId = args[1];
const refreshToken = args[2];

if (!accessToken || !companyId) {
  console.log('❌ Missing required arguments');
  console.log('');
  console.log('Usage: node update-qb-tokens.js ACCESS_TOKEN COMPANY_ID [REFRESH_TOKEN]');
  console.log('');
  console.log('Example:');
  console.log('node update-qb-tokens.js "eyJ..." "9341454715237096" "RT1-..."');
  console.log('');
  process.exit(1);
}

async function updateEnvFile() {
  try {
    const envPath = path.join(__dirname, '.env.local');
    
    // Read current .env.local file
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    // Update or add QuickBooks tokens
    const lines = envContent.split('\n');
    let updatedLines = [];
    let foundAccessToken = false;
    let foundCompanyId = false;
    let foundRefreshToken = false;
    
    // Update existing lines or mark as found
    for (const line of lines) {
      if (line.startsWith('QB_ACCESS_TOKEN=')) {
        updatedLines.push(`QB_ACCESS_TOKEN="${accessToken}"`);
        foundAccessToken = true;
      } else if (line.startsWith('QB_COMPANY_ID=')) {
        updatedLines.push(`QB_COMPANY_ID="${companyId}"`);
        foundCompanyId = true;
      } else if (line.startsWith('QB_REFRESH_TOKEN=') && refreshToken) {
        updatedLines.push(`QB_REFRESH_TOKEN="${refreshToken}"`);
        foundRefreshToken = true;
      } else {
        updatedLines.push(line);
      }
    }
    
    // Add missing lines
    if (!foundAccessToken) {
      updatedLines.push(`QB_ACCESS_TOKEN="${accessToken}"`);
    }
    if (!foundCompanyId) {
      updatedLines.push(`QB_COMPANY_ID="${companyId}"`);
    }
    if (!foundRefreshToken && refreshToken) {
      updatedLines.push(`QB_REFRESH_TOKEN="${refreshToken}"`);
    }
    
    // Write updated content
    const updatedContent = updatedLines.join('\n');
    fs.writeFileSync(envPath, updatedContent);
    
    console.log('✅ Successfully updated .env.local file');
    console.log('');
    console.log('Updated variables:');
    console.log(`  ✓ QB_ACCESS_TOKEN (${accessToken.substring(0, 20)}...)`);
    console.log(`  ✓ QB_COMPANY_ID (${companyId})`);
    if (refreshToken) {
      console.log(`  ✓ QB_REFRESH_TOKEN (${refreshToken.substring(0, 20)}...)`);
    }
    console.log('');
    console.log('🔄 Please restart your development server:');
    console.log('   npm run dev');
    console.log('');
    console.log('🧪 Test the integration:');
    console.log('   http://localhost:3000/settings');
    
  } catch (error) {
    console.error('❌ Error updating .env.local file:', error.message);
    process.exit(1);
  }
}

updateEnvFile();
