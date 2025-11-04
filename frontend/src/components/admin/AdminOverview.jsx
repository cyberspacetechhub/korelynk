import React from 'react';
import { Users, Mail, FolderOpen, TrendingUp, Calendar, MessageSquare, Eye, Heart, Code, BarChart3, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardSkeleton from '../skeletons/DashboardSkeleton';

const AdminOverview = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: async () => {
      const response = await axios.get('/analytics/dashboard');
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const stats = data?.stats || {};
  const charts = data?.charts || { monthlyData: [], categoryData: [], performanceData: [] };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen space-y-8 bg-gray-50">
      {/* Header */}
      <div className="p-8 text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-indigo-100">Welcome back! Here's your business performance at a glance.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{new Date().toLocaleDateString()}</div>
            <div className="text-indigo-200">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>

      
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Views */}
        <div className="p-6 transition-shadow bg-white border-l-4 border-blue-500 shadow-lg rounded-2xl hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-sm font-medium text-green-600">+12.5%</span>
              </div>
            </div>
            <div className="p-4 bg-blue-100 rounded-full">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Content Created */}
        <div className="p-6 transition-shadow bg-white border-l-4 border-green-500 shadow-lg rounded-2xl hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Content Created</p>
              <p className="text-3xl font-bold text-gray-900">{stats.blogs + stats.codeSamples}</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-sm font-medium text-green-600">+8.2%</span>
              </div>
            </div>
            <div className="p-4 bg-green-100 rounded-full">
              <Code className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className="p-6 transition-shadow bg-white border-l-4 border-purple-500 shadow-lg rounded-2xl hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Total Likes</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalLikes}</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-sm font-medium text-green-600">+15.3%</span>
              </div>
            </div>
            <div className="p-4 bg-purple-100 rounded-full">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Growth Rate */}
        <div className="p-6 transition-shadow bg-white border-l-4 border-orange-500 shadow-lg rounded-2xl hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-600">Growth Rate</p>
              <p className="text-3xl font-bold text-gray-900">+{stats.growthRate}%</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-sm font-medium text-green-600">This month</span>
              </div>
            </div>
            <div className="p-4 bg-orange-100 rounded-full">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
{/* Performance and Categories Charts */}
      <div className="flex flex-col justify-center gap-4 md:flex-row">
        {/* Bar Chart - Performance Metrics */}
        <div className="w-full md:w-[60%] p-6 bg-white shadow-lg rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Performance vs Targets</h3>
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="metric" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Bar 
                dataKey="current" 
                fill="#3B82F6" 
                name="Current" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="target" 
                fill="#E5E7EB" 
                name="Target" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Content Categories */}
        <div className="p-6 bg-white shadow-lg rounded-xl w-full md:w-[38%]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Content Categories</h3>
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={charts.categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {charts.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Contacts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.contacts}</p>
            </div>
          </div>
        </div>

        <div className="p-6 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.newsletter}</p>
            </div>
          </div>
        </div>

        <div className="p-6 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FolderOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.projects}</p>
            </div>
          </div>
        </div>

        <div className="p-6 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Tutorials</p>
              <p className="text-2xl font-bold text-gray-900">{stats.codeSamples}</p>
            </div>
          </div>
        </div>
      </div>


      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Contacts */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Contacts</h3>
            <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
              {stats.recentContacts?.length || 0} new
            </span>
          </div>
          <div className="space-y-4">
            {stats.recentContacts?.slice(0, 5).map((contact) => (
              <div key={contact._id} className="flex items-center p-4 transition-all bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-indigo-50 hover:to-purple-50">
                <div className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 ml-4">
                  <p className="font-semibold text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                    {contact.status || 'new'}
                  </span>
                  <p className="mt-1 text-xs text-gray-500">{formatDate(contact.createdAt)}</p>
                </div>
              </div>
            )) || (
              <div className="py-8 text-center text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No recent contacts</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Chart */}
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Content Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Blog Posts</span>
              <div className="flex items-center">
                <div className="w-32 h-2 mr-3 bg-gray-200 rounded-full">
                  <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{width: `${Math.min((stats.blogs / Math.max(stats.blogs + stats.codeSamples, 1)) * 100, 100)}%`}}></div>
                </div>
                <span className="font-semibold text-gray-900">{stats.blogs}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Code Tutorials</span>
              <div className="flex items-center">
                <div className="w-32 h-2 mr-3 bg-gray-200 rounded-full">
                  <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600" style={{width: `${Math.min((stats.codeSamples / Math.max(stats.blogs + stats.codeSamples, 1)) * 100, 100)}%`}}></div>
                </div>
                <span className="font-semibold text-gray-900">{stats.codeSamples}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Projects</span>
              <div className="flex items-center">
                <div className="w-32 h-2 mr-3 bg-gray-200 rounded-full">
                  <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600" style={{width: `${Math.min((stats.projects / Math.max(stats.projects + 10, 1)) * 100, 100)}%`}}></div>
                </div>
                <span className="font-semibold text-gray-900">{stats.projects}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Line Chart - Monthly Trends */}
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Monthly Content Trends</h3>
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={charts.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="blogs" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name="Blogs"
            />
            <Line 
              type="monotone" 
              dataKey="projects" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="Projects"
            />
            <Line 
              type="monotone" 
              dataKey="codeSamples" 
              stroke="#F59E0B" 
              strokeWidth={3}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              name="Code Samples"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminOverview;