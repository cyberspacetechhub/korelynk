import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Github, Instagram, Share2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const FloatingSocial = () => {
  const { settings } = useSettings();
  const [expanded, setExpanded] = useState(false);

  const links = [
    { key: 'facebook', icon: <Facebook className="w-4 h-4" />, color: 'hover:bg-blue-600' },
    { key: 'twitter', icon: <Twitter className="w-4 h-4" />, color: 'hover:bg-sky-500' },
    { key: 'linkedin', icon: <Linkedin className="w-4 h-4" />, color: 'hover:bg-blue-700' },
    { key: 'github', icon: <Github className="w-4 h-4" />, color: 'hover:bg-gray-700' },
    { key: 'instagram', icon: <Instagram className="w-4 h-4" />, color: 'hover:bg-pink-600' },
  ].filter(l => settings.socialLinks?.[l.key]);

  if (links.length === 0) return null;

  return (
    <div className="fixed left-4 bottom-8 z-40 flex flex-col items-center gap-2">
      {/* Social icons — slide up when expanded */}
      <div className={`flex flex-col items-center gap-2 transition-all duration-300 overflow-hidden ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        {links.map(({ key, icon, color }) => (
          <a
            key={key}
            href={settings.socialLinks[key]}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-midnight-50 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 ${color} hover:text-white hover:border-transparent shadow-sm transition-all duration-200`}
            aria-label={key}
          >
            {icon}
          </a>
        ))}
        {/* Connector line */}
        <div className="w-px h-6 bg-gray-300 dark:bg-white/20"></div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(p => !p)}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-electric text-white shadow-lg hover:shadow-electric-blue/50 transition-all duration-200"
        aria-label="Toggle social links"
      >
        <Share2 className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-45' : ''}`} />
      </button>
    </div>
  );
};

export default FloatingSocial;
