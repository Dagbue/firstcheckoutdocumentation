import React from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  BookOpen, 
  Settings, 
  CreditCard, 
  Shield, 
  Code, 
  Smartphone, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Key,
  Globe,
  Database,
  Zap,
  Bug,
  Users,
  FileText,
  Lock
} from 'lucide-react';
import { CodeBlock } from '../CodeBlock';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  codeExample?: string;
  codeLanguage?: string;
  relatedLinks?: { title: string; path: string }[];
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

interface FaqCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  count: number;
}

export const FaqSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const categories: FaqCategory[] = [
    {
      id: 'all',
      title: 'All Categories',
      description: 'View all frequently asked questions',
      icon: BookOpen,
      color: 'gray',
      count: 0
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Account setup, registration, and initial configuration',
      icon: Settings,
      color: 'blue',
      count: 8
    },
    {
      id: 'integration',
      title: 'Integration Issues',
      description: 'API, SDK, NPM, CDN, and WordPress integration problems',
      icon: Code,
      color: 'emerald',
      count: 12
    },
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      description: 'Card payments, USSD, bank transfers, and QR codes',
      icon: CreditCard,
      color: 'purple',
      count: 10
    },
    {
      id: 'authentication',
      title: 'Authentication & Keys',
      description: 'API keys, tokens, OAuth, and authentication errors',
      icon: Key,
      color: 'amber',
      count: 9
    },
    {
      id: 'webhooks',
      title: 'Webhooks & Callbacks',
      description: 'Webhook setup, testing, and troubleshooting',
      icon: Globe,
      color: 'indigo',
      count: 7
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      description: 'Encryption, PCI DSS, data protection, and security best practices',
      icon: Shield,
      color: 'red',
      count: 6
    },
    {
      id: 'mobile',
      title: 'Mobile Integration',
      description: 'Mobile app integration, React Native, and mobile-specific issues',
      icon: Smartphone,
      color: 'pink',
      count: 5
    },
    {
      id: 'business-operations',
      title: 'Business Operations',
      description: 'Refunds, disputes, settlements, and business management',
      icon: Users,
      color: 'cyan',
      count: 8
    }
  ];

  const faqItems: FaqItem[] = [
    // Getting Started
    {
      id: 'test-cards-failing',
      question: 'Why are test card payments failing in sandbox?',
      answer: 'Test card payments in sandbox can fail due to incorrect card details, mismatched PIN/OTP, or environment configuration issues. This is a common bottleneck during initial integration testing, often stemming from using production data in sandbox or vice versa.',
      category: 'getting-started',
      tags: ['sandbox', 'test cards', 'PIN', 'OTP', 'environment'],
      severity: 'high',
      codeExample: `// Correct sandbox configuration
const config = {
  live: false, // Must be false for sandbox
  publicKey: "sb-pk_test_abc123", // Must start with "sb-"
  amount: 10000, // Amount in kobo
  customer: {
    firstname: "Test",
    lastname: "User", 
    email: "test@example.com"
  },
  callback: (response) => {
    console.log("Payment Response:", response);
    if (response.status === "successful") {
      console.log("✅ Test payment successful!");
    } else {
      console.log("❌ Payment failed:", response.message);
    }
  }
};

// Test Card Numbers (Sandbox Only):
// Successful: 5060990580000217499 (PIN: 1111, OTP: 123456)
// Failed: 5061830100001895 (PIN: 1111, OTP: 123456)`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'Testing & Debugging', path: '/testing' },
        { title: 'Payment Methods', path: '/payment-methods' }
      ]
    },
    {
      id: 'account-approval-time',
      question: 'How long does account approval take and what can delay it?',
      answer: 'Account approval typically takes 1-3 business days, but delays can occur due to incomplete KYC documents, bank account verification issues, or high application volumes during peak periods.',
      category: 'getting-started',
      tags: ['approval', 'KYC', 'documents', 'timeline'],
      severity: 'medium',
      relatedLinks: [
        { title: 'Registration & Onboarding', path: '/registration' },
        { title: 'Prerequisites', path: '/prerequisites' }
      ]
    },
    {
      id: 'first-bank-account-required',
      question: 'Do I need a First Bank account to use FirstChekout?',
      answer: 'Yes, a First Bank account is mandatory for settlements. This is because FirstChekout is First Bank\'s proprietary payment gateway, and all merchant settlements are processed through First Bank accounts for compliance and security reasons.',
      category: 'getting-started',
      tags: ['First Bank', 'account', 'settlement', 'requirement'],
      severity: 'critical',
      relatedLinks: [
        { title: 'Prerequisites', path: '/prerequisites' },
        { title: 'Registration & Onboarding', path: '/registration' }
      ]
    },
    {
      id: 'kyc-documents-rejected',
      question: 'My KYC documents were rejected. What should I do?',
      answer: 'Document rejections usually occur due to poor image quality, expired documents, or mismatched information. Review the rejection email for specific reasons and resubmit with corrected documents.',
      category: 'getting-started',
      tags: ['KYC', 'documents', 'rejection', 'resubmission'],
      severity: 'high',
      relatedLinks: [
        { title: 'Registration & Onboarding', path: '/registration' }
      ]
    },

    // Integration Issues
    {
      id: 'token-expiration',
      question: 'How long do access tokens last, and how do I handle expiration?',
      answer: 'OAuth access tokens expire after 30 minutes (1800 seconds) to enhance security. This can cause 401 Unauthorized errors during long sessions or batch processes—a frequent challenge for merchants with automated workflows.',
      category: 'integration',
      tags: ['OAuth', 'tokens', 'expiration', '401 error'],
      severity: 'high',
      codeExample: `// Token refresh implementation
class TokenManager {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.token = null;
    this.expiresAt = null;
  }

  async getValidToken() {
    // Check if current token is still valid (with 5-minute buffer)
    if (this.token && this.expiresAt && Date.now() < this.expiresAt - 300000) {
      return this.token;
    }

    // Generate new token
    try {
      const response = await fetch('{{ identity_Service_Url }}/api/v2/Authenticate/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_Id: this.clientId,
          client_Secret: this.clientSecret,
          grant_type: 'client_credentials'
        })
      });

      const data = await response.json();
      this.token = data.access_token;
      this.expiresAt = Date.now() + (data.expires_in * 1000);
      
      return this.token;
    } catch (error) {
      console.error('Token generation failed:', error);
      throw error;
    }
  }

  async makeAuthenticatedRequest(url, options = {}) {
    const token = await this.getValidToken();
    
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': \`Bearer \${token}\`
      }
    });
  }
}

// Usage
const tokenManager = new TokenManager('your_client_id', 'your_client_secret');
const response = await tokenManager.makeAuthenticatedRequest('/api/v1/transactions/initiate', {
  method: 'POST',
  body: JSON.stringify(transactionData)
});`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'API Keys & Credentials', path: '/api-keys' },
        { title: 'API/SDK Integration', path: '/api-sdk' }
      ]
    },
    {
      id: 'payment-modal-not-opening',
      question: 'Payment modal doesn\'t open when I click the pay button',
      answer: 'This is often caused by CDN script loading issues, incorrect public keys, JavaScript errors, or browser popup blockers. It\'s one of the most common integration bottlenecks.',
      category: 'integration',
      tags: ['modal', 'CDN', 'popup blocker', 'JavaScript'],
      severity: 'critical',
      codeExample: `// Debugging payment modal issues
function debugPaymentModal() {
  // 1. Check if CDN script loaded
  if (typeof window.FBNCheckout === 'undefined') {
    console.error('❌ FirstChekout CDN script not loaded');
    console.log('Check: <script src="https://cdn.jsdelivr.net/npm/firstchekout@1.5.41/dist/fbncheckout.js"></script>');
    return false;
  }

  // 2. Validate public key format
  const publicKey = 'your-public-key-here';
  if (!publicKey.startsWith('pk_') && !publicKey.startsWith('sb-pk-')) {
    console.error('❌ Invalid public key format. Expected: pk_xxx or sb-pk-xxx');
    return false;
  }

  // 3. Check environment consistency
  const isTestKey = publicKey.startsWith('sb-pk-');
  const isLiveMode = true; // Your live setting
  if (isLiveMode && isTestKey) {
    console.error('❌ Using test key with live=true');
    return false;
  }

  // 4. Test popup permissions
  const popup = window.open('', '_blank', 'width=1,height=1');
  if (!popup) {
    console.error('❌ Popup blocked by browser');
    alert('Please allow popups for this site and try again');
    return false;
  }
  popup.close();

  console.log('✅ All checks passed');
  return true;
}

// Run before initiating payment
if (debugPaymentModal()) {
  // Proceed with payment
  window.FBNCheckout.default.initiateTransactionAsync(config, addressUrl);
}`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'CDN Script Integration', path: '/cdn-script' },
        { title: 'Troubleshooting', path: '/troubleshooting' }
      ]
    },
    {
      id: 'webhook-not-receiving',
      question: 'Can I test webhooks locally, and why am I not receiving webhook events?',
      answer: 'Webhooks require publicly accessible HTTPS URLs, making local testing challenging. Common issues include firewall blocks, non-200 responses, or SSL certificate problems.',
      category: 'webhooks',
      tags: ['webhooks', 'local testing', 'ngrok', 'HTTPS'],
      severity: 'high',
      codeExample: `// Complete webhook testing setup

// 1. Install and setup ngrok
// npm install -g ngrok
// ngrok http 3000

// 2. Express.js webhook handler
const express = require('express');
const crypto = require('crypto');
const app = express();

// Middleware to capture raw body for signature verification
app.use('/webhook', express.raw({ type: 'application/json' }));

app.post('/webhook/firstchekout', (req, res) => {
  console.log('🔔 Webhook received at:', new Date().toISOString());
  
  try {
    // 1. Verify signature (CRITICAL for security)
    const signature = req.headers['x-firstchekout-signature'];
    const payload = req.body;
    const secret = process.env.WEBHOOK_SECRET;
    
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');
    
    if (signature !== digest) {
      console.error('❌ Invalid webhook signature');
      return res.status(400).send('Invalid signature');
    }

    // 2. Parse and process event
    const event = JSON.parse(payload);
    console.log('Event type:', event.eventType);
    console.log('Payment reference:', event.data.paymentReference);
    
    // 3. Handle different event types
    switch (event.eventType) {
      case 'payment.success':
        console.log('✅ Payment successful:', event.data.amount);
        // Update order status in your database
        break;
      case 'payment.failed':
        console.log('❌ Payment failed:', event.data.reason);
        // Handle failure (send email, update status)
        break;
      case 'payment.pending':
        console.log('⏳ Payment pending verification');
        break;
      default:
        console.log('ℹ️ Unknown event type:', event.eventType);
    }

    // 4. ALWAYS respond with 200 (within 10 seconds)
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 3. Test endpoint
app.get('/webhook/test', (req, res) => {
  res.json({ status: 'Webhook endpoint is working', timestamp: new Date() });
});

app.listen(3000, () => {
  console.log('🚀 Webhook server running on port 3000');
  console.log('📡 Use ngrok to expose: ngrok http 3000');
});

// 4. Testing checklist:
// ✅ Endpoint returns 200 OK
// ✅ HTTPS URL (via ngrok)
// ✅ Signature verification implemented
// ✅ Responds within 10 seconds
// ✅ Handles all event types`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'API/SDK Integration', path: '/api-sdk' },
        { title: 'Security & Compliance', path: '/security' }
      ]
    },
    {
      id: 'environment-mismatch',
      question: 'What\'s the difference between sb-pk and pk keys, and why do they matter?',
      answer: 'Keys prefixed with "sb-" are for sandbox/testing environments only, while "pk-" keys are for live production. Mixing them causes authentication failures or unexpected behaviors—a top integration error for new merchants.',
      category: 'authentication',
      tags: ['API keys', 'sandbox', 'production', 'environment'],
      severity: 'critical',
      codeExample: `// Environment-aware key management
class FirstChekoutConfig {
  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
    this.isProduction = this.environment === 'production';
  }

  getPublicKey() {
    if (this.isProduction) {
      const key = process.env.FIRSTCHEKOUT_LIVE_PUBLIC_KEY;
      if (!key || !key.startsWith('pk_')) {
        throw new Error('Invalid live public key. Must start with pk_');
      }
      return key;
    } else {
      const key = process.env.FIRSTCHEKOUT_SANDBOX_PUBLIC_KEY;
      if (!key || !key.startsWith('sb-pk-')) {
        throw new Error('Invalid sandbox public key. Must start with sb-pk-');
      }
      return key;
    }
  }

  getSecretKey() {
    if (this.isProduction) {
      const key = process.env.FIRSTCHEKOUT_LIVE_SECRET_KEY;
      if (!key || !key.startsWith('sk_')) {
        throw new Error('Invalid live secret key. Must start with sk_');
      }
      return key;
    } else {
      const key = process.env.FIRSTCHEKOUT_SANDBOX_SECRET_KEY;
      if (!key || !key.startsWith('sb-sk-')) {
        throw new Error('Invalid sandbox secret key. Must start with sb-sk-');
      }
      return key;
    }
  }

  getBaseUrl() {
    return this.isProduction 
      ? 'https://payment-solution-gateway.azurewebsites.net'
      : 'https://www.firstchekoutdev.com/apigateway';
  }

  validateConfiguration() {
    try {
      const publicKey = this.getPublicKey();
      const secretKey = this.getSecretKey();
      console.log(\`✅ Configuration valid for \${this.environment} environment\`);
      return true;
    } catch (error) {
      console.error('❌ Configuration error:', error.message);
      return false;
    }
  }
}

// Usage
const config = new FirstChekoutConfig();
if (config.validateConfiguration()) {
  // Proceed with integration
}`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'API Keys & Credentials', path: '/api-keys' },
        { title: 'Testing & Debugging', path: '/testing' }
      ]
    },
    {
      id: 'international-cards',
      question: 'Can customers use international cards, and what are common issues?',
      answer: 'Yes, FirstChekout supports international Visa and Mastercard. However, some issuing banks decline online Nigerian transactions due to fraud rules or currency restrictions, leading to high failure rates for cross-border payments.',
      category: 'payment-methods',
      tags: ['international cards', 'Visa', 'Mastercard', 'declines'],
      severity: 'medium',
      relatedLinks: [
        { title: 'Payment Methods', path: '/payment-methods' },
        { title: 'Security & Compliance', path: '/security' }
      ]
    },
    {
      id: 'payment-failures-graceful',
      question: 'How do I handle payment failures gracefully?',
      answer: 'Payment failures can occur due to insufficient funds, network issues, or bank declines. Implement robust error handling to minimize cart abandonment and provide clear user feedback.',
      category: 'payment-methods',
      tags: ['payment failures', 'error handling', 'user experience'],
      severity: 'high',
      codeExample: `// Comprehensive payment failure handling
function handlePaymentFailure(response) {
  const errorMessages = {
    'insufficient_funds': 'Your account has insufficient funds. Please check your balance or try another card.',
    'card_expired': 'Your card has expired. Please use a different card.',
    'invalid_pin': 'Incorrect PIN entered. Please try again.',
    'transaction_timeout': 'Transaction timed out. Please try again.',
    'card_declined': 'Your card was declined. Please contact your bank or try another payment method.',
    'network_error': 'Network connection issue. Please check your internet and try again.',
    'invalid_otp': 'Incorrect OTP. Please enter the correct code sent to your phone.',
    'daily_limit_exceeded': 'Daily transaction limit exceeded. Try again tomorrow or contact your bank.',
    'card_blocked': 'Your card is temporarily blocked. Please contact your bank.',
    'merchant_blocked': 'Transaction blocked by merchant settings. Contact support.'
  };

  const userFriendlyMessage = errorMessages[response.code] || 
    'Payment could not be completed. Please try again or contact support.';

  // Log for merchant analysis
  console.error('Payment Failed:', {
    code: response.code,
    message: response.message,
    reference: response.reference,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });

  // Show user-friendly message
  showErrorModal({
    title: 'Payment Failed',
    message: userFriendlyMessage,
    actions: [
      { label: 'Try Again', action: () => retryPayment() },
      { label: 'Use Different Method', action: () => showAlternativePayments() },
      { label: 'Contact Support', action: () => openSupportChat() }
    ]
  });

  // Offer alternative payment methods
  if (['card_declined', 'insufficient_funds'].includes(response.code)) {
    suggestAlternativePayments(['USSD', 'Bank Transfer', 'QR Code']);
  }
}

function suggestAlternativePayments(methods) {
  const alternatives = {
    'USSD': 'Pay with your phone using USSD codes - no card required',
    'Bank Transfer': 'Transfer directly from your bank account',
    'QR Code': 'Scan and pay with your mobile banking app'
  };

  const suggestions = methods.map(method => ({
    method,
    description: alternatives[method]
  }));

  showAlternativePaymentModal(suggestions);
}`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'Payment Methods', path: '/payment-methods' },
        { title: 'Troubleshooting', path: '/troubleshooting' }
      ]
    },
    {
      id: 'wordpress-plugin-not-working',
      question: 'FirstChekout WordPress plugin is not working with my WooCommerce store',
      answer: 'WordPress plugin issues often stem from plugin conflicts, outdated versions, incorrect API key configuration, or WooCommerce compatibility problems.',
      category: 'integration',
      tags: ['WordPress', 'WooCommerce', 'plugin', 'compatibility'],
      severity: 'high',
      relatedLinks: [
        { title: 'WordPress Plugin', path: '/wordpress' },
        { title: 'API Keys & Credentials', path: '/api-keys' }
      ]
    },
    {
      id: 'npm-package-installation',
      question: 'NPM package installation fails or shows version conflicts',
      answer: 'NPM installation issues can occur due to Node.js version incompatibility, network restrictions, or dependency conflicts with existing packages in your project.',
      category: 'integration',
      tags: ['NPM', 'installation', 'Node.js', 'dependencies'],
      severity: 'medium',
      codeExample: `// Troubleshoot NPM installation issues

// 1. Check Node.js version (requires 14+)
console.log('Node version:', process.version);

// 2. Clear npm cache
// npm cache clean --force

// 3. Install with specific version
// npm install firstchekout@1.5.41 --save

// 4. Check for conflicts
// npm ls firstchekout

// 5. Alternative installation methods
// yarn add firstchekout@1.5.41
// pnpm add firstchekout@1.5.41

// 6. Verify installation
import FBNCheckout from 'firstchekout';
console.log('FirstChekout loaded:', typeof FBNCheckout);`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'NPM Package', path: '/npm-package' }
      ]
    },

    // Authentication & Keys
    {
      id: 'api-key-invalid',
      question: 'Why do I get "invalid API key" or authentication errors?',
      answer: 'Authentication errors typically stem from using wrong keys for the environment, expired tokens, incorrect key formats, or insufficient permissions for the requested operation.',
      category: 'authentication',
      tags: ['API key', 'authentication', 'invalid key', 'permissions'],
      severity: 'critical',
      codeExample: `// API key validation and debugging
function validateApiKey(key, environment = 'sandbox') {
  console.log('🔍 Validating API key...');
  
  // Check key format
  if (!key || typeof key !== 'string') {
    console.error('❌ API key is missing or invalid type');
    return false;
  }

  // Environment-specific validation
  if (environment === 'sandbox') {
    if (!key.startsWith('sb-pk-') && !key.startsWith('sb-sk-')) {
      console.error('❌ Sandbox keys must start with "sb-pk-" or "sb-sk-"');
      return false;
    }
  } else if (environment === 'live') {
    if (!key.startsWith('pk_') && !key.startsWith('sk_')) {
      console.error('❌ Live keys must start with "pk_" or "sk_"');
      return false;
    }
  }

  // Check key length (minimum security requirement)
  if (key.length < 20) {
    console.error('❌ API key appears too short');
    return false;
  }

  console.log('✅ API key format is valid');
  return true;
}

// Test API key with actual request
async function testApiKey(publicKey, environment = 'sandbox') {
  if (!validateApiKey(publicKey, environment)) {
    return false;
  }

  const baseUrl = environment === 'sandbox' 
    ? 'https://www.firstchekoutdev.com/apigateway'
    : 'https://payment-solution-gateway.azurewebsites.net';

  try {
    // Test with a minimal transaction initiation
    const response = await fetch(\`\${baseUrl}/api/v1/transactions/initiate\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${publicKey}\`
      },
      body: JSON.stringify({
        Amount: 100, // Minimal test amount
        PayerEmail: 'test@example.com',
        PayerName: 'Test User',
        Purpose: 'API Key Test',
        PublicKey: publicKey,
        PaymentReference: 'test-' + Date.now()
      })
    });

    if (response.status === 401) {
      console.error('❌ API key is invalid or expired');
      return false;
    } else if (response.status === 403) {
      console.error('❌ API key lacks required permissions');
      return false;
    } else if (response.ok) {
      console.log('✅ API key is working correctly');
      return true;
    } else {
      console.warn('⚠️ Unexpected response:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Network error testing API key:', error);
    return false;
  }
}

// Usage
const publicKey = process.env.FIRSTCHEKOUT_PUBLIC_KEY;
const environment = process.env.NODE_ENV === 'production' ? 'live' : 'sandbox';

testApiKey(publicKey, environment).then(isValid => {
  if (isValid) {
    console.log('Ready to process payments');
  } else {
    console.log('Please check your API key configuration');
  }
});`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'API Keys & Credentials', path: '/api-keys' },
        { title: 'Testing & Debugging', path: '/testing' }
      ]
    },
    {
      id: 'token-generation-fails',
      question: 'OAuth token generation fails with client credentials',
      answer: 'Token generation failures usually occur due to incorrect Client ID/Secret, network issues, or account status problems. Ensure your credentials are correct and your account is active.',
      category: 'authentication',
      tags: ['OAuth', 'client credentials', 'token generation'],
      severity: 'critical',
      relatedLinks: [
        { title: 'API Keys & Credentials', path: '/api-keys' },
        { title: 'API/SDK Integration', path: '/api-sdk' }
      ]
    },

    // Payment Methods
    {
      id: 'ussd-codes-not-working',
      question: 'USSD codes are not working for customers',
      answer: 'USSD issues can occur due to network problems, incorrect bank selection, or customer account restrictions. In sandbox, all USSD codes should work, but in production, actual bank account status matters.',
      category: 'payment-methods',
      tags: ['USSD', 'bank codes', 'network issues'],
      severity: 'medium',
      relatedLinks: [
        { title: 'Payment Methods', path: '/payment-methods' },
        { title: 'Testing & Debugging', path: '/testing' }
      ]
    },
    {
      id: 'bank-transfer-pending',
      question: 'Bank transfer payments are stuck in pending status',
      answer: 'Bank transfers can remain pending due to incorrect account details, bank processing delays, insufficient funds, or weekend/holiday processing restrictions.',
      category: 'payment-methods',
      tags: ['bank transfer', 'pending', 'virtual account', 'delays'],
      severity: 'medium',
      relatedLinks: [
        { title: 'Payment Methods', path: '/payment-methods' },
        { title: 'Troubleshooting', path: '/troubleshooting' }
      ]
    },
    {
      id: 'card-encryption-errors',
      question: 'Card data encryption is failing or returning errors',
      answer: 'Encryption errors occur due to incorrect encryption key format, wrong algorithm implementation, or malformed card data. All card data must be encrypted using AES-256 before transmission.',
      category: 'security',
      tags: ['encryption', 'AES', 'card data', 'security'],
      severity: 'critical',
      codeExample: `// Correct AES encryption implementation (Node.js)
const crypto = require('crypto');

class CardEncryption {
  constructor(encryptionKey) {
    // Encryption key must be 32 characters for AES-256
    if (!encryptionKey || encryptionKey.length !== 32) {
      throw new Error('Encryption key must be exactly 32 characters');
    }
    this.key = encryptionKey;
  }

  encryptCardData(cardData) {
    try {
      // Validate card data structure
      const requiredFields = ['pan', 'expiryDate', 'cvv', 'pin'];
      for (const field of requiredFields) {
        if (!cardData[field]) {
          throw new Error(\`Missing required field: \${field}\`);
        }
      }

      // Create card data string
      const cardString = JSON.stringify({
        pan: cardData.pan.replace(/\s/g, ''), // Remove spaces
        expiryDate: cardData.expiryDate, // MM/YY format
        cvv: cardData.cvv,
        pin: cardData.pin
      });

      // Generate random IV
      const iv = crypto.randomBytes(16);
      
      // Create cipher
      const cipher = crypto.createCipherGCM('aes-256-gcm', Buffer.from(this.key));
      cipher.setIVLength(16);
      
      // Encrypt
      let encrypted = cipher.update(cardString, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      // Get authentication tag
      const authTag = cipher.getAuthTag();
      
      // Combine IV + AuthTag + Encrypted data
      const result = iv.toString('hex') + authTag.toString('hex') + encrypted;
      
      console.log('✅ Card data encrypted successfully');
      return result;
      
    } catch (error) {
      console.error('❌ Encryption failed:', error.message);
      throw new Error('Card encryption failed: ' + error.message);
    }
  }

  // Test encryption with sample data
  testEncryption() {
    const testCard = {
      pan: '5060990580000217499',
      expiryDate: '03/50',
      cvv: '111',
      pin: '1111'
    };

    try {
      const encrypted = this.encryptCardData(testCard);
      console.log('✅ Encryption test passed');
      return encrypted;
    } catch (error) {
      console.error('❌ Encryption test failed:', error);
      return null;
    }
  }
}

// Usage
const encryptionKey = process.env.FIRSTCHEKOUT_ENCRYPTION_KEY; // 32 characters
const cardEncryption = new CardEncryption(encryptionKey);

// Test before using in production
if (cardEncryption.testEncryption()) {
  console.log('Encryption setup is working correctly');
}`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'Security & Compliance', path: '/security' },
        { title: 'API/SDK Integration', path: '/api-sdk' }
      ]
    },

    // Webhooks
    {
      id: 'webhook-signature-verification',
      question: 'How do I verify webhook signatures for security?',
      answer: 'Webhook signature verification is crucial for security. Use HMAC-SHA256 with your webhook secret to verify that notifications are authentic and haven\'t been tampered with.',
      category: 'webhooks',
      tags: ['webhook', 'signature', 'HMAC', 'security'],
      severity: 'critical',
      codeExample: `// Webhook signature verification (multiple languages)

// Node.js/Express
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload, 'utf8').digest('hex');
  
  // Use timingSafeEqual to prevent timing attacks
  const signatureBuffer = Buffer.from(signature);
  const digestBuffer = Buffer.from(digest);
  
  if (signatureBuffer.length !== digestBuffer.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(signatureBuffer, digestBuffer);
}

// PHP
function verifyWebhookSignaturePHP($payload, $signature, $secret) {
    $expectedSignature = 'sha256=' . hash_hmac('sha256', $payload, $secret);
    return hash_equals($expectedSignature, $signature);
}

// Python
import hmac
import hashlib

def verify_webhook_signature(payload, signature, secret):
    expected_signature = 'sha256=' + hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(expected_signature, signature)

// Usage in Express middleware
app.use('/webhook', express.raw({type: 'application/json'}));

app.post('/webhook/firstchekout', (req, res) => {
  const signature = req.headers['x-firstchekout-signature'];
  const payload = req.body;
  const secret = process.env.WEBHOOK_SECRET;
  
  if (!verifyWebhookSignature(payload, signature, secret)) {
    console.error('❌ Invalid webhook signature');
    return res.status(400).send('Invalid signature');
  }
  
  console.log('✅ Webhook signature verified');
  // Process the webhook...
  res.status(200).send('OK');
});`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'Security & Compliance', path: '/security' },
        { title: 'API/SDK Integration', path: '/api-sdk' }
      ]
    },
    {
      id: 'webhook-retries',
      question: 'How does FirstChekout handle webhook retries and failures?',
      answer: 'FirstChekout automatically retries failed webhooks up to 5 times with exponential backoff. Your endpoint must respond with HTTP 200 within 10 seconds to be considered successful.',
      category: 'webhooks',
      tags: ['webhook', 'retries', 'failures', 'timeout'],
      severity: 'medium',
      relatedLinks: [
        { title: 'API/SDK Integration', path: '/api-sdk' },
        { title: 'Troubleshooting', path: '/troubleshooting' }
      ]
    },

    // Security
    {
      id: 'pci-compliance-requirements',
      question: 'What PCI DSS compliance requirements do I need to meet?',
      answer: 'As a merchant using FirstChekout, you have reduced PCI scope since we handle card data processing. However, you must still secure your environment, use HTTPS, and follow data protection best practices.',
      category: 'security',
      tags: ['PCI DSS', 'compliance', 'security', 'requirements'],
      severity: 'high',
      relatedLinks: [
        { title: 'Security & Compliance', path: '/security' }
      ]
    },
    {
      id: 'data-encryption-requirements',
      question: 'What data must be encrypted and how?',
      answer: 'All card data (PAN, CVV, PIN) must be encrypted using AES-256 before transmission. Never send plain card details over the network, even over HTTPS.',
      category: 'security',
      tags: ['encryption', 'card data', 'AES-256', 'PCI'],
      severity: 'critical',
      relatedLinks: [
        { title: 'Security & Compliance', path: '/security' },
        { title: 'API/SDK Integration', path: '/api-sdk' }
      ]
    },

    // Mobile Integration
    {
      id: 'mobile-app-integration',
      question: 'How do I integrate FirstChekout with mobile apps (React Native, Flutter)?',
      answer: 'Mobile integration can use WebView with our CDN script or direct API calls. Common issues include permission handling, network security policies, and platform-specific configurations.',
      category: 'mobile',
      tags: ['mobile', 'React Native', 'Flutter', 'WebView'],
      severity: 'medium',
      codeExample: `// React Native WebView integration
import React from 'react';
import { WebView } from 'react-native-webview';

const PaymentWebView = ({ amount, email, onPaymentComplete }) => {
  const paymentUrl = \`https://yourserver.com/payment.html?amount=\${amount}&email=\${email}\`;

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.status === 'success') {
        onPaymentComplete(data.response);
      } else if (data.status === 'error') {
        console.error('Payment error:', data.message);
      }
    } catch (error) {
      console.error('Error parsing payment message:', error);
    }
  };

  return (
    <WebView
      source={{ uri: paymentUrl }}
      onMessage={handleMessage}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scalesPageToFit={true}
      mixedContentMode="compatibility"
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
    />
  );
};

// Flutter WebView integration
// pubspec.yaml: webview_flutter: ^4.0.0

import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class PaymentWebView extends StatefulWidget {
  final String amount;
  final String email;
  final Function(Map<String, dynamic>) onPaymentComplete;

  PaymentWebView({required this.amount, required this.email, required this.onPaymentComplete});

  @override
  _PaymentWebViewState createState() => _PaymentWebViewState();
}

class _PaymentWebViewState extends State<PaymentWebView> {
  late final WebViewController controller;

  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..addJavaScriptChannel('ReactNativeWebView', onMessageReceived: (message) {
        final data = jsonDecode(message.message);
        if (data['status'] == 'success') {
          widget.onPaymentComplete(data['response']);
        }
      })
      ..loadRequest(Uri.parse('https://yourserver.com/payment.html?amount=\${widget.amount}&email=\${widget.email}'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Payment')),
      body: WebViewWidget(controller: controller),
    );
  }
}`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'CDN Script Integration', path: '/cdn-script' },
        { title: 'API/SDK Integration', path: '/api-sdk' }
      ]
    },

    // Business Operations
    {
      id: 'refunds-how-to',
      question: 'How do I process refunds and what are the timelines?',
      answer: 'Refunds can be processed through the merchant dashboard or API. Timelines vary: instant for unsettled transactions, 5-7 business days for settled transactions depending on the customer\'s bank.',
      category: 'business-operations',
      tags: ['refunds', 'timeline', 'settlement', 'API'],
      severity: 'medium',
      relatedLinks: [
        { title: 'API/SDK Integration', path: '/api-sdk' },
        { title: 'Support & Resources', path: '/support' }
      ]
    },
    {
      id: 'settlement-delays',
      question: 'Why are my settlements delayed or pending?',
      answer: 'Settlement delays can occur due to bank processing times, compliance reviews, account verification issues, or weekend/holiday schedules. Most settlements complete within 24-48 hours.',
      category: 'business-operations',
      tags: ['settlements', 'delays', 'bank processing', 'compliance'],
      severity: 'medium',
      relatedLinks: [
        { title: 'Support & Resources', path: '/support' }
      ]
    },
    {
      id: 'transaction-limits',
      question: 'What are the transaction limits and how can I increase them?',
      answer: 'Transaction limits vary by account type and verification level. Default limits are ₦1,000,000 per transaction and ₦10,000,000 per day. Contact support with business justification to request increases.',
      category: 'business-operations',
      tags: ['limits', 'transaction limits', 'increase limits'],
      severity: 'low',
      relatedLinks: [
        { title: 'Support & Resources', path: '/support' }
      ]
    },

    // Additional Critical FAQs
    {
      id: 'production-vs-sandbox',
      question: 'How do I switch from sandbox to production safely?',
      answer: 'Switching to production requires careful key management, thorough testing, and environment configuration updates. Never mix sandbox and production keys.',
      category: 'integration',
      tags: ['production', 'sandbox', 'go-live', 'environment'],
      severity: 'critical',
      codeExample: `// Safe production deployment checklist
class ProductionDeployment {
  constructor() {
    this.checklist = [
      'All sandbox tests passing',
      'Production keys obtained',
      'Environment variables updated',
      'Webhook URLs configured',
      'SSL certificates valid',
      'Error handling implemented',
      'Monitoring setup complete'
    ];
  }

  validateProductionReadiness() {
    console.log('🔍 Validating production readiness...');
    
    // 1. Check environment variables
    const requiredEnvVars = [
      'FIRSTCHEKOUT_LIVE_PUBLIC_KEY',
      'FIRSTCHEKOUT_LIVE_SECRET_KEY', 
      'FIRSTCHEKOUT_ENCRYPTION_KEY',
      'WEBHOOK_SECRET'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(\`❌ Missing environment variable: \${envVar}\`);
        return false;
      }
    }

    // 2. Validate key formats
    const publicKey = process.env.FIRSTCHEKOUT_LIVE_PUBLIC_KEY;
    const secretKey = process.env.FIRSTCHEKOUT_LIVE_SECRET_KEY;

    if (!publicKey.startsWith('pk_')) {
      console.error('❌ Live public key must start with pk_');
      return false;
    }

    if (!secretKey.startsWith('sk_')) {
      console.error('❌ Live secret key must start with sk_');
      return false;
    }

    // 3. Test API connectivity
    return this.testProductionAPI();
  }

  async testProductionAPI() {
    try {
      const response = await fetch('https://payment-solution-gateway.azurewebsites.net/health');
      if (response.ok) {
        console.log('✅ Production API is accessible');
        return true;
      } else {
        console.error('❌ Production API health check failed');
        return false;
      }
    } catch (error) {
      console.error('❌ Cannot reach production API:', error);
      return false;
    }
  }

  deployToProduction() {
    if (this.validateProductionReadiness()) {
      console.log('🚀 Ready for production deployment');
      // Update configuration
      process.env.NODE_ENV = 'production';
      return true;
    } else {
      console.error('❌ Production deployment blocked - fix issues first');
      return false;
    }
  }
}

// Usage
const deployment = new ProductionDeployment();
deployment.deployToProduction();`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'Testing & Debugging', path: '/testing' },
        { title: 'API Keys & Credentials', path: '/api-keys' }
      ]
    },
    {
      id: 'webhook-local-testing',
      question: 'How can I test webhooks during local development?',
      answer: 'Use ngrok or similar tunneling tools to expose your local server to the internet. FirstChekout webhooks require publicly accessible HTTPS URLs.',
      category: 'webhooks',
      tags: ['webhooks', 'local testing', 'ngrok', 'development'],
      severity: 'medium',
      codeExample: `// Complete local webhook testing setup

// 1. Install ngrok globally
// npm install -g ngrok

// 2. Start your local server
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook/firstchekout', (req, res) => {
  console.log('📨 Webhook received:', req.body);
  
  // Always respond with 200 OK
  res.status(200).send('OK');
  
  // Process the webhook data
  const { eventType, data } = req.body;
  
  switch (eventType) {
    case 'payment.success':
      console.log('✅ Payment successful:', data.paymentReference);
      // Update your database, send confirmation email, etc.
      break;
    case 'payment.failed':
      console.log('❌ Payment failed:', data.paymentReference);
      // Handle failure, notify customer, etc.
      break;
    default:
      console.log('ℹ️ Unknown event type:', eventType);
  }
});

// Health check endpoint
app.get('/webhook/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`🚀 Webhook server running on port \${PORT}\`);
  console.log('📡 To expose publicly, run: ngrok http ' + PORT);
});

// 3. In another terminal, run ngrok
// ngrok http 3000
// Copy the HTTPS URL (e.g., https://abc123.ngrok.io)

// 4. Configure in FirstChekout dashboard
// Webhook URL: https://abc123.ngrok.io/webhook/firstchekout
// Events: payment.success, payment.failed, payment.pending

// 5. Test with curl
// curl -X POST https://abc123.ngrok.io/webhook/health`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'API/SDK Integration', path: '/api-sdk' },
        { title: 'Testing & Debugging', path: '/testing' }
      ]
    },

    // Additional Integration Issues
    {
      id: 'cors-errors',
      question: 'I\'m getting CORS errors when making API calls from my frontend',
      answer: 'CORS errors occur when making API calls directly from the browser to FirstChekout endpoints. API calls should be made from your backend server, not directly from frontend JavaScript.',
      category: 'integration',
      tags: ['CORS', 'frontend', 'backend', 'API calls'],
      severity: 'high',
      codeExample: `// WRONG: Direct API call from frontend (causes CORS)
// ❌ Don't do this in browser JavaScript
fetch('https://payment-solution-gateway.azurewebsites.net/api/v1/transactions/initiate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_xxx', // NEVER expose secret keys in frontend!
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(transactionData)
});

// CORRECT: Use SDK for frontend, API for backend
// ✅ Frontend (using NPM package or CDN)
import FBNCheckout from 'firstchekout';

const config = {
  live: false,
  publicKey: 'pk_test_xxx', // Public key is safe for frontend
  amount: 10000,
  customer: { /* customer data */ },
  callback: (response) => {
    // Send result to your backend for verification
    fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference: response.reference })
    });
  }
};

FBNCheckout.initiateTransactionAsync(config, addressUrl);

// ✅ Backend (Node.js/Express) - for API calls
app.post('/api/verify-payment', async (req, res) => {
  const { reference } = req.body;
  
  try {
    const response = await fetch(
      \`https://payment-solution-gateway.azurewebsites.net/api/v1/transactions/status/\${reference}\`,
      {
        headers: {
          'Authorization': \`Bearer \${process.env.FIRSTCHEKOUT_SECRET_KEY}\`
        }
      }
    );
    
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'NPM Package', path: '/npm-package' },
        { title: 'API/SDK Integration', path: '/api-sdk' }
      ]
    },
    {
      id: 'duplicate-reference-error',
      question: 'I\'m getting "duplicate reference" errors',
      answer: 'Each transaction must have a unique payment reference. Reusing references causes conflicts. Implement a robust reference generation strategy using timestamps and random components.',
      category: 'integration',
      tags: ['duplicate reference', 'unique ID', 'transaction reference'],
      severity: 'medium',
      codeExample: `// Robust reference generation strategies

// Method 1: Timestamp + Random
function generateUniqueReference(prefix = 'txn') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return \`\${prefix}_\${timestamp}_\${random}\`;
}

// Method 2: UUID-based (requires uuid package)
const { v4: uuidv4 } = require('uuid');

function generateUUIDReference(prefix = 'pay') {
  return \`\${prefix}_\${uuidv4().replace(/-/g, '')}\`;
}

// Method 3: Sequential with database
class ReferenceGenerator {
  constructor(db) {
    this.db = db;
  }

  async generateSequentialReference(merchantId) {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const sequence = await this.getNextSequence(merchantId, today);
    return \`\${merchantId}_\${today}_\${sequence.toString().padStart(6, '0')}\`;
  }

  async getNextSequence(merchantId, date) {
    // Atomic increment in database
    const result = await this.db.query(
      'UPDATE reference_counters SET sequence = sequence + 1 WHERE merchant_id = ? AND date = ? RETURNING sequence',
      [merchantId, date]
    );
    
    if (result.rows.length === 0) {
      // First transaction of the day
      await this.db.query(
        'INSERT INTO reference_counters (merchant_id, date, sequence) VALUES (?, ?, 1)',
        [merchantId, date]
      );
      return 1;
    }
    
    return result.rows[0].sequence;
  }
}

// Method 4: Collision-resistant (recommended)
function generateCollisionResistantReference() {
  const timestamp = Date.now().toString(36); // Base36 timestamp
  const random1 = Math.random().toString(36).substring(2, 8);
  const random2 = Math.random().toString(36).substring(2, 8);
  const counter = (Math.floor(Math.random() * 1000)).toString().padStart(3, '0');
  
  return \`fc_\${timestamp}\${random1}\${counter}\${random2}\`;
}

// Usage examples
console.log(generateUniqueReference('order')); // order_1642678901234_a1b2c3
console.log(generateUUIDReference('inv')); // inv_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
console.log(generateCollisionResistantReference()); // fc_1a2b3c4d5e6f789g012h3i4j5k

// Best practices:
// ✅ Always generate new references
// ✅ Include timestamp for chronological sorting
// ✅ Add randomness to prevent prediction
// ✅ Use consistent prefix for easy identification
// ✅ Store references in database to prevent duplicates`,
      codeLanguage: 'javascript',
      relatedLinks: [
        { title: 'API/SDK Integration', path: '/api-sdk' },
        { title: 'Troubleshooting', path: '/troubleshooting' }
      ]
    },
    {
      id: 'high-failure-rates',
      question: 'My payment success rates are low. How can I improve them?',
      answer: 'Low success rates can result from poor user experience, technical issues, or payment method limitations. Analyze failure patterns and implement optimization strategies.',
      category: 'business-operations',
      tags: ['success rates', 'optimization', 'user experience'],
      severity: 'high',
      relatedLinks: [
        { title: 'Payment Methods', path: '/payment-methods' },
        { title: 'Testing & Debugging', path: '/testing' }
      ]
    }
  ];

  // Update category counts
  categories.forEach(category => {
    if (category.id === 'all') {
      category.count = faqItems.length;
    } else {
      category.count = faqItems.filter(item => item.category === category.id).length;
    }
  });

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <Clock className="h-4 w-4" />;
      case 'medium': return <HelpCircle className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <section id="faq" className="mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get quick answers to common questions about FirstChekout integration, troubleshooting, 
            and best practices. Find detailed self-resolution guides for merchant bottlenecks and challenges.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs... (e.g., 'webhook testing', 'card encryption', 'sandbox')"
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-bank-blue focus:border-bank-blue"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">FAQ Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? `border-${category.color}-300 bg-${category.color}-50`
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${isSelected ? `bg-${category.color}-100` : 'bg-gray-100'}`}>
                        <IconComponent className={`h-5 w-5 ${isSelected ? `text-${category.color}-600` : 'text-gray-600'}`} />
                      </div>
                      <h4 className={`ml-3 font-semibold ${isSelected ? `text-${category.color}-900` : 'text-gray-900'}`}>
                        {category.title}
                      </h4>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isSelected ? `bg-${category.color}-200 text-${category.color}-800` : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </div>
                  <p className={`text-sm ${isSelected ? `text-${category.color}-700` : 'text-gray-600'}`}>
                    {category.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Summary */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              Found <strong>{filteredItems.length}</strong> result{filteredItems.length !== 1 ? 's' : ''} 
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.title}`}
            </p>
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters and show all FAQs
              </button>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 mr-3">
                          {item.question}
                        </h3>
                        {item.severity && (
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(item.severity)}`}>
                            {getSeverityIcon(item.severity)}
                            <span className="ml-1 capitalize">{item.severity}</span>
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {expandedItems.includes(item.id) ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </button>

                {expandedItems.includes(item.id) && (
                  <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50">
                    <div className="pt-4">
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {item.answer}
                        </p>

                        {item.codeExample && (
                          <div className="mb-6">
                            <h4 className="text-md font-semibold text-gray-900 mb-3">
                              💻 Implementation Example:
                            </h4>
                            <CodeBlock 
                              language={item.codeLanguage || 'javascript'} 
                              code={item.codeExample} 
                            />
                          </div>
                        )}

                        {item.relatedLinks && item.relatedLinks.length > 0 && (
                          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Related Documentation:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {item.relatedLinks.map((link, index) => (
                                <a
                                  key={index}
                                  href={`#${link.path}`}
                                  className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                                >
                                  {link.title}
                                  <ChevronRight className="ml-1 h-3 w-3" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-12 bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
            <p className="text-blue-100 mb-6">
              Can't find the answer you're looking for? Our support team is ready to help you resolve 
              any integration challenges or technical issues.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">📧 Email Support</h4>
                <p className="text-sm text-blue-100 mb-2">firstcontactcomplaints@firstbankgroup.com</p>
                <p className="text-xs text-blue-200">Response within 24 hours</p>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">💬 Live Chat</h4>
                <p className="text-sm text-blue-100 mb-2">Available in merchant portal</p>
                <p className="text-xs text-blue-200">Monday - Friday, 9 AM - 5 PM WAT</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/support"
                className="inline-flex items-center px-6 py-3 bg-white text-bank-blue rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                <HelpCircle className="mr-2 h-5 w-5" />
                View Support Options
              </a>
              <a
                href="https://www.firstchekout.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-bank-gold text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
              >
                <Globe className="mr-2 h-5 w-5" />
                Merchant Portal
              </a>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            💡 Quick Tips for Self-Resolution
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-emerald-900 mb-2">Before Contacting Support:</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• Check browser console for JavaScript errors</li>
                <li>• Verify you're using the correct environment keys</li>
                <li>• Test with provided test card numbers in sandbox</li>
                <li>• Review error codes in our troubleshooting guide</li>
                <li>• Check network connectivity and firewall settings</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-emerald-900 mb-2">Include This Information:</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• Your merchant ID and environment (sandbox/live)</li>
                <li>• Integration method (API, NPM, CDN, WordPress)</li>
                <li>• Exact error messages and codes</li>
                <li>• Steps to reproduce the issue</li>
                <li>• Browser/device information if applicable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};