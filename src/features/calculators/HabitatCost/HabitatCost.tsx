import { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { Leaf, Trees, Sprout, Tractor, AlertTriangle, ShieldCheck } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function HabitatCost() {
  const [acres, setAcres] = useState<number>(5);
  const [habitatType, setHabitatType] = useState<string>('pollinator');
  const [currentCover, setCurrentCover] = useState<string>('pasture');
  const [plantingMethod, setPlantingMethod] = useState<string>('diy');
  const [needsProtection, setNeedsProtection] = useState<boolean>(true);

  // --- Calculations ---
  
  // 1. Site Prep Costs (per acre)
  let prepCostPerAcre = 0;
  if (currentCover === 'bare') prepCostPerAcre = 50; // simple leveling/harrowing
  if (currentCover === 'pasture') prepCostPerAcre = 150; // herbicide + no-till drilling or disking
  if (currentCover === 'brush') prepCostPerAcre = 600; // brush hogging, clearing woody debris, herbicide

  const totalPrepCost = prepCostPerAcre * acres;

  // 2. Materials (Seed/Trees per acre)
  let materialsCostPerAcre = 0;
  let materialsLabel = '';
  if (habitatType === 'pollinator') {
    materialsCostPerAcre = 400; // High diversity native seed mix
    materialsLabel = 'Native Seed Mix (Pollinator/Meadow)';
  } else if (habitatType === 'forest') {
    materialsCostPerAcre = 600; // Bare root seedlings (approx 400-500 per acre @ $1.50 ea)
    materialsLabel = 'Bare Root Seedlings (Hardwoods/Conifers)';
  } else if (habitatType === 'riparian') {
    materialsCostPerAcre = 800; // Wetland seed mix + live stakes / specialized trees
    materialsLabel = 'Riparian Seed Mix & Live Stakes';
  }

  const totalMaterialsCost = materialsCostPerAcre * acres;

  // 3. Labor / Installation
  let laborCost = 0;
  if (plantingMethod === 'diy') {
    // Tractor/Drill rental for a weekend = ~$500 base + fuel
    laborCost = 500 + (acres * 25);
  } else {
    // Hired crew
    if (habitatType === 'pollinator') laborCost = acres * 250; // Custom seeding contractor
    else laborCost = acres * 600; // Hand planting trees is labor intensive
  }

  // 4. Protection (Tree tubes, deer fencing, or temporary electric)
  let protectionCost = 0;
  if (needsProtection) {
    if (habitatType === 'forest' || habitatType === 'riparian') {
      // Tree tubes and stakes for 400 trees per acre at $4 per setup
      protectionCost = acres * 1600;
    } else {
      // Temporary protective fencing or companion cover crop for meadow
      protectionCost = acres * 150; 
    }
  }

  const totalCost = totalPrepCost + totalMaterialsCost + laborCost + protectionCost;
  const costPerAcre = totalCost / acres;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800" id="calculator-content">
      <SEO 
        title="Habitat Restoration Cost Estimator | Pollinator & Forests"
        description="Estimate the cost to convert rural land into native habitat, including pollinator meadows, hardwood forests, and riparian buffers."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Habitat Restoration Cost Estimator",
          "description": "Estimate the cost to convert rural land into native habitat, including pollinator meadows, hardwood forests, and riparian buffers.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="p-6 md:p-8 flex-grow overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Habitat Restoration Cost</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Estimate site prep, seed, planting, and protection costs for converting rural acreage into native wildlife habitat.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Input Form Column */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-5">Project Scope</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Project Size (Acres)</label>
                    <input 
                      type="number" 
                      min="0.1" step="0.1"
                      value={acres} 
                      onChange={(e) => setAcres(Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Target Habitat Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => setHabitatType('pollinator')}
                        className={`p-3 rounded-xl border text-sm font-semibold flex flex-col items-center gap-2 transition-colors ${
                          habitatType === 'pollinator' 
                            ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-700 dark:text-amber-400' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <Sprout className="w-6 h-6" />
                        Pollinator Meadow
                      </button>
                      <button
                        onClick={() => setHabitatType('forest')}
                        className={`p-3 rounded-xl border text-sm font-semibold flex flex-col items-center gap-2 transition-colors ${
                          habitatType === 'forest' 
                            ? 'bg-[#1a5f3f]/10 border-[#1a5f3f] text-[#1a5f3f] dark:text-[#6ee7b7]' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <Trees className="w-6 h-6" />
                        Hardwood/Conifer Forest
                      </button>
                      <button
                        onClick={() => setHabitatType('riparian')}
                        className={`p-3 rounded-xl border text-sm font-semibold flex flex-col items-center gap-2 transition-colors ${
                          habitatType === 'riparian' 
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <Leaf className="w-6 h-6" />
                        Riparian/Wetland Buffer
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-2 pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Current Site Condition (Prep Required)</label>
                    <select 
                      value={currentCover}
                      onChange={(e) => setCurrentCover(e.target.value)}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                    >
                      <option value="bare">Bare Dirt / Prepped Agricultural Field</option>
                      <option value="pasture">Existing Pasture / Turf Grass (Requires termination)</option>
                      <option value="brush">Heavy Brush / Overgrown (Requires clearing & mowing)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Labor & Installation Method</label>
                    <select 
                      value={plantingMethod}
                      onChange={(e) => setPlantingMethod(e.target.value)}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                    >
                      <option value="diy">DIY (Rent tractor/drill, plant by hand)</option>
                      <option value="contractor">Hired Professional Restoration Crew</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={needsProtection} 
                        onChange={(e) => setNeedsProtection(e.target.checked)} 
                        className="w-5 h-5 mt-0.5 text-[#1a5f3f] bg-gray-100 border-gray-300 rounded focus:ring-[#1a5f3f]" 
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white block">Add Wildlife Protection</span>
                        <span className="text-xs text-gray-500">Includes tree tubes, stakes, or temporary fencing to protect young plants from deer and rodents.</span>
                      </div>
                    </label>
                  </div>

                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-5 rounded-xl flex gap-4">
                <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-tight mb-1">Offset Costs with Grants</h4>
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">
                    The USDA Natural Resources Conservation Service (NRCS) Environmental Quality Incentives Program (EQIP) often pays for <strong>50% to 90%</strong> of these exact habitat restoration costs. <a href="/grant-finder" className="underline font-bold hover:text-emerald-900">Check our Grant Finder</a> to see what you qualify for.
                  </p>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-1 space-y-6">
              
              <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden sticky top-6">
                <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Cost Estimate</h2>
                
                <div className="mb-6">
                  <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Estimated Total Cost</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                      ${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium mt-1">${costPerAcre.toLocaleString(undefined, { maximumFractionDigits: 0 })} per acre</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Site Preparation</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${totalPrepCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Materials (Seed/Trees)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${totalMaterialsCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Labor / Equipment</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${laborCost.toLocaleString()}</span>
                  </div>
                  {needsProtection && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Wildlife Protection</span>
                      <span className="font-semibold text-gray-900 dark:text-white">${protectionCost.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight mb-2">Material Summary ({acres} Ac)</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {materialsLabel}
                  </p>
                  {habitatType === 'forest' && (
                    <p className="text-xs text-gray-500 mt-1">Approx. {Math.round(acres * 400).toLocaleString()} seedlings at 10x10 spacing.</p>
                  )}
                  {habitatType === 'pollinator' && (
                    <p className="text-xs text-gray-500 mt-1">Approx. {Math.round(acres * 5)} lbs of high-diversity PLS (Pure Live Seed).</p>
                  )}
                </div>

                <div className="mt-6">
                  <CalculatorSanityContent uniqueCode="CALC-FARM-307" />

              <ExportActions 
                    title="Habitat Cost Estimator"
                    data={{
                  ...{  acres, habitatType, currentCover, plantingMethod, needsProtection  },
                  ...{  totalPrepCost, totalMaterialsCost, laborCost, protectionCost, totalCost  }
                }}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-6">Restoring Rural Land Effectively</h2>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p>Converting agricultural land or overgrown brush into a thriving native ecosystem is a multi-year process. The biggest mistake landowners make is rushing the site preparation phase, leading to expensive native seed being outcompeted by invasive weeds.</p>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Site Preparation is Everything</h3>
              <p>If you are converting an existing pasture (dominated by fescue or bermudagrass), you typically need a full year of site prep. This involves multiple applications of herbicide or intensive solarization/tilling to deplete the weed seed bank before you ever drill your native seed. Without this, your $400/acre pollinator seed will fail.</p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Protecting Your Investment</h3>
              <p>When planting bare-root tree seedlings, deer and rodent browsing are the primary causes of mortality. Spending $4 per tree on a vented tree tube and oak stake seems expensive upfront, but it dramatically increases survival rates from 30% to over 85%, while also acting as a mini-greenhouse that accelerates early growth.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
