import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import axios from '../api/axios';

const BlogPreview = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const response = await axios.get('/blog?limit=3');
      if (response.data.success) {
        setBlogs(response.data.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-300 rounded mb-3"></div>
              <div className="h-6 bg-gray-300 rounded mb-3"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
        <p className="text-gray-600">Check back soon for our latest articles!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <article key={blog._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
          {blog.featuredImage && (
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
          )}
          
          <div className="p-6">
            {blog.category && (
              <span 
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                style={{ backgroundColor: blog.category.color }}
              >
                {blog.category.name}
              </span>
            )}
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              <Link to={`/blog/${blog.slug}`} className="hover:text-indigo-600 transition-colors">
                {blog.title}
              </Link>
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {blog.excerpt || blog.content.substring(0, 120)}...
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {blog.author?.fullname}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(blog.publishedAt)}
              </div>
            </div>
            
            <Link
              to={`/blog/${blog.slug}`}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogPreview;