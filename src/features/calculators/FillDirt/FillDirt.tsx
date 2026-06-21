import React, { useState, useRef } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function FillDirt() {
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(20);
  const [depth, setDepth] = useState(6);
  const [depthUnit, setDepthUnit] = useState('inches');
  const [state, setState] = useState('average');
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const l = Math.max(0, length);
    const w = Math.max(0, width);
    const d = Math.max(0, depth);

    const depthInFeet = depthUnit === 'inches' ? d / 12 : d;
    const cubicFeet = l * w * depthInFeet;
    const cubicYards = cubicFeet / 27;
    const tons = cubicYards * 1.4; // Average density of fill dirt
    
    // Variable pricing based on state/area general costs
    let costPerTon = 25;
    if (state === 'high') costPerTon = 40;
    if (state === 'low') costPerTon = 15;

    const deliveryFee = 100;
    const materialCost = tons * costPerTon;
    const totalCost = materialCost + deliveryFee;
    const truckloads = Math.ceil(tons / 12); // Assuming 12 tons per standard dump truck

    return { 
      cubicYards: cubicYards.toFixed(1),
      tons: tons.toFixed(1),
      truckloads,
      materialCost,
      deliveryFee,
      totalCost
    };
  };

  const results = calculate();

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <SEO 
        title="Fill Dirt Cost & Volume Calculator"
        description="Calculate cubic yards, tons, and cost of fill dirt required for grading, leveling, and rural construction."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Fill Dirt Cost & Volume Calculator",
          "description": "Calculate cubic yards, tons, and cost of fill dirt required for grading, leveling, and rural construction.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      {/* LEFT: CALCULATOR INPUTS */}
      <section className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Configuration</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Length (ft)</label>
              <input type="number" min="1" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Width (ft)</label>
              <input type="number" min="1" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Depth</label>
              <input type="number" min="0.1" step="0.1" value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Unit</label>
              <select value={depthUnit} onChange={(e) => setDepthUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
                <option value="inches">Inches</option>
                <option value="feet">Feet</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Local Price Context</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="low">Low Cost Areas ($15/ton)</option>
              <option value="average">Average Regional Cost ($25/ton)</option>
              <option value="high">High Cost / Rare Sources ($40/ton)</option>
            </select>
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Adjusts material base price</p>
          </div>
        </div>
      </section>

      {/* CENTER: OUTPUTS & VISUALS */}
      <section className="lg:col-span-8 flex flex-col gap-6">
        <div ref={resultRef} className="flex flex-col gap-6 print:m-0 print:gap-4 print:text-black">
          {/* STAT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Cubic Yards</p>
              <p className="text-2xl font-black text-gray-800">{results.cubicYards}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Total Tons (1.4x)</p>
              <p className="text-2xl font-black text-gray-800">{results.tons}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Truckloads</p>
              <p className="text-2xl font-black text-gray-800">{results.truckloads}</p>
            </div>
            <div className="bg-[#1a5f3f] p-4 rounded-xl shadow-md border border-transparent flex flex-col justify-center items-center text-center">
              <p className="text-[10px] font-bold text-green-200 uppercase">Total Estimate</p>
              <p className="text-2xl font-black text-white">${results.totalCost.toFixed(2)}</p>
            </div>
          </div>

          {/* FINANCIAL SUMMARY PANEL */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Cost Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Raw Material Subtotal</span>
                  <span className="font-bold text-gray-900">${results.materialCost.toFixed(2)}</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Delivery Processing</span>
                  <span className="font-bold text-gray-900">${results.deliveryFee.toFixed(2)}</span>
                </li>
                <li className="flex items-center justify-between text-lg font-black pt-3 border-t border-gray-100">
                  <span className="text-[#1a5f3f]">Net Estimate</span>
                  <span className="text-[#1a5f3f]">${results.totalCost.toFixed(2)}</span>
                </li>
              </ul>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800 leading-relaxed flex flex-col justify-center">
                <strong>💡 Topsoil vs Fill:</strong> Remember that topsoil decays over time due to organics. Avoid using topsoil under hardscape slabs to prevent settling cracks. Pure fill dirt guarantees stable compaction.
              </div>
            </div>
          </div>
        </div>

        <CalculatorSanityContent uniqueCode="CALC-PROP-103" />

              <ExportActions 
          title="Fill Dirt Cost Calculator" 
          targetRef={resultRef}
          data={{
            'Length (ft)': length,
            'Width (ft)': width,
            'Depth': `${depth} ${depthUnit}`,
            'Price Context': state.toUpperCase(),
            'Cubic Yards Needed': results.cubicYards,
            'Total Tons': results.tons,
            'Truckloads Needed': results.truckloads,
            'Material Subtotal': `$${results.materialCost.toFixed(2)}`,
            'Delivery Fee': `$${results.deliveryFee.toFixed(2)}`,
            'Total Estimate': `$${results.totalCost.toFixed(2)}`
          }}
        />

        {/* SEO SNIPPET / FAQ */}
        <div className="bg-[#1a5f3f]/5 rounded-xl border border-[#1a5f3f]/10 p-5 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">Guide: Dirt Volumes</h4>
            <div className="text-[11px] leading-relaxed text-gray-700 space-y-2">
              <p>Volumes are measured in cubic yards (occupational space), but trucking is billed by weight (tons). Due to soil density, 1 cubic yard translates to roughly 1.4 tons.</p>
              <p>Prices vary by proximity to excavation sources. In 2026, low-cost rural areas avg $15/ton, whereas urban/high-cost regions easily reach $40/ton prior to long-haul delivery fees.</p>
            </div>
          </div>
          <div className="hidden md:block w-px bg-[#1a5f3f]/10"></div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">FAQ Quick Answers</h4>
            <ul className="text-[11px] space-y-2 text-gray-600">
              <li><strong>Clean Fill Definition:</strong> Fill devoid of hazardous junk, asphalt chunks, and metal.</li>
              <li><strong>Truck Capacity:</strong> Most dump trucks manage about 12 tons at max payload per regional DOT limits.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
