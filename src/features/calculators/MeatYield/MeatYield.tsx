import React, { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { Scale, Calculator, Info, RotateCcw } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function MeatYield() {
  const [species, setSpecies] = useState('Beef');
  const [weightBasis, setWeightBasis] = useState('Live'); // 'Live' or 'Hanging'
  const [weight, setWeight] = useState(1200);
  const [dressingPct, setDressingPct] = useState(60);
  const [shrinkPct, setShrinkPct] = useState(3);
  const [cuttingPct, setCuttingPct] = useState(60);

  const handleSpeciesChange = (newSpecies: string) => {
    setSpecies(newSpecies);
    if (newSpecies === 'Beef') {
      setWeight(1200);
      setDressingPct(60);
      setCuttingPct(60);
    } else {
      setWeight(280);
      setDressingPct(72);
      setCuttingPct(75);
    }
  };

  // Math Setup
  const liveWeight = weightBasis === 'Live' ? weight : (weight / Math.max(0.01, (dressingPct / 100)));
  const hangingWeight = weightBasis === 'Live' ? weight * (dressingPct / 100) : weight;
  
  const postShrinkWeight = hangingWeight * (1 - (shrinkPct / 100));
  const takeHomeMeat = postShrinkWeight * (cuttingPct / 100);
  
  const shrinkLoss = hangingWeight - postShrinkWeight;
  const cuttingLoss = postShrinkWeight - takeHomeMeat;
  const totalDifference = hangingWeight - takeHomeMeat;

  const handleReset = () => {
    setWeightBasis('Live');
    handleSpeciesChange(species);
    setShrinkPct(3);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <SEO 
        title="Take-Home Meat Yield Calculator | Rural Utility Cost"
        description="Estimate how much packaged meat you can expect from a live animal or hanging weight for beef and pork."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Take-Home Meat Yield Calculator",
          "description": "Estimate how much packaged meat you can expect from a live animal or hanging weight for beef and pork.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-4">
          <Scale className="w-8 h-8 text-rose-600" />
          Take-Home Meat Yield
        </h1>
        <p className="text-gray-600 text-lg">
          Estimate how much packaged meat you will actually bring home. Breed, finishing condition, and cutting preferences (bone-in vs boneless) will affect your final yield.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-rose-600" />
              Animal Profile
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Species
                </label>
                <select
                  value={species}
                  onChange={(e) => handleSpeciesChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
                >
                  <option value="Beef">Beef Cattle</option>
                  <option value="Pork">Hog / Pork</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight Basis
                </label>
                <select
                  value={weightBasis}
                  onChange={(e) => setWeightBasis(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
                >
                  <option value="Live">Live Weight (On the hoof)</option>
                  <option value="Hanging">Hanging Weight (Carcass)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entered Weight (lbs)
                </label>
                <input
                  type="number"
                  min="0"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide border-b border-gray-100 pb-2 mb-4 mt-8">Yield Assumptions</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className={weightBasis === 'Hanging' ? 'opacity-50 pointer-events-none' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dressing (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={dressingPct}
                  onChange={(e) => setDressingPct(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Live to Hanging</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cooler Shrink (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={shrinkPct}
                  onChange={(e) => setShrinkPct(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Water loss in cooler</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cutting Yield (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={cuttingPct}
                  onChange={(e) => setCuttingPct(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Meat kept after trim/bone</p>
              </div>
            </div>

          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-rose-50 rounded-2xl shadow-sm border border-rose-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-rose-900 mb-4 uppercase tracking-wide text-center">Estimated Take-Home Meat</h2>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-rose-600 mb-2">
                {takeHomeMeat.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-2xl">lbs</span>
              </div>
              <div className="text-rose-700/80 text-sm font-medium mt-2 bg-white/60 py-1.5 px-3 rounded-md inline-block">
                ~{(takeHomeMeat / 2).toLocaleString(undefined, { maximumFractionDigits: 0 })} lbs per half
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-rose-200 text-sm">
              <div className="flex justify-between items-center text-rose-900/80">
                <span>Live Weight:</span>
                <span className="font-semibold">{weightBasis === 'Live' ? weight.toLocaleString() : liveWeight.toLocaleString(undefined, { maximumFractionDigits: 0 })} lbs</span>
              </div>
              <div className="flex justify-between items-center text-rose-900/80">
                <span>Hanging Weight:</span>
                <span className="font-semibold">{hangingWeight.toLocaleString(undefined, { maximumFractionDigits: 0 })} lbs</span>
              </div>
              
              <div className="pt-2 mt-2 border-t border-rose-200/50">
                <div className="flex justify-between items-center text-rose-900/60 pb-1">
                  <span>Cooler Shrink:</span>
                  <span>-{shrinkLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })} lbs</span>
                </div>
                <div className="flex justify-between items-center text-rose-900/60">
                  <span>Fat Trim & Bone:</span>
                  <span>-{cuttingLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })} lbs</span>
                </div>
              </div>
            </div>

            <CalculatorSanityContent uniqueCode="CALC-FARM-301" />

          <div className="mt-8 bg-rose-100/60 rounded-xl p-4 flex gap-3 text-rose-800 text-sm leading-relaxed">
              <Info className="w-5 h-5 shrink-0 text-rose-500" />
              <p>
                Highly trimmed, boneless cuts produce less total weight but yield more pure meat. Bone-in cuts increase your final boxed weight.
              </p>
            </div>

          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8 print:hidden">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Formula & Assumptions</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <p><strong>Logic:</strong> <code>Hanging Weight = Live Weight × Dressing Percentage</code>, <code>Take Home Meat = (Hanging Weight - Cooler Shrink) × Cutting Yield</code>.</p>
            <p><strong>Dressing Percentage:</strong> The percentage of the live animal that remains after slaughter and removal of the hide, head, hooves, and internal organs. Beef typically dresses at 60%, hogs at 72%.</p>
            <p><strong>Cutting Yield:</strong> The percentage of the hanging weight that becomes packaged meat. This drops significantly if you request mostly boneless cuts and lean ground meat (meaning more bone and fat is discarded).</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why did I get so little meat back?</h3>
              <p className="text-gray-600 mb-2">
                A 1,200 lb steer only yields about 430 lbs of take-home meat. You lose roughly 40% immediately at slaughter (hide, head, organs). You lose another 3-5% to moisture evaporation while the carcass ages in the cooler. Finally, you lose another 30-40% of the remaining weight to bones and fat trim during cutting.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I increase my take-home weight?</h3>
              <p className="text-gray-600 mb-2">
                Ask your butcher for bone-in cuts (like T-bones instead of NY Strips/Filets), keep the brisket and ribs, and ask to keep organ meats (liver, heart, tongue) and soup bones.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
