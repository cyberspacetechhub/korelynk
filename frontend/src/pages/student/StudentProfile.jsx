import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Edit3, Save, X, GraduationCap, Target } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferences: {
      interests: [],
      skillLevel: 'Beginner',
      learningGoals: [],
      preferredSchedule: 'Flexible'
    }
  });

  const skillOptions = ['Web Development', 'Mobile Development', 'Backend Development', 'Database', 'DevOps', 'UI/UX Design'];
  const goalOptions = ['Career Change', 'Skill Enhancement', 'Personal Growth', 'Certification', 'Freelancing'];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('studentToken');
      const response = await axios.get('/students/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setStudent(response.data.data);
        setFormData({
          fullName: response.data.data.fullName || '',
          email: response.data.data.email || '',
          phone: response.data.data.phone || '',
          preferences: {
            interests: response.data.data.preferences?.interests || [],
            skillLevel: response.data.data.preferences?.skillLevel || 'Beginner',
            learningGoals: response.data.data.preferences?.learningGoals || [],
            preferredSchedule: response.data.data.preferences?.preferredSchedule || 'Flexible'
          }
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
      const token = localStorage.getItem('studentToken');
      const response = await axios.put('/students/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setStudent(response.data.data);
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

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        interests: prev.preferences.interests.includes(interest)
          ? prev.preferences.interests.filter(i => i !== interest)
          : [...prev.preferences.interests, interest]
      }
    }));
  };

  const toggleGoal = (goal) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        learningGoals: prev.preferences.learningGoals.includes(goal)
          ? prev.preferences.learningGoals.filter(g => g !== goal)
          : [...prev.preferences.learningGoals, goal]
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{student?.fullName}</h1>
                <p className="text-indigo-100">Student</p>
              </div>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{student?.fullName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="flex items-center space-x-2 text-gray-900">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{student?.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {editing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{student?.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                {editing ? (
                  <select
                    value={formData.preferences.skillLevel}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {...formData.preferences, skillLevel: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                ) : (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    {student?.preferences?.skillLevel || 'Beginner'}
                  </span>
                )}
              </div>
            </div>

            {/* Learning Preferences */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Preferences</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
                {editing ? (
                  <div className="grid grid-cols-2 gap-2">
                    {skillOptions.map(skill => (
                      <label key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.preferences.interests.includes(skill)}
                          onChange={() => toggleInterest(skill)}
                          className="mr-2 text-indigo-600"
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {student?.preferences?.interests?.length > 0 ? (
                      student.preferences.interests.map((interest, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No interests selected</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Goals</label>
                {editing ? (
                  <div className="grid grid-cols-2 gap-2">
                    {goalOptions.map(goal => (
                      <label key={goal} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.preferences.learningGoals.includes(goal)}
                          onChange={() => toggleGoal(goal)}
                          className="mr-2 text-indigo-600"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {student?.preferences?.learningGoals?.length > 0 ? (
                      student.preferences.learningGoals.map((goal, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          <Target className="w-3 h-3 inline mr-1" />
                          {goal}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No goals selected</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Schedule</label>
                {editing ? (
                  <select
                    value={formData.preferences.preferredSchedule}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {...formData.preferences, preferredSchedule: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Flexible">Flexible</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                    <option value="Evenings">Evenings</option>
                  </select>
                ) : (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {student?.preferences?.preferredSchedule || 'Flexible'}
                  </span>
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
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center space-x-2"
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

export default StudentProfile;