import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Globe, Database, Cloud, Shield, Star } from 'lucide-react';
import { useQuery } from 'react-query';
import axios from '../../api/axios';
import SEO from '../SEO';

const TestimonialSection = () => {
  const { data: testimonials = [], isLoading, error } = useQuery(
    'testimonials',
    () => axios.get('feedback/testimonials').then(res => res.data.data || []),
    {
      onError: (error) => {
        console.error('Testimonials fetch error:', error);
      }
    }
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (index) => {
    const colors = ['bg-indigo-600', 'bg-purple-600', 'bg-green-600', 'bg-blue-600', 'bg-pink-600', 'bg-yellow-600'];
    return colors[index % colors.length];
  };

  // Fallback testimonials when no real ones exist
  const fallbackTestimonials = [
    {
      _id: 'fallback-1',
      name: 'Sarah Johnson',
      message: 'Cyberspace Tech Hub delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail is remarkable.',
      rating: 5
    },
    {
      _id: 'fallback-2', 
      name: 'Michael Chen',
      message: 'Professional team with excellent technical skills. They transformed our business with their innovative solutions.',
      rating: 5
    },
    {
      _id: 'fallback-3',
      name: 'Emily Rodriguez', 
      message: 'Outstanding service and support. The mobile app they developed has significantly improved our customer engagement.',
      rating: 5
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayTestimonials.slice(0, 3).map((testimonial, index) => (
            <div key={testimonial._id} className="bg-white p-8 rounded-xl shadow-lg hover-lift">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${
                    i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`} />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-lg italic">
                "{testimonial.message}"
              </p>
              <div className="flex items-center">
                <div className={`w-12 h-12 ${getRandomColor(index)} rounded-full flex items-center justify-center mr-4`}>
                  <span className="font-bold text-white text-sm">{getInitials(testimonial.name)}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">Valued Client</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/feedback"
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 inline-flex items-center"
          >
            Share Your Feedback
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [services, setServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, projectsRes] = await Promise.all([
        axios.get('/services'),
        axios.get('/projects?featured=true')
      ]);
      
      if (servicesRes.data.success) {
        setServices(servicesRes.data.data.slice(0, 4)); // Show only first 4
      }
      
      if (projectsRes.data.success) {
        setFeaturedProjects(projectsRes.data.data.slice(0, 3)); // Show only first 3
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (title) => {
    switch (title.toLowerCase()) {
      case 'web development': return <Globe className="w-8 h-8" />;
      case 'mobile development': return <Smartphone className="w-8 h-8" />;
      case 'backend development': return <Database className="w-8 h-8" />;
      case 'cloud solutions': return <Cloud className="w-8 h-8" />;
      default: return <Code className="w-8 h-8" />;
    }
  };

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "3+", label: "Years Experience" },
    { number: "99%", label: "Client Satisfaction" }
  ];



  return (
    <div className="min-h-screen">
      <SEO 
        title="Professional Web & Mobile Development Services"
        description="Transform your business with cutting-edge web development, mobile apps, and digital solutions. Expert React, Node.js, and full-stack development services worldwide for global clients and diaspora."
        keywords={[
          'web development services',
          'mobile app development',
          'React development company',
          'Node.js developers',
          'full stack development',
          'UI UX design services',
          'e-commerce development',
          'custom software development',
          'digital transformation',
          'tech consulting',
          'remote development team',
          'offshore development',
          'global tech solutions'
        ]}
        url="/"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Building Digital
                <span className="gradient-text block">Excellence</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-indigo-100 leading-relaxed">
                We create innovative web and mobile solutions that drive business growth and deliver exceptional user experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/portfolio"
                  className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 hover-lift inline-flex items-center justify-center"
                >
                  View Our Work
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-900 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop"
                  alt="Modern workspace"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive digital solutions tailored to your business needs
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white p-8 rounded-xl shadow-lg hover-lift text-center"
                >
                  <div className="text-indigo-600 mb-4 flex justify-center">
                    {getServiceIcon(service.title)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600">
              Some of our recent work that we're proud of
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.length > 0 ? featuredProjects.map((project) => (
                <div key={project._id} className="group hover-lift">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-40 object-cover rounded"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-indigo-100 mb-4">{project.description.substring(0, 60)}...</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="bg-white/20 px-3 py-1 rounded-full text-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-3 text-center text-gray-500">
                  <p>No featured projects available</p>
                </div>
              )}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 inline-flex items-center"
            >
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-6xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-indigo-200 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            Let's discuss how we can help bring your digital vision to life
          </p>
          <Link
            to="/contact"
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 inline-flex items-center text-lg"
          >
            Get Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;