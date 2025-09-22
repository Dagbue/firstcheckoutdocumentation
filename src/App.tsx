import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DocsHeader } from './components/docs/DocsHeader';
import { DocsSidebar } from './components/docs/DocsSidebar';
import { DocsMobileMenu } from './components/docs/DocsMobileMenu';
import { ApiHeader } from './components/api/ApiHeader';
import { ApiSidebar } from './components/api/ApiSidebar';
import { ApiMobileMenu } from './components/api/ApiMobileMenu';

// Import all page components
import { OverviewPage } from './pages/OverviewPage';
import { PrerequisitesPage } from './pages/PrerequisitesPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { ApiKeysPage } from './pages/ApiKeysPage';
import { ApiSdkPage } from './pages/ApiSdkPage';
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


// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isApiSection, setIsApiSection] = React.useState(false);

  // Determine if we're in API section based on URL
  const location = useLocation();
  React.useEffect(() => {
    setIsApiSection(location.pathname.startsWith('/api'));
  }, [location.pathname]);

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
          
          <main className="flex-1 ml-0 lg:ml-64 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-4">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                <Routes>
                  {/* Docs Routes */}
                  <Route path="/" element={<OverviewPage />} />
                  <Route path="/overview" element={<OverviewPage />} />
                  <Route path="/prerequisites" element={<PrerequisitesPage />} />
                  <Route path="/registration" element={<RegistrationPage />} />
                  <Route path="/api-keys" element={<ApiKeysPage />} />
                  <Route path="/npm-package" element={<NpmPackagePage />} />
                  <Route path="/cdn-script" element={<CdnScriptPage />} />
                  <Route path="/wordpress" element={<WordPressPage />} />
                  <Route path="/payment-links" element={<PaymentLinksPage />} />
                  <Route path="/payment-methods" element={<PaymentMethodsPage />} />
                  <Route path="/testing" element={<TestingPage />} />
                  <Route path="/security" element={<SecurityPage />} />
                  <Route path="/troubleshooting" element={<TroubleshootingPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/faq" element={<FaqPage />} />
                  
                  {/* API Routes */}
                  <Route path="/api" element={<ApiIntroductionPage />} />
                  <Route path="/api/introduction" element={<ApiIntroductionPage />} />
                  <Route path="/api/authentication" element={<ApiAuthenticationPage />} />
                  <Route path="/api/transactions" element={<ApiTransactionsPage />} />
                  <Route path="/api/errors" element={<ApiErrorsPage />} />
                  <Route path="/api/pagination" element={<ApiPaginationPage />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
}
