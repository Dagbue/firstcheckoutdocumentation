import React from 'react';
import { CreditCard, Shield, Lock, Copy, Check, ExternalLink } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiCardSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const initiateCardCode = {
    curl: `curl --location -g '{"{{GatewayBaseAddress}}"}/api/v1/cards/initiate' \\
--data '{
    "TransactionReference": "{"{{transactionRef}}"}",
    "CardType": "VERVE",
    "AuthData": "f+f8yEt5Bc3Pf6L+iYqwxO/ulBEqHMWanp+bLBq5Sz+kWiPs64cTSxJKoU/WYBRrWMgjTPnyRm+NLooOt+fPkXiid90"
}'`,
    nodejs: `const axios = require('axios');

async function initiateCardPayment(transactionRef, cardType, authData) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/cards/initiate', {
    TransactionReference: transactionRef,
    CardType: cardType,
    AuthData: authData
  }, {
    headers: {
      'Authorization': \`Bearer \${process.env.ACCESS_TOKEN}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function initiateCardPayment($transactionRef, $cardType, $authData) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/cards/initiate',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'TransactionReference' => $transactionRef,
        'CardType' => $cardType,
        'AuthData' => $authData
      ]),
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer ' . $_ENV['ACCESS_TOKEN'],
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

def initiate_card_payment(transaction_ref, card_type, auth_data):
    """Initiate card payment transaction"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/cards/initiate"
    
    payload = {
        "TransactionReference": transaction_ref,
        "CardType": card_type,
        "AuthData": auth_data
    }
    
    headers = {
        'Authorization': f'Bearer {os.getenv("ACCESS_TOKEN")}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const completeCardCode = {
    curl: `curl --location -g '{"{{GatewayBaseAddress}}"}/api/v1/cards/complete' \\
--data '{
    "Otp": "123456",
    "TransactionReference": "{"{{transactionRef}}"}"
}'`,
    nodejs: `const axios = require('axios');

async function completeCardPayment(otp, transactionRef) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/cards/complete', {
    Otp: otp,
    TransactionReference: transactionRef
  }, {
    headers: {
      'Authorization': \`Bearer \${process.env.ACCESS_TOKEN}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function completeCardPayment($otp, $transactionRef) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/cards/complete',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'Otp' => $otp,
        'TransactionReference' => $transactionRef
      ]),
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer ' . $_ENV['ACCESS_TOKEN'],
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

def complete_card_payment(otp, transaction_ref):
    """Complete card payment with OTP validation"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/cards/complete"
    
    payload = {
        "Otp": otp,
        "TransactionReference": transaction_ref
    }
    
    headers = {
        'Authorization': f'Bearer {os.getenv("ACCESS_TOKEN")}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const initiateCardResponse = `{
  "data": {
    "message": "Kindly enter the OTP sent to 234805***1111",
    "data": null,
    "transactionReference": "TX-AF0696F49E7D44F89F17E92C28E214BF",
    "status": "PENDING",
    "statusCode": "01",
    "statusMessage": "PENDING",
    "callbackUrl": null
  },
  "status": "OK"
}`;

  const quickStartItems = [
    {
      title: 'Initiate Card Payment',
      description: 'Start a card payment transaction with encrypted card data',
      icon: CreditCard,
      color: 'blue',
      link: '#initiate',
      time: '2 minutes'
    },
    {
      title: 'Complete Card Payment',
      description: 'Complete payment transaction with OTP validation',
      icon: Shield,
      color: 'emerald',
      link: '#complete',
      time: '1 minute'
    }
  ];

  return (
    <div className="max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Card Payments</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          Process secure card payments with encrypted card data and OTP verification. All card data must be 
          encrypted using AES-256 before transmission to ensure PCI DSS compliance.
        </p>
      </div>

      {/* Security Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Lock className="h-4 w-4 text-red-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Security Requirement</h3>
            <p className="text-red-800 leading-relaxed">
              All card data MUST be encrypted using AES-256 encryption with your encryption key before 
              sending to the API. Never send plain card details over the network. This is mandatory for 
              PCI DSS compliance.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">On this page</h3>
        <div className="grid md:grid-cols-2 gap-2 text-xs">
          <a href="#initiate" className="text-blue-600 hover:text-blue-700 block py-1">Initiate Card Payment</a>
          <a href="#complete" className="text-blue-600 hover:text-blue-700 block py-1">Complete (Master/Verve) Card Payment</a>
        </div>
      </div>

      {/* Quick Start Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick start</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {quickStartItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
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
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Initiate Card Payment */}
      <section id="initiate" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Initiate Card Payment</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/cards/initiate
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This POST request initiates a card payment transaction through the payment gateway.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Request URL</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <code className="text-sm text-blue-600">{"{{GatewayBaseAddress}}"}/api/v1/cards/initiate</code>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Request Body Parameters</h3>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-32">
                  <span className="text-sm font-semibold text-gray-900">TransactionReference</span>
                  <div className="text-xs text-gray-500 mt-1">(string)</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    The unique reference identifier for the transaction.
                  </p>
                  <p className="text-xs text-gray-500 mt-1"><em>Example:</em> "{"{{transactionRef}}"}"</p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-32">
                  <span className="text-sm font-semibold text-gray-900">CardType</span>
                  <div className="text-xs text-gray-500 mt-1">(string)</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    The type of card being used for the transaction.
                  </p>
                  <p className="text-xs text-gray-500 mt-1"><em>Example:</em> "VERVE"</p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-32">
                  <span className="text-sm font-semibold text-gray-900">AuthData</span>
                  <div className="text-xs text-gray-500 mt-1">(string)</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Encrypted card data using AES-256 encryption with your encryption key.
                  </p>
                  <p className="text-xs text-gray-500 mt-1"><em>Example:</em> "f+f8yEt5Bc3Pf6L+iYqwxO/ulBEqHMWanp+bLBq5Sz+kWiPs64cTSxJKoU/WYBRrWMgjTPnyRm+NLooOt+fPkXiid90"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Headers</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-32">
                  <span className="text-sm font-semibold text-gray-900">Access-Token</span>
                  <div className="text-xs text-gray-500 mt-1">(string)</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Bearer token for authenticating the request.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Notes</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span><strong>TransactionReference</strong> must be unique for each transaction.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span><strong>CardType</strong> must be one of the supported card types; currently only "VERVE" is supported.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span><strong>AuthData</strong> must be a valid authentication string obtained from the card payment process.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The <strong>Access-Token</strong> header must be included and valid to authorize the request.</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Expected Responses</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-2">200 OK</span>
                <span className="text-gray-700">Card payment initiated successfully, OTP sent to customer.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">400 Bad Request</span>
                <span className="text-gray-700">Invalid parameters or malformed request.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">401 Unauthorized</span>
                <span className="text-gray-700">Invalid or missing access token.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">500 Internal Server Error</span>
                <span className="text-gray-700">Unexpected server error.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Developer Details</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This documentation aims to provide clear guidance for developers integrating card payment 
            initiation using this endpoint.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Authorization</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Bearer Token</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Token:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs">{"{{Access-Token}}"}</code>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Body (raw json)</h4>
              <CodeBlock language="json" code={`{
    "TransactionReference": "{{transactionRef}}",
    "CardType": "VERVE",
    "AuthData": "f+f8yEt5Bc3Pf6L+iYqwxO/ulBEqHMWanp+bLBq5Sz+kWiPs64cTSxJKoU/WYBRrWMgjTPnyRm+NLooOt+fPkXiid90"
}`} />
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(initiateCardCode).map((lang) => (
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
                  onClick={() => copyToClipboard(initiateCardCode[activeLanguage], 'initiate-card')}
                  className="copy-button"
                >
                  {copiedCode === 'initiate-card' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{initiateCardCode[activeLanguage]}</code></pre>
              </div>
            </div>

            <div className="response-container mt-4">
              <div className="response-header">
                <span>Example Response</span>
                <span className="status-200">200 OK</span>
              </div>
              <div className="response-body">
                <CodeBlock language="json" code={initiateCardResponse} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Card Payment */}
      <section id="complete" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Complete (Master/Verve) Card Payment</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/cards/complete
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This POST request completes a card payment transaction after validating the One-Time Password (OTP) 
            provided by the user.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Request URL</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <code className="text-sm text-blue-600">{"{{GatewayBaseAddress}}"}/api/v1/cards/complete</code>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Request Body Parameters</h3>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-32">
                  <span className="text-sm font-semibold text-gray-900">Otp</span>
                  <div className="text-xs text-gray-500 mt-1">(string)</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    The One-Time Password for transaction validation.
                  </p>
                  <p className="text-xs text-gray-500 mt-1"><em>Example:</em> "123456"</p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-32">
                  <span className="text-sm font-semibold text-gray-900">TransactionReference</span>
                  <div className="text-xs text-gray-500 mt-1">(string)</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    The unique reference identifier for the transaction.
                  </p>
                  <p className="text-xs text-gray-500 mt-1"><em>Example:</em> "3vs039344s5h"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Headers</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-32">
                  <span className="text-sm font-semibold text-gray-900">Access-Token</span>
                  <div className="text-xs text-gray-500 mt-1">(string)</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Bearer token for authenticating the request.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Notes</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The <strong>Otp</strong> must be a valid 6-digit string as provided by the payment gateway.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The <strong>TransactionReference</strong> must match the reference received during the initiation of the transaction.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Authentication via the <strong>Access-Token</strong> header is mandatory.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Ensure the OTP is current and has not expired.</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Expected Responses</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-2">Success (200 OK)</span>
                <span className="text-gray-700">Transaction completed successfully.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">Client Errors (4xx)</span>
                <span className="text-gray-700">Invalid OTP, missing parameters, or unauthorized access.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">Server Errors (5xx)</span>
                <span className="text-gray-700">Internal server errors or service unavailability.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Developer Details</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Use this endpoint only after initiating a card payment transaction.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Ensure secure handling of OTP and tokens.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Follow the payment gateway's security guidelines for sensitive data.</span>
            </li>
          </ul>
          <p className="text-gray-700 mt-4">
            For more details, refer to the related requests "Complete (Master/Verve) Card Payment" in the collection.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Authorization</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Bearer Token</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Token:</span>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs">{"{{Access-Token}}"}</code>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Body (raw json)</h4>
              <CodeBlock language="json" code={`{
    "Otp": "123456",
    "TransactionReference": "{{transactionRef}}"
}`} />
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(completeCardCode).map((lang) => (
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
                  onClick={() => copyToClipboard(completeCardCode[activeLanguage], 'complete-card')}
                  className="copy-button"
                >
                  {copiedCode === 'complete-card' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{completeCardCode[activeLanguage]}</code></pre>
              </div>
            </div>

            <div className="response-container mt-4">
              <div className="response-header">
                <span>Example Response</span>
                <span className="text-gray-500">No response body</span>
              </div>
              <div className="response-body">
                <p className="text-sm text-gray-600">This request doesn't return any response body</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started CTA */}
      <div className="bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Ready to implement card payments?</h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Start integrating secure card payment capabilities into your application. Our card payment system 
            supports Verve, Mastercard, and Visa with 3D Secure authentication and OTP verification.
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