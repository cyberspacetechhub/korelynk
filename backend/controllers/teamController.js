const teamService = require('../services/teamService')
const uploadService = require('../services/uploadService')
const APIResponse = require('../utils/APIResponse')

// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await teamService.getAllTeamMembers()
    APIResponse.success(res, teamMembers, 'Team members retrieved successfully')
  } catch (error) {
    console.error('Error fetching team members:', error)
    APIResponse.error(res, 'Failed to fetch team members', 500, 'FETCH_ERROR')
  }
}

// Create team member
const createTeamMember = async (req, res) => {
  try {
    let teamData = req.body
    
    // Handle avatar upload
    if (req.file) {
      teamData.avatar = req.file.path
    }
    
    const teamMember = await teamService.createTeamMember(teamData)
    
    APIResponse.success(res, teamMember, 'Team member created successfully')
  } catch (error) {
    console.error('Error creating team member:', error)
    APIResponse.error(res, 'Failed to create team member', 500, 'CREATE_ERROR')
  }
}

// Update team member
const updateTeamMember = async (req, res) => {
  try {
    let updateData = req.body
    
    // Handle avatar upload
    if (req.file) {
      const existingMember = await Team.findById(req.params.id)
      
      // Delete old avatar if exists
      if (existingMember && existingMember.avatar) {
        const publicId = uploadService.extractPublicId(existingMember.avatar)
        await uploadService.deleteImage(publicId)
      }
      
      updateData.avatar = req.file.path
    }
    
    const teamMember = await teamService.updateTeamMember(req.params.id, updateData)
    
    if (!teamMember) {
      return APIResponse.error(res, 'Team member not found', 404, 'MEMBER_NOT_FOUND')
    }
    
    APIResponse.success(res, teamMember, 'Team member updated successfully')
  } catch (error) {
    console.error('Error updating team member:', error)
    APIResponse.error(res, 'Failed to update team member', 500, 'UPDATE_ERROR')
  }
}

// Delete team member
const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await teamService.getTeamMemberById(req.params.id)
    
    if (!teamMember) {
      return APIResponse.error(res, 'Team member not found', 404, 'MEMBER_NOT_FOUND')
    }
    
    // Delete avatar if exists
    if (teamMember.avatar) {
      const publicId = uploadService.extractPublicId(teamMember.avatar)
      await uploadService.deleteImage(publicId)
    }
    
    await teamService.deleteTeamMember(req.params.id)
    APIResponse.success(res, null, 'Team member deleted successfully')
  } catch (error) {
    console.error('Error deleting team member:', error)
    APIResponse.error(res, 'Failed to delete team member', 500, 'DELETE_ERROR')
  }
}

module.exports = {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
}