import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Navigation, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { useSettings } from '../context/SettingsContext';

const Contact = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const services = [
    'Web Development',
    'Mobile App Development',
    'E-commerce Solutions',
    'SaaS Development',
    'Cloud Solutions',
    'Consulting Services'
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ];

  // Company location using settings address
  const companyLocation = {
    address: settings.address || 'New York, NY'
  };

  const getUserLocation = () => {
    setLocationLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationLoading(false);
        toast.success('Location detected successfully!');
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setLocationError(errorMessage);
        setLocationLoading(false);
        toast.error(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
      }
    );
  };

  const getDirections = () => {
    if (userLocation) {
      const directionsUrl = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${encodeURIComponent(companyLocation.address)}`;
      window.open(directionsUrl, '_blank');
    } else {
      const directionsUrl = `https://www.google.com/maps/dir//${encodeURIComponent(companyLocation.address)}`;
      window.open(directionsUrl, '_blank');
    }
  };

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
          budget: '',
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
      title: 'Email Us',
      details: settings.contactEmail,
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: settings.contactPhone,
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      details: settings.address,
      description: 'Come say hello at our office'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      details: 'Monday - Friday: 8:00 AM - 6:00 PM',
      description: 'Weekend support available'
    }
  ];

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our initial consultation.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer comprehensive support packages including maintenance, updates, security monitoring, and technical support. Support terms are included in all our service packages.'
    },
    {
      question: 'What technologies do you work with?',
      answer: 'We work with modern technologies including React, Node.js, Python, Flutter, AWS, and more. We choose the best technology stack based on your project requirements.'
    },
    {
      question: 'Can you work with our existing team?',
      answer: 'Absolutely! We can integrate with your existing development team, provide consulting services, or take full ownership of the project based on your needs.'
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="py-20 text-white relative" style={{
        backgroundImage: 'url(/korelynk-workspace.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container px-6 mx-auto text-center relative z-10">
          <h1 className="mb-6 text-5xl font-bold lg:text-6xl">
            Get In Touch
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-indigo-100 lg:text-2xl">
            Ready to start your project? Let's discuss how we can help bring your vision to life
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 relative" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="container px-6 mx-auto relative z-10">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-8 bg-white shadow-lg rounded-2xl">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Send us a message
              </h2>
              <p className="mb-8 text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="service" className="block mb-2 text-sm font-medium text-gray-700">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-700">
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range, index) => (
                        <option key={index} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full px-6 py-4 font-semibold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                  Contact Information
                </h2>
                <p className="mb-8 text-gray-600">
                  We're here to help and answer any question you might have. We look forward to hearing from you.
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="p-6 bg-white shadow-lg rounded-xl hover-lift">
                    <div className="flex items-start">
                      <div className="mt-1 mr-4 text-indigo-600">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-gray-900">
                          {info.title}
                        </h3>
                        <p className="mb-1 font-medium text-indigo-600">
                          {info.details}
                        </p>
                        <p className="text-sm text-gray-600">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Map */}
              <div className="p-6 bg-white shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Our Location
                  </h3>
                  <button
                    onClick={getUserLocation}
                    disabled={locationLoading}
                    className="flex items-center px-3 py-2 text-sm font-medium text-indigo-600 transition-colors border border-indigo-600 rounded-lg hover:bg-indigo-50 disabled:opacity-50"
                  >
                    {locationLoading ? (
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Navigation className="w-4 h-4 mr-2" />
                    )}
                    {locationLoading ? 'Detecting...' : 'Get My Location'}
                  </button>
                </div>
                
                {locationError && (
                  <div className="flex items-center p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {locationError}
                  </div>
                )}
                
                {userLocation && (
                  <div className="flex items-center p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Location detected! You can now get directions.
                  </div>
                )}
                
                <div className="relative h-64 mb-4 overflow-hidden bg-gray-100 rounded-lg">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(companyLocation.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    title="Company Location"
                  />
                </div>
                
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={getDirections}
                    className="flex items-center justify-center px-4 py-2 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </button>
                  <button
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyLocation.address)}`, '_blank')}
                    className="flex items-center justify-center px-4 py-2 font-medium text-indigo-600 transition-colors border border-indigo-600 rounded-lg hover:bg-indigo-50"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-white/90"></div>
        <div className="container px-6 mx-auto relative z-10">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl">
                <h3 className="flex items-center mb-3 text-lg font-semibold text-gray-900">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                  {faq.question}
                </h3>
                <p className="ml-8 text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-indigo-100">
            Join over 50+ satisfied clients who have transformed their business with our solutions
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="px-8 py-4 font-semibold text-indigo-600 transition-all duration-300 bg-white rounded-lg hover:bg-indigo-50">
              Schedule Free Consultation
            </button>
            <button className="px-8 py-4 font-semibold text-white transition-all duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600">
              View Our Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;