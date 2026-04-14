import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatWidget from '../components/chat/ChatWidget';
import VisitorAssistant from '../components/VisitorAssistant';
import { useSettings } from '../context/SettingsContext';

const MainLayout = () => {
  const { settings } = useSettings();
  
  return (
    <div className="flex flex-col min-h-screen transition-colors bg-white dark:bg-gray-900">
      <div className="py-1 transition-colors bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="container flex justify-center px-6 mx-auto">
          <div className="flex items-center">
            <span className="mr-2 text-xs text-gray-600 dark:text-gray-400">Language:</span>
            <div id="google_translate_element"></div>
          </div>
        </div>
      </div>
      
      {/* Quick Contact Info Bar */}
      <div className="py-2 text-white transition-colors bg-indigo-600 dark:bg-indigo-700">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-1 text-sm sm:flex-row sm:space-y-0 sm:space-x-6">
            <a href={`tel:${settings.contactPhone || '+234-916-140-3450'}`} className="flex items-center transition-colors hover:text-indigo-200">
              📞 {settings.contactPhone || '+234-916-140-3450'}
            </a>
            <a href={`mailto:${settings.contactEmail || 'inntechlabhq@gmail.com'}`} className="flex items-center transition-colors hover:text-indigo-200">
              ✉️ {settings.contactEmail || 'inntechlabhq@gmail.com'}
            </a>
            {(settings.businessHours || 'Mon-Fri 9AM-6PM WAT') && (
              <span className="flex items-center">
                🕒 {settings.businessHours || 'Mon-Fri 9AM-6PM WAT'}
              </span>
            )}
          </div>
        </div>
      </div>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
      <VisitorAssistant />
    </div>
  );
};

export default MainLayout;