import React from 'react';
import { Layers, ChevronLeft, ChevronRight, Copy, Check, ExternalLink } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';
import { API_CONFIG } from '../../../config/apiConfig';

export const ApiPaginationSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('curl');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const paginationRequestCode = {
    curl: `curl --location '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions?page=2&perPage=50' \\
--header 'Authorization: Bearer {access_token}'`,
    nodejs: `const axios = require('axios');

async function getTransactions(accessToken, page = 1, perPage = 50) {
  const response = await axios.get('${API_CONFIG.gatewayBaseAddress}/api/v1/transactions', {
    params: { page, perPage },
    headers: {
      'Authorization': \`Bearer \${accessToken}\`
    }
  });
  
  return response.data;
}

// Usage
const transactions = await getTransactions(token, 2, 50);
console.log('Total transactions:', transactions.meta.total);
console.log('Current page:', transactions.meta.page);`,
    php: `<?php
function getTransactions($accessToken, $page = 1, $perPage = 50) {
    $url = '${API_CONFIG.gatewayBaseAddress}/api/v1/transactions?' . http_build_query([
        'page' => $page,
        'perPage' => $perPage
    ]);
    
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer ' . $accessToken
        ),
    ));
    
    $response = curl_exec($curl);
    curl_close($curl);
    
    return json_decode($response, true);
}

// Usage
$transactions = getTransactions($token, 2, 50);
echo "Total: " . $transactions['meta']['total'];
?>`,
    python: `import requests

def get_transactions(access_token, page=1, per_page=50):
    """Fetch paginated transactions"""
    url = "${API_CONFIG.gatewayBaseAddress}/api/v1/transactions"
    
    params = {
        'page': page,
        'perPage': per_page
    }
    
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    response = requests.get(url, params=params, headers=headers)
    response.raise_for_status()
    
    return response.json()

# Usage
transactions = get_transactions(token, page=2, per_page=50)
print(f"Total: {transactions['meta']['total']}")
print(f"Page: {transactions['meta']['page']}")`
  };

  const paginationResponse = `{
  "status": true,
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "id": 123456,
      "paymentReference": "FjWnMSUZajh1k224lXks39728874560476",
      "amount": 100,
      "currency": "NGN",
      "status": "successful",
      "payerEmail": "thomas.edison@outlook.com",
      "payerName": "Thomas Edison",
      "purpose": "UAT",
      "paymentMethod": "card",
      "transactionDate": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 150,
    "perPage": 50,
    "page": 2,
    "pageCount": 3,
    "skipped": 50
  }
}`;

  const metaStructure = `{
  "meta": {
    "total": 2,
    "skipped": 0,
    "perPage": 50,
    "page": 1,
    "pageCount": 1
  }
}`;

  return (
    <div className="max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pagination</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          Learn how to navigate through large datasets using pagination. All list endpoints support 
          pagination to help you efficiently retrieve and display data.
        </p>
      </div>

      {/* Pagination Basics */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pagination Basics</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              All list endpoints support pagination. By default, we return 10 items per page, 
              but you can specify up to 100 items per page using the <code className="bg-gray-100 px-2 py-1 rounded text-sm">perPage</code> parameter.
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Layers className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="text-sm font-semibold text-blue-900">How Pagination Works</h4>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Use query parameters to control which page of results you receive and how many 
                  items are returned per page. The response includes metadata about the pagination state.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <ChevronRight className="h-5 w-5 text-emerald-600 mr-2" />
                  <h4 className="text-sm font-semibold text-emerald-900">Default Values</h4>
                </div>
                <ul className="text-sm text-emerald-800 space-y-1">
                  <li>• <strong>page:</strong> 1 (first page)</li>
                  <li>• <strong>perPage:</strong> 10 (items per page)</li>
                  <li>• <strong>maximum perPage:</strong> 100 items</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Parameters</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">page</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">integer</span>
                </div>
                <p className="text-sm text-gray-600">Page number to retrieve (starts from 1)</p>
                <code className="text-xs text-blue-600 mt-1 block">Default: 1</code>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">perPage</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">integer</span>
                </div>
                <p className="text-sm text-gray-600">Number of items per page (max: 100)</p>
                <code className="text-xs text-blue-600 mt-1 block">Default: 10</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Request */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sample Request</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Here's how to make a paginated request to retrieve the second page of transactions 
              with 50 items per page. The response will include both the data and pagination metadata.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">Request Parameters</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span className="font-medium">page:</span>
                  <span>2</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">perPage:</span>
                  <span>50</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Expected results:</span>
                  <span>Items 51-100</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="language-tabs">
              {Object.keys(paginationRequestCode).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`language-tab ${activeLanguage === lang ? 'active' : ''}`}
                >
                  {lang === 'curl' ? 'cURL' : lang === 'nodejs' ? 'Node.js' : lang.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="paystack-code-block">
              <div className="paystack-code-header">
                <span className="text-sm font-medium">Paginated Request</span>
                <button
                  onClick={() => copyToClipboard(paginationRequestCode[activeLanguage], 'pagination-request')}
                  className="copy-button"
                >
                  {copiedCode === 'pagination-request' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <pre><code>{paginationRequestCode[activeLanguage]}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Structure */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Response Structure</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Paginated responses include both the requested data and a <code className="bg-gray-100 px-2 py-1 rounded text-sm">meta</code> object 
              containing pagination information. This metadata helps you build navigation controls and understand the dataset size.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Keys</h3>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">data</span>
                    <div className="text-xs text-gray-500 mt-1">array</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Array containing the requested page of results. The number of items 
                      depends on the <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">perPage</code> parameter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">meta</span>
                    <div className="text-xs text-gray-500 mt-1">object</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Contains pagination metadata including total count, current page, 
                      and navigation information for building pagination controls.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="paystack-code-block">
              <div className="paystack-code-header">
                <span className="text-sm font-medium">Sample Response</span>
                <button
                  onClick={() => copyToClipboard(paginationResponse, 'pagination-response')}
                  className="copy-button"
                >
                  {copiedCode === 'pagination-response' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="paystack-code-content">
                <CodeBlock language="json" code={paginationResponse} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Object */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Meta Object</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The meta key is used to provide context for the contents of the data 
              key. For instance, if a list of transactions performed by a customer is 
              being retrieved, pagination parameters can be passed along to limit 
              the result set. The meta key will then contain an object with the 
              following attributes:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Keys</h3>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20">
                    <span className="text-sm font-semibold text-gray-900">total</span>
                    <div className="text-xs text-gray-500 mt-1">number</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This is the total number of transactions that were 
                      performed by the customer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20">
                    <span className="text-sm font-semibold text-gray-900">skipped</span>
                    <div className="text-xs text-gray-500 mt-1">number</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This is the number of records skipped before the first 
                      record in the array returned.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20">
                    <span className="text-sm font-semibold text-gray-900">perPage</span>
                    <div className="text-xs text-gray-500 mt-1">number</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This is the maximum number of records that will be 
                      returned per request. This can be modified by 
                      passing a new value as a <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">perPage</code> query parameter. 
                      <strong>Default: 10</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20">
                    <span className="text-sm font-semibold text-gray-900">page</span>
                    <div className="text-xs text-gray-500 mt-1">number</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This is the current page being returned. This is 
                      dependent on what page was requested using the{' '}
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">page</code> query parameter. <strong>Default: 1</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-20">
                    <span className="text-sm font-semibold text-gray-900">pageCount</span>
                    <div className="text-xs text-gray-500 mt-1">number</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This is how many pages in total are available for 
                      retrieval considering the maximum records per page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="paystack-code-block">
              <div className="paystack-code-header">
                <span className="text-sm font-medium">Meta Key Structure</span>
              </div>
              <div className="paystack-code-content">
                <CodeBlock language="json" code={metaStructure} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Building Pagination Controls</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Use the meta object to build navigation controls for your users. Here's an example 
              of how pagination controls might look and function in your application.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-emerald-900 mb-3">Pagination Logic</h4>
              <ul className="text-sm text-emerald-800 space-y-2">
                <li>• <strong>Previous:</strong> Enabled when page &gt; 1</li>
                <li>• <strong>Next:</strong> Enabled when page &lt; pageCount</li>
                <li>• <strong>Page Info:</strong> Show current page and total</li>
                <li>• <strong>Results Info:</strong> Display range of items shown</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-lg p-6 border">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Example Pagination Controls</h4>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </button>
                  <div className="flex items-center space-x-1">
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">1</button>
                    <span className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">2</span>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">3</button>
                  </div>
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                Showing 51-100 of 150 results
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Examples */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Implementation Examples</h2>
        
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Scenario</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Parameters</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Results</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Use Case</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Default</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">page=1&perPage=10</td>
                <td className="px-6 py-4 text-sm text-gray-700">First 10 items</td>
                <td className="px-6 py-4 text-sm text-gray-700">Initial page load</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Large Page</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">page=1&perPage=100</td>
                <td className="px-6 py-4 text-sm text-gray-700">First 100 items</td>
                <td className="px-6 py-4 text-sm text-gray-700">Data export, bulk operations</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Middle Page</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">page=5&perPage=20</td>
                <td className="px-6 py-4 text-sm text-gray-700">Items 81-100</td>
                <td className="px-6 py-4 text-sm text-gray-700">User navigation</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Last Page</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">page=3&perPage=50</td>
                <td className="px-6 py-4 text-sm text-gray-700">Items 101-150</td>
                <td className="px-6 py-4 text-sm text-gray-700">End of dataset</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-emerald-900 mb-3">✅ Recommended</h4>
            <ul className="text-sm text-emerald-800 space-y-2">
              <li>• Start with reasonable page sizes (10-50 items)</li>
              <li>• Cache pagination results when possible</li>
              <li>• Handle empty result sets gracefully</li>
              <li>• Use the meta information for navigation</li>
              <li>• Implement loading states during requests</li>
              <li>• Show total count to users when helpful</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-amber-900 mb-3">⚠️ Considerations</h4>
            <ul className="text-sm text-amber-800 space-y-2">
              <li>• Large page sizes may impact performance</li>
              <li>• Data may change between page requests</li>
              <li>• Always validate page parameters</li>
              <li>• Consider using cursors for real-time data</li>
              <li>• Handle network errors gracefully</li>
              <li>• Respect API rate limits</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Getting Started CTA */}
      <div className="bg-gradient-to-r from-bank-blue to-blue-700 rounded-xl p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Ready to implement pagination?</h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Start building efficient data navigation in your application. Use our pagination system 
            to provide smooth user experiences when working with large datasets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/transactions"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-bank-blue rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              <Layers className="mr-2 h-4 w-4" />
              Try with Transactions API
            </a>
            <a
              href="https://documenter.getpostman.com/view/30508792/2sB3BLi6vb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-bank-gold text-white rounded-lg hover:bg-bank-gold/90 transition-colors font-semibold"
            >
              View in Postman
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};