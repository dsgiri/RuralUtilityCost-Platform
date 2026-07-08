import React, { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { Scissors, Calculator, Info, RotateCcw } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function MeatProcessing() {
  const [animals, setAnimals] = useState(1);
  const [weightPerAnimal, setWeightPerAnimal] = useState(720);
  
  const [slaughterFee, setSlaughterFee] = useState(100);
  const [cutWrapPerLb, setCutWrapPerLb] = useState(0.85);
  const [disposalFee, setDisposalFee] = useState(20);
  const [transportFee, setTransportFee] = useState(50);
  const [otherFees, setOtherFees] = useState(0);

  // Math
  const totalHangingWeight = animals * weightPerAnimal;
  const totalSlaughter = animals * slaughterFee;
  const totalDisposal = animals * disposalFee;
  const totalCutWrap = totalHangingWeight * cutWrapPerLb;
  
  const totalProcessingCost = totalSlaughter + totalCutWrap + totalDisposal + transportFee + otherFees;
  const costPerAnimal = animals > 0 ? totalProcessingCost / animals : 0;
  const costPerLbHanging = totalHangingWeight > 0 ? totalProcessingCost / totalHangingWeight : 0;

  const handleReset = () => {
    setAnimals(1);
    setWeightPerAnimal(720);
    setSlaughterFee(100);
    setCutWrapPerLb(0.85);
    setDisposalFee(20);
    setTransportFee(50);
    setOtherFees(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <SEO 
        title="Meat Processing Cost Calculator | Rural Utility Cost"
        description="Estimate butchering and processing costs for livestock based on hanging weight and standard processor fees."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Meat Processing Cost Calculator",
          "description": "Estimate butchering and processing costs for livestock based on hanging weight and standard processor fees.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-4">
          <Scissors className="w-8 h-8 text-orange-600" />
          Processing Cost Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Estimate total processor fees for butchering, cutting, and wrapping your livestock. Most butchers charge a flat slaughter fee plus a per-pound rate on the hanging weight.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-600" />
              Weight & Animal Count
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Animals
                </label>
                <input
                  type="number"
                  min="1"
                  value={animals}
                  onChange={(e) => setAnimals(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Est. Hanging Weight (per head)
                </label>
                <input
                  type="number"
                  min="0"
                  value={weightPerAnimal}
                  onChange={(e) => setWeightPerAnimal(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">If unknown, use 60% of live weight for beef.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scissors className="w-5 h-5 text-orange-600" />
              Fee Structure
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slaughter / Kill Fee ($/head)
                </label>
                <input
                  type="number"
                  min="0"
                  value={slaughterFee}
                  onChange={(e) => setSlaughterFee(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cut & Wrap ($/lb)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.05"
                  value={cutWrapPerLb}
                  onChange={(e) => setCutWrapPerLb(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Usually charges against hanging weight.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disposal / Hide Fee ($/head)
                </label>
                <input
                  type="number"
                  min="0"
                  value={disposalFee}
                  onChange={(e) => setDisposalFee(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transport to Butcher (Total $)
                </label>
                <input
                  type="number"
                  min="0"
                  value={transportFee}
                  onChange={(e) => setTransportFee(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2 mt-2 pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other / Specialty Curing Fees (Total $)
                </label>
                <input
                  type="number"
                  min="0"
                  value={otherFees}
                  onChange={(e) => setOtherFees(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">E.g., smoking bacon, making sausage links, specific labeling, or USDA inspection marks.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-orange-50 rounded-2xl shadow-sm border border-orange-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-orange-900 mb-4 uppercase tracking-wide text-center">Processing Total</h2>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-orange-600 mb-2">
                ${totalProcessingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-orange-700/80 text-sm font-medium mt-2 bg-white/60 py-1.5 px-3 rounded-md inline-block">
                ${costPerAnimal.toLocaleString(undefined, { maximumFractionDigits: 0 })} avg. per head
              </div>
            </div>

            <div className="mb-6 bg-white rounded-xl p-4 border border-orange-100 text-center">
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Cost Per Hanging Lb</div>
              <div className="text-2xl font-bold text-gray-900">
                ${costPerLbHanging.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / lb
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-orange-200 text-sm">
              <div className="flex justify-between items-center text-orange-900/80">
                <span>Slaughter Fees:</span>
                <span className="font-semibold">${totalSlaughter.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div className="flex justify-between items-center text-orange-900/80">
                <span>Cut & Wrap:</span>
                <span className="font-semibold">${totalCutWrap.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div className="flex justify-between items-center text-orange-900/80">
                <span>Extras & Disposals:</span>
                <span className="font-semibold">${(totalDisposal + transportFee + otherFees).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>

            <div className="mt-8 bg-orange-100/60 rounded-xl p-4 flex gap-3 text-orange-800 text-sm leading-relaxed">
              <Info className="w-5 h-5 shrink-0 text-orange-500" />
              <p>
                Value-added cuts (like formed patties or smoked meats) typically add an extra per-pound charge on top of standard cut-and-wrap fees.
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
      
      <CalculatorSanityContent uniqueCode="CALC-FARM-302" />

      <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm print:hidden">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Formula & Assumptions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Understanding Hanging Weight:</h4>
            <p>Processing fees are almost always calculated based on <strong>hanging weight</strong> (the weight of the carcass after slaughter and removal of head, hide, and offal), not the live weight.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-orange-500">
              <li>Beef hanging weight is generally <strong>~60%</strong> of live weight.</li>
              <li>Hog hanging weight is generally <strong>~70%</strong> of live weight.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Typical Fee Structures:</h4>
            <ul className="list-disc pl-5 space-y-1 marker:text-orange-500">
              <li><strong>Slaughter Fee:</strong> A flat rate charged per head to kill, bleed, skin, and split the animal.</li>
              <li><strong>Cut & Wrap:</strong> A per-pound fee (based on hanging weight) for aging, cutting into steaks/roasts, and vacuum or paper wrapping.</li>
              <li><strong>Hidden Fees:</strong> Be sure to account for disposal (offal removal), split fees (if dividing an animal between buyers), and transportation.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 print:hidden">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between hanging weight and boxed weight?</h3>
            <p className="text-gray-600 mb-2">
              Hanging weight is the carcass weight before it is cut into individual steaks and roasts. Boxed weight (or yield weight) is the final amount of meat you take home for the freezer. Because of bone removal and fat trimming during the cut-and-wrap process, boxed weight is typically 60-65% of the hanging weight.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Are cured and smoked meats included in the standard cut-and-wrap fee?</h3>
            <p className="text-gray-600 mb-2">
              Generally, no. Value-added processes like making sausages, smoking bacon, or curing hams usually incur an additional per-pound fee on top of the base cut-and-wrap charge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
