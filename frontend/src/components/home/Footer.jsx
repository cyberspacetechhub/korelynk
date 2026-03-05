import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github, Instagram, ArrowRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { toast } from 'react-toastify';
import axios from '../../api/axios';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    
    setIsSubscribing(true);
    try {
      await axios.post('newsletter/subscribe', { email: newsletterEmail });
      setNewsletterEmail('');
      toast.success('Successfully subscribed to newsletter!');
    } catch (error) {
      const message = error.response?.data?.message || 'Subscription failed. Please try again.';
      toast.error(message);
    } finally {
      setIsSubscribing(false);
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Store', href: '/store' },
    { name: 'AI', href: '/ai' },
    { name: 'Contact', href: '/contact' }
  ];

  const resources = [
    { name: 'Blog', href: '/blog' },
    { name: 'Code Samples', href: '/code-samples' },
    { name: 'Courses', href: '/courses' },
    { name: 'Services', href: '/services' },
    { name: 'Careers', href: '/careers' }
  ];

  return (
    <footer className="bg-midnight border-t border-white/10">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
              Stay in the Loop
            </h3>
            <p className="text-xl text-gray-400 mb-8">
              Subscribe to our newsletter for the latest updates, tutorials, and tech insights
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300 disabled:opacity-50 inline-flex items-center justify-center"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6 space-x-3">
              {settings.logo ? (
                <img src={settings.logo} alt={settings.siteName} className="w-auto h-10" />
              ) : (
                <>
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-electric">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold font-display text-white">{settings.siteName.split(' ')[0] || 'KoreLynk'}</span>
                    <span className="-mt-1 text-sm text-electric-cyan">{settings.siteName.split(' ').slice(1).join(' ') || 'Tech'}</span>
                  </div>
                </>
              )}
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Building the future of digital innovation through education, tools, and infrastructure.
            </p>
            <div className="flex space-x-4">
              {settings.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.linkedin && (
                <a href={settings.socialLinks.linkedin} className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.github && (
                <a href={settings.socialLinks.github} className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-display text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-electric-cyan transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-electric-cyan transition-all mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold font-display text-white mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-electric-cyan transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-electric-cyan transition-all mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold font-display text-white mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-electric-cyan mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{settings.contactEmail}</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-electric-cyan mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{settings.contactPhone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-electric-cyan mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{settings.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {settings.siteName}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-electric-cyan transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-electric-cyan transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
