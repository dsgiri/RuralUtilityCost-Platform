import React, { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { Droplet, Info, RotateCcw, Calculator } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function HoneyYield() {
  const [colonies, setColonies] = useState(2);
  const [honeyPerHive, setHoneyPerHive] = useState(40);
  const [harvests, setHarvests] = useState(1);
  const [successFactor, setSuccessFactor] = useState(90);
  
  const [pricePerLb, setPricePerLb] = useState(10);
  const [reservePct, setReservePct] = useState(0);

  // Math
  const totalPotential = colonies * honeyPerHive * harvests;
  const yieldAfterLoss = totalPotential * (successFactor / 100);
  const reservedAmount = yieldAfterLoss * (reservePct / 100);
  const netHarvest = Math.max(0, yieldAfterLoss - reservedAmount);
  
  const estimatedRevenue = netHarvest * pricePerLb;
  const averagePerHive = colonies > 0 ? netHarvest / colonies : 0;

  const handleReset = () => {
    setColonies(2);
    setHoneyPerHive(40);
    setHarvests(1);
    setSuccessFactor(90);
    setPricePerLb(10);
    setReservePct(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <SEO 
        title="Honey Yield & Revenue Calculator | Rural Utility Cost"
        description="Estimate your apiary's honey production and potential revenue. Adjust for colony survival, winter reserves, and market prices."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Honey Yield & Revenue Calculator",
          "description": "Estimate your apiary's honey production and potential revenue. Adjust for colony survival, winter reserves, and market prices.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-4">
          <Droplet className="w-8 h-8 text-amber-500" />
          Honey Yield Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Estimate your expected honey harvest and potential revenue. Honey production depends heavily on local forage, weather, and management techniques.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-500" />
              Apiary Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Producing Colonies
                </label>
                <input
                  type="number"
                  min="0"
                  value={colonies}
                  onChange={(e) => setColonies(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Hives strong enough to pull a surplus.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Est. Yield per Hive (lbs)
                </label>
                <input
                  type="number"
                  min="0"
                  value={honeyPerHive}
                  onChange={(e) => setHoneyPerHive(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Average is 30-60 lbs for beginners.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Harvests/Year
                </label>
                <input
                  type="number"
                  min="1"
                  value={harvests}
                  onChange={(e) => setHarvests(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Success Factor (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={successFactor}
                  onChange={(e) => setSuccessFactor(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Accounts for weak hives or swarms.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-amber-500" />
              Adjustments & Revenue
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reserve for Bees (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={reservePct}
                  onChange={(e) => setReservePct(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Percent of surplus left for winter.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Market Price ($/lb)
                </label>
                <input
                  type="number"
                  min="0"
                  value={pricePerLb}
                  onChange={(e) => setPricePerLb(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">If selling your harvest.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-amber-50 rounded-2xl shadow-sm border border-amber-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-amber-900 mb-4 uppercase tracking-wide text-center">Net Harvest Estimate</h2>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-amber-600 mb-2">
                {netHarvest.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-3xl">lbs</span>
              </div>
              <div className="text-amber-700 text-sm font-medium">
                ~{averagePerHive.toLocaleString(undefined, { maximumFractionDigits: 1 })} lbs per hive
              </div>
            </div>

            {pricePerLb > 0 && (
              <div className="mb-6 bg-white rounded-xl p-4 border border-amber-100 text-center">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Estimated Revenue</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${estimatedRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
            )}

            <div className="space-y-3 pt-4 border-t border-amber-200 text-sm">
              <div className="flex justify-between items-center text-amber-900/80">
                <span>Total Potential:</span>
                <span className="font-semibold">{totalPotential.toLocaleString()} lbs</span>
              </div>
              <div className="flex justify-between items-center text-amber-900/80">
                <span>Loss Adj ({100-successFactor}%):</span>
                <span className="font-semibold">-{Math.round(totalPotential - yieldAfterLoss).toLocaleString()} lbs</span>
              </div>
              <div className="flex justify-between items-center text-amber-900/80">
                <span>Reserve Set Aside:</span>
                <span className="font-semibold">-{Math.round(reservedAmount).toLocaleString()} lbs</span>
              </div>
            </div>

            <CalculatorSanityContent uniqueCode="CALC-FARM-305" />

          <div className="mt-8 bg-amber-100/50 rounded-xl p-4 flex gap-3 text-amber-800 text-sm leading-relaxed">
              <Info className="w-5 h-5 shrink-0 text-amber-500" />
              <p>
                First-year hives often produce little to no surplus honey as they build out comb. These estimates are intended for established hives in a typical season.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 w-full py-3 bg-white outline outline-1 outline-amber-200 hover:bg-amber-100 text-amber-900 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
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
