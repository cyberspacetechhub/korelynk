const express = require('express')
const router = express.Router()
const { submitFeedback, getTestimonials } = require('../controllers/feedbackController')

// POST /api/feedback - Submit feedback
router.post('/', submitFeedback)

// GET /api/feedback/testimonials - Get approved testimonials
router.get('/testimonials', getTestimonials)

module.exports = router