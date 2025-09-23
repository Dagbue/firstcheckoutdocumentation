import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Shield, AlertCircle, CreditCard, Users, Building, Smartphone, Layers,
  QrCode } from 'lucide-react';

const navigationItems = [
  {
    id: 'introduction',
    label: 'Introduction',
    icon: Home,
    path: '/'
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
      { id: 'initialize-transaction', label: 'Initialize Transaction', path: '/onlinedoc/transactions#initialize' },
      { id: 'query-transaction', label: 'Query Transaction', path: '/onlinedoc/transactions#query' }
    ]
  },
  {
    id: 'ussd',
    label: 'USSD',
    icon: Smartphone,
    path: '/ussd',
    children: [
      { id: 'query-ussd', label: 'Query USSD Payment Endpoint', path: '/onlinedoc/ussd#query' },
      { id: 'initiate-ussd', label: 'Initiate USSD Payment', path: '/onlinedoc/ussd#initiate' },
      { id: 'fetch-institutions', label: 'Fetch USSD Institution', path: '/onlinedoc/ussd#institutions' }
    ]
  },
  {
    id: 'card',
    label: 'Card Payments',
    icon: CreditCard,
    path: '/card',
    children: [
      { id: 'initiate-card', label: 'Initiate Card Payment', path: '/onlinedoc/card#initiate' },
      { id: 'complete-card', label: 'Complete (Master/Verve) Card Payment', path: '/onlinedoc/card#complete' }
    ]
  },
  {
    id: 'qr',
    label: 'QR Payments',
    icon: QrCode,
    path: '/qr',
    children: [
      { id: 'initiate-qr', label: 'Initiate QR Payment', path: '/onlinedoc/qr#initiate' }
    ]
  },
  {
    id: 'payattitude',
    label: 'PAYATTITUDE',
    icon: Smartphone,
    path: '/payattitude',
    children: [
      { id: 'initiate-payattitude', label: 'Initiate Pay With Phone Number', path: '/onlinedoc/payattitude#initiate' }
    ]
  },
  {
    id: 'bnpl',
    label: 'BNPL',
    icon: CreditCard,
    path: '/bnpl',
    children: [
      { id: 'initiate-bnpl', label: 'Initiate', path: '/onlinedoc/bnpl#initiate' },
      { id: 'validate-otp', label: 'Validate OTP', path: '/onlinedoc/bnpl#validate-otp' },
      { id: 'validate', label: 'Validate', path: '/onlinedoc/bnpl#validate' },
      { id: 'validate-token', label: 'Validate Token (Prod)', path: '/onlinedoc/bnpl#validate-token' },
      { id: 'update-offer', label: 'Update Offer', path: '/onlinedoc/bnpl#update-offer' },
      { id: 'book', label: 'Book', path: '/onlinedoc/bnpl#book' }
    ]
  },
  {
    id: 'transfer',
    label: 'Pay With Transfer',
    icon: Building,
    path: '/transfer',
    children: [
      { id: 'initiate-transfer', label: 'Initiate Pay with Transfer', path: '/onlinedoc/transfer#initiate' },
      { id: 'confirm-transfer', label: 'Confirm Paywith Transfer Payment', path: '/onlinedoc/transfer#confirm' }
    ]
  },
  {
    id: 'merchant',
    label: 'Merchant',
    icon: Users,
    path: '/merchant',
    children: [
      { id: 'merchant-name-enquiry', label: 'Merchant Name Enquiry', path: '/onlinedoc/merchant#enquiry' },
      { id: 'access-token', label: 'AccessToken Endpoint V2', path: '/onlinedoc/merchant#access-token' }
    ]
  },
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
    return location.pathname === path || (path === '/' && location.pathname === '/');
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
                        className={`group flex items-center px-2 py-1.5 text-l font-medium rounded-md transition-colors hover:text-blue-900 hover:bg-blue-50 ${
                            isActive(item.path)
                                ? 'bg-blue-50 text-blue-900 border-r-2 border-bank-gold'
                                : 'text-gray-700'
                        }`}
                    >
                      <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
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
                            className={`group flex items-center px-2 py-1.5 text-l font-medium rounded-md transition-colors hover:text-blue-900 hover:bg-blue-50 w-full ${
                                isActive(item.path) || isChildActive(item.children)
                                    ? 'bg-blue-50 text-blue-900 border-r-2 border-bank-gold'
                                    : 'text-gray-700'
                            }`}
                        >
                          <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
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
                                      className={`block px-2 py-1 text-xs text-gray-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors ${
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