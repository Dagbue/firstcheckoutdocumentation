import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Shield, FileText, AlertCircle, CreditCard, Users, Building, Smartphone, Layers, Webhook, Globe } from 'lucide-react';

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
    path: '/api/transactions'
  },
  { 
    id: 'ussd', 
    label: 'USSD', 
    icon: Smartphone, 
    path: '/api/ussd'
  },
  { 
    id: 'card', 
    label: 'Card Payments', 
    icon: CreditCard, 
    path: '/api/card'
  },
  { 
    id: 'transfer', 
    label: 'Bank Transfer', 
    icon: Building, 
    path: '/api/transfer'
  },
  { 
    id: 'webhooks', 
    label: 'Webhooks', 
    icon: Webhook, 
    path: '/api/webhooks'
  }
];

export const ApiSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/api/introduction' && location.pathname === '/api');
  };

  return (
    <div className="hidden lg:flex lg:flex-shrink-0 lg:fixed lg:inset-y-0 lg:top-14 lg:z-40">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-3 pb-4 overflow-y-auto">
          <nav className="mt-2 flex-1 px-3 space-y-0.5">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`group flex items-center px-2 py-1.5 text-xs font-medium rounded-md transition-colors sidebar-nav-item ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-2 h-3 w-3 flex-shrink-0" />
                {item.label}
              </Link>
            ))}
            
            <div className="pt-3">
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                API ENDPOINTS
              </h3>
              <div className="space-y-0.5">
                {apiEndpoints.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`group flex items-center px-2 py-1.5 text-xs font-medium rounded-md transition-colors sidebar-nav-item ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-2 h-3 w-3 flex-shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};