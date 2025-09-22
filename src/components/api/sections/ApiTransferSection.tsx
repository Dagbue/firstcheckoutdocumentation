import React from 'react';
import { Building, Copy, Check, ExternalLink, Clock } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';

export const ApiTransferSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const initiateTransferCode = {
    curl: `curl --location '{{GatewayBaseAddress}}/api/v1/paywithtransfer/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {{access_token}}' \\
--data-raw '{
  "TypeId": 2,
  "AccessCode": "TXN_ACCESS_CODE_123",
  "PaymentReference": "FjWnMSUZajh1k224lXks39728874560476"
}'`,
    nodejs: `const axios = require('axios');

async function initiateTransfer(accessToken, accessCode, paymentReference) {
  const response = await axios.post('{{GatewayBaseAddress}}/api/v1/paywithtransfer/initiate', {
    TypeId: 2,
    AccessCode: accessCode,
    PaymentReference: paymentReference
  }, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function initiateTransfer($accessToken, $accessCode, $paymentReference) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => '{{GatewayBaseAddress}}/api/v1/paywithtransfer/initiate',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'TypeId' => 2,
        'AccessCode' => $accessCode,
        'PaymentReference' => $paymentReference
      ]),
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json'
      ),
    ));
    
    $response = curl_exec($curl);
    curl_close($curl);
    
    return json_decode($response, true);
}
?>`
  };

  const queryTransferCode = {
    curl: `curl --location '{{GatewayBaseAddress}}/api/v1/paywithtransfer/query' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {{access_token}}' \\
--data-raw '{
  "AccessCode": "TXN_ACCESS_CODE_123",
  "PaymentReference": "FjWnMSUZajh1k224lXks39728874560476"
}'`,
    nodejs: `const axios = require('axios');

async function queryTransferStatus(accessToken, accessCode, paymentReference) {
  const response = await axios.post('{{GatewayBaseAddress}}/api/v1/paywithtransfer/query', {
    AccessCode: accessCode,
    PaymentReference: paymentReference
  }, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`
  };

  const transferResponse = `{
  "status": true,
  "message": "Virtual account generated successfully",
  "data": {
    "virtualAccountNumber": "9876543210",
    "bankName": "First Bank of Nigeria",
    "bankCode": "011",
    "accountName": "FIRSTCHEKOUT/THOMAS EDISON",
    "amount": 100,
    "paymentReference": "FjWnMSUZajh1k224lXks39728874560476",
    "expiryTime": "2024-01-15T11:00:00Z",
    "instructions": "Transfer exactly NGN 100.00 to the account number above"
  }
}`;

  const queryResponse = `{
  "status": true,
  "message": "Transfer status retrieved",
  "data": {
    "paymentReference": "FjWnMSUZajh1k224lXks39728874560476",
    "status": "successful",
    "amount": 100,
    "currency": "NGN",
    "virtualAccountNumber": "9876543210",
    "bankName": "First Bank of Nigeria",
    "paymentDate": "2024-01-15T10:45:00Z",
    "senderAccountNumber": "0123456789",
    "senderAccountName": "JOHN DOE",
    "senderBankName": "Access Bank"
  }
}`;

  return (
    <div className="api-full-width dense-content">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Bank Transfer (PayWithTransfer)</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Enable customers to pay via direct bank transfer using dynamically generated virtual account numbers.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">On this page</h3>
        <div className="grid md:grid-cols-2 gap-2 text-xs">
          <a href="#initiate" className="text-blue-600 hover:text-blue-700 block py-1">Initiate Transfer</a>
          <a href="#query" className="text-blue-600 hover:text-blue-700 block py-1">Query Transfer Status</a>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-4">How Bank Transfer Works</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">1</div>
            <h4 className="text-xs font-semibold text-blue-900 mb-1">Generate</h4>
            <p className="text-xs text-blue-700">Create virtual account number</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">2</div>
            <h4 className="text-xs font-semibold text-blue-900 mb-1">Transfer</h4>
            <p className="text-xs text-blue-700">Customer transfers exact amount</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">3</div>
            <h4 className="text-xs font-semibold text-blue-900 mb-1">Confirm</h4>
            <p className="text-xs text-blue-700">Automatic payment confirmation</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-blue-900 mb-1">Expires</h4>
            <p className="text-xs text-blue-700">30 minutes expiry time</p>
          </div>
        </div>
      </div>

      {/* Initiate Transfer */}
      <section id="initiate" className="endpoint-doc">
        <div className="endpoint-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="api-method post bg-green-100 text-green-800">POST</span>
              <span className="api-url-path">/api/v1/paywithtransfer/initiate</span>
            </div>
            <a 
              href="https://documenter.getpostman.com/view/48285548/2sB3HnLLUZ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              View in Postman
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Generate a virtual account number for the customer to transfer the exact payment amount.
          </p>
        </div>

        <div className="endpoint-content">
          <div className="api-two-column">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Body Parameters</h4>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="param-name">TypeId</td>
                    <td className="param-type">integer</td>
                    <td className="param-required">required</td>
                    <td>Transfer type (2 = virtual account)</td>
                  </tr>
                  <tr>
                    <td className="param-name">AccessCode</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Access code from transaction initiation</td>
                  </tr>
                  <tr>
                    <td className="param-name">PaymentReference</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Unique payment reference</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-amber-50 border border-amber-200 rounded p-3 mt-4">
                <h5 className="text-xs font-semibold text-amber-900 mb-2">Important Notes</h5>
                <ul className="text-xs text-amber-800 space-y-1">
                  <li>• Virtual accounts expire in 30 minutes (1800 seconds)</li>
                  <li>• Customer must transfer the exact amount specified</li>
                  <li>• Account number is unique per transaction</li>
                  <li>• Payment is automatically confirmed upon transfer</li>
                </ul>
              </div>
            </div>

            <div className="sticky-code">
              <div className="language-tabs">
                {Object.keys(initiateTransferCode).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLanguage(lang)}
                    className={`language-tab ${activeLanguage === lang ? 'active' : ''}`}
                  >
                    {lang === 'curl' ? 'cURL' : lang === 'nodejs' ? 'Node.js' : lang.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="paystack-code-block">
                <div className="paystack-code-header">
                  <span className="text-sm font-medium">Example Request</span>
                  <button
                    onClick={() => copyToClipboard(initiateTransferCode[activeLanguage], 'initiate-transfer')}
                    className="copy-button"
                  >
                    {copiedCode === 'initiate-transfer' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <pre><code>{initiateTransferCode[activeLanguage]}</code></pre>
                </div>
              </div>

              <div className="response-container mt-4">
                <div className="response-header">
                  <span>Sample Response</span>
                  <span className="status-200">200 OK</span>
                </div>
                <div className="response-body">
                  <CodeBlock language="json" code={transferResponse} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Query Transfer Status */}
      <section id="query" className="endpoint-doc">
        <div className="endpoint-header">
          <div className="flex items-center space-x-3">
            <span className="api-method post bg-green-100 text-green-800">POST</span>
            <span className="api-url-path">/api/v1/paywithtransfer/query</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Check the status of a bank transfer payment to see if the customer has completed the transfer.
          </p>
        </div>

        <div className="endpoint-content">
          <div className="api-two-column">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Body Parameters</h4>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="param-name">AccessCode</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Access code from transaction initiation</td>
                  </tr>
                  <tr>
                    <td className="param-name">PaymentReference</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Unique payment reference</td>
                  </tr>
                </tbody>
              </table>

              <h4 className="text-sm font-semibold text-gray-900 mb-3 mt-6">Response Fields</h4>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="param-name">status</td>
                    <td className="param-type">string</td>
                    <td>Transfer status: successful, pending, failed</td>
                  </tr>
                  <tr>
                    <td className="param-name">senderAccountNumber</td>
                    <td className="param-type">string</td>
                    <td>Customer's account number that sent the transfer</td>
                  </tr>
                  <tr>
                    <td className="param-name">senderAccountName</td>
                    <td className="param-type">string</td>
                    <td>Name on the sender's account</td>
                  </tr>
                  <tr>
                    <td className="param-name">paymentDate</td>
                    <td className="param-type">string</td>
                    <td>When the transfer was completed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sticky-code">
              <div className="language-tabs">
                {Object.keys(queryTransferCode).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLanguage(lang)}
                    className={`language-tab ${activeLanguage === lang ? 'active' : ''}`}
                  >
                    {lang === 'curl' ? 'cURL' : lang === 'nodejs' ? 'Node.js' : lang.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="paystack-code-block">
                <div className="paystack-code-header">
                  <span className="text-sm font-medium">Example Request</span>
                  <button
                    onClick={() => copyToClipboard(queryTransferCode[activeLanguage], 'query-transfer')}
                    className="copy-button"
                  >
                    {copiedCode === 'query-transfer' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <pre><code>{queryTransferCode[activeLanguage]}</code></pre>
                </div>
              </div>

              <div className="response-container mt-4">
                <div className="response-header">
                  <span>Sample Response</span>
                  <span className="status-200">200 OK</span>
                </div>
                <div className="response-body">
                  <CodeBlock language="json" code={queryResponse} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Tips */}
      <section id="tips" className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Integration Tips</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded p-4">
            <h4 className="text-sm font-semibold text-emerald-900 mb-2">✅ Best Practices</h4>
            <ul className="text-xs text-emerald-800 space-y-1">
              <li>• Display clear transfer instructions to customers</li>
              <li>• Show the exact amount and account details prominently</li>
              <li>• Implement polling to check transfer status</li>
              <li>• Set up webhooks for real-time notifications</li>
              <li>• Handle account expiry gracefully</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded p-4">
            <h4 className="text-sm font-semibold text-amber-900 mb-2">⚠️ Important Notes</h4>
            <ul className="text-xs text-amber-800 space-y-1">
              <li>• Virtual accounts expire in exactly 30 minutes</li>
              <li>• Customer must transfer the exact amount specified</li>
              <li>• Partial payments are not supported</li>
              <li>• Account numbers are single-use only</li>
              <li>• Transfers from any Nigerian bank are accepted</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};