import { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { ClipboardCheck, Tag, DollarSign, AlertCircle, ShieldCheck, FileText, CheckCircle2, Scale, Info } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

type Tab = 'cost' | 'label' | 'readiness';

interface Ingredient {
  id: string;
  name: string;
  weight: number;
  isOrganic: boolean;
  isWaterOrSalt: boolean;
}

export default function FoodProcessingCompliance() {
  const [activeTab, setActiveTab] = useState<Tab>('cost');

  // --- COST CALCULATOR STATE ---
  const [grossSales, setGrossSales] = useState<number>(50000);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [needsExpedited, setNeedsExpedited] = useState<boolean>(false);
  const [applyCostShare, setApplyCostShare] = useState<boolean>(true);

  // Cost Logic
  const baseFee = 750 + (grossSales * 0.005 > 2500 ? 2500 : grossSales * 0.005);
  const applicationFee = isFirstTime ? 350 : 0;
  const inspectionFee = 800; // Estimated flat day rate
  const expeditedFee = needsExpedited ? 500 : 0;
  
  const totalCost = baseFee + applicationFee + inspectionFee + expeditedFee;
  // USDA FSA Cost Share covers up to 75% of eligible certification costs, up to $750 per scope
  const eligibleCost = baseFee + applicationFee + inspectionFee;
  const costShareRebate = applyCostShare ? Math.min(eligibleCost * 0.75, 750) : 0;
  const outOfPocket = totalCost - costShareRebate;

  // --- LABEL % CALCULATOR STATE ---
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Organic Flour', weight: 80, isOrganic: true, isWaterOrSalt: false },
    { id: '2', name: 'Water', weight: 15, isOrganic: false, isWaterOrSalt: true },
    { id: '3', name: 'Yeast', weight: 3, isOrganic: false, isWaterOrSalt: false },
    { id: '4', name: 'Salt', weight: 2, isOrganic: false, isWaterOrSalt: true },
  ]);

  const addIngredient = () => {
    setIngredients([...ingredients, { id: Date.now().toString(), name: '', weight: 0, isOrganic: false, isWaterOrSalt: false }]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(i => i.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: any) => {
    setIngredients(ingredients.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  // Label Logic (Exclude water and salt from total weight)
  const totalWeightExcludingWaterSalt = ingredients
    .filter(i => !i.isWaterOrSalt)
    .reduce((sum, i) => sum + i.weight, 0);

  const totalOrganicWeight = ingredients
    .filter(i => !i.isWaterOrSalt && i.isOrganic)
    .reduce((sum, i) => sum + i.weight, 0);

  const organicPercentage = totalWeightExcludingWaterSalt > 0 
    ? (totalOrganicWeight / totalWeightExcludingWaterSalt) * 100 
    : 0;

  // --- READINESS SCORE STATE ---
  const [checklist, setChecklist] = useState([
    { id: 'haccp', label: 'HACCP or Preventive Controls Plan Documented', status: 'partial' as 'yes' | 'no' | 'partial', weight: 25 },
    { id: 'sanitation', label: 'Sanitation Standard Operating Procedures (SSOP) Active', status: 'yes' as 'yes' | 'no' | 'partial', weight: 20 },
    { id: 'records', label: 'Daily Processing & Cleaning Logs Maintained', status: 'yes' as 'yes' | 'no' | 'partial', weight: 20 },
    { id: 'training', label: 'Employee Training Records Up to Date', status: 'no' as 'yes' | 'no' | 'partial', weight: 15 },
    { id: 'trace', label: 'Traceability & Mock Recall Plan Tested', status: 'no' as 'yes' | 'no' | 'partial', weight: 20 },
  ]);

  const updateChecklist = (id: string, status: 'yes' | 'no' | 'partial') => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, status } : item));
  };

  // Readiness Logic
  const readinessScore = checklist.reduce((score, item) => {
    if (item.status === 'yes') return score + item.weight;
    if (item.status === 'partial') return score + (item.weight * 0.5);
    return score;
  }, 0);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800" id="calculator-content">
      <SEO 
        title="Food Processing Compliance & Certification Calculators"
        description="Estimate USDA Organic certification costs, calculate ingredient organic label percentages, and assess FDA inspection readiness."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Food Processing Compliance & Certification Calculators",
          "description": "Estimate USDA Organic certification costs, calculate ingredient organic label percentages, and assess FDA inspection readiness.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="p-6 md:p-8 flex-grow overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Food Processing Compliance</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Tools to estimate organic certification costs, calculate organic label percentages, and assess baseline FDA inspection readiness for rural and agricultural processors.
            </p>
          </div>

          {/* TAB NAVIGATION */}
          <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <button 
              onClick={() => setActiveTab('cost')}
              className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all ${activeTab === 'cost' ? 'bg-white dark:bg-gray-700 text-[#1a5f3f] dark:text-[#6ee7b7] shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
            >
              <DollarSign className="w-4 h-4" /> Organic Cert Cost
            </button>
            <button 
              onClick={() => setActiveTab('label')}
              className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all ${activeTab === 'label' ? 'bg-white dark:bg-gray-700 text-[#1a5f3f] dark:text-[#6ee7b7] shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
            >
              <Tag className="w-4 h-4" /> Organic Label %
            </button>
            <button 
              onClick={() => setActiveTab('readiness')}
              className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all ${activeTab === 'readiness' ? 'bg-white dark:bg-gray-700 text-[#1a5f3f] dark:text-[#6ee7b7] shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
            >
              <ClipboardCheck className="w-4 h-4" /> Inspection Readiness
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* LEFT COLUMN: Inputs for standard calculators, or full width for readiness */}
            <div className={`space-y-6 ${activeTab === 'readiness' ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
              
              {/* --- 1. COST CALCULATOR --- */}
              {activeTab === 'cost' && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-6">Certification Details</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Estimated Gross Organic Sales</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input 
                          type="number" 
                          min="0"
                          value={grossSales} 
                          onChange={(e) => setGrossSales(Number(e.target.value))}
                          className="w-full pl-8 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#1a5f3f] focus:ring-[#1a5f3f]"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Used to calculate user fees (typically tiered based on revenue).</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isFirstTime} 
                          onChange={(e) => setIsFirstTime(e.target.checked)}
                          className="w-5 h-5 text-[#1a5f3f] bg-gray-100 border-gray-300 rounded focus:ring-[#1a5f3f]"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Certification (Includes New Applicant Fee)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={needsExpedited} 
                          onChange={(e) => setNeedsExpedited(e.target.checked)}
                          className="w-5 h-5 text-[#1a5f3f] bg-gray-100 border-gray-300 rounded focus:ring-[#1a5f3f]"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expedite Review Process (Additional Rush Fee)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={applyCostShare} 
                          onChange={(e) => setApplyCostShare(e.target.checked)}
                          className="w-5 h-5 text-[#1a5f3f] bg-gray-100 border-gray-300 rounded focus:ring-[#1a5f3f]"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Apply USDA FSA Cost Share Estimate</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 2. LABEL CALCULATOR --- */}
              {activeTab === 'label' && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">Recipe Ingredients</h3>
                    <button 
                      onClick={addIngredient}
                      className="text-xs font-bold bg-green-50 text-green-700 px-3 py-1.5 rounded hover:bg-green-100"
                    >
                      + Add Ingredient
                    </button>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mb-4 text-xs text-blue-800 dark:text-blue-200 flex gap-2 items-start">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>Enter weights in any uniform unit (grams, lbs, oz). USDA rules state added water and salt must be excluded from the total composition percentage.</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-xs text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700">
                          <th className="pb-2 font-semibold">Ingredient</th>
                          <th className="pb-2 font-semibold w-24">Weight</th>
                          <th className="pb-2 font-semibold text-center w-24">Organic?</th>
                          <th className="pb-2 font-semibold text-center w-28">Water/Salt?</th>
                          <th className="pb-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {ingredients.map((ing) => (
                          <tr key={ing.id}>
                            <td className="py-3 pr-2">
                              <input 
                                type="text"
                                placeholder="Ingredient name"
                                value={ing.name}
                                onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white pt-1.5 pb-1.5 px-2"
                              />
                            </td>
                            <td className="py-3 px-2">
                              <input 
                                type="number"
                                min="0"
                                value={ing.weight || ''}
                                onChange={(e) => updateIngredient(ing.id, 'weight', Number(e.target.value))}
                                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white pt-1.5 pb-1.5 px-2 text-right"
                              />
                            </td>
                            <td className="py-3 px-2 text-center">
                              <input 
                                type="checkbox"
                                checked={ing.isOrganic}
                                onChange={(e) => updateIngredient(ing.id, 'isOrganic', e.target.checked)}
                                disabled={ing.isWaterOrSalt}
                                className="w-4 h-4 text-[#1a5f3f] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed border-gray-300 rounded"
                              />
                            </td>
                            <td className="py-3 px-2 text-center">
                              <input 
                                type="checkbox"
                                checked={ing.isWaterOrSalt}
                                onChange={(e) => {
                                  updateIngredient(ing.id, 'isWaterOrSalt', e.target.checked);
                                  if (e.target.checked) {
                                    updateIngredient(ing.id, 'isOrganic', false); // Water/salt cannot be counted as organic
                                  }
                                }}
                                className="w-4 h-4 text-blue-600 cursor-pointer border-gray-300 rounded"
                              />
                            </td>
                            <td className="py-3 pl-2 text-right">
                              <button 
                                onClick={() => removeIngredient(ing.id)}
                                className="text-gray-400 hover:text-red-500 font-bold px-2"
                                title="Remove"
                              >
                                &times;
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- 3. READINESS CALCULATOR (Full width) --- */}
              {activeTab === 'readiness' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-6">Facility Readiness Checklist</h3>
                      
                      <div className="space-y-4">
                        {checklist.map((item) => (
                          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl gap-4">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-snug">{item.label}</span>
                            <div className="flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                              <button 
                                onClick={() => updateChecklist(item.id, 'yes')}
                                className={`px-4 py-1.5 text-xs font-bold transition-colors ${item.status === 'yes' ? 'bg-[#1a5f3f] text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                              >
                                YES
                              </button>
                              <button 
                                onClick={() => updateChecklist(item.id, 'partial')}
                                className={`px-4 py-1.5 text-xs font-bold border-l border-r border-gray-200 dark:border-gray-700 transition-colors ${item.status === 'partial' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                              >
                                PARTIAL
                              </button>
                              <button 
                                onClick={() => updateChecklist(item.id, 'no')}
                                className={`px-4 py-1.5 text-xs font-bold transition-colors ${item.status === 'no' ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                              >
                                NO
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 p-5 rounded-xl flex gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Disclaimer:</strong> This is a generalized readiness estimator, not an official FDA score. FDA inspections are highly specific and risk-based depending on what exact foods are being processed.
                      </p>
                    </div>
                  </div>
                  
                  {/* Readiness Results Panel */}
                  <div className="md:col-span-1">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm sticky top-6">
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Readiness Predictor</h2>
                      
                      <div className="mb-6">
                        <div className="flex items-end gap-2 mb-2">
                          <span className="text-4xl font-black text-gray-900 dark:text-white">{readinessScore}</span>
                          <span className="text-xl font-bold text-gray-500 pb-1">/ 100</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
                          <div 
                            className={`h-2.5 rounded-full transition-all duration-500 ${readinessScore >= 80 ? 'bg-green-500' : readinessScore >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${readinessScore}%` }}
                          ></div>
                        </div>
                        
                        <div className={`p-4 rounded-xl border ${
                          readinessScore >= 80 ? 'bg-green-50 border-green-200 dark:bg-green-900/20' : 
                          readinessScore >= 50 ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20' : 
                          'bg-red-50 border-red-200 dark:bg-red-900/20'
                        }`}>
                          <h4 className={`font-bold text-sm mb-1 ${
                            readinessScore >= 80 ? 'text-green-800 dark:text-green-300' : 
                            readinessScore >= 50 ? 'text-amber-800 dark:text-amber-300' : 
                            'text-red-800 dark:text-red-300'
                          }`}>
                            {readinessScore >= 80 ? 'Audit Ready' : readinessScore >= 50 ? 'Moderate Risk' : 'High Risk'}
                          </h4>
                          <p className={`text-xs ${
                            readinessScore >= 80 ? 'text-green-700 dark:text-green-400' : 
                            readinessScore >= 50 ? 'text-amber-700 dark:text-amber-400' : 
                            'text-red-700 dark:text-red-400'
                          }`}>
                            {readinessScore >= 80 ? 'Documentation and practices appear aligned with baseline preventive controls.' : 
                             readinessScore >= 50 ? 'Significant gaps in documentation or implementation require attention before inspection.' : 
                             'Not ready. Critical preventative programs or documentation are missing.'}
                          </p>
                        </div>
                      </div>

                      <ExportActions 
                        title="FDA Readiness Score"
                        data={{
                  ...{  checksCompleted: checklist.filter(c => c.status === 'yes').length  },
                  ...{  readinessScore  }
                }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Results for Cost and Label */}
            {activeTab !== 'readiness' && (
              <div className="lg:col-span-1 space-y-6">
                
                {/* Cost Results */}
                {activeTab === 'cost' && (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#1a5f3f]/5 dark:bg-[#6ee7b7]/5 rounded-bl-full flex items-start justify-end p-4">
                      <ShieldCheck className="w-6 h-6 text-[#1a5f3f]/20" />
                    </div>
                    
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight relative z-10">Estimation Summary</h2>
                    
                    <div className="space-y-4 mb-6 relative z-10">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Base/User Fee</span>
                        <span className="font-medium">${baseFee.toFixed(2)}</span>
                      </div>
                      {applicationFee > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">New App Fee</span>
                          <span className="font-medium">${applicationFee.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Inspection (Est. 1 Day)</span>
                        <span className="font-medium">${inspectionFee.toFixed(2)}</span>
                      </div>
                      {expeditedFee > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Expedited Service</span>
                          <span className="font-medium">${expeditedFee.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center font-bold">
                        <span className="text-gray-900 dark:text-white">Total Gross Cost</span>
                        <span className="text-gray-900 dark:text-white">${totalCost.toFixed(2)}</span>
                      </div>

                      {costShareRebate > 0 && (
                        <div className="flex justify-between items-center text-sm text-green-600 dark:text-green-400 font-medium">
                          <span>Est. USDA FSA Rebate</span>
                          <span>-${costShareRebate.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 bg-[#1a5f3f] text-white rounded-xl shadow-inner relative z-10">
                      <p className="text-green-100 font-medium tracking-wide uppercase text-xs mb-1">Estimated Out-of-Pocket</p>
                      <span className="text-4xl font-black tracking-tight">${outOfPocket.toFixed(0)}</span>
                    </div>

                    <ExportActions 
                      title="Organic Certification Cost"
                      data={{
                  ...{  grossSales, needsExpedited  },
                  ...{  totalCost, outOfPocket  }
                }}
                    />
                  </div>
                )}

                {/* Label Results */}
                {activeTab === 'label' && (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#1a5f3f]/5 dark:bg-[#6ee7b7]/5 rounded-bl-full flex items-start justify-end p-4">
                      <Scale className="w-6 h-6 text-[#1a5f3f]/20" />
                    </div>
                    
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight relative z-10">USDA Label Outcome</h2>
                    
                    <div className="mb-6 relative z-10">
                      <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Calculated Organic Percentage</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-gray-900 dark:text-white">{organicPercentage.toFixed(1)}</span>
                        <span className="text-xl font-bold text-gray-500">%</span>
                      </div>
                    </div>

                    <div className={`p-5 rounded-xl shadow-inner relative z-10 text-white ${
                      organicPercentage === 100 ? 'bg-[#154d32]' : 
                      organicPercentage >= 95 ? 'bg-[#1a5f3f]' : 
                      organicPercentage >= 70 ? 'bg-emerald-600' : 'bg-gray-600'
                    }`}>
                      <p className="text-white/80 font-medium tracking-wide uppercase text-xs mb-1">Eligible Label Claim</p>
                      <p className="text-lg font-black tracking-tight">
                        {organicPercentage === 100 ? '100% Organic' : 
                         organicPercentage >= 95 ? 'Organic (USDA Seal)' : 
                         organicPercentage >= 70 ? 'Made with Organic...' : 
                         'Specific Ingredient List Only'}
                      </p>
                    </div>

                    <div className="mt-6 space-y-2 text-xs text-gray-500 relative z-10 border-t border-gray-100 dark:border-gray-700 pt-4">
                      <div className="flex justify-between">
                        <span>Total Product Weight:</span>
                        <span className="font-semibold">{ingredients.reduce((s,i)=>s+i.weight,0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Excluded Water/Salt:</span>
                        <span className="font-semibold">{ingredients.filter(i=>i.isWaterOrSalt).reduce((s,i)=>s+i.weight,0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-800 dark:text-gray-300 font-bold border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
                        <span>Calculable Base Formula:</span>
                        <span>{totalWeightExcludingWaterSalt.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <ExportActions 
                        title="Organic Label Percentage"
                        data={{
                  ...{  totalWeight: ingredients.reduce((s,i)=>s+i.weight,0)  },
                  ...{  organicPercentage  }
                }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Support Content */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:hidden">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Formula & Assumptions</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p><strong>Organic Certification Costs:</strong> This tool estimates baseline averages for typical certification agencies (e.g. CCOF, OEFFA, Oregon Tilth). Unannounced inspections or distant rural travel may incur additional inspector travel fees.</p>
              <p><strong>Cost Share:</strong> The USDA FSA Cost Share program may rebate up to 75% of your eligible certification costs (up to $750 max limits per scope), strictly after you have paid the agency and achieved certification.</p>
              <p><strong>Organic Labeling Requirements (NOP):</strong></p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>100% Organic:</strong> May use USDA seal. All ingredients and processing aids must be organic.</li>
                <li><strong>Organic (95%+):</strong> May use USDA seal. Up to 5% non-organic ingredients from the National List.</li>
                <li><strong>Made with Organic (70-94%):</strong> Cannot use USDA seal. Can state "Made with organic [up to 3 ingredients]."</li>
                <li><strong>Below 70%:</strong> No organic claims on the principal display panel. Specific ingredients can be noted as organic in the info panel.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I sell my product before it's certified?</h3>
                <p className="text-gray-600 mb-2">
                  Yes, but you cannot legally market it as "Organic" or use the USDA Organic seal until your certification is officially granted. Doing so without certification can result in hefty fines.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Are water and salt considered organic?</h3>
                <p className="text-gray-600 mb-2">
                  No, water and salt are considered non-agricultural and are excluded from the organic percentage calculation when determining label claims.
                </p>
              </div>
            </div>
          </div>

          <CalculatorSanityContent uniqueCode="CALC-BIZ-403" />

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Rural Business Plan</h3>
            <p className="text-gray-600 mb-4">
              Find matching grants, calculate expansion ROI, and ensure food processing compliance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/agribusiness" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                Return to Agribusiness Hub
              </a>
              <a href="/expand-profit" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700">
                Calculate Expansion Profit →
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
