import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="py-1 bg-gray-100 border-b border-gray-200">
        <div className="container flex justify-center px-6 mx-auto">
          <div className="flex items-center">
            <span className="mr-2 text-xs text-gray-600">Language:</span>
            <div id="google_translate_element"></div>
          </div>
        </div>
      </div>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;