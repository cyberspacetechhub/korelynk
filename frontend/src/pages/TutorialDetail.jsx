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
      <div className="flex items-center justify-center min-h-screen bg-midnight">
        <Loader2 className="w-12 h-12 text-electric-cyan animate-spin" />
      </div>
    );
  }

  if (error || !tutorial) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-midnight">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Tutorial Not Found</h1>
          <Link
            to="/academy"
            className="transition-colors text-electric-cyan hover:text-electric-blue"
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
        title={`${tutorial.title} - InnTechLab Academy`}
        description={tutorial.description}
      />

      {/* Header */}
      <section className="py-12 border-b border-white/10">
        <div className="container px-6 mx-auto">
          <button
            onClick={() => navigate('/academy')}
            className="flex items-center mb-6 text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Academy
          </button>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm rounded-full bg-white/10 text-electric-cyan">
                {tutorial.category.toUpperCase()}
              </span>
              <span className={`text-sm font-medium ${difficultyColors[tutorial.difficulty]}`}>
                {tutorial.difficulty}
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl font-display">
              {tutorial.title}
            </h1>

            <p className="mb-6 text-xl text-gray-300">
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
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Tutorial Content */}
            <div className="p-8 mb-8 border bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
              <h2 className="mb-6 text-2xl font-bold text-white font-display">What You'll Learn</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
                  {tutorial.content}
                </p>
              </div>
            </div>

            {/* Code Example */}
            {tutorial.codeExample && (
              <div className="mb-8 overflow-hidden border bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white font-display">Code Example</h3>
                  <button
                    onClick={() => navigator.clipboard.writeText(tutorial.codeExample)}
                    className="px-4 py-2 text-sm text-white transition-colors rounded-lg bg-white/10 hover:bg-white/20"
                  >
                    Copy Code
                  </button>
                </div>
                <div className="p-6 bg-black/50">
                  <pre className="overflow-x-auto">
                    <code className="font-mono text-sm text-gray-300">
                      {tutorial.codeExample}
                    </code>
                  </pre>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Link
                to={`/academy?category=${category}`}
                className="flex items-center px-6 py-3 text-white transition-colors rounded-lg bg-white/10 hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                All {category.toUpperCase()} Lessons
              </Link>

              <Link
                to="/academy"
                className="flex items-center px-6 py-3 text-white transition-all rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50"
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
