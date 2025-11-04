import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminCourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({ image: false, video: false });
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    duration: '',
    price: '',
    instructor: '',
    image: '',
    featuredImage: '',
    introVideo: '',
    skills: [''],
    maxStudents: 50,
    startDate: '',
    endDate: '',
    meetingLink: '',
    meetingSchedule: '',
    prerequisites: [''],
    learningOutcomes: [''],
    curriculum: [{ week: 1, title: '', topics: [''] }],
    featured: false
  });

  useEffect(() => {
    fetchInstructors();
    if (isEdit) {
      fetchCourse();
    }
  }, [id, isEdit]);

  const fetchInstructors = async () => {
    try {
      const response = await axios.get('/courses/admin/instructors');
      if (response.data.success) {
        setInstructors(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`/courses/${id}`);
      if (response.data.success) {
        const course = response.data.data;
        setFormData({
          ...course,
          instructor: course.instructor?._id || course.instructor,
          startDate: new Date(course.startDate).toISOString().split('T')[0],
          endDate: new Date(course.endDate).toISOString().split('T')[0],
          prerequisites: course.prerequisites?.length ? course.prerequisites : [''],
          learningOutcomes: course.learningOutcomes?.length ? course.learningOutcomes : [''],
          curriculum: course.curriculum?.length ? course.curriculum : [{ week: 1, title: '', topics: [''] }]
        });
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error('Failed to fetch course details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const courseData = {
        ...formData,
        prerequisites: formData.prerequisites.filter(p => p.trim()),
        learningOutcomes: formData.learningOutcomes.filter(o => o.trim()),
        curriculum: formData.curriculum.filter(c => c.title.trim())
      };

      if (isEdit) {
        await axios.put(`/courses/${id}`, courseData);
        toast.success('Course updated successfully');
      } else {
        await axios.post('/courses', courseData);
        toast.success('Course created successfully');
      }
      
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error('Failed to save course');
    } finally {
      setLoading(false);
    }
  };

  const addArrayItem = (field, defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, image: true }));
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await axios.post('/courses/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setFormData(prev => ({ ...prev, featuredImage: response.data.data.url }));
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(prev => ({ ...prev, image: false }));
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, video: true }));
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await axios.post('/courses/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setFormData(prev => ({ ...prev, introVideo: response.data.data.url }));
      }
    } catch (error) {
      console.error('Video upload error:', error);
      toast.error('Failed to upload video');
    } finally {
      setUploading(prev => ({ ...prev, video: false }));
    }
  };

  const categories = ['Web Development', 'Mobile Development', 'Backend Development', 'Database', 'DevOps', 'UI/UX Design'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/courses')}
          className="mr-4 p-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Course' : 'Add New Course'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor *
              </label>
              <select
                required
                value={formData.instructor}
                onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Instructor</option>
                {instructors.map(instructor => (
                  <option key={instructor._id} value={instructor._id}>
                    {instructor.fullName} - {instructor.expertise?.slice(0, 2).join(', ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level *
              </label>
              <select
                required
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Level</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 8 weeks"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Students
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxStudents}
                onChange={(e) => setFormData({...formData, maxStudents: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Media Uploads */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {uploading.image && <p className="text-sm text-indigo-600">Uploading...</p>}
                {formData.featuredImage && (
                  <div className="relative">
                    <img src={formData.featuredImage} alt="Featured" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, featuredImage: ''})}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intro Video (Optional)
              </label>
              <div className="space-y-3">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {uploading.video && <p className="text-sm text-indigo-600">Uploading...</p>}
                {formData.introVideo && (
                  <div className="relative">
                    <video src={formData.introVideo} className="w-full h-32 object-cover rounded-lg" controls />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, introVideo: ''})}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Link
              </label>
              <input
                type="url"
                placeholder="https://zoom.us/j/..."
                value={formData.meetingLink}
                onChange={(e) => setFormData({...formData, meetingLink: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Schedule
              </label>
              <input
                type="text"
                placeholder="e.g., Mondays & Wednesdays 7-9 PM"
                value={formData.meetingSchedule}
                onChange={(e) => setFormData({...formData, meetingSchedule: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills Taught
            </label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateArrayItem('skills', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter skill"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('skills', index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('skills')}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Skill
            </button>
          </div>

          {/* Prerequisites */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prerequisites
            </label>
            {formData.prerequisites.map((prereq, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={prereq}
                  onChange={(e) => updateArrayItem('prerequisites', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter prerequisite"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('prerequisites', index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('prerequisites')}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Prerequisite
            </button>
          </div>

          {/* Learning Outcomes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Learning Outcomes
            </label>
            {formData.learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) => updateArrayItem('learningOutcomes', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter learning outcome"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('learningOutcomes', index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('learningOutcomes')}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Learning Outcome
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
              Featured Course
            </label>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/admin/courses')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : (isEdit ? 'Update Course' : 'Create Course')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCourseForm;