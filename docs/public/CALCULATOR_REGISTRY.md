# 🧮 Rural Utility Cost - Unified Calculator Registry

This registry serves as the definitive system-of-record for all calculator logic within the platform to prevent code duplication, clearly document business logic, and maintain architectural alignment across development phases.
Use these unique `CALC` tracking codes in Jira, GitHub issues, and code documentation.

* **Last Updated:** 2026-06-06
* **Total Modules Mapped:** 32

---

## 🏗️ 1. Property & Construction (`PROP`)

### `CALC-PROP-101`: Rural Land Value Estimator (`/rural-land`)
* **Description:** Evaluates the estimated selling price or buying value of a rural property parcel.
* **Functionality:** Generates baseline land valuation utilizing acreage and regional averages.
* **Inputs:** Acreage size, average local price per acre, land features.
* **Core Calculation:** `Total Acreage × Regional Base Price × Modifier Adjustments`
* **Outputs:** Total estimated value, average price per acre.
* **Target Pain Points:** Difficulty assessing raw land value without formal appraisals.

### `CALC-PROP-102`: Septic Tank Sizing (`/septic`)
* **Description:** Calculates required septic capacity.
* **Functionality:** Sizes tank via standard EPA health code bedroom metrics.
* **Inputs:** Number of bedrooms, home fixtures.
* **Core Calculation:** Look-up step table (1-2 BR = 750 gal, 3 BR = 1000 gal, 4 BR = 1200 gal).
* **Outputs:** Recommended tank volume (gallons).
* **Target Pain Points:** Failing health inspections or ordering incorrect tank sizes.

### `CALC-PROP-103`: Fill Dirt Volume & Cost (`/fill-dirt`)
* **Description:** Calculates cubic yard volume for site prep.
* **Functionality:** 3D volume calculation and truckload mapping.
* **Inputs:** Length, Width, Depth, price per yard, truck delivery fee.
* **Core Calculation:** `(((L * W * D) / 27) * Cost_Per_Yard) + Delivery`
* **Outputs:** Total cubic yards, total cost, estimated truckloads.
* **Target Pain Points:** Miscalculating volume and paying for split deliveries.

### `CALC-PROP-104`: Gravel Cost (`/gravel`)
* **Description:** Calculates driveway/pad gravel tonnages.
* **Functionality:** Converts 3D area to tons using compaction factors.
* **Inputs:** Dimensions, depth thickness, gravel type density, price per ton.
* **Core Calculation:** `(Square Feet * Depth in ft) / 27 * Compaction Factor (usually 1.4) * Cost`
* **Outputs:** Required tons, required cubic yards, total cost.
* **Target Pain Points:** Not knowing how thick to spread gravel or how many tons to order.

### `CALC-PROP-105`: Fencing Cost (`/fencing`)
* **Description:** Estimates perimeter fencing material & labor costs.
* **Functionality:** Perimeter length math translated to physical materials.
* **Inputs:** Linear feet, fence type (barbed, wood, rail), gates, labor cost.
* **Core Calculation:** `(Linear Feet / Post_Spacing) * Post_Cost + (Linear_Feet * Wire/Rail_Cost)`
* **Outputs:** Total materials config, total labor, aggregated project cost.
* **Target Pain Points:** Grossly underestimating farm/estate fencing costs.

### `CALC-PROP-106`: Well Water Drilling (`/well`)
* **Description:** Estimates deep/shallow well drilling costs.
* **Functionality:** Calculates setup, per-foot drilling, casing, and pump costs.
* **Inputs:** Estimated depth, casing diameter, pump type (solar/submersible).
* **Core Calculation:** `Setup Fee + (Depth * Cost_Per_Foot) + Pump Equipment`
* **Outputs:** Estimated drilling cost, casing cost.
* **Target Pain Points:** Sticker shock over hidden well drilling and steel casing fees.

---

## ⚡ 2. Energy & Utilities (`UTIL`)

