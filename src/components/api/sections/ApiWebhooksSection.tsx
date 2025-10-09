import React from 'react';
import {  Copy, Check, Shield } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';

export const ApiWebhooksSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('nodejs');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const webhookVerificationCode = {
    nodejs: `const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Express.js webhook handler
app.post('/webhook/firstchekout', (req, res) => {
  const signature = req.headers['x-firstchekout-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifyWebhookSignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(400).send('Invalid signature');
  }
  
  const { eventType, data } = req.body;
  
  switch (eventType) {
    case 'payment.success':
      handleSuccessfulPayment(data);
      break;
    case 'payment.failed':
      handleFailedPayment(data);
      break;
    default:
      console.log('Unknown event type:', eventType);
  }
  
  res.status(200).send('OK');
});`,
    php: `<?php
function verifyWebhookSignature($payload, $signature, $secret) {
    $expectedSignature = hash_hmac('sha256', $payload, $secret);
    return hash_equals($signature, $expectedSignature);
}

// Webhook handler
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_FIRSTCHEKOUT_SIGNATURE'] ?? '';

if (!verifyWebhookSignature($payload, $signature, $_ENV['WEBHOOK_SECRET'])) {
    http_response_code(400);
    exit('Invalid signature');
}

$data = json_decode($payload, true);
$eventType = $data['eventType'];
$paymentData = $data['data'];

switch ($eventType) {
    case 'payment.success':
        handleSuccessfulPayment($paymentData);
        break;
    case 'payment.failed':
        handleFailedPayment($paymentData);
        break;
    default:
        error_log('Unknown event type: ' . $eventType);
}

http_response_code(200);
echo 'OK';
?>`,
    python: `import hmac
import hashlib
import json
from flask import Flask, request

app = Flask(__name__)

def verify_webhook_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, expected_signature)

@app.route('/webhook/firstchekout', methods=['POST'])
def handle_webhook():
    payload = request.get_data(as_text=True)
    signature = request.headers.get('X-Firstchekout-Signature', '')
    
    if not verify_webhook_signature(payload, signature, os.getenv('WEBHOOK_SECRET')):
        return 'Invalid signature', 400
    
    data = request.get_json()
    event_type = data.get('eventType')
    payment_data = data.get('data')
    
    if event_type == 'payment.success':
        handle_successful_payment(payment_data)
    elif event_type == 'payment.failed':
        handle_failed_payment(payment_data)
    else:
        print(f'Unknown event type: {event_type}')
    
    return 'OK', 200`
  };

  const webhookPayload = `{
  "eventType": "payment.success",
  "data": {
    "paymentReference": "FjWnMSUZajh1k224lXks39728874560476",
    "amount": 100,
    "currency": "NGN",
    "status": "successful",
    "payerEmail": "thomas.edison@outlook.com",
    "payerName": "Thomas Edison",
    "purpose": "UAT",
    "paymentMethod": "card",
    "transactionDate": "2024-01-15T10:30:00Z",
    "gatewayResponse": "Approved",
    "merchantId": "your_merchant_id",
    "accessCode": "TXN_ACCESS_CODE_123"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`;

  const webhookEvents = [
    {
      event: 'payment.success',
      description: 'Fired when a payment is completed successfully',
      when: 'Customer completes payment via any method'
    },
    {
      event: 'payment.failed',
      description: 'Fired when a payment fails or is declined',
      when: 'Payment is declined by bank or fails validation'
    },
    {
      event: 'payment.pending',
      description: 'Fired when a payment is being processed',
      when: 'Payment is initiated but not yet completed'
    },
    {
      event: 'payment.abandoned',
      description: 'Fired when a customer closes the payment modal',
      when: 'Customer exits without completing payment'
    }
  ];

  return (
    <div className="api-full-width dense-content">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Webhooks</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Webhooks allow FirstChekout to notify your application when events happen in your account.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">On this page</h3>
        <div className="grid md:grid-cols-2 gap-2 text-xs">
          <a href="#events" className="text-blue-600 hover:text-blue-700 block py-1">Webhook Events</a>
          <a href="#verification" className="text-blue-600 hover:text-blue-700 block py-1">Signature Verification</a>
          <a href="#setup" className="text-blue-600 hover:text-blue-700 block py-1">Setup Guide</a>
          <a href="#testing" className="text-blue-600 hover:text-blue-700 block py-1">Testing Webhooks</a>
        </div>
      </div>

      {/* Webhook Events */}
      <section id="events" className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Webhook Events</h2>
        <p className="text-sm text-gray-600 mb-4">
          FirstChekout sends webhooks for various payment events. Here are the events you can listen for:
        </p>

        <div className="api-table-container">
          <table className="api-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Description</th>
                <th>When it's sent</th>
              </tr>
            </thead>
            <tbody>
              {webhookEvents.map((event, index) => (
                <tr key={index}>
                  <td className="param-name">{event.event}</td>
                  <td>{event.description}</td>
                  <td className="text-xs text-gray-600">{event.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Sample Webhook Payload</h4>
          <div className="paystack-code-block">
            <div className="paystack-code-header">
              <span className="text-sm font-medium">Webhook Payload Structure</span>
            </div>
            <div className="paystack-code-content">
              <CodeBlock language="json" code={webhookPayload} />
            </div>
          </div>
        </div>
      </section>

      {/* Signature Verification */}
      <section id="verification" className="endpoint-doc">
        <div className="endpoint-header">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">Signature Verification</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Verify webhook signatures to ensure the request is from FirstChekout and hasn't been tampered with.
          </p>
        </div>

        <div className="endpoint-content">
          <div className="api-two-column">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Verification Process</h4>
              <ol className="text-sm text-gray-600 space-y-2">
                <li className="flex">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2">1</span>
                  <span>Extract the signature from the <code>X-Firstchekout-Signature</code> header</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2">2</span>
                  <span>Compute HMAC-SHA256 of the raw payload using your webhook secret</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2">3</span>
                  <span>Compare the computed signature with the received signature</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2">4</span>
                  <span>Process the webhook only if signatures match</span>
                </li>
              </ol>

              <div className="bg-red-50 border border-red-200 rounded p-3 mt-4">
                <h5 className="text-xs font-semibold text-red-900 mb-2">Security Warning</h5>
                <p className="text-xs text-red-800">
                  Always verify webhook signatures before processing the payload. Unverified webhooks 
                  could be malicious and compromise your application's security.
                </p>
              </div>
            </div>

            <div className="sticky-code">
              <div className="language-tabs">
                {Object.keys(webhookVerificationCode).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLanguage(lang)}
                    className={`language-tab ${activeLanguage === lang ? 'active' : ''}`}
                  >
                    {lang === 'nodejs' ? 'Node.js' : lang.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="paystack-code-block">
                <div className="paystack-code-header">
                  <span className="text-sm font-medium">Verification Implementation</span>
                  <button
                    onClick={() => copyToClipboard(webhookVerificationCode[activeLanguage], 'webhook-verify')}
                    className="copy-button"
                  >
                    {copiedCode === 'webhook-verify' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <pre><code>{webhookVerificationCode[activeLanguage]}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Guide */}
      <section id="setup" className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Webhook Setup Guide</h2>
        
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-emerald-900 mb-4">Configuration Steps</h3>
          <ol className="space-y-3 text-sm text-emerald-800">
            <li className="flex">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center text-xs font-semibold mr-3">1</span>
              <span>Create a webhook endpoint in your application that accepts POST requests</span>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center text-xs font-semibold mr-3">2</span>
              <span>Implement signature verification using your webhook secret</span>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center text-xs font-semibold mr-3">3</span>
              <span>Add your webhook URL to the FirstChekout merchant dashboard</span>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 w-6 h-6 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center text-xs font-semibold mr-3">4</span>
              <span>Test your webhook endpoint using the dashboard testing tools</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Best Practices */}
      <section id="best-practices" className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded p-4">
            <h4 className="text-sm font-semibold text-emerald-900 mb-2">✅ Do</h4>
            <ul className="text-xs text-emerald-800 space-y-1">
              <li>• Always verify webhook signatures</li>
              <li>• Return HTTP 200 status for successful processing</li>
              <li>• Implement idempotency for webhook handling</li>
              <li>• Use HTTPS endpoints for webhook URLs</li>
              <li>• Log webhook events for debugging</li>
              <li>• Handle webhook retries gracefully</li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded p-4">
            <h4 className="text-sm font-semibold text-red-900 mb-2">❌ Don't</h4>
            <ul className="text-xs text-red-800 space-y-1">
              <li>• Process webhooks without signature verification</li>
              <li>• Return non-200 status codes for successful processing</li>
              <li>• Perform long-running operations in webhook handlers</li>
              <li>• Expose webhook endpoints without authentication</li>
              <li>• Ignore duplicate webhook deliveries</li>
              <li>• Use HTTP (non-SSL) webhook URLs</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};