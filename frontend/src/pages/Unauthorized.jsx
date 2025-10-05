import React from 'react';
import { Shield, RefreshCw, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  
  const handleReload = () => {
    const previousRoute = sessionStorage.getItem('previousRoute') || '/';
    navigate(previousRoute, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
            <Shield className="w-10 h-10 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. Please check your credentials or contact support.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleReload}
            className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          <Link
            to="/"
            className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;