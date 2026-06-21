import { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

type BirdType = 'chicken' | 'duck' | 'quail' | 'turkey' | 'goose' | 'guinea_fowl' | 'pheasant';

const incubationPeriods: Record<BirdType, { name: string; days: number; lockdownOffset: number }> = {
  chicken: { name: 'Chicken', days: 21, lockdownOffset: 3 },
  duck: { name: 'Duck', days: 28, lockdownOffset: 3 },
  quail: { name: 'Quail', days: 18, lockdownOffset: 3 },
  turkey: { name: 'Turkey', days: 28, lockdownOffset: 3 },
  goose: { name: 'Goose', days: 30, lockdownOffset: 3 },
  guinea_fowl: { name: 'Guinea Fowl', days: 28, lockdownOffset: 3 },
  pheasant: { name: 'Pheasant', days: 24, lockdownOffset: 3 }
};

export default function Incubation() {
  const [bird, setBird] = useState<BirdType>('chicken');
  const [calcMode, setCalcMode] = useState<'forward' | 'backward'>('forward');
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const selectedBird = incubationPeriods[bird];
  
  const calculateDates = () => {
    if (!inputDate) return null;
    
    // Parse input date handling timezone correctly
    const [year, month, day] = inputDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    if (isNaN(date.getTime())) return null;

    if (calcMode === 'forward') {
      const hatchDate = new Date(date);
      hatchDate.setDate(hatchDate.getDate() + selectedBird.days);
      
      const lockdownDate = new Date(hatchDate);
      lockdownDate.setDate(lockdownDate.getDate() - selectedBird.lockdownOffset);
      
      return {
        setDate: date,
        lockdownDate: lockdownDate,
        hatchDate: hatchDate,
        days: selectedBird.days
      };
    } else {
      const hatchDate = new Date(date);
      
      const setDate = new Date(hatchDate);
      setDate.setDate(setDate.getDate() - selectedBird.days);
      
      const lockdownDate = new Date(hatchDate);
      lockdownDate.setDate(lockdownDate.getDate() - selectedBird.lockdownOffset);
      
      return {
        setDate: setDate,
        lockdownDate: lockdownDate,
        hatchDate: hatchDate,
        days: selectedBird.days
      };
    }
  };

  const results = calculateDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800" id="calculator-content">
      <SEO 
        title="Chicken Egg Incubation Calculator | Rural Utility Cost"
        description="Calculate chicken egg hatch dates, lockdown day, and stop-turning date with a simple poultry incubation calculator."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Chicken Egg Incubation Calculator",
          "description": "Calculate chicken egg hatch dates, lockdown day, and stop-turning date with a simple poultry incubation calculator.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="p-6 md:p-8 flex-grow overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Egg Incubation Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Estimate hatch dates, lockdown days, and incubation periods for poultry eggs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Input Form */}
            <div className="lg:col-span-1 space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase text-sm tracking-wide">Incubation Details</h3>
                <span className="text-xs bg-[#1a5f3f]/10 text-[#1a5f3f] dark:bg-[#6ee7b7]/10 dark:text-[#6ee7b7] px-2 py-1 rounded font-bold">Poultry</span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Bird Species</label>
                <select 
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] font-medium transition-colors"
                  value={bird}
                  onChange={(e) => setBird(e.target.value as BirdType)}
                >
                  {Object.entries(incubationPeriods).map(([key, data]) => (
                    <option key={key} value={key}>{data.name} (~{data.days} days)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Calculation Mode</label>
                <div className="flex gap-4">
                  <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <input 
                      type="radio" 
                      className="mr-2 text-[#1a5f3f] focus:ring-[#1a5f3f]" 
                      checked={calcMode === 'forward'} 
                      onChange={() => setCalcMode('forward')} 
                    />
                    I know the set date
                  </label>
                </div>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <input 
                      type="radio" 
                      className="mr-2 text-[#1a5f3f] focus:ring-[#1a5f3f]" 
                      checked={calcMode === 'backward'} 
                      onChange={() => setCalcMode('backward')} 
                    />
                    I know the expected hatch date
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  {calcMode === 'forward' ? 'Set Date (Start)' : 'Target Hatch Date'}
                </label>
                <input 
                  type="date" 
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] transition-colors"
                  value={inputDate} 
                  onChange={(e) => setInputDate(e.target.value)} 
                />
                <button 
                  className="mt-2 text-sm text-[#1a5f3f] dark:text-[#6ee7b7] font-medium hover:underline"
                  onClick={() => setInputDate(new Date().toISOString().split('T')[0])}
                >
                  Set to Today
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {results ? (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a5f3f]/5 dark:bg-[#6ee7b7]/5 rounded-bl-full"></div>
                  
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight relative z-10">Incubation Schedule</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 relative z-10">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Set Date (Day 1)</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{formatDate(results.setDate)}</p>
                    </div>
                    
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800">
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-1 uppercase">Lockdown & Stop Turning</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{formatDate(results.lockdownDate)}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-[#1a5f3f] dark:bg-[#11402a] text-white rounded-xl shadow-inner relative z-10">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-green-100 font-medium tracking-wide uppercase text-sm">Estimated Hatch Date</p>
                      <span className="text-sm bg-black/20 px-2 py-1 rounded font-bold">{results.days} Days Total</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl md:text-3xl font-black tracking-tight">{formatDate(results.hatchDate)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center min-h-[300px]">
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Please enter a valid date to see results.</p>
                </div>
              )}

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5 rounded-xl">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Incubation Notes:</strong> Turn eggs 3+ times daily until Lockdown Day. At lockdown, stop turning completely and increase incubator humidity to prepare for hatching. Temperature and humidity fluctuations may slightly alter hatch dates.
                </p>
              </div>

              {results && (
                <>
                  <CalculatorSanityContent uniqueCode="CALC-FARM-310" />

                  <ExportActions 
                    title="Egg Incubation"
                    data={{
                    ...{  bird: selectedBird.name, inputDate, calcMode  },
                    ...{  
                      setDate: results.setDate.toISOString().split('T')[0], 
                      lockdownDate: results.lockdownDate.toISOString().split('T')[0], 
                      hatchDate: results.hatchDate.toISOString().split('T')[0], 
                      incubationDays: results.days 
                     }
                  }}
                  />
                </>
              )}
            </div>
          </div>

          {/* SEO Content / FAQ */}
          <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-6">How to Calculate Hatch Dates</h2>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p>Successful egg incubation requires precise timing to control temperature, turning frequency, and humidity levels. Our calculator helps you pinpoint exactly when to start the set, when to enter "lockdown", and when to expect new chicks.</p>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Incubation Days by Bird Species</h3>
              <ul className="list-disc pl-5 mb-8 space-y-2">
                <li><strong>Chicken:</strong> ~21 days (Lockdown on Day 18)</li>
                <li><strong>Duck:</strong> ~28 days (Lockdown on Day 25)</li>
                <li><strong>Quail:</strong> ~17-18 days depending on the variety (Lockdown on Day 15)</li>
                <li><strong>Turkey:</strong> ~28 days (Lockdown on Day 25)</li>
                <li><strong>Goose:</strong> ~30 days, fluctuating by breed (Lockdown on Day 27)</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">When should I stop turning eggs?</h4>
                  <p>You must stop turning eggs exactly 3 days before the expected hatch date. This period is called "lockdown". It allows the chick to correctly position itself for hatching (called "pipping").</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">What is lockdown day?</h4>
                  <p>Lockdown day marks the final ~3 days of incubation. On this day, you stop turning the eggs, increase the humidity inside the incubator, and avoid opening the incubator to maintain stable conditions for hatching.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Can I calculate backward from a hatch date?</h4>
                  <p>Yes. If you have a specific weekend or holiday when you want your chicks to hatch, our calculator can reverse-engineer the exact date you need to set the eggs in your incubator.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
