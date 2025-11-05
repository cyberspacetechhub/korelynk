import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

import DeleteModal from '../../components/admin/DeleteModal';

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, blog: null, loading: false });

  useEffect(() => {
    fetchBlogs();
  }, [statusFilter]);

  const fetchBlogs = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      
      const response = await axios.get(`/blog/admin/all?${params}`);
      if (response.data.success) {
        setBlogs(response.data.data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (blog) => {
    setDeleteModal({ isOpen: true, blog, loading: false });
  };

  const handleDeleteConfirm = async () => {
    setDeleteModal(prev => ({ ...prev, loading: true }));
    try {
      await axios.delete(`/blog/admin/${deleteModal.blog._id}`);
      toast.success('Blog post deleted successfully');
      setDeleteModal({ isOpen: false, blog: null, loading: false });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog post');
      setDeleteModal(prev => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, blog: null, loading: false });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <div className="w-48 h-8 mb-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-4">
            <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="px-6 py-3 bg-gray-50">
            <div className="flex space-x-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 mr-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 mb-2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-3/4 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
            <p className="text-gray-600">Create and manage blog posts</p>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <Link
              to="/admin/blog/new"
              className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Link>
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow">
          {blogs.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="mb-2 text-lg font-medium text-gray-900">No blog posts found</h3>
              <p className="text-gray-600">Create your first blog post to get started.</p>
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                    Title
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell">
                    Author
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase lg:table-cell">
                    Category
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                    Status
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell">
                    Views
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase lg:table-cell">
                    Date
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-2 py-4 sm:px-6">
                      <div className="flex items-center">
                        {blog.featuredImage && (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="flex-shrink-0 object-cover w-8 h-8 mr-2 rounded sm:w-10 sm:h-10 sm:mr-3"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 whitespace-nowrap line-clamp-2">
                            {blog.title}
                          </div>
                          <div className="text-xs text-gray-500 sm:text-sm line-clamp-1 md:hidden">
                            {blog.author?.fullname || 'Unknown'} • {formatDate(blog.createdAt)}
                          </div>
                          {blog.excerpt && (
                            <div className="hidden max-w-xs mt-1 text-xs text-gray-400 md:block line-clamp-2">
                              {blog.excerpt.length > 80 ? `${blog.excerpt.substring(0, 80)}...` : blog.excerpt}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-gray-900 md:table-cell">
                      <div className="flex flex-row items-center">
                        <User className="w-4 h-4 mr-1 text-gray-400" />
                        <span className=' whitespace-nowrap'>{blog.author?.fullname || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 lg:table-cell whitespace-nowrap">
                      {blog.category ? (
                        <span 
                          className="inline-flex px-2 py-1 text-xs font-semibold text-white rounded-full"
                          style={{ backgroundColor: blog.category.color }}
                        >
                          {blog.category.name}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">Uncategorized</span>
                      )}
                    </td>
                    <td className="px-2 py-4 sm:px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Eye className="w-4 h-4 mr-1 text-gray-400" />
                        {blog.views}
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 lg:table-cell whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(blog.createdAt)}
                      </div>
                    </td>
                    <td className="px-2 py-4 text-right sm:px-6">
                      <div className="flex items-center justify-end space-x-1">
                        <Link
                          to={`/admin/blog/${blog._id}`}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/blog/edit/${blog._id}`}
                          className="p-1 text-gray-400 hover:text-indigo-600"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(blog)}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>
      
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        itemName={deleteModal.blog?.title}
        loading={deleteModal.loading}
      />
    </>
  );
};

export default AdminBlog;