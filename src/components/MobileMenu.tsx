import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, FileText, Settings, Code, CreditCard, Shield, Phone, Key, Package, Globe, WholeWord as Wordpress, Link2, TestTube, Bug } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: Home, path: '/overview', description: 'Get started with FirstChekout' },
  { id: 'prerequisites', label: 'Prerequisites', icon: Settings, path: '/prerequisites', description: 'Requirements before integration' },
  { id: 'registration', label: 'Registration & Onboarding', icon: FileText, path: '/registration', description: 'Account setup and KYC process' },
  { id: 'api-keys', label: 'API Keys & Credentials', icon: Key, path: '/api-keys', description: 'Authentication and security keys' },
  { id: 'api-sdk', label: 'API/SDK Integration', icon: Code, path: '/api-sdk', description: 'Direct API calls and custom development' },
  { id: 'npm-package', label: 'NPM Package', icon: Package, path: '/npm-package', description: 'JavaScript frameworks integration' },
  { id: 'cdn-script', label: 'CDN Script', icon: Globe, path: '/cdn-script', description: 'Static websites and legacy apps' },
  { id: 'wordpress', label: 'WordPress Plugin', icon: Wordpress, path: '/wordpress', description: 'WooCommerce and WordPress sites' },
  { id: 'payment-links', label: 'Payment Links (No-Code)', icon: Link2, path: '/payment-links', description: 'Create payment links without coding' },
  { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard, path: '/payment-methods', description: 'Cards, USSD, transfers, and more' },
  { id: 'testing', label: 'Testing & Debugging', icon: TestTube, path: '/testing', description: 'Sandbox testing and troubleshooting' },
  { id: 'security', label: 'Security & Compliance', icon: Shield, path: '/security', description: 'PCI DSS, encryption, and best practices' },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: Bug, path: '/troubleshooting', description: 'Common issues and solutions' },
  { id: 'support', label: 'Support & Resources', icon: Phone, path: '/support', description: 'Get help and additional resources' }
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
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto mt-11">
            <nav className="mt-5 px-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`w-full group flex items-start px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-bank-blue bg-opacity-10 text-bank-blue border-l-4 border-bank-blue'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};