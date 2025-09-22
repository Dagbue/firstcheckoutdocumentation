import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export const PrerequisitesSection: React.FC = () => {
  // const openMerchantPortal = () => {
  //   window.open('https://www.firstchekout.com/', '_blank', 'noopener,noreferrer');
  // };

  return (
      <section id="prerequisites" className="docs-section">
        <div className="bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Prerequisites</h2>
          <p className="text-lg text-gray-600 mb-6">
            Before integrating FirstChekout, ensure you meet the following requirements based on your chosen integration method.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-bank-blue mr-2" />
                General Requirements
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-bank-blue mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">An active First Bank account (required for settlements)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-bank-blue mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Valid KYC documents (CAC certificate, ID, utility bill)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-bank-blue mr-2 mt-0.5 flex-shrink-0"/>
                  {/*  <span className="text-gray-700">*/}
                  {/*  Access to the merchant portal at{' '}*/}
                  {/*    <button*/}
                  {/*        onClick={openMerchantPortal}*/}
                  {/*        className="text-blue-600 hover:text-blue-700 underline focus:outline-none"*/}
                  {/*    >*/}
                  {/*    https://www.firstchekout.com*/}
                  {/*  </button>*/}
                  {/*</span>*/}
                  <span className="text-gray-700">Access to the merchant portal at
                    <a
                      href="https://www.firstchekout.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bank-blue hover:text-bank-blue/80 underline">https://www.firstchekout.com</a>
                  </span>

                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-bank-blue mr-2 mt-0.5 flex-shrink-0"/>
                  <span className="text-gray-700">A valid email address for account notifications</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-bank-gold mr-2" />
                Important Notes
              </h3>
              <div className="bg-yellow-50 border border-bank-gold rounded-lg p-4">
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>• Account approval typically takes 1-3 business days</li>
                  <li>• Ensure your First Bank account is active and in good standing</li>
                  <li>• Have your business registration documents ready</li>
                  <li>• Test integrations in sandbox before going live</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Requirements by Integration Method</h3>

              <div className="grid gap-6">
                <div className="bg-blue-50 border border-bank-blue rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-bank-blue mb-3">API/SDK Integration</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Any programming language with HTTP client support</li>
                    <li>• Understanding of REST APIs and JSON</li>
                    <li>• Knowledge of AES encryption (samples provided in C# and Go)</li>
                    <li>• Ability to handle webhooks for payment notifications</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-bank-gold rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-bank-gold mb-3">NPM Package</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Node.js v14+ installed</li>
                    <li>• npm or yarn package manager</li>
                    <li>• JavaScript/TypeScript knowledge</li>
                    <li>• Modern web framework (React, Vue, Angular, etc.)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-bank-blue rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-bank-blue mb-3">CDN Script</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Basic HTML and JavaScript knowledge</li>
                    <li>• Web server to host your pages</li>
                    <li>• No framework dependencies required</li>
                    <li>• Ability to handle JavaScript callbacks</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-bank-gold rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-bank-gold mb-3">WordPress Plugin</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• WordPress 5.5 or higher</li>
                    <li>• PHP 7.2 or higher</li>
                    <li>• WooCommerce plugin (optional, for e-commerce features)</li>
                    <li>• WordPress admin access for plugin installation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};