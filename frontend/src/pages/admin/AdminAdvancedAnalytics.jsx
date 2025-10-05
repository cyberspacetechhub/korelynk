import React, { useState, useEffect } from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp, Award, Clock, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminAdvancedAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/admin/management/analytics/dashboard');
      if (response.data.success) {
        setAnalytics(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Unavailable</h2>
          <p className="text-gray-600">Unable to load analytics data.</p>
        </div>
      </div>
    );
  }

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <div className="text-2xl font-bold text-gray-900">
                {analytics.overview.totalStudents}
              </div>
              <div className="text-sm text-gray-600">Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <GraduationCap className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <div className="text-2xl font-bold text-gray-900">
                {analytics.overview.totalInstructors}
              </div>
              <div className="text-sm text-gray-600">Instructors</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <div className="text-2xl font-bold text-gray-900">
                {analytics.overview.totalCourses}
              </div>
              <div className="text-sm text-gray-600">Courses</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <div className="text-2xl font-bold text-gray-900">
                {analytics.overview.totalClasses}
              </div>
              <div className="text-sm text-gray-600">Classes</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Award className="w-8 h-8 text-red-600" />
            <div className="ml-3">
              <div className="text-2xl font-bold text-gray-900">
                {analytics.overview.totalAssignments}
              </div>
              <div className="text-sm text-gray-600">Assignments</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-3">
              <div className="text-2xl font-bold text-gray-900">
                {analytics.overview.totalSubmissions}
              </div>
              <div className="text-sm text-gray-600">Submissions</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-indigo-600" />
            <div className="ml-3">
              <div className="text-2xl font-bold text-gray-900">
                {analytics.overview.activeEnrollments}
              </div>
              <div className="text-sm text-gray-600">Enrollments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.students.enrollmentTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id.month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Categories */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Courses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.courses.popularCourses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="enrollmentCount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Submission Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.submissions.statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {analytics.submissions.statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.submissions.gradeTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id.month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgGrade" stroke="#ff7300" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Instructors */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Instructors</h3>
          <div className="space-y-3">
            {analytics.instructors.topInstructors.map((instructor, index) => (
              <div key={instructor._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-medium text-sm">
                      {instructor.fullName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{instructor.fullName}</div>
                    <div className="text-sm text-gray-500">{instructor.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{instructor.totalStudents} students</div>
                  <div className="text-sm text-gray-500">{instructor.totalClasses} classes</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Classes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Classes</h3>
          <div className="space-y-3">
            {analytics.classes.topPerformingClasses.map((classItem, index) => (
              <div key={classItem._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{classItem.className}</div>
                  <div className="text-sm text-gray-500">{classItem.studentCount} students</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-600">
                    {Math.round(classItem.avgCompletion)}% completion
                  </div>
                  <div className="text-sm text-gray-500">
                    Avg Grade: {Math.round(classItem.avgGrade || 0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Recent Enrollments */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recent Enrollments</h4>
            <div className="space-y-2">
              {analytics.recentActivity.recentEnrollments.map((enrollment) => (
                <div key={enrollment._id} className="text-sm">
                  <div className="font-medium text-gray-900">{enrollment.student?.fullName}</div>
                  <div className="text-gray-500">{enrollment.course?.title}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Submissions */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recent Submissions</h4>
            <div className="space-y-2">
              {analytics.recentActivity.recentSubmissions.map((submission) => (
                <div key={submission._id} className="text-sm">
                  <div className="font-medium text-gray-900">{submission.student?.fullName}</div>
                  <div className="text-gray-500">{submission.assignment?.title}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Classes */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recent Classes</h4>
            <div className="space-y-2">
              {analytics.recentActivity.recentClasses.map((classItem) => (
                <div key={classItem._id} className="text-sm">
                  <div className="font-medium text-gray-900">{classItem.title}</div>
                  <div className="text-gray-500">{classItem.instructor?.fullName}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(classItem.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAdvancedAnalytics;