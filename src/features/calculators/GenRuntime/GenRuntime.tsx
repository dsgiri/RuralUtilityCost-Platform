import React, { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { Clock, Calculator, Info, RotateCcw } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function GenRuntime() {
  const [sizeKW, setSizeKW] = useState(10);
  const [loadPct, setLoadPct] = useState(50);
  const [capacity, setCapacity] = useState(20);
  const [levelPct, setLevelPct] = useState(100);
  const [fuelType, setFuelType] = useState('Diesel');
  const [useCustomBurn, setUseCustomBurn] = useState(false);
  const [customBurnRate, setCustomBurnRate] = useState(0.5);

  // Fuel Multipliers (gallons per hour per kW at 100% load)
  const getFuelFactor = () => {
    if (fuelType === 'Diesel') return 0.075;
    if (fuelType === 'Gasoline') return 0.11;
    if (fuelType === 'Propane') return 0.14;
    return 0.075;
  };

  // Math
  const availableFuel = capacity * (levelPct / 100);
  
  // Standard equation: max burn * (0.2 idle factor + 0.8 * load)
  const maxBurnRate = sizeKW * getFuelFactor();
  const estimatedBurnRate = maxBurnRate * (0.2 + 0.8 * (loadPct / 100));
  
  const actualBurnRate = useCustomBurn ? customBurnRate : estimatedBurnRate;
  const runtimeHrs = actualBurnRate > 0 ? availableFuel / actualBurnRate : 0;
  const runtimeDays = runtimeHrs / 24;

  const handleReset = () => {
    setSizeKW(10);
    setLoadPct(50);
    setCapacity(20);
    setLevelPct(100);
    setFuelType('Diesel');
    setUseCustomBurn(false);
    setCustomBurnRate(0.5);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Generator Runtime Calculator",
        "description": "Estimate how long your generator can run on available fuel. Plan for power outages and off-grid backup.",
        "applicationCategory": "UtilitiesApplication"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long will a 10 kW generator run on 20 gallons of fuel?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "At a 50% load, a 10 kW diesel generator burns roughly 0.45 gallons per hour (gal/h). With 20 gallons of fuel, it will run for approximately 44.4 hours. A gasoline generator burns slightly more, lasting about 30.3 hours on the same fuel amount."
            }
          },
          {
            "@type": "Question",
            "name": "What consumes the most generator fuel?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fuel consumption is directly tied to the electrical load (kW). Running high-draw appliances like well pumps, HVAC systems, or electric water heaters continuously will dramatically increase the fuel burn rate and reduce total runtime."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <SEO 
        title="Generator Runtime Calculator | Rural Utility Cost"
        description="Estimate how long your generator can run on available fuel. Plan for power outages and off-grid backup."
        jsonLd={jsonLd}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-4">
          <Clock className="w-8 h-8 text-sky-600" />
          Generator Runtime Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Estimate how long your generator will run during a power outage based on its size, load, and fuel supply.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-600" />
              Generator & Fuel Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Electrical Load (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={loadPct}
                  onChange={(e) => setLoadPct(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Average load factor (typically 50-70%)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Tank Capacity (gal)
                </label>
                <input
                  type="number"
                  min="0"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 transition-colors"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  value={fuelType}
                  onChange={(e) => {
                    setFuelType(e.target.value);
                    setUseCustomBurn(false);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 transition-colors"
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Propane">Propane (Liquid Gallons)</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Burn Rate Settings</h3>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useCustomBurn}
                    onChange={(e) => setUseCustomBurn(e.target.checked)}
                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  Use custom burn rate
                </label>
              </div>

              {useCustomBurn ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Burn Rate (gal/h)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={customBurnRate}
                    onChange={(e) => setCustomBurnRate(Number(e.target.value) || 0)}
                    className="w-full max-w-[200px] px-4 py-2 border border-blue-300 bg-blue-50 rounded-lg focus:ring-2 focus:ring-sky-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">Found in your generator's spec sheet based on your expected load.</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Auto-Estimated Burn Rate</div>
                    <div className="text-xs text-gray-500 mt-0.5">Based on {sizeKW}kW on {fuelType} at {loadPct}% load</div>
                  </div>
                  <div className="text-lg font-bold text-sky-700">
                    {estimatedBurnRate.toFixed(2)} gal/h
                  </div>
                </div>
              )}
            </div>
          </div>
          
          
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How long will a 10 kW generator run on 20 gallons of fuel?</h3>
                <p className="text-gray-600">
                  At a 50% load, a 10 kW diesel generator burns roughly 0.45 gallons per hour (gal/h). With 20 gallons of fuel, it will run for approximately <strong>44.4 hours</strong>. A gasoline generator burns slightly more, lasting about 30.3 hours on the same fuel amount.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What consumes the most generator fuel?</h3>
                <p className="text-gray-600">
                  Fuel consumption is directly tied to the electrical load (kW). Running high-draw appliances continuously will dramatically increase the fuel burn rate and reduce total runtime. Major culprits include:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                  <li>Well pumps and booster pumps</li>
                  <li>Electric HVAC compressor startup</li>
                  <li>Electric water heaters and electric ranges</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Full Rural Power Plan</h3>
            <p className="text-gray-600 mb-4">
              Determine your full backup strategy by pairing sizing requirements with long-term fuel costs and storage plans.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/generator-planning" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                Return to Generator Hub
              </a>
              <a href="/gen-fuel-cost" className="inline-flex items-center text-sky-600 font-medium hover:text-sky-700">
                Estimate Fuel Cost →
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-sky-50 rounded-2xl shadow-sm border border-sky-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-sky-900 mb-4 uppercase tracking-wide text-center">Estimated Runtime</h2>
            
            <div className="text-center mb-6">
              <div className="text-6xl font-black text-sky-600 mb-2">
                {runtimeHrs.toLocaleString(undefined, { maximumFractionDigits: 1 })}
              </div>
              <div className="text-sky-700/80 text-sm font-bold uppercase tracking-wide">
                Hours
              </div>
              <div className="text-sky-600/70 text-sm font-medium mt-3 bg-white/60 py-1.5 px-3 rounded-md inline-block">
                ~ {runtimeDays.toLocaleString(undefined, { maximumFractionDigits: 1 })} Days
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-sky-200 text-sm">
              <div className="flex justify-between items-center text-sky-900/80">
                <span>Available Fuel:</span>
                <span className="font-semibold">{availableFuel.toFixed(1)} gal</span>
              </div>
              <div className="flex justify-between items-center text-sky-900/80">
                <span>Burn Rate:</span>
                <span className="font-semibold">{actualBurnRate.toFixed(2)} gal/h</span>
              </div>
              <div className="flex justify-between items-center text-sky-900/80 pt-2 mt-2 border-t border-sky-200/50">
                <span>Power Delivery:</span>
                <span className="font-semibold">{(sizeKW * (loadPct/100)).toFixed(1)} kW Cont.</span>
              </div>
            </div>

            <CalculatorSanityContent uniqueCode="CALC-UTIL-202" />

          <div className="mt-8 bg-sky-100/60 rounded-xl p-4 flex gap-3 text-sky-800 text-sm leading-relaxed">
              <Info className="w-5 h-5 shrink-0 text-sky-500" />
              <p>
                Results are estimates. Auto-estimated burn rates assume a 20% baseline idle draw plus linear fuel scaling with load. Weather, engine age, and power surges can skew actual consumption.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 w-full py-3 bg-white outline outline-1 outline-sky-200 hover:bg-sky-100 text-sky-900 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
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
