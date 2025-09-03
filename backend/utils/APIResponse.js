class APIResponse {
  static success(res, data = null, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  static error(res, message = 'Error', statusCode = 500, errorCode = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errorCode,
      timestamp: new Date().toISOString()
    });
  }

  static validationError(res, errors) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = APIResponse;