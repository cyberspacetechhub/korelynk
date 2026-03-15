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
import FloatingSocial from './FloatingSocial';

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
      icon: <BookOpen className="w-8 h-8 text-white" />,
      title: 'InnTechLab Academy',
      description: 'Free programming tutorials similar to W3Schools',
      link: '/academy',
      gradient: 'from-blue-500 to-cyan-500',
      available: true
    },
    {
      icon: <Briefcase className="w-8 h-8 text-white" />,
      title: 'InnTechLab Portfolio',
      description: 'Founder projects and professional portfolio',
      link: '/portfolio',
      gradient: 'from-purple-500 to-pink-500',
      available: true
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      title: 'InnTechLab Store',
      description: 'Online digital store launching soon',
      link: '/store',
      gradient: 'from-orange-500 to-red-500',
      available: false
    },
    {
      icon: <Sparkles className="w-8 h-8 text-white" />,
      title: 'InnTechLab AI',
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
    <div className="min-h-screen transition-colors bg-white dark:bg-midnight">
      <SEO
        title="Building the future of digital innovation"
        description="InnTechLab builds tools, education, and infrastructure that empower developers, businesses, and creators."
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-midnight transition-colors">
        {/* Dark mode animated blobs */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 opacity-50 bg-gradient-glow"></div>
          <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-electric-blue/20 blur-3xl animate-pulse"></div>
          <div className="absolute delay-1000 rounded-full bottom-20 right-10 w-96 h-96 bg-electric-violet/20 blur-3xl animate-pulse"></div>
          <div className="absolute delay-500 rounded-full top-1/2 left-1/2 w-80 h-80 bg-electric-cyan/20 blur-3xl animate-pulse"></div>
        </div>
        {/* Light mode subtle gradient */}
        <div className="absolute inset-0 dark:hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-electric-blue/5 via-transparent to-electric-violet/5"></div>
          <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-electric-blue/10 blur-3xl"></div>
          <div className="absolute rounded-full bottom-20 right-10 w-96 h-96 bg-electric-violet/10 blur-3xl"></div>
        </div>

        <div className="container relative px-6 py-20 mx-auto text-center">
          <h1 className="mb-8 text-5xl font-bold leading-tight text-gray-900 md:text-7xl lg:text-8xl font-display dark:text-white">
            Building the future of
            <span className="block mt-2 text-transparent bg-gradient-electric bg-clip-text">
              digital innovation.
            </span>
          </h1>

          <p className="max-w-4xl mx-auto mb-12 text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300">
            InnTechLab builds tools, education, and infrastructure that empower developers, businesses, and creators.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              to="/academy"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-lg group bg-gradient-electric hover:shadow-2xl hover:shadow-electric-blue/50"
            >
              Explore Academy
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-900 transition-all duration-300 border border-gray-300 rounded-lg bg-midnight/10 dark:bg-white/10 backdrop-blur-sm dark:text-white dark:border-white/20 hover:bg-midnight/20 dark:hover:bg-white/20"
            >
              View Portfolio
              <ArrowRight className="w-5 h-5 ml-2" />
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
      <section className="py-24 transition-colors bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">
              Platform Ecosystem
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400">
              Four pillars powering the future of technology
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {platformPillars.map((pillar, index) => (
              <Link
                key={index}
                to={pillar.link}
                className="relative p-8 transition-all duration-300 bg-white border border-gray-200 group dark:bg-white/5 dark:backdrop-blur-sm dark:border-white/10 rounded-2xl hover:border-electric-blue/40 dark:hover:border-white/20 hover:shadow-lg dark:hover:bg-white/10 hover:scale-105"
              >
                {!pillar.available && (
                  <span className="absolute px-3 py-1 text-xs font-semibold rounded-full top-4 right-4 bg-electric-violet/20 text-electric-violet">
                    Soon
                  </span>
                )}
                <div className={`w-16 h-16 bg-gradient-to-br ${pillar.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {pillar.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 font-display dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {pillar.description}
                </p>
                <div className="flex items-center transition-transform text-electric-cyan group-hover:translate-x-2">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 transition-colors bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Some of our recent work that we're proud of
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-electric-cyan"></div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <div key={project._id} className="overflow-hidden transition-all duration-300 border border-gray-200 group bg-gray-50 dark:bg-white/5 dark:backdrop-blur-sm dark:border-white/10 rounded-2xl hover:border-electric-blue/40 dark:hover:border-white/20 hover:shadow-lg dark:hover:bg-white/10">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100">
                      <div className="absolute flex gap-2 bottom-4 left-4 right-4">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1 text-sm font-medium text-gray-900 transition-colors bg-white rounded-full hover:bg-gray-100">
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1 text-sm font-medium text-white transition-colors bg-gray-900 rounded-full hover:bg-gray-800">
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">{project.description.substring(0, 100)}...</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 text-sm font-medium border rounded-full bg-electric-blue/10 text-electric-blue dark:text-electric-cyan border-electric-blue/20 dark:border-electric-cyan/20">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50"
            >
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-electric">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-5xl font-bold text-white lg:text-6xl font-display">
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

      {/* Interactive Code Learning */}
      <section className="py-24 transition-colors bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">
              Interactive Code Learning
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400">
              Master programming with hands-on code samples from HTML basics to advanced React
            </p>
          </div>

          <CodeSamplesPreview />

          <div className="mt-12 text-center">
            <Link
              to="/code-samples"
              className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50"
            >
              Explore All Code Tutorials
              <Code2 className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-24 transition-colors bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">
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
              className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50"
            >
              Read All Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Free Learning */}
      <section className="py-24 transition-colors bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">
              Free Learning
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400">
              Master web development with our comprehensive tutorials
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tutorials.map((tutorial, index) => (
              <Link
                key={index}
                to="/academy"
                className="flex items-center px-6 py-4 space-x-3 transition-all duration-300 bg-white border border-gray-200 group dark:bg-white/5 dark:backdrop-blur-sm dark:border-white/10 rounded-xl hover:border-electric-blue/40 dark:hover:border-white/20 hover:shadow-md dark:hover:bg-white/10"
              >
                <span className="text-3xl">{tutorial.icon}</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{tutorial.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">fundamentals</span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/academy"
              className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50"
            >
              Start Learning Free
              <Code2 className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vision — Connecting businesses */}
      <section className="py-24 transition-colors bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 mb-8 bg-gray-100 border border-gray-200 rounded-full dark:bg-white/5 dark:backdrop-blur-sm dark:border-white/10">
              <Layers className="w-4 h-4 mr-2 text-electric-cyan" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Our Vision</span>
            </div>

            <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">
              Connecting businesses, developers, and innovation
            </h2>

            <p className="mb-12 text-xl leading-relaxed text-gray-600 dark:text-gray-400">
              InnTechLab's long-term mission is to build technology that bridges the gap between businesses and developers,
              creating an ecosystem where innovation thrives. We're building the infrastructure for the next generation
              of digital solutions across Africa and beyond.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-6 transition-all border border-gray-200 bg-gray-50 dark:bg-white/5 dark:backdrop-blur-sm dark:border-white/10 rounded-xl hover:border-electric-blue/30 dark:hover:border-white/20 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">For Developers</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tools and education to build better</p>
              </div>

              <div className="p-6 transition-all border border-gray-200 bg-gray-50 dark:bg-white/5 dark:backdrop-blur-sm dark:border-white/10 rounded-xl hover:border-electric-blue/30 dark:hover:border-white/20 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">For Businesses</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Infrastructure to scale faster</p>
              </div>

              <div className="p-6 transition-all border border-gray-200 bg-gray-50 dark:bg-white/5 dark:backdrop-blur-sm dark:border-white/10 rounded-xl hover:border-electric-blue/30 dark:hover:border-white/20 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">For Innovation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Platform for the future</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingSocial />

      {/* CTA — Ready to build the future */}
      <section className="relative py-24 overflow-hidden transition-colors bg-gray-900 dark:bg-midnight">
        <div className="absolute inset-0 bg-gradient-electric opacity-10"></div>
        <div className="absolute top-0 rounded-full left-1/4 w-96 h-96 bg-electric-blue/15 blur-3xl"></div>
        <div className="absolute bottom-0 rounded-full right-1/4 w-96 h-96 bg-electric-violet/15 blur-3xl"></div>
        <div className="container relative px-6 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl font-display">
            Ready to build the future?
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-xl text-gray-300">
            Join thousands of developers and businesses already using InnTechLab
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              to="/contact"
              className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-2xl hover:shadow-electric-blue/50"
            >
              Get Started Today
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border rounded-lg bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 hover:border-white/50"
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
