import React, { useState, useRef } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function Septic() {
  const [bedrooms, setBedrooms] = useState(3);
  const [soil, setSoil] = useState('average');
  const [state, setState] = useState('TX');
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    let minTank = 0;
    if (bedrooms === 1) minTank = 750;
    else if (bedrooms === 2) minTank = 1000;
    else minTank = 1000 + ((bedrooms - 2) * 250);

    const recommended = soil === 'poor' ? minTank * 1.25 : minTank;
    
    // Cost estimate
    const costLow = 1500 + (recommended * 1.5);
    const costHigh = 3500 + (recommended * 2.2);

    return { 
      minTank, 
      recommended: Math.round(recommended), 
      costLow: Math.round(costLow), 
      costHigh: Math.round(costHigh),
      drainField: Math.round(recommended * 0.8) // Simple heuristic
    };
  };

  const results = calculate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Septic Tank Size Calculator",
        "description": "Calculate the required septic tank size based on the number of bedrooms and soil type for residential rural properties.",
        "applicationCategory": "UtilitiesApplication"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What size septic tank do I need for a 3-bedroom house?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For a standard 3-bedroom house, building codes typically require a minimum septic tank size of 1,000 gallons. If you have poor soil (like heavy clay) or use a garbage disposal, inspectors will usually mandate a 1,250-gallon tank to provide extra settling time before wastewater enters the drain field."
            }
          },
          {
            "@type": "Question",
            "name": "Is septic tank size based on square footage or bedrooms?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Septic tank size is based strictly on the number of bedrooms, not the total square footage of the house. This is because health departments correlate the number of bedrooms to the maximum potential human occupancy, which drives daily water usage."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <SEO 
        title="Septic Tank Size Calculator | Rural Utility Cost"
        description="Calculate the required septic tank size based on the number of bedrooms and soil type for residential rural properties."
        jsonLd={jsonLd}
      />
      
      {/* LEFT: CALCULATOR INPUTS */}
      <section className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Number of Bedrooms</label>
            <input type="number" min="1" max="10" value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">EPA baseline estimates occupancy</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">State / Region</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="OTHER">Other State</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Soil Type / Condition</label>
            <select value={soil} onChange={(e) => setSoil(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="good">Good (Sandy, Loamy)</option>
              <option value="average">Average (Silt, mixed)</option>
              <option value="poor">Poor (Heavy Clay, slow percolation)</option>
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
              <p className="text-xs font-bold text-green-200 uppercase tracking-wider mb-1">Recommended Tank Size</p>
              <p className="text-4xl font-black text-white">{results.recommended.toLocaleString()} <span className="text-lg font-bold opacity-80">Gal</span></p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Est. Installation Cost</p>
              <p className="text-2xl font-black text-gray-800">${results.costLow.toLocaleString()} - ${results.costHigh.toLocaleString()}</p>
            </div>
          </div>

          {/* DETAILS PANEL */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Requirement Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Absolute Minimum (EPA)</span>
                  <span className="font-bold text-gray-900">{results.minTank.toLocaleString()} gal</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Soil Condition Modifier</span>
                  <span className="font-bold text-gray-900">{soil === 'poor' ? '+25% Capacity' : 'No Penalty'}</span>
                </li>
                <li className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                  <span className="text-gray-600">Est. Drain Field Size</span>
                  <span className="font-bold text-[#1a5f3f]">{results.drainField.toLocaleString()} sq ft</span>
                </li>
              </ul>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800 leading-relaxed flex flex-col justify-center">
                <strong>⚠️ State Mandates:</strong> Local states ({state}) may have additional structural or capacity mandates depending on local environmental regulations. High-flow fixtures or garbage disposals often trigger a strictly larger requirement tier by inspectors.
              </div>
            </div>
          </div>
        </div>

        <ExportActions 
          title="Septic Tank Size Calculator" 
          targetRef={resultRef}
          data={{
            'Bedrooms': bedrooms,
            'State': state.toUpperCase(),
            'Soil Type': soil.toUpperCase(),
            'Recommended Tank Size (Gal)': results.recommended,
            'Minimum Size (Gal)': results.minTank,
            'Estimated Drain Field (sq ft)': results.drainField,
            'Installation Cost Estimate': `$${results.costLow.toLocaleString()} - $${results.costHigh.toLocaleString()}`
          }}
        />

        <CalculatorSanityContent uniqueCode="CALC-PROP-102" />

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6 print:hidden">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Full Water Plan</h3>
          <p className="text-gray-600 mb-4">
            If you are installing a new septic system, you usually need a well system. Explore our water planning tools.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/water-planning" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              Return to Water Planning Hub
            </a>
            <a href="/well" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
              Calculate Well Drilling Cost →
            </a>
          </div>
        </div>

        {/* AI-FRIENDLY FAQ & HOW IT WORKS */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-4 print:hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What size septic tank do I need for a 3-bedroom house?</h3>
              <p className="text-gray-600 mb-2">
                For a standard 3-bedroom house, building codes typically require an absolute minimum septic tank size of <strong>1,000 gallons</strong>. 
              </p>
              <p className="text-gray-600">
                If you have poor soil (like heavy clay) or heavily use a garbage disposal, inspectors will usually mandate a 1,250-gallon tank. The extra volume provides necessary settling time before wastewater is pushed into the drain field.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is septic tank size based on square footage or bedrooms?</h3>
              <p className="text-gray-600 mb-2">
                Septic tank size is based strictly on the <strong>number of bedrooms</strong>, not the total square footage of the house.
              </p>
              <p className="text-gray-600">
                Health departments and environmental agencies use bedrooms as a legal proxy for maximum potential human occupancy. Even if only two people live in a massive 4-bedroom house, the system must handle the load of a large family if the house is sold later.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How does soil type affect septic systems?</h3>
              <p className="text-gray-600 mb-2">
                Good soil (like sand or loam) allows water to percolate down quickly, allowing for smaller, cheaper drain fields and standard-sized tanks.
              </p>
              <p className="text-gray-600">
                Poor soil (heavy, dense clay) acts like a bathtub. The water drains very slowly. To prevent the drain field from flooding and blowing out (a major structural failure), you must install a larger tank to slow the flow of new water, and drastically increase the physical size of the drain field trenches.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
