const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
}

const files = walkSync('src/features').filter(f => f.endsWith('.tsx'));

const results = [];

files.forEach(file => {
  const parts = file.split('/');
  const fileName = parts[parts.length - 1];
  const dirName = parts[parts.length - 2];
  
  if (fileName !== `${dirName}.tsx` && !fileName.endsWith('Page.tsx') && !(dirName === 'calculators' && fileName !== 'CalculatorSanityContent.tsx')) {
    // Only include top-level pages
    if (fileName !== 'FarmInputCost.tsx' && fileName !== 'CropPestEconomics.tsx') {
        return;
    }
  }

  const content = fs.readFileSync(file, 'utf-8');
  if (!content.includes('export default') && !content.includes('export function') && !content.includes('<div')) return;
  if (file.endsWith('index.tsx')) return; // Ignore index files

  const contentLower = content.toLowerCase();

  const hasH1 = content.includes('<h1');
  const hasFAQ = contentLower.includes('faq') || contentLower.includes('frequently asked questions');
  const hasFormulas = contentLower.includes('how it works') || contentLower.includes('how this works') || contentLower.includes('assumptions') || contentLower.includes('formula') || contentLower.includes('logic');
  
  const isCalculator = file.includes('calculators') || file.includes('farm-input-cost') || file.includes('crop-pest-economics') || file.includes('farm-finance');

  if (isCalculator && !file.includes('Hub') && !file.includes('Home') && !file.includes('About') && !file.includes('Contact')) {
    results.push({
      file: file.replace('src/features/', ''),
      hasH1,
      hasFAQ,
      hasFormulas
    });
  }
});

const output = [];
output.push("Based on the `UNIVERSAL_CALCULATOR_PROMPT.md` standard, calculators must include:");
output.push("1. Hero section with H1");
output.push("2. FAQ section");
output.push("3. Logic/Formulas/Assumptions section");

output.push("\n### Gap Analysis Report");
results.forEach(g => {
  const gaps = [];
  if (!g.hasH1) gaps.push('Missing H1 (Hero Section)');
  if (!g.hasFAQ) gaps.push('Missing FAQ Section');
  if (!g.hasFormulas) gaps.push('Missing Logic/Formulas/Assumptions Section');
  
  if (gaps.length > 0) {
    output.push(`\n**${g.file}**`);
    gaps.forEach(gap => output.push(`- [ ] ${gap}`));
  }
});

fs.writeFileSync('GAP_ANALYSIS.md', output.join('\n'));
console.log('Report generated.');
