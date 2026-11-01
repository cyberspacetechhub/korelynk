import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, RefreshCw, ExternalLink, GitBranch, Camera } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import DeleteModal from '../../components/admin/DeleteModal';
import BrandedPlaceholder from '../../components/BrandedPlaceholder';

const TECHNOLOGIES = [
  'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte',
  'Node.js', 'Express.js', 'Python', 'Django', 'Flask', 'FastAPI',
  'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'SASS',
  'MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Supabase', 'Redis',
  'AWS', 'Azure', 'Google Cloud', 'Vercel', 'Netlify', 'Docker', 'Kubernetes',
  'Git', 'GitHub', 'GitLab', 'Figma', 'Adobe XD', 'Photoshop',
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic',
  'GraphQL', 'REST API', 'Socket.io', 'WebRTC', 'PWA',
  'Stripe', 'PayPal', 'Shopify', 'WooCommerce', 'Magento',
];

const STATUS_BADGE = {
  pending:    'bg-gray-100 text-gray-500',
  generating: 'bg-blue-100 text-blue-600 animate-pulse',
  ready:      'bg-green-100 text-green-700',
  failed:     'bg-red-100 text-red-600',
};

const EMPTY_FORM = {
  title: '', category: 'web', description: '',
  technologies: [], liveUrl: '', githubUrl: '', featured: false,
};

const AdminProjects = () => {
  const [projects, setProjects]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [showForm, setShowForm]         = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [imageFile, setImageFile]       = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting]     = useState(false);
  const [regenerating, setRegenerating] = useState({});
  const [deleteModal, setDeleteModal]   = useState({ isOpen: false, project: null, loading: false });

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('/projects');
      if (data.success) setProjects(data.data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'technologies') v.forEach(t => fd.append('technologies[]', t));
        else fd.append(k, v);
      });
      if (imageFile) fd.append('image', imageFile);

      if (editingProject) {
        await axios.put(`/projects/${editingProject._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Project updated');
      } else {
        await axios.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Project created — thumbnail will generate automatically if a Live URL was provided');
      }
      resetForm();
      fetchProjects();
    } catch {
      toast.error('Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegenerate = async (project) => {
    setRegenerating(prev => ({ ...prev, [project._id]: true }));
    try {
      await axios.post(`/projects/${project._id}/regenerate-thumbnail`);
      toast.success('Thumbnail regeneration queued');
      // Optimistically update status
      setProjects(prev => prev.map(p =>
        p._id === project._id ? { ...p, thumbnail: { ...p.thumbnail, status: 'pending' } } : p
      ));
      // Poll for completion
      pollStatus(project._id);
    } catch {
      toast.error('Failed to queue regeneration');
    } finally {
      setRegenerating(prev => ({ ...prev, [project._id]: false }));
    }
  };

  const pollStatus = (id, attempts = 0) => {
    if (attempts > 20) return; // max ~40s
    setTimeout(async () => {
      try {
        const { data } = await axios.get(`/projects/${id}`);
        if (data.success) {
          const status = data.data.thumbnail?.status;
          setProjects(prev => prev.map(p => p._id === id ? data.data : p));
          if (status === 'generating' || status === 'pending') {
            pollStatus(id, attempts + 1);
          }
        }
      } catch { /* silent */ }
    }, 2000);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingProject(null);
    setImageFile(null);
    setImagePreview('');
    setForm(EMPTY_FORM);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      technologies: project.technologies || [],
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
    });
    setImagePreview(project.resolvedImage || project.image || '');
    setImageFile(null);
    setShowForm(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteModal(prev => ({ ...prev, loading: true }));
    try {
      await axios.delete(`/projects/${deleteModal.project._id}`);
      toast.success('Project deleted');
      setDeleteModal({ isOpen: false, project: null, loading: false });
      fetchProjects();
    } catch {
      toast.error('Failed to delete project');
      setDeleteModal(prev => ({ ...prev, loading: false }));
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-200" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const thumbStatus = project.thumbnail?.status;
          const resolvedImg = project.resolvedImage || project.image;

          return (
            <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-100 overflow-hidden group">
                {resolvedImg ? (
                  <img
                    src={resolvedImg}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <BrandedPlaceholder title={project.title} subtitle={project.category} className="h-48" />
                )}

                {/* Status overlay */}
                {(thumbStatus === 'generating' || thumbStatus === 'pending') && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-xs text-white bg-black/60 px-3 py-1.5 rounded-full animate-pulse flex items-center gap-1.5">
                      <Camera className="w-3 h-3" />
                      {thumbStatus === 'generating' ? 'Capturing screenshot…' : 'Screenshot queued'}
                    </span>
                  </div>
                )}

                {/* Status badge */}
                {thumbStatus && (
                  <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[thumbStatus]}`}>
                    {thumbStatus}
                  </span>
                )}

                {/* Regenerate button */}
                {project.liveUrl && (
                  <button
                    onClick={() => handleRegenerate(project)}
                    disabled={regenerating[project._id] || thumbStatus === 'generating'}
                    title="Regenerate screenshot"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 p-1.5 rounded-full shadow disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${regenerating[project._id] ? 'animate-spin' : ''}`} />
                  </button>
                )}
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{project.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs ${project.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                    {project.featured ? 'Featured' : 'Regular'}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-1 capitalize">{project.category}</p>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{project.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-gray-400">+{project.technologies.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700">
                        <GitBranch className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(project)} className="text-blue-600 hover:text-blue-800">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteModal({ isOpen: true, project, loading: false })} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text" placeholder="Project Title" required
                    value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <select
                    value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Apps</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="saas">SaaS Platforms</option>
                  </select>
                </div>

                <textarea
                  placeholder="Project Description" required
                  value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg h-24 text-sm"
                />

                {/* Image upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Image <span className="text-gray-400 font-normal">(optional — auto-screenshot used if Live URL is set)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                    {imagePreview ? (
                      <div className="flex items-center gap-4">
                        <img src={imagePreview} alt="Preview" className="w-24 h-16 object-cover rounded" />
                        <button type="button" onClick={() => { setImagePreview(''); setImageFile(null); }}
                          className="text-red-500 text-sm hover:text-red-700">Remove</button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                        <p className="text-xs text-gray-400">Upload a custom image</p>
                      </div>
                    )}
                    <input
                      type="file" accept="image/*" onChange={handleImageChange}
                      className="mt-2 w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies <span className="text-gray-400 font-normal">({form.technologies.length} selected)</span>
                  </label>
                  <div className="border rounded-lg p-3 max-h-36 overflow-y-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {TECHNOLOGIES.map(tech => {
                        const selected = form.technologies.includes(tech);
                        return (
                          <button key={tech} type="button"
                            onClick={() => setForm({ ...form, technologies: selected ? form.technologies.filter(t => t !== tech) : [...form.technologies, tech] })}
                            className={`px-2.5 py-1 rounded-full text-xs transition-colors ${selected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                          >
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="url" placeholder="Live URL (used for auto-screenshot)"
                    value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <input
                    type="url" placeholder="GitHub URL"
                    value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                  Featured Project
                </label>

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={submitting}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60 text-sm">
                    {submitting ? 'Saving…' : editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                  <button type="button" onClick={resetForm}
                    className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, project: null, loading: false })}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        itemName={deleteModal.project?.title}
        loading={deleteModal.loading}
      />
    </div>
  );
};

export default AdminProjects;
