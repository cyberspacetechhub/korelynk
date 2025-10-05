const classService = require('../services/classService')
const APIResponse = require('../utils/APIResponse')

// Admin endpoints
const getAllClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10, course, instructor, status } = req.query
    const filters = { course, instructor, status }
    
    const result = await classService.getAllClasses(filters, page, limit)
    APIResponse.success(res, result, 'Classes retrieved successfully')
  } catch (error) {
    console.error('Get classes error:', error)
    APIResponse.error(res, 'Failed to retrieve classes', 500, 'GET_CLASSES_ERROR')
  }
}

const createClass = async (req, res) => {
  try {
    const classData = await classService.createClass(req.body)
    APIResponse.success(res, classData, 'Class created successfully', 201)
  } catch (error) {
    console.error('Create class error:', error)
    APIResponse.error(res, 'Failed to create class', 500, 'CREATE_CLASS_ERROR')
  }
}

const updateClass = async (req, res) => {
  try {
    const classData = await classService.updateClass(req.params.id, req.body)
    if (!classData) {
      return APIResponse.error(res, 'Class not found', 404, 'CLASS_NOT_FOUND')
    }
    APIResponse.success(res, classData, 'Class updated successfully')
  } catch (error) {
    console.error('Update class error:', error)
    APIResponse.error(res, 'Failed to update class', 500, 'UPDATE_CLASS_ERROR')
  }
}

const deleteClass = async (req, res) => {
  try {
    const classData = await classService.deleteClass(req.params.id)
    if (!classData) {
      return APIResponse.error(res, 'Class not found', 404, 'CLASS_NOT_FOUND')
    }
    APIResponse.success(res, null, 'Class deleted successfully')
  } catch (error) {
    console.error('Delete class error:', error)
    APIResponse.error(res, 'Failed to delete class', 500, 'DELETE_CLASS_ERROR')
  }
}

// Instructor endpoints
const getInstructorClasses = async (req, res) => {
  try {
    const instructorId = req.instructor._id
    const classes = await classService.getClassesByInstructor(instructorId)
    APIResponse.success(res, classes, 'Instructor classes retrieved successfully')
  } catch (error) {
    console.error('Get instructor classes error:', error)
    APIResponse.error(res, 'Failed to retrieve classes', 500, 'GET_INSTRUCTOR_CLASSES_ERROR')
  }
}

const createInstructorClass = async (req, res) => {
  try {
    const instructorId = req.instructor._id
    const classData = { ...req.body, instructor: instructorId }
    const newClass = await classService.createClass(classData)
    APIResponse.success(res, newClass, 'Class created successfully', 201)
  } catch (error) {
    console.error('Create instructor class error:', error)
    APIResponse.error(res, 'Failed to create class', 500, 'CREATE_INSTRUCTOR_CLASS_ERROR')
  }
}

const updateClassStatus = async (req, res) => {
  try {
    const { status, notes } = req.body
    const classData = await classService.updateClassStatus(req.params.id, status, notes)
    if (!classData) {
      return APIResponse.error(res, 'Class not found', 404, 'CLASS_NOT_FOUND')
    }
    APIResponse.success(res, classData, 'Class status updated successfully')
  } catch (error) {
    console.error('Update class status error:', error)
    APIResponse.error(res, 'Failed to update class status', 500, 'UPDATE_CLASS_STATUS_ERROR')
  }
}

// Student endpoints
const getStudentClasses = async (req, res) => {
  try {
    const studentId = req.user.id
    const classes = await classService.getClassesByStudent(studentId)
    APIResponse.success(res, classes, 'Student classes retrieved successfully')
  } catch (error) {
    console.error('Get student classes error:', error)
    APIResponse.error(res, 'Failed to retrieve classes', 500, 'GET_STUDENT_CLASSES_ERROR')
  }
}

const joinClass = async (req, res) => {
  try {
    const studentId = req.user.id
    const classId = req.params.id
    
    const result = await classService.joinClass(classId, studentId)
    APIResponse.success(res, result, 'Joined class successfully')
  } catch (error) {
    console.error('Join class error:', error)
    APIResponse.error(res, error.message || 'Failed to join class', 400, 'JOIN_CLASS_ERROR')
  }
}

module.exports = {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
  getInstructorClasses,
  createInstructorClass,
  updateClassStatus,
  getStudentClasses,
  joinClass
}