import React from 'react';
import { Smartphone, Building, Search, Copy, Check } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';


export const ApiUssdSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Query USSD Payment Endpoint
  const queryUssdCode = {
    curl: 'curl --location -g \'{{GatewayBaseAddress}}/api/v1/ussd/transactions/{{transactionRef}}\' \\\n--header \'authToken: {{Access-Token}}\'',
    nodejs: `const axios = require('axios');

async function queryUssdPayment(transactionRef, accessToken) {
  const response = await axios.get(
    \`\${process.env.GATEWAY_BASE_ADDRESS}/api/v1/ussd/transactions/\${transactionRef}\`,
    {
      headers: {
        'authToken': accessToken
      }
    }
  );
  
  return response.data;
}`,
    php: `<?php
function queryUssdPayment($transactionRef, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/ussd/transactions/' . $transactionRef,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_HTTPHEADER => array(
        'authToken: ' . $accessToken
      ),
    ));
    
    $response = curl_exec($curl);
    curl_close($curl);
    
    return json_decode($response, true);
}
?>`,
    python: `import requests
import os

def query_ussd_payment(transaction_ref, access_token):
    """Query USSD payment transaction details"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/ussd/transactions/{transaction_ref}"
    
    headers = {
        'authToken': access_token
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  // Initiate USSD Payment
  const initiateUssdCode = {
    curl: 'curl --location -g \'{{GatewayBaseAddress}}/api/v1/ussd/initiate\' \\\n--header \'AuthToken: {{Access-Token}}\' \\\n--data \'{\n    "TransactionReference": "{{transactionRef}}",\n    "FinancialInstitutionId": 5\n}\'',
    nodejs: `const axios = require('axios');

async function initiateUssdPayment(transactionRef, financialInstitutionId, accessToken) {
  const response = await axios.post(
    \`\${process.env.GATEWAY_BASE_ADDRESS}/api/v1/ussd/initiate\`,
    {
      TransactionReference: transactionRef,
      FinancialInstitutionId: financialInstitutionId
    },
    {
      headers: {
        'AuthToken': accessToken,
        'Content-Type': 'application/json'
      }
    }
  );
  
  return response.data;
}`,
    php: `<?php
function initiateUssdPayment($transactionRef, $financialInstitutionId, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/ussd/initiate',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'TransactionReference' => $transactionRef,
        'FinancialInstitutionId' => $financialInstitutionId
      ]),
      CURLOPT_HTTPHEADER => array(
        'AuthToken: ' . $accessToken,
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

def initiate_ussd_payment(transaction_ref, financial_institution_id, access_token):
    """Initiate USSD payment transaction"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/ussd/initiate"
    
    payload = {
        "TransactionReference": transaction_ref,
        "FinancialInstitutionId": financial_institution_id
    }
    
    headers = {
        'AuthToken': access_token,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  // Fetch USSD Institution
  const fetchInstitutionCode = {
    curl: 'curl --location -g \'{{GatewayBaseAddress}}/api/v1/ussd/financial-institutions\'',
    nodejs: `const axios = require('axios');

async function fetchUssdInstitutions() {
  const response = await axios.get(
    \`\${process.env.GATEWAY_BASE_ADDRESS}/api/v1/ussd/financial-institutions\`
  );
  
  return response.data;
}`,
    php: `<?php
function fetchUssdInstitutions() {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/ussd/financial-institutions',
      CURLOPT_RETURNTRANSFER => true,
    ));
    
    $response = curl_exec($curl);
    curl_close($curl);
    
    return json_decode($response, true);
}
?>`,
    python: `import requests
import os

def fetch_ussd_institutions():
    """Fetch available USSD financial institutions"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/ussd/financial-institutions"
    
    response = requests.get(url)
    response.raise_for_status()
    
    return response.json()`
  };

  // Response examples from screenshots
  const queryUssdSuccessResponse = `{
  "transactionReference": "TX-C0F74D33AD8847CC85E6DD490644ABB4",
  "status": "SUCCESS",
  "amount": 5000,
  "currency": "NGN",
  "timestamp": "2024-06-01T12:34:56Z",
  "payer": {
    "msisdn": "+2348012345678",
    "name": "John Doe"
  },
  "details": {
    "channel": "USSD",
    "description": "Payment for Order #12345"
  }
}`;

  const queryUssdErrorResponses = {
    badRequest: '{ "error": "Invalid transaction reference." }',
    unauthorized: '{ "error": "Unauthorized. Invalid or expired token." }',
    notFound: '{ "error": "Transaction not found." }',
    serverError: '{ "error": "Internal server error. Please try again later." }'
  };

  const initiateUssdResponse = `{
  "data": {
    "referenceCode": "3756",
    "ussdCode": "*822*000*3756#",
    "transactionReference": "TX-DF16A3BB2D4148C7A10438F90C4F2CC3",
    "status": "PENDING",
    "statusCode": "01",
    "statusMessage": "PENDING",
    "callbackUrl": null
  },
  "status": "OK"
}`;

  const quickStartItems = [
    {
      title: 'Query USSD Payment',
      description: 'Retrieve details of a specific USSD payment transaction',
      icon: Search,
      color: 'blue',
      link: '#query',
      time: '1 minute'
    },
    {
      title: 'Initiate USSD Payment',
      description: 'Start a new USSD payment transaction',
      icon: Smartphone,
      color: 'emerald',
      link: '#initiate',
      time: '2 minutes'
    },
    {
      title: 'Fetch USSD Institutions',
      description: 'Get list of available financial institutions',
      icon: Building,
      color: 'purple',
      link: '#institutions',
      time: '30 seconds'
    }
  ];

  return (
    <div className="max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">USSD</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          USSD (Unstructured Supplementary Service Data) allows customers to make payments using their mobile phones 
          without internet connectivity. This is particularly popular in Nigeria for mobile banking.
        </p>
      </div>

      {/* Authorization Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Smartphone className="h-4 w-4 text-blue-600" />
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
        <div className="grid md:grid-cols-3 gap-2 text-xs">
          <a href="#query" className="text-blue-600 hover:text-blue-700 block py-1">Query USSD Payment Endpoint</a>
          <a href="#initiate" className="text-blue-600 hover:text-blue-700 block py-1">Initiate USSD Payment</a>
          <a href="#institutions" className="text-blue-600 hover:text-blue-700 block py-1">Fetch USSD Institution</a>
        </div>
      </div>

      {/* Quick Start Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick start</h2>
        <div className="grid md:grid-cols-3 gap-6">
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

      {/* Query USSD Payment Endpoint */}
      <section id="query" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded font-medium mr-3">GET</span>
          <h2 className="text-2xl font-semibold text-gray-900">Query USSD Payment Endpoint</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/ussd/transactions/{"{{transactionRef}}"}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This endpoint retrieves detailed information about a specific USSD payment transaction, identified by its unique reference. 
            It is typically used by payment processors, merchants, or support teams to track the status, audit, or troubleshoot a 
            USSD-based payment. Common scenarios include confirming payment completion, investigating failed transactions, or 
            reconciling payment records.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-3">Business Context:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Enables real-time tracking of USSD payment transactions.</li>
              <li>• Supports customer support workflows by providing transaction details for dispute resolution.</li>
              <li>• Useful for backend reconciliation and reporting.</li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Path Parameter</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">TransactionReference</h4>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">string</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">required</span>
              </div>
              <p className="text-gray-700 mb-3">The unique identifier for the USSD transaction to query.</p>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-semibold text-gray-900">Data Type:</span>
                <span className="text-sm text-gray-600 ml-2">String (typically a UUID or alphanumeric reference)</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">Example:</span>
                <code className="text-sm text-blue-600 ml-2 bg-blue-50 px-2 py-1 rounded">TX-C0F74D33AD8847CC85E6DD490644ABB4</code>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">Validation:</span>
                <span className="text-sm text-gray-600 ml-2">Must be a valid, existing transaction reference. Invalid or missing references will result in a 400 or 404 error.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Notes</h3>
          <div className="space-y-4">
            <p className="text-gray-700">
              Ensure the authToken header is present and valid; expired or missing tokens will cause a 401 error.
            </p>
            <p className="text-gray-700">
              The TransactionReference must be correctly formatted and correspond to an existing transaction.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-amber-900 mb-2">Troubleshooting Tips:</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• If you receive a 401 error, refresh your access token.</li>
                <li>• For 404 errors, verify the transaction reference is correct and exists in the system.</li>
                <li>• For 400 errors, check for typos or missing parameters.</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-red-900 mb-2">Common Pitfalls:</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Using an expired or incorrect token.</li>
                <li>• Omitting the required path parameter.</li>
                <li>• Not updating environment variables before sending the request.</li>
              </ul>
            </div>
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

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Headers</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">authToken:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs">{"{{Access-Token}}"}</code>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(queryUssdCode).map((lang) => (
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
                  onClick={() => copyToClipboard(queryUssdCode[activeLanguage], 'query-ussd')}
                  className="copy-button"
                >
                  {copiedCode === 'query-ussd' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{queryUssdCode[activeLanguage]}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Expected Responses</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-2">200 OK</span>
                <span className="text-gray-700">Transaction details successfully retrieved.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={queryUssdSuccessResponse} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">400 Bad Request</span>
                <span className="text-gray-700">Invalid or missing parameters.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={queryUssdErrorResponses.badRequest} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">401 Unauthorized</span>
                <span className="text-gray-700">Authentication failed or token missing/expired.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={queryUssdErrorResponses.unauthorized} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">404 Not Found</span>
                <span className="text-gray-700">Transaction not found.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={queryUssdErrorResponses.notFound} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">500 Internal Server Error</span>
                <span className="text-gray-700">Unexpected server error.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={queryUssdErrorResponses.serverError} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Developer Details</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">Environment Variables:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <code className="bg-blue-100 px-1 py-0.5 rounded">{"{{GatewayBaseAddress}}"}</code>: Base URL for the API gateway.</li>
                <li>• <code className="bg-blue-100 px-1 py-0.5 rounded">{"{{Access-Token}}"}</code>: Stores the authentication token.</li>
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-emerald-900 mb-3">Token Refresh:</h4>
              <p className="text-sm text-emerald-800">
                Use the AccessToken endpoint to obtain or refresh your token. Update the {"{{Access-Token}}"} variable as needed.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Related Endpoints:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• AccessToken Endpoint V2: Obtain authentication tokens.</li>
              <li>• Initiate QR Payment: Start a new payment transaction.</li>
              <li>• Query Transaction Endpoint: Query other transaction types.</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">
              For more details, refer to the FirstChekout Payment Gateway Collection.
            </p>
          </div>
        </div>
      </section>

      {/* Initiate USSD Payment */}
      <section id="initiate" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Initiate USSD Payment</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/ussd/initiate
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Summary</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This POST request initiates a USSD payment transaction through the payment gateway.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong>URL:</strong> The request is sent to the endpoint "{"{{GatewayBaseAddress}}"}/api/v1/ussd/initiate" where 
            "{"{{GatewayBaseAddress}}"}" is an environment variable representing the base address of the payment gateway API.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Headers</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 mb-3">
              <strong>AuthToken:</strong> A required header for authentication, using the environment variable 
              "{"{{Access-Token}}"}" to provide the access token.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">JSON Body Schema</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">TransactionReference</h4>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">string</span>
                </div>
                <p className="text-gray-700 mb-2">A unique identifier for the transaction.</p>
                <p className="text-sm text-gray-600">
                  <strong>Example value:</strong> <code className="bg-blue-50 px-2 py-1 rounded">"TX-F2E2FC1B8CE142B790C95AE57CD99466"</code>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">FinancialInstitutionId</h4>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">integer</span>
                </div>
                <p className="text-gray-700 mb-2">The ID of the financial institution involved in the transaction.</p>
                <p className="text-sm text-gray-600">
                  <strong>Example value:</strong> <code className="bg-blue-50 px-2 py-1 rounded">5</code>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              This documentation helps users understand the purpose of the request, how to authenticate it, 
              and the required body parameters for successful execution.
            </p>
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

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Headers</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">AuthToken:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs">{"{{Access-Token}}"}</code>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Body (raw json)</h4>
              <CodeBlock language="json" code='{\n    "TransactionReference": "{{transactionRef}}",\n    "FinancialInstitutionId": 5\n}' />
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(initiateUssdCode).map((lang) => (
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
                  onClick={() => copyToClipboard(initiateUssdCode[activeLanguage], 'initiate-ussd')}
                  className="copy-button"
                >
                  {copiedCode === 'initiate-ussd' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{initiateUssdCode[activeLanguage]}</code></pre>
              </div>
            </div>

            <div className="response-container mt-4">
              <div className="response-header">
                <span>Example Response</span>
                <span className="status-200">200 OK</span>
              </div>
              <div className="response-body">
                <CodeBlock language="json" code={initiateUssdResponse} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fetch USSD Institution */}
      <section id="institutions" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded font-medium mr-3">GET</span>
          <h2 className="text-2xl font-semibold text-gray-900">Fetch USSD Institution</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/ussd/financial-institutions
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Authorization</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Bearer Token</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Token:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs">{"{{Access-Token}}"}</code>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(fetchInstitutionCode).map((lang) => (
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
                  onClick={() => copyToClipboard(fetchInstitutionCode[activeLanguage], 'fetch-institution')}
                  className="copy-button"
                >
                  {copiedCode === 'fetch-institution' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{fetchInstitutionCode[activeLanguage]}</code></pre>
              </div>
            </div>

            <div className="response-container mt-4">
              <div className="response-header">
                <span>Example Response</span>
                <span className="text-gray-500">No response body</span>
              </div>
              <div className="response-body">
                <p className="text-sm text-gray-600">This request doesn't return any response body</p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};