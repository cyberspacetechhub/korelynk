import React, { useState, useEffect } from 'react';
import { CheckCircle, Users, Award, Target, Lightbulb, Shield, Linkedin, Github, Twitter } from 'lucide-react';
import axios from '../../api/axios';

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('/team');
      if (response.data.success) {
        setTeamMembers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      // Mockup data fallback
      setTeamMembers([
        {
          _id: '1',
          name: 'Shedrach Akintayo',
          role: 'Lead Developer & Founder',
          bio: 'Full-stack developer with 3+ years of experience in modern web technologies and a passion for creating exceptional digital experiences.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
          skills: ['React', 'Node.js', 'Python', 'AWS'],
          social: {
            linkedin: 'https://linkedin.com/in/shedrach',
            github: 'https://github.com/shedrach',
            twitter: 'https://twitter.com/shedrach'
          }
        },
        {
          _id: '2',
          name: 'Sarah Johnson',
          role: 'UI/UX Designer',
          bio: 'Creative designer focused on user-centered design principles and creating intuitive digital experiences.',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
          skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
          social: {
            linkedin: 'https://linkedin.com/in/sarahjohnson',
            twitter: 'https://twitter.com/sarahjohnson'
          }
        },
        {
          _id: '3',
          name: 'Michael Chen',
          role: 'Backend Specialist',
          bio: 'Expert in scalable backend systems, cloud architecture, and database optimization.',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
          skills: ['Node.js', 'Python', 'AWS', 'Docker'],
          social: {
            linkedin: 'https://linkedin.com/in/michaelchen',
            github: 'https://github.com/michaelchen'
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'github': return <Github className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      default: return null;
    }
  };
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Mission-Driven',
      description: 'We focus on delivering solutions that align with your business objectives and drive real results.'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'We stay ahead of technology trends to provide cutting-edge solutions for modern challenges.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Client-Centric',
      description: 'Your success is our priority. We build lasting partnerships through exceptional service.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Quality Assured',
      description: 'Every project undergoes rigorous testing to ensure the highest quality standards.'
    }
  ];



  const achievements = [
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
    { number: '3+', label: 'Years Experience' },
    { number: '99%', label: 'Client Satisfaction' }
  ];

  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{
        backgroundImage: 'url(/inntechlab-workspace.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container relative z-10 px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-5xl font-bold lg:text-6xl">
              About InnTechLab
            </h1>
            <p className="text-xl leading-relaxed text-indigo-100 lg:text-2xl">
              We are a passionate team of developers and designers dedicated to creating 
              innovative digital solutions that transform businesses and enhance user experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 transition-colors bg-white dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
                Our Story
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Founded with a vision to bridge the gap between innovative technology and 
                practical business solutions, InnTechLab has been at the forefront 
                of digital transformation since our inception.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                We believe that great software is not just about code – it's about understanding 
                your business, your users, and your goals. Every project we undertake is a 
                partnership aimed at delivering exceptional results that drive growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">3+ Years of Excellence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">50+ Successful Projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">30+ Happy Clients</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">99% Client Satisfaction Rate</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="object-cover w-full rounded-lg h-80"
                />
              </div>
              <div className="absolute p-6 transition-colors bg-white shadow-lg -bottom-6 -right-6 dark:bg-gray-800 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">99%</div>
                  <div className="text-gray-600 dark:text-gray-300">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 transition-colors bg-gray-50 dark:bg-gray-800">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
              Our Core Values
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              These principles guide everything we do and shape how we work with our clients
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 text-center transition-colors bg-white shadow-lg dark:bg-gray-700 rounded-xl dark:shadow-gray-900/50 hover-lift"
              >
                <div className="flex justify-center mb-4 text-indigo-600">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 transition-colors bg-white dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
              Meet Our Team
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Passionate professionals dedicated to delivering exceptional results
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-8 h-8 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  className="overflow-hidden transition-colors bg-white shadow-lg dark:bg-gray-800 rounded-xl dark:shadow-gray-900/50 hover-lift"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="object-cover w-full h-64"
                  />
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="mb-4 font-medium text-indigo-600 dark:text-indigo-400">
                      {member.role}
                    </p>
                    <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills?.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs text-indigo-800 bg-indigo-100 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-center space-x-3">
                      {Object.entries(member.social || {}).map(([platform, url]) => (
                        url && (
                          <a
                            key={platform}
                            href={url}
                            className="text-gray-400 transition-colors hover:text-indigo-600"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {getSocialIcon(platform)}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 text-white bg-indigo-600">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold lg:text-5xl">
              Our Achievements
            </h2>
            <p className="text-xl text-indigo-100">
              Numbers that speak for our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold lg:text-6xl">
                  {achievement.number}
                </div>
                <div className="text-lg text-indigo-200">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;