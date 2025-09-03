import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Star, CheckCircle, X, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from '../../api/axios';

const AdminFeedback = () => {
  const [statusFilter, setStatusFilter] = useState('all');

  const queryClient = useQueryClient();

  const { data: feedbackData, isLoading, refetch } = useQuery(
    ['admin-feedback', statusFilter],
    () => axios.get(`admin/feedback?status=${statusFilter}`).then(res => res.data.data),
    {
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to fetch feedback');
      }
    }
  );

  useEffect(() => {
    refetch();
  }, [statusFilter, refetch]);

  const updateStatusMutation = useMutation(
    ({ id, status, isTestimonial }) => axios.put(`admin/feedback/${id}`, { status, isTestimonial }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-feedback');
        queryClient.invalidateQueries('testimonials');
        toast.success('Feedback status updated successfully');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update feedback status');
      }
    }
  );

  const handleStatusUpdate = (id, status, isTestimonial = false) => {
    updateStatusMutation.mutate({ id, status, isTestimonial });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const feedback = feedbackData?.feedback || [];

  return (
    <div className="px-4 space-y-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Feedback Management</h1>
          <p className="text-sm text-gray-600 sm:text-base">Manage user feedback and testimonials</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {feedback.length === 0 ? (
          <div className="py-12 text-center">
            <h3 className="mb-2 text-lg font-medium text-gray-900">No feedback found</h3>
            <p className="text-gray-600">No feedback matches your current filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {feedback.map((item) => (
              <div key={item._id} className="p-4 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col mb-2 space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                      <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{item.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'approved' 
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                      {item.isTestimonial && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">
                          Testimonial
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col mb-3 space-y-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                      <span className="break-all">{item.email}</span>
                      {item.phone && <span>{item.phone}</span>}
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1">({item.rating}/5)</span>
                      </div>
                    </div>

                    <div className="mb-3 space-y-1">
                      <p className="text-xs text-gray-600 break-words sm:text-sm">
                        <strong>Subject:</strong> {item.subject}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-gray-50 sm:p-4">
                      <p className="text-sm text-gray-700 break-words sm:text-base">{item.message}</p>
                    </div>
                  </div>

                  <div className="flex flex-row flex-wrap gap-2 sm:justify-start lg:flex-col lg:ml-4">
                    {item.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(item._id, 'approved', item.rating >= 4)}
                          className="flex items-center px-3 py-2 space-x-1 text-xs text-green-700 transition-colors bg-green-100 rounded-lg hover:bg-green-200 sm:text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">{item.rating >= 4 ? 'Approve & Feature' : 'Approve'}</span>
                          <span className="sm:hidden">✓</span>
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(item._id, 'rejected')}
                          className="flex items-center px-3 py-2 space-x-1 text-xs text-red-700 transition-colors bg-red-100 rounded-lg hover:bg-red-200 sm:text-sm"
                        >
                          <X className="w-4 h-4" />
                          <span className="hidden sm:inline">Reject</span>
                          <span className="sm:hidden">✗</span>
                        </button>
                      </>
                    )}
                    
                    {item.status === 'approved' && !item.isTestimonial && (
                      <button
                        onClick={() => handleStatusUpdate(item._id, 'approved', true)}
                        className="flex items-center px-3 py-2 space-x-1 text-xs text-purple-700 transition-colors bg-purple-100 rounded-lg hover:bg-purple-200 sm:text-sm"
                      >
                        <Star className="w-4 h-4" />
                        <span className="hidden sm:inline">Make Testimonial</span>
                        <span className="sm:hidden">★</span>
                      </button>
                    )}
                    
                    {item.isTestimonial && (
                      <button
                        onClick={() => handleStatusUpdate(item._id, 'approved', false)}
                        className="flex items-center px-3 py-2 space-x-1 text-xs text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 sm:text-sm"
                      >
                        <Star className="w-4 h-4" />
                        <span className="hidden sm:inline">Remove Testimonial</span>
                        <span className="sm:hidden">☆</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;