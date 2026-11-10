import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, Search, ArrowRight, X } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState('');

  const defaultPosts: BlogPost[] = [
    {
      id: 'blog-1',
      title: 'Designing Resilient Relational Schemas for Multi-Module Systems',
      slug: 'designing-resilient-relational-schemas',
      excerpt:
        'A practical guide to database normalization, foreign key constraint isolation, and avoiding query locking in production applications.',
      content: `When building applications that support multiple user roles—such as administrators, doctors, therapists, and billing staff—database design becomes the bedrock of application stability.

### 1. The Trap of Premature Denormalization
Many engineers denormalize too early in pursuit of theoretical micro-optimizations. In practice, redundant data stores without atomic synchronization lead to data drift and broken reporting.

### 2. Strategic Indexing
Always index foreign keys and columns that participate in WHERE, JOIN, and ORDER BY clauses. However, each index introduces write overhead during INSERTs and UPDATEs. Profiling with EXPLAIN ANALYZE ensures every index earns its disk footprint.

### 3. Role-Based Data Partitioning
Structuring access controls at both the API and database levels ensures that cross-tenant queries cannot leak sensitive medical or financial records.`,
      coverImage: null,
      readTimeMinutes: 5,
      isPublished: true,
      publishedAt: '2026-09-12T00:00:00Z',
      categoryId: 'cat-db',
      category: { id: 'cat-db', name: 'Database Architecture', slug: 'database-architecture' },
      tags: 'PostgreSQL, Database Design, System Architecture',
      viewsCount: 210,
      createdAt: '2026-09-12T00:00:00Z',
    },
    {
      id: 'blog-2',
      title: 'Securing REST APIs: Beyond Standard Bearer Tokens',
      slug: 'securing-rest-apis-beyond-bearer-tokens',
      excerpt:
        'Architecting defense-in-depth with HTTP-only cookies, granular RBAC middleware, and server-side Zod input sanitization.',
      content: `Authentication is more than simply verifying a username and password. In modern web architectures, API security encompasses session lifecycles, CSRF mitigation, and strict input boundaries.

### 1. HTTP-Only Cookies vs LocalStorage
Storing JWTs in browser localStorage leaves your application vulnerable to XSS token theft. Using HTTP-only, secure, SameSite cookies ensures client-side scripts cannot inspect or exfiltrate session credentials.

### 2. Multi-tier Role Authorization
Instead of binary admin checks, implement permission matrices. A therapist should read patient assessment records but should never have mutate access to global billing configurations.`,
      coverImage: null,
      readTimeMinutes: 4,
      isPublished: true,
      publishedAt: '2026-08-05T00:00:00Z',
      categoryId: 'cat-security',
      category: { id: 'cat-security', name: 'Security & Auth', slug: 'security-auth' },
      tags: 'Express, JWT, Security, Node.js',
      viewsCount: 184,
      createdAt: '2026-08-05T00:00:00Z',
    },
  ];

  const activePosts = posts && posts.length > 0 ? posts : defaultPosts;

  const filteredPosts = activePosts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="blog" className="py-20 border-t border-slate-200/60 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Technical Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Engineering Journal & Notes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Deep-dives into database performance, backend design patterns, and full-stack software practices.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or keyword..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800/80 shadow-card-light dark:shadow-card-dark hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-semibold">
                    {post.category?.name || 'Architecture'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTimeMinutes} min read
                  </span>
                </div>

                <h3
                  onClick={() => setSelectedPost(post)}
                  className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {post.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs text-slate-400 font-mono">
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* ARTICLE READER MODAL */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="w-full max-w-3xl bg-white dark:bg-[#101726] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                    {selectedPost.category?.name || 'Technical Article'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-2">
                    {selectedPost.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mt-3">
                    <span>{selectedPost.readTimeMinutes} min read</span>
                    <span>•</span>
                    <span>{new Date(selectedPost.publishedAt || selectedPost.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

