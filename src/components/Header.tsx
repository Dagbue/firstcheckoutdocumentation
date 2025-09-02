import React from 'react';
import { Menu, Search } from 'lucide-react';
import {Logo} from "../assets";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                  onClick={onMenuToggle}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-bank-blue"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="flex items-center ml-2 lg:ml-0">
                <img
                    src={Logo}
                    alt="FirstCheckout Logo"
                    className="h-8 w-auto"
                />
              </div>
            </div>

            <div className="flex items-center space-x-5">
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search documentation..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-bank-blue focus:border-bank-blue sm:text-sm"
                />
              </div>

              <a
                  href="https://www.firstchekout.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:block inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-bank-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bank-blue transition-colors"
              >
                Merchant Portal
                {/*<ExternalLink className="ml-2 h-4 w-4"/>*/}
              </a>
            </div>
          </div>
        </div>
      </header>
  );
};