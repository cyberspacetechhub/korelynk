const express = require('express')
const router = express.Router()
const APIResponse = require('../utils/APIResponse')

// GET /api/testimonials - Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO, TechStart",
        company: "TechStart Inc.",
        content: "Cyberspace Tech Hub delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise made our project a huge success.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        featured: true
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "CTO, InnovateCorp",
        company: "InnovateCorp",
        content: "Their technical expertise and attention to detail made our project a huge success. The team was professional, responsive, and delivered on time.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        featured: true
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        role: "Founder, HealthTech Solutions",
        company: "HealthTech Solutions",
        content: "Working with Cyberspace Tech Hub was a game-changer for our healthcare platform. They understood our complex requirements and delivered a robust solution.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        featured: false
      },
      {
        id: 4,
        name: "David Park",
        role: "Product Manager, EduLearn",
        company: "EduLearn",
        content: "The mobile app they developed for us has received excellent user feedback. The performance and user experience are outstanding.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        featured: false
      }
    ]
    
    const { featured } = req.query
    let filteredTestimonials = testimonials
    
    if (featured === 'true') {
      filteredTestimonials = testimonials.filter(t => t.featured)
    }
    
    APIResponse.success(res, filteredTestimonials, 'Testimonials retrieved successfully')
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    APIResponse.error(res, 'Failed to fetch testimonials', 500, 'FETCH_ERROR')
  }
})

module.exports = router