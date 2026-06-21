import React, { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { Flame, Calculator, Info, RotateCcw } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function GenFuelCost() {
  const [sizeKW, setSizeKW] = useState(10);
  const [loadPct, setLoadPct] = useState(50);
  const [runtimeHrs, setRuntimeHrs] = useState(24);
  const [fuelPrice, setFuelPrice] = useState(3.50);
  const [fuelType, setFuelType] = useState('Diesel');

  // Fuel Multipliers (gallons per hour per kW at 100% load)
  const getFuelFactor = () => {
    if (fuelType === 'Diesel') return 0.075;
    if (fuelType === 'Gasoline') return 0.11;
    if (fuelType === 'Propane') return 0.14;
    return 0.075;
  };

  // Math
  const maxBurnRate = sizeKW * getFuelFactor();
  const burnRate = maxBurnRate * (0.2 + 0.8 * (loadPct / 100)); // 20% idle baseline
  
  const totalFuelConsumed = burnRate * runtimeHrs;
  const totalFuelCost = totalFuelConsumed * fuelPrice;
  const costPerHour = burnRate * fuelPrice;
  const costPerDay = costPerHour * 24;

  const handleReset = () => {
    setSizeKW(10);
    setLoadPct(50);
    setRuntimeHrs(24);
    setFuelPrice(3.50);
    setFuelType('Diesel');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <SEO 
        title="Generator Fuel Consumption & Cost Calculator | Rural Utility Cost"
        description="Calculate estimated fuel usage and operating costs for backup generators based on load and runtime."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Generator Fuel Consumption & Cost Calculator",
          "description": "Calculate estimated fuel usage and operating costs for backup generators based on load and runtime.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-4">
          <Flame className="w-8 h-8 text-orange-500" />
          Generator Fuel Cost
        </h1>
        <p className="text-gray-600 text-lg">
          Estimate how much fuel your generator will burn and how much it will cost to operate during an outage or primary use scenario.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              Operating Profile
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Generator Size (kW)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={sizeKW}
                  onChange={(e) => setSizeKW(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Load (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={loadPct}
                  onChange={(e) => setLoadPct(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Average is 50%. Max is 100%.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors"
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Propane">Propane (Liquid)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Price ($ / gal)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2 pt-4 mt-2 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Runtime (Hours)
                </label>
                <input
                  type="number"
                  min="0"
                  value={runtimeHrs}
                  onChange={(e) => setRuntimeHrs(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors max-w-[200px]"
                />
                <p className="text-xs text-gray-500 mt-1">E.g., 24 for one day, 72 for three days.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Full Rural Power Plan</h3>
            <p className="text-gray-600 mb-4">
              Determine your full backup strategy by pairing sizing requirements with long-term fuel costs and storage plans.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/generator-planning" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                Return to Generator Hub
              </a>
              <a href="/gen-critical-load" className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700">
                Calculate Critical Load →
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-orange-50 rounded-2xl shadow-sm border border-orange-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-orange-900 mb-4 uppercase tracking-wide text-center">Fuel Cost Estimate</h2>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-orange-600 mb-2">
                ${totalFuelCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-orange-700/80 text-sm font-medium">
                Total Cost for {runtimeHrs} Hours
              </div>
            </div>

            <div className="mb-6 bg-white rounded-xl p-4 border border-orange-100 text-center shadow-sm">
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Fuel Consumed</div>
              <div className="text-2xl font-bold text-gray-900">
                {totalFuelConsumed.toLocaleString(undefined, { maximumFractionDigits: 1 })} <span className="text-sm font-medium text-gray-500">gal</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-orange-200 text-sm">
              <div className="flex justify-between items-center text-orange-900/80">
                <span>Burn Rate:</span>
                <span className="font-semibold">{burnRate.toFixed(2)} gal/h</span>
              </div>
              <div className="flex justify-between items-center text-orange-900/80">
                <span>Cost Per Hour:</span>
                <span className="font-semibold">${costPerHour.toFixed(2)}/h</span>
              </div>
              <div className="flex justify-between items-center text-orange-900/80">
                <span>Cost Per 24 Hrs:</span>
                <span className="font-semibold">${costPerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })}/day</span>
              </div>
            </div>

            <CalculatorSanityContent uniqueCode="CALC-UTIL-203" />

          <div className="mt-8 bg-orange-100/60 rounded-xl p-4 flex gap-3 text-orange-800 text-sm leading-relaxed">
              <Info className="w-5 h-5 shrink-0 text-orange-500" />
              <p>
                Generators use fuel even with zero load to maintain 60Hz frequency (approx 20% of max burn). This calculator adjusts for basic engine parasitic loss.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 w-full py-3 bg-white outline outline-1 outline-orange-200 hover:bg-orange-100 text-orange-900 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
