import React from 'react';
import { Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { CodeBlock } from '../../CodeBlock';

export const ApiPaginationSection: React.FC = () => {
  const paginationRequest = `curl -X GET "https://api.firstchekout.com/transaction?page=2&perPage=50" \\
  -H "Authorization: Bearer sk_test_your_secret_key"`;

  const paginationResponse = `{
  "status": true,
  "message": "Transactions retrieved",
  "data": [
    {
      "id": 123456,
      "reference": "txn_ref_123",
      "amount": 20000,
      "status": "success"
    }
  ],
  "meta": {
    "total": 150,
    "perPage": 50,
    "page": 2,
    "pageCount": 3
  }
}`;

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pagination</h1>
        <p className="text-lg text-gray-600">
          Learn how to navigate through large datasets using pagination.
        </p>
      </div>

      <div className="mb-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How Pagination Works</h2>
          <p className="text-gray-700 mb-6">
            All list endpoints support pagination. By default, we return 10 items per page, 
            but you can specify up to 100 items per page using the <code>perPage</code> parameter.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <Layers className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-blue-900">Pagination Parameters</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Query Parameters</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• <code>page</code> - Page number (default: 1)</li>
                  <li>• <code>perPage</code> - Items per page (default: 10, max: 100)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Response Meta</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• <code>total</code> - Total number of items</li>
                  <li>• <code>pageCount</code> - Total number of pages</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sample Request</h3>
            <CodeBlock language="bash" code={paginationRequest} />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sample Response</h3>
            <CodeBlock language="json" code={paginationResponse} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pagination Controls</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </button>
                  <span className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">2</span>
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  Showing 51-100 of 150 results
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-900 mb-2">✅ Best Practices</h4>
              <ul className="text-emerald-800 text-sm space-y-1">
                <li>• Start with reasonable page sizes (10-50 items)</li>
                <li>• Cache pagination results when possible</li>
                <li>• Handle empty result sets gracefully</li>
                <li>• Use the meta information for navigation</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-900 mb-2">⚠️ Considerations</h4>
              <ul className="text-amber-800 text-sm space-y-1">
                <li>• Large page sizes may impact performance</li>
                <li>• Data may change between page requests</li>
                <li>• Always validate page parameters</li>
                <li>• Consider using cursors for real-time data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};