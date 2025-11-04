import React, { useState } from 'react';
import { Plus, FileText, Calendar, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const InstructorAssignments = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      classId: '',
      dueDate: '',
      maxPoints: 100
    }
  });

  const fetchAssignments = async () => {
    const token = localStorage.getItem('instructorToken');
    const response = await axios.get('/assignments/instructor', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  };

  const fetchClasses = async () => {
    const token = localStorage.getItem('instructorToken');
    const response = await axios.get('/classes/instructor', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  };

  const { data: assignments = [], isLoading: assignmentsLoading } = useQuery({
    queryKey: ['instructor-assignments'],
    queryFn: fetchAssignments
  });

  const { data: classes = [] } = useQuery({
    queryKey: ['instructor-classes'],
    queryFn: fetchClasses
  });

  const createAssignmentMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('instructorToken');
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('instructions', data.description);
      formData.append('classId', data.classId);
      formData.append('class', data.classId);
      formData.append('dueDate', data.dueDate);
      formData.append('maxPoints', data.maxPoints);
      
      // Add files if present
      if (data.attachments && data.attachments.length > 0) {
        for (let i = 0; i < data.attachments.length; i++) {
          formData.append('attachments', data.attachments[i]);
        }
      }
      
      return axios.post('/assignments/instructor', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    onSuccess: () => {
      toast.success('Assignment created successfully');
      setShowModal(false);
      reset();
      queryClient.invalidateQueries(['instructor-assignments']);
    },
    onError: (error) => {
      console.error('Error creating assignment:', error);
      toast.error('Failed to create assignment');
    }
  });

  const onSubmit = (data) => {
    // Convert FileList to array for FormData processing
    const processedData = {
      ...data,
      attachments: data.attachments ? Array.from(data.attachments) : null
    };
    createAssignmentMutation.mutate(processedData);
  };

  if (assignmentsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-b-2 border-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/instructor/dashboard')}
        className="flex items-center mb-6 text-purple-600 hover:text-purple-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Assignment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {assignments.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No assignments created yet.
            </div>
          ) : (
            assignments.map((assignment) => (
              <div key={assignment._id} className="p-6 cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/instructor/assignments/${assignment._id}`)}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
                  <span className="text-sm text-gray-500">{assignment.maxPoints} points</span>
                </div>
                
                <p className="mb-3 text-gray-600">{assignment.description}</p>
                
                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex flex-col space-y-1 text-sm text-gray-600 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {assignment.submissions?.length || 0} submissions
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/instructor/assignments/${assignment._id}`);
                    }}
                    className="w-full px-3 py-1 text-sm text-white bg-purple-600 rounded hover:bg-purple-700 sm:w-auto"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-bold">Create Assignment</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Class
                </label>
                <select
                  {...register('classId', { required: 'Class is required' })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.classId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.title}
                    </option>
                  ))}
                </select>
                {errors.classId && <p className="mt-1 text-sm text-red-500">{errors.classId.message}</p>}
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="3"
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Due Date
                  </label>
                  <input
                    type="datetime-local"
                    {...register('dueDate', { required: 'Due date is required' })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.dueDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dueDate && <p className="mt-1 text-sm text-red-500">{errors.dueDate.message}</p>}
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Max Points
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...register('maxPoints', { 
                      required: 'Max points is required',
                      min: { value: 1, message: 'Must be at least 1' },
                      valueAsNumber: true
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.maxPoints ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.maxPoints && <p className="mt-1 text-sm text-red-500">{errors.maxPoints.message}</p>}
                </div>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Attachments (Optional)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  {...register('attachments')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="mt-1 text-xs text-gray-500">Upload images to help explain the assignment</p>
              </div>
              
              <div className="flex justify-end pt-4 space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createAssignmentMutation.isPending}
                  className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {createAssignmentMutation.isPending ? 'Creating...' : 'Create Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorAssignments;