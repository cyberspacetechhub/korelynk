import React from 'react';

const BrandedLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Logo and Brand */}
      <div className="flex items-center mb-8">
        <img 
          src="/kore-lynk.png" 
          alt="KoreLynk Tech" 
          className="h-40 mr-3 w-"
        />
        {/* <div>
          <h1 className="text-2xl font-bold text-gray-900">KoreLynk Tech</h1>
          <p className="text-sm text-gray-600">Innovation in Technology</p>
        </div> */}
      </div>
      
      {/* Spinner */}
      <div className="w-12 h-12 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
      
      {/* Loading Text */}
      <p className="mt-4 text-gray-600 animate-pulse">Loading KoreLynk Tech...</p>
    </div>
  );
};

export default BrandedLoader;