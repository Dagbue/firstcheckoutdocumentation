import React from 'react';
import { Code, Zap, Shield, Globe } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';

export const ApiIntroductionSection: React.FC = () => {
  const quickStartCode = `curl https://api.firstchekout.com/transaction/initialize \\
  -H "Authorization: Bearer YOUR_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "customer@email.com",
    "amount": "20000",
    "reference": "unique_transaction_ref"
  }'`;

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h1>
        <p className="text-lg text-gray-600">
          Learn how to integrate our APIs into your application.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">API Basics</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900">Before you begin!</h3>
          </div>
          <p className="text-blue-800 mb-4">
            You should create a free FirstChekout account that you can test the API against. 
            We will provide you with test keys that you can use to make API calls.
          </p>
          <a 
            href="https://www.firstchekout.com/auth/signup" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Create Account
          </a>
        </div>

        <p className="text-gray-700 mb-6">
          The FirstChekout API gives you access to pretty much all the features you can use on our dashboard 
          and lets you extend them for use in your application. It strives to be RESTful and is organized 
          around the main resources you would be interacting with - with a few notable exceptions.
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">HTTP Methods</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">POST</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">String</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Creates a new resource on the server.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GET</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">String</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Retrieves a representation of a resource.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PUT</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">String</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Updates an existing resource or creates it if it doesn't exist.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">DELETE</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">String</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Deletes a specified resource.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample Requests</h3>
          <p className="text-gray-600 mb-4">
            We provide sample API calls next to each method using cURL. All you need to do is insert your 
            specific parameters, and you can test the calls from the command line.
          </p>
          <CodeBlock language="bash" code={quickStartCode} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-emerald-600 mr-3" />
              <h3 className="text-lg font-semibold text-emerald-900">Secure by Default</h3>
            </div>
            <p className="text-emerald-800 text-sm">
              All API endpoints use HTTPS encryption and require proper authentication. 
              Your data is protected with bank-grade security.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-purple-900">Global Infrastructure</h3>
            </div>
            <p className="text-purple-800 text-sm">
              Our API is built on reliable cloud infrastructure with 99.9% uptime 
              and low-latency responses worldwide.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Base URLs</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700">Sandbox:</span>
              <code className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm">https://sandbox-api.firstchekout.com</code>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Live:</span>
              <code className="ml-2 px-2 py-1 bg-gray-200 rounded text-sm">https://api.firstchekout.com</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};