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
  joinClass,
  getClassById
} = require('../controllers/classController')
const { auth, instructorAuth, studentAuth } = require('../middleware/auth')

// Student routes (must come before parameterized routes)
router.get('/student', studentAuth, getStudentClasses)
router.post('/join-by-code', studentAuth, joinClass)
router.post('/:id/join', studentAuth, joinClass)

// Instructor routes
router.get('/instructor', instructorAuth, getInstructorClasses)
router.get('/instructor/:id', instructorAuth, getClassById)
router.post('/instructor', instructorAuth, createInstructorClass)
router.put('/instructor/:id/status', instructorAuth, updateClassStatus)

// Admin routes
router.get('/', auth, getAllClasses)
router.get('/admin', auth, getAllClasses)
router.post('/', auth, createClass)
router.post('/admin', auth, createClass)
router.put('/:id', auth, updateClass)
router.put('/admin/:id', auth, updateClass)
router.delete('/:id', auth, deleteClass)
router.delete('/admin/:id', auth, deleteClass)
router.put('/:id/status', auth, updateClassStatus)
router.get('/:id', auth, getClassById)

module.exports = router