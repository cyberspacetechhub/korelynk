import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Clock } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const StudentAssignmentSubmit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    attachments: null
  });

  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (!token) {
      navigate('/student/login');
      return;
    }
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      const response = await axios.get(`/assignments/${id}`);
      if (response.data.success) {
        setAssignment(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching assignment:', error);
      toast.error('Failed to load assignment details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('studentToken');
      const submitData = new FormData();
      submitData.append('assignment', id);
      submitData.append('content', formData.content);
      
      // Add files if present
      if (formData.attachments && formData.attachments.length > 0) {
        for (let i = 0; i < formData.attachments.length; i++) {
          submitData.append('attachments', formData.attachments[i]);
        }
      }

      const response = await axios.post('/assignments/submit', submitData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Assignment submitted successfully!');
        if (assignment.class?.course?._id) {
          navigate(`/student/courses/${assignment.class.course._id}`);
        } else {
          navigate('/student/dashboard');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit assignment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Assignment not found</h2>
          <button onClick={() => navigate('/student/dashboard')} className="text-indigo-600 hover:text-indigo-800">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isOverdue = new Date() > new Date(assignment.dueDate);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => {
            if (assignment.class?.course?._id) {
              navigate(`/student/courses/${assignment.class.course._id}`);
            } else {
              navigate('/student/dashboard');
            }
          }}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </button>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-indigo-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{assignment.title}</h1>
                <p className="text-gray-600">{assignment.class?.course?.title || 'Course'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Max Points: {assignment.maxPoints}
              </div>
              {isOverdue && (
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                  Overdue
                </span>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Assignment Description</h3>
              <p className="text-gray-700 mb-4">{assignment.description}</p>
              
              <h3 className="font-medium text-gray-900 mb-3">Instructions</h3>
              <div className="text-gray-700 whitespace-pre-wrap mb-4">{assignment.instructions}</div>
              
              {assignment.attachments && assignment.attachments.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Reference Materials:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {assignment.attachments.map((attachment, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={attachment.url} 
                          alt={attachment.filename}
                          className="w-full h-24 object-cover rounded border cursor-pointer hover:opacity-75"
                          onClick={() => window.open(attachment.url, '_blank')}
                        />
                        <p className="text-xs text-gray-600 mt-1 truncate">{attachment.filename}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Submission *
              </label>
              <textarea
                required
                rows="12"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your assignment solution here..."
              />
              <p className="text-sm text-gray-500 mt-2">
                Provide your complete solution, code, or written response as required.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments (Optional)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  setFormData({...formData, attachments: e.target.files});
                }}
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload images to support your submission (screenshots, diagrams, etc.)
              </p>
            </div>

            {isOverdue && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Late Submission</h3>
                    <p className="text-sm text-yellow-700">
                      This assignment is past its due date. Your submission will be marked as late.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  if (assignment.class?.course?._id) {
                    navigate(`/student/courses/${assignment.class.course._id}`);
                  } else {
                    navigate('/student/dashboard');
                  }
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Assignment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentSubmit;