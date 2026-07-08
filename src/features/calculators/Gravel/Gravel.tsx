import React, { useState, useRef } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function Gravel() {
  const [length, setLength] = useState(50);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(3);
  const [type, setType] = useState('crushed');
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const l = Math.max(0, length);
    const w = Math.max(0, width);
    const d = Math.max(0, depth);

    // formula: L * W * (D/12)
    const cubicFeet = l * w * (d / 12);
    const cubicYards = cubicFeet / 27;
    const tons = cubicYards * 1.5; // Gravel is denser than dirt
    
    let costPerTon = 25;
    if (type === 'pea') costPerTon = 45;
    if (type === 'river') costPerTon = 75;

    const deliveryFee = 120; // flat estimate
    const materialCost = tons * costPerTon;
    const totalCost = materialCost + deliveryFee;
    const truckloads = Math.ceil(tons / 10);

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
    <div className="p-4 sm:p-6">
      <SEO 
        title="Gravel Cost Calculator for Driveways"
        description="Estimate gravel needed for rural driveways, pathways, and landscaping. Accounts for crushed stone, pea gravel, and river rock."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Gravel Cost Calculator for Driveways",
          "description": "Estimate gravel needed for rural driveways, pathways, and landscaping. Accounts for crushed stone, pea gravel, and river rock.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Gravel Cost Calculator</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Estimate gravel needed for rural driveways, pathways, and landscaping. Accounts for crushed stone, pea gravel, and river rock.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Depth (inches)</label>
            <input type="number" min="1" step="0.5" value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Standard driveways need 3-4 inches</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Gravel Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value="crushed">Base / Crushed Limestone ($25/ton)</option>
              <option value="pea">Pea Gravel ($45/ton)</option>
              <option value="river">River Rock / Decorative ($75/ton)</option>
            </select>
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
              <p className="text-[10px] font-bold text-gray-400 uppercase">Total Tons (1.5x)</p>
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
                <strong>💡 Driveway Design:</strong> Prices historically sit around $15-$30 per ton for crushed stone. The sharp, jagged edges lock together to form a highly compact, load-bearing surface optimal for cars and farm equipment.
              </div>
            </div>
          </div>
        </div>

        <CalculatorSanityContent uniqueCode="CALC-PROP-104" />

              <ExportActions 
          title="Gravel Cost Calculator" 
          targetRef={resultRef}
          data={{
            'Length (ft)': length,
            'Width (ft)': width,
            'Depth (inches)': depth,
            'Gravel Type': type.toUpperCase(),
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
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">Formula & Assumptions</h4>
            <div className="text-[11px] leading-relaxed text-gray-700 space-y-2">
              <p>Gravel density requires a 1.5x multiplier when converting cubic yards to tons. A brand new driveway should have a minimum of 4 inches of gravel to distribute the weight of vehicles without exposing bare soil. A top-up dressing usually requires 2 inches.</p>
              <p><strong>Logic:</strong> <code>Cubic Yards = (Length × Width × (Depth / 12)) / 27</code>. <code>Tons = Cubic Yards × 1.5</code>.</p>
            </div>
          </div>
          <div className="hidden md:block w-px bg-[#1a5f3f]/10"></div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">FAQ Quick Answers</h4>
            <ul className="text-[11px] space-y-2 text-gray-600">
              <li><strong>Pea Gravel Warning:</strong> Do not use for driveways because the round edges slide against each other under tire weight, causing ruts.</li>
              <li><strong>Sinking Stones:</strong> Geotextile fabric is highly recommended for muddy soils to prevent stones from sinking into the subgrade over the years.</li>
            </ul>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
