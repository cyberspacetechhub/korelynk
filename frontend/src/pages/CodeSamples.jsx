import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Eye, MessageCircle, Filter, Search } from 'lucide-react';
import axios from '../api/axios';
import SEO from '../components/SEO';
import CardSkeleton from '../components/skeletons/CardSkeleton';

const CodeSamples = () => {
  const [codeSamples, setCodeSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    language: '',
    difficulty: '',
    search: ''
  });

  const languages = [
    { value: 'html', label: 'HTML', color: 'bg-orange-500' },
    { value: 'css', label: 'CSS', color: 'bg-blue-500' },
    { value: 'javascript', label: 'JavaScript', color: 'bg-yellow-500' },
    { value: 'react', label: 'React', color: 'bg-cyan-500' },
    { value: 'nodejs', label: 'Node.js', color: 'bg-green-500' },
    { value: 'python', label: 'Python', color: 'bg-indigo-500' },
    { value: 'php', label: 'PHP', color: 'bg-purple-500' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner', color: 'text-green-600' },
    { value: 'intermediate', label: 'Intermediate', color: 'text-yellow-600' },
    { value: 'advanced', label: 'Advanced', color: 'text-red-600' }
  ];

  useEffect(() => {
    fetchCodeSamples();
  }, [filters]);

  const fetchCodeSamples = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.language) params.append('language', filters.language);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      
      const response = await axios.get(`/code-samples?${params}`);
      if (response.data.success) {
        let samples = response.data.data.codeSamples || response.data.data || [];
        
        if (filters.search && Array.isArray(samples)) {
          samples = samples.filter(sample => 
            sample.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
            sample.description?.toLowerCase().includes(filters.search.toLowerCase())
          );
        }
        
        setCodeSamples(Array.isArray(samples) ? samples : []);
      }
    } catch (error) {
      console.error('Error fetching code samples:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageInfo = (lang) => {
    return languages.find(l => l.value === lang) || { label: lang, color: 'bg-gray-500' };
  };

  const getDifficultyInfo = (diff) => {
    return difficulties.find(d => d.value === diff) || { label: diff, color: 'text-gray-600' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 animate-pulse">
            <div className="grid md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          <CardSkeleton count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <SEO 
        title="Code Samples & Tutorials - Learn Programming"
        description="Explore our collection of code samples, tutorials, and educational content. Learn HTML, CSS, JavaScript, React, Node.js, Python, and more with interactive examples."
        keywords={['code samples', 'programming tutorials', 'HTML examples', 'CSS tutorials', 'JavaScript code', 'React examples']}
        url="/code-samples"
      />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Code Samples & Tutorials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn programming with our interactive code samples and tutorials
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search samples..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filters.language}
              onChange={(e) => setFilters({...filters, language: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Languages</option>
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
            
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Levels</option>
              {difficulties.map((diff) => (
                <option key={diff.value} value={diff.value}>{diff.label}</option>
              ))}
            </select>
            
            <button
              onClick={() => setFilters({ language: '', difficulty: '', search: '' })}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {codeSamples.length === 0 ? (
          <div className="text-center py-12">
            <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No code samples found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new content.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {codeSamples.map((sample) => {
              const langInfo = getLanguageInfo(sample.language);
              const diffInfo = getDifficultyInfo(sample.difficulty);
              
              return (
                <div key={sample._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${langInfo.color}`}>
                        {langInfo.label}
                      </span>
                      <span className={`text-sm font-medium ${diffInfo.color}`}>
                        {diffInfo.label}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      <Link to={`/code-samples/${sample.slug}`} className="hover:text-indigo-600 transition-colors">
                        {sample.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {sample.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {sample.views}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {sample.comments?.length || 0}
                        </div>
                      </div>
                    </div>
                    
                    {sample.tags && sample.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {sample.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Link
                      to={`/code-samples/${sample.slug}`}
                      className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      View Code & Preview
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeSamples;