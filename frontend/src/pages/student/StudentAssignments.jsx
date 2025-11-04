import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const StudentAssignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem('studentToken');
      const response = await axios.get('/assignments/student', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setAssignments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.error('Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'graded': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const isOverdue = (dueDate) => {
    return new Date() > new Date(dueDate);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/student/dashboard')}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
        <p className="text-gray-600">View and submit your assignments</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {assignments.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No assignments available.
            </div>
          ) : (
            assignments.map((assignment) => (
              <div key={assignment._id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{assignment.maxPoints} points</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      assignment.submission 
                        ? getStatusColor(assignment.submission.status)
                        : isOverdue(assignment.dueDate) 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {assignment.submission 
                        ? assignment.submission.status 
                        : isOverdue(assignment.dueDate) 
                          ? 'Overdue' 
                          : 'Pending'}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3">{assignment.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(assignment.dueDate).toLocaleTimeString()}
                    </div>
                    {assignment.submission && (
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Grade: {assignment.submission.grade || 'Not graded'}
                      </div>
                    )}
                  </div>
                  
                  {!assignment.submission && !isOverdue(assignment.dueDate) && (
                    <a
                      href={`/student/assignments/${assignment._id}/submit`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
                    >
                      Submit Assignment
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;