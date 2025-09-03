import React, { useState, useEffect } from 'react';
import { Check, Code, Smartphone, Globe, Database, Cloud, Shield, ArrowRight } from 'lucide-react';
import axios from '../api/axios';

const Services = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/services');
      if (response.data.success) {
        setServices(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (title) => {
    switch (title.toLowerCase()) {
      case 'web development': return <Globe className="w-12 h-12" />;
      case 'mobile development': return <Smartphone className="w-12 h-12" />;
      case 'backend development': return <Database className="w-12 h-12" />;
      case 'cloud solutions': return <Cloud className="w-12 h-12" />;
      default: return <Code className="w-12 h-12" />;
    }
  };



  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$2,999',
      period: 'per project',
      description: 'Perfect for small businesses and startups',
      features: [
        'Responsive Website (up to 5 pages)',
        'Basic SEO Setup',
        'Contact Form Integration',
        'Mobile Optimization',
        '3 Months Support',
        'Basic Analytics Setup'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$7,999',
      period: 'per project',
      description: 'Ideal for growing businesses',
      features: [
        'Custom Web Application',
        'Advanced SEO & Analytics',
        'CMS Integration',
        'E-commerce Functionality',
        'API Integration',
        '6 Months Support',
        'Performance Optimization',
        'Security Implementation'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$15,999',
      period: 'per project',
      description: 'For large-scale applications',
      features: [
        'Full-Stack Application',
        'Custom Backend Development',
        'Database Design & Setup',
        'Third-party Integrations',
        'Advanced Security Features',
        '12 Months Support',
        'Cloud Deployment',
        'Load Balancing & Scaling',
        'Dedicated Project Manager'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto">
            Comprehensive digital solutions to transform your business and drive growth
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to deployment, we provide end-to-end solutions
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={service.id} className="bg-white rounded-xl shadow-lg p-8 hover-lift">
                  <div className="text-indigo-600 mb-6">
                    {getServiceIcon(service.title)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600 mb-2">
                      Starting at ${service.startingPrice.toLocaleString()}
                    </div>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your project needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white transform scale-105'
                    : 'bg-white border-2 border-gray-200'
                } hover-lift relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className={`text-4xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-indigo-600'}`}>
                    {plan.price}
                  </div>
                  <div className={`${plan.popular ? 'text-indigo-100' : 'text-gray-600'}`}>
                    {plan.period}
                  </div>
                  <p className={`mt-4 ${plan.popular ? 'text-indigo-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                        plan.popular ? 'text-green-300' : 'text-green-500'
                      }`} />
                      <span className={plan.popular ? 'text-indigo-100' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Get Started
                  <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600">
              How we bring your project to life
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'We understand your requirements and goals' },
              { step: '02', title: 'Planning', description: 'Create detailed project roadmap and timeline' },
              { step: '03', title: 'Development', description: 'Build your solution with regular updates' },
              { step: '04', title: 'Launch', description: 'Deploy and provide ongoing support' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            Let's discuss your requirements and create something amazing together
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 inline-flex items-center text-lg">
            Get Free Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;