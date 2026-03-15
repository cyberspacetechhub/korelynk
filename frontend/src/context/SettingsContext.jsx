import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    return {
      settings: {
        siteName: 'InnTechLab', logo: '', favicon: '', darkIcon: '',
        contactEmail: '', contactPhone: '', address: '',
        socialLinks: { facebook: '', twitter: '', linkedin: '', github: '', instagram: '' },
        seoSettings: { metaTitle: '', metaDescription: '', keywords: [] }
      },
      loading: true,
      refreshSettings: () => {}
    };
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    siteName: 'InnTechLab',
    siteDescription: 'Professional web and mobile development services',
    logo: '',
    favicon: '',
    darkIcon: '',
    contactEmail: 'inntechlab@gmail.com',
    contactPhone: '+234-916-140-3450',
    address: 'Abakaliki, Ebonyi State, Nigeria',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      github: '',
      instagram: ''
    },
    seoSettings: {
      metaTitle: 'InnTechLab - Professional Development Services',
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
      const response = await axios.get('/admin/settings', { timeout: 5000 });
      if (response.data.success) {
        const data = response.data.data;
        setSettings(prev => ({
          ...prev,
          ...data,
          socialLinks: { ...prev.socialLinks, ...(data.socialLinks || {}) },
          seoSettings: { ...prev.seoSettings, ...(data.seoSettings || {}) }
        }));
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error.message);
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