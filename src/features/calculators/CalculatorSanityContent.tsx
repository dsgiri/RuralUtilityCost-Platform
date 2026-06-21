import React, { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { getCalculatorContentByCode, CalculatorContent } from './calculatorSanityService';
import { Info } from 'lucide-react';

interface CalculatorSanityContentProps {
  uniqueCode: string;
}

export const CalculatorSanityContent: React.FC<CalculatorSanityContentProps> = ({ uniqueCode }) => {
  const [content, setContent] = useState<CalculatorContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(false);
      try {
        const data = await getCalculatorContentByCode(uniqueCode);
        if (data) {
          setContent(data);
        } else {
          // It's possible the CMS doesn't have the entry yet, just fail silently or show error fallback
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [uniqueCode]);

  if (loading) {
    return (
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return null; // Return nothing if the content is not available yet, to avoid layout disruption for users
  }

  // Only render if we have at least one block of content
  if (!content.howThisWorks?.length && !content.assumptions?.length) {
    return null;
  }

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {content.howThisWorks && content.howThisWorks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            How This Works
          </h3>
          <div className="prose prose-sm prose-green text-gray-600 leading-relaxed max-w-none">
            <PortableText value={content.howThisWorks} />
          </div>
        </div>
      )}

      {content.assumptions && content.assumptions.length > 0 && (
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-bold text-green-900 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <Info className="w-4 h-4" />
            Key Assumptions
          </h3>
          <div className="prose prose-sm text-green-800 leading-relaxed max-w-none prose-li:my-1">
            <PortableText value={content.assumptions} />
          </div>
        </div>
      )}
      
      <div className="text-right">
        <span className="text-xs text-gray-400 font-mono tracking-wider" title="Calculator Reference Code">
          {uniqueCode}
        </span>
      </div>
    </div>
  );
};
