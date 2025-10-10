import React from 'react';
import { ArrowRight, BookOpen, Code, Users, CreditCard, Smartphone, QrCode, Building, CheckCircle, Zap, Shield, Globe, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MermaidDiagramSudo } from '../MermaidDiagramSudo';
import { MermaidDiagram } from '@lightenna/react-mermaid-diagram';

export const OverviewSection: React.FC = () => {
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
      color: 'bank-blue',
      link: '/payment-methods',
      features: ['Card Payments', 'USSD', 'Bank Transfer', 'QR Codes'],
      time: '5 minutes'
    },
    {
      title: 'Send Money',
      description: 'Make instant transfers to bank accounts and mobile money numbers',
      icon: Smartphone,
      color: 'bank-gold',
      link: '/api-sdk',
      features: ['Bank Transfers', 'Mobile Money', 'Bulk Payments', 'Instant Settlement'],
      time: '10 minutes'
    },
    {
      title: 'Verify Customers',
      description: 'Verify phone numbers, bank accounts, and customer details',
      icon: Users,
      color: 'bank-blue',
      link: '/security',
      features: ['KYC Verification', 'Account Validation', 'Identity Checks', 'Compliance'],
      time: '3 minutes'
    },
    {
      title: 'No-Code Solutions',
      description: 'Create payment links and accept payments without coding',
      icon: QrCode,
      color: 'bank-gold',
      link: '/payment-links',
      features: ['Payment Links', 'QR Codes', 'Dashboard Tools', 'Quick Setup'],
      time: '2 minutes'
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

  const features = [
    {
      icon: CheckCircle,
      title: '99.9% Uptime',
      description: 'Reliable infrastructure with comprehensive monitoring and automatic failover',
      color: 'bank-blue'
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'PCI DSS Level 1 compliant with end-to-end encryption',
      color: 'bank-gold'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-second response times for all API calls and transactions',
      color: 'bank-blue'
    },
    {
      icon: Globe,
      title: 'Multi-Channel',
      description: 'Support for cards, USSD, bank transfers, QR codes, and more',
      color: 'bank-gold'
    }
  ];

  return (
    <div className="docs-section">
      <section id="overview" className="mb-6">
        {/* Hero Section */}
        {/*<div className="bg-gradient-to-br from-bank-blue via-bank-blue to-blue-800 rounded-2xl p-8 md:p-12 text-white mb-12 relative overflow-hidden">*/}
        {/*  <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>*/}
        {/*  <div className="relative z-10">*/}
        {/*    <div className="max-w-4xl">*/}
        {/*      <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-4 leading-tight">*/}
        {/*        FirstChekout Payment Gateway*/}
        {/*      </h1>*/}
        {/*      <p className="text-l md:text-l text-blue-100 mb-8 leading-relaxed max-w-3xl">*/}
        {/*        The official payment gateway by First Bank of Nigeria. Accept payments seamlessly via multiple */}
        {/*        payment methods including cards, USSD, bank transfers, and more. Built for Nigerian businesses */}
        {/*        with global standards.*/}
        {/*      </p>*/}
        {/*      <div className="flex flex-wrap gap-3 mb-8">*/}
        {/*        <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">PCI DSS Compliant</span>*/}
        {/*        <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Multi-Method Support</span>*/}
        {/*        <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Easy Integration</span>*/}
        {/*        <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Real-time Webhooks</span>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
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
                <div className={`flex-shrink-0 w-16 h-16 ${item.color === 'bank-blue' ? 'bg-blue-100' : 'bg-yellow-100'} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`h-8 w-8 ${item.color === 'bank-blue' ? 'text-bank-blue' : 'text-bank-gold'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-bank-blue transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {item.time}
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
        <div className="bg-white rounded-2xl p-8">
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

          <div className="bg-blue-50 border border-bank-blue rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Integration Steps Overview</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-bank-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">1</div>
                <div className="font-medium text-blue-900">Register</div>
                <div className="text-blue-700">Create merchant account</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-bank-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">2</div>
                <div className="font-medium text-blue-900">Verify</div>
                <div className="text-blue-700">Complete KYC process</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-bank-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">3</div>
                <div className="font-medium text-blue-900">Integrate</div>
                <div className="text-blue-700">Choose integration method</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-bank-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">4</div>
                <div className="font-medium text-blue-900">Go Live</div>
                <div className="text-blue-700">Start accepting payments</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Transaction Flow - CRITICAL */}
      <section id="api-transaction-flow" className="mb-12">
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-red-900">Critical: API Transaction Flow</h2>
              <p className="text-red-700 mt-1">
                You MUST follow this exact sequence - skipping steps will result in failed transactions
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Transaction Flow Diagram</h3>
            <div className="mb-6">
              <MermaidDiagram>
                {`sequenceDiagram
    participant Client as Your Application
    participant Auth as Authentication API
    participant Init as Transaction API
    participant Payment as Payment Method API
    participant Webhook as Your Webhook

    Client->>Auth: 1. Generate OAuth Token
    Auth-->>Client: Access Token (30 min expiry)

    Client->>Init: 2. Initiate Transaction
    Note over Init: POST /transactions/initiate
    Init-->>Client: Transaction Reference

    Client->>Payment: 3. Process Payment Method
    Note over Payment: POST /card or /ussd or /transfer
    Note over Payment: Use Transaction Reference from step 2
    Payment-->>Client: Payment Status

    Payment->>Webhook: 4. Webhook Notification
    Note over Webhook: payment.success or payment.failed
    Webhook-->>Payment: HTTP 200 OK`}
              </MermaidDiagram>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Step-by-Step API Call Sequence</h3>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="border-l-4 border-blue-500 pl-6 py-2">
                <div className="flex items-center mb-2">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">1</span>
                  <h4 className="text-lg font-bold text-gray-900">Generate OAuth Token</h4>
                </div>
                <p className="text-gray-600 mb-3">Authenticate with your Client ID and Client Secret to receive an access token.</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-mono text-gray-800 mb-2">
                    POST https://payment-solution-identity.azurewebsites.net/api/v2/Authenticate/token
                  </p>
                  <p className="text-xs text-gray-600">
                    Body: client_Id, client_Secret, grant_type=client_credentials
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    Response: Access token valid for 30 minutes
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border-l-4 border-orange-500 pl-6 py-2">
                <div className="flex items-center mb-2">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">2</span>
                  <h4 className="text-lg font-bold text-gray-900">Initiate Transaction</h4>
                </div>
                <p className="text-gray-600 mb-3">
                  <strong className="text-red-600">MANDATORY FIRST STEP:</strong> Create a transaction session before any payment method call.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-mono text-gray-800 mb-2">
                    POST {'{'}gateway_url{'}'}/transactions/initiate
                  </p>
                  <p className="text-xs text-gray-600 mb-2">
                    Headers: Authorization: Bearer {'{'}access_token{'}'}
                  </p>
                  <p className="text-xs text-gray-600">
                    Body: amount, currency, customerEmail, customerName, merchantId, callbackUrl
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    Response: <strong>transactionReference</strong> (save this - required for step 3!)
                  </p>
                </div>
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    <strong>⚠️ Common Mistake:</strong> Developers often skip this step and call card/USSD endpoints directly, resulting in "Invalid transaction" errors.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="border-l-4 border-purple-500 pl-6 py-2">
                <div className="flex items-center mb-2">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">3</span>
                  <h4 className="text-lg font-bold text-gray-900">Process Payment Method</h4>
                </div>
                <p className="text-gray-600 mb-3">
                  Call the specific payment method endpoint (Card, USSD, Transfer, QR) using the transaction reference from step 2.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-1">Card Payment:</p>
                    <p className="text-sm font-mono text-gray-800">
                      POST {'{'}gateway_url{'}'}/card/charge
                    </p>
                    <p className="text-xs text-gray-600">
                      Body: transactionReference (from step 2), encryptedCardData, merchantId
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-1">USSD Payment:</p>
                    <p className="text-sm font-mono text-gray-800">
                      POST {'{'}gateway_url{'}'}/ussd/initiate
                    </p>
                    <p className="text-xs text-gray-600">
                      Body: transactionReference (from step 2), bankCode, phoneNumber
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-1">Bank Transfer:</p>
                    <p className="text-sm font-mono text-gray-800">
                      POST {'{'}gateway_url{'}'}/transfer/initiate
                    </p>
                    <p className="text-xs text-gray-600">
                      Body: transactionReference (from step 2), accountNumber, bankCode
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <div className="flex items-center mb-2">
                  <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3 text-sm">4</span>
                  <h4 className="text-lg font-bold text-gray-900">Receive Webhook Notification</h4>
                </div>
                <p className="text-gray-600 mb-3">
                  FirstChekout sends a POST request to your webhook URL with payment status.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-mono text-gray-800 mb-2">
                    POST {'{'}your_webhook_url{'}'}
                  </p>
                  <p className="text-xs text-gray-600">
                    Headers: X-Firstchekout-Signature (verify this!)
                  </p>
                  <p className="text-xs text-gray-600">
                    Body: eventType (payment.success/payment.failed), data (transaction details)
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    Your Response: HTTP 200 OK (acknowledge receipt)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-100 border border-red-400 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-900 mb-3">🚨 Critical Rules - Read This!</h3>
            <ul className="space-y-2 text-sm text-red-800">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span><strong>ALWAYS</strong> call "Initiate Transaction" (Step 2) before any payment method endpoint (Step 3)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span>Use the <strong>transactionReference</strong> from Step 2 in ALL subsequent payment calls</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span>NEVER skip steps or call payment endpoints directly without initiation</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">4.</span>
                <span>Tokens expire in 30 minutes - implement caching and refresh logic</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">5.</span>
                <span>Always verify webhook signatures to prevent fraud</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">6.</span>
                <span>Use unique transaction references for each payment (never reuse)</span>
              </li>
            </ul>
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
              <div className={`w-16 h-16 ${feature.color === 'bank-blue' ? 'bg-blue-100' : 'bg-yellow-100'} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-8 w-8 ${feature.color === 'bank-blue' ? 'text-bank-blue' : 'text-bank-gold'}`} />
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
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-bank-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Docs</h3>
              <p className="text-gray-600 text-sm">
                Test API endpoints directly in the browser with live examples and responses
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Code Examples</h3>
              <p className="text-gray-600 text-sm">
                Ready-to-use code samples in multiple programming languages
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-bank-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Guide</h3>
              <p className="text-gray-600 text-sm">
                Best practices for secure implementation and compliance
              </p>
            </div>
          </div>

          {/*<div className="text-center">*/}
          {/*  <a*/}
          {/*    href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"*/}
          {/*    target="_blank"*/}
          {/*    rel="noopener noreferrer"*/}
          {/*    className="inline-flex items-center px-8 py-4 bg-bank-blue text-white rounded-lg hover:bg-bank-blue/90 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"*/}
          {/*  >*/}
          {/*    <BookOpen className="mr-3 h-6 w-6" />*/}
          {/*    Explore API Documentation*/}
          {/*    <ArrowRight className="ml-3 h-6 w-6" />*/}
          {/*  </a>*/}
          {/*</div>*/}
        </div>
      </section>

      {/* Getting Started CTA */}
      {/*<section id="get-started" className="mb-12">*/}
      {/*  <div className="bg-gradient-to-r from-blue-50 via-gray-50 to-yellow-50 rounded-2xl p-8 lg:p-12 text-center">*/}
      {/*    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>*/}
      {/*    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">*/}
      {/*      Join thousands of businesses already using FirstChekout to power their payment experiences. */}
      {/*      Start accepting payments in minutes with our simple integration process.*/}
      {/*    </p>*/}
      {/*    */}
      {/*    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">*/}
      {/*      <Link*/}
      {/*        to="/docs/registration"*/}
      {/*        className="inline-flex items-center justify-center px-8 py-4 bg-bank-blue text-white rounded-lg hover:bg-bank-blue/90 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"*/}
      {/*      >*/}
      {/*        Create Account*/}
      {/*        <ArrowRight className="ml-2 h-5 w-5" />*/}
      {/*      </Link>*/}
      {/*      <Link*/}
      {/*        to="/"*/}
      {/*        className="inline-flex items-center justify-center px-8 py-4 bg-white text-bank-blue border-2 border-bank-blue rounded-lg hover:bg-bank-blue hover:text-white transition-colors font-semibold text-lg"*/}
      {/*      >*/}
      {/*        <Code className="mr-2 h-5 w-5" />*/}
      {/*        View Integration Guide*/}
      {/*      </Link>*/}
      {/*    </div>*/}

      {/*    <div className="grid md:grid-cols-3 gap-8 text-center">*/}
      {/*      <div>*/}
      {/*        <div className="text-3xl font-bold text-bank-blue mb-2">5 min</div>*/}
      {/*        <div className="text-gray-600">Average setup time</div>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <div className="text-3xl font-bold text-bank-gold mb-2">99.9%</div>*/}
      {/*        <div className="text-gray-600">System uptime</div>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <div className="text-3xl font-bold text-bank-blue mb-2">24/7</div>*/}
      {/*        <div className="text-gray-600">Expert support</div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
    </div>
  );
};