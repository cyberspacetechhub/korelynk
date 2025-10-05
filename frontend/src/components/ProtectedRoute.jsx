import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';
import BrandedLoader from './BrandedLoader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Check if user has student or instructor tokens (cross-role access)
  const studentToken = localStorage.getItem('studentToken');
  const instructorToken = localStorage.getItem('instructorToken');
  
  if (loading) {
    return <BrandedLoader />;
  }
  
  // If user has student or instructor token, show unauthorized
  if (studentToken || instructorToken) {
    return <Unauthorized />;
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;