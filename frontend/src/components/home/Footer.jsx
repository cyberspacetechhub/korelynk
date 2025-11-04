import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github, Instagram } from 'lucide-react';
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
    <footer className="text-white bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6 space-x-3">
              {settings.logo ? (
                <img src={settings.logo} alt={settings.siteName} className="w-auto h-10" />
              ) : (
                <>
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold">{settings.siteName.split(' ')[0] || 'KoreLynk'}</span>
                    <span className="-mt-1 text-sm text-indigo-400">{settings.siteName.split(' ').slice(1).join(' ') || 'Tech'}</span>
                  </div>
                </>
              )}
            </div>
            <p className="max-w-md mb-6 leading-relaxed text-gray-300">
              {settings.siteDescription}
            </p>
            <div className="flex space-x-4">
              {settings.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} className="text-gray-400 transition-colors hover:text-indigo-400">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} className="text-gray-400 transition-colors hover:text-indigo-400">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.linkedin && (
                <a href={settings.socialLinks.linkedin} className="text-gray-400 transition-colors hover:text-indigo-400">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.github && (
                <a href={settings.socialLinks.github} className="text-gray-400 transition-colors hover:text-indigo-400">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} className="text-gray-400 transition-colors hover:text-indigo-400">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to="/services" 
                    className="text-gray-300 transition-colors hover:text-white"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Quick Links</h3>
            <ul className="mb-8 space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-4 text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-gray-300">{settings.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-gray-300">{settings.contactPhone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-gray-300">{settings.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="pt-8 mt-12 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <h3 className="mb-2 text-lg font-semibold">Stay Updated</h3>
              <p className="text-gray-300">Subscribe to our newsletter for the latest updates</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-l-lg md:w-64 focus:outline-none focus:border-indigo-500"
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-2 text-white transition-colors bg-indigo-600 rounded-r-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 text-center border-t border-gray-800">
          <p className="text-gray-400">
            © {currentYear} {settings.siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;