import { useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';

const DynamicFavicon = () => {
  const { settings } = useSettings();
  const { isDark } = useTheme();

  useEffect(() => {
    const iconUrl = isDark
      ? (settings.darkIcon || settings.favicon || settings.logo)
      : (settings.favicon || settings.logo || settings.darkIcon);

    if (iconUrl) {
      let link = document.querySelector('link[rel="icon"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/x-icon';
      link.href = iconUrl;
    }

    if (settings.siteName) {
      document.title = settings.siteName;
    }
  }, [settings.favicon, settings.darkIcon, settings.siteName, isDark]);

  return null;
};

export default DynamicFavicon;
