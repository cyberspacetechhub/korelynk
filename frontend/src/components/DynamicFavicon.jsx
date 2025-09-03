import { useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

const DynamicFavicon = () => {
  const { settings } = useSettings();

  useEffect(() => {
    if (settings.favicon) {
      // Remove existing favicon
      const existingFavicon = document.querySelector('link[rel="icon"]');
      if (existingFavicon) {
        existingFavicon.remove();
      }

      // Add new favicon
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = settings.favicon;
      document.head.appendChild(link);
    }

    // Update title if available
    if (settings.siteName) {
      document.title = settings.siteName;
    }
  }, [settings.favicon, settings.siteName]);

  return null;
};

export default DynamicFavicon;