import React from 'react';
import { ArrowRight, BookOpen, Code, Zap, Users, CheckCircle, CreditCard, Smartphone, QrCode, Building } from 'lucide-react';
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
      color: 'blue',
      link: '/payment-methods',
      features: ['Card Payments', 'USSD', 'Bank Transfer', 'QR Codes']
    },
    {
      title: 'Send Money',
      description: 'Make instant transfers to bank accounts and mobile money numbers',
      icon: Smartphone,
      color: 'emerald',
      link: '/api-sdk',
      features: ['Bank Transfers', 'Mobile Money', 'Bulk Payments', 'Instant Settlement']
    },
    {
      title: 'Verify Customers',
      description: 'Verify phone numbers, bank accounts, and customer details',
      icon: Users,
      color: 'purple',
      link: '/security',
      features: ['KYC Verification', 'Account Validation', 'Identity Checks', 'Compliance']
    },
    {
      title: 'No-Code Solutions',
      description: 'Create payment links and accept payments without coding',
      icon: QrCode,
      color: 'amber',
      link: '/payment-links',
      features: ['Payment Links', 'QR Codes', 'Dashboard Tools', 'Quick Setup']
    }
  ];

  const integrationMethods = [
    {
      title: 'API Integration',
      description: 'Full control with REST APIs',
      icon: Code,
      link: '/api-sdk',
      tag: 'Advanced'
    },
    {
      title: 'NPM Package',
      description: 'JavaScript frameworks',
      icon: BookOpen,
      link: '/npm-package',
      tag: 'Popular'
    },
    {
      title: 'WordPress Plugin',
      description: 'WooCommerce integration',
      icon: Building,
      link: '/wordpress',
      tag: 'Easy'
    },
    {
      title: 'Payment Links',
      description: 'No-code solution',
      icon: QrCode,
      link: '/payment-links',
      tag: 'Instant'
    }
  ];

  return (
    <div className="mb-16">
      <section id="overview" className="mb-12">
        {/* Hero Section */}
        <div className="bg-bank-blue rounded-xl p-6 md:p-8 text-white mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">FirstChekout Payment Gateway</h1>
          <p className="text-base md:text-lg text-white/90 mb-4 md:mb-6 leading-relaxed">
            The official payment gateway by First Bank of Nigeria, designed for merchants to receive payments
            seamlessly via multiple payment methods including cards, USSD, and bank transfers.
          </p>
          <div className="flex flex-wrap gap-2 md:gap-4">
            <span className="bg-bank-gold bg-opacity-20 px-3 py-1 rounded-full text-xs md:text-sm">PCI DSS Compliant</span>
            <span className="bg-bank-gold bg-opacity-20 px-3 py-1 rounded-full text-xs md:text-sm">Multi-Method Support</span>
            <span className="bg-bank-gold bg-opacity-20 px-3 py-1 rounded-full text-xs md:text-sm">Easy Integration</span>
            <span className="bg-bank-gold bg-opacity-20 px-3 py-1 rounded-full text-xs md:text-sm">Real-time Webhooks</span>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quick-start" className="mb-12">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Get Started Quickly</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            Choose your integration path and start accepting payments in minutes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {quickStartItems.map((item, index) => (
              <Link
                  key={index}
                  to={item.link}
                  className="group relative bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div
                      className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-${item.color}-100 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`h-6 w-6 md:h-8 md:w-8 text-${item.color}-600`}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-bank-blue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {feature}
              </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight
                      className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-hover:text-bank-blue group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </Link>
          ))}
        </div>
      </section>

      {/* Integration Methods */}
      <section id="integration-options" className="mb-12">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Integration Methods</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Multiple ways to integrate FirstChekout into your application
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {integrationMethods.map((method, index) => (
              <Link
                  key={index}
                  to={method.link}
                  className="group relative bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-gray-200 hover:border-bank-blue hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute top-3 md:top-4 right-3 md:right-4">
                <span className="text-xs bg-bank-blue text-white px-2 py-1 rounded-full">
                  {method.tag}
                </span>
                </div>
                <div className="mb-3 md:mb-4">
                  <div
                      className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-bank-blue group-hover:text-white transition-colors duration-300">
                    <method.icon className="h-5 w-5 md:h-6 md:w-6"/>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-bank-blue transition-colors">
                {method.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                {method.description}
              </p>
              <div className="flex items-center text-bank-blue text-xs md:text-sm font-medium">
                Learn more
                <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform duration-300"/>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* High-Level Integration Flow */}
      <section id="integration-flow" className="mb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">High-Level Integration Flow</h2>
          <p className="text-gray-600 mb-4 md:mb-6">
            This diagram outlines the complete merchant journey from registration to live payment processing.
          </p>

          <div className="mb-4 md:mb-6">
            <MermaidDiagramSudo code={integrationFlowDiagram}/>
            <MermaidDiagram>{integrationFlowDiagram}</MermaidDiagram>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="mb-12">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Why Choose FirstChekout?</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Built for Nigerian businesses with global standards
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-600"/>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">99.9% Uptime</h4>
            <p className="text-xs md:text-sm text-gray-600">
              Reliable infrastructure with comprehensive monitoring
            </p>


          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Zap className="h-6 w-6 md:h-8 md:w-8 text-blue-600"/>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Lightning Fast</h4>
            <p className="text-xs md:text-sm text-gray-600">
              Sub-second response times for all API calls
            </p>
          </div>
        </div>
        
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Users className="h-6 w-6 md:h-8 md:w-8 text-purple-600"/>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">24/7 Support</h4>
            <p className="text-xs md:text-sm text-gray-600">
              Expert support team ready to help when you need it
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
              <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-amber-600"/>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Rich Documentation</h4>
            <p className="text-xs md:text-sm text-gray-600">
              Comprehensive guides and examples for every use case
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started CTA */}
      <section id="get-started" className="mb-12">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Ready to Get Started?</h2>
          <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto">
            Join thousands of businesses already using FirstChekout to power their payment experiences
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Link
              to="/registration"
              className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-bank-blue text-white rounded-lg hover:bg-bank-blue/90 transition-colors font-semibold text-sm md:text-base"
            >
              Create Account
              <ArrowRight className="ml-2 h-4 w-4"/>
            </Link>
            <Link
              to="/api-sdk"
              className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-white text-bank-blue border-2 border-bank-blue rounded-lg hover:bg-bank-blue hover:text-white transition-colors font-semibold text-sm md:text-base"
            >
              <Code className="mr-2 h-4 w-4"/>
              View API Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};