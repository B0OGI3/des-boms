/**
 * QuickBooks Customer Sync Test via API
 * Test QB connection and manually trigger customer sync
 */

const http = require('http');

function makeRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (error) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function testQBCustomerSync() {
  console.log('🔍 QuickBooks Customer Sync Test');
  console.log('================================\n');

  try {
    // 1. Check QB Status
    console.log('📊 Checking QuickBooks Status...');
    const statusResult = await makeRequest('/api/quickbooks/status');
    console.log('Status:', statusResult.data.status);
    console.log('Message:', statusResult.data.message);
    console.log('Has Valid Tokens:', statusResult.data.hasValidTokens);
    console.log('');

    // 2. Check current customers
    console.log('📋 Checking Current Customers...');
    const customersResult = await makeRequest('/api/customers');
    if (customersResult.status === 200) {
      console.log(`Found ${customersResult.data.length} customers in database`);
      if (customersResult.data.length > 0) {
        customersResult.data.forEach((customer, index) => {
          console.log(`   ${index + 1}. ${customer.name} (${customer.quickbooksId ? 'QB: ' + customer.quickbooksId : 'Local Only'})`);
        });
      }
    } else {
      console.log('Error fetching customers:', customersResult.data);
    }
    console.log('');

    // 3. Trigger QB customer sync if connected
    if (statusResult.data.status === 'connected' || statusResult.data.hasValidTokens) {
      console.log('🔄 Triggering QuickBooks Customer Sync...');
      const syncResult = await makeRequest('/api/quickbooks/sync-customers', 'POST');
      
      if (syncResult.status === 200) {
        console.log('✅ Sync successful!');
        console.log('Result:', syncResult.data);
        
        // Check customers again after sync
        console.log('\n📋 Customers After Sync...');
        const updatedCustomers = await makeRequest('/api/customers');
        if (updatedCustomers.status === 200) {
          console.log(`Now have ${updatedCustomers.data.length} customers`);
          updatedCustomers.data.forEach((customer, index) => {
            console.log(`   ${index + 1}. ${customer.name} (${customer.quickbooksId ? 'QB: ' + customer.quickbooksId : 'Local Only'})`);
          });
        }
      } else {
        console.log('❌ Sync failed:', syncResult.data);
      }
    } else {
      console.log('⚠️  QuickBooks not connected - cannot sync customers');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure your development server is running:');
    console.log('   pnpm run dev');
  }
}

testQBCustomerSync();
