import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, ChevronRight, Play, CheckCircle, Clock, Users, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { tutorialAPI } from '../api/tutorialAPI';

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
    { id: 'html', name: 'HTML', icon: '📄', color: 'from-orange-500 to-red-500' },
    { id: 'css', name: 'CSS', icon: '🎨', color: 'from-blue-500 to-cyan-500' },
    { id: 'javascript', name: 'JavaScript', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
    { id: 'react', name: 'React', icon: '⚛️', color: 'from-cyan-500 to-blue-500' },
    { id: 'nodejs', name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-500' },
    { id: 'python', name: 'Python', icon: '🐍', color: 'from-blue-600 to-yellow-500' },
    { id: 'mongodb', name: 'MongoDB', icon: '🍃', color: 'from-green-600 to-green-400' },
    { id: 'git', name: 'Git', icon: '📦', color: 'from-orange-600 to-red-600' }
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
                        <span className="mr-3 text-2xl">{category.icon}</span>
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
                  <span className="mr-4 text-4xl">
                    {categories.find(c => c.id === activeCategory)?.icon}
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
