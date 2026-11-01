import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, ChevronRight, Play, CheckCircle, Clock, Users, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { tutorialAPI } from '../api/tutorialAPI';

const TechIcon = ({ name, className = 'w-8 h-8' }) => {
  const icons = {
    html: (
      <svg viewBox="0 0 32 32" className={className}><path fill="#e44d26" d="M5 3l2.1 23.4L16 29l8.9-2.6L27 3z"/><path fill="#f16529" d="M16 27.1V5.1H25l-1.8 20z"/><path fill="#ebebeb" d="M16 13.5H11.5l-.3-3.5H16V6.6H7.8l.8 9h7.4zm0 8.4l-.1.1-3.7-1-.2-2.7H8.6l.5 5.5 6.9 1.9z"/><path fill="#fff" d="M16 13.5v3.4h4.2l-.4 4.6-3.8 1v3.4l6.9-1.9.1-.6 1-11.5.1-.9H16z"/></svg>
    ),
    css: (
      <svg viewBox="0 0 32 32" className={className}><path fill="#1572b6" d="M5 3l2.1 23.4L16 29l8.9-2.6L27 3z"/><path fill="#33a9dc" d="M16 27.1V5.1H25l-1.8 20z"/><path fill="#fff" d="M16 13.5h4.5l.3-3.5H16V6.6h8.2l-.8 9H16zm0 8.4v-3.4l.1.1 3.7-1 .2-2.7h3.4l-.5 5.5-6.9 1.9z"/><path fill="#ebebeb" d="M16 13.5v3.4h-4.2l-.4-4.6 3.8 1V10l-6.9 1.9-.1.6-1 11.5-.1.9H16v-3.4l-3.7-1-.2-2.7H16z"/></svg>
    ),
    javascript: (
      <svg viewBox="0 0 32 32" className={className}><rect width="32" height="32" rx="3" fill="#f7df1e"/><path d="M19.5 25.6c.6 1 1.4 1.7 2.8 1.7 1.2 0 1.9-.6 1.9-1.4 0-1-.8-1.3-2-1.9l-.7-.3c-2-.8-3.3-1.9-3.3-4.1 0-2 1.6-3.6 4-3.6 1.7 0 3 .6 3.9 2.2l-2.1 1.4c-.5-.9-1-1.2-1.8-1.2-.8 0-1.3.5-1.3 1.2 0 .8.5 1.2 1.7 1.7l.7.3c2.3 1 3.6 2 3.6 4.3 0 2.5-1.9 3.8-4.5 3.8-2.5 0-4.1-1.2-4.9-2.8l2-.1zM10.5 25.9c.4.7.8 1.3 1.7 1.3.9 0 1.4-.3 1.4-1.7v-9.1h2.6v9.2c0 2.8-1.6 4-4 4-2.1 0-3.4-1.1-4-2.5l2.3-1.2z"/></svg>
    ),
    react: (
      <svg viewBox="0 0 32 32" className={className}><circle cx="16" cy="16" r="2.8" fill="#61dafb"/><g fill="none" stroke="#61dafb" strokeWidth="1.2"><ellipse cx="16" cy="16" rx="11" ry="4.2"/><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(120 16 16)"/></g></svg>
    ),
    nodejs: (
      <svg viewBox="0 0 32 32" className={className}><path fill="#83cd29" d="M16 3L4 9.8v12.4L16 29l12-6.8V9.8z"/><path fill="#404137" d="M16 3L4 9.8v12.4L16 29V3z" opacity=".15"/><path fill="#fff" d="M16 8.5c-.4 0-.7.1-1 .3l-6.5 3.7c-.6.4-1 1-1 1.7v7.4c0 .7.4 1.4 1 1.7l1.7 1c.8.4 1.1.4 1.5.4 1.2 0 1.9-.7 1.9-2v-7.3h-1.9v7.3c0 .5-.5.9-1.4.5l-1.8-1V14c0-.2.1-.4.3-.5l6.5-3.7c.2-.1.4-.1.6 0l6.5 3.7c.2.1.3.3.3.5v7.4c0 .2-.1.4-.3.5l-6.5 3.7c-.2.1-.4.1-.6 0l-1.7-1c-.1-.1-.3-.1-.4 0-.5.3-.6.3-1.1.5.1.1.3.2.4.3l1.7 1c.3.2.6.3 1 .3s.7-.1 1-.3l6.5-3.7c.6-.4 1-1 1-1.7V14c0-.7-.4-1.4-1-1.7L17 8.8c-.3-.2-.6-.3-1-.3z"/></svg>
    ),
    python: (
      <svg viewBox="0 0 32 32" className={className}><path fill="#3776ab" d="M15.9 3C11 3 11.3 5.1 11.3 5.1l.1 2.1h4.7v.6H8.8S6 7.5 6 12.5s2.4 4.8 2.4 4.8h1.5v-2.3s-.1-2.4 2.4-2.4h4.1s2.3 0 2.3-2.2V5.3S19.1 3 15.9 3zm-2.3 1.3c.4 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.4-.8.8-.8z"/><path fill="#ffd43b" d="M16.1 29c4.9 0 4.6-2.1 4.6-2.1l-.1-2.1h-4.7v-.6h7.3s2.8.3 2.8-4.7-2.4-4.8-2.4-4.8h-1.5v2.3s.1 2.4-2.4 2.4h-4.1s-2.3 0-2.3 2.2v4.1S12.9 29 16.1 29zm2.3-1.3c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.4.8-.8.8z"/></svg>
    ),
    mongodb: (
      <svg viewBox="0 0 32 32" className={className}><path fill="#4db33d" d="M16 3c-1.5 5.5-4.5 7-4.5 12.5 0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5C20.5 10 17.5 8.5 16 3z"/><path fill="#3fa037" d="M16 3v17c2.5 0 4.5-2 4.5-4.5C20.5 10 17.5 8.5 16 3z"/><path fill="#4db33d" d="M16 20v9l-1-1.5V20h1z"/><path fill="#3fa037" d="M16 20v9l1-1.5V20h-1z"/></svg>
    ),
    git: (
      <svg viewBox="0 0 32 32" className={className}><path fill="#f05032" d="M29.5 14.5l-12-12a2.1 2.1 0 00-3 0l-2.6 2.6 3.3 3.3a2.5 2.5 0 013.2 3.2l3.2 3.2a2.5 2.5 0 11-1.5 1.5l-3-3v7.8a2.5 2.5 0 11-2 0V13a2.5 2.5 0 01-1.3-3.3L7.5 6.4l-5 5a2.1 2.1 0 000 3l12 12a2.1 2.1 0 003 0l12-12a2.1 2.1 0 000-2.9z"/></svg>
    ),
  };
  return icons[name] || null;
};

