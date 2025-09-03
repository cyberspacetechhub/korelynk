const express = require('express')
const router = express.Router()
const { subscribe, unsubscribe, getAllSubscribers } = require('../controllers/newsletterController')

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', subscribe)

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', unsubscribe)

// GET /api/newsletter - Get all subscribers (admin only)
router.get('/', getAllSubscribers)

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body
    
    if (!email) {
      return APIResponse.error(res, 'Email is required', 400, 'EMAIL_REQUIRED')
    }

    const subscriber = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase() },
      { status: 'unsubscribed' },
      { new: true }
    )

    if (!subscriber) {
      return APIResponse.error(res, 'Email not found in our newsletter list', 404, 'EMAIL_NOT_FOUND')
    }

    APIResponse.success(res, null, 'Successfully unsubscribed from newsletter')
  } catch (error) {
    console.error('Unsubscribe error:', error)
    APIResponse.error(res, 'Failed to unsubscribe', 500, 'UNSUBSCRIBE_ERROR')
  }
})

module.exports = router