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
    <div className="min-h-screen bg-white dark:bg-midnight transition-colors">
      <SEO
        title="About Us - InnTechLabs"
        description="Learn about InnTechLabs's mission to build the future of digital innovation through education, tools, and infrastructure."
      />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gray-900 dark:bg-midnight">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-6">
            About InnTechLabs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Building the future of digital innovation through education, tools, and infrastructure
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white dark:bg-midnight">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  InnTechLabs was founded with a vision to bridge the gap between technology and innovation across Africa and beyond.
                  What started as a passion project has evolved into a comprehensive technology ecosystem serving developers, businesses, and creators.
                </p>
                <p>
                  Led by founder Mkpuma Shedrach, we've built a platform that combines education, professional services, and innovative tools.
                  Our mission is to empower the next generation of developers while providing businesses with cutting-edge digital solutions.
                </p>
                <p>
                  Today, InnTechLabs stands as a testament to what's possible when passion meets purpose. We're not just building websites
                  and applications—we're building the infrastructure for Africa's digital future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 dark:bg-midnight-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To democratize technology education and provide world-class digital solutions that empower businesses and developers
                to achieve their full potential. We believe in making quality tech education accessible to everyone, everywhere.
              </p>
            </div>
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To become Africa's leading digital innovation hub, creating an ecosystem where technology, education, and business
                converge to drive sustainable growth and transformation across the continent and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white dark:bg-midnight">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4">Our Impact</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">Numbers that tell our story</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center hover:border-gray-300 dark:hover:border-white/20 transition-all">
                <div className="w-12 h-12 bg-gradient-electric rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 dark:bg-midnight-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:border-gray-300 dark:hover:border-white/20 transition-all">
                <div className="w-16 h-16 bg-gradient-electric rounded-xl flex items-center justify-center mb-6 text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 dark:bg-midnight">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Whether you're looking to learn, build, or grow your business, we're here to help you succeed
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/academy" className="px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-electric-blue/50 transition-all">
              Start Learning
            </a>
            <a href="/contact" className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all">
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
