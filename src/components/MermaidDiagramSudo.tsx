import React, { useEffect, useRef } from 'react';

interface MermaidDiagramProps {
  code: string;
}

export const MermaidDiagramSudo: React.FC<MermaidDiagramProps> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current) {
        // For now, we'll display the mermaid code
        // In a real implementation, you would use the mermaid library to render
        containerRef.current.innerHTML = `
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="text-sm text-blue-800 mb-2 font-medium">Mermaid Diagram:</div>
            <pre class="text-xs text-blue-700 whitespace-pre-wrap">${code}</pre>
            <div class="mt-3 text-xs text-blue-600">
              💡 This diagram would render as a visual flowchart in  full implementation below.
            </div>
          </div>
        `;
      }
    };

    renderDiagram();
  }, [code]);

  return <div ref={containerRef} className="my-4" />;
};