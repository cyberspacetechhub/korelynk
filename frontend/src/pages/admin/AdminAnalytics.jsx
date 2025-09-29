import React from 'react';
import { BarChart3, Users, Eye, TrendingUp, Globe, Code, MessageCircle, Heart } from 'lucide-react';
import { useQuery } from 'react-query';
import axios from '../../api/axios';

const AdminAnalytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const response = await axios.get('/analytics/dashboard');
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const stats = {
    codeSamples: {
      total: data?.stats?.codeSamples || 0,
      published: data?.stats?.codeSamples || 0,
      views: data?.stats?.totalViews || 0,
      likes: data?.stats?.totalLikes || 0,
      comments: data?.stats?.totalComments || 0
    },
    blogs: {
      total: data?.stats?.blogs || 0,
      published: data?.stats?.blogs || 0,
      views: data?.stats?.totalViews || 0
    },
    contacts: { total: data?.stats?.contacts || 0 },
    newsletter: { total: data?.stats?.newsletter || 0 },
    projects: { total: data?.stats?.projects || 0 }
  };

  return (
    <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Monitor your website performance and user engagement</p>
        </div>

        {/* Google Analytics Embed */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="flex items-center text-lg font-semibold text-gray-900">
              <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
              Google Analytics
            </h3>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              View Full Dashboard →
            </a>
          </div>
          
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center">
                <Code className="w-8 h-8 mr-3 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-600">Code Tutorials</p>
                  <p className="text-2xl font-bold text-blue-900">{isLoading ? '-' : stats.codeSamples.total}</p>
                  <p className="text-xs text-blue-600">{isLoading ? '-' : stats.codeSamples.published} published</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center">
                <Eye className="w-8 h-8 mr-3 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-600">Tutorial Views</p>
                  <p className="text-2xl font-bold text-green-900">{isLoading ? '-' : stats.codeSamples.views}</p>
                  <p className="text-xs text-green-600">Code tutorials</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50">
              <div className="flex items-center">
                <Heart className="w-8 h-8 mr-3 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-600">Total Likes</p>
                  <p className="text-2xl font-bold text-purple-900">{isLoading ? '-' : stats.codeSamples.likes}</p>
                  <p className="text-xs text-purple-600">Tutorial likes</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center">
                <MessageCircle className="w-8 h-8 mr-3 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-600">Comments</p>
                  <p className="text-2xl font-bold text-orange-900">{isLoading ? '-' : stats.codeSamples.comments}</p>
                  <p className="text-xs text-orange-600">Tutorial comments</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center">
                <Users className="w-8 h-8 mr-3 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Contacts</p>
                  <p className="text-2xl font-bold text-blue-900">{isLoading ? '-' : stats.contacts.total}</p>
                  <p className="text-xs text-blue-600">Contact submissions</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center">
                <Eye className="w-8 h-8 mr-3 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-600">Blog Views</p>
                  <p className="text-2xl font-bold text-green-900">{isLoading ? '-' : stats.blogs.views}</p>
                  <p className="text-xs text-green-600">Total blog views</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-600">Blog Posts</p>
                  <p className="text-2xl font-bold text-purple-900">{isLoading ? '-' : stats.blogs.total}</p>
                  <p className="text-xs text-purple-600">{isLoading ? '-' : stats.blogs.published} published</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center">
                <Globe className="w-8 h-8 mr-3 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-600">Newsletter</p>
                  <p className="text-2xl font-bold text-orange-900">{isLoading ? '-' : stats.newsletter.total}</p>
                  <p className="text-xs text-orange-600">Subscribers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Content Distribution Chart */}
            <div className="p-6 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">Content Distribution</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Code Tutorials</span>
                  <span className="text-sm font-semibold">{stats.codeSamples.total}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                    style={{ width: `${Math.min((stats.codeSamples.total / Math.max(stats.codeSamples.total + stats.blogs.total, 1)) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blog Posts</span>
                  <span className="text-sm font-semibold">{stats.blogs.total}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                    style={{ width: `${Math.min((stats.blogs.total / Math.max(stats.codeSamples.total + stats.blogs.total, 1)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">Engagement Metrics</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tutorial Views</span>
                  <span className="text-sm font-semibold">{stats.codeSamples.views}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 transition-all ease-out rounded-full bg-gradient-to-r from-purple-500 to-pink-600 duration-1500"
                    style={{ width: `${Math.min((stats.codeSamples.views / Math.max(stats.codeSamples.views + stats.blogs.views, 1)) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blog Views</span>
                  <span className="text-sm font-semibold">{stats.blogs.views}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 transition-all ease-out rounded-full bg-gradient-to-r from-orange-500 to-red-600 duration-1500"
                    style={{ width: `${Math.min((stats.blogs.views / Math.max(stats.codeSamples.views + stats.blogs.views, 1)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Metrics Grid */}
          <div className="p-6 mt-6 text-white bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 rounded-xl">
            <h4 className="flex items-center mb-6 text-lg font-semibold">
              <Code className="w-5 h-5 mr-2" />
              Developer Metrics Dashboard
            </h4>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="p-4 transition-all duration-300 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20">
                <div className="mb-1 text-2xl font-bold">{stats.codeSamples.likes}</div>
                <div className="text-sm opacity-80">Total Likes</div>
                <div className="w-full h-1 mt-2 rounded-full bg-white/20">
                  <div className="h-1 rounded-full bg-gradient-to-r from-pink-400 to-red-400 animate-pulse" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="p-4 transition-all duration-300 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20">
                <div className="mb-1 text-2xl font-bold">{stats.codeSamples.comments}</div>
                <div className="text-sm opacity-80">Comments</div>
                <div className="w-full h-1 mt-2 rounded-full bg-white/20">
                  <div className="h-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div className="p-4 transition-all duration-300 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20">
                <div className="mb-1 text-2xl font-bold">{stats.contacts.total}</div>
                <div className="text-sm opacity-80">Contacts</div>
                <div className="w-full h-1 mt-2 rounded-full bg-white/20">
                  <div className="h-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="p-4 transition-all duration-300 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20">
                <div className="mb-1 text-2xl font-bold">{stats.newsletter.total}</div>
                <div className="text-sm opacity-80">Subscribers</div>
                <div className="w-full h-1 mt-2 rounded-full bg-white/20">
                  <div className="h-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Analytics Tools</h3>
            <div className="space-y-3">
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 transition-colors rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-red-100 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Google Analytics</p>
                  <p className="text-sm text-gray-600">Website traffic and user behavior</p>
                </div>
              </a>
              
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 transition-colors rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-blue-100 rounded-lg">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Search Console</p>
                  <p className="text-sm text-gray-600">SEO performance and indexing</p>
                </div>
              </a>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">SEO Tools</h3>
            <div className="space-y-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                className="flex items-center p-3 transition-colors rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-green-100 rounded-lg">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">XML Sitemap</p>
                  <p className="text-sm text-gray-600">Search engine sitemap</p>
                </div>
              </a>
              
              <a
                href="/rss.xml"
                target="_blank"
                className="flex items-center p-3 transition-colors rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">RSS Feed</p>
                  <p className="text-sm text-gray-600">Blog content syndication</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AdminAnalytics;