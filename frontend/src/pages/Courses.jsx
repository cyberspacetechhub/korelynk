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
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Online Courses - Learn Programming & Development"
        description="Master programming with our comprehensive online courses. From web development to mobile apps, learn from industry experts."
        url="/courses"
      />
      
      {/* Hero Section */}
      <section className="py-20 text-white relative" style={{
        backgroundImage: 'url(/korelynk-workspace.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Learn. Build. Succeed.
          </h1>
          <p className="text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto">
            Master programming and development skills with our expert-led online courses
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center text-gray-700">
              <Filter className="w-5 h-5 mr-2" />
              <span className="font-medium">Filter by:</span>
            </div>
            
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={filters.level}
              onChange={(e) => setFilters({...filters, level: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            
            <button
              onClick={() => setFilters({ category: '', level: '' })}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800"
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
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredCourses.map((course) => (
                <div key={course._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
                  <div className="h-48 relative overflow-hidden group">
                    {course.featuredImage ? (
                      <img 
                        src={course.featuredImage} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <div className="text-white text-center">
                          <h3 className="text-xl font-bold mb-2">{course.category}</h3>
                          <div className="text-indigo-200">{course.level}</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Video Play Button Overlay */}
                    {course.introVideo && (
                      <Link 
                        to={`/courses/${course._id}`}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-indigo-600 ml-1" fill="currentColor" />
                        </div>
                      </Link>
                    )}
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                        {course.level}
                      </span>
                    </div>
                    
                    {/* Video indicator badge */}
                    {course.introVideo && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full flex items-center">
                          <Play className="w-3 h-3 mr-1" fill="currentColor" />
                          Video
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                        {course.category}
                      </span>
                      <span className="text-2xl font-bold text-indigo-600">
                        ₦{course.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.currentEnrollments}/{course.maxStudents}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(course.startDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Link
                        to={`/courses/${course._id}`}
                        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors inline-block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;