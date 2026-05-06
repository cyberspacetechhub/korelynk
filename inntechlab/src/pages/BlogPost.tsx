import { useParams, Link } from 'react-router-dom'
import { Calendar, Eye, ArrowLeft, Tag } from 'lucide-react'
import { useBlogPost } from '../lib/useBlogs'
import PageSEO from '../components/PageSEO'
import ShareButtons from '../components/ShareButtons'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, isLoading, isError } = useBlogPost(slug ?? '')

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' }) : ''

  if (isLoading) {
    return (
      <main className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-24 bg-gray-100 rounded-full" />
            <div className="h-8 w-3/4 bg-gray-100 rounded-full" />
            <div className="h-4 w-1/2 bg-gray-100 rounded-full" />
            <div className="h-64 bg-gray-100 rounded-2xl" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-100 rounded-full" />
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (isError || !post) {
    return (
      <main className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Post not found</h1>
          <p className="text-gray-500 mb-6">This article doesn't exist or has been removed.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-28 pb-24 px-6">
      <PageSEO
        title={`${post.title} | InnTechLab Blog`}
        description={post.excerpt || post.content.substring(0, 160)}
        canonical={`/blog/${post.slug}`}
        image={post.featuredImage}
      />
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Category */}
        {post.category && (
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white mb-4"
            style={{ backgroundColor: post.category.color || '#4f46e5' }}
          >
            {post.category.name}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center justify-between gap-5 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {post.views} views
            </span>
            {post.author?.fullname && (
              <span className="text-gray-500">By <span className="font-medium text-gray-700">{post.author.fullname}</span></span>
            )}
          </div>
          <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
        </div>

        {/* Featured image */}
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover rounded-2xl mb-10"
            loading="eager"
          />
        )}

        {/* Content */}
        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
          {post.content.split('\n').map((para, i) =>
            para.trim()
              ? <p key={i} className="mb-4">{para}</p>
              : <br key={i} />
          )}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
            <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
            {post.tags.map(tag => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom share + back */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700">
            <ArrowLeft className="w-4 h-4" /> More articles
          </Link>
          <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
        </div>

      </div>
    </main>
  )
}
