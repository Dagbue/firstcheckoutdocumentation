import React from 'react';
import { Shield, Lock, Key, AlertTriangle } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';

export const SecuritySection: React.FC = () => {
  const encryptionExample = `/// <summary>
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
public record DebitCard(string Pan, string ExpiryDate, string Cvv, string Pin);
  `;

  const webhookVerification = `public async Task<WebhookResponse> AcceptWebhook(ChekoutWebhookData data, string ip)
{
    var response = new WebhookResponse();
        var error = new Error();
    if (data == null)
    {
        error.Code = WebhookErrorCodes.INVALID_REQUEST_FORMAT;
        error.Message = WebhookErrorMessages.INVALID_REQUEST_FORMAT;
        response.PrepareFailureResponse(data, _paymentSettings.MerchantId, error);
        _logger.LogError("================= ERROR VALIDATING WEBHOOK DATA ================ {0}", response.ToJSON());
        return response;
    }
    try
    {
        data.Amount = Math.Round(data.Amount, 2);
        var dataString = JsonSerializer.Serialize(data);
        _logger.LogInformation("================= WEBHOOK DATA  ACCEPTED ================");
        var result = await CompleteTransactionWebHook(data, ip);
        response = result;
        var resultString = JsonSerializer.Serialize(result);
        _logger.LogInformation("=========== COMPLETE TRANSACTION WEBHOOK RESPONSE ============= {Response}", resultString);
    }
    catch (Exception ex)
    {
        error.Code = WebhookErrorCodes.MERCHANT_SERVICE_UNAVAILABLE;
        error.Message = WebhookErrorMessages.MERCHANT_SERVICE_UNAVAILABLE;
        response.PrepareFailureResponse(data, _paymentSettings.MerchantId, error);
        _logger.LogError(ex, "====== PaymentService.AcceptWebhook {0} ======", ex.Message);
        _logger.LogInformation("================= RESPONSE BACK TO FIRSTCHEKOUT =============== {RESPONSE}", response.ToJSON());
        return response;
    }
    return response;
}`;


  const secureConfigExample = `# Secure Environment Variables (.env)
# NEVER commit this file to version control!

# FirstChekout API Credentials
FIRSTCHEKOUT_PUBLIC_KEY=pk_live_your_public_key_here
FIRSTCHEKOUT_SECRET_KEY=sk_live_your_secret_key_here
FIRSTCHEKOUT_ENCRYPTION_KEY=your_32_character_encryption_key_here
FIRSTCHEKOUT_CLIENT_ID=your_client_id_here
FIRSTCHEKOUT_CLIENT_SECRET=your_client_secret_here

# Webhook Security
WEBHOOK_SECRET=your_webhook_secret_for_signature_verification

# Environment
FIRSTCHEKOUT_ENVIRONMENT=live

# Database (if storing transaction data)
DATABASE_URL=postgresql://encrypted_connection_string
DATABASE_ENCRYPTION_KEY=separate_key_for_database_encryption`;



  return (
    <section id="security" className="mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security & Compliance</h2>
        <p className="text-l text-gray-600 mb-4">
          FirstChekout implements industry-leading security measures to protect payment data and ensure compliance
          with international standards. Understanding and implementing these security practices is crucial for 
          protecting your customers and business.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <Shield className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold text-red-900 text-sm">PCI DSS</h3>
            <p className="text-xs text-red-700 mt-1">Level 1 Compliant</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <Lock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900 text-sm">AES Encryption</h3>
            <p className="text-xs text-blue-700 mt-1">256-bit Encryption</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <Key className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-semibold text-emerald-900 text-sm">OAuth 2.0</h3>
            <p className="text-xs text-emerald-700 mt-1">Secure Authentication</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-900 text-sm">3D Secure</h3>
            <p className="text-xs text-purple-700 mt-1">Enhanced Verification</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Encryption</h3>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-red-600 mr-3" />
                <h4 className="text-lg font-semibold text-red-900">Critical Requirement</h4>
              </div>
              <p className="text-red-800 mb-4">
                All card data MUST be encrypted using AES-256 encryption before transmission to FirstChekout APIs.
                Never send plain card details over the network.
              </p>
              <div className="bg-red-100 p-3 rounded">
                <strong className="text-red-900">⚠️ Non-compliance may result in:</strong>
                <ul className="text-red-800 text-sm mt-2 ml-4">
                  <li>• Account suspension</li>
                  <li>• Security breach liability</li>
                  <li>• Regulatory penalties</li>
                  <li>• Loss of payment processing privileges</li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">AES Encryption Implementation</h4>
              <CodeBlock language="csharp" code={encryptionExample} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-900 mb-2">✅ Encryption Best Practices</h4>
                <ul className="text-sm text-emerald-800 space-y-1">
                  <li>• Use AES-256 encryption algorithm</li>
                  <li>• Generate unique IV for each encryption</li>
                  <li>• Store encryption keys securely</li>
                  <li>• Never log encrypted or decrypted card data</li>
                  <li>• Use secure random number generators</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Common Mistakes</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Using weak encryption algorithms</li>
                  <li>• Hardcoding encryption keys</li>
                  <li>• Reusing IVs across encryptions</li>
                  <li>• Storing card data in plain text</li>
                  <li>• Logging sensitive payment information</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Webhook Security</h3>
            
            <p className="text-gray-600 mb-4">
              Verify webhook signatures to ensure payment notifications are authentic and haven't been tampered with.
            </p>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Signature Verification</h4>
              <CodeBlock language="c#" code={webhookVerification} />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">🔐 Webhook Security Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Always verify webhook signatures</li>
                <li>• Use HTTPS endpoints for webhook URLs</li>
                <li>• Implement proper error handling</li>
                <li>• Log webhook events for audit trails</li>
                <li>• Set up monitoring for failed webhooks</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Configuration</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Environment Variables</h4>
              <p className="text-gray-600 mb-4">
                Store all sensitive configuration securely using environment variables:
              </p>
              <CodeBlock language="bash" code={secureConfigExample} />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-900 mb-2">✅ Security Checklist</h4>
                <ul className="text-sm text-emerald-800 space-y-1">
                  <li>• Use HTTPS for all communications</li>
                  <li>• Store keys in environment variables</li>
                  <li>• Implement proper access controls</li>
                  <li>• Regular security audits</li>
                  <li>• Monitor for suspicious activity</li>
                  <li>• Keep dependencies updated</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-2">⚠️ Common Vulnerabilities</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Exposed API keys in client code</li>
                  <li>• Unencrypted data transmission</li>
                  <li>• Missing webhook verification</li>
                  <li>• Inadequate error handling</li>
                  <li>• Unprotected admin endpoints</li>
                  <li>• Outdated security libraries</li>
                </ul>
              </div>
            </div>
          </div>



          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Compliance Requirements</h3>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-red-600 mr-3" />
                  <h4 className="text-lg font-semibold text-gray-900">PCI DSS Compliance</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Merchant Responsibilities</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Secure storage of cardholder data</li>
                      <li>• Maintain a vulnerability management program</li>
                      <li>• Implement strong access control measures</li>
                      <li>• Regularly monitor and test networks</li>
                      <li>• Maintain an information security policy</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">FirstChekout Handles</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Secure payment processing</li>
                      <li>• Card data encryption and tokenization</li>
                      <li>• PCI DSS Level 1 compliance</li>
                      <li>• Secure data transmission</li>
                      <li>• Fraud monitoring and detection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Data Protection (GDPR/NDPR)</h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Customer Rights</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Right to access personal data</li>
                      <li>• Right to data portability</li>
                      <li>• Right to erasure ("right to be forgotten")</li>
                      <li>• Right to rectification</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Implementation</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Obtain explicit consent for data processing</li>
                      <li>• Implement data retention policies</li>
                      <li>• Provide data access and deletion APIs</li>
                      <li>• Maintain audit logs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Incident Response</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Immediate Actions</h4>
                <ol className="text-sm text-gray-600 space-y-2">
                  <li className="flex">
                    <span className="flex-shrink-0 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">1</span>
                    <span>Isolate affected systems immediately</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">2</span>
                    <span>Contact FirstChekout support immediately</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">3</span>
                    <span>Preserve evidence for investigation</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">4</span>
                    <span>Document the incident timeline</span>
                  </li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Emergency Contacts</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-3 rounded border">
                    <strong>Security Team:</strong><br />
                    <a href="mailto:firstcontactcomplaints@firstbankgroup.com" className="text-blue-600">firstcontactcomplaints@firstbankgroup.com</a>
                  </div>
                  {/*<div className="bg-white p-3 rounded border">*/}
                  {/*  <strong>24/7 Support:</strong><br />*/}
                  {/*  <a href="tel:+2341234567890" className="text-blue-600">+234 (0) 123 456 7890</a>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};