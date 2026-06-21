import { useState } from 'react';
import { SEO } from '../../../components/SEO';
import { ExternalLink, Info } from 'lucide-react';
import { CalculatorSanityContent } from '../CalculatorSanityContent';

type BusinessType = 'small' | 'farm' | 'contractor' | 'utility' | 'nonprofit';
type Purpose = 'equipment' | 'energy' | 'expansion' | 'hiring' | 'disaster' | 'technology';

interface Program {
  title: string;
  agency: string;
  description: string;
  match: string;
  types: BusinessType[];
  purposes: Purpose[];
  url?: string;
}

const STATIC_PROGRAMS: Program[] = [
  {
    title: "Rural Energy for America Program (REAP)",
    agency: "USDA",
    description: "Grants and guaranteed loans for agricultural producers and rural small businesses to purchase, install, and construct renewable energy systems or complete energy efficiency improvements.",
    match: "High",
    types: ['small', 'farm', 'utility'],
    purposes: ['energy', 'equipment', 'technology'],
    url: "https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program-renewable-energy-systems-energy-efficiency-improvement-guaranteed-loans"
  },
  {
    title: "SBA 7(a) & 504 Loan Programs",
    agency: "Small Business Administration",
    description: "Financial assistance for small businesses specialized in general use, machinery, equipment, or real estate. (Note: These are loans, not grants).",
    match: "Medium",
    types: ['small', 'contractor', 'farm'],
    purposes: ['expansion', 'equipment', 'hiring'],
    url: "https://www.sba.gov/funding-programs/loans"
  },
  {
    title: "Value-Added Producer Grants (VAPG)",
    agency: "USDA",
    description: "Helps agricultural producers enter into value-added activities related to the processing and marketing of new products.",
    match: "High",
    types: ['farm'],
    purposes: ['expansion', 'equipment'],
    url: "https://www.rd.usda.gov/programs-services/business-programs/value-added-producer-grants"
  },
  {
    title: "Disaster Assistance Programs",
    agency: "FEMA / SBA",
    description: "Low-interest disaster loans and potential grants to help businesses and homeowners recover from declared disasters.",
    match: "Conditional",
    types: ['small', 'farm', 'contractor', 'nonprofit'],
    purposes: ['disaster', 'equipment'],
    url: "https://www.sba.gov/funding-programs/disaster-assistance"
  },
  {
    title: "Rural Business Development Grants (RBDG)",
    agency: "USDA",
    description: "Competitive grants designed to support targeted technical assistance, training, and other activities leading to the development or expansion of small and emerging private businesses in rural areas.",
    match: "Medium",
    types: ['small', 'nonprofit', 'utility'],
    purposes: ['expansion', 'technology', 'equipment'],
    url: "https://www.rd.usda.gov/programs-services/business-programs/rural-business-development-grants"
  }
];

