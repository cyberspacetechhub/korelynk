import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, FileText, TrendingUp, LogOut, User, Plus, Calendar } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import DashboardSkeleton from '../components/skeletons/DashboardSkeleton';

const InstructorDashboard = () => {
  const [instructor, setInstructor] = useState(null);
  const [classes, setClasses] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('instructorToken');
    const instructorData = localStorage.getItem('instructorData');
    
    if (!token || !instructorData) {
      handleLogout();
      return;
    }
    
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('instructorToken');
      const instructorData = JSON.parse(localStorage.getItem('instructorData'));
      
      if (!token || !instructorData) {
        handleLogout();
        return;
      }
      
      // Check if token is valid by making a test request
      try {
        await axios.get('/classes/instructor', {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 3000
        });
      } catch (tokenError) {
        if (tokenError.response?.status === 401) {
          // Token is invalid, force re-login
          handleLogout();
          return;
        }
      }
      
      setInstructor(instructorData);
      
      // Fetch instructor classes and assignments with timeout and error handling
      try {
        const [classesRes, assignmentsRes] = await Promise.all([
          axios.get('/classes/instructor', {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 8000
          }),
          axios.get('/assignments/instructor', {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 8000
          })
        ]);
        
        if (classesRes.data.success) {
          const classesData = classesRes.data.data || [];
          setClasses(classesData);
          
          // Calculate stats from classes data
          const totalStudents = classesData.reduce((sum, cls) => sum + (cls.students?.length || 0), 0);
          
          // Get assignments data
          const assignmentsData = assignmentsRes.data.success ? assignmentsRes.data.data || [] : [];
          const totalSubmissions = assignmentsData.reduce((sum, assignment) => sum + (assignment.submissions?.length || 0), 0);
          
          setStats({
            totalClasses: classesData.length,
            totalStudents: totalStudents,
            totalAssignments: assignmentsData.length,
            totalSubmissions: totalSubmissions
          });
        }
      } catch (classError) {
        console.error('Error fetching dashboard data:', classError);
        // Continue with empty data instead of failing
        setClasses([]);
        setStats({ totalClasses: 0, totalStudents: 0, totalAssignments: 0, totalSubmissions: 0 });
      }
      
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      if (error.response?.status === 401 || error.code === 'ECONNABORTED') {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('instructorToken');
    localStorage.removeItem('instructorData');
    window.location.href = '/instructor/login';
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
                <Users className="w-8 h-8 text-purple-600" />
                <span className="text-xl font-bold text-gray-900 hidden sm:block">Instructor Portal</span>
                <span className="text-lg font-bold text-gray-900 sm:hidden">Instructor</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/instructor/classes"
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <Calendar className="w-4 h-4 mr-1" />
                My Classes
              </Link>
              <Link
                to="/instructor/assignments"
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <FileText className="w-4 h-4 mr-1" />
                Assignments
              </Link>
              <Link
                to="/instructor/profile"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{instructor?.fullName}</span>
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
              <span className="text-gray-700 text-sm truncate max-w-24">{instructor?.fullName?.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/instructor/dashboard"
            className="flex flex-col items-center justify-center text-purple-600 bg-purple-50"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link
            to="/instructor/classes"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-800"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Classes</span>
          </Link>
          <Link
            to="/instructor/assignments"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-800"
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs mt-1">Assignments</span>
          </Link>
          <Link
            to="/instructor/profile"
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
            Welcome back, {instructor?.fullName}!
          </h1>
          <p className="text-gray-600">
            Manage your classes and track student progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalClasses || 0}
                </div>
                <div className="text-gray-600">Total Classes</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalStudents || 0}
                </div>
                <div className="text-gray-600">Total Students</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalAssignments || 0}
                </div>
                <div className="text-gray-600">Assignments</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalSubmissions || 0}
                </div>
                <div className="text-gray-600">Submissions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Classes */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">My Classes</h2>
            <Link
              to="/instructor/classes/new"
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Class
            </Link>
          </div>
          
          {classes.length === 0 ? (
            <div className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No classes yet</h3>
              <p className="text-gray-600 mb-4">Create your first class to start teaching.</p>
              <Link
                to="/instructor/classes/new"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create Class
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {classes.map((classItem) => (
                <div key={classItem._id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 mb-4 sm:mb-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {classItem.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {classItem.students?.length || 0} students
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {classItem.course?.category}
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          Code: {classItem.code}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mt-3 sm:mt-0">
                      <Link
                        to={`/instructor/classes/${classItem._id}`}
                        className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm w-full sm:w-auto justify-center"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Manage Class</span>
                        <span className="sm:hidden">Manage</span>
                      </Link>
                      <Link
                        to={`/instructor/assignments/new?classId=${classItem._id}`}
                        className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm w-full sm:w-auto justify-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Add Assignment</span>
                        <span className="sm:hidden">Assignment</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;