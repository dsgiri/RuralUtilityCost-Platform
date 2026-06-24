import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Target, Lightbulb, Calculator, CheckCircle2, ShieldCheck, Compass, Map, LineChart, Network, Github } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <SEO 
        title="About Us | Rural Utility Cost" 
        description="Learn why Rural Utility Cost exists, how our calculators help rural users make smarter decisions, and explore our specialized subdomains for planning and predicting."
        keywords={['rural calculators', 'farm planning tools', 'cost calculators', 'forecasting tools', 'scenario calculators', 'rural decision tools']}
      />
      
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-16 px-4 shadow-sm shrink-0 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Better decisions for rural living.
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            Rural Utility Cost exists to help farmers, ranchers, and rural property owners make practical decisions with simple, useful calculators and planning tools.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-grow bg-slate-50 dark:bg-[#111827] py-16 px-4 sm:px-8 transition-colors">
        <div className="max-w-4xl mx-auto space-y-20">
          
          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
              <div className="h-12 w-12 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
                <Compass className="h-6 w-6 text-[#1a5f3f] dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Our Vision</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                We aim to become the most trusted destination for rural planning, forecasting, and scenario-based decision support. Our vision is a future where rural decision-makers save time, reduce uncertainty, and make smarter choices with confidence.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
              <div className="h-12 w-12 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-[#1a5f3f] dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Our Mission</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                We build clear, easy-to-use tools that help users understand costs, compare choices, forecast outcomes, and plan with confidence. We turn guesswork into actionable math.
              </p>
            </div>
          </div>

          {/* What We Build */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight flex items-center gap-3">
              <Calculator className="h-8 w-8 text-[#1a5f3f] dark:text-green-400" /> What We Build
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
              Every tool we build is designed to answer a specific question quickly, with simple inputs and meaningful outputs. We don't build generic spreadsheets; we build practical calculators that solve real problems.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm transition-colors">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Farm Finance & Budgets</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Farm budget calculators, land affordability, and equipment payments.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm transition-colors">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Input & Production</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Fertilizer, seed cost tools, cattle growth, and livestock management.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm transition-colors">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Scenarios & What-Ifs</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Tools to test different scenarios and compare the financial outcomes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm transition-colors">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Forecasting & Predictions</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Track trends and use model-based predictors for future outlooks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subdomains */}
          <div className="bg-white dark:bg-[#1f2937] rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-6">
              <Network className="h-8 w-8 text-[#1a5f3f] dark:text-green-400" /> The Rural Utility Ecosystem
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 max-w-3xl">
              We organize our capabilities into specialized subdomains to give you the exact environment you need for different types of decision-making.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="https://plan.ruralutilitycost.com" target="_blank" rel="noopener noreferrer" className="block p-6 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-2xl group">
                <Map className="w-8 h-8 text-[#1a5f3f] dark:text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-[#1a5f3f] dark:group-hover:text-green-300 transition-colors">plan.ruralutilitycost.com</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  The foundation. Use this space for tactical planning, budgeting, and preparing for known costs. When you need to know exactly what a fence or a well will cost today, start here.
                </p>
              </a>

              <a href="https://forecast.ruralutilitycost.com" target="_blank" rel="noopener noreferrer" className="block p-6 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-2xl group">
                <LineChart className="w-8 h-8 text-[#1a5f3f] dark:text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-[#1a5f3f] dark:group-hover:text-green-300 transition-colors">forecast.ruralutilitycost.com</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  The horizon. Use this environment for trend analysis and future outlooks. Understand how changing fuel prices or feed costs might affect your margins next season.
                </p>
              </a>

              <a href="https://whatif.ruralutilitycost.com" target="_blank" rel="noopener noreferrer" className="block p-6 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-2xl group">
                <Calculator className="w-8 h-8 text-[#1a5f3f] dark:text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-[#1a5f3f] dark:group-hover:text-green-300 transition-colors">whatif.ruralutilitycost.com</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  The sandbox. Test scenarios and compare outcomes side-by-side. "What if I buy 20 more head of cattle vs upgrade my tractor?" Compare the exact financial tradeoffs.
                </p>
              </a>

              <a href="https://predictor.ruralutilitycost.com" target="_blank" rel="noopener noreferrer" className="block p-6 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-2xl group">
                <Target className="w-8 h-8 text-[#1a5f3f] dark:text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-[#1a5f3f] dark:group-hover:text-green-300 transition-colors">predictor.ruralutilitycost.com</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  The models. Access model-based predictions and confidence-based insights. For advanced decision-makers looking for data-driven probabilities on crop yields or market timing.
                </p>
              </a>
            </div>
          </div>

          {/* How Our Tools Help */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">How We Help You</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Save Time</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Get answers faster. Stop wrestling with broken spreadsheets and get straight to the math that matters.</p>
               </div>
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Compare Decisions</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Understand the financial tradeoffs and compare choices before you spend any real money.</p>
               </div>
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Reduce Guesswork</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Turn complex, overwhelming choices into clear sequential steps backed by practical formulas.</p>
               </div>
            </div>
          </div>

          {/* Why Trust Us */}
          <div className="bg-[#1a5f3f] dark:bg-gray-800 rounded-3xl p-8 sm:p-12 text-white border border-transparent dark:border-gray-700 shadow-sm transition-colors">
            <h2 className="text-3xl font-bold mb-6 tracking-tight flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-green-300 dark:text-green-400" /> Why Trust Us
            </h2>
            <div className="space-y-6 text-green-50 dark:text-gray-300 text-lg leading-relaxed max-w-3xl">
              <p>
                We focus on useful over flashy. We prioritize clarity and mathematical accuracy, avoiding industry fluff and marketing hype.
              </p>
              <p>
                We design our tools for real-world rural decisions. We keep our assumptions visible—never hiding the math in a black box—so you can easily verify and understand the logic behind every outcome.
              </p>
              <p className="text-sm text-green-200 dark:text-gray-400 italic mt-8 border-t border-green-800 dark:border-gray-600 pt-6">
                * Note: Our calculators are meant to support your decision-making and planning processes, not replace the judgment of local certified experts, accountants, or agronomists.
              </p>
            </div>
          </div>
          
          {/* Open Source */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
              Open source where possible.
            </h2>
            <div className="space-y-4 max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
              <p>
                Free repositories for learning, reuse, and community contribution.
              </p>
              <p>
                Clear license and contribution guidelines.
              </p>
              <p className="font-medium text-[#1a5f3f] dark:text-green-400">
                A practical transparency promise, not a marketing claim.
              </p>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <a href="https://github.com/dsgiri/ruralutilitycost-platform" target="_blank" rel="noopener noreferrer" className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#1a5f3f] dark:hover:border-green-500 rounded-2xl transition-colors group shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-[#1a5f3f] dark:group-hover:text-green-400 transition-colors" />
                  <h3 className="font-bold text-gray-900 dark:text-white truncate" title="ruralutilitycost-platform">ruralutilitycost-platform</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Main Rural Utility Cost hub and shared platform for navigation, branding, and cross-app experience.
                </p>
              </a>

              <a href="https://github.com/dsgiri/ruralutilitycost-predictor" target="_blank" rel="noopener noreferrer" className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#1a5f3f] dark:hover:border-green-500 rounded-2xl transition-colors group shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-[#1a5f3f] dark:group-hover:text-green-400 transition-colors" />
                  <h3 className="font-bold text-gray-900 dark:text-white truncate" title="ruralutilitycost-predictor">ruralutilitycost-predictor</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Model-driven prediction app for rural and agricultural outcomes, with confidence-based insights and predictive tools.
                </p>
              </a>

              <a href="https://github.com/dsgiri/ruralutilitycost-whatif" target="_blank" rel="noopener noreferrer" className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#1a5f3f] dark:hover:border-green-500 rounded-2xl transition-colors group shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-[#1a5f3f] dark:group-hover:text-green-400 transition-colors" />
                  <h3 className="font-bold text-gray-900 dark:text-white truncate" title="ruralutilitycost-whatif">ruralutilitycost-whatif</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Scenario analysis app for testing rural cost assumptions and comparing outcome changes across inputs.
                </p>
              </a>

              <a href="https://github.com/dsgiri/ruralutilitycost-forecast" target="_blank" rel="noopener noreferrer" className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#1a5f3f] dark:hover:border-green-500 rounded-2xl transition-colors group shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-[#1a5f3f] dark:group-hover:text-green-400 transition-colors" />
                  <h3 className="font-bold text-gray-900 dark:text-white truncate" title="ruralutilitycost-forecast">ruralutilitycost-forecast</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Forecasting app for agricultural trends, price outlooks, and future-oriented rural planning.
                </p>
              </a>

              <a href="https://github.com/dsgiri/ruralutilitycost-plan" target="_blank" rel="noopener noreferrer" className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#1a5f3f] dark:hover:border-green-500 rounded-2xl transition-colors group shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-[#1a5f3f] dark:group-hover:text-green-400 transition-colors" />
                  <h3 className="font-bold text-gray-900 dark:text-white truncate" title="ruralutilitycost-plan">ruralutilitycost-plan</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Planning app for budgeting, resource allocation, and practical rural decision support.
                </p>
              </a>

              <a href="https://github.com/dsgiri/ruralutilitycost-habitat" target="_blank" rel="noopener noreferrer" className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#1a5f3f] dark:hover:border-green-500 rounded-2xl transition-colors group shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-[#1a5f3f] dark:group-hover:text-green-400 transition-colors" />
                  <h3 className="font-bold text-gray-900 dark:text-white truncate" title="ruralutilitycost-habitat">ruralutilitycost-habitat</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Public-facing site and content hub for Rural Utility Cost, including About, resources, and product ecosystem.
                </p>
              </a>
            </div>
            
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <a href="https://github.com/dsgiri/ruralutilitycost-platform" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#1a5f3f] dark:hover:border-green-500 text-gray-900 dark:text-white font-medium rounded-lg transition-all shadow-sm">
                <Github className="w-5 h-5" /> Main Platform Repo
              </a>
              <a href="https://github.com/dsgiri/ruralutilitycost-platform/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#1a5f3f] dark:hover:border-green-500 text-gray-900 dark:text-white font-medium rounded-lg transition-all shadow-sm">
                Contribution Guidelines
              </a>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center pt-8 pb-12">
             <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-green-600 hover:bg-gray-800 dark:hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-lg">
               Explore Calculators
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
