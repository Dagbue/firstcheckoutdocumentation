import React from 'react';
import { Shield, Key, AlertTriangle } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';

export const ApiAuthenticationSection: React.FC = () => {
  const authCode = `curl https://api.firstchekout.com/transaction/initialize \\
  -H "Authorization: Bearer sk_test_your_secret_key" \\
  -H "Content-Type: application/json"`;

  const oauthCode = `curl -X POST https://identity.firstchekout.com/oauth/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "client_id=your_client_id" \\
  -d "client_secret=your_client_secret" \\
  -d "grant_type=client_credentials"`;

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication</h1>
        <p className="text-lg text-gray-600">
          Learn how to authenticate your API requests securely.
        </p>
      </div>

      <div className="mb-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-red-900">Keep your keys secure</h3>
          </div>
          <p className="text-red-800 text-sm">
            Your secret API keys carry many privileges, so be sure to keep them secure! 
            Do not share your secret API keys in publicly accessible areas such as GitHub, 
            client-side code, and so forth.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Keys</h2>
          <p className="text-gray-700 mb-6">
            Authenticate your API requests by including your secret key in the Authorization header. 
            All API requests must be made over HTTPS. Calls made over plain HTTP will fail.
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Authentication Header</h3>
            <CodeBlock language="bash" code={authCode} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Key className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-900">Test Keys</h4>
              </div>
              <p className="text-blue-800 text-sm mb-2">
                Use test keys for development and testing. They're prefixed with <code>sk_test_</code>
              </p>
              <code className="text-xs bg-blue-100 px-2 py-1 rounded">sk_test_your_test_key</code>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-emerald-600 mr-2" />
                <h4 className="font-semibold text-emerald-900">Live Keys</h4>
              </div>
              <p className="text-emerald-800 text-sm mb-2">
                Use live keys for production. They're prefixed with <code>sk_live_</code>
              </p>
              <code className="text-xs bg-emerald-100 px-2 py-1 rounded">sk_live_your_live_key</code>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">OAuth Authentication</h2>
          <p className="text-gray-700 mb-6">
            For server-to-server authentication, you can use OAuth 2.0 client credentials flow.
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Token Request</h3>
            <CodeBlock language="bash" code={oauthCode} />
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Response</h3>
            <CodeBlock language="json" code={`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}`} />
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Best Practices</h3>
          <ul className="text-amber-800 text-sm space-y-2">
            <li>• Store API keys as environment variables</li>
            <li>• Use different keys for different environments</li>
            <li>• Rotate keys regularly</li>
            <li>• Never log API keys</li>
            <li>• Use HTTPS for all requests</li>
          </ul>
        </div>
      </div>
    </div>
  );
};