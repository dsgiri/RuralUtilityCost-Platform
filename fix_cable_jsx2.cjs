const fs = require('fs');

const file = 'src/features/calculators/Cable/Cable.tsx';
let content = fs.readFileSync(file, 'utf-8');

// The original file had `<div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">` as the root of the return statement.
// We messed up the tags. Let's find the `return (`
const returnIdx = content.indexOf('return (');
// We want to replace everything from `return (` to the end of the file with a clean structure, or just fix it.
// Let's just fix the tags. We know we added a div wrapper that didn't close.
content = content.replace('<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">\n      <div className="mb-8">', '<div className="mb-8">');
content = content.replace('    <div className="mb-8">', '<div className="p-4 sm:p-6">\n<div className="mb-8">');

// Add closing tag before the last `);`
const endIdx = content.lastIndexOf(');');
content = content.substring(0, endIdx) + '</div>\n' + content.substring(endIdx);

fs.writeFileSync(file, content);
