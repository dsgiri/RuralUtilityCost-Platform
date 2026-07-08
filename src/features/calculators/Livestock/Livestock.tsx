import React, { useState, useRef } from 'react';
import { SEO } from '../../../components/SEO';
import { PlusCircle, Trash2 } from 'lucide-react';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function Livestock() {
  const [animalStr, setAnimalStr] = useState('cattle');
  const [count, setCount] = useState(1);
  const [weight, setWeight] = useState(1000);
  const [temp, setTemp] = useState(70);
  const [lactating, setLactating] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    let perAnimalBase = 0;

    if (animalStr === 'cattle') {
      if (lactating) {
        perAnimalBase = 100; // mid range of 70-140 as specified
      } else {
        perAnimalBase = 15 * (weight / 100);
      }
      if (temp > 70) {
        perAnimalBase += Math.floor((temp - 70) / 10);
      }
    } else if (animalStr === 'sheep' || animalStr === 'goats') {
      perAnimalBase = 3;
    } else if (animalStr === 'horses') {
      perAnimalBase = 7.5 * (weight / 100);
    } else if (animalStr === 'pigs') {
      perAnimalBase = 7.5;
    } else if (animalStr === 'chickens') {
      // 0.5 gal per 10 birds, so 0.05 per bird
      perAnimalBase = 0.05;
    }

    const daily = perAnimalBase * count;
    const weekly = daily * 7;
    const tankRec = Math.max(100, Math.ceil(daily * 2)); // Tank should hold at least 2 days supply

    return {
      daily: Math.round(daily * 10) / 10,
      weekly: Math.round(weekly * 10) / 10,
      tankRec
    };
  };

  const results = calculate();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Livestock Water Calculator</h1>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl">Calculate daily and weekly water needs for farm animals including cattle, horses, pigs, sheep, goats, and chickens.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <SEO 
          title="Livestock Water Requirements Calculator"
        description="Calculate daily and weekly water needs for farm animals including cattle, horses, pigs, sheep, goats, and chickens."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Livestock Water Requirements Calculator",
          "description": "Calculate daily and weekly water needs for farm animals including cattle, horses, pigs, sheep, goats, and chickens.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      {/* LEFT: CALCULATOR INPUTS */}
      <section className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Animal Type</label>
            <select value={animalStr} onChange={(e) => setAnimalStr(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
               <option value="cattle">Cattle</option>
               <option value="horses">Horses</option>
               <option value="sheep">Sheep</option>
               <option value="goats">Goats</option>
               <option value="pigs">Pigs</option>
               <option value="chickens">Chickens</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Head Count</label>
              <input type="number" min="1" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            </div>
            
            {['cattle', 'horses'].includes(animalStr) ? (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Est. Weight (lbs)</label>
                <input type="number" min="10" step="10" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
              </div>
            ) : <div />}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Ambient Temperature (°F)</label>
            <input type="number" min="0" max="120" value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
          </div>

          {animalStr === 'cattle' && (
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-center space-x-3 text-sm font-medium text-gray-700 cursor-pointer">
                <input type="checkbox" checked={lactating} onChange={(e) => setLactating(e.target.checked)} className="h-4 w-4 text-[#1a5f3f] border-gray-300 rounded focus:ring-[#1a5f3f]" />
                <span className="text-xs">Currently Lactating / Nursing</span>
              </label>
            </div>
          )}
        </div>
      </section>

      {/* CENTER: OUTPUTS & VISUALS */}
      <section className="lg:col-span-8 flex flex-col gap-6">
        <div ref={resultRef} className="flex flex-col gap-6 print:m-0 print:gap-4 print:text-black">
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1a5f3f] p-5 rounded-xl shadow-md border border-transparent flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-green-200 uppercase tracking-wider mb-1">Herd Daily Consumption</p>
              <p className="text-4xl font-black text-white">{results.daily.toLocaleString()} <span className="text-lg font-bold opacity-80">Gal</span></p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Weekly Draw Target</p>
              <p className="text-3xl font-black text-gray-800">{results.weekly.toLocaleString()} <span className="text-lg font-bold text-gray-500">Gal</span></p>
            </div>
          </div>

          {/* DETAILS PANEL */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Infrastructure Requirements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-4 flex flex-col justify-center">
                <li className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                  <span className="text-gray-600">Base Suggested Trough</span>
                  <span className="font-bold text-gray-900">{results.tankRec.toLocaleString()} gal</span>
                </li>
                <li className="flex items-center justify-between text-sm pt-2 border-t border-gray-100 font-bold">
                  <span className="text-gray-800">Trough Safety Buffer</span>
                  <span className="text-[#1a5f3f]">2 Days Supply</span>
                </li>
              </ul>
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-xs text-red-800 leading-relaxed flex flex-col justify-center">
                <strong>🌡️ Heat Alert:</strong> This is a baseline estimator. Extreme heat waves (90°F+) cause water consumption to surge massively as animals seek cooling. Do not undersize infrastructure.
              </div>
            </div>
          </div>
        </div>

        <CalculatorSanityContent uniqueCode="CALC-FARM-308" />

              <ExportActions 
          title="Livestock Water Requirements Calculator" 
          targetRef={resultRef}
          data={{
            'Animal Type': animalStr.toUpperCase(),
            'Head Count': count,
            'Est. Weight (lbs)': ['cattle', 'horses'].includes(animalStr) ? weight : 'N/A',
            'Ambient Temperature (°F)': temp,
            'Lactating / Nursing': lactating ? 'Yes' : 'No',
            'Daily Consumption (Gal)': results.daily,
            'Weekly Draw Target (Gal)': results.weekly,
            'Suggested Trough Size (Gal)': results.tankRec
          }}
        />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8 print:hidden">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Formula & Assumptions</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <p><strong>Logic:</strong> <code>Daily Need = Base Water Rate × Temperature Multiplier × Lactation Multiplier</code></p>
            <p><strong>Base Assumptions:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cattle (Dry): 15 gal/day per 1000 lbs.</li>
              <li>Cattle (Lactating): 70 - 140+ gallons daily depending on production.</li>
              <li>Chickens: 0.5 gal per 10 birds.</li>
            </ul>
            <p><strong>Temperature Multipliers:</strong> For heavy cattle, crossing 70°F spikes consumption roughly 1 gallon per additional 10 degrees.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is water so important for livestock?</h3>
              <p className="text-gray-600 mb-2">
                Ensuring continuous access to fresh water is a financial necessity. Mild dehydration stalls weight gain in beef cattle, and aggressively drops milk production.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I control algae in troughs?</h3>
              <p className="text-gray-600 mb-2">
                Automatic waterers hooked directly to high-pressure lines reduce stagnant algae compared to large standing tanks. You can also use approved copper sulfate treatments or regular scrubbing.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
