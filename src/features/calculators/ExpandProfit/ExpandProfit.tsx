import { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function ExpandProfit() {
  const [revenue, setRevenue] = useState<number>(10000);
  const [expenses, setExpenses] = useState<number>(8500);
  const [targetProfit, setTargetProfit] = useState<number>(3000);

  const currentProfit = Math.max(0, revenue - expenses);
  const requiredRevenue = expenses + targetProfit;
  const revenueIncreaseNeeded = Math.max(0, requiredRevenue - revenue);
  const percentIncrease = revenue > 0 ? (revenueIncreaseNeeded / revenue) * 100 : 0;
  
  const annualProfit = targetProfit * 12;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800" id="calculator-content">
      <SEO 
        title="Expand Profit Calculator | Estimate Revenue Needed for Growth"
        description="Estimate how much revenue growth you need to reach your profit goals with this simple business profit expansion calculator."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Expand Profit Calculator",
          "description": "Estimate how much revenue growth you need to reach your profit goals with this simple business profit expansion calculator.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="p-6 md:p-8 flex-grow overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Expand Profit Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Estimate the revenue growth needed to hit your target profit points.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Input Form */}
            <div className="lg:col-span-1 space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase text-sm tracking-wide">Monthly Financials</h3>
                <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-1 rounded font-bold">Growth</span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Current Monthly Revenue</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input 
                    type="number" 
                    className="w-full pl-7 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] transition-colors"
                    value={revenue} 
                    onChange={(e) => setRevenue(Number(e.target.value))} 
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Current Monthly Expenses</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input 
                    type="number" 
                    className="w-full pl-7 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] transition-colors"
                    value={expenses} 
                    onChange={(e) => setExpenses(Number(e.target.value))} 
                    min="0"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Target Monthly Profit</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input 
                    type="number" 
                    className="w-full pl-7 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] transition-colors"
                    value={targetProfit} 
                    onChange={(e) => setTargetProfit(Number(e.target.value))} 
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a5f3f]/5 dark:bg-[#6ee7b7]/5 rounded-bl-full"></div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight relative z-10">Revenue Target</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 relative z-10">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Current Monthly Profit</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${currentProfit.toLocaleString()}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Target Annual Profit</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${annualProfit.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-indigo-600 dark:bg-indigo-800 text-white rounded-xl shadow-inner relative z-10">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-indigo-100 font-medium tracking-wide uppercase text-sm">Target Monthly Revenue</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black tracking-tight">${requiredRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-[#1a5f3f] dark:bg-[#11402a] text-white rounded-xl shadow-inner relative z-10">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-green-100 font-medium tracking-wide uppercase text-sm">Revenue Increase Needed</p>
                      <span className="text-sm bg-black/20 px-2 py-1 rounded font-bold">+{percentIncrease.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black tracking-tight">${revenueIncreaseNeeded.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5 rounded-xl">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Notes:</strong> This calculation assumes your expenses remain fixed as your revenue grows. If providing more services requires more materials or labor (variable costs), you will actually need a higher revenue target than shown here.
                </p>
              </div>

              <ExportActions 
                title="Expand Profit"
                data={{
                  ...{  revenue, expenses, targetProfit  },
                  ...{  currentProfit, requiredRevenue, revenueIncreaseNeeded, percentIncrease  }
                }}
              />
            </div>
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm print:hidden">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-6">Formula & Assumptions</h2>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p><strong>Logic:</strong> <code>Required Revenue = Expenses + Target Profit</code>. <code>Revenue Increase Needed = Required Revenue - Current Revenue</code>.</p>
              <p>For rural and local businesses, increasing profit often means optimizing pricing, finding new markets, or adding higher-margin services without increasing overhead.</p>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Revenue vs. Profit</h3>
              <p>It's vital to remember that a $1,000 increase in sales does not mean a $1,000 increase in your bank account. Depending on your margins, it may only yield $100 to $300 in actual take-home profit. That's why planning based on your <i>target profit</i> is much more effective than just chasing top-line sales.</p>
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm print:hidden">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-6">Frequently Asked Questions</h2>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">How can I increase revenue without advertising?</h4>
                  <p>Pricing adjustments, upselling current clients (e.g., offering annual maintenance contracts), and asking for referrals are the fastest low-cost ways to boost monthly revenue.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">What is a break-even point?</h4>
                  <p>Your break-even point is when your revenue exactly equals your expenses (Profit = $0). Knowing this number is critical before planning aggressive growth strategies.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Why are my expenses going up with my revenue?</h4>
                  <p>Often, businesses confuse fixed expenses (rent, insurance) with variable expenses (materials, labor). As you sell more, your variable expenses naturally rise, which eats into profit margins if you haven't priced correctly.</p>
                </div>
              </div>
            </div>
          </div>

          <CalculatorSanityContent uniqueCode="CALC-BIZ-402" />

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Rural Business Plan</h3>
            <p className="text-gray-600 mb-4">
              Find matching grants, calculate expansion ROI, and ensure food processing compliance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/agribusiness" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                Return to Agribusiness Hub
              </a>
              <a href="/cut-cost" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700">
                Calculate Savings →
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
