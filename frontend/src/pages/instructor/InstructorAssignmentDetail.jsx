import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Users, Star, MessageSquare } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const InstructorAssignmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showGradeModal, setShowGradeModal] = useState(false);
  
  // console.log('Assignment ID from URL:', id);

  const { register, handleSubmit, reset, setValue } = useForm();

  const fetchAssignment = async () => {
    // console.log('Fetching assignment details for ID:', id);
    if (!id) {
      console.error('No assignment ID provided for assignment details');
      return null;
    }
    const token = localStorage.getItem('instructorToken');
    const response = await axios.get(`/assignments/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  };

  const fetchSubmissions = async () => {
    // console.log('Fetching submissions for assignment ID:', id);
    if (!id) {
      console.error('No assignment ID provided');
      return [];
    }
    const token = localStorage.getItem('instructorToken');
    const response = await axios.get(`/assignments/${id}/submissions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  };

  const { data: assignment, isLoading: assignmentLoading } = useQuery({
    queryKey: ['assignment', id],
    queryFn: fetchAssignment
  });

  const { data: submissions = [], isLoading: submissionsLoading } = useQuery({
    queryKey: ['assignment-submissions', id],
    queryFn: fetchSubmissions,
    onSuccess: (data) => {
      // console.log('Submissions data:', data);
      // console.log('Submissions count:', data?.length || 0);
      // toast.success(`Submissions count: ${data?.length || 0}`);
    },
    onError: (error) => {
      console.error('Error fetching submissions:', error);
    }
  });

  const gradeMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('instructorToken');
      return axios.put(`/assignments/submissions/${selectedSubmission._id}/grade`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      toast.success('Submission graded successfully');
      setShowGradeModal(false);
      setSelectedSubmission(null);
      reset();
      queryClient.invalidateQueries(['assignment-submissions', id]);
    },
    onError: () => {
      toast.error('Failed to grade submission');
    }
  });

  const handleGrade = (submission) => {
    setSelectedSubmission(submission);
    setValue('grade', submission.grade || '');
    setValue('feedback', submission.feedback || '');
    setShowGradeModal(true);
  };

  const onSubmitGrade = (data) => {
    gradeMutation.mutate(data);
  };

  if (assignmentLoading || submissionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-b-2 border-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/instructor/assignments')}
        className="flex items-center mb-6 text-purple-600 hover:text-purple-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Assignments
      </button>

      {/* Assignment Details */}
      <div className="mb-6 bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">{assignment?.title}</h1>
          <p className="mb-4 text-gray-600">{assignment?.description}</p>
          
          <div className="grid grid-cols-1 gap-4 mb-4 text-sm md:grid-cols-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>Due: {new Date(assignment?.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-gray-400" />
              <span>Max Points: {assignment?.maxPoints}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              <span>{submissions.length} Submissions</span>
            </div>
          </div>
          
          {assignment?.attachments && assignment.attachments.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-2 font-medium text-gray-900">Assignment Attachments:</h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {assignment.attachments.map((attachment, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={attachment.url} 
                      alt={attachment.filename}
                      className="object-cover w-full h-20 border rounded cursor-pointer hover:opacity-75"
                      onClick={() => window.open(attachment.url, '_blank')}
                    />
                    <p className="mt-1 text-xs text-gray-600 truncate">{attachment.filename}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submissions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Student Submissions</h2>
        </div>

        {submissions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No submissions yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {submissions.map((submission) => (
              <div key={submission._id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {submission.student?.fullName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {submission.grade !== undefined ? (
                      <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                        {submission.grade}/{assignment?.maxPoints}
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
                        Pending
                      </span>
                    )}
                    <button
                      onClick={() => handleGrade(submission)}
                      className="px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                    >
                      {submission.grade !== undefined ? 'Update Grade' : 'Grade'}
                    </button>
                  </div>
                </div>

                <div className="p-4 mb-4 rounded-lg bg-gray-50">
                  <h4 className="mb-2 font-medium text-gray-900">Submission:</h4>
                  <div className="p-3 overflow-y-auto bg-white border rounded max-h-96">
                    <pre className="text-sm text-gray-700 break-words whitespace-pre-wrap overflow-wrap-anywhere">{submission.content}</pre>
                  </div>
                  
                  {submission.attachments && submission.attachments.length > 0 && (
                    <div className="mt-4">
                      <h5 className="mb-2 font-medium text-gray-900">Attachments:</h5>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                        {submission.attachments.map((attachment, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={attachment.url} 
                              alt={attachment.filename}
                              className="object-cover w-full h-24 border rounded cursor-pointer hover:opacity-75"
                              onClick={() => window.open(attachment.url, '_blank')}
                            />
                            <p className="mt-1 text-xs text-gray-600 truncate">{attachment.filename}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {submission.feedback && (
                  <div className="p-4 rounded-lg bg-blue-50">
                    <h4 className="flex items-center mb-2 font-medium text-gray-900">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Instructor Feedback:
                    </h4>
                    <p className="text-gray-700">{submission.feedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grade Modal */}
      {showGradeModal && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-bold">
              Grade Submission - {selectedSubmission.student?.fullName}
            </h2>

            <form onSubmit={handleSubmit(onSubmitGrade)} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Grade (out of {assignment?.maxPoints})
                </label>
                <input
                  type="number"
                  min="0"
                  max={assignment?.maxPoints}
                  {...register('grade', { 
                    required: 'Grade is required',
                    min: { value: 0, message: 'Grade cannot be negative' },
                    max: { value: assignment?.maxPoints, message: `Grade cannot exceed ${assignment?.maxPoints}` },
                    valueAsNumber: true
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Feedback (Optional)
                </label>
                <textarea
                  {...register('feedback')}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Provide feedback to the student..."
                />
              </div>

              <div className="flex justify-end pt-4 space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowGradeModal(false);
                    setSelectedSubmission(null);
                    reset();
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={gradeMutation.isPending}
                  className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {gradeMutation.isPending ? 'Saving...' : 'Save Grade'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorAssignmentDetail;