const Assignment = require('../models/Assignment')
const Submission = require('../models/Submission')

class AssignmentService {
  async createAssignment(assignmentData) {
    const assignment = new Assignment(assignmentData)
    return await assignment.save()
  }

  async getAssignmentsByClass(classId) {
    return await Assignment.find({ class: classId, isActive: true })
      .populate('class', 'title')
      .sort({ dueDate: 1 })
  }

  async getAssignmentById(id) {
    return await Assignment.findById(id).populate('class', 'title instructor')
  }

  async updateAssignment(id, updateData) {
    return await Assignment.findByIdAndUpdate(id, updateData, { new: true })
  }

  async deleteAssignment(id) {
    return await Assignment.findByIdAndUpdate(id, { isActive: false }, { new: true })
  }

  async submitAssignment(submissionData) {
    const assignment = await Assignment.findById(submissionData.assignment)
    if (!assignment) throw new Error('Assignment not found')

    // Check if already submitted
    const existingSubmission = await Submission.findOne({
      assignment: submissionData.assignment,
      student: submissionData.student
    })

    if (existingSubmission) {
      throw new Error('Assignment already submitted')
    }

    // Check if late
    const isLate = new Date() > assignment.dueDate
    const submission = new Submission({
      ...submissionData,
      status: isLate ? 'late' : 'submitted'
    })

    return await submission.save()
  }

  async getSubmissionsByAssignment(assignmentId) {
    return await Submission.find({ assignment: assignmentId })
      .populate('student', 'fullName email')
      .sort({ submittedAt: -1 })
  }

  async gradeSubmission(submissionId, grade, feedback) {
    return await Submission.findByIdAndUpdate(
      submissionId,
      { grade, feedback, status: 'graded' },
      { new: true }
    ).populate('student', 'fullName email')
  }

  async getStudentSubmissions(studentId, classId = null) {
    const query = { student: studentId }
    if (classId) {
      const assignments = await Assignment.find({ class: classId })
      query.assignment = { $in: assignments.map(a => a._id) }
    }

    return await Submission.find(query)
      .populate('assignment', 'title dueDate maxPoints')
      .sort({ submittedAt: -1 })
  }

  async getAssignmentsByInstructor(instructorId) {
    return await Assignment.find({ instructor: instructorId, isActive: true })
      .populate('class', 'title')
      .sort({ dueDate: -1 })
  }

  async getAssignmentsByStudent(studentId) {
    // Get assignments for classes the student is enrolled in
    const Class = require('../models/Class')
    const classes = await Class.find({ students: studentId })
    const classIds = classes.map(c => c._id)
    
    const assignments = await Assignment.find({ class: { $in: classIds }, isActive: true })
      .populate('class', 'title')
      .sort({ dueDate: 1 })
    
    // Get submissions for these assignments
    const assignmentIds = assignments.map(a => a._id)
    const submissions = await Submission.find({ 
      assignment: { $in: assignmentIds }, 
      student: studentId 
    })
    
    // Merge assignment data with submission status
    return assignments.map(assignment => {
      const submission = submissions.find(s => s.assignment.toString() === assignment._id.toString())
      return {
        ...assignment.toObject(),
        submission: submission || null
      }
    })
  }
}

module.exports = new AssignmentService()