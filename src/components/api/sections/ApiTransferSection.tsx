import React from 'react';
import { Building, Copy, Check, ExternalLink, Clock, Shield } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiTransferSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const initiateTransferCode = {
    curl: `curl --location -g '{{GatewayBaseAddress}}/api/v1/paywithtransfer/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Access-Token: {{Access-Token}}' \\
--data '{
    "TransactionReference": "{{transactionRef}}",
    "TypeId": 2
}'`,
    nodejs: `const axios = require('axios');

async function initiatePayWithTransfer(transactionRef, typeId, accessToken) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/paywithtransfer/initiate', {
    TransactionReference: transactionRef,
    TypeId: typeId
  }, {
    headers: {
      'Access-Token': accessToken,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function initiatePayWithTransfer($transactionRef, $typeId, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/paywithtransfer/initiate',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'TransactionReference' => $transactionRef,
        'TypeId' => $typeId
      ]),
      CURLOPT_HTTPHEADER => array(
        'Access-Token: ' . $accessToken,
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

def initiate_pay_with_transfer(transaction_ref, type_id, access_token):
    """Initiate Pay with Transfer transaction"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/paywithtransfer/initiate"
    
    payload = {
        "TransactionReference": transaction_ref,
        "TypeId": type_id
    }
    
    headers = {
        'Access-Token': access_token,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const confirmTransferCode = {
    curl: `curl -X POST "{{GatewayBaseAddress}}/api/v1/paywithtransfer/complete" \\
  -H "Access-Token: {{Access-Token}}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "UniqueReference": "{{transactionRef}}",
    "VirtualAccountNo": "{{virtualAccountNo}}",
    "VirtualAccountToken": "{{virtualAccountToken}}"
  }'`,
    nodejs: `const axios = require('axios');

async function confirmPayWithTransfer(uniqueReference, virtualAccountNo, virtualAccountToken, accessToken) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/paywithtransfer/complete', {
    UniqueReference: uniqueReference,
    VirtualAccountNo: virtualAccountNo,
    VirtualAccountToken: virtualAccountToken
  }, {
    headers: {
      'Access-Token': accessToken,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function confirmPayWithTransfer($uniqueReference, $virtualAccountNo, $virtualAccountToken, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/paywithtransfer/complete',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'UniqueReference' => $uniqueReference,
        'VirtualAccountNo' => $virtualAccountNo,
        'VirtualAccountToken' => $virtualAccountToken
      ]),
      CURLOPT_HTTPHEADER => array(
        'Access-Token: ' . $accessToken,
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

def confirm_pay_with_transfer(unique_reference, virtual_account_no, virtual_account_token, access_token):
    """Confirm Pay with Transfer payment"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/paywithtransfer/complete"
    
    payload = {
        "UniqueReference": unique_reference,
        "VirtualAccountNo": virtual_account_no,
        "VirtualAccountToken": virtual_account_token
    }
    
    headers = {
        'Access-Token': access_token,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`,
    javascript: `const url = \`\${process.env.GatewayBaseAddress}/api/v1/paywithtransfer/complete\`;
const headers = {
  "Access-Token": process.env.Access_Token,
  "Content-Type": "application/json"
};
const body = JSON.stringify({
  UniqueReference: process.env.transactionRef,
  VirtualAccountNo: process.env.virtualAccountNo,
  VirtualAccountToken: process.env.virtualAccountToken
});
fetch(url, {
  method: "POST",
  headers,
  body
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);`
  };

  const initiateTransferRequestBody = `{
    "TransactionReference": "{{transactionRef}}",
    "TypeId": 2
}`;

  const confirmTransferRequestBody = `{
    "UniqueReference": "{{transactionRef}}", // Transaction reference from transfer payment initiation
    "VirtualAccountNo": "9101724738", // Virtual account number from transfer payment initiation
    "VirtualAccountToken": "<token>" // Virtual account token from transfer payment initiation
}`;

  const initiateTransferSuccessResponse = `{
  "status": "success",
  "message": "Payment initiated successfully.",
  "data": {
    "transactionReference": "TX-DD17B24E8A6E420A8421548DC5E0D3FC",
    "paymentInstructions": {
      "TransferNumber": "1234567890",
      "bankName": "First Bank",
      "amount": 10000,
      "expiry": "2024-12-31T23:59:59Z"
    }
  }
}`;

  const initiateTransferErrorResponses = {
    badRequest: `{
  "status": "error",
  "message": "Invalid request body. Please check your parameters."
}`,
    unauthorized: `{
  "status": "error",
  "message": "Access token is missing or invalid."
}`,
    serverError: `{
  "status": "error",
  "message": "An unexpected error occurred. Please try again later."
}`
  };

  const confirmTransferSuccessResponse = `{
  "status": "success",
  "message": "Payment confirmed successfully.",
  "data": {
    "transactionRef": "{{transactionRef}}",
    "amount": 5000,
    "currency": "NGN",
    "confirmedAt": "2024-06-01T12:34:56Z"
  }
}`;

  const confirmTransferErrorResponses = {
    unauthorized: `{
  "status": "error",
  "message": "Invalid or expired virtual account token."
}`,
    notFound: `{
  "status": "error",
  "message": "Transaction reference not found."
}`,
    conflict: `{
  "status": "error",
  "message": "This transaction has already been confirmed."
}`,
    badRequest: `{
  "status": "error",
  "message": "Missing or invalid parameters."
}`
  };

  const quickStartItems = [
    {
      title: 'Initiate Pay with Transfer',
      description: 'Generate virtual account details for customer transfer',
      icon: Building,
      color: 'blue',
      link: '#initiate',
      time: '2 minutes'
    },
    {
      title: 'Confirm Paywith Transfer Payment',
      description: 'Confirm payment after customer completes transfer',
      icon: Shield,
      color: 'emerald',
      link: '#confirm',
      time: '1 minute'
    }
  ];

  return (
    <div className="max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">PayWithTransfer</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          Pay With Transfer allows customers to make payments via direct bank transfer using dynamically 
          generated virtual account numbers. This payment method provides high success rates and works 
          with any Nigerian bank account.
        </p>
      </div>

      {/* Authorization Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">AUTHORIZATION - Bearer Token</h3>
            <p className="text-blue-800 leading-relaxed">
              This folder is using Bearer Token from collection FirstChekout Payment Gateway
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">On this page</h3>
        <div className="grid md:grid-cols-2 gap-2 text-xs">
          <a href="#initiate" className="text-blue-600 hover:text-blue-700 block py-1">Initiate Pay with Transfer</a>
          <a href="#confirm" className="text-blue-600 hover:text-blue-700 block py-1">Confirm Paywith Transfer Payment</a>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">How Pay With Transfer Works</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">1</div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Initiate</h4>
            <p className="text-xs text-blue-700">Generate virtual account details</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">2</div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Transfer</h4>
            <p className="text-xs text-blue-700">Customer transfers to virtual account</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">3</div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Confirm</h4>
            <p className="text-xs text-blue-700">Confirm payment completion</p>
          </div>
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

      {/* Initiate Pay with Transfer */}
      <section id="initiate" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Initiate Pay with Transfer</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/paywithtransfer/initiate
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Initiate Pay with Transfer Payment</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Initiates a payment process using the Pay with Transfer method via the FirstChekout Payment 
            Gateway API. This endpoint is typically the first step in the Transfer-based payment workflow, 
            generating a transaction reference and preparing the gateway for subsequent confirmation.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Endpoint</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">POST</span>
              <code className="text-sm text-blue-600">{"{{GatewayBaseAddress}}"}/api/v1/paywithtransfer/initiate</code>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>To start a payment transaction using an Transfer transfer method.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Returns a response containing transaction details required for the next steps in the payment process.</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Prerequisites</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>A valid Access-Token must be available in your environment.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The GatewayBaseAddress should be configured to point to the correct environment.</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Headers</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Key</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Value</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">Content-Type</td>
                  <td className="px-6 py-4 text-sm text-gray-700">application/json</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Specifies the request body format.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">Access-Token</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{"{{Access-Token}}"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Bearer token for authentication.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Body</h3>
          <p className="text-gray-700 mb-4">Send as raw JSON:</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <CodeBlock language="json" code={initiateTransferRequestBody} />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Parameters</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Required</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">TransactionReference</td>
                  <td className="px-6 py-4 text-sm text-gray-700">string</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Yes</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Unique identifier for the transaction.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">TypeId</td>
                  <td className="px-6 py-4 text-sm text-gray-700">integer</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Yes</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Payment type identifier (2 for Transfer transfer).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Example Request</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">POST</span>
                <code className="text-sm text-blue-600">{"{{GatewayBaseAddress}}"}/api/v1/paywithtransfer/initiate</code>
              </div>
              <div className="text-sm text-gray-700">Content-Type: application/json</div>
              <div className="text-sm text-gray-700">Access-Token: {"{{Access-Token}}"}</div>
            </div>
            <div className="mt-4">
              <CodeBlock language="json" code={`{
    "TransactionReference": "TX-DD17B24E8A6E420A8421548DC5E0D3FC",
    "TypeId": 2
}`} />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Example Success Response</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <CodeBlock language="json" code={initiateTransferSuccessResponse} />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Possible Error Responses</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">400 Bad Request</span>
                <span className="text-gray-700">Invalid request body or missing parameters.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <CodeBlock language="json" code={initiateTransferErrorResponses.badRequest} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">401 Unauthorized</span>
                <span className="text-gray-700">Access token is missing or invalid.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <CodeBlock language="json" code={initiateTransferErrorResponses.unauthorized} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">500 Internal Server Error</span>
                <span className="text-gray-700">Unexpected server error.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <CodeBlock language="json" code={initiateTransferErrorResponses.serverError} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Notes</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Ensure the <strong>transactionRef</strong> is unique for each transaction to avoid duplication.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The <strong>TypeId</strong> must be set to 2 for Transfer transfer payments.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Ensure your environment variables are correctly configured before making requests.</span>
            </li>
          </ul>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Authorization</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Bearer Token</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Token:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs">{"{{Access-Token}}"}</code>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Body (raw json)</h4>
              <CodeBlock language="json" code={initiateTransferRequestBody} />
            </div>
          </div>

          <div>
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
                <span>Example Response</span>
                <span className="status-200">200 OK</span>
              </div>
              <div className="response-body">
                <CodeBlock language="json" code={initiateTransferSuccessResponse} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirm Paywith Transfer Payment */}
      <section id="confirm" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Confirm Paywith Transfer Payment</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/paywithtransfer/complete
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Paywith Transfer Payment</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This endpoint allows you to confirm a payment made via transfer using the FirstChekout Payment Gateway. 
            Use this after a customer has completed a transfer to the provided virtual account, and you need to 
            notify the gateway to finalize the transaction.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <ol className="space-y-3 text-blue-800">
              <li className="flex">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</span>
                <span><strong>Initiate Transfer Payment:</strong> Start by creating a payment using the "Initiate Paywith Transfer" endpoint. This generates a transactionRef, a virtual account number, and a virtual account token.</span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</span>
                <span><strong>Customer Transfers Funds:</strong> The customer transfers the payment amount to the generated virtual account number.</span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</span>
                <span><strong>Confirm Transfer Payment:</strong> Use this endpoint to confirm the payment by providing the required details from the initiation step.</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔗 Endpoint Details</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-semibold text-gray-900">Method:</span>
                <span className="text-sm text-gray-700 ml-2">POST</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">URL:</span>
                <code className="text-sm text-blue-600 ml-2">{"{{GatewayBaseAddress}}"}/api/v1/paywithtransfer/complete</code>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">Headers:</span>
                <div className="ml-2 mt-1">
                  <div className="text-sm text-gray-700">• <strong>Access-Token:</strong> Your authentication token (required)</div>
                  <div className="text-sm text-gray-700">• <strong>Content-Type:</strong> application/json</div>
                </div>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">Body:</span>
                <span className="text-sm text-gray-700 ml-2">Raw JSON</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Body Schema</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <CodeBlock language="json" code={confirmTransferRequestBody} />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Field Descriptions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Field</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">UniqueReference</td>
                  <td className="px-6 py-4 text-sm text-gray-700">string</td>
                  <td className="px-6 py-4 text-sm text-gray-700">The unique transaction reference from the transfer initiation</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">VirtualAccountNo</td>
                  <td className="px-6 py-4 text-sm text-gray-700">string</td>
                  <td className="px-6 py-4 text-sm text-gray-700">The virtual account number provided for the transfer</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">VirtualAccountToken</td>
                  <td className="px-6 py-4 text-sm text-gray-700">string</td>
                  <td className="px-6 py-4 text-sm text-gray-700">The token associated with the virtual account (from initiation)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-language Code Samples</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">cURL</h4>
              <div className="paystack-code-block">
                <div className="paystack-code-header">
                  <span className="text-sm font-medium">cURL Request</span>
                  <button
                    onClick={() => copyToClipboard(confirmTransferCode.curl, 'curl-confirm')}
                    className="copy-button"
                  >
                    {copiedCode === 'curl-confirm' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <CodeBlock language="bash" code={confirmTransferCode.curl} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Python (requests)</h4>
              <div className="paystack-code-block">
                <div className="paystack-code-header">
                  <span className="text-sm font-medium">Python Implementation</span>
                  <button
                    onClick={() => copyToClipboard(confirmTransferCode.python, 'python-confirm')}
                    className="copy-button"
                  >
                    {copiedCode === 'python-confirm' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <CodeBlock language="python" code={confirmTransferCode.python} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">JavaScript (fetch)</h4>
              <div className="paystack-code-block">
                <div className="paystack-code-header">
                  <span className="text-sm font-medium">JavaScript Implementation</span>
                  <button
                    onClick={() => copyToClipboard(confirmTransferCode.javascript, 'js-confirm')}
                    className="copy-button"
                  >
                    {copiedCode === 'js-confirm' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <CodeBlock language="javascript" code={confirmTransferCode.javascript} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Example Responses</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-2">Success (200)</span>
                <span className="text-gray-700">Payment confirmed successfully.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={confirmTransferSuccessResponse} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">Error: Invalid Token (401)</span>
                <span className="text-gray-700">Invalid or expired virtual account token.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={confirmTransferErrorResponses.unauthorized} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">Error: Not Found (404)</span>
                <span className="text-gray-700">Transaction reference not found.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={confirmTransferErrorResponses.notFound} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">Error: Already Confirmed (409)</span>
                <span className="text-gray-700">This transaction has already been confirmed.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={confirmTransferErrorResponses.conflict} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Endpoints</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <a href="#initiate" className="text-blue-600 hover:text-blue-700 underline">Initiate Pay with Transfer</a></li>
              <li>• For more details, refer to the FirstChekout Payment Gateway collection documentation.</li>
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Authorization</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Bearer Token</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Token:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs">{"{{Access-Token}}"}</code>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Headers</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Access-Token:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs">{"{{Access-Token}}"}</code>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Content-Type:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs">application/json</code>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Body (raw json)</h4>
              <CodeBlock language="json" code={confirmTransferRequestBody} />
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(confirmTransferCode).map((lang) => (
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
                  onClick={() => copyToClipboard(confirmTransferCode[activeLanguage], 'confirm-transfer')}
                  className="copy-button"
                >
                  {copiedCode === 'confirm-transfer' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{confirmTransferCode[activeLanguage]}</code></pre>
              </div>
            </div>

            <div className="response-container mt-4">
              <div className="response-header">
                <span>Example Response</span>
                <span className="status-200">200 OK</span>
              </div>
              <div className="response-body">
                <CodeBlock language="json" code={confirmTransferSuccessResponse} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Tips */}
      <section id="tips" className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Implementation Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded p-4">
            <h4 className="text-sm font-semibold text-emerald-900 mb-2">✅ Best Practices</h4>
            <ul className="text-xs text-emerald-800 space-y-1">
              <li>• Store virtual account details securely after initiation</li>
              <li>• Implement proper error handling for all response codes</li>
              <li>• Use environment variables for sensitive data</li>
              <li>• Validate all parameters before making requests</li>
              <li>• Monitor transfer completion and confirm promptly</li>
              <li>• Handle duplicate confirmation attempts gracefully</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded p-4">
            <h4 className="text-sm font-semibold text-amber-900 mb-2">⚠️ Important Notes</h4>
            <ul className="text-xs text-amber-800 space-y-1">
              <li>• Virtual account tokens are single-use and expire</li>
              <li>• Customer must transfer exact amount specified</li>
              <li>• Confirmation should happen after customer transfer</li>
              <li>• Each transaction can only be confirmed once</li>
              <li>• Keep transaction references for audit trails</li>
              <li>• Monitor for failed confirmations and retry logic</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Getting Started CTA */}
      {/*<div className="bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white">*/}
      {/*  <div className="max-w-3xl">*/}
      {/*    <h2 className="text-2xl font-bold mb-4">Ready to implement Pay With Transfer?</h2>*/}
      {/*    <p className="text-blue-100 mb-6 leading-relaxed">*/}
      {/*      Start integrating Pay With Transfer capabilities into your application. This payment method provides */}
      {/*      excellent success rates and works with any Nigerian bank account for seamless customer payments.*/}
      {/*    </p>*/}
      {/*    */}
      {/*    <div className="flex flex-col sm:flex-row gap-4">*/}
      {/*      <a*/}
      {/*        href="https://www.firstchekout.com/auth/signup"*/}
      {/*        target="_blank"*/}
      {/*        rel="noopener noreferrer"*/}
      {/*        className="inline-flex items-center justify-center px-6 py-3 bg-white text-bank-blue rounded-lg hover:bg-gray-100 transition-colors font-semibold"*/}
      {/*      >*/}
      {/*        Create free account*/}
      {/*        <ExternalLink className="ml-2 h-4 w-4" />*/}
      {/*      </a>*/}
      {/*      <a*/}
      {/*        href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"*/}
      {/*        target="_blank"*/}
      {/*        rel="noopener noreferrer"*/}
      {/*        className="inline-flex items-center justify-center px-6 py-3 bg-bank-gold text-white rounded-lg hover:bg-bank-gold/90 transition-colors font-semibold"*/}
      {/*      >*/}
      {/*        Test in Postman*/}
      {/*        <ExternalLink className="ml-2 h-4 w-4" />*/}
      {/*      </a>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};