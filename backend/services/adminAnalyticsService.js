const Student = require('../models/Student')
const Instructor = require('../models/Instructor')
const Course = require('../models/Course')
const Class = require('../models/Class')
const Assignment = require('../models/Assignment')
const Submission = require('../models/Submission')
const Progress = require('../models/Progress')
const Enrollment = require('../models/Enrollment')

class AdminAnalyticsService {
  async getOverviewStats() {
    const [
      totalStudents,
      totalInstructors,
      totalCourses,
      totalClasses,
      totalAssignments,
      totalSubmissions,
      activeEnrollments
    ] = await Promise.all([
      Student.countDocuments({ isActive: true }),
      Instructor.countDocuments({ isActive: true }),
      Course.countDocuments({ isActive: true }),
      Class.countDocuments({ isActive: true }),
      Assignment.countDocuments({ isActive: true }),
      Submission.countDocuments(),
      Enrollment.countDocuments({ status: 'approved' })
    ])

    return {
      totalStudents,
      totalInstructors,
      totalCourses,
      totalClasses,
      totalAssignments,
      totalSubmissions,
      activeEnrollments
    }
  }

  async getStudentAnalytics() {
    const studentStats = await Student.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'progresses',
          localField: '_id',
          foreignField: 'student',
          as: 'progress'
        }
      },
      {
        $addFields: {
          totalClasses: { $size: '$enrolledCourses' },
          avgProgress: { $avg: '$progress.completionPercentage' },
          avgGrade: { $avg: '$progress.averageGrade' }
        }
      },
      {
        $group: {
          _id: null,
          totalStudents: { $sum: 1 },
          avgClassesPerStudent: { $avg: '$totalClasses' },
          avgProgressAcrossStudents: { $avg: '$avgProgress' },
          avgGradeAcrossStudents: { $avg: '$avgGrade' }
        }
      }
    ])

    const enrollmentTrends = await Enrollment.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$enrollmentDate' },
            month: { $month: '$enrollmentDate' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 }
    ])

    return {
      stats: studentStats[0] || {},
      enrollmentTrends
    }
  }

  async getInstructorAnalytics() {
    const instructorStats = await Instructor.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'classes',
          localField: '_id',
          foreignField: 'instructor',
          as: 'classes'
        }
      },
      {
        $addFields: {
          totalClasses: { $size: '$classes' },
          totalStudents: {
            $sum: {
              $map: {
                input: '$classes',
                as: 'class',
                in: { $size: '$$class.students' }
              }
            }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalInstructors: { $sum: 1 },
          avgClassesPerInstructor: { $avg: '$totalClasses' },
          avgStudentsPerInstructor: { $avg: '$totalStudents' }
        }
      }
    ])

    const topInstructors = await Instructor.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'classes',
          localField: '_id',
          foreignField: 'instructor',
          as: 'classes'
        }
      },
      {
        $addFields: {
          totalStudents: {
            $sum: {
              $map: {
                input: '$classes',
                as: 'class',
                in: { $size: '$$class.students' }
              }
            }
          }
        }
      },
      { $sort: { totalStudents: -1 } },
      { $limit: 5 },
      {
        $project: {
          fullName: 1,
          email: 1,
          totalStudents: 1,
          totalClasses: { $size: '$classes' }
        }
      }
    ])

    return {
      stats: instructorStats[0] || {},
      topInstructors
    }
  }

  async getCourseAnalytics() {
    const courseStats = await Course.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'course',
          as: 'enrollments'
        }
      },
      {
        $addFields: {
          enrollmentCount: { $size: '$enrollments' }
        }
      },
      {
        $group: {
          _id: '$category',
          totalCourses: { $sum: 1 },
          totalEnrollments: { $sum: '$enrollmentCount' },
          avgEnrollmentsPerCourse: { $avg: '$enrollmentCount' }
        }
      },
      { $sort: { totalEnrollments: -1 } }
    ])

    const popularCourses = await Course.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'course',
          as: 'enrollments'
        }
      },
      {
        $addFields: {
          enrollmentCount: { $size: '$enrollments' }
        }
      },
      { $sort: { enrollmentCount: -1 } },
      { $limit: 5 },
      {
        $project: {
          title: 1,
          category: 1,
          price: 1,
          enrollmentCount: 1,
          instructor: 1
        }
      }
    ])

    return {
      categoryStats: courseStats,
      popularCourses
    }
  }

  async getClassAnalytics() {
    const classStats = await Class.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'assignments',
          localField: '_id',
          foreignField: 'class',
          as: 'assignments'
        }
      },
      {
        $addFields: {
          studentCount: { $size: '$students' },
          assignmentCount: { $size: '$assignments' }
        }
      },
      {
        $group: {
          _id: null,
          totalClasses: { $sum: 1 },
          avgStudentsPerClass: { $avg: '$studentCount' },
          avgAssignmentsPerClass: { $avg: '$assignmentCount' },
          totalStudentsInClasses: { $sum: '$studentCount' }
        }
      }
    ])

    const classPerformance = await Progress.aggregate([
      {
        $lookup: {
          from: 'classes',
          localField: 'class',
          foreignField: '_id',
          as: 'classInfo'
        }
      },
      { $unwind: '$classInfo' },
      {
        $group: {
          _id: '$class',
          className: { $first: '$classInfo.title' },
          avgCompletion: { $avg: '$completionPercentage' },
          avgGrade: { $avg: '$averageGrade' },
          studentCount: { $sum: 1 }
        }
      },
      { $sort: { avgCompletion: -1 } },
      { $limit: 10 }
    ])

    return {
      stats: classStats[0] || {},
      topPerformingClasses: classPerformance
    }
  }

  async getSubmissionAnalytics() {
    const submissionStats = await Submission.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgGrade: { $avg: '$grade' }
        }
      }
    ])

    const gradeTrends = await Submission.aggregate([
      { $match: { grade: { $ne: null } } },
      {
        $group: {
          _id: {
            year: { $year: '$submittedAt' },
            month: { $month: '$submittedAt' }
          },
          avgGrade: { $avg: '$grade' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 }
    ])

    return {
      statusDistribution: submissionStats,
      gradeTrends
    }
  }

  async getRecentActivity() {
    const [recentEnrollments, recentSubmissions, recentClasses] = await Promise.all([
      Enrollment.find()
        .populate('student', 'fullName email')
        .populate('course', 'title')
        .sort({ enrollmentDate: -1 })
        .limit(5),
      
      Submission.find()
        .populate('student', 'fullName')
        .populate('assignment', 'title')
        .sort({ submittedAt: -1 })
        .limit(5),
      
      Class.find({ isActive: true })
        .populate('instructor', 'fullName')
        .populate('course', 'title')
        .sort({ createdAt: -1 })
        .limit(5)
    ])

    return {
      recentEnrollments,
      recentSubmissions,
      recentClasses
    }
  }
}

module.exports = new AdminAnalyticsService()