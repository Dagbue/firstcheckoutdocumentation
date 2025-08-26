import React from 'react';
import { UserPlus, FileCheck, Clock, CheckCircle, AlertTriangle, Shield, CreditCard, Building, Mail, Upload,
  // Download
} from 'lucide-react';
import { MermaidDiagramSudo } from '../MermaidDiagramSudo.tsx';
import {MermaidDiagram} from "@lightenna/react-mermaid-diagram";
import registrationImage from '../../assets/registrationImage.png';

export const RegistrationSection: React.FC = () => {
  const registrationFlow = `
sequenceDiagram
    participant M as Merchant
    participant P as Portal
    participant A as Admin
    participant B as Bank System
    M->>P: Visit Portal & Sign Up
    P-->>M: Email Verification
    M->>P: Verify Email & Login
    M->>P: Complete Profile
    P->>B: Validate Bank Account
    B-->>P: Account Verification
    M->>P: Add Business Details
    M->>P: Upload KYC Documents
    P->>A: Submit for Review
    A->>A: Review Application
    A->>A: Verify Documents
    A-->>M: Receive Approval Email
    M->>P: Access Dashboard
    Note over M,P: Ready for Integration
  `;

  const onboardingSteps = [
    {
      number: 1,
      title: "Account Creation",
      description: "Start your FirstCheckout journey by creating your merchant account",
      details: [
        `Visit the <a href="https://www.firstchekout.com/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">FirstCheckout</a> merchant portal`,
        "Click 'Sign Up' to begin registration",
        "Enter your personal information (First Name, Last Name)",
        "Provide a valid business email address",
        "Create a strong password (minimum 8 characters)",
        "Confirm your password",
        "Complete the CAPTCHA verification"
      ],
      duration: "2-3 minutes",
      icon: UserPlus,
      color: "blue"
    },
    {
      number: 2,
      title: "Email Verification",
      description: "Verify your email address to activate your account",
      details: [
        "Check your email inbox for verification message",
        "Click the verification link in the email",
        "If not received, check spam/junk folder",
        "Request new verification email if needed",
        "Email verification expires in 24 hours"
      ],
      duration: "1-2 minutes",
      icon: Mail,
      color: "emerald"
    },
    {
      number: 3,
      title: "Profile Completion",
      description: "Complete your merchant profile with business information",
      details: [
        "Login to your verified account",
        "Navigate to Settings",
        "Enter business name, description and so on",
        "Add business address and contact details",
        "Set your business website URL",
      ],
      duration: "5-7 minutes",
      icon: Building,
      color: "purple"
    },
    {
      number: 4,
      title: "Bank Account Setup",
      description: "Link your First Bank account for payment settlements",
      details: [
        "Navigate to Bank Account section",
        "Enter your First Bank account number",
        "Provide account holder name (must match business name)",
        "System validates account with First Bank",
        "Account verification may take 1-2 business days"
      ],
      duration: "3-5 minutes",
      icon: CreditCard,
      color: "amber"
    },
    {
      number: 5,
      title: "KYC Document Upload",
      description: "Upload required documents for identity and business verification",
      details: [
        "Prepare required documents (see document checklist)",
        "Scan or photograph documents clearly",
        "Upload Certificate of Incorporation (CAC)",
        "Upload valid government-issued ID",
        "Upload utility bill (not older than 3 months)",
        "Upload business permit/license if applicable",
        "Ensure all documents are clear and readable"
      ],
      duration: "10-15 minutes",
      icon: Upload,
      color: "red"
    },
    {
      number: 6,
      title: "Application Review",
      description: "First Bank admin team reviews your application",
      details: [
        "Application submitted for review",
        "Admin team verifies all documents",
        "Bank account validation completed",
        "Business information cross-checked",
        "Compliance checks performed",
        "Review typically takes 1-3 business days"
      ],
      duration: "1-3 business days",
      icon: FileCheck,
      color: "blue"
    },
    {
      number: 7,
      title: "Approval & API Keys",
      description: "Receive approval notification and access your API credentials",
      details: [
        "Approval email sent to registered address",
        "Login to merchant dashboard",
        "Access API Keys section",
        "Download sandbox keys for testing",
        "Live keys available after final verification",
        "Set up webhook URLs for notifications"
      ],
      duration: "Immediate after approval",
      icon: CheckCircle,
      color: "emerald"
    }
  ];

  const requiredDocuments = [
    {
      title: "Certificate of Incorporation (CAC)",
      description: "Official business registration certificate",
      requirements: [
        "Clear, colored scan or photo",
        "All text must be readable",
        "Document must be current and valid",
        "File size: Maximum 5MB",
        "Formats: PDF, JPG, PNG"
      ],
      mandatory: true
    },
    {
      title: "Government-Issued ID",
      description: "Valid identification document",
      requirements: [
        "National ID, Driver's License, or International Passport",
        "Must belong to business owner/authorized signatory",
        "Document must not be expired",
        "Clear photo showing all details",
        "Both front and back (if applicable)"
      ],
      mandatory: true
    },
    {
      title: "Utility Bill",
      description: "Proof of business address",
      requirements: [
        "Not older than 3 months",
        "Must show business address",
        "Electricity, water, or gas bill",
        "Bank statement acceptable as alternative",
        "Address must match business registration"
      ],
      mandatory: true
    },
    {
      title: "Business License/Permit",
      description: "Industry-specific permits (if applicable)",
      requirements: [
        "Valid for current business activities",
        "Issued by relevant regulatory body",
        "Must not be expired",
        "Required for regulated industries only"
      ],
      mandatory: false
    }
  ];

  const commonIssues = [
    {
      issue: "Email verification not received",
      solutions: [
        "Check spam/junk folder",
        "Ensure email address is correct",
        "Request new verification email",
        "Contact support if issue persists"
      ]
    },
    {
      issue: "Bank account validation failed",
      solutions: [
        "Ensure account number is correct",
        "Verify account holder name matches business name",
        "Account must be active and in good standing",
        "Only First Bank accounts are accepted"
      ]
    },
    {
      issue: "Document upload failed",
      solutions: [
        "Check file size (maximum 5MB)",
        "Use supported formats (PDF, JPG, PNG)",
        "Ensure document is clear and readable",
        "Try uploading one document at a time"
      ]
    },
    {
      issue: "Application rejected",
      solutions: [
        "Review rejection email for specific reasons",
        "Correct identified issues",
        "Re-upload improved documents",
        "Contact support for clarification"
      ]
    }
  ];

  return (
      <section id="registration" className="mb-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Merchant Registration & Onboarding</h2>
            <p className="text-lg text-gray-600 max-w-3xl text-left">
              Welcome to FirstCheckout! Follow our comprehensive step-by-step guide to create and activate your merchant account.
              Our streamlined onboarding process ensures you're ready to accept payments quickly and securely.
            </p>
          </div>

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white mb-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Welcome onboard FirstCheckout</h3>
                <p className="text-blue-100 mb-4">
                  Enhance your payment experience with FirstCheckout, the seamless payment solution that enables
                  you to offer your customers convenient and stress-free transactions.
                </p>
                <div className="flex items-center space-x-4">
                  <span className="bg-bank-gold bg-opacity-20 px-3 py-1 rounded-full text-sm">Secure</span>
                  <span className="bg-bank-gold bg-opacity-20 px-3 py-1 rounded-full text-sm">Fast Setup</span>
                  <span className="bg-bank-gold bg-opacity-20 px-3 py-1 rounded-full text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-blue-900">Onboarding Timeline</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-blue-900">Account Setup</div>
                <div className="text-blue-700">5-10 minutes</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-900">Document Upload</div>
                <div className="text-blue-700">10-15 minutes</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-900">Review Process</div>
                <div className="text-blue-700">1-3 Business Days</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-900">Go Live</div>
                <div className="text-blue-700">Immediate</div>
              </div>
            </div>
          </div>

          {/* Sign Up Form Preview */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Registration Form Preview</h3>
            <div>
              <img
                  src={registrationImage}
                  alt="FirstCheckout Registration Form"
              />
            </div>

            <div className="mt-6 text-center">
              <a
                  href="https://www.firstchekout.com/auth/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-bank-blue text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Start Registration Now
              </a>
            </div>
          </div>

          {/* Detailed Step-by-Step Process */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Onboarding Process</h3>
            <div className="space-y-8">
              {onboardingSteps.map((step) => (
                  <div key={step.number} className="relative">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className={`flex items-center justify-center w-12 h-12 bg-${step.color}-100 text-${step.color}-600 rounded-full font-semibold text-lg`}>
                          {step.number}
                        </div>
                      </div>
                      <div className="ml-6 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                            <step.icon className="h-5 w-5 mr-2" />
                            {step.title}
                          </h4>
                          <span className={`px-3 py-1 bg-${step.color}-100 text-${step.color}-800 text-sm rounded-full`}>
                        {step.duration}
                      </span>
                        </div>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Step Details:</h5>
                          <ul className="space-y-1">
                            {step.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start text-sm text-gray-600">
                                  <span className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                                  <span dangerouslySetInnerHTML={{ __html: detail }} />
                                </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {step.number < onboardingSteps.length && (
                        <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-300"></div>
                    )}
                  </div>
              ))}
            </div>
          </div>

          {/* Registration Flow Diagram */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Registration Flow Diagram</h3>
            <p className="text-gray-600 mb-6">
              This sequence diagram shows the complete registration and approval process with all stakeholders.
            </p>
            <MermaidDiagramSudo code={registrationFlow} />
            <MermaidDiagram>{registrationFlow}</MermaidDiagram>
          </div>

          {/* Required Documents Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">KYC Document Requirements</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {requiredDocuments.map((doc, index) => (
                  <div key={index} className={`border rounded-lg p-6 ${doc.mandatory ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-semibold ${doc.mandatory ? 'text-red-900' : 'text-blue-900'}`}>
                        {doc.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${doc.mandatory ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'}`}>
                    {doc.mandatory ? 'Required' : 'Optional'}
                  </span>
                    </div>
                    <p className={`text-sm mb-4 ${doc.mandatory ? 'text-red-800' : 'text-blue-800'}`}>
                      {doc.description}
                    </p>
                    <div>
                      <h5 className={`font-semibold text-sm mb-2 ${doc.mandatory ? 'text-red-900' : 'text-blue-900'}`}>
                        Requirements:
                      </h5>
                      <ul className="space-y-1">
                        {doc.requirements.map((req, idx) => (
                            <li key={idx} className={`flex items-start text-xs ${doc.mandatory ? 'text-red-700' : 'text-blue-700'}`}>
                              <span className="flex-shrink-0 w-1.5 h-1.5 bg-current rounded-full mt-1.5 mr-2"></span>
                              <span>{req}</span>
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              ))}
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Upload className="h-5 w-5 text-amber-600 mr-2" />
                <h4 className="font-semibold text-amber-900">Document Upload Tips</h4>
              </div>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Ensure documents are clear, well-lit, and all text is readable</li>
                <li>• Use high-resolution scans or photos (minimum 300 DPI)</li>
                <li>• Save files in supported formats: PDF, JPG, PNG</li>
                <li>• Keep file sizes under 5MB for faster upload</li>
                <li>• Upload documents one at a time to avoid errors</li>
                <li>• Double-check that all required information is visible</li>
              </ul>
            </div>
          </div>

          {/* Common Issues and Solutions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Common Issues & Solutions</h3>
            <div className="space-y-4">
              {commonIssues.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {item.issue}
                    </h4>
                    <div className="bg-emerald-50 border-l-4 border-emerald-400 p-3">
                      <h5 className="font-semibold text-emerald-900 mb-2">Solutions:</h5>
                      <ul className="space-y-1">
                        {item.solutions.map((solution, idx) => (
                            <li key={idx} className="flex items-start text-sm text-emerald-800">
                              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{solution}</span>
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Security and Compliance */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Security & Compliance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-green-600 mr-3" />
                  <h4 className="text-lg font-semibold text-green-900">Data Protection</h4>
                </div>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• All data encrypted in transit and at rest</li>
                  <li>• PCI DSS Level 1 compliant infrastructure</li>
                  <li>• Regular security audits and penetration testing</li>
                  <li>• GDPR and NDPR compliant data handling</li>
                  <li>• Secure document storage with access controls</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FileCheck className="h-6 w-6 text-blue-600 mr-3" />
                  <h4 className="text-lg font-semibold text-blue-900">Compliance Standards</h4>
                </div>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• CBN (Central Bank of Nigeria) regulations</li>
                  <li>• Anti-Money Laundering (AML) compliance</li>
                  <li>• Know Your Customer (KYC) requirements</li>
                  <li>• International payment processing standards</li>
                  <li>• Regular compliance monitoring and reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Success State */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-emerald-600 mr-3" />
              <h3 className="text-lg font-semibold text-emerald-900">After Successful Onboarding</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-emerald-900 mb-3">What You'll Receive:</h4>
                <ul className="space-y-2 text-emerald-800 text-sm">
                  <li>• Welcome email with account confirmation</li>
                  <li>• API credentials (Client ID and Client Secret)</li>
                  <li>• Access to merchant dashboard</li>
                  <li>• Sandbox environment for testing</li>
                  <li>• Integration documentation and guides</li>
                  <li>• Dedicated support contact information</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-emerald-900 mb-3">Next Steps:</h4>
                <ul className="space-y-2 text-emerald-800 text-sm">
                  <li>• Set up webhook URLs for notifications</li>
                  <li>• Test integration in sandbox environment</li>
                  <li>• Configure payment methods and settings</li>
                  <li>• Request live keys when ready for production</li>
                  <li>• Schedule go-live support session</li>
                  <li>• Begin accepting live payments</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                  href="https://www.firstchekout.com/auth/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Start Your Registration
              </a>
              {/*<button className="inline-flex items-center px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">*/}
              {/*  <Download className="mr-2 h-5 w-5" />*/}
              {/*  Download Checklist*/}
              {/*</button>*/}
            </div>
          </div>
        </div>
      </section>
  );
};