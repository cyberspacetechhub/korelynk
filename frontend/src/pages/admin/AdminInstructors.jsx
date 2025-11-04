import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, UserCheck, UserX, Mail, Phone, Calendar, BookOpen } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    fetchInstructors();
  }, [searchTerm, statusFilter, pagination.currentPage]);

  const fetchInstructors = async () => {
    try {
      const params = {
        page: pagination.currentPage,
        limit: 10,
        search: searchTerm,
        status: statusFilter
      };

      const response = await axios.get('/admin/management/instructors', { params });
      if (response.data.success) {
        setInstructors(response.data.data.instructors);
        setPagination({
          currentPage: response.data.data.currentPage,
          totalPages: response.data.data.totalPages,
          total: response.data.data.total
        });
      }
    } catch (error) {
      console.error('Error fetching instructors:', error);
      toast.error('Failed to fetch instructors');
    } finally {
      setLoading(false);
    }
  };

  const updateInstructorStatus = async (instructorId, isActive) => {
    try {
      await axios.put(`/admin/management/instructors/${instructorId}/status`, { isActive });
      toast.success(`Instructor ${isActive ? 'activated' : 'deactivated'} successfully`);
      fetchInstructors();
    } catch (error) {
      console.error('Error updating instructor status:', error);
      toast.error('Failed to update instructor status');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Instructor Management</h1>
        <div className="text-sm text-gray-600">
          Total Instructors: {pagination.total}
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
              <input
                type="text"
                placeholder="Search instructors..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusFilter('')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === '' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleStatusFilter('active')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => handleStatusFilter('inactive')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'inactive' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Instructors Table */}
      {loading ? (
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-b-2 border-purple-600 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : instructors.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow">
          <div className="mb-4 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-2" />
            <p className="text-lg font-medium">No instructors found</p>
            <p className="text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          {/* Mobile Cards */}
          <div className="block lg:hidden">
            {instructors.map((instructor) => (
              <div key={instructor._id} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-3 bg-purple-100 rounded-full">
                      <span className="font-medium text-purple-600">
                        {instructor.fullName?.charAt(0) || 'I'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{instructor.fullName}</div>
                      <div className="text-sm text-gray-500 truncate">{instructor.email}</div>
                      <div className="text-sm text-gray-500">{instructor.phone}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ml-2 ${
                    instructor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {instructor.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <BookOpen className="flex-shrink-0 w-4 h-4 mr-1" />
                    <span>{instructor.classes?.length || 0} classes</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="flex-shrink-0 w-4 h-4 mr-1" />
                    <span>{new Date(instructor.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {instructor.expertise && instructor.expertise.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {instructor.expertise.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="inline-block px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded">
                          {skill}
                        </span>
                      ))}
                      {instructor.expertise.length > 3 && (
                        <span className="text-xs text-gray-500">+{instructor.expertise.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Link
                    to={`/admin/instructors/${instructor._id}`}
                    className="flex-1 px-3 py-2 text-sm text-center text-purple-600 transition-colors rounded-lg bg-purple-50 hover:bg-purple-100"
                  >
                    <Eye className="inline w-4 h-4 mr-1" />
                  </Link>
                  <button
                    onClick={() => updateInstructorStatus(instructor._id, !instructor.isActive)}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors text-center ${
                      instructor.isActive 
                        ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                        : 'text-green-600 bg-green-50 hover:bg-green-100'
                    }`}
                  >
                    {instructor.isActive ? (
                      <><UserX className="inline w-4 h-4 mr-1" /></>
                    ) : (
                      <><UserCheck className="inline w-4 h-4 mr-1" /></>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Table */}
          <div className="hidden p-6 lg:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Instructor</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Contact</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Classes</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Joined</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((instructor) => (
                    <tr key={instructor._id} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{instructor.fullName}</div>
                          <div className="text-sm text-gray-500">{instructor.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{instructor.phone}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <BookOpen className="w-4 h-4" />
                          {instructor.classes?.length || 0}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          instructor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {instructor.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{new Date(instructor.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/instructors/${instructor._id}`}
                            className="px-3 py-1 text-sm text-white transition-all duration-200 bg-blue-600 rounded hover:bg-blue-700"
                          >
                            <Eye className="inline w-3 h-3 mr-1" />
                            
                          </Link>
                          <button
                            onClick={() => updateInstructorStatus(instructor._id, !instructor.isActive)}
                            className={`px-3 py-1 text-sm text-white rounded transition-all duration-200 ${
                              instructor.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {instructor.isActive ? (
                              <><UserX className="inline w-3 h-3 mr-1" /></>
                            ) : (
                              <><UserCheck className="inline w-3 h-3 mr-1" /></>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col gap-2 px-4 py-3 border-t border-gray-200 sm:flex-row sm:justify-between sm:items-center">
              <div className="text-sm text-center text-gray-700 sm:text-left">
                Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.total)} of {pagination.total} results
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-2 text-sm transition-colors border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm text-gray-600">
                  {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-2 text-sm transition-colors border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminInstructors;