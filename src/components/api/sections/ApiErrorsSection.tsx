import React from 'react';
import { AlertCircle, XCircle, AlertTriangle, Copy, Check, ExternalLink, Shield, Code, Bug } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';

export const ApiErrorsSection: React.FC = () => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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

  const validationErrorResponse = `{
  "status": false,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "errors": {
    "Amount": [
      "The Amount field is required.",
      "The Amount must be at least 100."
    ],
    "PayerEmail": [
      "The PayerEmail field must be a valid email address."
    ],
    "PaymentReference": [
      "The PaymentReference field is required.",
      "The PaymentReference must be unique."
    ]
  }
}`;

  const authErrorResponse = `{
  "status": false,
  "message": "Unauthorized access",
  "code": "UNAUTHORIZED",
  "details": {
    "reason": "Invalid or expired access token",
    "suggestion": "Generate a new access token using your client credentials"
  }
}`;

  const errorHandlingCode = `// Error handling implementation
async function handleApiCall() {
  try {
    const response = await fetch('/api/v1/transactions/initiate', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${accessToken}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle different error types
      switch (response.status) {
        case 400:
          handleValidationError(result);
          break;
        case 401:
          handleAuthenticationError(result);
          break;
        case 429:
          handleRateLimitError(result);
          break;
        case 500:
          handleServerError(result);
          break;
        default:
          handleGenericError(result);
      }
      return;
    }

    // Success handling
    handleSuccess(result);
    
  } catch (error) {
    console.error('Network error:', error);
    handleNetworkError(error);
  }
}

function handleValidationError(errorResponse) {
  console.log('Validation failed:', errorResponse.message);
  
  // Display field-specific errors
  if (errorResponse.errors) {
    Object.keys(errorResponse.errors).forEach(field => {
      const fieldErrors = errorResponse.errors[field];
      console.log(\`\${field}: \${fieldErrors.join(', ')}\`);
    });
  }
}

function handleAuthenticationError(errorResponse) {
  console.log('Authentication failed:', errorResponse.message);
  // Regenerate access token
  refreshAccessToken();
}`;

  const errorCodes = [
    {
      code: 'INVALID_EMAIL',
      status: 400,
      description: 'The email address provided is not valid',
      type: 'Validation Error',
      solution: 'Ensure the email follows the format: user@domain.com'
    },
    {
      code: 'INSUFFICIENT_FUNDS',
      status: 402,
      description: 'Customer account has insufficient funds for the transaction',
      type: 'Payment Error',
      solution: 'Ask customer to check account balance or use different payment method'
    },
    {
      code: 'UNAUTHORIZED',
      status: 401,
      description: 'Invalid or missing access token',
      type: 'Authentication Error',
      solution: 'Generate a new access token using your client credentials'
    },
    {
      code: 'FORBIDDEN',
      status: 403,
      description: 'Valid token but insufficient permissions',
      type: 'Authorization Error',
      solution: 'Check your account status and API key permissions'
    },
    {
      code: 'NOT_FOUND',
      status: 404,
      description: 'The requested resource was not found',
      type: 'Client Error',
      solution: 'Verify the endpoint URL and resource identifier'
    },
    {
      code: 'DUPLICATE_REFERENCE',
      status: 409,
      description: 'Payment reference already exists',
      type: 'Validation Error',
      solution: 'Use a unique payment reference for each transaction'
    },
    {
      code: 'RATE_LIMITED',
      status: 429,
      description: 'Too many requests in a short period',
      type: 'Rate Limit Error',
      solution: 'Implement exponential backoff and respect rate limits'
    },
    {
      code: 'SERVER_ERROR',
      status: 500,
      description: 'An internal server error occurred',
      type: 'Server Error',
      solution: 'Retry the request after a short delay. Contact support if persistent'
    }
  ];

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-green-100 text-green-800';
    if (status >= 400 && status < 500) return 'bg-red-100 text-red-800';
    if (status >= 500) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Validation Error': 'bg-amber-100 text-amber-800',
      'Authentication Error': 'bg-red-100 text-red-800',
      'Authorization Error': 'bg-orange-100 text-orange-800',
      'Payment Error': 'bg-blue-100 text-blue-800',
      'Client Error': 'bg-gray-100 text-gray-800',
      'Rate Limit Error': 'bg-purple-100 text-purple-800',
      'Server Error': 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Errors</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          Understanding error responses and how to handle them effectively in your FirstChekout integration.
        </p>
      </div>

      {/* Error Basics */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Error Response Format</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              FirstChekout uses conventional HTTP response codes to indicate the success or failure of an API request. 
              In general: Codes in the 2xx range indicate success. Codes in the 4xx range indicate an error that 
              failed given the information provided. Codes in the 5xx range indicate an error with our servers.
            </p>

            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <XCircle className="h-5 w-5 text-red-600 mr-2" />
                  <h4 className="text-sm font-semibold text-red-900">4xx Client Errors</h4>
                </div>
                <p className="text-sm text-red-800 leading-relaxed">
                  These errors are typically caused by invalid requests, missing parameters, 
                  or authentication issues.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="text-sm font-semibold text-purple-900">5xx Server Errors</h4>
                </div>
                <p className="text-sm text-purple-800 leading-relaxed">
                  These errors indicate a problem with our servers. They are rare and 
                  usually temporary.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                  <h4 className="text-sm font-semibold text-amber-900">Validation Errors</h4>
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  These errors provide detailed information about which fields 
                  failed validation and why.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="paystack-code-block">
              <div className="paystack-code-header">
                <span className="text-sm font-medium">Standard Error Response</span>
                <button
                  onClick={() => copyToClipboard(errorResponse, 'error-response')}
                  className="copy-button"
                >
                  {copiedCode === 'error-response' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <CodeBlock language="json" code={errorResponse} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Structure */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Response Structure</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              All error responses follow a consistent structure to help you identify and handle different types of errors effectively.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Keys</h3>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">status</span>
                    <div className="text-xs text-gray-500 mt-1">boolean</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Always <code className="bg-gray-100 px-2 py-1 rounded text-sm">false</code> for error responses. 
                      Use this in combination with HTTP status codes to determine the result.
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
                      Human-readable description of the error. This message can be displayed 
                      to users or used for debugging purposes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">code</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Machine-readable error code that can be used for programmatic error handling 
                      and specific error type identification.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">errors</span>
                    <div className="text-xs text-gray-500 mt-1">object</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Field-specific validation errors. Each key represents a field name, 
                      and the value is an array of error messages for that field.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="paystack-code-block">
              <div className="paystack-code-header">
                <span className="text-sm font-medium">Validation Error Example</span>
                <button
                  onClick={() => copyToClipboard(validationErrorResponse, 'validation-error')}
                  className="copy-button"
                >
                  {copiedCode === 'validation-error' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <CodeBlock language="json" code={validationErrorResponse} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HTTP Status Codes */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">HTTP Status Codes</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              FirstChekout uses standard HTTP status codes to indicate the success or failure of requests. 
              Here are the most common status codes you'll encounter:
            </p>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-medium">2xx</span>
                  <h4 className="ml-2 text-sm font-semibold text-green-900">Success</h4>
                </div>
                <p className="text-sm text-green-800 leading-relaxed">
                  The request was successful. The response body contains the requested data.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded font-medium">4xx</span>
                  <h4 className="ml-2 text-sm font-semibold text-red-900">Client Error</h4>
                </div>
                <p className="text-sm text-red-800 leading-relaxed">
                  There was an error with the request. Check the error message and fix the issue.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded font-medium">5xx</span>
                  <h4 className="ml-2 text-sm font-semibold text-purple-900">Server Error</h4>
                </div>
                <p className="text-sm text-purple-800 leading-relaxed">
                  Something went wrong on our end. These are rare and usually temporary.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="paystack-code-block">
              <div className="paystack-code-header">
                <span className="text-sm font-medium">Authentication Error Example</span>
                <button
                  onClick={() => copyToClipboard(authErrorResponse, 'auth-error')}
                  className="copy-button"
                >
                  {copiedCode === 'auth-error' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <CodeBlock language="json" code={authErrorResponse} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Error Codes */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Error Codes</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Code</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Solution</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {errorCodes.map((error, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">{error.code}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded font-medium ${getStatusColor(error.status)}`}>
                      {error.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded font-medium ${getTypeColor(error.type)}`}>
                      {error.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{error.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{error.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Error Handling Implementation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Error Handling Implementation</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Implement robust error handling in your application to provide a smooth user experience 
              and help with debugging. Here's a comprehensive example of how to handle different error types:
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Code className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="text-sm font-semibold text-blue-900">Error Handling Strategy</h4>
                </div>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Check HTTP status codes first</li>
                  <li>• Parse error response for detailed information</li>
                  <li>• Implement retry logic for server errors</li>
                  <li>• Provide user-friendly error messages</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-emerald-600 mr-2" />
                  <h4 className="text-sm font-semibold text-emerald-900">Best Practices</h4>
                </div>
                <ul className="text-sm text-emerald-800 space-y-1">
                  <li>• Log errors for debugging and monitoring</li>
                  <li>• Handle rate limiting with exponential backoff</li>
                  <li>• Validate input before making API calls</li>
                  <li>• Implement proper timeout handling</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="paystack-code-block">
              <div className="paystack-code-header">
                <span className="text-sm font-medium">Error Handling Implementation</span>
                <button
                  onClick={() => copyToClipboard(errorHandlingCode, 'error-handling')}
                  className="copy-button"
                >
                  {copiedCode === 'error-handling' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <CodeBlock language="javascript" code={errorHandlingCode} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Error Categories</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-red-900">Authentication</h3>
            </div>
            <ul className="text-sm text-red-800 space-y-2">
              <li>• Invalid API keys</li>
              <li>• Expired access tokens</li>
              <li>• Missing authorization headers</li>
              <li>• Insufficient permissions</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-amber-900">Validation</h3>
            </div>
            <ul className="text-sm text-amber-800 space-y-2">
              <li>• Invalid email formats</li>
              <li>• Missing required fields</li>
              <li>• Invalid amount values</li>
              <li>• Duplicate references</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bug className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-blue-900">Payment</h3>
            </div>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Insufficient funds</li>
              <li>• Card declined</li>
              <li>• Transaction timeout</li>
              <li>• Invalid card details</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Debugging Tips */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Debugging Tips</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-emerald-900 mb-3">✅ Recommended Practices</h4>
            <ul className="text-sm text-emerald-800 space-y-2">
              <li>• Always check the HTTP status code first</li>
              <li>• Parse the error response to get detailed information</li>
              <li>• Log errors with context for debugging</li>
              <li>• Implement retry logic for 5xx server errors</li>
              <li>• Validate input data before making API calls</li>
              <li>• Use meaningful error messages for users</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-amber-900 mb-3">⚠️ Common Mistakes</h4>
            <ul className="text-sm text-amber-800 space-y-2">
              <li>• Ignoring HTTP status codes</li>
              <li>• Not implementing proper error handling</li>
              <li>• Exposing sensitive error details to users</li>
              <li>• Not logging errors for debugging</li>
              <li>• Retrying non-retryable errors</li>
              <li>• Not handling network timeouts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rate Limiting */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Rate Limiting</h2>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-purple-600" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-purple-900">429 Too Many Requests</h3>
          </div>
          
          <p className="text-purple-800 mb-4 leading-relaxed">
            When you exceed the rate limit, you'll receive a 429 status code. Implement exponential backoff 
            to handle rate limiting gracefully.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-purple-900 mb-2">Rate Limits</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• <strong>Authentication:</strong> 10 requests per minute</li>
                <li>• <strong>Transactions:</strong> 100 requests per minute</li>
                <li>• <strong>Status checks:</strong> 200 requests per minute</li>
                <li>• <strong>Other endpoints:</strong> 50 requests per minute</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-purple-900 mb-2">Handling Strategy</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Wait before retrying (start with 1 second)</li>
                <li>• Implement exponential backoff</li>
                <li>• Cache responses when possible</li>
                <li>• Monitor your request patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Help */}
      <div className="bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Need help with errors?</h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            If you're experiencing persistent errors or need help implementing error handling, 
            our support team is here to help. Check our troubleshooting guide or contact support directly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/docs/troubleshooting"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-bank-blue rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              <Bug className="mr-2 h-4 w-4" />
              Troubleshooting Guide
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