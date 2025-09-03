import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { TrendingUp, MessageSquare, FolderOpen, Mail, Settings, Star, Users, X, BookOpen, Tag } from 'lucide-react';

const AdminAside = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);

  const navItems = [
    { path: '/admin', icon: TrendingUp, label: 'Overview', exact: true },
    { path: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
    { path: '/admin/projects', icon: FolderOpen, label: 'Projects' },
    { path: '/admin/blog', icon: BookOpen, label: 'Blog' },
    { path: '/admin/categories', icon: Tag, label: 'Categories' },
    { path: '/admin/feedback', icon: Star, label: 'Feedback' },
    { path: '/admin/team', icon: Users, label: 'Team' },
    { path: '/admin/newsletter', icon: Mail, label: 'Newsletter' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' }
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile close button */}
        <div className="flex justify-end p-4 lg:hidden">
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.exact}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminAside;