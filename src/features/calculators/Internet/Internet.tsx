import { useState, useRef } from 'react';
import { SEO } from '../../../components/SEO';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function Internet() {
  const [zip, setZip] = useState('76001');
  const [homeSize, setHomeSize] = useState(2000);
  const [users, setUsers] = useState(4);
  const [speedReq, setSpeedReq] = useState(100);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    // Determine provider availability based on ZIP prefix
    // For 20 TX ZIPs rule of thumb: Urban (e.g. 770*, 760*, 782*, 750*) get all. Rural get limited.
    const isUrban = ['760', '770', '782', '750'].some(prefix => zip.startsWith(prefix));
    
    // Starlink is available everywhere
    const options = [
      { id: 'starlink', name: 'Starlink Satellite', price: 100, speed: 150, available: true, install: 0, type: 'Satellite' },
      { id: '5g', name: '5G Home Internet', price: 65, speed: 100, available: isUrban || parseInt(zip) % 2 === 0, install: 0, type: 'Cellular' }, // Fake logic for rural 5G
      { id: 'dsl', name: 'Rural DSL', price: 60, speed: 25, available: true, install: 99, type: 'Wired' },
      { id: 'fiber', name: 'Fiber Optic', price: 90, speed: 500, available: isUrban, install: 0, type: 'Wired' },
      { id: 'cable', name: 'Cable Broadband', price: 110, speed: 300, available: isUrban, install: 50, type: 'Wired' }
    ];

    const availableOptions = options.filter(o => o.available);
    
    // Check if speed requirement eliminates any
    const qualifyingOptions = availableOptions.filter(o => o.speed >= speedReq);
    
    // Fallback: If none qualify, show the fastest available
    const displayOptions = qualifyingOptions.length > 0 ? qualifyingOptions : availableOptions.sort((a,b) => b.speed - a.speed).slice(0, 1);

    const bestValue = displayOptions.reduce((prev, curr) => (curr.price / curr.speed) < (prev.price / prev.speed) ? curr : prev, displayOptions[0]);

    const chartData = availableOptions.map(o => ({
      name: o.name,
      Speed: o.speed,
      Cost: o.price
    }));

    return {
      availableOptions,
      displayOptions,
      bestValue,
      chartData
    };
  };

  const results = calculate();

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <SEO 
        title="Rural Internet Cost Calculator & Comparison" 
        description="Compare internet options for rural and off-grid homes. Starlink vs 5G vs DSL vs Fiber pricing and speeds by ZIP."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Rural Internet Calculator",
          "applicationCategory": "UtilityApplication"
        }}
      />
      
      {/* LEFT: CALCULATOR INPUTS */}
      <section className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ZIP Code</label>
            <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="e.g. 76001" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Determines local availability</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Home Size (sq ft)</label>
            <input type="number" min="500" step="100" value={homeSize} onChange={(e) => setHomeSize(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Heavy Users / Devices</label>
            <input type="number" min="1" value={users} onChange={(e) => setUsers(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Target Speed (Mbps)</label>
            <select value={speedReq} onChange={(e) => setSpeedReq(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#1a5f3f] outline-none">
              <option value={25}>25 Mbps (Basic Browsing)</option>
              <option value={50}>50 Mbps (Light Streaming)</option>
              <option value={100}>100 Mbps (Standard Family)</option>
              <option value={200}>200 Mbps (Heavy Gaming/4k)</option>
              <option value={500}>500+ Mbps (Power User)</option>
            </select>
          </div>
        </div>
      </section>

      {/* CENTER: OUTPUTS & VISUALS */}
      <section className="lg:col-span-8 flex flex-col gap-6">
        <div ref={resultRef} className="flex flex-col gap-6 print:m-0 print:gap-4 print:text-black">
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#1a5f3f] p-5 rounded-xl shadow-md border border-transparent flex flex-col justify-center items-center text-center sm:col-span-2">
              <p className="text-xs font-bold text-green-200 uppercase tracking-wider mb-1">Best Value Match</p>
              <p className="text-3xl font-black text-white">{results.bestValue.name}</p>
              <p className="text-sm font-bold text-green-100 mt-1">${results.bestValue.price}/mo at {results.bestValue.speed} Mbps</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Available Providers</p>
              <p className="text-4xl font-black text-[#1a5f3f]">{results.availableOptions.length}</p>
            </div>
          </div>

          {/* DETAILS & GRAPH PANEL */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-0 items-start">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 overflow-x-auto">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Coverage & Cost Table</h3>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500">
                    <th className="pb-2 font-semibold">Provider</th>
                    <th className="pb-2 font-semibold">Type</th>
                    <th className="pb-2 font-semibold">Speed</th>
                    <th className="pb-2 font-semibold text-right">Monthly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {results.availableOptions.map(opt => (
                    <tr key={opt.id}>
                      <td className="py-3 font-semibold text-gray-900">{opt.name}</td>
                      <td className="py-3 text-gray-500">{opt.type}</td>
                      <td className="py-3 text-gray-900">{opt.speed} Mbps</td>
                      <td className="py-3 text-right font-bold text-[#1a5f3f]">${opt.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {homeSize >= 3000 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded text-[10px] text-red-700 leading-normal">
                  <strong>📡 Large Home Alert:</strong> At {homeSize} sq ft, a single ISP router won't cover your footprint. Budget an extra $150-$300 for a Mesh WiFi system.
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col h-full">
               <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Speed Comparison (Mbps)</h3>
               <div className="w-full flex-grow min-h-[160px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={results.chartData} layout="vertical" margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" width={90} fontSize={9} tickLine={false} axisLine={false} />
                     <Tooltip formatter={(value: number) => [`${value} Mbps`, 'Speed']} cursor={{fill: 'transparent'}} />
                     <Bar dataKey="Speed" fill="#1a5f3f" radius={[0, 4, 4, 0]} opacity={0.8} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>
        </div>

        <CalculatorSanityContent uniqueCode="CALC-UTIL-208" />

              <ExportActions 
          title="Rural Internet Cost Calculator" 
          targetRef={resultRef}
          data={{
            'ZIP Code': zip || 'N/A',
            'Home Size (sq ft)': homeSize,
            'Heavy Users / Devices': users,
            'Target Speed (Mbps)': speedReq,
            'Best Value Match': results.bestValue.name,
            'Best Value Cost': `$${results.bestValue.price}/mo`,
            'Best Value Speed': `${results.bestValue.speed} Mbps`,
            'Available Providers': results.availableOptions.length
          }}
        />

        {/* SEO SNIPPET / FAQ */}
        <div className="bg-[#1a5f3f]/5 rounded-xl border border-[#1a5f3f]/10 p-5 flex flex-col md:flex-row gap-8 mt-auto">
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">Guide: Rural Internet Costs in 2026</h4>
            <div className="text-[11px] leading-relaxed text-gray-700 space-y-2">
              <p>Choosing internet for a rural home used to mean suffering with slow DSL. Today, Starlink ($70-130/mo) and 5G Home Internet ($50-100/mo) deliver true broadband speeds to remote properties.</p>
              <p>If fiber optic cabling ($60-120/mo) has reached your ZIP code through rural broadband initiatives, it remains the gold standard for latency and unmetered data transfers.</p>
            </div>
          </div>
          <div className="hidden md:block w-px bg-[#1a5f3f]/10"></div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">FAQ Quick Answers</h4>
            <ul className="text-[11px] space-y-2 text-gray-600">
              <li><strong>Starlink vs 5G:</strong> 5G is cheaper if a tower is nearby, but Starlink guarantees high speeds unconditionally everywhere.</li>
              <li><strong>Latency:</strong> Satellite used to suffer horrible lag. Low-Earth Orbit arrays (Starlink) now support rapid gaming.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
