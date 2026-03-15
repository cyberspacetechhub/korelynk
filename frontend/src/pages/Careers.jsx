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
    <div className="min-h-screen transition-colors bg-white dark:bg-midnight">
      <SEO
        title="Careers - Join Our Tech Team"
        description="Join InnTechLab and build the future of technology. We're hiring web developers, mobile app developers, UI/UX designers, and digital marketing specialists globally with remote opportunities."
        keywords={['tech jobs', 'web developer jobs', 'React developer careers', 'remote developer jobs']}
        url="/careers"
      />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gray-900 dark:bg-midnight">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="container relative px-6 mx-auto text-center">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl font-display">Join Our Team</h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-300">
            Build the future of technology with us. We're looking for passionate individuals
            who want to make a difference in the digital world.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white dark:bg-midnight">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">Why Work With Us?</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">We believe in creating an environment where talent thrives</p>
          </div>
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-8 text-center transition-all border border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10 rounded-2xl hover:border-gray-300 dark:hover:border-white/20">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-white bg-gradient-electric rounded-xl">
                  {benefit.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 font-display dark:text-white">{benefit.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">Open Positions</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">Find your next career opportunity with us</p>
          </div>
          <div className="max-w-5xl mx-auto space-y-6">
            {openPositions.map((position) => (
              <div key={position.id} className="p-8 transition-all bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl hover:border-gray-300 dark:hover:border-white/20">
                <div className="flex flex-col mb-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-gray-900 font-display dark:text-white">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center"><Briefcase className="w-4 h-4 mr-1" />{position.department}</div>
                      <div className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{position.location}</div>
                      <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{position.type}</div>
                      <div className="flex items-center"><DollarSign className="w-4 h-4 mr-1" />{position.salary}</div>
                    </div>
                  </div>
                  <button className="px-6 py-3 mt-4 font-semibold text-white transition-all rounded-lg lg:mt-0 bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/50">
                    Apply Now
                  </button>
                </div>
                <p className="mb-6 text-gray-600 dark:text-gray-300">{position.description}</p>
                <div>
                  <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">Requirements:</h4>
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
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl font-display">Don't See Your Role?</h2>
          <p className="max-w-2xl mx-auto mb-12 text-xl text-gray-300">
            We're always looking for talented individuals. Send us your resume and
            let us know how you'd like to contribute to our team.
          </p>
          <a
            href="mailto:careers@inntechlab.com"
            className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all rounded-lg bg-gradient-electric hover:shadow-2xl hover:shadow-electric-blue/50"
          >
            Send Your Resume
          </a>
        </div>
      </section>
    </div>
  );
};

export default Careers;
