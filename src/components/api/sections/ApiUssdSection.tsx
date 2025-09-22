import React from 'react';
import { Smartphone, Building, CheckCircle } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiUssdSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');

  const getInstitutionsCode = {
    curl: `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/ussd/institutions' \\
--header 'Authorization: Bearer {access_token}'`,
    nodejs: `const axios = require('axios');

async function getFinancialInstitutions(accessToken) {
  const response = await axios.get('${API_CONFIG.gatewayBaseAddress}/api/v1/ussd/institutions', {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`
    }
  });
  
  return response.data;
}`,
    php: `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '${API_CONFIG.gatewayBaseAddress}/api/v1/ussd/institutions',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ' . $accessToken
  ),
));

$response = curl_exec($curl);
curl_close($curl);

$data = json_decode($response, true);
?>`,
    python: `import requests

def get_financial_institutions(access_token):
    url = "${API_CONFIG.gatewayBaseAddress}/api/v1/ussd/institutions"
    
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const initiateUssdCode = {
    curl: `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/ussd/initiate' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer {access_token}' \\
--data-raw '{
  "FinancialInstitutionId": "011",
  "AccessCode": "TXN_ACCESS_CODE_123",
  "PaymentReference": "FjWnMSUZajh1k224lXks39728874560476"
}'`,
    nodejs: `const axios = require('axios');

async function initiateUssdPayment(accessToken, accessCode, paymentReference, bankId) {
  const response = await axios.post('${API_CONFIG.gatewayBaseAddress}/api/v1/ussd/initiate', {
    FinancialInstitutionId: bankId,
    AccessCode: accessCode,
    PaymentReference: paymentReference
  }, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}`,
    php: `<?php
function initiateUssdPayment($accessToken, $accessCode, $paymentReference, $bankId) {
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => '${API_CONFIG.gatewayBaseAddress}/api/v1/ussd/initiate',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => json_encode([
        'FinancialInstitutionId' => $bankId,
        'AccessCode' => $accessCode,
        'PaymentReference' => $paymentReference
      ]),
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json'
      ),
    ));
    
    $response = curl_exec($curl);
    curl_close($curl);
    
    return json_decode($response, true);
}
?>`,
    python: `import requests

def initiate_ussd_payment(access_token, access_code, payment_reference, bank_id):
    url = "${API_CONFIG.gatewayBaseAddress}/api/v1/ussd/initiate"
    
    payload = {
        "FinancialInstitutionId": bank_id,
        "AccessCode": access_code,
        "PaymentReference": payment_reference
    }
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()`
  };

  const institutionsResponse = `{
  "status": true,
  "message": "Financial institutions retrieved successfully",
  "data": [
    {
      "id": "011",
      "name": "First Bank of Nigeria",
      "code": "011",
      "ussdCode": "*894*000*{amount}#"
    },
    {
      "id": "058",
      "name": "Guaranty Trust Bank",
      "code": "058", 
      "ussdCode": "*737*000*{amount}#"
    },
    {
      "id": "044",
      "name": "Access Bank",
      "code": "044",
      "ussdCode": "*901*000*{amount}#"
    }
  ]
}`;

  const ussdResponse = `{
  "status": true,
  "message": "USSD payment initiated successfully",
  "data": {
    "ussdCode": "*894*000*100#",
    "bankName": "First Bank of Nigeria",
    "amount": 100,
    "paymentReference": "FjWnMSUZajh1k224lXks39728874560476",
    "instructions": "Dial *894*000*100# on your phone to complete payment",
    "expiryTime": "2024-01-15T11:00:00Z"
  }
}`;

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">USSD Payments</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          USSD (Unstructured Supplementary Service Data) allows customers to make payments using their mobile phones 
          without internet connectivity. This is particularly popular in Nigeria for mobile banking.
        </p>
      </div>

      {/* Process Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">USSD Payment Process</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xs font-semibold text-blue-600">1</span>
            </div>
            <h4 className="text-xs font-semibold text-blue-900 mb-1">Get Banks</h4>
            <p className="text-xs text-blue-700">Fetch available financial institutions</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xs font-semibold text-blue-600">2</span>
            </div>
            <h4 className="text-xs font-semibold text-blue-900 mb-1">Initiate</h4>
            <p className="text-xs text-blue-700">Generate USSD code for selected bank</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xs font-semibold text-blue-600">3</span>
            </div>
            <h4 className="text-xs font-semibold text-blue-900 mb-1">Complete</h4>
            <p className="text-xs text-blue-700">Customer dials code to pay</p>
          </div>
        </div>
      </div>

      {/* Get Financial Institutions */}
      <div className="mb-8 api-section">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
            <Building className="h-3 w-3 text-emerald-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Get Financial Institutions</h2>
        </div>

        <div className="flex items-center mb-4">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded font-medium api-method-badge">GET</span>
          <span className="text-gray-600 font-mono text-xs api-url-path ml-2">/api/v1/ussd/institutions</span>
        </div>
        
        <p className="text-xs text-gray-700 mb-4 leading-relaxed">
          Retrieve the list of financial institutions that support USSD payments.
        </p>

        {/* Language Tabs */}
        <div className="mb-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4">
              {Object.keys(getInstitutionsCode).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`py-1.5 px-1 border-b-2 font-medium text-xs ${
                    activeLanguage === lang
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {lang === 'curl' ? 'cURL' : lang === 'nodejs' ? 'Node.js' : lang.toUpperCase()}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Request</h4>
            <CodeBlock language={activeLanguage} code={getInstitutionsCode[activeLanguage]} />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Sample Response</h4>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">200 OK</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded status-badge">Success</span>
              </div>
              <CodeBlock language="json" code={institutionsResponse} />
            </div>
          </div>
        </div>
      </div>

      {/* Initiate USSD Payment */}
      <div className="mb-8 api-section">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <Smartphone className="h-3 w-3 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Initiate USSD Payment</h2>
        </div>

        <div className="flex items-center mb-4">
          <span className="px-2 py-1 bg-green-600 text-white text-xs rounded font-medium api-method-badge">POST</span>
          <span className="text-gray-600 font-mono text-xs api-url-path ml-2">/api/v1/ussd/initiate</span>
        </div>
        
        <p className="text-xs text-gray-700 mb-4 leading-relaxed">
          Generate a USSD code for the selected financial institution. The customer will dial this code 
          on their phone to complete the payment.
        </p>

        {/* Language Tabs */}
        <div className="mb-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4">
              {Object.keys(initiateUssdCode).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`py-1.5 px-1 border-b-2 font-medium text-xs ${
                    activeLanguage === lang
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {lang === 'curl' ? 'cURL' : lang === 'nodejs' ? 'Node.js' : lang.toUpperCase()}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Request</h4>
            <CodeBlock language={activeLanguage} code={initiateUssdCode[activeLanguage]} />
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Body Parameters</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg api-parameter-table">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-2 text-xs font-medium text-gray-900">FinancialInstitutionId</td>
                      <td className="px-3 py-2 text-xs text-gray-500">string</td>
                      <td className="px-3 py-2 text-xs text-green-600">Yes</td>
                      <td className="px-3 py-2 text-xs text-gray-500">Bank code (e.g., "011" for First Bank)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs font-medium text-gray-900">AccessCode</td>
                      <td className="px-3 py-2 text-xs text-gray-500">string</td>
                      <td className="px-3 py-2 text-xs text-green-600">Yes</td>
                      <td className="px-3 py-2 text-xs text-gray-500">Access code from transaction initiation</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs font-medium text-gray-900">PaymentReference</td>
                      <td className="px-3 py-2 text-xs text-gray-500">string</td>
                      <td className="px-3 py-2 text-xs text-green-600">Yes</td>
                      <td className="px-3 py-2 text-xs text-gray-500">Unique payment reference</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Sample Response</h4>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">200 OK</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded status-badge">Success</span>
              </div>
              <CodeBlock language="json" code={ussdResponse} />
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <h5 className="text-xs font-semibold text-emerald-900 mb-2">Customer Instructions</h5>
              <ul className="text-xs text-emerald-800 space-y-1 leading-relaxed">
                <li>• Provide the USSD code to the customer</li>
                <li>• Customer dials the code on their mobile phone</li>
                <li>• Payment is completed through mobile banking</li>
                <li>• Transaction status updates automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Banks */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Supported Banks</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-white rounded p-2 border">
            <div className="text-xs font-medium text-gray-900">First Bank (011)</div>
            <div className="text-xs text-gray-500">*894*000*{'{amount}'}#</div>
          </div>
          <div className="bg-white rounded p-2 border">
            <div className="text-xs font-medium text-gray-900">GTBank (058)</div>
            <div className="text-xs text-gray-500">*737*000*{'{amount}'}#</div>
          </div>
          <div className="bg-white rounded p-2 border">
            <div className="text-xs font-medium text-gray-900">Access Bank (044)</div>
            <div className="text-xs text-gray-500">*901*000*{'{amount}'}#</div>
          </div>
          <div className="bg-white rounded p-2 border">
            <div className="text-xs font-medium text-gray-900">Zenith Bank (057)</div>
            <div className="text-xs text-gray-500">*966*000*{'{amount}'}#</div>
          </div>
          <div className="bg-white rounded p-2 border">
            <div className="text-xs font-medium text-gray-900">UBA (033)</div>
            <div className="text-xs text-gray-500">*919*000*{'{amount}'}#</div>
          </div>
          <div className="bg-white rounded p-2 border">
            <div className="text-xs font-medium text-gray-900">Ecobank (050)</div>
            <div className="text-xs text-gray-500">*326*000*{'{amount}'}#</div>
          </div>
        </div>
      </div>
    </div>
  );
};