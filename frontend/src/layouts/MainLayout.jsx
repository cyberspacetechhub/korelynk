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
    <div className="flex flex-col min-h-screen">
      <div className="py-1 bg-gray-100 border-b border-gray-200">
        <div className="container flex justify-center px-6 mx-auto">
          <div className="flex items-center">
            <span className="mr-2 text-xs text-gray-600">Language:</span>
            <div id="google_translate_element"></div>
          </div>
        </div>
      </div>
      
      {/* Quick Contact Info Bar */}
      <div className="py-2 bg-indigo-600 text-white">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-6 text-sm">
            <a href={`tel:${settings.contactPhone || '+234-813-456-7890'}`} className="flex items-center hover:text-indigo-200 transition-colors">
              📞 {settings.contactPhone || '+234-813-456-7890'}
            </a>
            <a href={`mailto:${settings.contactEmail || 'korelynk@gmail.com'}`} className="flex items-center hover:text-indigo-200 transition-colors">
              ✉️ {settings.contactEmail || 'korelynk@gmail.com'}
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