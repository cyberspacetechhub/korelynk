const express = require('express')
const router = express.Router()
const { createEnrollment, getAllEnrollments, updateEnrollmentStatus, getEnrollmentById } = require('../controllers/enrollmentController')
const { auth } = require('../middleware/auth')

// Student routes
router.post('/', createEnrollment)

// Admin routes
router.get('/', auth, getAllEnrollments)
router.get('/:id', auth, getEnrollmentById)
router.put('/:id/status', auth, updateEnrollmentStatus)

module.exports = router