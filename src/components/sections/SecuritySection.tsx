import React from 'react';
import { Shield, Lock, Key, AlertTriangle } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';

export const SecuritySection: React.FC = () => {
  const encryptionExample = `// C# AES Encryption Example
using System;
using System.Security.Cryptography;
using System.Text;

public static string EncryptCardData(string cardData, string encryptionKey)
{
    using (Aes aesAlg = Aes.Create())
    {
        // Use your 32-character encryption key
        aesAlg.Key = Encoding.UTF8.GetBytes(encryptionKey.PadRight(32).Substring(0, 32));
        aesAlg.IV = new byte[16]; // Zero IV for simplicity
        
        ICryptoTransform encryptor = aesAlg.CreateEncryptor();
        
        using (var msEncrypt = new MemoryStream())
        using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
        using (var swEncrypt = new StreamWriter(csEncrypt))
        {
            swEncrypt.Write(cardData);
            return Convert.ToBase64String(msEncrypt.ToArray());
        }
    }
}

// Usage
string cardDetails = "4000000000000002|12|25|123"; // PAN|MM|YY|CVV
string encryptedData = EncryptCardData(cardDetails, "your-32-char-encryption-key-here");`;

  const webhookVerification = `// Node.js Webhook Signature Verification
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  // Generate expected signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  // Compare signatures using timing-safe comparison
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Express.js webhook endpoint
app.post('/webhook/firstcheckout', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-firstcheckout-signature'];
  const payload = req.body;
  
  if (!verifyWebhookSignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process verified webhook
  const event = JSON.parse(payload);
  console.log('Verified webhook:', event);
  
  res.status(200).send('OK');
});`;

  const secureConfigExample = `# Secure Environment Variables (.env)
# NEVER commit this file to version control!

# FirstCheckout API Credentials
FIRSTCHECKOUT_PUBLIC_KEY=pk_live_your_public_key_here
FIRSTCHECKOUT_SECRET_KEY=sk_live_your_secret_key_here
FIRSTCHECKOUT_ENCRYPTION_KEY=your_32_character_encryption_key_here
FIRSTCHECKOUT_CLIENT_ID=your_client_id_here
FIRSTCHECKOUT_CLIENT_SECRET=your_client_secret_here

# Webhook Security
WEBHOOK_SECRET=your_webhook_secret_for_signature_verification

# Environment
FIRSTCHECKOUT_ENVIRONMENT=live

# Database (if storing transaction data)
DATABASE_URL=postgresql://encrypted_connection_string
DATABASE_ENCRYPTION_KEY=separate_key_for_database_encryption`;

  const rateLimitingExample = `// Rate limiting for payment endpoints
const rateLimit = require('express-rate-limit');

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 payment requests per windowMs
  message: 'Too many payment attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to payment routes
app.use('/api/payments', paymentLimiter);

// Additional protection for sensitive operations
const cardLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // Max 3 card attempts per minute
  skipSuccessfulRequests: true
});

app.use('/api/payments/card', cardLimiter);`;

  return (
    <section id="security" className="mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Security & Compliance</h2>
        <p className="text-lg text-gray-600 mb-8">
          FirstCheckout implements industry-leading security measures to protect payment data and ensure compliance 
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
                All card data MUST be encrypted using AES-256 encryption before transmission to FirstCheckout APIs. 
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
              <CodeBlock language="javascript" code={webhookVerification} />
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rate Limiting & Protection</h3>
            
            <p className="text-gray-600 mb-4">
              Implement rate limiting to protect against abuse and ensure system stability:
            </p>

            <div className="mb-6">
              <CodeBlock language="javascript" code={rateLimitingExample} />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">API Rate Limits</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 100 requests/minute per IP</li>
                  <li>• 500 requests/hour per merchant</li>
                  <li>• Burst protection enabled</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Payment Limits</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• 5 payments/15min per IP</li>
                  <li>• 3 card attempts/minute</li>
                  <li>• Automatic fraud detection</li>
                </ul>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-900 mb-2">Protection Features</h4>
                <ul className="text-sm text-emerald-800 space-y-1">
                  <li>• DDoS protection</li>
                  <li>• IP whitelisting available</li>
                  <li>• Automated threat detection</li>
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
                    <h5 className="font-semibold text-gray-900 mb-2">FirstCheckout Handles</h5>
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
                    <span>Contact FirstCheckout support immediately</span>
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
                    <a href="mailto:security@firstchekout.ng" className="text-blue-600">security@firstchekout.ng</a>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>24/7 Support:</strong><br />
                    <a href="tel:+2341234567890" className="text-blue-600">+234 (0) 123 456 7890</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};