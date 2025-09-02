import React from 'react';
import {Mail, MessageCircle, ExternalLink, Book } from 'lucide-react';

export const SupportSection: React.FC = () => {
  const openResource = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const supportChannels = [
    {
      icon: Mail,
      title: "Email Support",
      description: "General inquiries and non-urgent technical support",
      contact: "firstcontactcomplaints@firstbankgroup.com",
      responseTime: "Within 24 hours",
      availability: "Monday - Friday, 9 AM - 5 PM WAT"
    },
    // {
    //   icon: Phone,
    //   title: "Phone Support",
    //   description: "Urgent technical issues and account problems",
    //   contact: "+234 (0) 1 234 5678",
    //   responseTime: "Immediate",
    //   availability: "Monday - Friday, 8 AM - 6 PM WAT"
    // },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Quick questions and real-time assistance",
      contact: "Available in merchant portal",
      responseTime: "Within 15 minutes",
      availability: "Monday - Friday, 9 AM - 5 PM WAT"
    }
  ];

  const resources = [
    {
      title: "API Reference",
      description: "Complete API documentation with examples",
      url: "https://documenter.getpostman.com/view/30508792/2sB3BLi6vb",
      icon: Book
    },
    {
      title: "Merchant Portal",
      description: "Access your dashboard, keys, and settings",
      url: "https://www.firstchekout.com/",
      icon: ExternalLink
    },
    // {
    //   title: "Developer Community",
    //   description: "Connect with other developers using FirstChekout",
    //   url: "https://community.firstchekout.ng",
    //   icon: Users
    // },
    // {
    //   title: "Status Page",
    //   description: "Real-time system status and incident updates",
    //   url: "https://status.firstchekout.ng",
    //   icon: ExternalLink
    // }
  ];

  // const emergencyContacts = [
  //   {
  //     type: "Security Incidents",
  //     contact: "security@firstchekout.ng",
  //     phone: "+234 (0) 1 234 5678 ext. 911",
  //     description: "Report security vulnerabilities or suspected breaches"
  //   },
  //   {
  //     type: "Critical System Issues",
  //     contact: "ops@firstchekout.ng",
  //     phone: "+234 (0) 1 234 5678 ext. 999",
  //     description: "Production system failures affecting multiple merchants"
  //   },
  //   {
  //     type: "Account Suspension",
  //     contact: "accounts@firstchekout.ng",
  //     phone: "+234 (0) 1 234 5678 ext. 100",
  //     description: "Urgent account access and suspension issues"
  //   }
  // ];

  return (
      <section id="support" className="mb-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Support & Resources</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our dedicated support team is here to help you succeed with FirstChekout. Whether you need technical
            assistance, have integration questions, or require urgent help, we provide multiple channels to get you
            the support you need.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Support Channels</h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {supportChannels.map((channel, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <channel.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="ml-3 text-lg font-semibold text-gray-900">{channel.title}</h4>
                      </div>

                      <p className="text-gray-600 mb-4">{channel.description}</p>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-gray-900">Contact: </span>
                          {channel.contact.includes('@') ? (
                              <a href={`mailto:${channel.contact}`} className="text-blue-600 hover:text-blue-700">
                                {channel.contact}
                              </a>
                          ) : channel.contact.includes('+') ? (
                              <a href={`tel:${channel.contact}`} className="text-blue-600 hover:text-blue-700">
                                {channel.contact}
                              </a>
                          ) : (
                              <span className="text-gray-600">{channel.contact}</span>
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Response: </span>
                          <span className="text-emerald-600">{channel.responseTime}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Available: </span>
                          <span className="text-gray-600">{channel.availability}</span>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Additional Resources</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {resources.map((resource, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center mb-3">
                        <resource.icon className="h-6 w-6 text-emerald-600 mr-3" />
                        <h4 className="text-lg font-semibold text-gray-900">{resource.title}</h4>
                      </div>

                      <p className="text-gray-600 mb-4">{resource.description}</p>

                      <button
                          onClick={() => openResource(resource.url)}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium focus:outline-none"
                      >
                        Visit Resource
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                ))}
              </div>
            </div>

            {/*<div>*/}
            {/*  <h3 className="text-xl font-semibold text-gray-900 mb-6">Emergency Contacts</h3>*/}

            {/*  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">*/}
            {/*    <div className="flex items-center mb-4">*/}
            {/*      <Phone className="h-6 w-6 text-red-600 mr-3" />*/}
            {/*      <h4 className="text-lg font-semibold text-red-900">24/7 Emergency Hotline</h4>*/}
            {/*    </div>*/}
            {/*    <p className="text-red-800 mb-4">*/}
            {/*      For critical issues that affect your ability to process payments, call our emergency hotline:*/}
            {/*    </p>*/}
            {/*    <a*/}
            {/*        href="tel:+2341234567890"*/}
            {/*        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"*/}
            {/*    >*/}
            {/*      <Phone className="mr-2 h-4 w-4" />*/}
            {/*      +234 (0) 1 234 5678*/}
            {/*    </a>*/}
            {/*  </div>*/}

            {/*  <div className="space-y-4">*/}
            {/*    {emergencyContacts.map((contact, index) => (*/}
            {/*        <div key={index} className="border border-gray-200 rounded-lg p-4">*/}
            {/*          <div className="flex items-start justify-between mb-2">*/}
            {/*            <h4 className="font-semibold text-gray-900">{contact.type}</h4>*/}
            {/*            <div className="flex space-x-3">*/}
            {/*              <a*/}
            {/*                  href={`mailto:${contact.contact}`}*/}
            {/*                  className="text-blue-600 hover:text-blue-700 text-sm"*/}
            {/*              >*/}
            {/*                {contact.contact}*/}
            {/*              </a>*/}
            {/*              <a*/}
            {/*                  href={`tel:${contact.phone}`}*/}
            {/*                  className="text-blue-600 hover:text-blue-700 text-sm"*/}
            {/*              >*/}
            {/*                {contact.phone}*/}
            {/*              </a>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*          <p className="text-gray-600 text-sm">{contact.description}</p>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">SLA & Service Commitments</h3>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">Service Level Agreements</h4>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-3">System Availability</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• 99.9% uptime guarantee</li>
                      <li>• Planned maintenance windows: Sundays 2-4 AM WAT</li>
                      <li>• Real-time status updates on status page</li>
                      <li>• Automatic failover for critical services</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-blue-900 mb-3">Response Times</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Critical issues: 1 hour</li>
                      <li>• High priority: 4 hours</li>
                      <li>• Medium priority: 24 hours</li>
                      <li>• Low priority: 72 hours</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600">System Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">&lt; 1hr</div>
                  <div className="text-sm text-gray-600">Critical Issue Response</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Emergency Support</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Training & Onboarding</h3>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-emerald-900 mb-4">Free Integration Support</h4>
                <p className="text-emerald-800 mb-4">
                  Our technical team provides free integration support for new merchants. We offer:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-emerald-900 mb-2">What We Provide</h5>
                    <ul className="text-sm text-emerald-800 space-y-1">
                      <li>• One-on-one technical consultation</li>
                      <li>• Integration code review</li>
                      <li>• Testing assistance</li>
                      <li>• Go-live support</li>
                      <li>• Performance optimization tips</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-emerald-900 mb-2">How to Request</h5>
                    <ul className="text-sm text-emerald-800 space-y-1">
                      <li>• Email firstcontactcomplaints@firstbankgroup.com</li>
                      <li>• Include your merchant ID</li>
                      <li>• Specify your integration method</li>
                      <li>• Describe your use case</li>
                      <li>• We'll schedule a call within 24 hours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/*<div className="bg-gray-50 rounded-lg p-6">*/}
            {/*  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information Summary</h3>*/}

            {/*  <div className="grid md:grid-cols-2 gap-6 text-sm">*/}
            {/*    <div>*/}
            {/*      <h4 className="font-semibold text-gray-900 mb-3">General Support</h4>*/}
            {/*      <div className="space-y-2">*/}
            {/*        <div>📧 <a href="mailto:support@firstchekout.ng" className="text-blue-600">support@firstchekout.ng</a></div>*/}
            {/*        <div>📞 <a href="tel:+2341234567890" className="text-blue-600">+234 (0) 1 234 5678</a></div>*/}
            {/*        <div>🏢 First Bank of Nigeria Limited</div>*/}
            {/*        <div>📍 Lagos, Nigeria</div>*/}
            {/*      </div>*/}
            {/*    </div>*/}

            {/*    <div>*/}
            {/*      <h4 className="font-semibold text-gray-900 mb-3">Specialized Teams</h4>*/}
            {/*      <div className="space-y-2">*/}
            {/*        <div>🔒 Security: <a href="mailto:security@firstchekout.ng" className="text-blue-600">security@firstchekout.ng</a></div>*/}
            {/*        <div>🛠️ Integration: <a href="mailto:integration@firstchekout.ng" className="text-blue-600">integration@firstchekout.ng</a></div>*/}
            {/*        <div>💼 Business: <a href="mailto:business@firstchekout.ng" className="text-blue-600">business@firstchekout.ng</a></div>*/}
            {/*        <div>⚙️ Operations: <a href="mailto:ops@firstchekout.ng" className="text-blue-600">ops@firstchekout.ng</a></div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </section>
  );
};