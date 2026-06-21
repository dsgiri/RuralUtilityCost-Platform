import { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

type AnimalType = 'cattle' | 'goat' | 'sheep' | 'pig' | 'horse' | 'alpaca' | 'dog';

const gestationPeriods: Record<AnimalType, { name: string; days: number }> = {
  cattle: { name: 'Cow / Cattle', days: 283 },
  goat: { name: 'Goat', days: 150 },
  sheep: { name: 'Sheep', days: 147 },
  pig: { name: 'Pig / Hog', days: 114 },
  horse: { name: 'Horse / Mare', days: 340 },
  alpaca: { name: 'Alpaca / Llama', days: 335 },
  dog: { name: 'Dog', days: 63 }
};

export default function Gestation() {
  const [animal, setAnimal] = useState<AnimalType>('cattle');
  const [calcMode, setCalcMode] = useState<'forward' | 'backward'>('forward');
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const selectedAnimal = gestationPeriods[animal];
  
  const calculateDates = () => {
    if (!inputDate) return null;
    
    // Parse input date handling timezone correctly
    const [year, month, day] = inputDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    if (isNaN(date.getTime())) return null;

    if (calcMode === 'forward') {
      const dueDate = new Date(date);
      dueDate.setDate(dueDate.getDate() + selectedAnimal.days);
      return {
        breedingDate: date,
        dueDate: dueDate,
        days: selectedAnimal.days
      };
    } else {
      const breedingDate = new Date(date);
      breedingDate.setDate(breedingDate.getDate() - selectedAnimal.days);
      return {
        breedingDate: breedingDate,
        dueDate: date,
        days: selectedAnimal.days
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
        title="Animal Gestation Calculator | Rural Utility Cost"
        description="Estimate livestock due dates from breeding or exposure date with a simple animal gestation calculator for cattle, goats, sheep, pigs, horses, and more."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Animal Gestation Calculator",
          "description": "Estimate livestock due dates from breeding or exposure date with a simple animal gestation calculator for cattle, goats, sheep, pigs, horses, and more.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="p-6 md:p-8 flex-grow overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Animal Gestation Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Estimate due dates for livestock and farm animals based on breeding/service dates.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Input Form */}
            <div className="lg:col-span-1 space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase text-sm tracking-wide">Breeding Details</h3>
                <span className="text-xs bg-[#1a5f3f]/10 text-[#1a5f3f] dark:bg-[#6ee7b7]/10 dark:text-[#6ee7b7] px-2 py-1 rounded font-bold">Livestock</span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Animal Type</label>
                <select 
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] font-medium transition-colors"
                  value={animal}
                  onChange={(e) => setAnimal(e.target.value as AnimalType)}
                >
                  {Object.entries(gestationPeriods).map(([key, data]) => (
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
                    I know the breeding date
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
                    I know the target due date
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  {calcMode === 'forward' ? 'Breeding / Exposure Date' : 'Target Due Date'}
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
                  
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight relative z-10">Estimated Dates</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 relative z-10">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Breeding Date</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{formatDate(results.breedingDate)}</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Gestation Length</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{results.days} Days</p>
                    </div>
                  </div>

                  <div className="p-6 bg-[#1a5f3f] dark:bg-[#11402a] text-white rounded-xl shadow-inner relative z-10">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-green-100 font-medium tracking-wide uppercase text-sm">Estimated Due Date</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl md:text-3xl font-black tracking-tight">{formatDate(results.dueDate)}</span>
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
                  <strong>Notes:</strong> Gestation periods vary by breed, age, and individual animal. These calculations use industry standard averages. Due dates are estimates and actual birth may happen a few days before or after.
                </p>
              </div>

              {results && (
                <>
                  <CalculatorSanityContent uniqueCode="CALC-FARM-309" />

                  <ExportActions 
                    title="Animal Gestation"
                    data={{
                    ...{  animal: selectedAnimal.name, inputDate, calcMode  },
                    ...{  
                      breedingDate: results.breedingDate.toISOString().split('T')[0], 
                      dueDate: results.dueDate.toISOString().split('T')[0], 
                      gestationDays: results.days 
                     }
                  }}
                  />
                </>
              )}
            </div>
          </div>

          {/* SEO Content / FAQ */}
          <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-6">How to Estimate Due Dates for Farm Animals</h2>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p>Planning breeding and birthing dates is critical for proper herd and flock management. An accurate due date helps farmers prepare special feeds, arrange birthing pens, and ensure adequate shelter and veterinary supplies are ready.</p>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Gestation Period by Animal Type</h3>
              <ul className="list-disc pl-5 mb-8 space-y-2">
                <li><strong>Cows / Cattle:</strong> Around 283 days (~9 months). First-calf heifers often calve slightly earlier.</li>
                <li><strong>Goats & Sheep:</strong> Between 147 and 150 days (~5 months). Multiple births are common and can influence the exact timing.</li>
                <li><strong>Pigs / Hogs:</strong> Approximately 114 days (easy to remember as 3 months, 3 weeks, 3 days).</li>
                <li><strong>Horses / Mares:</strong> Roughly 340 days (~11 months), though it can range from 320 to 370 days.</li>
                <li><strong>Dogs:</strong> Typically 63 days, measured from the date of ovulation rather than breeding.</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Are gestation dates exact?</h4>
                  <p>No, gestation dates are estimates based on species averages. Individual animals may birth slightly early or late depending on breed, age, weather stress, and litters size (multiples often arrive early).</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Can I calculate due date from breeding date?</h4>
                  <p>Yes. If you know the date of successful mounting or artificial insemination, our calculator will add the standard gestation length to predict the birthing window.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">How do I calculate backward from a target date?</h4>
                  <p>Select "I know the target due date" in the calculator mode. This helps if you want animals to be born in a specific month (e.g., spring calving) by telling you exactly when to start the breeding program.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
