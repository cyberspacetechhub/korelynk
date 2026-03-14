import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, Tag, Search } from 'lucide-react';
import axios from '../api/axios';
import SEO from '../components/SEO';
import BlogSkeleton from '../components/skeletons/BlogSkeleton';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [selectedCategory, searchTerm]);

  const fetchBlogs = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchTerm) params.append('search', searchTerm);
      const response = await axios.get(`/blog?${params}`);
      if (response.data.success) setBlogs(response.data.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      if (response.data.success) setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-midnight transition-colors py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 dark:bg-white/10 rounded w-64 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <BlogSkeleton count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-midnight transition-colors py-16">
      <SEO
        title="Tech Blog - Programming Tutorials & Development Insights"
        description="Stay updated with the latest programming tutorials, web development insights, and technology trends."
        keywords={['programming blog', 'web development tutorials', 'React tutorials', 'tech blog']}
        url="/blog"
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6">Our Blog</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest insights, tutorials, and industry trends in technology and web development.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === ''
                  ? 'bg-gradient-electric text-white shadow-lg shadow-electric-blue/50'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category._id
                    ? 'bg-gradient-electric text-white shadow-lg shadow-electric-blue/50'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog._id} className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
                {blog.featuredImage && (
                  <div className="relative overflow-hidden h-48">
                    <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                )}
                <div className="p-6">
                  {blog.category && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3" style={{ backgroundColor: blog.category.color }}>
                      {blog.category.name}
                    </span>
                  )}
                  <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-electric-cyan transition-colors">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center"><User className="w-4 h-4 mr-1" />{blog.author?.fullname}</div>
                      <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{formatDate(blog.publishedAt)}</div>
                    </div>
                    <div className="flex items-center"><Eye className="w-4 h-4 mr-1" />{blog.views}</div>
                  </div>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10">
                          <Tag className="w-3 h-3 mr-1" />{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
