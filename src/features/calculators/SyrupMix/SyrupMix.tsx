import React, { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { Beaker, Info, RotateCcw, Calculator } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function SyrupMix() {
  const [targetAmount, setTargetAmount] = useState(1);
  const [unit, setUnit] = useState('gallons');
  const [ratio, setRatio] = useState('1:1');
  
  const [customSugar, setCustomSugar] = useState(1);
  const [customWater, setCustomWater] = useState(1);

  // Conversion logic (approximate for sugar/water volumes)
  // 1 lb water = 1 pint water.
  // 1 lb sugar dissolves to add ~0.5 pints of liquid volume.
  
  // Calculate parts
  let sugarParts = 1;
  let waterParts = 1;
  
  if (ratio === '1:1') {
    sugarParts = 1;
    waterParts = 1;
  } else if (ratio === '2:1') {
    sugarParts = 2; // 2 parts sugar
    waterParts = 1; // 1 part water
  } else if (ratio === 'custom') {
    sugarParts = Math.max(0, customSugar);
    waterParts = Math.max(0.1, customWater); // Prevent division by zero
  }

  // Define target in pints (1 US Gallon = 8 Pints, 1 Quart = 2 Pints, 1 Liter = 2.11 Pints)
  let targetPints = 0;
  if (unit === 'gallons') targetPints = targetAmount * 8;
  if (unit === 'quarts') targetPints = targetAmount * 2;
  if (unit === 'liters') targetPints = targetAmount * 2.11338;
  if (unit === 'pints') targetPints = targetAmount;

  // Formula: Volume (pints) = Water Pints + (Sugar Pints Volume)
  // Sugar Pints Volume = Sugar Lbs * 0.5. 
  // Ratio is by weight, so Sugar Lbs = Water Pints * (sugarParts / waterParts).
  const ratioWeight = sugarParts / waterParts;
  const volumeFactor = 1 + (ratioWeight * 0.5);
  
  const requiredWaterPints = targetPints / volumeFactor;
  const requiredSugarLbs = requiredWaterPints * ratioWeight;

  // Formatting helpers
  const formatLbs = (lbs: number) => {
    return lbs.toLocaleString(undefined, { maximumFractionDigits: 1 });
  };
  
  const formatKg = (lbs: number) => {
    return (lbs * 0.453592).toLocaleString(undefined, { maximumFractionDigits: 1 });
  };

  const formatPintsToGallons = (p: number) => {
    if (p >= 8) return `${(p / 8).toFixed(2)} gal`;
    if (p >= 2) return `${(p / 2).toFixed(2)} qt`;
    return `${p.toFixed(2)} pt`;
  };

  const formatPintsToLiters = (p: number) => {
    return `${(p / 2.11338).toFixed(2)} L`;
  };

  const handleReset = () => {
    setTargetAmount(1);
    setUnit('gallons');
    setRatio('1:1');
    setCustomSugar(1);
    setCustomWater(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <SEO 
        title="Beekeeping Sugar Syrup Mixer | Rural Utility Cost"
        description="Calculate exact sugar and water amounts for feeding bees. Perfect for 1:1 spring syrup or 2:1 fall feeding."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Beekeeping Sugar Syrup Mixer",
          "description": "Calculate exact sugar and water amounts for feeding bees. Perfect for 1:1 spring syrup or 2:1 fall feeding.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-4">
          <Beaker className="w-8 h-8 text-blue-500" />
          Syrup Mix Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Calculate the exact amounts of granulated sugar and water needed to yield a specific volume of syrup for feeding your bees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-500" />
              Batch Requirements
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Total Volume
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(Number(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  >
                    <option value="gallons">Gallons</option>
                    <option value="quarts">Quarts</option>
                    <option value="liters">Liters</option>
                    <option value="pints">Pints</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">How much final syrup do you need?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mixing Ratio (Sugar : Water)
                </label>
                <select
                  value={ratio}
                  onChange={(e) => setRatio(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="1:1">1:1 (Spring feeding / stimulation)</option>
                  <option value="2:1">2:1 (Fall feeding / winter prep)</option>
                  <option value="custom">Custom Ratio</option>
                </select>
              </div>
            </div>

            {ratio === 'custom' && (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sugar Parts (Weight)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={customSugar}
                    onChange={(e) => setCustomSugar(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Water Parts (Weight)</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={customWater}
                    onChange={(e) => setCustomWater(Number(e.target.value) || 0.1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-blue-50 rounded-2xl shadow-sm border border-blue-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wide text-center">Mixing Instructions</h2>
            
            <div className="space-y-6">
              
              <div className="text-center bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Granulated Sugar</div>
                <div className="text-3xl font-black text-gray-900">
                  {formatLbs(requiredSugarLbs)} lbs
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  ({formatKg(requiredSugarLbs)} kg)
                </div>
              </div>

              <div className="flex justify-center items-center text-blue-300 font-black text-2xl">+</div>

              <div className="text-center bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Hot Water</div>
                <div className="text-3xl font-black text-blue-600">
                   {formatPintsToGallons(requiredWaterPints)}
                </div>
                <div className="text-sm text-blue-500/70 font-medium">
                  ({formatPintsToLiters(requiredWaterPints)})
                </div>
              </div>

              <div className="flex justify-center items-center text-blue-300 font-black text-2xl">=</div>

              <div className="text-center bg-blue-600 rounded-xl p-4 border border-blue-700 text-white shadow-sm">
                <div className="text-sm font-semibold text-blue-200 uppercase tracking-wide mb-1">Final Yield</div>
                <div className="text-xl font-bold">
                   {targetAmount} {unit}
                </div>
              </div>

            </div>

            <CalculatorSanityContent uniqueCode="CALC-FARM-306" />

          <div className="mt-8 bg-blue-100/60 rounded-xl p-4 flex gap-3 text-blue-800 text-sm leading-relaxed">
              <Info className="w-5 h-5 shrink-0 text-blue-500" />
              <p>
                Ratios are usually calculated by weight. Since 1 pint of water weighs approx 1 pound, this tool converts final liquid volume directly into pounds of sugar and measured volumes of water.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 w-full py-3 bg-white outline outline-1 outline-blue-200 hover:bg-blue-100 text-blue-900 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
