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
    <div className="min-h-screen bg-white dark:bg-midnight transition-colors">
      <SEO 
        title="Korelynk Academy - Free Programming Tutorials"
        description="Learn web development for free with Korelynk Academy. Master HTML, CSS, JavaScript, React, Node.js, and more with hands-on tutorials."
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b border-gray-200 dark:border-white/10">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-electric-cyan mr-2" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Free Learning Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-display text-gray-900 dark:text-white mb-6">
              Learn to Code,
              <span className="block mt-2 bg-gradient-electric bg-clip-text text-transparent">
                Completely Free
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Master web development with our comprehensive tutorials. From HTML basics to advanced React, learn at your own pace.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-6 py-4">
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
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-6">Tutorial Categories</h2>
                
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
                        <span className="text-2xl mr-3">{category.icon}</span>
                        <div className="text-left">
                          <div className="font-semibold">{category.name}</div>
                          <div className="text-xs opacity-75">{getCategoryCount(category.id)} lessons</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ))}
                </nav>

                <div className="mt-8 p-4 bg-gradient-to-br from-electric-blue/10 to-electric-violet/10 rounded-xl border border-gray-200 dark:border-white/10">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">🎯 Learning Path</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Follow our structured curriculum</p>
                  <Link
                    to="/courses"
                    className="block text-center px-4 py-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-lg text-sm font-medium text-gray-900 dark:text-white transition-colors"
                  >
                    View All Courses
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
              {/* Tutorial Header */}
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-8">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">
                    {categories.find(c => c.id === activeCategory)?.icon}
                  </span>
                  <div>
                    <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
                      {categories.find(c => c.id === activeCategory)?.name} Tutorial
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      {getCategoryCount(activeCategory)} comprehensive lessons
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
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
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-6">Lessons</h3>
                
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-electric-cyan animate-spin" />
                  </div>
                ) : error ? (
                  <div className="text-center py-12 text-red-400">{error}</div>
                ) : tutorials.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">No tutorials available yet</div>
                ) : (
                  <div className="space-y-3">
                    {tutorials.map((tutorial) => (
                      <Link
                        key={tutorial._id}
                        to={`/academy/${activeCategory}/${tutorial.slug}`}
                        className="flex items-center justify-between p-4 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 group"
                      >
                        <div className="flex items-center flex-1">
                          <Play className="w-5 h-5 text-electric-cyan mr-4 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white group-hover:text-electric-cyan transition-colors">
                              {tutorial.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {tutorial.duration} min • {tutorial.difficulty}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-electric-cyan transition-colors" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Code Example */}
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
                  <div className="flex items-center">
                    <Code2 className="w-5 h-5 text-electric-cyan mr-3" />
                    <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">Try It Yourself</h3>
                  </div>
                  <button className="px-4 py-2 bg-gradient-electric text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-electric-blue/50 transition-all">
                    Run Code
                  </button>
                </div>
                
                <div className="p-6">
                  {currentTutorial?.codeExample ? (
                    <pre className="bg-black/50 rounded-xl p-6 overflow-x-auto">
                      <code className="text-sm font-mono text-gray-300">
                        {currentTutorial.codeExample}
                      </code>
                    </pre>
                  ) : (
                    <div className="text-center py-12 text-gray-400">No code example available</div>
                  )}
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Pro Tip</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
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
      <section className="py-24 bg-gray-900 dark:bg-midnight border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of developers learning to code with Korelynk Academy
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-electric-blue/50 transition-all duration-300"
          >
            Browse All Courses
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Academy;
