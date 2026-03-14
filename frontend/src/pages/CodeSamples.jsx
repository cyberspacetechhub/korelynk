import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Eye, MessageCircle, Search } from 'lucide-react';
import axios from '../api/axios';
import SEO from '../components/SEO';
import CardSkeleton from '../components/skeletons/CardSkeleton';

const CodeSamples = () => {
  const [codeSamples, setCodeSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ language: '', difficulty: '', search: '' });

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
    { value: 'beginner', label: 'Beginner', color: 'text-green-600 dark:text-green-400' },
    { value: 'intermediate', label: 'Intermediate', color: 'text-yellow-600 dark:text-yellow-400' },
    { value: 'advanced', label: 'Advanced', color: 'text-red-600 dark:text-red-400' }
  ];

  useEffect(() => { fetchCodeSamples(); }, [filters]);

  const fetchCodeSamples = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.language) params.append('language', filters.language);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      const response = await axios.get(`/code-samples?${params}`);
      if (response.data.success) {
        let samples = response.data.data.codeSamples || response.data.data || [];
        if (filters.search && Array.isArray(samples)) {
          samples = samples.filter(s =>
            s.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
            s.description?.toLowerCase().includes(filters.search.toLowerCase())
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

  const getLanguageInfo = (lang) => languages.find(l => l.value === lang) || { label: lang, color: 'bg-gray-500' };
  const getDifficultyInfo = (diff) => difficulties.find(d => d.value === diff) || { label: diff, color: 'text-gray-500' };

  const inputClass = "px-4 py-2 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all";

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-midnight transition-colors py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 dark:bg-white/10 rounded w-96 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-80 mx-auto animate-pulse"></div>
          </div>
          <CardSkeleton count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-midnight transition-colors py-16">
      <SEO
        title="Code Samples & Tutorials - Learn Programming"
        description="Explore our collection of code samples, tutorials, and educational content."
        keywords={['code samples', 'programming tutorials', 'HTML examples', 'CSS tutorials']}
        url="/code-samples"
      />

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6">
            Code Samples & Tutorials
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            Learn programming with our interactive code samples and tutorials
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search samples..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className={`w-full pl-10 pr-4 ${inputClass}`}
              />
            </div>
            <select value={filters.language} onChange={(e) => setFilters({ ...filters, language: e.target.value })} className={`w-full ${inputClass}`}>
              <option value="" className="bg-white dark:bg-gray-900">All Languages</option>
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value} className="bg-white dark:bg-gray-900">{lang.label}</option>
              ))}
            </select>
            <select value={filters.difficulty} onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })} className={`w-full ${inputClass}`}>
              <option value="" className="bg-white dark:bg-gray-900">All Levels</option>
              {difficulties.map((diff) => (
                <option key={diff.value} value={diff.value} className="bg-white dark:bg-gray-900">{diff.label}</option>
              ))}
            </select>
            <button
              onClick={() => setFilters({ language: '', difficulty: '', search: '' })}
              className="px-4 py-2 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {codeSamples.length === 0 ? (
          <div className="text-center py-12">
            <Code className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No code samples found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or check back later for new content.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {codeSamples.map((sample) => {
              const langInfo = getLanguageInfo(sample.language);
              const diffInfo = getDifficultyInfo(sample.difficulty);
              return (
                <div key={sample._id} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${langInfo.color}`}>
                        {langInfo.label}
                      </span>
                      <span className={`text-sm font-medium ${diffInfo.color}`}>{diffInfo.label}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      <Link to={`/code-samples/${sample.slug}`} className="hover:text-electric-cyan transition-colors">
                        {sample.title}
                      </Link>
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">{sample.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center"><Eye className="w-4 h-4 mr-1" />{sample.views}</div>
                        <div className="flex items-center"><MessageCircle className="w-4 h-4 mr-1" />{sample.comments?.length || 0}</div>
                      </div>
                    </div>
                    {sample.tags && sample.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {sample.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-xs rounded border border-gray-200 dark:border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      to={`/code-samples/${sample.slug}`}
                      className="block w-full text-center bg-gradient-electric text-white py-2 rounded-lg hover:shadow-lg hover:shadow-electric-blue/50 transition-all font-medium"
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
