import { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function Fencing() {
  const [perimeter, setPerimeter] = useState<number>(500);
  const [material, setMaterial] = useState<'barbed' | 'woven' | 'wood' | 'vinyl' | 'electric'>('barbed');
  const [hasGates, setHasGates] = useState<boolean>(true);
  const [gateCount, setGateCount] = useState<number>(2);

  const materialCosts = {
    barbed: 1.5,
    woven: 2.8,
    electric: 1.2,
    wood: 12.0,
    vinyl: 18.0,
  };

  const gateCosts = {
    barbed: 150,
    woven: 200,
    electric: 100,
    wood: 350,
    vinyl: 450,
  };

  const costPerFoot = materialCosts[material];
  const fencingCost = perimeter * costPerFoot;
  const totalGateCost = hasGates ? gateCount * gateCosts[material] : 0;
  const installationCost = perimeter * 4.5; // Average labor per foot
  
  const totalCost = fencingCost + totalGateCost + installationCost;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800" id="calculator-content">
      <SEO 
        title="Fencing Calculator | Rural Utility Cost"
        description="Estimate the cost of rural and agricultural fencing, including barbed wire, woven wire, wood, and electric. Calculates material, gates, and labor."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Fencing Calculator",
          "description": "Estimate the cost of rural and agricultural fencing, including barbed wire, woven wire, wood, and electric. Calculates material, gates, and labor.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="p-6 md:p-8 flex-grow overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Fencing Cost Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Estimate materials, labor, and gates for rural property fencing.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-1 space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase text-sm tracking-wide">Project Details</h3>
                <span className="text-xs bg-[#1a5f3f]/10 text-[#1a5f3f] dark:bg-[#6ee7b7]/10 dark:text-[#6ee7b7] px-2 py-1 rounded font-bold">Lumber & Wire</span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex justify-between">
                  <span>Perimeter (Feet)</span>
                  <span className="text-[#1a5f3f] dark:text-[#6ee7b7]">{perimeter.toLocaleString()} ft</span>
                </label>
                <input 
                  type="range" 
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#1a5f3f] dark:accent-[#6ee7b7]"
                  min="100" 
                  max="10000" 
                  step="100"
                  value={perimeter} 
                  onChange={(e) => setPerimeter(Number(e.target.value))} 
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>100</span>
                  <span>10,000+</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Material Type</label>
                <select 
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] font-medium transition-colors"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value as any)}
                >
                  <option value="barbed">Barbed Wire (Agricultural)</option>
                  <option value="woven">Woven Wire (Sheep/Goat)</option>
                  <option value="electric">Electric High-Tensile</option>
                  <option value="wood">Wood Board (Equine/Estate)</option>
                  <option value="vinyl">Vinyl (Decorative/Estate)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <input 
                    type="checkbox" 
                    checked={hasGates}
                    onChange={(e) => setHasGates(e.target.checked)}
                    className="rounded border-gray-300 text-[#1a5f3f] focus:ring-[#1a5f3f]"
                  />
                  Include Gates
                </label>
                
                {hasGates && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Number of Gates</label>
                    <input 
                      type="number" 
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] transition-colors"
                      min="1" 
                      max="20"
                      value={gateCount} 
                      onChange={(e) => setGateCount(Number(e.target.value))} 
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a5f3f]/5 dark:bg-[#6ee7b7]/5 rounded-bl-full"></div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight relative z-10">Estimated Project Cost</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 relative z-10">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Materials</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${fencingCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Labor</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${installationCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  </div>

                  {hasGates && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Gates</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalGateCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-[#1a5f3f] dark:bg-[#11402a] text-white rounded-xl shadow-inner relative z-10">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-green-100 font-medium tracking-wide uppercase text-sm">Total Setup Cost</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tight">${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    <span className="text-green-200 font-medium">Estimated</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5 rounded-xl print:hidden">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Notes:</strong> Terrain difficulty (rocks, slopes) can increase labor costs by up to 50%. This calculator assumes average soil conditions. Endings and corners require heavy bracing which is amortized in these estimates.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mt-4 print:hidden">
                <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  Formula & Assumptions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Perimeter & Acreage Rule:</h4>
                    <p className="mb-2">Square acreage calculations assume a <strong>perfectly square parcel</strong> of land. This represents the absolute minimum possible fencing required.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-amber-500">
                      <li>Irregularly shaped or rectangular lots will significantly increase the actual perimeter length.</li>
                      <li>When relying on Acres, always buy 10-20% extra materials to cover property line irregularities.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Gates & Braces:</h4>
                    <ul className="list-disc pl-5 space-y-1 marker:text-amber-500">
                      <li><strong>Corners:</strong> Every property has at least 4 corners, requiring heavy wooden H-braces.</li>
                      <li><strong>Gates:</strong> Each gate interrupts the fence line, requiring 2 sturdy anchor/brace posts to hold the wire tension.</li>
                      <li><strong>Wire Rolls:</strong> Standard barbed wire is sold in 1/4 mile rolls (1,320 feet).</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 print:hidden">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-bold text-gray-800">What is the cheapest way to fence land?</h4>
                    <p className="mt-1">High-tensile smooth wire or basic barbed wire are generally the cheapest materials per linear foot. However, they may not be suitable for all types of livestock (e.g., horses often require more visible or safer options like no-climb wire).</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">How does terrain affect the cost?</h4>
                    <p className="mt-1">Rocky soil, steep slopes, and heavy brush will dramatically increase labor costs. Installing T-posts in solid rock often requires specialized drilling equipment, which can double or triple the per-foot installation rate.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Full Land Plan</h3>
                <p className="text-gray-600 mb-4">
                  Determine your complete property operating and construction costs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="/land-and-construction" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                    Return to Land & Construction Hub
                  </a>
                  <a href="/rural-land" className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700">
                    Evaluate Raw Land →
                  </a>
                </div>
              </div>

              <CalculatorSanityContent uniqueCode="CALC-PROP-105" />

              <ExportActions 
                title="Fencing"
                data={{
                  ...{  perimeter, material, hasGates, gateCount  },
                  ...{  totalCost, fencingCost, installationCost, totalGateCost  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
