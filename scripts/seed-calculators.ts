import { createClient } from '@sanity/client';

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

const categories = [
  {
    _id: 'cat-farm',
    _type: 'category',
    title: 'Animal & Farm',
    slug: { _type: 'slug', current: 'animal-and-farm' }
  },
  {
    _id: 'cat-util',
    _type: 'category',
    title: 'Energy & Utilities',
    slug: { _type: 'slug', current: 'energy-and-utilities' }
  },
  {
    _id: 'cat-prop',
    _type: 'category',
    title: 'Property & Construction',
    slug: { _type: 'slug', current: 'property-and-construction' }
  }
];

const subCategories = [
  {
    _id: 'sub-livestock',
    _type: 'subCategory',
    title: 'Livestock',
    slug: { _type: 'slug', current: 'livestock' },
    parentCategory: { _type: 'reference', _ref: 'cat-farm' }
  },
  {
    _id: 'sub-generators',
    _type: 'subCategory',
    title: 'Backup Generators',
    slug: { _type: 'slug', current: 'backup-generators' },
    parentCategory: { _type: 'reference', _ref: 'cat-util' }
  },
  {
    _id: 'sub-land',
    _type: 'subCategory',
    title: 'Land & Structure',
    slug: { _type: 'slug', current: 'land-and-structure' },
    parentCategory: { _type: 'reference', _ref: 'cat-prop' }
  }
];

const calculators = [
  {
    _id: 'calc-farm-303',
    _type: 'calculator',
    title: 'Meat Cost Per Pound Calculator',
    uniqueCode: 'CALC-FARM-303',
    status: 'published',
    category: { _type: 'reference', _ref: 'cat-farm' },
    subCategory: { _type: 'reference', _ref: 'sub-livestock' },
    howThisWorks: [
      {
        _key: 'block1',
        _type: 'block',
        children: [{ _key: 'span1', _type: 'span', text: 'This calculator determines the true cost per pound of your meat (beef, pork, lamb) after considering the purchase price of the animal, the total feed cost across its lifespan, and all processing/butcher fees.' }]
      },
      {
        _key: 'block2',
        _type: 'block',
        children: [{ _key: 'span2', _type: 'span', text: 'It uses standard USDA average yields to estimate how much boxed meat you will receive from the live weight.' }]
      }
    ],
    assumptions: [
      {
        _key: 'blockA1',
        _type: 'block',
        style: 'bullet',
        children: [{ _key: 'spanA1', _type: 'span', text: 'Uses average dressing percentages: 62% for Beef, 72% for Pork, 50% for Lamb.' }]
      },
      {
        _key: 'blockA2',
        _type: 'block',
        style: 'bullet',
        children: [{ _key: 'spanA2', _type: 'span', text: 'Uses average cut yields (from carcass to packaged meat): 60% for Beef, 65% for Pork, 60% for Lamb.' }]
      },
      {
        _key: 'blockA3',
        _type: 'block',
        style: 'bullet',
        children: [{ _key: 'spanA3', _type: 'span', text: 'The net cost per pound represents what you are effectively paying for the final packaged meat going into your freezer.' }]
      }
    ]
  },
  {
    _id: 'calc-util-202',
    _type: 'calculator',
    title: 'Generator Runtime Calculator',
    uniqueCode: 'CALC-UTIL-202',
    status: 'published',
    category: { _type: 'reference', _ref: 'cat-util' },
    subCategory: { _type: 'reference', _ref: 'sub-generators' },
    howThisWorks: [
      {
        _key: 'block1',
        _type: 'block',
        children: [{ _key: 'span1', _type: 'span', text: 'This calculator estimates how long your backup generator will run before running out of fuel. It is based on the generator\'s maximum fuel burn rate and how heavily you are loading it (Load Percentage).' }]
      },
      {
        _key: 'block2',
        _type: 'block',
        children: [{ _key: 'span2', _type: 'span', text: 'Generators burn less fuel when they share a lighter electrical load, and burn maximum fuel when pushed to 100% capacity.' }]
      }
    ],
    assumptions: [
      {
        _key: 'blockA1',
        _type: 'block',
        style: 'bullet',
        children: [{ _key: 'spanA1', _type: 'span', text: 'Assumes a linear-to-slightly-curved efficiency drop-off where 50% load burns roughly 50-60% of max burn rate depending on the engine curve.' }]
      },
      {
        _key: 'blockA2',
        _type: 'block',
        style: 'bullet',
        children: [{ _key: 'spanA2', _type: 'span', text: 'Fuel volume entered is completely usable (no dead volume at the bottom of the tank).' }]
      }
    ]
  },
  {
    _id: 'calc-prop-102',
    _type: 'calculator',
    title: 'Septic System Sizing Calculator',
    uniqueCode: 'CALC-PROP-102',
    status: 'published',
    category: { _type: 'reference', _ref: 'cat-prop' },
    subCategory: { _type: 'reference', _ref: 'sub-land' },
    howThisWorks: [
      {
        _key: 'block1',
        _type: 'block',
        children: [{ _key: 'span1', _type: 'span', text: 'This tool sizes a primary septic holding tank based on the number of bedrooms in a dwelling. EPA and state health departments generally scale septic tank capacities based on the potential occupancy of the home (measured by bedrooms), rather than the number of bathrooms.' }]
      }
    ],
    assumptions: [
      {
        _key: 'blockA1',
        _type: 'block',
        style: 'bullet',
        children: [{ _key: 'spanA1', _type: 'span', text: 'Base standard: 1–2 bedrooms = 750 to 1,000 gallons minimum.' }]
      },
      {
        _key: 'blockA2',
        _type: 'block',
        style: 'bullet',
        children: [{ _key: 'spanA2', _type: 'span', text: '3 bedrooms = 1,000 gallons.' }]
      },
      {
        _key: 'blockA3',
        _type: 'block',
        style: 'bullet',
        children: [{ _key: 'spanA3', _type: 'span', text: '4 bedrooms = 1,200 gallons. Additional bedrooms add 250 gallons each.' }]
      },
      {
        _key: 'blockA4',
        _type: 'block',
        style: 'bullet',
        children: [{ _key: 'spanA4', _type: 'span', text: 'Results are baseline estimates. Always consult local county zoning and health codes which have final jurisdiction.' }]
      }
    ]
  }
];

async function seedCalculators() {
  console.log('Starting Sanity calculator seeding...');
  
  for (const cat of categories) {
    try {
      const result = await client.createOrReplace(cat);
      console.log(`Created/Updated category: ${result.title}`);
    } catch (error) {
      console.error(`Failed to create category ${cat.title}:`, error);
    }
  }

  for (const subCat of subCategories) {
    try {
      const result = await client.createOrReplace(subCat);
      console.log(`Created/Updated sub-category: ${result.title}`);
    } catch (error) {
      console.error(`Failed to create sub-category ${subCat.title}:`, error);
    }
  }

  for (const calc of calculators) {
    try {
      // Use createOrReplace to update if it already exists
      const result = await client.createOrReplace(calc);
      console.log(`Created/Updated calculator: ${result.title} (${result._id})`);
    } catch (error) {
      console.error(`Failed to create calculator ${calc.title}:`, error);
    }
  }
  
  console.log('Seeding complete!');
}

seedCalculators();
