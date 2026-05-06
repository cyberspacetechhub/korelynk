import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Eye, Search } from 'lucide-react'
import { useBlogs } from '../lib/useBlogs'
import PageSEO from '../components/PageSEO'
import BrandedPlaceholder from '../components/BrandedPlaceholder'

export default function Blog() {
  const [search, setSearch] = useState('')
  const [query, setQuery]   = useState('')

  const { data, isLoading, isError } = useBlogs({ limit: 12, search: query || undefined })
  const posts = data?.data ?? []
  console.log(posts)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(search.trim())
  }

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' }) : ''

  return (
    <main className="px-6 pb-24 pt-28">
      <PageSEO
        title="Blog | Web & Mobile Development Insights — InnTechLab"
        description="Read articles on web development, mobile apps, React, Node.js, and software engineering from the InnTechLab team."
        canonical="/blog"
      />
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-brand-600">Insights</p>
          <h1 className="text-4xl font-bold text-gray-900 font-display">Blog</h1>
          <p className="max-w-xl mt-3 text-gray-500">
            Articles on web development, mobile apps, and software engineering from the InnTechLab team.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex max-w-md gap-2 mb-10">
          <div className="relative flex-1">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors">
            Search
          </button>
        </form>

        {/* Loading */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden border border-gray-100 rounded-2xl animate-pulse">
                <div className="bg-gray-100 h-44" />
                <div className="p-5 space-y-3">
                  <div className="w-20 h-3 bg-gray-100 rounded-full" />
                  <div className="w-3/4 h-4 bg-gray-100 rounded-full" />
                  <div className="w-full h-3 bg-gray-100 rounded-full" />
                  <div className="w-2/3 h-3 bg-gray-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="py-20 text-center">
            <p className="text-gray-500">Failed to load posts. Please try again later.</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && posts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400">No articles found{query ? ` for "${query}"` : ''}.</p>
            {query && (
              <button onClick={() => { setSearch(''); setQuery('') }} className="mt-3 text-sm text-brand-600 hover:text-brand-700">
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && posts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <Link
                key={post._id}
                to={`/blog/${post.slug}`}
                className="flex flex-col overflow-hidden transition-all bg-white border border-gray-100 group rounded-2xl hover:shadow-sm hover:border-gray-200"
              >
                {/* Image */}
                <div className="overflow-hidden h-44">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <BrandedPlaceholder title={post.title} subtitle={post.category?.name} aspectRatio="16/9" />
                  )}
                </div>

                <div className="flex flex-col flex-1 p-5">
                  {/* Category */}
                  {post.category && (
                    <span
                      className="self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 text-white"
                      style={{ backgroundColor: post.category.color || '#4f46e5' }}
                    >
                      {post.category.name}
                    </span>
                  )}

                  <h2 className="flex-1 mb-2 text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-brand-600 line-clamp-2">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="mb-4 text-xs leading-relaxed text-gray-500 line-clamp-2">{post.excerpt}</p>
                  )}

                  <div className="flex items-center justify-between mt-auto text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {post.views}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination hint */}
        {!isLoading && data && data.totalPages > 1 && (
          <p className="mt-10 text-sm text-center text-gray-400">
            Showing page 1 of {data.totalPages}
          </p>
        )}

      </div>
    </main>
  )
}
