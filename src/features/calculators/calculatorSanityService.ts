import { sanityClient } from '../../lib/sanity';

export interface CalculatorContent {
  _id: string;
  title: string;
  slug?: { current: string };
  uniqueCode: string;
  category?: string;
  subcategory?: string;
  howThisWorks: any[];
  assumptions: any[];
}

export async function getRelatedCalculators(subcategory: string, excludeCode: string): Promise<{ title: string; slug: { current: string } }[]> {
  const query = `*[_type == "calculator" && subcategory == $subcategory && uniqueCode != $excludeCode][0...4] {
    title,
    slug
  }`;
  try {
    const data = await sanityClient.fetch(query, { subcategory, excludeCode });
    return data;
  } catch (error) {
    console.error(`Failed to fetch related calculators for subcategory ${subcategory}:`, error);
    return [];
  }
}

export async function getCalculatorContentByCode(uniqueCode: string): Promise<CalculatorContent | null> {

  const query = `*[_type == "calculator" && uniqueCode == $uniqueCode][0] {
    _id,
    title,
    slug,
    uniqueCode,
    category,
    subcategory,
    howThisWorks,
    assumptions
  }`;
  try {
    const data = await sanityClient.fetch(query, { uniqueCode });
    return data;
  } catch (error) {
    console.error(`Failed to fetch sanity content for calculator ${uniqueCode}:`, error);
    return null;
  }
}
