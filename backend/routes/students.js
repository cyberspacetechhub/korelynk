const express = require('express')
const router = express.Router()
const { register, verifyEmail, login, getProfile, updateProfile, requestPasswordReset, resetPassword } = require('../controllers/studentController')
const { studentAuth } = require('../middleware/auth')

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/login', login)
router.post('/request-reset', requestPasswordReset)
router.post('/reset-password', resetPassword)
router.get('/profile', studentAuth, getProfile)
router.put('/profile', studentAuth, updateProfile)

module.exports = router