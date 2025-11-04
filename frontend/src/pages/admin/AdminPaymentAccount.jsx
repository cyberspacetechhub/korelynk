import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { CreditCard, Edit, Save, X } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminPaymentAccount = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const fetchPaymentAccount = async () => {
    const response = await axios.get('/payment-account/active');
    return response.data.data;
  };

  const { data: paymentAccount, isLoading } = useQuery({
    queryKey: ['payment-account'],
    queryFn: fetchPaymentAccount
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('adminToken');
      return axios.post('/payment-account', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      toast.success('Payment account created successfully');
      setIsEditing(false);
      queryClient.invalidateQueries(['payment-account']);
    },
    onError: () => {
      toast.error('Failed to create payment account');
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('adminToken');
      return axios.put(`/payment-account/${paymentAccount._id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      toast.success('Payment account updated successfully');
      setIsEditing(false);
      queryClient.invalidateQueries(['payment-account']);
    },
    onError: () => {
      toast.error('Failed to update payment account');
    }
  });

  const handleEdit = () => {
    if (paymentAccount) {
      setValue('bankName', paymentAccount.bankName);
      setValue('accountNumber', paymentAccount.accountNumber);
      setValue('accountName', paymentAccount.accountName);
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  const onSubmit = (data) => {
    if (paymentAccount) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payment Account Management</h1>
        <p className="text-gray-600">Manage bank account details for course enrollment payments</p>
      </div>

      <div className="max-w-2xl bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">Bank Account Details</h2>
            </div>
            {!isEditing && paymentAccount && (
              <button
                onClick={handleEdit}
                className="flex items-center px-3 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {!paymentAccount && !isEditing ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Account Set</h3>
              <p className="text-gray-600 mb-4">Create a bank account for students to make payments</p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Create Payment Account
              </button>
            </div>
          ) : isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  {...register('bankName', { required: 'Bank name is required' })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.bankName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., First Bank of Nigeria"
                />
                {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  {...register('accountNumber', { 
                    required: 'Account number is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Account number must be 10 digits'
                    }
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1234567890"
                />
                {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  {...register('accountName', { required: 'Account name is required' })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.accountName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="KoreLynk Tech Limited"
                />
                {errors.accountName && <p className="text-red-500 text-sm mt-1">{errors.accountName.message}</p>}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-1" />
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <p className="mt-1 text-lg text-gray-900">{paymentAccount.bankName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <p className="mt-1 text-lg font-mono text-gray-900">{paymentAccount.accountNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Name</label>
                <p className="mt-1 text-lg text-gray-900">{paymentAccount.accountName}</p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Last updated: {new Date(paymentAccount.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentAccount;