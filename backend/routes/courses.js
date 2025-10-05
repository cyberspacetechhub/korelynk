const express = require('express')
const router = express.Router()
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, getInstructors } = require('../controllers/courseController')
const { auth } = require('../middleware/auth')

// Public routes
router.get('/', getAllCourses)
router.get('/:id', getCourseById)

// Admin routes
router.get('/admin/instructors', auth, getInstructors)
router.post('/', auth, createCourse)
router.put('/:id', auth, updateCourse)
router.delete('/:id', auth, deleteCourse)

module.exports = router