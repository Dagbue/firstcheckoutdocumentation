import React from 'react';
import { Building, Copy, Check, ExternalLink } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiVirtualAccountsSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const createVirtualAccountCode = {
    curl: `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/virtual-accounts' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "customer_id": "CUS_xnxdt6s1zg5f4hn",
  "preferred_bank": "first-bank",
  "account_name": "John Doe Virtual Account"
}'`,
    nodejs: `const axios = require('axios');

async function createVirtualAccount(accessToken, customerId, preferredBank) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/virtual-accounts', {
    customer_id: customerId,
    preferred_bank: preferredBank,
    account_name: "Customer Virtual Account"
  }, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`
  };

  const createVirtualAccountResponse = `{
  "status": true,
  "message": "Virtual account created successfully",
  "data": {
    "id": 67890,
    "account_number": "9876543210",
    "account_name": "John Doe Virtual Account",
    "bank_name": "First Bank of Nigeria",
    "bank_code": "011",
    "customer_id": "CUS_xnxdt6s1zg5f4hn",
    "is_active": true,
    "created_at": "2024-01-15T10:30:00Z"
  }
}`;

  return (
    <div className="api-full-width dense-content">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Virtual Accounts</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Virtual accounts allow you to generate dedicated account numbers for customers to make direct bank transfers.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">On this page</h3>
        <div className="grid md:grid-cols-2 gap-2 text-xs">
          <a href="#create" className="text-blue-600 hover:text-blue-700 block py-1">Create Virtual Account</a>
          <a href="#list" className="text-blue-600 hover:text-blue-700 block py-1">List Virtual Accounts</a>
        </div>
      </div>

      {/* Create Virtual Account */}
      <section id="create" className="endpoint-doc">
        <div className="endpoint-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="api-method post bg-green-100 text-green-800">POST</span>
              <span className="api-url-path">/api/v1/virtual-accounts</span>
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
            Create a dedicated virtual account number for a customer to receive direct bank transfers.
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
                    <td className="param-name">customer_id</td>
                    <td className="param-type">string</td>
                    <td className="param-required">required</td>
                    <td>Customer ID or customer code</td>
                  </tr>
                  <tr>
                    <td className="param-name">preferred_bank</td>
                    <td className="param-type">string</td>
                    <td className="param-optional">optional</td>
                    <td>Preferred bank for virtual account (default: first-bank)</td>
                  </tr>
                  <tr>
                    <td className="param-name">account_name</td>
                    <td className="param-type">string</td>
                    <td className="param-optional">optional</td>
                    <td>Custom account name (defaults to customer name)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sticky-code">
              <div className="language-tabs">
                {Object.keys(createVirtualAccountCode).map((lang) => (
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
                    onClick={() => copyToClipboard(createVirtualAccountCode[activeLanguage], 'create-virtual')}
                    className="copy-button"
                  >
                    {copiedCode === 'create-virtual' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="paystack-code-content">
                  <pre><code>{createVirtualAccountCode[activeLanguage]}</code></pre>
                </div>
              </div>

              <div className="response-container mt-4">
                <div className="response-header">
                  <span>Sample Response</span>
                  <span className="status-200">201 Created</span>
                </div>
                <div className="response-body">
                  <CodeBlock language="json" code={createVirtualAccountResponse} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};