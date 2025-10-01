const Feedback = require('../models/Feedback')
const APIResponse = require('../utils/APIResponse')
const { createNotification } = require('../services/notificationService')

// Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body)
    const savedFeedback = await feedback.save()
    
    // Create notification
    await createNotification(
      'New Feedback Received',
      `${req.body.name} left a ${req.body.rating}-star review`,
      'feedback',
      savedFeedback._id,
      'medium'
    )
    
    APIResponse.success(res, savedFeedback, 'Feedback submitted successfully', 201)
  } catch (error) {
    console.error('Error submitting feedback:', error)
    APIResponse.error(res, 'Failed to submit feedback', 500, 'SUBMIT_ERROR')
  }
}

// Get approved testimonials (excluding FlyerForge)
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Feedback.find({ 
      status: 'approved', 
      isTestimonial: true,
      site: { $ne: 'flyerforge' }
    }).sort({ createdAt: -1 })
    
    APIResponse.success(res, testimonials, 'Testimonials retrieved successfully')
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    APIResponse.error(res, 'Failed to fetch testimonials', 500, 'FETCH_ERROR')
  }
}

// Get FlyerForge testimonials
const getFlyerForgeTestimonials = async (req, res) => {
  try {
    const testimonials = await Feedback.find({ 
      status: 'approved', 
      isTestimonial: true,
      site: 'flyerforge'
    }).sort({ createdAt: -1 })
    
    APIResponse.success(res, testimonials, 'FlyerForge testimonials retrieved successfully')
  } catch (error) {
    console.error('Error fetching FlyerForge testimonials:', error)
    APIResponse.error(res, 'Failed to fetch FlyerForge testimonials', 500, 'FETCH_ERROR')
  }
}

// Admin: Get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    
    const feedback = await Feedback.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    
    const total = await Feedback.countDocuments()
    
    APIResponse.success(res, {
      feedback,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    }, 'Feedback retrieved successfully')
  } catch (error) {
    console.error('Error fetching feedback:', error)
    APIResponse.error(res, 'Failed to fetch feedback', 500, 'FETCH_ERROR')
  }
}

// Admin: Update feedback status
const updateFeedbackStatus = async (req, res) => {
  try {
    const { status, isTestimonial } = req.body
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status, isTestimonial },
      { new: true }
    )
    
    if (!feedback) {
      return APIResponse.error(res, 'Feedback not found', 404, 'NOT_FOUND')
    }
    
    APIResponse.success(res, feedback, 'Feedback updated successfully')
  } catch (error) {
    console.error('Error updating feedback:', error)
    APIResponse.error(res, 'Failed to update feedback', 500, 'UPDATE_ERROR')
  }
}

module.exports = {
  submitFeedback,
  getTestimonials,
  getFlyerForgeTestimonials,
  getAllFeedback,
  updateFeedbackStatus
}