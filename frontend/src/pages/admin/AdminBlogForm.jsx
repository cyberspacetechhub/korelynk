import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Upload, ArrowLeft } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    featuredImage: '',
    status: 'draft'
  });

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchBlog();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/blog/admin/${id}`);
      if (response.data.success) {
        const blog = response.data.data;
        setForm({
          title: blog.title,
          content: blog.content,
          excerpt: blog.excerpt || '',
          category: blog.category?._id || '',
          tags: blog.tags?.join(', ') || '',
          featuredImage: blog.featuredImage || '',
          status: blog.status
        });
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUploading(true);
      try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await axios.post('/admin/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response.data.success) {
          setForm(prev => ({ ...prev, featuredImage: response.data.data.url }));
          toast.success('Image uploaded successfully');
        }
      } catch (error) {
        console.error('Image upload error:', error);
        toast.error('Failed to upload image');
      } finally {
        setImageUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const blogData = {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (isEdit) {
        await axios.put(`/blog/admin/${id}`, blogData);
        toast.success('Blog post updated successfully');
      } else {
        await axios.post('/blog/admin', blogData);
        toast.success('Blog post created successfully');
      }
      
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/admin/blog')}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              <p className="text-gray-600">
                {isEdit ? 'Update your blog post' : 'Write and publish a new blog post'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({...form, title: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                    <textarea
                      value={form.excerpt}
                      onChange={(e) => setForm({...form, excerpt: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-20"
                      placeholder="Brief description of the post..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      value={form.content}
                      onChange={(e) => setForm({...form, content: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-96"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Publish</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({...form, status: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')} Post
                  </button>
                </div>
              </div>

              {/* Category */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category</h3>
                <select
                  value={form.category}
                  onChange={(e) => setForm({...form, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.tags.split(',').filter(tag => tag.trim()).map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center">
                      {tag.trim()}
                      <button
                        type="button"
                        onClick={() => {
                          const newTags = form.tags.split(',').filter((t, i) => i !== index).join(', ');
                          setForm({ ...form, tags: newTags });
                        }}
                        className="ml-2 text-indigo-600 hover:text-indigo-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({...form, tags: e.target.value})}
                  onPaste={(e) => {
                    e.preventDefault();
                    const paste = e.clipboardData.getData('text');
                    const items = paste.split(/[\n,;]/).map(item => item.trim()).filter(item => item);
                    const existingTags = form.tags ? form.tags.split(',').map(t => t.trim()).filter(t => t) : [];
                    const allTags = [...existingTags, ...items];
                    setForm({...form, tags: allTags.join(', ')});
                  }}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Type tags separated by commas"
                />
              </div>

              {/* Featured Image */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h3>
                <div className="space-y-4">
                  {form.featuredImage && (
                    <img
                      src={form.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {imageUploading ? (
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
                        <p className="text-sm text-gray-600">Uploading...</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload featured image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogForm;