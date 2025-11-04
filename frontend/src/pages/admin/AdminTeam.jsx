import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, User } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

import DeleteModal from '../../components/admin/DeleteModal';

const AdminTeam = () => {
  const availableSkills = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'Python', 'Django', 'Flask',
    'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'SASS',
    'MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'AWS', 'Azure', 'Docker', 'Kubernetes',
    'Git', 'GitHub', 'GitLab', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator',
    'UI/UX Design', 'Graphic Design', 'Web Design', 'Mobile Design', 'Prototyping',
    'User Research', 'Wireframing', 'Testing', 'DevOps', 'CI/CD', 'Linux', 'Windows'
  ];

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    role: '',
    bio: '',
    avatar: '',
    skills: [],
    social: {
      linkedin: '',
      github: '',
      twitter: '',
      dribbble: '',
      behance: ''
    },
    order: 0
  });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, member: null, loading: false });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('/admin/team');
      if (response.data.success) {
        setTeamMembers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      // Mockup data fallback
      setTeamMembers([
        {
          _id: '1',
          name: 'Alex Thompson',
          role: 'Full Stack Developer & Founder',
          bio: 'Passionate about creating innovative digital solutions with 5+ years of experience.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
          skills: ['React', 'Node.js', 'Python', 'AWS'],
          social: { linkedin: '#', github: '#', twitter: '#' },
          order: 1
        },
        {
          _id: '2',
          name: 'Sarah Mitchell',
          role: 'UI/UX Designer',
          bio: 'Creative designer focused on user-centered design and beautiful interfaces.',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
          skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
          social: { linkedin: '#', dribbble: '#', behance: '#' },
          order: 2
        }
      ]);
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
          setForm(prev => ({ ...prev, avatar: response.data.data.url }));
          toast.success('Avatar uploaded successfully');
        }
      } catch (error) {
        console.error('Avatar upload error:', error);
        toast.error('Failed to upload avatar');
      } finally {
        setImageUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const memberData = {
        ...form,
        skills: form.skills
      };

      if (editingMember) {
        await axios.put(`/admin/team/${editingMember._id}`, memberData);
        toast.success('Team member updated successfully');
      } else {
        await axios.post('/admin/team', memberData);
        toast.success('Team member added successfully');
      }

      resetForm();
      fetchTeamMembers();
    } catch (error) {
      console.error('Error saving team member:', error);
      toast.error('Failed to save team member');
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio,
      avatar: member.avatar,
      skills: member.skills || [],
      social: member.social,
      order: member.order
    });
    setShowForm(true);
  };

  const handleDeleteClick = (member) => {
    setDeleteModal({ isOpen: true, member, loading: false });
  };

  const handleDeleteConfirm = async () => {
    setDeleteModal(prev => ({ ...prev, loading: true }));
    try {
      await axios.delete(`/admin/team/${deleteModal.member._id}`);
      toast.success('Team member deleted successfully');
      setDeleteModal({ isOpen: false, member: null, loading: false });
      fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast.error('Failed to delete team member');
      setDeleteModal(prev => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, member: null, loading: false });
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingMember(null);
    setImageUploading(false);
    setForm({
      name: '',
      role: '',
      bio: '',
      avatar: '',
      skills: [],
      social: {
        linkedin: '',
        github: '',
        twitter: '',
        dribbble: '',
        behance: ''
      },
      order: 0
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
          </div>
          <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mx-auto"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex flex-wrap gap-1 mb-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
            <p className="text-gray-600">Manage your team members</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-indigo-600">{member.role}</p>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{member.bio}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {member.skills.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                    {skill}
                  </span>
                ))}
                {member.skills.length > 3 && (
                  <span className="text-xs text-gray-500">+{member.skills.length - 3}</span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Order: {member.order}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(member)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Member Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Avatar Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {imageUploading ? (
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
                        <p className="text-sm text-gray-600">Uploading avatar...</p>
                      </div>
                    ) : form.avatar ? (
                      <div>
                        <img src={form.avatar} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-2 object-cover" />
                        <button
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, avatar: '' }))}
                          className="text-red-600 text-sm hover:text-red-800"
                        >
                          Remove Avatar
                        </button>
                      </div>
                    ) : (
                      <>
                        <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload avatar</p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Role/Position"
                    value={form.role}
                    onChange={(e) => setForm({...form, role: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>

                <textarea
                  placeholder="Bio/Description"
                  value={form.bio}
                  onChange={(e) => setForm({...form, bio: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg h-24"
                  required
                />

                {/* Skills Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
                    <div className="flex flex-wrap gap-2">
                      {availableSkills.map((skill) => {
                        const isSelected = form.skills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setForm({...form, skills: form.skills.filter(s => s !== skill)});
                              } else {
                                setForm({...form, skills: [...form.skills, skill]});
                              }
                            }}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Click skills to select/deselect. Selected: {form.skills.length}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    value={form.social.linkedin}
                    onChange={(e) => setForm({...form, social: {...form.social, linkedin: e.target.value}})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={form.social.github}
                    onChange={(e) => setForm({...form, social: {...form.social, github: e.target.value}})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    placeholder="Display order (lower numbers appear first)"
                    value={form.order}
                    onChange={(e) => setForm({...form, order: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Lower numbers appear first (e.g., 1, 2, 3...)</p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    {editingMember ? 'Update' : 'Add'} Team Member
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
      
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        itemName={deleteModal.member?.name}
        loading={deleteModal.loading}
      />
    </div>
  );
};

export default AdminTeam;