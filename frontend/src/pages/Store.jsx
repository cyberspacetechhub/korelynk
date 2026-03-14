import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Bell } from 'lucide-react';
import SEO from '../components/SEO';

const Store = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-midnight transition-colors">
      <SEO 
        title="Store - Coming Soon"
        description="InnTechLabs digital store launching soon. Stay tuned for innovative digital products and tools."
      />
      
      <div className="container mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-electric flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold font-display text-gray-900 dark:text-white mb-6">
            InnTechLabs Store
          </h1>
          
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
            Our digital marketplace is launching soon. Get ready for innovative tools, templates, and digital products.
          </p>
          
          <div className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-600 dark:text-gray-300">
            <Bell className="w-5 h-5 mr-2 text-electric-cyan" />
            Coming Soon
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Digital Products</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Premium templates and tools</p>
            </div>
            <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Code Assets</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ready-to-use components</p>
            </div>
            <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Resources</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Developer resources</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;