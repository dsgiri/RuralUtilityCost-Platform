import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArrowRight, CheckCircle2, Clock, Search } from 'lucide-react';

import { calculatorCategories } from '../config/calculatorCategories';
import { FavoriteButton } from '../features/favorites/FavoriteButton';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentPaths, setRecentPaths] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('recentlyUsedCalcs') || '[]');
      setRecentPaths(stored);
    } catch (e) {
      console.error('Failed to parse recently used calculators', e);
    }
  }, []);

  const filteredCategories = calculatorCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ((item as any).keywords && (item as any).keywords.some((k: string) => k.toLowerCase().includes(searchQuery.toLowerCase())))
    )
  })).filter(cat => cat.items.length > 0);

  const allItems = calculatorCategories.flatMap(c => c.items);
  const recentItems = recentPaths.map(path => allItems.find(i => i.path === path)).filter(Boolean);

  return (
    <div className="flex flex-col w-full h-full">
      <SEO 
        title="Rural Utility Cost Calculators - Water, Septic, Well, Solar, Internet & More" 
        description="Free, easy-to-use calculators for rural homeowners. Accurately estimate costs for water delivery, septic tanks, well drilling, solar power, and more."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Rural Utility Cost Calculators",
          "url": "https://ruralutilitycost.com",
          "description": "Free, easy-to-use calculators for rural homeowners. Accurately estimate costs for water delivery, septic tanks, well drilling, solar power, and more."
        }}
      />
      
      {/* CALCULATOR GRID & UTILITY SEARCH (COMMAND CENTER) */}
      <section className="px-4 py-8 max-w-7xl mx-auto w-full flex-grow">
        <div className="mb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Free Tools for Rural Living
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
              Simple, practical calculators and estimates for land development, homestead planning, and stress-free community building.
            </p>
          </div>
          
          <div className="w-full md:max-w-2xl relative shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools, features, keywords..."
              aria-label="Search tools"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-14 pr-6 py-4 border-2 border-gray-100 rounded-2xl focus:ring-[#1a5f3f] focus:border-[#1a5f3f] text-gray-900 placeholder-gray-400 text-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            />
          </div>
        </div>

        {/* RECENTLY USED CAROUSEL */}
        {recentItems.length > 0 && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              Recently Used
            </h2>
            <div 
              className="flex overflow-x-auto pb-4 gap-4 snap-x hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {recentItems.map((calc, idx) => {
                if (!calc) return null;
                const Icon = calc.icon;
                return (
                  <div key={idx} className="relative flex-shrink-0 w-[280px] sm:w-[320px] snap-start">
                    <Link 
                      to={calc.path} 
                      className="group bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 block h-full"
                    >
                      <div className={`p-5 rounded-2xl border-b ${calc.border} flex items-start gap-4 transition-colors duration-300 group-hover:${calc.bg} h-full`}>
                        <div className={`p-2.5 rounded-xl bg-white shadow-sm border ${calc.border} flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${calc.color}`} />
                        </div>
                        <div className="pr-6">
                          <h3 className="font-bold text-base text-gray-900 group-hover:text-[#1a5f3f] transition-colors line-clamp-1">{calc.title}</h3>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{calc.desc}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="absolute top-4 right-4 z-10">
                      <FavoriteButton id={calc.path} className="!p-1.5" />
                    </div>
                  </div>
                );
              })}
            </div>
            <style>
              {`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
          </div>
        )}

        <div className="space-y-16">
          {filteredCategories.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">No calculators found matching "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#1a5f3f] hover:underline font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredCategories.map((category, catIdx) => {
              if (category.items.length === 0) return null;
              return (
              <div key={catIdx} id={category.id} className="space-y-6 pt-6 -mt-6">
                <div className="border-b border-gray-200 pb-3">
                  <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                  <p className="text-gray-500 mt-1">{category.desc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((calc, idx) => {
                    const Icon = calc.icon;
                    return (
                      <div key={idx} className="relative group h-full min-h-[340px]">
                        <Link to={calc.path} className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                          <div className={`p-6 pb-5 border-b ${calc.border} flex items-start gap-4 transition-colors duration-300 group-hover:${calc.bg}`}>
                            <div className={`p-3 rounded-xl bg-white shadow-sm border ${calc.border}`}>
                              <Icon className={`w-7 h-7 ${calc.color}`} />
                            </div>
                            <div className="pr-8">
                              <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#1a5f3f] transition-colors">{calc.title}</h3>
                              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{calc.desc}</p>
                            </div>
                          </div>
                          
                          <div className="p-6 flex flex-col flex-grow">
                            <ul className="space-y-3 flex-grow mb-6">
                              {calc.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-600">
                                  <CheckCircle2 className="w-4 h-4 text-green-500/80 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="mt-auto flex items-center justify-between text-sm font-bold text-white bg-[#1a5f3f] group-hover:bg-[#154d32] transition-colors p-3.5 rounded-xl uppercase tracking-wider shadow-sm">
                              <span>Calculate Now</span>
                              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </Link>
                        <div className="absolute top-6 right-6 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                          <FavoriteButton id={calc.path} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            );
            })
          )}
        </div>
      </section>
      
      {/* COMPREHENSIVE GUIDE SECTION (For SEO & AdSense 'Thin Content' Compliance) */}
      <section className="bg-white border-t border-gray-200 py-16 px-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">The Real Cost of Country Living</h2>
            <div className="h-1 w-24 bg-[#1a5f3f] rounded-full"></div>
          </div>
          
          <article className="prose prose-gray max-w-none text-gray-600 space-y-6">
            <p className="text-lg leading-relaxed font-medium text-gray-700">
              Moving to the country changes how you handle utilities. In the city, water and sewer are just monthly bills. In the country, you own the infrastructure. You are responsible for the well, the septic tank, and keeping the lights on.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Upfront Costs vs. Monthly Bills</h3>
            <p className="leading-relaxed">
              The biggest shock for new rural homeowners is the switch from monthly bills to massive upfront costs. Instead of a $60 water bill, you might spend $10,000 to drill a well. Your monthly bill drops to zero, but you take on all the maintenance and repair risks.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Managing Your Own Water and Waste</h3>
            <p className="leading-relaxed">
              When city sewer lines end, you are in charge of wastewater. Installing a septic system means soil tests, permits, and excavation. A failing septic tank is a costly emergency. 
            </p>
            <p className="leading-relaxed">
              Our calculators help you budget for routine pumping and eventual replacements. If you can't drill a well, we also help you price out hauled water delivery and storage tanks.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Keeping the Lights On</h3>
            <p className="leading-relaxed">
              Rural power lines are exposed to weather and falling trees. Outages last longer. To keep your food cold and your well pump running, you need a backup plan.
            </p>
            <p className="leading-relaxed">
              Whether you want a portable generator or a full off-grid solar setup, our tools help you forecast fuel costs and size your system correctly.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Why We Built This Site</h3>
            <p className="leading-relaxed">
              Standard mortgage calculators don't ask how much 2,000 feet of fencing costs. We built RuralUtilityCost.com to give you real, actionable estimates based on industry averages and contractor data.
            </p>
            <p className="leading-relaxed italic mt-4">
              Knowledge is your best defense against unexpected costs. Plan your rural project with confidence.
            </p>
          </article>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-gray-50 border-t border-gray-200 py-16 px-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">FAQs About Rural Utility Costs</h2>
            <div className="h-1 w-16 bg-[#1a5f3f] mx-auto mt-3 rounded-full"></div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Why are rural utility costs generally higher than urban?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Urban environments benefit from massive economies of scale. High-density housing divides the cost of municipal sewer pipes, water mains, and internet fiber among thousands of users per square mile. In rural environments, you bear 100% of the infrastructure cost for the final mile to your home (e.g., drilling the well or installing the satellite dish).</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Are these estimates accurate for 2026?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Yes, our formulas embed baseline costs projected for 2026, accounting for inflation and current aggregate demands. However, isolated rural properties far from supplier depots will always incur higher delivery and mileage surcharges than standard regional averages.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">How frequently is the data updated?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">We cross-reference our price matrices quarterly using data from USDA guidelines, EPA code updates, and commercial provider tariffs (like Starlink rate sheets, or regional gravel quarry averages).</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
