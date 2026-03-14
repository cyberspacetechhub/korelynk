import React, { useState, useEffect } from 'react';
import { Check, Code, Smartphone, Globe, Database, Cloud, ArrowRight } from 'lucide-react';
import axios from '../api/axios';
import SEO from '../components/SEO';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/services');
      if (response.data.success) setServices(response.data.data);
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
      price: '$1,000',
      features: ['Responsive Website (5 pages)', 'Basic SEO', 'Contact Form', 'Mobile Optimization', '3 Months Support']
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$2,500',
      popular: true,
      features: ['Custom Web App', 'Advanced SEO', 'CMS Integration', 'E-commerce', 'API Integration', '6 Months Support']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$5,000+',
      features: ['Full-Stack App', 'Custom Backend', 'Database Design', 'Cloud Deployment', 'Load Balancing', '12 Months Support']
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-midnight transition-colors">
      <SEO title="Our Services - Digital Solutions" description="Comprehensive digital solutions including web development, mobile apps, and cloud services" />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gray-900 dark:bg-midnight">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Comprehensive digital solutions to transform your business</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white dark:bg-midnight">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-electric rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.title)}
                  </div>
                  <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                        <Check className="w-4 h-4 mr-2 text-electric-cyan flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">From ${service.startingPrice.toLocaleString()}</div>
                  <button className="w-full bg-gradient-electric text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50 dark:bg-midnight-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">Choose the plan that fits your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className={`bg-white dark:bg-white/5 border rounded-2xl p-8 transition-all ${plan.popular ? 'border-electric-cyan scale-105 shadow-lg shadow-electric-cyan/20' : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'}`}>
                {plan.popular && <span className="bg-gradient-electric text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">Most Popular</span>}
                <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300">
                      <Check className="w-5 h-5 mr-2 text-electric-cyan flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition-all ${plan.popular ? 'bg-gradient-electric text-white hover:shadow-lg hover:shadow-electric-blue/50' : 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20'}`}>
                  Get Started <ArrowRight className="inline w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white dark:bg-midnight">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4">Our Process</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">How we bring your project to life</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understand requirements' },
              { step: '02', title: 'Planning', desc: 'Create roadmap' },
              { step: '03', title: 'Development', desc: 'Build solution' },
              { step: '04', title: 'Launch', desc: 'Deploy & support' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-electric rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white">{item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
