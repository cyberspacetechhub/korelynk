const express = require('express')
const router = express.Router()
const { register, verifyEmail, login, getDashboard, getClassDetails, requestPasswordReset, resetPassword } = require('../controllers/instructorController')
const { instructorAuth } = require('../middleware/auth')

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/login', login)
router.post('/request-reset', requestPasswordReset)
router.post('/reset-password', resetPassword)
router.get('/profile', instructorAuth, async (req, res) => {
  try {
    const instructor = await require('../models/Instructor').findById(req.instructor._id).select('-password')
    require('../utils/APIResponse').success(res, instructor, 'Profile retrieved')
  } catch (error) {
    require('../utils/APIResponse').error(res, 'Failed to get profile', 500, 'GET_PROFILE_ERROR')
  }
})
router.put('/profile', instructorAuth, async (req, res) => {
  try {
    const instructor = await require('../models/Instructor').findByIdAndUpdate(
      req.instructor._id,
      req.body,
      { new: true }
    ).select('-password')
    require('../utils/APIResponse').success(res, instructor, 'Profile updated')
  } catch (error) {
    require('../utils/APIResponse').error(res, 'Failed to update profile', 500, 'UPDATE_PROFILE_ERROR')
  }
})
router.get('/dashboard', instructorAuth, getDashboard)
router.get('/stats', instructorAuth, (req, res) => getDashboard(req, res))
router.get('/classes/:classId', instructorAuth, getClassDetails)

module.exports = router