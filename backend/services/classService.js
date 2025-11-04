const Class = require('../models/Class')
const Course = require('../models/Course')
const Student = require('../models/Student')

const generateClassCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

const getAllClasses = async (filters = {}, page = 1, limit = 10) => {
  const query = {}
  
  if (filters.course) query.course = filters.course
  if (filters.instructor) query.instructor = filters.instructor
  if (filters.status !== undefined) query.isActive = filters.status === 'active'
  
  const skip = (page - 1) * limit
  
  const classes = await Class.find(query)
    .populate('instructor', 'fullName email')
    .populate('course', 'title category')
    .populate('students.student', 'fullName email')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 })
    
  const total = await Class.countDocuments(query)
  
  return {
    classes,
    pagination: {
      current: parseInt(page),
      pages: Math.ceil(total / limit),
      total
    }
  }
}

const createClass = async (classData) => {
  // Generate unique class code
  let code
  let isUnique = false
  
  while (!isUnique) {
    code = generateClassCode()
    const existing = await Class.findOne({ code })
    if (!existing) isUnique = true
  }
  
  const classObj = new Class({
    ...classData,
    code
  })
  
  await classObj.save()
  return await classObj.populate(['instructor', 'course'])
}

const updateClass = async (id, updateData) => {
  return await Class.findByIdAndUpdate(id, updateData, { new: true })
    .populate('instructor', 'fullName email')
    .populate('course', 'title category')
}

const deleteClass = async (id) => {
  return await Class.findByIdAndDelete(id)
}

const getClassesByInstructor = async (instructorId) => {
  return await Class.find({ instructor: instructorId })
    .populate('course', 'title category')
    .populate('students.student', 'fullName email')
    .sort({ createdAt: -1 })
}

const getClassesByStudent = async (studentId) => {
  return await Class.find({ 'students.student': studentId })
    .populate('instructor', 'fullName email')
    .populate('course', 'title category')
    .sort({ createdAt: -1 })
}

const joinClass = async (classId, studentId) => {
  const classObj = await Class.findById(classId)
  if (!classObj) {
    throw new Error('Class not found')
  }
  
  // Check if student already enrolled
  const isEnrolled = classObj.students.some(s => s.student.toString() === studentId)
  if (isEnrolled) {
    throw new Error('Already enrolled in this class')
  }
  
  // Check capacity
  if (classObj.students.length >= classObj.maxStudents) {
    throw new Error('Class is full')
  }
  
  classObj.students.push({
    student: studentId,
    enrolledAt: new Date(),
    status: 'active',
    progress: 0
  })
  
  await classObj.save()
  return await classObj.populate(['instructor', 'course', 'students.student'])
}

const updateStudentProgress = async (classId, studentId, progress) => {
  return await Class.findOneAndUpdate(
    { _id: classId, 'students.student': studentId },
    { $set: { 'students.$.progress': progress } },
    { new: true }
  )
}

const updateClassStatus = async (id, status, notes) => {
  const updateData = { isActive: status === 'active' }
  if (notes) updateData.notes = notes
  
  return await Class.findByIdAndUpdate(id, updateData, { new: true })
    .populate('instructor', 'fullName email')
    .populate('course', 'title category')
}

const getClassById = async (id) => {
  return await Class.findById(id)
    .populate('instructor', 'fullName email')
    .populate('course', 'title category')
    .populate('students.student', 'fullName email')
}

module.exports = {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
  getClassesByInstructor,
  getClassesByStudent,
  joinClass,
  updateStudentProgress,
  updateClassStatus,
  getClassById
}