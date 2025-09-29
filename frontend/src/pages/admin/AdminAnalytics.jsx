import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, TrendingUp, Globe, Code, MessageCircle, Heart } from 'lucide-react';
import axios from '../../api/axios';

const AdminAnalytics = () => {
  const [stats, setStats] = useState({
    codeSamples: { total: 0, published: 0, views: 0, likes: 0, comments: 0 },
    blogs: { total: 0, published: 0, views: 0 },
    contacts: { total: 0 },
    newsletter: { total: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [codeSamplesRes, blogsRes, contactsRes, newsletterRes] = await Promise.all([
        axios.get('/code-samples/admin/all'),
        axios.get('/blog/admin/all'),
        axios.get('/admin/contacts'),
        axios.get('/admin/newsletter')
      ]);

      const codeSamples = codeSamplesRes.data.data?.codeSamples || codeSamplesRes.data.data || [];
      const blogs = blogsRes.data.data?.blogs || blogsRes.data.data || [];
      const contacts = contactsRes.data.data?.contacts || contactsRes.data.data || [];
      const newsletter = newsletterRes.data.data?.subscribers || newsletterRes.data.data || [];

      setStats({
        codeSamples: {
          total: codeSamples.length,
          published: codeSamples.filter(c => c.status === 'published').length,
          views: codeSamples.reduce((sum, c) => sum + (c.views || 0), 0),
          likes: codeSamples.reduce((sum, c) => sum + (c.likes || 0), 0),
          comments: codeSamples.reduce((sum, c) => sum + (c.comments?.length || 0), 0)
        },
        blogs: {
          total: blogs.length,
          published: blogs.filter(b => b.status === 'published').length,
          views: blogs.reduce((sum, b) => sum + (b.views || 0), 0)
        },
        contacts: { total: contacts.length },
        newsletter: { total: newsletter.length }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Monitor your website performance and user engagement</p>
        </div>

        {/* Google Analytics Embed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
              Google Analytics
            </h3>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              View Full Dashboard →
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Code className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Code Tutorials</p>
                  <p className="text-2xl font-bold text-blue-900">{loading ? '-' : stats.codeSamples.total}</p>
                  <p className="text-xs text-blue-600">{loading ? '-' : stats.codeSamples.published} published</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Eye className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Tutorial Views</p>
                  <p className="text-2xl font-bold text-green-900">{loading ? '-' : stats.codeSamples.views}</p>
                  <p className="text-xs text-green-600">Code tutorials</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Heart className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Total Likes</p>
                  <p className="text-2xl font-bold text-purple-900">{loading ? '-' : stats.codeSamples.likes}</p>
                  <p className="text-xs text-purple-600">Tutorial likes</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <MessageCircle className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm text-orange-600 font-medium">Comments</p>
                  <p className="text-2xl font-bold text-orange-900">{loading ? '-' : stats.codeSamples.comments}</p>
                  <p className="text-xs text-orange-600">Tutorial comments</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Contacts</p>
                  <p className="text-2xl font-bold text-blue-900">{loading ? '-' : stats.contacts.total}</p>
                  <p className="text-xs text-blue-600">Contact submissions</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Eye className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Blog Views</p>
                  <p className="text-2xl font-bold text-green-900">{loading ? '-' : stats.blogs.views}</p>
                  <p className="text-xs text-green-600">Total blog views</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Blog Posts</p>
                  <p className="text-2xl font-bold text-purple-900">{loading ? '-' : stats.blogs.total}</p>
                  <p className="text-xs text-purple-600">{loading ? '-' : stats.blogs.published} published</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Globe className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm text-orange-600 font-medium">Newsletter</p>
                  <p className="text-2xl font-bold text-orange-900">{loading ? '-' : stats.newsletter.total}</p>
                  <p className="text-xs text-orange-600">Subscribers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Content Distribution Chart */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Content Distribution</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Code Tutorials</span>
                  <span className="text-sm font-semibold">{stats.codeSamples.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min((stats.codeSamples.total / Math.max(stats.codeSamples.total + stats.blogs.total, 1)) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blog Posts</span>
                  <span className="text-sm font-semibold">{stats.blogs.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min((stats.blogs.total / Math.max(stats.codeSamples.total + stats.blogs.total, 1)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tutorial Views</span>
                  <span className="text-sm font-semibold">{stats.codeSamples.views}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-1500 ease-out"
                    style={{ width: `${Math.min((stats.codeSamples.views / Math.max(stats.codeSamples.views + stats.blogs.views, 1)) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blog Views</span>
                  <span className="text-sm font-semibold">{stats.blogs.views}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-1500 ease-out"
                    style={{ width: `${Math.min((stats.blogs.views / Math.max(stats.codeSamples.views + stats.blogs.views, 1)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Metrics Grid */}
          <div className="mt-6 bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 rounded-xl p-6 text-white">
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Developer Metrics Dashboard
            </h4>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl font-bold mb-1">{stats.codeSamples.likes}</div>
                <div className="text-sm opacity-80">Total Likes</div>
                <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                  <div className="bg-gradient-to-r from-pink-400 to-red-400 h-1 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl font-bold mb-1">{stats.codeSamples.comments}</div>
                <div className="text-sm opacity-80">Comments</div>
                <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl font-bold mb-1">{stats.contacts.total}</div>
                <div className="text-sm opacity-80">Contacts</div>
                <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-1 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl font-bold mb-1">{stats.newsletter.total}</div>
                <div className="text-sm opacity-80">Subscribers</div>
                <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Tools</h3>
            <div className="space-y-3">
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
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
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Search Console</p>
                  <p className="text-sm text-gray-600">SEO performance and indexing</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Tools</h3>
            <div className="space-y-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
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
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
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