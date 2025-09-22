import React from 'react';
import { AlertCircle, XCircle, AlertTriangle } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';

export const ApiErrorsSection: React.FC = () => {
  const errorResponse = `{
  "status": false,
  "message": "Invalid email address",
  "code": "INVALID_EMAIL",
  "errors": {
    "email": [
      "The email field must be a valid email address."
    ]
  }
}`;

  const errorCodes = [
    {
      code: 'INVALID_EMAIL',
      status: 400,
      description: 'The email address provided is not valid',
      type: 'validation'
    },
    {
      code: 'INSUFFICIENT_FUNDS',
      status: 402,
      description: 'Customer account has insufficient funds',
      type: 'payment'
    },
    {
      code: 'UNAUTHORIZED',
      status: 401,
      description: 'Invalid or missing API key',
      type: 'authentication'
    },
    {
      code: 'NOT_FOUND',
      status: 404,
      description: 'The requested resource was not found',
      type: 'client'
    },
    {
      code: 'RATE_LIMITED',
      status: 429,
      description: 'Too many requests in a short period',
      type: 'rate_limit'
    },
    {
      code: 'SERVER_ERROR',
      status: 500,
      description: 'An internal server error occurred',
      type: 'server'
    }
  ];

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600 bg-green-100';
    if (status >= 400 && status < 500) return 'text-red-600 bg-red-100';
    if (status >= 500) return 'text-purple-600 bg-purple-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'validation':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'authentication':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'server':
        return <AlertCircle className="h-4 w-4 text-purple-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Errors</h1>
        <p className="text-lg text-gray-600">
          Understanding error responses and how to handle them.
        </p>
      </div>

      <div className="mb-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Response Format</h2>
          <p className="text-gray-700 mb-6">
            FirstChekout uses conventional HTTP response codes to indicate the success or failure of an API request. 
            In general: Codes in the 2xx range indicate success. Codes in the 4xx range indicate an error that 
            failed given the information provided. Codes in the 5xx range indicate an error with our servers.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Error Response</h3>
            <CodeBlock language="json" code={errorResponse} />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                <h4 className="font-semibold text-red-900">4xx Client Errors</h4>
              </div>
              <p className="text-red-800 text-sm">
                These errors are typically caused by invalid requests, missing parameters, 
                or authentication issues.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <AlertCircle className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-semibold text-purple-900">5xx Server Errors</h4>
              </div>
              <p className="text-purple-800 text-sm">
                These errors indicate a problem with our servers. They are rare and 
                usually temporary.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                <h4 className="font-semibold text-amber-900">Validation Errors</h4>
              </div>
              <p className="text-amber-800 text-sm">
                These errors provide detailed information about which fields 
                failed validation and why.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Error Codes</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {errorCodes.map((error, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">{error.code}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(error.status)}`}>
                        {error.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {getTypeIcon(error.type)}
                        <span className="ml-2 text-sm text-gray-600 capitalize">{error.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{error.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Error Handling Best Practices</h3>
          <ul className="text-blue-800 text-sm space-y-2">
            <li>• Always check the HTTP status code first</li>
            <li>• Parse the error response to get detailed error information</li>
            <li>• Implement retry logic for 5xx server errors</li>
            <li>• Log errors for debugging and monitoring</li>
            <li>• Provide user-friendly error messages to your customers</li>
            <li>• Handle rate limiting by implementing exponential backoff</li>
          </ul>
        </div>
      </div>
    </div>
  );
};