import React, { useState, useRef } from 'react';
import { SEO } from '../../../components/SEO';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function WaterFill() {
  const [zip, setZip] = useState('');
  const [gallons, setGallons] = useState(1000);
  const [type, setType] = useState('standard');
  const [distance, setDistance] = useState(10);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    let baseRate = 0.06;
    const zipNum = parseInt(zip);
    if (zipNum >= 76001 && zipNum <= 76010) baseRate = 0.05;
    if (zipNum >= 77001 && zipNum <= 77003) baseRate = 0.045;
    if (zipNum >= 78201 && zipNum <= 78202) baseRate = 0.055;
    if (zipNum >= 75001 && zipNum <= 75003) baseRate = 0.06;

    const g = Math.max(0, gallons);
    const d = Math.max(0, distance);

    const rate = type === 'potable' ? baseRate * 1.5 : baseRate;
    const delivery = 75 + (2.5 * d);
    const waterCost = g * rate;
    const total = waterCost + delivery;
    const loads = Math.ceil(g / 4000);
    const costPerGal = g > 0 ? (total / g) : 0;

    // 12 month data projection
    const chartData = Array.from({ length: 12 }).map((_, i) => ({
      month: `Month ${i + 1}`,
      cost: Math.round(total)
    }));

    return { total, costPerGal, loads, delivery, waterCost, chartData };
  };

  const results = calculate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Water Fill Charge Calculator",
        "description": "Calculate water delivery cost for rural homes, wells, septic, and pools based on your local ZIP code.",
        "applicationCategory": "UtilitiesApplication"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does it cost to get water delivered to a rural property?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bulk water typically costs between $0.04 and $0.08 per gallon. However, the total cost depends heavily on the delivery fee ($75 to $150 minimum base fee) and mileage distance from the municipal source. Potable (drinking safe) water carries a 50% to 100% premium over non-potable water."
            }
          },
          {
            "@type": "Question",
            "name": "How many gallons does a bulk water delivery truck hold?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard bulk bulk water hauling trucks hold between 2,500 and 4,000 gallons. Ordering an amount just above 4,000 gallons usually triggers the need for a second truck, drastically increasing the delivery fee. To save money, always try to order in 4,000-gallon increments."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Water Fill Charge Calculator</h1>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl">Calculate water delivery cost for rural homes, wells, septic, and pools based on your local ZIP code.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <SEO 
          title="Water Fill & Hauling Cost Calculator | Rural Utility Cost"
        description="Calculate water delivery cost for rural homes, wells, septic, and pools based on your local ZIP code."
        jsonLd={jsonLd}
      />

      {/* LEFT: CALCULATOR INPUTS */}
      <section className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ZIP Code</label>
            <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="e.g. 76001" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Specific rates for TX locations</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Gallons Needed</label>
            <div className="relative">
              <input type="number" min="1000" step="500" value={gallons} onChange={(e) => setGallons(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
              <span className="absolute right-3 top-2 text-xs text-gray-400">GAL</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Water Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="standard">Standard / Non-potable</option>
              <option value="potable">Potable (1.5x Premium)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Delivery Distance</label>
            <div className="relative">
              <input type="number" min="1" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
              <span className="absolute right-3 top-2 text-xs text-gray-400">MILES</span>
            </div>
          </div>
        </div>
      </section>

      {/* CENTER: OUTPUTS & VISUALS */}
      <section className="lg:col-span-8 flex flex-col gap-6">
        <div ref={resultRef} className="flex flex-col gap-6 print:m-0 print:gap-4 print:text-black">
          {/* STAT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Total Estimate</p>
              <p className="text-2xl font-black text-[#1a5f3f]">${results.total.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Per Gallon</p>
              <p className="text-2xl font-black text-gray-800">${results.costPerGal.toFixed(3)}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Truckloads</p>
              <p className="text-2xl font-black text-gray-800">{results.loads} Loads</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Delivery Fee</p>
              <p className="text-2xl font-black text-gray-800">${results.delivery.toFixed(2)}</p>
            </div>
          </div>

          {/* CHART & BREAKDOWN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0 print:grid-cols-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">12-Month Projection</h3>
              <div className="h-48 w-full flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="month" hide />
                    <YAxis fontSize={10} width={40} tickFormatter={(v) => `$${v}`} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(value: number) => [`$${value}`, 'Monthly Cost']} cursor={{fill: 'transparent'}} />
                    <Bar dataKey="cost" fill="#1a5f3f" radius={[4, 4, 0, 0]} opacity={0.8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between text-[8px] text-gray-400 pt-2 border-t border-gray-100 mt-2">
                <span>JAN</span><span>MAR</span><span>JUN</span><span>SEP</span><span>DEC</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Cost Factors Analysis</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 italic">Water Supply Cost</span>
                  <span className="font-bold">${results.waterCost.toFixed(2)}</span>
                </li>
                <li className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 italic">Base Dispatch + Mileage</span>
                  <span className="font-bold">${results.delivery.toFixed(2)}</span>
                </li>
                <li className="pt-2 border-t border-gray-100 flex items-center justify-between text-sm font-black">
                  <span className="text-[#1a5f3f]">TOTAL</span>
                  <span className="text-[#1a5f3f]">${results.total.toFixed(2)}</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded text-[10px] text-blue-700 leading-normal">
                <strong>💡 Pro Tip:</strong> Standard water hauling trucks hold around 4,000 gallons. Ordering slightly over this limit triggers the need for a second truck, duplicating the base delivery fee.
              </div>
            </div>
          </div>
        </div>

        <CalculatorSanityContent uniqueCode="CALC-UTIL-205" />

              <ExportActions 
          title="Water Fill Charge Calculator" 
          targetRef={resultRef}
          data={{
            'ZIP Code': zip || 'N/A',
            'Water Volume (Gallons)': `${gallons.toLocaleString()}`,
            'Type': type.toUpperCase(),
            'Distance (Miles)': distance,
            'Total Estimate': `$${results.total.toFixed(2)}`,
            'Cost Per Gallon': `$${results.costPerGal.toFixed(3)}`,
            'Delivery Fee': `$${results.delivery.toFixed(2)}`,
            'Truckloads Required': results.loads
          }}
        />

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-4 mt-2 print:hidden">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Full Rural Water Plan</h3>
          <p className="text-gray-600 mb-4">
            Compare hauling water against drilling a permanent well and estimate your septic system costs.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/water-planning" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              Return to Water Planning Hub
            </a>
            <a href="/well" className="inline-flex items-center text-cyan-600 font-medium hover:text-cyan-700">
              Estimate Well Costs →
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Formula & Assumptions</h2>
          <div className="space-y-4 text-sm text-gray-600">
            <p><strong>Logic:</strong> Water delivery costs are mostly transportation costs. This calculator estimates your cost based on local municipal fill rates and distance.</p>
            <p><code>Total Cost = (Gallons × Base Rate) + Delivery Fee</code>.</p>
            <p><strong>Base Rate:</strong> Standard rate is around $0.06/gal but varies by ZIP code based on local water scarcity. Potable water carries a 1.5x premium.</p>
            <p><strong>Delivery Fee:</strong> <code>$75 base + ($2.50 × Delivery Distance in miles)</code>.</p>
            <p><strong>Truckloads:</strong> A standard water truck holds 4,000 gallons. Any fractional amount requires another full trip.</p>
          </div>
        </div>

        {/* AI-FRIENDLY FAQ SECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 print:hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to get water delivered to a rural property?</h3>
              <p className="text-gray-600 mb-2">
                Bulk water typically costs between <strong>$0.04 and $0.08 per gallon</strong>. However, the true final cost is heavily dependent on the delivery radius.
              </p>
              <p className="text-gray-600">
                Hauling companies typically charge a flat dispatch fee ($75 to $150 minimum base fee) and an escalating mileage distance from the municipal source. Potable (drinking safe) water carries a 50% to 100% premium over non-potable water due to strict sanitation requirements for the tanks.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons does a bulk water delivery truck hold?</h3>
              <p className="text-gray-600 mb-2">
                Standard bulk water hauling trucks hold between <strong>2,500 and 4,000 gallons</strong>. 
              </p>
              <p className="text-gray-600">
                Ordering an amount just above 4,000 gallons (like 4,500 gallons) usually triggers the need for a second truck, duplicating the expensive delivery fee. To save the most money, always try to order in even 4,000-gallon increments to maximize your delivery fee ROI.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can non-potable water be used for household needs?</h3>
              <p className="text-gray-600">
                Non-potable water cannot be placed into cisterns feeding your kitchen sinks or household drinking lines. It is exclusively meant for agricultural irrigation, livestock troughs, construction sites, managing dust control, or filling swimming pools (since pools undergo their own chlorine shock treatment).
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
