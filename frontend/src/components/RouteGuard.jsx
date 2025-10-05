import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';

const RouteGuard = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Track previous route for unauthorized page
  useEffect(() => {
    const adminToken = localStorage.getItem('accessToken');
    const studentToken = localStorage.getItem('studentToken');
    const instructorToken = localStorage.getItem('instructorToken');
    
    if (adminToken || studentToken || instructorToken) {
      sessionStorage.setItem('previousRoute', currentPath);
    }
  }, [currentPath]);
  
  // Check if user has any of the required tokens
  const adminToken = localStorage.getItem('accessToken');
  const studentToken = localStorage.getItem('studentToken');
  const instructorToken = localStorage.getItem('instructorToken');
  
  // Determine current user role
  let currentRole = null;
  if (adminToken) currentRole = 'admin';
  else if (studentToken) currentRole = 'student';
  else if (instructorToken) currentRole = 'instructor';
  
  // Check if current role is allowed for this route
  if (currentRole && allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    return <Unauthorized />;
  }
  
  // Check for cross-role access attempts
  if (currentRole) {
    // Admin trying to access student/instructor routes
    if (currentRole === 'admin' && (currentPath.startsWith('/student/') || currentPath.startsWith('/instructor/'))) {
      return <Unauthorized />;
    }
    
    // Student trying to access admin/instructor routes
    if (currentRole === 'student' && (currentPath.startsWith('/admin/') || currentPath.startsWith('/instructor/'))) {
      return <Unauthorized />;
    }
    
    // Instructor trying to access admin/student routes
    if (currentRole === 'instructor' && (currentPath.startsWith('/admin/') || currentPath.startsWith('/student/'))) {
      return <Unauthorized />;
    }
  }
  
  return children;
};

export default RouteGuard;