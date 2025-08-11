// Debug QuickBooks token refresh with more details
require('dotenv').config();
const axios = require('axios');

async function debugTokenRefresh() {
  console.log('Debugging QuickBooks token refresh...');
  
  const refreshToken = process.env.QB_REFRESH_TOKEN;
  const clientId = process.env.QB_CLIENT_ID;
  const clientSecret = process.env.QB_CLIENT_SECRET;
  
  console.log('Refresh token:', refreshToken?.substring(0, 10) + '...' + refreshToken?.substring(refreshToken.length - 10));
  console.log('Client ID:', clientId);
  console.log('Client Secret:', clientSecret?.substring(0, 10) + '...');
  
  // Check for any whitespace or encoding issues
  console.log('Refresh token length:', refreshToken?.length);
  console.log('Client ID length:', clientId?.length);
  console.log('Client Secret length:', clientSecret?.length);
  
  // Check for hidden characters
  console.log('Refresh token trimmed:', refreshToken?.trim() === refreshToken);
  console.log('Client ID trimmed:', clientId?.trim() === clientId);
  
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    console.log('Basic auth (first 20 chars):', basicAuth.substring(0, 20) + '...');
    
    console.log('Making request to QuickBooks token endpoint...');
    console.log('Request body:', params.toString());
    
    const response = await axios.post(
      'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`,
          'Accept': 'application/json',
        },
      }
    );
    
    console.log('Success! New tokens received.');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('Detailed error information:');
    if (error.response) {
      console.error('HTTP Status:', error.response.status);
      console.error('Status Text:', error.response.statusText);
      console.error('Response Headers:', error.response.headers);
      console.error('Response Data:', error.response.data);
      
      // Check if it's a QuickBooks-specific error
      if (error.response.data?.error_description) {
        console.error('QB Error Description:', error.response.data.error_description);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
  }
}

debugTokenRefresh();
