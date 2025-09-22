import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home, FileText, Settings, Code, CreditCard, Shield, Phone, Key, Package, Globe, WholeWord as Wordpress, Link2, TestTube, Bug, HelpCircle } from 'lucide-react';

const navigationItems = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: Home, 
    path: '/docs'
  },
  { 
    id: 'prerequisites', 
    label: 'Prerequisites', 
    icon: Settings, 
    path: '/prerequisites'
  },
  { 
    id: 'registration', 
    label: 'Registration', 
    icon: FileText, 
    path: '/registration'
  },
  { 
    id: 'api-keys', 
    label: 'API Keys', 
    icon: Key, 
    path: '/api-keys'
  },
  {
    id: 'integration',
    label: 'Integration Guides',
    icon: Code,
    children: [
      { 
        id: 'npm-package', 
        label: 'NPM Package', 
        path: '/npm-package',
        icon: Package
      },
      { 
        id: 'cdn-script', 
        label: 'CDN Script', 
        path: '/cdn-script',
        icon: Globe
      },
      { 
        id: 'wordpress', 
        label: 'WordPress', 
        path: '/wordpress',
        icon: Wordpress
      },
      { 
        id: 'payment-links', 
        label: 'Payment Links', 
        path: '/payment-links',
        icon: Link2
      }
    ]
  },
  { 
    id: 'payment-methods', 
    label: 'Payment Methods', 
    icon: CreditCard, 
    path: '/payment-methods'
  },
  { 
    id: 'testing', 
    label: 'Testing', 
    icon: TestTube, 
    path: '/testing'
  },
  { 
    id: 'security', 
    label: 'Security', 
    icon: Shield, 
    path: '/security'
  },
  { 
    id: 'troubleshooting', 
    label: 'Troubleshooting', 
    icon: Bug, 
    path: '/troubleshooting'
  },
  { 
    id: 'faq', 
    label: 'FAQ', 
    icon: HelpCircle, 
    path: '/faq'
  },
  { 
    id: 'support', 
    label: 'Support', 
    icon: Phone, 
    path: '/support'
  }
];

export const DocsSidebar: React.FC = () => {
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
    return location.pathname === path;
  };

  const isChildActive = (children: any[]) => {
    return children.some(child => isActive(child.path));
  };

  return (
    <div className="hidden lg:flex lg:flex-shrink-0 lg:fixed lg:inset-y-0 lg:top-14 lg:z-40">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-3 pb-4 overflow-y-auto">
          <nav className="mt-2 flex-1 px-3 space-y-0.5">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className={`w-full group flex items-center px-2 py-1.5 text-xs font-medium rounded-md transition-colors sidebar-nav-item ${
                        isChildActive(item.children)
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="mr-2 h-3 w-3 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronRight className={`ml-2 h-3 w-3 transition-transform ${
                        expandedItems.includes(item.id) ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {expandedItems.includes(item.id) && (
                      <div className="mt-0.5 ml-5 space-y-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            to={child.path}
                            className={`group flex items-center px-2 py-1 text-xs rounded-md transition-colors sidebar-nav-subitem ${
                              isActive(child.path)
                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <child.icon className="mr-2 h-3 w-3 flex-shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`group flex items-center px-2 py-1.5 text-xs font-medium rounded-md transition-colors sidebar-nav-item ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-bank-gold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-2 h-3 w-3 flex-shrink-0" />
                    {item.label}
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