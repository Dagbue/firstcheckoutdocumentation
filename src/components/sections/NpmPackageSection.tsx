import React from 'react';
import { Package, Zap, Code, CheckCircle } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';

export const NpmPackageSection: React.FC = () => {
  const installationCode = `npm install firstchekout`;

  const basicUsageCode = `import FirstChekout from "firstchekout";

async function makePayment() {
  const txn = {
    live: false, // Set to true for production
    ref: "unique-payment-ref-" + Date.now(),
    amount: 5000, // Amount in kobo (NGN 50.00)
    customer: {
      firstname: "John",
      lastname: "Doe", 
      email: "john.doe@example.com",
      id: "customer-123"
    },
    fees: [
      { amount: 100, label: "Service Fee" }
    ],
    meta: {
      orderId: "order-789",
      source: "website"
    },
    publicKey: "your-public-key-here",
    description: "Payment for Premium Package",
    currency: "NGN",
    callback: (response) => {
      console.log("Payment completed:", response);
      // Handle successful payment
      if (response.status === "successful") {
        window.location.href = "/success";
      }
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
    options: ["CARD", "USSD", "Bank Transfer", "PAYATTITUDE", "QR", "BNPL"]
  };

  const addressURL = {
    BaseFrame: "base_frame",
    InitiatePaymentURI: "initiate_payment_URI"
  };

  try {
    await FirstChekout.initiateTransactionAsync(txn, addressURL);
  } catch (error) {
    console.error("Payment initiation failed:", error);
  }
}`;

  const reactExampleCode = `import React, { useState } from 'react';
import FirstChekout from "FirstChekout";

const PaymentButton = () => {
  const [loading, setLoading] = useState(false);
  const [customer] = useState({
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com"
  });

  const handlePayment = async () => {
    setLoading(true);
    
    const config = {
        live: 'false, // Set to true for production',
      ref: \`payment-\${Date.now()}\`,
      amount: 10000, // NGN 100.00
      customer,
      publicKey: process.env.REACT_APP_FIRSTCHECKOUT_PUBLIC_KEY,
      description: "Product Purchase",
      currency: "NGN",
      callback: (response) => {
        setLoading(false);
        if (response.status === "successful") {
          // Handle success
          alert("Payment successful!");
        } else {
          // Handle failure
          alert("Payment failed. Please try again.");
        }
      },
      onClose: () => {
        setLoading(false);
      },
      options: ["CARD", "USSD", "Bank Transfer", "PAYATTITUDE", "QR", "BNPL"]
    };

    const urls = {
    BaseFrame: "base_frame",
    InitiatePaymentURI: "initiate_payment_URI"
    };

    try {
      await FirstChekout.initiateTransactionAsync(config, urls);
    } catch (error) {
      setLoading(false);
      console.error("Payment error:", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
};

export default PaymentButton;`;

  const vueExampleCode = `<template>
  <div>
    <button 
      @click="makePayment" 
      :disabled="loading"
      class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
    >
      {{ loading ? 'Processing...' : 'Pay Now' }}
    </button>
  </div>
</template>

<script>
import FirstChekout from "FirstChekout";

export default {
  name: "PaymentComponent",
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async makePayment() {
      this.loading = true;
      
      const config = {
        // live: process.env.NODE_ENV === 'production',
        live: 'false, // Set to true for production',
        ref: \`vue-payment-\${Date.now()}\`,
        amount: 7500,
        customer: {
          firstname: "Jane",
          lastname: "Smith",
          email: "jane@example.com"
        },
        publicKey: process.env.VUE_APP_FIRSTCHECKOUT_PUBLIC_KEY,
        description: "Vue.js Payment",
        currency: "NGN",
        callback: (response) => {
          this.loading = false;
          this.$emit('payment-complete', response);
        },
        onClose: () => {
          this.loading = false;
        },
        options: ["CARD", "USSD", "Bank Transfer", "PAYATTITUDE", "QR", "BNPL"]
      };

      try {
        await FirstChekout.initiateTransactionAsync(config, {
        BaseFrame: "base_frame",
        InitiatePaymentURI: "initiate_payment_URI"
        });
      } catch (error) {
        this.loading = false;
        console.error('Payment failed:', error);
      }
    }
  }
};
</script>`;

  return (
    <section id="npm-package" className="mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">NPM Package Integration</h2>
        <p className="text-lg text-gray-600 mb-8">
          Perfect for modern JavaScript frameworks like React, Vue, Angular, and Node.js applications. 
          Provides a clean, promise-based API for seamless payment integration.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <Package className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-semibold text-emerald-900 text-sm">NPM Package</h3>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900 text-sm">Promise Based</h3>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <Code className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-900 text-sm">TypeScript Ready</h3>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <CheckCircle className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <h3 className="font-semibent text-amber-900 text-sm">Framework Agnostic</h3>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Installation</h3>
            <p className="text-gray-600 mb-4">
              Install the FirstChekout NPM package using npm or yarn:
            </p>
            <CodeBlock language="bash" code={installationCode} />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Usage</h3>
            <p className="text-gray-600 mb-4">
              Import and configure FirstChekout with your payment details:
            </p>
            <CodeBlock language="javascript" code={basicUsageCode} />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Framework Examples</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">React Integration</h4>
                <p className="text-gray-600 mb-3">Complete React component with state management:</p>
                <CodeBlock language="jsx" code={reactExampleCode} />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Vue.js Integration</h4>
                <p className="text-gray-600 mb-3">Vue.js component with reactive data:</p>
                <CodeBlock language="vue" code={vueExampleCode} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Configuration Options</h3>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Property</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Type</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Required</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 font-mono text-blue-600">live</td>
                      <td className="py-2 px-3">boolean</td>
                      <td className="py-2 px-3">Yes</td>
                      <td className="py-2 px-3">Toggle between sandbox (false) and production (true)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 font-mono text-blue-600">ref</td>
                      <td className="py-2 px-3">string</td>
                      <td className="py-2 px-3">Yes</td>
                      <td className="py-2 px-3">Unique transaction reference</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 font-mono text-blue-600">amount</td>
                      <td className="py-2 px-3">number</td>
                      <td className="py-2 px-3">Yes</td>
                      <td className="py-2 px-3">Amount in kobo (multiply naira by 100)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 font-mono text-blue-600">customer</td>
                      <td className="py-2 px-3">object</td>
                      <td className="py-2 px-3">Yes</td>
                      <td className="py-2 px-3">Customer details (firstname, lastname, email)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 font-mono text-blue-600">publicKey</td>
                      <td className="py-2 px-3">string</td>
                      <td className="py-2 px-3">Yes</td>
                      <td className="py-2 px-3">Your FirstChekout public key</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 font-mono text-blue-600">options</td>
                      <td className="py-2 px-3">array</td>
                      <td className="py-2 px-3">No</td>
                      <td className="py-2 px-3">Payment methods: ["CARD", "USSD", "Bank Transfer", "PAYATTITUDE", "QR", "BNPL"]</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-blue-600">callback</td>
                      <td className="py-2 px-3">function</td>
                      <td className="py-2 px-3">Yes</td>
                      <td className="py-2 px-3">Function called when payment completes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Best Practices</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Development</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use environment variables for keys</li>
                  <li>• Always test in sandbox first</li>
                  <li>• Implement proper error handling</li>
                  <li>• Validate amounts before payment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Production</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Set live: true for production</li>
                  <li>• Use HTTPS for all transactions</li>
                  <li>• Implement webhook verification</li>
                  <li>• Monitor payment success rates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};