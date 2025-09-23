import React from 'react';
import { CreditCard, Shield, Clock, Copy, Check, ExternalLink, DollarSign, User, CheckCircle } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiBnplSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Initiate BNPL
  const initiateBnplCode = {
    curl: `curl --location -g '{"{{GatewayBaseAddress}}"}/api/v1/BNPL/initiate' \\
--header 'Access-Token: {"{{Access-Token}}"}' \\
--data '{
    "TransactionReference": "{"{{transactionRef}}"}",
    "AccountNumber": "3078237253"
}'`,
    nodejs: `const axios = require('axios');

async function initiateBnpl(transactionRef, accountNumber, accessToken) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/BNPL/initiate', {
    TransactionReference: transactionRef,
    AccountNumber: accountNumber
  }, {
    headers: {
      'Access-Token': accessToken,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function initiateBnpl($transactionRef, $accountNumber, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/BNPL/initiate',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'TransactionReference' => $transactionRef,
        'AccountNumber' => $accountNumber
      ]),
      CURLOPT_HTTPHEADER => array(
        'Access-Token: ' . $accessToken,
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

def initiate_bnpl(transaction_ref, account_number, access_token):
    """Initiate a Buy Now Pay Later (BNPL) transaction"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/BNPL/initiate"
    
    payload = {
        "TransactionReference": transaction_ref,
        "AccountNumber": account_number
    }
    
    headers = {
        'Access-Token': access_token,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  // Validate OTP
  const validateOtpCode = {
    curl: `curl --location -g '{"{{GatewayBaseAddress}}"}/api/v1/BNPL/validateOtp' \\
--header 'Access-Token: {"{{Access-Token}}"}' \\
--data '{
    "TransactionRef": "{"{{transactionRef}}"}",
    "AccountNumber": "3078237253",
    "OTP": "111111"
}'`,
    nodejs: `const axios = require('axios');

async function validateBnplOtp(transactionRef, accountNumber, otp, accessToken) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/BNPL/validateOtp', {
    TransactionRef: transactionRef,
    AccountNumber: accountNumber,
    OTP: otp
  }, {
    headers: {
      'Access-Token': accessToken,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function validateBnplOtp($transactionRef, $accountNumber, $otp, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/BNPL/validateOtp',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'TransactionRef' => $transactionRef,
        'AccountNumber' => $accountNumber,
        'OTP' => $otp
      ]),
      CURLOPT_HTTPHEADER => array(
        'Access-Token: ' . $accessToken,
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

def validate_bnpl_otp(transaction_ref, account_number, otp, access_token):
    """Validate OTP for BNPL transaction"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/BNPL/validateOtp"
    
    payload = {
        "TransactionRef": transaction_ref,
        "AccountNumber": account_number,
        "OTP": otp
    }
    
    headers = {
        'Access-Token': access_token,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  // Validate
  const validateCode = {
    curl: `curl --location -g '{"{{GatewayBaseAddress}}"}/api/v1/BNPL/validate' \\
--header 'Access-Token: {"{{Access-Token}}"}' \\
--data '{
    "TransactionRef": "{"{{transactionRef}}"}",
    "AccountNumber": "3078237253",
    "Tenure": "3",
    "Amount": "40000",
    "AmountDue": "0"
}'`,
    nodejs: `const axios = require('axios');

async function validateBnpl(transactionRef, accountNumber, tenure, amount, amountDue, accessToken) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/BNPL/validate', {
    TransactionRef: transactionRef,
    AccountNumber: accountNumber,
    Tenure: tenure,
    Amount: amount,
    AmountDue: amountDue
  }, {
    headers: {
      'Access-Token': accessToken,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function validateBnpl($transactionRef, $accountNumber, $tenure, $amount, $amountDue, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/BNPL/validate',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'TransactionRef' => $transactionRef,
        'AccountNumber' => $accountNumber,
        'Tenure' => $tenure,
        'Amount' => $amount,
        'AmountDue' => $amountDue
      ]),
      CURLOPT_HTTPHEADER => array(
        'Access-Token: ' . $accessToken,
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

def validate_bnpl(transaction_ref, account_number, tenure, amount, amount_due, access_token):
    """Validate BNPL transaction before proceeding"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/BNPL/validate"
    
    payload = {
        "TransactionRef": transaction_ref,
        "AccountNumber": account_number,
        "Tenure": tenure,
        "Amount": amount,
        "AmountDue": amount_due
    }
    
    headers = {
        'Access-Token': access_token,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  // Validate Token (Prod)
  const validateTokenCode = {
    curl: `curl --location -g '{"{{GatewayBaseAddress}}"}/api/v1/BNPL/validatetoken' \\
