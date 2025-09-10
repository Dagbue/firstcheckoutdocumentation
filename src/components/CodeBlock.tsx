import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-t-lg">
        <span className="text-xs sm:text-sm font-medium capitalize">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-b-lg overflow-x-auto">
        <pre className="text-xs sm:text-sm">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};