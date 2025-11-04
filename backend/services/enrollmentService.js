const Enrollment = require('../models/Enrollment')
const Course = require('../models/Course')
const courseService = require('./courseService')
const emailService = require('./emailService')

const createEnrollment = async (enrollmentData) => {
  const Class = require('../models/Class')
  
  // Check course exists and capacity
  const course = await Course.findById(enrollmentData.course)
  if (!course) {
    throw new Error('Course not found')
  }

  const stats = await courseService.getEnrollmentStats(enrollmentData.course)
  if (stats.isFullyBooked) {
    throw new Error('Course is fully booked')
  }

  // Set payment amount from course price
  enrollmentData.paymentAmount = course.price

  const enrollment = new Enrollment(enrollmentData)
  await enrollment.save()

  // Update course enrollment count
  await courseService.updateEnrollmentCount(enrollmentData.course, true)
  
  // Auto-enroll student in course classes
  try {
    const courseClasses = await Class.find({ course: enrollmentData.course, isActive: true })
    for (const classObj of courseClasses) {
      if (classObj.students.length < classObj.maxStudents) {
        const isEnrolled = classObj.students.some(s => s.student.toString() === enrollmentData.student)
        if (!isEnrolled) {
          classObj.students.push({
            student: enrollmentData.student,
            enrolledAt: new Date(),
            status: 'active',
            progress: 0
          })
          await classObj.save()
        }
      }
    }
  } catch (classError) {
    console.error('Failed to auto-enroll in classes:', classError)
  }

  // Send confirmation email
  try {
    await emailService.sendEnrollmentConfirmation({
      email: enrollmentData.email,
      studentName: enrollmentData.studentName,
      course: { title: course.title, category: course.category, instructor: course.instructor },
      paymentAmount: course.price
    })
  } catch (emailError) {
    console.error('Failed to send enrollment email:', emailError)
  }

  return await enrollment.populate('course', 'title category price')
}

const getAllEnrollments = async (filters = {}) => {
  const query = {}
  
  if (filters.status) query.status = filters.status
  if (filters.course) query.course = filters.course
  
  return await Enrollment.find(query)
    .populate('course', 'title category price')
    .populate('student', 'fullName email')
    .sort({ createdAt: -1 })
}

const updateEnrollmentStatus = async (id, status) => {
  const updateData = { status }
  
  if (status === 'approved') {
    updateData.approvedDate = new Date()
  } else if (status === 'completed') {
    updateData.completedDate = new Date()
  }

  const enrollment = await Enrollment.findByIdAndUpdate(id, updateData, { new: true })
    .populate('course', 'title category')
    .populate('student', 'fullName email')

  if (enrollment) {
    // Send status update email
    try {
      await emailService.sendEnrollmentStatusUpdate(enrollment.email, {
        studentName: enrollment.studentName,
        courseTitle: enrollment.course.title,
        status: status
      })
    } catch (emailError) {
      console.error('Failed to send status update email:', emailError)
    }
  }

  return enrollment
}

const getEnrollmentById = async (id) => {
  return await Enrollment.findById(id)
    .populate('course', 'title category price instructor')
    .populate('student', 'fullName email phone')
}

const getEnrollmentByStudentAndCourse = async (studentId, courseId) => {
  return await Enrollment.findOne({ student: studentId, course: courseId })
}

const getStudentEnrollments = async (studentId) => {
  return await Enrollment.find({ student: studentId })
    .populate('course', 'title category price startDate endDate')
    .sort({ createdAt: -1 })
}

module.exports = {
  createEnrollment,
  getAllEnrollments,
  updateEnrollmentStatus,
  getEnrollmentById,
  getEnrollmentByStudentAndCourse,
  getStudentEnrollments
}