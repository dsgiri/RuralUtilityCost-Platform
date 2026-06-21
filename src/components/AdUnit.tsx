import React, { useEffect, useRef } from 'react';

// Declare globals for AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

type AdPlacement = 'header' | 'in-content' | 'mid-article' | 'end-of-content' | 'sidebar';

interface AdUnitProps {
  /**
   * The slot ID from Google AdSense (e.g. "1234567890")
   */
  slot: string;
  /**
   * Defines where the ad is placed to apply context-specific styling
   */
  placement: AdPlacement;
  /**
   * Adds any specific structural classes
   */
  className?: string;
}

export function AdUnit({ slot, placement, className = '' }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);

  // Initialize the ad after the component is mounted
  useEffect(() => {
    let timeoutId: number;
    
    // Slight delay to ensure DOM layout is complete and width is calculated
    timeoutId = setTimeout(() => {
      try {
        // Check if we already initialized this specific ad
        if (adRef.current && adRef.current.getAttribute('data-adsbygoogle-status') !== 'done') {
          const adsbygoogle = window.adsbygoogle || [];
          adsbygoogle.push({});
        }
      } catch (err) {
        console.error('AdSense initialization error', err);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Determine spacing and layout behavior based on placement
  const placementClasses = {
    'header': 'my-8 w-full max-w-7xl mx-auto block text-center px-4',
    'in-content': 'my-10 w-full block text-center',
    'mid-article': 'my-12 w-full max-w-4xl mx-auto block text-center',
    'end-of-content': 'mt-12 mb-8 w-full max-w-5xl mx-auto block text-center',
    'sidebar': 'w-full hidden lg:block text-center sticky top-24'
  };

  const adStyles = {
    // Avoid fixed height for truly responsive ads
    display: 'block',
    width: '100%'
  };

  return (
    <div className={`ad-container ${placementClasses[placement]} ${className} overflow-hidden`}>
      {/* 
        Responsive ad unit structure
        Note: The wrapper doesn't have a fixed height to let AdSense expand naturally.
      */}
      <div className="w-full text-center relative bg-transparent min-h-[100px] block">
        {/* Subtle placeholder label that only shows if ad isn't fully covering it */}
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[9px] text-gray-400 dark:text-gray-500 tracking-[0.1em] uppercase opacity-40 z-0 pointer-events-none">
          Advertisement
        </span>
        
        <ins
          ref={adRef}
          className="adsbygoogle relative z-10"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-9785752001527360" // Assuming this from meta tag
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