--header 'Access-Token: {"{{Access-Token}}"}' \\
--data '{
    "TransactionRef": "{"{{transactionRef}}"}",
    "CustomerId": "3078237253",
    "TokenCode": "001122"
}'`,
    nodejs: `const axios = require('axios');

async function validateBnplToken(transactionRef, customerId, tokenCode, accessToken) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/BNPL/validatetoken', {
    TransactionRef: transactionRef,
    CustomerId: customerId,
    TokenCode: tokenCode
  }, {
    headers: {
      'Access-Token': accessToken,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function validateBnplToken($transactionRef, $customerId, $tokenCode, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/BNPL/validatetoken',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'TransactionRef' => $transactionRef,
        'CustomerId' => $customerId,
        'TokenCode' => $tokenCode
      ]),
      CURLOPT_HTTPHEADER => array(
        'Access-Token: ' . $accessToken,
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

def validate_bnpl_token(transaction_ref, customer_id, token_code, access_token):
    """Validate token for BNPL transaction to ensure authenticity"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/BNPL/validatetoken"
    
    payload = {
        "TransactionRef": transaction_ref,
        "CustomerId": customer_id,
        "TokenCode": token_code
    }
    
    headers = {
        'Access-Token': access_token,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  // Update Offer
  const updateOfferCode = {
    curl: `curl --location -g '{"{{GatewayBaseAddress}}"}/api/v1/BNPL/updateOffer' \\
--header 'Access-Token: {"{{Access-Token}}"}' \\
--data '{
    "TransactionRef": "{"{{transactionRef}}"}",
    "AccountNumber": "3078237253",
    "Tenure": "3",
    "Amount": "40000",
    "AmountDue": "2000"
}'`,
    nodejs: `const axios = require('axios');

async function updateBnplOffer(transactionRef, accountNumber, tenure, amount, amountDue, accessToken) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/BNPL/updateOffer', {
    TransactionRef: transactionRef,
    AccountNumber: accountNumber,
    Tenure: tenure,
    Amount: amount,
    AmountDue: amountDue
  }, {
    headers: {
      'Access-Token': accessToken,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function updateBnplOffer($transactionRef, $accountNumber, $tenure, $amount, $amountDue, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/BNPL/updateOffer',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'TransactionRef' => $transactionRef,
        'AccountNumber' => $accountNumber,
        'Tenure' => $tenure,
        'Amount' => $amount,
        'AmountDue' => $amountDue
      ]),
      CURLOPT_HTTPHEADER => array(
        'Access-Token: ' . $accessToken,
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

def update_bnpl_offer(transaction_ref, account_number, tenure, amount, amount_due, access_token):
    """Update an existing Buy Now Pay Later (BNPL) offer"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/BNPL/updateOffer"
    
    payload = {
        "TransactionRef": transaction_ref,
        "AccountNumber": account_number,
        "Tenure": tenure,
        "Amount": amount,
        "AmountDue": amount_due
    }
    
    headers = {
        'Access-Token': access_token,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  // Book
  const bookCode = {
    curl: `curl --location -g '{"{{GatewayBaseAddress}}"}/api/v1/BNPL/book' \\
