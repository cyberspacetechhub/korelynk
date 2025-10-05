const express = require('express')
const router = express.Router()
const {
  createAssignment,
  getAssignmentsByClass,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissionsByAssignment,
  gradeSubmission,
  getStudentSubmissions,
  getInstructorAssignments,
  getStudentAssignments
} = require('../controllers/assignmentController')
const { auth } = require('../middleware/auth')
const { instructorAuth } = require('../middleware/instructorAuth')
const { studentAuth } = require('../middleware/studentAuth')

// Admin routes
router.post('/', auth, createAssignment)
router.get('/class/:classId', auth, getAssignmentsByClass)
router.get('/:id', auth, getAssignmentById)
router.put('/:id', auth, updateAssignment)
router.delete('/:id', auth, deleteAssignment)

// Instructor routes
router.get('/instructor', instructorAuth, getInstructorAssignments)
router.post('/instructor', instructorAuth, createAssignment)
router.get('/submissions/:assignmentId', instructorAuth, getSubmissionsByAssignment)
router.put('/submissions/:id/grade', instructorAuth, gradeSubmission)

// Student routes
router.get('/student', studentAuth, getStudentAssignments)
router.post('/submit', studentAuth, submitAssignment)
router.get('/student/submissions', studentAuth, getStudentSubmissions)

module.exports = router