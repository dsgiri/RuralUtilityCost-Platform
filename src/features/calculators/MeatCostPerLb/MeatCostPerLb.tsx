import React, { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { Tag, Calculator, Info, RotateCcw } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function MeatCostPerLb() {
  const [animals, setAnimals] = useState(1);
  const [purchaseCost, setPurchaseCost] = useState(1200);
  const [feedCost, setFeedCost] = useState(800);
  const [processingCost, setProcessingCost] = useState(750);
  const [transportCost, setTransportCost] = useState(50);
  const [miscCost, setMiscCost] = useState(100);
  
  const [takeHomeWeightPerAnimal, setTakeHomeWeightPerAnimal] = useState(420);
  const [salePrice, setSalePrice] = useState(7.00);

  // Math
  const totalSunkCostPerAnimal = purchaseCost + feedCost + processingCost + transportCost + miscCost;
  const projectTotalCost = totalSunkCostPerAnimal * animals;
  
  const totalTakeHomeWeight = animals * takeHomeWeightPerAnimal;
  
  const breakEvenPerLb = totalTakeHomeWeight > 0 ? projectTotalCost / totalTakeHomeWeight : 0;
  
  const potentialRevenue = totalTakeHomeWeight * salePrice;
  const profit = potentialRevenue - projectTotalCost;
  const marginPct = potentialRevenue > 0 ? (profit / potentialRevenue) * 100 : 0;

  const handleReset = () => {
    setAnimals(1);
    setPurchaseCost(1200);
    setFeedCost(800);
    setProcessingCost(750);
    setTransportCost(50);
    setMiscCost(100);
    setTakeHomeWeightPerAnimal(420);
    setSalePrice(7.00);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <SEO 
        title="Cost Per Pound & Break-Even Calculator | Rural Utility Cost"
        description="Calculate your exact break-even cost per pound for livestock and determine target sale prices."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Cost Per Pound & Break-Even Calculator",
          "description": "Calculate your exact break-even cost per pound for livestock and determine target sale prices.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-4">
          <Tag className="w-8 h-8 text-emerald-600" />
          Cost Per Pound & Break-Even
        </h1>
        <p className="text-gray-600 text-lg">
          Know your numbers. Wrap all your total inputs (animal purchase, feed, butcher fees) into one place to find your true final cost per pound of take-home meat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              Sunk Costs (Per Animal)
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Animals
                </label>
                <input
                  type="number"
                  min="1"
                  value={animals}
                  onChange={(e) => setAnimals(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors bg-gray-50 max-w-[200px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Animal Purchase Cost ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={purchaseCost}
                  onChange={(e) => setPurchaseCost(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Feed Cost ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={feedCost}
                  onChange={(e) => setFeedCost(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Processing & Butcher Fees ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={processingCost}
                  onChange={(e) => setProcessingCost(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transport Costs ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={transportCost}
                  onChange={(e) => setTransportCost(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Misc Expenses ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={miscCost}
                  onChange={(e) => setMiscCost(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors sm:max-w-xs"
                />
                <p className="text-xs text-gray-500 mt-1">Vet bills, pasture rent apportioned, equipment wear.</p>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-4">Yield & Revenue Targets</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Est. Take-Home Meat (lbs/animal)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={takeHomeWeightPerAnimal}
                    onChange={(e) => setTakeHomeWeightPerAnimal(Number(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">Packaged freezer weight, not live weight.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Planned Sale Price ($/lb)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.05"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-green-300 bg-green-50 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter your target retail or bulk price to see profit.</p>
                </div>
              </div>
            </div>

            <CalculatorSanityContent uniqueCode="CALC-FARM-303" />

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Full Farm Budget</h3>
              <p className="text-gray-600 mb-4">
                Calculate livestock feed budgets, monitor breeding dates, and track your agricultural startup costs.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/farm-costs" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  Return to Farm & Livestock Hub
                </a>
                <a href="/livestock" className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700">
                  Calculate Feed Costs →
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#1a5f3f] rounded-2xl shadow-sm border border-[#144930] p-6 text-white sticky top-6">
            <h2 className="text-lg font-bold text-white/90 mb-4 uppercase tracking-wide text-center">Break-Even Data</h2>
            
            <div className="text-center mb-6">
              <div className="text-sm font-medium text-green-200 uppercase tracking-wide mb-1">Your True Cost</div>
              <div className="text-5xl font-black text-white mb-2">
                ${breakEvenPerLb.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-2xl font-semibold opacity-80">/lb</span>
              </div>
              <div className="text-green-200 text-sm font-medium">
                Total Expenses: ${projectTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="mb-6 bg-white rounded-xl p-4 text-center">
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Expected Profit</div>
              <div className={`text-3xl font-black ${profit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {profit >= 0 ? '+' : '-'}${Math.abs(profit).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className={`text-sm font-medium mt-1 ${profit >= 0 ? 'text-emerald-700/70' : 'text-red-500/70'}`}>
                {marginPct.toFixed(1)}% margin
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-green-700/50 text-sm">
              <div className="flex justify-between items-center text-green-50">
                <span>Total Yield:</span>
                <span className="font-semibold">{totalTakeHomeWeight.toLocaleString()} lbs</span>
              </div>
              <div className="flex justify-between items-center text-green-50">
                <span>Revenue at ${salePrice.toFixed(2)}:</span>
                <span className="font-semibold">${potentialRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>

            <div className="mt-8 bg-green-900/30 rounded-xl p-4 flex gap-3 text-green-100 text-sm leading-relaxed">
              <Info className="w-5 h-5 shrink-0 text-green-300" />
              <p>
                This calculation assumes all meat is sold at the flat <b>Planned Sale Price</b> per pound. Retail sales of specific cuts will average out differently than selling half/whole shares.
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
      
      <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm print:hidden">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Formula & Assumptions</h2>
        <div className="space-y-4 text-sm text-gray-600">
          <p><strong>Logic:</strong> This calculator aggregates all input costs associated with raising an animal from purchase to freezer.</p>
          <p><code>Total Cost = Purchase Cost + Feed + Processing + Transport + Misc</code></p>
          <p><code>Break-Even Per Lb = Total Cost ÷ Total Take-Home Yield (lbs)</code></p>
          <p><strong>Assumption:</strong> The "Take-Home Yield" refers to the boxed, wrapped weight you put in the freezer or sell to the customer, not the live weight or hanging weight. The profit calculation assumes 100% of the take-home yield is sold at your stated average price.</p>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm print:hidden">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is my break-even cost so high?</h3>
            <p className="text-gray-600">
              When farmers first run these numbers, they are often shocked at how high their true break-even cost is. Processing fees usually account for a massive chunk of the final cost, and small-scale producers often pay retail prices for feed.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I charge based on hanging weight or packaged weight?</h3>
            <p className="text-gray-600">
              It depends on your business model. Selling "freezer beef" (halves or quarters) is legally required in many states to be sold by the <em>hanging weight</em> prior to processing. However, if you are selling individual cuts at a farmers market (which requires USDA processing), you must price based on the <em>packaged weight</em>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
