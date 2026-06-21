import React, { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { ZapOff, Calculator, Info, RotateCcw, AlertTriangle } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function GenCriticalLoad() {
  const [criticalLoadKW, setCriticalLoadKW] = useState(4.5);
  const [sizeKW, setSizeKW] = useState(10);
  const [capacity, setCapacity] = useState(50);
  const [levelPct, setLevelPct] = useState(80);
  const [reserveTargetHrs, setReserveTargetHrs] = useState(72);
  const [fuelType, setFuelType] = useState('Diesel');

  // Fuel Multipliers (gallons per hour per kW at 100% load)
  const getFuelFactor = () => {
    if (fuelType === 'Diesel') return 0.075;
    if (fuelType === 'Gasoline') return 0.11;
    if (fuelType === 'Propane') return 0.14;
    return 0.075;
  };

  // Validation
  const loadPercentage = sizeKW > 0 ? (criticalLoadKW / sizeKW) * 100 : 0;
  const isOverloaded = loadPercentage > 100;

  // Math
  const availableFuel = capacity * (levelPct / 100);
  const maxBurnRate = sizeKW * getFuelFactor();
  const estimatedBurnRate = maxBurnRate * (0.2 + 0.8 * (Math.min(loadPercentage, 100) / 100));
  
  const runtimeHrs = estimatedBurnRate > 0 ? availableFuel / estimatedBurnRate : 0;
  const runtimeDays = runtimeHrs / 24;

  const targetFuelRequired = estimatedBurnRate * reserveTargetHrs;
  const fuelShortfall = targetFuelRequired - availableFuel;
  const meetsTarget = runtimeHrs >= reserveTargetHrs;

  const handleReset = () => {
    setCriticalLoadKW(4.5);
    setSizeKW(10);
    setCapacity(50);
    setLevelPct(80);
    setReserveTargetHrs(72);
    setFuelType('Diesel');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <SEO 
        title="Critical Load Backup Power Calculator | Rural Utility Cost"
        description="Verify if your generator and fuel reserves can sustain critical farm and home loads during extended power outages."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Critical Load Backup Power Calculator",
          "description": "Verify if your generator and fuel reserves can sustain critical farm and home loads during extended power outages.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-4">
          <ZapOff className="w-8 h-8 text-indigo-600" />
          Critical Load Backup Planner
        </h1>
        <p className="text-gray-600 text-lg">
          Determine if your current fuel reserve will support your mission-critical loads (freezers, well pumps, heating) for your target outage duration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ... existing columns ... */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              System Parameters
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div className="sm:col-span-2 p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-2">
                <label className="block text-sm font-bold text-indigo-900 mb-1">
                  Critical Load (kW)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={criticalLoadKW}
                  onChange={(e) => setCriticalLoadKW(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
                />
                <p className="text-xs text-indigo-700/80 mt-1.5 font-medium">Sum of all essential circuits running concurrently (e.g. well pump + freezer + furnace).</p>
              </div>

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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
                />
                {isOverloaded && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                    <AlertTriangle className="w-3 h-3" /> Gen undersized!
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Propane">Propane (Liquid)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tank Capacity (gal)
                </label>
                <input
                  type="number"
                  min="0"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Fuel Level (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={levelPct}
                  onChange={(e) => setLevelPct(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2 pt-4 mt-2 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Backup Duration (Hours)
                </label>
                <input
                  type="number"
                  min="1"
                  value={reserveTargetHrs}
                  onChange={(e) => setReserveTargetHrs(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors max-w-[200px]"
                />
                <p className="text-xs text-gray-500 mt-1">E.g., 72 hours for a standard 3-day emergency prep expectation.</p>
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
              <a href="/gen-runtime" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700">
                Calculate Runtime →
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#1a5f3f] rounded-2xl shadow-sm border border-[#144930] p-6 text-white sticky top-6">
            <h2 className="text-lg font-bold text-white/90 mb-4 uppercase tracking-wide text-center">Readiness Status</h2>
            
            <div className="text-center mb-6">
              {isOverloaded ? (
                <div className="bg-red-500/20 border border-red-400 rounded-xl p-4 text-center">
                  <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                  <div className="text-red-100 font-bold uppercase tracking-wide text-sm max-w-[200px] mx-auto">
                    Generator Overload
                  </div>
                  <div className="text-red-200 text-xs mt-1">Load exceeds max capacity.</div>
                </div>
              ) : (
                <>
                  <div className="text-5xl font-black text-white mb-2">
                    {runtimeHrs.toLocaleString(undefined, { maximumFractionDigits: 1 })}<span className="text-2xl opacity-80">h</span>
                  </div>
                  <div className="text-green-200 text-sm font-medium bg-white/10 py-1.5 px-3 rounded-md inline-block">
                    Total Support: {runtimeDays.toLocaleString(undefined, { maximumFractionDigits: 1 })} Days
                  </div>
                </>
              )}
            </div>

            {!isOverloaded && (
               <div className={`mb-6 rounded-xl p-4 text-center border ${meetsTarget ? 'bg-emerald-600/30 border-emerald-500' : 'bg-red-500/20 border-red-400/50'}`}>
                 <div className="text-sm font-bold text-white uppercase tracking-wide mb-1">
                   {meetsTarget ? 'Target Met ✓' : 'Fuel Shortfall ✕'}
                 </div>
                 {!meetsTarget && (
                   <div className="text-red-200 font-medium mt-2">
                     Need {Math.ceil(fuelShortfall)} more gallons to reach {reserveTargetHrs}h target.
                   </div>
                 )}
               </div>
            )}

            <div className="space-y-3 pt-4 border-t border-green-700/50 text-sm">
              <div className="flex justify-between items-center text-green-50">
                <span>Gen Utilization:</span>
                <span className={`font-semibold ${isOverloaded ? 'text-red-300' : ''}`}>{loadPercentage.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center text-green-50">
                <span>Available Fuel:</span>
                <span className="font-semibold">{availableFuel.toFixed(1)} gal</span>
              </div>
              <div className="flex justify-between items-center text-green-50">
                <span>Burn Rate:</span>
                <span className="font-semibold">{estimatedBurnRate.toFixed(2)} gal/h</span>
              </div>
            </div>

            <CalculatorSanityContent uniqueCode="CALC-UTIL-204" />

          <div className="mt-8 bg-green-900/30 rounded-xl p-4 flex gap-3 text-green-100 text-sm leading-relaxed">
              <Info className="w-5 h-5 shrink-0 text-green-300" />
              <p>
                To maximize runtime during an extended outage, cycle high-load critical appliances (like well pumps and water heaters) independently.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
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
