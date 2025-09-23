import React from 'react';
import { Users, Copy, Check, ExternalLink, Shield, Search, User } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiMerchantSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const merchantEnquiryCode = {
    curl: `curl --location -g '{{gatewayUrl}}/api/v1/merchants/merchant-name-enquiry/{{merchantId}}'`,
    nodejs: `const axios = require('axios');

async function getMerchantNameEnquiry(merchantId, accessToken) {
  const response = await axios.get(
    \`\${process.env.GATEWAY_URL}/api/v1/merchants/merchant-name-enquiry/\${merchantId}\`,
    {
      headers: {
        'Authorization': \`Bearer \${accessToken}\`
      }
    }
  );
  
  return response.data;
}`,
    php: `<?php
function getMerchantNameEnquiry($merchantId, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_URL'] . '/api/v1/merchants/merchant-name-enquiry/' . $merchantId,
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
import os

def get_merchant_name_enquiry(merchant_id, access_token):
    """Get merchant name enquiry details"""
    url = f"{os.getenv('GATEWAY_URL')}/api/v1/merchants/merchant-name-enquiry/{merchant_id}"
    
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const accessTokenCode = {
    curl: `curl --location -g '{{IdenityServerAddress}}api/v2/authenticate/token' \\
--data-urlencode 'grant_type=client_credentials' \\
--data-urlencode 'client_Id={{ClientId}}' \\
--data-urlencode 'client_Secret={{ClientSecret}}'`,
    nodejs: `const axios = require('axios');

async function getAccessToken() {
  const response = await axios.post('${API_CONFIG.identityServiceUrl}/api/v2/authenticate/token', 
    new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_Id': process.env.CLIENT_ID,
      'client_Secret': process.env.CLIENT_SECRET
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  
  return response.data;
}`,
    php: `<?php
function getAccessToken() {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
        CURLOPT_URL => '${API_CONFIG.identityServiceUrl}/api/v2/authenticate/token',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'grant_type' => 'client_credentials',
            'client_Id' => $_ENV['CLIENT_ID'],
            'client_Secret' => $_ENV['CLIENT_SECRET']
        ]),
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/x-www-form-urlencoded'
        ),
    ));
    
    $response = curl_exec($curl);
    curl_close($curl);
    
    return json_decode($response, true);
}
?>`,
    python: `import requests
import os
from urllib.parse import urlencode

