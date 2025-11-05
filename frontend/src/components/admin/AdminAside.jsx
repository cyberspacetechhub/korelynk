import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { TrendingUp, MessageSquare, FolderOpen, Mail, Settings, Star, Users, X, BookOpen, Tag, BarChart3, Layers, Code, GraduationCap, UserCheck, Database, Calendar, CreditCard } from 'lucide-react';
import PerformanceMonitor from '../PerformanceMonitor';

const AdminAside = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);

  const navSections = [
    {
      title: 'Dashboard',
      items: [
        { path: '/admin', icon: BarChart3, label: 'Overview', exact: true }
      ]
    },
    {
      title: 'Content Management',
      items: [
        { path: '/admin/blog', icon: BookOpen, label: 'Blog Posts' },
        { path: '/admin/categories', icon: Tag, label: 'Categories' },
        { path: '/admin/code-samples', icon: Code, label: 'Code Tutorials' },
        { path: '/admin/projects', icon: Layers, label: 'Projects' }
      ]
    },
    {
      title: 'Learning Management',
      items: [
        { path: '/admin/courses', icon: GraduationCap, label: 'Courses' },
        { path: '/admin/classes', icon: Calendar, label: 'Classes' },
        { path: '/admin/enrollments', icon: UserCheck, label: 'Enrollments' },
        { path: '/admin/payments', icon: CreditCard, label: 'Payments' }
      ]
    },
    {
      title: 'Communication',
      items: [
        { path: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
        { path: '/admin/chat', icon: MessageSquare, label: 'Chat Support' },
        { path: '/admin/feedback', icon: Star, label: 'Reviews' },
        { path: '/admin/team', icon: Users, label: 'Team Members' },
        { path: '/admin/newsletter', icon: Mail, label: 'Newsletter' }
      ]
    },
    {
      title: 'User Management',
      items: [
        { path: '/admin/students', icon: Users, label: 'Students' },
        { path: '/admin/instructors', icon: GraduationCap, label: 'Instructors' }
      ]
    },
    {
      title: 'Analytics',
      items: [
        { path: '/admin/analytics', icon: TrendingUp, label: 'Analytics' },
        { path: '/admin/advanced-analytics', icon: Database, label: 'Advanced Analytics' }
      ]
    },
    {
      title: 'System',
      items: [
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
        { path: '/admin/payment-account', icon: CreditCard, label: 'Payment Account' }
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-10 bg-gray-900/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`fixed top-20 left-0 z-30 w-72 bg-white shadow-2xl border-r border-gray-100 h-[calc(100vh-4rem)] flex flex-col transform transition-all duration-300 ease-out lg:translate-x-0 lg:fixed lg:z-30 lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
              <p className="text-xs text-gray-500">Management Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full">
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="px-3 mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.exact}
                      onClick={() => onClose()}
                      className={({ isActive }) =>
                        `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-sm border-l-4 border-indigo-500'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                        }`
                      }
                    >
                      <item.icon className={`w-5 h-5 mr-3 transition-colors ${
                        'group-hover:text-indigo-500'
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center mb-2 space-x-3 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
        </div>
        
        {/* <div className='my-10'>
          <PerformanceMonitor />
        </div> */}
      </aside>
    </>
  );
};

export default AdminAside;