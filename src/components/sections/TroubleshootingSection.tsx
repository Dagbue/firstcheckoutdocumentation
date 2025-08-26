import React from 'react';
import { AlertCircle, HelpCircle, PenTool as Tool, CheckCircle } from 'lucide-react';
// import { CodeBlock } from '../CodeBlock';

export const TroubleshootingSection: React.FC = () => {
//   const diagnosticCode = `// Comprehensive payment diagnostics
// function diagnosePaymentIssue(config) {
//   console.log('🔍 Diagnosing Payment Configuration...');
//
//   // Check required fields
//   const requiredFields = ['publicKey', 'amount', 'customer', 'ref'];
//   const missingFields = requiredFields.filter(field => !config[field]);
//
//   if (missingFields.length > 0) {
//     console.error('❌ Missing required fields:', missingFields);
//     return false;
//   }
//
//   // Validate public key format
//   if (!config.publicKey.startsWith('pk_') && !config.publicKey.startsWith('sb-pk-')) {
//     console.error('❌ Invalid public key format. Expected: pk_xxx or sb-pk-xxx');
//     return false;
//   }
//
//   // Check environment consistency
//   const isTestKey = config.publicKey.startsWith('sb-pk-');
//   if (config.live && isTestKey) {
//     console.error('❌ Using test key with live=true');
//     return false;
//   }
//
//   // Validate amount
//   if (typeof config.amount !== 'number' || config.amount <= 0) {
//     console.error('❌ Amount must be a positive number');
//     return false;
//   }
//
//   // Check customer object
//   const customer = config.customer;
//   if (!customer.email || !customer.firstname || !customer.lastname) {
//     console.error('❌ Customer object missing required fields');
//     return false;
//   }
//
//   console.log('✅ Configuration looks good!');
//   return true;
// }
//
// // Usage
// const paymentConfig = {
//   live: false,
//   ref: "test-" + Date.now(),
//   amount: 1000,
//   customer: {
//     firstname: "John",
//     lastname: "Doe",
//     email: "john@example.com"
//   },
//   publicKey: "sb-pk-your-key-here"
// };
//
// if (diagnosePaymentIssue(paymentConfig)) {
//   // Proceed with payment
//   FBNCheckout.initiateTransactionAsync(paymentConfig, addressURL);
// }`;
//
//   const networkDiagnostic = `// Network connectivity test
// async function testNetworkConnectivity() {
//   const endpoints = [
//     'https://payment-solution-gateway.azurewebsites.net/health',
//     'https://payment-solution-identity.azurewebsites.net/health',
//     'https://checkout.firstchekout.com/ping'
//   ];
//
//   for (const endpoint of endpoints) {
//     try {
//       console.log(\`Testing \${endpoint}...\`);
//       const response = await fetch(endpoint, { method: 'GET' });
//
//       if (response.ok) {
//         console.log(\`✅ \${endpoint} - OK\`);
//       } else {
//         console.log(\`⚠️ \${endpoint} - Status: \${response.status}\`);
//       }
//     } catch (error) {
//       console.error(\`❌ \${endpoint} - Error:\`, error.message);
//     }
//   }
// }
//
// // Run network test
// testNetworkConnectivity();`;
//
//   const tokenValidation = `// JWT token validation and debugging
// function validateAccessToken(token) {
//   try {
//     // Basic JWT structure check
//     const parts = token.split('.');
//     if (parts.length !== 3) {
//       console.error('❌ Invalid JWT structure');
//       return false;
//     }
//
//     // Decode payload (without verification - for debugging only)
//     const payload = JSON.parse(atob(parts[1]));
//     console.log('Token payload:', payload);
//
//     // Check expiration
//     const now = Math.floor(Date.now() / 1000);
//     if (payload.exp && payload.exp < now) {
//       console.error('❌ Token expired at:', new Date(payload.exp * 1000));
//       return false;
//     }
//
//     console.log('✅ Token appears valid, expires at:', new Date(payload.exp * 1000));
//     return true;
//
//   } catch (error) {
//     console.error('❌ Error validating token:', error);
//     return false;
//   }
// }
//
// // Usage
// const token = 'your_access_token_here';
// validateAccessToken(token);`;

  const errorCodes = [
    {
      code: 'INVALID_PUBLIC_KEY',
      description: 'Public key is invalid or does not exist',
      solution: 'Verify your public key from the merchant dashboard. Ensure you\'re using the correct environment key (sandbox vs live).'
    },
    {
      code: 'INSUFFICIENT_FUNDS',
      description: 'Customer account has insufficient funds',
      solution: 'Ask customer to check their account balance or try a different payment method.'
    },
    {
      code: 'CARD_EXPIRED',
      description: 'The payment card has expired',
      solution: 'Customer needs to use a different, valid card.'
    },
    {
      code: 'TRANSACTION_TIMEOUT',
      description: 'Transaction timed out due to inactivity',
      solution: 'Implement proper timeout handling and allow customers to retry.'
    },
    {
      code: 'INVALID_AMOUNT',
      description: 'Transaction amount is invalid',
      solution: 'Ensure amount is a positive number in kobo (multiply naira by 100).'
    },
    {
      code: 'DUPLICATE_REFERENCE',
      description: 'Payment reference already exists',
      solution: 'Use unique references for each transaction (timestamp + random string recommended).'
    }
  ];

  const troubleshootingScenarios = [
    {
      issue: "Payment modal doesn't open",
      symptoms: ["Click button but nothing happens", "JavaScript errors in console", "Page freezes"],
      causes: [
        "CDN script not loaded properly",
        "Public key incorrect or missing",
        "JavaScript errors preventing execution",
        "Popup blocked by browser"
      ],
      solutions: [
        "Check browser network tab for failed CDN requests",
        "Verify public key format and environment",
        "Check browser console for JavaScript errors",
        "Test in incognito mode to rule out extensions"
      ]
    },
    {
      issue: "Payments failing in production",
      symptoms: ["Worked in sandbox but fails live", "Authentication errors", "Invalid key errors"],
      causes: [
        "Using sandbox keys in live mode",
        "Live keys not activated",
        "KYC not approved",
        "Account suspended"
      ],
      solutions: [
        "Switch to live keys (without sb- prefix)",
        "Contact support to activate live keys",
        "Complete KYC process",
        "Check account status in merchant portal"
      ]
    },
    {
      issue: "Webhooks not working",
      symptoms: ["Not receiving payment notifications", "Webhook endpoint not called", "Duplicate notifications"],
      causes: [
        "Webhook URL not accessible",
        "Endpoint returning non-200 status",
        "SSL certificate issues",
        "Firewall blocking requests"
      ],
      solutions: [
        "Test webhook URL with tools like Postman",
        "Ensure endpoint returns HTTP 200 status",
        "Use valid SSL certificate",
        "Configure firewall to allow FirstCheckout IPs"
      ]
    }
  ];

  return (
    <section id="troubleshooting" className="mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Troubleshooting & FAQs</h2>
        <p className="text-lg text-gray-600 mb-8">
          Comprehensive troubleshooting guide to help you quickly identify and resolve common integration issues. 
          Use the diagnostic tools and step-by-step solutions to get your payment system working smoothly.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold text-red-900 text-sm">Common Issues</h3>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <Tool className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900 text-sm">Diagnostic Tools</h3>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-semibold text-emerald-900 text-sm">Quick Fixes</h3>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <HelpCircle className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <h3 className="font-semibold text-amber-900 text-sm">Expert Help</h3>
          </div>
        </div>

        <div className="space-y-8">
          {/*<div>*/}
          {/*  <h3 className="text-xl font-semibold text-gray-900 mb-4">Diagnostic Tools</h3>*/}
          {/*  */}
          {/*  <div className="space-y-6">*/}
          {/*    <div>*/}
          {/*      <h4 className="text-lg font-semibold text-gray-900 mb-3">Configuration Validator</h4>*/}
          {/*      <p className="text-gray-600 mb-4">*/}
          {/*        Use this diagnostic function to validate your payment configuration before initiating transactions:*/}
          {/*      </p>*/}
          {/*      <CodeBlock language="javascript" code={diagnosticCode} />*/}
          {/*    </div>*/}

          {/*    <div>*/}
          {/*      <h4 className="text-lg font-semibold text-gray-900 mb-3">Network Connectivity Test</h4>*/}
          {/*      <p className="text-gray-600 mb-4">*/}
          {/*        Test connectivity to FirstCheckout endpoints to ensure network access:*/}
          {/*      </p>*/}
          {/*      <CodeBlock language="javascript" code={networkDiagnostic} />*/}
          {/*    </div>*/}

          {/*    <div>*/}
          {/*      <h4 className="text-lg font-semibold text-gray-900 mb-3">Token Validation</h4>*/}
          {/*      <p className="text-gray-600 mb-4">*/}
          {/*        Debug OAuth token issues with this validation function:*/}
          {/*      </p>*/}
          {/*      <CodeBlock language="javascript" code={tokenValidation} />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Error Codes</h3>
            
            <div className="space-y-4">
              {errorCodes.map((error, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <code className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-mono">
                      {error.code}
                    </code>
                  </div>
                  <p className="text-gray-700 mb-2">{error.description}</p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                    <p className="text-blue-800 text-sm">
                      <strong>Solution:</strong> {error.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Troubleshooting Scenarios</h3>
            
            <div className="space-y-6">
              {troubleshootingScenarios.map((scenario, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    {scenario.issue}
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Symptoms:</h5>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        {scenario.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2 mr-2"></span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h5 className="font-semibold text-gray-900 mb-2">Possible Causes:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {scenario.causes.map((cause, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="flex-shrink-0 w-2 h-2 bg-amber-400 rounded-full mt-2 mr-2"></span>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Solutions:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {scenario.solutions.map((solution, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="flex-shrink-0 w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-2"></span>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Q: Why are test card payments failing in sandbox?
                </h4>
                <p className="text-gray-600 text-sm">
                  <strong>A:</strong> Ensure you're using the correct test card numbers provided in the documentation. 
                  Always use PIN: 1111 and OTP: 123456. Other PINs and OTPs will cause failures even in sandbox.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Q: How long do access tokens last?
                </h4>
                <p className="text-gray-600 text-sm">
                  <strong>A:</strong> OAuth access tokens expire after 10 hours. Implement token refresh logic 
                  or generate new tokens when you receive 401 Unauthorized responses.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Q: Can I test webhooks locally?
                </h4>
                <p className="text-gray-600 text-sm">
                  <strong>A:</strong> Yes, use tools like ngrok to expose your local development server to the internet. 
                  FirstCheckout webhooks require publicly accessible HTTPS URLs.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Q: What's the difference between sb-pk and pk keys?
                </h4>
                <p className="text-gray-600 text-sm">
                  <strong>A:</strong> Keys prefixed with "sb-" are for sandbox/testing. Production keys start with "pk-". 
                  Never mix sandbox and production keys - they won't work in the wrong environment.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Q: How do I handle payment failures gracefully?
                </h4>
                <p className="text-gray-600 text-sm">
                  <strong>A:</strong> Always implement both callback and onClose handlers. Provide clear error messages 
                  to customers and offer alternative payment methods when possible.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Q: Can customers use international cards?
                </h4>
                <p className="text-gray-600 text-sm">
                  <strong>A:</strong> Yes, FirstCheckout supports international Visa and Mastercard. However, some 
                  foreign cards may be declined by issuing banks for online Nigerian transactions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Still Need Help?</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Before Contacting Support</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Run the diagnostic tools provided above</li>
                  <li>• Check browser console for JavaScript errors</li>
                  <li>• Verify you're using the correct environment keys</li>
                  <li>• Test with the provided test card numbers</li>
                  <li>• Document the exact error messages received</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Include This Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your merchant ID</li>
                  <li>• Integration method (API, NPM, CDN, WordPress)</li>
                  <li>• Environment (sandbox/live)</li>
                  <li>• Error codes and messages</li>
                  <li>• Steps to reproduce the issue</li>
                  <li>• Browser/device information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};