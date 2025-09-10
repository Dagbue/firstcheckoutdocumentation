import React from 'react';
import { Globe, Code, Zap, CheckCircle } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';

export const CdnScriptSection: React.FC = () => {
  const basicHtmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FirstChekout Payment</title>

  <meta http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self' https://cdn.jsdelivr.net 'your_nonce_here';
    style-src 'self' 'your_nonce_here';
    img-src 'self' data: https://www.firstchekout.com/bankslogo/loader_ring.gif;
    connect-src https://paymentcheckoutui.azurewebsites.net https://payment-checkout-dev.azurewebsites.net;
    frame-src https://paymentcheckoutui.azurewebsites.net;
    base-uri 'self';
    form-action 'self';
    object-src 'none';
    upgrade-insecure-requests;
    block-all-mixed-content;
  ">

  <style nonce="your_nonce_here">
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 2rem;
      text-align: center;
    }
    #payBtn {
      padding: 0.75rem 1.5rem;
      background-color: #0078d4;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
    }
    #payBtn:hover {
      background-color: #005ea2;
    }
    #amountDisplay {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #333;
    }
    #errorContainer h3 {
      color: red;
      margin-top: 1rem;
    }
  </style>
</head>
<body>

  <h2>Secure Payment Checkout</h2>
  <div id="amountDisplay"></div>
  <button id="payBtn">Pay Now</button>
  <div id="errorContainer"></div>

  <!-- ✅ Load SDK securely with SRI and crossorigin -->
   <script src="https://cdn.jsdelivr.net/npm/firstchekout@1.5.41/dist/fbncheckout.js"
   integrity="sha384-ejTDG9NwYhQnHG5ibsV9qfRGNpgzA3OeH92BMVL/RqD1Gxv2PLo3QJl9uAeXRZn6"
   crossorigin="anonymous"></script>

  <!-- ✅ Inline script secured with nonce -->
  <script nonce="your_nonce_here">
    function sendError(message) {
      console.error(message);
      document.getElementById('errorContainer').innerHTML = \`<h3>\${escapeHtml(message)}</h3>\`;
      window.ReactNativeWebView?.postMessage(JSON.stringify({ status: 'error', message }));
    }

    function escapeHtml(str) {
      return str.replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      })[m]);
    }

    function getParamsWithDefaults() {
      const params = new URLSearchParams(window.location.search);

      const amount = parseInt(params.get('amount'), 10) || 5000;
      const email = params.get('email') || 'test@example.com';
      const firstname = params.get('firstname') || 'Test';
      const lastname = params.get('lastname') || 'User';
      const customerId = params.get('customerId') || 'cust_default';
      const ref = params.get('ref') || 'txn_' + Date.now();
      const live = params.get('live') === 'true';
      const publicKey = params.get('publicKey') || 'sb-pk-your_public_key_here';
      const currency = params.get('currency') || 'NGN';
      const description = params.get('description') || 'Default Transaction';

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
      if (!['NGN'].includes(currency)) throw new Error('Unsupported currency');
      if (isNaN(amount) || amount <= 0) throw new Error('Invalid amount');

      return {
        amount,
        email: escapeHtml(email),
        firstname: escapeHtml(firstname),
        lastname: escapeHtml(lastname),
        customerId: escapeHtml(customerId),
        ref: escapeHtml(ref),
        live,
        publicKey: escapeHtml(publicKey),
        currency,
        description: escapeHtml(description)
      };
    }

    window.addEventListener('DOMContentLoaded', () => {
      let params;
      try {
        params = getParamsWithDefaults();
      } catch (err) {
        sendError(err.message);
        return;
      }

      // ✅ Display amount
      const display = document.getElementById('amountDisplay');
      display.textContent = \`Amount to Pay: ₦\${params.amount.toLocaleString()}\`;

      const btn = document.getElementById('payBtn');
      btn.addEventListener('click', async () => {
        if (!window.FBNCheckout?.default?.initiateTransactionAsync) {
          sendError("SDK not available");
          return;
        }

        const txn = {
          live: params.live,
          ref: params.ref,
          amount: params.amount,
          customer: {
            firstname: params.firstname,
            lastname: params.lastname,
            email: params.email,
            id: params.customerId
          },
          fees: [{ amount: 0, label: "Service Fee" }],
          meta: { customField: "value" },
          publicKey: params.publicKey,
          description: params.description,
          currency: params.currency,
          callback: (response) => {
            window.ReactNativeWebView?.postMessage(JSON.stringify({
              status: 'success',
              reference: response.reference,
              response
            }));
          },
          onClose: () => {
            window.ReactNativeWebView?.postMessage(JSON.stringify({ status: 'cancelled' }));
          },
          options: ["QR", "CARD", "WALLET", "PAYATTITUE", "QR", "BNPL"]
        };

        const addressUrl = {
        BaseFrame: "base_frame",
        InitiatePaymentURI: "initiate_payment_URI"
        };

        try {
          await window.FBNCheckout.default.initiateTransactionAsync(txn, addressUrl);
        } catch (err) {
          sendError("Transaction failed: " + escapeHtml(err.message));
        }
      });
    });
  </script>
</body>
</html>`;

  const phpIntegrationCode = `<?php
// payment.php

// Generate a nonce for CSP
$nonce = base64_encode(random_bytes(16));

// Get environment variables
$environment = getenv('ENVIRONMENT') === 'production' ? 'true' : 'false';
$publicKey = getenv('FIRSTCHEKOUT_PUBLIC_KEY') ?: 'sb-pk-your_public_key_here';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Payment Integration</title>
    <meta http-equiv="Content-Security-Policy"
        content="
            default-src 'self';
            script-src 'self' https://cdn.jsdelivr.net 'nonce-<?php echo $nonce; ?>';
            style-src 'self' 'nonce-<?php echo $nonce; ?>';
            img-src 'self' data: https://www.firstchekout.com/bankslogo/loader_ring.gif;
            connect-src https://paymentcheckoutui.azurewebsites.net https://payment-checkout-dev.azurewebsites.net;
            frame-src https://paymentcheckoutui.azurewebsites.net;
            base-uri 'self';
            form-action 'self';
            object-src 'none';
            upgrade-insecure-requests;
            block-all-mixed-content;
        ">

    <style nonce="<?php echo $nonce; ?>">
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 2rem;
            text-align: center;
        }
        .payment-form {
            max-width: 500px;
            margin: 50px auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-control {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }
        .btn-primary {
            padding: 0.75rem 1.5rem;
            background-color: #0078d4;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
        }
        .btn-primary:hover {
            background-color: #005ea2;
        }
        #amountDisplay {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: #333;
        }
        #errorContainer h3 {
            color: red;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <div class="payment-form">
        <h2>Secure Payment Checkout</h2>
        <div id="amountDisplay"></div>
        <form id="paymentForm">
            <div class="form-group">
                <label for="amount">Amount (₦)</label>
                <input type="number" id="amount" class="form-control" value="100" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="fullName">Full Name</label>
                <input type="text" id="fullName" class="form-control" required>
            </div>
            <button type="button" class="btn-primary" onclick="processPayment()">Pay Now</button>
        </form>
        <div id="errorContainer"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/firstchekout@1.5.41/dist/fbncheckout.js"
        integrity="sha384-ejTDG9NwYhQnHG5ibsV9qfRGNpgzA3OeH92BMVL/RqD1Gxv2PLo3QJl9uAeXRZn6"
        crossorigin="anonymous"></script>

    <script nonce="<?php echo $nonce; ?>">
        function sendError(message) {
            console.error(message);
            document.getElementById('errorContainer').innerHTML = \`<h3>\${escapeHtml(message)}</h3>\`;
            window.ReactNativeWebView?.postMessage(JSON.stringify({ status: 'error', message }));
        }

        function escapeHtml(str) {
            return str.replace(/[&<>"']/g, m => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            })[m]);
        }

        function getParamsWithDefaults() {
            const params = new URLSearchParams(window.location.search);
            const formAmount = document.getElementById('amount')?.value;
            const formEmail = document.getElementById('email')?.value;
            const formFullName = document.getElementById('fullName')?.value;

            const amount = parseInt(formAmount || params.get('amount'), 10) || 10000; // Default to 100 NGN (10000 kobo)
            const email = formEmail || params.get('email') || 'test@example.com';
            const fullName = formFullName || params.get('fullName') || 'Test User';
            const [firstname, ...lastnameParts] = fullName.split(' ');
            const lastname = lastnameParts.join(' ') || 'User';
            const customerId = params.get('customerId') || 'cust_' + Date.now();
            const ref = params.get('ref') || 'php_txn_' + Date.now();
            const live = <?php echo $environment; ?>;
            const publicKey = '<?php echo $publicKey; ?>';
            const currency = params.get('currency') || 'NGN';
            const description = params.get('description') || 'Payment via PHP';

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
            if (!['NGN'].includes(currency)) throw new Error('Unsupported currency');
            if (isNaN(amount) || amount <= 0) throw new Error('Invalid amount');

            return {
                amount: amount * 100, // Convert to kobo
                email: escapeHtml(email),
                firstname: escapeHtml(firstname),
                lastname: escapeHtml(lastname),
                customerId: escapeHtml(customerId),
                ref: escapeHtml(ref),
                live,
                publicKey: escapeHtml(publicKey),
                currency,
                description: escapeHtml(description)
            };
        }

        window.addEventListener('DOMContentLoaded', () => {
            let params;
            try {
                params = getParamsWithDefaults();
            } catch (err) {
                sendError(err.message);
                return;
            }

            const display = document.getElementById('amountDisplay');
            display.textContent = \`Amount to Pay: ₦\${(params.amount / 100).toLocaleString()}\`;
        });

        function processPayment() {
            let params;
            try {
                params = getParamsWithDefaults();
            } catch (err) {
                sendError(err.message);
                return;
            }

            if (!window.FBNCheckout?.default?.initiateTransactionAsync) {
                sendError("SDK not available");
                return;
            }

            const txn = {
                live: params.live,
                ref: params.ref,
                amount: params.amount,
                customer: {
                    firstname: params.firstname,
                    lastname: params.lastname,
                    email: params.email,
                    id: params.customerId
                },
                fees: [{ amount: 0, label: "Service Fee" }],
                meta: { customField: "value" },
                publicKey: params.publicKey,
                description: params.description,
                currency: params.currency,
                callback: (response) => {
                    if (response.status === "successful") {
                        window.ReactNativeWebView?.postMessage(JSON.stringify({
                            status: 'success',
                            reference: response.reference,
                            response
                        }));
                        window.location.href = "/verify_payment.php?ref=" + response.reference;
                    } else {
                        sendError("Payment failed or was cancelled");
                    }
                },
                onClose: () => {
                    window.ReactNativeWebView?.postMessage(JSON.stringify({ status: 'cancelled' }));
                },
                options: ["QR", "CARD", "WALLET", "PAYATTITUE", "QR", "BNPL"]
            };

            const addressUrl = {
            BaseFrame: "base_frame",
            InitiatePaymentURI: "initiate_payment_URI"
            };

            try {
                window.FBNCheckout.default.initiateTransactionAsync(txn, addressUrl)
                    .catch(err => sendError("Transaction failed: " + escapeHtml(err.message)));
            } catch (err) {
                sendError("Transaction failed: " + escapeHtml(err.message));
            }
        }
    </script>
</body>
</html>`;

  const advancedExampleCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced FirstChekout Integration</title>
    <style>
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .product-card { border: 1px solid #ddd; padding: 20px; margin: 10px 0; border-radius: 8px; }
        .btn { padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        .btn-success { background: #28a745; color: white; }
        .btn-info { background: #17a2b8; color: white; }
        .payment-options { margin: 20px 0; }
        .payment-method { margin: 5px; padding: 5px 10px; background: #e9ecef; border-radius: 4px; }
        .loading { display: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>E-Commerce Store</h1>
        
        <div class="product-card">
            <h3>Premium Package</h3>
            <p>Full-featured package with all premium benefits</p>
            <p><strong>Price: ₦15,000</strong></p>
            <button class="btn btn-success" onclick="buyProduct('premium', 15000)">
                Buy Now
            </button>
        </div>

        <div class="product-card">
            <h3>Basic Package</h3>
            <p>Essential features for getting started</p>
            <p><strong>Price: ₦5,000</strong></p>
            <button class="btn btn-success" onclick="buyProduct('basic', 5000)">
                Buy Now
            </button>
        </div>

        <div id="paymentModal" style="display: none;">
            <div class="payment-options">
                <h4>Select Payment Method:</h4>
                <label><input type="checkbox" value="CARD" checked> Credit/Debit Card</label><br>
                <label><input type="checkbox" value="USSD"> USSD</label><br>
                <label><input type="checkbox" value="PAYATTITUDE"> Bank Transfer</label><br>
                <button class="btn btn-info" onclick="proceedWithPayment()">Continue</button>
            </div>
        </div>

        <div id="loading" class="loading">
            <p>Processing payment...</p>
        </div>
    </div>

    <script src="https://hosted_cdn.firstchekout.com/v1"></script>
    <script>
        let currentOrder = null;

        function buyProduct(productType, amount) {
            currentOrder = {
                product: productType,
                amount: amount * 100, // Convert to kobo
                description: productType.charAt(0).toUpperCase() + productType.slice(1) + " Package"
            };
            
            document.getElementById('paymentModal').style.display = 'block';
        }

        function proceedWithPayment() {
            if (!currentOrder) return;

            const selectedMethods = Array.from(
                document.querySelectorAll('input[type="checkbox"]:checked')
            ).map(cb => cb.value);

            if (selectedMethods.length === 0) {
                alert('Please select at least one payment method');
                return;
            }

            document.getElementById('loading').style.display = 'block';
            document.getElementById('paymentModal').style.display = 'none';

            const paymentConfig = {
                live: false, // Change to true for production
                ref: \`order-\${currentOrder.product}-\${Date.now()}\`,
                amount: currentOrder.amount,
                customer: {
                    firstname: "Customer",
                    lastname: "User",
                    email: "customer@example.com"
                },
                publicKey: "your-public-key-here",
                description: currentOrder.description,
                currency: "NGN",
                callback: handlePaymentResponse,
                onClose: function() {
                    document.getElementById('loading').style.display = 'none';
                    currentOrder = null;
                },
                options: selectedMethods,
                meta: {
                    productType: currentOrder.product,
                    source: "website_store"
                }
            };

            FBNCheckout.initiateTransactionAsync(paymentConfig, {
                BaseFrame: "https://checkout.firstchekout.com",
                InitiatePaymentURI: "https://api.firstchekout.com/v1/transactions/initiate"
            }).catch(error => {
                document.getElementById('loading').style.display = 'none';
                console.error('Payment error:', error);
                alert('Failed to initialize payment. Please try again.');
            });
        }

        function handlePaymentResponse(response) {
            document.getElementById('loading').style.display = 'none';
            
            if (response.status === "successful") {
                // Store successful transaction
                localStorage.setItem('lastPayment', JSON.stringify({
                    reference: response.reference,
                    product: currentOrder.product,
                    amount: currentOrder.amount,
                    date: new Date().toISOString()
                }));
                
                alert(\`Payment successful! Reference: \${response.reference}\`);
                
                // Redirect to success page or trigger success actions
                // window.location.href = '/success.html';
                
            } else {
                alert('Payment failed or was cancelled. Please try again.');
            }
            
            currentOrder = null;
        }

        // Check for previous successful payments
        window.onload = function() {
            const lastPayment = localStorage.getItem('lastPayment');
            if (lastPayment) {
                const payment = JSON.parse(lastPayment);
                console.log('Last successful payment:', payment);
            }
        };
    </script>
</body>
</html>`;

  return (
      <section id="cdn-script" className="mb-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">CDN Script Integration</h2>
          <p className="text-l text-gray-600 mb-4">
            Perfect for static websites, legacy applications, and quick integrations without framework dependencies.
            Simply include the CDN script and start accepting payments immediately.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 text-sm">No Dependencies</h3>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
              <Zap className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-semibold text-emerald-900 text-sm">Quick Setup</h3>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <Code className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900 text-sm">Vanilla JS</h3>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <h3 className="font-semibold text-amber-900 text-sm">Legacy Support</h3>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic HTML Integration</h3>
              <p className="text-gray-600 mb-4">
                Complete HTML page with FirstChekout integration - no frameworks required:
              </p>
              <CodeBlock language="html" code={basicHtmlCode} />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">PHP Integration Example</h3>
              <p className="text-gray-600 mb-4">
                Integrate with PHP applications using the CDN script for frontend payments:
              </p>
              <CodeBlock language="php" code={phpIntegrationCode} />
            </div>

            <div style={{display: "none"}}>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced E-commerce Example</h3>
              <p className="text-gray-600 mb-4">
                Complete e-commerce integration with product selection and payment method options:
              </p>
              <CodeBlock language="html" code={advancedExampleCode} />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Global Object: FBNCheckout</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Available globally after script loads</li>
                    <li>• Same API as NPM package</li>
                    <li>• Promise-based initiateTransactionAsync method</li>
                    <li>• Compatible with all modern browsers</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Browser Compatibility</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Chrome 60+</li>
                    <li>• Firefox 55+</li>
                    <li>• Safari 12+</li>
                    <li>• Edge 79+</li>
                    <li>• Internet Explorer 11 (with polyfills)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Implementation Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Best Practices</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Load CDN script in the &lt;head&gt; or before closing &lt;/body&gt;</li>
                    <li>• Always validate amounts before payment</li>
                    <li>• Use unique reference IDs for each transaction</li>
                    <li>• Implement proper error handling</li>
                    <li>• Test thoroughly in sandbox mode</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Common Patterns</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Store payment state in localStorage</li>
                    <li>• Use callbacks for success/failure actions</li>
                    <li>• Redirect to confirmation pages</li>
                    <li>• Display loading states during processing</li>
                    <li>• Provide clear user feedback</li>
                  </ul>
                </div>
              </div>
            </div>

            {/*<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">*/}
            {/*  <h3 className="text-lg font-semibold text-blue-900 mb-4">Content Security Policy (CSP)</h3>*/}
            {/*  <p className="text-blue-800 mb-3">*/}
            {/*    If your site uses CSP headers, add these domains to allow FirstChekout to load:*/}
            {/*  </p>*/}
            {/*  <CodeBlock*/}
            {/*      language="text"*/}
            {/*      code={`Content-Security-Policy: script-src 'self' https://cdn.jsdelivr.net; connect-src 'self' https://paymentcheckoutui.azurewebsites.net https://payment-checkout-dev.azurewebsites.net; frame-src https://paymentcheckoutui.azurewebsites.net;`}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
        </div>
      </section>
  );
};