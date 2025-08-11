// Test QuickBooks integration
const axios = require('axios');

async function testQuickBooksIntegration() {
  console.log('Testing QuickBooks integration...');
  
  try {
    // Test status endpoint
    console.log('1. Testing status endpoint...');
    const statusResponse = await axios.get('http://localhost:3000/api/quickbooks/status');
    console.log('Status:', statusResponse.data);
    
    // Test sync endpoint
    console.log('2. Testing sync endpoint...');
    const syncResponse = await axios.post('http://localhost:3000/api/quickbooks/sync-customers');
    console.log('Sync success:', syncResponse.data);
    
  } catch (error) {
    console.error('Error details:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request made but no response:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
}

testQuickBooksIntegration();
