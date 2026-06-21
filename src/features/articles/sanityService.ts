import { sanityClient } from '../../lib/sanity';
import { Article } from './types';

export async function getArticles(): Promise<Article[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      name,
      image
    },
    categories[]->{
      title
    }
  }`;
  
  return sanityClient.fetch(query);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    mainImage,
    author->{
      name,
      image
    },
    categories[]->{
      title
    }
  }`;
  
  return sanityClient.fetch(query, { slug });
}
