import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Map, Hammer, Truck, Home, ChevronRight, Info } from 'lucide-react';

export default function LandConstructionHub() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you calculate cubic yards for fill dirt or gravel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Multiply Length (ft) x Width (ft) x Depth (ft) to get cubic feet, then divide by 27 to get cubic yards. A standard dump truck usually carries between 10 to 14 cubic yards of material."
        }
      },
      {
        "@type": "Question",
        "name": "How much does fencing cost per acre?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost of fencing depends heavily on the perimeter length, terrain, and materials (barbed wire vs. woven wire vs. wood). For a perfectly square acre (approx 835 linear feet), typical wire fencing can cost anywhere from $1,500 to $4,000 to install, not including intensive clearing."
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="Land & Construction Hub" 
        description="Calculators for rural property development, land purchasing, fencing, and material deliveries like fill dirt and gravel."
        url="/land-and-construction"
        jsonLd={jsonLd}
        keywords={['land', 'construction', 'dirt', 'gravel', 'fencing', 'property']}
      />

      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Land & Construction Hub</h1>
        <p className="text-xl text-gray-600">
          Tools for property development. Calculate budgets for purchasing raw land, building fences, improving driveways with gravel, and grading with fill dirt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-stone-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Truck className="text-stone-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Dirt & Gravel</h2>
          <p className="text-gray-600 mb-4">
            Calculate exactly how many cubic yards and dump truck loads of gravel or dirt you need for your driveway or pad.
          </p>
          <div className="flex flex-col gap-2">
            <Link to="/fill-dirt" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
              Calculate Fill Dirt <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <Link to="/gravel" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
              Calculate Gravel <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Hammer className="text-green-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Fencing Estimator</h2>
          <p className="text-gray-600 mb-4">
            Determine post spacing, wire rolls required, and total material costs to secure your pastures.
          </p>
          <Link to="/fencing" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Estimate Fencing <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-sky-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Map className="text-sky-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Rural Land Value</h2>
          <p className="text-gray-600 mb-4">
            Evaluate raw land prices, calculate improvements necessary to build (power, well, septic), and determine true cost.
          </p>
          <Link to="/rural-land" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Evaluate Land <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Home className="text-teal-600 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Habitat Management</h2>
          <p className="text-gray-600 mb-4">
            Budget for land clearing, food plots, tree planting, and wildlife improvements per acre.
          </p>
          <Link to="/habitat-cost" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
            Habitat Costs <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 mb-12 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 focus:outline-none mb-2">What is the difference between tons and cubic yards for gravel?</h3>
            <p className="text-gray-600">Volume is measured in cubic yards, but quarries usually sell by weight (tons). A common rule of thumb is 1.4 tons for every cubic yard of standard driveway gravel. This changes based on how dense and wet the rock is.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 focus:outline-none mb-2">Should I grade my land before installing permanent fencing?</h3>
            <p className="text-gray-600">Yes. Major dips and hills make keeping the wire tight very difficult and leave gaps at the bottom where animals escape. Spending money on dozer work to flatten the fence line is almost always worth it.</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg border border-blue-100">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-bold text-blue-800 tracking-tight">Pro-Tip for Property Development</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>The sticker price of raw land is just the down payment. Factoring in the cost of a long access driveway, trenching for power, and installing a well and septic is mandatory before declaring a parcel "cheap."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
