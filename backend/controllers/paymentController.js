const paymentService = require('../services/paymentService')
const APIResponse = require('../utils/APIResponse')

const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments()
    APIResponse.success(res, payments, 'Payments retrieved successfully')
  } catch (error) {
    console.error('Error fetching payments:', error)
    APIResponse.error(res, 'Failed to fetch payments', 500, 'FETCH_ERROR')
  }
}

const confirmPayment = async (req, res) => {
  try {
    const { status, reason } = req.body
    const adminId = req.user.id

    let payment
    if (status === 'confirmed') {
      payment = await paymentService.confirmPayment(req.params.id, adminId)
    } else if (status === 'rejected') {
      payment = await paymentService.rejectPayment(req.params.id, adminId, reason)
    } else {
      return APIResponse.error(res, 'Invalid status', 400, 'INVALID_STATUS')
    }

    APIResponse.success(res, payment, 'Payment status updated successfully')
  } catch (error) {
    console.error('Error updating payment status:', error)
    APIResponse.error(res, error.message || 'Failed to update payment status', 500, 'UPDATE_ERROR')
  }
}

module.exports = {
  getAllPayments,
  confirmPayment
}