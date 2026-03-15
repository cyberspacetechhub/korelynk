import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter, Mail, MapPin, Briefcase, Code2, Palette } from 'lucide-react';
import axios from '../api/axios';
import SEO from '../components/SEO';
import { optimizeCloudinaryUrl } from '../utils/imageOptimizer';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects');
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'saas', name: 'SaaS Platforms' }
  ];

  const techStack = [
    { 
      name: 'React', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      category: 'Frontend'
    },
    { 
      name: 'Next.js', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      category: 'Frontend',
      darkInvert: true
    },
    { 
      name: 'Node.js', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      category: 'Backend'
    },
    { 
      name: 'Express.js', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      category: 'Backend',
      darkInvert: true
    },
    { 
      name: 'MongoDB', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      category: 'Database'
    },
    { 
      name: 'Figma', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      category: 'Design'
    },
    { 
      name: 'Photoshop', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
      category: 'Design'
    },
    { 
      name: 'Illustrator', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
      category: 'Design'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-midnight">
      <SEO 
        title="Portfolio - Mkpuma Shedrach | Full-Stack Developer"
        description="Explore the portfolio of Mkpuma Shedrach, Founder/CEO of InnTechLab. Specializing in React, Node.js, Express.js, MongoDB, Next.js, and Graphics Design."
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gray-900 dark:bg-midnight">
        <div className="absolute inset-0 opacity-50 bg-gradient-glow"></div>
        <div className="absolute inset-0">
          <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-electric-blue/20 blur-3xl animate-pulse"></div>
          <div className="absolute delay-1000 rounded-full bottom-20 right-10 w-96 h-96 bg-electric-violet/20 blur-3xl animate-pulse"></div>
        </div>

        <div className="container relative px-6 py-20 mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-8 border rounded-full bg-white/5 border-white/10">
            <Briefcase className="w-4 h-4 mr-2 text-electric-cyan" />
            <span className="text-sm font-medium text-gray-300">Founder & CEO</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl font-display">
            Mkpuma Shedrach
          </h1>
          
          <p className="mb-8 text-2xl text-gray-300 md:text-3xl">
            Full-Stack Developer & Creative Designer
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-gray-300">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-electric-cyan" />
              <span>Nigeria</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-electric-cyan" />
              <span>inntechlab@gmail.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-24 bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8 text-4xl font-bold text-center text-gray-900 md:text-5xl font-display dark:text-white">
              About Me
            </h2>
            
            <div className="p-8 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl md:p-12">
              <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                I'm Mkpuma Shedrach, the Founder and CEO of InnTechLab. With a passion for building innovative digital solutions, 
                I specialize in full-stack web development and creative design, transforming ideas into powerful, scalable applications.
              </p>
              
              <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                My journey in technology began with a curiosity about how things work on the web. Over the years, I've honed my skills 
                in modern web technologies including React, Node.js, Express.js, MongoDB, and Next.js. I believe in writing clean, 
                maintainable code and creating user experiences that are both beautiful and functional.
              </p>
              
              <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Beyond development, I'm also passionate about graphic design and visual communication. I use tools like Figma, Photoshop, 
                and Illustrator to bring creative visions to life, ensuring that every project I work on is not just technically sound 
                but also visually compelling.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Through InnTechLab, I'm building a platform that empowers developers, businesses, and creators across Africa and beyond. 
                My mission is to bridge the gap between technology and innovation, creating tools and education that make a real difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full dark:bg-white/5 dark:border-white/10">
              <Code2 className="w-4 h-4 mr-2 text-electric-cyan" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Technologies I Use</span>
            </div>
            
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">
              My Tech Stack
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Specialized in modern web technologies and creative design tools
            </p>
          </div>

          <div className="grid max-w-5xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:scale-105 group"
              >
                <div className="w-16 h-16 p-3 mb-4 transition-colors bg-gray-100 dark:bg-white/5 rounded-xl group-hover:bg-gray-200 dark:group-hover:bg-white/10">
                  <img
                    src={optimizeCloudinaryUrl(tech.logo, 64, 64)}
                    alt={`${tech.name} logo`}
                    width="64"
                    height="64"
                    className={`w-full h-full object-contain ${tech.darkInvert ? 'dark:filter dark:brightness-0 dark:invert' : ''}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">{tech.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Graphics & Design Section */}
      <section className="py-24 bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full dark:bg-white/5 dark:border-white/10">
              <Palette className="w-4 h-4 mr-2 text-electric-cyan" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Creative Design</span>
            </div>
            
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">
              Graphics & Design
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Creating visually stunning designs that communicate and inspire
            </p>
          </div>

          <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
            <div className="p-8 text-center transition-all duration-300 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Brand Identity</h3>
              <p className="text-gray-500 dark:text-gray-400">Logo design, color schemes, and visual branding</p>
            </div>

            <div className="p-8 text-center transition-all duration-300 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">UI/UX Design</h3>
              <p className="text-gray-500 dark:text-gray-400">User interfaces and experience design</p>
            </div>

            <div className="p-8 text-center transition-all duration-300 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Marketing Materials</h3>
              <p className="text-gray-500 dark:text-gray-400">Social media graphics and promotional content</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">
              My Projects
            </h2>
            <p className="mb-8 text-xl text-gray-500 dark:text-gray-400">
              A showcase of my work across web development and design
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-gradient-electric text-white shadow-lg shadow-electric-blue/50'
                      : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-electric-cyan"></div>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <div key={project._id} className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 group dark:bg-white/5 dark:border-white/10 rounded-2xl hover:border-gray-300 dark:hover:border-white/20">
                  <div className="relative overflow-hidden">
                    <img
                      src={optimizeCloudinaryUrl(project.image, 400, 300)}
                      alt={project.title}
                      width="400"
                      height="224"
                      className="object-cover w-full h-56 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100">
                      <div className="absolute flex gap-2 bottom-4 left-4 right-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center flex-1 px-4 py-2 text-sm font-medium text-gray-900 transition-colors bg-white rounded-lg hover:bg-gray-100"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center flex-1 px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="mb-4 text-gray-500 dark:text-gray-400 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 text-sm font-medium rounded-full bg-electric-blue/20 text-electric-cyan">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-400">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 dark:bg-midnight">
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl font-display">
            Let's Work Together
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-xl text-gray-300">
            Have a project in mind? Let's create something amazing together.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-2xl hover:shadow-electric-blue/50"
          >
            Get In Touch
            <Mail className="w-5 h-5 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
