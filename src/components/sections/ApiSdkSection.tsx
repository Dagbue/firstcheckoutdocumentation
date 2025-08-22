import React from 'react';
import { Code, Database, Webhook, Lock, CreditCard } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';
import { MermaidDiagram } from '../MermaidDiagram';

export const ApiSdkSection: React.FC = () => {
  const apiFlowDiagram = `
graph LR
    A[Generate Token] --> B[Initiate Transaction]
    B --> C[Get Access Code]
    C --> D[Select Payment Method]
    D --> E1[Card + Encryption]
    D --> E2[USSD Code]
    D --> E3[Bank Transfer]
    E1 --> F[Confirm with OTP]
    E2 --> F
    E3 --> F
    F --> G[Query Status]
    G --> H[Webhook Notification]
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
            <Code className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-900">Any Language</h3>
            <p className="text-sm text-blue-700">Works with any language supporting HTTP</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <Database className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-semibold text-emerald-900">Full Control</h3>
            <p className="text-sm text-emerald-700">Complete customization of payment flow</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <Webhook className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-purple-900">Real-time Updates</h3>
            <p className="text-sm text-purple-700">Webhook notifications for events</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Flow Diagram</h3>
          <MermaidDiagram code={apiFlowDiagram} />
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Initiate Transaction</h3>
            <p className="text-gray-600 mb-4">
              Start a payment by providing basic transaction details. This returns an access code for subsequent operations.
            </p>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Request:</h4>
              <CodeBlock language="bash" code={initiateTransactionCode} />
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Response:</h4>
              <CodeBlock language="json" code={initiateResponse} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Card Payment Flow</h3>
            <p className="text-gray-600 mb-4">
              For card payments, encrypt the card data using AES encryption before sending to the API.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <Lock className="h-5 w-5 text-amber-600 mr-2" />
                <h4 className="font-semibold text-amber-900">Encryption Required</h4>
              </div>
              <p className="text-sm text-amber-800">
                All card data must be encrypted using AES with your encryption key before transmission.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">AES Encryption Example (C#):</h4>
              <CodeBlock language="csharp" code={encryptionCodeCSharp} />
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Initiate Card Payment:</h4>
              <CodeBlock language="bash" code={cardInitiateCode} />
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Complete with OTP:</h4>
              <CodeBlock language="bash" code={cardConfirmCode} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Check Transaction Status</h3>
            <p className="text-gray-600 mb-4">
              Query the current status of any transaction using its payment reference.
            </p>
            <CodeBlock language="bash" code={statusCheckCode} />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 4: Handle Webhooks</h3>
            <p className="text-gray-600 mb-4">
              Set up webhook endpoints to receive real-time payment notifications.
            </p>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Webhook Payload Structure:</h4>
              <CodeBlock language="json" code={webhookCode} />
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Payment Methods</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                <CreditCard className="h-6 w-6 text-blue-600 mx-auto" />
              </div>
              <h4 className="font-medium">Card Payments</h4>
              <p className="text-sm text-gray-600">Visa, Mastercard, Verve</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                <Code className="h-6 w-6 text-emerald-600 mx-auto" />
              </div>
              <h4 className="font-medium">USSD</h4>
              <p className="text-sm text-gray-600">All major Nigerian banks</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                <Database className="h-6 w-6 text-purple-600 mx-auto" />
              </div>
              <h4 className="font-medium">Bank Transfer</h4>
              <p className="text-sm text-gray-600">Virtual account generation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};