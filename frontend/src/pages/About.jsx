import React from 'react';
import { Target, Eye, Award, Users, Code2, Zap, Heart, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
  const stats = [
    { number: '50+', label: 'Projects Completed', icon: <Code2 className="w-6 h-6" /> },
    { number: '30+', label: 'Happy Clients', icon: <Users className="w-6 h-6" /> },
    { number: '3+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> },
    { number: '99%', label: 'Client Satisfaction', icon: <Heart className="w-6 h-6" /> }
  ];

  const values = [
    { icon: <Zap className="w-8 h-8" />, title: 'Innovation', description: 'We embrace cutting-edge technologies and creative solutions to solve complex problems.' },
    { icon: <Heart className="w-8 h-8" />, title: 'Quality', description: 'We deliver excellence in every project, ensuring the highest standards of code and design.' },
    { icon: <Users className="w-8 h-8" />, title: 'Collaboration', description: 'We work closely with our clients, fostering transparent communication and partnership.' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Growth', description: 'We are committed to continuous learning and helping our clients scale their businesses.' }
  ];

  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-midnight">
      <SEO
        title="About Us - InnTechLab"
        description="Learn about InnTechLab's mission to build the future of digital innovation through education, tools, and infrastructure."
      />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gray-900 dark:bg-midnight">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="container relative px-6 mx-auto text-center">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl font-display">
            About InnTechLab
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-300">
            Building the future of digital innovation through education, tools, and infrastructure
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 border border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10 rounded-2xl md:p-12">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl font-display dark:text-white">Our Story</h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                <p>
                  InnTechLab was founded with a vision to bridge the gap between technology and innovation across Africa and beyond.
                  What started as a passion project has evolved into a comprehensive technology ecosystem serving developers, businesses, and creators.
                </p>
                <p>
                  Led by founder Mkpuma Shedrach, we've built a platform that combines education, professional services, and innovative tools.
                  Our mission is to empower the next generation of developers while providing businesses with cutting-edge digital solutions.
                </p>
                <p>
                  Today, InnTechLab stands as a testament to what's possible when passion meets purpose. We're not just building websites
                  and applications—we're building the infrastructure for Africa's digital future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2">
            <div className="p-8 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 font-display dark:text-white">Our Mission</h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                To democratize technology education and provide world-class digital solutions that empower businesses and developers
                to achieve their full potential. We believe in making quality tech education accessible to everyone, everywhere.
              </p>
            </div>
            <div className="p-8 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 font-display dark:text-white">Our Vision</h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                To become Africa's leading digital innovation hub, creating an ecosystem where technology, education, and business
                converge to drive sustainable growth and transformation across the continent and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">Our Impact</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">Numbers that tell our story</p>
          </div>
          <div className="grid max-w-6xl grid-cols-2 gap-8 mx-auto lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-8 text-center transition-all border border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10 rounded-2xl hover:border-gray-300 dark:hover:border-white/20">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white bg-gradient-electric rounded-xl">
                  {stat.icon}
                </div>
                <div className="mb-2 text-4xl font-bold text-gray-900 font-display dark:text-white">{stat.number}</div>
                <div className="text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">Our Values</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="p-8 transition-all bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl hover:border-gray-300 dark:hover:border-white/20">
                <div className="flex items-center justify-center w-16 h-16 mb-6 text-white bg-gradient-electric rounded-xl">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 font-display dark:text-white">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 dark:bg-midnight">
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl font-display">
            Join Us on This Journey
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-xl text-gray-300">
            Whether you're looking to learn, build, or grow your business, we're here to help you succeed
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/academy" className="px-8 py-4 font-semibold text-white transition-all rounded-lg bg-gradient-electric hover:shadow-2xl hover:shadow-electric-blue/50">
              Start Learning
            </a>
            <a href="/contact" className="px-8 py-4 font-semibold text-white transition-all border rounded-lg bg-white/10 border-white/20 hover:bg-white/20">
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
