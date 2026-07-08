import React, { useState } from 'react';
import { Truck, HelpCircle } from 'lucide-react';
import { SEO } from '../../../components/SEO';
import { calculateLoan, LoanInput } from '../shared/financeMath';
import { formatCurrency } from '../shared/formatters';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Farm Equipment Payment Calculator",
  "description": "Estimate payment amounts for farm equipment purchases or leases including trade-in and fees.",
  "applicationCategory": "BusinessApplication",
  "url": "https://ruralutilitycost.com/equipment-payment"
};

export default function EquipmentPaymentPage() {
  const [formData, setFormData] = useState({
    equipmentPrice: 85000,
    downPayment: 10000,
    tradeInValue: 5000,
    dealerFees: 1500,
    interestRate: 6.5,
    loanTermYears: 5,
    paymentFrequency: 'monthly' as const,
    amortizationType: 'amortized' as const,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'paymentFrequency' || name === 'amortizationType' ? value : Number(value) || 0,
    }));
  };

  const totalCredits = formData.downPayment + formData.tradeInValue;
  const financedAmount = Math.max(0, formData.equipmentPrice + formData.dealerFees - totalCredits);

  const loanInput: LoanInput = {
    loanAmount: financedAmount,
    interestRate: formData.interestRate,
    loanTermYears: formData.loanTermYears,
    paymentFrequency: formData.paymentFrequency,
    amortizationType: formData.amortizationType,
  };

  const result = calculateLoan(loanInput);
  
  const isValid = totalCredits <= (formData.equipmentPrice + formData.dealerFees) &&
                  formData.loanTermYears > 0 &&
                  formData.interestRate >= 0;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12">
      <SEO 
        title="Farm Equipment Payment Calculator | Rural Utility Cost" 
        description="Estimate payment amounts for tractors, implements, and farm equipment purchases taking trade-in value and fees into account." 
        jsonLd={jsonLd}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg">
              <Truck className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Farm Equipment Payment Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Estimate periodic payment amounts for tractor, harvester, or heavy equipment purchases. Easily incorporate trade-in values, dealer fees, and structured terms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Pricing Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Equipment Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="equipmentPrice"
                      min="0"
                      value={formData.equipmentPrice || ''}
                      onChange={handleInputChange}
                      className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Trade-In Value
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="tradeInValue"
                      min="0"
                      value={formData.tradeInValue || ''}
                      onChange={handleInputChange}
                      className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Down Payment (Cash)
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Dealer Fees / Sales Tax
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="dealerFees"
                      min="0"
                      value={formData.dealerFees || ''}
                      onChange={handleInputChange}
                      className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between items-center text-sm border-t border-gray-200 dark:border-gray-700 pt-2">
                    <span className="text-gray-600 dark:text-gray-400">Net Financed Amount:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(financedAmount)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Terms</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Interest Rate (%)
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
                    Loan Term (Years)
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Frequency
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amortization
                  </label>
                  <select
                    name="amortizationType"
                    value={formData.amortizationType}
                    onChange={handleInputChange}
                    className="block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="amortized">Standard (Level Payments)</option>
                    <option value="fixed-principal">Fixed Principal Base</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {!isValid ? (
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200">
                Please enter valid amounts. Down payment and trade-in combined cannot exceed equipment price plus fees.
              </div>
            ) : (
              <>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Equipment Payment Summary</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                        Estimated {formData.paymentFrequency} Payment
                      </h3>
                      <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                        {formatCurrency(result.periodicPayment)}
                      </div>
                      {formData.amortizationType === 'fixed-principal' && (
                        <div className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                          First payment shown (payments decline slightly over time)
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Financed Amount
                      </h3>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(financedAmount)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Price + Fees - Trade-in - Cash
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Costs Over Life of Loan</h3>
                    <dl className="space-y-4 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Total Finance Interest</dt>
                        <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(result.totalInterest)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Principal Repayment</dt>
                        <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(result.totalPrincipal)}</dd>
                      </div>
                      <div className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-2">
                        <dt className="font-semibold text-gray-900 dark:text-white">Total Out of Pocket</dt>
                        <dd className="font-bold text-gray-900 dark:text-white">{formatCurrency(result.totalRepayment + formData.downPayment)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Calculation Info Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Formula & Assumptions</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      The financed amount is calculated as <code>[Price + Fees] - [Trade-in + Down Payment]</code>. Standard amortization uses compound interest calculations. This is an educational tool and does not reflect final manufacturer financing, dealer incentives, or complex lease schedules.
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6 text-sm">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Should I use dealer financing or a local farm bank?</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">Manufacturers like John Deere or Kubota often offer promotional 0% or low-interest financing to move inventory. However, farm banks (like Farm Credit) might offer better terms if you are rolling the equipment into a larger operating loan or real estate purchase.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Does a trade-in reduce my sales tax?</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">In many states, yes. Trading in old equipment often reduces the taxable amount of the new purchase, meaning you only pay tax on the difference between the new price and your trade-in value.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">What is the difference between standard amortization and fixed principal?</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">Standard amortization keeps your total payment exactly the same every month (interest decreases while principal increases). Fixed principal means you pay a flat amount toward the principal each month plus whatever interest accrued, meaning your first payments are the highest and they decrease over time.</p>
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
