const express = require('express')
const router = express.Router()
const multer = require('multer')
const { 
  createAssignment,
  createInstructorAssignment,
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
const { auth, instructorAuth, studentAuth } = require('../middleware/auth')

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files allowed'), false)
  }
}

const upload = multer({ 
  dest: 'uploads/',
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

// Error handling middleware for file uploads
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File too large. Maximum size is 5MB.' })
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ success: false, message: 'Too many files. Maximum is 5 files.' })
    }
  }
  if (error.message === 'Only image files allowed') {
    return res.status(400).json({ success: false, message: 'Only image files are allowed.' })
  }
  next(error)
}

// Instructor routes (must come before general routes)
router.get('/instructor', instructorAuth, getInstructorAssignments)
router.post('/instructor', instructorAuth, upload.array('attachments', 5), handleUploadError, createInstructorAssignment)
// General instructor routes
router.post('/', instructorAuth, createAssignment)
router.get('/class/:classId', instructorAuth, getAssignmentsByClass)
router.get('/:id/submissions', instructorAuth, getSubmissionsByAssignment)
router.put('/submissions/:id/grade', instructorAuth, gradeSubmission)
router.put('/:id', instructorAuth, updateAssignment)
router.delete('/:id', instructorAuth, deleteAssignment)

// Student routes
router.get('/student', studentAuth, getStudentAssignments)
router.post('/submit', studentAuth, upload.array('attachments', 5), handleUploadError, submitAssignment)
router.get('/student/submissions', studentAuth, getStudentSubmissions)

// Shared routes
router.get('/:id', getAssignmentById)

module.exports = router