import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Briefcase, ShoppingBag, Sparkles, Code2, Layers, Zap } from 'lucide-react';
import axios from '../../api/axios';
import SEO from '../SEO';
import SkillsShowcase from './SkillsShowcase';
import TrustedBy from '../TrustedBy';
import Testimonials from '../Testimonials';
import BlogPreview from '../BlogPreview';
import CodeSamplesPreview from '../CodeSamplesPreview';
import TechStackMarquee from '../TechStackMarquee';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects?featured=true&limit=3');
      if (response.data.success) {
        setFeaturedProjects(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "3+", label: "Years Experience" },
    { number: "99%", label: "Client Satisfaction" }
  ];
  const platformPillars = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Korelynk Academy',
      description: 'Free programming tutorials similar to W3Schools',
      link: '/academy',
      gradient: 'from-blue-500 to-cyan-500',
      available: true
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Korelynk Portfolio',
      description: 'Founder projects and professional portfolio',
      link: '/portfolio',
      gradient: 'from-purple-500 to-pink-500',
      available: true
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: 'Korelynk Store',
      description: 'Online digital store launching soon',
      link: '/store',
      gradient: 'from-orange-500 to-red-500',
      available: false
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Korelynk AI',
      description: 'Future AI tools and automation platform',
      link: '/ai',
      gradient: 'from-indigo-500 to-purple-500',
      available: false
    }
  ];

  const tutorials = [
    { name: 'HTML', icon: '📄', color: 'from-orange-500 to-red-500' },
    { name: 'CSS', icon: '🎨', color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
    { name: 'React', icon: '⚛️', color: 'from-cyan-500 to-blue-500' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-midnight">
      <SEO 
        title="Building the future of digital innovation"
        description="Korelynk Tech Group builds tools, education, and infrastructure that empower developers, businesses, and creators."
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-glow opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-electric-blue/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-electric-violet/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-electric-cyan/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white mb-8 leading-tight">
            Building the future of
            <span className="block mt-2 bg-gradient-electric bg-clip-text text-transparent">
              digital innovation.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Korelynk Tech Group builds tools, education, and infrastructure that empower developers, businesses, and creators.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/academy"
              className="group px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-electric-blue/50 transition-all duration-300 inline-flex items-center"
            >
              Explore Academy
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 inline-flex items-center"
            >
              View Portfolio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <SkillsShowcase />

      {/* Trusted By */}
      <TrustedBy />

      {/* Tech Stack Marquee */}
      <TechStackMarquee />

      {/* Platform Ecosystem */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              Platform Ecosystem
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Four pillars powering the future of technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformPillars.map((pillar, index) => (
              <Link
                key={index}
                to={pillar.link}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                {!pillar.available && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-electric-violet/20 text-electric-violet text-xs font-semibold rounded-full">
                    Soon
                  </span>
                )}
                <div className={`w-16 h-16 bg-gradient-to-br ${pillar.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {pillar.description}
                </p>
                <div className="flex items-center text-electric-cyan group-hover:translate-x-2 transition-transform">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400">
              Some of our recent work that we're proud of
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-cyan"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div key={project._id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description.substring(0, 100)}...</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-electric-blue/20 text-electric-cyan rounded-full text-sm font-medium">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300"
            >
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold font-display text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Code Playground */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              Interactive Code Learning
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Master programming with hands-on code samples from HTML basics to advanced React
            </p>
          </div>

          <CodeSamplesPreview />

          <div className="text-center mt-12">
            <Link
              to="/code-samples"
              className="inline-flex items-center px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300"
            >
              Explore All Code Tutorials
              <Code2 className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-400">
              Stay updated with the latest tech insights and tutorials
            </p>
          </div>

          <BlogPreview />

          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Read All Articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Free Learning */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              Free Learning
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Master web development with our comprehensive tutorials
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tutorials.map((tutorial, index) => (
              <Link
                key={index}
                to="/academy"
                className="group px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center space-x-3"
              >
                <span className="text-3xl">{tutorial.icon}</span>
                <span className="text-lg font-semibold text-white">{tutorial.name}</span>
                <span className="text-gray-400 text-sm">fundamentals</span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/academy"
              className="inline-flex items-center px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300"
            >
              Start Learning Free
              <Code2 className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8">
              <Layers className="w-4 h-4 text-electric-cyan mr-2" />
              <span className="text-sm font-medium text-gray-300">Our Vision</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-8">
              Connecting businesses, developers, and innovation
            </h2>
            
            <p className="text-xl text-gray-400 leading-relaxed mb-12">
              Korelynk's long-term mission is to build technology that bridges the gap between businesses and developers, 
              creating an ecosystem where innovation thrives. We're building the infrastructure for the next generation 
              of digital solutions across Africa and beyond.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">For Developers</h3>
                <p className="text-gray-400 text-sm">Tools and education to build better</p>
              </div>
              
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">For Businesses</h3>
                <p className="text-gray-400 text-sm">Infrastructure to scale faster</p>
              </div>
              
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">For Innovation</h3>
                <p className="text-gray-400 text-sm">Platform for the future</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-electric opacity-10"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
            Ready to build the future?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of developers and businesses already using Korelynk
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-electric-blue/50 transition-all duration-300"
            >
              Get Started Today
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;