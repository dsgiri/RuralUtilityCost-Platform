import React from 'react';
import { SEO } from '../../components/SEO';
import FertilizerCostCalculator from './fertilizer-cost';
import SeedCostCalculator from './seed-cost';
import SpotRatesTracker from './spot-rates';
import Ticker from './ticker';
import { SpotRateProduct, SpotRateEntry } from './spot-rates/spotRates';

const DEFAULT_PRODUCTS: SpotRateProduct[] = [
  { id: 'urea', name: 'Urea (46-0-0)', unit: 'ton', category: 'fertilizer' },
  { id: 'uan28', name: 'UAN 28%', unit: 'ton', category: 'fertilizer' },
  { id: 'dap', name: 'DAP (18-46-0)', unit: 'ton', category: 'fertilizer' },
  { id: 'corn', name: 'Corn Seed', unit: 'bag (80k)', category: 'seed' },
];

const INITIAL_RATES: SpotRateEntry[] = [
  { id: '1', date: '2023-11-01', product: 'urea', price: 420 },
  { id: '2', date: '2023-12-01', product: 'urea', price: 450 },
  { id: '3', date: '2024-01-01', product: 'urea', price: 475 },
  { id: '4', date: '2024-02-01', product: 'urea', price: 460 },
  
  { id: '5', date: '2023-11-01', product: 'dap', price: 580 },
  { id: '6', date: '2023-12-01', product: 'dap', price: 610 },
  { id: '7', date: '2024-01-01', product: 'dap', price: 630 },
  { id: '8', date: '2024-02-01', product: 'dap', price: 645 },
  
  { id: '9', date: '2024-01-01', product: 'corn', price: 275 },
  { id: '10', date: '2024-02-01', product: 'corn', price: 280 },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Farm Input Costs",
  "description": "A cluster of tools to help farmers and rural property owners compare input prices, calculate cost per acre, and make profitable purchasing decisions for seed and fertilizer.",
  "applicationCategory": "BusinessApplication",
  "url": "https://ruralutilitycost.com/farm-inputs"
};

export default function FarmInputCost() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12">
      <SEO 
        title="Farm Input Costs | Rural Utility Cost" 
        description="Compare fertilizer pricing, seed cost per acre, and track rural input spot rates. Make better purchasing decisions." 
        jsonLd={jsonLd}
      />
      
      <Ticker rates={INITIAL_RATES} products={DEFAULT_PRODUCTS} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Farm Input Costs</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            A cluster of tools to help farmers and rural property owners compare input prices, calculate cost per acre, and make profitable purchasing decisions for seed and fertilizer.
          </p>
        </div>

        <div className="space-y-12">
          {/* Fertilizer section */}
          <section id="fertilizer-cost">
            <FertilizerCostCalculator />
          </section>

          {/* Seed section */}
          <section id="seed-cost">
            <SeedCostCalculator />
          </section>

          {/* Spot Rates section */}
          <section id="spot-rates">
            <SpotRatesTracker />
          </section>
        </div>
        
        {/* Help/FAQ */}
        <div className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">How does the Fertilizer Calculator work?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Enter your product details to see the raw cost per acre and total field cost. If you provide a nutrient analysis (N-P-K-S), the calculator will estimate the effective price you are paying per pound of actual nutrient—helpful for comparing different analysis blends side-by-side.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">How does the Seed Calculator work?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Whether planting row crops (by the bag) or broadcasting pasture cover (by the pound), use this tool to estimate exactly how many units you need to buy and what the field will cost. Adjusting the seeding rate directly updates the per-acre cost.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">What are the formulas and assumptions behind these tools? (Logic)</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                These calculators provide mathematical estimates based purely on the inputs supplied. 
                <br/><strong>Seed Logic:</strong> <code>Total Cost = (Acres × Seeding Rate) / Units Per Bag × Price</code>
                <br/><strong>Fertilizer Logic:</strong> <code>Total Cost = (Acres × Application Rate) × Price</code>
                <br/>They do not account for variable rate application adjustments, application machinery costs, soil tie-up parameters, or discounts/rebates obtained through personal vendor relationships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
