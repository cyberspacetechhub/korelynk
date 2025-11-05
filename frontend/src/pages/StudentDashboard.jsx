import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Video, FileText, LogOut, User, ArrowRight, Play } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import DashboardSkeleton from '../components/skeletons/DashboardSkeleton';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
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
      const studentData = JSON.parse(localStorage.getItem('studentData'));
      
      // Fetch student profile first
      const profileRes = await axios.get('/students/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (profileRes.data.success) {
        setStudent(profileRes.data.data);
        
        // Now fetch enrollments and courses with the correct student ID
        const [enrollmentsRes, coursesRes] = await Promise.all([
          axios.get(`/enrollments/student/${profileRes.data.data._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/courses')
        ]);
        
        if (enrollmentsRes.data.success) {
          setEnrolledCourses(enrollmentsRes.data.data || []);
        }
        
        if (coursesRes.data.success) {
          const allCourses = coursesRes.data.data;
          const studentPrefs = profileRes.data.data.preferences;
          
          // Filter courses based on student preferences
          let filtered = allCourses;
          if (studentPrefs?.interests?.length > 0) {
            filtered = filtered.filter(course => 
              studentPrefs.interests.some(interest => 
                course.category?.toLowerCase().includes(interest.toLowerCase()) ||
                course.skills?.some(skill => skill.toLowerCase().includes(interest.toLowerCase()))
              )
            );
          }
          
          // Filter by skill level if set
          if (studentPrefs?.skillLevel && studentPrefs.skillLevel !== 'Any') {
            filtered = filtered.filter(course => course.level === studentPrefs.skillLevel);
          }
          
          // Exclude already enrolled courses
          const enrolledCourseIds = enrollmentsRes.data.data?.map(e => e.course?._id) || [];
          filtered = filtered.filter(course => !enrolledCourseIds.includes(course._id));
          
          setRecommendedCourses(filtered.slice(0, 4));
        }
      }
      

    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
      // Set student data from localStorage as fallback
      const studentData = JSON.parse(localStorage.getItem('studentData'));
      if (studentData) {
        setStudent(studentData);
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
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex items-center space-x-4">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
          <DashboardSkeleton />
        </div>
      </div>
    );
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
                <span className="text-xl font-bold text-gray-900 hidden sm:block">Learning Portal</span>
                <span className="text-lg font-bold text-gray-900 sm:hidden">Portal</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
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
              <Link
                to="/student/profile"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{student?.fullName}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
            
            {/* Mobile User Info */}
            <div className="md:hidden flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700 text-sm truncate max-w-24">{student?.fullName?.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/student/dashboard"
            className="flex flex-col items-center justify-center text-indigo-600 bg-indigo-50"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link
            to="/student/classes"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-800"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Classes</span>
          </Link>
          <Link
            to="/student/assignments"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-800"
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs mt-1">Assignments</span>
          </Link>
          <Link
            to="/student/profile"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-800"
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-800"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs mt-1">Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
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
                  {enrolledCourses.filter(c => c.status === 'approved').length}
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

        {/* Recommended Courses */}
        {recommendedCourses.length > 0 && (
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
              <Link
                to="/courses"
                className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm"
              >
                Browse All Courses
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendedCourses.map((course) => (
                  <div key={course._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-32 relative">
                      {course.featuredImage ? (
                        <img 
                          src={course.featuredImage} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                      )}
                      
                      {course.introVideo && (
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full flex items-center">
                            <Play className="w-3 h-3 mr-1" fill="currentColor" />
                            Video
                          </span>
                        </div>
                      )}
                      
                      <div className="absolute bottom-2 left-2">
                        <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                          {course.level}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">{course.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-indigo-600">
                          ₦{course.price?.toLocaleString()}
                        </span>
                        <Link
                          to={`/courses/${course._id}`}
                          className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
              <div className="flex gap-3 justify-center">
                <Link
                  to="/courses"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Browse All Courses
                </Link>
                {recommendedCourses.length > 0 && (
                  <Link
                    to={`/courses/${recommendedCourses[0]._id}`}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    View Recommended
                  </Link>
                )}
              </div>
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
                          Enrolled: {new Date(enrollment.enrollmentDate || enrollment.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Status: <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                            enrollment.status === 'approved' ? 'bg-green-100 text-green-800' :
                            enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            enrollment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>{enrollment.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {enrollment.course?.meetingLink && enrollment.status === 'approved' && (
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
                        to={`/courses/${enrollment.course?._id}`}
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