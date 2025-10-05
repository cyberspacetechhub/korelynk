import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Users, Calendar, DollarSign, Clock, Video, BookOpen } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminCourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
    fetchEnrollments();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`/courses/${id}`);
      if (response.data.success) {
        setCourse(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error('Failed to fetch course details');
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get(`/enrollments?course=${id}`);
      if (response.data.success) {
        setEnrollments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Link to="/admin/courses" className="text-indigo-600 hover:text-indigo-800">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link
            to="/admin/courses"
            className="mr-4 p-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
        </div>
        <Link
          to={`/admin/courses/edit/${course._id}`}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Course
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{course.category}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Level</div>
                  <div className="font-medium">{course.level}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium">{course.duration}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="font-medium">${course.price}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Start Date</div>
                  <div className="font-medium">{new Date(course.startDate).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">End Date</div>
                  <div className="font-medium">{new Date(course.endDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{course.description}</p>
            </div>

            {course.meetingLink && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  Meeting Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">Meeting Link:</span>
                    <a href={course.meetingLink} target="_blank" rel="noopener noreferrer" 
                       className="ml-2 text-indigo-600 hover:text-indigo-800">
                      {course.meetingLink}
                    </a>
                  </div>
                  {course.meetingSchedule && (
                    <div>
                      <span className="text-sm text-gray-500">Schedule:</span>
                      <span className="ml-2">{course.meetingSchedule}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {course.prerequisites?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Prerequisites</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}

            {course.learningOutcomes?.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Learning Outcomes</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Curriculum */}
          {course.curriculum?.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Curriculum</h2>
              <div className="space-y-4">
                {course.curriculum.map((week, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Week {week.week}: {week.title}
                    </h3>
                    <ul className="text-gray-600 space-y-1">
                      {week.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Enrollments:</span>
                <span className="font-medium">{enrollments.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Approved:</span>
                <span className="font-medium text-green-600">
                  {enrollments.filter(e => e.status === 'approved').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending:</span>
                <span className="font-medium text-yellow-600">
                  {enrollments.filter(e => e.status === 'pending').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available Spots:</span>
                <span className="font-medium">
                  {course.maxStudents - course.currentEnrollments}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Enrollments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Enrollments</h2>
            <div className="space-y-3">
              {enrollments.slice(0, 5).map((enrollment) => (
                <div key={enrollment._id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{enrollment.studentName}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    enrollment.status === 'approved' ? 'bg-green-100 text-green-800' :
                    enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {enrollment.status}
                  </span>
                </div>
              ))}
            </div>
            
            {enrollments.length > 5 && (
              <Link
                to="/admin/enrollments"
                className="block text-center text-indigo-600 hover:text-indigo-800 text-sm mt-4"
              >
                View All Enrollments
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseDetail;