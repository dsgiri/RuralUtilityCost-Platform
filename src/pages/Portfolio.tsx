import React from 'react';
import { SEO } from '../components/SEO';
import { ExternalLink, Github, LayoutGrid, Tractor, Sprout, CloudRain, ShieldCheck, LineChart, Cpu, Warehouse, Banknote, Users, Trees, Droplets, Fish, Milk, Compass, PackageOpen, Globe, PenTool, Wrench } from 'lucide-react';

// Portfolio structure mapped from specifications
const categories = [
  {
    name: "Strategy & Forecasting",
    description: "Predictive tools, scenario testing, and future-oriented applications.",
    icon: <LineChart className="w-6 h-6" />,
    apps: [
      { name: "Forecast", url: "https://forecast.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Forecast", description: "Forecasting app for agricultural trends, price outlooks, and future-oriented rural planning." },
      { name: "WhatIf", url: "https://whatif.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-WhatIf", description: "Scenario analysis app for testing rural cost assumptions and comparing outcome changes across inputs." },
      { name: "Plan", url: "https://plan.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Plan", description: "Planning app for budgeting, resource allocation, and practical rural decision support." },
      { name: "Predictor", url: "https://predictor.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Predictor", description: "Model-driven prediction app for rural and agricultural outcomes, with confidence-based insights." }
    ]
  },
  {
    name: "Livestock & Animals",
    description: "Core hubs for herd management, aquatics, and feed planning.",
    icon: <Tractor className="w-6 h-6" />,
    apps: [
      { name: "Livestock", url: "https://livestock.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Livestock", description: "Core livestock hub for cattle, swine, sheep/goats, herd planning, animal growth, and breeding." },
      { name: "Beef", url: "https://beef.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Beef", description: "Beef cattle economics and production hub for Rural Utility Cost." },
      { name: "Dairy", url: "https://dairy.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Dairy", description: "Dairy economics hub for milk forecasting, feed efficiency, margins, and expansion planning." },
      { name: "Aqua", url: "https://aqua.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Aqua", description: "Aquaculture economics hub for feed, harvest, survival, profit, and system comparisons." },
      { name: "Feed", url: "https://feed.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Feed", description: "Feed planning and cost hub for ration planning, feed conversion, storage, and waste reduction." }
    ]
  },
  {
    name: "Environment & Agronomy",
    description: "Soil analysis, weather support, pest mitigation, and land valuation tools.",
    icon: <Sprout className="w-6 h-6" />,
    apps: [
      { name: "Soil", url: "https://soil.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Soil", description: "Soil test, nutrient recommendation, fertilizer comparison, and crop fertility planning tools." },
      { name: "Weather", url: "https://weather.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Weather", description: "Weather-driven agricultural decision support for planting, spraying, frost, and heat." },
      { name: "Pest", url: "https://pest.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Pest", description: "Integrated pest management hub for pest risk, scouting, trap counts, and spray timing." },
      { name: "Carbon", url: "https://carbon.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Carbon", description: "Farm carbon accounting and emissions benchmarking tools for rural operations." },
      { name: "Land", url: "https://land.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Land", description: "Rural land valuation and parcel comparison tools for utilities, lease, and acreage decisions." }
    ]
  },
  {
    name: "Specialty Agriculture",
    description: "Tools tailored for controlled environment agriculture and nurseries.",
    icon: <Trees className="w-6 h-6" />,
    apps: [
      { name: "Hydroponic", url: "https://hydroponic.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Hydroponic", description: "Hydroponic planning hub for nutrients, EC/pH, energy cost, and profitability." },
      { name: "Greenhouse", url: "https://greenhouse.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Greenhouse", description: "Greenhouse economics hub for startup cost, heating, ROI, and crop profitability." }
    ]
  },
  {
    name: "Infrastructure & Logistics",
    description: "Operational insights for grid mechanics, pricing, logistics, and storage.",
    icon: <Warehouse className="w-6 h-6" />,
    apps: [
      { name: "Storage", url: "https://storage.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Storage", description: "Storage and inventory hub for feed, grain, and equipment storage planning." },
      { name: "Transport", url: "https://transport.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Transport", description: "Transport logic hub for hauling cost, fuel use, delivery planning, and route capacity." },
      { name: "Grid", url: "https://grid.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Grid", description: "Grid utility hub and quick decision methods for rural properties." },
      { name: "Price", url: "https://price.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Price", description: "Universal pricing and cost estimation hub for Rural Utility Cost." },
      { name: "Quality", url: "https://quality.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Quality", description: "Quality assurance and quality control hub for Rural Utility Cost." },
      { name: "Solve", url: "https://solve.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Solve", description: "IoT and automation cost estimation hub for Rural Utility Cost." }
    ]
  },
  {
    name: "Core EcoSystem Portals",
    description: "The primary hubs, cross-app entry points, and central resources.",
    icon: <Globe className="w-6 h-6" />,
    apps: [
      { name: "Platform", url: "https://ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-Platform", description: "Main Rural Utility Cost hub and shared platform for navigation, branding, and cross-app experience." },
      { name: "Habitat", url: "https://habitat.ruralopstools.com", repo: "https://github.com/dsgiri/ruralutilitycost-habitat", description: "Public-facing site and content hub for Rural Utility Cost resources and ecosystem." },
      { name: "USDA", url: "https://usda.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-USDA", description: "USDA-linked rural planning hub for acreage, payments, and decision-support tools." },
      { name: "BreakTime", url: "https://breaktime.ruralopstools.com", repo: "https://github.com/dsgiri/RuralUtilityCost-BreakTime", description: "Rural utility break and pause utility concept for managing rural downtime tasks." }
    ]
  }
];

