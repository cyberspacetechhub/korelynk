const express = require('express')
const router = express.Router()
const {
  getAllStudents,
  getStudentById,
  updateStudentStatus,
  getAllInstructors,
  getInstructorById,
  updateInstructorStatus,
  getAnalyticsDashboard,
  createClass
} = require('../controllers/adminManagementController')
const { auth } = require('../middleware/auth')

// Student Management
router.get('/students', auth, getAllStudents)
router.get('/students/:id', auth, getStudentById)
router.put('/students/:id/status', auth, updateStudentStatus)

// Instructor Management
router.get('/instructors', auth, getAllInstructors)
router.get('/instructors/:id', auth, getInstructorById)
router.put('/instructors/:id/status', auth, updateInstructorStatus)

// Class Management
router.post('/classes', auth, createClass)

// Analytics
router.get('/analytics/dashboard', auth, getAnalyticsDashboard)

module.exports = router