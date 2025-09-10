import React from 'react';
// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import Sidebar from './components/Sidebar';
import { MobileMenu } from './components/MobileMenu';

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

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}
function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <Router basename="/onlinedoc">
      <div className="min-h-screen bg-gray-50">
        <ScrollToTop />
        <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        
        <div className="flex">
          <Sidebar />
          
          <MobileMenu 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)}
          />
          
          <main className="flex-1 ml-0 lg:ml-72 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Routes>
                  <Route path="/" element={<OverviewPage />} />
                  <Route path="/overview" element={<OverviewPage />} />
                  <Route path="/prerequisites" element={<PrerequisitesPage />} />
                  <Route path="/registration" element={<RegistrationPage />} />
                  <Route path="/api-keys" element={<ApiKeysPage />} />
                  <Route path="/api-sdk" element={<ApiSdkPage />} />
                  <Route path="/npm-package" element={<NpmPackagePage />} />
                  <Route path="/cdn-script" element={<CdnScriptPage />} />
                  <Route path="/wordpress" element={<WordPressPage />} />
                  <Route path="/payment-links" element={<PaymentLinksPage />} />
                  <Route path="/payment-methods" element={<PaymentMethodsPage />} />
                  <Route path="/testing" element={<TestingPage />} />
                  <Route path="/security" element={<SecurityPage />} />
                  <Route path="/troubleshooting" element={<TroubleshootingPage />} />
                  <Route path="/support" element={<SupportPage />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;