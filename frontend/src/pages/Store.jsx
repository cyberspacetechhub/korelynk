import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Bell } from 'lucide-react';
import SEO from '../components/SEO';

const Store = () => {
  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-midnight">
      <SEO 
        title="Store - Coming Soon"
        description="InnTechLab digital store launching soon. Stay tuned for innovative digital products and tools."
      />
      
      <div className="container px-6 py-20 mx-auto">
        <Link to="/" className="inline-flex items-center mb-8 text-gray-500 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-electric">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl font-display dark:text-white">
            InnTechLab Store
          </h1>
          
          <p className="mb-8 text-xl text-gray-500 dark:text-gray-400">
            Our digital marketplace is launching soon. Get ready for innovative tools, templates, and digital products.
          </p>
          
          <div className="inline-flex items-center px-6 py-3 text-gray-600 bg-gray-100 border border-gray-200 rounded-lg dark:bg-white/5 dark:border-white/10 dark:text-gray-300">
            <Bell className="w-5 h-5 mr-2 text-electric-cyan" />
            Coming Soon
          </div>
          
          <div className="grid gap-6 mt-16 md:grid-cols-3">
            <div className="p-6 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-xl">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Digital Products</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Premium templates and tools</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-xl">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Code Assets</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ready-to-use components</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-xl">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Resources</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Developer resources</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;