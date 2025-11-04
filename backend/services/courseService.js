const Course = require('../models/Course')
const Instructor = require('../models/Instructor')
const Enrollment = require('../models/Enrollment')

const getAllCourses = async (filters = {}) => {
  const query = {}
  
  if (filters.category) query.category = filters.category
  if (filters.level) query.level = filters.level
  if (filters.featured !== undefined) query.featured = filters.featured
  
  return await Course.find(query)
    .populate('instructor', 'fullName email')
    .sort({ createdAt: -1 })
}

const getCourseById = async (id) => {
  return await Course.findById(id).populate('instructor', 'fullName email bio')
}

const createCourse = async (courseData) => {
  const course = new Course(courseData)
  return await course.save()
}

const updateCourse = async (id, updateData) => {
  return await Course.findByIdAndUpdate(id, updateData, { new: true })
    .populate('instructor', 'fullName email')
}

const deleteCourse = async (id) => {
  const course = await Course.findById(id)
  if (!course) return null
  
  // Clean up Cloudinary assets
  const cloudinary = require('cloudinary').v2
  
  try {
    // Delete featured image if exists
    if (course.featuredImage) {
      const publicId = course.featuredImage.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`courses/${publicId}`)
    }
    
    // Delete intro video if exists
    if (course.introVideo) {
      const publicId = course.introVideo.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`courses/${publicId}`, { resource_type: 'video' })
    }
  } catch (error) {
    console.error('Cloudinary cleanup error:', error)
  }
  
  return await Course.findByIdAndDelete(id)
}

const getActiveInstructors = async () => {
  return await Instructor.find({ isApproved: true, isActive: true })
    .select('fullName email expertise')
}

const getEnrollmentStats = async (courseId) => {
  const enrollments = await Enrollment.countDocuments({ course: courseId })
  const course = await Course.findById(courseId)
  
  return {
    currentEnrollments: enrollments,
    availableSpots: course.maxStudents - enrollments,
    isFullyBooked: enrollments >= course.maxStudents
  }
}

const updateEnrollmentCount = async (courseId, increment = true) => {
  const update = increment 
    ? { $inc: { currentEnrollments: 1 } }
    : { $inc: { currentEnrollments: -1 } }
    
  return await Course.findByIdAndUpdate(courseId, update, { new: true })
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getActiveInstructors,
  getEnrollmentStats,
  updateEnrollmentCount
}