import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Eye, Calendar, User, Tag, Clock } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/admin/DeleteModal';

const AdminBlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, loading: false });

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/blog/admin/${id}`);
      if (response.data.success) {
        setBlog(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog details');
      navigate('/admin/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModal({ isOpen: true, loading: false });
  };

  const handleDeleteConfirm = async () => {
    setDeleteModal(prev => ({ ...prev, loading: true }));
    try {
      await axios.delete(`/blog/admin/${id}`);
      toast.success('Blog post deleted successfully');
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog post');
      setDeleteModal(prev => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, loading: false });
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Blog post not found</h3>
        <Link to="/admin/blog" className="text-indigo-600 hover:text-indigo-500">
          Back to Blog Management
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/blog')}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blog Details</h1>
              <p className="text-gray-600">View and manage blog post</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to={`/admin/blog/edit/${blog._id}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
            <button
              onClick={handleDeleteClick}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {blog.featuredImage && (
            <div className="aspect-video w-full">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                {blog.status}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="w-4 h-4 mr-1" />
                {blog.views} views
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
            
            {blog.excerpt && (
              <p className="text-lg text-gray-600 mb-6">{blog.excerpt}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Author:</span>
                <span className="ml-2 font-medium">{blog.author?.fullname || 'Unknown'}</span>
              </div>
              
              {blog.category && (
                <div className="flex items-center">
                  <Tag className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Category:</span>
                  <span 
                    className="ml-2 px-2 py-1 text-xs font-semibold rounded-full text-white"
                    style={{ backgroundColor: blog.category.color }}
                  >
                    {blog.category.name}
                  </span>
                </div>
              )}
              
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Created:</span>
                <span className="ml-2">{formatDate(blog.createdAt)}</span>
              </div>
              
              {blog.publishedAt && (
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Published:</span>
                  <span className="ml-2">{formatDate(blog.publishedAt)}</span>
                </div>
              )}
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Content:</h3>
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        itemName={blog?.title}
        loading={deleteModal.loading}
      />
    </>
  );
};

export default AdminBlogDetails;