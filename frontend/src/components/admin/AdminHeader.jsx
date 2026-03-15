import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NotificationCenter from './NotificationCenter';

const AdminHeader = ({ onMenuClick }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 lg:px-6">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 text-gray-600 rounded-md hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-2 lg:ml-0">
            <h1 className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">Admin Dashboard</h1>
            <p className="hidden text-sm text-gray-600 sm:block">InnTechLab</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <NotificationCenter />
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center px-3 py-2 space-x-2 transition-colors rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="hidden text-sm font-medium text-gray-700 sm:block">
                {user?.fullname || 'Administrator'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <Link
                  to="/admin/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </Link>
                <hr className="my-1" />
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    handleLogout();
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;