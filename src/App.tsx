import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { ApiLayout } from './components/layout/ApiLayout';
import { DocsLayout } from './components/layout/DocsLayout';
import { AppRoutes } from './routes';

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
import { ApiQrPage } from './pages/api/ApiQrPage';
import { ApiPayattitudePage } from './pages/api/ApiPayattitudePage';
import { ApiBnplPage } from './pages/api/ApiBnplPage';
import { ApiMerchantPage } from './pages/api/ApiMerchantPage';

export default function App() {
  return (
    <Router basename="/onlinedoc">
      <ScrollToTop />
      <Routes>
        {/* API Routes (Main Context) - Use ApiLayout */}
        <Route path="/" element={<ApiLayout />}>
          <Route index element={<ApiIntroductionPage />} />
          <Route path="authentication" element={<ApiAuthenticationPage />} />
          <Route path="transactions" element={<ApiTransactionsPage />} />
          <Route path="ussd" element={<ApiUssdPage />} />
          <Route path="card" element={<ApiCardPage />} />
          <Route path="qr" element={<ApiQrPage />} />
          <Route path="payattitude" element={<ApiPayattitudePage />} />
          <Route path="bnpl" element={<ApiBnplPage />} />
          <Route path="merchant" element={<ApiMerchantPage />} />
          <Route path="transfer" element={<ApiTransferPage />} />
          <Route path="errors" element={<ApiErrorsPage />} />
          <Route path="pagination" element={<ApiPaginationPage />} />
        </Route>
        
        {/* Docs Routes (Secondary Context) - Use DocsLayout */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="prerequisites" element={<PrerequisitesPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="api-keys" element={<ApiKeysPage />} />
          <Route path="npm-package" element={<NpmPackagePage />} />
          <Route path="cdn-script" element={<CdnScriptPage />} />
          <Route path="wordpress" element={<WordPressPage />} />
          <Route path="payment-links" element={<PaymentLinksPage />} />
          <Route path="payment-methods" element={<PaymentMethodsPage />} />
          <Route path="testing" element={<TestingPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="troubleshooting" element={<TroubleshootingPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="support" element={<SupportPage />} />
        </Route>
      </Routes>
    </Router>
  );
}