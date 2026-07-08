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
const files = walkSync('src/features/calculators').filter(f => f.endsWith('.tsx'));
const agCalculators = [
    'Gestation', 'Incubation', 'MeatYield', 'MeatProcessing', 'HiveStartup', 'HoneyYield', 'CattleGrowthChart'
];
const results = [];
files.forEach(file => {
  const parts = file.split('/');
  const fileName = parts[parts.length - 1];
  const dirName = parts[parts.length - 2];
  
  if (fileName !== `${dirName}.tsx` || !agCalculators.includes(dirName)) return;
  const content = fs.readFileSync(file, 'utf-8');
  const contentLower = content.toLowerCase();
  const hasH1 = content.includes('<h1');
  const hasFAQ = contentLower.includes('faq') || contentLower.includes('frequently asked questions');
  const hasFormulas = contentLower.includes('formula') || contentLower.includes('logic');
  
  results.push({
    file: file.replace('src/features/calculators/', ''),
    hasH1,
    hasFAQ,
    hasFormulas
  });
});
const output = [];
output.push("Agriculture Calculators Gap Analysis\n");
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
fs.writeFileSync('GAP_AG.md', output.join('\n'));
console.log('Report generated.');
