import React from 'react';
import { Outlet } from 'react-router-dom';
import { ApiHeader } from '../api/ApiHeader';
import { ApiSidebar } from '../api/ApiSidebar';
import { ApiMobileMenu } from '../api/ApiMobileMenu';

export const ApiLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      <ApiHeader onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
      <div className="flex">
        <ApiSidebar />
        
        <ApiMobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)}
        />
        
        <main className="flex-1 ml-0 lg:ml-64 relative z-0 overflow-y-auto focus:outline-none min-h-screen">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};