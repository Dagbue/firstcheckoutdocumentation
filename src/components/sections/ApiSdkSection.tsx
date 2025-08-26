import React from 'react';
import {Code, Database, Webhook, Lock, CreditCard, QrCode, BriefcaseIcon, ScanBarcode} from 'lucide-react';
import { CodeBlock } from '../CodeBlock';
import {MermaidDiagramSudo} from "../MermaidDiagramSudo.tsx";
import {MermaidDiagram} from "@lightenna/react-mermaid-diagram";


export const ApiSdkSection: React.FC = () => {
  const apiFlowDiagram = `
graph LR
    A[Generate Token] --> B[Initiate Transaction]
    B --> C[Select Payment Method]
    C --> D1[Card + Encryption]
    C --> D2[USSD Code]
    C --> D3[Bank Transfer]    
    C --> D4[QR]
    C --> D5[Buy Now Pay Later]
    C --> D6[Pay Attitude]
    D1 --> E[Confirm with OTP]
    D1 --> F[Query Status]
    D2 --> F
    D3 --> F
    D4 --> F
    D5 --> F
    D6 --> F
    E --> F
    F --> G[Webhook Notification]
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
          supporting any programming language with HTTP client capabilities.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <Code className="h-8 w-8 text-blue-600 mx-auto mb-3"/>
            <h3 className="font-semibold text-blue-900">Any Language</h3>
            <p className="text-sm text-blue-700">Works with any language supporting HTTP</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <Database className="h-8 w-8 text-emerald-600 mx-auto mb-3"/>
            <h3 className="font-semibold text-emerald-900">Full Control</h3>
            <p className="text-sm text-emerald-700">Complete customization of payment flow</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <Webhook className="h-8 w-8 text-purple-600 mx-auto mb-3"/>
            <h3 className="font-semibold text-purple-900">Real-time Updates</h3>
            <p className="text-sm text-purple-700">Webhook notifications for events</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Flow Diagram</h3>
          <MermaidDiagramSudo code={apiFlowDiagram}/>
          <MermaidDiagram>{apiFlowDiagram}</MermaidDiagram>
        </div>


        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <Lock className="h-5 w-5 text-amber-600 mr-2"/>
            <h4 className="font-semibold text-amber-900">📚 Comprehensive API Documentation</h4>
          </div>
          <div className="space-y-4">
            {/*<div className="bg-amber-100 border border-amber-300 rounded-lg p-4">*/}
            {/*  <h5 className="font-semibold text-amber-900 mb-2">🔐 Merchant Requirements</h5>*/}
            {/*  <p className="text-sm text-amber-800">*/}
            {/*    <strong>Critical:</strong> Only fully onboarded and live merchants can utilize this service. */}
            {/*    Your merchant account must be approved and activated before accessing production APIs.*/}
            {/*  </p>*/}
            {/*</div>*/}
            
            <div className="bg-amber-100 border border-amber-300 rounded-lg p-4">
              <h5 className="font-semibold text-amber-900 mb-2">📖 Official API Documentation</h5>
              <p className="text-sm text-amber-800 mb-3">
                Access our comprehensive Postman documentation for complete API reference, sample requests, 
                response examples, and interactive testing capabilities:
              </p>
              <a 
                href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                📋 View Complete API Documentation
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-900 mb-2">🔑 Next Steps</h5>
              <p className="text-sm text-blue-800">
                After reviewing the documentation, proceed to the <strong>API Keys & Credentials</strong> section 
                to obtain your integration keys and begin implementation.
              </p>
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
                <li>• Include the access token in all API requests as a Bearer token</li>
                <li>• Tokens are valid for 30 minutes (1800 seconds)</li>
                <li>• Generate new tokens before expiry to avoid authentication failures</li>
                <li>• Store tokens securely and never expose them in client-side code</li>
                <li>• Different tokens may be required for different environments (sandbox vs live)</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Initiate Transaction</h3>
            <p className="text-gray-600 mb-4">
              Start a payment by providing basic transaction details. This returns an access code for subsequent
              operations.
            </p>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Request:</h4>
              <CodeBlock language="bash" code={initiateTransactionCode}/>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Response:</h4>
              <CodeBlock language="json" code={initiateResponse}/>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Card Payment Flow</h3>
            <p className="text-gray-600 mb-4">
              For card payments, encrypt the card data using AES encryption before sending to the API.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <Lock className="h-5 w-5 text-amber-600 mr-2"/>
                <h4 className="font-semibold text-amber-900">Encryption Required</h4>
              </div>
              <p className="text-sm text-amber-800">
                All card data must be encrypted using AES with your encryption key before transmission.
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
              Query the current status of any transaction using its payment reference.
            </p>
            <CodeBlock language="bash" code={statusCheckCode}/>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 5: Handle Webhooks</h3>
            <p className="text-gray-600 mb-4">
              Set up webhook endpoints to receive real-time payment notifications.
            </p>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Webhook Payload Structure:</h4>
              <CodeBlock language="json" code={webhookCode}/>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Webhook Best Practices</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Always verify webhook signatures for security</li>
                <li>• Implement idempotency to handle duplicate notifications</li>
                <li>• Respond with HTTP 200 status to acknowledge receipt</li>
                <li>• Handle webhook failures with proper retry logic</li>
                <li>• Log all webhook events for debugging</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">💳 Supported Payment Methods</h3>
          <p className="text-gray-600 mb-6">
            FirstCheckout supports multiple payment channels to provide your customers with flexible payment options. 
            Each method is optimized for the Nigerian market with high success rates.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-blue-100">
                <CreditCard className="h-6 w-6 text-blue-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Card Payments</h4>
              <p className="text-sm text-gray-600 mb-2">Secure card processing with 3D authentication</p>
              <div className="text-xs text-blue-600 space-y-1">
                <div>• Visa & Mastercard</div>
                <div>• Verve (Local cards)</div>
                <div>• International cards</div>
                <div>• OTP verification</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-emerald-100">
                <Code className="h-6 w-6 text-emerald-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">USSD Payments</h4>
              <p className="text-sm text-gray-600 mb-2">Phone-based payments via USSD codes</p>
              <div className="text-xs text-emerald-600 space-y-1">
                <div>• All major Nigerian banks</div>
                <div>• No internet required</div>
                <div>• High success rates</div>
                <div>• Mobile banking integration</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-purple-100">
                <Database className="h-6 w-6 text-purple-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Bank Transfer</h4>
              <p className="text-sm text-gray-600 mb-2">Direct bank transfers via virtual accounts</p>
              <div className="text-xs text-purple-600 space-y-1">
                <div>• Virtual account generation</div>
                <div>• Automatic reconciliation</div>
                <div>• 30-minute expiry</div>
                <div>• Real-time confirmation</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-amber-100">
                <QrCode className="h-6 w-6 text-blue-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">QR Code Payments</h4>
              <p className="text-sm text-gray-600 mb-2">Scan-to-pay with mobile banking apps</p>
              <div className="text-xs text-blue-600 space-y-1">
                <div>• Mobile-first experience</div>
                <div>• Contactless payments</div>
                <div>• Quick checkout</div>
                <div>• Bank app integration</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-green-100">
                <BriefcaseIcon className="h-6 w-6 text-emerald-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Buy Now Pay Later</h4>
              <p className="text-sm text-gray-600 mb-2">Flexible payment plans for customers</p>
              <div className="text-xs text-emerald-600 space-y-1">
                <div>• Installment payments</div>
                <div>• Credit assessment</div>
                <div>• Flexible terms</div>
                <div>• Instant approval</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-indigo-100">
                <ScanBarcode className="h-6 w-6 text-purple-600 mx-auto"/>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Pay Attitude</h4>
              <p className="text-sm text-gray-600 mb-2">Advanced payment processing solution</p>
              <div className="text-xs text-purple-600 space-y-1">
                <div>• Enhanced security</div>
                <div>• Multi-channel support</div>
                <div>• Smart routing</div>
                <div>• Optimized success rates</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">🎯 Payment Method Selection</h4>
            <p className="text-sm text-blue-800">
              You can configure which payment methods to display to your customers using the <code className="bg-blue-100 px-1 rounded">options</code> 
              parameter in your integration. This allows you to customize the checkout experience based on your business needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};