--header 'Access-Token: {"{{Access-Token}}"}' \\
--data '{
    "TransactionRef": "{"{{transactionRef}}"}",
    "AccountNumber": "3078237253",
    "Amount": "40000"
}'`,
    nodejs: `const axios = require('axios');

async function bookBnpl(transactionRef, accountNumber, amount, accessToken) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/BNPL/book', {
    TransactionRef: transactionRef,
    AccountNumber: accountNumber,
    Amount: amount
  }, {
    headers: {
      'Access-Token': accessToken,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function bookBnpl($transactionRef, $accountNumber, $amount, $accessToken) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => $_ENV['GATEWAY_BASE_ADDRESS'] . '/api/v1/BNPL/book',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'TransactionRef' => $transactionRef,
        'AccountNumber' => $accountNumber,
        'Amount' => $amount
      ]),
      CURLOPT_HTTPHEADER => array(
        'Access-Token: ' . $accessToken,
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

def book_bnpl(transaction_ref, account_number, amount, access_token):
    """Book a Buy Now Pay Later (BNPL) transaction"""
    url = f"{os.getenv('GATEWAY_BASE_ADDRESS')}/api/v1/BNPL/book"
    
    payload = {
        "TransactionRef": transaction_ref,
        "AccountNumber": account_number,
        "Amount": amount
    }
    
    headers = {
        'Access-Token': access_token,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  // Request bodies
  const initiateRequestBody = `{
    "TransactionReference": "{{transactionRef}}",
    "AccountNumber": "3078237253"
}`;

  const validateOtpRequestBody = `{
    "TransactionRef": "{{transactionRef}}",
    "AccountNumber": "3078237253",
    "OTP": "111111"
}`;

  const validateRequestBody = `{
    "TransactionRef": "{{transactionRef}}",
    "AccountNumber": "3078237253",
    "Tenure": "3",
    "Amount": "40000",
    "AmountDue": "0"
}`;

  const validateTokenRequestBody = `{
    "TransactionRef": "{{transactionRef}}",
    "CustomerId": "3078237253",
    "TokenCode": "001122"
}`;

  const updateOfferRequestBody = `{
    "TransactionRef": "{{transactionRef}}",
    "AccountNumber": "3078237253",
    "Tenure": "3",
    "Amount": "40000",
    "AmountDue": "2000"
}`;

  const bookRequestBody = `{
    "TransactionRef": "{{transactionRef}}",
    "AccountNumber": "3078237253",
    "Amount": "40000"
}`;

  const quickStartItems = [
    {
      title: 'Initiate BNPL',
      description: 'Start a Buy Now Pay Later transaction for a customer',
      icon: CreditCard,
      color: 'blue',
      link: '#initiate',
      time: '2 minutes'
    },
    {
      title: 'Validate OTP',
      description: 'Validate customer OTP for BNPL transaction verification',
      icon: Shield,
      color: 'emerald',
      link: '#validate-otp',
      time: '1 minute'
    },
    {
      title: 'Validate Transaction',
      description: 'Validate BNPL transaction details before proceeding',
      icon: CheckCircle,
      color: 'purple',
      link: '#validate',
      time: '1 minute'
    },
    {
      title: 'Validate Token (Prod)',
      description: 'Validate token for production BNPL transactions',
      icon: Shield,
      color: 'amber',
      link: '#validate-token',
      time: '1 minute'
    },
    {
      title: 'Update Offer',
      description: 'Update existing BNPL offer terms and conditions',
      icon: DollarSign,
      color: 'indigo',
      link: '#update-offer',
      time: '2 minutes'
    },
    {
      title: 'Book Transaction',
      description: 'Book and finalize the BNPL transaction',
      icon: User,
      color: 'pink',
      link: '#book',
      time: '1 minute'
    }
  ];

  return (
    <div className="max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">BNPL (Buy Now Pay Later)</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          BNPL (Buy Now Pay Later) allows customers to purchase items immediately and pay for them in installments 
          over time. This payment method provides flexibility for customers while ensuring merchants receive 
          immediate payment.
        </p>
      </div>

      {/* Authorization Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">AUTHORIZATION - Bearer Token</h3>
            <p className="text-blue-800 leading-relaxed">
              This folder is using Bearer Token from collection FirstChekout Payment Gateway
            </p>
          </div>
        </div>
      </div>

      {/* BNPL Process Overview */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4">BNPL Process Flow</h3>
        <div className="grid md:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">1</div>
            <h4 className="text-xs font-semibold text-emerald-900 mb-1">Initiate</h4>
            <p className="text-xs text-emerald-700">Start BNPL transaction</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">2</div>
            <h4 className="text-xs font-semibold text-emerald-900 mb-1">Validate OTP</h4>
            <p className="text-xs text-emerald-700">Customer verification</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">3</div>
            <h4 className="text-xs font-semibold text-emerald-900 mb-1">Validate</h4>
            <p className="text-xs text-emerald-700">Check eligibility</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">4</div>
            <h4 className="text-xs font-semibold text-emerald-900 mb-1">Validate Token</h4>
            <p className="text-xs text-emerald-700">Production validation</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">5</div>
            <h4 className="text-xs font-semibold text-emerald-900 mb-1">Update Offer</h4>
            <p className="text-xs text-emerald-700">Modify terms</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">6</div>
            <h4 className="text-xs font-semibold text-emerald-900 mb-1">Book</h4>
            <p className="text-xs text-emerald-700">Finalize transaction</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">On this page</h3>
        <div className="grid md:grid-cols-3 gap-2 text-xs">
          <a href="#initiate" className="text-blue-600 hover:text-blue-700 block py-1">Initiate</a>
          <a href="#validate-otp" className="text-blue-600 hover:text-blue-700 block py-1">Validate OTP</a>
          <a href="#validate" className="text-blue-600 hover:text-blue-700 block py-1">Validate</a>
          <a href="#validate-token" className="text-blue-600 hover:text-blue-700 block py-1">Validate Token (Prod)</a>
          <a href="#update-offer" className="text-blue-600 hover:text-blue-700 block py-1">Update Offer</a>
          <a href="#book" className="text-blue-600 hover:text-blue-700 block py-1">Book</a>
        </div>
      </div>

      {/* Quick Start Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick start</h2>
        <div className="grid md:grid-cols-3 gap-6">
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

      {/* Initiate BNPL */}
      <section id="initiate" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Initiate</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/BNPL/initiate
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This POST request is used to initiate a Buy Now Pay Later (BNPL) transaction via the payment gateway API. 
            It is typically called by client applications to start the BNPL process for a customer.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Endpoint</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <code className="text-sm text-blue-600">{"{{GatewayBaseAddress}}"}/api/v1/BNPL/initiate</code>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Request Body Parameters</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">TransactionRef</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Unique reference for the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">FTWSUZA22IV2</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">AccountNumber</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Customer's account number.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">3078237253</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Details</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The request body must be sent as raw JSON with both parameters included.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Ensure the <strong>Access-Token</strong> header is set for authentication.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>This endpoint is part of the BNPL workflow and should be called before any subsequent BNPL actions.</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Expected Behavior</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>On success, the API responds with confirmation that the BNPL transaction has been initiated.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>If required parameters are missing or invalid, or if authentication fails, an error response is returned with details.</span>
            </li>
          </ul>
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
              <CodeBlock language="json" code={initiateRequestBody} />
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(initiateBnplCode).map((lang) => (
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
                  onClick={() => copyToClipboard(initiateBnplCode[activeLanguage], 'initiate-bnpl')}
                  className="copy-button"
                >
                  {copiedCode === 'initiate-bnpl' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{initiateBnplCode[activeLanguage]}</code></pre>
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

      {/* Validate OTP */}
      <section id="validate-otp" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Validate OTP</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/BNPL/validateOtp
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This POST request validates a user's One-Time Password (OTP) for a Buy Now Pay Later (BNPL) transaction.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Request Body Parameters</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">TransactionRef</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Unique reference identifier for the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">FPQ39P281118</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">AccountNumber</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      User's account number associated with the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">3078237253</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">OTP</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The One-Time Password sent to the user for validation.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">111111</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Headers</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
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
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Notes</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>All request body parameters are mandatory and must be correctly formatted.</span>
            </li>
          </ul>
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
              <CodeBlock language="json" code={validateOtpRequestBody} />
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(validateOtpCode).map((lang) => (
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
                  onClick={() => copyToClipboard(validateOtpCode[activeLanguage], 'validate-otp')}
                  className="copy-button"
                >
                  {copiedCode === 'validate-otp' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{validateOtpCode[activeLanguage]}</code></pre>
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

      {/* Validate */}
      <section id="validate" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Validate</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/BNPL/validate
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This POST request validates a user's Buy Now Pay Later (BNPL) transaction before proceeding. 
            It checks the provided transaction details for eligibility and correctness.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Request Body Parameters</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">TransactionRef</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Unique reference for the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">FTWSUZA22IV2</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">AccountNumber</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The user's account number.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">3078237253</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">Tenure</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Number of months for repayment.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">3</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">Amount</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The transaction amount.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">40000</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">AmountDue</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Amount due at the time of validation.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">0</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Headers</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">Access-Token</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Bearer token for authenticating the request. Must be included in the request headers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Notes</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>All body parameters are required and must be provided as strings.</span>
            </li>
          </ul>
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
              <CodeBlock language="json" code={validateRequestBody} />
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(validateCode).map((lang) => (
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
                  onClick={() => copyToClipboard(validateCode[activeLanguage], 'validate-bnpl')}
                  className="copy-button"
                >
                  {copiedCode === 'validate-bnpl' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{validateCode[activeLanguage]}</code></pre>
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

      {/* Validate Token (Prod) */}
      <section id="validate-token" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Validate Token (Prod)</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/BNPL/validatetoken
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This POST request validates a token for a Buy Now Pay Later (BNPL) transaction to ensure the token's 
            authenticity and association with the given transaction and customer.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Request Body Parameters</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">TransactionRef</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Reference identifier for the BNPL transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">FTQ39P381318</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">CustomerId</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Unique identifier for the customer.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">3078237253</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">TokenCode</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The token code to be validated.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">001122</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Headers</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
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
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Notes</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>All request body parameters are mandatory and must match the expected formats.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The Access-Token header must be included for authentication and authorization.</span>
            </li>
          </ul>
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
              <CodeBlock language="json" code={validateTokenRequestBody} />
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(validateTokenCode).map((lang) => (
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
                  onClick={() => copyToClipboard(validateTokenCode[activeLanguage], 'validate-token')}
                  className="copy-button"
                >
                  {copiedCode === 'validate-token' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{validateTokenCode[activeLanguage]}</code></pre>
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

      {/* Update Offer */}
      <section id="update-offer" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Update Offer</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/BNPL/updateOffer
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This POST request updates an existing Buy Now Pay Later (BNPL) offer in the system.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Request Body Parameters</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">TransactionRef</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Unique reference for the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">FTWSUZA22IV1</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">AccountNumber</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Customer's account number.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">3078237253</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">Tenure</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Duration of the offer in months.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">3</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">Amount</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Total amount of the offer.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">40000</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">AmountDue</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Amount currently due.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">2000</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Headers</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">Access-Token</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Bearer token for authentication and authorization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Notes</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>All parameters in the request body are required and must be valid strings.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The Access-Token header must be included for the request to be authorized.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Ensure the TransactionRef corresponds to an existing offer to update.</span>
            </li>
          </ul>
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
              <CodeBlock language="json" code={updateOfferRequestBody} />
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(updateOfferCode).map((lang) => (
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
                  onClick={() => copyToClipboard(updateOfferCode[activeLanguage], 'update-offer')}
                  className="copy-button"
                >
                  {copiedCode === 'update-offer' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{updateOfferCode[activeLanguage]}</code></pre>
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

      {/* Book */}
      <section id="book" className="mb-16">
        <div className="flex items-center mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-3">POST</span>
          <h2 className="text-2xl font-semibold text-gray-900">Book</h2>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">
            {"{{GatewayBaseAddress}}"}/api/v1/BNPL/book
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            This POST request books a Buy Now Pay Later (BNPL) transaction.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Request URL</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <code className="text-sm text-blue-600">{"{{GatewayBaseAddress}}"}/api/v1/BNPL/book</code>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Request Body Parameters</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">TransactionRef</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Unique reference for the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">FTWSUZA22IV1</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">AccountNumber</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The account number to be debited.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">3078237253</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-40">
                    <span className="text-sm font-semibold text-gray-900">Amount</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The amount to be booked for the transaction.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      <strong>Example:</strong> <code className="bg-blue-50 px-2 py-1 rounded">40000</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Headers</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24">
                    <span className="text-sm font-semibold text-gray-900">Access-Token</span>
                    <div className="text-xs text-gray-500 mt-1">(string)</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Bearer token for authentication and authorization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Notes</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>All request body parameters are mandatory and must be provided as strings.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>The Access-Token header must be included for the request to be authenticated.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Ensure the TransactionRef is unique for each transaction to avoid duplication.</span>
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Expected Responses</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded font-medium mr-2">200 OK</span>
                <span className="text-gray-700">Transaction successfully booked.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">400 Bad Request</span>
                <span className="text-gray-700">Missing or invalid parameters.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">401 Unauthorized</span>
                <span className="text-gray-700">Missing or invalid Access-Token.</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded font-medium mr-2">500 Internal Server Error</span>
                <span className="text-gray-700">Server encountered an error processing the request.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Developer Details</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Use environment variables for GatewayBaseAddress and Access-Token to manage different environments and security.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Validate all input parameters before sending the request to avoid errors.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
              <span>Handle error responses gracefully in client applications.</span>
            </li>
          </ul>
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
              <CodeBlock language="json" code={bookRequestBody} />
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(bookCode).map((lang) => (
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
                  onClick={() => copyToClipboard(bookCode[activeLanguage], 'book-bnpl')}
                  className="copy-button"
                >
                  {copiedCode === 'book-bnpl' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{bookCode[activeLanguage]}</code></pre>
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

      {/* BNPL Features */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">BNPL Features & Benefits</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-emerald-900 mb-3">✅ Customer Benefits</h4>
            <ul className="text-sm text-emerald-800 space-y-2">
              <li>• Purchase items immediately without full payment</li>
              <li>• Flexible repayment terms (3, 6, 12 months)</li>
              <li>• No upfront fees or hidden charges</li>
              <li>• Simple OTP verification process</li>
              <li>• Automatic payment scheduling</li>
              <li>• Credit building opportunities</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-3">💼 Merchant Benefits</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Immediate payment upon customer purchase</li>
              <li>• Increased conversion rates and average order value</li>
              <li>• Risk management handled by BNPL provider</li>
              <li>• Easy integration with existing payment flows</li>
              <li>• Real-time transaction status updates</li>
              <li>• Comprehensive reporting and analytics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Best Practices */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Implementation Best Practices</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-emerald-900 mb-3">✅ Recommended Practices</h4>
            <ul className="text-sm text-emerald-800 space-y-2">
              <li>• Follow the complete BNPL workflow sequence</li>
              <li>• Validate customer eligibility before offering BNPL</li>
              <li>• Implement proper error handling for each step</li>
              <li>• Use secure token management practices</li>
              <li>• Monitor transaction status throughout the process</li>
              <li>• Provide clear terms and conditions to customers</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-amber-900 mb-3">⚠️ Important Considerations</h4>
            <ul className="text-sm text-amber-800 space-y-2">
              <li>• BNPL requires customer credit assessment</li>
              <li>• OTP validation has time limits</li>
              <li>• Token validation is required for production</li>
              <li>• Offer updates must maintain data consistency</li>
              <li>• Booking finalizes the transaction commitment</li>
              <li>• Consider regulatory compliance requirements</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Getting Started CTA */}
      <div className="bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Ready to implement BNPL payments?</h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Start integrating Buy Now Pay Later capabilities into your application. BNPL provides customers 
            with flexible payment options while ensuring merchants receive immediate payment for their products and services.
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