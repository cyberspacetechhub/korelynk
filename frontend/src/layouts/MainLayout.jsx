import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatWidget from '../components/chat/ChatWidget';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen transition-colors bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default MainLayout;
