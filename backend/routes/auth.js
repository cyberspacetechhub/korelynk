const express = require('express')
const router = express.Router()
const { login, registerAdmin, getCurrentUser, refreshToken, logout, requestPasswordReset, verifyResetCode, resetPassword } = require('../controllers/authController')
const { auth } = require('../middleware/auth')

// POST /api/auth/login - Login user/admin
router.post('/login', login)

// POST /api/auth/register-admin - Register admin (for setup)
router.post('/register-admin', registerAdmin)

// GET /api/auth/me - Get current user
router.get('/me', auth, getCurrentUser)

// POST /api/auth/refresh - Refresh access token
router.post('/refresh', refreshToken)

// POST /api/auth/logout - Logout user
router.post('/logout', logout)

// POST /api/auth/request-reset - Request password reset
router.post('/request-reset', requestPasswordReset)

// POST /api/auth/verify-code - Verify reset code
router.post('/verify-code', verifyResetCode)

// POST /api/auth/reset-password - Reset password
router.post('/reset-password', resetPassword)

module.exports = router