### `CALC-UTIL-201`: Peak Energy Demand (`/energy-demand`)
* **Description:** Calculates max electrical load for off-grid setup / backups.
* **Functionality:** Sums continuous and surge load wattage.
* **Inputs:** Appliance list, individual ongoing watts, surge multiplier.
* **Core Calculation:** `Sum(Running Watts) + Max(Starting Surge Watts)`
* **Outputs:** Total continuous wattage, peak surge wattage.
* **Target Pain Points:** Buying undersized inverters that pop under surge loads.

### `CALC-UTIL-202`: Generator Runtime (`/gen-runtime`)
* **Description:** Estimates how long a generator runs on available fuel.
* **Functionality:** Checks kW load against tank capacity via physics efficiency rules.
* **Inputs:** Generator size, load %, tank capacity, current level, fuel type.
* **Core Calculation:** `Available Fuel / (Max Burn Rate * (0.2 + 0.8 * Load %))`
* **Outputs:** Hours and Days of runtime, exact burn rate mapping.
* **Target Pain Points:** Running out of fuel unexpectedly in the middle of a winter outage.

### `CALC-UTIL-203`: Fuel Consumption & Cost (`/gen-fuel-cost`)
* **Description:** Estimates fuel burn rates and total operational spend.
* **Functionality:** Multiplies burn rate by runtime and local fuel prices.
* **Inputs:** Gen size, runtime hours, fuel price, fuel type.
* **Core Calculation:** `(Burn Rate * Hours) * Fuel Price`
* **Outputs:** Gallons used, total cost, cost per hour.
* **Target Pain Points:** Financial shock of 24/7 generator operation.

### `CALC-UTIL-204`: Critical Load Backup (`/gen-critical-load`)
* **Description:** Matches fuel reserves against mission-critical appliances.
* **Functionality:** Tests total runtime vs target outage duration (e.g., 72hr).
* **Inputs:** Critical kW, generator size, tank size, target hours.
* **Core Calculation:** Boolean test `if ((BurnRate * TargetHrs) <= Available_Fuel)`.
* **Outputs:** Target status (Met/Failed), fuel shortfall amount, overload alerts.
* **Target Pain Points:** Realizing fuel reserves are 30 gallons short for a 3-day outage.

### `CALC-UTIL-205`: Water Fill Charge (`/water-fill`)
* **Description:** Estimates bulk water delivery vs municipal hookup costs.
* **Functionality:** Pricing logic for pool or cistern filling.
* **Inputs:** Required gallons, truck capacity, rate per truck/gallon.
* **Core Calculation:** `Ceiling(Req Gal / Truck Cap) * Rate_Per_Truck`
* **Outputs:** Number of trucks dispatched, total delivery cost.
* **Target Pain Points:** Unexpected expense of hauling potable water on dirt roads.

### `CALC-UTIL-206`: Propane Refill (`/propane`)
* **Description:** Estimates heating fuel & propane costs.
* **Functionality:** Winter heating runway calculation into Q1 limits.
* **Inputs:** Tank size, current %, daily burn rate assumption, refill price.
* **Core Calculation:** `(Tank Size * (80% Safe Limit - Current%)) * Price_Per_Gal`
* **Outputs:** Cost to fill to 80% (standard physical limit), days runway remaining.
* **Target Pain Points:** Ordering propane at peak prices / running empty and bursting pipes.

### `CALC-UTIL-207`: Off-Grid Solar (`/solar`)
* **Description:** Sizes panels and battery banks for off-grid installs.
* **Functionality:** Calculates kWh needs against local sun hours.
* **Inputs:** Daily kWh load, peak sun hours, days of autonomy setup.
* **Core Calculation:** `System kW Array = (Daily kWh / Sun Hours) / 0.85 Efficiency`
* **Outputs:** Required panel kW, recommended battery kWh.
* **Target Pain Points:** Grossly undersizing batteries leading to total power loss at 2 AM.

### `CALC-UTIL-208`: Wireless Internet (`/internet`)
* **Description:** Compares rural ISP latencies and costs.
* **Functionality:** Starlink vs LTE vs WISP comparison model matrix.
* **Inputs:** Monthly budget, data gigabyte requirements, LOS availability.
* **Core Calculation:** Decision matrix lookup and 1-yr total cost summing.
* **Outputs:** Best suggested rural ISP type, projected annual cost.
* **Target Pain Points:** Locking into expensive satellite contracts without recognizing latency blocks.

### `CALC-UTIL-209`: Cable TV Cost (`/cable`)
* **Description:** Compares satellite TV vs streaming over rural data.
* **Functionality:** Hardware and subscription monthly breakdown.
* **Inputs:** Number of TVs, sports packages required.
* **Core Calculation:** `Base_Package + (TVs * Extender/Receiver Fee)`
* **Outputs:** Total monthly bill, upfront hardware fees.
* **Target Pain Points:** Hidden receiver fees on farm outbuilding TVs.

---

## 🐄 3. Animal & Farm (`FARM`)

### `CALC-FARM-301`: Take-Home Meat Yield (`/meat-yield`)
* **Description:** Estimates freezer meat return from live weight.
* **Functionality:** Uses USDA industry standard dressing percentages.
* **Inputs:** Live weight, animal type (beef, hog, lamb).
* **Core Calculation:** `Live Wt * Dressing % (approx 62%) * Cut-Yield % (approx 65%)`
* **Outputs:** Hanging weight, packaged meat weight, freezer space required.
* **Target Pain Points:** Customers incorrectly thinking a 1200lb steer yields 1200lbs of meat.

### `CALC-FARM-302`: Processing Cost (`/meat-processing`)
* **Description:** Estimates abattoir and butcher facility fees.
* **Functionality:** Totals kill fees and per-pound cut/wrap costs.
* **Inputs:** Hanging weight, kill fee, cut/wrap fee, value-add limits (sausage/smoking).
* **Core Calculation:** `Kill Fee + (Hanging Wt * Cut/Wrap Rate) + Value Adds`
* **Outputs:** Total butcher invoice.
* **Target Pain Points:** "Sticker shock" when picking up processed animals.

### `CALC-FARM-303`: Cost Per Pound (`/meat-cost-per-lb`)
* **Description:** Calculates true break-even net retail cost.
* **Functionality:** Averages purchase cost, feed, and processing.
* **Inputs:** Animal price, total feed cost, processing bill, final meat yield.
* **Core Calculation:** `(Animal Cost + Feed + Vet + Processing) / Take-Home Meat Weight`
* **Outputs:** True break-even cost per lb of meat.
* **Target Pain Points:** Believing raising your own meat is automatically cheaper than buying.

### `CALC-FARM-304`: Hive Startup Cost (`/hive-startup`)
* **Description:** Estimates initial beekeeping agricultural investment.
* **Functionality:** Tallies woodenware, live bees, and protective gear.
* **Inputs:** Num of hives, package/nuc choice, suit/tools tier.
* **Core Calculation:** `(Hives * Woodenware Cost) + (Hives * Bee Package Cost) + Fixed Gear`
* **Outputs:** Total startup capital needed.
* **Target Pain Points:** Underestimating hidden extraction and feed costs for new beekeepers.

### `CALC-FARM-305`: Honey Yield (`/honey-yield`)
* **Description:** Estimates viable honey harvest volume.
* **Functionality:** Uses average super production minus winter stores buffer.
* **Inputs:** Num of production hives, seasonal flow quality.
* **Core Calculation:** `Hives * Average_lbs_per_hive`
* **Outputs:** Harvested lbs, number of jars, estimated gross sale value.
* **Target Pain Points:** Overestimating first-year nectar returns and starving the hive.

