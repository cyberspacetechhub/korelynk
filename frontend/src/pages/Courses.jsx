import BrandedPlaceholder from '../components/BrandedPlaceholder';
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
        <div className="container relative px-6 mx-auto text-center">
          <h1 className="mb-6 text-5xl font-bold text-white lg:text-6xl font-display">
            Learn. Build. Succeed.
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-300 lg:text-2xl">
            Master programming and development skills with our expert-led online courses
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-white/10">
        <div className="container px-6 mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center text-gray-300">
              <Filter className="w-5 h-5 mr-2" />
              <span className="font-medium">Filter by:</span>
            </div>
            
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-4 py-2 text-white transition-all border rounded-lg bg-white/5 border-white/10 focus:ring-2 focus:ring-electric-cyan focus:border-transparent"
            >
              <option value="" className="bg-gray-900">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-900">{category}</option>
              ))}
            </select>
            
            <select
              value={filters.level}
              onChange={(e) => setFilters({...filters, level: e.target.value})}
              className="px-4 py-2 text-white transition-all border rounded-lg bg-white/5 border-white/10 focus:ring-2 focus:ring-electric-cyan focus:border-transparent"
            >
              <option value="" className="bg-gray-900">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level} className="bg-gray-900">{level}</option>
              ))}
            </select>
            
            <button
              onClick={() => setFilters({ category: '', level: '' })}
              className="px-4 py-2 transition-colors text-electric-cyan hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container px-6 mx-auto">
          {loading ? (
            <CardSkeleton count={6} />
          ) : (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <div key={course._id} className="overflow-hidden transition-all duration-300 border group bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20">
                  <div className="relative h-48 overflow-hidden">
                    <BrandedPlaceholder
                          title={course.title}
                          subtitle={course.category}
                          className="h-48"
                          aspectRatio="16/9"
                        />
                    
                    {course.introVideo && (
                      <Link 
                        to={`/courses/${course._id}`}
                        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100"
                      >
                        <div className="flex items-center justify-center w-16 h-16 transition-transform bg-white rounded-full hover:scale-110">
                          <Play className="w-6 h-6 ml-1 text-electric-blue" fill="currentColor" />
                        </div>
                      </Link>
                    )}
                    
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-black/70 backdrop-blur-sm">
                        {course.level}
                      </span>
                    </div>
                    
                    {course.introVideo && (
                      <div className="absolute top-3 right-3">
                        <span className="flex items-center px-3 py-1 text-xs font-medium text-white rounded-full bg-electric-violet">
                          <Play className="w-3 h-3 mr-1" fill="currentColor" />
                          Video
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-electric-blue/20 text-electric-cyan">
                        {course.category}
                      </span>
                      <span className="text-2xl font-bold text-white font-display">
                        ₦{course.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <h3 className="mb-3 text-xl font-bold text-white transition-colors font-display group-hover:text-electric-cyan">
                      {course.title}
                    </h3>
                    
                    <p className="mb-4 text-gray-400 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-6 text-sm text-gray-400">
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
                      className="block w-full px-6 py-3 font-semibold text-center text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && filteredCourses.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-400">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;