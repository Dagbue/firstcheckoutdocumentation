import React from 'react';
import { Code, Zap, Shield, Globe, CheckCircle, ArrowRight, ExternalLink, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiIntroductionSection: React.FC = () => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const quickStartCode = `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "Amount": 10000,
  "PayerEmail": "thomas.edison@outlook.com",
  "PayerName": "Thomas Edison",
  "Purpose": "Product Purchase",
  "PublicKey": "sb-pk-mVa4TcjuSqTSiyyxjEF1Bc1EbZ29yE45Y3K",
  "PaymentReference": "FjWnMSUZajh1k224lXks39728874560476"
}'`;

  const responseFormat = `{
  "status": "[boolean]",
  "message": "[string]",
  "data": "[object]"
}`;

  const metaStructure = `{
  "meta": {
    "total": 2,
    "skipped": 0,
    "perPage": 50,
    "page": 1,
    "pageCount": 1
  }
}`;

  const quickStartItems = [
    {
      title: 'Accept Payments',
      description: 'Collect payments from cards, bank accounts, and mobile money',
      icon: Code,
      color: 'blue',
      link: '/transactions',
      time: '5 minutes'
    },
    {
      title: 'USSD Payments',
      description: 'Enable mobile banking payments via USSD codes',
      icon: Shield,
      color: 'emerald',
      link: '/ussd',
      time: '3 minutes'
    },
    {
      title: 'Card Processing',
      description: 'Secure card payments with 3D authentication',
      icon: Globe,
      color: 'purple',
      link: '/card',
      time: '10 minutes'
    },
    {
      title: 'Bank Transfers',
      description: 'Virtual account generation for direct transfers',
      icon: Zap,
      color: 'amber',
      link: '/transfer',
      time: '5 minutes'
    }
  ];

  return (
    <div className="max-w-none">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          Learn how to integrate our APIs into your application. The FirstChekout API gives you access to 
          pretty much all the features you can use on our dashboard and lets you extend them for use in your application.
        </p>
      </div>

      {/* API Basics Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">API Basics</h2>
        
        {/* Before You Begin */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Before you begin!</h3>
              <p className="text-blue-800 mb-4 leading-relaxed">
                You should create a free FirstChekout account that you can test the API against. 
                We will provide you with test keys that you can use to make API calls.
              </p>
              <a 
                href="https://www.firstchekout.com/auth/signup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Create a free FirstChekout account
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The FirstChekout API strives to be RESTful and is organized around the main resources you would be 
              interacting with - with a few notable exceptions.
            </p>

            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-emerald-600 mr-2" />
                  <h4 className="text-sm font-semibold text-emerald-900">Secure by Default</h4>
                </div>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  All API endpoints use HTTPS encryption and require proper authentication. 
                  Your data is protected with bank-grade security.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Globe className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="text-sm font-semibold text-purple-900">Nigerian Market Focus</h4>
                </div>
                <p className="text-sm text-purple-800 leading-relaxed">
                  Built specifically for Nigerian businesses with support for local payment methods 
                  including USSD, bank transfers, and local cards.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Code className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="text-sm font-semibold text-blue-900">Developer Friendly</h4>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">
                  RESTful APIs with comprehensive documentation, code samples, 
                  and interactive testing capabilities.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Base URLs</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Sandbox</span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Testing</span>
                </div>
                <code className="text-sm text-blue-600 break-all">{API_CONFIG.gatewayBaseAddress}</code>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Identity Service</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">OAuth</span>
                </div>
                <code className="text-sm text-blue-600 break-all">{API_CONFIG.identityServiceUrl}</code>
              </div>
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-amber-900 mb-2">Supported Currency</h4>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full font-medium">NGN</span>
                <span className="text-sm text-amber-800">Nigerian Naira (₦)</span>
              </div>
              <p className="text-xs text-amber-700 mt-2">
                All amounts are specified in Naira. Minimum transaction amount is ₦1.00 (100 kobo).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick start</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {quickStartItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
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
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-bank-blue group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sample Requests Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sample Requests</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We provide sample API calls next to each method using cURL. All you need to do is insert your 
              specific parameters, and you can test the calls from the command line.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              You can also <a href="https://www.postman.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">use Postman</a> if you aren't familiar with cURL. Postman is 
              an easy to use API development and testing platform. You can explore the{' '}
              <a 
                href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                FirstChekout Postman Collection
              </a>{' '}
              to understand how our APIs work.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">Quick Start Steps</h4>
              <ol className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">1</span>
                  <span>Get your API credentials from the merchant dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">2</span>
                  <span>Generate an OAuth access token using your credentials</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">3</span>
                  <span>Make your first API call to initialize a transaction</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">4</span>
                  <span>Test the payment flow in sandbox mode</span>
                </li>
              </ol>
            </div>
          </div>

          <div>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <span className="text-gray-300 text-sm font-medium">Initialize Transaction</span>
                <button
                  onClick={() => copyToClipboard(quickStartCode, 'quick-start')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'quick-start' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4">
                <pre className="text-sm text-gray-100 overflow-x-auto">
                  <code>{quickStartCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requests and Responses Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Requests and Responses</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Both request body data and response data are formatted as JSON. 
              Content type for responses will always be <code className="bg-gray-100 px-2 py-1 rounded text-sm">application/json</code>. 
              Generally, all responses will be in the following format:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">Keys</h3>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">status</span>
                    <div className="text-xs text-gray-500 mt-1">boolean</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This lets you know if your request was successful or not. 
                      We recommend that you use this in combination with 
                      HTTP status codes to determine the result of an API call.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">message</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This is a summary of the response and its status. For 
                      instance when trying to retrieve a list of customers, 
                      message might read "Customers retrieved". In the 
                      event of an error, the message key will contain a 
                      description of the error as with the authorization 
                      header situation above. This is the only key that is 
                      universal across requests.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">data</span>
                    <div className="text-xs text-gray-500 mt-1">object</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This contain the results of your request. It can either be 
                      an object, or an array depending on the request made. 
                      For instance, a request to retrieve a single customer 
                      will return a customer object in the data key, while the 
                      key would be an array of customers if a list is 
                      requested.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
                  <span className="text-gray-300 text-sm font-medium">Response Format</span>
                </div>
                <div className="p-4">
                  <pre className="text-sm text-gray-100">
                    <code>{responseFormat}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Object Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Meta Object</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The meta key is used to provide context for the contents of the data 
              key. For instance, if a list of transactions performed by a customer is 
              being retrieved, pagination parameters can be passed along to limit 
              the result set. The meta key will then contain an object with the 
              following attributes:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Keys</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-20">
                  <span className="text-sm font-semibold text-gray-900">total</span>
                  <div className="text-xs text-gray-500 mt-1">number</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    This is the total number of transactions that were 
                    performed by the customer.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-20">
                  <span className="text-sm font-semibold text-gray-900">skipped</span>
                  <div className="text-xs text-gray-500 mt-1">number</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    This is the number of records skipped before the first 
                    record in the array returned.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-20">
                  <span className="text-sm font-semibold text-gray-900">perPage</span>
                  <div className="text-xs text-gray-500 mt-1">number</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    This is the maximum number of records that will be 
                    returned per request. This can be modified by 
                    passing a new value as a <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">perPage</code> query parameter. 
                    <strong>Default: 50</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-20">
                  <span className="text-sm font-semibold text-gray-900">page</span>
                  <div className="text-xs text-gray-500 mt-1">number</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    This is the current page being returned. This is 
                    dependent on what page was requested using the{' '}
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">page</code> query parameter. <strong>Default: 1</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-20">
                  <span className="text-sm font-semibold text-gray-900">pageCount</span>
                  <div className="text-xs text-gray-500 mt-1">number</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    This is how many pages in total are available for 
                    retrieval considering the maximum records per page.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
                <span className="text-gray-300 text-sm font-medium">Meta Key Structure</span>
              </div>
              <div className="p-4">
                <pre className="text-sm text-gray-100">
                  <code>{metaStructure}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HTTP Methods */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">HTTP Methods</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">POST</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">String</td>
                <td className="px-6 py-4 text-sm text-gray-700">Creates a new resource on the server.</td>
              </tr>
              <tr>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">GET</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">String</td>
                <td className="px-6 py-4 text-sm text-gray-700">Retrieves a representation of a resource.</td>
              </tr>
              <tr>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded font-medium">PUT</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">String</td>
                <td className="px-6 py-4 text-sm text-gray-700">Updates an existing resource or creates it if it doesn't exist.</td>
              </tr>
              <tr>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded font-medium">DELETE</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">String</td>
                <td className="px-6 py-4 text-sm text-gray-700">Deletes a specified resource.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Getting Started CTA */}
      <div className="bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Ready to start building?</h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Create your free FirstChekout account and get your API keys to start accepting payments 
            in minutes. Our comprehensive documentation and support team will help you every step of the way.
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
            <Link
              to="/authentication"
              className="inline-flex items-center justify-center px-6 py-3 bg-bank-gold text-white rounded-lg hover:bg-bank-gold/90 transition-colors font-semibold"
            >
              <Code className="mr-2 h-4 w-4" />
              View Authentication Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};