const Academy = () => {
  const [activeCategory, setActiveCategory] = useState('html');
  const [tutorials, setTutorials] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTutorials();
    fetchCategoryStats();
  }, [activeCategory]);

  const fetchTutorials = async () => {
    try {
      setLoading(true);
      const response = await tutorialAPI.getTutorialsByCategory(activeCategory);
      setTutorials(response.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load tutorials');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryStats = async () => {
    try {
      const response = await tutorialAPI.getCategoryStats();
      setCategoryStats(response.data || []);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const getCategoryCount = (categoryId) => {
    const stat = categoryStats.find(s => s._id === categoryId);
    return stat ? stat.count : 0;
  };

  const categories = [
    { id: 'html',       name: 'HTML',       color: 'from-orange-500 to-red-500' },
    { id: 'css',        name: 'CSS',        color: 'from-blue-500 to-cyan-500' },
    { id: 'javascript', name: 'JavaScript', color: 'from-yellow-400 to-orange-500' },
    { id: 'react',      name: 'React',      color: 'from-cyan-500 to-blue-500' },
    { id: 'nodejs',     name: 'Node.js',    color: 'from-green-500 to-emerald-500' },
    { id: 'python',     name: 'Python',     color: 'from-blue-600 to-yellow-500' },
    { id: 'mongodb',    name: 'MongoDB',    color: 'from-green-600 to-green-400' },
    { id: 'git',        name: 'Git',        color: 'from-orange-600 to-red-600' },
  ];

  const currentTutorial = tutorials[0] || null;

  const totalTutorials = categoryStats.reduce((sum, stat) => sum + stat.count, 0);
  
  const stats = [
    { number: `${totalTutorials}+`, label: 'Free Tutorials' },
    { number: '50K+', label: 'Students' },
    { number: '8', label: 'Technologies' },
    { number: '100%', label: 'Free Forever' }
  ];

  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-midnight">
      <SEO 
        title="InnTechLab Academy - Free Programming Tutorials"
        description="Learn web development for free with InnTechLab Academy. Master HTML, CSS, JavaScript, React, Node.js, and more with hands-on tutorials."
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b border-gray-200 dark:border-white/10">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        
        <div className="container relative px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full dark:bg-white/5 dark:border-white/10">
              <BookOpen className="w-4 h-4 mr-2 text-electric-cyan" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Free Learning Platform</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl font-display dark:text-white">
              Learn to Code,
              <span className="block mt-2 text-transparent bg-gradient-electric bg-clip-text">
                Completely Free
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-300">
              Master web development with our comprehensive tutorials. From HTML basics to advanced React, learn at your own pace.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="px-6 py-4 bg-gray-100 border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="flex-shrink-0 lg:w-80">
              <div className="sticky p-6 border border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10 rounded-2xl top-24">
                <h2 className="mb-6 text-xl font-bold text-gray-900 font-display dark:text-white">Tutorial Categories</h2>
                
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                        activeCategory === category.id
                          ? 'bg-gradient-electric text-white shadow-lg shadow-electric-blue/30'
                          : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-transparent'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 flex-shrink-0">
                          <TechIcon name={category.id} />
                        </span>
                        <div className="text-left">
                          <div className="font-semibold">{category.name}</div>
                          <div className="text-xs opacity-75">{getCategoryCount(category.id)} lessons</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ))}
                </nav>

                <div className="p-4 mt-8 border border-gray-200 bg-gradient-to-br from-electric-blue/10 to-electric-violet/10 rounded-xl dark:border-white/10">
                  <h3 className="mb-2 font-bold text-gray-900 dark:text-white">🎯 Learning Path</h3>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">Follow our structured curriculum</p>
                  <Link
                    to="/courses"
                    className="block px-4 py-2 text-sm font-medium text-center text-gray-900 transition-colors bg-gray-200 rounded-lg dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 dark:text-white"
                  >
                    View All Courses
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
              {/* Tutorial Header */}
              <div className="p-8 mb-8 border border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10 rounded-2xl">
                <div className="flex items-center mb-4">
                  <span className="mr-4 flex-shrink-0">
                    <TechIcon name={activeCategory} className="w-10 h-10" />
                  </span>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 font-display dark:text-white">
                      {categories.find(c => c.id === activeCategory)?.name} Tutorial
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      {getCategoryCount(activeCategory)} comprehensive lessons
                    </p>
                  </div>
                </div>
                
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Learn {categories.find(c => c.id === activeCategory)?.name} from scratch with our easy-to-follow tutorials. 
                  Perfect for beginners and experienced developers alike.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="w-5 h-5 mr-2 text-electric-cyan" />
                    <span>Self-paced learning</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="w-5 h-5 mr-2 text-electric-cyan" />
                    <span>10K+ students</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-2 text-electric-cyan" />
                    <span>100% Free</span>
                  </div>
                </div>
              </div>

              {/* Lessons List */}
              <div className="p-8 mb-8 border border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10 rounded-2xl">
                <h3 className="mb-6 text-2xl font-bold text-gray-900 font-display dark:text-white">Lessons</h3>
                
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-electric-cyan animate-spin" />
                  </div>
                ) : error ? (
                  <div className="py-12 text-center text-red-400">{error}</div>
                ) : tutorials.length === 0 ? (
                  <div className="py-12 text-center text-gray-400">No tutorials available yet</div>
                ) : (
                  <div className="space-y-3">
                    {tutorials.map((tutorial) => (
                      <Link
                        key={tutorial._id}
                        to={`/academy/${activeCategory}/${tutorial.slug}`}
                        className="flex items-center justify-between p-4 transition-all duration-300 bg-white border border-gray-200 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 group"
                      >
                        <div className="flex items-center flex-1">
                          <Play className="flex-shrink-0 w-5 h-5 mr-4 text-electric-cyan" />
                          <div>
                            <div className="font-semibold text-gray-900 transition-colors dark:text-white group-hover:text-electric-cyan">
                              {tutorial.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {tutorial.duration} min • {tutorial.difficulty}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 transition-colors group-hover:text-electric-cyan" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Code Example */}
              <div className="overflow-hidden border border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10 rounded-2xl">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
                  <div className="flex items-center">
                    <Code2 className="w-5 h-5 mr-3 text-electric-cyan" />
                    <h3 className="text-xl font-bold text-gray-900 font-display dark:text-white">Try It Yourself</h3>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-white transition-all rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50">
                    Run Code
                  </button>
                </div>
                
                <div className="p-6">
                  {currentTutorial?.codeExample ? (
                    <pre className="p-6 overflow-x-auto bg-black/50 rounded-xl">
                      <code className="font-mono text-sm text-gray-300">
                        {currentTutorial.codeExample}
                      </code>
                    </pre>
                  ) : (
                    <div className="py-12 text-center text-gray-400">No code example available</div>
                  )}
                </div>

                <div className="p-6 bg-gray-100 border-t border-gray-200 dark:border-white/10 dark:bg-white/5">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">💡 Pro Tip</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Practice makes perfect! Try modifying the code above and see what happens. 
                    Experiment with different values and learn by doing.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 border-t dark:bg-midnight border-white/10">
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl font-display">
            Ready to Start Learning?
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-xl text-gray-300">
            Join thousands of developers learning to code with InnTechLab Academy
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-2xl hover:shadow-electric-blue/50"
          >
            Browse All Courses
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Academy;
