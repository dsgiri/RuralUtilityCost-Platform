import React, { useState } from 'react';
import { Map, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { SEO } from '../../../components/SEO';
import { calculateLoan, LoanInput, periodsPerYear, PaymentFrequency } from '../shared/financeMath';
import { formatCurrency } from '../shared/formatters';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Land Affordability Calculator",
  "description": "Determine whether land payments are likely to be covered by income from the land.",
  "applicationCategory": "BusinessApplication",
  "url": "https://ruralutilitycost.com/land-affordability"
};

export default function LandAffordabilityPage() {
  const [formData, setFormData] = useState({
    landPrice: 500000,
    downPayment: 100000,
    interestRate: 6.5,
    loanTermYears: 20,
    paymentFrequency: 'annual' as PaymentFrequency,
    annualLandIncome: 45000,
    annualOperatingCosts: 15000,
    reserveMarginPercentage: 10,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'paymentFrequency' ? value : Number(value) || 0,
    }));
  };

  const financedAmount = Math.max(0, formData.landPrice - formData.downPayment);

  const loanInput: LoanInput = {
    loanAmount: financedAmount,
    interestRate: formData.interestRate,
    loanTermYears: formData.loanTermYears,
    paymentFrequency: formData.paymentFrequency,
    amortizationType: 'amortized',
  };

  const loanResult = calculateLoan(loanInput);
  
  // Calculate annualized debt service (how much they pay to the bank per year)
  const annualDebtService = loanResult.periodicPayment * periodsPerYear[formData.paymentFrequency];
  
  const netLandIncome = formData.annualLandIncome - formData.annualOperatingCosts;
  
  // Reserve margin in dollars
  const reserveAmount = annualDebtService * (formData.reserveMarginPercentage / 100);
  const requiredIncome = annualDebtService + reserveAmount;
  
  const surplusOrDeficit = netLandIncome - requiredIncome;
  
  let affordabilityStatus: 'affordable' | 'borderline' | 'not-affordable' = 'affordable';
  if (netLandIncome < annualDebtService) {
    affordabilityStatus = 'not-affordable';
  } else if (netLandIncome < requiredIncome) {
    affordabilityStatus = 'borderline';
  }

  const isValid = formData.landPrice > 0 && 
                  formData.downPayment <= formData.landPrice &&
                  formData.loanTermYears > 0 &&
                  formData.interestRate >= 0;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12">
      <SEO 
        title="Land Affordability Calculator | Rural Utility Cost" 
        description="Determine whether land loan payments can be covered by the farm or ranch's expected income." 
        jsonLd={jsonLd}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-lg">
              <Map className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Land Affordability Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Determine whether land loan payments are likely to be covered by the land's actual income, accounting for operating costs and safety reserves.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Purchase & Loan</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Land Purchase Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="landPrice"
                      min="0"
                      value={formData.landPrice || ''}
                      onChange={handleInputChange}
                      className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Down Payment
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="downPayment"
                      min="0"
                      value={formData.downPayment || ''}
                      onChange={handleInputChange}
                      className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Rate (%)
                    </label>
                    <input
                      type="number"
                      name="interestRate"
                      min="0"
                      step="0.1"
                      value={formData.interestRate || ''}
                      onChange={handleInputChange}
                      className="block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Term (Yrs)
                    </label>
                    <input
                      type="number"
                      name="loanTermYears"
                      min="1"
                      value={formData.loanTermYears || ''}
                      onChange={handleInputChange}
                      className="block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Schedule
                  </label>
                  <select
                    name="paymentFrequency"
                    value={formData.paymentFrequency}
                    onChange={handleInputChange}
                    className="block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="semiannual">Semi-Annual</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Income & Operations</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expected Gross Annual Income
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="annualLandIncome"
                      min="0"
                      value={formData.annualLandIncome || ''}
                      onChange={handleInputChange}
                      className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">From crops, leases, hunting, timber, etc.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Annual Operating Costs
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="annualOperatingCosts"
                      min="0"
                      value={formData.annualOperatingCosts || ''}
                      onChange={handleInputChange}
                      className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Taxes, insurance, maintenance, seeding, etc.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Required Safety Reserve (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="reserveMarginPercentage"
                      min="0"
                      max="100"
                      value={formData.reserveMarginPercentage || ''}
                      onChange={handleInputChange}
                      className="block w-full pr-8 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Buffer against volatility (traditionally 10-25%).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {!isValid ? (
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200">
                Please enter a valid land price and term.
              </div>
            ) : netLandIncome <= 0 ? (
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200">
                Negative or zero net income means the land will not support itself. Off-farm income or other capital will be required to service the debt.
              </div>
            ) : (
              <>
                <div className={`p-6 rounded-xl shadow-sm border ${
                  affordabilityStatus === 'affordable' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                  affordabilityStatus === 'borderline' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
                  'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                }`}>
                  <div className="flex items-start gap-4 mb-4">
                    {affordabilityStatus === 'affordable' && <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0" />}
                    {affordabilityStatus === 'borderline' && <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />}
                    {affordabilityStatus === 'not-affordable' && <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />}
                    
                    <div>
                      <h2 className={`text-xl font-bold ${
                        affordabilityStatus === 'affordable' ? 'text-green-900 dark:text-green-300' :
                        affordabilityStatus === 'borderline' ? 'text-yellow-900 dark:text-yellow-300' :
                        'text-red-900 dark:text-red-300'
                      }`}>
                        {affordabilityStatus === 'affordable' && 'Affordable (Self-Sustaining)'}
                        {affordabilityStatus === 'borderline' && 'Borderline / High Risk'}
                        {affordabilityStatus === 'not-affordable' && 'Not Affordable on Land Income Alone'}
                      </h2>
                      <p className={`mt-1 text-sm ${
                        affordabilityStatus === 'affordable' ? 'text-green-800 dark:text-green-400' :
                        affordabilityStatus === 'borderline' ? 'text-yellow-800 dark:text-yellow-400' :
                        'text-red-800 dark:text-red-400'
                      }`}>
                        {affordabilityStatus === 'affordable' && `The expected net income covers the debt and your ${formData.reserveMarginPercentage}% safety reserve.`}
                        {affordabilityStatus === 'borderline' && 'Income covers the base debt service, but not your requested safety reserve cushion.'}
                        {affordabilityStatus === 'not-affordable' && 'The net income generated by the land is less than the bank payments. Off-farm income will be required.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Annual Cash Flow Summary</h3>
                  
                  <div className="space-y-4">
                    {/* Income block */}
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Net Land Income</div>
                        <div className="text-xs text-gray-500">Gross Income - Operating Costs</div>
                      </div>
                      <div className="font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(netLandIncome)}
                      </div>
                    </div>

                    {/* Debt Service */}
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Annual Debt Service</div>
                        <div className="text-xs text-gray-500">
                          {formData.paymentFrequency === 'annual' ? '1 payment per year' : `${periodsPerYear[formData.paymentFrequency]} payments of ${formatCurrency(loanResult.periodicPayment)}`}
                        </div>
                      </div>
                      <div className="font-semibold text-red-600 dark:text-red-400">
                        -{formatCurrency(annualDebtService)}
                      </div>
                    </div>
                    
                    {/* Safety Reserve */}
                    {reserveAmount > 0 && (
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Safety Reserve Target</div>
                          <div className="text-xs text-gray-500">{formData.reserveMarginPercentage}% of debt service</div>
                        </div>
                        <div className="font-semibold text-yellow-600 dark:text-yellow-400">
                          -{formatCurrency(reserveAmount)}
                        </div>
                      </div>
                    )}

                    {/* Final Bottom Line */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="font-bold text-gray-900 dark:text-white">Annual Surplus or (Shortfall)</div>
                      <div className={`font-bold text-lg ${surplusOrDeficit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {surplusOrDeficit > 0 ? '+' : ''}{formatCurrency(surplusOrDeficit)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculation Info Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Info className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Formula & Assumptions</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      This calculator evaluates the <strong>Debt Service Coverage Ratio (DSCR)</strong> concept used by ag lenders. Lenders typically look for net farm income to be at least 1.1x to 1.25x the annual debt service (a 10% to 25% safety reserve). If the land itself can't carry the note, you must rely on off-farm income or other business revenue. Property taxes and maintenance are treated as fixed carrying costs that reduce your available debt service buffer.
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6 text-sm">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">What is a good DSCR (Debt Service Coverage Ratio)?</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">Most agricultural lenders look for a DSCR of at least 1.25. This means your net operating income should be 25% higher than your debt payments, providing a buffer against bad crop years or unexpected expenses.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Why does bare land require higher down payments?</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">Unlike houses, bare land does not provide immediate shelter and is considered a higher risk by banks. While residential mortgages can require as little as 3-5% down, bare land loans typically require 20% to 50% down.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Can off-farm income help me qualify?</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">Yes. If the agricultural revenue from the land cannot cover the mortgage (which is very common), lenders will look at your W-2 off-farm income to bridge the gap and satisfy the debt coverage requirements.</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
