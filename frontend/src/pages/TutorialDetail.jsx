import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BarChart3, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { tutorialAPI } from '../api/tutorialAPI';

const TutorialDetail = () => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTutorial();
  }, [slug]);

  const fetchTutorial = async () => {
    try {
      setLoading(true);
      const response = await tutorialAPI.getTutorialBySlug(slug);
      setTutorial(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load tutorial');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-electric-cyan animate-spin" />
      </div>
    );
  }

  if (error || !tutorial) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Tutorial Not Found</h1>
          <Link
            to="/academy"
            className="text-electric-cyan hover:text-electric-blue transition-colors"
          >
            Back to Academy
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    Beginner: 'text-green-400',
    Intermediate: 'text-yellow-400',
    Advanced: 'text-red-400'
  };

  return (
    <div className="min-h-screen bg-midnight">
      <SEO 
        title={`${tutorial.title} - InnTechLabs Academy`}
        description={tutorial.description}
      />

      {/* Header */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-6">
          <button
            onClick={() => navigate('/academy')}
            className="flex items-center text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Academy
          </button>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-electric-cyan">
                {tutorial.category.toUpperCase()}
              </span>
              <span className={`text-sm font-medium ${difficultyColors[tutorial.difficulty]}`}>
                {tutorial.difficulty}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              {tutorial.title}
            </h1>

            <p className="text-xl text-gray-300 mb-6">
              {tutorial.description}
            </p>

            <div className="flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-electric-cyan" />
                <span>{tutorial.duration}</span>
              </div>
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-electric-cyan" />
                <span>{tutorial.difficulty} Level</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-electric-cyan" />
                <span>{tutorial.views || 0} views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Tutorial Content */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold font-display text-white mb-6">What You'll Learn</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                  {tutorial.content}
                </p>
              </div>
            </div>

            {/* Code Example */}
            {tutorial.codeExample && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h3 className="text-xl font-bold font-display text-white">Code Example</h3>
                  <button
                    onClick={() => navigator.clipboard.writeText(tutorial.codeExample)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                  >
                    Copy Code
                  </button>
                </div>
                <div className="p-6 bg-black/50">
                  <pre className="overflow-x-auto">
                    <code className="text-sm font-mono text-gray-300">
                      {tutorial.codeExample}
                    </code>
                  </pre>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Link
                to={`/academy?category=${category}`}
                className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                All {category.toUpperCase()} Lessons
              </Link>

              <Link
                to="/academy"
                className="flex items-center px-6 py-3 bg-gradient-electric text-white rounded-lg hover:shadow-lg hover:shadow-electric-blue/50 transition-all"
              >
                Browse More Tutorials
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorialDetail;
