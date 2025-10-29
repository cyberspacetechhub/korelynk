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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About KoreLynk Tech
            </h1>
            <p className="text-xl lg:text-2xl text-indigo-100 leading-relaxed">
              We are a passionate team of developers and designers dedicated to creating 
              innovative digital solutions that transform businesses and enhance user experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded with a vision to bridge the gap between innovative technology and 
                practical business solutions, KoreLynk Tech has been at the forefront 
                of digital transformation since our inception.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that great software is not just about code – it's about understanding 
                your business, your users, and your goals. Every project we undertake is a 
                partnership aimed at delivering exceptional results that drive growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">3+ Years of Excellence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">50+ Successful Projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">30+ Happy Clients</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">99% Client Satisfaction Rate</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">99%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we work with our clients
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover-lift text-center"
              >
                <div className="text-indigo-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate professionals dedicated to delivering exceptional results
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-xl shadow-lg hover-lift overflow-hidden"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills?.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs"
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
                            className="text-gray-400 hover:text-indigo-600 transition-colors"
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
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-indigo-100">
              Numbers that speak for our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-6xl font-bold mb-2">
                  {achievement.number}
                </div>
                <div className="text-indigo-200 text-lg">
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