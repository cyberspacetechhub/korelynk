import React, { useState, useEffect } from 'react';

const TranslateSpacer = () => {
  const [isTranslated, setIsTranslated] = useState(false);

  useEffect(() => {
    const checkTranslation = () => {
      const banner = document.querySelector('.goog-te-banner-frame');
      const isVisible = banner && banner.style.display !== 'none' && banner.offsetHeight > 0;
      setIsTranslated(isVisible);
    };

    // Check immediately
    checkTranslation();

    // Check periodically
    const interval = setInterval(checkTranslation, 500);

    return () => clearInterval(interval);
  }, []);

  if (!isTranslated) return null;

  return <div className="h-10 bg-blue-500"></div>;
};

export default TranslateSpacer;