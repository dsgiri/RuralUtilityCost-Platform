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
  
  if (fileName !== `${dirName}.tsx` && fileName !== 'index.tsx' && !fileName.endsWith('Page.tsx')) return;

  const content = fs.readFileSync(file, 'utf-8');
  if (!content.includes('export default') && !content.includes('export function') && !content.includes('<div')) return;
  if (file.endsWith('index.tsx') && content.length < 500) return;

  const hasH1 = content.includes('<h1');
  const hasFAQ = content.toLowerCase().includes('faq') || content.toLowerCase().includes('frequently asked questions');
  const hasFormulas = content.toLowerCase().includes('formula') || content.toLowerCase().includes('how it works') || content.toLowerCase().includes('how this works') || content.toLowerCase().includes('assumptions');
  
  // Try to determine if it's a calculator by looking for imports or typical structure
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

const gaps = results.filter(r => !r.hasH1 || !r.hasFAQ || !r.hasFormulas);

console.log("Calculators with gaps:");
gaps.forEach(g => {
  console.log(`- ${g.file}: ${!g.hasH1 ? '[No H1]' : ''} ${!g.hasFAQ ? '[No FAQ]' : ''} ${!g.hasFormulas ? '[No Formulas/Logic]' : ''}`);
});
