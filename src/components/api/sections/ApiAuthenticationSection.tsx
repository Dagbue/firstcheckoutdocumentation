import React from 'react';
import { Shield, AlertTriangle, Copy, Check, Lock, Clock, Code } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

type Language = 'curl' | 'nodejs' | 'php' | 'python';

export const ApiAuthenticationSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState<Language>('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const tokenGenerationCode: Record<Language, string> = {
    curl: `curl --location '${API_CONFIG.identityServiceUrl}/api/v2/Authenticate/token' \\
--header 'Content-Type: application/x-www-form-urlencoded' \\
--data-urlencode 'client_Id={client_id}' \\
--data-urlencode 'client_Secret={client_secret}' \\
--data-urlencode 'grant_type=client_credentials'`,
    nodejs: `const axios = require('axios');

async function getAccessToken() {
  const response = await axios.post('${API_CONFIG.identityServiceUrl}/api/v2/Authenticate/token',
      new URLSearchParams({
        'client_Id': process.env.FIRSTCHEKOUT_CLIENT_ID,
        'client_Secret': process.env.FIRSTCHEKOUT_CLIENT_SECRET,
        'grant_type': 'client_credentials'
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
  );

  return response.data.access_token;
}`,
    php: `<?php
    function getAccessToken() {
      $curl = curl_init();

      curl_setopt_array($curl, array(
          CURLOPT_URL => '${API_CONFIG.identityServiceUrl}/api/v2/Authenticate/token',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_POST => true,
          CURLOPT_POSTFIELDS => http_build_query([
            'client_Id' => $_ENV['FIRSTCHEKOUT_CLIENT_ID'],
          'client_Secret' => $_ENV['FIRSTCHEKOUT_CLIENT_SECRET'],
          'grant_type' => 'client_credentials'
    ]),
      CURLOPT_HTTPHEADER => array(
          'Content-Type: application/x-www-form-urlencoded'
      ),
    ));

      $response = curl_exec($curl);
      curl_close($curl);

      $data = json_decode($response, true);
      return $data['access_token'];
    }
        ?>`,
    python: `import requests
import os
  from urllib.parse import urlencode

def get_access_token():
"""Generate OAuth access token"""
url = "${API_CONFIG.identityServiceUrl}/api/v2/Authenticate/token"

data = {
  'client_Id': os.getenv('FIRSTCHEKOUT_CLIENT_ID'),
  'client_Secret': os.getenv('FIRSTCHEKOUT_CLIENT_SECRET'),
  'grant_type': 'client_credentials'
}

headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.post(url, data=urlencode(data), headers=headers)
response.raise_for_status()

return response.json()['access_token']`
  };

  const apiCallCode: Record<Language, string> = {
    curl: `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate' \\
--header 'Authorization: Bearer {access_token}' \\
--header 'Content-Type: application/json' \\
--data-raw '{
"Amount": 10000,
    "PayerEmail": "customer@example.com",
    "PayerName": "John Doe",
    "Purpose": "Product Purchase",
    "PublicKey": "sb-pk-your_public_key_here",
    "PaymentReference": "unique-ref-123456"
}'`,
nodejs: `const axios = require('axios');

async function makeApiCall() {
  const token = await getAccessToken();
  
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate', {
    Amount: 10000,
    PayerEmail: "customer@example.com",
    PayerName: "John Doe",
    Purpose: "Product Purchase",
    PublicKey: process.env.FIRSTCHEKOUT_PUBLIC_KEY,
    PaymentReference: "unique-ref-" + Date.now()
  }, {
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
// Make API call with token
function initiateTransaction($token) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
        CURLOPT_URL => '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode([
            'Amount' => 10000,
            'PayerEmail' => 'customer@example.com',
            'PayerName' => 'John Doe',
            'Purpose' => 'Product Purchase',
            'PublicKey' => $_ENV['FIRSTCHEKOUT_PUBLIC_KEY'],
            'PaymentReference' => 'unique-ref-' . time()
        ]),
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer ' . $token,
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
import time

def initiate_transaction():
    """Initiate a payment transaction"""
    token = get_access_token()
    
    url = "${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate"
    
    payload = {
        "Amount": 10000,
        "PayerEmail": "customer@example.com",
        "PayerName": "John Doe",
        "Purpose": "Product Purchase",
        "PublicKey": os.getenv('FIRSTCHEKOUT_PUBLIC_KEY'),
        "PaymentReference": f"unique-ref-{int(time.time())}"
    }
    
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
};

const tokenResponse = `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 1800
}`;

const apiResponse = `{
  "status": true,
  "message": "Transaction initiated successfully",
  "data": {
    "accessCode": "TXN_ACCESS_CODE_123",
    "paymentReference": "unique-ref-123456",
    "checkoutUrl": "https://checkout.firstchekout.com/pay/TXN_ACCESS_CODE_123"
  }
}`;

const languages: Language[] = ['curl', 'nodejs', 'php', 'python'];

return (
    <div className="max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          Learn how to authenticate your API requests securely using OAuth 2.0 client credentials flow.
        </p>
      </div>

      {/* Security Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Keep your keys secure</h3>
            <p className="text-red-800 leading-relaxed">
              Your secret API keys carry many privileges, so be sure to keep them secure!
              Do not share your secret API keys in publicly accessible areas such as GitHub,
              client-side code, and so forth.
            </p>
          </div>
        </div>
      </div>

      {/* Authentication Basics */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Authentication Basics</h2>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              FirstChekout uses OAuth 2.0 client credentials flow for API authentication. You'll need to generate
              an access token using your Client ID and Client Secret before making API calls.
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="text-sm font-semibold text-blue-900">OAuth 2.0 Flow</h4>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Use client credentials grant type to obtain access tokens for server-to-server authentication.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-amber-600 mr-2" />
                  <h4 className="text-sm font-semibold text-amber-900">Token Expiry</h4>
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Access tokens expire after 30 minutes (1800 seconds). Implement token refresh logic for long-running applications.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Key Types</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Test Keys</span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Sandbox</span>
                </div>
                <code className="text-sm text-blue-600 break-all">sb-pk_test_your_test_key</code>
                <p className="text-xs text-gray-600 mt-1">Use for development and testing</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Live Keys</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">Production</span>
                </div>
                <code className="text-sm text-blue-600 break-all">pk_live_your_live_key</code>
                <p className="text-xs text-gray-600 mt-1">Use for production transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OAuth Token Generation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">OAuth Token Generation</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Generate an access token using your Client ID and Client Secret. This token will be used
              to authenticate all subsequent API requests.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">Authentication Flow</h4>
              <ol className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">1</span>
                  <span>Send Client ID and Client Secret to token endpoint</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">2</span>
                  <span>Receive access token with 30-minute expiry</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">3</span>
                  <span>Include token in Authorization header for API calls</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">4</span>
                  <span>Generate new token before expiry</span>
                </li>
              </ol>
            </div>

            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20">
                    <span className="text-sm font-semibold text-gray-900">client_Id</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Your FirstChekout Client ID obtained from the merchant dashboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20">
                    <span className="text-sm font-semibold text-gray-900">client_Secret</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Your FirstChekout Client Secret. Keep this confidential and never expose in client-side code.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20">
                    <span className="text-sm font-semibold text-gray-900">grant_type</span>
                    <div className="text-xs text-gray-500 mt-1">string</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Must be set to <code className="bg-gray-100 px-2 py-1 rounded text-sm">client_credentials</code> for OAuth 2.0 client credentials flow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {languages.map((lang) => (
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
                <span className="text-sm font-medium">Generate Access Token</span>
                <button
                    onClick={() => copyToClipboard(tokenGenerationCode[activeLanguage], 'token-generation')}
                    className="copy-button"
                >
                  {copiedCode === 'token-generation' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{tokenGenerationCode[activeLanguage]}</code></pre>
              </div>
            </div>

            <div className="response-container mt-4">
              <div className="response-header">
                <span>Sample Response</span>
                <span className="status-200">200 OK</span>
              </div>
              <div className="response-body">
                <CodeBlock language="json" code={tokenResponse} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Using Access Tokens */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Using Access Tokens</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Include the access token in the Authorization header of all API requests using the Bearer token format.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Authorization Header</h3>

            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">Authorization</span>
                    <div className="text-xs text-gray-500 mt-1">header</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Set value to <code className="bg-gray-100 px-2 py-1 rounded text-sm">Bearer ACCESS_TOKEN</code> where ACCESS_TOKEN is the token received from the authentication endpoint.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">Content-Type</span>
                    <div className="text-xs text-gray-500 mt-1">header</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Set value to <code className="bg-gray-100 px-2 py-1 rounded text-sm">application/json</code> for all API requests with JSON payloads.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-6">
              <h4 className="text-sm font-semibold text-emerald-900 mb-2">Token Management Tips</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• Cache tokens for reuse until expiry</li>
                <li>• Implement automatic token refresh logic</li>
                <li>• Monitor token usage and expiration</li>
                <li>• Use environment variables for credentials</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {languages.map((lang) => (
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
                <span className="text-sm font-medium">Making Authenticated API Calls</span>
                <button
                    onClick={() => copyToClipboard(apiCallCode[activeLanguage], 'api-call')}
                    className="copy-button"
                >
                  {copiedCode === 'api-call' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{apiCallCode[activeLanguage]}</code></pre>
              </div>
            </div>

            <div className="response-container mt-4">
              <div className="response-header">
                <span>Sample Response</span>
                <span className="status-200">200 OK</span>
              </div>
              <div className="response-body">
                <CodeBlock language="json" code={apiResponse} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Environment Configuration */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Environment Configuration</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Environment</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Base URL</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Key Prefix</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Purpose</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded font-medium">Sandbox</span>
              </td>
              <td className="px-6 py-4 text-sm font-mono text-gray-600">{API_CONFIG.gatewayBaseAddress}</td>
              <td className="px-6 py-4 text-sm font-mono text-gray-600">sb-pk_, sb-sk_</td>
              <td className="px-6 py-4 text-sm text-gray-700">Development and testing</td>
            </tr>
            <tr>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded font-medium">Live</span>
              </td>
              <td className="px-6 py-4 text-sm font-mono text-gray-600">https://payment-solution-gateway.azurewebsites.net</td>
              <td className="px-6 py-4 text-sm font-mono text-gray-600">pk_, sk_</td>
              <td className="px-6 py-4 text-sm text-gray-700">Production transactions</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Error Handling */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Authentication Errors</h2>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded font-medium">401</span>
              <span className="ml-2 text-sm font-semibold text-red-900">Unauthorized</span>
            </div>
            <p className="text-sm text-red-800">
              Invalid or missing access token. Generate a new token or check your credentials.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded font-medium">403</span>
              <span className="ml-2 text-sm font-semibold text-amber-900">Forbidden</span>
            </div>
            <p className="text-sm text-amber-800">
              Valid token but insufficient permissions. Check your account status and API key permissions.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded font-medium">429</span>
              <span className="ml-2 text-sm font-semibold text-purple-900">Rate Limited</span>
            </div>
            <p className="text-sm text-purple-800">
              Too many requests. Implement exponential backoff and respect rate limits.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Lock className="h-5 w-5 text-emerald-600 mr-2" />
              <h4 className="text-sm font-semibold text-emerald-900">Security</h4>
            </div>
            <ul className="text-sm text-emerald-800 space-y-2">
              <li>• Store API keys as environment variables</li>
              <li>• Use different keys for different environments</li>
              <li>• Rotate keys regularly in production</li>
              <li>• Never log API keys or tokens</li>
              <li>• Use HTTPS for all requests</li>
              <li>• Implement proper error handling</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Code className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="text-sm font-semibold text-blue-900">Implementation</h4>
            </div>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Cache tokens until expiry to reduce API calls</li>
              <li>• Implement automatic token refresh logic</li>
              <li>• Handle 401 errors by generating new tokens</li>
              <li>• Monitor token usage and performance</li>
              <li>• Use connection pooling for better performance</li>
              <li>• Implement retry logic with exponential backoff</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
);
};
