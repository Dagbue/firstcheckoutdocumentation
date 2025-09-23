import React from 'react';
import { Menu, Search, Command } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from "../../assets";
import { SearchModal } from '../SearchModal';

interface DocsHeaderProps {
  onMenuToggle: () => void;
}

export const DocsHeader: React.FC<DocsHeaderProps> = ({ onMenuToggle }) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 header-height">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bank-blue"
              >
                <Menu className="h-4 w-4" />
              </button>

              <div className="flex items-center ml-2 lg:ml-0">
                <img
                  src={Logo}
                  alt="FirstCheckout Logo"
                  className="h-6 w-auto mr-2"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-3 w-3 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search documentation..."
                  className="block w-80 pl-8 pr-10 py-1.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-bank-blue focus:border-bank-blue text-xs header-search"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Command className="h-2.5 w-2.5" />
                    <span className="text-xs">K</span>
                  </div>
                </div>
              </form>

              {/* Mobile search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-blue"
              >
                <Search className="h-4 w-4" />
              </button>

              <div className="flex items-center space-x-2">
                <Link
                  to="/"
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                >
                  API
                </Link>
                <Link
                  to="/docs"
                  className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => {
          setIsSearchOpen(false);
          setSearchQuery('');
        }}
        initialQuery={searchQuery}
      />
    </>
  );
};