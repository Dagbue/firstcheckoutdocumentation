import React from 'react';
import { Outlet } from 'react-router-dom';
import { DocsHeader } from '../docs/DocsHeader';
import { DocsSidebar } from '../docs/DocsSidebar';
import { DocsMobileMenu } from '../docs/DocsMobileMenu';

export const DocsLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      <DocsHeader onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
      <div className="flex">
        <DocsSidebar />
        
        <DocsMobileMenu 
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