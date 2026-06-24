import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { A11yProvider } from './components/A11yProvider';
import { CookieBanner } from './components/CookieBanner';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { FavoritesProvider } from './features/favorites/favoritesHook';
import Home from './pages/Home';

const FavoritesPage = lazy(() => import('./features/favorites/FavoritesPage'));
const WaterFill = lazy(() => import('./features/calculators/WaterFill/WaterFill'));
const Septic = lazy(() => import('./features/calculators/Septic/Septic'));
const FillDirt = lazy(() => import('./features/calculators/FillDirt/FillDirt'));
const Gravel = lazy(() => import('./features/calculators/Gravel/Gravel'));
const Well = lazy(() => import('./features/calculators/Well/Well'));
const Livestock = lazy(() => import('./features/calculators/Livestock/Livestock'));
const Solar = lazy(() => import('./features/calculators/Solar/Solar'));
const Internet = lazy(() => import('./features/calculators/Internet/Internet'));
const Cable = lazy(() => import('./features/calculators/Cable/Cable'));
const Fencing = lazy(() => import('./features/calculators/Fencing/Fencing'));
const Propane = lazy(() => import('./features/calculators/Propane/Propane'));
const Gestation = lazy(() => import('./features/calculators/Gestation/Gestation'));
const Incubation = lazy(() => import('./features/calculators/Incubation/Incubation'));
const CutCost = lazy(() => import('./features/calculators/CutCost/CutCost'));
const ExpandProfit = lazy(() => import('./features/calculators/ExpandProfit/ExpandProfit'));
const GrantFinder = lazy(() => import('./features/calculators/GrantFinder/GrantFinder'));
const EnergyDemand = lazy(() => import('./features/calculators/EnergyDemand/EnergyDemand'));
const RuralLand = lazy(() => import('./features/calculators/RuralLand/RuralLand'));
const HabitatCost = lazy(() => import('./features/calculators/HabitatCost/HabitatCost'));
const FoodProcessingCompliance = lazy(() => import('./features/calculators/FoodProcessingCompliance/FoodProcessingCompliance'));
const FarmInputCost = lazy(() => import('./features/farm-input-cost/FarmInputCost'));
const CropPestEconomics = lazy(() => import('./features/crop-pest-economics/CropPestEconomics'));
const FreeResourcesPage = lazy(() => import('./features/free-resources/FreeResourcesPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const FarmFinanceLandingPage = lazy(() => import('./features/farm-finance/index'));
const LoanPaymentPage = lazy(() => import('./features/farm-finance/loan-payment/LoanPaymentPage'));
const EquipmentPaymentPage = lazy(() => import('./features/farm-finance/equipment-payment/EquipmentPaymentPage'));
const LandAffordabilityPage = lazy(() => import('./features/farm-finance/land-affordability/LandAffordabilityPage'));
const GeneratorHub = lazy(() => import('./pages/GeneratorHub'));
const UtilityCostHub = lazy(() => import('./pages/UtilityCostHub'));
const WaterPlanningHub = lazy(() => import('./pages/WaterPlanningHub'));
const FarmCostsHub = lazy(() => import('./pages/FarmCostsHub'));
const LandConstructionHub = lazy(() => import('./pages/LandConstructionHub'));
const AgribusinessHub = lazy(() => import('./pages/AgribusinessHub'));
const HiveStartup = lazy(() => import('./features/calculators/HiveStartup/HiveStartup'));
const HoneyYield = lazy(() => import('./features/calculators/HoneyYield/HoneyYield'));
const SyrupMix = lazy(() => import('./features/calculators/SyrupMix/SyrupMix'));
const MeatYield = lazy(() => import('./features/calculators/MeatYield/MeatYield'));
const MeatProcessing = lazy(() => import('./features/calculators/MeatProcessing/MeatProcessing'));
const MeatCostPerLb = lazy(() => import('./features/calculators/MeatCostPerLb/MeatCostPerLb'));
const LivestockAge = lazy(() => import('./features/calculators/LivestockAge/LivestockAge'));
const CattleGrowthChart = lazy(() => import('./features/calculators/CattleGrowthChart/CattleGrowthChart'));
const GenRuntime = lazy(() => import('./features/calculators/GenRuntime/GenRuntime'));
const GenFuelCost = lazy(() => import('./features/calculators/GenFuelCost/GenFuelCost'));
const GenCriticalLoad = lazy(() => import('./features/calculators/GenCriticalLoad/GenCriticalLoad'));
const PainPointPriority = lazy(() => import('./features/calculators/PainPointPriority/PainPointPriority'));
const GrantReadiness = lazy(() => import('./features/calculators/GrantReadiness/GrantReadiness'));

const Sources = lazy(() => import('./pages/Sources'));
const Credits = lazy(() => import('./pages/Credits'));
const Partners = lazy(() => import('./pages/Partners'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ArticlesPage = lazy(() => import('./features/articles/ArticlesPage'));
const ArticleDetailPage = lazy(() => import('./features/articles/ArticleDetailPage'));

export default function App() {
  return (
    <FavoritesProvider>
      <A11yProvider>
        <GoogleAnalytics />
        <Layout>
          <Suspense fallback={<div className="flex-1 flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/free-resources" element={<FreeResourcesPage />} />
          <Route path="/generator-planning" element={<GeneratorHub />} />
          <Route path="/utility-cost" element={<UtilityCostHub />} />
          <Route path="/water-planning" element={<WaterPlanningHub />} />
          <Route path="/farm-costs" element={<FarmCostsHub />} />
          <Route path="/farm-inputs" element={<FarmInputCost />} />
          <Route path="/farm-finance" element={<FarmFinanceLandingPage />} />
          <Route path="/farm-finance/loan-payment" element={<LoanPaymentPage />} />
          <Route path="/farm-finance/equipment-payment" element={<EquipmentPaymentPage />} />
          <Route path="/farm-finance/land-affordability" element={<LandAffordabilityPage />} />
          <Route path="/crop-pest-economics" element={<CropPestEconomics />} />
          <Route path="/land-and-construction" element={<LandConstructionHub />} />
          <Route path="/agribusiness" element={<AgribusinessHub />} />
          <Route path="/water-fill" element={<WaterFill />} />
          <Route path="/septic" element={<Septic />} />
          <Route path="/fill-dirt" element={<FillDirt />} />
          <Route path="/gravel" element={<Gravel />} />
          <Route path="/well" element={<Well />} />
          <Route path="/livestock" element={<Livestock />} />
          <Route path="/solar" element={<Solar />} />
          <Route path="/internet" element={<Internet />} />
          <Route path="/cable" element={<Cable />} />
          <Route path="/fencing" element={<Fencing />} />
          <Route path="/propane" element={<Propane />} />
          <Route path="/rural-land" element={<RuralLand />} />
          <Route path="/habitat-cost" element={<HabitatCost />} />
          <Route path="/hive-startup" element={<HiveStartup />} />
          <Route path="/honey-yield" element={<HoneyYield />} />
          <Route path="/syrup-mix" element={<SyrupMix />} />
          <Route path="/meat-yield" element={<MeatYield />} />
          <Route path="/meat-processing" element={<MeatProcessing />} />
          <Route path="/meat-cost-per-lb" element={<MeatCostPerLb />} />
          <Route path="/livestock-age" element={<LivestockAge />} />
          <Route path="/cattle-growth-chart" element={<CattleGrowthChart />} />
          <Route path="/gen-runtime" element={<GenRuntime />} />
          <Route path="/gen-fuel-cost" element={<GenFuelCost />} />
          <Route path="/gen-critical-load" element={<GenCriticalLoad />} />
          <Route path="/pain-point-priority" element={<PainPointPriority />} />
          <Route path="/grant-readiness" element={<GrantReadiness />} />
          <Route path="/energy-demand" element={<EnergyDemand />} />
          <Route path="/gestation" element={<Gestation />} />
          <Route path="/incubation" element={<Incubation />} />
          <Route path="/cut-cost" element={<CutCost />} />
          <Route path="/expand-profit" element={<ExpandProfit />} />
          <Route path="/grant-finder" element={<GrantFinder />} />
          <Route path="/compliance" element={<FoodProcessingCompliance />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        </Routes>
        </Suspense>
      </Layout>
      <CookieBanner />
      </A11yProvider>
    </FavoritesProvider>
  );
}
