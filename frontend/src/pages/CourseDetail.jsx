import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, Calendar, CheckCircle, User, ArrowLeft } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import SEO from '../components/SEO';
import DetailSkeleton from '../components/skeletons/DetailSkeleton';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    experience: '',
    motivation: '',
    availability: ''
  });

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`/courses/${id}`);
      if (response.data.success) {
        setCourse(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollment = async (e) => {
    e.preventDefault();
    setEnrolling(true);

    try {
      const enrollmentData = {
        ...formData,
        course: id
      };

      const response = await axios.post('/enrollments', enrollmentData);
      if (response.data.success) {
        toast.success('Enrollment submitted successfully! Check your email for confirmation.');
        setShowEnrollForm(false);
        setFormData({
          studentName: '',
          email: '',
          phone: '',
          experience: '',
          motivation: '',
          availability: ''
        });
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit enrollment');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="py-20 bg-gray-200 animate-pulse">
          <div className="container mx-auto px-6">
            <div className="h-6 bg-gray-300 rounded w-32 mb-6"></div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-6 bg-gray-300 rounded w-20"></div>
                  <div className="h-6 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="h-12 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-full"></div>
                <div className="flex gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-300 rounded w-20"></div>
                  ))}
                </div>
              </div>
              <div className="h-80 bg-gray-300 rounded-2xl"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 py-20">
          <DetailSkeleton />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Link to="/courses" className="text-indigo-600 hover:text-indigo-800">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${course.title} - Online Course`}
        description={course.description}
        url={`/courses/${id}`}
      />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
        <div className="container mx-auto px-6">
          <Link to="/courses" className="inline-flex items-center text-indigo-200 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {course.level}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {course.title}
              </h1>
              
              <p className="text-xl text-indigo-100 mb-8">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-6 text-indigo-200">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {course.currentEnrollments}/{course.maxStudents} enrolled
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Starts {new Date(course.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {typeof course.instructor === 'object' ? course.instructor.fullName : course.instructor}
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              {/* Featured Image/Video */}
              {course.featuredImage && (
                <div className="relative mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={course.featuredImage} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  {course.introVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors cursor-pointer group"
                         onClick={() => setShowVideo(true)}>
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-l-[16px] border-l-indigo-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                      </div>
                      <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-pulse"></div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">₦{course.price?.toLocaleString()}</div>
                <div className="text-indigo-200">One-time payment</div>
              </div>
              
              {course.isFullyBooked ? (
                <button disabled className="w-full bg-gray-500 text-white py-4 px-6 rounded-lg font-semibold">
                  Course Full
                </button>
              ) : (
                <div className="space-y-3">
                  <Link
                    to={`/student/courses/${id}/enroll`}
                    className="w-full bg-white text-indigo-900 py-4 px-6 rounded-lg font-semibold hover:bg-indigo-50 transition-colors block text-center"
                  >
                    Enroll Now
                  </Link>
                  <p className="text-indigo-200 text-sm text-center">
                    Account required for course access and updates
                  </p>
                </div>
              )}
              
              <div className="mt-4 text-center text-indigo-200 text-sm">
                {course.availableSpots} spots remaining
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Learning Outcomes */}
              {course.learningOutcomes?.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Curriculum */}
              {course.curriculum?.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                  <div className="space-y-4">
                    {course.curriculum.map((week, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Week {week.week}: {week.title}
                        </h3>
                        <ul className="text-gray-600 space-y-1">
                          {week.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {/* Prerequisites */}
              {course.prerequisites?.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Prerequisites</h3>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 mt-2"></div>
                        <span className="text-gray-600">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              {course.skills?.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills You'll Learn</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Info */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Instructor:</span>
                    <span className="font-medium">{typeof course.instructor === 'object' ? course.instructor.fullName : course.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">{new Date(course.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-medium">{new Date(course.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      {showEnrollForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enroll in {course.title}</h2>
              
              <form onSubmit={handleEnrollment} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Programming Experience *
                  </label>
                  <select
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select your level</option>
                    <option value="None">No experience</option>
                    <option value="Basic">Basic knowledge</option>
                    <option value="Intermediate">Some experience</option>
                    <option value="Advanced">Advanced level</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to take this course? *
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.motivation}
                    onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tell us about your goals and motivation..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Availability *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.availability}
                    onChange={(e) => setFormData({...formData, availability: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Weekends, Evenings, 10-15 hours per week"
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEnrollForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={enrolling}
                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {enrolling ? 'Submitting...' : 'Submit Enrollment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideo && course.introVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>
            <video 
              src={course.introVideo} 
              controls 
              autoPlay
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;