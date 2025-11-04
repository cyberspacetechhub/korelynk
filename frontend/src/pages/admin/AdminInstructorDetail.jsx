import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, BookOpen, Users, UserCheck, UserX } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminInstructorDetail = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstructorDetail();
  }, [id]);

  const fetchInstructorDetail = async () => {
    try {
      const response = await axios.get(`/admin/management/instructors/${id}`);
      if (response.data.success && response.data.data.instructor) {
        setInstructor(response.data.data.instructor);
      } else {
        console.error('No instructor data received');
        setInstructor(null);
      }
    } catch (error) {
      console.error('Error fetching instructor details:', error);
      toast.error('Failed to load instructor details');
      setInstructor(null);
    } finally {
      setLoading(false);
    }
  };

  const updateInstructorStatus = async (isActive) => {
    try {
      await axios.put(`/admin/management/instructors/${id}/status`, { isActive });
      toast.success(`Instructor ${isActive ? 'activated' : 'deactivated'} successfully`);
      setInstructor(prev => ({ ...prev, isActive }));
    } catch (error) {
      console.error('Error updating instructor status:', error);
      toast.error('Failed to update instructor status');
    }
  };

  if (loading) {
    return (
      <div className="w-full p-4 md:p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-32 mb-6"></div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="w-full p-4 md:p-6">
        <Link to="/admin/instructors" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Instructors
        </Link>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Instructor not found</h2>
          <p className="text-gray-600">The instructor you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6">
      <Link to="/admin/instructors" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Instructors
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold text-xl">
                    {instructor.fullName?.charAt(0) || 'I'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{instructor.fullName || 'Unknown Instructor'}</h1>
                  <p className="text-gray-600">Instructor ID: {instructor._id?.slice(-8) || 'N/A'}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateInstructorStatus(!instructor.isActive)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    instructor.isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {instructor.isActive ? (
                    <><UserX className="w-4 h-4 inline mr-1" />Deactivate</>
                  ) : (
                    <><UserCheck className="w-4 h-4 inline mr-1" />Activate</>
                  )}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {instructor.email || 'No email'}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {instructor.phone || 'No phone'}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {instructor.createdAt ? new Date(instructor.createdAt).toLocaleDateString() : 'Unknown'}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Status</h3>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  instructor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {instructor.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {instructor.bio && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Bio</h3>
                <p className="text-gray-600">{instructor.bio}</p>
              </div>
            )}
          </div>

          {/* Classes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Classes</h3>
            {Array.isArray(instructor.classes) && instructor.classes.length > 0 ? (
              <div className="space-y-3">
                {instructor.classes.map((classItem, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{classItem.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{classItem.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {Array.isArray(classItem.enrolledStudents) ? classItem.enrolledStudents.length : 0} students
                          </span>
                          <span>{classItem.schedule || 'No schedule'}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        classItem.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {classItem.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No classes assigned yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Expertise */}
          {Array.isArray(instructor.expertise) && instructor.expertise.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {instructor.expertise.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Classes:</span>
                <span className="font-medium">{Array.isArray(instructor.classes) ? instructor.classes.length : 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Students:</span>
                <span className="font-medium">
                  {Array.isArray(instructor.classes) ? instructor.classes.reduce((total, cls) => total + (Array.isArray(cls.enrolledStudents) ? cls.enrolledStudents.length : 0), 0) : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Status:</span>
                <span className={`font-medium ${instructor.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {instructor.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInstructorDetail;