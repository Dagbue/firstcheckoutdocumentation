import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import API pages
import { ApiIntroductionPage } from '../pages/api/ApiIntroductionPage';
import { ApiAuthenticationPage } from '../pages/api/ApiAuthenticationPage';
import { ApiTransactionsPage } from '../pages/api/ApiTransactionsPage';
import { ApiErrorsPage } from '../pages/api/ApiErrorsPage';
import { ApiPaginationPage } from '../pages/api/ApiPaginationPage';
import { ApiUssdPage } from '../pages/api/ApiUssdPage';
import { ApiCardPage } from '../pages/api/ApiCardPage';
import { ApiTransferPage } from '../pages/api/ApiTransferPage';
import { ApiQrPage } from '../pages/api/ApiQrPage';
import { ApiPayattitudePage } from '../pages/api/ApiPayattitudePage';
import { ApiBnplPage } from '../pages/api/ApiBnplPage';
import { ApiMerchantPage } from '../pages/api/ApiMerchantPage';

// Import Docs pages
import { OverviewPage } from '../pages/OverviewPage';
import { PrerequisitesPage } from '../pages/PrerequisitesPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ApiKeysPage } from '../pages/ApiKeysPage';
import { NpmPackagePage } from '../pages/NpmPackagePage';
import { CdnScriptPage } from '../pages/CdnScriptPage';
import { WordPressPage } from '../pages/WordPressPage';
import { PaymentLinksPage } from '../pages/PaymentLinksPage';
import { PaymentMethodsPage } from '../pages/PaymentMethodsPage';
import { TestingPage } from '../pages/TestingPage';
import { SecurityPage } from '../pages/SecurityPage';
import { TroubleshootingPage } from '../pages/TroubleshootingPage';
import { SupportPage } from '../pages/SupportPage';
import { FaqPage } from '../pages/FaqPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* API Routes (Main Context) */}
      <Route path="/" element={<ApiIntroductionPage />} />
      <Route path="/authentication" element={<ApiAuthenticationPage />} />
      <Route path="/transactions" element={<ApiTransactionsPage />} />
      <Route path="/ussd" element={<ApiUssdPage />} />
      <Route path="/card" element={<ApiCardPage />} />
      <Route path="/qr" element={<ApiQrPage />} />
      <Route path="/payattitude" element={<ApiPayattitudePage />} />
      <Route path="/bnpl" element={<ApiBnplPage />} />
      <Route path="/merchant" element={<ApiMerchantPage />} />
      <Route path="/transfer" element={<ApiTransferPage />} />
      <Route path="/errors" element={<ApiErrorsPage />} />
      <Route path="/pagination" element={<ApiPaginationPage />} />
      
      {/* Docs Routes (Secondary Context) */}
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
  );
};