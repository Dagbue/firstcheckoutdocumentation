import React from 'react';
import { Link2, QrCode, Copy, Users, Target, User, CheckCircle, Clock, AlertTriangle, Zap } from 'lucide-react';
import {ckeckoutscreen, dynamic, hybrid1, hybrid2, staticLink} from "../../assets";

export const PaymentLinksSection: React.FC = () => {
  const comparisonData = [
    {
      feature: 'Reusability',
      static: 'High (unlimited)',
      hybrid: 'High (with alias tracking)',
      dynamic: 'Low (per customer)'
    },
    {
      feature: 'Customization',
      static: 'Low (fixed details)',
      hybrid: 'Medium (alias, purpose)',
      dynamic: 'High (customer/product info)'
    },
    {
      feature: 'Best For',
      static: 'Generic payments',
      hybrid: 'Campaign tracking',
      dynamic: 'Personalized invoicing'
    },
    {
      feature: 'Fields Required',
      static: 'Amount, purpose',
      hybrid: 'Alias, amount, purpose',
      dynamic: 'Customer name/email/ID, product, amount'
    },
    {
      feature: 'Tracking',
      static: 'Basic',
      hybrid: 'Alias-based',
      dynamic: 'Status (Pending/Success)'
    }
  ];


  return (
    <section id="payment-links" className="mb-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Links (No-Code Method)</h2>
        <p className="text-l text-gray-600 mb-4">
          Create secure, shareable payment URLs or QR codes directly from your merchant dashboard without any coding. 
          Perfect for small businesses, one-off transactions, quick invoicing, or when you need to start accepting 
          payments immediately without developer resources.
        </p>

        {/* Key Benefits */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-emerald-900 mb-4 flex items-center">
            <Zap className="h-6 w-6 mr-2" />
            Key Benefits of Payment Links
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ul className="space-y-2 text-emerald-800">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Simplicity:</strong> No programming required—just fill in details and share</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Flexibility:</strong> Supports various payment scenarios from fixed amounts to personalized invoices</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Tracking:</strong> Links appear in dashboard with status updates (Pending/Success)</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 text-emerald-800">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Distribution Options:</strong> Copy URL for digital sharing or download QR code</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Security:</strong> Hosted on secure domains with proper encryption</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>No Integration Needed:</strong> Start accepting payments immediately</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Three Types Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Link2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-blue-900 mb-2 text-lg ">Static Payment Link</h3>
            <p className="text-sm text-blue-700">Reusable, fixed-purpose links for standard products or services</p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-900 mb-2 text-lg ">Hybrid Payment Link</h3>
            <p className="text-sm text-purple-700">Reusable with custom aliases for campaign tracking</p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <User className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="font-semibent text-amber-900 mb-2 text-lg ">Dynamic Payment Link</h3>
            <p className="text-sm text-amber-700">Personalized, one-time links with customer details</p>
          </div>
        </div>

        <div className="space-y-12">
          {/* Static Payment Links */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Link2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">1. Static Payment Link</h3>
                <p className="text-gray-600">Reusable, fixed-purpose links for ongoing collections</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">📋 Definition & Key Features</h4>
              <p className="text-blue-800 mb-4">
                A Static Payment Link is a reusable, fixed-purpose link designed for scenarios where payment details 
                (amount and purpose) don't change across multiple uses. It acts like a permanent "pay now" button 
                for specific products or services.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-blue-900 mb-2">✅ Key Features:</h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>Reusability:</strong> Same link for multiple customers indefinitely</li>
                    <li>• <strong>Fixed Details:</strong> Amount and purpose are predefined</li>
                    <li>• <strong>Simplicity:</strong> Minimal fields to configure</li>
                    <li>• <strong>QR Code Support:</strong> Downloadable for in-store use</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-900 mb-2">🎯 Best For:</h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Standard product sales</li>
                    <li>• Donation collections</li>
                    <li>• Subscription payments</li>
                    <li>• Service fees</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">🔄 Creation and Usage Flow</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</span>
                    <span><strong>Navigate to Dashboard:</strong> Log in to merchant portal and select "Payment Links" from sidebar</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</span>
                    <span><strong>Select Static Tab:</strong> Click "Static Payment Link" to view existing links</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</span>
                    <span><strong>Create New Link:</strong> Click "Create New Link" button in top-right corner</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">4</span>
                    <span><strong>Fill Details:</strong> Enter fixed amount (e.g., ₦10,000.00) and purpose (e.g., "Italian Shoes")</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">5</span>
                    <span><strong>Generate & Share:</strong> Copy link or download QR code for distribution</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">💡 Example Usage</h4>
              <div>
                <img src={staticLink} alt="Figure 1"/>
                <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 1:</strong> Static PaymentLik</p>
              </div>

              <div className="mt-8">
                <img src={ckeckoutscreen} alt="Figure 1"/>
                <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 2:</strong>CheckOut Frame</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-900 mb-2">🎯 Use Case Example</h4>
              <p className="text-emerald-800 text-sm">
                A merchant selling "Italian Shoes" for ₦10,000.00 generates one Static link and embeds it on their
                website
                or shares it in social media posts. Multiple customers can use the same link without reconfiguration.
              </p>
            </div>
          </div>

          {/* Hybrid Payment Links */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">2. Hybrid Payment Link</h3>
                <p className="text-gray-600">Reusable links with custom aliases for campaign tracking</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-purple-900 mb-4">📋 Definition & Key Features</h4>
              <p className="text-purple-800 mb-4">
                A Hybrid Payment Link combines the reusability of Static links with added customization through unique 
                aliases for better tracking. It's "hybrid" because it allows fixed amounts while enabling merchants 
                to assign identifiers for categorizing or campaigning.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-purple-900 mb-2">✅ Key Features:</h5>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• <strong>Custom Alias:</strong> Unique identifier for tracking (e.g., "shoes", "UAT1")</li>
                    <li>• <strong>Fixed Amount & Purpose:</strong> Like Static but with descriptive purpose</li>
                    <li>• <strong>Table Management:</strong> Searchable table with date filters</li>
                    <li>• <strong>Campaign Tracking:</strong> Aliases help differentiate usage</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-purple-900 mb-2">🎯 Best For:</h5>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Event registrations</li>
                    <li>• Marketing campaigns</li>
                    <li>• Product variants</li>
                    <li>• A/B testing payments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">🔄 Creation and Usage Flow</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</span>
                    <span><strong>Select Hybrid Tab:</strong> Click "Hybrid Payment Link" to view existing links table</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</span>
                    <span><strong>Create New Link:</strong> Click "Create New Link" in top-right corner</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</span>
                    <span><strong>Fill Required Fields:</strong> Alias* (e.g., "testLink"), Amount* (e.g., ₦20,000.00), Purpose (e.g., "for testing")</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">4</span>
                    <span><strong>Generate & Track:</strong> Link added to table with alias for campaign attribution</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">5</span>
                    <span><strong>Monitor:</strong> Use date filters and alias tracking in dashboard analytics</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">💡 Example Usage</h4>
              <div>
                <img src={hybrid1} alt="Figure 1"/>
                <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 1:</strong>Hybrid PaymentLik</p>
              </div>

              <div className="mt-8">
                <img src={hybrid2} alt="Figure 1"/>
                <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 2:</strong>Hybrid PaymentLik</p>
              </div>

              <div className="mt-8">
                <img src={ckeckoutscreen} alt="Figure 1"/>
                <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 3:</strong>CheckOut Frame</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-900 mb-2">🎯 Use Case Example</h4>
              <p className="text-emerald-800 text-sm">
                For a test campaign ("for testing") at ₦20,000.00 with alias "testLink," share the link in targeted
                emails.
                The alias helps attribute payments to the campaign in analytics and reporting.
              </p>
            </div>
          </div>

          {/* Dynamic Payment Links */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">3. Dynamic Payment Link</h3>
                <p className="text-gray-600">Personalized, one-time links with customer-specific details</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-amber-900 mb-4">📋 Definition & Key Features</h4>
              <p className="text-amber-800 mb-4">
                A Dynamic Payment Link is a one-time or customer-specific link that includes personalized details like 
                name, email, and product information. Generated per transaction, it's ideal for invoicing where each 
                link is tailored and trackable with real-time status updates.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-amber-900 mb-2">✅ Key Features:</h5>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• <strong>Personalization:</strong> Customer fields for targeted sending</li>
                    <li>• <strong>Status Tracking:</strong> Real-time updates (PENDING/SUCCESS)</li>
                    <li>• <strong>Detailed Fields:</strong> Product name, description, and amount</li>
                    <li>• <strong>Security:</strong> One-time or customer-specific usage</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-amber-900 mb-2">🎯 Best For:</h5>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Personalized invoicing</li>
                    <li>• B2B payments</li>
                    <li>• E-commerce checkouts</li>
                    <li>• Custom orders</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">🔄 Creation and Usage Flow</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</span>
                    <span><strong>Select Dynamic Tab:</strong> View table with Date, Product, Amount, Customer Name, Email, Status</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</span>
                    <span><strong>Create New Link:</strong> Click "Create New Link" to open detailed form</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</span>
                    <span><strong>Fill Customer Details:</strong> First Name*, Last Name*, Email*, Customer ID (optional)</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">4</span>
                    <span><strong>Add Product Info:</strong> Product Name*, Description*, Amount* (e.g., ₦400.00)</span>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">5</span>
                    <span><strong>Generate & Monitor:</strong> Link created with PENDING status, updates to SUCCESS upon payment</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">💡 Example Usage</h4>

              <div>
                <img src={dynamic} alt="Figure 1"/>
                <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 1:</strong> Dynamic PaymentLik</p>
              </div>

              <div className="mt-8">
                <img src={ckeckoutscreen} alt="Figure 1"/>
                <p className="mt-2 text-gray-600 space-y-1"><strong>Figure 2:</strong>CheckOut Frame</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-900 mb-2">🎯 Use Case Example</h4>
              <p className="text-emerald-800 text-sm">
                Invoice "Sandra Ihekire" for "barella tact" at ₦400.00. Send the personalized link via email;
                monitor status changes from PENDING to SUCCESS in the dashboard without any coding required.
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">📊 Payment Link Types Comparison</h3>
            
            <div className="overflow-x-auto">
            <div className="table-container">
              <table className="responsive-table min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Link2 className="h-4 w-4 mr-1 text-blue-500" />
                        Static
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-1 text-purple-500" />
                        Hybrid
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-amber-500" />
                        Dynamic
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900" data-label="Feature">{row.feature}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-label="Static">{row.static}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-label="Hybrid">{row.hybrid}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-label="Dynamic">{row.dynamic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>

          {/* Distribution Methods */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">📤 Distribution Methods</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Copy className="h-6 w-6 text-blue-600 mr-3" />
                  <h4 className="text-lg font-semibold text-blue-900">Copy Link Method</h4>
                </div>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Share via WhatsApp, SMS, or email</li>
                  <li>• Embed in websites or social media</li>
                  <li>• Include in digital marketing campaigns</li>
                  <li>• Add to email signatures</li>
                  <li>• Perfect for online distribution</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <QrCode className="h-6 w-6 text-emerald-600 mr-3" />
                  <h4 className="text-lg font-semibold text-emerald-900">QR Code Method</h4>
                </div>
                <ul className="space-y-2 text-emerald-800 text-sm">
                  <li>• Download high-quality QR codes</li>
                  <li>• Print for physical store displays</li>
                  <li>• Include in flyers and brochures</li>
                  <li>• Perfect for contactless payments</li>
                  <li>• Mobile-first customer experience</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Status Tracking */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">📈 Status Tracking & Management</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                <Clock className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <h4 className="font-semibold text-amber-900 mb-2">PENDING</h4>
                <p className="text-sm text-amber-700">Link created but payment not yet completed</p>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold text-emerald-900 mb-2">SUCCESS</h4>
                <p className="text-sm text-emerald-700">Payment completed successfully</p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h4 className="font-semibold text-red-900 mb-2">FAILED</h4>
                <p className="text-sm text-red-700">Payment attempt failed or expired</p>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">📊 Dashboard Management Features</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Real-time status updates across all link types</li>
                <li>• Date range filtering for transaction history</li>
                <li>• Search functionality by customer name or product</li>
                <li>• Export capabilities for accounting and reporting</li>
                <li>• Detailed transaction logs with timestamps</li>
              </ul>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-bank-blue rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 text-white ">🚀 Ready to Start Creating Payment Links?</h3>
            <p className="text-blue-100 mb-6">
              Access your merchant dashboard to create your first payment link in minutes. No coding required, 
              no complex setup - just fill in the details and start accepting payments immediately.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-white ">📋 What You Need:</h4>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Active FirstChekout merchant account</li>
                  <li>• Product/service details</li>
                  <li>• Pricing information</li>
                  <li>• Customer details (for Dynamic links)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-white ">⚡ Quick Start Steps:</h4>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Log in to your merchant dashboard</li>
                  <li>• Navigate to "Payment Links" section</li>
                  <li>• Choose your link type (Static/Hybrid/Dynamic)</li>
                  <li>• Fill in the required details</li>
                  <li>• Generate and share your payment link</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="https://www.firstchekout.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white inline-flex items-center px-6 py-3 bg-bank-gold  rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
              >
                <Users className="mr-2 h-5 w-5" />
                Access Merchant Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};