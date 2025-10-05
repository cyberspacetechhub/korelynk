const express = require('express')
const router = express.Router()
const { register, verifyEmail, login, getDashboard, getClassDetails, requestPasswordReset, resetPassword } = require('../controllers/instructorController')
const { instructorAuth } = require('../middleware/instructorAuth')

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/login', login)
router.post('/request-reset', requestPasswordReset)
router.post('/reset-password', resetPassword)
router.get('/dashboard', instructorAuth, getDashboard)
router.get('/classes/:classId', instructorAuth, getClassDetails)

module.exports = router