import 'dotenv/config';
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Error: Missing VITE_SANITY_PROJECT_ID or SANITY_API_TOKEN environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-20',
  token,
  useCdn: false,
});

function getCategoryMap(code: string): { category: string, subcategory: string } {
  if (code.startsWith('CALC-PROP')) {
    const num = parseInt(code.replace('CALC-PROP-', ''), 10);
    let sub = 'General Construction';
    if (num === 101) sub = 'Real Estate';
    else if ([102, 106].includes(num)) sub = 'Water & Waste';
    else if ([103, 104].includes(num)) sub = 'Earthwork';
    else if (num === 105) sub = 'Fencing';
    return { category: 'Property & Construction', subcategory: sub };
  }
  if (code.startsWith('CALC-UTIL')) {
    const num = parseInt(code.replace('CALC-UTIL-', ''), 10);
    let sub = 'Grid & Utilities';
    if ([201, 202, 203, 204].includes(num)) sub = 'Generators & Backup';
    else if ([205, 206].includes(num)) sub = 'Delivered Fuels & Water';
    else if (num === 207) sub = 'Solar & Off-Grid';
    else if ([208, 209].includes(num)) sub = 'Telecommunications';
    return { category: 'Energy & Utilities', subcategory: sub };
  }
  if (code.startsWith('CALC-FARM')) {
    const num = parseInt(code.replace('CALC-FARM-', ''), 10);
    let sub = 'General Farm';
    if ([301, 302, 303].includes(num)) sub = 'Meat Processing';
    else if ([304, 305, 306].includes(num)) sub = 'Beekeeping';
    else if (num === 307) sub = 'Habitat Restoration';
    else if ([308, 309, 310, 311, 312].includes(num)) sub = 'Livestock Management';
    else if ([313, 314, 315].includes(num)) sub = 'Agronomy & Inputs';
    else if ([316, 317, 318].includes(num)) sub = 'Crop Economics';
    return { category: 'Agriculture & Farm', subcategory: sub };
  }
  if (code.startsWith('CALC-BIZ')) {
    const num = parseInt(code.replace('CALC-BIZ-', ''), 10);
    let sub = 'Business Strategy';
    if (num === 404) sub = 'Prioritization';
    else if ([401, 402].includes(num)) sub = 'Profitability';
    else if (num === 403) sub = 'Compliance';
    return { category: 'Business & Profit', subcategory: sub };
  }
  if (code.startsWith('CALC-GOV')) {
    return { category: 'Government Aid & Grants', subcategory: 'Federal & State Grants' };
  }
  
  return { category: 'Uncategorized', subcategory: 'General' };
}

async function run() {
  const registryText = fs.readFileSync(path.join(process.cwd(), 'docs/public/CALCULATOR_REGISTRY.md'), 'utf-8');

  
  const blocks = registryText.split('### `CALC-').slice(1);
  
  for (const block of blocks) {
    const lines = block.split('\n');
    const headerLine = lines[0];
    
    // Parse header: CALC-PROP-101`: Rural Land Value Estimator (`/rural-land`)
    const headerMatch = headerLine.match(/^([A-Z0-9\-]+)`:\s*(.*?)\s*\(\`?\/([a-z0-9\-]+)\`?\)/);
    if (!headerMatch) continue;
    
    const uniqueCode = 'CALC-' + headerMatch[1];
    const title = headerMatch[2].trim();
    const slug = headerMatch[3].trim();
    
    let description = '';
    let functionality = '';
    let calculation = '';
    let painPoints = '';
    
    for (const line of lines) {
      if (line.includes('* **Description:**')) description = line.replace('* **Description:**', '').trim();
      if (line.includes('* **Functionality:**')) functionality = line.replace('* **Functionality:**', '').trim();
      if (line.includes('* **Core Calculation:**')) calculation = line.replace('* **Core Calculation:**', '').trim();
      if (line.includes('* **Target Pain Points:**')) painPoints = line.replace('* **Target Pain Points:**', '').trim();
    }
    
    const howThisWorks = [
      {
        _key: 'block1',
        _type: 'block',
        children: [{ _key: 'span1', _type: 'span', text: description }]
      },
      {
        _key: 'block2',
        _type: 'block',
        children: [{ _key: 'span2', _type: 'span', text: functionality }]
      }
    ];
    
    const assumptions = [
      {
        _key: 'blockA1',
        _type: 'block',
        style: 'bullet',
        children: [{ _key: 'spanA1', _type: 'span', text: 'Core Calculation: ' + calculation }]
      },
      {
        _key: 'blockA2',
        _type: 'block',
        style: 'bullet',
        children: [{ _key: 'spanA2', _type: 'span', text: 'Solves: ' + painPoints }]
      }
    ];

    const { category, subcategory } = getCategoryMap(uniqueCode);

    const calcDoc = {
      _id: 'calc-' + uniqueCode.toLowerCase().replace('calc-', ''),
      _type: 'calculator',
      title,
      slug: {
        _type: 'slug',
        current: slug
      },
      uniqueCode,
      category,
      subcategory,
      status: 'published',
      howThisWorks,
      assumptions
    };
    
    try {
      const result = await client.createOrReplace(calcDoc);
      console.log('Created/Updated: ' + result.title);
    } catch (e) {
      console.error('Failed to create ' + uniqueCode, e);
    }
  }
}

run();
