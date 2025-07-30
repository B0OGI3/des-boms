/**
 * Database Reset Script for QuickBooks Integration
 * 
 * Clears all existing customer and order data to start fresh with QuickBooks sync.
 * This preserves the database structure while removing test/sample data.
 */

import { prisma } from '../lib/prisma';

async function resetDatabaseForQuickBooks() {
  console.log('🧹 Starting database cleanup for QuickBooks integration...');

  try {
    // Delete in correct order to respect foreign key constraints
    console.log('📋 Deleting QC Records...');
    await prisma.qCRecord.deleteMany({});

    console.log('✅ Deleting Step Confirmations...');
    await prisma.stepConfirmation.deleteMany({});

    console.log('🔄 Deleting Routing Steps...');
    await prisma.routingStep.deleteMany({});

    console.log('📦 Deleting Batches...');
    await prisma.batch.deleteMany({});

    console.log('📎 Deleting File Attachments...');
    await prisma.fileAttachment.deleteMany({});

    console.log('📋 Deleting Order Line Items...');
    await prisma.orderLineItem.deleteMany({});

    console.log('🛒 Deleting Purchase Orders...');
    await prisma.purchaseOrder.deleteMany({});

    console.log('👥 Deleting Customers...');
    await prisma.customer.deleteMany({});

    console.log('⚡ Resetting workstations (keeping structure)...');
    // Optional: Only delete workstation confirmations, keep workstation definitions
    // await prisma.workstation.deleteMany({});

    console.log('✅ Database cleanup completed successfully!');
    console.log('🔗 Ready for QuickBooks integration');
    
    // Show final counts
    const counts = {
      customers: await prisma.customer.count(),
      orders: await prisma.purchaseOrder.count(),
      lineItems: await prisma.orderLineItem.count(),
      batches: await prisma.batch.count(),
      workstations: await prisma.workstation.count(),
    };

    console.log('\n📊 Final database state:');
    console.table(counts);

  } catch (error) {
    console.error('❌ Error during database cleanup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the reset
resetDatabaseForQuickBooks()
  .then(() => {
    console.log('\n🎉 Database is now ready for QuickBooks integration!');
    console.log('Next steps:');
    console.log('1. Go to: http://localhost:3001/api/quickbooks/auth');
    console.log('2. Complete OAuth authorization');
    console.log('3. Add tokens to .env file');
    console.log('4. Start creating customers - they will sync to QuickBooks!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to reset database:', error);
    process.exit(1);
  });
