import React from 'react';
import { CreditCard, CheckCircle, List } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';

export const ApiTransactionsSection: React.FC = () => {
  const initializeCode = `curl -X POST https://api.firstchekout.com/transaction/initialize \\
  -H "Authorization: Bearer sk_test_your_secret_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "customer@email.com",
    "amount": "20000",
    "reference": "unique_transaction_ref",
    "callback_url": "https://yoursite.com/callback"
  }'`;

  const verifyCode = `curl -X GET https://api.firstchekout.com/transaction/verify/unique_transaction_ref \\
  -H "Authorization: Bearer sk_test_your_secret_key"`;

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Transactions</h1>
        <p className="text-lg text-gray-600">
          The Transactions API allows you create and manage payments on your integration.
        </p>
      </div>

      <div className="mb-12">
        <div className="mb-12" id="initialize">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
              <CreditCard className="h-5 w-5 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Initialize Transaction</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            Initialize a transaction from your backend
          </p>

          <div className="bg-gray-900 rounded-lg mb-6">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded font-medium">POST</span>
                <span className="text-gray-300 font-mono text-sm">/transaction/initialize</span>
              </div>
              <button className="text-gray-400 hover:text-white text-sm">Copy</button>
            </div>
            <div className="p-4">
              <CodeBlock language="bash" code={initializeCode} />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Headers</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">authorization</span>
                <span className="ml-4 text-sm text-gray-500">string</span>
                <p className="text-sm text-gray-600 mt-1">Set value to <code>Bearer SECRET_KEY</code></p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">content-type</span>
                <span className="ml-4 text-sm text-gray-500">string</span>
                <p className="text-sm text-gray-600 mt-1">Set value to <code>application/json</code></p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Body Parameters</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">email</td>
                    <td className="px-4 py-3 text-sm text-gray-500">string</td>
                    <td className="px-4 py-3 text-sm text-green-600">Yes</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Customer's email address</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">amount</td>
                    <td className="px-4 py-3 text-sm text-gray-500">string</td>
                    <td className="px-4 py-3 text-sm text-green-600">Yes</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Amount in kobo</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">reference</td>
                    <td className="px-4 py-3 text-sm text-gray-500">string</td>
                    <td className="px-4 py-3 text-sm text-gray-500">No</td>
                    <td className="px-4 py-3 text-sm text-gray-500">Unique transaction reference</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Sample Response</h4>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">200 Ok</span>
            </div>
            <CodeBlock language="json" code={`{
  "status": true,
  "message": "Authorization URL created",
  "data": {
    "authorization_url": "https://checkout.firstchekout.com/pay/abc123",
    "access_code": "abc123",
    "reference": "unique_transaction_ref"
  }
}`} />
          </div>
        </div>

        <div className="mb-12" id="verify">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Verify Transaction</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            Confirm the status of a transaction
          </p>

          <div className="bg-gray-900 rounded-lg mb-6">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded font-medium">GET</span>
                <span className="text-gray-300 font-mono text-sm">/transaction/verify/:reference</span>
              </div>
              <button className="text-gray-400 hover:text-white text-sm">Copy</button>
            </div>
            <div className="p-4">
              <CodeBlock language="bash" code={verifyCode} />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Sample Response</h4>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">200 Ok</span>
            </div>
            <CodeBlock language="json" code={`{
  "status": true,
  "message": "Verification successful",
  "data": {
    "id": 123456,
    "domain": "test",
    "status": "success",
    "reference": "unique_transaction_ref",
    "amount": 20000,
    "gateway_response": "Successful",
    "paid_at": "2023-01-01T12:00:00.000Z",
    "created_at": "2023-01-01T11:30:00.000Z",
    "channel": "card",
    "currency": "NGN",
    "customer": {
      "id": 789,
      "email": "customer@email.com"
    }
  }
}`} />
          </div>
        </div>

        <div className="mb-12" id="list">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <List className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">List Transactions</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            List transactions carried out on your integration
          </p>

          <div className="bg-gray-900 rounded-lg mb-6">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded font-medium">GET</span>
                <span className="text-gray-300 font-mono text-sm">/transaction</span>
              </div>
              <button className="text-gray-400 hover:text-white text-sm">Copy</button>
            </div>
            <div className="p-4">
              <CodeBlock language="bash" code={`curl -X GET https://api.firstchekout.com/transaction \\
  -H "Authorization: Bearer sk_test_your_secret_key"`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};