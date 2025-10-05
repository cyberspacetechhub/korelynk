const express = require('express')
const router = express.Router()
const { register, verifyEmail, login, getProfile, requestPasswordReset, resetPassword } = require('../controllers/studentController')
const { studentAuth } = require('../middleware/studentAuth')

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/login', login)
router.post('/request-reset', requestPasswordReset)
router.post('/reset-password', resetPassword)
router.get('/profile', studentAuth, getProfile)

module.exports = router