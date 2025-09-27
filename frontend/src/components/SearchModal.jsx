import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, FileText, User, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      loadRecentSearches();
    }
  }, [isOpen]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch();
        getSuggestions();
      } else {
        setResults({});
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  const loadRecentSearches = () => {
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(recent.slice(0, 5));
  };

  const saveRecentSearch = (searchQuery) => {
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const updated = [searchQuery, ...recent.filter(s => s !== searchQuery)].slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const performSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/search?q=${encodeURIComponent(query)}&limit=5`);
      if (response.data.success) {
        setResults(response.data.data.results);
        saveRecentSearch(query);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async () => {
    try {
      const response = await axios.get(`/search/suggestions?q=${encodeURIComponent(query)}`);
      if (response.data.success) {
        setSuggestions(response.data.data.suggestions);
      }
    } catch (error) {
      console.error('Suggestions error:', error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'blog': return <FileText className="w-4 h-4" />;
      case 'project': return <Briefcase className="w-4 h-4" />;
      case 'team': return <User className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const handleResultClick = () => {
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, projects, team members..."
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
            />
            <button
              onClick={onClose}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Content */}
        <div className="max-h-96 overflow-y-auto">
          {loading && (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Searching...</p>
            </div>
          )}

          {!loading && query.length >= 2 && Object.keys(results).length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-600">No results found for "{query}"</p>
            </div>
          )}

          {!loading && query.length >= 2 && Object.keys(results).length > 0 && (
            <div className="p-4">
              {/* Blog Results */}
              {results.blogs && results.blogs.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Articles ({results.blogs.length})
                  </h3>
                  <div className="space-y-2">
                    {results.blogs.map((blog) => (
                      <Link
                        key={blog._id}
                        to={blog.url}
                        onClick={handleResultClick}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="text-indigo-600 mr-3 mt-1">
                            {getIcon('blog')}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 line-clamp-1">{blog.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{blog.excerpt}</p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <span>{blog.author?.fullname}</span>
                              {blog.category && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span>{blog.category.name}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Results */}
              {results.projects && results.projects.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Projects ({results.projects.length})
                  </h3>
                  <div className="space-y-2">
                    {results.projects.map((project) => (
                      <Link
                        key={project._id}
                        to={project.url}
                        onClick={handleResultClick}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="text-indigo-600 mr-3 mt-1">
                            {getIcon('project')}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{project.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{project.description}</p>
                            {project.technologies && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {project.technologies.slice(0, 3).map((tech, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Results */}
              {results.team && results.team.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Team ({results.team.length})
                  </h3>
                  <div className="space-y-2">
                    {results.team.map((member) => (
                      <Link
                        key={member._id}
                        to={member.url}
                        onClick={handleResultClick}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="text-indigo-600 mr-3 mt-1">
                            {getIcon('team')}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{member.name}</h4>
                            <p className="text-sm text-indigo-600">{member.role}</p>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{member.bio}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Suggestions and Recent Searches */}
          {query.length < 2 && (
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Recent Searches
                  </h3>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="flex items-center w-full p-2 text-left rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Clock className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-gray-700">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {suggestions.length > 0 && query.length >= 2 && (
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Suggestions
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;