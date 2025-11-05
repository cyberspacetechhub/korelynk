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
router.get('/instructors/all', auth, async (req, res) => {
  try {
    const instructors = await require('../models/Instructor').find({ isActive: true })
      .select('fullName email expertise')
      .sort({ fullName: 1 })
    
    require('../utils/APIResponse').success(res, instructors, 'All instructors retrieved')
  } catch (error) {
    require('../utils/APIResponse').error(res, 'Failed to get instructors', 500, 'GET_ALL_INSTRUCTORS_ERROR')
  }
})
router.get('/instructors/:id', auth, getInstructorById)
router.put('/instructors/:id/status', auth, updateInstructorStatus)

// Class Management
router.post('/classes', auth, createClass)

// Analytics
router.get('/analytics/dashboard', auth, getAnalyticsDashboard)

module.exports = router