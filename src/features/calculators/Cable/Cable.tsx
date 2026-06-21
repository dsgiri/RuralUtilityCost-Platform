import { useState, useRef } from 'react';
import { SEO } from '../../../components/SEO';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function Cable() {
  const [zip, setZip] = useState('76001');
  const [tvs, setTvs] = useState(2);
  const [bundleInternet, setBundleInternet] = useState(false);
  const [sports, setSports] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    // Determine provider availability based on ZIP prefix
    const isUrban = ['760', '770', '782', '750'].some(prefix => zip.startsWith(prefix));
    
    // Base packages
    let dishPrice = 105;
    let directvPrice = 112;
    let streamingPrice = 85;
    let cablePrice = 120; // Cable only exists in urban mostly
    
    // Feature modifiers
    if (sports) {
      dishPrice += 15;
      directvPrice += 20; // DirecTV known for sports premiums
      streamingPrice += 30; // YouTube TV / FuboTV
      cablePrice += 20;
    }
    
    // Per TV fees (First TV is usually included, charge for extras)
    const extraTvs = Math.max(0, tvs - 1);
    dishPrice += extraTvs * 7;
    directvPrice += extraTvs * 7;
    streamingPrice += 0; // Streaming usually allows 3 simultaneous streams
    cablePrice += extraTvs * 10;
    
    const options = [
      { id: 'dish', name: 'Dish Satellite', price: dishPrice, install: 75, channels: 190, available: true, type: 'Satellite' },
      { id: 'directv', name: 'DirecTV', price: directvPrice, install: 75, channels: 165, available: true, type: 'Satellite' },
      { id: 'streaming', name: 'Streaming Bundle (No Install)', price: streamingPrice, install: 0, channels: 100, available: true, type: 'Digital' },
      { id: 'cable', name: 'Traditional Cable', price: cablePrice, install: 100, channels: 200, available: isUrban, type: 'Wired' }
    ];

    const availableOptions = options.filter(o => o.available);
    const bestValue = availableOptions.reduce((prev, curr) => curr.price < prev.price ? curr : prev, availableOptions[0]);

    const chartData = availableOptions.map(o => ({
      name: o.name,
      Channels: o.channels,
      Cost: o.price
    }));

    return {
      availableOptions,
      bestValue,
      chartData
    };
  };

  const results = calculate();

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <SEO 
        title="Rural Cable TV Cost Calculator & Packages" 
        description="Compare Cable TV vs Satellite vs Streaming bundles for rural homes. Find the best TV packages based on your ZIP code."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Cable TV Cost Calculator",
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
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Checks wired cable availability</p>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Number of TVs (Receivers)</label>
            <input type="number" min="1" max="8" value={tvs} onChange={(e) => setTvs(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1a5f3f] outline-none" />
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
            <label className="flex items-center space-x-3 text-sm font-medium text-gray-700 cursor-pointer">
              <input type="checkbox" checked={sports} onChange={(e) => setSports(e.target.checked)} className="h-4 w-4 text-[#1a5f3f] border-gray-300 rounded focus:ring-[#1a5f3f]" />
              <span className="text-xs">Premium Sports Networks</span>
            </label>
            
            <label className="flex items-center space-x-3 text-sm font-medium text-gray-700 cursor-pointer">
              <input type="checkbox" checked={bundleInternet} onChange={(e) => setBundleInternet(e.target.checked)} className="h-4 w-4 text-[#1a5f3f] border-gray-300 rounded focus:ring-[#1a5f3f]" />
              <span className="text-xs">Bundle with Internet</span>
            </label>
          </div>
        </div>
      </section>

      {/* CENTER: OUTPUTS & VISUALS */}
      <section className="lg:col-span-8 flex flex-col gap-6">
        <div ref={resultRef} className="flex flex-col gap-6 print:m-0 print:gap-4 print:text-black">
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1a5f3f] p-5 rounded-xl shadow-md border border-transparent flex justify-between items-center text-left">
              <div>
                <p className="text-xs font-bold text-green-200 uppercase tracking-wider mb-1">Lowest Cost Winner</p>
                <p className="text-2xl font-black text-white">{results.bestValue.name}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-white">${results.bestValue.price}</p>
                <p className="text-xs font-bold text-green-200">/ MO</p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Annual Savings (vs Avg)</p>
              <p className="text-2xl font-black text-[#1a5f3f]">
                ${Math.max(0, (140 - results.bestValue.price) * 12).toLocaleString()} / YEAR
              </p>
            </div>
          </div>

          {/* DETAILS & GRAPH PANEL */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-0 items-start">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 overflow-x-auto">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Pricing Map</h3>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500">
                    <th className="pb-2 font-semibold">Provider</th>
                    <th className="pb-2 font-semibold text-center">Upfront Fees</th>
                    <th className="pb-2 font-semibold text-right">Mthly Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {results.availableOptions.map((opt) => (
                    <tr key={opt.id}>
                      <td className="py-3 font-semibold text-gray-900">
                        {opt.name}
                        {opt.id === results.bestValue.id && <span className="ml-2 text-[9px] bg-green-100 text-green-800 px-1 py-0.5 rounded uppercase">Best Deal</span>}
                      </td>
                      <td className="py-3 text-center text-gray-500 text-[10px]">${opt.install} Install</td>
                      <td className="py-3 text-right font-bold text-gray-800">${opt.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {tvs > 3 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded text-[10px] text-blue-700 leading-normal">
                  <strong>📺 Hidden Hardware Fees:</strong> Wiring 4+ receivers via Satellite or Cable forces heavy monthly rental fees. Streaming bypasses receiver rentals entirely via Smart TVs.
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col h-full">
               <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Available Channel Volume</h3>
               <div className="w-full flex-grow min-h-[160px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={results.chartData} layout="vertical" margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" width={80} fontSize={9} tickLine={false} axisLine={false} />
                     <Tooltip formatter={(value: number) => [`${value} Channels`, 'Count']} cursor={{fill: 'transparent'}} />
                     <Bar dataKey="Channels" fill="#1a5f3f" radius={[0, 4, 4, 0]} opacity={0.6} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>
        </div>

        <CalculatorSanityContent uniqueCode="CALC-UTIL-209" />

              <ExportActions 
          title="Cable TV Cost Calculator" 
          targetRef={resultRef}
          data={{
            'ZIP Code': zip || 'N/A',
            'Number of TVs': tvs,
            'Premium Sports': sports ? 'Yes' : 'No',
            'Bundle Internet': bundleInternet ? 'Yes' : 'No',
            'Lowest Cost Winner': results.bestValue.name,
            'Monthly Cost': `$${results.bestValue.price}`,
            'Annual Savings vs Avg ($140/mo)': `$${Math.max(0, (140 - results.bestValue.price) * 12).toLocaleString()}`
          }}
        />

        {/* SEO SNIPPET / FAQ */}
        <div className="bg-[#1a5f3f]/5 rounded-xl border border-[#1a5f3f]/10 p-5 flex flex-col md:flex-row gap-8 mt-auto">
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">Guide: Rural TV Providers</h4>
            <div className="text-[11px] leading-relaxed text-gray-700 space-y-2">
              <p>For rural properties, Dish Network and DirecTV have been local staples, generally costing $60-150/month. However, with the invasion of robust satellite internet (Starlink), Streaming bundles ($50-120/mo) like YouTube TV and Hulu are dominating.</p>
              <p>Wired Cable is rarely viable far outside city limits unless heavy public infrastructure subsidies pushed line deployments down your road recently.</p>
            </div>
          </div>
          <div className="hidden md:block w-px bg-[#1a5f3f]/10"></div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#1a5f3f] mb-2 uppercase">FAQ Quick Answers</h4>
            <ul className="text-[11px] space-y-2 text-gray-600">
              <li><strong>Dish vs DirecTV:</strong> DirecTV historically held the monopoly on premium sports packages, though Dish often averages cheaper base pricing.</li>
              <li><strong>Streaming:</strong> Dropping satellite saves the $50-100 installation fee and monthly hardware receiver rental costs per TV.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
