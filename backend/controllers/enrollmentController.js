const enrollmentService = require('../services/enrollmentService')
const Student = require('../models/Student')
const APIResponse = require('../utils/APIResponse')

const createEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.body
    
    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return APIResponse.error(res, 'Student not found', 404, 'STUDENT_NOT_FOUND')
    }

    // Check if already enrolled
    const existingEnrollment = await enrollmentService.getEnrollmentByStudentAndCourse(studentId, courseId)
    if (existingEnrollment) {
      return APIResponse.error(res, 'Already enrolled in this course', 400, 'ALREADY_ENROLLED')
    }

    const enrollmentData = {
      student: studentId,
      course: courseId,
      studentName: student.fullName,
      email: student.email,
      phone: student.phone,
      experience: req.body.experience || 'Basic',
      motivation: req.body.motivation || 'Learning new skills',
      availability: req.body.availability || 'Flexible'
    }

    const enrollment = await enrollmentService.createEnrollment(enrollmentData)
    
    // Add to student's enrolled courses
    await Student.findByIdAndUpdate(studentId, {
      $push: {
        enrolledCourses: {
          course: courseId,
          enrollmentDate: new Date(),
          status: 'active'
        }
      }
    })

    APIResponse.success(res, enrollment, 'Enrollment submitted successfully', 201)
  } catch (error) {
    console.error('Create enrollment error:', error)
    if (error.message === 'Course not found') {
      return APIResponse.error(res, 'Course not found', 404, 'COURSE_NOT_FOUND')
    }
    if (error.message === 'Course is fully booked') {
      return APIResponse.error(res, 'Course is fully booked', 400, 'COURSE_FULL')
    }
    APIResponse.error(res, 'Failed to submit enrollment', 500, 'CREATE_ENROLLMENT_ERROR')
  }
}

const getAllEnrollments = async (req, res) => {
  try {
    const { status, course } = req.query
    const filters = { status, course }
    
    const enrollments = await enrollmentService.getAllEnrollments(filters)
    APIResponse.success(res, enrollments, 'Enrollments retrieved successfully')
  } catch (error) {
    console.error('Get enrollments error:', error)
    APIResponse.error(res, 'Failed to retrieve enrollments', 500, 'GET_ENROLLMENTS_ERROR')
  }
}

const updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body
    const enrollment = await enrollmentService.updateEnrollmentStatus(req.params.id, status)
    
    if (!enrollment) {
      return APIResponse.error(res, 'Enrollment not found', 404, 'ENROLLMENT_NOT_FOUND')
    }
    
    APIResponse.success(res, enrollment, 'Enrollment status updated successfully')
  } catch (error) {
    console.error('Update enrollment error:', error)
    APIResponse.error(res, 'Failed to update enrollment', 500, 'UPDATE_ENROLLMENT_ERROR')
  }
}

const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    if (!enrollment) {
      return APIResponse.error(res, 'Enrollment not found', 404, 'ENROLLMENT_NOT_FOUND')
    }
    APIResponse.success(res, enrollment, 'Enrollment retrieved successfully')
  } catch (error) {
    console.error('Get enrollment error:', error)
    APIResponse.error(res, 'Failed to retrieve enrollment', 500, 'GET_ENROLLMENT_ERROR')
  }
}

module.exports = {
  createEnrollment,
  getAllEnrollments,
  updateEnrollmentStatus,
  getEnrollmentById
}