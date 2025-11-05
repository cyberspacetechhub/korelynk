const Student = require('../models/Student')
const Instructor = require('../models/Instructor')
const Class = require('../models/Class')
const adminAnalyticsService = require('../services/adminAnalyticsService')
const APIResponse = require('../utils/APIResponse')

// Student Management
const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query
    const query = {}
    
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (status) {
      query.isActive = status === 'active'
    }

    const students = await Student.find(query)
      .select('-password')
      .populate('enrolledCourses.course', 'title category')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Student.countDocuments(query)

    APIResponse.success(res, {
      students,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    }, 'Students retrieved successfully')
  } catch (error) {
    console.error('Get students error:', error)
    APIResponse.error(res, 'Failed to retrieve students', 500, 'GET_STUDENTS_ERROR')
  }
}

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .select('-password')
      .populate('enrolledCourses.course', 'title category instructor')

    if (!student) {
      return APIResponse.error(res, 'Student not found', 404, 'STUDENT_NOT_FOUND')
    }

    // Get student progress
    const Progress = require('../models/Progress')
    const progress = await Progress.find({ student: req.params.id })
      .populate('class', 'title')

    APIResponse.success(res, { student, progress }, 'Student details retrieved')
  } catch (error) {
    console.error('Get student error:', error)
    APIResponse.error(res, 'Failed to retrieve student', 500, 'GET_STUDENT_ERROR')
  }
}

const updateStudentStatus = async (req, res) => {
  try {
    const { isActive } = req.body
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password')

    if (!student) {
      return APIResponse.error(res, 'Student not found', 404, 'STUDENT_NOT_FOUND')
    }

    APIResponse.success(res, student, 'Student status updated')
  } catch (error) {
    console.error('Update student error:', error)
    APIResponse.error(res, 'Failed to update student', 500, 'UPDATE_STUDENT_ERROR')
  }
}

// Instructor Management
const getAllInstructors = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query
    const query = {}
    
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (status) {
      query.isActive = status === 'active'
    }

    const instructors = await Instructor.find(query)
      .select('-password')
      .populate('classes', 'title code')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Instructor.countDocuments(query)

    APIResponse.success(res, {
      instructors,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    }, 'Instructors retrieved successfully')
  } catch (error) {
    console.error('Get instructors error:', error)
    APIResponse.error(res, 'Failed to retrieve instructors', 500, 'GET_INSTRUCTORS_ERROR')
  }
}

const getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id)
      .select('-password')
      .populate('classes')

    if (!instructor) {
      return APIResponse.error(res, 'Instructor not found', 404, 'INSTRUCTOR_NOT_FOUND')
    }

    // Get instructor classes with student counts
    const classes = await Class.find({ instructor: req.params.id })
      .populate('course', 'title category')
      .populate('students.student', 'fullName email')

    APIResponse.success(res, { instructor, classes }, 'Instructor details retrieved')
  } catch (error) {
    console.error('Get instructor error:', error)
    APIResponse.error(res, 'Failed to retrieve instructor', 500, 'GET_INSTRUCTOR_ERROR')
  }
}

const updateInstructorStatus = async (req, res) => {
  try {
    const { isActive, isApproved } = req.body
    const updateData = {}
    
    if (isActive !== undefined) updateData.isActive = isActive
    if (isApproved !== undefined) updateData.isApproved = isApproved
    
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password')

    if (!instructor) {
      return APIResponse.error(res, 'Instructor not found', 404, 'INSTRUCTOR_NOT_FOUND')
    }

    APIResponse.success(res, instructor, 'Instructor updated successfully')
  } catch (error) {
    console.error('Update instructor error:', error)
    APIResponse.error(res, 'Failed to update instructor', 500, 'UPDATE_INSTRUCTOR_ERROR')
  }
}

// Analytics
const getAnalyticsDashboard = async (req, res) => {
  try {
    const [
      overviewStats,
      studentAnalytics,
      instructorAnalytics,
      courseAnalytics,
      classAnalytics,
      submissionAnalytics,
      recentActivity
    ] = await Promise.all([
      adminAnalyticsService.getOverviewStats(),
      adminAnalyticsService.getStudentAnalytics(),
      adminAnalyticsService.getInstructorAnalytics(),
      adminAnalyticsService.getCourseAnalytics(),
      adminAnalyticsService.getClassAnalytics(),
      adminAnalyticsService.getSubmissionAnalytics(),
      adminAnalyticsService.getRecentActivity()
    ])

    APIResponse.success(res, {
      overview: overviewStats,
      students: studentAnalytics,
      instructors: instructorAnalytics,
      courses: courseAnalytics,
      classes: classAnalytics,
      submissions: submissionAnalytics,
      recentActivity
    }, 'Analytics dashboard retrieved')
  } catch (error) {
    console.error('Get analytics error:', error)
    APIResponse.error(res, 'Failed to retrieve analytics', 500, 'GET_ANALYTICS_ERROR')
  }
}

const createClass = async (req, res) => {
  try {
    const classData = {
      ...req.body,
      code: Math.random().toString(36).substring(2, 8).toUpperCase()
    }
    
    const newClass = new Class(classData)
    await newClass.save()
    
    // Add class to instructor's classes array
    await Instructor.findByIdAndUpdate(
      classData.instructor,
      { $push: { classes: newClass._id } }
    )

    const populatedClass = await Class.findById(newClass._id)
      .populate('instructor', 'fullName email')
      .populate('course', 'title category')

    APIResponse.success(res, populatedClass, 'Class created successfully', 201)
  } catch (error) {
    console.error('Create class error:', error)
    APIResponse.error(res, 'Failed to create class', 500, 'CREATE_CLASS_ERROR')
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  updateStudentStatus,
  getAllInstructors,
  getInstructorById,
  updateInstructorStatus,
  getAnalyticsDashboard,
  createClass
}