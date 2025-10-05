import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Video, FileText, LogOut, User } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import BrandedLoader from '../components/BrandedLoader';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (!token) {
      window.location.href = '/student/login';
      return;
    }
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
        setEnrolledCourses(response.data.data.enrolledCourses || []);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentData');
    window.location.href = '/student/login';
  };

  if (loading) {
    return <BrandedLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">Learning Portal</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/student/classes"
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <Calendar className="w-4 h-4 mr-1" />
                My Classes
              </Link>
              <Link
                to="/student/assignments"
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <FileText className="w-4 h-4 mr-1" />
                Assignments
              </Link>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{student?.fullName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {student?.fullName}!
          </h1>
          <p className="text-gray-600">
            Continue your learning journey with your enrolled courses.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.length}
                </div>
                <div className="text-gray-600">Enrolled Courses</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.filter(c => c.status === 'active').length}
                </div>
                <div className="text-gray-600">Active Courses</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.filter(c => c.status === 'completed').length}
                </div>
                <div className="text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
          </div>
          
          {enrolledCourses.length === 0 ? (
            <div className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled</h3>
              <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course.</p>
              <Link
                to="/courses"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {enrolledCourses.map((enrollment) => (
                <div key={enrollment._id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {enrollment.course?.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Status: {enrollment.status}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {enrollment.course?.meetingLink && (
                        <a
                          href={enrollment.course.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Join Meeting
                        </a>
                      )}
                      
                      <Link
                        to={`/student/courses/${enrollment.course?._id}`}
                        className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Course
                      </Link>
                    </div>
                  </div>
                  
                  {enrollment.course?.meetingSchedule && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center text-blue-800">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Schedule: {enrollment.course.meetingSchedule}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;