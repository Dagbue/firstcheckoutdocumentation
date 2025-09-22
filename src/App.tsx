import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Import docs components
import { DocsHeader } from './components/docs/DocsHeader';
import { DocsSidebar } from './components/docs/DocsSidebar';
import { DocsMobileMenu } from './components/docs/DocsMobileMenu';

// Import API components
import { ApiHeader } from './components/api/ApiHeader';
import { ApiSidebar } from './components/api/ApiSidebar';
import { ApiMobileMenu } from './components/api/ApiMobileMenu';

// Import all docs page components
import { OverviewPage } from './pages/OverviewPage';
import { PrerequisitesPage } from './pages/PrerequisitesPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { ApiKeysPage } from './pages/ApiKeysPage';
import { NpmPackagePage } from './pages/NpmPackagePage';
import { CdnScriptPage } from './pages/CdnScriptPage';
import { WordPressPage } from './pages/WordPressPage';
import { PaymentLinksPage } from './pages/PaymentLinksPage';
import { PaymentMethodsPage } from './pages/PaymentMethodsPage';
import { TestingPage } from './pages/TestingPage';
import { SecurityPage } from './pages/SecurityPage';
import { TroubleshootingPage } from './pages/TroubleshootingPage';
import { SupportPage } from './pages/SupportPage';
import { FaqPage } from './pages/FaqPage';

// Import API pages
import { ApiIntroductionPage } from './pages/api/ApiIntroductionPage';
import { ApiAuthenticationPage } from './pages/api/ApiAuthenticationPage';
import { ApiTransactionsPage } from './pages/api/ApiTransactionsPage';
import { ApiErrorsPage } from './pages/api/ApiErrorsPage';
import { ApiPaginationPage } from './pages/api/ApiPaginationPage';
import { ApiUssdPage } from './pages/api/ApiUssdPage';
import { ApiCardPage } from './pages/api/ApiCardPage';
import { ApiTransferPage } from './pages/api/ApiTransferPage';
import { ApiWebhooksPage } from './pages/api/ApiWebhooksPage';
import { ApiCustomersPage } from './pages/api/ApiCustomersPage';
import { ApiVirtualAccountsPage } from './pages/api/ApiVirtualAccountsPage';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  
  // Determine if we're in API section based on URL
  const isDocsSection = location.pathname.startsWith('/docs');
  const isApiSection = !isDocsSection; // API is the default/main context

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      
      {/* Conditional Header */}
      {isApiSection ? (
        <ApiHeader onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      ) : (
        <DocsHeader onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      )}
      
      <div className="flex">
        {/* Conditional Sidebar */}
        {isApiSection ? <ApiSidebar /> : <DocsSidebar />}
        
        {/* Conditional Mobile Menu */}
        {isApiSection ? (
          <ApiMobileMenu 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)}
          />
        ) : (
          <DocsMobileMenu 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        <main className="flex-1 ml-0 lg:ml-72 relative z-0 overflow-y-auto focus:outline-none min-h-screen">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Routes>
                {/* API Routes */}
                <Route path="/" element={<ApiIntroductionPage />} />
                <Route path="/authentication" element={<ApiAuthenticationPage />} />
                <Route path="/transactions" element={<ApiTransactionsPage />} />
                <Route path="/ussd" element={<ApiUssdPage />} />
                <Route path="/card" element={<ApiCardPage />} />
                <Route path="/transfer" element={<ApiTransferPage />} />
                <Route path="/webhooks" element={<ApiWebhooksPage />} />
                <Route path="/customers" element={<ApiCustomersPage />} />
                <Route path="/virtual-accounts" element={<ApiVirtualAccountsPage />} />
                <Route path="/errors" element={<ApiErrorsPage />} />
                <Route path="/pagination" element={<ApiPaginationPage />} />
                
                {/* Docs Routes */}
                <Route path="/docs" element={<OverviewPage />} />
                <Route path="/docs/overview" element={<OverviewPage />} />
                <Route path="/docs/prerequisites" element={<PrerequisitesPage />} />
                <Route path="/docs/registration" element={<RegistrationPage />} />
                <Route path="/docs/api-keys" element={<ApiKeysPage />} />
                <Route path="/docs/npm-package" element={<NpmPackagePage />} />
                <Route path="/docs/cdn-script" element={<CdnScriptPage />} />
                <Route path="/docs/wordpress" element={<WordPressPage />} />
                <Route path="/docs/payment-links" element={<PaymentLinksPage />} />
                <Route path="/docs/payment-methods" element={<PaymentMethodsPage />} />
                <Route path="/docs/testing" element={<TestingPage />} />
                <Route path="/docs/security" element={<SecurityPage />} />
                <Route path="/docs/troubleshooting" element={<TroubleshootingPage />} />
                <Route path="/docs/faq" element={<FaqPage />} />
                <Route path="/docs/support" element={<SupportPage />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}