import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, Globe, Search } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import SearchModal from '../SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);



  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Courses', href: '/courses' },
    { name: 'Blog', href: '/blog' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'Contact', href: '/contact' },
  ];

  const authLinks = [
    { name: 'Student Portal', href: '/student/login' },
    { name: 'Instructor Portal', href: '/instructor/login' },
    { name: 'Admin Portal', href: '/admin/login' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <nav className="container px-6 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            {settings.logo ? (
              <img src={settings.logo} alt={settings.siteName} className="w-auto h-10" />
            ) : (
              <>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900">{settings.siteName.split(' ')[0] || 'KoreLynk'}</span>
                  <span className="-mt-1 text-sm text-indigo-600">{settings.siteName.split(' ').slice(1).join(' ') || 'Tech'}</span>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-6 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center px-3 py-2 text-gray-600 transition-colors border border-gray-300 rounded-lg hover:text-indigo-600 hover:border-indigo-300"
              title="Search (Ctrl+K)"
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="text-sm">Search</span>
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 rounded text-gray-500">
                ⌘K
              </span>
            </button>
            
            {/* Auth Dropdown */}
            <div className="relative group">
              <button className="px-6 py-2 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Get Started
              </button>
              <div className="absolute right-0 z-50 invisible w-48 mt-2 transition-all duration-200 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible">
                {authLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-indigo-600"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-indigo-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Search Button */}
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 text-gray-700 transition-colors rounded-md hover:text-indigo-600 hover:bg-gray-50"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
              
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-6 py-3 mt-4 font-medium text-center text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;