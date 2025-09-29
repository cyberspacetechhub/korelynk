import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Code, X } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminCodeSamples = () => {
  const [codeSamples, setCodeSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, sample: null });
  const [filters, setFilters] = useState({
    status: 'all',
    language: ''
  });

  const languages = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'php', label: 'PHP' }
  ];

  useEffect(() => {
    fetchCodeSamples();
  }, [filters]);

  const fetchCodeSamples = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.language) params.append('language', filters.language);
      
      const response = await axios.get(`/code-samples/admin/all?${params}`);
      if (response.data.success) {
        setCodeSamples(response.data.data.codeSamples || response.data.data);
      }
    } catch (error) {
      console.error('Error fetching code samples:', error);
      toast.error('Failed to load code samples');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/code-samples/admin/${deleteModal.sample._id}`);
      toast.success('Code tutorial deleted successfully');
      setDeleteModal({ show: false, sample: null });
      fetchCodeSamples();
    } catch (error) {
      console.error('Error deleting code tutorial:', error);
      toast.error('Failed to delete code tutorial');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Code Tutorials</h2>
          <p className="text-gray-600">Manage interactive code tutorials and examples</p>
        </div>
        <Link
          to="/admin/code-samples/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Tutorial
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          
          <select
            value={filters.language}
            onChange={(e) => setFilters({...filters, language: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
          
          <button
            onClick={() => setFilters({ status: 'all', language: '' })}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Code Samples Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {codeSamples.length === 0 ? (
          <div className="text-center py-12">
            <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No code tutorials found</h3>
            <p className="text-gray-600 mb-4">Create your first code tutorial to get started.</p>
            <Link
              to="/admin/code-samples/new"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Tutorial
            </Link>
          </div>
        ) : (
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                    Title
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell">
                    Language
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase lg:table-cell">
                    Difficulty
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                    Status
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell">
                    Views
                  </th>
                  <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase lg:table-cell">
                    Created
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {codeSamples.map((sample) => (
                  <tr key={sample._id} className="hover:bg-gray-50">
                    <td className="px-2 py-4 sm:px-6">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 line-clamp-2">
                          {sample.title}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 line-clamp-1 md:hidden">
                          {sample.language.toUpperCase()} • {sample.difficulty} • {formatDate(sample.createdAt)}
                        </div>
                        <div className="hidden md:block text-xs text-gray-400 mt-1 line-clamp-2 max-w-xs">
                          {sample.description.length > 80 ? `${sample.description.substring(0, 80)}...` : sample.description}
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                        {sample.language.toUpperCase()}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4">
                      <span className="text-sm text-gray-900 capitalize">
                        {sample.difficulty}
                      </span>
                    </td>
                    <td className="px-2 py-4 sm:px-6">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(sample.status)}`}>
                        {sample.status}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <Eye className="w-4 h-4 mr-1" />
                        {sample.views}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 text-sm text-gray-500">
                      {formatDate(sample.createdAt)}
                    </td>
                    <td className="px-2 py-4 text-right sm:px-6">
                      <div className="flex items-center justify-end space-x-1">
                        <Link
                          to={`/admin/code-samples/${sample._id}`}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/code-samples/edit/${sample._id}`}
                          className="p-1 text-gray-400 hover:text-indigo-600"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ show: true, sample })}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Tutorial</h3>
              <button
                onClick={() => setDeleteModal({ show: false, sample: null })}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{deleteModal.sample?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteModal({ show: false, sample: null })}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCodeSamples;