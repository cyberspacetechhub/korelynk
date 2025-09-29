import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Play, ArrowRight, Zap } from 'lucide-react';
import axios from '../api/axios';

const CodeSamplesPreview = () => {
  const [codeSamples, setCodeSamples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestCodeSamples();
  }, []);

  const fetchLatestCodeSamples = async () => {
    try {
      const response = await axios.get('/code-samples?limit=3');
      if (response.data.success) {
        setCodeSamples(response.data.data.codeSamples);
      }
    } catch (error) {
      console.error('Error fetching code samples:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      html: 'from-orange-500 to-red-500',
      css: 'from-blue-500 to-indigo-500',
      javascript: 'from-yellow-500 to-orange-500',
      react: 'from-cyan-500 to-blue-500',
      nodejs: 'from-green-500 to-emerald-500',
      python: 'from-indigo-500 to-purple-500',
      php: 'from-purple-500 to-pink-500'
    };
    return colors[language] || 'from-gray-500 to-gray-600';
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-3"></div>
            <div className="h-6 bg-gray-300 rounded mb-3"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (codeSamples.length === 0) {
    return (
      <div className="text-center py-12">
        <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">No code tutorials available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {codeSamples.map((sample, index) => (
        <div key={sample._id} className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
          <div className={`absolute inset-0 bg-gradient-to-br ${getLanguageColor(sample.language)} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
          
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getLanguageColor(sample.language)}`}>
                {sample.language.toUpperCase()}
              </span>
              <div className="flex items-center text-gray-500">
                <Zap className="w-4 h-4 mr-1" />
                <span className="text-xs capitalize">{sample.difficulty}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {sample.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {sample.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <Play className="w-3 h-3 mr-1" />
                {sample.views} views
              </div>
              
              <Link
                to={`/code-samples/${sample.slug}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform"
              >
                Try it
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CodeSamplesPreview;