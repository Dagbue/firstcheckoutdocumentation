import React from 'react';
import {Code, Database, Webhook, Lock, CreditCard, QrCode, BriefcaseIcon, ScanBarcode, AlertTriangle, BookOpen, Shield, Zap} from 'lucide-react';
import { CodeBlock } from '../CodeBlock';
import {MermaidDiagramSudo} from "../MermaidDiagramSudo.tsx";
import {MermaidDiagram} from "@lightenna/react-mermaid-diagram";

export const ApiSdkSection: React.FC = () => {
  // const openApiDocs = () => {
  //   window.open('https://documenter.getpostman.com/view/30508792/2sB3BLi6vb', '_blank', 'noopener,noreferrer');
  // };

  const quickStartCode = `// Quick Start Example
const firstchekout = require('firstchekout');

// Initialize with your credentials
const client = firstchekout({
  publicKey: 'pk_live_your_key_here',
  secretKey: 'sk_live_your_secret_here'
});

// Accept a payment
const payment = await client.transaction.initialize({
  amount: 10000, // Amount in kobo (₦100.00)
  email: 'customer@example.com',
  reference: 'unique_ref_' + Date.now()
});

console.log('Payment URL:', payment.data.authorization_url);`;
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

  const initiateTransactionCode = `curl --location '{{ payment_Gateway_Url }}/api/v1/transactions/initiate' \\ // reference testing and debugging section
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

  const cardInitiateCode = `curl --location '{{ payment_Gateway_Url }}/api/v1/cards/initiate' \\  // reference testing and debugging section
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "AuthData": "encrypted_card_data_here",
  "AccessCode": "TXN_ACCESS_CODE_123",
  "PaymentReference": "unique-ref-12345"
}'`;

  const cardConfirmCode = `curl --location '{{ payment_Gateway_Url }}/api/v1/cards/complete' \\ // reference testing and debugging section
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "Otp": "123456",
  "PaymentReference": "unique-ref-12345"
}'`;

  const statusCheckCode = `curl --location '{{ payment_Gateway_Url }}/api/v1/transactions/status/{paymentReference}' \\ // reference testing and debugging section
--header 'Authorization: Bearer {access_token}'`;

  const encryptionCodeCSharp = `/// <summary>
/// Asynchronously encrypts the provided plaintext using AES-GCM with the given key,
/// and includes optional merchant and tenant information as Additional Authenticated Data (AAD).
/// </summary>
/// <param name="plaintext">The plaintext string to encrypt.</param>
/// <param name="keyBytes">The symmetric encryption key (must be 128, 192, or 256 bits).</param>
/// <param name="merchantId">Optional merchant identifier used as part of the AAD.</param>
/// <param name="transactionRef">Optional tenant identifier used as part of the AAD.</param>
/// <returns>A task that resolves to the encrypted data in format [nonce || tag || ciphertext].</returns>
/// <exception cref="ArgumentException">Thrown if plaintext is null or empty.</exception>
/// <exception cref="CryptographicException">Thrown if encryption fails.</exception>
private async Task<byte[]?> EncryptAsync(
    string plaintext,
    byte[] keyBytes,
    string merchantId,
    string transactionRef)
{
    if (string.IsNullOrWhiteSpace(plaintext))
        throw new ArgumentException("Plaintext must not be null or empty.", nameof(plaintext));

    return await Task.Run(() =>
    {
        byte[] plaintextBytes = Encoding.UTF8.GetBytes(plaintext);
        byte[] nonce = RandomNumberGenerator.GetBytes(NonceSize);
        byte[] tag = new byte[TagSizeBytes];
        byte[] ciphertext = new byte[plaintextBytes.Length];
        byte[]? resolvedKey = null;
        var versionBytes = Array.Empty<byte>();

        try
        {
            byte[] combinedAad = ComposeAad(versionBytes, merchantId, transactionRef);

            using var aes = new AesGcm(keyBytes, TagSizeBytes);
            aes.Encrypt(nonce, plaintextBytes, ciphertext, tag, combinedAad);

            byte[]? result = new byte[NonceSize + TagSizeBytes + ciphertext.Length];
            Buffer.BlockCopy(nonce, 0, result, 0, NonceSize);
            Buffer.BlockCopy(tag, 0, result, NonceSize, TagSizeBytes);
            Buffer.BlockCopy(ciphertext, 0, result, NonceSize + TagSizeBytes, ciphertext.Length);
            return result;
        }
        catch (Exception ex)
        {
            throw new CryptographicException("Encryption failed. See logs for details.", ex);
        }
        finally
        {
            CryptographicOperations.ZeroMemory(plaintextBytes);
            CryptographicOperations.ZeroMemory(tag);
            if (resolvedKey != null)
            {
                CryptographicOperations.ZeroMemory(resolvedKey);
            }
        }
    });
}

/// <summary>
/// Combines version bytes, merchant ID, and transaction Reference into a single authenticated data buffer.
/// Optimized to minimize allocations and memory copies.
/// </summary>
/// <param name="versionBytes">Optional version bytes to prepend.</param>
/// <param name="merchantId">Optional merchant identifier.</param>
/// <param name="transactionRef">Optional tenant identifier.</param>
/// <returns>Concatenated byte array of inputs.</returns>
private static byte[] ComposeAad(byte[] versionBytes, string merchantId, string transactionRef)
{
    var utf8 = Encoding.UTF8;

    int merchantLength = string.IsNullOrWhiteSpace(merchantId) ? 0 : utf8.GetByteCount(merchantId);
    int transactionRefLength = string.IsNullOrWhiteSpace(transactionRef) ? 0 : utf8.GetByteCount(transactionRef);
    int totalLength = versionBytes.Length + merchantLength + transactionRefLength;

    if (totalLength == 0)
        return [];

    byte[] combined = new byte[totalLength];
    int offset = 0;

    Buffer.BlockCopy(versionBytes, 0, combined, offset, versionBytes.Length);
    offset += versionBytes.Length;

    if (merchantLength > 0)
        offset += utf8.GetBytes(merchantId, 0, merchantId.Length, combined, offset);

    if (transactionRefLength > 0)
        offset += utf8.GetBytes(transactionRef, 0, transactionRef.Length, combined, offset);

    return combined;
}
private bool IsBase64String(string input)
{
    if (string.IsNullOrWhiteSpace(input))
        return false;

    Span<byte> buffer = new Span<byte>(new byte[input.Length]);
    return Convert.TryFromBase64String(input, buffer, out _);
}
public record DebitCard(string Pan, string ExpiryDate, string Cvv, string Pin);`;

  const webhookCode = ` public class TransactionResponseHashDataDto
 {
     public TransactionResponseHashDataDto(Transaction transaction)
     {
         TransactionReference = transaction.TransactionReference;
         PaymentReference = transaction.PaymentReference;
         PayerEmail = transaction.PayerEmail;
         CollectionMethod = transaction.CollectionMethod.ToString();
         Status = transaction.Status.ToString();
         CreatedAt = transaction.CreatedAt;
         ItemQuantity = transaction.ItemQuantity;
         Purpose = transaction.Purpose;
         PayerName = transaction.PayerName;
     }

     public string TransactionReference { get; set; }
     public string PaymentReference { get; set; }
     public string PayerEmail { get; set; }
     public string CollectionMethod { get; set; }
     public string Status { get; set; }
     public DateTime CreatedAt { get; set; }
     public string PayerName { get; set; }
     public string Purpose { get; set; }
     public int ItemQuantity { get; set; }
 }`;

  const tokenGenerationCode = `curl --location '{{ identity_Service_Url }}/api/v2/Authenticate/token' \\ // reference testing and debugging section
--header 'Content-Type: application/x-www-form-urlencoded' \\
--data-urlencode 'client_Id=your-client-id' \\
--data-urlencode 'client_Secret=your-client-secret' \\
--data-urlencode 'grant_type=client_credentials'`;

  const tokenResponse = `{
  "access_token": "TXN_ACCESS_TOKEN_123",
  "token_type": "Bearer",
  "expires_in": 1800
}`;

  const authHeaderExample = `Authorization: Bearer YOUR_SECRET_KEY
Content-Type: application/json`;



  const metadataExample = `{
  "Amount": 10000,
  "PayerEmail": "customer@example.com",
  "PayerName": "John Doe",
  "Purpose": "Product Purchase",
  "PublicKey": "your-public-key",
  "PaymentReference": "unique-ref-12345",
  "metadata": {
    "cart_id": "abc123",
    "items": ["shoe", "bag"],
    "user_preference": "express_shipping",
    "order_source": "mobile_app"
  }
}`;

//   const paginationExample = `curl --location '{{ payment_Gateway_Url }}/api/v1/transactions?page=1&per_page=50&status=success&from=2025-01-01&to=2025-09-04' \\
// --header 'Authorization: Bearer {access_token}'`;
//
//   const paginationResponse = `{
//   "responseCode": "00",
//   "responseMessage": "Success",
//   "data": [
//     {
//       "transactionReference": "TXN_123",
//       "amount": 10000,
//       "status": "success"
//     }
//   ],
//   "meta": {
//     "total": 100,
//     "page": 1,
//     "per_page": 50,
//     "total_pages": 2
//   }
// }`;

  const standardErrorResponse = `{
  "status": false,
  "message": "Invalid token",
  "data": null,
  "code": "AUTH_001",
  "details": {
    "field": "authorization",
    "issue": "Token expired or malformed"
  }
}`;

//   const webhookPayload = `{
//   "event": "payment.success",
//   "data": {
//     "transactionReference": "TXN_123456",
//     "paymentReference": "unique-ref-12345",
//     "amount": 10000,
//     "currency": "NGN",
//     "status": "successful",
//     "payerEmail": "customer@example.com",
//     "payerName": "John Doe",
//     "createdAt": "2025-01-15T10:30:00Z",
//     "metadata": {
//       "cart_id": "abc123",
//       "order_source": "website"
//     }
//   },
//   "timestamp": "2025-01-15T10:30:00Z",
//   "signature": "sha256=abc123def456..."
// }`;



  return (
      <section id="api-sdk" className="mb-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">API/SDK Integration</h2>
          <p className="text-l text-gray-600 mb-4">
            Direct API integration for custom applications. This method provides full control and flexibility,
            supporting any programming language with HTTP client capabilities.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <Code className="h-8 w-8 text-blue-600 mx-auto mb-3"/>
              <h3 className="font-semibold text-blue-900 text-sm">Any Language</h3>
              <p className="text-xs text-blue-700">Works with any language supporting HTTP</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
              <Database className="h-8 w-8 text-emerald-600 mx-auto mb-3"/>
              <h3 className="font-semibold text-emerald-900 text-sm">Full Control</h3>
              <p className="text-xs text-emerald-700">Complete customization of payment flow</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <Webhook className="h-8 w-8 text-purple-600 mx-auto mb-3"/>
              <h3 className="font-semibold text-purple-900 text-sm">Real-time Updates</h3>
              <p className="text-xs text-purple-700">Webhook notifications for events</p>
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
              <div className="bg-amber-100 border border-amber-300 rounded-lg p-4">
                <h5 className="font-semibold text-amber-900 mb-2">📖 Official API Documentation</h5>
                <p className="text-sm text-amber-800 mb-3">
                  Access our comprehensive Postman documentation for complete API reference, sample requests,
                  response examples, and interactive testing capabilities:
                </p>
                {/*<button*/}
                {/*    onClick={openApiDocs}*/}
                {/*    className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium focus:outline-none"*/}
                {/*>*/}
                {/*  📋 View Complete API Documentation*/}
                {/*  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                {/*    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />*/}
                {/*  </svg>*/}
                {/*</button>*/}
                <a
                    href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"
                    className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  📋 View Complete API Documentation
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Enhanced Authentication Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-3" />
                Authentication & Security
              </h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">🔐 Bearer Token Authentication</h4>
                <p className="text-blue-800 mb-4">
                  FirstChekout uses Bearer tokens for API authentication. All API requests must include your secret key 
                  in the Authorization header. Never expose secret keys in client-side code.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-2">Key Types:</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• <strong>Secret Key:</strong> Server-side authentication (sk_live_xxx)</li>
                      <li>• <strong>Public Key:</strong> Client-side integration (pk_live_xxx)</li>
                      <li>• <strong>Sandbox Keys:</strong> Testing environment (sb-sk_xxx, sb-pk_xxx)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-2">Security Best Practices:</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Store keys in environment variables</li>
                      <li>• Rotate keys regularly</li>
                      <li>• Use HTTPS for all requests</li>
                      <li>• Never log sensitive data</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">HTTP Header Format:</h4>
                  <CodeBlock language="http" code={authHeaderExample} />
                </div>

                {/*<div>*/}
                {/*  <h4 className="font-medium text-gray-900 mb-2">Python Example:</h4>*/}
                {/*  <CodeBlock language="python" code={pythonAuthExample} />*/}
                {/*</div>*/}
              </div>
            </div>

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

            {/* Enhanced Metadata Support */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 text-purple-600 mr-3" />
                Metadata & Custom Fields
              </h3>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-purple-900 mb-4">📋 Rich Metadata Support</h4>
                <p className="text-purple-800 mb-4">
                  FirstChekout supports rich metadata to help you store additional information with transactions. 
                  This is perfect for e-commerce integrations, order tracking, and custom business logic.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-purple-900 mb-2">Features:</h5>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Up to 10 key-value pairs per transaction</li>
                      <li>• Supports strings, numbers, and arrays</li>
                      <li>• Returned in webhooks and status queries</li>
                      <li>• Perfect for cart details and user preferences</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-purple-900 mb-2">Use Cases:</h5>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Shopping cart reconciliation</li>
                      <li>• Customer preference tracking</li>
                      <li>• Order source attribution</li>
                      <li>• Custom business data</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Transaction with Metadata Example:</h4>
                <CodeBlock language="json" code={metadataExample} />
              </div>
            </div>

            {/* Pagination & Filtering */}
            {/*<div>*/}
            {/*  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">*/}
            {/*    <BookOpen className="h-6 w-6 text-emerald-600 mr-3" />*/}
            {/*    Pagination & Filtering*/}
            {/*  </h3>*/}
            {/*  */}
            {/*  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">*/}
            {/*    <h4 className="text-lg font-semibold text-emerald-900 mb-4">📄 Standardized Pagination</h4>*/}
            {/*    <p className="text-emerald-800 mb-4">*/}
            {/*      All list endpoints support pagination and filtering to help you efficiently manage large datasets. */}
            {/*      Use query parameters to control the results returned.*/}
            {/*    </p>*/}
            {/*    */}
            {/*    <div className="grid md:grid-cols-2 gap-4">*/}
            {/*      <div>*/}
            {/*        <h5 className="font-semibold text-emerald-900 mb-2">Query Parameters:</h5>*/}
            {/*        <ul className="text-sm text-emerald-800 space-y-1">*/}
            {/*          <li>• <code>page</code>: Page number (default: 1)</li>*/}
            {/*          <li>• <code>per_page</code>: Items per page (default: 20, max: 100)</li>*/}
            {/*          <li>• <code>status</code>: Filter by status (success, pending, failed)</li>*/}
            {/*          <li>• <code>from</code> & <code>to</code>: Date range filtering</li>*/}
            {/*        </ul>*/}
            {/*      </div>*/}
            {/*      */}
            {/*      <div>*/}
            {/*        <h5 className="font-semibold text-emerald-900 mb-2">Advanced Filters:</h5>*/}
            {/*        <ul className="text-sm text-emerald-800 space-y-1">*/}
            {/*          <li>• <code>amount_min</code> & <code>amount_max</code>: Amount range</li>*/}
            {/*          <li>• <code>sort</code>: Sort order (amount_desc, date_asc)</li>*/}
            {/*          <li>• <code>email</code>: Filter by customer email</li>*/}
            {/*          <li>• <code>reference</code>: Search by reference</li>*/}
            {/*        </ul>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}

            {/*  <div className="space-y-4">*/}
            {/*    <div>*/}
            {/*      <h4 className="font-medium text-gray-900 mb-2">Paginated Request Example:</h4>*/}
            {/*      <CodeBlock language="bash" code={paginationExample} />*/}
            {/*    </div>*/}

            {/*    <div>*/}
            {/*      <h4 className="font-medium text-gray-900 mb-2">Paginated Response Format:</h4>*/}
            {/*      <CodeBlock language="json" code={paginationResponse} />*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/* Standardized Error Handling */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                Error Handling & Status Codes
              </h3>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-red-900 mb-4">🚨 Standardized Error Responses</h4>
                <p className="text-red-800 mb-4">
                  FirstChekout uses consistent error response formats across all endpoints. All errors include 
                  structured information to help you handle them programmatically.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-red-900 mb-2">HTTP Status Codes:</h5>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• <code>200</code>: Success</li>
                      <li>• <code>400</code>: Bad Request (validation errors)</li>
                      <li>• <code>401</code>: Unauthorized (invalid/expired token)</li>
                      <li>• <code>403</code>: Forbidden (insufficient permissions)</li>
                      <li>• <code>404</code>: Not Found</li>
                      <li>• <code>429</code>: Rate Limited</li>
                      <li>• <code>500</code>: Internal Server Error</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-red-900 mb-2">Common Error Codes:</h5>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• <code>AUTH_001</code>: Invalid token</li>
                      <li>• <code>AUTH_002</code>: Token expired</li>
                      <li>• <code>VAL_001</code>: Validation error</li>
                      <li>• <code>PAY_001</code>: Payment failed</li>
                      <li>• <code>PAY_002</code>: Insufficient funds</li>
                      <li>• <code>REF_001</code>: Duplicate reference</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Standard Error Response Format:</h4>
                <CodeBlock language="json" code={standardErrorResponse} />
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
                <CodeBlock language="c#" code={webhookCode}/>
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
              
              {/*<div className="mt-6">*/}
              {/*  <h4 className="font-medium text-gray-900 mb-2">Enhanced Webhook Payload Example:</h4>*/}
              {/*  <CodeBlock language="json" code={webhookPayload} />*/}
              {/*</div>*/}
              
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-2">🔐 Webhook Security</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Verify HMAC signatures using your webhook secret</li>
                  <li>• Use HTTPS endpoints only</li>
                  <li>• Implement proper authentication on your webhook endpoints</li>
                  <li>• Log webhook attempts for security monitoring</li>
                </ul>
              </div>
            </div>

            {/* Currency & Amount Handling */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="h-6 w-6 text-amber-600 mr-3" />
                Currency & Amount Handling
              </h3>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-amber-900 mb-4">💰 Subunit Currency Format</h4>
                <p className="text-amber-800 mb-4">
                  FirstChekout uses subunits for all amount values to avoid floating-point precision issues. 
                  For Nigerian Naira (NGN), amounts are specified in kobo (1 NGN = 100 kobo).
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-amber-900 mb-2">Supported Currencies:</h5>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• <strong>NGN</strong> (Nigerian Naira) - Primary</li>
                      {/*<li>• <strong>USD</strong> (US Dollar) - International</li>*/}
                      {/*<li>• <strong>EUR</strong> (Euro) - International</li>*/}
                      {/*<li>• <strong>GBP</strong> (British Pound) - International</li>*/}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-amber-900 mb-2">Conversion Examples:</h5>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• ₦1.00 = 100 kobo</li>
                      <li>• ₦10.50 = 1,050 kobo</li>
                      <li>• ₦1,000.00 = 100,000 kobo</li>
                      <li>• Always multiply by 100 for NGN</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/*<div>*/}
              {/*  <h4 className="font-medium text-gray-900 mb-2">Amount Handling Examples:</h4>*/}
              {/*  <CodeBlock language="javascript" code={currencyExample} />*/}
              {/*</div>*/}
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
          
          {/* API Reference Quick Links */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <BookOpen className="h-6 w-6 mr-2" />
              Complete API Reference
            </h3>
            <p className="text-blue-800 mb-4">
              For comprehensive endpoint documentation, interactive examples, and testing capabilities, 
              visit our complete API reference documentation.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">What You'll Find:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Complete endpoint reference</li>
                  <li>• Interactive request/response examples</li>
                  <li>• Parameter validation details</li>
                  <li>• Status code explanations</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Testing Features:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Live API testing environment</li>
                  <li>• Sample data and responses</li>
                  <li>• Code generation for multiple languages</li>
                  <li>• Postman collection export</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4">
              <a
                href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"
                className="inline-flex items-center px-6 py-3 bg-bank-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Access Complete API Documentation
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
  );
};