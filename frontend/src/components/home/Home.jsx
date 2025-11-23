import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Globe, Database, Cloud, Shield, Star, X, Gift, MessageCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import SEO from '../SEO';
import BlogPreview from '../BlogPreview';
import CodeSamplesPreview from '../CodeSamplesPreview';
import SkillsShowcase from './SkillsShowcase';
import Testimonials from '../Testimonials';
import TrustedBy from '../TrustedBy';



const Home = () => {
  const [services, setServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showOfferPopup, setShowOfferPopup] = useState(false);

  const heroSlides = [
    {
      title: "We Build High-Performance",
      highlight: "Web & Mobile Apps",
      description: "Specializing in React, Next.js & Node.js solutions for startups and SMBs across Africa and beyond.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      alt: "Modern workspace",
      cta: "View Our Work",
      ctaLink: "/portfolio"
    },
    {
      title: "Full-Stack Development",
      highlight: "Made Simple",
      description: "From concept to deployment - we handle frontend, backend, and everything in between.",
      image: "/kore.png",
      alt: "KoreLynk Technology",
      cta: "Start Your Project",
      ctaLink: "/contact"
    },
    {
      title: "Remote Team,",
      highlight: "Global Solutions",
      description: "Based in Nigeria, delivering world-class digital solutions to clients worldwide.",
      image: "/korelynk-workspace.png",
      alt: "KoreLynk Workspace",
      cta: "Hire Our Team",
      ctaLink: "/contact"
    }
  ];

  useEffect(() => {
    fetchData();
    
    // Auto-slide functionality
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    
    // Show popups with delays (only once per session)
    const welcomeShown = sessionStorage.getItem('welcomePopupShown');
    const offerShown = sessionStorage.getItem('offerPopupShown');
    
    if (!welcomeShown) {
      setTimeout(() => {
        setShowWelcomePopup(true);
        sessionStorage.setItem('welcomePopupShown', 'true');
      }, 3000);
    }
    
    if (!offerShown) {
      setTimeout(() => {
        setShowOfferPopup(true);
        sessionStorage.setItem('offerPopupShown', 'true');
      }, 15000);
    }
    
    return () => clearInterval(slideInterval);
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, projectsRes] = await Promise.all([
        axios.get('/services?limit=4'),
        axios.get('/projects?featured=true&limit=3')
      ]);
      
      if (servicesRes.data.success) {
        setServices(servicesRes.data.data);
      }
      
      if (projectsRes.data.success) {
        setFeaturedProjects(projectsRes.data.data);
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
      {/* Welcome Popup */}
      {showWelcomePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-fade-in transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 text-indigo-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Welcome to KoreLynk!</h3>
              </div>
              <button 
                onClick={() => setShowWelcomePopup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Ready to transform your business with cutting-edge technology? Let's build something amazing together!
            </p>
            <div className="flex gap-3">
              <Link 
                to="/contact" 
                onClick={() => setShowWelcomePopup(false)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                Get Started
              </Link>
              <button 
                onClick={() => setShowWelcomePopup(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Special Offer Popup */}
      {showOfferPopup && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-2xl p-4 transform animate-slide-up">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Gift className="w-5 h-5 mr-2" />
                <span className="font-semibold text-sm">Limited Time Offer!</span>
              </div>
              <button 
                onClick={() => setShowOfferPopup(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-purple-100 mb-3">
              Get 15% off your first project. Free consultation included!
            </p>
            <Link 
              to="/contact" 
              onClick={() => setShowOfferPopup(false)}
              className="bg-white text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium inline-block"
            >
              Claim Offer
            </Link>
          </div>
        </div>
      )}
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
      <section className="relative text-white overflow-hidden dark:bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="/korelynk-workspace.png" 
            alt="KoreLynk Workspace" 
            className="w-full h-full object-cover"
            loading="eager"
            decoding="sync"
            fetchpriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="mb-4">
                <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                  #Pioneering Africa's Digital Transformation
                </span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
                {heroSlides[currentSlide].title}
                <span className="gradient-text block">{heroSlides[currentSlide].highlight}</span>
              </h1>
              <p className="text-2xl lg:text-3xl mb-10 text-indigo-100 leading-relaxed font-medium">
                {heroSlides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to={heroSlides[currentSlide].ctaLink}
                  className="bg-white text-indigo-900 px-10 py-5 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all duration-300 hover-lift inline-flex items-center justify-center shadow-2xl"
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
                <Link
                  to="/contact"
                  className="border-3 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-900 transition-all duration-300 backdrop-blur-sm"
                >
                  Get Free Quote
                </Link>
              </div>
              
              {/* Slide indicators */}
              <div className="flex space-x-2 mt-8">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].alt}
                  className="w-full h-80 object-cover rounded-lg transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <SkillsShowcase />

      {/* Trusted By */}
      <TrustedBy />

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We offer comprehensive digital solutions tailored to your business needs
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const getServiceImage = (title) => {
                  const baseImages = {
                    'web development': '/6859d391d0cc1_product',
                    'mobile development': '/685ee5834ec0d_mobile', 
                    'backend development': '/685ad313a9fee_back-end',
                    'cloud solutions': '/685edf81e9d89_database'
                  };
                  const imageName = baseImages[title.toLowerCase()] || baseImages['web development'];
                  return `${imageName}.jpg`; // Keep original format for now
                };
                
                return (
                  <div
                    key={service.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 hover-lift overflow-hidden transition-colors"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={getServiceImage(service.title)}
                        alt={service.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <div className="text-indigo-600 mb-4 flex justify-center">
                        {getServiceIcon(service.title)}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
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
                <div key={project._id} className="group hover-lift bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden transition-colors">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description.substring(0, 100)}...</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">{tech}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Role: Full-Stack Developer</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium">Featured Project</span>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/portfolio"
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 inline-flex items-center justify-center"
              >
                View All Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/coding-demo"
                className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 inline-flex items-center justify-center"
              >
                Watch Live Demo
                <Code className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Technology Stack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We use cutting-edge technologies to build scalable solutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 max-w-6xl mx-auto">
            {[
              { 
                name: 'React', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 
                color: 'text-blue-500' 
              },
              { 
                name: 'Next.js', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', 
                color: 'text-black dark:text-white' 
              },
              { 
                name: 'Node.js', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 
                color: 'text-green-600' 
              },
              { 
                name: 'Express.js', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', 
                color: 'text-gray-600 dark:text-gray-300' 
              },
              { 
                name: 'MongoDB', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 
                color: 'text-green-500' 
              },
              { 
                name: 'TypeScript', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 
                color: 'text-blue-600' 
              },
              { 
                name: 'Tailwind CSS', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', 
                color: 'text-cyan-500' 
              },
              { 
                name: 'Git', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 
                color: 'text-orange-600' 
              },
              { 
                name: 'GitHub', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', 
                color: 'text-gray-800 dark:text-white' 
              },
              { 
                name: 'Docker', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 
                color: 'text-blue-400' 
              },
              { 
                name: 'AWS', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', 
                color: 'text-orange-500' 
              },
              { 
                name: 'Figma', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', 
                color: 'text-purple-500' 
              }
            ].map((tech, index) => (
              <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-3 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors">
                  <img 
                    src={tech.logo} 
                    alt={`${tech.name} logo`}
                    className={`w-10 h-10 mx-auto ${tech.name === 'Express.js' || tech.name === 'GitHub' ? 'dark:filter dark:brightness-0 dark:invert' : ''}`}
                    loading="lazy"
                  />
                </div>
                <h3 className={`font-semibold text-sm ${tech.color}`}>{tech.name}</h3>
              </div>
            ))}
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

      {/* Development Process Demo */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How We Build Your Vision
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From concept to deployment, see our development process in action
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Code Demo */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-4 text-gray-400 text-sm">app.jsx</span>
                </div>
                <div className="text-sm font-mono">
                  <div className="text-purple-400">import</div>
                  <div className="text-blue-400 ml-2">React</div>
                  <div className="text-white ml-2">from</div>
                  <div className="text-green-400 ml-2">'react';</div>
                  <br />
                  <div className="text-purple-400">const</div>
                  <div className="text-yellow-400 ml-2">App</div>
                  <div className="text-white ml-2">=</div>
                  <div className="text-blue-400 ml-2">()</div>
                  <div className="text-white ml-2">=&gt;</div>
                  <div className="text-white ml-2">{'{'}</div>
                  <div className="text-purple-400 ml-4">return</div>
                  <div className="text-white ml-2">(</div>
                  <div className="text-green-400 ml-6">&lt;div</div>
                  <div className="text-blue-400 ml-2">className</div>
                  <div className="text-white">=</div>
                  <div className="text-green-400">{'"app"'}</div>
                  <div className="text-green-400">&gt;</div>
                  <div className="text-green-400 ml-8">&lt;h1&gt;</div>
                  <div className="text-white">Your Vision</div>
                  <div className="text-green-400">&lt;/h1&gt;</div>
                  <div className="text-green-400 ml-6">&lt;/div&gt;</div>
                  <div className="text-white ml-4">);</div>
                  <div className="text-white ml-2">{'};'}</div>
                </div>
              </div>
            </div>

            {/* Avatar Illustrations */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Main Developer */}
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Developer</h3>
                      <p className="text-indigo-600">Architecting your solution</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Writing clean, scalable code...
                    </div>
                  </div>
                </div>

                {/* UI/UX Designer */}
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-8 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mr-4">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">UI/UX Designer</h3>
                      <p className="text-pink-600">Crafting user experience</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-2 animate-pulse"></div>
                      Designing intuitive interfaces...
                    </div>
                  </div>
                </div>

                {/* DevOps Engineer */}
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                      <Cloud className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">DevOps Engineer</h3>
                      <p className="text-green-600">Deploying to production</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Optimizing performance...
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 right-1/3 w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="mt-16 grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Planning</h3>
              <p className="text-gray-600 dark:text-gray-300">We analyze your requirements and create a detailed roadmap</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Design</h3>
              <p className="text-gray-600 dark:text-gray-300">Our designers create beautiful, user-friendly interfaces</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Development</h3>
              <p className="text-gray-600 dark:text-gray-300">We build robust, scalable solutions using modern technologies</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Launch</h3>
              <p className="text-gray-600 dark:text-gray-300">We deploy your project and provide ongoing support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Code Playground */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Code className="w-4 h-4 mr-2" />
              Interactive Learning
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              🚀 Code. Learn. Build.
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Master programming with hands-on code samples. From HTML basics to advanced React - 
              <span className="text-yellow-300 font-semibold">see it, code it, understand it!</span>
            </p>
          </div>
          
          <CodeSamplesPreview />
          
          <div className="text-center mt-12">
            <Link
              to="/code-samples"
              className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 inline-flex items-center text-lg shadow-xl"
            >
              🎯 Explore All Code Tutorials
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
        
        {/* Floating Code Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-400/20 rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-cyan-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-8 h-8 bg-pink-400/20 rounded rotate-45 animate-ping"></div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Stay updated with the latest tech insights and tutorials
            </p>
          </div>
          
          <BlogPreview />
          
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 inline-flex items-center"
            >
              Read All Articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Let's Build Something Great Together
              </h2>
              <p className="text-xl mb-6 text-indigo-100">
                Ready to transform your business with cutting-edge technology? We're here to help.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-indigo-100">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span>Available for freelance, contract, and full-time opportunities</span>
                </div>
                <div className="flex items-center text-indigo-100">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span>Based in Nigeria, serving clients globally</span>
                </div>
                <div className="flex items-center text-indigo-100">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span>Remote-first team with flexible time zones</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 inline-flex items-center justify-center text-lg"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a
                  href="mailto:korelynk@gmail.com"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 inline-flex items-center justify-center"
                >
                  Email Us Directly
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-indigo-200">korelynk@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-indigo-200">+234-916-140-3450</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <div>
                      <div className="font-semibold">Location</div>
                      <div className="text-indigo-200">Nigeria (WAT Timezone)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;