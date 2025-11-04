const express = require('express')
const router = express.Router()
const { 
  createPaymentAccount,
  getActivePaymentAccount,
  updatePaymentAccount
} = require('../controllers/paymentAccountController')
const { adminAuth } = require('../middleware/auth')

// Public route to get active payment account
router.get('/active', getActivePaymentAccount)

// Admin routes
router.post('/', adminAuth, createPaymentAccount)
router.put('/:id', adminAuth, updatePaymentAccount)

module.exports = router