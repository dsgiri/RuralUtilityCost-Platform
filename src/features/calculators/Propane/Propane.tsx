import { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function Propane() {
  const [tankSize, setTankSize] = useState<number>(500);
  const [currentFillPercent, setCurrentFillPercent] = useState<number>(20);
  const [pricePerGallon, setPricePerGallon] = useState<number>(2.50);

  // Propane tanks are safely filled to 80% maximum capacity
  const maxSafeGallons = tankSize * 0.8;
  const currentGallons = tankSize * (currentFillPercent / 100);
  const gallonsNeeded = Math.max(0, maxSafeGallons - currentGallons);
  const totalCost = gallonsNeeded * pricePerGallon;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800" id="calculator-content">
      <SEO 
        title="Propane Refill Calculator | Rural Utility Cost"
        description="Calculate cost and volume to refill residential and agricultural propane tanks."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Propane Refill Calculator",
          "description": "Calculate cost and volume to refill residential and agricultural propane tanks.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="p-6 md:p-8 flex-grow overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Propane Refill Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Calculate delivery cost to refill a standard rural propane tank.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-1 space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase text-sm tracking-wide">Tank Details</h3>
                <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-2 py-1 rounded font-bold">Fuel</span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tank Size (Water Capacity)</label>
                <select 
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] font-medium transition-colors"
                  value={tankSize}
                  onChange={(e) => setTankSize(Number(e.target.value))}
                >
                  <option value={100}>100 Gallons</option>
                  <option value={120}>120 Gallons</option>
                  <option value={250}>250 Gallons</option>
                  <option value={500}>500 Gallons</option>
                  <option value={1000}>1000 Gallons</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">Max safe fill capacity is 80% ({maxSafeGallons} gal)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex justify-between">
                  <span>Current Gauge Level</span>
                  <span className="text-[#1a5f3f] dark:text-[#6ee7b7]">{currentFillPercent}%</span>
                </label>
                <input 
                  type="range" 
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#1a5f3f] dark:accent-[#6ee7b7]"
                  min="0" 
                  max="100" 
                  step="5"
                  value={currentFillPercent} 
                  onChange={(e) => setCurrentFillPercent(Number(e.target.value))} 
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Empty</span>
                  <span>Full</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Price Per Gallon</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input 
                    type="number" 
                    className="w-full pl-7 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] transition-colors"
                    step="0.01"
                    min="0.50"
                    value={pricePerGallon} 
                    onChange={(e) => setPricePerGallon(Number(e.target.value))} 
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a5f3f]/5 dark:bg-[#6ee7b7]/5 rounded-bl-full"></div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight relative z-10">Refill Estimate</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 relative z-10">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Gallons Needed (to 80%)</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{gallonsNeeded.toLocaleString(undefined, {maximumFractionDigits: 1})} gal</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Current Contents</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentGallons.toLocaleString(undefined, {maximumFractionDigits: 1})} gal</p>
                  </div>
                </div>

                <div className="p-6 bg-[#1a5f3f] dark:bg-[#11402a] text-white rounded-xl shadow-inner relative z-10">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-green-100 font-medium tracking-wide uppercase text-sm">Estimated Total Cost</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tight">${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    <span className="text-green-200 font-medium">Estimated</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5 rounded-xl">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Notes:</strong> By law, propane tanks are filled to exactly 80% maximum to allow for thermal expansion of the gas. Delivery minimum charges or hazardous materials surcharges may apply depending on your provider.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mt-4 print:hidden">
                <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-4">
                  Formula & Assumptions
                </h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>The 80% Rule:</strong> By law, bulk propane tanks cannot be filled past 80% of their total water capacity. This leaves 20% empty space inside the tank to allow the liquid propane to safely expand as temperatures rise. Therefore, a "500-gallon" tank actually only holds 400 gallons of usable fuel.</p>
                  <p><strong>Logic:</strong> <code>Max Usable Gallons = Tank Size × 0.8</code>. <code>Gallons Needed = Max Usable Gallons - (Tank Size × (Current Gauge % / 100))</code>.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 print:hidden">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-bold text-gray-800">Why won't my company fill my tank to 100%?</h4>
                    <p className="mt-1">Safety regulations. Propane expands drastically with heat. If a tank were filled to 100% on a cool morning, the afternoon heat would cause the liquid to expand, build immense pressure, and trigger the emergency relief valve (venting explosive gas into the air).</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">At what gauge percentage should I call for a refill?</h4>
                    <p className="mt-1">Most companies recommend calling when your gauge reads between 20% and 30%. Waiting until it drops below 10% risks running out entirely, which legally requires a delivery driver to perform a "leak check" on your entire system before refilling (which often carries a steep extra fee).</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Full Rural Budget</h3>
                <p className="text-gray-600 mb-4">
                  Determine your complete property operating costs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="/utility-cost" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                    Return to Utility Cost Hub
                  </a>
                  <a href="/energy-demand" className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700">
                    Calculate Peak Demand →
                  </a>
                </div>
              </div>

              <CalculatorSanityContent uniqueCode="CALC-UTIL-206" />

              <ExportActions 
                title="Propane Refill"
                data={{
                  ...{  tankSize, currentFillPercent, pricePerGallon  },
                  ...{  totalCost, gallonsNeeded  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
