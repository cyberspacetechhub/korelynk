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
      alt: "InnTechLab Technology",
      cta: "Start Your Project",
      ctaLink: "/contact"
    },
    {
      title: "Remote Team,",
      highlight: "Global Solutions",
      description: "Based in Nigeria, delivering world-class digital solutions to clients worldwide.",
      image: "/inntechlab-workspace.png",
      alt: "InnTechLab Workspace",
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
          <div className="w-full max-w-md p-6 transition-colors transform bg-white border shadow-2xl dark:bg-midnight-50 rounded-2xl animate-fade-in dark:border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 mr-2 text-electric-blue" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Welcome to InnTechLab!</h3>
              </div>
              <button 
                onClick={() => setShowWelcomePopup(false)}
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Ready to transform your business with cutting-edge technology? Let's build something amazing together!
            </p>
            <div className="flex gap-3">
              <Link 
                to="/contact" 
                onClick={() => setShowWelcomePopup(false)}
                className="px-4 py-2 text-sm font-medium text-white transition-all rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/30"
              >
                Get Started
              </Link>
              <button 
                onClick={() => setShowWelcomePopup(false)}
                className="text-sm text-gray-500 transition-colors hover:text-gray-700"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Special Offer Popup */}
      {showOfferPopup && (
        <div className="fixed z-50 max-w-sm bottom-4 right-4">
          <div className="p-4 text-white transform shadow-2xl bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl animate-slide-up">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <Gift className="w-5 h-5 mr-2" />
                <span className="text-sm font-semibold">Limited Time Offer!</span>
              </div>
              <button 
                onClick={() => setShowOfferPopup(false)}
                className="transition-colors text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mb-3 text-sm text-purple-100">
              Get 15% off your first project. Free consultation included!
            </p>
            <Link 
              to="/contact" 
              onClick={() => setShowOfferPopup(false)}
              className="inline-block px-3 py-2 text-sm font-medium text-purple-600 transition-colors bg-white rounded-lg hover:bg-purple-50"
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
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img 
            src="/inntechlab-workspace.png" 
            alt="InnTechLab Workspace" 
            className="object-cover w-full h-full"
            loading="eager"
            decoding="sync"
            fetchpriority="high"
          />
        </div>
        <div className="absolute inset-0 dark:bg-black/60 bg-midnight/75"></div>
        <div className="container relative px-6 py-24 mx-auto lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 text-sm font-medium text-white border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                  #Pioneering Africa's Digital Transformation
                </span>
              </div>
              <h1 className="mb-8 text-6xl font-bold leading-tight lg:text-8xl">
                {heroSlides[currentSlide].title}
                <span className="block gradient-text">{heroSlides[currentSlide].highlight}</span>
              </h1>
              <p className="mb-10 text-2xl font-medium leading-relaxed text-indigo-100 lg:text-3xl">
                {heroSlides[currentSlide].description}
              </p>
              <div className="flex flex-col gap-6 sm:flex-row">
                <Link
                  to={heroSlides[currentSlide].ctaLink}
                  className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold transition-all duration-300 bg-white shadow-2xl text-midnight rounded-xl hover:bg-electric-cyan hover:text-white hover-lift"
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
                <Link
                  to="/contact"
                  className="px-10 py-5 text-lg font-bold text-white transition-all duration-300 border-2 border-white rounded-xl hover:bg-white hover:text-midnight backdrop-blur-sm"
                >
                  Get Free Quote
                </Link>
              </div>
              
              {/* Slide indicators */}
              <div className="flex mt-8 space-x-2">
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
              <div className="p-8 border bg-white/10 backdrop-blur-sm rounded-2xl border-white/20">
                <img
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].alt}
                  className="object-cover w-full transition-all duration-500 rounded-lg h-80"
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
      <section className="py-20 transition-colors bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
              Our Services
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400">
              We offer comprehensive digital solutions tailored to your business needs
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-electric-blue"></div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
                    className="overflow-hidden transition-colors bg-white border border-gray-100 shadow-lg dark:bg-midnight-50 dark:border-white/10 rounded-xl dark:shadow-black/50 hover-lift"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={getServiceImage(service.title)}
                        alt={service.title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <div className="flex justify-center mb-4 text-electric-blue">
                        {getServiceIcon(service.title)}
                      </div>
                      <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
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
      <section className="py-20 transition-colors bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Some of our recent work that we're proud of
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-electric-blue"></div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.length > 0 ? featuredProjects.map((project) => (
                <div key={project._id} className="overflow-hidden transition-colors bg-white border border-gray-100 shadow-lg group hover-lift dark:bg-midnight-50 dark:border-white/10 rounded-xl dark:shadow-black/50">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100">
                      <div className="absolute flex gap-2 bottom-4 left-4 right-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-sm font-medium text-gray-900 transition-colors bg-white rounded-full hover:bg-gray-100"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-sm font-medium text-white transition-colors bg-gray-900 rounded-full hover:bg-gray-800"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description.substring(0, 100)}...</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 text-sm font-medium rounded-full bg-electric-blue/10 text-electric-blue dark:text-electric-cyan">{tech}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Role: Full-Stack Developer</span>
                      <span className="font-medium text-electric-blue dark:text-electric-cyan">Featured Project</span>
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
          
          <div className="mt-12 text-center">
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/40"
              >
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/coding-demo"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-electric-violet hover:bg-electric-violet/80"
              >
                Watch Live Demo
                <Code className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 transition-colors bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
              Our Technology Stack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              We use cutting-edge technologies to build scalable solutions
            </p>
          </div>
          
          <div className="grid max-w-6xl grid-cols-2 gap-6 mx-auto md:grid-cols-4 lg:grid-cols-8">
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
              <div key={index} className="text-center transition-transform duration-300 group hover:scale-110">
                <div className="p-4 mb-3 transition-colors border border-gray-100 bg-gray-50 dark:bg-midnight-50 dark:border-white/10 rounded-xl group-hover:bg-gray-100 dark:group-hover:bg-midnight-100">
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
      <section className="py-20 text-white bg-gradient-electric">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold lg:text-6xl">
                  {stat.number}
                </div>
                <div className="text-lg text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Demo */}
      <section className="py-20 transition-colors bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
              How We Build Your Vision
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400">
              From concept to deployment, see our development process in action
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Code Demo */}
            <div className="order-2 lg:order-1">
              <div className="p-6 bg-gray-900 shadow-2xl rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-4 text-sm text-gray-400">app.jsx</span>
                </div>
                <div className="font-mono text-sm">
                  <div className="text-purple-400">import</div>
                  <div className="ml-2 text-blue-400">React</div>
                  <div className="ml-2 text-white">from</div>
                  <div className="ml-2 text-green-400">'react';</div>
                  <br />
                  <div className="text-purple-400">const</div>
                  <div className="ml-2 text-yellow-400">App</div>
                  <div className="ml-2 text-white">=</div>
                  <div className="ml-2 text-blue-400">()</div>
                  <div className="ml-2 text-white">=&gt;</div>
                  <div className="ml-2 text-white">{'{'}</div>
                  <div className="ml-4 text-purple-400">return</div>
                  <div className="ml-2 text-white">(</div>
                  <div className="ml-6 text-green-400">&lt;div</div>
                  <div className="ml-2 text-blue-400">className</div>
                  <div className="text-white">=</div>
                  <div className="text-green-400">{'"app"'}</div>
                  <div className="text-green-400">&gt;</div>
                  <div className="ml-8 text-green-400">&lt;h1&gt;</div>
                  <div className="text-white">Your Vision</div>
                  <div className="text-green-400">&lt;/h1&gt;</div>
                  <div className="ml-6 text-green-400">&lt;/div&gt;</div>
                  <div className="ml-4 text-white">);</div>
                  <div className="ml-2 text-white">{'};'}</div>
                </div>
              </div>
            </div>

            {/* Avatar Illustrations */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Main Developer */}
                <div className="p-8 mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-electric-blue/10 dark:to-electric-violet/10 dark:border dark:border-white/10 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-16 h-16 mr-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Developer</h3>
                      <p className="text-indigo-600">Architecting your solution</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-midnight-50">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 mr-2 bg-green-400 rounded-full animate-pulse"></div>
                      Writing clean, scalable code...
                    </div>
                  </div>
                </div>

                {/* UI/UX Designer */}
                <div className="p-8 mb-6 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-electric-violet/10 dark:to-pink-900/20 dark:border dark:border-white/10 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-16 h-16 mr-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-600">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">UI/UX Designer</h3>
                      <p className="text-pink-600">Crafting user experience</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-midnight-50">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 mr-2 bg-pink-400 rounded-full animate-pulse"></div>
                      Designing intuitive interfaces...
                    </div>
                  </div>
                </div>

                {/* DevOps Engineer */}
                <div className="p-8 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-electric-cyan/10 dark:to-green-900/20 dark:border dark:border-white/10 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-16 h-16 mr-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
                      <Cloud className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">DevOps Engineer</h3>
                      <p className="text-green-600">Deploying to production</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-midnight-50">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 mr-2 bg-green-400 rounded-full animate-pulse"></div>
                      Optimizing performance...
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute w-8 h-8 bg-yellow-400 rounded-full -top-4 -right-4 animate-bounce"></div>
                <div className="absolute w-6 h-6 bg-blue-400 rounded-full top-1/2 -left-4 animate-pulse"></div>
                <div className="absolute w-4 h-4 bg-purple-400 rounded-full -bottom-4 right-1/3 animate-ping"></div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid gap-8 mt-16 md:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-electric-blue/10 dark:bg-electric-blue/20">
                <span className="text-2xl font-bold text-electric-blue">1</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Planning</h3>
              <p className="text-gray-600 dark:text-gray-400">We analyze your requirements and create a detailed roadmap</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-electric-violet/10 dark:bg-electric-violet/20">
                <span className="text-2xl font-bold text-electric-violet">2</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Design</h3>
              <p className="text-gray-600 dark:text-gray-400">Our designers create beautiful, user-friendly interfaces</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-electric-cyan/10 dark:bg-electric-cyan/20">
                <span className="text-2xl font-bold text-electric-cyan">3</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Development</h3>
              <p className="text-gray-600 dark:text-gray-400">We build robust, scalable solutions using modern technologies</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full dark:bg-orange-500/20">
                <span className="text-2xl font-bold text-orange-500">4</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Launch</h3>
              <p className="text-gray-600 dark:text-gray-400">We deploy your project and provide ongoing support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Code Playground */}
      <section className="relative py-20 overflow-hidden text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative px-6 mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm">
              <Code className="w-4 h-4 mr-2" />
              Interactive Learning
            </div>
            <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
              🚀 Code. Learn. Build.
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-indigo-100">
              Master programming with hands-on code samples. From HTML basics to advanced React - 
              <span className="font-semibold text-yellow-300">see it, code it, understand it!</span>
            </p>
          </div>
          
          <CodeSamplesPreview />
          
          <div className="mt-12 text-center">
            <Link
              to="/code-samples"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-indigo-900 transition-all duration-300 bg-white rounded-lg shadow-xl hover:bg-indigo-50"
            >
              🎯 Explore All Code Tutorials
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
        
        {/* Floating Code Elements */}
        <div className="absolute w-16 h-16 rounded-lg top-20 left-10 bg-yellow-400/20 rotate-12 animate-pulse"></div>
        <div className="absolute w-12 h-12 rounded-full bottom-20 right-10 bg-cyan-400/20 animate-bounce"></div>
        <div className="absolute w-8 h-8 rotate-45 rounded top-1/2 right-20 bg-pink-400/20 animate-ping"></div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 transition-colors bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Stay updated with the latest tech insights and tutorials
            </p>
          </div>
          
          <BlogPreview />
          
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/40"
            >
              Read All Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 text-white bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container px-6 mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
                Let's Build Something Great Together
              </h2>
              <p className="mb-6 text-xl text-indigo-100">
                Ready to transform your business with cutting-edge technology? We're here to help.
              </p>
              <div className="mb-8 space-y-3">
                <div className="flex items-center text-indigo-100">
                  <div className="w-2 h-2 mr-3 bg-yellow-400 rounded-full"></div>
                  <span>Available for freelance, contract, and full-time opportunities</span>
                </div>
                <div className="flex items-center text-indigo-100">
                  <div className="w-2 h-2 mr-3 bg-yellow-400 rounded-full"></div>
                  <span>Based in Nigeria, serving clients globally</span>
                </div>
                <div className="flex items-center text-indigo-100">
                  <div className="w-2 h-2 mr-3 bg-yellow-400 rounded-full"></div>
                  <span>Remote-first team with flexible time zones</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-indigo-600 transition-all duration-300 bg-white rounded-lg hover:bg-indigo-50"
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href="mailto:inntechlabhq@gmail.com"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600"
                >
                  Email Us Directly
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="p-8 border bg-white/10 backdrop-blur-sm rounded-2xl border-white/20">
                <h3 className="mb-6 text-2xl font-bold">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-white/20">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-indigo-200">inntechlabhq@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-white/20">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-indigo-200">+234-916-140-3450</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-white/20">
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