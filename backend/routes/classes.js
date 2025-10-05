const express = require('express')
const router = express.Router()
const {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
  getInstructorClasses,
  createInstructorClass,
  updateClassStatus,
  getStudentClasses,
  joinClass
} = require('../controllers/classController')
const { auth } = require('../middleware/auth')
const { instructorAuth } = require('../middleware/instructorAuth')
const { studentAuth } = require('../middleware/studentAuth')

// Admin routes
router.get('/admin', auth, getAllClasses)
router.post('/admin', auth, createClass)
router.put('/admin/:id', auth, updateClass)
router.delete('/admin/:id', auth, deleteClass)

// Instructor routes
router.get('/instructor', instructorAuth, getInstructorClasses)
router.post('/instructor', instructorAuth, createInstructorClass)
router.put('/instructor/:id/status', instructorAuth, updateClassStatus)

// Student routes
router.get('/student', studentAuth, getStudentClasses)
router.post('/student/:id/join', studentAuth, joinClass)

module.exports = router