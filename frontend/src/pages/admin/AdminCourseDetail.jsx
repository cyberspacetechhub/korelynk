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
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Course not found</h2>
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
            className="p-2 mr-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
        </div>
        <Link
          to={`/admin/courses/edit/${course._id}`}
          className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Course
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Course Information */}
        <div className="space-y-6 lg:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Course Details</h2>
            
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{course.category}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Level</div>
                  <div className="font-medium">{course.level}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium">{course.duration}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="font-medium">${course.price}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Start Date</div>
                  <div className="font-medium">{new Date(course.startDate).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">End Date</div>
                  <div className="font-medium">{new Date(course.endDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 font-medium text-gray-900">Description</h3>
              <p className="text-gray-600">{course.description}</p>
            </div>

            {course.meetingLink && (
              <div className="mb-6">
                <h3 className="flex items-center mb-2 font-medium text-gray-900">
                  <Video className="w-4 h-4 mr-2" />
                  Meeting Information
                </h3>
                <div className="p-4 rounded-lg bg-gray-50">
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
                <h3 className="mb-2 font-medium text-gray-900">Prerequisites</h3>
                <ul className="space-y-1 text-gray-600 list-disc list-inside">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}

            {course.learningOutcomes?.length > 0 && (
              <div>
                <h3 className="mb-2 font-medium text-gray-900">Learning Outcomes</h3>
                <ul className="space-y-1 text-gray-600 list-disc list-inside">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Curriculum */}
          {course.curriculum?.length > 0 && (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Curriculum</h2>
              <div className="space-y-4">
                {course.curriculum.map((week, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="mb-2 font-medium text-gray-900">
                      Week {week.week}: {week.title}
                    </h3>
                    <ul className="space-y-1 text-gray-600">
                      {week.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-2 h-2 mr-3 bg-indigo-400 rounded-full"></div>
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
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Statistics</h2>
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
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Enrollments</h2>
            <div className="space-y-3">
              {enrollments.slice(0, 5).map((enrollment) => (
                <div key={enrollment._id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{enrollment.studentName}</div>
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
                className="block mt-4 text-sm text-center text-indigo-600 hover:text-indigo-800"
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