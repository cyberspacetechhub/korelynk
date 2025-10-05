const Instructor = require('../models/Instructor')
const Class = require('../models/Class')
const Assignment = require('../models/Assignment')
const Submission = require('../models/Submission')

class InstructorService {
  async createInstructor(instructorData) {
    const instructor = new Instructor(instructorData)
    return await instructor.save()
  }

  async getInstructorById(id) {
    return await Instructor.findById(id).populate('classes')
  }

  async getInstructorClasses(instructorId) {
    return await Class.find({ instructor: instructorId, isActive: true })
      .populate('course', 'title category')
      .populate('students.student', 'fullName email')
  }

  async getClassById(classId) {
    return await Class.findById(classId)
      .populate('instructor', 'fullName email')
      .populate('course', 'title category duration')
      .populate('students.student', 'fullName email')
      .populate('assignments')
  }

  async getClassAssignments(classId) {
    return await Assignment.find({ class: classId, isActive: true })
      .sort({ dueDate: 1 })
  }

  async getAssignmentSubmissions(assignmentId) {
    return await Submission.find({ assignment: assignmentId })
      .populate('student', 'fullName email')
      .sort({ submittedAt: -1 })
  }

  async getInstructorStats(instructorId) {
    const classes = await Class.find({ instructor: instructorId })
    const classIds = classes.map(c => c._id)
    
    const totalStudents = classes.reduce((sum, cls) => sum + cls.students.length, 0)
    const totalAssignments = await Assignment.countDocuments({ class: { $in: classIds } })
    const totalSubmissions = await Submission.countDocuments({ 
      assignment: { $in: await Assignment.find({ class: { $in: classIds } }).distinct('_id') }
    })

    return {
      totalClasses: classes.length,
      totalStudents,
      totalAssignments,
      totalSubmissions,
      activeClasses: classes.filter(c => c.isActive).length
    }
  }
}

module.exports = new InstructorService()