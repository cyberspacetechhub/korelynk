const AppSettings = require('../models/AppSettings')
const uploadService = require('../services/uploadService')
const APIResponse = require('../utils/APIResponse')

const getSettings = async (req, res) => {
  try {
    let settings = await AppSettings.findOne()
    
    if (!settings) {
      settings = await AppSettings.create({ isActive: true })
    } else {
      if (settings.darkIcon === undefined) {
        await AppSettings.updateOne({ _id: settings._id }, { $set: { darkIcon: '' } })
        settings = await AppSettings.findById(settings._id)
      }
      if (!settings.favicon && settings.logo) {
        await AppSettings.updateOne({ _id: settings._id }, { $set: { favicon: settings.logo } })
        settings = await AppSettings.findById(settings._id)
      }
    }
    
    APIResponse.success(res, settings, 'Settings retrieved successfully')
  } catch (error) {
    console.error('Error fetching settings:', error)
    APIResponse.error(res, 'Failed to fetch settings', 500, 'FETCH_ERROR')
  }
}

const updateSettings = async (req, res) => {
  try {
    let updateData = { ...req.body }
    
    if (updateData.socialLinks && typeof updateData.socialLinks === 'string') {
      updateData.socialLinks = JSON.parse(updateData.socialLinks)
    }
    if (updateData.seoSettings && typeof updateData.seoSettings === 'string') {
      updateData.seoSettings = JSON.parse(updateData.seoSettings)
    }
    
    if (req.files && req.files.logo) {
      updateData.logo = req.files.logo[0].path
    }
    if (req.files && req.files.favicon) {
      updateData.favicon = req.files.favicon[0].path
    }
    
    let settings = await AppSettings.findOne()
    if (!settings) {
      settings = await AppSettings.create({ isActive: true, ...updateData })
    } else {
      await AppSettings.updateOne({ _id: settings._id }, { $set: updateData }, { strict: false })
      settings = await AppSettings.findById(settings._id)
    }

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