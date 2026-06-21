import { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { Sun, Snowflake, RotateCcw, Zap } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

interface Appliance {
  id: string;
  name: string;
  kw: number;
  isOn: boolean;
}

const DEFAULT_APPLIANCES: Appliance[] = [
  { id: 'ac_central', name: 'Air Conditioner (Central)', kw: 3.5, isOn: false },
  { id: 'ac_window', name: 'Air Conditioner (Window)', kw: 1.4, isOn: false },
  { id: 'heater_base', name: 'Baseboard Heater', kw: 5.0, isOn: false },
  { id: 'furnace', name: 'Electric Furnace', kw: 7.5, isOn: false },
  { id: 'dryer', name: 'Clothes Dryer', kw: 3.5, isOn: false },
  { id: 'washer', name: 'Clothes Washer', kw: 0.8, isOn: false },
  { id: 'dishwasher', name: 'Dishwasher', kw: 1.5, isOn: false },
  { id: 'stove', name: 'Electric Cooktop/Stove', kw: 2.5, isOn: false },
  { id: 'water_heater', name: 'Electric Water Heater', kw: 4.5, isOn: false },
  { id: 'well_pump', name: 'Well Pump (Approx)', kw: 1.5, isOn: false },
];

export default function EnergyDemand() {
  const [demandRate, setDemandRate] = useState<number>(2.75);
  const [appliances, setAppliances] = useState<Appliance[]>(DEFAULT_APPLIANCES);

  const totalKw = appliances.filter(app => app.isOn).reduce((sum, app) => sum + app.kw, 0);
  const estimatedCost = totalKw * demandRate;

  const handleToggle = (id: string) => {
    setAppliances(prev => prev.map(app => 
      app.id === id ? { ...app, isOn: !app.isOn } : app
    ));
  };

  const handleKwChange = (id: string, newKw: number) => {
    setAppliances(prev => prev.map(app => 
      app.id === id ? { ...app, kw: newKw } : app
    ));
  };

  const applyPreset = (preset: 'summer' | 'winter' | 'reset') => {
    setAppliances(prev => prev.map(app => {
      let isOn = false;
      if (preset === 'summer') {
        isOn = ['ac_central', 'washer', 'water_heater', 'well_pump'].includes(app.id);
      } else if (preset === 'winter') {
        isOn = ['furnace', 'dryer', 'water_heater', 'well_pump'].includes(app.id);
      }
      return { ...app, isOn };
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800" id="calculator-content">
      <SEO 
        title="Energy Demand Calculator | Estimate Peak kW Billing"
        description="Calculate peak energy demand charges (kW) based on simultaneous appliance use. See how staggering equipment usage lowers your utility bill."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Energy Demand Calculator",
          "description": "Calculate peak energy demand charges (kW) based on simultaneous appliance use. See how staggering equipment usage lowers your utility bill.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="p-6 md:p-8 flex-grow overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Peak Energy Demand Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Estimate your peak 15-minute demand charge by simulating simultaneous appliance use.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Input Form */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase text-sm tracking-wide">Select Active Appliances</h3>
                    <p className="text-xs text-gray-500 mt-1">What's running at the exact same moment?</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => applyPreset('summer')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg text-sm font-semibold hover:bg-yellow-100 transition-colors"
                    >
                      <Sun className="w-4 h-4" /> Summer
                    </button>
                    <button 
                      onClick={() => applyPreset('winter')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
                    >
                      <Snowflake className="w-4 h-4" /> Winter
                    </button>
                    <button 
                      onClick={() => applyPreset('reset')}
                      className="flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-700 bg-gray-50 border border-gray-200 rounded-lg transition-colors ml-1"
                      title="Reset All"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {appliances.map((app) => (
                    <div 
                      key={app.id} 
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border transition-colors ${app.isOn ? 'bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800/30' : 'bg-gray-50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-700/50'}`}
                    >
                      <div className="flex items-center mb-3 sm:mb-0">
                        <label className="relative inline-flex items-center cursor-pointer mr-4">
                          <input 
                            type="checkbox" 
                            checked={app.isOn} 
                            onChange={() => handleToggle(app.id)} 
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#1a5f3f]"></div>
                        </label>
                        <span className={`text-sm font-semibold ${app.isOn ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                          {app.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:ml-auto pl-14 sm:pl-0">
                        <input 
                          type="number" 
                          min="0"
                          step="0.1"
                          value={app.kw}
                          onChange={(e) => handleKwChange(app.id, Number(e.target.value))}
                          className="w-20 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] text-right"
                          disabled={!app.isOn}
                        />
                        <span className="text-xs font-bold text-gray-500 w-6">kW</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Demand Rate (per kW)</label>
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input 
                    type="number" 
                    className="w-full pl-7 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] transition-colors"
                    step="0.01"
                    min="0"
                    value={demandRate} 
                    onChange={(e) => setDemandRate(Number(e.target.value))} 
                  />
                </div>
                <p className="text-xs text-gray-500">Check your utility statement for your specific rate.</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#1a5f3f]/5 dark:bg-[#6ee7b7]/5 rounded-bl-full flex items-start justify-end p-4">
                  <Zap className="w-6 h-6 text-[#1a5f3f]/20" />
                </div>
                
                <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight relative z-10">Simulation Results</h2>
                
                <div className="mb-6 relative z-10">
                  <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Simultaneous Peak Load</p>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">{totalKw.toFixed(2)} <span className="text-xl text-gray-500 font-bold">kW</span></p>
                </div>

                <div className="p-5 bg-blue-600 dark:bg-[#11402a] text-white rounded-xl shadow-inner relative z-10">
                  <p className="text-blue-100 dark:text-green-100 font-medium tracking-wide uppercase text-xs mb-1">Added Demand Charge</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tight">${estimatedCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>
                  <p className="text-xs text-blue-200 dark:text-green-200 mt-2 font-medium">Added to base & energy fees</p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5 rounded-xl">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Did you know?</strong> Staggering appliance use (e.g., drying clothes at night when the AC isn't running) shrinks your peak interval. This avoids high demand fees without actually lowering your total energy consumption.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 print:hidden">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Plan Your Grid Independence</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  Knowing your peak load is step one for sizing off-grid and backup power systems.
                </p>
                <div className="flex flex-col gap-2">
                  <a href="/solar" className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-[#6ee7b7]">
                    Calculate Solar & Battery Needs →
                  </a>
                  <a href="/gen-critical-load" className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-[#6ee7b7]">
                    Size a Backup Generator →
                  </a>
                  <a href="/utility-cost" className="inline-flex items-center text-xs font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mt-2">
                    View All Energy Tools
                  </a>
                </div>
              </div>

              <CalculatorSanityContent uniqueCode="CALC-UTIL-201" />

              <ExportActions 
                title="Energy Demand Peak"
                data={{
                  ...{  demandRate, activeApplianceCount: appliances.filter(a => a.isOn).length  },
                  ...{  totalKw, estimatedCost  }
                }}
              />
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-6">Understanding Peak Demand Billing</h2>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p>Historically, residential properties were only billed for the total volume of energy they used in a month (kWh). However, many rural electric cooperatives and some municipal utilities are moving to <strong>three-part billing</strong>, which introduces a "Peak Demand" charge.</p>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">kW vs. kWh (The Car Analogy)</h3>
              <p>Think of electricity like driving a car:</p>
              <ul className="list-disc pl-5 mb-8 space-y-2">
                <li><strong>Kilowatt (kW) Demand:</strong> Represents your <i>speed</i>. How fast and heavy are you drawing power from the grid right now? If you turn on the oven, AC, and dryer at the exact same moment, your speed (kW) spikes dramatically.</li>
                <li><strong>Kilowatt Hours (kWh) Use:</strong> Represents the <i>distance</i> traveled. How long did you stay on the road?</li>
              </ul>
              <p>Utilities must build expensive power plants and thick substations sized to handle the absolute peak speed (kW) everyone demands at 5 PM. Demand charges ensure those causing the biggest peaks pay their fair share of the infrastructure.</p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How the 15-Minute Interval Works</h3>
              <p>Most meters measure demand in rolling 15-minute or 30-minute intervals. Your bill uses the <strong>single highest interval</strong> from the entire billing cycle. You could keep your power usage extremely low for 29 days, but if you run every heavy appliance simultaneously for just 15 minutes on a Tuesday, your demand charge will be permanently locked at that high rate for the rest of the month.</p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">How do I lower my demand charge?</h4>
                  <p>You don't need to use less electricity; you just need to spread it out. Run your dishwasher right before bed. Do laundry in the morning when the central AC isn't fighting afternoon heat. This practice is known as "load shifting" or "load balancing."</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Why are rural co-ops doing this?</h4>
                  <p>Rural grids are inherently expensive to maintain because there are fewer homes per mile of wire. Demand fees protect the cooperative from absorbing the huge cost of upgrading transformers just to handle brief, infrequent spikes in member usage.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
