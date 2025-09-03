import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, FileText, Settings, Code, CreditCard, Shield, HelpCircle, Phone } from 'lucide-react';

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: FileText, path: '/overview' },
  { id: 'prerequisites', label: 'Prerequisites', icon: Settings, path: '/prerequisites' },
  { id: 'registration', label: 'Registration & Onboarding', icon: FileText, path: '/registration' },
  { id: 'api-keys', label: 'API Keys & Credentials', icon: Settings, path: '/api-keys' },
  {
    id: 'integration',
    label: 'Integration Guides',
    icon: Code,
    children: [
      { id: 'api-sdk', label: 'API/SDK Integration', path: '/api-sdk' },
      { id: 'npm-package', label: 'NPM Package', path: '/npm-package' },
      { id: 'cdn-script', label: 'CDN Script', path: '/cdn-script' },
      { id: 'wordpress', label: 'WordPress Plugin', path: '/wordpress' },
      { id: 'payment-links', label: 'Payment Links (No-Code)', path: '/payment-links' }
    ]
  },
  { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard, path: '/payment-methods' },
  { id: 'testing', label: 'Testing & Debugging', icon: Code, path: '/testing' },
  { id: 'security', label: 'Security & Compliance', icon: Shield, path: '/security' },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: HelpCircle, path: '/troubleshooting' },
  { id: 'support', label: 'Support & Resources', icon: Phone, path: '/support' }
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
                      className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isChildActive(item.children)
                          ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-r-2 border-bank-gold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronRight className={`ml-2 h-4 w-4 transition-transform ${
                        expandedItems.includes(item.id) ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {expandedItems.includes(item.id) && (
                      <div className="mt-1 ml-8 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            to={child.path}
                            className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                              isActive(child.path)
                                ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-r-2 border-bank-gold'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            }`}
                          >
                            <span className="text-left">{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-r-2 border-bank-gold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};