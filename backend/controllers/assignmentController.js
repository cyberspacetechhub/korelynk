const assignmentService = require('../services/assignmentService')
const APIResponse = require('../utils/APIResponse')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')

const createAssignment = async (req, res) => {
  try {
    const assignmentData = {
      ...req.body,
      instructor: req.instructor?._id || req.user?._id
    }
    const assignment = await assignmentService.createAssignment(assignmentData)
    APIResponse.success(res, assignment, 'Assignment created successfully', 201)
  } catch (error) {
    console.error('Create assignment error:', error)
    APIResponse.error(res, 'Failed to create assignment', 500, 'CREATE_ASSIGNMENT_ERROR')
  }
}

const getAssignmentsByClass = async (req, res) => {
  try {
    const assignments = await assignmentService.getAssignmentsByClass(req.params.classId)
    APIResponse.success(res, assignments, 'Assignments retrieved successfully')
  } catch (error) {
    console.error('Get assignments error:', error)
    APIResponse.error(res, 'Failed to retrieve assignments', 500, 'GET_ASSIGNMENTS_ERROR')
  }
}

const getAssignmentById = async (req, res) => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.id)
    if (!assignment) {
      return APIResponse.error(res, 'Assignment not found', 404, 'ASSIGNMENT_NOT_FOUND')
    }
    APIResponse.success(res, assignment, 'Assignment retrieved successfully')
  } catch (error) {
    console.error('Get assignment error:', error)
    APIResponse.error(res, 'Failed to retrieve assignment', 500, 'GET_ASSIGNMENT_ERROR')
  }
}

const updateAssignment = async (req, res) => {
  try {
    const assignment = await assignmentService.updateAssignment(req.params.id, req.body)
    if (!assignment) {
      return APIResponse.error(res, 'Assignment not found', 404, 'ASSIGNMENT_NOT_FOUND')
    }
    APIResponse.success(res, assignment, 'Assignment updated successfully')
  } catch (error) {
    console.error('Update assignment error:', error)
    APIResponse.error(res, 'Failed to update assignment', 500, 'UPDATE_ASSIGNMENT_ERROR')
  }
}

const deleteAssignment = async (req, res) => {
  try {
    const assignment = await assignmentService.deleteAssignment(req.params.id)
    if (!assignment) {
      return APIResponse.error(res, 'Assignment not found', 404, 'ASSIGNMENT_NOT_FOUND')
    }
    APIResponse.success(res, null, 'Assignment deleted successfully')
  } catch (error) {
    console.error('Delete assignment error:', error)
    APIResponse.error(res, 'Failed to delete assignment', 500, 'DELETE_ASSIGNMENT_ERROR')
  }
}

const submitAssignment = async (req, res) => {
  try {
    const submissionData = {
      ...req.body,
      student: req.student._id
    }
    
    // Handle file uploads if present
    if (req.files && req.files.length > 0) {
      const attachments = []
      
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'submissions',
            resource_type: 'auto'
          })
          attachments.push({
            filename: file.originalname,
            url: result.secure_url
          })
          // Clean up temp file
          fs.unlinkSync(file.path)
        } catch (uploadError) {
          console.error('File upload error:', uploadError)
          // Clean up temp file on error
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path)
          }
        }
      }
      submissionData.attachments = attachments
    }
    
    const submission = await assignmentService.submitAssignment(submissionData)
    APIResponse.success(res, submission, 'Assignment submitted successfully', 201)
  } catch (error) {
    console.error('Submit assignment error:', error)
    if (error.message === 'Assignment not found') {
      return APIResponse.error(res, 'Assignment not found', 404, 'ASSIGNMENT_NOT_FOUND')
    }
    if (error.message === 'Assignment already submitted') {
      return APIResponse.error(res, 'Assignment already submitted', 400, 'ALREADY_SUBMITTED')
    }
    APIResponse.error(res, 'Failed to submit assignment', 500, 'SUBMIT_ASSIGNMENT_ERROR')
  }
}

const getSubmissionsByAssignment = async (req, res) => {
  try {
    const submissions = await assignmentService.getSubmissionsByAssignment(req.params.id)
    APIResponse.success(res, submissions, 'Submissions retrieved successfully')
  } catch (error) {
    console.error('Get submissions error:', error)
    APIResponse.error(res, 'Failed to retrieve submissions', 500, 'GET_SUBMISSIONS_ERROR')
  }
}

const gradeSubmission = async (req, res) => {
  try {
    const { grade, feedback } = req.body
    const submission = await assignmentService.gradeSubmission(req.params.id, grade, feedback)
    APIResponse.success(res, submission, 'Submission graded successfully')
  } catch (error) {
    console.error('Grade submission error:', error)
    APIResponse.error(res, 'Failed to grade submission', 500, 'GRADE_SUBMISSION_ERROR')
  }
}

const getStudentSubmissions = async (req, res) => {
  try {
    const { classId } = req.query
    const submissions = await assignmentService.getStudentSubmissions(req.student._id, classId)
    APIResponse.success(res, submissions, 'Student submissions retrieved successfully')
  } catch (error) {
    console.error('Get student submissions error:', error)
    APIResponse.error(res, 'Failed to retrieve submissions', 500, 'GET_STUDENT_SUBMISSIONS_ERROR')
  }
}

const createInstructorAssignment = async (req, res) => {
  try {
    const assignmentData = {
      ...req.body,
      instructor: req.instructor._id
    }
    
    // Handle file uploads if present
    if (req.files && req.files.length > 0) {
      const attachments = []
      
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'assignments',
            resource_type: 'auto'
          })
          attachments.push({
            filename: file.originalname,
            url: result.secure_url
          })
          // Clean up temp file
          fs.unlinkSync(file.path)
        } catch (uploadError) {
          console.error('File upload error:', uploadError)
          // Clean up temp file on error
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path)
          }
        }
      }
      assignmentData.attachments = attachments
    }
    
    const assignment = await assignmentService.createAssignment(assignmentData)
    APIResponse.success(res, assignment, 'Assignment created successfully', 201)
  } catch (error) {
    console.error('Create instructor assignment error:', error)
    APIResponse.error(res, 'Failed to create assignment', 500, 'CREATE_ASSIGNMENT_ERROR')
  }
}

const getInstructorAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.getAssignmentsByInstructor(req.instructor._id)
    APIResponse.success(res, assignments, 'Instructor assignments retrieved successfully')
  } catch (error) {
    console.error('Get instructor assignments error:', error)
    APIResponse.error(res, 'Failed to retrieve assignments', 500, 'GET_INSTRUCTOR_ASSIGNMENTS_ERROR')
  }
}

const getStudentAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.getAssignmentsByStudent(req.student._id)
    APIResponse.success(res, assignments, 'Student assignments retrieved successfully')
  } catch (error) {
    console.error('Get student assignments error:', error)
    APIResponse.error(res, 'Failed to retrieve assignments', 500, 'GET_STUDENT_ASSIGNMENTS_ERROR')
  }
}

module.exports = {
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
}