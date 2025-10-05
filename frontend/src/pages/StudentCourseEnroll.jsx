import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const StudentCourseEnroll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [formData, setFormData] = useState({
    experience: '',
    motivation: '',
    availability: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (!token) {
      navigate('/student/login');
      return;
    }
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`/courses/${id}`);
      if (response.data.success) {
        setCourse(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollment = async (e) => {
    e.preventDefault();
    setEnrolling(true);

    try {
      const studentData = JSON.parse(localStorage.getItem('studentData'));
      const token = localStorage.getItem('studentToken');

      const enrollmentData = {
        studentId: studentData.id,
        courseId: id,
        ...formData
      };

      const response = await axios.post('/enrollments', enrollmentData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success('Enrollment submitted successfully! Check your email for confirmation.');
        navigate('/student/dashboard');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit enrollment');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <button onClick={() => navigate('/courses')} className="text-indigo-600 hover:text-indigo-800">
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate(`/courses/${id}`)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course Details
        </button>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-center mb-6">
            <BookOpen className="w-8 h-8 text-indigo-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Enroll in Course</h1>
              <p className="text-gray-600">{course.title}</p>
            </div>
          </div>

          <form onSubmit={handleEnrollment} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programming Experience *
              </label>
              <select
                required
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select your level</option>
                <option value="None">No experience</option>
                <option value="Basic">Basic knowledge</option>
                <option value="Intermediate">Some experience</option>
                <option value="Advanced">Advanced level</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why do you want to take this course? *
              </label>
              <textarea
                required
                rows="4"
                value={formData.motivation}
                onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tell us about your goals and motivation..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Availability *
              </label>
              <input
                type="text"
                required
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Weekends, Evenings, 10-15 hours per week"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Course Information</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Price:</strong> ${course.price}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</p>
                <p><strong>Instructor:</strong> {course.instructor}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(`/courses/${id}`)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={enrolling}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {enrolling ? 'Submitting...' : 'Submit Enrollment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseEnroll;