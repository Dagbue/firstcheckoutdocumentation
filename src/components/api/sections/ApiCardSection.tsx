import React from 'react';
import { CreditCard, Shield, Lock } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiCardSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');

  const encryptionCode = {
    curl: `# Card data must be encrypted before sending
# Use your encryption key to encrypt card details with AES-256`,
    nodejs: `const crypto = require('crypto');

function encryptCardData(cardData, encryptionKey) {
  const algorithm = 'aes-256-gcm';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, encryptionKey);
  
  let encrypted = cipher.update(JSON.stringify(cardData), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}

// Example usage
const cardData = {
  pan: "5060990580000217499",
  expiryDate: "03/50",
  cvv: "111",
  pin: "1111"
};

const encryptedCard = encryptCardData(cardData, process.env.FIRSTCHEKOUT_ENCRYPTION_KEY);`,
    csharp: `using System.Security.Cryptography;
using System.Text;

public class CardEncryption
{
    public static string EncryptCardData(object cardData, string encryptionKey)
    {
        var json = JsonSerializer.Serialize(cardData);
        var keyBytes = Encoding.UTF8.GetBytes(encryptionKey);
        var dataBytes = Encoding.UTF8.GetBytes(json);
        
        using (var aes = Aes.Create())
        {
            aes.Key = keyBytes;
            aes.GenerateIV();
            
            using (var encryptor = aes.CreateEncryptor())
            {
                var encrypted = encryptor.TransformFinalBlock(dataBytes, 0, dataBytes.Length);
                var result = new byte[aes.IV.Length + encrypted.Length];
                
                Array.Copy(aes.IV, 0, result, 0, aes.IV.Length);
                Array.Copy(encrypted, 0, result, aes.IV.Length, encrypted.Length);
                
                return Convert.ToBase64String(result);
            }
        }
    }
}

// Usage
var cardData = new {
    pan = "5060990580000217499",
    expiryDate = "03/50", 
    cvv = "111",
    pin = "1111"
};

var encryptedData = CardEncryption.EncryptCardData(cardData, encryptionKey);`
  };

  const cardInitiateCode = {
    curl: `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/cards/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "AuthData": "{{encrypted_card_data}}",
  "AccessCode": "TXN_ACCESS_CODE_123",
  "PaymentReference": "FjWnMSUZajh1k224lXks39728874560476"
}'`,
    nodejs: `const axios = require('axios');

async function initiateCardPayment(accessToken, encryptedCardData, accessCode, paymentReference) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/cards/initiate', {
    AuthData: encryptedCardData,
    AccessCode: accessCode,
    PaymentReference: paymentReference
  }, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function initiateCardPayment($accessToken, $encryptedCardData, $accessCode, $paymentReference) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => '${API_CONFIG.gatewayBaseAddress}/api/v1/cards/initiate',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'AuthData' => $encryptedCardData,
        'AccessCode' => $accessCode,
        'PaymentReference' => $paymentReference
      ]),
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json'
      ),
    ));
    
    $response = curl_exec($curl);
    curl_close($curl);
    
    return json_decode($response, true);
}
?>`
  };

  const otpVerificationCode = {
    curl: `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/cards/otp' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "Otp": "123456",
  "AccessCode": "TXN_ACCESS_CODE_123",
  "PaymentReference": "FjWnMSUZajh1k224lXks39728874560476"
}'`,
    nodejs: `const axios = require('axios');

async function verifyOtp(accessToken, otp, accessCode, paymentReference) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/cards/otp', {
    Otp: otp,
    AccessCode: accessCode,
    PaymentReference: paymentReference
  }, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`
  };

  const cardResponse = `{
  "status": true,
  "message": "OTP sent successfully",
  "data": {
    "requiresOtp": true,
    "otpMessage": "Please enter the OTP sent to your phone",
    "paymentReference": "FjWnMSUZajh1k224lXks39728874560476",
    "accessCode": "TXN_ACCESS_CODE_123"
  }
}`;

  const otpResponse = `{
  "status": true,
  "message": "Payment completed successfully",
  "data": {
    "paymentReference": "FjWnMSUZajh1k224lXks39728874560476",
    "status": "successful",
    "amount": 100,
    "currency": "NGN",
    "paymentMethod": "card",
    "cardType": "verve",
    "last4": "7499",
    "transactionDate": "2024-01-15T10:30:00Z"
  }
}`;

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Card Payments</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Process secure card payments with 3D Secure authentication and OTP verification. 
          All card data must be encrypted using AES-256 before transmission.
        </p>
      </div>

      {/* Security Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-3">
          <Lock className="h-4 w-4 text-red-600 mr-2" />
          <h3 className="text-sm font-semibold text-red-900">Security Requirement</h3>
        </div>
        <p className="text-xs text-red-800 leading-relaxed">
          All card data MUST be encrypted using AES-256 encryption with your encryption key before 
          sending to the API. Never send plain card details over the network.
        </p>
      </div>

      {/* Card Data Encryption */}
      <div className="mb-8 api-section">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Card Data Encryption</h2>
        
        <div className="mb-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4">
              {Object.keys(encryptionCode).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`py-1.5 px-1 border-b-2 font-medium text-xs ${
                    activeLanguage === lang
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {lang === 'curl' ? 'cURL' : lang === 'nodejs' ? 'Node.js' : lang === 'csharp' ? 'C#' : lang.toUpperCase()}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <CodeBlock language={activeLanguage} code={encryptionCode[activeLanguage]} />

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="text-xs font-semibold text-blue-900 mb-2">Encryption Requirements</h4>
          <ul className="text-xs text-blue-800 space-y-1 leading-relaxed">
            <li>• Use AES-256-GCM encryption algorithm</li>
            <li>• Include merchant ID and transaction reference as AAD</li>
            <li>• Generate unique nonce for each encryption</li>
            <li>• Use your 32-character encryption key from dashboard</li>
          </ul>
        </div>
      </div>

      {/* Initiate Card Payment */}
      <div className="mb-8 api-section">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <CreditCard className="h-3 w-3 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Initiate Card Payment</h2>
        </div>

        <div className="flex items-center mb-4">
          <span className="px-2 py-1 bg-green-600 text-white text-xs rounded font-medium api-method-badge">POST</span>
          <span className="text-gray-600 font-mono text-xs api-url-path ml-2">/api/v1/cards/initiate</span>
        </div>
        
        <p className="text-xs text-gray-700 mb-4 leading-relaxed">
          Process a card payment using encrypted card data. This will trigger OTP verification for 3D Secure authentication.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Request</h4>
            <CodeBlock language={activeLanguage} code={cardInitiateCode[activeLanguage]} />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Sample Response</h4>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">200 OK</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded status-badge">Success</span>
              </div>
              <CodeBlock language="json" code={cardResponse} />
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification */}
      <div className="mb-8 api-section">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
            <Shield className="h-3 w-3 text-emerald-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">OTP Verification</h2>
        </div>

        <div className="flex items-center mb-4">
          <span className="px-2 py-1 bg-green-600 text-white text-xs rounded font-medium api-method-badge">POST</span>
          <span className="text-gray-600 font-mono text-xs api-url-path ml-2">/api/v1/cards/otp</span>
        </div>
        
        <p className="text-xs text-gray-700 mb-4 leading-relaxed">
          Complete the card payment by verifying the OTP sent to the customer's phone.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Request</h4>
            <CodeBlock language={activeLanguage} code={otpVerificationCode[activeLanguage]} />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Sample Response</h4>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">200 OK</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded status-badge">Success</span>
              </div>
              <CodeBlock language="json" code={otpResponse} />
            </div>
          </div>
        </div>
      </div>

      {/* Test Cards */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-yellow-900 mb-3">Test Card Numbers</h3>
        <p className="text-xs text-yellow-800 mb-3 leading-relaxed">
          Use these test card numbers in sandbox mode. Always use PIN: 1111 and OTP: 123456.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold text-yellow-900 mb-2">Successful Payments</h4>
            <ul className="text-xs text-yellow-800 space-y-1 font-mono">
              <li>5060990580000217499 (Verve)</li>
              <li>5123450000000008 (Mastercard)</li>
              <li>4000000000002503 (Visa)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-yellow-900 mb-2">Failed Payments</h4>
            <ul className="text-xs text-yellow-800 space-y-1 font-mono">
              <li>5061830100001895 (Declined)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};