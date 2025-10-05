const Enrollment = require('../models/Enrollment')
const Course = require('../models/Course')
const emailService = require('./emailService')

class EnrollmentService {
  async createEnrollment(enrollmentData) {
    const course = await Course.findById(enrollmentData.course)
    if (!course) throw new Error('Course not found')
    
    // Check if course is full
    const currentEnrollments = await Enrollment.countDocuments({ 
      course: enrollmentData.course, 
      status: 'approved' 
    })
    
    if (currentEnrollments >= course.maxStudents) {
      throw new Error('Course is fully booked')
    }
    
    const enrollment = new Enrollment({
      ...enrollmentData,
      paymentAmount: course.price
    })
    
    const savedEnrollment = await enrollment.save()
    await savedEnrollment.populate(['course', 'student'])
    
    // Send confirmation email
    await emailService.sendEnrollmentConfirmation(savedEnrollment)
    
    return savedEnrollment
  }

  async getEnrollmentByStudentAndCourse(studentId, courseId) {
    return await Enrollment.findOne({ student: studentId, course: courseId })
  }

  async getAllEnrollments(filters = {}) {
    const query = {}
    if (filters.status) query.status = filters.status
    if (filters.course) query.course = filters.course
    
    return await Enrollment.find(query)
      .populate('course', 'title category instructor')
      .sort({ createdAt: -1 })
  }

  async updateEnrollmentStatus(id, status) {
    const updateData = { status }
    if (status === 'approved') updateData.approvedDate = new Date()
    if (status === 'completed') updateData.completedDate = new Date()
    
    const enrollment = await Enrollment.findByIdAndUpdate(id, updateData, { new: true })
      .populate('course')
    
    if (status === 'approved') {
      await Course.findByIdAndUpdate(enrollment.course._id, {
        $inc: { currentEnrollments: 1 }
      })
      await emailService.sendEnrollmentApproval(enrollment)
    }
    
    return enrollment
  }

  async getEnrollmentById(id) {
    return await Enrollment.findById(id).populate('course')
  }
}

module.exports = new EnrollmentService()