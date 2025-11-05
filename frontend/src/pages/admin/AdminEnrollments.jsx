import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, XCircle, Clock, Mail, Phone, Users } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import SkeletonLoader from '../../components/SkeletonLoader';
import EmptyState from '../../components/EmptyState';

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get('/enrollments');
      if (response.data.success) {
        setEnrollments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      toast.error('Failed to fetch enrollments');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/enrollments/${id}/status`, { status });
      toast.success(`Enrollment ${status} successfully`);
      fetchEnrollments();
    } catch (error) {
      console.error('Error updating enrollment:', error);
      toast.error('Failed to update enrollment');
    }
  };

  const filteredEnrollments = enrollments.filter(enrollment => {
    if (filter === 'all') return true;
    return enrollment.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Enrollments Management</h1>
        
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'approved', 'rejected', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                filter === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-6">
            <SkeletonLoader rows={5} columns={6} />
          </div>
        ) : filteredEnrollments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Student</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Course</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Experience</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEnrollments.map((enrollment) => (
                    <tr key={enrollment._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{enrollment.studentName}</div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="w-3 h-3 mr-1" />
                            {enrollment.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="w-3 h-3 mr-1" />
                            {enrollment.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{enrollment.course?.title}</div>
                          <div className="text-sm text-gray-500">{enrollment.course?.category}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">
                          {enrollment.experience}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors ${getStatusColor(enrollment.status)}`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {enrollment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(enrollment._id, 'approved')}
                                className="px-3 py-1 text-sm text-white transition-all duration-200 bg-green-600 rounded hover:bg-green-700 hover:shadow-md"
                              >
                                <CheckCircle className="inline w-3 h-3 mr-1" />
                                Approve
                              </button>
                              <button
                                onClick={() => updateStatus(enrollment._id, 'rejected')}
                                className="px-3 py-1 text-sm text-white transition-all duration-200 bg-red-600 rounded hover:bg-red-700 hover:shadow-md"
                              >
                                <XCircle className="inline w-3 h-3 mr-1" />
                                Reject
                              </button>
                            </>
                          )}
                          {enrollment.status === 'approved' && (
                            <button
                              onClick={() => updateStatus(enrollment._id, 'completed')}
                              className="px-3 py-1 text-sm text-white transition-all duration-200 bg-blue-600 rounded hover:bg-blue-700 hover:shadow-md"
                            >
                              <Clock className="inline w-3 h-3 mr-1" />
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        ) : (
          <EmptyState
            icon={Users}
            title="No enrollments found"
            description="No student enrollments match your current filter. Try adjusting the status filter or check back later for new enrollments."
          />
        )}
      </div>

      {!loading && filteredEnrollments.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No enrollments found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminEnrollments;