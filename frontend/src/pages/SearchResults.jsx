import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, FileText, Briefcase, User, Calendar, Eye } from 'lucide-react';
import axios from '../api/axios';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (query.trim().length >= 2) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/search?q=${encodeURIComponent(query)}&limit=20`);
      if (response.data.success) {
        setResults(response.data.data.results);
        setTotalResults(response.data.data.totalResults);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {totalResults > 0 
              ? `Found ${totalResults} result${totalResults !== 1 ? 's' : ''} for "${query}"`
              : `No results found for "${query}"`
            }
          </p>
        </div>

        {totalResults === 0 && query.length >= 2 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find anything matching your search. Try:
            </p>
            <ul className="text-left text-gray-600 space-y-1 max-w-md mx-auto">
              <li>• Checking your spelling</li>
              <li>• Using different keywords</li>
              <li>• Searching for more general terms</li>
              <li>• Browsing our categories instead</li>
            </ul>
          </div>
        )}

        {/* Results */}
        <div className="space-y-8">
          {/* Blog Results */}
          {results.blogs && results.blogs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-indigo-600" />
                Articles ({results.blogs.length})
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {results.blogs.map((blog) => (
                  <article key={blog._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover-lift">
                    {blog.featuredImage && (
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      {blog.category && (
                        <span 
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                          style={{ backgroundColor: blog.category.color }}
                        >
                          {blog.category.name}
                        </span>
                      )}
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        <Link to={blog.url} className="hover:text-indigo-600 transition-colors">
                          {blog.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {blog.author?.fullname}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(blog.publishedAt)}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {blog.views}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Project Results */}
          {results.projects && results.projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-indigo-600" />
                Projects ({results.projects.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.projects.map((project) => (
                  <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover-lift">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        <Link to={project.url} className="hover:text-indigo-600 transition-colors">
                          {project.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-xs text-gray-500">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Team Results */}
          {results.team && results.team.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-indigo-600" />
                Team Members ({results.team.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.team.map((member) => (
                  <div key={member._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover-lift">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <Link to={member.url} className="hover:text-indigo-600 transition-colors">
                        {member.name}
                      </Link>
                    </h3>
                    <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{member.bio}</p>
                    
                    {member.skills && (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {member.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{member.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;