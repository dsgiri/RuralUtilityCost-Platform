import React, { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { Hexagon, Calculator, Info, RotateCcw } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function HiveStartup() {
  const [hives, setHives] = useState(2);
  const [hiveKitCost, setHiveKitCost] = useState(200);
  const [beeCost, setBeeCost] = useState(150);
  const [gearCost, setGearCost] = useState(150);
  const [toolCost, setToolCost] = useState(60);
  const [feederCost, setFeederCost] = useState(15);
  const [treatmentCost, setTreatmentCost] = useState(30);
  const [shippingCost, setShippingCost] = useState(50);
  const [extraCost, setExtraCost] = useState(0);
  const [contingencyPct, setContingencyPct] = useState(10);

  // Math
  const totalPerHiveCost = hiveKitCost + beeCost + feederCost;
  const totalFixedCost = gearCost + toolCost + treatmentCost + shippingCost + extraCost;
  const subtotal = (totalPerHiveCost * hives) + totalFixedCost;
  const contingencyAmt = subtotal * (contingencyPct / 100);
  const grandTotal = subtotal + contingencyAmt;
  const averagePerHive = hives > 0 ? grandTotal / hives : 0;

  const handleReset = () => {
    setHives(2);
    setHiveKitCost(200);
    setBeeCost(150);
    setGearCost(150);
    setToolCost(60);
    setFeederCost(15);
    setTreatmentCost(30);
    setShippingCost(50);
    setExtraCost(0);
    setContingencyPct(10);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <SEO 
        title="Hive Startup Cost Calculator | Rural Utility Cost"
        description="Estimate the initial cost of starting beekeeping. Plan your budget for hives, bees, tools, and gear."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Hive Startup Cost Calculator",
          "description": "Estimate the initial cost of starting beekeeping. Plan your budget for hives, bees, tools, and gear.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-4">
          <Hexagon className="w-8 h-8 text-[#1a5f3f]" />
          Hive Startup Cost Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Estimate the initial cost of starting your beekeeping journey. It is highly recommended to start with at least two hives so you can compare them and share resources if one struggles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#1a5f3f]" />
              Startup Details
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  How many hives? (Colonies)
                </label>
                <input
                  type="number"
                  min="1"
                  value={hives}
                  onChange={(e) => setHives(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Starting with 2 is the standard recommendation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-4 border-t sm:border-t-0 sm:border-r border-gray-100 pt-4 sm:pt-0 sm:pr-5">
                  <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Per-Hive Costs</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost per Hive Kit ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={hiveKitCost}
                      onChange={(e) => setHiveKitCost(Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] focus:border-transparent transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Boxes, frames, foundation, bottom board, cover.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bee Package / Nuc Cost ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={beeCost}
                      onChange={(e) => setBeeCost(Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Feeder Cost ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={feederCost}
                      onChange={(e) => setFeederCost(Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 sm:pt-0 sm:pl-5 border-t sm:border-t-0 border-gray-100">
                  <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">One-Time / Shared Costs</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Protective Gear ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={gearCost}
                      onChange={(e) => setGearCost(Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] focus:border-transparent transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Suit, jacket, or veil, and gloves.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Basic Tools ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={toolCost}
                      onChange={(e) => setToolCost(Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] focus:border-transparent transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Smoker, hive tool, bee brush.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Treatments / Meds ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={treatmentCost}
                      onChange={(e) => setTreatmentCost(Number(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] focus:border-transparent transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Mite treatments, supplements.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipping ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(Number(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Extras ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={extraCost}
                    onChange={(e) => setExtraCost(Number(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contingency (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={contingencyPct}
                    onChange={(e) => setContingencyPct(Number(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f3f] focus:border-transparent transition-colors"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#1a5f3f] rounded-2xl shadow-sm border border-[#144930] p-6 text-white sticky top-6">
            <h2 className="text-lg font-bold text-white/90 mb-4 uppercase tracking-wide text-center">Estimated Startup Total</h2>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-white mb-2">
                ${grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-green-200 text-sm font-medium">
                ${averagePerHive.toLocaleString(undefined, { maximumFractionDigits: 0 })} average per hive
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-green-700/50 text-sm">
              <div className="flex justify-between items-center text-green-50">
                <span>Per-Hive Subs ({hives}):</span>
                <span className="font-semibold">${(totalPerHiveCost * hives).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-green-50">
                <span>Shared / Fixed:</span>
                <span className="font-semibold">${totalFixedCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-green-50">
                <span>Contingency ({contingencyPct}%):</span>
                <span className="font-semibold">${contingencyAmt.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>

            <CalculatorSanityContent uniqueCode="CALC-FARM-304" />

          <div className="mt-8 bg-green-900/30 rounded-xl p-4 flex gap-3 text-green-100 text-sm leading-relaxed">
              <Info className="w-5 h-5 shrink-0 text-green-300" />
              <p>
                These are estimates. Prices vary significantly based on equipment types (unassembled vs fully painted) and your location. Honey extraction equipment is not included here, as it's typically a second-year purchase or rented from a local club.
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
