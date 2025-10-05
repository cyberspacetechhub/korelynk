import React from 'react';
import { Navigate } from 'react-router-dom';

const InstructorProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('instructorToken');
  
  if (!token) {
    return <Navigate to="/instructor/login" replace />;
  }
  
  return children;
};

export default InstructorProtectedRoute;