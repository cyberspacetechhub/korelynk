import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Server, Database, Cloud, Palette, Shield, BarChart3, Cpu, Globe } from 'lucide-react';
import axios from '../../api/axios';

const SkillsShowcase = () => {
  const [courseCounts, setCourseCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseCounts();
  }, []);

  const fetchCourseCounts = async () => {
    try {
      const response = await axios.get('/courses');
      if (response.data.success) {
        const courses = response.data.data;
        const counts = {};
        
        skills.forEach(skill => {
          counts[skill.title] = courses.filter(course => 
            course.category === skill.category || 
            course.skills?.some(s => skill.keywords.includes(s.toLowerCase()))
          ).length;
        });
        
        setCourseCounts(counts);
      }
    } catch (error) {
      console.error('Error fetching course counts:', error);
    } finally {
      setLoading(false);
    }
  };

  const skills = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'HTML, CSS, JavaScript, React, Vue.js',
      color: 'bg-blue-500',
      category: 'Web Development',
      keywords: ['html', 'css', 'javascript', 'react', 'vue']
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'React Native, Flutter, iOS, Android',
      color: 'bg-green-500',
      category: 'Mobile Development',
      keywords: ['react native', 'flutter', 'ios', 'android']
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Node.js, Python, Java, PHP, .NET',
      color: 'bg-purple-500',
      category: 'Backend Development',
      keywords: ['nodejs', 'python', 'java', 'php', 'dotnet']
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'MySQL, MongoDB, PostgreSQL, Redis',
      color: 'bg-orange-500',
      category: 'Database',
      keywords: ['mysql', 'mongodb', 'postgresql', 'redis']
    },
    {
      icon: Cloud,
      title: 'Cloud Computing',
      description: 'AWS, Azure, Google Cloud, Docker',
      color: 'bg-cyan-500',
      category: 'DevOps',
      keywords: ['aws', 'azure', 'gcp', 'docker', 'cloud']
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Figma, Adobe XD, Sketch, Prototyping',
      color: 'bg-pink-500',
      category: 'UI/UX Design',
      keywords: ['figma', 'adobe xd', 'sketch', 'design']
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Ethical Hacking, Network Security, CISSP',
      color: 'bg-red-500',
      category: 'Cybersecurity',
      keywords: ['security', 'hacking', 'cissp', 'network']
    },
    {
      icon: BarChart3,
      title: 'Data Science',
      description: 'Python, R, Machine Learning, Analytics',
      color: 'bg-indigo-500',
      category: 'Data Science',
      keywords: ['python', 'r', 'machine learning', 'analytics']
    },
    {
      icon: Cpu,
      title: 'DevOps',
      description: 'CI/CD, Kubernetes, Jenkins, Terraform',
      color: 'bg-yellow-500',
      category: 'DevOps',
      keywords: ['cicd', 'kubernetes', 'jenkins', 'terraform']
    },
    {
      icon: Globe,
      title: 'Digital Marketing',
      description: 'SEO, Social Media, Content Marketing',
      color: 'bg-teal-500',
      category: 'Digital Marketing',
      keywords: ['seo', 'social media', 'marketing']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Master In-Demand Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of technology and business skills. 
            Each skill is taught by industry experts with hands-on projects and real-world applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-12 h-12 ${skill.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {skill.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {skill.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-indigo-600 font-medium text-sm">
                    {loading ? '...' : (courseCounts[skill.title] || 0)} Courses
                  </span>
                  <Link 
                    to={`/courses?category=${encodeURIComponent(skill.category)}`}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium group-hover:translate-x-1 transition-transform"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-8 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">500+</div>
              <div className="text-sm text-gray-600">Students Trained</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">Expert Instructors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;