const fs = require('fs');

const file = 'src/features/calculators/Cable/Cable.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace('return (\n    \n      <div className="mb-8">', 'return (\n    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">\n      <div className="mb-8">');
const finalReplace = content.lastIndexOf('<CalculatorSanityContent calculatorName="Cable" />');
if(finalReplace !== -1) {
    content = content.slice(0, finalReplace + 50) + '\n    </div>\n' + content.slice(finalReplace + 50);
}

fs.writeFileSync(file, content);
console.log('Fixed JSX');
