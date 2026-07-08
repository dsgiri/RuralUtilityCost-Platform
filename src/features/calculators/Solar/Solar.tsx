import React, { useState, useRef } from 'react';
import { SEO } from '../../../components/SEO';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { PlusCircle, Trash2 } from 'lucide-react';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function Solar() {
  const [zip, setZip] = useState('');
  const [autonomy, setAutonomy] = useState(3);
  const [appliances, setAppliances] = useState([
    { name: 'Refrigerator', watts: 150, hours: 24 }
  ]);
  const resultRef = useRef<HTMLDivElement>(null);

  const addAppliance = () => {
    setAppliances([...appliances, { name: 'New Appliance', watts: 100, hours: 4 }]);
  };

  const removeAppliance = (index: number) => {
    setAppliances(appliances.filter((_, i) => i !== index));
  };

  const updateAppliance = (index: number, key: string, value: string | number) => {
    const newApps = [...appliances];
    newApps[index] = { ...newApps[index], [key]: value };
    setAppliances(newApps);
  };

  const calculate = () => {
    let sunHours = 5.0; // national average
    if (zip.startsWith('76')) sunHours = 5.2; // Fort Worth area default
    if (zip.startsWith('77')) sunHours = 5.0; // Houston
    if (zip.startsWith('78')) sunHours = 5.5; // Austin/SA area
    if (zip.startsWith('75')) sunHours = 5.1; // Dallas

    let dailyWh = 0;
    appliances.forEach(app => {
      // Refrigerator cycles on and off, typical runtime is 8 hours even if plugged 24/7.
      // But keeping simple logic as per user input.
      dailyWh += (app.watts * app.hours);
    });

    const batteryKwh = (dailyWh * autonomy * 1.2) / (1000 * 0.5);
    const solarWatts = dailyWh / Math.max(0.1, sunHours * 0.75);
    const panels = Math.ceil(solarWatts / 400);
    const cost = (batteryKwh * 350) + (solarWatts * 2.50);

    const breakdownChart = appliances.map(app => ({
      name: app.name,
      Wh: app.watts * app.hours
    }));

    return { batteryKwh: batteryKwh.toFixed(1), panels, cost: Math.round(cost), dailyWh, breakdownChart };
  };

  const results = calculate();

  return (
    <div className="p-4 sm:p-6">
      <SEO 
        title="Off-Grid Solar Battery Calculator"
        description="Size your off-grid solar panels and battery bank correctly based on appliance wattage, sun hours, and required autonomy."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Off-Grid Solar Battery Calculator",
          "description": "Size your off-grid solar panels and battery bank correctly based on appliance wattage, sun hours, and required autonomy.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Off-Grid Solar Calculator</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Size your off-grid solar panels and battery bank correctly based on appliance wattage, sun hours, and required autonomy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT: CALCULATOR INPUTS */}
      <section className="lg:col-span-6 xl:col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Configuration</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ZIP / Sun Factor</label>
            <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="e.g. 76001" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Days Autonomy</label>
            <div className="relative">
              <input type="number" min="1" max="7" value={autonomy} onChange={(e) => setAutonomy(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
              <span className="absolute right-3 top-2 text-xs text-gray-400">DAYS</span>
            </div>
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between border-b border-gray-100 pb-2">
          <h3 className="font-semibold text-gray-800 text-sm">Appliance Load Profile</h3>
          <button onClick={addAppliance} className="text-[#1a5f3f] flex items-center text-xs font-bold hover:bg-[#1a5f3f]/10 px-2 py-1 rounded transition-colors">
            <PlusCircle className="w-3 h-3 mr-1" /> ADD LOAD
          </button>
        </div>
        
        <div className="space-y-2 flex-grow overflow-y-auto pr-2 max-h-[300px]">
          {appliances.map((app, i) => (
            <div key={i} className="flex gap-2 items-center bg-gray-50/50 p-2 rounded-md border border-gray-200">
              <input type="text" value={app.name} onChange={(e) => updateAppliance(i, 'name', e.target.value)} className="w-1/3 min-w-0 border-gray-300 rounded text-xs p-1.5 border focus:ring-1 focus:ring-[#1a5f3f] outline-none bg-white" placeholder="Name" />
              <div className="w-1/4 relative min-w-0">
                <input type="number" value={app.watts} onChange={(e) => updateAppliance(i, 'watts', Number(e.target.value))} className="w-full border-gray-300 rounded text-xs p-1.5 border focus:ring-1 focus:ring-[#1a5f3f] outline-none bg-white" />
                <span className="absolute right-1 top-1.5 text-[9px] text-gray-400 font-bold">W</span>
              </div>
              <div className="w-1/4 relative min-w-0">
                <input type="number" min="0.1" step="0.5" max="24" value={app.hours} onChange={(e) => updateAppliance(i, 'hours', Number(e.target.value))} className="w-full border-gray-300 rounded text-xs p-1.5 border focus:ring-1 focus:ring-[#1a5f3f] outline-none bg-white" />
                <span className="absolute right-1 top-1.5 text-[9px] text-gray-400 font-bold">HR</span>
              </div>
              <button onClick={() => removeAppliance(i)} className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 rounded ml-auto flex-shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CENTER: OUTPUTS & VISUALS */}
      <section className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6">
        <div ref={resultRef} className="flex flex-col gap-6 print:m-0 print:gap-4 print:text-black">
          {/* STAT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-[#1a5f3f] p-4 rounded-xl shadow-md border border-transparent flex flex-col justify-center items-center text-center">
              <p className="text-[10px] font-bold text-green-200 uppercase">Array Sizing</p>
              <p className="text-2xl font-black text-white">{results.panels} <span className="text-xs font-normal text-green-100">Panels</span></p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Battery Target</p>
              <p className="text-2xl font-black text-gray-800">{results.batteryKwh} <span className="text-xs font-normal text-gray-500">kWh</span></p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center sm:col-span-1 col-span-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Est. Hard Cost</p>
              <p className="text-2xl font-black text-gray-800">${results.cost.toLocaleString()}</p>
            </div>
          </div>

          {/* DETAILS & GRAPH PANEL */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Hardware Sizing Logic</h3>
              <ul className="space-y-4 flex flex-col justify-center">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Daily Demand Limit</span>
                  <span className="font-bold text-gray-900">{results.dailyWh.toLocaleString()} Wh</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Battery Capacity Factor</span>
                  <span className="font-bold text-gray-900">50% DoD (Lead)</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Inverter Loss Blanket</span>
                  <span className="font-bold text-gray-900">+20% Overhead</span>
                </li>
              </ul>
            </div>
            <div className="h-full flex flex-col">
               <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Load Distribution</h3>
               <div className="w-full flex-grow min-h-[140px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={results.breakdownChart} layout="vertical" margin={{ left: 20, right: 10, top: 0, bottom: 0 }}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" width={70} fontSize={9} tickLine={false} axisLine={false} />
                     <Tooltip formatter={(value: number) => [`${value} Wh`, 'Daily Load']} cursor={{fill: 'transparent'}} />
                     <Bar dataKey="Wh" fill="#1a5f3f" radius={[0, 4, 4, 0]} opacity={0.9} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 mt-2 print:hidden">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Energy Plan</h3>
          <p className="text-gray-600 mb-4">
            If you are sizing a solar setup, you must also understand your peak electricity spike (kW) and backup generator needs.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/energy-demand" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              Calculate Peak Energy Demand
            </a>
            <a href="/gen-critical-load" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
              Calculate Backup Generator Load →
            </a>
          </div>
        </div>

        <CalculatorSanityContent uniqueCode="CALC-UTIL-207" />

              <ExportActions 
          title="Off-Grid Solar Calculator" 
          targetRef={resultRef}
          data={{
            'ZIP / Sun Location': zip || 'N/A',
            'Days Autonomy': autonomy,
            'Daily Demand (Wh)': results.dailyWh,
            'Battery Target (kWh)': results.batteryKwh,
            'Panels Recommended': results.panels,
            'Estimated Hard Cost': `$${results.cost.toLocaleString()}`
          }}
        />

        {/* SEO SNIPPET / HOW IT WORKS */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mt-auto">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a5f3f]"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            Formula & Assumptions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Off-Grid Scaling Principles:</h4>
              <p className="mb-2">The three pillars of designing an off-grid solar system are gathering your load profile (total Daily Wh), determining required battery autonomy (days without sun), and factoring in geographic sun-hours to size the array.</p>
              <p>Older AGM (Lead Acid) batteries should never be drained below 50% capacity (DoD), otherwise lifespan plummets. Thus, a 10kWh need requires 20kWh of total lead-acid battery storage.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Technical Assumptions & Logic:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-[#1a5f3f]">
                <li><strong>Logic:</strong> <code>Battery Target = (Daily Wh × Autonomy Days × 1.2 Inverter Loss) / 50% DoD</code>.</li>
                <li><strong>Solar Panel Sizing:</strong> Based on 400W nominal panels operating at ~75% real-world efficiency during peak sun hours. <code>Panels = (Daily Wh / (Sun Hours × 0.75)) / 400</code>.</li>
                <li><strong>Air Conditioning / Heating:</strong> Heating and cooling are incredibly power-hungry. It is often structurally cheaper to heat via wood or propane rather than scale solar to match winter HVAC loads.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is Autonomy?</h3>
              <p className="text-gray-600 mb-2">
                "Autonomy" is the number of consecutive days your battery bank can power your cabin with zero sunlight (e.g., during a multi-day winter storm). A standard off-grid setup aims for 3 days of autonomy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I run air conditioning on solar?</h3>
              <p className="text-gray-600 mb-2">
                Yes, but it requires a massive battery bank and inverter. Air conditioners have huge startup surges and run continuously. For off-grid cabins, it is much more economical to use passive cooling techniques, ceiling fans, or a small high-efficiency mini-split AC used only during peak daytime sun hours.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
