import React from 'react';
import { Copy, Check, ExternalLink, CreditCard, Search, List, FileText } from 'lucide-react';
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
    curl: `curl --location -g '{{GatewayBaseAddress}}/api/v1/transactions/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {{Access-Token}}' \\
--data-raw '{
  "Amount": 100,
  "PayerEmail": "thomas.edison@outlook.com",
  "PayerName": "Thomas Edison",
  "Purpose": "UAT",
  "PublicKey": "sb-pk-mVa4TcjuSqTSiyyxjEF1Bc1EbZ29yE45Y3K",
  "paymentReference": "FjWnMSUZajh1k224lXks39728874560476"
}'`,
    nodejs: `const axios = require('axios');

async function initializeTransaction(accessToken) {
  const response = await axios.post(process.env.GATEWAY_BASE_ADDRESS + '/api/v1/transactions/initiate', {
    Amount: 100,
    PayerEmail: "thomas.edison@outlook.com",
    PayerName: "Thomas Edison",
    Purpose: "UAT",
    PublicKey: "{{merchantPublicKey}}",
    paymentReference: "c34a107b-cb01-4fc6-ab33-3683e902891e"
  }, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function initializeTransaction($accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/transactions/initiate',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'Amount' => 100,
        'PayerEmail' => 'thomas.edison@outlook.com',
        'PayerName' => 'Thomas Edison',
        'Purpose' => 'UAT',
        'PublicKey' => $_ENV['MERCHANT_PUBLIC_KEY'],
        'paymentReference' => 'c34a107b-cb01-4fc6-ab33-3683e902891e'
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
?>`,
    python: `import requests
import os

def initialize_transaction(access_token):
    url = os.getenv('GATEWAY_BASE_ADDRESS') + "/api/v1/transactions/initiate"
    
    payload = {
        "Amount": 100,
        "PayerEmail": "thomas.edison@outlook.com",
        "PayerName": "Thomas Edison",
        "Purpose": "UAT",
        "PublicKey": os.getenv('MERCHANT_PUBLIC_KEY'),
        "paymentReference": "c34a107b-cb01-4fc6-ab33-3683e902891e"
    }
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const queryCode = {
    curl: `curl --location -g '{{GatewayBaseAddress}}/api/v1/transactions/referenceId/{{transactionRef}}' \\
--header 'Merchant-Id: {{merchantId}}' \\
--header 'Secret-Key: {{secret-key}}'`,
    nodejs: `const axios = require('axios');