export default function GrantFinder() {
  const [businessType, setBusinessType] = useState<BusinessType>('small');
  const [purpose, setPurpose] = useState<Purpose>('expansion');
  const [state, setState] = useState<string>('TX');
  const [hasSearched, setHasSearched] = useState(false);

  // Simple state machine simulation
  const [loading, setLoading] = useState(false);

  const matchedPrograms = STATIC_PROGRAMS.filter(p => 
    p.types.includes(businessType) && p.purposes.includes(purpose)
  );

  const handleSearch = () => {
    setLoading(true);
    setHasSearched(false);
    
    // Simulate lookup delay
    setTimeout(() => {
      setLoading(false);
      setHasSearched(true);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800" id="calculator-content">
      <SEO 
        title="Government Aid and Grant Finder | Search Funding Options"
        description="Find possible government aid, grants, rebates, and funding programs by business type, location, and purpose. No promises, just useful guidance."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Government Aid and Grant Finder",
          "description": "Find possible government aid, grants, rebates, and funding programs by business type, location, and purpose. No promises, just useful guidance.",
          "applicationCategory": "UtilitiesApplication"
        }}
      />
      
      <div className="p-6 md:p-8 flex-grow overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Government Aid & Grant Finder</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Search for potential business grants, disaster relief, and utility rebates.</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-8 rounded-r-xl">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Disclaimer:</strong> This tool provides general guidance for potential funding avenues. We do not guarantee grant availability, approval, or "free money." Always verify eligibility directly with official government agencies (.gov).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm h-fit">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase text-sm tracking-wide mb-6">Search Criteria</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Entity Type</label>
                  <select 
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] font-medium transition-colors"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                  >
                    <option value="small">Small Business / Retail</option>
                    <option value="farm">Farm / Agricultural</option>
                    <option value="contractor">Contractor / Trades</option>
                    <option value="utility">Utility / Energy Provider</option>
                    <option value="nonprofit">Nonprofit Organization</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Funding Purpose</label>
                  <select 
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] font-medium transition-colors"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value as Purpose)}
                  >
                    <option value="expansion">Business Expansion</option>
                    <option value="equipment">Equipment Purchase</option>
                    <option value="energy">Energy Efficiency / Solar</option>
                    <option value="hiring">Hiring & Training</option>
                    <option value="disaster">Disaster Recovery</option>
                    <option value="technology">Technology & Broadband</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Location (State)</label>
                  <select 
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-[#1a5f3f] focus:ring-[#1a5f3f] font-medium transition-colors"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>

                <button 
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full mt-4 bg-[#1a5f3f] dark:bg-[#6ee7b7] text-white dark:text-gray-900 font-bold py-3 px-4 rounded-xl hover:bg-[#11402a] dark:hover:bg-[#34d399] transition-colors focus:outline-none focus:ring-4 focus:ring-[#1a5f3f]/20 uppercase tracking-wide disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Find Programs'}
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              {!hasSearched ? (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                    <Info className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Search</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm">Select your criteria and click "Find Programs" to explore potential aid categories.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 uppercase tracking-tight">
                    Possible Funding Matches ({matchedPrograms.length})
                  </h3>
                  
                  {matchedPrograms.length > 0 ? (
                    <div className="space-y-4">
                      {matchedPrograms.map((program, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm relative overflow-hidden group">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {program.title}
                            </h4>
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded font-semibold uppercase tracking-wider">
                              {program.agency}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed font-medium">
                            {program.description}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center">
                              Likelihood: 
                              <span className="ml-1 text-green-600 dark:text-green-400">{program.match}</span>
                            </span>
                            {program.url && (
                              <a 
                                href={program.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                Official Site <ExternalLink className="w-4 h-4 ml-1" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-5 border border-gray-200 dark:border-gray-700 rounded-xl mt-6">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Next Steps</h4>
                        <ol className="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-2 font-medium">
                          <li>Review the official guidelines on Grants.gov or the agency's site.</li>
                          <li>Consult your local SBDC (Small Business Development Center) or USDA Rural Development office.</li>
                          <li>Prepare a formal business plan and financial projections before applying.</li>
                        </ol>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-xl text-center">
                      <p className="text-yellow-800 dark:text-yellow-200 font-medium">No specialized programs found for this exact combination right now.</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">However, you may still qualify for general SBA 7(a) loans or state-level commercial grants. Check your local state economic development website for regional programs.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-6">How to Find Business Grants & Assistance</h2>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p>Navigating government aid can be confusing. It is crucial to manage expectations: very few "free money" grants exist just for starting a standard for-profit business. Most grants are highly conditional, matching-fund based, or restricted to specific activities like technical innovation or rural revitalization.</p>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What funding may fit your business</h3>
              <ul className="list-disc pl-5 mb-8 space-y-2">
                <li><strong>Energy & Efficiency:</strong> The USDA REAP program is one of the most reliable programs for rural businesses installing solar, wind, or upgrading to high-efficiency HVAC.</li>
                <li><strong>Value-Added Agriculture:</strong> Specialized grants for farmers turning raw commodities into consumer goods (like turning milk into artisan cheese).</li>
                <li><strong>Disaster Recovery:</strong> Following natural disasters, FEMA and the SBA provide low-interest loans to help rebuild infrastructure and maintain payroll.</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Can I get a grant to start a business?</h4>
                  <p>State and federal agencies rarely issue grants for basic startup costs (like rent or inventory). For standard startups, SBA-backed loans are typically the best route.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Where do I apply officially?</h4>
                  <p>Always apply directly on official government websites ending in ".gov", such as Grants.gov or SBA.gov. Never pay a third party a "processing fee" for a guaranteed grant application.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Are these programs available in my state?</h4>
                  <p>Federal programs generally apply nationwide, but exact funding pools vary by state allocation and population density definitions. Always verify your specific geographic eligibility.</p>
                </div>
              </div>
            </div>
          </div>

          <CalculatorSanityContent uniqueCode="CALC-GOV-501" />

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Rural Business Plan</h3>
            <p className="text-gray-600 mb-4">
              Find matching grants, calculate expansion ROI, and ensure food processing compliance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/agribusiness" className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                Return to Agribusiness Hub
              </a>
              <a href="/grant-readiness" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700">
                Check Grant Readiness →
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
