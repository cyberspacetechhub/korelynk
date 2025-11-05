import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Edit3, Save, X, Camera } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const InstructorProfile = () => {
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    expertise: []
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('instructorToken');
      const response = await axios.get('/instructors/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setInstructor(response.data.data);
        setFormData({
          fullName: response.data.data.fullName || '',
          email: response.data.data.email || '',
          phone: response.data.data.phone || '',
          bio: response.data.data.bio || '',
          expertise: response.data.data.expertise || []
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('instructorToken');
      const response = await axios.put('/instructors/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setInstructor(response.data.data);
        setEditing(false);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const addExpertise = () => {
    setFormData(prev => ({
      ...prev,
      expertise: [...prev.expertise, '']
    }));
  };

  const updateExpertise = (index, value) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.map((item, i) => i === index ? value : item)
    }));
  };

  const removeExpertise = (index) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-b-2 border-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-purple-600" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{instructor?.fullName}</h1>
                <p className="text-purple-100">Instructor</p>
              </div>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center space-x-2"
            >
              {editing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{editing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{instructor?.fullName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="flex items-center space-x-2 text-gray-900">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{instructor?.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {editing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{instructor?.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bio and Expertise */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {editing ? (
                  <textarea
                    rows="4"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {instructor?.bio || 'No bio provided'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
                {editing ? (
                  <div className="space-y-2">
                    {formData.expertise.map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => updateExpertise(index, e.target.value)}
                          onPaste={(e) => {
                            e.preventDefault();
                            const paste = e.clipboardData.getData('text');
                            const items = paste.split(/[\n,;]/).map(item => item.trim()).filter(item => item);
                            if (items.length > 1) {
                              const newExpertise = [...formData.expertise];
                              newExpertise[index] = items[0];
                              items.slice(1).forEach(item => newExpertise.push(item));
                              setFormData({...formData, expertise: newExpertise});
                            } else {
                              updateExpertise(index, paste.trim());
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter expertise"
                        />
                        <button
                          onClick={() => removeExpertise(index)}
                          className="p-2 text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addExpertise}
                      className="text-purple-600 hover:text-purple-800 text-sm"
                    >
                      + Add Expertise
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {instructor?.expertise?.length > 0 ? (
                      instructor.expertise.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No expertise listed</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          {editing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;