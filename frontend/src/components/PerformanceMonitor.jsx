import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const loadTime = entry.loadEventEnd - entry.loadEventStart;
          if (loadTime > 3000) {
            console.warn(`Slow page load: ${loadTime}ms`);
          }
        }
        
        if (entry.entryType === 'largest-contentful-paint') {
          if (entry.startTime > 2500) {
            console.warn(`Slow LCP: ${entry.startTime}ms`);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint'] });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default PerformanceMonitor;