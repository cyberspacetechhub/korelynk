import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, Globe, Search } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import SearchModal from '../SearchModal';
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../context/ThemeContext';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();
  const { isDark } = useTheme();

  const logoSrc = isDark
    ? (settings.darkIcon || settings.favicon || settings.logo)
    : (settings.favicon || settings.logo || settings.darkIcon);

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
    { name: 'Academy', href: '/academy' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Store', href: '/store', badge: 'Soon' },
    { name: 'AI', href: '/ai', badge: 'Soon' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const authLinks = [
    { name: 'Student Portal', href: '/student/login' },
    { name: 'Instructor Portal', href: '/instructor/login' },
    { name: 'Admin Portal', href: '/admin/login' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 transition-colors border-b border-gray-200 backdrop-blur-md dark:bg-midnight-50/95 dark:border-electric-blue/20 bg-gray-50">
      <nav className="container px-6 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            {logoSrc ? (
              <>
                <img
                  src={logoSrc}
                  alt={settings.siteName || 'InnTechLabs'}
                  className="object-contain w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 dark:text-white font-display">{settings.siteName?.split(' ')[0] || 'InnTechLabs'}</span>
                  <span className="-mt-1 text-sm text-electric-cyan">{settings.siteName?.split(' ').slice(1).join(' ') || ''}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-electric">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 dark:text-white font-display">{settings.siteName?.split(' ')[0] || 'InnTechLabs'}</span>
                  <span className="-mt-1 text-sm text-electric-cyan">{settings.siteName?.split(' ').slice(1).join(' ') || ''}</span>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-4 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all relative group ${
                  isActive(item.href)
                    ? 'text-electric-cyan'
                    : 'text-gray-600 dark:text-gray-300 hover:text-electric-cyan dark:hover:text-white'
                }`}
              >
                {item.name}
                {item.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold bg-electric-violet/20 text-electric-violet rounded">
                    {item.badge}
                  </span>
                )}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-electric"></span>
                )}
              </Link>
            ))}
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center px-3 py-2 text-gray-500 transition-all border border-gray-200 rounded-lg dark:text-gray-400 dark:border-white/10 hover:text-electric-cyan dark:hover:text-white hover:border-electric-cyan/50 hover:bg-electric-blue/5 dark:hover:bg-white/5"
              title="Search (Ctrl+K)"
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="text-sm">Search</span>
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-white/10 rounded text-gray-400">
                ⌘K
              </span>
            </button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Auth Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 font-medium text-white transition-all rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50">
                Get Started
              </button>
              <div className="absolute right-0 z-50 invisible w-48 mt-2 transition-all duration-200 border rounded-md shadow-lg opacity-0 bg-midnight-50 border-white/10 group-hover:opacity-100 group-hover:visible">
                {authLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white first:rounded-t-md last:rounded-b-md"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-electric-cyan"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-electric-cyan"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 dark:bg-midnight-50 dark:border-electric-blue/20">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-electric-cyan bg-electric-blue/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-electric-cyan hover:bg-electric-blue/5'
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
                className="flex items-center w-full px-3 py-2 text-gray-700 transition-colors rounded-md dark:text-gray-300 hover:text-electric-cyan hover:bg-electric-blue/5"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
              
              {/* Mobile Auth Links */}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-electric-blue/20">
                <p className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">Login Portals</p>
                {authLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-gray-700 transition-colors rounded-md dark:text-gray-300 hover:text-electric-cyan hover:bg-electric-blue/5"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
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