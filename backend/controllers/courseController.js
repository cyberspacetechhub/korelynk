const courseService = require('../services/courseService')
const APIResponse = require('../utils/APIResponse')

const getAllCourses = async (req, res) => {
  try {
    const { category, level, featured } = req.query
    const filters = { category, level, featured: featured === 'true' }
    
    const courses = await courseService.getAllCourses(filters)
    APIResponse.success(res, courses, 'Courses retrieved successfully')
  } catch (error) {
    console.error('Get courses error:', error)
    APIResponse.error(res, 'Failed to retrieve courses', 500, 'GET_COURSES_ERROR')
  }
}

const getInstructors = async (req, res) => {
  try {
    const instructors = await courseService.getActiveInstructors()
    APIResponse.success(res, instructors, 'Instructors retrieved successfully')
  } catch (error) {
    console.error('Get instructors error:', error)
    APIResponse.error(res, 'Failed to retrieve instructors', 500, 'GET_INSTRUCTORS_ERROR')
  }
}

const getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id)
    if (!course) {
      return APIResponse.error(res, 'Course not found', 404, 'COURSE_NOT_FOUND')
    }
    
    const stats = await courseService.getEnrollmentStats(req.params.id)
    APIResponse.success(res, { ...course.toObject(), ...stats }, 'Course retrieved successfully')
  } catch (error) {
    console.error('Get course error:', error)
    APIResponse.error(res, 'Failed to retrieve course', 500, 'GET_COURSE_ERROR')
  }
}

const uploadMedia = async (req, res) => {
  try {
    const cloudinary = require('cloudinary').v2
    
    if (!req.file) {
      return APIResponse.error(res, 'No file uploaded', 400, 'NO_FILE')
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'courses',
      resource_type: 'auto'
    })

    APIResponse.success(res, { url: result.secure_url }, 'File uploaded successfully')
  } catch (error) {
    console.error('Upload error:', error)
    APIResponse.error(res, 'Failed to upload file', 500, 'UPLOAD_ERROR')
  }
}

const createCourse = async (req, res) => {
  try {
    const course = await courseService.createCourse(req.body)
    APIResponse.success(res, course, 'Course created successfully', 201)
  } catch (error) {
    console.error('Create course error:', error)
    APIResponse.error(res, 'Failed to create course', 500, 'CREATE_COURSE_ERROR')
  }
}

const updateCourse = async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body)
    if (!course) {
      return APIResponse.error(res, 'Course not found', 404, 'COURSE_NOT_FOUND')
    }
    APIResponse.success(res, course, 'Course updated successfully')
  } catch (error) {
    console.error('Update course error:', error)
    APIResponse.error(res, 'Failed to update course', 500, 'UPDATE_COURSE_ERROR')
  }
}

const deleteCourse = async (req, res) => {
  try {
    const course = await courseService.deleteCourse(req.params.id)
    if (!course) {
      return APIResponse.error(res, 'Course not found', 404, 'COURSE_NOT_FOUND')
    }
    APIResponse.success(res, null, 'Course deleted successfully')
  } catch (error) {
    console.error('Delete course error:', error)
    APIResponse.error(res, 'Failed to delete course', 500, 'DELETE_COURSE_ERROR')
  }
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getInstructors,
  uploadMedia
}