import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, FileText, Settings, Code, CreditCard, Shield, HelpCircle, Phone } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: FileText, path: '/overview' },
  { id: 'prerequisites', label: 'Prerequisites', icon: Settings, path: '/prerequisites' },
  { id: 'registration', label: 'Registration & Onboarding', icon: FileText, path: '/registration' },
  { id: 'api-keys', label: 'API Keys & Credentials', icon: Settings, path: '/api-keys' },
  { id: 'api-sdk', label: 'API/SDK Integration', icon: Code, path: '/api-sdk' },
  { id: 'npm-package', label: 'NPM Package', icon: Code, path: '/npm-package' },
  { id: 'cdn-script', label: 'CDN Script', icon: Code, path: '/cdn-script' },
  { id: 'wordpress', label: 'WordPress Plugin', icon: Code, path: '/wordpress' },
  { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard, path: '/payment-methods' },
  { id: 'testing', label: 'Testing & Debugging', icon: Code, path: '/testing' },
  { id: 'security', label: 'Security & Compliance', icon: Shield, path: '/security' },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: HelpCircle, path: '/troubleshooting' },
  { id: 'support', label: 'Support & Resources', icon: Phone, path: '/support' }
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/overview' && location.pathname === '/');
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
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 px-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-bank-blue bg-opacity-10 text-bank-blue'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-4 h-6 w-6 flex-shrink-0" />
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