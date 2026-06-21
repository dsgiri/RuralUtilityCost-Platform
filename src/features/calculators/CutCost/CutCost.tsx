import { useState, useRef } from 'react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

export default function CutCost() {
  const [revenue, setRevenue] = useState<number>(10000);
  const [expenses, setExpenses] = useState<number>(8500);
  const [targetProfit, setTargetProfit] = useState<number>(3000);

  const currentProfit = Math.max(0, revenue - expenses);
  const requiredExpenses = Math.max(0, revenue - targetProfit);
  const costCutNeeded = Math.max(0, expenses - requiredExpenses);
  const annualSavings = costCutNeeded * 12;

  const resultRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800" id="calculator-content">
      <SEO 
        title="Cut Cost Calculator | Estimate Savings and Expense Reduction"
        description="Estimate how much expense reduction you need to reach your profit goals with this easy cut cost calculator for small businesses."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Cut Cost Calculator",
          "description": "Estimate how much expense reduction you need to reach your profit goals with this easy cut cost calculator for small businesses.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="p-6 md:p-8 flex-grow overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 print:mb-4">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Cut Cost Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium print:hidden">Estimate how much you need to reduce expenses to reach your target profit.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 print:block">
            {/* Input Form */}
            <div className="lg:col-span-1 space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm print:hidden">
              
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase text-sm tracking-wide">Monthly Financials</h3>
                <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded font-bold">Business</span>
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
            <div className="lg:col-span-2 space-y-6 print:m-0 print:block" ref={resultRef}>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden print:border-none print:shadow-none print:p-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a5f3f]/5 dark:bg-[#6ee7b7]/5 rounded-bl-full print:hidden"></div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight relative z-10 print:hidden">Savings Estimate</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 relative z-10 print:grid-cols-2 print:gap-4 print:mb-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 print:bg-white print:border-b">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Current Monthly Profit</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${currentProfit.toLocaleString()}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 print:bg-white print:border-b">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Required Expenses Level</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${requiredExpenses.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-4">
                  <div className="p-6 bg-[#1a5f3f] dark:bg-[#11402a] text-white rounded-xl shadow-inner relative z-10 print:bg-white print:text-gray-900 print:border print:border-[#1a5f3f] print:shadow-none">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-green-100 font-medium tracking-wide uppercase text-sm print:text-[#1a5f3f]">Monthly Cost Cut Needed</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black tracking-tight">${costCutNeeded.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-blue-600 dark:bg-blue-800 text-white rounded-xl shadow-inner relative z-10 print:bg-white print:text-gray-900 print:border print:border-blue-600 print:shadow-none">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-blue-100 font-medium tracking-wide uppercase text-sm print:text-blue-600">Annual Savings Impact</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black tracking-tight">${annualSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5 rounded-xl print:hidden">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Advice:</strong> Reducing costs often directly impacts your bottom line more effectively than increasing revenue because there are no associated variable costs with the saved money.
                </p>
              </div>

              <ExportActions 
                title="Cut Cost Calculator"
                targetRef={resultRef}
                data={{ 
                  'Revenue': revenue, 
                  'Expenses': expenses, 
                  'Target Profit': targetProfit,
                  'Current Profit': currentProfit, 
                  'Required Expenses': requiredExpenses, 
                  'Monthly Cost Cut Needed': costCutNeeded, 
                  'Annual Savings': annualSavings 
                }}
              />
            </div>
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-6">How to Reduce Business Expenses</h2>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p>Trimming excess costs is the fastest way to increase profitability, especially for rural or local service businesses where revenue naturally fluctuates by season.</p>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Cost Cutting vs. Revenue Growth</h3>
              <p>To increase your profit by $1,000, you can either cut $1,000 in expenses, or increase sales by an amount that leaves $1,000 after paying the costs of delivering those sales (variable costs). If your profit margin is 20%, you'd need $5,000 in new revenue to get the same $1,000 profit you'd get from simple cost cutting.</p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Where should I start cutting costs?</h4>
                  <p>Start with recurring subscription services, unused software, renegotiating vendor contracts, and evaluating your insurance policies. These are "painless" cuts that don't affect your service quality.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Will cutting costs hurt my business?</h4>
                  <p>It can if you cut the wrong things. Avoid cutting customer service quality, essential marketing, or product materials. Focus on administrative bloat and operational inefficiencies.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">How often should I review my expenses?</h4>
                  <p>A quarterly review of a profit and loss statement is highly recommended to catch "subscription creep" and unnecessary spending before it drains your cash reserves.</p>
                </div>
              </div>
            </div>

            <CalculatorSanityContent uniqueCode="CALC-BIZ-401" />

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Rural Business Plan</h3>
              <p className="text-gray-600 mb-4">
                Find matching grants, calculate expansion ROI, and ensure food processing compliance.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/agribusiness" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  Return to Agribusiness Hub
                </a>
                <a href="/pain-point-priority" className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700">
                  Prioritize Pain Points →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
