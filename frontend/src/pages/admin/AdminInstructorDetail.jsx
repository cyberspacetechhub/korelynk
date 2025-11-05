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
          <div className="w-32 h-6 mb-6 bg-gray-300 rounded"></div>
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="w-48 h-8 mb-4 bg-gray-300 rounded"></div>
            <div className="space-y-3">
              <div className="w-full h-4 bg-gray-300 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="w-full">
        <Link to="/admin/instructors" className="inline-flex items-center mb-6 text-purple-600 hover:text-purple-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Instructors
        </Link>
        <div className="py-12 text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Instructor not found</h2>
          <p className="text-gray-600">The instructor you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6">
      <Link to="/admin/instructors" className="inline-flex items-center mb-6 text-purple-600 hover:text-purple-800">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Instructors
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="space-y-6 lg:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-16 h-16 mr-4 bg-purple-100 rounded-full">
                  <span className="text-xl font-bold text-purple-600">
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
                    <><UserX className="inline w-4 h-4 mr-1" />Deactivate</>
                  ) : (
                    <><UserCheck className="inline w-4 h-4 mr-1" />Activate</>
                  )}
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Contact Information</h3>
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
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Status</h3>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  instructor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {instructor.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {instructor.bio && (
              <div className="mt-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Bio</h3>
                <p className="text-gray-600">{instructor.bio}</p>
              </div>
            )}
          </div>

          {/* Classes */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Classes</h3>
            {Array.isArray(instructor.classes) && instructor.classes.length > 0 ? (
              <div className="space-y-3">
                {instructor.classes.map((classItem, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{classItem.title}</h4>
                        <p className="mt-1 text-sm text-gray-600">{classItem.description}</p>
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
              <div className="py-8 text-center text-gray-500">
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
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {instructor.expertise.map((skill, index) => (
                  <span key={index} className="px-3 py-1 text-sm text-purple-800 bg-purple-100 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Stats</h3>
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