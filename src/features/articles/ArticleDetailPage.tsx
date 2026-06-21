import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { SEO } from '../../components/SEO';
import { getArticleBySlug } from './sanityService';
import { Article } from './types';
import { urlFor } from '../../lib/sanity';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(800).fit('max').auto('format').url()}
          className="rounded-lg my-8 w-full object-cover"
        />
      );
    }
  }
};

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      try {
        const data = await getArticleBySlug(slug);
        if (data) {
          setArticle(data);
        } else {
          setError('Article not found.');
        }
      } catch (err: any) {
        console.error('Failed to fetch article:', err);
        setError('Failed to load article.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Error loading article</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <Link to="/articles" className="inline-flex items-center text-[#1a5f3f] hover:underline font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={`${article.title} | Rural Utility Cost`} 
        description={article.excerpt || article.title}
      />
      
      <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-8">
          <Link to="/articles" className="inline-flex items-center text-sm text-gray-500 hover:text-[#1a5f3f] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
          
          {article.categories && article.categories.length > 0 && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-sm uppercase tracking-widest">
                {article.categories[0].title}
              </span>
            </div>
          )}
          
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 md:gap-6 border-t border-b border-gray-100 py-4 mb-8">
             {article.author && (
               <div className="flex items-center">
                 {article.author.image && (
                   <img 
                     src={urlFor(article.author.image).width(40).height(40).url()} 
                     alt={article.author.name}
                     className="w-8 h-8 rounded-full mr-3 border border-gray-200"
                   />
                 )}
                 <div className="flex flex-col">
                   <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-0.5">Author</span>
                   <span className="font-medium text-gray-900 flex items-center">
                     {!article.author.image && <User className="w-3 h-3 mr-1" />}
                     {article.author.name}
                   </span>
                 </div>
               </div>
             )}
             
             {article.publishedAt && (
               <div className="flex flex-col ml-auto md:ml-0">
                 <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-0.5">Published</span>
                 <span className="font-medium text-gray-900 flex items-center">
                   <Calendar className="w-3 h-3 mr-1" />
                   {new Date(article.publishedAt).toLocaleDateString(undefined, {
                     year: 'numeric',
                     month: 'long',
                     day: 'numeric'
                   })}
                 </span>
               </div>
             )}
          </div>
        </div>

        {article.mainImage && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <img 
              src={urlFor(article.mainImage).width(1200).height(675).url()} 
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg prose-green max-w-none text-gray-700 leading-relaxed 
          prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
          prose-a:text-[#1a5f3f] prose-a:font-medium hover:prose-a:text-green-700
          prose-img:rounded-xl prose-img:shadow-sm">
          {article.body ? (
            <PortableText value={article.body} components={ptComponents} />
          ) : (
            <p className="italic text-gray-500">This article has no content yet.</p>
          )}
        </div>
      </article>
    </div>
  );
}