async function queryTransaction(transactionRef, merchantId, secretKey) {
  const response = await axios.get(
    \`\${process.env.GATEWAY_BASE_ADDRESS}/api/v1/transactions/referenceId/\${transactionRef}\`,
    {
      headers: {
        'Merchant-Id': merchantId,
        'Secret-Key': secretKey
      }
    }
  );
  
  return response.data;
}`,
    php: `<?php
function queryTransaction($transactionRef, $merchantId, $secretKey) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/transactions/referenceId/' . $transactionRef,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_HTTPHEADER => array(
        'Merchant-Id: ' . $merchantId,
        'Secret-Key: ' . $secretKey
      ),
    ));
    
    $response = curl_exec($curl);
    curl_close($curl);
    
    return json_decode($response, true);
}
?>`,
    python: `import requests

def query_transaction(transaction_ref, merchant_id, secret_key):
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/transactions/referenceId/{transaction_ref}"
    
    headers = {
        'Merchant-Id': merchant_id,
        'Secret-Key': secret_key
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const verifyCode = {
    curl: `curl --location -g '{{GatewayBaseAddress}}/api/v1/transactions/status/{{PaymentReference}}' \\
--header 'Authorization: Bearer {{Access-Token}}'`,
    nodejs: `const axios = require('axios');

async function verifyTransaction(paymentReference, accessToken) {
  const response = await axios.get(
    \`\${process.env.GATEWAY_BASE_ADDRESS}/api/v1/transactions/status/\${paymentReference}\`,
    {
      headers: {
        'Authorization': \`Bearer \${accessToken}\`
      }
    }
  );
  
  return response.data;
}`,
    php: `<?php
function verifyTransaction($paymentReference, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/transactions/status/' . $paymentReference,
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

def verify_transaction(payment_reference, access_token):
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/transactions/status/{payment_reference}"
    
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const listCode = {
    curl: `curl --location -g '{{GatewayBaseAddress}}/api/v1/transactions?page=1&perPage=50' \\
--header 'Authorization: Bearer {{Access-Token}}'`,
    nodejs: `const axios = require('axios');

async function listTransactions(accessToken, page = 1, perPage = 50) {
  const response = await axios.get(process.env.GATEWAY_BASE_ADDRESS + '/api/v1/transactions', {
    params: { page, perPage },
    headers: {
      'Authorization': \`Bearer \${accessToken}\`
    }
  });
  
  return response.data;
}`,
    php: `<?php
function listTransactions($accessToken, $page = 1, $perPage = 50) {
    $url = $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/transactions?' . http_build_query([
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
    url = os.getenv('GATEWAY_BASE_ADDRESS') + "/api/v1/transactions"
    
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
  "data": {
    "accessCode": "TX-AF06969F49E7D44F89F17E92C28E214BF"
  },
  "status": "OK"
}`;

  const queryResponse = `{
  "status": "success",
  "data": {
    "transactionRef": "1234567890",
    "amount": 10000,
    "currency": "NGN",
    "status": "completed",
    "createdAt": "2024-06-01T12:34:56Z",
    "updatedAt": "2024-06-01T12:35:56Z",
    "customer": {
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "metadata": {
      "orderId": "ORD-001"
    }
  }
}`;

  const queryErrorResponse = `{
  "status": "error",
  "message": "Transaction not found"
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
  "status": "error",
  "message": "Transaction not found"
}`;

  const quickStartItems = [
    {
      title: 'Initialize Transaction',
      description: 'Create a new payment transaction and get access code',
      icon: CreditCard,
      color: 'blue',
      link: '#initialize',
      time: '2 minutes'
    },
    {
      title: 'Query Transaction',
      description: 'Retrieve transaction details using reference ID',
      icon: Search,
      color: 'emerald',
      link: '#query',
      time: '1 minute'
    },
    {
      title: 'Verify Transaction',
      description: 'Confirm payment status using payment reference',
      icon: FileText,
      color: 'purple',
      link: '#verify',
      time: '1 minute'
    },
    {
      title: 'List Transactions',
      description: 'Retrieve paginated list of all transactions',
      icon: List,
      color: 'amber',
      link: '#list',
      time: '2 minutes'
    }
  ];

  return (
    <div className="max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Transactions</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          The Transactions API allows you to create and manage payments on your integration. 
          Initialize transactions, query their status, and retrieve transaction history with comprehensive details.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">On this page</h3>
        <div className="grid md:grid-cols-2 gap-2 text-xs">
          <a href="#initialize" className="text-blue-600 hover:text-blue-700 block py-1">Initialize Transaction</a>
          <a href="#query" className="text-blue-600 hover:text-blue-700 block py-1">Query Transaction</a>
          <a href="#verify" className="text-blue-600 hover:text-blue-700 block py-1">Verify Transaction</a>
          <a href="#list" className="text-blue-600 hover:text-blue-700 block py-1">List Transactions</a>
        </div>
      </div>

      {/* Quick Start Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick start</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {quickStartItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="group relative bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                  <item.icon className={`h-5 w-5 text-${item.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-bank-blue transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Initialize Transaction */}
      <section id="initialize" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Initialize Transaction</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium">POST</span>
              <span className="text-gray-600 font-mono text-sm ml-3">/api/v1/transactions/initiate</span>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Initialize a transaction from your backend. This endpoint creates a new payment transaction 
              and returns an access code that can be used to complete the payment. It is essential for 
              enabling secure and efficient payment processing.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Headers</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">authorization</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Set value to <code className="bg-gray-100 px-2 py-1 rounded text-sm">Bearer ACCESS_TOKEN</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">content-type</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Set value to <code className="bg-gray-100 px-2 py-1 rounded text-sm">application/json</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Body Parameters</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">Amount</span>
                    <div className="text-xs text-gray-500 mt-1">integer</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The amount of money to be transacted.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Example: 100 //in naira Hundred Naira</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">PayerEmail</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The email address of the payer.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Example: example@example.com</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">PayerName</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The name of the payer.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Example: John Doe</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">Purpose</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The purpose of the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Example: UAT</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">PublicKey</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The public key associated with the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Example: your-public-key</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">paymentReference</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      A unique reference for the payment.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Example: your-payment-reference</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
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

            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <span className="text-gray-300 text-sm font-medium">Initialize Transaction</span>
                <button
                  onClick={() => copyToClipboard(initializeCode[activeLanguage], 'initialize')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'initialize' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4">
                <pre className="text-sm text-gray-100 overflow-x-auto">
                  <code>{initializeCode[activeLanguage]}</code>
                </pre>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Sample Response</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">200 OK</span>
              </div>
              <CodeBlock language="json" code={initializeResponse} />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Important Notes</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Ensure that all required fields are included in the request body for successful transaction initiation.</li>
            <li>• The <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">accessCode</code> in the response can be used for subsequent steps in the payment process, such as confirming the transaction or redirecting the user to a payment gateway.</li>
            <li>• Review the <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">status</code> field to determine the outcome of the transaction initiation, and handle errors appropriately based on the status returned.</li>
          </ul>
        </div>
      </section>

      {/* Query Transaction */}
      <section id="query" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Query Transaction</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded font-medium">GET</span>
              <span className="text-gray-600 font-mono text-sm ml-3">/api/v1/transactions/referenceId/{{transactionRef}}</span>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Retrieves the details of a specific transaction using its unique reference ID. This endpoint is 
              typically used to check the status, metadata, and result of a payment or transaction processed 
              through the FirstChekout Payment Gateway.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Path Variables</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">{'{{GatewayBaseAddress}}'}</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The base URL for the payment gateway API, set in your environment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">{'{{transactionRef}}'}</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The unique reference ID of the transaction you want to query. This should be set as an 
                      environment or collection variable before sending the request.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Required Headers</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-28">
                    <span className="text-sm font-semibold text-gray-900">Merchant-Id</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Your unique merchant identifier. Set as <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{'{{merchantId}}'}</code> in your environment or collection variables.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-28">
                    <span className="text-sm font-semibold text-gray-900">Secret-Key</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Your API secret key. Set as <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{'{{secret-key}}'}</code> in your environment or collection variables.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(queryCode).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`language-tab ${activeLanguage === lang ? 'active' : ''}`}
                >
                  {lang === 'curl' ? 'cURL' : lang === 'nodejs' ? 'Node.js' : lang.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <span className="text-gray-300 text-sm font-medium">Query Transaction</span>
                <button
                  onClick={() => copyToClipboard(queryCode[activeLanguage], 'query')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'query' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4">
                <pre className="text-sm text-gray-100 overflow-x-auto">
                  <code>{queryCode[activeLanguage]}</code>
                </pre>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Sample Response</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">200 OK</span>
              </div>
              <CodeBlock language="json" code={queryResponse} />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Error Response</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">404 Not Found</span>
              </div>
              <CodeBlock language="json" code={queryErrorResponse} />
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
          <h4 className="text-sm font-semibold text-amber-900 mb-2">Notes</h4>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• Ensure all variables are set in your environment before sending the request</li>
            <li>• Use this endpoint to programmatically verify transaction outcomes or troubleshoot payment issues</li>
            <li>• This endpoint requires valid merchant credentials via the headers above</li>
          </ul>
        </div>
      </section>

      {/* Verify Transaction */}
      <section id="verify" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Verify Transaction</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded font-medium">GET</span>
              <span className="text-gray-600 font-mono text-sm ml-3">/api/v1/transactions/status/{{PaymentReference}}</span>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Confirm the status of a transaction using the payment reference. This endpoint provides 
              comprehensive transaction details including payment method, status, and timestamps.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Path Parameters</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">{{PaymentReference}}</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The payment reference to verify
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Response Fields</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">status</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Transaction status: successful, pending, failed, abandoned
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">paymentMethod</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Payment method used: card, ussd, transfer, qr
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
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

            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <span className="text-gray-300 text-sm font-medium">Verify Transaction</span>
                <button
                  onClick={() => copyToClipboard(verifyCode[activeLanguage], 'verify')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'verify' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4">
                <pre className="text-sm text-gray-100 overflow-x-auto">
                  <code>{verifyCode[activeLanguage]}</code>
                </pre>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Sample Response</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">200 OK</span>
              </div>
              <CodeBlock language="json" code={verifyResponse} />
            </div>
          </div>
        </div>
      </section>

      {/* List Transactions */}
      <section id="list" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">List Transactions</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded font-medium">GET</span>
              <span className="text-gray-600 font-mono text-sm ml-3">/api/v1/transactions</span>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              List transactions carried out on your integration with pagination support. 
              Retrieve transaction history with filtering and sorting capabilities.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Parameters</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">page</span>
                    <div className="text-xs text-gray-500 mt-1">integer</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Page number for pagination (default: 1)
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">perPage</span>
                    <div className="text-xs text-gray-500 mt-1">integer</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Number of items per page (default: 10, max: 100)
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">status</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Filter by status: successful, pending, failed (optional)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
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

            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <span className="text-gray-300 text-sm font-medium">List Transactions</span>
                <button
                  onClick={() => copyToClipboard(listCode[activeLanguage], 'list')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'list' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4">
                <pre className="text-sm text-gray-100 overflow-x-auto">
                  <code>{listCode[activeLanguage]}</code>
                </pre>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Sample Response</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">200 OK</span>
              </div>
              <CodeBlock language="json" code={listResponse} />
            </div>
          </div>
        </div>
      </section>

      {/* Error Responses */}
      <section id="errors" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Error Responses</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              When an error occurs, the API returns a structured error response with details about what went wrong.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Error Codes</h3>
            
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded font-medium">401</span>
                  <span className="ml-2 text-sm font-semibold text-red-900">Unauthorized</span>
                </div>
                <p className="text-sm text-red-800">
                  Invalid or missing credentials.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded font-medium">404</span>
                  <span className="ml-2 text-sm font-semibold text-amber-900">Not Found</span>
                </div>
                <p className="text-sm text-amber-800">
                  Transaction with the given reference ID does not exist.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded font-medium">500</span>
                  <span className="ml-2 text-sm font-semibold text-purple-900">Internal Server Error</span>
                </div>
                <p className="text-sm text-purple-800">
                  Unexpected server error.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <span className="text-gray-300 text-sm font-medium">Error Response</span>
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">404 Not Found</span>
              </div>
              <div className="p-4">
                <CodeBlock language="json" code={errorResponse} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Workflow */}
      <section id="workflow" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Integration Workflow</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Transaction Processing Flow</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">1</div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Initialize</h4>
              <p className="text-xs text-blue-700">Create transaction with customer details</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">2</div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Process</h4>
              <p className="text-xs text-blue-700">Customer completes payment</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">3</div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Query</h4>
              <p className="text-xs text-blue-700">Check transaction status</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">4</div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Verify</h4>
              <p className="text-xs text-blue-700">Confirm final payment status</p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started CTA */}
      <div className="bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Ready to start processing transactions?</h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Use the Transactions API to create, query, and manage payments in your application. 
            Our comprehensive endpoints provide everything you need for robust payment processing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.firstchekout.com/auth/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-bank-blue rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Create free account
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
            <a
              href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-bank-gold text-white rounded-lg hover:bg-bank-gold/90 transition-colors font-semibold"
            >
              Test in Postman
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};