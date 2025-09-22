import React from 'react';
import { Copy, Check, ExternalLink, CreditCard, Search } from 'lucide-react';
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
    curl: `curl --location '{{GatewayBaseAddress}}/api/v1/transactions/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {{Access-Token}}' \\
--data-raw '{
  "Amount": 100,
  "PayerEmail": "thomas.edison@outlook.com",
  "PayerName": "Thomas Edison",
  "Purpose": "UAT",
  "PublicKey": "{{merchantPublicKey}}",
  "paymentReference": "c34a107b-cb01-4fc6-ab33-3683e902891e"
}'`,
    nodejs: `const axios = require('axios');

async function initializeTransaction(accessToken) {
  const response = await axios.post(process.env.GATEWAY_BASE_ADDRESS + '/api/v1/transactions/initiate', {
    Amount: 100,
    PayerEmail: "thomas.edison@outlook.com",
    PayerName: "Thomas Edison",
    Purpose: "UAT",
    PublicKey: process.env.MERCHANT_PUBLIC_KEY,
    paymentReference: "c34a107b-cb01-4fc6-ab33-3683e902891e"
  }, {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
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
    """Initialize a payment transaction"""
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
    process.env.GATEWAY_BASE_ADDRESS + '/api/v1/transactions/referenceId/' + transactionRef,
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

  const initializeRequestBody = `{
  "Amount": 100,
  "PayerEmail": "example@example.com",
  "PayerName": "John Doe",
  "Purpose": "UAT",
  "PublicKey": "your-public-key",
  "paymentReference": "your-payment-reference"
}`;

  const initializeResponse = `{
  "data": {
    "accessCode": "your-access-code"
  },
  "status": "success"
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

  const querySuccessResponse = `{
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

            <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Request Body</h3>
            <p className="text-gray-600 mb-4">The request body must be in JSON format and include the following parameters:</p>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-gray-900">Amount</span>
                    <div className="text-xs text-gray-500 mt-1">(number)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The amount of money to be transacted.
                    </p>
                    <p className="text-xs text-gray-500 mt-1"><em>Example:</em> 100</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-gray-900">PayerEmail</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The email address of the payer.
                    </p>
                    <p className="text-xs text-gray-500 mt-1"><em>Example:</em> example@example.com</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-gray-900">PayerName</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The name of the payer.
                    </p>
                    <p className="text-xs text-gray-500 mt-1"><em>Example:</em> John Doe</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-gray-900">Purpose</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The purpose of the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1"><em>Example:</em> UAT</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-gray-900">PublicKey</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The public key associated with the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1"><em>Example:</em> your-public-key</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-gray-900">paymentReference</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      A unique reference for the payment.
                    </p>
                    <p className="text-xs text-gray-500 mt-1"><em>Example:</em> your-payment-reference</p>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Example Request Body:</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <CodeBlock language="json" code={initializeRequestBody} />
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

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Response</h4>
          <p className="text-gray-600 mb-4">Upon a successful request, the API will respond with a JSON object containing the following structure:</p>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-24">
                  <span className="text-sm font-semibold text-gray-900">data</span>
                  <div className="text-xs text-gray-500 mt-1">(object)</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    An object containing the transaction details.
                  </p>
                  <div className="mt-2">
                    <div className="ml-4">
                      <div className="flex items-start space-x-4 mb-2">
                        <div className="flex-shrink-0 w-24">
                          <span className="text-sm font-medium text-gray-900">accessCode</span>
                          <div className="text-xs text-gray-500 mt-1">(string)</div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">
                            A code that may be used for further processing of the transaction. This code is crucial for completing the payment process and should be securely stored.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-24">
                  <span className="text-sm font-semibold text-gray-900">status</span>
                  <div className="text-xs text-gray-500 mt-1">(string)</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    The status of the transaction initiation request. Possible values include:
                  </p>
                  <div className="mt-2 ml-4">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-900">success</span>
                      <span className="text-sm text-gray-600 ml-2">: Indicates that the transaction has been successfully initiated.</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">failure</span>
                      <span className="text-sm text-gray-600 ml-2">: Indicates that the transaction initiation has failed, and further details may be provided in the response.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Example Response Body:</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <CodeBlock language="json" code={initializeResponse} />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Notes</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Ensure that all required fields are included in the request body for successful transaction initiation.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">accessCode</code> in the response can be used for subsequent steps in the payment process, such as confirming the transaction or redirecting the user to a payment gateway.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Review the <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">status</code> field to determine the outcome of the transaction initiation, and handle errors appropriately based on the status returned.</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Authorization</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-900">Bearer Token</span>
              <span className="text-sm text-blue-800">Token: <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">{"{{Access-Token}}"}</code></span>
            </div>
          </div>
        </div>
      </section>

      {/* Query Transaction */}
      <section id="query" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Query Transaction</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded font-medium">GET</span>
              <span className="text-gray-600 font-mono text-sm ml-3">/api/v1/transactions/referenceId/{"{{transactionRef}}"}</span>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Retrieves the details of a specific transaction using its unique reference ID. This endpoint is 
              typically used to check the status, metadata, and result of a payment or transaction processed 
              through the FirstChekout Payment Gateway.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">URL Path Variables</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">{"{{GatewayBaseAddress}}"}</span>
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
                    <span className="text-sm font-semibold text-gray-900">{"{{transactionRef}}"}</span>
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
                      Your unique merchant identifier. Set as <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{"{{merchantId}}"}</code> in your environment or collection variables.
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
                      Your API secret key. Set as <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{"{{secret-key}}"}</code> in your environment or collection variables.
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

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Authentication</h4>
          <p className="text-gray-600 mb-4">This endpoint requires valid merchant credentials via the headers above. Ensure your <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">Merchant-Id</code> and <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">Secret-Key</code> are correct and active.</p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Example Request</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-700 mb-2">
              <strong>Method:</strong> GET
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <strong>URL:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{"{{GatewayBaseAddress}}"}/api/v1/transactions/referenceId/{"{{transactionRef}}"}</code>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Response</h4>
          <p className="text-gray-600 mb-4">Returns a JSON object containing transaction details, such as status, amount, currency, timestamps, and any additional metadata.</p>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-700">
              <strong>Success (200):</strong> Returns a JSON object containing transaction details, such as status, amount, currency, timestamps, and any additional metadata.
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Error Codes:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
              <span><strong>401 Unauthorized</strong>: Invalid or missing credentials.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
              <span><strong>404 Not Found</strong>: Transaction with the given reference ID does not exist.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
              <span><strong>500 Internal Server Error</strong>: Unexpected server error.</span>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Example Success Response</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <CodeBlock language="json" code={queryResponse} />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Example Error Response</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <CodeBlock language="json" code={queryErrorResponse} />
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

      {/* Getting Started CTA */}
      <div className="bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white">
              <span className="api-method get bg-blue-100 text-blue-800">GET</span>
              <span className="api-url-path">/api/v1/transactions/referenceId/{"{{transactionRef}}"}</span>
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
          <p className="text-blue-100 mb-6 leading-relaxed">
            Use the Transactions API to create, query, and manage payments in your application. 
            Retrieves the details of a specific transaction using its unique reference ID. This endpoint is typically used to check the status, metadata, and result of a payment or transaction processed through the FirstChekout Payment Gateway.
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
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Method:</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded font-medium">GET</span>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">URL:</h4>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{"{{GatewayBaseAddress}}"}/api/v1/transactions/referenceId/{"{{transactionRef}}"}</code>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">URL Path Variables</h3>
            
            <div className="space-y-4 mb-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">{"{{GatewayBaseAddress}}"}</span>
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
                    <span className="text-sm font-semibold text-gray-900">{"{{transactionRef}}"}</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The unique reference ID of the transaction you want to query. This should be set as an environment or collection variable before sending the request.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Headers</h3>
            
            <div className="space-y-4 mb-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-28">
                    <span className="text-sm font-semibold text-gray-900">Merchant-Id</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Your unique merchant identifier. Set as <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{"{{merchantId}}"}</code> in your environment or collection variables.
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
                      Your API secret key. Set as <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{"{{secret-key}}"}</code> in your environment or collection variables.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
            <p className="text-gray-600 mb-4">
              This endpoint requires valid merchant credentials via the headers above. Ensure your <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">Merchant-Id</code> and <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">Secret-Key</code> are correct and active.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Request</h3>
            
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

            <div className="paystack-code-block mb-6">
              <div className="paystack-code-header">
                <span className="text-sm font-medium">Query Transaction Request</span>
                <button
                  onClick={() => copyToClipboard(queryCode[activeLanguage], 'query-request')}
                  className="copy-button"
                >
                  {copiedCode === 'query-request' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{queryCode[activeLanguage]}</code></pre>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">HTTP Request Example:</h4>
              <div className="bg-white rounded p-3 border">
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Method:</strong> GET
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <strong>URL:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{"{{GatewayBaseAddress}}"}/api/v1/transactions/referenceId/{"{{transactionRef}}"}</code>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Headers:</strong>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="text-sm text-gray-600">
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">Merchant-Id: {"{{merchantId}}"}</code>
                  </div>
                  <div className="text-sm text-gray-600">
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">Secret-Key: {"{{secret-key}}"}</code>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expected Response</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Success (200):</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Returns a JSON object containing transaction details, such as status, amount, currency, timestamps, and any additional metadata.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Error Codes:</h4>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• <strong>401 Unauthorized</strong>: Invalid or missing credentials.</li>
                  <li>• <strong>404 Not Found</strong>: Transaction with the given reference ID does not exist.</li>
                  <li>• <strong>500 Internal Server Error</strong>: Unexpected server error.</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Success Response</h3>
            
            <div className="paystack-code-block mb-6">
              <div className="paystack-code-header">
                <span className="text-sm font-medium">Success Response (200 OK)</span>
                <button
                  onClick={() => copyToClipboard(querySuccessResponse, 'query-success-response')}
                  className="copy-button"
                >
                  {copiedCode === 'query-success-response' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <CodeBlock language="json" code={querySuccessResponse} />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Error Response</h3>
            
            <div className="paystack-code-block mb-6">
              <div className="paystack-code-header">
                <span className="text-sm font-medium">Error Response (404 Not Found)</span>
                <button
                  onClick={() => copyToClipboard(queryErrorResponse, 'query-error-response')}
                  className="copy-button"
                >
                  {copiedCode === 'query-error-response' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <CodeBlock language="json" code={queryErrorResponse} />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Authorization</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">Bearer Token</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-blue-900">Token:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs">{"{{Access-Token}}"}</code>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Headers</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Merchant-Id</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">{"{{merchantId}}"}</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Secret-Key</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">{"{{secret-key}}"}</code>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
            
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                <span>Ensure all variables are set in your environment before sending the request.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                <span>Use this endpoint to programmatically verify transaction outcomes or troubleshoot payment issues.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                <span>For more information, refer to the FirstChekout Payment Gateway collection documentation.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
};