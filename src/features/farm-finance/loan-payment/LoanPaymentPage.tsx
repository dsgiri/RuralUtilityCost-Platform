import React, { useState } from 'react';
import { Calculator, HelpCircle } from 'lucide-react';
import { SEO } from '../../../components/SEO';
import { calculateLoan, LoanInput } from '../shared/financeMath';
import { formatCurrency } from '../shared/formatters';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Farm Loan Payment Calculator",
  "description": "Estimate periodic loan payments for farm, ranch, livestock, land, or general ag financing.",
  "applicationCategory": "BusinessApplication",
  "url": "https://ruralutilitycost.com/farm-loan-payment"
};

export default function LoanPaymentPage() {
  const [formData, setFormData] = useState({
    purchasePrice: 150000,
    downPayment: 30000,
    interestRate: 7.5,
    loanTermYears: 15,
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

  const financedAmount = Math.max(0, formData.purchasePrice - formData.downPayment);

  const loanInput: LoanInput = {
    loanAmount: financedAmount,
    interestRate: formData.interestRate,
    loanTermYears: formData.loanTermYears,
    paymentFrequency: formData.paymentFrequency,
    amortizationType: formData.amortizationType,
  };

  const result = calculateLoan(loanInput);
  
  const isValid = formData.purchasePrice >= formData.downPayment &&
                  formData.loanTermYears > 0 &&
                  formData.interestRate >= 0;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12">
      <SEO 
        title="Farm & Ag Loan Payment Calculator | Rural Utility Cost" 
        description="Estimate periodic loan payments for farm, ranch, livestock, land, or general ag financing. Supports amortized and fixed principal structures." 
        jsonLd={jsonLd}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Farm Loan Payment Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Estimate your periodic payments for farm, ranch, land, or operating loans. This tool supports standard amortized structures and fixed principal structures commonly used by agricultural lenders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Loan Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Purchase Price / Target Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="purchasePrice"
                      min="0"
                      value={formData.purchasePrice || ''}
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
                  {formData.downPayment > formData.purchasePrice && (
                    <p className="mt-1 text-sm text-red-600">Down payment cannot exceed purchase price.</p>
                  )}
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Financed Amount:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(financedAmount)}</span>
                  </div>
                </div>

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
                    Amortization Type
                  </label>
                  <select
                    name="amortizationType"
                    value={formData.amortizationType}
                    onChange={handleInputChange}
                    className="block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="amortized">Regular Amortized (Level Payments)</option>
                    <option value="fixed-principal">Fixed Principal (Declining Payments)</option>
                  </select>
                </div>

              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {!isValid ? (
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200">
                Please enter a valid target amount, positive term, and ensure down payment does not exceed purchase price.
              </div>
            ) : (
              <>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment Summary</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                        {formData.amortizationType === 'fixed-principal' ? 'First Periodic Payment' : 'Periodic Payment'}
                      </h3>
                      <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                        {formatCurrency(result.periodicPayment)}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-400 mt-1 capitalize">
                        {formData.paymentFrequency}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Total Interest Paid
                      </h3>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(result.totalInterest)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Over {formData.loanTermYears} years
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <dl className="space-y-4 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Total Principal (Financed Amount)</dt>
                        <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(result.totalPrincipal)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Total Interest</dt>
                        <dd className="font-medium text-gray-900 dark:text-white">{formatCurrency(result.totalInterest)}</dd>
                      </div>
                      <div className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-2">
                        <dt className="font-semibold text-gray-900 dark:text-white">Total Cost of Loan</dt>
                        <dd className="font-bold text-gray-900 dark:text-white">{formatCurrency(result.totalRepayment)}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div className="mt-8 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400">
                    <p className="flex gap-2">
                      <HelpCircle className="w-5 h-5 flex-shrink-0 text-gray-400" />
                      <span>
                        <strong>Note on {formData.amortizationType === 'fixed-principal' ? 'Fixed Principal' : 'Amortized'} Loans: </strong>
                        {formData.amortizationType === 'fixed-principal' 
                          ? 'With fixed principal, a standard principal portion is paid every period plus interest on the remaining balance. Payments will decline over time.'
                          : 'With an amortized structure, your periodic payment remains level. Early payments are mostly interest, while later payments go primarily towards principal.'
                        }
                      </span>
                    </p>
                  </div>
                </div>

                {/* Calculation Info Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Formula & Assumptions</h3>
                   <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                     This calculator estimates repayment based on standard compounding interest logic where interest compounds per payment period. Real agricultural loans may include origination fees, closing costs, or variable rates that are not reflected here. This is an educational estimate and not an official offer of credit.
                   </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6 text-sm">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Why would I choose annual or semi-annual payments?</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">Unlike residential mortgages which are almost always monthly, farm operating loans and land loans are often structured around harvest schedules. If your primary revenue comes once a year when crops are sold or calves are weaned, an annual payment structure aligns your debt obligations with your cash flow.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">What is a fixed principal loan?</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">In a fixed principal loan, you pay the exact same amount of principal every period, plus whatever interest has accrued on the remaining balance. Your first payment will be the largest, and subsequent payments will steadily decline as the interest burden shrinks. This pays less total interest over the life of the loan compared to standard amortization.</p>
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
