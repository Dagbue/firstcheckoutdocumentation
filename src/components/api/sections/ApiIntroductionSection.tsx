import React from 'react';
import { Code, Zap, Shield, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiIntroductionSection: React.FC = () => {
  const quickStartCode = `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "Amount": 100,
  "PayerEmail": "thomas.edison@outlook.com",
  "PayerName": "Thomas Edison",
  "Purpose": "UAT",
  "PublicKey": "sb-pk-mVa4TcjuSqTSiyyxjEF1Bc1EbZ29yE45Y3K",
  "PaymentReference": "FjWnMSUZajh1k224lXks39728874560476"
}'`;

  const quickStartItems = [
    {
      title: 'Accept Payments',
      description: 'Collect payments from cards, bank accounts, and mobile money',
      icon: Code,
      color: 'blue',
      link: '/api/transactions',
      time: '5 minutes'
    },
    {
      title: 'USSD Payments',
      description: 'Enable mobile banking payments via USSD codes',
      icon: Shield,
      color: 'emerald',
      link: '/api/ussd',
      time: '3 minutes'
    },
    {
      title: 'Card Processing',
      description: 'Secure card payments with 3D authentication',
      icon: Globe,
      color: 'purple',
      link: '/api/card',
      time: '10 minutes'
    },
    {
      title: 'Bank Transfers',
      description: 'Virtual account generation for direct transfers',
      icon: Zap,
      color: 'amber',
      link: '/api/transfer',
      time: '5 minutes'
    }
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">FirstChekout Payment Gateway</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Learn how to integrate our APIs into your application. The FirstChekout API gives you access to 
          pretty much all the features you can use on our dashboard and lets you extend them for use in your application.
        </p>
      </div>

      {/* Quick Start Cards */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick start</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {quickStartItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group relative bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 info-card"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 bg-${item.color}-100 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                  <item.icon className={`h-4 w-4 text-${item.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-bank-blue transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-bank-blue group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Before You Begin */}
      <div className="mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
              <Zap className="h-3 w-3 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-blue-900">Before you begin!</h3>
          </div>
          <p className="text-xs text-blue-800 mb-3 leading-relaxed">
            You should create a free FirstChekout account that you can test the API against. 
            We will provide you with test keys that you can use to make API calls.
          </p>
          <a 
            href="https://www.firstchekout.com/auth/signup" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-medium"
          >
            Create Account
          </a>
        </div>

        <p className="text-xs text-gray-700 mb-4 leading-relaxed">
          The FirstChekout API strives to be RESTful and is organized around the main resources you would be 
          interacting with - with a few notable exceptions.
        </p>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Sample Requests</h3>
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            We provide sample API calls next to each method using cURL. All you need to do is insert your 
            specific parameters, and you can test the calls from the command line.
          </p>
          <CodeBlock language="bash" code={quickStartCode} />
        </div>
      </div>

      {/* HTTP Methods */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">HTTP Methods</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg api-parameter-table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-xs font-medium text-gray-900">POST</td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">String</td>
                <td className="px-4 py-2 text-xs text-gray-500">Creates a new resource on the server.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-xs font-medium text-gray-900">GET</td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">String</td>
                <td className="px-4 py-2 text-xs text-gray-500">Retrieves a representation of a resource.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-xs font-medium text-gray-900">PUT</td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">String</td>
                <td className="px-4 py-2 text-xs text-gray-500">Updates an existing resource or creates it if it doesn't exist.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-xs font-medium text-gray-900">DELETE</td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">String</td>
                <td className="px-4 py-2 text-xs text-gray-500">Deletes a specified resource.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 info-card">
          <div className="flex items-center mb-3">
            <Shield className="h-4 w-4 text-emerald-600 mr-2" />
            <h3 className="text-sm font-semibold text-emerald-900">Secure by Default</h3>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed">
            All API endpoints use HTTPS encryption and require proper authentication. 
            Your data is protected with bank-grade security.
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 info-card">
          <div className="flex items-center mb-3">
            <Globe className="h-4 w-4 text-purple-600 mr-2" />
            <h3 className="text-sm font-semibold text-purple-900">Global Infrastructure</h3>
          </div>
          <p className="text-xs text-purple-800 leading-relaxed">
            Our API is built on reliable cloud infrastructure with 99.9% uptime 
            and low-latency responses worldwide.
          </p>
        </div>
      </div>

      {/* Base URLs */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Base URLs</h3>
        <div className="space-y-2">
          <div>
            <span className="text-xs font-medium text-gray-700">Sandbox:</span>
            <code className="ml-2 px-2 py-0.5 bg-gray-200 rounded text-xs">{API_CONFIG.gatewayBaseAddress}</code>
          </div>
          <div>
            <span className="text-xs font-medium text-gray-700">Live:</span>
            <code className="ml-2 px-2 py-0.5 bg-gray-200 rounded text-xs">{API_CONFIG.gatewayBaseAddress}</code>
          </div>
          <div>
            <span className="text-xs font-medium text-gray-700">Identity:</span>
            <code className="ml-2 px-2 py-0.5 bg-gray-200 rounded text-xs">{API_CONFIG.identityServiceUrl}</code>
          </div>
        </div>
      </div>
    </div>
  );
};