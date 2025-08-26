import React from 'react';
import {Code, Database, Webhook, Lock, CreditCard, QrCode, BriefcaseIcon, ScanBarcode} from 'lucide-react';
import { CodeBlock } from '../CodeBlock';
import {MermaidDiagramSudo} from "../MermaidDiagramSudo.tsx";


export const ApiSdkSection: React.FC = () => {
  const apiFlowDiagram = `
graph LR
    A[1. Generate OAuth Token] --> B[2. Initiate Transaction]
    B --> C[3. Select Payment Method]
    C --> D1[Card Payment<br/>+ AES Encryption]
    C --> D2[USSD Payment<br/>+ Bank Selection]
    C --> D3[Bank Transfer<br/>+ Virtual Account]    
    C --> D4[QR Code<br/>+ Mobile Scan]
    C --> D5[Buy Now Pay Later<br/>+ Credit Check]
    C --> D6[Pay Attitude<br/>+ Wallet Integration]
    D1 --> E[4. OTP Verification]
    D1 --> F[5. Query Transaction Status]
    D2 --> F
    D3 --> F
    D4 --> F
    D5 --> F
    D6 --> F
    E --> F
    F --> G[6. Webhook Notification]
    G --> H[7. Update Order Status]
  `;

  const initiateTransactionCode = `curl --location 'https://payment-solution-gateway.azurewebsites.net/api/v1/transactions/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "Amount": 1000,
  "PayerEmail": "customer@example.com",
  "PayerName": "John Doe",
  "Purpose": "Product Purchase",
  "PublicKey": "your-public-key",
  "PaymentReference": "unique-ref-12345"
}'`;

  const initiateResponse = `{
  "responseCode": "00",
  "responseMessage": "Transaction Initiated Successfully",
  "data": {
    "accessCode": "TXN_ACCESS_CODE_123",
    "paymentReference": "unique-ref-12345",
    "amount": 1000,
    "currency": "NGN"
  }
}`;

  const cardInitiateCode = `curl --location 'https://payment-solution-gateway.azurewebsites.net/api/v1/cards/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "AuthData": "encrypted_card_data_here",
  "AccessCode": "TXN_ACCESS_CODE_123",
  "PaymentReference": "unique-ref-12345"
}'`;

  const cardConfirmCode = `curl --location 'https://payment-solution-gateway.azurewebsites.net/api/v1/cards/complete' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "Otp": "123456",
  "PaymentReference": "unique-ref-12345"
}'`;

  const statusCheckCode = `curl --location 'https://payment-solution-gateway.azurewebsites.net/api/v1/transactions/status/{paymentReference}' \\
--header 'Authorization: Bearer {access_token}'`;

  const encryptionCodeCSharp = `using System;
using System.Security.Cryptography;
using System.Text;

public static string EncryptCardData(string cardData, string encryptionKey)
{
    using (Aes aesAlg = Aes.Create())
    {
        aesAlg.Key = Encoding.UTF8.GetBytes(encryptionKey);
        aesAlg.IV = new byte[16]; // Initialize with zeros for simplicity
        
        ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);
        
        using (var msEncrypt = new MemoryStream())
        {
            using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
            {
                using (var swEncrypt = new StreamWriter(csEncrypt))
                {
                    swEncrypt.Write(cardData);
                }
                return Convert.ToBase64String(msEncrypt.ToArray());
            }
        }
    }
}`;

  const webhookCode = `// Webhook payload structure
{
  "eventType": "payment.success",
  "data": {
    "paymentReference": "unique-ref-12345",
    "amount": 1000,
    "currency": "NGN",
    "status": "successful",
    "customerEmail": "customer@example.com",
    "paymentMethod": "card",
    "transactionDate": "2025-01-20T10:30:00Z"
  },
  "timestamp": "2025-01-20T10:30:00Z",
  "signature": "webhook_signature_for_verification"
}`;

  const tokenGenerationCode = `curl --location 'https://payment-solution-identity.azurewebsites.net/api/v2/Authenticate/token' \\
--header 'Content-Type: application/x-www-form-urlencoded' \\
--data-urlencode 'client_Id=your-client-id' \\
--data-urlencode 'client_Secret=your-client-secret' \\
--data-urlencode 'grant_type=client_credentials'`;

  const tokenResponse = `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 36000
}`;

  return (
    <section id="api-sdk" className="mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">API/SDK Integration</h2>
        <p className="text-lg text-gray-600 mb-8">
          Direct API integration for custom applications. This method provides full control and flexibility,
          supporting any programming language with HTTP client capabilities. Perfect for developers who need 
          complete customization and want to build their own payment interface.
        </p>

        {/* CRITICAL NOTICE - Made extremely prominent */}
        <div className="relative mb-8">
          {/* Animated border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-lg blur opacity-75 animate-pulse"></div>
          
          <div className="relative bg-gradient-to-r from-red-50 to-yellow-50 border-4 border-red-500 rounded-lg p-6 shadow-2xl">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-bounce">
                  <Lock className="h-6 w-6 text-red-600"/>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-bold text-red-900 mr-3">🚨 CRITICAL REQUIREMENT</h3>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    READ THIS FIRST
                  </span>
                </div>
                <div className="bg-white border-2 border-red-300 rounded-lg p-4 mb-4">
                  <p className="text-lg font-semibold text-red-800 mb-3">
                    ⚠️ <strong>MERCHANT ELIGIBILITY:</strong> Only fully onboarded and LIVE merchants can use this API service.
                  </p>
                  <p className="text-red-700 mb-4">
                    Before proceeding with integration, you MUST:
                  </p>
                  <ul className="text-red-700 space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-red-600 font-bold mr-2">1.</span>
                      <span>Complete merchant onboarding process</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 font-bold mr-2">2.</span>
                      <span>Have your account approved and marked as LIVE</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 font-bold mr-2">3.</span>
                      <span>Obtain API keys from the merchant dashboard</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <h4 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
                    📚 Complete API Documentation
                  </h4>
                  <p className="text-blue-800 mb-3">
                    For comprehensive API understanding, sample data, and testing capabilities:
                  </p>
                  <a
                    href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 View Official API Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <Code className="h-8 w-8 text-blue-600 mx-auto mb-3"/>
            <h3 className="font-semibold text-blue-900">Any Language</h3>
            <p className="text-sm text-blue-700">C#, Go, Python, PHP, Node.js, Java, etc.</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <Database className="h-8 w-8 text-emerald-600 mx-auto mb-3"/>
            <h3 className="font-semibold text-emerald-900">Full Control</h3>
            <p className="text-sm text-emerald-700">Custom UI, business logic, and workflows</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <Webhook className="h-8 w-8 text-purple-600 mx-auto mb-3"/>
            <h3 className="font-semibold text-purple-900">Real-time Updates</h3>
            <p className="text-sm text-purple-700">Instant payment status via webhooks</p>
          </div>
        </div>

        {/* Enhanced API Flow Diagram */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete API Integration Flow</h3>
          <p className="text-gray-600 mb-4">
            This diagram shows the complete payment processing flow from token generation to final webhook notification:
          </p>
          <MermaidDiagramSudo code={apiFlowDiagram}/>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-emerald-900 mb-4 flex items-center">
            <Zap className="h-6 w-6 mr-2" />
            Quick Start Guide
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-emerald-900 mb-3">Prerequisites</h4>
              <ul className="text-emerald-800 space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Active FirstCheckout merchant account</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Completed KYC verification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>API credentials (Client ID & Secret)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>HTTPS-enabled server/application</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-900 mb-3">Integration Steps</h4>
              <ol className="text-emerald-800 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-emerald-200 text-emerald-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">1</span>
                  <span>Generate OAuth access token</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-200 text-emerald-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">2</span>
                  <span>Initiate payment transaction</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-200 text-emerald-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">3</span>
                  <span>Handle payment method selection</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-200 text-emerald-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">4</span>
                  <span>Process webhooks & update status</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: OAuth Token Generation</h3>
            <p className="text-gray-600 mb-4">
              Use your Client ID and Client Secret to generate OAuth2 access tokens for API authentication.
              The ClientId and ClientSecret are shared by the admin during onboarding - these credentials
              are needed to generate tokens for API access.
            </p>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Request:</h4>
              <CodeBlock language="bash" code={tokenGenerationCode}/>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Response:</h4>
              <CodeBlock language="json" code={tokenResponse}/>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-5">
              <h4 className="font-semibold text-blue-900 mb-2">Token Usage Notes</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Authorization Header:</strong> Include as "Bearer {access_token}" in all API requests</li>
                <li>• <strong>Expiry:</strong> Tokens expire after 30 minutes (1800 seconds) - implement refresh logic</li>
                <li>• <strong>Security:</strong> Store tokens securely, never expose in client-side code or logs</li>
                <li>• <strong>Environment:</strong> Use different tokens for sandbox vs live environments</li>
                <li>• <strong>Validation:</strong> Test token validity at <a href="https://jwt.io" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">jwt.io</a></li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Initiate Transaction</h3>
            <p className="text-gray-600 mb-4">
              Create a new payment transaction by providing customer and payment details. The API returns an 
              access code that you'll use for subsequent payment method operations.
            </p>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Request:</h4>
              <CodeBlock language="bash" code={initiateTransactionCode}/>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Response:</h4>
              <CodeBlock language="json" code={initiateResponse}/>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-blue-900 mb-2">Response Fields Explained</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>accessCode:</strong> Use this for all subsequent payment method calls</li>
                <li>• <strong>paymentReference:</strong> Your unique transaction identifier</li>
                <li>• <strong>amount:</strong> Confirmed transaction amount in kobo</li>
                <li>• <strong>responseCode "00":</strong> Indicates successful transaction initiation</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Card Payment Flow</h3>
            <p className="text-gray-600 mb-4">
              For card payments, you must encrypt all card data using AES encryption before transmission. 
              This ensures PCI DSS compliance and protects sensitive cardholder information.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <Lock className="h-5 w-5 text-red-600 mr-2"/>
                <h4 className="font-semibold text-red-900">🔒 MANDATORY ENCRYPTION</h4>
              </div>
              <p className="text-sm text-red-800 font-semibold">
                ALL card data (PAN, CVV, PIN, Expiry) MUST be encrypted using AES-256 with your encryption key. 
                Sending plain card data will result in API rejection and potential account suspension.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">AES Encryption Example (C#):</h4>
              <CodeBlock language="csharp" code={encryptionCodeCSharp}/>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Initiate Card Payment:</h4>
              <CodeBlock language="bash" code={cardInitiateCode}/>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Complete with OTP:</h4>
              <CodeBlock language="bash" code={cardConfirmCode}/>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 4: Check Transaction Status</h3>
            <p className="text-gray-600 mb-4">
              Monitor transaction progress by querying the status endpoint. This is essential for handling 
              asynchronous payment methods like USSD and bank transfers.
            </p>
            <CodeBlock language="bash" code={statusCheckCode}/>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-emerald-900 mb-2">Status Polling Best Practices</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• <strong>Frequency:</strong> Poll every 10-15 seconds for pending transactions</li>
                <li>• <strong>Timeout:</strong> Stop polling after 30 minutes for most payment methods</li>
                <li>• <strong>Status Values:</strong> pending, successful, failed, cancelled, expired</li>
                <li>• <strong>Combine with Webhooks:</strong> Use status checks as backup to webhook notifications</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 5: Handle Webhooks</h3>
            <p className="text-gray-600 mb-4">
              Configure webhook endpoints to receive instant payment status updates. Webhooks provide the most 
              reliable way to handle payment confirmations and update your system in real-time.
            </p>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Webhook Payload Structure:</h4>
              <CodeBlock language="json" code={webhookCode}/>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Webhook Best Practices</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Security:</strong> Always verify webhook signatures using HMAC-SHA256</li>
                <li>• <strong>Idempotency:</strong> Handle duplicate notifications gracefully</li>
                <li>• <strong>Response:</strong> Return HTTP 200 within 10 seconds to acknowledge receipt</li>
                <li>• <strong>Retry Logic:</strong> FirstCheckout retries failed webhooks up to 5 times</li>
                <li>• <strong>Logging:</strong> Log all webhook events for audit and debugging purposes</li>
                <li>• <strong>HTTPS Only:</strong> Webhook URLs must use HTTPS with valid SSL certificates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Payment Methods Section */}
        <div className="mt-8 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Payment Methods</h3>
          <p className="text-gray-600 mb-6">
            FirstCheckout supports multiple payment methods to maximize conversion rates and provide customers 
            with their preferred payment options.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-md mb-3 border-2 border-blue-100 hover:border-blue-300 transition-colors">
                <CreditCard className="h-6 w-6 text-blue-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Card Payments</h4>
              <p className="text-sm text-gray-600 mb-2">Visa, Mastercard, Verve</p>
              <p className="text-xs text-blue-600">3D Secure • OTP Verification</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-md mb-3 border-2 border-emerald-100 hover:border-emerald-300 transition-colors">
                <Code className="h-6 w-6 text-emerald-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">USSD Payments</h4>
              <p className="text-sm text-gray-600 mb-2">All major Nigerian banks</p>
              <p className="text-xs text-emerald-600">No internet required • High success rate</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-md mb-3 border-2 border-purple-100 hover:border-purple-300 transition-colors">
                <Database className="h-6 w-6 text-purple-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Bank Transfer</h4>
              <p className="text-sm text-gray-600 mb-2">Virtual account generation</p>
              <p className="text-xs text-purple-600">Instant confirmation • Large amounts</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-md mb-3 border-2 border-blue-100 hover:border-blue-300 transition-colors">
                <QrCode className="h-6 w-6 text-blue-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">QR Code</h4>
              <p className="text-sm text-gray-600 mb-2">Mobile app scanning</p>
              <p className="text-xs text-blue-600">Contactless • Mobile-first</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-md mb-3 border-2 border-emerald-100 hover:border-emerald-300 transition-colors">
                <BriefcaseIcon className="h-6 w-6 text-emerald-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Buy Now Pay Later</h4>
              <p className="text-sm text-gray-600 mb-2">Credit-based payments</p>
              <p className="text-xs text-emerald-600">Flexible terms • Credit scoring</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-md mb-3 border-2 border-purple-100 hover:border-purple-300 transition-colors">
                <ScanBarcode className="h-6 w-6 text-purple-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Pay Attitude</h4>
              <p className="text-sm text-gray-600 mb-2">Wallet integration</p>
              <p className="text-xs text-purple-600">Digital wallet • Fast checkout</p>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Payment Method Selection Strategy</h4>
            <p className="text-sm text-gray-600">
              Offer multiple payment methods to maximize conversion. Cards work best for quick purchases, 
              USSD for users without cards, and bank transfers for large amounts. QR codes are perfect 
              for mobile-first experiences.
            </p>
          </div>
        </div>
        
        {/* Error Handling Section */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Error Handling & Troubleshooting
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-red-900 mb-3">Common API Errors</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white p-3 rounded border border-red-200">
                  <code className="text-red-600 font-mono">401 Unauthorized</code>
                  <p className="text-red-700 mt-1">Invalid or expired access token</p>
                </div>
                <div className="bg-white p-3 rounded border border-red-200">
                  <code className="text-red-600 font-mono">400 Bad Request</code>
                  <p className="text-red-700 mt-1">Missing required fields or invalid data</p>
                </div>
                <div className="bg-white p-3 rounded border border-red-200">
                  <code className="text-red-600 font-mono">403 Forbidden</code>
                  <p className="text-red-700 mt-1">Merchant account not active or suspended</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-red-900 mb-3">Best Practices</h4>
              <ul className="text-sm text-red-800 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Implement exponential backoff for retries</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Log all API requests and responses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Validate data before sending to API</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Handle network timeouts gracefully</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Provide clear error messages to users</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};