import React from 'react';
import {Code, Database, Webhook, Lock, CreditCard, QrCode, BriefcaseIcon, ScanBarcode, AlertTriangle, BookOpen, Shield, Zap, ArrowRight, CheckCircle, Clock, XCircle} from 'lucide-react';
import { CodeBlock } from '../CodeBlock';
import {MermaidDiagramSudo} from "../MermaidDiagramSudo.tsx";
import {MermaidDiagram} from "@lightenna/react-mermaid-diagram";

export const ApiSdkSection: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('curl');
  const [selectedWorkflowStep, setSelectedWorkflowStep] = React.useState(1);

  // Multi-language code examples
  const tokenGenerationExamples = {
    curl: `curl --location '{{ identity_Service_Url }}/api/v2/Authenticate/token' \\
--header 'Content-Type: application/x-www-form-urlencoded' \\
--data-urlencode 'client_Id=your-client-id' \\
--data-urlencode 'client_Secret=your-client-secret' \\
--data-urlencode 'grant_type=client_credentials'`,
    
    node: `const axios = require('axios');

async function generateToken() {
  try {
    const response = await axios.post('{{ identity_Service_Url }}/api/v2/Authenticate/token', {
      client_Id: process.env.FIRSTCHEKOUT_CLIENT_ID,
      client_Secret: process.env.FIRSTCHEKOUT_CLIENT_SECRET,
      grant_type: 'client_credentials'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Token generation failed:', error.response?.data);
    throw error;
  }
}`,
    
    php: `<?php
$client_id = $_ENV['FIRSTCHEKOUT_CLIENT_ID'];
$client_secret = $_ENV['FIRSTCHEKOUT_CLIENT_SECRET'];

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => '{{ identity_Service_Url }}/api/v2/Authenticate/token',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query([
        'client_Id' => $client_id,
        'client_Secret' => $client_secret,
        'grant_type' => 'client_credentials'
    ]),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/x-www-form-urlencoded'
    ]
]);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

if ($httpCode === 200) {
    $data = json_decode($response, true);
    return $data['access_token'];
} else {
    throw new Exception('Token generation failed: ' . $response);
}
?>`,
    
    python: `import requests
import os
from typing import Optional

def generate_token() -> Optional[str]:
    """Generate OAuth access token for FirstChekout API"""
    try:
        response = requests.post(
            '{{ identity_Service_Url }}/api/v2/Authenticate/token',
            data={
                'client_Id': os.getenv('FIRSTCHEKOUT_CLIENT_ID'),
                'client_Secret': os.getenv('FIRSTCHEKOUT_CLIENT_SECRET'),
                'grant_type': 'client_credentials'
            },
            headers={
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        
        response.raise_for_status()
        return response.json()['access_token']
        
    except requests.exceptions.RequestException as e:
        print(f"Token generation failed: {e}")
        raise`
  };

  const initiateTransactionExamples = {
    curl: `curl --location '{{ payment_Gateway_Url }}/api/v1/transactions/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "Amount": 10000,
  "PayerEmail": "customer@example.com",
  "PayerName": "John Doe",
  "Purpose": "Product Purchase",
  "PublicKey": "your-public-key",
  "PaymentReference": "unique-ref-12345",
  "metadata": {
    "cart_id": "abc123",
    "order_source": "website"
  }
}'`,
    
    node: `const axios = require('axios');

async function initiateTransaction(accessToken) {
  try {
    const response = await axios.post(
      '{{ payment_Gateway_Url }}/api/v1/transactions/initiate',
      {
        Amount: 10000, // Amount in kobo (₦100.00)
        PayerEmail: 'customer@example.com',
        PayerName: 'John Doe',
        Purpose: 'Product Purchase',
        PublicKey: process.env.FIRSTCHEKOUT_PUBLIC_KEY,
        PaymentReference: \`txn_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`,
        metadata: {
          cart_id: 'abc123',
          order_source: 'website',
          user_id: 'user_456'
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${accessToken}\`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Transaction initiation failed:', error.response?.data);
    throw error;
  }
}`,
    
    php: `<?php
function initiateTransaction($accessToken) {
    $data = [
        'Amount' => 10000, // Amount in kobo (₦100.00)
        'PayerEmail' => 'customer@example.com',
        'PayerName' => 'John Doe',
        'Purpose' => 'Product Purchase',
        'PublicKey' => $_ENV['FIRSTCHEKOUT_PUBLIC_KEY'],
        'PaymentReference' => 'txn_' . time() . '_' . uniqid(),
        'metadata' => [
            'cart_id' => 'abc123',
            'order_source' => 'website',
            'user_id' => 'user_456'
        ]
    ];
    
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => '{{ payment_Gateway_Url }}/api/v1/transactions/initiate',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $accessToken
        ]
    ]);
    
    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    
    if ($httpCode === 200) {
        return json_decode($response, true);
    } else {
        throw new Exception('Transaction initiation failed: ' . $response);
    }
}
?>`,
    
    python: `import requests
import json
import time
import random
import string
from typing import Dict, Any

def initiate_transaction(access_token: str) -> Dict[str, Any]:
    """Initiate a new transaction with FirstChekout"""
    
    # Generate unique reference
    timestamp = str(int(time.time()))
    random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=9))
    payment_ref = f"txn_{timestamp}_{random_suffix}"
    
    payload = {
        "Amount": 10000,  # Amount in kobo (₦100.00)
        "PayerEmail": "customer@example.com",
        "PayerName": "John Doe",
        "Purpose": "Product Purchase",
        "PublicKey": os.getenv('FIRSTCHEKOUT_PUBLIC_KEY'),
        "PaymentReference": payment_ref,
        "metadata": {
            "cart_id": "abc123",
            "order_source": "website",
            "user_id": "user_456"
        }
    }
    
    try:
        response = requests.post(
            '{{ payment_Gateway_Url }}/api/v1/transactions/initiate',
            json=payload,
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        print(f"Transaction initiation failed: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Error details: {e.response.text}")
        raise`
  };

  const cardPaymentExamples = {
    curl: `curl --location '{{ payment_Gateway_Url }}/api/v1/cards/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "AuthData": "encrypted_card_data_here",
  "AccessCode": "TXN_ACCESS_CODE_123",
  "PaymentReference": "unique-ref-12345"
}'`,
    
    node: `const crypto = require('crypto');

// AES Encryption function
function encryptCardData(cardData, encryptionKey) {
  const algorithm = 'aes-256-gcm';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, encryptionKey);
  
  let encrypted = cipher.update(JSON.stringify(cardData), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return encrypted;
}

async function initiateCardPayment(accessToken, accessCode, paymentReference) {
  const cardData = {
    pan: '5060990580000217499',
    expiryDate: '03/50',
    cvv: '111',
    pin: '1111'
  };
  
  const encryptedData = encryptCardData(cardData, process.env.FIRSTCHEKOUT_ENCRYPTION_KEY);
  
  try {
    const response = await axios.post(
      '{{ payment_Gateway_Url }}/api/v1/cards/initiate',
      {
        AuthData: encryptedData,
        AccessCode: accessCode,
        PaymentReference: paymentReference
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${accessToken}\`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Card payment initiation failed:', error.response?.data);
    throw error;
  }
}`,
    
    php: `<?php
function encryptCardData($cardData, $encryptionKey) {
    $method = 'aes-256-gcm';
    $iv = random_bytes(16);
    $encrypted = openssl_encrypt(
        json_encode($cardData), 
        $method, 
        $encryptionKey, 
        0, 
        $iv, 
        $tag
    );
    
    return base64_encode($iv . $tag . $encrypted);
}

function initiateCardPayment($accessToken, $accessCode, $paymentReference) {
    $cardData = [
        'pan' => '5060990580000217499',
        'expiryDate' => '03/50',
        'cvv' => '111',
        'pin' => '1111'
    ];
    
    $encryptedData = encryptCardData($cardData, $_ENV['FIRSTCHEKOUT_ENCRYPTION_KEY']);
    
    $payload = [
        'AuthData' => $encryptedData,
        'AccessCode' => $accessCode,
        'PaymentReference' => $paymentReference
    ];
    
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => '{{ payment_Gateway_Url }}/api/v1/cards/initiate',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $accessToken
        ]
    ]);
    
    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    
    if ($httpCode === 200) {
        return json_decode($response, true);
    } else {
        throw new Exception('Card payment initiation failed: ' . $response);
    }
}
?>`,
    
    python: `import requests
import json
import os
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import base64

def encrypt_card_data(card_data: dict, encryption_key: str) -> str:
    """Encrypt card data using AES-256-GCM"""
    import secrets
    
    # Generate random IV
    iv = secrets.token_bytes(16)
    
    # Create cipher
    cipher = Cipher(
        algorithms.AES(encryption_key.encode()[:32].ljust(32, b'\\0')),
        modes.GCM(iv),
        backend=default_backend()
    )
    
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(json.dumps(card_data).encode()) + encryptor.finalize()
    
    # Combine IV + tag + ciphertext
    encrypted_data = iv + encryptor.tag + ciphertext
    return base64.b64encode(encrypted_data).decode()

def initiate_card_payment(access_token: str, access_code: str, payment_reference: str) -> dict:
    """Initiate card payment with encrypted card data"""
    
    card_data = {
        "pan": "5060990580000217499",
        "expiryDate": "03/50",
        "cvv": "111",
        "pin": "1111"
    }
    
    encrypted_data = encrypt_card_data(card_data, os.getenv('FIRSTCHEKOUT_ENCRYPTION_KEY'))
    
    payload = {
        "AuthData": encrypted_data,
        "AccessCode": access_code,
        "PaymentReference": payment_reference
    }
    
    try:
        response = requests.post(
            '{{ payment_Gateway_Url }}/api/v1/cards/initiate',
            json=payload,
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        print(f"Card payment initiation failed: {e}")
        raise`
  };

  const statusCheckExamples = {
    curl: `curl --location '{{ payment_Gateway_Url }}/api/v1/transactions/status/{paymentReference}' \\
--header 'Authorization: Bearer {access_token}'`,
    
    node: `async function checkTransactionStatus(accessToken, paymentReference) {
  try {
    const response = await axios.get(
      \`{{ payment_Gateway_Url }}/api/v1/transactions/status/\${paymentReference}\`,
      {
        headers: {
          'Authorization': \`Bearer \${accessToken}\`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Status check failed:', error.response?.data);
    throw error;
  }
}`,
    
    php: `<?php
function checkTransactionStatus($accessToken, $paymentReference) {
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "{{ payment_Gateway_Url }}/api/v1/transactions/status/$paymentReference",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $accessToken
        ]
    ]);
    
    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    
    if ($httpCode === 200) {
        return json_decode($response, true);
    } else {
        throw new Exception('Status check failed: ' . $response);
    }
}
?>`,
    
    python: `def check_transaction_status(access_token: str, payment_reference: str) -> dict:
    """Check the status of a transaction"""
    try:
        response = requests.get(
            f'{{ payment_Gateway_Url }}/api/v1/transactions/status/{payment_reference}',
            headers={
                'Authorization': f'Bearer {access_token}'
            }
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        print(f"Status check failed: {e}")
        raise`
  };

  const webhookExamples = {
    node: `const express = require('express');
const crypto = require('crypto');
const app = express();

// Middleware to capture raw body for signature verification
app.use('/webhook', express.raw({type: 'application/json'}));

app.post('/webhook/firstchekout', (req, res) => {
  const signature = req.headers['x-firstchekout-signature'];
  const webhookSecret = process.env.FIRSTCHEKOUT_WEBHOOK_SECRET;
  
  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(req.body)
    .digest('hex');
  
  if (signature !== expectedSignature) {
    console.error('Invalid webhook signature');
    return res.status(400).send('Invalid signature');
  }
  
  const event = JSON.parse(req.body);
  
  // Handle different event types
  switch (event.event) {
    case 'payment.success':
      console.log(\`Payment successful: \${event.data.paymentReference}\`);
      // Update order status in database
      break;
      
    case 'payment.failed':
      console.log(\`Payment failed: \${event.data.paymentReference}\`);
      // Handle failed payment
      break;
      
    default:
      console.log(\`Unhandled event type: \${event.event}\`);
  }
  
  // Always respond with 200 to acknowledge receipt
  res.status(200).send('OK');
});`,
    
    php: `<?php
// webhook.php
$webhookSecret = $_ENV['FIRSTCHEKOUT_WEBHOOK_SECRET'];
$signature = $_SERVER['HTTP_X_FIRSTCHEKOUT_SIGNATURE'] ?? '';
$payload = file_get_contents('php://input');

// Verify webhook signature
$expectedSignature = hash_hmac('sha256', $payload, $webhookSecret);

if (!hash_equals($signature, $expectedSignature)) {
    http_response_code(400);
    exit('Invalid signature');
}

$event = json_decode($payload, true);

// Handle different event types
switch ($event['event']) {
    case 'payment.success':
        error_log("Payment successful: " . $event['data']['paymentReference']);
        // Update order status in database
        updateOrderStatus($event['data']['paymentReference'], 'completed');
        break;
        
    case 'payment.failed':
        error_log("Payment failed: " . $event['data']['paymentReference']);
        // Handle failed payment
        updateOrderStatus($event['data']['paymentReference'], 'failed');
        break;
        
    default:
        error_log("Unhandled event type: " . $event['event']);
}

// Always respond with 200
http_response_code(200);
echo 'OK';
?>`,
    
    python: `from flask import Flask, request, jsonify
import hmac
import hashlib
import json
import os

app = Flask(__name__)

@app.route('/webhook/firstchekout', methods=['POST'])
def handle_webhook():
    webhook_secret = os.getenv('FIRSTCHEKOUT_WEBHOOK_SECRET')
    signature = request.headers.get('X-FirstChekout-Signature', '')
    payload = request.get_data()
    
    # Verify webhook signature
    expected_signature = hmac.new(
        webhook_secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    if not hmac.compare_digest(signature, expected_signature):
        return jsonify({'error': 'Invalid signature'}), 400
    
    event = json.loads(payload)
    
    # Handle different event types
    if event['event'] == 'payment.success':
        print(f"Payment successful: {event['data']['paymentReference']}")
        # Update order status in database
        update_order_status(event['data']['paymentReference'], 'completed')
        
    elif event['event'] == 'payment.failed':
        print(f"Payment failed: {event['data']['paymentReference']}")
        # Handle failed payment
        update_order_status(event['data']['paymentReference'], 'failed')
    
    else:
        print(f"Unhandled event type: {event['event']}")
    
    # Always respond with 200
    return jsonify({'status': 'success'}), 200

def update_order_status(payment_reference: str, status: str):
    """Update order status in your database"""
    # Implement your database update logic here
    pass`
  };

  // Workflow steps
  const workflowSteps = [
    {
      step: 1,
      title: "Generate Access Token",
      description: "Authenticate with FirstChekout using OAuth 2.0 client credentials",
      duration: "~500ms",
      icon: Shield,
      details: [
        "Use your Client ID and Client Secret",
        "Make POST request to identity service",
        "Receive access token (valid for 30 minutes)",
        "Store token securely for subsequent requests"
      ]
    },
    {
      step: 2,
      title: "Initialize Transaction",
      description: "Create a new payment transaction with customer and amount details",
      duration: "~300ms",
      icon: Database,
      details: [
        "Provide amount in kobo (multiply naira by 100)",
        "Include customer email and name",
        "Generate unique payment reference",
        "Receive access code for payment processing"
      ]
    },
    {
      step: 3,
      title: "Process Payment",
      description: "Handle the actual payment based on selected method",
      duration: "~2-30s",
      icon: CreditCard,
      details: [
        "Card: Encrypt data and handle OTP verification",
        "USSD: Generate code for customer to dial",
        "Transfer: Create virtual account for payment",
        "QR: Generate scannable payment code"
      ]
    },
    {
      step: 4,
      title: "Verify Transaction",
      description: "Check payment status and handle completion",
      duration: "~200ms",
      icon: CheckCircle,
      details: [
        "Query transaction status endpoint",
        "Handle success/failure responses",
        "Update order status in your system",
        "Send confirmation to customer"
      ]
    },
    {
      step: 5,
      title: "Handle Webhook",
      description: "Receive real-time payment notifications",
      duration: "Instant",
      icon: Webhook,
      details: [
        "Verify webhook signature for security",
        "Process payment success/failure events",
        "Update database with final status",
        "Respond with HTTP 200 to acknowledge"
      ]
    }
  ];

  // Error codes documentation
  const errorCodes = [
    {
      code: "AUTH_001",
      message: "Invalid or expired access token",
      httpStatus: 401,
      severity: "High",
      description: "The provided access token is invalid, expired, or malformed",
      causes: [
        "Token has expired (30-minute lifetime)",
        "Invalid Client ID or Client Secret used",
        "Token format is incorrect",
        "Using sandbox token in live environment"
      ],
      solutions: [
        "Generate a new access token using valid credentials",
        "Implement automatic token refresh logic",
        "Verify Client ID and Client Secret are correct",
        "Ensure environment consistency (sandbox vs live)"
      ],
      example: `{
  "status": false,
  "message": "Invalid or expired access token",
  "code": "AUTH_001",
  "details": {
    "field": "authorization",
    "issue": "Token expired at 2025-01-15T10:30:00Z"
  }
}`
    },
    {
      code: "VAL_001",
      message: "Validation error in request parameters",
      httpStatus: 400,
      severity: "Medium",
      description: "One or more request parameters failed validation",
      causes: [
        "Missing required fields",
        "Invalid data types or formats",
        "Amount is zero or negative",
        "Invalid email format"
      ],
      solutions: [
        "Check all required fields are provided",
        "Validate data types before sending",
        "Ensure amount is positive integer in kobo",
        "Use valid email format"
      ],
      example: `{
  "status": false,
  "message": "Validation error",
  "code": "VAL_001",
  "details": {
    "field": "Amount",
    "issue": "Amount must be greater than 0"
  }
}`
    },
    {
      code: "PAY_001",
      message: "Payment processing failed",
      httpStatus: 400,
      severity: "High",
      description: "The payment could not be processed due to various reasons",
      causes: [
        "Insufficient funds in customer account",
        "Card declined by issuing bank",
        "Invalid card details",
        "Network timeout during processing"
      ],
      solutions: [
        "Ask customer to check account balance",
        "Suggest alternative payment method",
        "Verify card details are correct",
        "Implement retry logic with exponential backoff"
      ],
      example: `{
  "status": false,
  "message": "Payment processing failed",
  "code": "PAY_001",
  "details": {
    "field": "card",
    "issue": "Insufficient funds"
  }
}`
    },
    {
      code: "REF_001",
      message: "Duplicate payment reference",
      httpStatus: 409,
      severity: "Medium",
      description: "The payment reference has already been used",
      causes: [
        "Reusing the same payment reference",
        "Race condition in reference generation",
        "Insufficient randomness in reference"
      ],
      solutions: [
        "Generate unique references using timestamp + random string",
        "Implement proper reference generation logic",
        "Check for duplicates before submission",
        "Use UUIDs for guaranteed uniqueness"
      ],
      example: `{
  "status": false,
  "message": "Duplicate payment reference",
  "code": "REF_001",
  "details": {
    "field": "PaymentReference",
    "issue": "Reference 'txn_123' already exists"
  }
}`
    },
    {
      code: "ENC_001",
      message: "Card data encryption error",
      httpStatus: 400,
      severity: "Critical",
      description: "Card data encryption failed or is invalid",
      causes: [
        "Invalid encryption key",
        "Malformed encrypted data",
        "Encryption algorithm mismatch",
        "Card data not properly formatted"
      ],
      solutions: [
        "Verify encryption key is correct",
        "Use AES-256-GCM encryption algorithm",
        "Ensure card data is properly formatted before encryption",
        "Test encryption with sample data first"
      ],
      example: `{
  "status": false,
  "message": "Card data encryption error",
  "code": "ENC_001",
  "details": {
    "field": "AuthData",
    "issue": "Unable to decrypt card data"
  }
}`
    },
    {
      code: "NET_001",
      message: "Network timeout or connectivity issue",
      httpStatus: 408,
      severity: "Medium",
      description: "Request timed out or network connectivity failed",
      causes: [
        "Slow network connection",
        "Server overload",
        "Firewall blocking requests",
        "DNS resolution issues"
      ],
      solutions: [
        "Implement retry logic with exponential backoff",
        "Check network connectivity",
        "Verify firewall settings",
        "Use appropriate timeout values (30s recommended)"
      ],
      example: `{
  "status": false,
  "message": "Request timeout",
  "code": "NET_001",
  "details": {
    "field": "request",
    "issue": "Request timed out after 30 seconds"
  }
}`
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const apiFlowDiagram = `
graph LR
    A[Generate Token] --> B[Initiate Transaction]
    B --> C[Select Payment Method]
    C --> D1[Card + Encryption]
    C --> D2[USSD Code]
    C --> D3[Bank Transfer]    
    C --> D4[QR]
    C --> D5[Buy Now Pay Later]
    C --> D6[Pay Attitude]
    D1 --> E[Confirm with OTP]
    D1 --> F[Query Status]
    D2 --> F
    D3 --> F
    D4 --> F
    D5 --> F
    D6 --> F
    E --> F
    F --> G[Webhook Notification]
  `;

  const LanguageSelector = ({ selectedLanguage, onLanguageChange, languages }: any) => (
    <div className="flex flex-wrap gap-2 mb-4">
      {languages.map((lang: string) => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            selectedLanguage === lang
              ? 'bg-bank-blue text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );

  const encryptionCodeCSharp = `/// <summary>
/// Asynchronously encrypts the provided plaintext using AES-GCM with the given key,
/// and includes optional merchant and tenant information as Additional Authenticated Data (AAD).
/// </summary>
/// <param name="plaintext">The plaintext string to encrypt.</param>
/// <param name="keyBytes">The symmetric encryption key (must be 128, 192, or 256 bits).</param>
/// <param name="merchantId">Optional merchant identifier used as part of the AAD.</param>
/// <param name="transactionRef">Optional tenant identifier used as part of the AAD.</param>
/// <returns>A task that resolves to the encrypted data in format [nonce || tag || ciphertext].</returns>
/// <exception cref="ArgumentException">Thrown if plaintext is null or empty.</exception>
/// <exception cref="CryptographicException">Thrown if encryption fails.</exception>
private async Task<byte[]?> EncryptAsync(
    string plaintext,
    byte[] keyBytes,
    string merchantId,
    string transactionRef)
{
    if (string.IsNullOrWhiteSpace(plaintext))
        throw new ArgumentException("Plaintext must not be null or empty.", nameof(plaintext));

    return await Task.Run(() =>
    {
        byte[] plaintextBytes = Encoding.UTF8.GetBytes(plaintext);
        byte[] nonce = RandomNumberGenerator.GetBytes(NonceSize);
        byte[] tag = new byte[TagSizeBytes];
        byte[] ciphertext = new byte[plaintextBytes.Length];
        byte[]? resolvedKey = null;
        var versionBytes = Array.Empty<byte>();

        try
        {
            byte[] combinedAad = ComposeAad(versionBytes, merchantId, transactionRef);

            using var aes = new AesGcm(keyBytes, TagSizeBytes);
            aes.Encrypt(nonce, plaintextBytes, ciphertext, tag, combinedAad);

            byte[]? result = new byte[NonceSize + TagSizeBytes + ciphertext.Length];
            Buffer.BlockCopy(nonce, 0, result, 0, NonceSize);
            Buffer.BlockCopy(tag, 0, result, NonceSize, TagSizeBytes);
            Buffer.BlockCopy(ciphertext, 0, result, NonceSize + TagSizeBytes, ciphertext.Length);
            return result;
        }
        catch (Exception ex)
        {
            throw new CryptographicException("Encryption failed. See logs for details.", ex);
        }
        finally
        {
            CryptographicOperations.ZeroMemory(plaintextBytes);
            CryptographicOperations.ZeroMemory(tag);
            if (resolvedKey != null)
            {
                CryptographicOperations.ZeroMemory(resolvedKey);
            }
        }
    });
}

/// <summary>
/// Combines version bytes, merchant ID, and transaction Reference into a single authenticated data buffer.
/// Optimized to minimize allocations and memory copies.
/// </summary>
/// <param name="versionBytes">Optional version bytes to prepend.</param>
/// <param name="merchantId">Optional merchant identifier.</param>
/// <param name="transactionRef">Optional tenant identifier.</param>
/// <returns>Concatenated byte array of inputs.</returns>
private static byte[] ComposeAad(byte[] versionBytes, string merchantId, string transactionRef)
{
    var utf8 = Encoding.UTF8;

    int merchantLength = string.IsNullOrWhiteSpace(merchantId) ? 0 : utf8.GetByteCount(merchantId);
    int transactionRefLength = string.IsNullOrWhiteSpace(transactionRef) ? 0 : utf8.GetByteCount(transactionRef);
    int totalLength = versionBytes.Length + merchantLength + transactionRefLength;

    if (totalLength == 0)
        return [];

    byte[] combined = new byte[totalLength];
    int offset = 0;

    Buffer.BlockCopy(versionBytes, 0, combined, offset, versionBytes.Length);
    offset += versionBytes.Length;

    if (merchantLength > 0)
        offset += utf8.GetBytes(merchantId, 0, merchantId.Length, combined, offset);

    if (transactionRefLength > 0)
        offset += utf8.GetBytes(transactionRef, 0, transactionRef.Length, combined, offset);

    return combined;
}
private bool IsBase64String(string input)
{
    if (string.IsNullOrWhiteSpace(input))
        return false;

    Span<byte> buffer = new Span<byte>(new byte[input.Length]);
    return Convert.TryFromBase64String(input, buffer, out _);
}
public record DebitCard(string Pan, string ExpiryDate, string Cvv, string Pin);`;

  return (
      <section id="api-sdk" className="mb-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">API/SDK Integration</h2>
          <p className="text-l text-gray-600 mb-4">
            Direct API integration for custom applications. This method provides full control and flexibility,
            supporting any programming language with HTTP client capabilities.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <Code className="h-8 w-8 text-blue-600 mx-auto mb-3"/>
              <h3 className="font-semibold text-blue-900 text-sm">Any Language</h3>
              <p className="text-xs text-blue-700">Works with any language supporting HTTP</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
              <Database className="h-8 w-8 text-emerald-600 mx-auto mb-3"/>
              <h3 className="font-semibold text-emerald-900 text-sm">Full Control</h3>
              <p className="text-xs text-emerald-700">Complete customization of payment flow</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <Webhook className="h-8 w-8 text-purple-600 mx-auto mb-3"/>
              <h3 className="font-semibold text-purple-900 text-sm">Real-time Updates</h3>
              <p className="text-xs text-purple-700">Webhook notifications for events</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">API Integration Flow</h3>
            <MermaidDiagramSudo code={apiFlowDiagram}/>
            <MermaidDiagram>{apiFlowDiagram}</MermaidDiagram>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <Lock className="h-5 w-5 text-amber-600 mr-2"/>
              <h4 className="font-semibold text-amber-900">📚 Comprehensive API Documentation</h4>
            </div>
            <div className="space-y-4">
              <div className="bg-amber-100 border border-amber-300 rounded-lg p-4">
                <h5 className="font-semibold text-amber-900 mb-2">📖 Official API Documentation</h5>
                <p className="text-sm text-amber-800 mb-3">
                  Access our comprehensive Postman documentation for complete API reference, sample requests,
                  response examples, and interactive testing capabilities:
                </p>
                <a
                    href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"
                    className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  📋 View Complete API Documentation
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Step-by-Step Narrative Workflow */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ArrowRight className="h-6 w-6 text-bank-blue mr-3" />
                Complete Payment Workflow
              </h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">📋 End-to-End Payment Process</h4>
                <p className="text-blue-800 mb-6">
                  Follow this comprehensive workflow to implement a complete payment solution. Each step includes 
                  multi-language code examples and detailed explanations.
                </p>
                
                <div className="grid md:grid-cols-5 gap-4">
                  {workflowSteps.map((step, index) => (
                    <button
                      key={step.step}
                      onClick={() => setSelectedWorkflowStep(step.step)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedWorkflowStep === step.step
                          ? 'border-bank-blue bg-white shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          selectedWorkflowStep === step.step ? 'bg-bank-blue text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {step.step}
                        </div>
                        <step.icon className={`h-5 w-5 ${
                          selectedWorkflowStep === step.step ? 'text-bank-blue' : 'text-gray-500'
                        }`} />
                      </div>
                      <h5 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h5>
                      <p className="text-xs text-gray-600 mb-2">{step.description}</p>
                      <span className="text-xs text-blue-600 font-medium">{step.duration}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Workflow Step Content */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                {(() => {
                  const currentStep = workflowSteps.find(s => s.step === selectedWorkflowStep);
                  if (!currentStep) return null;
                  
                  return (
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-bank-blue text-white rounded-full flex items-center justify-center mr-4 font-bold">
                          {currentStep.step}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{currentStep.title}</h4>
                          <p className="text-gray-600">{currentStep.description}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <span className="text-sm text-gray-500">Duration</span>
                          <div className="text-lg font-semibold text-bank-blue">{currentStep.duration}</div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Step Details:</h5>
                          <ul className="space-y-2">
                            {currentStep.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Implementation Notes:</h5>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            {selectedWorkflowStep === 1 && (
                              <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Tokens expire after 30 minutes</li>
                                <li>• Cache tokens to avoid unnecessary requests</li>
                                <li>• Use environment variables for credentials</li>
                                <li>• Implement automatic token refresh</li>
                              </ul>
                            )}
                            {selectedWorkflowStep === 2 && (
                              <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Amount must be in kobo (multiply naira by 100)</li>
                                <li>• Payment reference must be unique</li>
                                <li>• Include metadata for order tracking</li>
                                <li>• Validate email format before submission</li>
                              </ul>
                            )}
                            {selectedWorkflowStep === 3 && (
                              <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Card data must be AES encrypted</li>
                                <li>• Handle OTP verification for cards</li>
                                <li>• USSD codes expire after 15 minutes</li>
                                <li>• Virtual accounts expire after 30 minutes</li>
                              </ul>
                            )}
                            {selectedWorkflowStep === 4 && (
                              <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Poll status every 5-10 seconds during payment</li>
                                <li>• Stop polling after 10 minutes timeout</li>
                                <li>• Handle all possible status values</li>
                                <li>• Update UI based on status changes</li>
                              </ul>
                            )}
                            {selectedWorkflowStep === 5 && (
                              <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Always verify webhook signatures</li>
                                <li>• Respond with HTTP 200 within 10 seconds</li>
                                <li>• Implement idempotency for duplicate events</li>
                                <li>• Log all webhook events for debugging</li>
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Multi-Language Code Examples */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="h-6 w-6 text-emerald-600 mr-3" />
                Multi-Language Implementation Examples
              </h3>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold text-emerald-900 mb-4">🚀 Ready-to-Use Code Samples</h4>
                <p className="text-emerald-800 mb-4">
                  Complete implementation examples in multiple programming languages. Copy, customize, and integrate 
                  these samples directly into your application.
                </p>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-emerald-200 text-center">
                    <Code className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <h5 className="font-semibold text-emerald-900">cURL</h5>
                    <p className="text-xs text-emerald-700">Command line testing</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-emerald-200 text-center">
                    <div className="w-6 h-6 bg-emerald-600 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">JS</span>
                    </div>
                    <h5 className="font-semibold text-emerald-900">Node.js</h5>
                    <p className="text-xs text-emerald-700">JavaScript backend</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-emerald-200 text-center">
                    <div className="w-6 h-6 bg-emerald-600 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PHP</span>
                    </div>
                    <h5 className="font-semibold text-emerald-900">PHP</h5>
                    <p className="text-xs text-emerald-700">Web applications</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-emerald-200 text-center">
                    <div className="w-6 h-6 bg-emerald-600 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PY</span>
                    </div>
                    <h5 className="font-semibold text-emerald-900">Python</h5>
                    <p className="text-xs text-emerald-700">Data & AI applications</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Generate Access Token</h3>
              <p className="text-gray-600 mb-4">
                Authenticate with FirstChekout using OAuth 2.0 client credentials flow. This token will be used 
                for all subsequent API requests.
              </p>

              <div className="mb-6">
                <LanguageSelector 
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                  languages={['curl', 'node', 'php', 'python']}
                />
                <CodeBlock 
                  language={selectedLanguage} 
                  code={tokenGenerationExamples[selectedLanguage as keyof typeof tokenGenerationExamples]} 
                />
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Expected Response:</h4>
                <CodeBlock language="json" code={`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 1800,
  "scope": "payment:read payment:write"
}`} />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-5">
                <h4 className="font-semibold text-blue-900 mb-2">🔐 Security Best Practices</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Store Client ID and Secret in environment variables</li>
                  <li>• Cache tokens and refresh before expiry (30 minutes)</li>
                  <li>• Use HTTPS for all token requests</li>
                  <li>• Store tokens securely and never expose them in client-side code</li>
                  <li>• Implement automatic retry logic for token generation failures</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Initialize Transaction</h3>
              <p className="text-gray-600 mb-4">
                Create a new payment transaction with customer details and amount. This returns an access code 
                that will be used for payment processing.
              </p>

              <div className="mb-6">
                <LanguageSelector 
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                  languages={['curl', 'node', 'php', 'python']}
                />
                <CodeBlock 
                  language={selectedLanguage} 
                  code={initiateTransactionExamples[selectedLanguage as keyof typeof initiateTransactionExamples]} 
                />
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Expected Response:</h4>
                <CodeBlock language="json" code={`{
  "responseCode": "00",
  "responseMessage": "Transaction Initiated Successfully",
  "data": {
    "accessCode": "TXN_ACCESS_CODE_123",
    "paymentReference": "unique-ref-12345",
    "amount": 10000,
    "currency": "NGN",
    "expiresAt": "2025-01-15T11:00:00Z"
  }
}`} />
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-2">💡 Implementation Tips</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Amount must be in kobo (multiply naira by 100)</li>
                  <li>• Payment reference must be unique across all transactions</li>
                  <li>• Include metadata for order tracking and analytics</li>
                  <li>• Validate email format before submission</li>
                  <li>• Store access code securely for payment processing</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Process Card Payment</h3>
              <p className="text-gray-600 mb-4">
                For card payments, encrypt the card data using AES encryption and handle OTP verification.
              </p>

              <div className="mb-6">
                <LanguageSelector 
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                  languages={['curl', 'node', 'php', 'python']}
                />
                <CodeBlock 
                  language={selectedLanguage} 
                  code={cardPaymentExamples[selectedLanguage as keyof typeof cardPaymentExamples]} 
                />
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">🔒 Critical Security Requirement</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• All card data MUST be encrypted using AES-256 before transmission</li>
                  <li>• Never send plain card details over the network</li>
                  <li>• Use your encryption key from the merchant dashboard</li>
                  <li>• Implement proper key management and rotation</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 4: Verify Transaction Status</h3>
              <p className="text-gray-600 mb-4">
                Check the current status of any transaction to confirm payment completion and update your system.
              </p>

              <div className="mb-6">
                <LanguageSelector 
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                  languages={['curl', 'node', 'php', 'python']}
                />
                <CodeBlock 
                  language={selectedLanguage} 
                  code={statusCheckExamples[selectedLanguage as keyof typeof statusCheckExamples]} 
                />
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Status Response Example:</h4>
                <CodeBlock language="json" code={`{
  "responseCode": "00",
  "responseMessage": "Transaction Status Retrieved",
  "data": {
    "transactionReference": "TXN_123456",
    "paymentReference": "unique-ref-12345",
    "amount": 10000,
    "currency": "NGN",
    "status": "successful",
    "paymentMethod": "card",
    "createdAt": "2025-01-15T10:30:00Z",
    "completedAt": "2025-01-15T10:32:15Z",
    "metadata": {
      "cart_id": "abc123",
      "order_source": "website"
    }
  }
}`} />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 5: Handle Webhooks</h3>
              <p className="text-gray-600 mb-4">
                Set up webhook endpoints to receive real-time payment notifications securely.
              </p>

              <div className="mb-6">
                <LanguageSelector 
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={setSelectedLanguage}
                  languages={['node', 'php', 'python']}
                />
                <CodeBlock 
                  language={selectedLanguage} 
                  code={webhookExamples[selectedLanguage as keyof typeof webhookExamples]} 
                />
              </div>
            </div>

            {/* Comprehensive Error Documentation */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                Error Codes & Troubleshooting Guide
              </h3>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-red-900 mb-4">🚨 Comprehensive Error Handling</h4>
                <p className="text-red-800 mb-4">
                  Understanding and properly handling errors is crucial for a robust payment integration. 
                  All FirstChekout errors follow a consistent format with actionable guidance.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-semibold text-red-900 mb-2">Error Structure:</h5>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• <code>status</code>: Boolean success indicator</li>
                      <li>• <code>message</code>: Human-readable description</li>
                      <li>• <code>code</code>: Machine-readable error code</li>
                      <li>• <code>details</code>: Additional context and field info</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-red-900 mb-2">Severity Levels:</h5>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• <span className="bg-red-200 px-2 py-1 rounded text-xs">Critical</span> System failures</li>
                      <li>• <span className="bg-orange-200 px-2 py-1 rounded text-xs">High</span> Payment failures</li>
                      <li>• <span className="bg-yellow-200 px-2 py-1 rounded text-xs">Medium</span> Validation errors</li>
                      <li>• <span className="bg-blue-200 px-2 py-1 rounded text-xs">Low</span> Warnings</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-red-900 mb-2">Response Format:</h5>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Consistent across all endpoints</li>
                      <li>• Includes actionable guidance</li>
                      <li>• Machine and human readable</li>
                      <li>• Structured for easy parsing</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Error Codes Grid */}
              <div className="space-y-6">
                {errorCodes.map((error, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <code className="bg-gray-100 text-gray-800 px-3 py-1 rounded font-mono text-sm">
                          {error.code}
                        </code>
                        <span className={`px-3 py-1 text-xs rounded-full border ${getSeverityColor(error.severity)}`}>
                          {error.severity}
                        </span>
                        <span className="text-sm text-gray-500">HTTP {error.httpStatus}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{error.message}</h4>
                    <p className="text-gray-600 mb-4">{error.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Common Causes:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {error.causes.map((cause, idx) => (
                            <li key={idx} className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Solutions:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {error.solutions.map((solution, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Example Error Response:</h5>
                      <CodeBlock language="json" code={error.example} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Handling Best Practices */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Error Handling Best Practices</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                  <h4 className="font-semibold text-emerald-900 mb-3">✅ Recommended Practices</h4>
                  <ul className="text-sm text-emerald-800 space-y-2">
                    <li>• Implement exponential backoff for retries</li>
                    <li>• Log all errors with context for debugging</li>
                    <li>• Provide user-friendly error messages</li>
                    <li>• Handle network timeouts gracefully</li>
                    <li>• Validate data before API calls</li>
                    <li>• Monitor error rates and patterns</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-semibold text-red-900 mb-3">❌ Common Mistakes</h4>
                  <ul className="text-sm text-red-800 space-y-2">
                    <li>• Not implementing proper retry logic</li>
                    <li>• Exposing sensitive error details to users</li>
                    <li>• Ignoring error codes and relying only on messages</li>
                    <li>• Not logging errors for debugging</li>
                    <li>• Failing to handle network timeouts</li>
                    <li>• Not validating data before API calls</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sample Error Handling Implementation */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Error Handling Implementation</h3>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Universal Error Handler (Node.js):</h4>
                <CodeBlock language="javascript" code={`class FirstChekoutErrorHandler {
  static handleApiError(error) {
    const { response } = error;
    
    if (!response) {
      // Network error
      return {
        type: 'network',
        message: 'Connection failed. Please check your internet connection.',
        retryable: true
      };
    }
    
    const { status, data } = response;
    const errorCode = data?.code || 'UNKNOWN';
    
    switch (errorCode) {
      case 'AUTH_001':
        return {
          type: 'authentication',
          message: 'Session expired. Please refresh and try again.',
          retryable: true,
          action: 'refresh_token'
        };
        
      case 'VAL_001':
        return {
          type: 'validation',
          message: \`Invalid data: \${data.details?.issue || 'Please check your input'}\`,
          retryable: false,
          field: data.details?.field
        };
        
      case 'PAY_001':
        return {
          type: 'payment',
          message: 'Payment failed. Please try a different payment method.',
          retryable: true,
          alternatives: ['ussd', 'transfer', 'qr']
        };
        
      default:
        return {
          type: 'unknown',
          message: data?.message || 'An unexpected error occurred.',
          retryable: false
        };
    }
  }
  
  static async retryWithBackoff(fn, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        const errorInfo = this.handleApiError(error);
        
        if (!errorInfo.retryable || attempt === maxRetries) {
          throw error;
        }
        
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
}`} />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Error Handling Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Always check the <code>status</code> field first</li>
                  <li>• Use error codes for programmatic handling</li>
                  <li>• Display user-friendly messages, not raw API responses</li>
                  <li>• Implement different retry strategies based on error type</li>
                  <li>• Log errors with sufficient context for debugging</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">💳 Supported Payment Methods</h3>
            <p className="text-gray-600 mb-6">
              FirstCheckout supports multiple payment channels to provide your customers with flexible payment options.
              Each method is optimized for the Nigerian market with high success rates.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-blue-100">
                  <CreditCard className="h-6 w-6 text-blue-600 mx-auto"/>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Card Payments</h4>
                <p className="text-sm text-gray-600 mb-2">Secure card processing with 3D authentication</p>
                <div className="text-xs text-blue-600 space-y-1">
                  <div>• Visa & Mastercard</div>
                  <div>• Verve (Local cards)</div>
                  <div>• International cards</div>
                  <div>• OTP verification</div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-emerald-100">
                  <Code className="h-6 w-6 text-emerald-600 mx-auto"/>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">USSD Payments</h4>
                <p className="text-sm text-gray-600 mb-2">Phone-based payments via USSD codes</p>
                <div className="text-xs text-emerald-600 space-y-1">
                  <div>• All major Nigerian banks</div>
                  <div>• No internet required</div>
                  <div>• High success rates</div>
                  <div>• Mobile banking integration</div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-purple-100">
                  <Database className="h-6 w-6 text-purple-600 mx-auto"/>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Bank Transfer</h4>
                <p className="text-sm text-gray-600 mb-2">Direct bank transfers via virtual accounts</p>
                <div className="text-xs text-purple-600 space-y-1">
                  <div>• Virtual account generation</div>
                  <div>• Automatic reconciliation</div>
                  <div>• 30-minute expiry</div>
                  <div>• Real-time confirmation</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-amber-100">
                  <QrCode className="h-6 w-6 text-blue-600 mx-auto"/>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">QR Code Payments</h4>
                <p className="text-sm text-gray-600 mb-2">Scan-to-pay with mobile banking apps</p>
                <div className="text-xs text-blue-600 space-y-1">
                  <div>• Mobile-first experience</div>
                  <div>• Contactless payments</div>
                  <div>• Quick checkout</div>
                  <div>• Bank app integration</div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-green-100">
                  <BriefcaseIcon className="h-6 w-6 text-emerald-600 mx-auto"/>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Buy Now Pay Later</h4>
                <p className="text-sm text-gray-600 mb-2">Flexible payment plans for customers</p>
                <div className="text-xs text-emerald-600 space-y-1">
                  <div>• Installment payments</div>
                  <div>• Credit assessment</div>
                  <div>• Flexible terms</div>
                  <div>• Instant approval</div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-indigo-100">
                  <ScanBarcode className="h-6 w-6 text-purple-600 mx-auto"/>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Pay Attitude</h4>
                <p className="text-sm text-gray-600 mb-2">Advanced payment processing solution</p>
                <div className="text-xs text-purple-600 space-y-1">
                  <div>• Enhanced security</div>
                  <div>• Multi-channel support</div>
                  <div>• Smart routing</div>
                  <div>• Optimized success rates</div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">🎯 Payment Method Selection</h4>
              <p className="text-sm text-blue-800">
                You can configure which payment methods to display to your customers using the <code className="bg-blue-100 px-1 rounded">options</code>
                parameter in your integration. This allows you to customize the checkout experience based on your business needs.
              </p>
            </div>
          </div>
          
          {/* API Reference Quick Links */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <BookOpen className="h-6 w-6 mr-2" />
              Complete API Reference
            </h3>
            <p className="text-blue-800 mb-4">
              For comprehensive endpoint documentation, interactive examples, and testing capabilities, 
              visit our complete API reference documentation.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">What You'll Find:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Complete endpoint reference</li>
                  <li>• Interactive request/response examples</li>
                  <li>• Parameter validation details</li>
                  <li>• Status code explanations</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Testing Features:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Live API testing environment</li>
                  <li>• Sample data and responses</li>
                  <li>• Code generation for multiple languages</li>
                  <li>• Postman collection export</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4">
              <a
                href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"
                className="inline-flex items-center px-6 py-3 bg-bank-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Access Complete API Documentation
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
  );
};