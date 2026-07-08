const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
}

const files = [...walkSync('src/pages'), ...walkSync('src/features')].filter(f => f.endsWith('.tsx'));

const results = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  if (!content.includes('function') && !content.includes('const') && !content.includes('<div')) return;
  // Ignore purely structural files like index.tsx unless they have actual content
  if (file.endsWith('index.tsx') && content.length < 500) return;

  const hasH1 = content.includes('<h1');
  const hasFAQ = content.toLowerCase().includes('faq') || content.toLowerCase().includes('frequently asked questions');
  const hasFormulas = content.toLowerCase().includes('formula') || content.toLowerCase().includes('how it works') || content.toLowerCase().includes('how this works') || content.toLowerCase().includes('assumptions');
  
  if (hasH1 || hasFAQ || hasFormulas) {
    results.push({
      file: file.replace('src/', ''),
      hasH1,
      hasFAQ,
      hasFormulas
    });
  }
});

console.log(JSON.stringify(results, null, 2));
