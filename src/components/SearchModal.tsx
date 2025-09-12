import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, ArrowRight, Hash, Settings, Code, CreditCard, Shield, HelpCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  section: string;
  content: string;
  path: string;
  anchor?: string;
  category: string;
  icon: React.ComponentType<any>;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Comprehensive search data
  const searchData: SearchResult[] = [
    // Overview
    {
      id: 'overview-intro',
      title: 'FirstChekout Payment Gateway Overview',
      section: 'Overview',
      content: 'FirstChekout payment gateway First Bank Nigeria PCI DSS compliant multi-method support easy integration real-time webhooks secure fast flexible reliable',
      path: '/overview',
      category: 'Getting Started',
      icon: FileText
    },
    {
      id: 'overview-integration-options',
      title: 'Integration Options',
      section: 'Overview',
      content: 'API SDK NPM package CDN script WordPress plugin integration methods custom applications JavaScript React Vue Angular static sites',
      path: '/overview',
      anchor: 'integration-options',
      category: 'Getting Started',
      icon: Code
    },

    // Prerequisites
    {
      id: 'prerequisites-requirements',
      title: 'Prerequisites and Requirements',
      section: 'Prerequisites',
      content: 'First Bank account KYC documents CAC certificate ID utility bill merchant portal requirements business registration',
      path: '/prerequisites',
      category: 'Getting Started',
      icon: Settings
    },
    {
      id: 'prerequisites-technical',
      title: 'Technical Requirements by Integration',
      section: 'Prerequisites',
      content: 'Node.js npm yarn JavaScript TypeScript PHP WordPress WooCommerce technical requirements programming languages HTTP client',
      path: '/prerequisites',
      anchor: 'technical-requirements',
      category: 'Getting Started',
      icon: Code
    },

    // Registration
    {
      id: 'registration-onboarding',
      title: 'Merchant Registration and Onboarding',
      section: 'Registration & Onboarding',
      content: 'merchant registration onboarding KYC documents account creation email verification profile completion bank account setup approval process',
      path: '/registration',
      category: 'Account Setup',
      icon: FileText
    },
    {
      id: 'registration-documents',
      title: 'KYC Document Requirements',
      section: 'Registration & Onboarding',
      content: 'CAC certificate government ID utility bill business license permit document upload requirements mandatory optional',
      path: '/registration',
      anchor: 'kyc-documents',
      category: 'Account Setup',
      icon: FileText
    },
    {
      id: 'registration-flow',
      title: 'Registration Flow Diagram',
      section: 'Registration & Onboarding',
      content: 'registration flow sequence diagram merchant portal admin approval bank system verification timeline process',
      path: '/registration',
      anchor: 'registration-flow',
      category: 'Account Setup',
      icon: FileText
    },

    // API Keys
    {
      id: 'api-keys-credentials',
      title: 'API Keys and Credentials',
      section: 'API Keys & Credentials',
      content: 'public key secret key encryption key client ID client secret OAuth token generation merchant dashboard API credentials',
      path: '/api-keys',
      category: 'Authentication',
      icon: Settings
    },
    {
      id: 'api-keys-types',
      title: 'Key Types and Usage',
      section: 'API Keys & Credentials',
      content: 'public key client-side secret key server-side encryption key AES merchant ID OAuth credentials key types usage',
      path: '/api-keys',
      anchor: 'key-types',
      category: 'Authentication',
      icon: Settings
    },
    {
      id: 'api-keys-environment',
      title: 'Environment Configuration',
      section: 'API Keys & Credentials',
      content: 'sandbox environment live environment test keys production keys environment variables configuration sb- prefix',
      path: '/api-keys',
      anchor: 'environment-config',
      category: 'Authentication',
      icon: Settings
    },
    {
      id: 'api-keys-security',
      title: 'Security Best Practices',
      section: 'API Keys & Credentials',
      content: 'security best practices key management environment variables HTTPS encryption secure storage key rotation access controls',
      path: '/api-keys',
      anchor: 'security-practices',
      category: 'Security',
      icon: Shield
    },

    // API/SDK Integration
    {
      id: 'api-sdk-integration',
      title: 'API/SDK Integration Guide',
      section: 'API/SDK Integration',
      content: 'API SDK integration custom applications HTTP client REST APIs JSON OAuth token generation full control customization',
      path: '/api-sdk',
      category: 'Integration',
      icon: Code
    },
    {
      id: 'api-sdk-token-generation',
      title: 'OAuth Token Generation',
      section: 'API/SDK Integration',
      content: 'OAuth token generation client credentials grant type access token bearer token authentication 30 minutes expiry',
      path: '/api-sdk',
      anchor: 'token-generation',
      category: 'Authentication',
      icon: Code
    },
    {
      id: 'api-sdk-transaction-initiate',
      title: 'Initiate Transaction',
      section: 'API/SDK Integration',
      content: 'initiate transaction payment reference access code amount customer details transaction initiation API endpoint',
      path: '/api-sdk',
      anchor: 'initiate-transaction',
      category: 'Transactions',
      icon: Code
    },
    {
      id: 'api-sdk-card-payment',
      title: 'Card Payment Flow',
      section: 'API/SDK Integration',
      content: 'card payment AES encryption card data OTP verification 3D secure authentication encrypt decrypt',
      path: '/api-sdk',
      anchor: 'card-payment',
      category: 'Payment Methods',
      icon: CreditCard
    },
    {
      id: 'api-sdk-webhooks',
      title: 'Webhook Implementation',
      section: 'API/SDK Integration',
      content: 'webhooks real-time notifications payment status webhook verification signature validation callback URL',
      path: '/api-sdk',
      anchor: 'webhooks',
      category: 'Integration',
      icon: Code
    },
    {
      id: 'api-sdk-payment-methods',
      title: 'Supported Payment Methods',
      section: 'API/SDK Integration',
      content: 'card payments USSD bank transfer QR code buy now pay later pay attitude payment channels Nigerian market',
      path: '/api-sdk',
      anchor: 'payment-methods',
      category: 'Payment Methods',
      icon: CreditCard
    },

    // NPM Package
    {
      id: 'npm-package-integration',
      title: 'NPM Package Integration',
      section: 'NPM Package',
      content: 'NPM package JavaScript frameworks React Vue Angular Node.js promise-based API TypeScript modern web frameworks',
      path: '/npm-package',
      category: 'Integration',
      icon: Code
    },
    {
      id: 'npm-installation',
      title: 'NPM Package Installation',
      section: 'NPM Package',
      content: 'npm install firstchekout package installation yarn npm package manager dependency management',
      path: '/npm-package',
      anchor: 'installation',
      category: 'Integration',
      icon: Code
    },
    {
      id: 'npm-basic-usage',
      title: 'Basic Usage',
      section: 'NPM Package',
      content: 'basic usage import FBNCheckout configuration payment initiation callback handlers promise async await',
      path: '/npm-package',
      anchor: 'basic-usage',
      category: 'Examples',
      icon: Code
    },
    {
      id: 'npm-react-example',
      title: 'React Integration Example',
      section: 'NPM Package',
      content: 'React integration example component state management payment button callback handlers useState useEffect',
      path: '/npm-package',
      anchor: 'react-example',
      category: 'Examples',
      icon: Code
    },
    {
      id: 'npm-vue-example',
      title: 'Vue.js Integration Example',
      section: 'NPM Package',
      content: 'Vue.js integration example reactive data component methods template script setup composition API',
      path: '/npm-package',
      anchor: 'vue-example',
      category: 'Examples',
      icon: Code
    },

    // CDN Script
    {
      id: 'cdn-script-integration',
      title: 'CDN Script Integration',
      section: 'CDN Script',
      content: 'CDN script static websites legacy applications vanilla JavaScript HTML PHP integration no dependencies quick setup',
      path: '/cdn-script',
      category: 'Integration',
      icon: Code
    },
    {
      id: 'cdn-basic-html',
      title: 'Basic HTML Integration',
      section: 'CDN Script',
      content: 'HTML integration CDN script basic implementation vanilla JavaScript payment modal FBNCheckout global object',
      path: '/cdn-script',
      anchor: 'basic-html',
      category: 'Examples',
      icon: Code
    },
    {
      id: 'cdn-php-example',
      title: 'PHP Integration Example',
      section: 'CDN Script',
      content: 'PHP integration example server-side configuration environment variables payment processing form handling',
      path: '/cdn-script',
      anchor: 'php-example',
      category: 'Examples',
      icon: Code
    },

    // WordPress Plugin
    {
      id: 'wordpress-plugin',
      title: 'WordPress Plugin Integration',
      section: 'WordPress Plugin',
      content: 'WordPress plugin WooCommerce integration e-commerce payment gateway plugin installation no coding required',
      path: '/wordpress',
      category: 'Integration',
      icon: Code
    },
    {
      id: 'wordpress-installation',
      title: 'WordPress Plugin Installation',
      section: 'WordPress Plugin',
      content: 'WordPress dashboard plugin installation manual installation ZIP upload plugin activation search FirstChekout',
      path: '/wordpress',
      anchor: 'installation',
      category: 'Integration',
      icon: Code
    },
    {
      id: 'wordpress-woocommerce',
      title: 'WooCommerce Configuration',
      section: 'WordPress Plugin',
      content: 'WooCommerce settings payment methods configuration FirstChekout enable manage settings merchant ID public key secret key',
      path: '/wordpress',
      anchor: 'woocommerce-config',
      category: 'Integration',
      icon: Code
    },
    {
      id: 'wordpress-customer-experience',
      title: 'Customer Experience',
      section: 'WordPress Plugin',
      content: 'customer experience checkout process payment modal payment methods selection order completion status updates',
      path: '/wordpress',
      anchor: 'customer-experience',
      category: 'User Experience',
      icon: Code
    },

    // Payment Links
    {
      id: 'payment-links-overview',
      title: 'Payment Links Overview',
      section: 'Payment Links (No-Code)',
      content: 'payment links no-code dashboard QR code copy link static hybrid dynamic reusable personalized invoicing',
      path: '/payment-links',
      category: 'Integration',
      icon: Code
    },
    {
      id: 'static-payment-links',
      title: 'Static Payment Links',
      section: 'Payment Links (No-Code)',
      content: 'static payment links reusable fixed purpose permanent pay now button standard products donations subscriptions',
      path: '/payment-links',
      anchor: 'static-links',
      category: 'Integration',
      icon: Code
    },
    {
      id: 'hybrid-payment-links',
      title: 'Hybrid Payment Links',
      section: 'Payment Links (No-Code)',
      content: 'hybrid payment links custom alias campaign tracking event registrations marketing campaigns A/B testing',
      path: '/payment-links',
      anchor: 'hybrid-links',
      category: 'Integration',
      icon: Code
    },
    {
      id: 'dynamic-payment-links',
      title: 'Dynamic Payment Links',
      section: 'Payment Links (No-Code)',
      content: 'dynamic payment links personalized invoicing customer details B2B payments one-time links status tracking',
      path: '/payment-links',
      anchor: 'dynamic-links',
      category: 'Integration',
      icon: Code
    },

    // Payment Methods
    {
      id: 'payment-methods-overview',
      title: 'Payment Methods Overview',
      section: 'Payment Methods',
      content: 'payment methods card payments USSD bank transfer QR code buy now pay later pay attitude Nigerian market flexibility',
      path: '/payment-methods',
      category: 'Payment Methods',
      icon: CreditCard
    },
    {
      id: 'payment-card-flow',
      title: 'Card Payment Flow',
      section: 'Payment Methods',
      content: 'card payment flow AES encryption OTP verification 3D secure Visa Mastercard Verve international cards local cards',
      path: '/payment-methods',
      anchor: 'card-flow',
      category: 'Payment Methods',
      icon: CreditCard
    },
    {
      id: 'payment-ussd-flow',
      title: 'USSD Payment Flow',
      section: 'Payment Methods',
      content: 'USSD payment flow mobile banking Nigerian banks USSD codes phone-based payments no internet required high success rates',
      path: '/payment-methods',
      anchor: 'ussd-flow',
      category: 'Payment Methods',
      icon: CreditCard
    },
    {
      id: 'payment-bank-transfer',
      title: 'Bank Transfer Payment',
      section: 'Payment Methods',
      content: 'bank transfer virtual account generation automatic reconciliation 30-minute expiry real-time confirmation',
      path: '/payment-methods',
      anchor: 'bank-transfer',
      category: 'Payment Methods',
      icon: CreditCard
    },
    {
      id: 'payment-test-cards',
      title: 'Test Card Numbers',
      section: 'Payment Methods',
      content: 'test card numbers sandbox testing Verve Mastercard Visa PIN 1111 OTP 123456 test scenarios successful failed',
      path: '/payment-methods',
      anchor: 'test-cards',
      category: 'Testing',
      icon: CreditCard
    },
    {
      id: 'payment-comparison',
      title: 'Payment Method Comparison',
      section: 'Payment Methods',
      content: 'payment method comparison setup time success rate user experience best for quick purchases business payments',
      path: '/payment-methods',
      anchor: 'comparison',
      category: 'Payment Methods',
      icon: CreditCard
    },

    // Testing
    {
      id: 'testing-debugging',
      title: 'Testing and Debugging',
      section: 'Testing & Debugging',
      content: 'testing debugging sandbox environment test scenarios diagnostic tools network connectivity token validation',
      path: '/testing',
      category: 'Testing',
      icon: Code
    },
    {
      id: 'testing-sandbox',
      title: 'Sandbox Environment Setup',
      section: 'Testing & Debugging',
      content: 'sandbox environment setup test keys sb- prefix sandbox URLs test credentials PIN OTP USSD codes',
      path: '/testing',
      anchor: 'sandbox-setup',
      category: 'Testing',
      icon: Code
    },
    {
      id: 'testing-scenarios',
      title: 'Test Scenarios',
      section: 'Testing & Debugging',
      content: 'test scenarios successful card payment failed card payment USSD payment test expected results verification',
      path: '/testing',
      anchor: 'test-scenarios',
      category: 'Testing',
      icon: Code
    },
    {
      id: 'testing-checklist',
      title: 'Pre-Launch Checklist',
      section: 'Testing & Debugging',
      content: 'pre-launch checklist technical validation business validation payment methods webhook endpoint SSL certificate production keys',
      path: '/testing',
      anchor: 'pre-launch-checklist',
      category: 'Testing',
      icon: Code
    },

    // Security
    {
      id: 'security-compliance',
      title: 'Security and Compliance',
      section: 'Security & Compliance',
      content: 'security compliance PCI DSS AES encryption OAuth 2.0 3D secure data protection GDPR NDPR',
      path: '/security',
      category: 'Security',
      icon: Shield
    },
    {
      id: 'security-encryption',
      title: 'Data Encryption',
      section: 'Security & Compliance',
      content: 'data encryption AES-256 encryption card data encryption key management secure transmission never plain text',
      path: '/security',
      anchor: 'encryption',
      category: 'Security',
      icon: Shield
    },
    {
      id: 'security-webhook-verification',
      title: 'Webhook Security',
      section: 'Security & Compliance',
      content: 'webhook security signature verification HTTPS endpoints authentication tamper protection webhook validation',
      path: '/security',
      anchor: 'webhook-security',
      category: 'Security',
      icon: Shield
    },
    {
      id: 'security-configuration',
      title: 'Secure Configuration',
      section: 'Security & Compliance',
      content: 'secure configuration environment variables key storage access controls security checklist vulnerabilities',
      path: '/security',
      anchor: 'secure-config',
      category: 'Security',
      icon: Shield
    },
    {
      id: 'security-incident-response',
      title: 'Security Incident Response',
      section: 'Security & Compliance',
      content: 'security incident response immediate actions emergency contacts isolate systems preserve evidence documentation',
      path: '/security',
      anchor: 'incident-response',
      category: 'Security',
      icon: Shield
    },

    // Troubleshooting
    {
      id: 'troubleshooting-common-issues',
      title: 'Troubleshooting and FAQs',
      section: 'Troubleshooting',
      content: 'troubleshooting common issues error codes diagnostic tools payment modal webhooks authentication problems solutions',
      path: '/troubleshooting',
      category: 'Support',
      icon: HelpCircle
    },
    {
      id: 'troubleshooting-error-codes',
      title: 'Common Error Codes',
      section: 'Troubleshooting',
      content: 'error codes INVALID_PUBLIC_KEY INSUFFICIENT_FUNDS CARD_EXPIRED TRANSACTION_TIMEOUT INVALID_AMOUNT DUPLICATE_REFERENCE solutions',
      path: '/troubleshooting',
      anchor: 'error-codes',
      category: 'Support',
      icon: HelpCircle
    },
    {
      id: 'troubleshooting-scenarios',
      title: 'Troubleshooting Scenarios',
      section: 'Troubleshooting',
      content: 'troubleshooting scenarios payment modal not opening payments failing production webhooks not working symptoms causes solutions',
      path: '/troubleshooting',
      anchor: 'scenarios',
      category: 'Support',
      icon: HelpCircle
    },
    {
      id: 'troubleshooting-faqs',
      title: 'Frequently Asked Questions',
      section: 'Troubleshooting',
      content: 'FAQ frequently asked questions test card payments access tokens webhooks locally sb-pk vs pk keys payment failures international cards',
      path: '/troubleshooting',
      anchor: 'faqs',
      category: 'Support',
      icon: HelpCircle
    },

    // Support
    {
      id: 'support-resources',
      title: 'Support and Resources',
      section: 'Support & Resources',
      content: 'support resources email support live chat API reference merchant portal developer community status page',
      path: '/support',
      category: 'Support',
      icon: Phone
    },
    {
      id: 'support-channels',
      title: 'Support Channels',
      section: 'Support & Resources',
      content: 'support channels email support live chat phone support response time availability business hours technical assistance',
      path: '/support',
      anchor: 'support-channels',
      category: 'Support',
      icon: Phone
    },
    {
      id: 'support-sla',
      title: 'SLA and Service Commitments',
      section: 'Support & Resources',
      content: 'SLA service level agreements system availability uptime guarantee response times critical issues high priority medium priority',
      path: '/support',
      anchor: 'sla',
      category: 'Support',
      icon: Phone
    },
    {
      id: 'support-training',
      title: 'Training and Onboarding',
      section: 'Support & Resources',
      content: 'training onboarding free integration support technical consultation code review testing assistance go-live support',
      path: '/support',
      anchor: 'training',
      category: 'Support',
      icon: Phone
    }
  ];

  // Search function
  const performSearch = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const words = query.split(' ').filter(word => word.length > 1);

    return searchData
      .map(item => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const contentLower = item.content.toLowerCase();
        const sectionLower = item.section.toLowerCase();

        // Exact title match gets highest score
        if (titleLower.includes(query)) score += 100;
        
        // Section match
        if (sectionLower.includes(query)) score += 50;

        // Word matches in title
        words.forEach(word => {
          if (titleLower.includes(word)) score += 30;
          if (contentLower.includes(word)) score += 10;
        });

        // Boost score for exact word matches
        words.forEach(word => {
          const titleWords = titleLower.split(' ');
          const contentWords = contentLower.split(' ');
          if (titleWords.includes(word)) score += 20;
          if (contentWords.includes(word)) score += 5;
        });

        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  };

  // Handle search
  useEffect(() => {
    const searchResults = performSearch(query);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleResultClick = (result: SearchResult) => {
    const fullPath = result.anchor ? `${result.path}#${result.anchor}` : result.path;
    navigate(fullPath);
    onClose();
    setQuery('');

    // Scroll to anchor if present
    if (result.anchor) {
      setTimeout(() => {
        const element = document.getElementById(result.anchor!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const words = query.toLowerCase().split(' ').filter(word => word.length > 1);
    let highlightedText = text;
    
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    });
    
    return highlightedText;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Getting Started': 'bg-blue-100 text-blue-800',
      'Account Setup': 'bg-emerald-100 text-emerald-800',
      'Authentication': 'bg-purple-100 text-purple-800',
      'Integration': 'bg-indigo-100 text-indigo-800',
      'Payment Methods': 'bg-pink-100 text-pink-800',
      'Examples': 'bg-orange-100 text-orange-800',
      'Testing': 'bg-yellow-100 text-yellow-800',
      'Security': 'bg-red-100 text-red-800',
      'Support': 'bg-gray-100 text-gray-800',
      'Transactions': 'bg-green-100 text-green-800',
      'User Experience': 'bg-cyan-100 text-cyan-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center p-4 pt-16">
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" onClick={onClose} />
        
        <div className="relative w-full max-w-2xl transform rounded-lg bg-white shadow-xl transition-all">
          {/* Search Header */}
          <div className="flex items-center border-b border-gray-200 px-4 py-3">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-none outline-none text-gray-900 placeholder-gray-500"
            />
            <button
              onClick={onClose}
              className="ml-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() === '' ? (
              <div className="p-8 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Search Documentation</p>
                <p className="text-sm">
                  Find information about API integration, payment methods, troubleshooting, and more.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {['API integration', 'payment methods', 'WordPress plugin', 'test cards', 'webhooks', 'troubleshooting'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No results found</p>
                <p className="text-sm">
                  Try different keywords or check the spelling. You can search for topics like "API", "payment methods", "WordPress", etc.
                </p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => {
                  const IconComponent = result.icon;
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        index === selectedIndex ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <IconComponent className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 
                              className="text-sm font-medium text-gray-900 truncate"
                              dangerouslySetInnerHTML={{ __html: highlightText(result.title, query) }}
                            />
                            <ArrowRight className="h-3 w-3 text-gray-400 ml-2 flex-shrink-0" />
                          </div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs text-gray-500">{result.section}</span>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(result.category)}`}>
                              {result.category}
                            </span>
                          </div>
                          {result.anchor && (
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <Hash className="h-3 w-3 mr-1" />
                              <span>{result.anchor}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search Footer */}
          {results.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-2 text-xs text-gray-500 flex items-center justify-between">
              <span>{results.length} result{results.length !== 1 ? 's' : ''} found</span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded">↑↓</kbd>
                  <span className="ml-1">navigate</span>
                </span>
                <span className="flex items-center">
                  <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded">↵</kbd>
                  <span className="ml-1">select</span>
                </span>
                <span className="flex items-center">
                  <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded">esc</kbd>
                  <span className="ml-1">close</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};