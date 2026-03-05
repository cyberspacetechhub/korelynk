import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/SEO';

const Contact = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Web Development',
    'Mobile App Development',
    'E-commerce Solutions',
    'SaaS Development',
    'UI/UX Design',
    'Consulting Services'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('/contact', formData);
      
      if (response.data.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: settings.contactEmail,
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: settings.contactPhone,
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      details: settings.address,
      description: 'Visit our office'
    }
  ];

  return (
    <div className="min-h-screen bg-midnight">
      <SEO 
        title="Contact Us - Get In Touch"
        description="Have a project in mind? Contact Korelynk Tech to discuss your requirements and get a free consultation."
      />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-electric-blue/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-electric-violet/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6">
            Let's Talk
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Have a project in mind? We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-electric rounded-xl flex items-center justify-center mx-auto mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                <p className="text-electric-cyan font-medium mb-1">{info.details}</p>
                <p className="text-sm text-gray-400">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
                <MessageSquare className="w-4 h-4 text-electric-cyan mr-2" />
                <span className="text-sm font-medium text-gray-300">Send us a message</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
                Start Your Project
              </h2>
              <p className="text-xl text-gray-400">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
                      placeholder="+234 123 456 7890"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-300">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block mb-2 text-sm font-medium text-gray-300">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
                  >
                    <option value="" className="bg-gray-900">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service} className="bg-gray-900">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 resize-none focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-electric-blue/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-400">
              Come say hello at our office location
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <div className="h-96">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  title="Office Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