def get_access_token():
    """Get authentication token from Identity Server"""
    url = "${API_CONFIG.identityServiceUrl}/api/v2/authenticate/token"
    
    data = {
        'grant_type': 'client_credentials',
        'client_Id': os.getenv('CLIENT_ID'),
        'client_Secret': os.getenv('CLIENT_SECRET')
    }
    
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    response = requests.post(url, data=urlencode(data), headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const merchantEnquirySuccessResponse = `{
  "data": {
    "firstName": "Emmanuel",
    "lastName": "Bright",
    "accountName": "I.J. OMASON & COMPANY",
    "email": "ee@gmail.com",
    "classCode": "5635119847"
  },
  "status": "OK"
}`;

  const accessTokenSuccessResponse = `{
  "value": {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJjYXJkIiwidXNzZCIsInBheWF0dGl0dWRlIiwicXIiLCJwYXl3aXRodHJhbnNmZXIiXSwiY2giOiJGQ0swMDAxIiwianRpIjoiaTZqcFl2blNLcS9uaDZNOG1sNlQrVUVvc01iTXdFSzFqbHBKMWtaREZxZzI5L08wTFNBZndDZDdSYnQ1TWxzcXhCZnlSSEpQYkxQcGpTTEtsQlE4S1RMNVlZY2xwVWJyWmI5ViIsInVzZXJBZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuNDQuMSIsImdfdG9rZW4tc2lnbiI6ImE2NFZLMTBQcGF5Z0dtVVhFL2JwODQ2RldzM0F2QnN4b2FZT3gxRUlKU2pHTjZvNnp3bStobUpDaU9ucEtNM0JhcFVxcXRjMWJzTkFnZFEwOHd5aUtBPT0iLCJJUC1BZGRyZXNzIjoiMTAyLjg4LjExMS4yMDU6NDgxMDAiLCJuYmYiOjE3NTI4NzM3ODUsImV4cCI6MTc1MjkwOTc4NSwiaWF0IjoxNzUyODczNzg1LCJpc3MiOiJodHRwczovL3d3dy5maXJzdGNoZWtvdXRkZXYuY29tIiwiYXVkIjoiaWRlbnRpdHkifQ.fpNnEcZmB9sjn0nujxV8AmI2HIq1sQJeUqrFOHChf2uKtlRRGGHCIBnJ7Dx0A8tfS5L0R0pbbJE91gD-PUxaXJXFhCAA6cz-kJsHImHWdhZQMdnuhbyfoTu6CvChzdj3vTR3X9_C5jB79aUio_L5dd4OlQUKQIKYw_1b9E3bdCDDtpW67jniPn80xLEecsE9-6DOJe7uFS0_NqWaFznnUoTSP1N5ZvyLxZiwnNVTSq043nFxW6X2Acon7vnLn6p2C0dUUaAxYeTWL0yqfp_5FxUTWjFjkpN20SbXiJKRei0PQQx9ZMU358klrYmD1myzl5KXdplpKYVoJnR-3tteX6MAjoBC0TjWbmjDm0ZqS1W1EmbF3t00XohR5PAuld_8krczIoHMsmB1yeK0Exye7QAontmCTlsbAf2Ir3fT76Nr_Ydrg2LpGFQz8xHbf_w9Lom07jz8PvuW_5n44X_N42TSZ9ttO_-sa5wpgt7YtG2aT11nZQU28lZr_-N1dBBUpEqq9JHSq8GUY1zO0AbxzDxMai5rKif7g3ttd3V2JoXWm1hwLIb2Vy1D9xPHByoKq-J6_RCewC0ZMvYbDkKtQDPwDU90MGDrNLxlb6QgdQHhLLTP65S1wQwKCSAoqf2hoJsxOBslPmC-VH2oxZk2zpfqxesn7FPpD4lX_0XtG3Y",
    "token_type": "Bearer",
    "expires_in": 36000
  },
  "isSuccess": true,
  "error": null,
  "timestamp": "2025-07-18 21:23:06",
  "isFailure": false,
  "statusCode": "OK"
}`;

  const merchantEnquiryErrorResponses = {
    badRequest: `{ "error": "Invalid merchant ID format." }`,
    unauthorized: `{ "error": "Unauthorized. Invalid or expired token." }`,
    notFound: `{ "error": "Merchant not found." }`,
    serverError: `{ "error": "Internal server error. Please try again later." }`
  };

  const quickStartItems = [
    {
      title: 'Merchant Name Enquiry',
      description: 'Retrieve merchant details and account information',
      icon: Search,
      color: 'blue',
      link: '#enquiry',
      time: '1 minute'
    },
    {
      title: 'AccessToken Endpoint V2',
      description: 'Obtain authentication token from Identity Server',
      icon: Shield,
      color: 'emerald',
      link: '#access-token',
      time: '2 minutes'
    }
  ];

  return (
    <div className="max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Merchant</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          The Merchant API allows you to retrieve merchant information and manage merchant-related operations 
          through the FirstChekout Payment Gateway.
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
          <a href="#enquiry" className="text-blue-600 hover:text-blue-700 block py-1">Merchant Name Enquiry</a>
          <a href="#access-token" className="text-blue-600 hover:text-blue-700 block py-1">AccessToken Endpoint V2</a>
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

      {/* Merchant Name Enquiry */}
      <section id="enquiry" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded font-medium mr-3">GET</span>
          <h2 className="text-2xl font-semibold text-gray-900">Merchant Name Enquiry</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/merchants/merchant-name-enquiry/{"{{merchantId}}"}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This GET request retrieves merchant information including name, account details, and contact information 
            using the merchant ID. This endpoint is useful for verifying merchant details and retrieving account information.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Path Parameter</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-gray-900">merchantId</span>
                    <div className="text-xs text-gray-500 mt-1">(string, required)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The unique identifier for the merchant whose information is being requested.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">5635119847</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Header</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-semibold text-gray-900">Authorization</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Bearer token for authenticating the request. Must be a valid access token.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Notes</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Ensure the <strong>merchantId</strong> is valid and corresponds to an existing merchant in the system.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The <strong>Authorization</strong> header must contain a valid Bearer token that is not expired.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>This endpoint returns merchant profile information including personal and business details.</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Expected Responses</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-2">Success (200 OK)</span>
                <span className="text-gray-700">Merchant information retrieved successfully.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">400 Bad Request</span>
                <span className="text-gray-700">Invalid merchant ID format.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">401 Unauthorized</span>
                <span className="text-gray-700">Authentication failure.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">404 Not Found</span>
                <span className="text-gray-700">Merchant not found.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">500 Internal Server Error</span>
                <span className="text-gray-700">Unexpected server error.</span>
              </div>
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
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(merchantEnquiryCode).map((lang) => (
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
                  onClick={() => copyToClipboard(merchantEnquiryCode[activeLanguage], 'merchant-enquiry')}
                  className="copy-button"
                >
                  {copiedCode === 'merchant-enquiry' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{merchantEnquiryCode[activeLanguage]}</code></pre>
              </div>
            </div>

            <div className="response-container mt-4">
              <div className="response-header">
                <span>Example Response</span>
                <span className="status-200">200 OK</span>
              </div>
              <div className="response-body">
                <CodeBlock language="json" code={merchantEnquirySuccessResponse} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Response Structure</h3>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Response Fields</h4>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">firstName</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The first name of the merchant account holder.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">"Emmanuel"</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">lastName</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The last name of the merchant account holder.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">"Bright"</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">accountName</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The business or account name associated with the merchant.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">"I.J. OMASON & COMPANY"</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">email</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The email address associated with the merchant account.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">"ee@gmail.com"</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">classCode</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The classification code associated with the merchant account.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">"5635119847"</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample Response Examples</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-2">200 OK</span>
                <span className="text-gray-700">Merchant information retrieved successfully.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={merchantEnquirySuccessResponse} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">400 Bad Request</span>
                <span className="text-gray-700">Invalid merchant ID format.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={merchantEnquiryErrorResponses.badRequest} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">401 Unauthorized</span>
                <span className="text-gray-700">Authentication failed or token missing/expired.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={merchantEnquiryErrorResponses.unauthorized} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">404 Not Found</span>
                <span className="text-gray-700">Merchant not found.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={merchantEnquiryErrorResponses.notFound} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">500 Internal Server Error</span>
                <span className="text-gray-700">Unexpected server error.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={merchantEnquiryErrorResponses.serverError} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AccessToken Endpoint V2 */}
      <section id="access-token" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">AccessToken Endpoint V2</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{IdenityServerAddress}}"}/api/v2/authenticate/token
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Authenticate Token API</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This endpoint is used to obtain an authentication token from the Identity Server. It allows clients to 
            authenticate and receive a token that can be used for subsequent requests to protected resources.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Request</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-semibold text-gray-900">Method:</span>
                <span className="text-sm text-gray-700 ml-2">POST</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">URL:</span>
                <code className="text-sm text-blue-600 ml-2">{"{{IdenityServerAddress}}"}/api/v2/authenticate/token</code>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">Content-Type:</span>
                <span className="text-sm text-gray-700 ml-2">application/x-www-form-urlencoded</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Body Parameters</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Parameter</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">grant_type</td>
                  <td className="px-6 py-4 text-sm text-gray-700">text</td>
                  <td className="px-6 py-4 text-sm text-gray-700">The type of grant being requested. This parameter is essential for the authentication process.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">client_Id</td>
                  <td className="px-6 py-4 text-sm text-gray-700">text</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Your FirstChekout Client ID obtained from the merchant dashboard.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">client_Secret</td>
                  <td className="px-6 py-4 text-sm text-gray-700">text</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Your FirstChekout Client Secret. Keep this confidential.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Response</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Upon a successful request, the server responds with a JSON object that contains the following structure:
          </p>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Response Parameters</h4>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">value</span>
                    <div className="text-xs text-gray-500 mt-1">(object)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      An object containing the authentication details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">access_token</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The token that can be used for authorization in subsequent requests.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">token_type</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The type of token issued (e.g., Bearer).
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">expires_in</span>
                    <div className="text-xs text-gray-500 mt-1">(number)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The duration in seconds for which the token is valid.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">isSuccess</span>
                    <div className="text-xs text-gray-500 mt-1">(boolean)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      A boolean indicating whether the request was successful.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">error</span>
                    <div className="text-xs text-gray-500 mt-1">(object)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Contains error information if the request failed; otherwise, it is null.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">timestamp</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The time at which the response was generated.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">isFailure</span>
                    <div className="text-xs text-gray-500 mt-1">(boolean)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      A boolean indicating whether the request failed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">statusCode</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The HTTP status code of the response.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            To use this endpoint effectively, ensure that you provide the correct grant_type in the request body. 
            Upon successful authentication, you will receive an access token that you can use to access protected 
            resources. Handle the response carefully, especially checking the isSuccess and isFailure flags to 
            determine the outcome of your request.
          </p>
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
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Body (urlencoded)</h4>
              <div className="space-y-2 text-sm">
                <div><strong>grant_type:</strong> client_credentials</div>
                <div><strong>client_Id:</strong> {"{{ClientId}}"}</div>
                <div><strong>client_Secret:</strong> {"{{ClientSecret}}"}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(accessTokenCode).map((lang) => (
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
                  onClick={() => copyToClipboard(accessTokenCode[activeLanguage], 'access-token')}
                  className="copy-button"
                >
                  {copiedCode === 'access-token' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{accessTokenCode[activeLanguage]}</code></pre>
              </div>
            </div>

            <div className="response-container mt-4">
              <div className="response-header">
                <span>Example Response</span>
                <span className="status-200">200 OK</span>
              </div>
              <div className="response-body">
                <CodeBlock language="json" code={accessTokenSuccessResponse} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Implementation Best Practices</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-emerald-900 mb-3">✅ Recommended Practices</h4>
              <ul className="text-sm text-emerald-800 space-y-2">
                <li>• Store client credentials securely in environment variables</li>
                <li>• Cache access tokens until expiry (36000 seconds)</li>
                <li>• Implement automatic token refresh logic</li>
                <li>• Check isSuccess flag before using access token</li>
                <li>• Handle authentication failures gracefully</li>
                <li>• Monitor token usage and expiration</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-amber-900 mb-3">⚠️ Important Considerations</h4>
              <ul className="text-sm text-amber-800 space-y-2">
                <li>• Tokens expire after 36000 seconds (10 hours)</li>
                <li>• Never expose client secrets in client-side code</li>
                <li>• Use HTTPS for all authentication requests</li>
                <li>• Validate isFailure flag for error handling</li>
                <li>• Store tokens securely and never log them</li>
                <li>• Different environments require different credentials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started CTA */}
      <div className="bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Ready to implement Merchant API?</h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Start integrating Merchant API capabilities into your application. Use merchant enquiry to retrieve 
            merchant information and the authentication endpoint to obtain access tokens for secure API access.
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