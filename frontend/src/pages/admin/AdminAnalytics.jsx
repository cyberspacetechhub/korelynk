import React from 'react';
import { BarChart3, Users, Eye, TrendingUp, Globe } from 'lucide-react';

const AdminAnalytics = () => {
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
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-blue-900">-</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Eye className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Page Views</p>
                  <p className="text-2xl font-bold text-green-900">-</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Bounce Rate</p>
                  <p className="text-2xl font-bold text-purple-900">-</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Globe className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm text-orange-600 font-medium">Sessions</p>
                  <p className="text-2xl font-bold text-orange-900">-</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Google Analytics Integration</h4>
            <p className="text-gray-600 mb-4">
              To view detailed analytics, please set up Google Analytics and replace the tracking ID in the GoogleAnalytics component.
            </p>
            <div className="bg-white rounded-lg p-4 text-left">
              <p className="text-sm text-gray-700 mb-2"><strong>Setup Instructions:</strong></p>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Create a Google Analytics 4 property</li>
                <li>Get your GA4 Measurement ID (G-XXXXXXXXXX)</li>
                <li>Update the tracking ID in <code className="bg-gray-100 px-1 rounded">GoogleAnalytics.jsx</code></li>
                <li>Deploy the changes to see live data</li>
              </ol>
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