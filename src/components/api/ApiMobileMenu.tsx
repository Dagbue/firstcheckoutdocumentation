import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Shield, FileText, AlertCircle, CreditCard, Users, Building, Smartphone, Layers } from 'lucide-react';

interface ApiMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { id: 'introduction', label: 'Introduction', icon: Home, path: '/' },
  { id: 'authentication', label: 'Authentication', icon: Shield, path: '/authentication' },
  { id: 'pagination', label: 'Pagination', icon: Layers, path: '/pagination' },
  { id: 'errors', label: 'Errors', icon: AlertCircle, path: '/errors' },
  { id: 'transactions', label: 'Transactions', icon: CreditCard, path: '/transactions' },
  { id: 'transfer', label: 'Pay With Transfer', icon: Building, path: '/transfer' },
  { id: 'ussd', label: 'USSD', icon: Smartphone, path: '/ussd' },
  { id: 'payattitude', label: 'PAYATTITUDE', icon: Smartphone, path: '/payattitude' },
  { id: 'bnpl', label: 'BNPL', icon: CreditCard, path: '/bnpl' }
];

export const ApiMobileMenu: React.FC<ApiMobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/' && location.pathname === '/');
  };

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 flex z-40">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              onClick={onClose}
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto mt-11">
            <nav className="mt-5 px-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};