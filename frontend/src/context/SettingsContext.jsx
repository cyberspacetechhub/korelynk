import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    siteName: 'Cyberspace Tech Hub',
    siteDescription: 'Professional web and mobile development services',
    logo: '',
    favicon: '',
    contactEmail: 'hello@cyberspacetechhub.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Tech Street, Digital City, DC 12345',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      github: '',
      instagram: ''
    },
    seoSettings: {
      metaTitle: 'Cyberspace Tech Hub - Professional Development Services',
      metaDescription: 'We create innovative web and mobile solutions that drive business growth',
      keywords: ['web development', 'mobile apps', 'tech solutions']
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/admin/settings');
      if (response.data.success) {
        setSettings(prev => ({
          ...prev,
          ...response.data.data,
          socialLinks: {
            ...prev.socialLinks,
            ...(response.data.data.socialLinks || {})
          },
          seoSettings: {
            ...prev.seoSettings,
            ...(response.data.data.seoSettings || {})
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    settings,
    loading,
    refreshSettings: fetchSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};