import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, Users, Star, Calendar, Filter, Play } from 'lucide-react';
import axios from '../api/axios';
import SEO from '../components/SEO';
import CardSkeleton from '../components/skeletons/CardSkeleton';

const Courses = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    level: searchParams.get('level') || ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    // Update filters from URL params
    setFilters({
      category: searchParams.get('category') || '',
      level: searchParams.get('level') || ''
    });
  }, [searchParams]);

  useEffect(() => {
    filterCourses();
  }, [courses, filters]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/courses');
      if (response.data.success) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;
    
    if (filters.category) {
      filtered = filtered.filter(course => course.category === filters.category);
    }
    
    if (filters.level) {
      filtered = filtered.filter(course => course.level === filters.level);
    }
    
    setFilteredCourses(filtered);
  };

  const categories = ['Web Development', 'Mobile Development', 'Backend Development', 'Database', 'DevOps', 'UI/UX Design'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-midnight">
      <SEO 
        title="Online Courses - Learn Programming & Development"
        description="Master programming with our comprehensive online courses. From web development to mobile apps, learn from industry experts."
        url="/courses"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Learn. Build. Succeed.
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
            Master programming and development skills with our expert-led online courses
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center text-gray-300">
              <Filter className="w-5 h-5 mr-2" />
              <span className="font-medium">Filter by:</span>
            </div>
            
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
            >
              <option value="" className="bg-gray-900">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-900">{category}</option>
              ))}
            </select>
            
            <select
              value={filters.level}
              onChange={(e) => setFilters({...filters, level: e.target.value})}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
            >
              <option value="" className="bg-gray-900">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level} className="bg-gray-900">{level}</option>
              ))}
            </select>
            
            <button
              onClick={() => setFilters({ category: '', level: '' })}
              className="px-4 py-2 text-electric-cyan hover:text-white transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {loading ? (
            <CardSkeleton count={6} />
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course._id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="h-48 relative overflow-hidden">
                    {course.featuredImage ? (
                      <img 
                        src={course.featuredImage} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="h-full bg-gradient-electric flex items-center justify-center">
                        <div className="text-white text-center">
                          <h3 className="text-xl font-bold mb-2">{course.category}</h3>
                          <div className="text-white/80">{course.level}</div>
                        </div>
                      </div>
                    )}
                    
                    {course.introVideo && (
                      <Link 
                        to={`/courses/${course._id}`}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-electric-blue ml-1" fill="currentColor" />
                        </div>
                      </Link>
                    )}
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {course.level}
                      </span>
                    </div>
                    
                    {course.introVideo && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-electric-violet text-white text-xs font-medium rounded-full flex items-center">
                          <Play className="w-3 h-3 mr-1" fill="currentColor" />
                          Video
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-electric-blue/20 text-electric-cyan text-sm font-medium rounded-full">
                        {course.category}
                      </span>
                      <span className="text-2xl font-bold font-display text-white">
                        ₦{course.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-electric-cyan transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.currentEnrollments}/{course.maxStudents}
                      </div>
                    </div>
                    
                    <Link
                      to={`/courses/${course._id}`}
                      className="block w-full bg-gradient-electric text-white py-3 px-6 rounded-lg font-semibold text-center hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;