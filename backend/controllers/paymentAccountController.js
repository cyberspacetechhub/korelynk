const PaymentAccount = require('../models/PaymentAccount')
const APIResponse = require('../utils/APIResponse')

const createPaymentAccount = async (req, res) => {
  try {
    const { bankName, accountNumber, accountName } = req.body
    
    // Deactivate existing accounts
    await PaymentAccount.updateMany({}, { isActive: false })
    
    // Create new active account
    const paymentAccount = new PaymentAccount({
      bankName,
      accountNumber,
      accountName,
      isActive: true
    })
    
    await paymentAccount.save()
    APIResponse.success(res, paymentAccount, 'Payment account created successfully', 201)
  } catch (error) {
    console.error('Create payment account error:', error)
    APIResponse.error(res, 'Failed to create payment account', 500, 'CREATE_PAYMENT_ACCOUNT_ERROR')
  }
}

const getActivePaymentAccount = async (req, res) => {
  try {
    const paymentAccount = await PaymentAccount.findOne({ isActive: true })
    APIResponse.success(res, paymentAccount, 'Payment account retrieved successfully')
  } catch (error) {
    console.error('Get payment account error:', error)
    APIResponse.error(res, 'Failed to retrieve payment account', 500, 'GET_PAYMENT_ACCOUNT_ERROR')
  }
}

const updatePaymentAccount = async (req, res) => {
  try {
    const { id } = req.params
    const { bankName, accountNumber, accountName } = req.body
    
    const paymentAccount = await PaymentAccount.findByIdAndUpdate(
      id,
      { bankName, accountNumber, accountName },
      { new: true }
    )
    
    if (!paymentAccount) {
      return APIResponse.error(res, 'Payment account not found', 404, 'PAYMENT_ACCOUNT_NOT_FOUND')
    }
    
    APIResponse.success(res, paymentAccount, 'Payment account updated successfully')
  } catch (error) {
    console.error('Update payment account error:', error)
    APIResponse.error(res, 'Failed to update payment account', 500, 'UPDATE_PAYMENT_ACCOUNT_ERROR')
  }
}

module.exports = {
  createPaymentAccount,
  getActivePaymentAccount,
  updatePaymentAccount
}