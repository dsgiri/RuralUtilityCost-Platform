const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '../src/features/calculators');

// Mappings manually derived, or we can just guess by folder name.
const MAPPINGS = {
  RuralLand: 'CALC-PROP-101',
  Septic: 'CALC-PROP-102',
  FillDirt: 'CALC-PROP-103',
  Gravel: 'CALC-PROP-104',
  Fencing: 'CALC-PROP-105',
  Well: 'CALC-PROP-106',
  EnergyDemand: 'CALC-UTIL-201',
  GenRuntime: 'CALC-UTIL-202',
  GenFuelCost: 'CALC-UTIL-203',
  GenCriticalLoad: 'CALC-UTIL-204',
  WaterFill: 'CALC-UTIL-205',
  Propane: 'CALC-UTIL-206',
  Solar: 'CALC-UTIL-207',
  Internet: 'CALC-UTIL-208',
  Cable: 'CALC-UTIL-209',
  MeatYield: 'CALC-FARM-301',
  MeatProcessing: 'CALC-FARM-302',
  MeatCostPerLb: 'CALC-FARM-303',
  Livestock: 'CALC-FARM-304',
  Gestation: 'CALC-FARM-305',
  Incubation: 'CALC-FARM-306',
  SyrupMix: 'CALC-FARM-307',
  HabitatCost: 'CALC-FARM-307', // Wait, registry says 307 for Syrup? habitat is 307 as well? Wait.
  HiveStartup: 'CALC-FARM-304', // The registry has 304 as livestock. 
  // Let me just grab exact uniqueCodes.
};

const dirs = fs.readdirSync(featuresDir).filter(f => fs.statSync(path.join(featuresDir, f)).isDirectory());

let fileMatches = {};

// parse registry to build dict
const registry = fs.readFileSync(path.join(__dirname, '../docs/public/CALCULATOR_REGISTRY.md'), 'utf-8');
const lines = registry.split('\n');

const urlMap = {};
for (const line of lines) {
  const match = line.match(/### `(CALC-[A-Z]+-\d{3})`: .*?\(\`?\/([a-z0-9\-]+)\`?\)/);
  if (match) {
    urlMap[match[2]] = match[1];
  }
}

// Map folder to url
const FOLDER_TO_URL = {
  RuralLand: 'rural-land',
  Septic: 'septic',
  FillDirt: 'fill-dirt',
  Gravel: 'gravel',
  Fencing: 'fencing',
  Well: 'well',
  EnergyDemand: 'energy-demand',
  GenRuntime: 'gen-runtime',
  GenFuelCost: 'gen-fuel-cost',
  GenCriticalLoad: 'gen-critical-load',
  WaterFill: 'water-fill',
  Propane: 'propane',
  Solar: 'solar',
  Internet: 'internet',
  Cable: 'cable',
  MeatYield: 'meat-yield',
  MeatProcessing: 'meat-processing',
  MeatCostPerLb: 'meat-cost-per-lb',
  HiveStartup: 'hive-startup',
  HoneyYield: 'honey-yield',
  SyrupMix: 'syrup-mix',
  HabitatCost: 'habitat-cost',
  Livestock: 'livestock',
  Gestation: 'gestation',
  Incubation: 'incubation',
  CutCost: 'cut-cost',
  ExpandProfit: 'expand-profit',
  FoodProcessingCompliance: 'compliance',
  GrantFinder: 'grant-finder',
  GrantReadiness: 'grant-readiness'
};

for (const dir of dirs) {
  const file = path.join(featuresDir, dir, `${dir}.tsx`);
  if (!fs.existsSync(file)) continue;

  const url = FOLDER_TO_URL[dir];
  if (!url) {
    console.log(`No url found for folder ${dir}`);
    continue;
  }
  const code = urlMap[url];
  if (!code) {
    console.log(`No code found for url ${url} in registry`);
    continue;
  }
  
  let content = fs.readFileSync(file, 'utf-8');
  
  if (content.includes('CalculatorSanityContent')) {
    console.log(`Skipping ${dir}, already has SanityContent`);
    continue;
  }

  // Insert import
  const importStatement = `import { CalculatorSanityContent } from '../CalculatorSanityContent';\n`;
  const lastImportIndex = content.lastIndexOf('import ');
  let importEnd = content.indexOf('\n', lastImportIndex);
  content = content.slice(0, importEnd + 1) + importStatement + content.slice(importEnd + 1);

  // Find Export Actions
  const insertionMarker = `<ExportActions`;
  const insertIndex = content.lastIndexOf(insertionMarker);
  
  if (insertIndex !== -1) {
    const spaces = "              ";
    const componentStr = `<CalculatorSanityContent uniqueCode="${code}" />\n\n${spaces}`;
    content = content.slice(0, insertIndex) + componentStr + content.slice(insertIndex);
    fs.writeFileSync(file, content);
    console.log(`Updated ${dir} with ${code}`);
  } else {
    // try to find return string end
    const fallbackMarker = `<div className="mt-8`;
    const fallbackIdx = content.lastIndexOf(fallbackMarker);
    if(fallbackIdx !== -1) {
      const componentStr = `<CalculatorSanityContent uniqueCode="${code}" />\n\n          `;
      content = content.slice(0, fallbackIdx) + componentStr + content.slice(fallbackIdx);
      fs.writeFileSync(file, content);
      console.log(`Updated ${dir} with ${code} via fallback marker`);
    } else {
      console.log(`Could not find insertion point in ${dir}`);
    }
  }
}
