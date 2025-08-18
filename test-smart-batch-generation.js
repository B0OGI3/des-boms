/**
 * Test Smart Batch Generation API
 * 
 * This script tests the new smart batch generation functionality
 * by calling the API endpoint with a sample order.
 */

async function testSmartBatchGeneration() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Testing Smart Batch Generation API...\n');
  
  try {
    // First, let's get the list of orders to find one without batches
    console.log('📋 Fetching orders...');
    const ordersResponse = await fetch(`${baseUrl}/api/orders`);
    
    if (!ordersResponse.ok) {
      throw new Error(`Failed to fetch orders: ${ordersResponse.statusText}`);
    }
    
    const ordersResult = await ordersResponse.json();
    console.log(`✅ Found ${ordersResult.data?.length || 0} orders\n`);
    
    // Find an ACTIVE order with no batches
    const testOrder = ordersResult.data?.find(order => 
      order.orderStatus === 'ACTIVE' && order.assignedBatches === 0
    );
    
    if (!testOrder) {
      console.log('⚠️  No ACTIVE orders without batches found');
      console.log('💡 Smart Batch Generation is designed for orders that don\'t have batches yet');
      return;
    }
    
    console.log(`🎯 Testing with Order: ${testOrder.orderNumber}`);
    console.log(`   Customer: ${testOrder.customerName}`);
    console.log(`   Priority: ${testOrder.priority}`);
    console.log(`   Line Items: ${testOrder.itemCount}`);
    console.log('');
    
    // Test generating batch suggestions
    console.log('🔮 Generating batch suggestions...');
    const suggestionsResponse = await fetch(`${baseUrl}/api/orders/${testOrder.id}/generate-batches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!suggestionsResponse.ok) {
      throw new Error(`Failed to generate suggestions: ${suggestionsResponse.statusText}`);
    }
    
    const suggestionsResult = await suggestionsResponse.json();
    
    if (!suggestionsResult.success) {
      throw new Error(suggestionsResult.error || 'Failed to generate suggestions');
    }
    
    const data = suggestionsResult.data;
    console.log('✅ Batch suggestions generated successfully!');
    console.log(`   Total Line Items: ${data.summary.totalLineItems}`);
    console.log(`   Suggested Batches: ${data.summary.totalBatches}`);
    console.log(`   Estimated Completion: ${data.summary.estimatedCompletionDays} days`);
    console.log(`   Can Auto-Generate: ${data.summary.canAutoGenerate ? 'Yes' : 'No'}`);
    console.log('');
    
    // Display suggestions details
    console.log('📦 Batch Suggestions:');
    data.suggestions.forEach((suggestion, index) => {
      console.log(`   ${index + 1}. ${suggestion.partNumber} - ${suggestion.partName}`);
      console.log(`      Total Quantity: ${suggestion.totalQuantity}`);
      suggestion.suggestedBatches.forEach((batch, batchIndex) => {
        console.log(`      Batch ${batch.batchNumber}: ${batch.quantity} units (${batch.priority}) - ${batch.estimatedDuration}d`);
        console.log(`         Reasoning: ${batch.reasoning}`);
      });
      console.log('');
    });
    
    console.log('🎉 Smart Batch Generation test completed successfully!');
    console.log('💡 The UI will show a purple wand icon for ACTIVE orders without batches');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testSmartBatchGeneration();
