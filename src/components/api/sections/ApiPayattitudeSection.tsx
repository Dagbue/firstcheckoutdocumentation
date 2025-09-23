import React from 'react';
import { Smartphone, Copy, Check, ExternalLink, Shield, Phone, MessageCircle } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiPayattitudeSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const initiatePayattitudeCode = {
    curl: `curl --location -g '{{GatewayBaseAddress}}/api/v1/payattitude' \\
--header 'authToken: {{Access-Token}}' \\
--data '{
    "TransactionReference": "{{transactionRef}}",
    "Description": "test",
    "PhoneNumber": "08139507763"
}'`,
    nodejs: `const axios = require('axios');

async function initiatePayWithPhoneNumber(transactionRef, description, phoneNumber, accessToken) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/payattitude', {
    TransactionReference: transactionRef,
    Description: description,
    PhoneNumber: phoneNumber
  }, {
    headers: {
      'authToken': accessToken,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function initiatePayWithPhoneNumber($transactionRef, $description, $phoneNumber, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/payattitude',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'TransactionReference' => $transactionRef,
        'Description' => $description,
        'PhoneNumber' => $phoneNumber
      ]),
      CURLOPT_HTTPHEADER => array(
        'authToken: ' . $accessToken,
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

def initiate_pay_with_phone_number(transaction_ref, description, phone_number, access_token):
    """Initiate payment using phone number through PAYATTITUDE"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/payattitude"
    
    payload = {
        "TransactionReference": transaction_ref,
        "Description": description,
        "PhoneNumber": phone_number
    }
    
    headers = {
        'authToken': access_token,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const payattitudeRequestBody = `{
    "TransactionReference": "TX-2CA09EBA0DA34F5B9B6D4BD0694A4B4C",
    "Description": "test",
    "PhoneNumber": "08139507763"
}`;

  const payattitudeSuccessResponse = `{
  "status": true,
  "message": "PAYATTITUDE payment initiated successfully",
  "data": {
    "transactionReference": "TX-2CA09EBA0DA34F5B9B6D4BD0694A4B4C",
    "description": "test",
    "phoneNumber": "08139507763",
    "status": "PENDING",
    "statusCode": "01",
    "statusMessage": "PENDING",
    "paymentInstructions": "Customer will receive SMS with payment instructions",
    "expiryTime": "2024-01-15T11:00:00Z"
  }
}`;

  const payattitudeErrorResponses = {
    badRequest: `{ "error": "Invalid phone number format." }`,
    unauthorized: `{ "error": "Unauthorized. Invalid or expired token." }`,
    conflict: `{ "error": "Transaction reference already exists." }`,
    serverError: `{ "error": "Internal server error. Please try again later." }`
  };

  const quickStartItems = [
    {
      title: 'Initiate Pay With Phone Number',
      description: 'Start a payment transaction using customer phone number',
      icon: Smartphone,
      color: 'blue',
      link: '#initiate',
      time: '1 minute'
    }
  ];

  return (
    <div className="max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">PAYATTITUDE</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          PAYATTITUDE allows customers to make payments using their phone numbers through the FirstChekout 
          Payment Gateway. This payment method provides a convenient way for customers to pay using their 
          mobile phone numbers linked to their bank accounts or mobile wallets.
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
        <div className="grid md:grid-cols-1 gap-2 text-xs">
          <a href="#initiate" className="text-blue-600 hover:text-blue-700 block py-1">Initiate Pay With Phone Number</a>
        </div>
      </div>

      {/* Quick Start Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick start</h2>
        <div className="grid md:grid-cols-1 gap-6">
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

      {/* Initiate Pay With Phone Number */}
      <section id="initiate" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Initiate Pay With Phone Number</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/payattitude
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This POST request initiates a payment using a phone number through the FirstChekout Payment Gateway API.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Headers</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">authToken</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      A JWT token required for authentication and authorization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Body Parameters</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">TransactionReference</span>
                    <div className="text-xs text-gray-500 mt-1">(string, required)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      A unique reference ID for the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">"TX-2CA09EBA0DA34F5B9B6D4BD0694A4B4C"</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">Description</span>
                    <div className="text-xs text-gray-500 mt-1">(string, required)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      A brief description of the payment.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">"test"</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">PhoneNumber</span>
                    <div className="text-xs text-gray-500 mt-1">(string, required)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The phone number to which the payment is to be made.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">"08139507763"</code>
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
              <span>Ensure the <strong>authToken</strong> is valid and not expired.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The <strong>TransactionReference</strong> should be unique for each payment to avoid duplication.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The phone number should be in the correct format as expected by the API.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>This request is part of the 'FirstChekout Payment Gateway' collection for payment processing workflows.</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Expected Responses</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-2">Success (200 OK)</span>
                <span className="text-gray-700">The PAYATTITUDE payment is successfully initiated, and the response contains transaction details.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">400 Bad Request</span>
                <span className="text-gray-700">Missing or invalid parameters.</span>
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
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">409 Conflict</span>
                <span className="text-gray-700">Transaction conflicts.</span>
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

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Details</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                <span>This endpoint is a POST request to <code className="bg-blue-100 px-2 py-1 rounded text-sm">{"{{GatewayBaseAddress}}"}/api/v1/payattitude</code>.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                <span>Use this request to start the PAYATTITUDE payment process by providing a unique transaction reference and valid authentication.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                <span>Proper error handling is recommended to manage different failure scenarios effectively.</span>
              </li>
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

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Body (raw json)</h4>
              <CodeBlock language="json" code={payattitudeRequestBody} />
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(initiatePayattitudeCode).map((lang) => (
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
                  onClick={() => copyToClipboard(initiatePayattitudeCode[activeLanguage], 'initiate-payattitude')}
                  className="copy-button"
                >
                  {copiedCode === 'initiate-payattitude' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{initiatePayattitudeCode[activeLanguage]}</code></pre>
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

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample Response Examples</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-2">200 OK</span>
                <span className="text-gray-700">PAYATTITUDE payment initiated successfully.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={payattitudeSuccessResponse} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">400 Bad Request</span>
                <span className="text-gray-700">Invalid phone number format or missing parameters.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={payattitudeErrorResponses.badRequest} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">401 Unauthorized</span>
                <span className="text-gray-700">Authentication failed or token missing/expired.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={payattitudeErrorResponses.unauthorized} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">409 Conflict</span>
                <span className="text-gray-700">Transaction reference already exists.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={payattitudeErrorResponses.conflict} />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">500 Internal Server Error</span>
                <span className="text-gray-700">Unexpected server error.</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Sample Response:</h5>
                <CodeBlock language="json" code={payattitudeErrorResponses.serverError} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">PAYATTITUDE Payment Process</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-emerald-900 mb-3">📱 How PAYATTITUDE Works</h4>
              <ul className="text-sm text-emerald-800 space-y-2">
                <li>• Customer provides their phone number for payment</li>
                <li>• System initiates payment request to linked account</li>
                <li>• Customer receives SMS with payment instructions</li>
                <li>• Customer confirms payment through mobile banking</li>
                <li>• Payment completed and merchant notified</li>
                <li>• Real-time status updates via webhooks</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">💡 Customer Experience</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Simple phone number entry</li>
                <li>• No card details required</li>
                <li>• SMS-based payment instructions</li>
                <li>• Secure mobile banking authentication</li>
                <li>• Instant payment confirmation</li>
                <li>• Works with all Nigerian mobile networks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Implementation Best Practices</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-emerald-900 mb-3">✅ Recommended Practices</h4>
              <ul className="text-sm text-emerald-800 space-y-2">
                <li>• Validate phone number format before API call</li>
                <li>• Provide clear instructions to customers</li>
                <li>• Implement real-time status polling</li>
                <li>• Set up webhooks for payment notifications</li>
                <li>• Handle payment timeouts gracefully</li>
                <li>• Test with various phone number formats</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-amber-900 mb-3">⚠️ Important Considerations</h4>
              <ul className="text-sm text-amber-800 space-y-2">
                <li>• Phone numbers must be linked to active bank accounts</li>
                <li>• Customer must have mobile banking enabled</li>
                <li>• SMS delivery depends on network availability</li>
                <li>• Payment completion requires customer action</li>
                <li>• Consider fallback payment methods</li>
                <li>• Monitor success rates by network provider</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started CTA */}
      <div className="bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Ready to implement PAYATTITUDE payments?</h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Start integrating PAYATTITUDE payment capabilities into your application. PAYATTITUDE provides a 
            convenient phone number-based payment method that's familiar to Nigerian customers and works 
            across all major mobile networks.
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