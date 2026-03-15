import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';

const Testimonials = () => {
  const { data: testimonials = [], isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => axios.get('feedback/testimonials').then(res => res.data.data || [])
  });

  useEffect(() => {
    if (error) {
      console.error('Testimonials fetch error:', error);
    }
  }, [error]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (index) => {
    const colors = ['bg-indigo-600', 'bg-purple-600', 'bg-green-600', 'bg-blue-600', 'bg-pink-600', 'bg-yellow-600'];
    return colors[index % colors.length];
  };

  // Fallback testimonials when no real ones exist
  const fallbackTestimonials = [
    {
      _id: 'fallback-1',
      name: 'Sarah Johnson',
      message: 'InnTechLab delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail is remarkable.',
      rating: 5
    },
    {
      _id: 'fallback-2', 
      name: 'Michael Chen',
      message: 'Professional team with excellent technical skills. They transformed our business with their innovative solutions.',
      rating: 5
    },
    {
      _id: 'fallback-3',
      name: 'Emily Rodriguez', 
      message: 'Outstanding service and support. The mobile app they developed has significantly improved our customer engagement.',
      rating: 5
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  if (isLoading) {
    return (
      <section className="py-20 transition-colors bg-gray-50 dark:bg-midnight-100">
        <div className="container px-6 mx-auto">
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl font-display dark:text-white">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 transition-colors bg-gray-50 dark:bg-midnight-100">
      <div className="container px-6 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl font-display dark:text-white">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Don't just take our word for it
          </p>
        </div>
        
        <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {displayTestimonials.slice(0, 3).map((testimonial, index) => (
            <div key={testimonial._id} className="p-8 transition-colors bg-white border border-gray-100 shadow-lg dark:bg-midnight-50 dark:border-white/10 rounded-xl dark:shadow-black/40 hover-lift">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${
                    i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`} />
                ))}
              </div>
              <p className="mb-6 text-lg italic text-gray-600 dark:text-gray-400">
                "{testimonial.message}"
              </p>
              <div className="flex items-center">
                <div className={`w-12 h-12 ${getRandomColor(index)} rounded-full flex items-center justify-center mr-4`}>
                  <span className="text-sm font-bold text-white">{getInitials(testimonial.name)}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-gray-600 dark:text-gray-400">Valued Client</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/feedback"
            className="inline-flex items-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-electric hover:shadow-lg hover:shadow-electric-blue/40"
          >
            Share Your Feedback
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;