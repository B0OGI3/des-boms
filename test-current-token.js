// Test current QuickBooks access token directly
require('dotenv').config();
const axios = require('axios');

async function testCurrentToken() {
  console.log('Testing current QuickBooks access token...');
  
  const accessToken = process.env.QB_ACCESS_TOKEN;
  const companyId = process.env.QB_COMPANY_ID;
  const sandbox = process.env.QB_SANDBOX === 'true';
  
  const baseUrl = sandbox 
    ? 'https://sandbox-quickbooks.api.intuit.com'
    : 'https://quickbooks.api.intuit.com';
  
  const url = `${baseUrl}/v3/company/${companyId}/query?query=${encodeURIComponent("SELECT * FROM Customer MAXRESULTS 1")}`;
  
  console.log('Testing with URL:', url);
  console.log('Company ID:', companyId);
  console.log('Sandbox mode:', sandbox);
  console.log('Access token (first 50 chars):', accessToken?.substring(0, 50) + '...');
  
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });
    
    console.log('SUCCESS! Current token is still valid.');
    console.log('Response status:', response.status);
    console.log('Customer count:', response.data?.QueryResponse?.Customer?.length || 0);
    
  } catch (error) {
    console.error('Current token test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Status Text:', error.response.statusText);
      console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 401) {
        console.error('Token has expired - needs refresh');
      } else if (error.response.status === 403) {
        console.error('Access forbidden - check app permissions');
      } else if (error.response.status === 400) {
        console.error('Bad request - check query format or company ID');
      }
    } else {
      console.error('Network error:', error.message);
    }
  }
}

testCurrentToken();
