import React from 'react';
import { Key, Shield, Zap, AlertTriangle, Lock, Database, Settings, Monitor } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';
import { apiKeyDashImage } from "../../assets";



export const ApiKeysSection: React.FC = () => {
  // const [showSecret, setShowSecret] = React.useState(false);
  // const [showClientSecret, setShowClientSecret] = React.useState(false);
  // const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const quickStartGuide = `// Quick API Keys Setup Guide

1. Complete Merchant Onboarding
   ✓ Verify your First Bank account
   ✓ Upload KYC documents
   ✓ Wait for admin approval

2. Access Your Dashboard
   ✓ Login at www.firstchekout.com
   ✓ Navigate to API Keys section
   ✓ Copy your credentials securely

3. Environment Setup
   ✓ Use sb- prefixed keys for testing
   ✓ Switch to pk- keys for production
   ✓ Store keys in environment variables

4. Test Integration
   ✓ Make your first API call
   ✓ Verify webhook setup
   ✓ Test payment flows`;
  // const copyToClipboard = (text: string, field: string) => {
  //   navigator.clipboard.writeText(text);
  //   setCopiedField(field);
  //   setTimeout(() => setCopiedField(null), 2000);
  // };

//   const tokenGenerationCode = `curl --location 'https://payment-solution-identity.azurewebsites.net/api/v2/Authenticate/token' \\
// --header 'Content-Type: application/x-www-form-urlencoded' \\
// --data-urlencode 'client_Id=your-client-id' \\
// --data-urlencode 'client_Secret=your-client-secret' \\
// --data-urlencode 'grant_type=client_credentials'`;
//
//   const tokenResponse = `{
//   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
//   "token_type": "Bearer",
//   "expires_in": 36000
// }`;

  // const sampleCredentials = {
  //   clientId: "cid-J1MWSNKBCG8ML6TE7VMB9SOMW17F3CHDBBIPY30",
  //   clientSecret: "sb-bb7a2VHsXkaHiDe2vbXJDvFwtkRG6bh2k3l98Zho2f9bk2zpQ8nGdp2b829ov",
  //   gatewayBaseUrl: "Note test details are different from production baseurl",
  //   tokenBaseUrl: "Note test det"
  // };

  const envExample = `# Environment Variables (.env)
# NEVER commit this file to version control!

# FirstChekout API Credentials
FIRSTCHEKOUT_PUBLIC_KEY=pk_live_your_public_key_here
FIRSTCHEKOUT_SECRET_KEY=sk_live_your_secret_key_here
FIRSTCHEKOUT_ENCRYPTION_KEY=your_32_character_encryption_key_here
FIRSTCHEKOUT_CLIENT_ID=cid_your_client_id_here
FIRSTCHEKOUT_CLIENT_SECRET=sb_your_client_secret_here

# Webhook Security
WEBHOOK_SECRET=your_webhook_secret_for_signature_verification

# Environment Configuration
FIRSTCHEKOUT_ENVIRONMENT=sandbox # or 'live' for production
FIRSTCHEKOUT_GATEWAY_BASE_URL={{ payment_Gateway_Url }} // reference testing and debugging section
FIRSTCHEKOUT_TOKEN_BASE_URL={{ identity_Service_Url }}  // reference testing and debugging section

# Database (if storing transaction data)
DATABASE_URL=postgresql://encrypted_connection_string
DATABASE_ENCRYPTION_KEY=separate_key_for_database_encryption`;

  const keyManagementSteps = [
    {
      step: 1,
      title: "Complete Merchant Onboarding",
      description: "Fully onboard on the FirstChekout platform and ensure your account is live",
      details: [
        "Complete KYC verification process",
        "Submit all required business documents",
        "Verify your First Bank account details",
        "Wait for admin approval (1-3 business days)",
        "Receive approval confirmation email"
      ],
      status: "prerequisite"
    },
    {
      step: 2,
      title: "Access Merchant Dashboard",
      description: "Login to your merchant portal to access API credentials",
      details: [
        "Visit the merchant portal at www.firstchekout.com",
        "Login with your verified credentials",
        "Navigate to the API Keys section",
        "Ensure your account status shows as 'Active'",
        "Verify all profile information is complete"
      ],
      status: "active"
    },
    {
      step: 3,
      title: "Retrieve API Keys",
      description: "Locate and securely copy your API credentials",
      details: [
        "Find the 'API Keys and Web hooks' section",
        "Note your Public Key (for client-side integration)",
        "Copy your Secret Key (for server-side authentication)",
        "Record your Encryption Key (for card data encryption)",
        "Save your Merchant ID for reference"
      ],
      status: "active"
    },
    // {
    //   step: 4,
    //   title: "Generate OAuth Credentials",
    //   description: "Obtain Client ID and Client Secret for token generation",
    //   details: [
    //     "Access the OAuth credentials section",
    //     "Copy your Client ID (public identifier)",
    //     "Securely store your Client Secret",
    //     "Test token generation with these credentials",
    //     "Verify token expiration settings (10 hours default)"
    //   ],
    //   status: "active"
    // }
  ];

  return (
    <section id="api-keys" className="mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header Section */}
        <div className="text-left mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            API Keys & Credentials
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl">
            Secure your FirstChekout integration with proper API key management. Learn how to obtain, configure, 
            and safely use your authentication credentials across different environments.
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Zap className="h-6 w-6 text-emerald-600 mr-3" />
            <h3 className="text-lg font-semibold text-emerald-900">Quick Start Guide</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <CodeBlock language="text" code={quickStartGuide} />
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <h4 className="font-semibold text-emerald-900 mb-2">🎯 Key Benefits</h4>
                <ul className="text-sm text-emerald-800 space-y-1">
                  <li>• Secure authentication for all API calls</li>
                  <li>• Separate sandbox and production environments</li>
                  <li>• Easy key rotation and management</li>
                  <li>• Comprehensive access control</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <h4 className="font-semibold text-emerald-900 mb-2">⚡ Next Steps</h4>
                <ul className="text-sm text-emerald-800 space-y-1">
                  <li>• <Link to="/registration" className="text-blue-600 underline">Complete registration</Link> if not done</li>
                  <li>• <Link to="/api-sdk" className="text-blue-600 underline">Start API integration</Link></li>
                  <li>• <Link to="/testing" className="text-blue-600 underline">Test in sandbox</Link></li>
                  <li>• <Link to="/support" className="text-blue-600 underline">Get support</Link> if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Key Management Overview */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 mr-3" />
            <h3 className="text-lg font-semibold text-amber-900">Key Management Requirements</h3>
          </div>
          <p className="text-amber-800 mb-4">
            <strong>Important:</strong> Only merchants that have fully onboarded on the platform and are live can use this service as 
            expected. Proceed to the API Key Sections to fetch necessary keys to be used for integration.
          </p>
          <div className="bg-amber-100 p-4 rounded-md">
            <p className="text-amber-900 text-sm">
              Take note of the Public Key, Secret Key, and Encryption Key - each of these keys have specific use cases 
              in the integration process. The Live environment must be turned ON or OFF for transactions to go through 
              or be initiated in test mode.
            </p>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Merchant Dashboard Interface</h3>

          <div>
            <img
                src={apiKeyDashImage}
                alt="FirstChekout Registration Form"
            />
          </div>


          {/*<div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">*/}
          {/*  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">*/}
          {/*    /!* Simulated Dashboard Header *!/*/}
          {/*    <div className="flex items-center justify-between mb-6 pb-4 border-b">*/}
          {/*      <div className="flex items-center">*/}
          {/*        <div className="w-8 h-8 bg-bank-blue rounded-full flex items-center justify-center mr-3">*/}
          {/*          <span className="text-white text-sm font-bold">FC</span>*/}
          {/*        </div>*/}
          {/*        <div>*/}
          {/*          <h4 className="font-semibold text-gray-900">FirstChekout Dashboard</h4>*/}
          {/*          <p className="text-sm text-gray-500">Merchant Portal</p>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*      <div className="flex items-center space-x-2">*/}
          {/*        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Live</span>*/}
          {/*        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Active</span>*/}
          {/*      </div>*/}
          {/*    </div>*/}

          {/*    /!* API Keys Section *!/*/}
          {/*    <div className="mb-6">*/}
          {/*      <h5 className="font-semibold text-gray-900 mb-4 flex items-center">*/}
          {/*        <Key className="h-5 w-5 mr-2" />*/}
          {/*        API Keys and Web hooks*/}
          {/*      </h5>*/}
          {/*      */}
          {/*      <div className="space-y-4">*/}
          {/*        <div className="grid md:grid-cols-2 gap-4">*/}
          {/*          <div className="bg-gray-50 p-4 rounded-lg">*/}
          {/*            <label className="block text-sm font-medium text-gray-700 mb-2">Public Key</label>*/}
          {/*            <div className="flex items-center">*/}
          {/*              <input */}
          {/*                type="text" */}
          {/*                value="pk_live_your_public_key_here"*/}
          {/*                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-white text-sm"*/}
          {/*                readOnly*/}
          {/*              />*/}
          {/*              <button */}
          {/*                onClick={() => copyToClipboard("pk_live_your_public_key_here", "public")}*/}
          {/*                className="px-3 py-2 bg-bank-blue text-white rounded-r-md hover:bg-opacity-90 transition-colors"*/}
          {/*              >*/}
          {/*                {copiedField === "public" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}*/}
          {/*              </button>*/}
          {/*            </div>*/}
          {/*          </div>*/}

          {/*          <div className="bg-gray-50 p-4 rounded-lg">*/}
          {/*            <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>*/}
          {/*            <div className="flex items-center">*/}
          {/*              <input */}
          {/*                type={showSecret ? "text" : "password"}*/}
          {/*                value="sk_live_your_secret_key_here"*/}
          {/*                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-white text-sm"*/}
          {/*                readOnly*/}
          {/*              />*/}
          {/*              <button */}
          {/*                onClick={() => setShowSecret(!showSecret)}*/}
          {/*                className="px-3 py-2 border-t border-b border-gray-300 bg-white hover:bg-gray-50"*/}
          {/*              >*/}
          {/*                {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}*/}
          {/*              </button>*/}
          {/*              <button */}
          {/*                onClick={() => copyToClipboard("sk_live_your_secret_key_here", "secret")}*/}
          {/*                className="px-3 py-2 bg-bank-blue text-white rounded-r-md hover:bg-opacity-90 transition-colors"*/}
          {/*              >*/}
          {/*                {copiedField === "secret" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}*/}
          {/*              </button>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}

          {/*        <div className="bg-gray-50 p-4 rounded-lg">*/}
          {/*          <label className="block text-sm font-medium text-gray-700 mb-2">Encryption Key</label>*/}
          {/*          <div className="flex items-center">*/}
          {/*            <input */}
          {/*              type="password"*/}
          {/*              value="your_32_character_encryption_key_here"*/}
          {/*              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-white text-sm"*/}
          {/*              readOnly*/}
          {/*            />*/}
          {/*            <button */}
          {/*              onClick={() => copyToClipboard("your_32_character_encryption_key_here", "encryption")}*/}
          {/*              className="px-3 py-2 bg-bank-blue text-white rounded-r-md hover:bg-opacity-90 transition-colors"*/}
          {/*            >*/}
          {/*              {copiedField === "encryption" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}*/}
          {/*            </button>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}

          {/*    /!* Webhooks Section *!/*/}
          {/*    <div>*/}
          {/*      <h5 className="font-semibold text-gray-900 mb-4 flex items-center">*/}
          {/*        <Database className="h-5 w-5 mr-2" />*/}
          {/*        Webhooks*/}
          {/*      </h5>*/}
          {/*      <div className="bg-gray-50 p-4 rounded-lg">*/}
          {/*        <label className="block text-sm font-medium text-gray-700 mb-2">Callback URL</label>*/}
          {/*        <input */}
          {/*          type="url" */}
          {/*          placeholder="https://your-domain.com/webhook/firstcheckout"*/}
          {/*          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"*/}
          {/*        />*/}
          {/*        <p className="text-xs text-gray-500 mt-1">*/}
          {/*          URL where FirstChekout will send payment notifications*/}
          {/*        </p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

        {/* Step-by-Step Key Management */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Step-by-Step Key Management Process</h3>
          <div className="space-y-6">
            {keyManagementSteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${
                      step.status === 'prerequisite' 
                        ? 'bg-amber-100 text-amber-600' 
                        : 'bg-bank-blue bg-opacity-10 text-bank-blue'
                    }`}>
                      {step.step}
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Detailed Steps:</h5>
                      <ul className="space-y-1">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <span className="flex-shrink-0 w-2 h-2 bg-bank-blue rounded-full mt-2 mr-3"></span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {step.step < keyManagementSteps.length && (
                  <div className="absolute left-5 top-10 w-0.5 h-6 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sample Credentials from Document */}
        {/*<div className="mb-8">*/}
        {/*  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample API Credentials</h3>*/}
        {/*  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">*/}
        {/*    <p className="text-blue-800 mb-4">*/}
        {/*      Below are sample credentials as referenced in the job card document. */}
        {/*      <strong>Note:</strong> Test details are different from production base URLs.*/}
        {/*    </p>*/}
        {/*    */}
        {/*    <div className="space-y-4">*/}
        {/*      <div className="bg-white p-4 rounded-lg">*/}
        {/*        <div className="flex items-center justify-between mb-2">*/}
        {/*          <label className="font-semibold text-gray-900">Client ID</label>*/}
        {/*          <button */}
        {/*            onClick={() => copyToClipboard(sampleCredentials.clientId, "sample-client-id")}*/}
        {/*            className="text-blue-600 hover:text-blue-700"*/}
        {/*          >*/}
        {/*            {copiedField === "sample-client-id" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}*/}
        {/*          </button>*/}
        {/*        </div>*/}
        {/*        <code className="text-sm bg-gray-100 p-2 rounded block break-all">*/}
        {/*          {sampleCredentials.clientId}*/}
        {/*        </code>*/}
        {/*      </div>*/}

        {/*      <div className="bg-white p-4 rounded-lg">*/}
        {/*        <div className="flex items-center justify-between mb-2">*/}
        {/*          <label className="font-semibold text-gray-900">Client Secret</label>*/}
        {/*          <div className="flex items-center space-x-2">*/}
        {/*            <button */}
        {/*              onClick={() => setShowClientSecret(!showClientSecret)}*/}
        {/*              className="text-gray-600 hover:text-gray-700"*/}
        {/*            >*/}
        {/*              {showClientSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}*/}
        {/*            </button>*/}
        {/*            <button */}
        {/*              onClick={() => copyToClipboard(sampleCredentials.clientSecret, "sample-client-secret")}*/}
        {/*              className="text-blue-600 hover:text-blue-700"*/}
        {/*            >*/}
        {/*              {copiedField === "sample-client-secret" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}*/}
        {/*            </button>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <code className="text-sm bg-gray-100 p-2 rounded block break-all">*/}
        {/*          {showClientSecret ? sampleCredentials.clientSecret : '•'.repeat(sampleCredentials.clientSecret.length)}*/}
        {/*        </code>*/}
        {/*      </div>*/}

        {/*      <div className="grid md:grid-cols-2 gap-4">*/}
        {/*        <div className="bg-white p-4 rounded-lg">*/}
        {/*          <label className="font-semibold text-gray-900 block mb-2">Gateway Base URL</label>*/}
        {/*          <p className="text-sm text-gray-600">{sampleCredentials.gatewayBaseUrl}</p>*/}
        {/*        </div>*/}
        {/*        <div className="bg-white p-4 rounded-lg">*/}
        {/*          <label className="font-semibold text-gray-900 block mb-2">Token Base URL</label>*/}
        {/*          <p className="text-sm text-gray-600">{sampleCredentials.tokenBaseUrl}</p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Key Types & Usage */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Types & Usage</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Key className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Public Key</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Used for client-side integrations (CDN, NPM)</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">pk_live_xxxxx (production)</code>
                <br />
                <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">sb-pk_xxxxx (sandbox)</code>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-red-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Secret Key</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Server-side authentication (API calls)</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">sk_live_xxxxx (production)</code>
                <br />
                <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">sb-sk_xxxxx (sandbox)</code>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Lock className="h-5 w-5 text-emerald-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Encryption Key</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">AES encryption for card data</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">32-character string</code>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Database className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Merchant ID</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Unique merchant identifier</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">10-digit number</code>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">OAuth Credentials</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Key className="h-5 w-5 text-indigo-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Client ID</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Public identifier for OAuth token generation</p>
                <p className="text-xs text-gray-500">Used in conjunction with Client Secret to generate access tokens</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-red-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Client Secret</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Secret key for OAuth token generation</p>
                <p className="text-xs text-gray-500">Keep this confidential and never expose in client-side code</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
                <Monitor className="h-4 w-4 mr-2" />
                Token Management
              </h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Access tokens expire in 30 minutes (1800 seconds)</li>
                <li>• Cache tokens for reuse until expiry</li>
                <li>• Implement automatic token refresh logic</li>
                <li>• Validate tokens at <a href="https://jwt.io" className="underline">jwt.io</a></li>
                <li>• Monitor token usage and expiration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Token Generation */}
        {/*<div className="mb-8">*/}
        {/*  <h3 className="text-xl font-semibold text-gray-900 mb-4">OAuth Token Generation</h3>*/}
        {/*  <p className="text-gray-600 mb-4">*/}
        {/*    Use your Client ID and Client Secret to generate OAuth2 access tokens for API authentication. */}
        {/*    The ClientId and ClientSecret are shared by the admin during onboarding - these credentials */}
        {/*    are needed to generate tokens for API access.*/}
        {/*  </p>*/}
        {/*  */}
        {/*  <div className="mb-4">*/}
        {/*    <h4 className="font-medium text-gray-900 mb-2">Token Generation Request:</h4>*/}
        {/*    <CodeBlock language="bash" code={tokenGenerationCode} />*/}
        {/*  </div>*/}

        {/*  <div className="mb-4">*/}
        {/*    <h4 className="font-medium text-gray-900 mb-2">Expected Response:</h4>*/}
        {/*    <CodeBlock language="json" code={tokenResponse} />*/}
        {/*  </div>*/}

        {/*  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">*/}
        {/*    <h4 className="font-semibold text-blue-900 mb-2">Token Usage Notes</h4>*/}
        {/*    <ul className="text-sm text-blue-800 space-y-1">*/}
        {/*      <li>• Include the access token in all API requests as a Bearer token</li>*/}
        {/*      <li>• Tokens are valid for 10 hours (36000 seconds)</li>*/}
        {/*      <li>• Generate new tokens before expiry to avoid authentication failures</li>*/}
        {/*      <li>• Store tokens securely and never expose them in client-side code</li>*/}
        {/*      <li>• Different tokens may be required for different environments (sandbox vs live)</li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Environment Configuration */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Environment Configuration</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">Sandbox Environment</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Keys prefixed with "sb-" (e.g., sb-pk-, sb-sk-)</li>
                <li>• No real money transactions</li>
                <li>• Use test card numbers for testing</li>
                <li>• Perfect for development and integration testing</li>
                <li>• Separate base URLs for sandbox endpoints</li>
                <li>• Test data is reset periodically</li>
              </ul>
            </div>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-emerald-900 mb-4">Live Environment</h4>
              <ul className="text-sm text-emerald-800 space-y-2">
                <li>• Keys without "sb-" prefix (e.g., pk_, sk_)</li>
                <li>• Real money transactions</li>
                <li>• Production card processing</li>
                <li>• Requires completed KYC approval</li>
                <li>• Production base URLs</li>
                <li>• Full compliance and monitoring</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Complete Environment Variables Setup:</h4>
            <CodeBlock language="bash" code={envExample} />
          </div>
        </div>

        {/* Security Best Practices */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Best Practices</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-900 mb-2">✅ DO</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• Store keys in environment variables</li>
                <li>• Use secure key management systems</li>
                <li>• Encrypt keys in configuration files</li>
                <li>• Rotate keys regularly in production</li>
                <li>• Use different keys for sandbox and live</li>
                <li>• Implement proper access controls</li>
                <li>• Monitor key usage and access</li>
                <li>• Use HTTPS for all API communications</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ DON'T</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Hardcode keys in source code</li>
                <li>• Commit keys to version control</li>
                <li>• Share keys via email or chat</li>
                <li>• Use production keys in development</li>
                <li>• Store keys in client-side code</li>
                <li>• Log keys in application logs</li>
                <li>• Use the same keys across environments</li>
                <li>• Ignore key expiration warnings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration Readiness Checklist */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Integration Readiness Checklist
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Account Setup</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>Merchant account fully onboarded and approved</span>
                </li>
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>KYC documents verified and accepted</span>
                </li>
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>First Bank account linked and verified</span>
                </li>
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>Account status shows as "Live" in dashboard</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">API Credentials</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>Public Key retrieved and stored securely</span>
                </li>
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>Secret Key retrieved and stored securely</span>
                </li>
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>Client ID and Client Secret obtained</span>
                </li>
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>OAuth token generation tested successfully</span>
                </li>
                <li className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" />
                  <span>Webhook URL configured in dashboard</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};