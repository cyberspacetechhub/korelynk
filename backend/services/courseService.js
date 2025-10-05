const Course = require('../models/Course')
const Enrollment = require('../models/Enrollment')
const Instructor = require('../models/Instructor')

class CourseService {
  async getAllCourses(filters = {}) {
    const query = { isActive: true }
    
    if (filters.category) query.category = filters.category
    if (filters.level) query.level = filters.level
    if (filters.featured) query.featured = true
    
    return await Course.find(query).populate('instructor', 'fullName email').sort({ createdAt: -1 })
  }

  async getCourseById(id) {
    return await Course.findById(id).populate('instructor', 'fullName email phone expertise')
  }

  async getActiveInstructors() {
    return await Instructor.find({ isActive: true }).select('fullName email expertise')
  }

  async createCourse(courseData) {
    const course = new Course(courseData)
    return await course.save()
  }

  async updateCourse(id, updateData) {
    return await Course.findByIdAndUpdate(id, updateData, { new: true })
  }

  async deleteCourse(id) {
    return await Course.findByIdAndUpdate(id, { isActive: false }, { new: true })
  }

  async getEnrollmentStats(courseId) {
    const course = await Course.findById(courseId)
    const enrollments = await Enrollment.countDocuments({ course: courseId, status: 'approved' })
    
    return {
      totalEnrollments: enrollments,
      availableSpots: course.maxStudents - enrollments,
      isFullyBooked: enrollments >= course.maxStudents
    }
  }
}

module.exports = new CourseService()