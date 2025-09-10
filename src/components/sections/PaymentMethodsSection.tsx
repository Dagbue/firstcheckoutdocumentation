import React from 'react';
import { CreditCard, Smartphone, Ban as Bank, QrCode } from 'lucide-react';
import { CodeBlock } from '../CodeBlock';
import {MermaidDiagramSudo} from "../MermaidDiagramSudo.tsx";
import {MermaidDiagram} from "@lightenna/react-mermaid-diagram";


export const PaymentMethodsSection: React.FC = () => {
  const cardFlowDiagram = `
graph TD
    A[Initiate Card Payment] --> B[Encrypt Card Data with AES]
    B --> C[Send Encrypted AuthData]
    C --> D[Receive OTP Prompt]
    D --> E[Customer Enters OTP]
    E --> F[Submit OTP for Verification]
    F --> G[Payment Success/Failure]
  `;

  const ussdFlowDiagram = `
graph TD
    A[Get Financial Institutions] --> B[Customer Selects Bank]
    B --> C[Initiate USSD Payment]
    C --> D[Receive USSD Code]
    D --> E[Customer Dials Code]
    E --> F[Complete on Phone]
    F --> G[Query Transaction Status]
  `;

  const cardInitiateCode = `curl --location '{{ payment_Gateway_Url }}/api/v1/cards/initiate' \\ // reference testing and debugging section
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "AuthData": "encrypted_card_data_here",
  "AccessCode": "TXN_ACCESS_CODE_123",
  "PaymentReference": "unique-ref-12345"
}'`;

  const ussdInitiateCode = `curl --location '{{ payment_Gateway_Url }}/api/v1/ussd/initiate' \\ // reference testing and debugging section
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "FinancialInstitutionId": "011",
  "AccessCode": "TXN_ACCESS_CODE_123",
  "PaymentReference": "unique-ref-12345"
}'`;

  const transferInitiateCode = `curl --location '{{ payment_Gateway_Url }}/api/v1/paywithtransfer/initiate' \\ // reference testing and debugging section
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "TypeId": 2,
  "AccessCode": "TXN_ACCESS_CODE_123",
  "PaymentReference": "unique-ref-12345"
}'`;

  const testCardsCode = `# Test Card Numbers

# Verve Cards
  5061050254756707864  # Expiry: 06/26, CVV: 111, PIN: 1111
  5060990580000217499  # Expiry: 03/50, CVV: 111, PIN: 1111

# Mastercard
  5123450000000008     # Expiry: 01/39, CVV: 100, PIN: 1111, OTP: 123456,

# Visa
  4000000000002503     # Expiry: 03/50, CVV: 11, PIN: 1111`;


  return (
    <section id="payment-methods" className="mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment Methods & Flows</h2>
        <p className="text-lg text-gray-600 mb-8">
          FirstChekout supports multiple payment methods to give your customers flexibility.
          Each method has specific initiation and confirmation steps optimized for the Nigerian market.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <CreditCard className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-900">Card Payments</h3>
            <p className="text-sm text-blue-700 mt-2">Visa, Mastercard, Verve with 3D Secure</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
            <Smartphone className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-semibold text-emerald-900">USSD</h3>
            <p className="text-sm text-emerald-700 mt-2">All major Nigerian banks</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <Bank className="h-10 w-10 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-purple-900">Bank Transfer</h3>
            <p className="text-sm text-purple-700 mt-2">Virtual account generation</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
            <QrCode className="h-10 w-10 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-amber-900">QR Code</h3>
            <p className="text-sm text-amber-700 mt-2">Scan and pay with mobile apps</p>
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Card Payment Flow</h3>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Process Overview</h4>
                <MermaidDiagramSudo code={cardFlowDiagram}/>
                <MermaidDiagram>{cardFlowDiagram}</MermaidDiagram>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span>AES encryption for all card data transmission</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span>3D Secure authentication for enhanced security</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span>OTP verification for transaction completion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span>Support for local and international cards</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">API Implementation</h4>
              <CodeBlock language="bash" code={cardInitiateCode} />
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">🔒 Security Requirement</h4>
              <p className="text-red-800 text-sm">
                All card data MUST be encrypted using AES with your encryption key before sending to the API. 
                Never send plain card details over the network.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">USSD Payment Flow</h3>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Process Overview</h4>
                <MermaidDiagramSudo code={ussdFlowDiagram}/>
                <MermaidDiagram>{ussdFlowDiagram}</MermaidDiagram>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Supported Banks</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">First Bank (011)</div>
                  <div className="bg-gray-50 p-2 rounded">GTBank (058)</div>
                  <div className="bg-gray-50 p-2 rounded">Access Bank (044)</div>
                  <div className="bg-gray-50 p-2 rounded">Zenith Bank (057)</div>
                  <div className="bg-gray-50 p-2 rounded">UBA (033)</div>
                  <div className="bg-gray-50 p-2 rounded">Ecobank (050)</div>
                  <div className="bg-gray-50 p-2 rounded">Fidelity Bank (070)</div>
                  <div className="bg-gray-50 p-2 rounded">Union Bank (032)</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">API Implementation</h4>
              <CodeBlock language="bash" code={ussdInitiateCode} />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">📱 Customer Experience</h4>
              <p className="text-blue-800 text-sm">
                After initiation, customers receive a USSD code (like *894*000*9149#) to dial on their phone. 
                The payment is completed through their mobile banking interface.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Bank Transfer (PayWithTransfer)</h3>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h4>
                <ol className="space-y-2 text-gray-600">
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</span>
                    <span>System generates a virtual account number</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</span>
                    <span>Customer transfers exact amount to virtual account</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</span>
                    <span>Payment is automatically confirmed</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">4</span>
                    <span>Virtual account expires after 30 minutes</span>
                  </li>
                </ol>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                    <span>No card details required</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                    <span>Works with any bank account</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                    <span>Automatic reconciliation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                    <span>High success rates</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">API Implementation</h4>
              <CodeBlock language="bash" code={transferInitiateCode} />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibent text-amber-900 mb-2">⏰ Time Sensitive</h4>
              <p className="text-amber-800 text-sm">
                Virtual accounts expire in 1800 seconds (30 minutes). Customers must complete 
                their transfer within this timeframe.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Sample Cards</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Test Card Numbers</h4>
              <p className="text-gray-600 mb-4">
                Use these test card numbers in sandbox mode to simulate different payment scenarios:
              </p>
              <CodeBlock language="text" code={testCardsCode} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-900 mb-2">✅ Successful Transactions</h4>
                <ul className="text-sm text-emerald-800 space-y-1">
                  <li>• Use provided test card numbers</li>
                  <li>• Enter PIN: 1111 when prompted</li>
                  <li>• Use OTP: 123456 for verification</li>
                  <li>• All USSD codes work in sandbox</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Failed Transactions</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Use card: 5061830100001895</li>
                  <li>• Enter  PIN (1111)</li>
                  <li>• Use OTP (123456)</li>
                  <li>• Test scenarios</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Payment Method Comparison</h3>
            
            <div className="overflow-x-auto">
            <div className="table-container">
              <table className="responsive-table min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setup Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Experience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900" data-label="Method">Card</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500" data-label="Setup Time">~2-3 minutes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600" data-label="Success Rate">85-90%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500" data-label="User Experience">Familiar, fast</td>
                    <td className="px-6 py-4 text-gray-500" data-label="Best For">Quick purchases, returning customers</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900" data-label="Method">USSD</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500" data-label="Setup Time">~3-5 minutes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600" data-label="Success Rate">90-95%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500" data-label="User Experience">Phone required</td>
                    <td className="px-6 py-4 text-gray-500" data-label="Best For">Users without cards, high security</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900" data-label="Method">Transfer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500" data-label="Setup Time">~5-10 minutes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600" data-label="Success Rate">95-98%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500" data-label="User Experience">Banking app required</td>
                    <td className="px-6 py-4 text-gray-500" data-label="Best For">Large amounts, business payments</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900" data-label="Method">QR Code</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500" data-label="Setup Time">~1-2 minutes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600" data-label="Success Rate">88-92%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500" data-label="User Experience">Mobile-first</td>
                    <td className="px-6 py-4 text-gray-500" data-label="Best For">Mobile users, contactless payments</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};