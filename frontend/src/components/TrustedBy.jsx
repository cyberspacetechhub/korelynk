import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import { optimizeCloudinaryUrl } from '../utils/imageOptimizer';

const TrustedBy = () => {
  const { data: projects = [] } = useQuery({
    queryKey: ['trusted-projects'],
    queryFn: async () => {
      const response = await axios.get('/projects?limit=12');
      return response.data.success ? response.data.data : [];
    }
  });

  // Duplicate projects multiple times for seamless loop on all screen sizes
  const duplicatedProjects = [...projects, ...projects, ...projects, ...projects];

  return (
    <section className="py-16 bg-gray-50 dark:bg-midnight-100 transition-colors overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12 px-6">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            Trusted By Amazing Clients
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Proud to work with innovative companies and startups
          </p>
        </div>
        
        <div className="relative">
          <div className="flex animate-marquee space-x-8 md:space-x-12">
            {duplicatedProjects.map((project, index) => (
              <div 
                key={`${project._id}-${index}`}
                className="flex-shrink-0 flex flex-col items-center group min-w-[80px]"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-midnight-50 border border-gray-100 dark:border-white/10 rounded-xl shadow-lg p-2 md:p-3 mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={optimizeCloudinaryUrl(project.image || '/default-project.png', 100, 100)}
                    alt={`${project.title} logo`}
                    width="80"
                    height="80"
                    className="w-full h-full object-contain rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-400 text-center max-w-16 md:max-w-20 truncate">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-gray-50 dark:from-midnight-100 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-gray-50 dark:from-midnight-100 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;