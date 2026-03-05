import React from 'react';

const TechStackMarquee = () => {
  const technologies = [
    { 
      name: 'React', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    { 
      name: 'Next.js', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      darkInvert: true
    },
    { 
      name: 'Node.js', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    { 
      name: 'Express.js', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      darkInvert: true
    },
    { 
      name: 'MongoDB', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    },
    { 
      name: 'TypeScript', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
    { 
      name: 'Tailwind CSS', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
    },
    { 
      name: 'Git', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    },
    { 
      name: 'GitHub', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      darkInvert: true
    },
    { 
      name: 'Docker', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
    },
    { 
      name: 'AWS', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg'
    },
    { 
      name: 'Figma', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
    }
  ];

  return (
    <section className="py-16 bg-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            Our Technology Stack
          </h2>
          <p className="text-xl text-gray-400">
            Cutting-edge technologies powering scalable solutions
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex animate-marquee space-x-12 md:space-x-16">
          {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center justify-center group"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-110 transition-all duration-300">
                <img
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  className={`w-full h-full object-contain ${tech.darkInvert ? 'dark:filter dark:brightness-0 dark:invert' : ''}`}
                  loading="lazy"
                />
              </div>
              <span className="mt-3 text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackMarquee;