### `CALC-FARM-306`: Syrup Mix (`/syrup-mix`)
* **Description:** Calculates sugar to water weight ratios.
* **Functionality:** Outputs 1:1 or 2:1 syrup recipes precisely.
* **Inputs:** Desired total volume, season (Spring stimulation/Fall build).
* **Core Calculation:** Specific gravity weight translation to lbs of sugar and quarts of water.
* **Outputs:** Dry sugar required, gallons of water required.
* **Target Pain Points:** Spoiling farm syrup or feeding incorrect ratios causing bee dysentery.

### `CALC-FARM-307`: Habitat Builder (`/habitat-cost`)
* **Description:** Budgets pollinator/cover crop installations.
* **Functionality:** Seeds-per-acre multiplication algorithm.
* **Inputs:** Acreage, seed mix lbs/acre, cost/lb.
* **Core Calculation:** `Acreage * Seeding Rate * Price per lb`
* **Outputs:** Total seed lbs, total seed capital cost.
* **Target Pain Points:** Buying expensive wildflower mix that won't dense-cover the plotted area.

### `CALC-FARM-308`: Livestock Water (`/livestock`)
* **Description:** Calculates daily animal herd water requirements.
* **Functionality:** Baseline gallons per head multiplier, adjusted for temp.
* **Inputs:** Animal counts (cows, sheep, horses), ambient heat modifier.
* **Core Calculation:** `Sum(Head * Avg Daily Gal) * Heat Wave Modifier`
* **Outputs:** Total daily gallons, tank refill intervals in hours.
* **Target Pain Points:** Fast-depleting water troughs running dry on 100° summer days.

### `CALC-FARM-309`: Animal Gestation (`/gestation`)
* **Description:** Calculates expected birthing dates for herd planning.
* **Functionality:** Timeline addition based on species genetics.
* **Inputs:** Breeding/AI date, animal type (cow=283d, sheep=152d, pig=114d).
* **Core Calculation:** `Date(Breeding) + Standard_Gestation_Days`
* **Outputs:** Estimated due date, late-term prep timeline.
* **Target Pain Points:** Missing birthing windows leading to barn complications.

### `CALC-FARM-310`: Egg Incubation (`/incubation`)
* **Description:** Calculates farm hatching schedules.
* **Functionality:** Standardized timeline mapping block.
* **Inputs:** Set date, species (chicken=21d, duck=28d).
* **Core Calculation:** `Set_Date + Incubation_Days`
* **Outputs:** Hatch date, "lockdown" date (when to stop turning eggs to raise humidity).
* **Target Pain Points:** Poor hatch rates due to forgetting to raise humidity at lockdown.

### `CALC-FARM-311`: Livestock Age Estimator (`/livestock-age`)
* **Description:** Estimates approximate age of live cattle using dentition and horn rings.
* **Functionality:** Age range generation prioritizing permanent incisor stages.
* **Inputs:** Dentition stage, breed type, optional horn rings, wear level, confidence mode.
* **Core Calculation:** Maps dentition (e.g. 2, 4, 6, 8 incisors) to base age ranges in months, applying modifiers to widen the range for unknown breed, severe wear, and noting horn rings as low-confidence fallback.
* **Outputs:** Estimated age range in months and years, confidence level, method used, and limitations explanation.
* **Target Pain Points:** Needing to age cattle for management or sales without accurate birth records.

### `CALC-FARM-312`: Cattle Growth Chart (`/cattle-growth-chart`)
* **Description:** Tracks cattle weight gain, calculates average daily gain (ADG), and projects target weights and dates.
* **Functionality:** Simple 2-point linear ADG logic with remaining gain calculations and growth chart mapping.
* **Inputs:** Previous weight, current weight, days between, target weight, target date or future days (optional).
* **Core Calculation:** `ADG = (Current Weight - Previous Weight) / Days Between`. Target Days = Remaining Gain / ADG.
* **Outputs:** ADG, total weight gained, days to target, projected future weight, growth status (on-track/ahead/behind).
* **Target Pain Points:** Tracking feed efficiency, estimating finish dates for beef cattle.

