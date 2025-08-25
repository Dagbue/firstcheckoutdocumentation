import React from 'react';
import { Globe, Code, Zap, CheckCircle } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';

export const CdnScriptSection: React.FC = () => {
  const basicHtmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FirstCheckout Payment</title>
</head>
<body>
    <div class="payment-container">
        <h2>Complete Your Payment</h2>
        <p>Total: ₦50.00</p>
        <button onclick="makePayment()" class="pay-btn">
            Pay Now with FirstCheckout
        </button>
    </div>

    <!-- FirstCheckout CDN Script -->
    <script src="https://hosted_cdn.firstchekout.com/v1"></script>
    
    <script>
        async function makePayment() {
            const txn = {
                live: false, // Set to true for production
                ref: "cdn-payment-" + Date.now(),
                amount: 5000, // Amount in kobo (₦50.00)
                customer: {
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@example.com",
                    id: "customer-123"
                },
                fees: [],
                meta: {
                    source: "website",
                    orderId: "ORD-001"
                },
                publicKey: "your-public-key-here",
                description: "Product Purchase",
                currency: "NGN",
                callback: function(response) {
                    console.log("Payment response:", response);
                    if (response.status === "successful") {
                        alert("Payment successful! Thank you.");
                        // Redirect to success page
                        window.location.href = "/success.html";
                    } else {
                        alert("Payment failed. Please try again.");
                    }
                },
                onClose: function() {
                    console.log("Payment modal closed");
                },
                options: ["CARD", "USSD", "PAYATTITUDE"]
            };

            const addressURL = {
                BaseFrame: "https://checkout.firstchekout.com",
                InitiatePaymentURI: "https://api.firstchekout.com/v1/transactions/initiate"
            };

            try {
                await FBNCheckout.initiateTransactionAsync(txn, addressURL);
            } catch (error) {
                console.error("Payment initiation failed:", error);
                alert("Unable to start payment. Please try again.");
            }
        }
    </script>
</body>
</html>`;

  const phpIntegrationCode = `<?php
// payment.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Payment Integration</title>
    <style>
        .payment-form { max-width: 500px; margin: 50px auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        .form-control { width: 100%; padding: 8px; border: 1px solid #ddd; }
        .btn-primary { background: #007bff; color: white; padding: 10px 20px; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <div class="payment-form">
        <h2>Payment Form</h2>
        <form id="paymentForm">
            <div class="form-group">
                <label>Amount (₦)</label>
                <input type="number" id="amount" class="form-control" value="100" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="email" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="fullName" class="form-control" required>
            </div>
            <button type="button" onclick="processPayment()" class="btn-primary">
                Pay Now
            </button>
        </form>
    </div>

    <script src="https://hosted_cdn.firstchekout.com/v1"></script>
    <script>
        function processPayment() {
            const amount = document.getElementById('amount').value * 100; // Convert to kobo
            const email = document.getElementById('email').value;
            const fullName = document.getElementById('fullName').value.split(' ');
            
            const config = {
                live: <?php echo (getenv('ENVIRONMENT') === 'production') ? 'true' : 'false'; ?>,
                ref: "php-payment-<?php echo uniqid(); ?>",
                amount: amount,
                customer: {
                    firstname: fullName[0] || '',
                    lastname: fullName.slice(1).join(' ') || '',
                    email: email
                },
                publicKey: "<?php echo getenv('FIRSTCHECKOUT_PUBLIC_KEY'); ?>",
                description: "Payment via PHP",
                currency: "NGN",
                callback: function(response) {
                    if (response.status === "successful") {
                        // Send to PHP backend for verification
                        window.location.href = "/verify_payment.php?ref=" + response.reference;
                    }
                },
                onClose: function() {
                    console.log("Payment cancelled");
                },
                options: ["CARD", "USSD"]
            };

            FBNCheckout.initiateTransactionAsync(config, {
                BaseFrame: "https://checkout.firstchekout.com",
                InitiatePaymentURI: "https://api.firstchekout.com/v1/transactions/initiate"
            });
        }
    </script>
</body>
</html>`;

  const advancedExampleCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced FirstCheckout Integration</title>
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
        <h2 className="text-3xl font-bold text-gray-900 mb-6">CDN Script Integration</h2>
        <p className="text-lg text-gray-600 mb-8">
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
              Complete HTML page with FirstCheckout integration - no frameworks required:
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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Content Security Policy (CSP)</h3>
            <p className="text-blue-800 mb-3">
              If your site uses CSP headers, add these domains to allow FirstCheckout to load:
            </p>
            <CodeBlock 
              language="text" 
              code={`Content-Security-Policy: script-src 'self' https://hosted_cdn.firstchekout.com; connect-src 'self' https://api.firstchekout.com https://payment-solution-gateway.azurewebsites.net; frame-src https://checkout.firstchekout.com;`} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};