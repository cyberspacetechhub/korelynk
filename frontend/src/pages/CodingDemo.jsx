import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Mail, Code, Upload, Globe, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const CodingDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [codeLines, setCodeLines] = useState([]);

  const steps = [
    {
      id: 0,
      title: "Client Request Received",
      description: "Avatar receives project requirements from client",
      avatar: "💼",
      status: "Analyzing requirements...",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 1,
      title: "Planning & Design",
      description: "Avatar creates project architecture and design",
      avatar: "🎨",
      status: "Designing solution...",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 2,
      title: "Coding in Progress",
      description: "Avatar writes clean, efficient code",
      avatar: "👨‍💻",
      status: "Writing code...",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 3,
      title: "Testing & Review",
      description: "Avatar tests functionality and reviews code quality",
      avatar: "🔍",
      status: "Testing application...",
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: 4,
      title: "Deployment",
      description: "Avatar pushes code to production server",
      avatar: "🚀",
      status: "Deploying to production...",
      color: "from-red-500 to-pink-600"
    },
    {
      id: 5,
      title: "Live Production",
      description: "Project is live and accessible to users",
      avatar: "🌐",
      status: "Project live!",
      color: "from-teal-500 to-cyan-600"
    }
  ];

  const codeSnippets = [
    "// Client Requirements Analysis",
    "const projectRequirements = {",
    "  type: 'E-commerce Website',",
    "  features: ['Shopping Cart', 'Payment'],",
    "  timeline: '4 weeks'",
    "};",
    "",
    "// Setting up React App",
    "import React from 'react';",
    "import { BrowserRouter } from 'react-router-dom';",
    "",
    "function App() {",
    "  return (",
    "    <BrowserRouter>",
    "      <Header />",
    "      <ProductList />",
    "      <ShoppingCart />",
    "      <Footer />",
    "    </BrowserRouter>",
    "  );",
    "}",
    "",
    "// Deploying to production",
    "npm run build",
    "git add .",
    "git commit -m 'Deploy e-commerce site'",
    "git push origin main",
    "",
    "// ✅ Project Successfully Deployed!"
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % steps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  useEffect(() => {
    if (currentStep >= 2 && currentStep <= 4) {
      let lineInterval;
      if (isPlaying) {
        lineInterval = setInterval(() => {
          setCodeLines(prev => {
            if (prev.length < codeSnippets.length) {
              return [...prev, codeSnippets[prev.length]];
            }
            return prev;
          });
        }, 200);
      }
      return () => clearInterval(lineInterval);
    } else {
      setCodeLines([]);
    }
  }, [currentStep, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCodeLines([]);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <SEO 
        title="Live Coding Demonstration - See Our Development Process"
        description="Watch our avatar developer in action! See the complete development workflow from client request to live production deployment."
        keywords={['coding demonstration', 'development process', 'live coding', 'web development workflow']}
        url="/coding-demo"
      />
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Live Coding Demonstration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Watch our avatar developer take your project from concept to production in real-time
          </p>
          
          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={handlePlay}
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
              {isPlaying ? 'Pause' : 'Start'} Demo
            </button>
            <button
              onClick={handleReset}
              className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </button>
          </div>
        </div>

        {/* Main Demo Area */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Avatar & Status */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className={`w-32 h-32 bg-gradient-to-br ${currentStepData.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-all duration-500 ${isPlaying ? 'scale-110' : 'scale-100'}`}>
                <span className="text-6xl">{currentStepData.avatar}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {currentStepData.description}
              </p>
              <div className="flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${isPlaying ? 'animate-pulse bg-green-400' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600">{currentStepData.status}</span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                  index === currentStep ? 'bg-indigo-50 border-l-4 border-indigo-500' : 
                  index < currentStep ? 'bg-green-50 border-l-4 border-green-500' : 'bg-gray-50'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    index === currentStep ? 'bg-indigo-500 text-white' :
                    index < currentStep ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={`text-sm font-medium ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Editor / Production Preview */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {currentStep < 5 ? (
              /* Code Editor */
              <div className="bg-gray-900 h-full">
                <div className="flex items-center px-4 py-3 bg-gray-800">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-4 text-gray-400 text-sm">project.js</span>
                </div>
                <div className="p-6 h-96 overflow-y-auto">
                  <div className="font-mono text-sm">
                    {codeLines.map((line, index) => (
                      <div key={index} className={`mb-1 ${
                        line.startsWith('//') ? 'text-green-400' :
                        line.includes('import') || line.includes('const') || line.includes('function') ? 'text-purple-400' :
                        line.includes('npm') || line.includes('git') ? 'text-yellow-400' :
                        line.includes('✅') ? 'text-green-400' :
                        'text-gray-300'
                      }`}>
                        {line || '\u00A0'}
                      </div>
                    ))}
                    {isPlaying && currentStep >= 2 && currentStep <= 4 && (
                      <div className="w-2 h-4 bg-white animate-pulse inline-block"></div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Production Preview */
              <div className="h-full">
                <div className="flex items-center px-4 py-3 bg-gray-100 border-b">
                  <Globe className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">https://your-project.com</span>
                  <div className="ml-auto flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-xs text-green-600">Live</span>
                  </div>
                </div>
                <div className="p-8 h-96 bg-gradient-to-br from-blue-50 to-indigo-100">
                  <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Your Project is Live!</h3>
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-lg mb-4">
                        <h4 className="font-semibold">E-commerce Website</h4>
                        <p className="text-sm opacity-90">Fully functional online store</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="font-semibold text-gray-900">Performance</div>
                          <div className="text-green-600">98/100</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="font-semibold text-gray-900">Security</div>
                          <div className="text-green-600">A+</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="font-semibold text-gray-900">Mobile</div>
                          <div className="text-green-600">Responsive</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="font-semibold text-gray-900">SEO</div>
                          <div className="text-green-600">Optimized</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What You Get With Our Development Process
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Clean Code</h4>
              <p className="text-gray-600 text-sm">Well-structured, maintainable code following best practices</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fast Deployment</h4>
              <p className="text-gray-600 text-sm">Quick and reliable deployment to production servers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Live Monitoring</h4>
              <p className="text-gray-600 text-sm">Continuous monitoring and support for your live project</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingDemo;