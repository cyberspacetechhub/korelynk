const Class = require('../models/Class')
const Course = require('../models/Course')
const Student = require('../models/Student')
const Enrollment = require('../models/Enrollment')

class ClassService {
  async getAllClasses(filters = {}, page = 1, limit = 10) {
    const query = {}
    
    if (filters.course) query.course = filters.course
    if (filters.instructor) query.instructor = filters.instructor
    if (filters.status) query.status = filters.status
    
    const skip = (page - 1) * limit
    
    const classes = await Class.find(query)
      .populate('course', 'title category')
      .populate('instructor', 'fullName email')
      .populate('students', 'fullName email')
      .sort({ scheduledDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
    
    const total = await Class.countDocuments(query)
    
    return {
      classes,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      total
    }
  }

  async createClass(classData) {
    const newClass = new Class(classData)
    return await newClass.save()
  }

  async updateClass(id, updateData) {
    return await Class.findByIdAndUpdate(id, updateData, { new: true })
      .populate('course', 'title category')
      .populate('instructor', 'fullName email')
  }

  async deleteClass(id) {
    return await Class.findByIdAndDelete(id)
  }

  async getClassesByInstructor(instructorId) {
    return await Class.find({ instructor: instructorId })
      .populate('course', 'title category level')
      .populate('students', 'fullName email')
      .sort({ scheduledDate: -1 })
  }

  async getClassesByStudent(studentId) {
    return await Class.find({ students: studentId })
      .populate('course', 'title category level')
      .populate('instructor', 'fullName email')
      .sort({ scheduledDate: -1 })
  }

  async updateClassStatus(id, status, notes) {
    return await Class.findByIdAndUpdate(
      id, 
      { status, notes, updatedAt: new Date() }, 
      { new: true }
    ).populate('course', 'title').populate('instructor', 'fullName')
  }

  async joinClass(classId, studentId) {
    const classData = await Class.findById(classId).populate('course')
    if (!classData) {
      throw new Error('Class not found')
    }

    // Check if student is enrolled in the course
    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: classData.course._id,
      status: 'approved'
    })

    if (!enrollment) {
      throw new Error('You must be enrolled in this course to join the class')
    }

    // Check if student is already in the class
    if (classData.students.includes(studentId)) {
      throw new Error('You are already in this class')
    }

    // Check class capacity
    if (classData.students.length >= classData.maxStudents) {
      throw new Error('Class is full')
    }

    // Add student to class
    classData.students.push(studentId)
    await classData.save()

    return classData
  }
}

module.exports = new ClassService()