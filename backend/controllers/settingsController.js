const AppSettings = require('../models/AppSettings')
const uploadService = require('../services/uploadService')
const APIResponse = require('../utils/APIResponse')

// Get app settings
const getSettings = async (req, res) => {
  try {
    let settings = await AppSettings.findOne({ isActive: true })
    
    if (!settings) {
      // Create default settings if none exist
      settings = new AppSettings()
      await settings.save()
    }
    
    APIResponse.success(res, settings, 'Settings retrieved successfully')
  } catch (error) {
    console.error('Error fetching settings:', error)
    APIResponse.error(res, 'Failed to fetch settings', 500, 'FETCH_ERROR')
  }
}

// Update app settings
const updateSettings = async (req, res) => {
  try {
    let updateData = { ...req.body }
    
    // Parse JSON fields
    if (updateData.socialLinks && typeof updateData.socialLinks === 'string') {
      updateData.socialLinks = JSON.parse(updateData.socialLinks)
    }
    if (updateData.seoSettings && typeof updateData.seoSettings === 'string') {
      updateData.seoSettings = JSON.parse(updateData.seoSettings)
    }
    
    // Handle logo upload
    if (req.files && req.files.logo) {
      updateData.logo = req.files.logo[0].path
    }
    
    // Handle favicon upload
    if (req.files && req.files.favicon) {
      updateData.favicon = req.files.favicon[0].path
    }
    
    let settings = await AppSettings.findOne({ isActive: true })
    
    if (!settings) {
      settings = new AppSettings(updateData)
    } else {
      Object.assign(settings, updateData)
    }
    
    await settings.save()
    APIResponse.success(res, settings, 'Settings updated successfully')
  } catch (error) {
    console.error('Error updating settings:', error)
    APIResponse.error(res, 'Failed to update settings', 500, 'UPDATE_ERROR')
  }
}

module.exports = {
  getSettings,
  updateSettings
}