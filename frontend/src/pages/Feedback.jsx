import React, { useState } from 'react';
import { Star, Send, MessageCircle, Award, Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from '../api/axios';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) { toast.error('Please provide a rating'); return; }
    setIsSubmitting(true);
    try {
      const response = await axios.post('/feedback', { ...formData, rating });
      if (response.data.success) {
        toast.success('Feedback submitted successfully! Thank you for your input.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setRating(0);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

  return (
    <div className="min-h-screen bg-white dark:bg-midnight transition-colors">

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gray-900 dark:bg-midnight">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-6">
            We Value Your Feedback
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us improve by sharing your thoughts, suggestions, and experiences
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white dark:bg-midnight">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="name" className={labelClass}>Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputClass} placeholder="your.email@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="Your phone number" />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className={labelClass}>Overall Rating *</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                      <Star className={`w-8 h-8 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'} transition-colors`} />
                    </button>
                  ))}
                  <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                    {rating > 0 ? `${rating} out of 5 stars` : 'Please select a rating'}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={labelClass}>Subject *</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className={inputClass} placeholder="Brief subject of your feedback" />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Your Feedback *</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className={`${inputClass} resize-none`} placeholder="Please share your thoughts, suggestions, or any issues you've encountered..." />
              </div>

              <div className="text-center">
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-8 py-4 bg-gradient-electric text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-electric-blue/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Submitting...</>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" />Submit Feedback</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-20 bg-gray-50 dark:bg-midnight-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Quick Response</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">We typically respond to feedback within 24-48 hours.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Privacy Protected</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Your feedback is confidential and used only for improvement.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Continuous Improvement</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Your input directly influences our services and features.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
