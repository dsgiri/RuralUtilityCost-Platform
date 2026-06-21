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

const articles = [
  {
    _id: 'article-solar-costs',
    _type: 'post',
    title: 'The Hidden Costs of Off-Grid Solar',
    slug: { _type: 'slug', current: 'hidden-costs-off-grid-solar' },
    publishedAt: new Date().toISOString(),
    excerpt: 'Solar panels are getting cheaper, but battery banks are not. Learn how to budget for the true lifecycle costs of an off-grid electrical system.',
    body: [
      {
        _key: 'block1',
        _type: 'block',
        children: [{ _key: 'span1', _type: 'span', text: 'Going off-grid is a dream for many rural property owners. However, the initial price tag of a solar array is just the beginning. The real cost lies in energy storage.' }]
      },
      {
        _key: 'block2',
        _type: 'block',
        style: 'h3',
        children: [{ _key: 'span2', _type: 'span', text: 'Battery Lifespans and Replacement' }]
      },
      {
        _key: 'block3',
        _type: 'block',
        children: [{ _key: 'span3', _type: 'span', text: 'Lead-acid batteries may last 3-5 years if properly maintained, while Lithium Iron Phosphate (LiFePO4) batteries can last 10-15 years. Regardless of the chemistry, you must amortize the replacement cost over the life of the system. A $10,000 battery bank replaced every 10 years adds $1,000 to your annual utility cost.' }]
      }
    ]
  },
  {
    _id: 'article-well-vs-hauling',
    _type: 'post',
    title: 'Drilling a Well vs. Hauling Water: The Long-Term Math',
    slug: { _type: 'slug', current: 'well-vs-hauling-water-math' },
    publishedAt: new Date().toISOString(),
    excerpt: 'Should you invest $15,000 in a new well, or buy a water trailer and haul it yourself? We break down the 10-year costs of both options.',
    body: [
      {
        _key: 'block1',
        _type: 'block',
        children: [{ _key: 'span1', _type: 'span', text: 'Water is the most critical infrastructure on any rural property. When deciding how to secure it, you generally have two options: drill a private well or haul water to a holding tank.' }]
      },
      {
        _key: 'block2',
        _type: 'block',
        style: 'h3',
        children: [{ _key: 'span2', _type: 'span', text: 'The Capital Cost of Drilling' }]
      },
      {
        _key: 'block3',
        _type: 'block',
        children: [{ _key: 'span3', _type: 'span', text: 'Drilling a well is a massive capital expense. At $35 to $55 per foot, a 400-foot well can easily cost over $15,000 before you even add a pump and pressure tank. However, once installed, your ongoing costs are minimal—mostly just the electricity to run the pump.' }]
      },
      {
        _key: 'block4',
        _type: 'block',
        style: 'h3',
        children: [{ _key: 'span4', _type: 'span', text: 'The Operating Cost of Hauling' }]
      },
      {
        _key: 'block5',
        _type: 'block',
        children: [{ _key: 'span5', _type: 'span', text: 'Hauling water requires a smaller upfront investment (a trailer, a large tank, and a cistern). However, the operating costs in fuel, wear-and-tear on your vehicle, and your personal time quickly add up. Over a 10-year period, hauling water often costs significantly more than financing a well.' }]
      }
    ]
  },
  {
    _id: 'article-septic-101',
    _type: 'post',
    title: 'Septic Systems 101: Avoiding a $15,000 Emergency',
    slug: { _type: 'slug', current: 'septic-systems-101' },
    publishedAt: new Date().toISOString(),
    excerpt: 'A failing septic system is a biohazard and a massive financial liability. Learn the simple maintenance routines that add decades to your drain field.',
    body: [
      {
        _key: 'block1',
        _type: 'block',
        children: [{ _key: 'span1', _type: 'span', text: 'When you move beyond city sewer lines, wastewater management becomes your responsibility. A well-maintained septic system can last 30 to 40 years. A neglected one can fail in 5 years.' }]
      },
      {
        _key: 'block2',
        _type: 'block',
        style: 'h3',
        children: [{ _key: 'span2', _type: 'span', text: 'Pump It Before It Fails' }]
      },
      {
        _key: 'block3',
        _type: 'block',
        children: [{ _key: 'span3', _type: 'span', text: 'The solid waste in your septic tank slowly builds up over time. If the sludge level gets too high, solids will flow out of the tank and into your drain field, clogging the soil. Once the drain field is clogged, the entire system must be excavated and replaced. Pumping your tank every 3-5 years (costing $300-$500) is cheap insurance against a $15,000 replacement project.' }]
      }
    ]
  }
];

async function seed() {
  console.log('Starting Sanity upload...');
  
  for (const article of articles) {
    try {
      await client.createOrReplace(article);
      console.log(`✅ Uploaded article: "${article.title}"`);
    } catch (err: any) {
      console.error(`❌ Failed to create "${article.title}":`, err.message);
    }
  }
  
  console.log('Upload complete! You can now check your Sanity Studio or refresh the Articles page.');
}

seed();
