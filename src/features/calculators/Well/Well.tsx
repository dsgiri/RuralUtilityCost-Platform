import React, { useState, useRef } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function Well() {
  const [depth, setDepth] = useState(250);
  const [soil, setSoil] = useState('medium');
  const [region, setRegion] = useState('average');
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    let rate = 30;
    if (soil === 'soft') rate = 20;
    if (soil === 'medium') rate = 30;
    if (soil === 'hard') rate = 45;
    if (soil === 'rock') rate = 65;

    // Region multiplier
    if (region === 'high') rate *= 1.25;
    if (region === 'low') rate *= 0.85;

    const drillingCost = depth * rate;
    
    // Deeper wells need more expensive submersible pumps and longer electrical lines
    let pumpCost = 1500;
    if (depth > 200) pumpCost = 2500;
    if (depth > 400) pumpCost = 3500;

    const totalCost = drillingCost + pumpCost;

    return { 
      ratePerFoot: Math.round(rate),
      drillingCost: Math.round(drillingCost),
      pumpCost,
      totalCost
    };
  };

  const results = calculate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Well Drilling Cost Calculator",
        "description": "Calculate the cost per foot of drilling a water well based on geological conditions and depth requirements.",
        "applicationCategory": "UtilitiesApplication"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does it cost to drill a water well on average?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The average residential water well sits between 100 and 500 feet deep and costs between $5,500 and $12,000 to drill and install a pump. The price largely depends on the soil composition—solid rock takes much longer to puncture, driving up the per-foot labor cost compared to soft soil or sand."
            }
          },
          {
            "@type": "Question",
            "name": "Do I have to pay the driller if they don't find water?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. This is called a 'dry hole.' Well drillers charge by the linear foot drilled, regardless of hydrogeological success. If they hit 300 feet and find zero water deposits, you are still liable for the drilling labor and the casing used."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="p-4 sm:p-6">
      <SEO 
        title="Well Drilling Cost Calculator | Rural Utility Cost"
        description="Calculate the cost per foot of drilling a water well based on geological conditions and depth requirements."
        jsonLd={jsonLd}
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Well Drilling Cost Calculator</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Calculate the cost per foot of drilling a water well based on geological conditions and depth requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT: CALCULATOR INPUTS */}
      <section className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Expected Depth Needed (Feet)</label>
            <input type="number" min="50" step="50" value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Avg residential well sits at 100-500ft</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Geology / Soil Type</label>
            <select value={soil} onChange={(e) => setSoil(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="soft">Soft (Sand, loose clay)</option>
              <option value="medium">Medium (Packed clay, mixed)</option>
              <option value="hard">Hard (Dense hardpan)</option>
              <option value="rock">Solid Bedrock</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Regional Labor Rates</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="low">Rural/Low Cost Area</option>
              <option value="average">National Average</option>
              <option value="high">High Cost Area (Coastal / Mountain)</option>
            </select>
          </div>
        </div>
      </section>

      {/* CENTER: OUTPUTS & VISUALS */}
      <section className="lg:col-span-8 flex flex-col gap-6">
        <div ref={resultRef} className="flex flex-col gap-6 print:m-0 print:gap-4 print:text-black">
          {/* STAT CARDS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a5f3f] p-5 rounded-xl shadow-md border border-transparent flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-green-200 uppercase tracking-wider mb-1">Estimated Drilling Rate</p>
              <p className="text-4xl font-black text-white">${results.ratePerFoot} <span className="text-lg font-bold opacity-80">/ ft</span></p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total System Estimate</p>
              <p className="text-2xl font-black text-[#1a5f3f]">${results.totalCost.toLocaleString()}</p>
            </div>
          </div>

          {/* DETAILS PANEL */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Investment Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-4 flex flex-col justify-center">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Drilling & Steel Casing</span>
                  <span className="font-bold text-gray-900">${results.drillingCost.toLocaleString()}</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pump & Electrical</span>
                  <span className="font-bold text-gray-900">${results.pumpCost.toLocaleString()}</span>
                </li>
                <li className="flex items-center justify-between text-lg pt-3 border-t border-gray-100 font-bold">
                  <span className="text-gray-800">Total Build Cost</span>
                  <span className="text-[#1a5f3f]">${results.totalCost.toLocaleString()}</span>
                </li>
              </ul>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800 leading-relaxed flex flex-col justify-center">
                <strong>⚠️ Dry Hole Warning:</strong> Drillers charge per foot drilled regardless of whether aquifer deposits were found. You will still owe the drilling portion of the invoice even if no water is hit.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 mt-2 print:hidden">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Full Water Plan</h3>
          <p className="text-gray-600 mb-4">
            If you are drilling a new well, you will likely need a septic system for wastewater. Ensure your budget accounts for both.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/water-planning" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              Return to Water Planning Hub
            </a>
            <a href="/septic" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
              Calculate Septic Tank Size & Cost →
            </a>
          </div>
        </div>

        <CalculatorSanityContent uniqueCode="CALC-PROP-106" />

              <ExportActions 
          title="Well Drilling Cost Calculator" 
          targetRef={resultRef}
          data={{
            'Depth (ft)': depth,
            'Geology / Soil Type': soil.toUpperCase(),
            'Regional Cost Level': region.toUpperCase(),
            'Estimated Rate per Foot': `$${results.ratePerFoot}`,
            'Drilling & Casing Cost': `$${results.drillingCost.toLocaleString()}`,
            'Pump & Electrical Cost': `$${results.pumpCost.toLocaleString()}`,
            'Total Estimate': `$${results.totalCost.toLocaleString()}`
          }}
        />

        {/* AI-FRIENDLY FAQ SECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:hidden mt-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Formula & Assumptions</h2>
          <div className="text-sm text-gray-600 space-y-2 mb-8">
            <p><strong>Logic:</strong> <code>Drilling Cost = Depth × (Base Rate × Soil Multiplier × Regional Multiplier)</code>. <code>Total Cost = Drilling Cost + Pump System Cost</code>.</p>
            <p>The base rate adjusts dynamically based on the resistance of the selected geology. Deeper wells automatically trigger higher pump system costs, as they require more powerful submersible pumps, thicker wiring gauges to prevent voltage drop, and heavier drop piping.</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to drill a water well on average?</h3>
              <p className="text-gray-600 mb-2">
                The average residential water well sits between 100 and 500 feet deep and costs between <strong>$5,500 and $12,000</strong> to drill and install a pump.
              </p>
              <p className="text-gray-600">
                The price is heavily dependent on soil composition. Puncturing solid bedrock takes much longer, which drives up the per-foot labor cost compared to drilling through soft soil or sand.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I have to pay the driller if they don't find water?</h3>
              <p className="text-gray-600 mb-2">
                <strong>Yes, you do.</strong> This scenario is colloquially called a "dry hole." 
              </p>
              <p className="text-gray-600">
                Well drillers charge by the linear foot drilled regardless of hydrogeological success. If they bore down 300 feet and find zero water deposits, you are still liable for the drilling labor and the steel casing used.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What does the well drilling quote actually cover?</h3>
              <p className="text-gray-600 mb-2">
                A basic well quote generally covers structural extraction: bore drilling, steel or PVC casing, and placing the submersible pump.
              </p>
              <p className="text-gray-600">
                It rarely includes heavy water treatment. Robust filtration systems to address iron, sulfur, or extreme water hardness often cost thousands extra and are installed independently.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
