import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Droplet, Navigation, Archive, ChevronRight, Info } from 'lucide-react';

export default function WaterPlanningHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does it cost to haul water to a rural property?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Water hauling costs depend on distance, truck capacity, and local water rates. Delivery usually costs more than the water itself, and can range significantly if you rely on commercial haulers rather than hauling yourself."
        }
      },
      {
        "@type": "Question",
        "name": "Should I try to drill a new well or haul water?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Calculate the upfront cost of well drilling (which is not guaranteed to find good water) against the combined capital cost of cisterns plus the ongoing operational cost of hauling water. Over 10-15 years, a well is almost always cheaper if water is viable on your land."
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="Rural Water Planning Hub" 
        description="Calculators and planning tools for managing rural water access, including water hauling, well drilling, and septic system costs."
        url="/water-planning"
        jsonLd={jsonLd}
        keywords={['water', 'wells', 'septic', 'plumbing', 'hauling']}
      />

      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Rural Water Planning Hub</h1>
        <p className="text-xl text-gray-600">
          The most critical resource on any homestead. Plan your water supply strategy by comparing well costs, calculating hauling budgets, and estimating septic requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Droplet className="text-blue-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Water Hauling Calculator</h2>
          <p className="text-gray-600 mb-4">
            Estimate the true cost of hauling water to fill cisterns, including vehicle wear, fuel, time, and bulk water costs.
          </p>
          <Link to="/water-fill" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Calculate Hauling <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-cyan-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Navigation className="text-cyan-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Well Drilling Budget</h2>
          <p className="text-gray-600 mb-4">
            Estimate the cost to drill, case, and equip a deep water well on your property to gain independent water access.
          </p>
          <Link to="/well" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Estimate Well Costs <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Archive className="text-emerald-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Septic System Estimator</h2>
          <p className="text-gray-600 mb-4">
            Plan your septic budget based on household size and soil type (perc test results) to ensure safe wastewater management.
          </p>
          <Link to="/septic" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Estimate Septic <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 mb-12 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 focus:outline-none mb-2">Is it cheaper to haul water or drill a well?</h3>
            <p className="text-gray-600">Drilling a well requires a huge upfront cost, but hauling water costs you heavily in fuel and time over the long run. If you plan to stay on the property for more than 10 years, financing a well is usually the cheaper choice.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 focus:outline-none mb-2">How much water storage do I need if I haul?</h3>
            <p className="text-gray-600">Keep at least a one-month supply on hand to survive truck breakdowns, bad roads, or severe winter storms. For a conservative household, that means storing 1,500 to 2,500 gallons.</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg border border-blue-100">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-bold text-blue-800 tracking-tight">Pro-Tip for Rural Water</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Catching rainwater can save you massive amounts of money on hauling. Even if you don't filter it for drinking, rainwater is perfect for livestock, gardens, and washing vehicles. Save your expensive potable water for the house.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
