// Test QuickBooks token refresh
require('dotenv').config();
const axios = require('axios');

async function testTokenRefresh() {
  console.log('Testing QuickBooks token refresh...');
  
  const refreshToken = process.env.QB_REFRESH_TOKEN;
  const clientId = process.env.QB_CLIENT_ID;
  const clientSecret = process.env.QB_CLIENT_SECRET;
  
  if (!refreshToken || !clientId || !clientSecret) {
    console.error('Missing required configuration for token refresh');
    return;
  }
  
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    console.log('Attempting token refresh...');
    const response = await axios.post(
      'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`,
        },
      }
    );
    
    console.log('Token refresh successful!');
    console.log('New access token length:', response.data.access_token?.length || 0);
    console.log('New refresh token length:', response.data.refresh_token?.length || 0);
    console.log('Token type:', response.data.token_type);
    console.log('Expires in:', response.data.expires_in, 'seconds');
    
    // You would update your .env file with these new tokens
    console.log('\nTo update your .env file:');
    console.log('QB_ACCESS_TOKEN="' + response.data.access_token + '"');
    console.log('QB_REFRESH_TOKEN="' + response.data.refresh_token + '"');
    
  } catch (error) {
    console.error('Token refresh failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testTokenRefresh();
