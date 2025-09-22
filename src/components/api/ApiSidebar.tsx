import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Shield, FileText, AlertCircle, CreditCard, Users, Building, Smartphone, Layers, Webhook, Globe, Code, ChevronRight } from 'lucide-react';

const navigationItems = [
  { 
    id: 'introduction', 
    label: 'Introduction', 
    icon: Home, 
    path: '/api/introduction'
  },
  { 
    id: 'authentication', 
    label: 'Authentication', 
    icon: Shield, 
    path: '/api/authentication'
  },
  { 
    id: 'pagination', 
    label: 'Pagination', 
    icon: Layers, 
    path: '/api/pagination'
  },
  { 
    id: 'errors', 
    label: 'Errors', 
    icon: AlertCircle, 
    path: '/api/errors'
  }
];

const apiEndpoints = [
  { 
    id: 'transactions', 
    label: 'Transactions', 
    icon: CreditCard, 
    path: '/api/transactions',
    children: [
      { id: 'initialize-transaction', label: 'Initialize Transaction', path: '/api/transactions#initialize' },
      { id: 'verify-transaction', label: 'Verify Transaction', path: '/api/transactions#verify' },
      { id: 'list-transactions', label: 'List Transactions', path: '/api/transactions#list' },
      { id: 'fetch-transaction', label: 'Fetch Transaction', path: '/api/transactions#fetch' }
    ]
  },
  { 
    id: 'ussd', 
    label: 'USSD', 
    icon: Smartphone, 
    path: '/api/ussd',
    children: [
      { id: 'get-institutions', label: 'Get Financial Institutions', path: '/api/ussd#institutions' },
      { id: 'initiate-ussd', label: 'Initiate USSD Payment', path: '/api/ussd#initiate' }
    ]
  },
  { 
    id: 'card', 
    label: 'Card Payments', 
    icon: CreditCard, 
    path: '/api/card',
    children: [
      { id: 'initiate-card', label: 'Initiate Card Payment', path: '/api/card#initiate' },
      { id: 'verify-otp', label: 'Verify OTP', path: '/api/card#otp' }
    ]
  },
  { 
    id: 'transfer', 
    label: 'Bank Transfer', 
    icon: Building, 
    path: '/api/transfer',
    children: [
      { id: 'initiate-transfer', label: 'Initiate Transfer', path: '/api/transfer#initiate' },
      { id: 'query-transfer', label: 'Query Transfer Status', path: '/api/transfer#query' }
    ]
  },
  { 
    id: 'customers', 
    label: 'Customers', 
    icon: Users, 
    path: '/api/customers',
    children: [
      { id: 'create-customer', label: 'Create Customer', path: '/api/customers#create' },
      { id: 'fetch-customer', label: 'Fetch Customer', path: '/api/customers#fetch' },
      { id: 'list-customers', label: 'List Customers', path: '/api/customers#list' }
    ]
  },
  { 
    id: 'virtual-accounts', 
    label: 'Virtual Accounts', 
    icon: Building, 
    path: '/api/virtual-accounts',
    children: [
      { id: 'create-virtual-account', label: 'Create Virtual Account', path: '/api/virtual-accounts#create' },
      { id: 'list-virtual-accounts', label: 'List Virtual Accounts', path: '/api/virtual-accounts#list' }
    ]
  },
  { 
    id: 'webhooks', 
    label: 'Webhooks', 
    icon: Webhook, 
    path: '/api/webhooks',
    children: [
      { id: 'webhook-events', label: 'Webhook Events', path: '/api/webhooks#events' },
      { id: 'webhook-verification', label: 'Signature Verification', path: '/api/webhooks#verification' }
    ]
  }
];

export const ApiSidebar: React.FC = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['endpoints']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/api/introduction' && location.pathname === '/api');
  };

  const isChildActive = (children: any[]) => {
    return children?.some(child => location.pathname + location.hash === child.path);
  };

  return (
    <div className="hidden lg:flex lg:flex-shrink-0 lg:fixed lg:inset-y-0 lg:top-14 lg:z-40">
      <div className="flex flex-col w-72">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-4 space-y-1">
            {/* Basic sections */}
            <div>
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-r-3 border-bank-gold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-sm lg:text-base">{item.label}</div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* API Endpoints section */}
            <div>
              <button
                onClick={() => toggleExpanded('endpoints')}
                className={`w-full group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  expandedItems.includes('endpoints')
                    ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-r-3 border-bank-gold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Code className="mr-3 h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <div className="font-semibold text-sm lg:text-base">API Endpoints</div>
                  <div className="text-xs text-gray-500 mt-0.5 hidden lg:block">Payment processing endpoints</div>
                </div>
                <ChevronRight className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                  expandedItems.includes('endpoints') ? 'rotate-90' : ''
                }`} />
              </button>
              
              {expandedItems.includes('endpoints') && (
                <div className="mt-2 ml-8 space-y-1">
                  {apiEndpoints.map((item) => (
                    <div key={item.id}>
                      <Link
                        to={item.path}
                        className={`w-full group flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          isActive(item.path) || isChildActive(item.children)
                            ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-l-2 border-bank-gold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                        }`}
                      >
                        <item.icon className="mr-3 h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                        <div className="text-left">
                          <div className="font-medium text-xs lg:text-sm">{item.label}</div>
                        </div>
                      </Link>
                      
                      {item.children && (
                        <div className="ml-6 space-y-0.5 mt-1">
                          {item.children.map((child) => (
                            <a
                              key={child.id}
                              href={child.path}
                              className={`block px-2 py-1 text-xs rounded transition-colors ${
                                location.pathname + location.hash === child.path
                                  ? 'text-bank-blue bg-blue-50'
                                  : 'text-gray-600 hover:text-gray-900'
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
              )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};