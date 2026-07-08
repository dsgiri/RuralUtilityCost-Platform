const fs = require('fs');

const file = 'src/features/calculators/Cable/Cable.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Insert H1
if (!content.includes('<h1')) {
  const insertIndex = content.indexOf('<div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">');
  if (insertIndex !== -1) {
    const hero = `
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Cable TV & Streaming Cost Calculator</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Compare Cable TV, Satellite (Dish/DirecTV), and Streaming bundles for rural homes. Find the best TV packages based on your ZIP code, TV count, and viewing habits.
        </p>
      </div>
    `;
    content = content.slice(0, insertIndex) + hero + content.slice(insertIndex);
  }
}

// Insert Formula section
if (!content.includes('How it works')) {
  // Find the end of the grid, usually before the CalculatorSanityContent
  const contentEnd = content.lastIndexOf('<CalculatorSanityContent');
  if (contentEnd !== -1) {
    const formulas = `
      <section className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How this works (Assumptions & Logic)</h2>
        <div className="prose max-w-none text-gray-600">
          <p>This calculator estimates monthly television costs for rural residents using base provider assumptions:</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>ZIP Code Logic:</strong> Certain zip prefixes (e.g., 760, 770, 782) unlock traditional wired Cable TV packages, while remote areas default to Satellite or Streaming over cellular/WISP.</li>
            <li><strong>Base Pricing:</strong> Dish ($105), DirecTV ($112), Streaming ($85), and Cable ($120).</li>
            <li><strong>Hardware Fees:</strong> Traditional providers (Dish, DirecTV, Cable) typically charge $7-$10 per additional receiver box beyond the first TV. Streaming relies on smart TVs or cheap sticks ($0 recurring hardware fee).</li>
            <li><strong>Sports Packages:</strong> Regional sports networks (RSNs) and premium sports add $15-$30 depending on the provider.</li>
            <li><strong>Internet Bundling:</strong> Bundling internet with traditional cable often yields a $10-$20 discount, whereas streaming requires a standalone internet connection.</li>
          </ul>
        </div>
      </section>
    `;
    content = content.slice(0, contentEnd) + formulas + content.slice(contentEnd);
  }
}

fs.writeFileSync(file, content);
console.log('Fixed Cable.tsx');