### `CALC-FARM-313`: Fertilizer Blend & Cost (`/farm-inputs`)
* **Description:** Calculates required fertilizer tons and total cost based on field N-P-K nutrient requirements.
* **Functionality:** Matches custom blend density against total acreage needs.
* **Inputs:** Acreage, required lbs/acre of N-P-K, selected fertilizer type (Urea, DAP, Potash), price per ton, application fee.
* **Core Calculation:** `(Lbs_Needed / %_Nutrient_by_Weight) * Acres / 2000` to find tons ordered.
* **Outputs:** Required tons of product, raw material cost, total applied cost, cost per acre.
* **Target Pain Points:** Overbuying bulk fertilizer or failing to calculate application fees into per-acre costs.

### `CALC-FARM-314`: Seeding Rate & Population (`/farm-inputs`)
* **Description:** Determines seed pounds required per acre using desired plant population and seed metrics.
* **Functionality:** Translates target stand counts and germination rates into physical bag requirements.
* **Inputs:** Target plant population, seed weight (seeds/lb), germination %, purity %, acres.
* **Core Calculation:** `(Target / (Seeds_Per_Lb * Germination * Purity)) * Acres`
* **Outputs:** Pounds required per acre, total pounds needed, total bags required.
* **Target Pain Points:** Undersowing fields due to poor germination assumptions or miscalculating seeds per pound.

### `CALC-FARM-315`: Tank Mix & Spot Spray (`/farm-inputs`)
* **Description:** Calculates exact pesticide/herbicide volumes for knapsack or spot sprayer tanks.
* **Functionality:** Adjusts label rates per acre/gallon down to specific small-tank batches.
* **Inputs:** Tank size (gallons), label rate (oz/acre or oz/gal), carrier volume (gal/acre).
* **Core Calculation:** `(Tank_Size / Carrier_Volume) * Label_Rate`
* **Outputs:** Fluid ounces/mL to add to tank, acres covered per tank.
* **Target Pain Points:** Mixing "hot" batches that burn crops or "weak" batches that fail to kill weeds.

### `CALC-FARM-316`: Pest Yield-Loss Estimator (`/crop-pest-economics`)
* **Description:** Translates physical pest damage percentage into direct dollar loss per acre.
* **Functionality:** Calculates theoretical revenue loss and compares it to treatment cost to determine if action is justified.
* **Inputs:** Expected yield, crop price, estimated loss %, control cost per acre.
* **Core Calculation:** `(Yield * % Loss * Price) - Control Cost`
* **Outputs:** Lost yield, dollar loss per acre, net impact, break-even conclusion.
* **Target Pain Points:** Spending $25/acre to save $15/acre of crop value.

### `CALC-FARM-317`: Economic Threshold Calculator (`/crop-pest-economics`)
* **Description:** Calculates the exact pest density at which control action breaks even financially (Economic Injury Level).
* **Functionality:** Classic ET/EIL formula solving for pest counts.
* **Inputs:** Control cost, crop value, efficacy %, yield loss per pest unit, scouted level.
* **Core Calculation:** `EIL = Control_Cost / (Crop_Value * Injury_Per_Pest * Efficacy)` 
* **Outputs:** Economic Injury Level (EIL), Economic Threshold (ET), treatment recommendation based on current scouted numbers.
* **Target Pain Points:** Panic-spraying bugs that aren't mathematically dense enough to cause economic harm.

### `CALC-FARM-318`: Degree-Day Insect Timing (`/crop-pest-economics`)
* **Description:** Estimates insect development phases by tracking accumulated heat units (Degree-Days).
* **Functionality:** Calculates daily base-temperature heat accumulation.
* **Inputs:** Lower threshold temperature, upper threshold, daily max/min temperatures, biofix start.
* **Core Calculation:** `((Max_Temp + Min_Temp) / 2) - Lower_Threshold`
* **Outputs:** Daily accumulated Degree-Days, total season heat units, next expected biological milestone.
* **Target Pain Points:** Spraying insecticides too early (before egg hatch) or too late (after protective life stages).

