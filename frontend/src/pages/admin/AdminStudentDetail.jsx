import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, BookOpen, GraduationCap, UserCheck, UserX } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminStudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDetail();
  }, [id]);

  const fetchStudentDetail = async () => {
    try {
      const response = await axios.get(`/admin/management/students/${id}`);
      if (response.data.success && response.data.data.student) {
        setStudent(response.data.data.student);
      } else {
        console.error('No student data received');
        setStudent(null);
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
      toast.error('Failed to load student details');
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  const updateStudentStatus = async (isActive) => {
    try {
      await axios.put(`/admin/management/students/${id}/status`, { isActive });
      toast.success(`Student ${isActive ? 'activated' : 'deactivated'} successfully`);
      setStudent(prev => ({ ...prev, isActive }));
    } catch (error) {
      console.error('Error updating student status:', error);
      toast.error('Failed to update student status');
    }
  };

  if (loading) {
    return (
      <div className="w-full">
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

  if (!student) {
    return (
      <div className="w-full p-4 md:p-6">
        <Link to="/admin/students" className="inline-flex items-center mb-6 text-indigo-600 hover:text-indigo-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Students
        </Link>
        <div className="py-12 text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Student not found</h2>
          <p className="text-gray-600">The student you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6">
      <Link to="/admin/students" className="inline-flex items-center mb-6 text-indigo-600 hover:text-indigo-800">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Students
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="space-y-6 lg:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-16 h-16 mr-4 bg-indigo-100 rounded-full">
                  <span className="text-xl font-bold text-indigo-600">
                    {student.fullName?.charAt(0) || 'S'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{student.fullName || 'Unknown Student'}</h1>
                  <p className="text-gray-600">Student ID: {student._id?.slice(-8) || 'N/A'}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateStudentStatus(!student.isActive)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    student.isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {student.isActive ? (
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
                    {student.email || 'No email'}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {student.phone || 'No phone'}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'Unknown'}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Status</h3>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {student.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Enrollments */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Course Enrollments</h3>
            {Array.isArray(student.enrollments) && student.enrollments.length > 0 ? (
              <div className="space-y-3">
                {student.enrollments.map((enrollment, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{enrollment.course?.title || 'Course Title'}</h4>
                        <p className="mt-1 text-sm text-gray-600">
                          Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                        </p>
                        {enrollment.progress && (
                          <div className="mt-2">
                            <div className="flex justify-between mb-1 text-sm text-gray-600">
                              <span>Progress</span>
                              <span>{enrollment.progress.completionPercentage || 0}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-indigo-600 rounded-full" 
                                style={{ width: `${enrollment.progress.completionPercentage || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        enrollment.status === 'active' ? 'bg-green-100 text-green-800' : 
                        enrollment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {enrollment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No course enrollments yet</p>
              </div>
            )}
          </div>

          {/* Assignments */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Assignments</h3>
            {Array.isArray(student.assignments) && student.assignments.length > 0 ? (
              <div className="space-y-3">
                {student.assignments?.slice(0, 5).map((assignment, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}</p>
                        {assignment.grade && (
                          <p className="mt-1 text-sm font-medium text-indigo-600">Grade: {assignment.grade}/100</p>
                        )}
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                        assignment.status === 'graded' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No assignments yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Enrollments:</span>
                <span className="font-medium">{Array.isArray(student.enrollments) ? student.enrollments.length : 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed Courses:</span>
                <span className="font-medium">
                  {Array.isArray(student.enrollments) ? student.enrollments.filter(e => e.status === 'completed').length : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Grade:</span>
                <span className="font-medium">
                  {Array.isArray(student.assignments) && student.assignments.length > 0 
                    ? Math.round(student.assignments.reduce((sum, a) => sum + (a.grade || 0), 0) / student.assignments.length)
                    : 'N/A'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Status:</span>
                <span className={`font-medium ${student.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {student.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Learning Preferences */}
          {student.learningPreferences && (
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Learning Preferences</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {Object.entries(student.learningPreferences).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStudentDetail;