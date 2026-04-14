import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github, Instagram, ArrowRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();
  const { isDark } = useTheme();
  const logoSrc = isDark
    ? (settings.darkIcon || settings.favicon || settings.logo)
    : (settings.favicon || settings.logo || settings.darkIcon);
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
    { name: 'Home', href: '/', external: false },
    { name: 'Academy', href: 'https://academy.inntechlab.online', external: true },
    { name: 'Portfolio', href: '/portfolio', external: false },
    { name: 'Store', href: '/store', external: false },
    { name: 'AI', href: '/ai', external: false },
    { name: 'Contact', href: '/contact', external: false }
  ];

  const resources = [
    { name: 'Blog', href: '/blog' },
    { name: 'Code Samples', href: '/code-samples' },
    { name: 'Courses', href: '/courses' },
    { name: 'Services', href: '/services' },
    { name: 'Careers', href: '/careers' }
  ];

  return (
    <footer className="border-t border-gray-200 dark:bg-midnight bg-gray-50 dark:border-white/10">
      {/* Newsletter Section */}
      <div className="border-b border-gray-200 dark:border-b dark:border-white/10">
        <div className="container px-6 py-16 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl font-display dark:text-white">
              Stay in the Loop
            </h3>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for the latest updates, tutorials, and tech insights
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col max-w-xl gap-4 mx-auto sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-400 transition-all bg-white border border-gray-200 rounded-lg dark:bg-white/5 dark:border-white/10 dark:text-white focus:ring-2 focus:ring-electric-cyan focus:border-transparent"
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50 disabled:opacity-50"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container px-6 py-16 mx-auto">
        <div className="grid gap-12 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6 space-x-3">
              {logoSrc ? (
                <>
                  <img
                    src={logoSrc}
                    alt={settings.siteName || 'InnTechLab'}
                    className="object-contain w-10 h-10"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900 font-display dark:text-white">{settings.siteName?.split(' ')[0] || 'InnTechLab'}</span>
                    <span className="-mt-1 text-sm text-electric-cyan">{settings.siteName?.split(' ').slice(1).join(' ') || ''}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-electric">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900 font-display dark:text-white">{settings.siteName?.split(' ')[0] || 'InnTechLab'}</span>
                    <span className="-mt-1 text-sm text-electric-cyan">{settings.siteName?.split(' ').slice(1).join(' ') || ''}</span>
                  </div>
                </>
              )}
            </div>
            <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">
              Building the future of digital innovation through education, tools, and infrastructure.
            </p>
            <div className="flex space-x-4">
              {settings.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all bg-gray-100 border border-gray-200 rounded-lg dark:bg-white/5 dark:border-white/10 dark:text-gray-400 hover:text-white hover:bg-electric-blue hover:border-electric-blue">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all bg-gray-100 border border-gray-200 rounded-lg dark:bg-white/5 dark:border-white/10 dark:text-gray-400 hover:text-white hover:bg-electric-blue hover:border-electric-blue">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.linkedin && (
                <a href={settings.socialLinks.linkedin} className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all bg-gray-100 border border-gray-200 rounded-lg dark:bg-white/5 dark:border-white/10 dark:text-gray-400 hover:text-white hover:bg-electric-blue hover:border-electric-blue">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.github && (
                <a href={settings.socialLinks.github} className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all bg-gray-100 border border-gray-200 rounded-lg dark:bg-white/5 dark:border-white/10 dark:text-gray-400 hover:text-white hover:bg-electric-blue hover:border-electric-blue">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {settings.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all bg-gray-100 border border-gray-200 rounded-lg dark:bg-white/5 dark:border-white/10 dark:text-gray-400 hover:text-white hover:bg-electric-blue hover:border-electric-blue">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-gray-900 font-display dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-400 transition-colors hover:text-electric-cyan group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-electric-cyan transition-all mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </a>
                  ) : (
                  <Link 
                    to={link.href} 
                    className="inline-flex items-center text-gray-400 transition-colors hover:text-electric-cyan group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-electric-cyan transition-all mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-gray-900 font-display dark:text-white">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="inline-flex items-center text-gray-400 transition-colors hover:text-electric-cyan group"
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
            <h3 className="mb-6 text-lg font-bold text-gray-900 font-display dark:text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-electric-cyan mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{settings.contactEmail}</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-electric-cyan mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{settings.contactPhone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-electric-cyan mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{settings.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} {settings.siteName}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 transition-colors hover:text-electric-cyan">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 transition-colors hover:text-electric-cyan">
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
