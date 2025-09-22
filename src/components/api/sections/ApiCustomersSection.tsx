import React from 'react';
import { Users, Copy, Check, ExternalLink } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';

export const ApiCustomersSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const createCustomerCode = {
    curl: `curl --location '{{GatewayBaseAddress}}/api/v1/customers' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {{access_token}}' \\
--data-raw '{
  "email": "customer@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+2348012345678"
}'`,
    nodejs: `const axios = require('axios');

async function createCustomer(accessToken, customerData) {
  const response = await axios.post('{{GatewayBaseAddress}}/api/v1/customers', {
    email: customerData.email,
    first_name: customerData.firstName,
    last_name: customerData.lastName,
    phone: customerData.phone
  }, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function createCustomer($accessToken, $customerData) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => '{{GatewayBaseAddress}}/api/v1/customers',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'email' => $customerData['email'],
        'first_name' => $customerData['first_name'],
        'last_name' => $customerData['last_name'],
        'phone' => $customerData['phone']
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

  const createCustomerResponse = `{
  "status": true,
  "message": "Customer created successfully",
  "data": {
    "id": 12345,
    "customer_code": "CUS_xnxdt6s1zg5f4hn",
    "email": "customer@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+2348012345678",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}`;

  const fetchCustomerCode = {
    curl: `curl --location '{{GatewayBaseAddress}}/api/v1/customers/{{customer_id}}' \\
--header 'Authorization: Bearer {{access_token}}'`,
    nodejs: `const axios = require('axios');

async function fetchCustomer(accessToken, customerId) {
  const response = await axios.get(
    \`{{GatewayBaseAddress}}/api/v1/customers/\${customerId}\`,
    {
      headers: {
        'Authorization': \`Bearer \${accessToken}\`
      }
    }
  );
  
  return response.data;
}`
  };

  return (
    <div className="api-full-width dense-content">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Customers</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          The Customers API allows you to create and manage customer profiles for your integration.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">On this page</h3>
        <div className="grid md:grid-cols-2 gap-2 text-xs">
          <a href="#create" className="text-blue-600 hover:text-blue-700 block py-1">Create Customer</a>
          <a href="#fetch" className="text-blue-600 hover:text-blue-700 block py-1">Fetch Customer</a>
          <a href="#list" className="text-blue-600 hover:text-blue-700 block py-1">List Customers</a>
          <a href="#update" className="text-blue-600 hover:text-blue-700 block py-1">Update Customer</a>
        </div>
      </div>

      {/* Create Customer */}
      <section id="create" className="endpoint-doc">
        <div className="endpoint-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="api-method post bg-green-100 text-green-800">POST</span>
              <span className="api-url-path">/api/v1/customers</span>
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
            Create a new customer profile that can be used for future transactions and payment tracking.
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
                    <td className="param-name">email</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Customer's email address (must be unique)</td>
                  </tr>
                  <tr>
                    <td className="param-name">first_name</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Customer's first name</td>
                  </tr>
                  <tr>
                    <td className="param-name">last_name</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Customer's last name</td>
                  </tr>
                  <tr>
                    <td className="param-name">phone</td>
                    <td className="param-type">string</td>
                    <td className="param-optional">optional</td>
                    <td>Customer's phone number (international format)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sticky-code">
              <div className="language-tabs">
                {Object.keys(createCustomerCode).map((lang) => (
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
                    onClick={() => copyToClipboard(createCustomerCode[activeLanguage], 'create-customer')}
                    className="copy-button"
                  >
                    {copiedCode === 'create-customer' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <pre><code>{createCustomerCode[activeLanguage]}</code></pre>
                </div>
              </div>

              <div className="response-container mt-4">
                <div className="response-header">
                  <span>Sample Response</span>
                  <span className="status-200">201 Created</span>
                </div>
                <div className="response-body">
                  <CodeBlock language="json" code={createCustomerResponse} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fetch Customer */}
      <section id="fetch" className="endpoint-doc">
        <div className="endpoint-header">
          <div className="flex items-center space-x-3">
            <span className="api-method get bg-blue-100 text-blue-800">GET</span>
            <span className="api-url-path">/api/v1/customers/:id</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Retrieve details of a specific customer using their ID or customer code.
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
                    <td className="param-type">string</td>
                    <td>Customer ID or customer code</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sticky-code">
              <div className="language-tabs">
                {Object.keys(fetchCustomerCode).map((lang) => (
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
                    onClick={() => copyToClipboard(fetchCustomerCode[activeLanguage], 'fetch-customer')}
                    className="copy-button"
                  >
                    {copiedCode === 'fetch-customer' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <pre><code>{fetchCustomerCode[activeLanguage]}</code></pre>
                </div>
              </div>

              <div className="response-container mt-4">
                <div className="response-header">
                  <span>Sample Response</span>
                  <span className="status-200">200 OK</span>
                </div>
                <div className="response-body">
                  <CodeBlock language="json" code={createCustomerResponse} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};