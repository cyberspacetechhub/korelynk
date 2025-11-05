import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle, Eye, Clock, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import baseUrl from '../../config/baseUrl';
import ConfirmDialog from '../../components/ConfirmDialog';
import TableSkeleton from '../../components/skeletons/TableSkeleton';

const AdminPayments = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: '', payment: null });
  const queryClient = useQueryClient();

  const { data: payments, isLoading } = useQuery({
    queryKey: ['admin-payments'],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}admin/payments`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      return response.data.data;
    }
  });

  const confirmPaymentMutation = useMutation({
    mutationFn: async ({ paymentId, status }) => {
      const response = await axios.patch(`${baseUrl}admin/payments/${paymentId}/confirm`, 
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }}
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-payments']);
      toast.success('Payment status updated successfully');
      setConfirmDialog({ open: false, type: '', payment: null });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update payment');
    }
  });

  const handleConfirmPayment = (payment, status) => {
    setConfirmDialog({
      open: true,
      type: status,
      payment
    });
  };

  const executeConfirmation = () => {
    confirmPaymentMutation.mutate({
      paymentId: confirmDialog.payment._id,
      status: confirmDialog.type
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`;
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Payment Management</h1>
        <p className="text-gray-600">Review and confirm enrollment payments</p>
      </div>

      <div className="p-6 mb-6 bg-white rounded-lg shadow">
        <div className="flex items-center">
          <DollarSign className="w-8 h-8 mr-3 text-indigo-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{payments?.length || 0}</h3>
            <p className="text-sm text-gray-500">Total Payments</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Student</th>
          <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Course</th>
          <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Amount</th>
          <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Method</th>
          <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
          <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Date</th>
          <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {payments?.map((payment) => (
          <tr key={payment._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {payment.student?.firstName} {payment.student?.lastName}
                </div>
                <div className="text-sm text-gray-500">{payment.student?.email}</div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{payment.course?.title}</div>
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
              ₦{payment.amount?.toLocaleString()}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 capitalize whitespace-nowrap">
              {payment.paymentMethod}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={getStatusBadge(payment.status)}>
                {payment.status}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {new Date(payment.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedPayment(payment)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Eye className="w-4 h-4" />
                </button>
                {payment.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleConfirmPayment(payment, 'confirmed')}
                      className="text-green-600 hover:text-green-900"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleConfirmPayment(payment, 'rejected')}
                      className="text-red-600 hover:text-red-900"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-lg max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-medium">Payment Details</h3>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Student</label>
                  <p className="text-gray-900">
                    {selectedPayment.studentName || 
                     `${selectedPayment.student?.firstName || ''} ${selectedPayment.student?.lastName || ''}`.trim() ||
                     selectedPayment.student?.fullName || 
                     'N/A'}
                  </p>
                  {selectedPayment.email && (
                    <p className="text-sm text-gray-500">{selectedPayment.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Course</label>
                  <p className="text-gray-900">{selectedPayment.course?.title || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Amount</label>
                  <p className="text-lg font-semibold text-gray-900">₦{selectedPayment.amount?.toLocaleString() || '0'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Payment Method</label>
                  <p className="text-gray-900 capitalize">{selectedPayment.paymentMethod || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                  <span className={getStatusBadge(selectedPayment.status)}>
                    {selectedPayment.status}
                  </span>
                </div>
                
                {selectedPayment.paymentReference && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Reference</label>
                    <p className="text-gray-900 font-mono text-sm">{selectedPayment.paymentReference}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                  <p className="text-gray-900">{new Date(selectedPayment.createdAt).toLocaleString()}</p>
                </div>
                
                {selectedPayment.paymentProof && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Payment Proof</label>
                    <div className="mt-2">
                      <img 
                        src={selectedPayment.paymentProof} 
                        alt="Payment proof" 
                        className="max-w-full h-auto rounded-lg border"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t">
              {selectedPayment.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      setSelectedPayment(null);
                      handleConfirmPayment(selectedPayment, 'rejected');
                    }}
                    className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPayment(null);
                      handleConfirmPayment(selectedPayment, 'confirmed');
                    }}
                    className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Confirm
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, type: '', payment: null })}
        onConfirm={executeConfirmation}
        title={`${confirmDialog.type === 'confirmed' ? 'Confirm' : 'Reject'} Payment`}
        message={`Are you sure you want to ${confirmDialog.type === 'confirmed' ? 'confirm' : 'reject'} this payment?`}
        confirmText={confirmDialog.type === 'confirmed' ? 'Confirm' : 'Reject'}
        confirmButtonClass={confirmDialog.type === 'confirmed' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
      />
    </div>

  );
};

export default AdminPayments;