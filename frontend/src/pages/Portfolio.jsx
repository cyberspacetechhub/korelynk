import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter, ArrowRight } from 'lucide-react';
import axios from '../api/axios';
import CardSkeleton from '../components/skeletons/CardSkeleton';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects');
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Use default projects as fallback
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'saas', name: 'SaaS Platforms' }
  ];

  const defaultProjects = [
    {
      id: 1,
      title: 'TechStore E-commerce Platform',
      category: 'ecommerce',
      description: 'Modern e-commerce platform with advanced features including inventory management, payment processing, and analytics dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'HealthCare Management System',
      category: 'saas',
      description: 'Comprehensive healthcare management platform for clinics and hospitals with patient records, appointment scheduling, and billing.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      technologies: ['Vue.js', 'Laravel', 'PostgreSQL', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'FitTracker Mobile App',
      category: 'mobile',
      description: 'Cross-platform fitness tracking app with workout plans, nutrition tracking, and social features.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Corporate Website Redesign',
      category: 'web',
      description: 'Complete redesign of corporate website with modern UI/UX, improved performance, and SEO optimization.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'Tailwind CSS', 'Contentful', 'Vercel'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Restaurant Ordering System',
      category: 'web',
      description: 'Online ordering system for restaurants with menu management, order tracking, and payment integration.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
      technologies: ['React', 'Express.js', 'MySQL', 'PayPal API'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Learning Management Platform',
      category: 'saas',
      description: 'Educational platform with course creation, student management, progress tracking, and certification system.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      technologies: ['Angular', 'Django', 'PostgreSQL', 'Redis'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 7,
      title: 'Real Estate Mobile App',
      category: 'mobile',
      description: 'Property listing and management app with advanced search, virtual tours, and agent communication.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
      technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 8,
      title: 'Fashion E-commerce Store',
      category: 'ecommerce',
      description: 'Luxury fashion e-commerce platform with AR try-on features, wishlist, and personalized recommendations.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
      technologies: ['React', 'Shopify Plus', 'GraphQL', 'AR.js'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 9,
      title: 'Project Management Tool',
      category: 'saas',
      description: 'Collaborative project management platform with task tracking, team communication, and reporting features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  const allProjects = projects.length > 0 ? projects : defaultProjects;
  const filteredProjects = activeFilter === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === activeFilter);

  const featuredProjects = allProjects.filter(project => project.featured);

  if (loading) {
    return (
      <div className="min-h-screen pt">
        <div className="py-20 bg-gray-200 animate-pulse">
          <div className="container px-6 mx-auto text-center">
            <div className="h-16 bg-gray-300 rounded w-96 mx-auto mb-6"></div>
            <div className="h-8 bg-gray-300 rounded w-80 mx-auto"></div>
          </div>
        </div>
        <section className="py-20 bg-white">
          <div className="container px-6 mx-auto">
            <div className="mb-16 text-center">
              <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
            </div>
            <CardSkeleton count={3} />
          </div>
        </section>
        <section className="py-20 bg-gray-50">
          <div className="container px-6 mx-auto">
            <div className="mb-16 text-center">
              <div className="h-10 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-64 mx-auto mb-8 animate-pulse"></div>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded w-32 animate-pulse"></div>
                ))}
              </div>
            </div>
            <CardSkeleton count={6} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt">
      {/* Hero Section */}
      <section className="py-20 text-white relative" style={{
        backgroundImage: 'url(/korelynk-workspace.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container px-6 mx-auto text-center relative z-10">
          <h1 className="mb-6 text-5xl font-bold lg:text-6xl">
            Our Portfolio
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-indigo-100 lg:text-2xl">
            Showcasing our best work and successful projects across various industries
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600">
              Our most impactful and innovative solutions
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <div key={project._id || project.id} className="group hover-lift">
                <div className="overflow-hidden bg-white shadow-lg rounded-xl">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-100">
                      <div className="absolute flex gap-2 bottom-4 left-4 right-4">
                        <a
                          href={project.liveUrl}
                          className="p-2 text-gray-900 transition-colors bg-white rounded-lg hover:bg-gray-100"
                          title="View Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <a
                          href={project.githubUrl}
                          className="p-2 text-gray-900 transition-colors bg-white rounded-lg hover:bg-gray-100"
                          title="View Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-gray-600 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm text-indigo-800 bg-indigo-100 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects with Filter */}
      <section className="py-20 bg-gray-50">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              All Projects
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Browse through our complete portfolio
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  <Filter className="inline-block w-4 h-4 mr-2" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div key={project._id || project.id} className="group hover-lift">
                <div className="overflow-hidden bg-white shadow-lg rounded-xl">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-100">
                      <div className="absolute flex gap-2 bottom-4 left-4 right-4">
                        <a
                          href={project.liveUrl}
                          className="p-2 text-gray-900 transition-colors bg-white rounded-lg hover:bg-gray-100"
                          title="View Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <a
                          href={project.githubUrl}
                          className="p-2 text-gray-900 transition-colors bg-white rounded-lg hover:bg-gray-100"
                          title="View Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs text-indigo-800 bg-indigo-100 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 text-white bg-indigo-600">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            <div>
              <div className="mb-2 text-4xl font-bold lg:text-5xl">50+</div>
              <div className="text-indigo-200">Projects Completed</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold lg:text-5xl">30+</div>
              <div className="text-indigo-200">Happy Clients</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold lg:text-5xl">15+</div>
              <div className="text-indigo-200">Technologies</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold lg:text-5xl">99%</div>
              <div className="text-indigo-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold">
            Ready to Start Your Project?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-purple-100">
            Let's create something amazing together. Contact us to discuss your project requirements.
          </p>
          <button className="inline-flex items-center px-8 py-4 text-lg font-semibold text-purple-600 transition-all duration-300 bg-white rounded-lg hover:bg-purple-50">
            Start Your Project
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;