import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, FileText, Settings, Code, CreditCard, Shield, Phone, Key, Package, Globe, WholeWord as Wordpress, Link2, TestTube, Bug, HelpCircle } from 'lucide-react';

interface DocsMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/docs' },
  { id: 'prerequisites', label: 'Prerequisites', icon: Settings, path: '/prerequisites' },
  { id: 'registration', label: 'Registration', icon: FileText, path: '/registration' },
  { id: 'api-keys', label: 'API Keys', icon: Key, path: '/api-keys' },
  { id: 'npm-package', label: 'NPM Package', icon: Package, path: '/npm-package' },
  { id: 'cdn-script', label: 'CDN Script', icon: Globe, path: '/cdn-script' },
  { id: 'wordpress', label: 'WordPress', icon: Wordpress, path: '/wordpress' },
  { id: 'payment-links', label: 'Payment Links', icon: Link2, path: '/payment-links' },
  { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard, path: '/payment-methods' },
  { id: 'testing', label: 'Testing', icon: TestTube, path: '/testing' },
  { id: 'security', label: 'Security', icon: Shield, path: '/security' },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: Bug, path: '/troubleshooting' },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, path: '/faq' },
  { id: 'support', label: 'Support', icon: Phone, path: '/support' }
];

export const DocsMobileMenu: React.FC<DocsMobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
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