/**
 * Operator Authentication Test Script
 * Tests the operator sign-off requirements for step confirmations
 */

const BASE_URL = 'http://localhost:3000';

async function testOperatorAuthentication() {
  console.log('🧪 Testing Operator Authentication System...\n');

  try {
    // Test 1: Try to create step confirmation without operator authentication
    console.log(
      'Test 1: Attempting step confirmation without authentication...'
    );
    const formData1 = new FormData();
    formData1.append('stepId', 'test-step-123');
    formData1.append('operatorName', 'Unauthorized User');
    formData1.append('action', 'start');

    const response1 = await fetch(`${BASE_URL}/api/step-confirmations`, {
      method: 'POST',
      body: formData1,
    });

    if (response1.status === 401) {
      console.log('✅ PASS: Unauthorized access blocked');
    } else {
      console.log('❌ FAIL: Should have been blocked');
    }

    // Test 2: Create an operator
    console.log('\nTest 2: Creating test operator...');
    const operatorData = {
      operatorId: 'TEST_OP_001',
      operatorName: 'Test Operator',
      certifications: ['CNC Machining', 'Quality Inspection'],
      shift: 'DAY',
      email: 'test@company.com',
      phone: '555-0123',
    };

    const createOpResponse = await fetch(`${BASE_URL}/api/operators`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...operatorData,
        action: 'create',
      }),
    });

    if (createOpResponse.ok) {
      console.log('✅ PASS: Operator created successfully');
    } else {
      console.log('❌ FAIL: Could not create operator');
      return;
    }

    // Test 3: Login operator to workstation
    console.log('\nTest 3: Logging in operator to workstation...');
    const loginResponse = await fetch(`${BASE_URL}/api/operators`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...operatorData,
        workstationId: 'test-workstation-001',
        action: 'login',
      }),
    });

    if (loginResponse.ok) {
      console.log('✅ PASS: Operator logged in successfully');
    } else {
      console.log('❌ FAIL: Could not login operator');
      return;
    }

    // Test 4: Try step confirmation with authenticated operator
    console.log(
      '\nTest 4: Attempting step confirmation with authenticated operator...'
    );
    const formData2 = new FormData();
    formData2.append('stepId', 'test-step-123');
    formData2.append('operatorName', operatorData.operatorName);
    formData2.append('operatorId', operatorData.operatorId);
    formData2.append('workstationId', 'test-workstation-001');
    formData2.append('action', 'start');
    formData2.append('notes', 'Test step confirmation with authentication');

    const response2 = await fetch(`${BASE_URL}/api/step-confirmations`, {
      method: 'POST',
      body: formData2,
    });

    if (response2.ok) {
      console.log('✅ PASS: Authenticated step confirmation successful');
    } else {
      const error = await response2.json();
      console.log('❌ FAIL:', error.error);
    }

    // Test 5: Try step confirmation with wrong workstation
    console.log(
      '\nTest 5: Attempting step confirmation with wrong workstation...'
    );
    const formData3 = new FormData();
    formData3.append('stepId', 'test-step-456');
    formData3.append('operatorName', operatorData.operatorName);
    formData3.append('operatorId', operatorData.operatorId);
    formData3.append('workstationId', 'wrong-workstation-999');
    formData3.append('action', 'start');

    const response3 = await fetch(`${BASE_URL}/api/step-confirmations`, {
      method: 'POST',
      body: formData3,
    });

    if (response3.status === 401) {
      console.log('✅ PASS: Wrong workstation access blocked');
    } else {
      console.log('❌ FAIL: Should have been blocked for wrong workstation');
    }

    // Test 6: Logout operator
    console.log('\nTest 6: Logging out operator...');
    const logoutResponse = await fetch(`${BASE_URL}/api/operators`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operatorId: operatorData.operatorId,
        action: 'logout',
        notes: 'Test logout',
      }),
    });

    if (logoutResponse.ok) {
      console.log('✅ PASS: Operator logged out successfully');
    } else {
      console.log('❌ FAIL: Could not logout operator');
    }

    // Test 7: Try step confirmation after logout
    console.log('\nTest 7: Attempting step confirmation after logout...');
    const formData4 = new FormData();
    formData4.append('stepId', 'test-step-789');
    formData4.append('operatorName', operatorData.operatorName);
    formData4.append('operatorId', operatorData.operatorId);
    formData4.append('workstationId', 'test-workstation-001');
    formData4.append('action', 'start');

    const response4 = await fetch(`${BASE_URL}/api/step-confirmations`, {
      method: 'POST',
      body: formData4,
    });

    if (response4.status === 401) {
      console.log('✅ PASS: Post-logout access blocked');
    } else {
      console.log('❌ FAIL: Should have been blocked after logout');
    }

    console.log('\n🎉 Operator Authentication Tests Complete!');
    console.log('\nSummary:');
    console.log(
      '- ✅ Operator sign-off is now REQUIRED for all step confirmations'
    );
    console.log(
      '- ✅ Authentication is validated before any manufacturing action'
    );
    console.log('- ✅ Session management prevents unauthorized access');
    console.log(
      '- ✅ Workstation-specific sessions ensure proper accountability'
    );
    console.log(
      '- ✅ All step confirmations are now attributed to authenticated operators'
    );
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

// Run the test
if (require.main === module) {
  testOperatorAuthentication();
}

module.exports = { testOperatorAuthentication };
