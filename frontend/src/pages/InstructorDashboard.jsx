import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, FileText, TrendingUp, LogOut, User, Plus, Calendar } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import BrandedLoader from '../components/BrandedLoader';

const InstructorDashboard = () => {
  const [instructor, setInstructor] = useState(null);
  const [classes, setClasses] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('instructorToken');
    if (!token) {
      window.location.href = '/instructor/login';
      return;
    }
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('instructorToken');
      const response = await axios.get('/instructors/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setClasses(response.data.data.classes);
        setStats(response.data.data.stats);
        const instructorData = JSON.parse(localStorage.getItem('instructorData'));
        setInstructor(instructorData);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      if (error.response?.status === 401) {
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
                <Users className="w-8 h-8 text-purple-600" />
                <span className="text-xl font-bold text-gray-900">Instructor Portal</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
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
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{instructor?.fullName}</span>
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
            Welcome back, {instructor?.fullName}!
          </h1>
          <p className="text-gray-600">
            Manage your classes and track student progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
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
              to="/admin/courses"
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
                to="/admin/courses"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create Class
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {classes.map((classItem) => (
                <div key={classItem._id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {classItem.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                    
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/instructor/classes/${classItem._id}`}
                        className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Manage Class
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