const servicesService = require('../services/servicesService')
const APIResponse = require('../utils/APIResponse')

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = servicesService.getServices()
    APIResponse.success(res, services, 'Services retrieved successfully')
  } catch (error) {
    console.error('Error fetching services:', error)
    APIResponse.error(res, 'Failed to fetch services', 500, 'FETCH_ERROR')
  }
}

module.exports = {
  getAllServices
}