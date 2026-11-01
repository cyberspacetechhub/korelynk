import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, Search, GraduationCap, ChevronDown } from 'lucide-react';
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
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  const navigation = [
    { name: 'Home',           href: '/' },
    { name: 'Courses',        href: '/courses' },
    { name: 'Free Tutorials', href: '/academy' },
    { name: 'Code Samples',   href: '/code-samples' },
    { name: 'Blog',           href: '/blog' },
  ];

  const authLinks = [
    { name: 'Student Portal',    href: '/student/login',    color: 'text-indigo-600' },
    { name: 'Instructor Portal', href: '/instructor/login', color: 'text-purple-600' },
    { name: 'Admin Portal',      href: '/admin/login',      color: 'text-gray-600' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 transition-colors border-b border-gray-200 backdrop-blur-md dark:bg-midnight-50/95 dark:border-electric-blue/20 bg-white/95">
      <nav className="container px-6 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            {logoSrc ? (
              <img src={logoSrc} alt={settings.siteName || 'InnTechLab Academy'} className="object-contain w-9 h-9" />
            ) : (
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-electric">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
            )}
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold text-gray-900 dark:text-white font-display">InnTechLab</span>
              <span className="text-xs text-electric-cyan font-medium">Academy</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="items-center hidden space-x-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all relative ${
                  isActive(item.href)
                    ? 'text-electric-cyan'
                    : 'text-gray-600 dark:text-gray-300 hover:text-electric-cyan dark:hover:text-white'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-electric rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="items-center hidden gap-2 md:flex">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center px-3 py-2 text-sm text-gray-500 transition-all border border-gray-200 rounded-lg dark:text-gray-400 dark:border-white/10 hover:text-electric-cyan hover:border-electric-cyan/50"
              title="Search (Ctrl+K)"
            >
              <Search className="w-4 h-4 mr-1.5" />
              <span className="text-xs text-gray-400">⌘K</span>
            </button>

            <ThemeToggle />

            {/* Login dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/40 transition-all">
                Sign In <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute right-0 z-50 invisible w-48 mt-1 transition-all duration-200 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 dark:bg-midnight-50 dark:border-white/10 group-hover:opacity-100 group-hover:visible">
                {authLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 first:rounded-t-xl last:rounded-b-xl ${link.color} dark:text-gray-300`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-gray-600 dark:text-gray-300 hover:text-electric-cyan">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600 dark:text-gray-300 hover:text-electric-cyan">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-electric-blue/20 py-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-electric-cyan bg-electric-blue/10'
                    : 'text-gray-700 dark:text-gray-300 hover:text-electric-cyan hover:bg-electric-blue/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-gray-200 dark:border-electric-blue/20 space-y-1">
              <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Portals</p>
              {authLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${link.color} dark:text-gray-300`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
