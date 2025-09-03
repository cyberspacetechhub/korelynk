import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github, Instagram } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import axios from '../../api/axios';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const newsletterMutation = useMutation(
    (email) => axios.post('newsletter/subscribe', { email }),
    {
      onSuccess: () => {
        setNewsletterEmail('');
        toast.success('Successfully subscribed to newsletter!');
      },
      onError: (error) => {
        const message = error.response?.data?.message || 'Subscription failed. Please try again.';
        toast.error(message);
      }
    }
  );

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      newsletterMutation.mutate(newsletterEmail);
    }
  };

  const services = [
    'Web Development',
    'Mobile Apps',
    'E-commerce',
    'API Development',
    'Cloud Solutions',
    'UI/UX Design'
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              {settings.logo ? (
                <img src={settings.logo} alt={settings.siteName} className="h-10 w-auto" />
              ) : (
                <>
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold">{settings.siteName.split(' ')[0] || 'Cyberspace'}</span>
                    <span className="text-sm text-indigo-400 -mt-1">{settings.siteName.split(' ').slice(1).join(' ') || 'Tech Hub'}</span>
                  </div>
                </>
              )}
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              {settings.siteDescription}
            </p>
            <div className="flex space-x-4">
              {settings.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} className="text-gray-400 hover:text-indigo-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} className="text-gray-400 hover:text-indigo-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.linkedin && (
                <a href={settings.socialLinks.linkedin} className="text-gray-400 hover:text-indigo-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.github && (
                <a href={settings.socialLinks.github} className="text-gray-400 hover:text-indigo-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} className="text-gray-400 hover:text-indigo-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to="/services" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 mb-8">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="text-gray-300 text-sm">{settings.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span className="text-gray-300 text-sm">{settings.contactPhone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span className="text-gray-300 text-sm">{settings.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Subscribe to our newsletter for the latest updates</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-indigo-500 text-white"
              />
              <button 
                type="submit"
                disabled={newsletterMutation.isLoading}
                className="bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {newsletterMutation.isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} {settings.siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;