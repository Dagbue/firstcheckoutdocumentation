import React from 'react';
import { ArrowRight, Play, BookOpen, Code, Zap, Users, CheckCircle, ExternalLink, CreditCard, Smartphone, QrCode, Building, FileText, Settings, Shield, HelpCircle, Phone, Key, Package, Globe, WholeWord as Wordpress, Link2, TestTube, Bug } from 'lucide-react';
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
    <section id="overview" className="mb-16">
      {/* Hero Section - Inspired by Screenshots */}
      <div className="bg-gradient-to-br from-bank-blue via-blue-700 to-blue-800 rounded-2xl p-8 lg:p-12 text-white mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-bank-blue/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              FirstChekout Payment Gateway
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              Welcome to the FirstChekout Developer Documentation where you'll learn how to build 
              amazing payment experiences with the FirstChekout API.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                🔒 PCI DSS Compliant
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                ⚡ Real-time Processing
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                🌍 Multi-channel Support
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                📱 Mobile Optimized
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/registration"
                className="inline-flex items-center px-6 py-3 bg-bank-gold text-bank-blue rounded-lg hover:bg-bank-gold/90 transition-colors font-semibold"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors font-semibold"
              >
                <Play className="mr-2 h-5 w-5" />
                API Reference
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* High-Level Integration Flow - Restored from Screenshots */}
      <div className="mb-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">High-Level Integration Flow</h2>
          <p className="text-gray-600 mb-6">
            This diagram outlines the complete merchant journey from registration to live payment processing.
          </p>
          
          <div className="mb-6">
            <MermaidDiagramSudo code={integrationFlowDiagram} />
            <MermaidDiagram>{integrationFlowDiagram}</MermaidDiagram>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              💡 This diagram would render as a visual flowchart in full implementation below.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Section - Inspired by Paystack/Citi Screenshots */}
      <div id="quick-start" className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Quick Start</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your integration path and start accepting payments in minutes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {quickStartItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-16 h-16 bg-${item.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-bank-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
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
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-bank-blue group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Integration Methods */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Integration Methods</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Multiple ways to integrate FirstChekout into your application
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
              <div className="flex items-center text-bank-blue text-sm font-medium">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FirstChekout?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built for Nigerian businesses with global standards
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">99.9% Uptime</h3>
            <p className="text-sm text-gray-600">
              Reliable infrastructure with comprehensive monitoring
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600">
              Sub-second response times for all API calls
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">
              Expert support team ready to help when you need it
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Rich Documentation</h3>
            <p className="text-sm text-gray-600">
              Comprehensive guides and examples for every use case
            </p>
          </div>
        </div>
      </div>

      {/* Getting Started CTA */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 lg:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of businesses already using FirstChekout to power their payment experiences
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/registration"
            className="inline-flex items-center px-8 py-4 bg-bank-blue text-white rounded-lg hover:bg-bank-blue/90 transition-colors font-semibold text-lg"
          >
            Create Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/api-sdk"
            className="inline-flex items-center px-8 py-4 bg-white text-bank-blue border-2 border-bank-blue rounded-lg hover:bg-bank-blue hover:text-white transition-colors font-semibold text-lg"
          >
            <Code className="mr-2 h-5 w-5" />
            View API Docs
          </Link>
        </div>
      </div>
    </section>
  );
};