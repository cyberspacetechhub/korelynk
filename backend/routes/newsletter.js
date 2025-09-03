const express = require('express')
const router = express.Router()
const { subscribe, unsubscribe, getAllSubscribers } = require('../controllers/newsletterController')

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', subscribe)

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', unsubscribe)

// GET /api/newsletter - Get all subscribers (admin only)
router.get('/', getAllSubscribers)

module.exports = router