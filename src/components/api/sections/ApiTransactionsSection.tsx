import React from 'react';
import { CreditCard, CheckCircle, List, Copy, Check } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';

export const ApiTransactionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('initialize');
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const initializeCode = {
    curl: `curl --location '{{GatewayBaseAddress}}/api/v1/transactions/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {{access_token}}' \\
--data-raw '{
  "Amount": 100,
  "PayerEmail": "thomas.edison@outlook.com",
  "PayerName": "Thomas Edison",
  "Purpose": "UAT",
  "PublicKey": "sb-pk-mVa4TcjuSqTSiyyxjEF1Bc1EbZ29yE45Y3K",
  "PaymentReference": "FjWnMSUZajh1k224lXks39728874560476"
}'`,
    nodejs: `const axios = require('axios');

async function initializeTransaction() {
  const response = await axios.post('{{GatewayBaseAddress}}/api/v1/transactions/initiate', {
    Amount: 100,
    PayerEmail: "thomas.edison@outlook.com",
    PayerName: "Thomas Edison",
    Purpose: "UAT",
    PublicKey: process.env.FIRSTCHEKOUT_PUBLIC_KEY,
    PaymentReference: "unique-ref-" + Date.now()
  }, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '{{GatewayBaseAddress}}/api/v1/transactions/initiate',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => json_encode([
    'Amount' => 100,
    'PayerEmail' => 'thomas.edison@outlook.com',
    'PayerName' => 'Thomas Edison',
    'Purpose' => 'UAT',
    'PublicKey' => $_ENV['FIRSTCHEKOUT_PUBLIC_KEY'],
    'PaymentReference' => 'unique-ref-' . time()
  ]),
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ' . $accessToken,
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);
curl_close($curl);

$data = json_decode($response, true);
?>`,
    python: `import requests
import os
import time

def initialize_transaction(access_token):
    url = "{{GatewayBaseAddress}}/api/v1/transactions/initiate"
    
    payload = {
        "Amount": 100,
        "PayerEmail": "thomas.edison@outlook.com",
        "PayerName": "Thomas Edison",
        "Purpose": "UAT",
        "PublicKey": os.getenv('FIRSTCHEKOUT_PUBLIC_KEY'),
        "PaymentReference": f"unique-ref-{int(time.time())}"
    }
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const verifyCode = {
    curl: `curl --location '{{GatewayBaseAddress}}/api/v1/transactions/status/{{PaymentReference}}' \\
--header 'Authorization: Bearer {{access_token}}'`,
    nodejs: `const axios = require('axios');

async function verifyTransaction(paymentReference, accessToken) {
  const response = await axios.get(
    \`{{GatewayBaseAddress}}/api/v1/transactions/status/\${paymentReference}\`,
    {
      headers: {
        'Authorization': \`Bearer \${accessToken}\`
      }
    }
  );
  
  return response.data;
}`,
    php: `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '{{GatewayBaseAddress}}/api/v1/transactions/status/' . $paymentReference,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ' . $accessToken
  ),
));

$response = curl_exec($curl);
curl_close($curl);

$data = json_decode($response, true);
?>`,
    python: `import requests

def verify_transaction(payment_reference, access_token):
    url = f"{{GatewayBaseAddress}}/api/v1/transactions/status/{payment_reference}"
    
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const initializeResponse = `{
  "status": true,
  "message": "Transaction initiated successfully",
  "data": {
    "accessCode": "TXN_ACCESS_CODE_123",
    "paymentReference": "FjWnMSUZajh1k224lXks39728874560476",
    "checkoutUrl": "https://checkout.firstchekout.com/pay/TXN_ACCESS_CODE_123"
  }
}`;

  const verifyResponse = `{
  "status": true,
  "message": "Transaction status retrieved",
  "data": {
    "paymentReference": "FjWnMSUZajh1k224lXks39728874560476",
    "status": "successful",
    "amount": 100,
    "currency": "NGN",
    "payerEmail": "thomas.edison@outlook.com",
    "payerName": "Thomas Edison",
    "purpose": "UAT",
    "paymentMethod": "card",
    "transactionDate": "2024-01-15T10:30:00Z",
    "gatewayResponse": "Approved"
  }
}`;

  const tabs = [
    { id: 'initialize', label: 'Initialize Transaction', icon: CreditCard },
    { id: 'verify', label: 'Verify Transaction', icon: CheckCircle },
    { id: 'list', label: 'List Transactions', icon: List }
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Transactions</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          The Transactions API allows you create and manage payments on your integration.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-xs ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="mr-1 h-3 w-3" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Initialize Transaction Tab */}
      {activeTab === 'initialize' && (
        <div className="api-section">
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded font-medium api-method-badge">POST</span>
              <span className="text-gray-600 font-mono text-xs api-url-path">/api/v1/transactions/initiate</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-700 mb-4 leading-relaxed">
            Initialize a transaction from your backend. This endpoint creates a new payment transaction 
            and returns an access code that can be used to complete the payment.
          </p>

          {/* Language Tabs for Code Examples */}
          <div className="mb-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-4">
                {Object.keys(initializeCode).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLanguage(lang)}
                    className={`py-1.5 px-1 border-b-2 font-medium text-xs ${
                      activeLanguage === lang
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {lang === 'curl' ? 'cURL' : lang === 'nodejs' ? 'Node.js' : lang.toUpperCase()}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Request</h4>
              <CodeBlock language={activeLanguage} code={initializeCode[activeLanguage]} />
              
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Headers</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-gray-700">authorization</span>
                    <span className="text-gray-500">string</span>
                  </div>
                  <p className="text-xs text-gray-600">Set value to <code>Bearer ACCESS_TOKEN</code></p>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-gray-700">content-type</span>
                    <span className="text-gray-500">string</span>
                  </div>
                  <p className="text-xs text-gray-600">Set value to <code>application/json</code></p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Body Parameters</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg api-parameter-table">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-3 py-2 text-xs font-medium text-gray-900">Amount</td>
                        <td className="px-3 py-2 text-xs text-gray-500">integer</td>
                        <td className="px-3 py-2 text-xs text-green-600">Yes</td>
                        <td className="px-3 py-2 text-xs text-gray-500">Amount in NGN (minimum: 100)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-xs font-medium text-gray-900">PayerEmail</td>
                        <td className="px-3 py-2 text-xs text-gray-500">string</td>
                        <td className="px-3 py-2 text-xs text-green-600">Yes</td>
                        <td className="px-3 py-2 text-xs text-gray-500">Customer's email address</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-xs font-medium text-gray-900">PayerName</td>
                        <td className="px-3 py-2 text-xs text-gray-500">string</td>
                        <td className="px-3 py-2 text-xs text-green-600">Yes</td>
                        <td className="px-3 py-2 text-xs text-gray-500">Customer's full name</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-xs font-medium text-gray-900">Purpose</td>
                        <td className="px-3 py-2 text-xs text-gray-500">string</td>
                        <td className="px-3 py-2 text-xs text-green-600">Yes</td>
                        <td className="px-3 py-2 text-xs text-gray-500">Payment description</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-xs font-medium text-gray-900">PublicKey</td>
                        <td className="px-3 py-2 text-xs text-gray-500">string</td>
                        <td className="px-3 py-2 text-xs text-green-600">Yes</td>
                        <td className="px-3 py-2 text-xs text-gray-500">Your FirstChekout public key</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-xs font-medium text-gray-900">PaymentReference</td>
                        <td className="px-3 py-2 text-xs text-gray-500">string</td>
                        <td className="px-3 py-2 text-xs text-green-600">Yes</td>
                        <td className="px-3 py-2 text-xs text-gray-500">Unique transaction reference</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Sample Response</h4>
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700">200 OK</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded status-badge">Success</span>
                </div>
                <CodeBlock language="json" code={initializeResponse} />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h5 className="text-xs font-semibold text-blue-900 mb-2">Response Fields</h5>
                <ul className="text-xs text-blue-800 space-y-1 leading-relaxed">
                  <li>• <code>accessCode</code> - Use this to complete payment</li>
                  <li>• <code>paymentReference</code> - Your unique transaction ID</li>
                  <li>• <code>checkoutUrl</code> - Direct payment URL for customers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verify Transaction Tab */}
      {activeTab === 'verify' && (
        <div className="api-section">
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded font-medium api-method-badge">GET</span>
              <span className="text-gray-600 font-mono text-xs api-url-path">/api/v1/transactions/status/:reference</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-700 mb-4 leading-relaxed">
            Confirm the status of a transaction using the payment reference.
          </p>

          {/* Language Tabs */}
          <div className="mb-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-4">
                {Object.keys(verifyCode).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLanguage(lang)}
                    className={`py-1.5 px-1 border-b-2 font-medium text-xs ${
                      activeLanguage === lang
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {lang === 'curl' ? 'cURL' : lang === 'nodejs' ? 'Node.js' : lang.toUpperCase()}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Request</h4>
              <CodeBlock language={activeLanguage} code={verifyCode[activeLanguage]} />
              
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Path Parameters</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg api-parameter-table">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-3 py-2 text-xs font-medium text-gray-900">reference</td>
                        <td className="px-3 py-2 text-xs text-gray-500">string</td>
                        <td className="px-3 py-2 text-xs text-gray-500">The payment reference to verify</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Sample Response</h4>
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700">200 OK</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded status-badge">Success</span>
                </div>
                <CodeBlock language="json" code={verifyResponse} />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <h5 className="text-xs font-semibold text-emerald-900 mb-2">Status Values</h5>
                <ul className="text-xs text-emerald-800 space-y-1 leading-relaxed">
                  <li>• <code>successful</code> - Payment completed successfully</li>
                  <li>• <code>pending</code> - Payment is being processed</li>
                  <li>• <code>failed</code> - Payment failed or was declined</li>
                  <li>• <code>abandoned</code> - Customer closed payment modal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List Transactions Tab */}
      {activeTab === 'list' && (
        <div className="api-section">
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded font-medium api-method-badge">GET</span>
              <span className="text-gray-600 font-mono text-xs api-url-path">/api/v1/transactions</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-700 mb-4 leading-relaxed">
            List transactions carried out on your integration with pagination support.
          </p>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Query Parameters</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg api-parameter-table">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Default</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2 text-xs font-medium text-gray-900">page</td>
                    <td className="px-3 py-2 text-xs text-gray-500">integer</td>
                    <td className="px-3 py-2 text-xs text-gray-500">1</td>
                    <td className="px-3 py-2 text-xs text-gray-500">Page number for pagination</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-xs font-medium text-gray-900">perPage</td>
                    <td className="px-3 py-2 text-xs text-gray-500">integer</td>
                    <td className="px-3 py-2 text-xs text-gray-500">10</td>
                    <td className="px-3 py-2 text-xs text-gray-500">Number of items per page (max: 100)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-xs font-medium text-gray-900">status</td>
                    <td className="px-3 py-2 text-xs text-gray-500">string</td>
                    <td className="px-3 py-2 text-xs text-gray-500">all</td>
                    <td className="px-3 py-2 text-xs text-gray-500">Filter by status (successful, pending, failed)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};