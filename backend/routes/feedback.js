const express = require('express')
const router = express.Router()
const { submitFeedback, getTestimonials, getFlyerForgeTestimonials } = require('../controllers/feedbackController')

// POST /api/feedback - Submit feedback
router.post('/', submitFeedback)

// GET /api/feedback/testimonials - Get approved testimonials
router.get('/testimonials', getTestimonials)

// GET /api/feedback/flyerforge-testimonials - Get FlyerForge testimonials
router.get('/flyerforge-testimonials', getFlyerForgeTestimonials)

module.exports = router