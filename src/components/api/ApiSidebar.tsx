import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Shield, FileText, AlertCircle, CreditCard, Users, Building, Smartphone, Layers, Webhook, Globe } from 'lucide-react';

const navigationItems = [
  { 
    id: 'introduction', 
    label: 'Introduction', 
    icon: Home, 
    path: '/introduction'
  },
  { 
    id: 'authentication', 
    label: 'Authentication', 
    icon: Shield, 
    path: '/authentication'
  },
  { 
    id: 'pagination', 
    label: 'Pagination', 
    icon: Layers, 
    path: '/pagination'
  },
  { 
    id: 'errors', 
    label: 'Errors', 
    icon: AlertCircle, 
    path: '/errors'
  }
];

const apiEndpoints = [
  { 
    id: 'transactions', 
    label: 'Transactions', 
    icon: CreditCard, 
    path: '/transactions',
    children: [
      { id: 'initialize-transaction', label: 'Initialize Transaction', path: '/transactions#initialize' },
      { id: 'verify-transaction', label: 'Verify Transaction', path: '/transactions#verify' },
      { id: 'list-transactions', label: 'List Transactions', path: '/transactions#list' },
      { id: 'fetch-transaction', label: 'Fetch Transaction', path: '/transactions#fetch' }
    ]
  },
  { 
    id: 'ussd', 
    label: 'USSD', 
    icon: Smartphone, 
    path: '/ussd',
    children: [
      { id: 'get-institutions', label: 'Get Financial Institutions', path: '/ussd#institutions' },
      { id: 'initiate-ussd', label: 'Initiate USSD Payment', path: '/ussd#initiate' }
    ]
  },
  { 
    id: 'card', 
    label: 'Card Payments', 
    icon: CreditCard, 
    path: '/card',
    children: [
      { id: 'initiate-card', label: 'Initiate Card Payment', path: '/card#initiate' },
      { id: 'verify-otp', label: 'Verify OTP', path: '/card#otp' }
    ]
  },
  { 
    id: 'transfer', 
    label: 'Bank Transfer', 
    icon: Building, 
    path: '/transfer',
    children: [
      { id: 'initiate-transfer', label: 'Initiate Transfer', path: '/transfer#initiate' },
      { id: 'query-transfer', label: 'Query Transfer Status', path: '/transfer#query' }
    ]
  },
  { 
    id: 'customers', 
    label: 'Customers', 
    icon: Users, 
    path: '/customers',
    children: [
      { id: 'create-customer', label: 'Create Customer', path: '/customers#create' },
      { id: 'fetch-customer', label: 'Fetch Customer', path: '/customers#fetch' },
      { id: 'list-customers', label: 'List Customers', path: '/customers#list' }
    ]
  },
  { 
    id: 'virtual-accounts', 
    label: 'Virtual Accounts', 
    icon: Building, 
    path: '/virtual-accounts',
    children: [
      { id: 'create-virtual-account', label: 'Create Virtual Account', path: '/virtual-accounts#create' },
      { id: 'list-virtual-accounts', label: 'List Virtual Accounts', path: '/virtual-accounts#list' }
    ]
  },
  { 
    id: 'webhooks', 
    label: 'Webhooks', 
    icon: Webhook, 
    path: '/webhooks',
    children: [
      { id: 'webhook-events', label: 'Webhook Events', path: '/webhooks#events' },
      { id: 'webhook-verification', label: 'Signature Verification', path: '/webhooks#verification' }
    ]
  }
];

export const ApiSidebar: React.FC = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['transactions']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/introduction' && location.pathname === '/');
  };

  const isChildActive = (children: any[]) => {
    return children?.some(child => location.pathname + location.hash === child.path);
  };

  return (
    <div className="hidden lg:flex lg:flex-shrink-0 lg:fixed lg:inset-y-0 lg:top-14 lg:z-40">
      <div className="flex flex-col w-64 api-sidebar">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-3 pb-4 overflow-y-auto">
          <nav className="mt-2 flex-1 px-3 space-y-0.5">
            {/* Basic sections */}
            <div className="sidebar-section">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <item.icon className="sidebar-icon" />
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* API Endpoints section */}
            <div className="pt-3">
              <h3 className="sidebar-section-title">
                API ENDPOINTS
              </h3>
              <div className="space-y-0.5">
                {apiEndpoints.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className={`w-full sidebar-item ${
                        isActive(item.path) || isChildActive(item.children)
                          ? 'active'
                          : ''
                      }`}
                    >
                      <item.icon className="sidebar-icon" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.children && (
                        <svg 
                          className={`w-3 h-3 transition-transform ${
                            expandedItems.includes(item.id) ? 'rotate-90' : ''
                          }`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    
                    {item.children && expandedItems.includes(item.id) && (
                      <div className="ml-8 space-y-0.5 mt-0.5">
                        {item.children.map((child) => (
                          <a
                            key={child.id}
                            href={child.path}
                            className={`block px-2 py-1 text-xs text-gray-600 hover:text-gray-900 rounded transition-colors ${
                              location.pathname + location.hash === child.path
                                ? 'text-blue-600 bg-blue-50'
                                : ''
                            }`}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};