export default function Portfolio() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-gray-100">
      <SEO 
        title="Product Portfolio | Rural Utility Cost Ecosystem" 
        description="Explore the complete suite of 26 specialized subdomain tools under the Rural Utility Cost platform. From infrastructure to agriculture, find the right tool for the job." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full flex-grow">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-green-100 dark:bg-green-900/40 text-[#1a5f3f] dark:text-green-400 rounded-full mb-6 relative group overflow-hidden">
             <LayoutGrid className="w-8 h-8 sm:w-10 sm:h-10 relative z-10" />
             <div className="absolute inset-0 bg-[#1a5f3f] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            The Complete Product <span className="text-[#1a5f3f] dark:text-green-500">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            25+ specialized calculators, forecasters, and hubs engineered exclusively for rural operations, agriculture, and property management.
          </p>
        </div>

        {/* Global Stats or Vision Box */}
        <div className="mb-16 bg-[#1a5f3f] dark:bg-gray-800 rounded-2xl p-8 sm:p-10 text-white shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <Globe className="w-64 h-64" />
           </div>
           <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">A Unified Product Architecture</h2>
                <p className="text-green-50 dark:text-gray-300 text-lg leading-relaxed">
                  Rather than forcing a rigid all-in-one monolith, we've structured our intelligence into independent, purpose-built tools across 26 subdomains. The goal? Specialized precision with connected principles.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/10 dark:bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-bold mb-1 tracking-tight">26</div>
                    <div className="text-sm font-medium text-green-100 dark:text-gray-400 uppercase tracking-widest">Independent Hubs</div>
                 </div>
                 <div className="bg-white/10 dark:bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-bold mb-1 tracking-tight">1</div>
                    <div className="text-sm font-medium text-green-100 dark:text-gray-400 uppercase tracking-widest">Shared Standard</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Categories / Grid */}
        <div className="space-y-16">
          {categories.map((category, catIndex) => (
            <section key={category.name} className="scroll-mt-24">
              <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-green-100 dark:bg-green-900/30 text-[#1a5f3f] dark:text-green-500 rounded-lg">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {category.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.apps.map((app) => (
                  <div 
                    key={app.name} 
                    className="flex flex-col bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 hover:border-[#1a5f3f] dark:hover:border-green-500 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                  >
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#1a5f3f] dark:group-hover:text-green-400 transition-colors">
                          {app.name}
                        </h3>
                        <span className="inline-flex py-1 px-2.5 bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700">
                          App
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                        {app.description}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                        <a 
                          href={app.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex justify-center items-center gap-2 py-2 px-3 bg-[#1a5f3f] hover:bg-[#13462f] text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Launch Site
                        </a>
                        <a 
                          href={app.repo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex justify-center items-center p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                          title="View on GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
