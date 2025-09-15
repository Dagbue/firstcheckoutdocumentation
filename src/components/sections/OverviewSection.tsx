import React from 'react';
import { ArrowRight, BookOpen, Code, Users, CreditCard, Smartphone, QrCode, Building, CheckCircle, Zap, Shield, Globe, Clock, Star, Target, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MermaidDiagramSudo } from '../MermaidDiagramSudo';
import { MermaidDiagram } from '@lightenna/react-mermaid-diagram';
import { CodeBlock } from '../CodeBlock';

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

  const quickStartCode = `// 5-Minute Quick Start Example
import FBNCheckout from "firstchekout";

// 1. Initialize payment
const payment = {
  live: false, // Start with sandbox
  ref: "quick-start-" + Date.now(),
  amount: 10000, // ₦100.00 in kobo
  customer: {
    firstname: "John",
    lastname: "Doe", 
    email: "john@example.com"
  },
  publicKey: "sb-pk-your-sandbox-key",
  description: "Quick Start Payment",
  currency: "NGN",
  callback: (response) => {
    if (response.status === "successful") {
      console.log("✅ Payment successful!");
      // Redirect to success page
      window.location.href = "/success";
    } else {
      console.log("❌ Payment failed:", response.message);
      // Handle failure gracefully
    }
  },
  onClose: () => {
    console.log("Payment modal closed");
  }
};

// 2. Launch payment modal
const urls = {
  BaseFrame: "base_frame",
  InitiatePaymentURI: "initiate_payment_URI"
};

FBNCheckout.initiateTransactionAsync(payment, urls)
  .then(() => console.log("Payment modal opened"))
  .catch(error => console.error("Error:", error));`;

  const authenticationExample = `// Authentication Headers
const headers = {
  'Authorization': 'Bearer YOUR_SECRET_KEY',
  'Content-Type': 'application/json',
  'X-API-Version': '2024-01-01'
};

// Making authenticated requests
fetch('https://api.firstchekout.com/v1/transactions', {
  method: 'POST',
  headers,
  body: JSON.stringify(transactionData)
});`;

  const currencyExample = `// Currency Handling - Always use subunits
const examples = {
  "₦1.00": 100,      // 1 naira = 100 kobo
  "₦10.50": 1050,    // 10.50 naira = 1,050 kobo
  "₦1,000.00": 100000 // 1,000 naira = 100,000 kobo
};

// Convert naira to kobo
function nairaToKobo(naira) {
  return Math.round(naira * 100);
}

// Convert kobo to naira
function koboToNaira(kobo) {
  return kobo / 100;
}`;

  const quickStartItems = [
    {
      title: 'Accept Payments',
      description: 'Start collecting payments in 5 minutes with our simple integration',
      icon: CreditCard,
      color: 'blue',
      link: '/payment-methods',
      features: ['Card Payments', 'USSD', 'Bank Transfer', 'QR Codes'],
      time: '5 minutes',
      difficulty: 'Beginner'
    },
    {
      title: 'API Integration',
      description: 'Full control with REST APIs for custom applications',
      icon: Code,
      color: 'emerald',
      link: '/api-sdk',
      features: ['REST APIs', 'Webhooks', 'Custom Logic', 'Full Control'],
      time: '15 minutes',
      difficulty: 'Advanced'
    },
    {
      title: 'NPM Package',
      description: 'Modern JavaScript frameworks integration',
      icon: Package,
      color: 'purple',
      link: '/npm-package',
      features: ['React', 'Vue', 'Angular', 'TypeScript'],
      time: '10 minutes',
      difficulty: 'Intermediate'
    },
    {
      title: 'No-Code Solutions',
      description: 'Payment links and WordPress plugins without coding',
      icon: QrCode,
      color: 'amber',
      link: '/payment-links',
      features: ['Payment Links', 'WordPress', 'QR Codes', 'Dashboard'],
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
      time: '30 minutes',
      languages: ['cURL', 'Node.js', 'PHP', 'Python', 'C#'],
      features: ['Custom workflows', 'Server-side control', 'Webhook handling']
    },
    {
      title: 'NPM Package',
      description: 'JavaScript frameworks',
      icon: BookOpen,
      link: '/npm-package',
      tag: 'Popular',
      difficulty: 'Intermediate',
      time: '15 minutes',
      languages: ['JavaScript', 'TypeScript', 'React', 'Vue'],
      features: ['Promise-based', 'Framework agnostic', 'Type definitions']
    },
    {
      title: 'CDN Script',
      description: 'Static websites and legacy apps',
      icon: Globe,
      link: '/cdn-script',
      tag: 'Simple',
      difficulty: 'Beginner',
      time: '10 minutes',
      languages: ['HTML', 'JavaScript', 'PHP'],
      features: ['No dependencies', 'Quick setup', 'Legacy support']
    },
    {
      title: 'WordPress Plugin',
      description: 'WooCommerce integration',
      icon: Building,
      link: '/wordpress',
      tag: 'Easy',
      difficulty: 'Beginner',
      time: '5 minutes',
      languages: ['WordPress', 'WooCommerce'],
      features: ['No coding', 'Point & click', 'E-commerce ready']
    },
    {
      title: 'Payment Links',
      description: 'No-code solution',
      icon: QrCode,
      link: '/payment-links',
      tag: 'Instant',
      difficulty: 'Beginner',
      time: '2 minutes',
      languages: ['Dashboard only'],
      features: ['No coding', 'QR codes', 'Instant setup']
    }
  ];

  const features = [
    {
      icon: CheckCircle,
      title: '99.9% Uptime',
      description: 'Reliable infrastructure with comprehensive monitoring and automatic failover',
      color: 'emerald',
      metric: '99.9%'
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'PCI DSS Level 1 compliant with end-to-end encryption',
      color: 'red',
      metric: 'PCI DSS L1'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-second response times for all API calls and transactions',
      color: 'blue',
      metric: '<200ms'
    },
    {
      icon: Globe,
      title: 'Multi-Channel',
      description: 'Support for cards, USSD, bank transfers, QR codes, and more',
      color: 'purple',
      metric: '6+ Methods'
    }
  ];

  const commonConcepts = [
    {
      title: 'Currency Subunits',
      description: 'All amounts in kobo (1 NGN = 100 kobo)',
      icon: Database,
      example: '₦100.00 = 10,000 kobo'
    },
    {
      title: 'Transaction References',
      description: 'Unique identifiers for each payment',
      icon: Target,
      example: 'txn_' + Date.now()
    },
    {
      title: 'Idempotency',
      description: 'Safe to retry requests with same reference',
      icon: Shield,
      example: 'Same ref = same result'
    },
    {
      title: 'Environment Modes',
      description: 'Sandbox for testing, Live for production',
      icon: Settings,
      example: 'sb-pk vs pk keys'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section id="overview" className="relative">
        <div className="bg-gradient-to-br from-bank-blue via-bank-blue to-blue-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                FirstChekout Payment Gateway
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl">
                The official payment gateway by First Bank of Nigeria. Accept payments seamlessly via multiple 
                payment methods including cards, USSD, bank transfers, and more. Built for Nigerian businesses 
                with global standards.
              </p>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-bank-gold mb-1">5 min</div>
                  <div className="text-sm text-blue-100">Setup time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-bank-gold mb-1">99.9%</div>
                  <div className="text-sm text-blue-100">Uptime SLA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-bank-gold mb-1">6+</div>
                  <div className="text-sm text-blue-100">Payment methods</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-bank-gold mb-1">24/7</div>
                  <div className="text-sm text-blue-100">Support</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">PCI DSS Compliant</span>
                <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Multi-Method Support</span>
                <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Easy Integration</span>
                <span className="bg-bank-gold bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Real-time Webhooks</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/registration"
                  className="inline-flex items-center justify-center px-8 py-4 bg-bank-gold text-bank-blue rounded-lg hover:bg-bank-gold/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/api-sdk"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 font-semibold"
                >
                  <Code className="mr-2 h-5 w-5" />
                  View API Docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quick-start" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Get Started in 5 Minutes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose your integration path and start accepting payments quickly with our comprehensive guides
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Start Code Example</h3>
          <CodeBlock language="javascript" code={quickStartCode} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {quickStartItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group relative bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-bank-blue hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-bank-blue transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                        {item.time}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        item.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.difficulty}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-white text-gray-700 px-2 py-1 rounded border">
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

      {/* Authentication Section */}
      <section id="authentication" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Authentication</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Secure your API calls with proper authentication headers and key management
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication Headers</h3>
            <CodeBlock language="javascript" code={authenticationExample} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Notes</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <ul className="text-sm text-red-800 space-y-2">
                <li>• Never expose secret keys in client-side code</li>
                <li>• Always use HTTPS for API communications</li>
                <li>• Store keys in environment variables</li>
                <li>• Rotate keys regularly in production</li>
                <li>• Use different keys for sandbox and live</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Concepts */}
      <section id="common-concepts" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Common Concepts</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Essential concepts you need to understand before integrating FirstChekout
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {commonConcepts.map((concept, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <concept.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{concept.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{concept.description}</p>
              <code className="text-xs bg-white px-2 py-1 rounded border">{concept.example}</code>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Currency Handling Example</h3>
          <CodeBlock language="javascript" code={currencyExample} />
        </div>
      </section>

      {/* Integration Methods */}
      <section id="integration-options" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Integration Methods</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Multiple ways to integrate FirstChekout into your application, from simple no-code solutions to advanced API integrations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrationMethods.map((method, index) => (
            <Link
              key={index}
              to={method.link}
              className="group relative bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-bank-blue hover:shadow-lg transition-all duration-300"
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
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Difficulty:</span>
                  <span className={`px-2 py-1 rounded-full ${
                    method.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    method.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {method.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Setup time:</span>
                  <span className="text-gray-700">{method.time}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-xs text-gray-500 mb-1">Languages/Frameworks:</div>
                <div className="flex flex-wrap gap-1">
                  {method.languages.slice(0, 3).map((lang, idx) => (
                    <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {lang}
                    </span>
                  ))}
                  {method.languages.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      +{method.languages.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1 mb-4">
                <div className="text-xs text-gray-500 mb-1">Features:</div>
                {method.features.map((feature, idx) => (
                  <div key={idx} className="text-xs text-gray-600 flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center text-bank-blue text-sm font-medium">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* High-Level Integration Flow */}
      <section id="integration-flow" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Integration Workflow</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            This diagram outlines the complete merchant journey from registration to live payment processing
          </p>
        </div>

        <div className="mb-8">
          <MermaidDiagramSudo code={integrationFlowDiagram} />
          <MermaidDiagram>{integrationFlowDiagram}</MermaidDiagram>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Step-by-Step Workflow</h3>
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
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
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
              <div className={`text-2xl font-bold text-${feature.color}-600 mb-2`}>{feature.metric}</div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* API Reference Preview */}
      <section id="api-preview" className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Complete API Reference</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive documentation with interactive examples, multiple language samples, and testing capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Docs</h3>
            <p className="text-gray-600 text-sm mb-3">
              Test API endpoints directly in the browser with live examples and responses
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Live Testing</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Real Responses</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Language Examples</h3>
            <p className="text-gray-600 text-sm mb-3">
              Ready-to-use code samples in multiple programming languages
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">cURL</span>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Node.js</span>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">PHP</span>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Python</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Guide</h3>
            <p className="text-gray-600 text-sm mb-3">
              Best practices for secure implementation and compliance
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">PCI DSS</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Encryption</span>
            </div>
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
            Explore Complete API Documentation
            <ArrowRight className="ml-3 h-6 w-6" />
          </a>
        </div>
      </section>

      {/* Getting Started CTA */}
      <section id="get-started" className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 text-center border border-gray-200">
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
      </section>
    </div>
  );
};