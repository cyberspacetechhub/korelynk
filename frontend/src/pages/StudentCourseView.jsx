import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Video, Calendar, FileText, Clock, CheckCircle } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const StudentCourseView = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (!token) {
      window.location.href = '/student/login';
      return;
    }
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem('studentToken');
      const [courseRes, assignmentsRes, submissionsRes] = await Promise.all([
        axios.get(`/courses/${id}`),
        axios.get(`/assignments/course/${id}`),
        axios.get(`/assignments/student/submissions?courseId=${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (courseRes.data.success) setCourse(courseRes.data.data);
      if (assignmentsRes.data.success) setAssignments(assignmentsRes.data.data);
      if (submissionsRes.data.success) setSubmissions(submissionsRes.data.data);
    } catch (error) {
      console.error('Error fetching course data:', error);
      toast.error('Failed to load course data');
    } finally {
      setLoading(false);
    }
  };

  const getSubmissionStatus = (assignmentId) => {
    const submission = submissions.find(s => s.assignment._id === assignmentId);
    if (!submission) return 'not_submitted';
    return submission.status;
  };

  const getSubmissionGrade = (assignmentId) => {
    const submission = submissions.find(s => s.assignment._id === assignmentId);
    return submission?.grade || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Link to="/student/dashboard" className="text-indigo-600 hover:text-indigo-800">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            to="/student/dashboard"
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600">{course.instructor} • {course.category}</p>
            </div>
            
            {course.meetingLink && (
              <a
                href={course.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Video className="w-4 h-4 mr-2" />
                Join Meeting
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Description</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>

            {/* Assignments */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Assignments</h2>
              
              {assignments.length === 0 ? (
                <p className="text-gray-500">No assignments available yet.</p>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => {
                    const status = getSubmissionStatus(assignment._id);
                    const grade = getSubmissionGrade(assignment._id);
                    const isOverdue = new Date() > new Date(assignment.dueDate);
                    
                    return (
                      <div key={assignment._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                          <div className="flex items-center space-x-2">
                            {status === 'graded' && grade !== null && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                {grade}/{assignment.maxPoints}
                              </span>
                            )}
                            <span className={`px-2 py-1 text-sm rounded-full ${
                              status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                              status === 'graded' ? 'bg-green-100 text-green-800' :
                              status === 'late' ? 'bg-red-100 text-red-800' :
                              isOverdue ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {status === 'submitted' ? 'Submitted' :
                               status === 'graded' ? 'Graded' :
                               status === 'late' ? 'Late Submission' :
                               isOverdue ? 'Overdue' : 'Pending'}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{assignment.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            <span className="mx-2">•</span>
                            <FileText className="w-4 h-4 mr-1" />
                            {assignment.maxPoints} points
                          </div>
                          
                          {status === 'not_submitted' && (
                            <Link
                              to={`/student/assignments/${assignment._id}/submit`}
                              className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                            >
                              Submit Assignment
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Course Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">{new Date(course.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium">{new Date(course.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Meeting Schedule */}
            {course.meetingSchedule && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Meeting Schedule</h3>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{course.meetingSchedule}</span>
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Assignments:</span>
                  <span className="font-medium">
                    {submissions.length}/{assignments.length} submitted
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Graded:</span>
                  <span className="font-medium">
                    {submissions.filter(s => s.status === 'graded').length}/{assignments.length}
                  </span>
                </div>
                {submissions.filter(s => s.grade !== null).length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Average Grade:</span>
                    <span className="font-medium">
                      {Math.round(
                        submissions
                          .filter(s => s.grade !== null)
                          .reduce((acc, s) => acc + s.grade, 0) /
                        submissions.filter(s => s.grade !== null).length
                      )}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseView;