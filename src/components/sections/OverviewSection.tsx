import React from 'react';
import { Shield, Zap, Globe, CheckCircle } from 'lucide-react';
// import { CodeBlock } from '../CodeBlock';
import {MermaidDiagramSudo} from "../MermaidDiagramSudo.tsx";
import {MermaidDiagram} from "@lightenna/react-mermaid-diagram";

export const OverviewSection: React.FC = () => {
  const mermaidCode = `
graph TD
    A[Start: Visit Portal] --> B[Register Account]
    B --> C[Complete KYC & Approval]
    C --> D[Fetch API Keys]
    D --> E[Choose Integration Path]
    E --> F1[API/SDK: Custom Apps]
    E --> F2[NPM: JS Sites]
    E --> F3[CDN: Static Sites]
    E --> F4[WordPress Plugin]
    F1 & F2 & F3 & F4 --> G[Test in Sandbox]
    G --> H[Go Live: Toggle to Production]
    H --> I[Monitor Transactions via Webhooks]
  `;

  return (
    <section id="overview" className="mb-16">
      <div className="bg-bank-blue rounded-xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-4">FirstChekout Payment Gateway</h1>
        <p className="text-l text-white/80 mb-6">
          The official payment gateway by First Bank of Nigeria, designed for merchants to receive payments 
          seamlessly via multiple payment methods including cards, USSD, and bank transfers.
        </p>
        <div className="flex flex-wrap gap-4">
          <span className="bg-bank-gold bg-opacity-20 px-4 py-1 rounded-full text-sm">PCI DSS Compliant</span>
          <span className="bg-bank-gold bg-opacity-20 px-4 py-1 rounded-full text-sm">Multi-Method Support</span>
          <span className="bg-bank-gold bg-opacity-20 px-4 py-1 rounded-full text-sm">Easy Integration</span>
          <span className="bg-bank-gold bg-opacity-20 px-4 py-1 rounded-full text-sm">Real-time Webhooks</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-bank-blue bg-opacity-10 rounded-lg">
              <Shield className="h-6 w-6 text-bank-blue" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Secure</h3>
          </div>
          <p className="text-gray-600">PCI DSS compliant with AES encryption for all sensitive data transactions.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-bank-gold bg-opacity-20 rounded-lg">
              <Zap className="h-6 w-6 text-bank-gold" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Fast</h3>
          </div>
          <p className="text-gray-600">Lightning-fast payment processing with real-time status updates.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-bank-blue bg-opacity-10 rounded-lg">
              <Globe className="h-6 w-6 text-bank-blue" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Flexible</h3>
          </div>
          <p className="text-gray-600">Multiple integration options for any platform or technology stack.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-bank-gold bg-opacity-20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-bank-gold" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900">Reliable</h3>
          </div>
          <p className="text-gray-600">99.9% uptime with comprehensive monitoring and support.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Integration Options</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Examples</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integration Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Custom Applications</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Backend APIs, Mobile Apps</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">API/SDK Integration</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Full control & customization</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">JavaScript-enabled</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">React, Vue, Angular</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NPM Package</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Modern web frameworks</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Static/HTML Sites</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PHP, HTML, Legacy sites</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CDN Script</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Quick implementation</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">WordPress Sites</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">WooCommerce stores</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">WordPress Plugin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No coding required</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">High-Level Integration Flow</h2>
        <p className="text-gray-600 mb-6">
          This diagram outlines the complete merchant journey from registration to live payment processing.
        </p>
        <MermaidDiagramSudo code={mermaidCode}/>
        <MermaidDiagram>{mermaidCode}</MermaidDiagram>
      </div>
    </section>
  );
};