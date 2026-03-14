import React from 'react';
import { MapPin, Clock, DollarSign, Users, Briefcase, Heart } from 'lucide-react';
import SEO from '../components/SEO';

const Careers = () => {
  const openPositions = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote / Lagos, Nigeria',
      type: 'Full-time',
      salary: '₦2,000,000 - ₦3,500,000',
      description: 'We are looking for an experienced full stack developer to join our growing team.',
      requirements: [
        '5+ years of experience with React and Node.js',
        'Experience with MongoDB and cloud platforms',
        'Strong problem-solving skills',
        'Excellent communication skills'
      ]
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote / Lagos, Nigeria',
      type: 'Full-time',
      salary: '₦1,500,000 - ₦2,500,000',
      description: 'Join our design team to create beautiful and intuitive user experiences.',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma and Adobe Creative Suite',
        'Strong portfolio showcasing web and mobile designs',
        'Understanding of user-centered design principles'
      ]
    },
    {
      id: 3,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      salary: '₦800,000 - ₦1,500,000',
      description: 'Help us grow our brand and reach through digital marketing strategies.',
      requirements: [
        '2+ years of digital marketing experience',
        'Experience with SEO, SEM, and social media marketing',
        'Knowledge of analytics tools',
        'Creative thinking and analytical skills'
      ]
    }
  ];

  const benefits = [
    { icon: <Heart className="w-8 h-8" />, title: 'Health & Wellness', description: 'Comprehensive health insurance and wellness programs' },
    { icon: <Clock className="w-8 h-8" />, title: 'Flexible Hours', description: 'Work-life balance with flexible working hours' },
    { icon: <Users className="w-8 h-8" />, title: 'Team Culture', description: 'Collaborative and inclusive work environment' },
    { icon: <Briefcase className="w-8 h-8" />, title: 'Career Growth', description: 'Professional development and learning opportunities' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-midnight transition-colors">
      <SEO
        title="Careers - Join Our Tech Team"
        description="Join KoreLynk Tech and build the future of technology. We're hiring web developers, mobile app developers, UI/UX designers, and digital marketing specialists globally with remote opportunities."
        keywords={['tech jobs', 'web developer jobs', 'React developer careers', 'remote developer jobs']}
        url="/careers"
      />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gray-900 dark:bg-midnight">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Build the future of technology with us. We're looking for passionate individuals
            who want to make a difference in the digital world.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white dark:bg-midnight">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">We believe in creating an environment where talent thrives</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center hover:border-gray-300 dark:hover:border-white/20 transition-all">
                <div className="w-16 h-16 bg-gradient-electric rounded-xl flex items-center justify-center mx-auto mb-6 text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50 dark:bg-midnight-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4">Open Positions</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">Find your next career opportunity with us</p>
          </div>
          <div className="space-y-6 max-w-5xl mx-auto">
            {openPositions.map((position) => (
              <div key={position.id} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:border-gray-300 dark:hover:border-white/20 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center"><Briefcase className="w-4 h-4 mr-1" />{position.department}</div>
                      <div className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{position.location}</div>
                      <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{position.type}</div>
                      <div className="flex items-center"><DollarSign className="w-4 h-4 mr-1" />{position.salary}</div>
                    </div>
                  </div>
                  <button className="mt-4 lg:mt-0 bg-gradient-electric text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all">
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{position.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {position.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 bg-electric-cyan rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 dark:bg-midnight">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Don't See Your Role?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and
            let us know how you'd like to contribute to our team.
          </p>
          <a
            href="mailto:careers@korelynk.vercel.app"
            className="inline-flex items-center px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-electric-blue/50 transition-all"
          >
            Send Your Resume
          </a>
        </div>
      </section>
    </div>
  );
};

export default Careers;
