import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home, FileText, Settings, Code, CreditCard, Shield, HelpCircle, Phone, Key, Package, Globe, WholeWord as Wordpress, Link2, TestTube, Bug } from 'lucide-react';

const navigationItems = [
  { 
    id: 'overview', 
    label: 'Overview', 
    icon: Home, 
    path: '/overview',
    description: 'Get started with FirstChekout'
  },
  { 
    id: 'prerequisites', 
    label: 'Prerequisites', 
    icon: Settings, 
    path: '/prerequisites',
    description: 'Requirements before integration'
  },
  { 
    id: 'registration', 
    label: 'Registration & Onboarding', 
    icon: FileText, 
    path: '/registration',
    description: 'Account setup and KYC process'
  },
  { 
    id: 'api-keys', 
    label: 'API Keys & Credentials', 
    icon: Key, 
    path: '/api-keys',
    description: 'Authentication and security keys'
  },
  {
    id: 'integration',
    label: 'Integration Guides',
    icon: Code,
    description: 'Multiple ways to integrate payments',
    children: [
      { 
        id: 'api-sdk', 
        label: 'API/SDK', 
        path: '/api-sdk',
        description: 'Custom development',
        icon: Code
      },
      { 
        id: 'npm-package', 
        label: 'NPM Package', 
        path: '/npm-package',
        description: 'JavaScript frameworks',
        icon: Package
      },
      { 
        id: 'cdn-script', 
        label: 'CDN Script', 
        path: '/cdn-script',
        description: 'Static websites',
        icon: Globe
      },
      { 
        id: 'wordpress', 
        label: 'WordPress', 
        path: '/wordpress',
        description: 'WooCommerce sites',
        icon: Wordpress
      },
      { 
        id: 'payment-links', 
        label: 'Payment Links', 
        path: '/payment-links',
        description: 'No-code solution',
        icon: Link2
      }
    ]
  },
  { 
    id: 'payment-methods', 
    label: 'Payment Methods', 
    icon: CreditCard, 
    path: '/payment-methods',
    description: 'Cards, USSD, transfers, and more'
  },
  { 
    id: 'testing', 
    label: 'Testing & Debugging', 
    icon: TestTube, 
    path: '/testing',
    description: 'Sandbox testing and troubleshooting'
  },
  { 
    id: 'security', 
    label: 'Security & Compliance', 
    icon: Shield, 
    path: '/security',
    description: 'PCI DSS, encryption, and best practices'
  },
  { 
    id: 'troubleshooting', 
    label: 'Troubleshooting', 
    icon: Bug, 
    path: '/troubleshooting',
    description: 'Common issues and solutions'
  },
  { 
    id: 'support', 
    label: 'Support & Resources', 
    icon: Phone, 
    path: '/support',
    description: 'Get help and additional resources'
  }
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['integration']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/overview' && location.pathname === '/');
  };

  const isChildActive = (children: any[]) => {
    return children.some(child => isActive(child.path));
  };

  const scrollToSection = (anchor: string) => {
    setTimeout(() => {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="hidden lg:flex lg:flex-shrink-0 lg:fixed lg:inset-y-0 lg:top-16 lg:z-40">
      <div className="flex flex-col w-72">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-4 space-y-1">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className={`w-full group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isChildActive(item.children)
                          ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-l-4 border-bank-blue'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                      </div>
                      <ChevronRight className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                        expandedItems.includes(item.id) ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {expandedItems.includes(item.id) && (
                      <div className="mt-2 ml-8 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            to={child.path}
                            className={`w-full group flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                              isActive(child.path)
                                ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-l-2 border-bank-gold'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                          >
                            <child.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                            <div className="text-left">
                              <div className="font-medium">{child.label}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{child.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => {
                      if (item.id === 'overview') {
                        scrollToSection('quick-start');
                      }
                    }}
                    className={`w-full group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-l-4 border-bank-blue'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <div className="mb-2">FirstChekout Documentation</div>
              <div className="text-bank-blue">v1.0.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};