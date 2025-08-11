// Test QuickBooks token and configuration
require('dotenv').config();

console.log('QuickBooks Configuration:');
console.log('QB_CLIENT_ID:', process.env.QB_CLIENT_ID ? 'Set' : 'Not set');
console.log('QB_CLIENT_SECRET:', process.env.QB_CLIENT_SECRET ? 'Set' : 'Not set');
console.log('QB_SANDBOX:', process.env.QB_SANDBOX);
console.log('QB_COMPANY_ID:', process.env.QB_COMPANY_ID);
console.log('QB_ACCESS_TOKEN length:', process.env.QB_ACCESS_TOKEN?.length || 0);
console.log('QB_REFRESH_TOKEN length:', process.env.QB_REFRESH_TOKEN?.length || 0);

// Check if tokens look valid
const accessToken = process.env.QB_ACCESS_TOKEN;
if (accessToken) {
  console.log('Access token starts with:', accessToken.substring(0, 20) + '...');
  console.log('Access token format looks like JWT:', accessToken.includes('.'));
}

const QB_SANDBOX = process.env.QB_SANDBOX === 'true';
const QB_BASE_URL = QB_SANDBOX 
  ? 'https://sandbox-quickbooks.api.intuit.com'
  : 'https://quickbooks.api.intuit.com';

console.log('QB_BASE_URL:', QB_BASE_URL);

const testUrl = `${QB_BASE_URL}/v3/company/${process.env.QB_COMPANY_ID}/query?query=${encodeURIComponent("SELECT * FROM Customer")}`;
console.log('Test URL would be:', testUrl);
