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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 ml-3">
                  <div className="h-6 mb-1 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow">
              <div className="w-32 h-6 mb-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="bg-gray-200 rounded h-72 animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow">
              <div className="w-32 h-6 mb-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 bg-gray-200 rounded-full animate-pulse"></div>
                      <div>
                        <div className="w-24 h-4 mb-1 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-4 mb-1 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Analytics Unavailable</h2>
          <p className="text-gray-600">Unable to load analytics data.</p>
        </div>
      </div>
    );
  }

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
        <div className="p-4 bg-white rounded-lg shadow">
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

        <div className="p-4 bg-white rounded-lg shadow">
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

        <div className="p-4 bg-white rounded-lg shadow">
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

        <div className="p-4 bg-white rounded-lg shadow">
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

        <div className="p-4 bg-white rounded-lg shadow">
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

        <div className="p-4 bg-white rounded-lg shadow">
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

        <div className="p-4 bg-white rounded-lg shadow">
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
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enrollment Trends */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Enrollment Trends</h3>
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
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Popular Courses</h3>
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
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Submission Status Distribution */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Submission Status</h3>
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
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Grade Trends</h3>
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
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Instructors */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Instructors</h3>
          <div className="space-y-3">
            {analytics.instructors.topInstructors.map((instructor, index) => (
              <div key={instructor._id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-purple-100 rounded-full">
                    <span className="text-sm font-medium text-purple-600">
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
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Performing Classes</h3>
          <div className="space-y-3">
            {analytics.classes.topPerformingClasses.map((classItem, index) => (
              <div key={classItem._id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
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
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Recent Enrollments */}
          <div>
            <h4 className="mb-3 font-medium text-gray-900">Recent Enrollments</h4>
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
            <h4 className="mb-3 font-medium text-gray-900">Recent Submissions</h4>
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
            <h4 className="mb-3 font-medium text-gray-900">Recent Classes</h4>
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