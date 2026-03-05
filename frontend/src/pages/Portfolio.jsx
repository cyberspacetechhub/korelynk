import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter, Mail, MapPin, Briefcase, Code2, Palette } from 'lucide-react';
import axios from '../api/axios';
import SEO from '../components/SEO';

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
    <div className="min-h-screen bg-midnight">
      <SEO 
        title="Portfolio - Mkpuma Shedrach | Full-Stack Developer"
        description="Explore the portfolio of Mkpuma Shedrach, Founder/CEO of Korelynk Tech. Specializing in React, Node.js, Express.js, MongoDB, Next.js, and Graphics Design."
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-electric-blue/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-electric-violet/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8">
            <Briefcase className="w-4 h-4 text-electric-cyan mr-2" />
            <span className="text-sm font-medium text-gray-300">Founder & CEO</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6">
            Mkpuma Shedrach
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            Full-Stack Developer & Creative Designer
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-gray-400">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-electric-cyan" />
              <span>Nigeria</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-electric-cyan" />
              <span>korelynk@gmail.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-8 text-center">
              About Me
            </h2>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I'm Mkpuma Shedrach, the Founder and CEO of Korelynk Tech Group. With a passion for building innovative digital solutions, 
                I specialize in full-stack web development and creative design, transforming ideas into powerful, scalable applications.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                My journey in technology began with a curiosity about how things work on the web. Over the years, I've honed my skills 
                in modern web technologies including React, Node.js, Express.js, MongoDB, and Next.js. I believe in writing clean, 
                maintainable code and creating user experiences that are both beautiful and functional.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Beyond development, I'm also passionate about graphic design and visual communication. I use tools like Figma, Photoshop, 
                and Illustrator to bring creative visions to life, ensuring that every project I work on is not just technically sound 
                but also visually compelling.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Through Korelynk Tech, I'm building a platform that empowers developers, businesses, and creators across Africa and beyond. 
                My mission is to bridge the gap between technology and innovation, creating tools and education that make a real difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <Code2 className="w-4 h-4 text-electric-cyan mr-2" />
              <span className="text-sm font-medium text-gray-300">Technologies I Use</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              My Tech Stack
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Specialized in modern web technologies and creative design tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-white/5 rounded-xl p-3 mb-4 group-hover:bg-white/10 transition-colors">
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    className={`w-full h-full object-contain ${tech.darkInvert ? 'dark:filter dark:brightness-0 dark:invert' : ''}`}
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-400">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Graphics & Design Section */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <Palette className="w-4 h-4 text-electric-cyan mr-2" />
              <span className="text-sm font-medium text-gray-300">Creative Design</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              Graphics & Design
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Creating visually stunning designs that communicate and inspire
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Brand Identity</h3>
              <p className="text-gray-400">Logo design, color schemes, and visual branding</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">UI/UX Design</h3>
              <p className="text-gray-400">User interfaces and experience design</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Marketing Materials</h3>
              <p className="text-gray-400">Social media graphics and promotional content</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              My Projects
            </h2>
            <p className="text-xl text-gray-400 mb-8">
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
                      : 'bg-white/5 backdrop-blur-sm text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-cyan"></div>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project._id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
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
                            className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-electric-blue/20 text-electric-cyan rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-electric-blue/50 transition-all duration-300"
          >
            Get In Touch
            <Mail className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
