import React from 'react';
import { Download, Settings, ShoppingCart, CheckCircle, CreditCard, Upload,
  // Search,
  // Eye, EyeOff,
  Key, Monitor, AlertTriangle, FileText, Globe, Zap, QrCode } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';
import {figure1, figure2, figure3, figure4, figure5} from "../../assets";

export const WordPressSection: React.FC = () => {
  // const [showSecretKey, setShowSecretKey] = React.useState(false);

  const installationSteps = [
    {
      method: "WordPress Dashboard",
      icon: Upload,
      color: "blue",
      steps: [
        "Log in to your WordPress admin panel",
        "Navigate to Plugins > Add New",
        "Search for FirstChekout",
        "Click Install Now, then click Activate (see Figure 1 below)"
      ],
      note: "Automatic installation from WordPress repository"
    },
    {
      method: "Manual Installation (ZIP Upload)",
      icon: Download,
      color: "emerald",
      steps: [
        "Download the plugin ZIP file from the First Bank merchant portal or GitHub repository",
        "Go to Plugins > Add New > Upload Plugin",
        "Upload the .zip file and click Install Now",
        "Click Activate Plugin (see Figure 1 below)"
      ],
      note: "Recommended for latest version directly from FirstCheckout"
    }
  ];

  const wooCommerceSteps = [
    {
      step: 1,
      title: "Ensure WooCommerce is installed",
      description: "WooCommerce must be active before configuring FirstChekout",
      icon: ShoppingCart
    },
    {
      step: 2,
      title: "Navigate to WooCommerce > Settings > Payments",
      description: "Access the payment methods configuration area",
      icon: Settings
    },
    {
      step: 3,
      title: "Enable FirstChekout and click Manage",
      description: "Activate the payment method and access configuration (see Figure 2 below)",
      icon: CheckCircle
    },
    {
      step: 4,
      title: "Configure title, description, and credentials",
      description: "Set up customer-facing information and API credentials",
      icon: FileText
    },
    {
      step: 5,
      title: "Save changes",
      description: "Apply your configuration settings",
      icon: CheckCircle
    }
  ];

  const configurationFields = [
    {
      field: "Enable/Disable",
      description: "Toggle FirstChekout payment method on/off",
      type: "checkbox",
      example: "☑️ Enable FirstChekout Payment"
    },
    {
      field: "Title",
      description: "Payment method name displayed to customers",
      type: "text",
      example: "FirstChekout Payment Gateway"
    },
    {
      field: "Description",
      description: "Additional information shown at checkout",
      type: "textarea",
      example: "Pay securely with cards, USSD, QR code, BNPL, Pay Attitude or bank transfer via FirstChekout"
    },
    {
      field: "Merchant ID",
      description: "Your unique merchant identifier",
      type: "text",
      example: "your_merchant_id_here"
    },
    {
      field: "Public Key",
      description: "Your FirstChekout public key for client-side integration",
      type: "text",
      example: "pk_live_your_public_key_here"
    },
    {
      field: "Secret Key",
      description: "Your FirstChekout secret key for server-side authentication",
      type: "password",
      example: "sk_live_your_secret_key_here"
    },
    {
      field: "Environment",
      description: "Select Test or Live mode",
      type: "select",
      example: "Test / Live (see Figure 3 below)"
    }
  ];

  const customerExperienceSteps = [
    "Customer adds products to cart and proceeds to checkout",
    "Selects FirstChekout as payment method",
    "Clicks 'Place Order' to initiate payment",
    "FirstChekout payment modal opens with available payment options",
    "Customer chooses preferred payment method (Card, USSD, Bank Transfer, QR Code, BNPL, Pay Attitude)",
    "Completes payment through secure FirstChekout interface",
    "Returns to WooCommerce with payment confirmation",
    "Order status automatically updated based on payment result"
  ];

  const gettingStartedCode = `// Getting Started Configuration Steps

1. Set Up API Credentials
   - At the WooCommerce payment tab, toggle FirstChekout payment and click on manage
   - (see Figure 2 below)

2. Make plugin enabled by checking the Enable/Disable checkbox 
   - (see Figure 3 below)

3. Enter your:
   • Merchant ID + Public Key
   • Secret Key (see Figure 3 below)

4. Select environment: Test or Live mode (see Figure 3 below)

5. Click Save Changes`;

  return (
    <section id="wordpress" className="mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header Section */}
        <div className="text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">WordPress Plugin Integration</h2>

          
          <p className="text-lg text-gray-600 mb-8">
            FirstChekout is the official payment solution by First Bank of Nigeria for WordPress. It enables
            merchants to seamlessly receive payments for goods and services via dynamic or static 
            payment links. Whether you're running a WooCommerce store, service-based website, 
            FirstChekout provides a simple and secure checkout experience for your customers.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <Download className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900 text-sm">Easy Install</h3>
            <p className="text-xs text-blue-700 mt-1">WordPress Dashboard or Manual</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <Settings className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-semibold text-emerald-900 text-sm">Simple Config</h3>
            <p className="text-xs text-emerald-700 mt-1">WooCommerce Integration</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <ShoppingCart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-900 text-sm">WooCommerce</h3>
            <p className="text-xs text-purple-700 mt-1">Full E-commerce Support</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <CheckCircle className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <h3 className="font-semibold text-amber-900 text-sm">No Coding</h3>
            <p className="text-xs text-amber-700 mt-1">Point and Click Setup</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Installation Methods */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Installation Methods</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {installationSteps.map((method, index) => (
                <div key={index} className={`bg-${method.color}-50 border border-${method.color}-200 rounded-lg p-6`}>
                  <div className="flex items-center mb-4">
                    <div className={`p-3 bg-${method.color}-100 rounded-lg`}>
                      <method.icon className={`h-6 w-6 text-${method.color}-600`} />
                    </div>
                    <h4 className={`ml-3 text-lg font-semibold text-${method.color}-900`}>{method.method}</h4>
                  </div>
                  
                  <ol className={`space-y-2 text-${method.color}-800 mb-4`}>
                    {method.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <span className={`flex-shrink-0 w-6 h-6 bg-${method.color}-200 text-${method.color}-800 rounded-full flex items-center justify-center text-sm font-semibold mr-3`}>
                          {stepIndex + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                  
                  <div className={`p-3 bg-${method.color}-100 rounded-md`}>
                    <p className={`text-sm text-${method.color}-900`}>
                      <strong>Note:</strong> {method.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Instructions - WooCommerce Integration */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Usage Instructions - WooCommerce Integration</h3>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-purple-900 mb-4">Step-by-Step Configuration Process</h4>
              
              <div className="space-y-4">
                {wooCommerceSteps.map((step) => (
                  <div key={step.step} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-200 text-purple-800 rounded-full flex items-center justify-center font-semibold text-sm mr-4">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <step.icon className="h-5 w-5 text-purple-600 mr-2" />
                        <h5 className="font-semibold text-purple-900">{step.title}</h5>
                      </div>
                      <p className="text-purple-800 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration Fields Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900">Configuration Fields Reference</h4>
              </div>
              
              <div className="overflow-x-auto">
                <div className="table-container">
                  <table className="responsive-table min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Example</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {configurationFields.map((field, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900" data-label="Field">{field.field}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {field.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500" data-label="Description">{field.description}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-mono" data-label="Example">{field.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Getting Started</h3>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
                <Key className="h-5 w-5 mr-2" />
                Set Up API Credentials
              </h4>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-emerald-200">
                  <h5 className="font-semibold text-emerald-900 mb-3">Configuration Steps:</h5>
                  <CodeBlock language="text" code={gettingStartedCode} />
                </div>

                {/* Simulated Configuration Interface */}
                {/*<div className="bg-white rounded-lg p-4 border border-emerald-200">*/}
                {/*  <h5 className="font-semibold text-emerald-900 mb-4">Configuration Interface Preview:</h5>*/}
                {/*  */}
                {/*  <div className="space-y-4">*/}
                {/*    <div className="flex items-center">*/}
                {/*      <input type="checkbox" id="enable" className="mr-3" defaultChecked />*/}
                {/*      <label htmlFor="enable" className="font-medium text-gray-900">Enable FirstChekout Payment</label>*/}
                {/*    </div>*/}
                {/*    */}
                {/*    <div className="grid md:grid-cols-2 gap-4">*/}
                {/*      <div>*/}
                {/*        <label className="block text-sm font-medium text-gray-700 mb-1">Merchant ID</label>*/}
                {/*        <input */}
                {/*          type="text" */}
                {/*          placeholder="9546159989"*/}
                {/*          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"*/}
                {/*          disabled*/}
                {/*        />*/}
                {/*      </div>*/}
                {/*      */}
                {/*      <div>*/}
                {/*        <label className="block text-sm font-medium text-gray-700 mb-1">Public Key</label>*/}
                {/*        <input */}
                {/*          type="text" */}
                {/*          placeholder="pk_live_your_public_key_here"*/}
                {/*          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"*/}
                {/*          disabled*/}
                {/*        />*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    */}
                {/*    <div>*/}
                {/*      <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>*/}
                {/*      <div className="relative">*/}
                {/*        <input */}
                {/*          type={showSecretKey ? "text" : "password"}*/}
                {/*          placeholder="sk_live_your_secret_key_here"*/}
                {/*          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md bg-gray-50"*/}
                {/*          disabled*/}
                {/*        />*/}
                {/*        <button*/}
                {/*          type="button"*/}
                {/*          onClick={() => setShowSecretKey(!showSecretKey)}*/}
                {/*          className="absolute inset-y-0 right-0 pr-3 flex items-center"*/}
                {/*        >*/}
                {/*          {showSecretKey ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}*/}
                {/*        </button>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    */}
                {/*    <div>*/}
                {/*      <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>*/}
                {/*      <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" disabled>*/}
                {/*        <option>Test</option>*/}
                {/*        <option>Live</option>*/}
                {/*      </select>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>

          {/* Customer Experience */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer Experience</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">Checkout Process Flow</h4>
              <p className="text-blue-800 mb-4">
                Customers will now see FirstChekout as a payment option at checkout (Figure 4). On clicking
                "place order" button load the FirstChekout payment frame (Figure 5).
              </p>
              
              <div className="space-y-3">
                {customerExperienceSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      {index + 1}
                    </span>
                    <span className="text-blue-800 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods Available */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-emerald-900 mb-4">Available Payment Methods</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <CreditCard className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h5 className="font-semibold text-emerald-900">Card Payments</h5>
                  <p className="text-sm text-emerald-700">Visa, Mastercard, Verve</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <QrCode className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h5 className="font-semibold text-emerald-900">USSD</h5>
                  <p className="text-sm text-emerald-700">All major Nigerian banks</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-emerald-600 font-bold text-m">₦</span>
                  </div>
                  <h5 className="font-semibold text-emerald-900">Bank Transfer</h5>
                  <p className="text-sm text-emerald-700">Direct bank transfer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Advanced Features & Benefits</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Dynamic Payment Links
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Automatically generated for each order</li>
                  <li>• Unique payment references</li>
                  <li>• Integrated with WooCommerce order system</li>
                  <li>• Real-time status updates</li>
                  <li>• Secure payment processing</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Order Management
                </h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Automatic order status updates</li>
                  <li>• Payment confirmation emails</li>
                  <li>• Transaction logging and reporting</li>
                  <li>• Refund support (manual process)</li>
                  <li>• Customer payment history</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-900 mb-2 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Performance Features
                </h4>
                <ul className="text-sm text-emerald-800 space-y-1">
                  <li>• Fast checkout experience</li>
                  <li>• Mobile-responsive design</li>
                  <li>• Multiple payment method support</li>
                  <li>• Secure payment frame integration</li>
                  <li>• Real-time payment validation</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Configuration Options
                </h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Test and Live environment toggle</li>
                  <li>• Customizable payment descriptions</li>
                  <li>• Flexible credential management</li>
                  <li>• Easy enable/disable functionality</li>
                  <li>• Comprehensive error handling</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Requirements & Compatibility */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Requirements & Compatibility
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">WordPress Requirements</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• WordPress 5.5 or higher</li>
                  <li>• PHP 7.2 or higher</li>
                  <li>• Active FirstChekout merchant account</li>
                  <li>• SSL certificate (recommended)</li>
                  <li>• Valid API credentials from First Bank</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">WooCommerce Features</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• WooCommerce 4.0+ compatibility</li>
                  <li>• Multi-currency support (NGN primary)</li>
                  <li>• Mobile-responsive checkout</li>
                  <li>• WPML/multilingual ready</li>
                  <li>• Hooks and filters for customization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Figure References */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentation References</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Figure References from Documentation:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• <strong>Figure 1:</strong> Plugin activation interface</li>
                  <li>• <strong>Figure 2:</strong> WooCommerce payment settings</li>
                  <li>• <strong>Figure 3:</strong> FirstChekout configuration panel</li>
                  <li>• <strong>Figure 4:</strong> Customer checkout page</li>
                  <li>• <strong>Figure 5:</strong> FirstChekout payment frame</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Additional Resources:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• First Bank merchant portal</li>
                  <li>• GitHub repository (if available)</li>
                  <li>• WordPress plugin directory</li>
                  <li>• WooCommerce documentation</li>
                  <li>• FirstChekout API documentation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Figures */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Figures</h3>

            <div>
              <img src={figure1} alt="Figure 1"/>
              <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 1:</strong> Plugin activation interface</p>
            </div>

            <div className="mt-8">
              <img src={figure2} alt="Figure 1"/>
              <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 2:</strong> WooCommerce payment settings</p>
            </div>

            <div className="mt-8">
              <img src={figure3} alt="Figure 1"/>
              <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 3:</strong> FirstChekout configuration panel
              </p>
            </div>

            <div className="mt-8">
              <img src={figure4} alt="Figure 1"/>
              <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 4:</strong> Customer checkout page</p>
            </div>

            <div className="mt-8">
              <img src={figure5} alt="Figure 1"/>
              <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 5:</strong> FirstChekout payment frame</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};