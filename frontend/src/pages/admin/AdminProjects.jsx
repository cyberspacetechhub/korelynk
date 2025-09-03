import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Image } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState({
    title: '',
    category: 'web',
    description: '',
    image: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    featured: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/admin/projects');
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        title: form.title,
        category: form.category,
        description: form.description,
        image: form.image,
        technologies: form.technologies.split(',').map(t => t.trim()),
        liveUrl: form.liveUrl,
        githubUrl: form.githubUrl,
        featured: form.featured
      };

      if (editingProject) {
        await axios.put(`/admin/projects/${editingProject._id}`, projectData);
        toast.success('Project updated successfully');
      } else {
        await axios.post('/admin/projects', projectData);
        toast.success('Project created successfully');
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingProject(null);
    setImageFile(null);
    setImagePreview('');
    setImageUploading(false);
    setForm({
      title: '',
      category: 'web',
      description: '',
      image: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      featured: false
    });
  };

  const handleImageChange = async (e) => {
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
          const imageUrl = response.data.data.url;
          setForm(prev => ({ ...prev, image: imageUrl }));
          setImagePreview(imageUrl);
          setImageFile(null);
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

  const handleEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      featured: project.featured
    });
    setImagePreview(project.image);
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/admin/projects/${projectId}`);
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <p className="text-gray-600">Manage your portfolio projects</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${project.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                    {project.featured ? 'Featured' : 'Regular'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{project.category}</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 2).map((tech, idx) => (
                      <span key={idx} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="text-xs text-gray-500">+{project.technologies.length - 2}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={form.title}
                    onChange={(e) => setForm({...form, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                  <select
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Apps</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="saas">SaaS Platforms</option>
                  </select>
                </div>
                <textarea
                  placeholder="Project Description"
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg h-24"
                  required
                />
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {imageUploading ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">Uploading image...</p>
                      </div>
                    ) : imagePreview ? (
                      <div className="text-center">
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mx-auto mb-2 rounded" />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('');
                            setImageFile(null);
                            setForm({...form, image: ''});
                          }}
                          className="text-red-600 text-sm hover:text-red-800"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload image or enter URL</p>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={imageUploading}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-50"
                      />
                      <div className="text-center text-gray-500 text-sm">or</div>
                      <input
                        type="url"
                        placeholder="Enter image URL"
                        value={form.image}
                        onChange={(e) => {
                          setForm({...form, image: e.target.value});
                          if (e.target.value) {
                            setImagePreview(e.target.value);
                            setImageFile(null);
                          }
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Technologies (comma separated)"
                  value={form.technologies}
                  onChange={(e) => setForm({...form, technologies: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="url"
                    placeholder="Live URL"
                    value={form.liveUrl}
                    onChange={(e) => setForm({...form, liveUrl: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={form.githubUrl}
                    onChange={(e) => setForm({...form, githubUrl: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({...form, featured: e.target.checked})}
                    className="mr-2"
                  />
                  Featured Project
                </label>
                <div className="flex gap-4">
                  <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    {editingProject ? 'Update' : 'Create'} Project
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;