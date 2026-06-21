import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { getArticles } from './sanityService';
import { Article } from './types';
import { urlFor } from '../../lib/sanity';
import { Calendar, User } from 'lucide-react';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err: any) {
        console.error('Failed to fetch articles:', err);
        setError('Failed to load articles. Please check your Sanity configuration.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <SEO 
        title="Articles & Guides | Rural Utility Cost" 
        description="Read our latest articles, guides, and practical advice on rural living, utility management, and homestead infrastructure."
      />
      
      <div className="bg-[#1a5f3f] text-white py-16 px-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-green-50">
            Rural Living Guides
          </h1>
          <p className="text-xl text-green-100/90 leading-relaxed max-w-2xl mx-auto font-medium">
            Expert advice and practical knowledge for managing your homestead, farm, or off-grid property.
          </p>
        </div>
      </div>

      <div className="flex-grow bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg max-w-2xl mx-auto text-center">
              <p>{error}</p>
              <div className="mt-4 text-sm bg-white p-4 rounded text-left border border-red-100">
                <p className="font-bold mb-2">To fix this, you need to set up your Sanity project:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Create a project on Sanity.io</li>
                  <li>Set up the default blog template</li>
                  <li>Update your <code>.env</code> file with the Project ID and Dataset</li>
                  <li>Add <code>http://localhost:3000</code> to your Sanity CORS origins</li>
                </ol>
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">No articles found.</p>
              <p className="mt-2">Create some posts in your Sanity Studio to see them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                 <Link key={article._id} to={`/articles/${article.slug.current}`} className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                   {article.mainImage && (
                     <div className="h-48 overflow-hidden bg-gray-100">
                       <img 
                         src={urlFor(article.mainImage).width(600).height(400).url()} 
                         alt={article.title}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                       />
                     </div>
                   )}
                   <div className="p-6 flex flex-col flex-grow">
                     {article.categories && article.categories.length > 0 && (
                       <div className="mb-3">
                         <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wider">
                           {article.categories[0].title}
                         </span>
                       </div>
                     )}
                     <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1a5f3f] transition-colors line-clamp-2">
                       {article.title}
                     </h2>
                     {article.excerpt && (
                       <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                         {article.excerpt}
                       </p>
                     )}
                     <div className="flex items-center text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
                        {article.author && (
                          <div className="flex items-center mr-4">
                            <User className="w-3 h-3 mr-1" />
                            <span>{article.author.name}</span>
                          </div>
                        )}
                        {article.publishedAt && (
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                     </div>
                   </div>
                 </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
