import React from 'react';
import { CreditCard, CheckCircle, List, Copy, Check, ExternalLink } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiTransactionsSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const initializeCode = {
    curl: `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
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
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate', {
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
  CURLOPT_URL => '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate',
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
    url = "${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate"
    
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
    curl: `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/status/{PaymentReference}' \\
--header 'Authorization: Bearer {access_token}'`,
    nodejs: `const axios = require('axios');

async function verifyTransaction(paymentReference, accessToken) {
  const response = await axios.get(
    \`${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/status/\${paymentReference}\`,
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
  CURLOPT_URL => '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/status/' . $paymentReference,
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
    url = f"${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/status/{payment_reference}"
    
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const listCode = {
    curl: `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions?page=1&perPage=50' \\
--header 'Authorization: Bearer {access_token}'`,
    nodejs: `const axios = require('axios');

async function listTransactions(accessToken, page = 1, perPage = 50) {
  const response = await axios.get('${API_CONFIG.gatewayBaseAddress}/api/v1/transactions', {
    params: { page, perPage },
    headers: {
      'Authorization': \`Bearer \${accessToken}\`
    }
  });
  
  return response.data;
}`,
    php: `<?php
function listTransactions($accessToken, $page = 1, $perPage = 50) {
    $url = '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions?' . http_build_query([
        'page' => $page,
        'perPage' => $perPage
    ]);
    
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer ' . $accessToken
        ),
    ));
    
    $response = curl_exec($curl);
    curl_close($curl);
    
    return json_decode($response, true);
}
?>`,
    python: `import requests

def list_transactions(access_token, page=1, per_page=50):
    url = "${API_CONFIG.gatewayBaseAddress}/api/v1/transactions"
    
    params = {
        'page': page,
        'perPage': per_page
    }
    
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    response = requests.get(url, params=params, headers=headers)
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

  const listResponse = `{
  "status": true,
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "id": 123456,
      "paymentReference": "FjWnMSUZajh1k224lXks39728874560476",
      "amount": 100,
      "currency": "NGN",
      "status": "successful",
      "payerEmail": "thomas.edison@outlook.com",
      "payerName": "Thomas Edison",
      "purpose": "UAT",
      "paymentMethod": "card",
      "transactionDate": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 150,
    "perPage": 50,
    "page": 1,
    "pageCount": 3
  }
}`;

  const errorResponse = `{
  "status": false,
  "message": "Invalid payment reference",
  "code": "INVALID_REFERENCE",
  "errors": {
    "PaymentReference": [
      "The payment reference field is required.",
      "The payment reference must be unique."
    ]
  }
}`;

  return (
    <div className="api-full-width dense-content">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Transactions</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          The Transactions API allows you to create and manage payments on your integration.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">On this page</h3>
        <div className="grid md:grid-cols-2 gap-2 text-xs">
          <a href="#initialize" className="text-blue-600 hover:text-blue-700 block py-1">Initialize Transaction</a>
          <a href="#verify" className="text-blue-600 hover:text-blue-700 block py-1">Verify Transaction</a>
          <a href="#list" className="text-blue-600 hover:text-blue-700 block py-1">List Transactions</a>
          <a href="#fetch" className="text-blue-600 hover:text-blue-700 block py-1">Fetch Transaction</a>
        </div>
      </div>

      {/* Initialize Transaction */}
      <section id="initialize" className="endpoint-doc">
        <div className="endpoint-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="api-method post bg-green-100 text-green-800">POST</span>
              <span className="api-url-path">/api/v1/transactions/initiate</span>
            </div>
            <a 
              href="https://documenter.getpostman.com/view/48285548/2sB3HnLLUZ#intro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              View in Postman
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Initialize a transaction from your backend. This endpoint creates a new payment transaction 
            and returns an access code that can be used to complete the payment.
          </p>
        </div>

        <div className="endpoint-content">
          <div className="api-two-column">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Headers</h4>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="param-name">authorization</td>
                    <td className="param-type">string</td>
                    <td>Set value to <code>Bearer ACCESS_TOKEN</code></td>
                  </tr>
                  <tr>
                    <td className="param-name">content-type</td>
                    <td className="param-type">string</td>
                    <td>Set value to <code>application/json</code></td>
                  </tr>
                </tbody>
              </table>

              <h4 className="text-sm font-semibold text-gray-900 mb-3 mt-6">Body Parameters</h4>
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
                    <td className="param-name">Amount</td>
                    <td className="param-type">integer</td>
                    <td className="param-required">required</td>
                    <td>Amount in NGN (minimum: 100)</td>
                  </tr>
                  <tr>
                    <td className="param-name">PayerEmail</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Customer's email address</td>
                  </tr>
                  <tr>
                    <td className="param-name">PayerName</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Customer's full name</td>
                  </tr>
                  <tr>
                    <td className="param-name">Purpose</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Payment description</td>
                  </tr>
                  <tr>
                    <td className="param-name">PublicKey</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Your FirstChekout public key</td>
                  </tr>
                  <tr>
                    <td className="param-name">PaymentReference</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Unique transaction reference</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sticky-code">
              <div className="language-tabs">
                {Object.keys(initializeCode).map((lang) => (
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
                    onClick={() => copyToClipboard(initializeCode[activeLanguage], 'initialize')}
                    className="copy-button"
                  >
                    {copiedCode === 'initialize' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <pre><code>{initializeCode[activeLanguage]}</code></pre>
                </div>
              </div>

              <div className="response-container mt-4">
                <div className="response-header">
                  <span>Sample Response</span>
                  <span className="status-200">200 OK</span>
                </div>
                <div className="response-body">
                  <CodeBlock language="json" code={initializeResponse} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verify Transaction */}
      <section id="verify" className="endpoint-doc">
        <div className="endpoint-header">
          <div className="flex items-center space-x-3">
            <span className="api-method get bg-blue-100 text-blue-800">GET</span>
            <span className="api-url-path">/api/v1/transactions/status/:reference</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Confirm the status of a transaction using the payment reference.
          </p>
        </div>

        <div className="endpoint-content">
          <div className="api-two-column">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Path Parameters</h4>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="param-name">reference</td>
                    <td className="param-type">string</td>
                    <td>The payment reference to verify</td>
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
                    <td>Transaction status: successful, pending, failed, abandoned</td>
                  </tr>
                  <tr>
                    <td className="param-name">amount</td>
                    <td className="param-type">integer</td>
                    <td>Transaction amount in NGN</td>
                  </tr>
                  <tr>
                    <td className="param-name">paymentMethod</td>
                    <td className="param-type">string</td>
                    <td>Payment method used: card, ussd, transfer, qr</td>
                  </tr>
                  <tr>
                    <td className="param-name">transactionDate</td>
                    <td className="param-type">string</td>
                    <td>ISO 8601 formatted transaction timestamp</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sticky-code">
              <div className="language-tabs">
                {Object.keys(verifyCode).map((lang) => (
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
                    onClick={() => copyToClipboard(verifyCode[activeLanguage], 'verify')}
                    className="copy-button"
                  >
                    {copiedCode === 'verify' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <pre><code>{verifyCode[activeLanguage]}</code></pre>
                </div>
              </div>

              <div className="response-container mt-4">
                <div className="response-header">
                  <span>Sample Response</span>
                  <span className="status-200">200 OK</span>
                </div>
                <div className="response-body">
                  <CodeBlock language="json" code={verifyResponse} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* List Transactions */}
      <section id="list" className="endpoint-doc">
        <div className="endpoint-header">
          <div className="flex items-center space-x-3">
            <span className="api-method get bg-blue-100 text-blue-800">GET</span>
            <span className="api-url-path">/api/v1/transactions</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            List transactions carried out on your integration with pagination support.
          </p>
        </div>

        <div className="endpoint-content">
          <div className="api-two-column">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Query Parameters</h4>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="param-name">page</td>
                    <td className="param-type">integer</td>
                    <td>1</td>
                    <td>Page number for pagination</td>
                  </tr>
                  <tr>
                    <td className="param-name">perPage</td>
                    <td className="param-type">integer</td>
                    <td>10</td>
                    <td>Number of items per page (max: 100)</td>
                  </tr>
                  <tr>
                    <td className="param-name">status</td>
                    <td className="param-type">string</td>
                    <td>all</td>
                    <td>Filter by status: successful, pending, failed</td>
                  </tr>
                  <tr>
                    <td className="param-name">from</td>
                    <td className="param-type">string</td>
                    <td>-</td>
                    <td>Start date (YYYY-MM-DD)</td>
                  </tr>
                  <tr>
                    <td className="param-name">to</td>
                    <td className="param-type">string</td>
                    <td>-</td>
                    <td>End date (YYYY-MM-DD)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sticky-code">
              <div className="language-tabs">
                {Object.keys(listCode).map((lang) => (
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
                    onClick={() => copyToClipboard(listCode[activeLanguage], 'list')}
                    className="copy-button"
                  >
                    {copiedCode === 'list' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <pre><code>{listCode[activeLanguage]}</code></pre>
                </div>
              </div>

              <div className="response-container mt-4">
                <div className="response-header">
                  <span>Sample Response</span>
                  <span className="status-200">200 OK</span>
                </div>
                <div className="response-body">
                  <CodeBlock language="json" code={listResponse} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fetch Transaction */}
      <section id="fetch" className="endpoint-doc">
        <div className="endpoint-header">
          <div className="flex items-center space-x-3">
            <span className="api-method get bg-blue-100 text-blue-800">GET</span>
            <span className="api-url-path">/api/v1/transactions/:id</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Fetch details of a specific transaction using its ID.
          </p>
        </div>

        <div className="endpoint-content">
          <div className="api-two-column">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Path Parameters</h4>
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="param-name">id</td>
                    <td className="param-type">integer</td>
                    <td>The transaction ID to fetch</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-amber-50 border border-amber-200 rounded p-3 mt-4">
                <h5 className="text-xs font-semibold text-amber-900 mb-2">Note</h5>
                <p className="text-xs text-amber-800">
                  This endpoint returns the same data structure as the verify endpoint but uses 
                  the internal transaction ID instead of the payment reference.
                </p>
              </div>
            </div>

            <div className="sticky-code">
              <div className="paystack-code-block">
                <div className="paystack-code-header">
                  <span className="text-sm font-medium">Example Request</span>
                </div>
                <div className="paystack-code-content">
                  <pre><code>{`curl --location '{{GatewayBaseAddress}}/api/v1/transactions/123456' \\
--header 'Authorization: Bearer {{access_token}}'`}</code></pre>
                </div>
              </div>

              <div className="response-container mt-4">
                <div className="response-header">
                  <span>Sample Response</span>
                  <span className="status-200">200 OK</span>
                </div>
                <div className="response-body">
                  <CodeBlock language="json" code={verifyResponse} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Error Responses */}
      <section id="errors" className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Error Responses</h2>
        <p className="text-sm text-gray-600 mb-4">
          When an error occurs, the API returns a structured error response with details about what went wrong.
        </p>

        <div className="response-container">
          <div className="response-header">
            <span>Error Response Structure</span>
            <span className="status-400">400 Bad Request</span>
          </div>
          <div className="response-body">
            <CodeBlock language="json" code={errorResponse} />
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded p-4 mt-4">
          <h4 className="text-sm font-semibold text-red-900 mb-2">Common Error Codes</h4>
          <ul className="text-xs text-red-800 space-y-1">
            <li>• <code>INVALID_REFERENCE</code> - Payment reference is invalid or already exists</li>
            <li>• <code>INVALID_AMOUNT</code> - Amount is below minimum or invalid format</li>
            <li>• <code>INVALID_EMAIL</code> - Email address format is invalid</li>
            <li>• <code>UNAUTHORIZED</code> - Invalid or missing access token</li>
            <li>• <code>INSUFFICIENT_FUNDS</code> - Customer account has insufficient funds</li>
          </ul>
        </div>
      </section>

      {/* Integration Workflow */}
      <section id="workflow" className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Integration Workflow</h2>
        <p className="text-sm text-gray-600 mb-4">
          Follow this step-by-step workflow to implement transaction processing in your application.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">1</div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Initialize</h4>
              <p className="text-xs text-blue-700">Create transaction with customer details</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">2</div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Redirect</h4>
              <p className="text-xs text-blue-700">Send customer to checkout URL</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">3</div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Verify</h4>
              <p className="text-xs text-blue-700">Confirm payment status via webhook or API</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};