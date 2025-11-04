const Assignment = require('../models/Assignment')
const Submission = require('../models/Submission')
const Class = require('../models/Class')
const emailService = require('./emailService')

const createAssignment = async (assignmentData) => {
  const assignment = new Assignment(assignmentData)
  await assignment.save()
  
  // Add assignment to class
  await Class.findByIdAndUpdate(assignmentData.class, {
    $push: { assignments: assignment._id }
  })
  
  return await assignment.populate(['class', 'instructor'])
}

const getAssignmentsByClass = async (classId) => {
  return await Assignment.find({ class: classId, isActive: true })
    .populate('instructor', 'fullName email')
    .sort({ dueDate: 1 })
}

const getAssignmentById = async (id) => {
  return await Assignment.findById(id)
    .populate({
      path: 'class',
      select: 'title code course',
      populate: {
        path: 'course',
        select: 'title category _id'
      }
    })
    .populate('instructor', 'fullName email')
}

const updateAssignment = async (id, updateData) => {
  return await Assignment.findByIdAndUpdate(id, updateData, { new: true })
    .populate(['class', 'instructor'])
}

const deleteAssignment = async (id) => {
  const assignment = await Assignment.findByIdAndDelete(id)
  
  if (assignment) {
    // Remove from class
    await Class.findByIdAndUpdate(assignment.class, {
      $pull: { assignments: id }
    })
    
    // Delete all submissions
    await Submission.deleteMany({ assignment: id })
  }
  
  return assignment
}

const submitAssignment = async (submissionData) => {
  // Check if assignment exists
  const assignment = await Assignment.findById(submissionData.assignment)
  if (!assignment) {
    throw new Error('Assignment not found')
  }
  
  // Check if already submitted
  const existing = await Submission.findOne({
    assignment: submissionData.assignment,
    student: submissionData.student
  })
  
  if (existing) {
    throw new Error('Assignment already submitted')
  }
  
  const submission = new Submission(submissionData)
  await submission.save()
  
  return await submission.populate(['assignment', 'student'])
}

const getSubmissionsByAssignment = async (assignmentId) => {
  const submissions = await Submission.find({ assignment: assignmentId })
    .populate('student', 'fullName email')
    .sort({ submittedAt: -1 })
  return submissions
}

const gradeSubmission = async (submissionId, grade, feedback) => {
  const submission = await Submission.findByIdAndUpdate(
    submissionId,
    {
      grade,
      feedback,
      gradedAt: new Date(),
      status: 'graded'
    },
    { new: true }
  ).populate(['assignment', 'student'])
  
  // Send grade notification email
  try {
    await emailService.sendGradeNotification(submission.student.email, {
      studentName: submission.student.fullName,
      assignmentTitle: submission.assignment.title,
      grade,
      feedback
    })
  } catch (emailError) {
    console.error('Failed to send grade notification:', emailError)
  }
  
  return submission
}

const getStudentSubmissions = async (studentId, classId = null) => {
  const query = { student: studentId }
  
  if (classId) {
    // Get assignments for specific class
    const assignments = await Assignment.find({ class: classId }).select('_id')
    query.assignment = { $in: assignments.map(a => a._id) }
  }
  
  return await Submission.find(query)
    .populate('assignment', 'title dueDate maxPoints')
    .sort({ submittedAt: -1 })
}

const getAssignmentsByInstructor = async (instructorId) => {
  const assignments = await Assignment.find({ instructor: instructorId })
    .populate('class', 'title code')
    .sort({ createdAt: -1 })
  
  // Add submission counts to each assignment
  const assignmentsWithSubmissions = await Promise.all(
    assignments.map(async (assignment) => {
      const submissionCount = await Submission.countDocuments({ assignment: assignment._id })
      return {
        ...assignment.toObject(),
        submissions: { length: submissionCount }
      }
    })
  )
  
  return assignmentsWithSubmissions
}

const getAssignmentsByStudent = async (studentId) => {
  // Get classes student is enrolled in
  const classes = await Class.find({ 'students.student': studentId })
    .select('_id')
  
  const classIds = classes.map(c => c._id)
  
  const assignments = await Assignment.find({ 
    class: { $in: classIds },
    isActive: true 
  })
    .populate('class', 'title code')
    .populate('instructor', 'fullName')
    .sort({ dueDate: 1 })
  
  // Get submission status for each assignment
  const assignmentsWithStatus = await Promise.all(
    assignments.map(async (assignment) => {
      const submission = await Submission.findOne({
        assignment: assignment._id,
        student: studentId
      })
      
      return {
        ...assignment.toObject(),
        submission: submission || null,
        status: submission ? submission.status : 'pending'
      }
    })
  )
  
  return assignmentsWithStatus
}

module.exports = {
  createAssignment,
  getAssignmentsByClass,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissionsByAssignment,
  gradeSubmission,
  getStudentSubmissions,
  getAssignmentsByInstructor,
  getAssignmentsByStudent
}