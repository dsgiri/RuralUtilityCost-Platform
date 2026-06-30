import { Link, useLocation } from 'react-router-dom';
import { Droplet, LayoutGrid, Shovel, Trees, ArrowDownToDot, PawPrint, Sprout, Bug, Sun, Wifi, Tv, Home as HomeIcon, Flame, Crop, CalendarHeart, Bird, Scissors, TrendingUp, Search, Zap, ShieldCheck, Map, Leaf, Hexagon, Beaker, Scale, Tag, Package, Menu, ChevronLeft, ChevronRight, Clock, ZapOff, AlertOctagon, Landmark, LineChart as LineChartIcon, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { ReactNode, useState, useEffect } from 'react';
import { Logo } from './Logo';
import { A11yControls } from './A11yControls';

import { Building2, Banknote, ShieldPlus, Calculator, Truck } from 'lucide-react';

import { Chatbot } from '../features/chatbot';

import { flatNavCategories } from '../config/calculatorCategories';

const navCategories = [
  {
    id: "property",
    shortTitle: "Property",
    categoryIcon: Building2,
    title: "Property & Construction",
    items: [
      { path: '/rural-land', label: 'Rural Land Value', icon: Map, tooltip: 'Estimate selling price or evaluate a parcel for buying' },
      { path: '/septic', label: 'Septic Tank Size', icon: LayoutGrid, tooltip: 'Calculate required septic tank capacity based on bedrooms' },
      { path: '/fill-dirt', label: 'Fill Dirt Cost', icon: Shovel, tooltip: 'Calculate dirt needed for grading and filling' },
      { path: '/gravel', label: 'Gravel Cost', icon: Trees, tooltip: 'Calculate gravel needed for driveways and paths' },
      { path: '/fencing', label: 'Fencing Cost', icon: Crop, tooltip: 'Estimate costs for wood, wire, or vinyl fencing' },
      { path: '/well', label: 'Well Water Drilling', icon: ArrowDownToDot, tooltip: 'Estimate deep or shallow well drilling costs' },
    ]
  },
  {
    id: "utilities",
    shortTitle: "Utilities",
    categoryIcon: Zap,
    title: "Energy & Utilities",
    items: [
      { path: '/energy-demand', label: 'Peak Energy Demand', icon: Zap, tooltip: 'Calculate maximum electrical load for off-grid or backup' },
      { path: '/gen-runtime', label: 'Generator Runtime', icon: Clock, tooltip: 'Estimate how long your generator will run on available fuel' },
      { path: '/gen-fuel-cost', label: 'Fuel Consumption', icon: Flame, tooltip: 'Calculate estimated fuel usage and operating costs for backup generators' },
      { path: '/gen-critical-load', label: 'Critical Load Backup', icon: ZapOff, tooltip: 'Check if you have enough fuel for essential appliances' },
      { path: '/water-fill', label: 'Water Fill Charge', icon: Droplet, tooltip: 'Estimate cost for bulk water delivery' },
      { path: '/propane', label: 'Propane Refill', icon: Flame, tooltip: 'Estimate heating fuel and propane costs' },
      { path: '/solar', label: 'Off-Grid Solar', icon: Sun, tooltip: 'Calculate solar panel and battery requirements' },
      { path: '/internet', label: 'Wireless Internet', icon: Wifi, tooltip: 'Compare satellite and radio internet options' },
      { path: '/cable', label: 'Cable TV', icon: Tv, tooltip: 'Compare TV options for rural properties' },
    ]
  },
  {
    id: "farm",
    shortTitle: "Farm",
    categoryIcon: PawPrint,
    title: "Animal & Farm",
    items: [
      { path: '/farm-inputs', label: 'Farm Input Costs', icon: Sprout, tooltip: 'Calculate costs for fertilizer, seed, and chemical sprays' },
      { path: '/crop-pest-economics', label: 'Crop Pest Economics', icon: Bug, tooltip: 'Estimate yield loss, economic thresholds, and degree-days' },
      { path: '/livestock-age', label: 'Livestock Age Estimator', icon: PawPrint, tooltip: 'Estimate the approximate age of cattle based on teeth' },
      { path: '/cattle-growth-chart', label: 'Cattle Growth Chart', icon: LineChartIcon, tooltip: 'Track cattle weight gain and average daily gain (ADG)' },
      { path: '/meat-yield', label: 'Take-Home Meat Yield', icon: Scale, tooltip: 'Estimate packaged meat from live or hanging weight' },
      { path: '/meat-processing', label: 'Processing Cost', icon: Scissors, tooltip: 'Estimate butcher fees and cut/wrap costs' },
      { path: '/meat-cost-per-lb', label: 'Cost Per Pound', icon: Tag, tooltip: 'Find out your true break-even cost per pound' },
      { path: '/hive-startup', label: 'Hive Startup Cost', icon: Hexagon, tooltip: 'Calculate cost to start beekeeping' },
      { path: '/honey-yield', label: 'Honey Yield', icon: Droplet, tooltip: 'Estimate honey production per hive' },
      { path: '/syrup-mix', label: 'Syrup Mix', icon: Beaker, tooltip: 'Calculate sugar syrup ratios for feeding bees' },
      { path: '/habitat-cost', label: 'Habitat Builder', icon: Leaf, tooltip: 'Calculate seed or cover crop costs' },
      { path: '/livestock', label: 'Livestock Water', icon: PawPrint, tooltip: 'Calculate daily water needs for animals' },
      { path: '/gestation', label: 'Animal Gestation', icon: CalendarHeart, tooltip: 'Calculate expected birthing dates' },
      { path: '/incubation', label: 'Egg Incubation', icon: Bird, tooltip: 'Calculate hatching dates for poultry' },
    ]
  },
  {
    id: "business",
    shortTitle: "Business",
    categoryIcon: TrendingUp,
    title: "Business & Profit",
    items: [
      { path: '/pain-point-priority', label: 'Pain Point Priority', icon: AlertOctagon, tooltip: 'Rank your biggest rural problems by severity to know what to fix first' },
      { path: '/cut-cost', label: 'Cut Cost', icon: Scissors, tooltip: 'Find areas to reduce operational overhead' },
      { path: '/expand-profit', label: 'Expand Profit', icon: TrendingUp, tooltip: 'Find out how to increase margins' },
      { path: '/compliance', label: 'Processing & Compliance', icon: ShieldCheck, tooltip: 'Verify state/federal regulatory compliance' },
    ]
  },
  {
    id: "finance",
    shortTitle: "Finance",
    categoryIcon: Calculator,
    title: "Farm Finance & Loans",
    items: [
      { path: '/farm-finance', label: 'Farm Finance Hub', icon: Calculator, tooltip: 'Farm and equipment financing tools' },
      { path: '/farm-finance/loan-payment', label: 'Loan Payment', icon: Landmark, tooltip: 'Estimate periodic loan payments for farm loans' },
      { path: '/farm-finance/equipment-payment', label: 'Equipment Payment', icon: Truck, tooltip: 'Calculate costs for financing tractors and equipment' },
      { path: '/farm-finance/land-affordability', label: 'Land Affordability', icon: Map, tooltip: 'Determine if your land income can cover the debt service' },
    ]
  },
  {
    id: "resources",
    shortTitle: "Resources",
    categoryIcon: Banknote,
    title: "Resources & Grants",
    items: [
      { path: '/free-resources', label: 'Free Resources Hub', icon: Banknote, tooltip: 'A curated guide to the best free programs and USDA support' },
      { path: '/grant-readiness', label: 'Grant Match & Readiness', icon: Landmark, tooltip: 'Calculate cash match and bridge funding' },
      { path: '/grant-finder', label: 'Grant Finder', icon: Search, tooltip: 'Search for USDA or state agriculture grants' },
      { path: '/articles', label: 'Articles & Guides', icon: TrendingUp, tooltip: 'Read expert advice on rural living' },
    ]
  }
];

import { FavoriteButton } from '../features/favorites/FavoriteButton';

const enrichedNavCategories = navCategories.map(cat => ({
  ...cat,
  items: cat.items.map(item => {
    let match = null;
    for (const group of flatNavCategories) {
      match = group.items.find(i => i.path === item.path) || match;
    }
    return {
      ...item,
      keywords: match?.keywords || [],
      features: match?.features || []
    };
  })
}));

const navItems = [
  { path: '/', label: 'Home', icon: HomeIcon },
  ...navCategories.flatMap(c => c.items)
];

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path !== '/' && path !== '/contact' && path !== '/termsofservice' && path !== '/privacypolicy') {
      try {
        const recent = JSON.parse(localStorage.getItem('recentlyUsedCalcs') || '[]');
        const updated = [path, ...recent.filter((p: string) => p !== path)].slice(0, 10);
        localStorage.setItem('recentlyUsedCalcs', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save recently used path', e);
      }
      
      // Auto-collapse sidebar to maximize calculator workspace
      setIsSidebarCollapsed(true);
    } else {
      // Auto-expand sidebar on home page
      setIsSidebarCollapsed(false);
    }
  }, [location.pathname]);

  const filteredCategories = enrichedNavCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tooltip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some((f: string) => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.keywords.some((k: string) => k.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gray-50 font-sans print:h-auto print:overflow-visible print:bg-white">
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <nav className={cn(
        "bg-[#1a5f3f] text-white flex-shrink-0 hidden md:flex flex-col print:hidden transition-all duration-300 ease-in-out overflow-hidden",
        isSidebarCollapsed ? "w-0" : "w-60"
      )}>
        <div className="border-b border-white/10 w-60">
          <Link to="/" onClick={() => setSearchQuery('')} className="p-6 flex items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer">
            <Logo className="w-10 h-10 text-white" />
            <h1 className="text-xl font-bold leading-tight">
              Rural Utility<br/>
              <span className="text-green-300">Cost</span>
              <span className="text-green-400/80 ml-0.5">$</span>
            </h1>
          </Link>
        </div>
        
        <div className="px-4 py-3 border-b border-white/10 w-60">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/70" />
            </div>
            <input
              type="text"
              placeholder="Search tools..."
              aria-label="Search sidebar tools"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400 transition-colors"
            />
          </div>
        </div>

        <div className="flex-grow py-4 overflow-y-auto w-60">
          <ul className="space-y-1">
            {searchQuery === '' && (
              <li className="mb-4">
                <div className="px-6 pb-2 text-xs font-bold text-green-100 uppercase tracking-wider">
                  Quick Access
                </div>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/favorites"
                      title="Your saved calculators"
                      className={cn(
                        'px-6 py-2.5 flex items-center gap-3 cursor-pointer transition-all',
                        location.pathname === '/favorites'
                          ? 'bg-white/20 border-l-4 border-rose-400 opacity-100 font-bold text-white'
                          : 'hover:bg-white/5 opacity-80 hover:opacity-100 border-l-4 border-transparent font-medium text-white/90'
                      )}
                    >
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span className="text-sm tracking-wide">My Favorites</span>
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            {filteredCategories.length === 0 && searchQuery !== '' ? (
              <li className="px-6 py-4 text-sm text-white/60 text-center italic">
                No tools found
              </li>
            ) : (
              filteredCategories.map((category) => (
                <li key={category.title} className="pt-4">
                  <div className="px-6 pb-2 text-xs font-bold text-green-100 uppercase tracking-wider">
                    {category.title}
                  </div>
                  <ul className="space-y-1">
                    {category.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            title={(item as any).tooltip || item.label}
                            className={cn(
                              'px-6 py-2.5 flex items-center gap-3 cursor-pointer transition-all',
                              isActive
                                ? 'bg-white/20 border-l-4 border-green-300 opacity-100 font-bold text-white'
                                : 'hover:bg-white/5 opacity-80 hover:opacity-100 border-l-4 border-transparent font-medium text-white/90'
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm tracking-wide">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))
            )}
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0 max-h-screen overflow-hidden print:max-h-none print:overflow-visible">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-8 flex-shrink-0 z-50 w-full relative print:hidden">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex p-2 -ml-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/50"
              aria-label={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="md:hidden flex items-center">
              {/* Mobile simplified header/link */}
              <Link to="/" className="font-bold text-lg text-gray-900 flex items-center gap-2">
                 <Logo className="h-6 w-6 text-[#1a5f3f]" />
                 Rural Costs
              </Link>
            </div>
          </div>
          
          {/* Quick Categories instead of page title */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto">
            {navCategories.map(cat => {
              const Icon = cat.categoryIcon;
              return (
                <Link 
                  to={`/#${cat.id}`}
                  key={cat.id} 
                  title={`Jump to ${cat.title} section`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-[#1a5f3f]/10 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-700 hover:text-[#1a5f3f] dark:text-gray-200 dark:hover:text-green-300 rounded-full text-sm font-medium transition-colors border border-transparent hover:border-[#1a5f3f]/20 dark:border-gray-700 dark:hover:border-green-500/50"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {cat.shortTitle}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <A11yControls />
            <span className="text-xs text-gray-500 hidden sm:inline-block">Location Context: <span className="font-medium text-gray-800">USA</span></span>
            {location.pathname !== '/' && navItems.some(i => i.path === location.pathname) && (
              <FavoriteButton id={location.pathname} />
            )}
            {location.pathname !== '/' && (
              <button className="px-4 py-1.5 bg-[#1a5f3f] text-white text-sm rounded font-medium shadow-sm hover:bg-[#154d32] transition-colors whitespace-nowrap">
                Share Results
              </button>
            )}
          </div>
        </header>

        {/* Mobile Nav (Scrollable horizontal) */}
        <style>{`
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="md:hidden bg-white border-b border-gray-200 overflow-x-auto flex-shrink-0 z-10 relative hide-scroll print:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <nav className="flex px-4 py-2 space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={(item as any).tooltip || item.label}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium flex flex-col items-center gap-1 transition-colors min-w-[80px]',
                    isActive
                      ? 'bg-[#1a5f3f]/10 text-[#1a5f3f]'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] leading-tight text-center">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="flex-grow overflow-y-auto print:overflow-visible flex flex-col">
          <div className="flex-grow flex flex-col">
            {children}
          </div>
          
          {/* SITEWIDE FAT FOOTER */}
          <footer className="mt-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] px-4 sm:px-8 py-12 shrink-0 print:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <Link to="/" onClick={() => setSearchQuery('')} className="flex items-center gap-2 mb-4">
                  <Logo className="w-8 h-8 text-[#1a5f3f]" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                    Rural Utility Cost
                  </span>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-sm">
                  We build practical calculators and structural tools helping rural property owners estimate costs, plan expansions, and make profitable decisions.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Calculator Hubs</h2>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link to="/generator-planning" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Generator Planning</Link></li>
                  <li><Link to="/utility-cost" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Energy & Utilities</Link></li>
                  <li><Link to="/water-planning" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Water Systems</Link></li>
                  <li><Link to="/farm-costs" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Farm & Livestock</Link></li>
                  <li><Link to="/land-and-construction" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Land & Construction</Link></li>
                  <li><Link to="/agribusiness" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Agribusiness & Grants</Link></li>
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Top Tools</h2>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link to="/septic" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Septic Tank Sizing</Link></li>
                  <li><Link to="/fencing" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Fencing Estimator</Link></li>
                  <li><Link to="/well" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Well Drilling Cost</Link></li>
                  <li><Link to="/grant-finder" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Ag Grant Finder</Link></li>
                  <li><Link to="/rural-land" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Rural Land Value</Link></li>
                  <li><Link to="/meat-cost-per-lb" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Meat Cost per Lb</Link></li>
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Organization</h2>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link to="/portfolio" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Platform Portfolio</Link></li>
                  <li><Link to="/about" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">About Us</Link></li>
                  <li><Link to="/articles" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Articles & Guides</Link></li>
                  <li><Link to="/contact" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Contact</Link></li>
                  <li><Link to="/sources" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">All Sources & Science</Link></li>
                  <li><Link to="/credits" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Credits</Link></li>
                  <li><Link to="/partners" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Partners</Link></li>
                </ul>
                
                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 mt-8">Open Source</h2>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="https://github.com/dsgiri/ruralutilitycost-platform" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">GitHub Repository</a></li>
                  <li><a href="https://github.com/dsgiri/ruralutilitycost-platform/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">License</a></li>
                  <li><a href="https://github.com/dsgiri/ruralutilitycost-platform/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Contributing Guide</a></li>
                </ul>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start gap-6 text-xs text-gray-500 dark:text-gray-400">
              <div className="text-center md:text-left flex-1 lg:max-w-3xl">
                <p className="mb-2 font-medium text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed">
                  <span className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Disclaimer:</span> These figures and calculator results are estimates based on standard assumptions, user inputs, and industry averages. This tool is provided for informational purposes only and does not replace professional financial, legal, engineering, or agricultural advice. We disclaim all liability for decisions, costs, losses, or damages arising from reliance on this data. Results may vary based on local conditions, methodology, and assumptions. Please consult qualified local professionals, licensed contractors, or certified advisors for guidance specific to your operation.
                </p>
                <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Rural Utility Cost. All rights reserved.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 flex-shrink-0 pt-2">
                <Link to="/privacy-policy" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] transition-colors">Privacy Policy</Link>
                <span className="text-gray-400 dark:text-gray-600">|</span>
                <Link to="/terms-of-use" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] transition-colors">Terms of Use</Link>
                <span className="text-gray-400 dark:text-gray-600">|</span>
                <Link to="/disclaimer" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] transition-colors">Disclaimer</Link>
              </div>
            </div>
          </footer>
        </div>
      </main>

      <Chatbot />
    </div>
  );
}
