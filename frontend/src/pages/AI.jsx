import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Zap } from 'lucide-react';
import SEO from '../components/SEO';

const AI = () => {
  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-midnight">
      <SEO 
        title="AI Tools - Coming Soon"
        description="InnTechLab AI platform launching soon. Revolutionary AI tools and automation for developers and businesses."
      />
      
      <div className="container px-6 py-20 mx-auto">
        <Link to="/" className="inline-flex items-center mb-8 text-gray-500 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-electric animate-pulse">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl font-display dark:text-white">
            InnTechLab AI
          </h1>
          
          <p className="mb-8 text-xl text-gray-500 dark:text-gray-400">
            Revolutionary AI tools and automation platform. Empowering developers and businesses with intelligent solutions.
          </p>
          
          <div className="inline-flex items-center px-6 py-3 text-gray-600 bg-gray-100 border border-gray-200 rounded-lg dark:bg-white/5 dark:border-white/10 dark:text-gray-300">
            <Zap className="w-5 h-5 mr-2 text-electric-violet" />
            In Development
          </div>
          
          <div className="grid gap-6 mt-16 md:grid-cols-3">
            <div className="p-6 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-xl">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">AI Automation</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Intelligent workflow automation</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-xl">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Smart Tools</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered development tools</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-xl">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">API Access</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Developer-friendly APIs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;