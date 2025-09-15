import React from 'react';
import { ArrowRight, BookOpen, Code, Users, CreditCard, Smartphone, QrCode, Building, CheckCircle, Zap, Shield, Globe, Clock, Key, Database, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MermaidDiagramSudo } from '../MermaidDiagramSudo';
import { MermaidDiagram } from '@lightenna/react-mermaid-diagram';
import { CodeBlock } from '../CodeBlock';

export const OverviewSection: React.FC = () => {
  const quickStartCode = `// 5-Minute Quick Start Example
import FBNCheckout from "firstchekout";

// 1. Initialize payment (30 seconds)
const config = {
  live: false, // Use sandbox for testing
  ref: "quick-start-" + Date.now(),
  amount: 100000, // ₦1,000.00 in kobo
  customer: {
    firstname: "John",
    lastname: "Doe",
    email: "john@example.com"
  },
  publicKey: "sb-pk-your-sandbox-key-here",
  description: "Quick Start Payment",
  currency: "NGN",
  callback: (response) => {
    if (response.status === "successful") {
      console.log("Payment successful!", response.reference);
      // Redirect to success page
      window.location.href = "/success";
    } else {
      console.log("Payment failed:", response.message);
      // Handle failure
    }
  },
  onClose: () => {
    console.log("Payment modal closed");
  }
};

// 2. Process payment (2-3 minutes)
const addressURL = {
  BaseFrame: "base_frame",
  InitiatePaymentURI: "initiate_payment_URI"
};

// 3. Launch payment modal
FBNCheckout.initiateTransactionAsync(config, addressURL)
  .then(() => console.log("Payment initiated"))
  .catch(error => console.error("Error:", error));`;

  const authenticationCode = `// Authentication Examples

// 1. Generate OAuth Token (cURL)
curl --location 'https://payment-solution-identity.azurewebsites.net/api/v2/Authenticate/token' \\
--header 'Content-Type: application/x-www-form-urlencoded' \\
--data-urlencode 'client_Id=your-client-id' \\
--data-urlencode 'client_Secret=your-client-secret' \\
--data-urlencode 'grant_type=client_credentials'

// 2. Use Token in API Calls
curl --location 'https://payment-solution-gateway.azurewebsites.net/api/v1/transactions/initiate' \\
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \\
--header 'Content-Type: application/json' \\
--data '{
  "amount": 100000,
  "email": "customer@example.com",
  "reference": "unique-ref-123"
}'

// 3. Node.js Authentication Helper
const generateToken = async () => {
  const response = await fetch('https://payment-solution-identity.azurewebsites.net/api/v2/Authenticate/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_Id: process.env.FIRSTCHEKOUT_CLIENT_ID,
      client_Secret: process.env.FIRSTCHEKOUT_CLIENT_SECRET,
      grant_type: 'client_credentials'
    })
  });
  
  const data = await response.json();
  return data.access_token;
};`;

  const commonConceptsCode = `// Common Concepts Examples

// 1. Currency Subunits (Always use kobo, not naira)
const amounts = {
  naira: 1000,        // ❌ Wrong - Don't use naira directly
  kobo: 100000,       // ✅ Correct - ₦1,000.00 in kobo
  conversion: 1000 * 100  // ✅ Convert naira to kobo
};

// 2. Transaction References (Must be unique)
const generateReference = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return \`txn_\${timestamp}_\${random}\`;
};

// 3. Idempotency (Prevent duplicate transactions)
const idempotentRequest = {
  reference: "unique-ref-12345", // Same reference = same transaction
  amount: 50000,
  email: "customer@example.com",
  // If you retry with same reference, you get same result
};

// 4. Environment Modes
const environments = {
  sandbox: {
    publicKey: "sb-pk-sandbox-key",
    live: false,
    description: "For testing and development"
  },
  production: {
    publicKey: "pk-live-production-key", 
    live: true,
    description: "For real money transactions"
  }
};

// 5. Status Codes
const statusCodes = {
  PENDING: "Transaction initiated, awaiting payment",
  SUCCESS: "Payment completed successfully", 
  FAILED: "Payment failed or was declined",
  CANCELLED: "Customer cancelled the payment"
};`;

  const endpointsCode = `// API Endpoints Reference

// Base URLs
const baseUrls = {
  identity: "https://payment-solution-identity.azurewebsites.net",
  gateway: "https://payment-solution-gateway.azurewebsites.net",
  sandbox_identity: "https://www.firstchekoutdev.com/identityserver",
  sandbox_gateway: "https://www.firstchekoutdev.com/apigateway"
};

// 1. Authentication Endpoint
// POST /api/v2/Authenticate/token
const authRequest = {
  method: "POST",
  url: "\${baseUrls.identity}/api/v2/Authenticate/token",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: {
    client_Id: "string (required)",      // Your client ID
    client_Secret: "string (required)",  // Your client secret  
    grant_type: "client_credentials"     // Always this value
  },
  response: {
    access_token: "string",              // Use in Authorization header
    token_type: "Bearer",                // Token type
    expires_in: 1800                     // Expires in 30 minutes
  }
};

// 2. Initialize Transaction
// POST /api/v1/transactions/initiate
const initializeRequest = {
  method: "POST", 
  url: "\${baseUrls.gateway}/api/v1/transactions/initiate",
  headers: {
    "Authorization": "Bearer ACCESS_TOKEN",
    "Content-Type": "application/json"
  },
  body: {
    amount: "number (required)",         // Amount in kobo (min: 100)
    email: "string (required)",          // Customer email (valid format)
    reference: "string (required)",      // Unique transaction reference
    currency: "NGN",                     // Always NGN
    callback_url: "string (optional)",   // Redirect URL after payment
    metadata: "object (optional)"        // Additional data
  },
  response: {
    status: "boolean",                   // Success indicator
    message: "string",                   // Response message
    data: {
      authorization_url: "string",       // Payment URL
      access_code: "string",             // Transaction access code
      reference: "string"                // Your transaction reference
    }
  }
};

// 3. Verify Transaction
// GET /api/v1/transactions/verify/:reference
const verifyRequest = {
  method: "GET",
  url: "\${baseUrls.gateway}/api/v1/transactions/verify/TRANSACTION_REFERENCE",
  headers: {
    "Authorization": "Bearer ACCESS_TOKEN"
  },
  response: {
    status: "boolean",
    message: "string", 
    data: {
      reference: "string",               // Transaction reference
      amount: "number",                  // Amount in kobo
      status: "success|failed|pending",  // Payment status
      gateway_response: "string",        // Gateway message
      paid_at: "string",                 // Payment timestamp
      customer: "object"                 // Customer details
    }
  }
};`;

  const integrationFlowDiagram = `
graph TD
    A[Start: Visit Portal] --> B[Register Account]
    B --> C[Complete KYC & Approval]
    C --> D[Fetch API Keys]
    D --> E[Choose Integration Path]
    E --> F1[API/SDK: Custom Apps]
    E --> F2[NPM: JS Sites]
    E --> F3[CDN: Static Sites]
    E --> F4[WordPress Plugin]
    E --> F5[Payment Links: No-Code]
    F1 --> G[Test in Sandbox]
    F2 --> G
    F3 --> G
    F4 --> G
    F5 --> G
    G --> H[Go Live: Toggle to Production]
    H --> I[Monitor Transactions via Webhooks]
  `;

  const quickStartItems = [
    {
      title: 'Accept Payments',
      description: 'Collect payments from cards, bank accounts, and mobile money',
      icon: CreditCard,
      color: 'blue',
      link: '/payment-methods',
      features: ['Card Payments', 'USSD', 'Bank Transfer', 'QR Codes'],
      time: '5 minutes',
      difficulty: 'Easy'
    },
    {
      title: 'Send Money',
      description: 'Make instant transfers to bank accounts and mobile money numbers',
      icon: Smartphone,
      color: 'emerald',
      link: '/api-sdk',
      features: ['Bank Transfers', 'Mobile Money', 'Bulk Payments', 'Instant Settlement'],
      time: '10 minutes',
      difficulty: 'Medium'
    },
    {
      title: 'Verify Customers',
      description: 'Verify phone numbers, bank accounts, and customer details',
      icon: Users,
      color: 'purple',
      link: '/security',
      features: ['KYC Verification', 'Account Validation', 'Identity Checks', 'Compliance'],
      time: '3 minutes',
      difficulty: 'Easy'
    },
    {
      title: 'No-Code Solutions',
      description: 'Create payment links and accept payments without coding',
      icon: QrCode,
      color: 'amber',
      link: '/payment-links',
      features: ['Payment Links', 'QR Codes', 'Dashboard Tools', 'Quick Setup'],
      time: '2 minutes',
      difficulty: 'Beginner'
    }
  ];

  const integrationMethods = [
    {
      title: 'API Integration',
      description: 'Full control with REST APIs',
      icon: Code,
      link: '/api-sdk',
      tag: 'Advanced',
      difficulty: 'Advanced',
      time: '30 minutes'
    },
    {
      title: 'NPM Package',
      description: 'JavaScript frameworks',
      icon: BookOpen,
      link: '/npm-package',
      tag: 'Popular',
      difficulty: 'Intermediate',
      time: '15 minutes'
    },
    {
      title: 'WordPress Plugin',
      description: 'WooCommerce integration',
      icon: Building,
      link: '/wordpress',
      tag: 'Easy',
      difficulty: 'Beginner',
      time: '10 minutes'
    },
    {
      title: 'Payment Links',
      description: 'No-code solution',
      icon: QrCode,
      link: '/payment-links',
      tag: 'Instant',
      difficulty: 'Beginner',
      time: '5 minutes'
    }
  ];

  const authenticationSteps = [
    {
      step: 1,
      title: "Obtain API Credentials",
      description: "Get your Client ID and Client Secret from the merchant dashboard",
      icon: Key,
      details: [
        "Login to your FirstChekout merchant portal",
        "Navigate to API Keys section",
        "Copy your Client ID (public identifier)",
        "Securely store your Client Secret (never expose in frontend)"
      ]
    },
    {
      step: 2,
      title: "Generate Access Token",
      description: "Use OAuth 2.0 client credentials flow to get access token",
      icon: Shield,
      details: [
        "Make POST request to token endpoint",
        "Include Client ID and Client Secret",
        "Receive access token (expires in 30 minutes)",
        "Store token securely for API calls"
      ]
    },
    {
      step: 3,
      title: "Include in API Calls",
      description: "Add Bearer token to Authorization header for all API requests",
      icon: Globe,
      details: [
        "Add 'Authorization: Bearer TOKEN' header",
        "Use HTTPS for all API communications",
        "Handle token expiration gracefully",
        "Implement token refresh logic"
      ]
    }
  ];

  const commonConcepts = [
    {
      title: "Currency Subunits",
      description: "Always use kobo (smallest unit) for amounts",
      icon: CreditCard,
      color: "blue",
      examples: [
        "₦1.00 = 100 kobo",
        "₦10.50 = 1,050 kobo", 
        "₦1,000.00 = 100,000 kobo"
      ],
      rule: "Multiply naira by 100 to get kobo"
    },
    {
      title: "Transaction References",
      description: "Unique identifiers for each transaction",
      icon: Database,
      color: "emerald",
      examples: [
        "txn_1640995200_abc123",
        "order_2023_12_31_xyz789",
        "payment_" + Date.now()
      ],
      rule: "Must be unique across all transactions"
    },
    {
      title: "Idempotency",
      description: "Same reference = same transaction result",
      icon: Shield,
      color: "purple",
      examples: [
        "Retry with same reference = same result",
        "Prevents duplicate charges",
        "Safe to retry failed requests"
      ],
      rule: "Use same reference for retries"
    },
    {
      title: "Environment Modes",
      description: "Sandbox for testing, Live for production",
      icon: Globe,
      color: "amber",
      examples: [
        "Sandbox: sb-pk-xxx keys",
        "Live: pk-xxx keys",
        "Different base URLs"
      ],
      rule: "Never mix sandbox and live keys"
    }
  ];

  const features = [
    {
      icon: CheckCircle,
      title: '99.9% Uptime',
      description: 'Reliable infrastructure with comprehensive monitoring and automatic failover',
      color: 'emerald'
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'PCI DSS Level 1 compliant with end-to-end encryption',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-second response times for all API calls and transactions',
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Multi-Channel',
      description: 'Support for cards, USSD, bank transfers, QR codes, and more',
      color: 'purple'
    }
  ];

  return (
    <div className="mb-16">
      <section id="overview" className="mb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-bank-blue via-bank-blue to-blue-800 rounded-2xl p-8 md:p-12 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                FirstChekout API Documentation
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl">
                Complete guide to integrating FirstChekout payment processing. Get started in 5 minutes with our 
                comprehensive API documentation, code examples, and step-by-step guides.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">PCI DSS Compliant</span>
                <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Multi-Language SDKs</span>
                <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">5-Min Setup</span>
                <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/api-sdk"
                  className="inline-flex items-center justify-center px-8 py-4 bg-bank-gold text-bank-blue rounded-lg hover:bg-bank-gold/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-lg"
                >
                  Start Integration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/registration"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 font-semibold text-lg"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Introduction & Quick Start */}
      <section id="introduction-quick-start" className="mb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Introduction & Quick Start</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get up and running with FirstChekout in under 5 minutes. This quick start guide will have you 
              processing payments immediately.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What You'll Build</h3>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-emerald-600 mr-3" />
                  <span className="text-emerald-900 font-semibold">5-Minute Implementation</span>
                </div>
                <ul className="space-y-2 text-emerald-800">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Payment modal integration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Multiple payment methods</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Success/failure handling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Sandbox testing ready</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Prerequisites</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium text-gray-900">FirstChekout Account</span>
                    <p className="text-sm text-gray-600">Sign up at firstchekout.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium text-gray-900">API Keys</span>
                    <p className="text-sm text-gray-600">Get sandbox keys from dashboard</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium text-gray-900">Basic JavaScript</span>
                    <p className="text-sm text-gray-600">Understanding of promises/async</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Quick Start Code</h3>
            <CodeBlock language="javascript" code={quickStartCode} />
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">Next Steps</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/api-keys" className="block p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <Key className="h-6 w-6 text-blue-600 mb-2" />
                <h5 className="font-semibold text-blue-900">Get API Keys</h5>
                <p className="text-sm text-blue-700">Set up authentication</p>
              </Link>
              <Link to="/testing" className="block p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <Shield className="h-6 w-6 text-blue-600 mb-2" />
                <h5 className="font-semibold text-blue-900">Test Integration</h5>
                <p className="text-sm text-blue-700">Use sandbox environment</p>
              </Link>
              <Link to="/payment-methods" className="block p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <CreditCard className="h-6 w-6 text-blue-600 mb-2" />
                <h5 className="font-semibold text-blue-900">Payment Methods</h5>
                <p className="text-sm text-blue-700">Explore all options</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Authentication */}
      <section id="authentication" className="mb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Authentication</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              FirstChekout uses OAuth 2.0 with client credentials flow for secure API authentication. 
              Learn how to authenticate and secure your integration.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {authenticationSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication Examples</h3>
            <CodeBlock language="bash" code={authenticationCode} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <h4 className="text-lg font-semibold text-red-900">Security Requirements</h4>
              </div>
              <ul className="space-y-2 text-red-800 text-sm">
                <li>• Never expose Client Secret in frontend code</li>
                <li>• Always use HTTPS for token requests</li>
                <li>• Store tokens securely (not in localStorage)</li>
                <li>• Implement token refresh before expiry</li>
                <li>• Use environment variables for credentials</li>
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-emerald-600 mr-3" />
                <h4 className="text-lg font-semibold text-emerald-900">Best Practices</h4>
              </div>
              <ul className="space-y-2 text-emerald-800 text-sm">
                <li>• Cache tokens until expiry (30 minutes)</li>
                <li>• Implement automatic retry with backoff</li>
                <li>• Monitor token usage and errors</li>
                <li>• Use separate keys for sandbox/live</li>
                <li>• Rotate credentials regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Common Concepts */}
      <section id="common-concepts" className="mb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Common Concepts</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding these core concepts will help you integrate FirstChekout effectively and avoid common pitfalls.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {commonConcepts.map((concept, index) => (
              <div key={index} className={`bg-${concept.color}-50 border border-${concept.color}-200 rounded-lg p-6`}>
                <div className={`w-12 h-12 bg-${concept.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <concept.icon className={`h-6 w-6 text-${concept.color}-600`} />
                </div>
                <h3 className={`text-lg font-semibold text-${concept.color}-900 mb-2`}>{concept.title}</h3>
                <p className={`text-${concept.color}-700 text-sm mb-4`}>{concept.description}</p>
                <div className="space-y-1">
                  {concept.examples.map((example, idx) => (
                    <div key={idx} className={`text-xs text-${concept.color}-600 bg-white px-2 py-1 rounded`}>
                      {example}
                    </div>
                  ))}
                </div>
                <div className={`mt-3 text-xs font-semibold text-${concept.color}-800 bg-${concept.color}-100 px-2 py-1 rounded`}>
                  {concept.rule}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Implementation Examples</h3>
            <CodeBlock language="javascript" code={commonConceptsCode} />
          </div>
        </div>
      </section>

      {/* 4. Endpoints */}
      <section id="endpoints" className="mb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. API Endpoints Reference</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete reference for all FirstChekout API endpoints with parameters, constraints, and examples.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <Key className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-900 mb-2">Authentication</h3>
              <p className="text-sm text-blue-700">Generate access tokens</p>
              <div className="mt-3 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                POST /api/v2/Authenticate/token
              </div>
            </div>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
              <CreditCard className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-emerald-900 mb-2">Transactions</h3>
              <p className="text-sm text-emerald-700">Initialize and verify payments</p>
              <div className="mt-3 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                POST /api/v1/transactions/initiate
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
              <Database className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-purple-900 mb-2">Verification</h3>
              <p className="text-sm text-purple-700">Check transaction status</p>
              <div className="mt-3 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                GET /api/v1/transactions/verify
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Endpoints Reference</h3>
            <CodeBlock language="javascript" code={endpointsCode} />
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-amber-900 mb-4">Parameter Validation Rules</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-amber-900 mb-2">Required Parameters</h5>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• <code>amount</code>: Integer, minimum 100 kobo (₦1.00)</li>
                  <li>• <code>email</code>: Valid email format, max 255 chars</li>
                  <li>• <code>reference</code>: Unique string, 10-100 chars</li>
                  <li>• <code>client_Id</code>: Your client identifier</li>
                  <li>• <code>client_Secret</code>: Your client secret</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-amber-900 mb-2">Optional Parameters</h5>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• <code>callback_url</code>: Valid HTTPS URL</li>
                  <li>• <code>metadata</code>: Object, max 10 key-value pairs</li>
                  <li>• <code>currency</code>: Always "NGN" (default)</li>
                  <li>• <code>channels</code>: Array of payment methods</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quick-start" className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Get Started in Minutes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose your integration path and start accepting payments quickly with our comprehensive guides
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {quickStartItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-6">
                <div className={`flex-shrink-0 w-16 h-16 bg-${item.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-bank-blue transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {item.time}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      item.difficulty === 'Easy' ? 'bg-blue-100 text-blue-800' :
                      item.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-bank-blue group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Integration Methods */}
      <section id="integration-options" className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Integration Methods</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Multiple ways to integrate FirstChekout into your application, from simple no-code solutions to advanced API integrations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrationMethods.map((method, index) => (
            <Link
              key={index}
              to={method.link}
              className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-bank-blue hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-4 right-4">
                <span className="text-xs bg-bank-blue text-white px-2 py-1 rounded-full">
                  {method.tag}
                </span>
              </div>
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-bank-blue group-hover:text-white transition-colors duration-300">
                  <method.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-bank-blue transition-colors">
                {method.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {method.description}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{method.difficulty}</span>
                <span className="text-gray-500">{method.time}</span>
              </div>
              <div className="flex items-center text-bank-blue text-sm font-medium mt-3">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* High-Level Integration Flow */}
      <section id="integration-flow" className="mb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Integration Flow</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This diagram outlines the complete merchant journey from registration to live payment processing
            </p>
          </div>

          <div className="mb-8">
            <MermaidDiagramSudo code={integrationFlowDiagram} />
            <MermaidDiagram>{integrationFlowDiagram}</MermaidDiagram>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Integration Steps Overview</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">1</div>
                <div className="font-medium text-blue-900">Register</div>
                <div className="text-blue-700">Create merchant account</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">2</div>
                <div className="font-medium text-blue-900">Verify</div>
                <div className="text-blue-700">Complete KYC process</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">3</div>
                <div className="font-medium text-blue-900">Integrate</div>
                <div className="text-blue-700">Choose integration method</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">4</div>
                <div className="font-medium text-blue-900">Go Live</div>
                <div className="text-blue-700">Start accepting payments</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Choose FirstChekout?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Built for Nigerian businesses with global standards and enterprise-grade reliability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* API Reference Preview */}
      <section id="api-preview" className="mb-12">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Complete API Reference</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive documentation with interactive examples, code samples, and testing capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Docs</h3>
              <p className="text-gray-600 text-sm">
                Test API endpoints directly in the browser with live examples and responses
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Code Examples</h3>
              <p className="text-gray-600 text-sm">
                Ready-to-use code samples in multiple programming languages
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Guide</h3>
              <p className="text-gray-600 text-sm">
                Best practices for secure implementation and compliance
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-bank-blue text-white rounded-lg hover:bg-bank-blue/90 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              <BookOpen className="mr-3 h-6 w-6" />
              Explore API Documentation
              <ArrowRight className="ml-3 h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Getting Started CTA */}
      <section id="get-started" className="mb-12">
        <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 text-center border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of businesses already using FirstChekout to power their payment experiences. 
            Start accepting payments in minutes with our simple integration process.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link
              to="/registration"
              className="inline-flex items-center justify-center px-8 py-4 bg-bank-blue text-white rounded-lg hover:bg-bank-blue/90 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/api-sdk"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-bank-blue border-2 border-bank-blue rounded-lg hover:bg-bank-blue hover:text-white transition-colors font-semibold text-lg"
            >
              <Code className="mr-2 h-5 w-5" />
              View Integration Guide
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-bank-blue mb-2">5 min</div>
              <div className="text-gray-600">Average setup time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">99.9%</div>
              <div className="text-gray-600">System uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Expert support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};