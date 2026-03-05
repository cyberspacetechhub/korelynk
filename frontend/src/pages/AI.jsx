import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Zap } from 'lucide-react';
import SEO from '../components/SEO';

const AI = () => {
  return (
    <div className="min-h-screen bg-midnight">
      <SEO 
        title="AI Tools - Coming Soon"
        description="Korelynk AI platform launching soon. Revolutionary AI tools and automation for developers and businesses."
      />
      
      <div className="container mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-electric flex items-center justify-center animate-pulse">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-6">
            Korelynk AI
          </h1>
          
          <p className="text-xl text-gray-400 mb-8">
            Revolutionary AI tools and automation platform. Empowering developers and businesses with intelligent solutions.
          </p>
          
          <div className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300">
            <Zap className="w-5 h-5 mr-2 text-electric-violet" />
            In Development
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">AI Automation</h3>
              <p className="text-sm text-gray-400">Intelligent workflow automation</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Smart Tools</h3>
              <p className="text-sm text-gray-400">AI-powered development tools</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">API Access</h3>
              <p className="text-sm text-gray-400">Developer-friendly APIs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;