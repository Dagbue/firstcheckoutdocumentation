import React from 'react';
import { Shield, Key, AlertTriangle, Copy, Check } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiAuthenticationSection: React.FC = () => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const tokenGenerationCode = `curl --location '${API_CONFIG.identityServiceUrl}/api/v2/Authenticate/token' \\
--header 'Content-Type: application/x-www-form-urlencoded' \\
--data-urlencode 'client_Id={client_id}' \\
--data-urlencode 'client_Secret={client_secret}' \\
--data-urlencode 'grant_type=client_credentials'`;

  const tokenResponse = `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 1800
}`;

  const authHeaderCode = `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate' \\
--header 'Authorization: Bearer {access_token}' \\
--header 'Content-Type: application/json'`;

  const nodeJsExample = `const axios = require('axios');

// Generate access token
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
}

// Use token in API calls
async function makeApiCall() {
  const token = await getAccessToken();
  
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate', {
    Amount: 100,
    PayerEmail: "customer@example.com",
    PayerName: "John Doe",
    Purpose: "Payment",
    PublicKey: process.env.FIRSTCHEKOUT_PUBLIC_KEY,
    PaymentReference: "unique-ref-" + Date.now()
  }, {
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`;

  const phpExample = `<?php
// Generate access token
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

// Make API call with token
function initiateTransaction($token) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
        CURLOPT_URL => '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions/initiate',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode([
            'Amount' => 100,
            'PayerEmail' => 'customer@example.com',
            'PayerName' => 'John Doe',
            'Purpose' => 'Payment',
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
?>`;

  const pythonExample = `import requests
import os
from urllib.parse import urlencode

def get_access_token():
    """Generate OAuth access token"""
    url = "{{IdentityServiceUrl}}/api/v2/Authenticate/token"
    
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
    
    return response.json()['access_token']

def initiate_transaction():
    """Initiate a payment transaction"""
    token = get_access_token()
    
    url = "{{GatewayBaseAddress}}/api/v1/transactions/initiate"
    
    payload = {
        "Amount": 100,
        "PayerEmail": "customer@example.com",
        "PayerName": "John Doe",
        "Purpose": "Payment",
        "PublicKey": os.getenv('FIRSTCHEKOUT_PUBLIC_KEY'),
        "PaymentReference": f"unique-ref-{int(time.time())}"
    }
    
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`;

  const [activeLanguage, setActiveLanguage] = React.useState('curl');

  const codeExamples = {
    curl: tokenGenerationCode,
    nodejs: nodeJsExample,
    php: phpExample,
    python: pythonExample
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Authentication</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Learn how to authenticate your API requests securely using OAuth 2.0 client credentials flow.
        </p>
      </div>

      {/* Security Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-3">
          <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
          <h3 className="text-sm font-semibold text-red-900">Keep your keys secure</h3>
        </div>
        <p className="text-xs text-red-800 leading-relaxed">
          Your secret API keys carry many privileges, so be sure to keep them secure! 
          Do not share your secret API keys in publicly accessible areas such as GitHub, 
          client-side code, and so forth.
        </p>
      </div>

      {/* OAuth Token Generation */}
      <div className="mb-8 api-section">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">OAuth Token Generation</h2>
        <p className="text-xs text-gray-700 mb-4 leading-relaxed">
          FirstChekout uses OAuth 2.0 client credentials flow for API authentication. You'll need to generate 
          an access token using your Client ID and Client Secret before making API calls.
        </p>
        
        {/* Language Tabs */}
        <div className="mb-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`py-2 px-1 border-b-2 font-medium text-xs ${
                    activeLanguage === lang
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {lang === 'curl' ? 'cURL' : lang === 'nodejs' ? 'Node.js' : lang.toUpperCase()}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="relative">
          <CodeBlock language={activeLanguage} code={codeExamples[activeLanguage]} />
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Expected Response</h4>
          <CodeBlock language="json" code={tokenResponse} />
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="text-xs font-semibold text-blue-900 mb-2">Token Usage Notes</h4>
          <ul className="text-xs text-blue-800 space-y-1 leading-relaxed">
            <li>• Include the access token in all API requests as a Bearer token</li>
            <li>• Tokens are valid for 30 minutes (1800 seconds)</li>
            <li>• Generate new tokens before expiry to avoid authentication failures</li>
            <li>• Store tokens securely and never expose them in client-side code</li>
          </ul>
        </div>
      </div>

      {/* API Keys */}
      <div className="mb-8 api-section">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">API Keys</h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 info-card">
            <div className="flex items-center mb-2">
              <Key className="h-3 w-3 text-blue-600 mr-2" />
              <h4 className="text-xs font-semibold text-blue-900">Test Keys</h4>
            </div>
            <p className="text-xs text-blue-800 mb-2 leading-relaxed">
              Use test keys for development and testing. They're prefixed with <code>sb-</code>
            </p>
            <code className="text-xs bg-blue-100 px-2 py-1 rounded block">sb-pk_test_your_test_key</code>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 info-card">
            <div className="flex items-center mb-2">
              <Shield className="h-3 w-3 text-emerald-600 mr-2" />
              <h4 className="text-xs font-semibold text-emerald-900">Live Keys</h4>
            </div>
            <p className="text-xs text-emerald-800 mb-2 leading-relaxed">
              Use live keys for production. They don't have the <code>sb-</code> prefix
            </p>
            <code className="text-xs bg-emerald-100 px-2 py-1 rounded block">pk_live_your_live_key</code>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Using Bearer Token</h4>
          <CodeBlock language="bash" code={authHeaderCode} />
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-amber-900 mb-3">Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold text-amber-900 mb-2">Security</h4>
            <ul className="text-xs text-amber-800 space-y-1 leading-relaxed">
              <li>• Store API keys as environment variables</li>
              <li>• Use different keys for different environments</li>
              <li>• Rotate keys regularly</li>
              <li>• Never log API keys</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-amber-900 mb-2">Implementation</h4>
            <ul className="text-xs text-amber-800 space-y-1 leading-relaxed">
              <li>• Use HTTPS for all requests</li>
              <li>• Implement proper error handling</li>
              <li>• Cache tokens until expiry</li>
              <li>• Monitor token usage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};