---

## 💼 4. Business & Profit (`BIZ`)

### `CALC-BIZ-404`: Pain Point Priority Calculator (`/pain-point-priority`)
* **Description:** Ranks farm and utility problems by severity, frequency, and effort required to fix.
* **Functionality:** Uses a 1-5 matrix scoring logic to sort pain points into priority tiers (e.g., Quick Wins vs Long-Term Projects). Saves dynamic list state locally.
* **Inputs:** Name, Severity, Frequency, Cost Impact, Time Impact, Risk/Urgency, Effort to Fix.
* **Core Calculation:** `Pain Score = Sum(Severity + Frequency + Cost + Time + Risk)`. Tiering logic filters based on Pain Score mapped against the `Effort` modifier.
* **Outputs:** Sorted priority list, overall Pain Score, Tier classification tag.
* **Target Pain Points:** Feeling overwhelmed by too many property issues and not knowing where to deploy limited capital first.

### `CALC-BIZ-401`: Cut Cost (`/cut-cost`)
* **Description:** Identifies utility/overhead reductions in operational farm flow.
* **Functionality:** Compares current expenditure to optimized.
* **Inputs:** Current electric baseline, feed bulk pricing, tractor fuel spending.
* **Core Calculation:** Extrapolating efficiency deltas across 12-month spans.
* **Outputs:** Annual savings achieved.
* **Target Pain Points:** Margin erosion from operational inefficiency going unchecked.

### `CALC-BIZ-402`: Expand Profit (`/expand-profit`)
* **Description:** Gross margin improvement modeling.
* **Functionality:** ROI projection for value-adds.
* **Inputs:** Current unit price, local COGS, proposed price baseline increase.
* **Core Calculation:** Price elasticity modeling mapped onto net returns.
* **Outputs:** New net profit, break-even sales volume.
* **Target Pain Points:** Fear of raising retail prices without numerical safety-nets.

### `CALC-BIZ-403`: Processing & Compliance (`/compliance`)
* **Description:** FDA/USDA local county audit readiness.
* **Functionality:** Scoring compliance rubric.
* **Inputs:** Facility hygiene vectors, HACCP checklist presence.
* **Core Calculation:** Weighted boolean points system parsing to percentage.
* **Outputs:** Estimated readiness percentage gauge.
* **Target Pain Points:** Shut downs over surprise regulatory USDA inspections.

---

## 🏛️ 5. Government Aid & Grants (`GOV`)

### `CALC-GOV-501`: Grant Finder (`/grant-finder`)
* **Description:** Matching engine connecting farms to federal/state capital options.
* **Functionality:** Eligibility logic tree filtering system.
* **Inputs:** Farm revenue, veteran/minority status, proposed project type (solar, soil).
* **Core Calculation:** Filter queries matched against major programs (EQIP, REAP, VAPG).
* **Outputs:** List of likely matched grants, estimated funding tier bounds.
* **Target Pain Points:** USDA grant landscape is too opaque for independent rural owners.

### `CALC-GOV-502`: Grant Readiness & Match (`/grant-readiness`)
* **Description:** Calculates required matching funds and bridging cash flow for reimbursable rural grants (e.g., USDA REAP/EQIP).
* **Functionality:** Uses tabs for simple % matching and phased reimbursement bridge loan calculations.
* **Inputs:** Total project cost, grant match %, phases of project.
* **Core Calculation:** `Total Cost * (1 - Grant %)` for match, plus upfront cash-in-hand requirement.
* **Outputs:** Required cash on hand, reimbursable amount, out-of-pocket total.
* **Target Pain Points:** Winning a grant but not realizing you have to spend the money upfront before the government reimburses you.
