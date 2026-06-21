import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Flame, Wifi, Sun, Zap, Tv, ChevronRight, Info } from 'lucide-react';

export default function UtilityCostHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does propane cost on a rural property?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Propane costs vary based on usage (heating, cooking, hot water), tank size, and seasonal rates. Estimating your burn rate and buying in the off-season can significantly reduce your winter heating bills."
        }
      },
      {
        "@type": "Question",
        "name": "Is rural solar worth the investment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Solar ROI in rural areas depends on your local peak energy rates, available sunlight, and state incentives. Generating your own power can offset expensive rural grid connections and demand charges."
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="Rural Utility Cost Hub" 
        description="Comprehensive tools and calculators for managing and budgeting rural utility costs including propane, electricity, solar, and internet."
        url="/utility-cost"
        jsonLd={jsonLd}
        keywords={['utilities', 'electricity', 'power', 'bills', 'costs']}
      />

      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Rural Utility Cost Hub</h1>
        <p className="text-xl text-gray-600">
          Take control of your monthly bills. Estimate costs for propane, grid power, off-grid solar, internet, and cable to build an accurate rural budget.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Flame className="text-orange-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Propane Budget</h2>
          <p className="text-gray-600 mb-4">
            Forecast your winter propane usage based on tank size and burn rate to avoid expensive mid-season emergency refills.
          </p>
          <Link to="/propane" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Calculate Propane <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Wifi className="text-blue-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Rural Internet</h2>
          <p className="text-gray-600 mb-4">
            Compare long-term costs of Starlink, 5G LTE, fixed wireless, and traditional satellite providers for your property.
          </p>
          <Link to="/internet" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Compare Internet <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Sun className="text-yellow-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Solar Payback</h2>
          <p className="text-gray-600 mb-4">
            Estimate the ROI and payback period of installing a rural solar array to offset traditional utility bills.
          </p>
          <Link to="/solar" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Calculate Solar <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Zap className="text-purple-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Peak Energy Demand</h2>
          <p className="text-gray-600 mb-4">
            Calculate peak kW demand charges to avoid unexpected spikes on your electric bill from running major appliances simultaneously.
          </p>
          <Link to="/energy-demand" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Calculate Peak Demand <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Tv className="text-slate-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Cable vs. Streaming</h2>
          <p className="text-gray-600 mb-4">
            Compare rural satellite TV packages against streaming services plus bandwidth costs to find the most cost-effective solution.
          </p>
          <Link to="/cable" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Calculate TV Costs <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 mb-12 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 focus:outline-none mb-2">Are electricity delivery fees higher in the country?</h3>
            <p className="text-gray-600">Yes. Rural co-ops have to maintain miles of power lines for just a few houses. Because the costs are shared among fewer people, your base connection fee is usually much higher than in a city.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 focus:outline-none mb-2">When is the best time to buy propane?</h3>
            <p className="text-gray-600">Late summer usually offers the best prices on propane, known as the "summer fill." Prices jump during winter cold snaps. Keep in mind: if you lease your tank, you have to buy from the company that owns it. If you own your tank, you can shop around.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 focus:outline-none mb-2">Is off-grid solar cheaper than running a power line?</h3>
            <p className="text-gray-600">It depends on the distance. Utility companies often charge between $10,000 and $30,000 per mile for new power lines. If your home is very far from the road, a standalone off-grid solar system might be cheaper upfront. But remember, off-grid systems require you to buy and replace batteries over time.</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Pro-Tip for Rural Utilities</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Whenever possible, negotiate fixed-rate lock-ins for propane during the off-season. Monitor your daily peak kW usage to avoid expensive demand tier bumps from your electric co-op.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
