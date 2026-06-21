import { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { Map, DollarSign, Search, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

type Mode = 'buy' | 'sell';

export default function RuralLand() {
  const [mode, setMode] = useState<Mode>('sell');

  // --- SELL LAND STATE ---
  const [acres, setAcres] = useState<number>(10);
  const [pricePerAcre, setPricePerAcre] = useState<number>(5000);
  const [accessType, setAccessType] = useState<string>('paved');
  const [hasPower, setHasPower] = useState<boolean>(true);
  const [hasWater, setHasWater] = useState<boolean>(false);
  const [hasWell, setHasWell] = useState<boolean>(false);
  const [hasSeptic, setHasSeptic] = useState<boolean>(false);
  const [hasFenced, setHasFenced] = useState<boolean>(false);
  const [brokerFeePercent, setBrokerFeePercent] = useState<number>(6);
  const [closingCosts, setClosingCosts] = useState<number>(1500);

  // Sell Calculations
  let accessMultiplier = 1;
  let accessLabel = "";
  if (accessType === 'paved') { accessMultiplier = 1.1; accessLabel = "Paved Road (+10%)"; }
  if (accessType === 'dirt') { accessMultiplier = 1.0; accessLabel = "Dirt/Gravel Road (Base)"; }
  if (accessType === 'easement') { accessMultiplier = 0.85; accessLabel = "Deeded Easement (-15%)"; }
  if (accessType === 'landlocked') { accessMultiplier = 0.5; accessLabel = "Landlocked (-50%)"; }

  const baseValue = acres * pricePerAcre;
  let adjustedValue = baseValue * accessMultiplier;
  
  if (hasPower) adjustedValue *= 1.05;
  if (hasWater) adjustedValue *= 1.05;
  
  let improvementsValue = 0;
  if (hasWell) improvementsValue += 8000;
  if (hasSeptic) improvementsValue += 6000;
  if (hasFenced) improvementsValue += (acres * 300); // rough estimate per acre fencing value

  const totalAskingPrice = adjustedValue + improvementsValue;
  const brokerFee = totalAskingPrice * (brokerFeePercent / 100);
  const netProceeds = totalAskingPrice - brokerFee - closingCosts;

  const sellingPoints = [];
  if (accessType === 'paved') sellingPoints.push("Paved road access is highly desirable for residential buyers.");
  if (hasPower || hasWater) sellingPoints.push("Existing utility access significantly lowers buyer friction.");
  if (hasWell || hasSeptic) sellingPoints.push("Ready-to-build improvements (Well/Septic) command a premium.");
  if (hasFenced) sellingPoints.push("Existing fencing is attractive for agricultural or livestock buyers.");
  if (sellingPoints.length === 0) sellingPoints.push("Raw land format provides a blank canvas for buyers.");

  // --- BUY LAND STATE ---
  const [intendedUse, setIntendedUse] = useState<string>('homesite');
  const [legalAccess, setLegalAccess] = useState<string>('yes');
  const [powerProximity, setPowerProximity] = useState<string>('nearby');
  const [waterAccess, setWaterAccess] = useState<string>('well_needed');
  const [topography, setTopography] = useState<string>('flat');
  const [zoningOkay, setZoningOkay] = useState<string>('yes');

  // Buy Calculations
  let suitabilityScore = 100;
  let addedCosts = 0;
  const riskFlags: string[] = [];

  // Legal Access
  if (legalAccess === 'no') {
    suitabilityScore -= 40;
    riskFlags.push("No legal access (Landlocked). Securing an easement could take months and thousands in legal fees.");
    addedCosts += 15000;
  } else if (legalAccess === 'unsure') {
    suitabilityScore -= 20;
    riskFlags.push("Unverified access. A survey and title search are strictly required before closing.");
    addedCosts += 2500;
  }

  // Power
  if (powerProximity === 'far') {
    if (intendedUse === 'homesite' || intendedUse === 'farm') {
      suitabilityScore -= 20;
      riskFlags.push("No nearby power. Running power poles or installing an off-grid solar system is expensive.");
      addedCosts += 25000;
    }
  } else if (powerProximity === 'nearby') {
    addedCosts += 5000; // standard drop
  }

  // Water
  if (waterAccess === 'no_water') {
    if (intendedUse === 'homesite' || intendedUse === 'farm') {
      suitabilityScore -= 30;
      riskFlags.push("No water source and unsuitable for well. Hauling water or catchment is the only option.");
      addedCosts += 10000; // catchment system
    }
  } else if (waterAccess === 'well_needed') {
    addedCosts += 12000; // est drilling
  }

  // Topography
  if (topography === 'floodplain') {
    if (intendedUse === 'homesite' || intendedUse === 'development') {
      suitabilityScore -= 40;
      riskFlags.push("Floodplain/Wetlands detected. Building may be prohibited or require expensive engineered pads and insurance.");
      addedCosts += 20000;
    } else {
      suitabilityScore -= 10;
    }
  } else if (topography === 'steep') {
    if (intendedUse === 'homesite') {
      suitabilityScore -= 15;
      riskFlags.push("Steep topography. Site clearing, grading, and foundation work will cost significantly more.");
      addedCosts += 15000;
    }
  }

  // Zoning
  if (zoningOkay === 'no') {
    suitabilityScore -= 40;
    riskFlags.push("Zoning does not currently permit your intended use. Variances are never guaranteed.");
    addedCosts += 5000; // variance legal fees
  }

  // Determine fit
  let fitStatus = "";
  let fitColor = "";
  let FitIcon = CheckCircle2;
  
  if (suitabilityScore >= 80) {
    fitStatus = "Good Fit";
    fitColor = "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
    FitIcon = CheckCircle2;
  } else if (suitabilityScore >= 50) {
    fitStatus = "Caution / Requires Work";
    fitColor = "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800";
    FitIcon = AlertTriangle;
  } else {
    fitStatus = "High Risk / Avoid";
    fitColor = "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
    FitIcon = XCircle;
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800" id="calculator-content">
      <SEO 
        title="Rural Land Calculator | Value, Suitability & Net Proceeds"
        description="Estimate rural land selling price, broker proceeds, and evaluate a property's suitability for buying (homesites, farming, or recreation)."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Rural Land Calculator",
          "description": "Estimate rural land selling price, broker proceeds, and evaluate a property's suitability for buying (homesites, farming, or recreation).",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="p-6 md:p-8 flex-grow overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Rural Land Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Evaluate land value, selling proceeds, and buyer suitability based on intended use.</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <button 
              onClick={() => setMode('sell')}
              className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all ${mode === 'sell' ? 'bg-white dark:bg-gray-700 text-[#1a5f3f] dark:text-[#6ee7b7] shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
            >
              <DollarSign className="w-4 h-4" /> Sell Land (Valuation)
            </button>
            <button 
              onClick={() => setMode('buy')}
              className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all ${mode === 'buy' ? 'bg-white dark:bg-gray-700 text-[#1a5f3f] dark:text-[#6ee7b7] shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
            >
              <Search className="w-4 h-4" /> Buy Land (Suitability)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Input Form Column */}
            <div className="lg:col-span-1 space-y-6">
              
              {mode === 'sell' && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-5">Property Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Total Acres</label>
                      <input 
                        type="number" 
                        min="0.1" step="0.1"
                        value={acres} 
                        onChange={(e) => setAcres(Number(e.target.value))}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Est. Price Per Acre</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">$</div>
                        <input 
                          type="number" 
                          min="0"
                          value={pricePerAcre} 
                          onChange={(e) => setPricePerAcre(Number(e.target.value))}
                          className="w-full pl-8 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Road Access</label>
                      <select 
                        value={accessType}
                        onChange={(e) => setAccessType(e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                      >
                        <option value="paved">Paved Frontage</option>
                        <option value="dirt">Dirt/Gravel County Road</option>
                        <option value="easement">Deeded Easement</option>
                        <option value="landlocked">No Legal Access (Landlocked)</option>
                      </select>
                    </div>

                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Utilities Nearby?</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={hasPower} onChange={(e) => setHasPower(e.target.checked)} className="w-4 h-4 text-[#1a5f3f] bg-gray-100 border-gray-300 rounded focus:ring-[#1a5f3f]" />
                          <span className="text-sm font-medium">Power Line</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={hasWater} onChange={(e) => setHasWater(e.target.checked)} className="w-4 h-4 text-[#1a5f3f] bg-gray-100 border-gray-300 rounded focus:ring-[#1a5f3f]" />
                          <span className="text-sm font-medium">City/Rural Water Line</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Existing Improvements</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={hasWell} onChange={(e) => setHasWell(e.target.checked)} className="w-4 h-4 text-[#1a5f3f] bg-gray-100 border-gray-300 rounded focus:ring-[#1a5f3f]" />
                          <span className="text-sm font-medium">Water Well</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={hasSeptic} onChange={(e) => setHasSeptic(e.target.checked)} className="w-4 h-4 text-[#1a5f3f] bg-gray-100 border-gray-300 rounded focus:ring-[#1a5f3f]" />
                          <span className="text-sm font-medium">Septic System</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={hasFenced} onChange={(e) => setHasFenced(e.target.checked)} className="w-4 h-4 text-[#1a5f3f] bg-gray-100 border-gray-300 rounded focus:ring-[#1a5f3f]" />
                          <span className="text-sm font-medium">Fenced (Perimeter)</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Broker Fee (%)</label>
                      <input 
                        type="number" min="0" max="15" step="0.5"
                        value={brokerFeePercent} 
                        onChange={(e) => setBrokerFeePercent(Number(e.target.value))}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {mode === 'buy' && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-5">Due Diligence</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Intended Use</label>
                      <select 
                        value={intendedUse}
                        onChange={(e) => setIntendedUse(e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                      >
                        <option value="homesite">Homesite / Homestead</option>
                        <option value="farm">Farming / Livestock</option>
                        <option value="recreation">Hunting / Recreation / Timber</option>
                        <option value="development">Subdivision / Development</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Legal Access</label>
                      <select 
                        value={legalAccess}
                        onChange={(e) => setLegalAccess(e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                      >
                        <option value="yes">Yes (Paved, dirt, or deeded easement)</option>
                        <option value="no">No (Landlocked)</option>
                        <option value="unsure">Unsure / Unverified</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Power Proximity</label>
                      <select 
                        value={powerProximity}
                        onChange={(e) => setPowerProximity(e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                      >
                        <option value="onsite">On Site</option>
                        <option value="nearby">Nearby (Down the road)</option>
                        <option value="far">Far / None (Will require off-grid)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Water Availability</label>
                      <select 
                        value={waterAccess}
                        onChange={(e) => setWaterAccess(e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                      >
                        <option value="city">City / Rural Co-op Line</option>
                        <option value="well_needed">Well Required (Aquifer available)</option>
                        <option value="no_water">No water / Hauling required</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Topography / Flood</label>
                      <select 
                        value={topography}
                        onChange={(e) => setTopography(e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                      >
                        <option value="flat">Mostly High & Dry / Buildable</option>
                        <option value="steep">Steep / Rocky</option>
                        <option value="floodplain">Significant Floodplain / Wetlands</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Zoning / Restrictions</label>
                      <select 
                        value={zoningOkay}
                        onChange={(e) => setZoningOkay(e.target.value)}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                      >
                        <option value="yes">Permits Intended Use</option>
                        <option value="no">Prohibits Intended Use (Needs Variance)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Results Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {mode === 'sell' && (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a5f3f]/5 dark:bg-[#6ee7b7]/5 rounded-bl-full flex justify-end p-4">
                    <Map className="w-10 h-10 text-[#1a5f3f]/20" />
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight relative z-10">Valuation Readout</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 relative z-10">
                    <div className="p-5 bg-[#1a5f3f] text-white rounded-xl shadow-inner">
                      <p className="text-green-100 font-medium tracking-wide uppercase text-xs mb-1">Estimated Asking Price</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black tracking-tight">${totalAskingPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>
                    <div className="p-5 bg-blue-600 text-white rounded-xl shadow-inner">
                      <p className="text-blue-100 font-medium tracking-wide uppercase text-xs mb-1">Net Proceeds (After Fees)</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black tracking-tight">${netProceeds.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 relative z-10">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight border-b pb-2">Value Adjustments</h4>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Base Land Value:</span>
                      <span>${baseValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Location/Access Multiplier:</span>
                      <span>{accessLabel}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Utility Proximity Bump:</span>
                      <span className="text-green-600">+{(hasPower ? 5 : 0) + (hasWater ? 5 : 0)}%</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Added Improvements:</span>
                      <span>+${improvementsValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-red-600 dark:text-red-400 font-medium pt-2 border-t mt-2 border-gray-100">
                      <span>Selling Costs (Broker + Closing):</span>
                      <span>-${(brokerFee + closingCosts).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl relative z-10">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight mb-2">Strong Selling Points</h4>
                    <ul className="space-y-1">
                      {sellingPoints.map((point, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <ExportActions 
                      title="Land Value Estimate"
                      data={{
                  ...{  acres, pricePerAcre, accessType  },
                  ...{  totalAskingPrice, netProceeds  }
                }}
                    />
                  </div>
                </div>
              )}

              {mode === 'buy' && (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                  
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight relative z-10">Buyer Suitability Score</h2>
                  
                  <div className={`p-6 border rounded-xl mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 ${fitColor}`}>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-sm flex-shrink-0">
                      <FitIcon className="w-8 h-8" />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                        <span className="text-2xl font-black">{suitabilityScore}/100</span>
                        <span className="font-bold uppercase tracking-wider bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded text-sm">{fitStatus}</span>
                      </div>
                      <p className="text-sm opacity-90 font-medium">For intended use: <strong>{intendedUse.toUpperCase()}</strong></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border border-gray-200 dark:border-gray-600">
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Est. Cost to Make Usable</p>
                      <p className="text-3xl font-black text-gray-900 dark:text-white">${addedCosts.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-2">Added infrastructure/legal fees above purchase price to prepare land for {intendedUse}.</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" /> Red Flags Found
                      </h4>
                      {riskFlags.length > 0 ? (
                        <ul className="space-y-3">
                          {riskFlags.map((flag, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> No major red flags detected based on current inputs.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Advice:</strong> A low score doesn't mean it's a "bad" property—it means the property requires significant time, capital, and risk tolerance to force it to match your intended use. Always get a professional survey, title insurance, and perform a perc test before closing.
                    </p>
                  </div>

                  <div className="mt-6">
                    <ExportActions 
                      title="Land Suitability"
                      data={{
                  ...{  intendedUse, legalAccess, powerProximity, waterAccess  },
                  ...{  suitabilityScore, fitStatus, addedCosts  }
                }}
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          <CalculatorSanityContent uniqueCode="CALC-PROP-101" />

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Full Land Plan</h3>
            <p className="text-gray-600 mb-4">
              Determine your complete property operating and construction costs.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/land-and-construction" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                Return to Land & Construction Hub
              </a>
              <a href="/fencing" className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700">
                Estimate Fencing Cost →
              </a>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-6">Understanding Rural Land Value</h2>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p>Unlike suburban homes, rural land valuation is highly volatile. A 10-acre parcel in the same county can range from $20,000 to $200,000 based entirely on access, restrictions, and topography.</p>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">The Impact of Landlocked Property</h3>
              <p>Property without legal access to a public road is "landlocked." Even if there is a historic dirt path leading to the property, if you do not have a recorded deeded easement, you cannot legally access it. This destroys value (often up to 50% off market rates) because banks will not finance it and you cannot pull building permits.</p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Buying Raw Land vs Improved</h3>
              <p>When buying raw land for a homesite, buyers typically underestimate the cost of improvements. Drilling a well, installing a septic system, pushing an access driveway, and running power poles can easily add $40,000 to $60,000 to the real cost of the property before a foundation is ever poured.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
