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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('/contact', formData);
      if (response.data.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Mail className="w-6 h-6" />, title: 'Email', details: settings.contactEmail, description: 'Send us an email anytime' },
    { icon: <Phone className="w-6 h-6" />, title: 'Phone', details: settings.contactPhone, description: 'Mon-Fri from 8am to 5pm' },
    { icon: <MapPin className="w-6 h-6" />, title: 'Location', details: settings.address, description: 'Visit our office' }
  ];

  const inputClass = "w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all";
  const labelClass = "block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-midnight">
      <SEO
        title="Contact Us - Get In Touch"
        description="Have a project in mind? Contact InnTechLab to discuss your requirements and get a free consultation."
      />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gray-900 dark:bg-midnight">
        <div className="absolute inset-0 opacity-50 bg-gradient-glow"></div>
        <div className="absolute inset-0">
          <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-electric-blue/20 blur-3xl animate-pulse"></div>
          <div className="absolute delay-1000 rounded-full bottom-20 right-10 w-96 h-96 bg-electric-violet/20 blur-3xl animate-pulse"></div>
        </div>
        <div className="container relative px-6 py-20 mx-auto text-center">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl font-display">Let's Talk</h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-300 md:text-2xl">
            Have a project in mind? We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative z-10 py-16 -mt-20">
        <div className="container px-6 mx-auto">
          <div className="grid max-w-5xl gap-6 mx-auto md:grid-cols-3">
            {contactInfo.map((info, index) => (
              <div key={index} className="p-8 text-center transition-all duration-300 bg-white border border-gray-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-2xl hover:border-gray-300 dark:hover:border-white/20 dark:shadow-none">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-gradient-electric rounded-xl">
                  {info.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{info.title}</h3>
                <p className="mb-1 font-medium text-electric-cyan">{info.details}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24">
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full dark:bg-white/5 dark:border-white/10">
                <MessageSquare className="w-4 h-4 mr-2 text-electric-cyan" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Send us a message</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">
                Start Your Project
              </h2>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <div className="p-8 border border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10 rounded-2xl md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={inputClass} placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputClass} placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="+234 123 456 7890" />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>Company Name</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className={inputClass} placeholder="Your Company" />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className={labelClass}>Service Interested In</label>
                  <select id="service" name="service" value={formData.service} onChange={handleInputChange} className={inputClass}>
                    <option value="" className="bg-white dark:bg-gray-900">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service} className="bg-white dark:bg-gray-900">{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Project Details *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className={`${inputClass} resize-none`} placeholder="Tell us about your project..." />
                </div>

                <button type="submit" disabled={isSubmitting} className="flex items-center justify-center w-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-2xl hover:shadow-electric-blue/50 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <><div className="w-5 h-5 mr-2 border-b-2 border-white rounded-full animate-spin"></div>Sending...</>
                  ) : (
                    <>Send Message<Send className="w-5 h-5 ml-2" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl font-display dark:text-white">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">Come say hello at our office location</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="overflow-hidden bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl">
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
