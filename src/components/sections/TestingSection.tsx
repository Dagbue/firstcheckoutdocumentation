import React from 'react';
import { TestTube, Bug, CheckCircle, AlertCircle } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';

export const TestingSection: React.FC = () => {
  const testScenarios = [
    {
      scenario: "Successful Card Payment",
      steps: [
        "Use test card: 5060990580000217499",
        "Enter PIN: 1111 when prompted",
        "Use OTP: 123456 for verification",
        "Verify transaction status: successful"
      ],
      expected: "Transaction completes successfully with confirmation"
    },
    {
      scenario: "Failed Card Payment",
      steps: [
        "Use test card: 4000000000000002",
        "Enter any PIN",
        "Transaction should fail",
        "Verify error handling"
      ],
      expected: "Transaction fails with appropriate error message"
    },
    {
      scenario: "USSD Payment Test",
      steps: [
        "Select any bank from institutions list",
        "Initiate USSD payment",
        "Get USSD code (e.g., *894*000*1234#)",
        "In sandbox, all USSD codes succeed"
      ],
      expected: "USSD code generated and payment simulated"
    }
  ];

  const debuggingCode = `// Enable detailed logging for debugging
const config = {
  live: false, // Always use sandbox for testing
  ref: "test-" + Date.now(),
  amount: 1000, // Test with small amounts
  customer: {
    firstname: "Test",
    lastname: "User",
    email: "test@example.com"
  },
  publicKey: "sb-pk-test-key", // Sandbox key
  description: "Test Payment",
  currency: "NGN",
  callback: function(response) {
    // Log complete response for debugging
    console.log("Payment Response:", JSON.stringify(response, null, 2));
    
    // Check response structure
    if (response.status === "successful") {
      console.log("✅ Payment successful!");
      console.log("Reference:", response.reference);
      console.log("Amount:", response.amount);
    } else {
      console.log("❌ Payment failed!");
      console.log("Error:", response.message);
      console.log("Code:", response.code);
    }
  },
  onClose: function() {
    console.log("Payment modal closed");
  }
};`;

  const webhookTestCode = `// Webhook testing endpoint (Node.js/Express example)
app.post('/webhook/firstcheckout', (req, res) => {
  console.log('Webhook received:', req.body);
  
  // Verify webhook signature
  const signature = req.headers['x-firstcheckout-signature'];
  const payload = JSON.stringify(req.body);
  
  // Log for debugging
  console.log('Signature:', signature);
  console.log('Payload:', payload);
  
  // Always respond with 200 to acknowledge receipt
  res.status(200).send('OK');
  
  // Process payment update
  const { eventType, data } = req.body;
  
  if (eventType === 'payment.success') {
    console.log(\`Payment \${data.paymentReference} successful\`);
    // Update your database
  } else if (eventType === 'payment.failed') {
    console.log(\`Payment \${data.paymentReference} failed\`);
    // Handle failure
  }
});`;

  const statusCheckCode = `// Check payment status programmatically
async function checkPaymentStatus(paymentReference) {
  try {
    const response = await fetch(
      \`https://payment-solution-gateway.azurewebsites.net/api/v1/transactions/status/\${paymentReference}\`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const result = await response.json();
    console.log('Payment Status:', result);
    
    return result;
  } catch (error) {
    console.error('Status check failed:', error);
    throw error;
  }
}

// Usage
checkPaymentStatus('your-payment-reference')
  .then(status => {
    console.log('Current status:', status.data.status);
  })
  .catch(error => {
    console.error('Error:', error);
  });`;

  return (
    <section id="testing" className="mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Testing & Debugging</h2>
        <p className="text-lg text-gray-600 mb-8">
          Comprehensive testing is crucial for successful payment integration. FirstCheckout provides 
          robust sandbox environment and debugging tools to ensure your integration works perfectly.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <TestTube className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900 text-sm">Sandbox Testing</h3>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-semibold text-emerald-900 text-sm">Test Scenarios</h3>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <Bug className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <h3 className="font-semibold text-amber-900 text-sm">Debug Tools</h3>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <AlertCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-900 text-sm">Monitoring</h3>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sandbox Environment Setup</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-blue-900 mb-3">Sandbox Configuration</h4>
              <ul className="space-y-2 text-blue-800">
                <li>• Use keys with "sb-" prefix (e.g., sb-pk-xxx, sb-sk-xxx)</li>
                <li>• Set live: false in all integration configurations</li>
                <li>• Use sandbox endpoints for API calls</li>
                <li>• No real money transactions - all payments are simulated</li>
                <li>• Test data is reset periodically</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Sandbox URLs</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>Payment Gateway:</strong><br />
                    <code className="text-blue-600">https://payment-solution-gateway.azurewebsites.net</code>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>Identity Service:</strong><br />
                    <code className="text-blue-600">https://payment-solution-identity.azurewebsites.net</code>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>Checkout Frame:</strong><br />
                    <code className="text-blue-600">https://checkout.firstchekout.com</code>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Test Credentials</h4>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• <strong>PIN:</strong> 1111 (for all test cards)</li>
                    <li>• <strong>OTP:</strong> 123456 (for verification)</li>
                    <li>• <strong>USSD:</strong> All codes work in sandbox</li>
                    <li>• <strong>Transfer:</strong> All virtual accounts succeed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Test Scenarios</h3>
            
            <div className="space-y-6">
              {testScenarios.map((test, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{test.scenario}</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Steps:</h5>
                      <ol className="space-y-1 text-sm text-gray-600">
                        {test.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex">
                            <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Expected Result:</h5>
                      <p className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded">
                        {test.expected}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Debugging Tools</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Console Logging</h4>
              <p className="text-gray-600 mb-4">
                Enable detailed logging to track payment flows and identify issues:
              </p>
              <CodeBlock language="javascript" code={debuggingCode} />
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibent text-gray-900 mb-3">Webhook Testing</h4>
              <p className="text-gray-600 mb-4">
                Set up a webhook endpoint to receive and debug payment notifications:
              </p>
              <CodeBlock language="javascript" code={webhookTestCode} />
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Payment Status Checking</h4>
              <p className="text-gray-600 mb-4">
                Programmatically check payment status for debugging:
              </p>
              <CodeBlock language="javascript" code={statusCheckCode} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Issues & Solutions</h3>
            
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Payment Modal Not Opening</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Check if CDN script is loaded properly</li>
                  <li>• Verify public key is correct and for the right environment</li>
                  <li>• Ensure amount is a positive number</li>
                  <li>• Check browser console for JavaScript errors</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-2">⚠️ Payments Failing in Sandbox</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Use test card numbers provided in documentation</li>
                  <li>• Always use PIN: 1111 and OTP: 123456</li>
                  <li>• Ensure you're using sandbox keys (sb- prefix)</li>
                  <li>• Check that live: false in configuration</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">ℹ️ Webhook Not Receiving Events</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Verify webhook URL is publicly accessible</li>
                  <li>• Check firewall settings allow incoming requests</li>
                  <li>• Ensure webhook endpoint returns HTTP 200 status</li>
                  <li>• Use tools like ngrok for local development</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-900 mb-2">✅ API Authentication Issues</h4>
                <ul className="text-sm text-emerald-800 space-y-1">
                  <li>• Generate fresh access token if expired (10-hour expiry)</li>
                  <li>• Check Client ID and Client Secret are correct</li>
                  <li>• Verify Bearer token format in Authorization header</li>
                  <li>• Test token validity at jwt.io</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pre-Launch Checklist</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Technical Validation</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span>All payment methods tested successfully</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span>Webhook endpoint configured and tested</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span>Error handling implemented for all scenarios</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span>SSL certificate installed and working</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span>Production keys obtained and configured</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Business Validation</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span>KYC documents approved by First Bank</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span>Settlement bank account verified</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span>Payment flow tested by non-technical users</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span>Customer support process established</span>
                  </li>
                  <li className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span>Monitoring and analytics setup complete</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};