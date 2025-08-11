/**
 * QuickBooks Customer Sync Diagnostic
 * Check what customers are available and sync status
 */

const { PrismaClient } = require('@prisma/client');

async function diagnoseCustomerSync() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 QuickBooks Customer Sync Diagnostic');
    console.log('=====================================\n');

    // Check local customers
    const localCustomers = await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' }
    });

    console.log('📊 Local Database Status:');
    console.log(`   Total customers: ${localCustomers.length}`);
    
    if (localCustomers.length > 0) {
      console.log('\n📋 Customer Details:');
      localCustomers.forEach((customer, index) => {
        console.log(`   ${index + 1}. ${customer.name}`);
        console.log(`      Email: ${customer.email || 'N/A'}`);
        console.log(`      QB ID: ${customer.quickbooksId || 'Local Only'}`);
        console.log(`      Sync Status: ${customer.syncStatus || 'N/A'}`);
        console.log(`      Last Synced: ${customer.lastSyncedAt || 'Never'}`);
        console.log('');
      });
    } else {
      console.log('   ❌ No customers found in database');
    }

    // Check for QuickBooks environment
    console.log('🔧 QuickBooks Configuration:');
    console.log(`   Access Token: ${process.env.QB_ACCESS_TOKEN ? '✅ Present' : '❌ Missing'}`);
    console.log(`   Company ID: ${process.env.QB_COMPANY_ID || '❌ Missing'}`);
    console.log(`   Refresh Token: ${process.env.QB_REFRESH_TOKEN ? '✅ Present' : '❌ Missing'}`);

    console.log('\n💡 Next Steps:');
    if (localCustomers.length === 0) {
      console.log('   1. Go to your app: http://localhost:3000/settings');
      console.log('   2. In QuickBooks Integration section, click "Sync Customers"');
      console.log('   3. Or go to New Order modal and it will auto-sync');
    } else {
      const qbCustomers = localCustomers.filter(c => c.quickbooksId);
      console.log(`   Found ${qbCustomers.length} QuickBooks customers out of ${localCustomers.length} total`);
      
      if (qbCustomers.length < localCustomers.length) {
        console.log('   Some customers may be local-only or sync failed');
        console.log('   Try manual sync from Settings page');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

diagnoseCustomerSync();
