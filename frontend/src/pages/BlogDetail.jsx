import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Eye, Tag, MessageCircle, ArrowLeft } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import ShareButton from '../components/ShareButton';
import SEO from '../components/SEO';
import DetailSkeleton from '../components/skeletons/DetailSkeleton';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    content: ''
  });

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/blog/${slug}`);
      if (response.data.success) {
        setBlog(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Blog post not found');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/blog/${blog._id}/comments`, commentForm);
      toast.success('Comment added successfully');
      setCommentForm({ fullName: '', email: '', phone: '', content: '' });
      fetchBlog(); // Refresh to show new comment
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <DetailSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={blog.title}
        description={blog.excerpt || blog.content.substring(0, 160)}
        keywords={blog.tags || []}
        image={blog.featuredImage}
        url={`/blog/${blog.slug}`}
        type="article"
        article={{
          publishedAt: blog.publishedAt,
          updatedAt: blog.updatedAt,
          author: blog.author?.fullname,
          category: blog.category?.name,
          tags: blog.tags
        }}
      />
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <article className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to previous page
            </button>
          </div>
          
          {/* Header */}
          <header className="mb-8">
            {blog.category && (
              <span 
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4"
                style={{ backgroundColor: blog.category.color }}
              >
                {blog.category.name}
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {blog.author?.fullname}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {formatDate(blog.publishedAt)}
              </div>
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                {blog.views} views
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                {blog.comments?.length || 0} comments
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Share this article:</span>
                <ShareButton 
                  url={window.location.href}
                  title={blog.title}
                  description={blog.excerpt || blog.title}
                  image={blog.featuredImage}
                />
              </div>
            </div>

            {blog.featuredImage && (
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
              />
            )}
          </header>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Comments ({blog.comments?.length || 0})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h4>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={commentForm.fullName}
                  onChange={(e) => setCommentForm({...commentForm, fullName: e.target.value})}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={commentForm.email}
                  onChange={(e) => setCommentForm({...commentForm, email: e.target.value})}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={commentForm.phone}
                  onChange={(e) => setCommentForm({...commentForm, phone: e.target.value})}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <textarea
                placeholder="Your comment..."
                value={commentForm.content}
                onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-24 mb-4"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {blog.comments?.map((comment, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{comment.fullName}</h5>
                        <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 ml-13">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;