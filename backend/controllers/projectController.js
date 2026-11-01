const projectService = require('../services/projectService')
const uploadService = require('../services/uploadService')
const APIResponse = require('../utils/APIResponse')
const { enqueue } = require('../services/thumbnailWorker')
const { deleteThumbnail } = require('../services/thumbnailService')

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const { category, featured } = req.query
    let filter = {}
    
    if (category && category !== 'all') {
      filter.category = category
    }
    
    if (featured === 'true') {
      filter.featured = true
    }
    
    const projects = await projectService.getAllProjects(filter)
    APIResponse.success(res, projects, 'Projects retrieved successfully')
  } catch (error) {
    console.error('Error fetching projects:', error)
    APIResponse.error(res, 'Failed to fetch projects', 500, 'FETCH_ERROR')
  }
}

// Get single project
const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id)
    if (!project) {
      return APIResponse.error(res, 'Project not found', 404, 'PROJECT_NOT_FOUND')
    }
    APIResponse.success(res, project, 'Project retrieved successfully')
  } catch (error) {
    console.error('Error fetching project:', error)
    APIResponse.error(res, 'Failed to fetch project', 500, 'FETCH_ERROR')
  }
}

// Create project
const createProject = async (req, res) => {
  try {
    let projectData = req.body
    
    // Handle image upload
    if (req.file) {
      projectData.image = req.file.path
    }
    
    const project = await projectService.createProject(projectData)

    // Auto-generate thumbnail if liveUrl provided and no custom image uploaded
    if (project.liveUrl && !req.file) {
      enqueue({ projectId: project._id.toString(), url: project.liveUrl })
    }

    APIResponse.success(res, project, 'Project created successfully')
  } catch (error) {
    console.error('Error creating project:', error)
    APIResponse.error(res, 'Failed to create project', 500, 'CREATE_ERROR')
  }
}

// Update project
const updateProject = async (req, res) => {
  try {
    let updateData = req.body
    
    // Handle image upload
    if (req.file) {
      const existingProject = await projectService.getProjectById(req.params.id)
      
      // Delete old image if exists
      if (existingProject && existingProject.image) {
        const publicId = uploadService.extractPublicId(existingProject.image)
        try {
          await uploadService.deleteImage(publicId)
        } catch (error) {
          console.log('Failed to delete old image:', error.message)
        }
      }
      
      updateData.image = req.file.path
      // Mark thumbnail as custom when manually uploading
      updateData['thumbnail.type'] = 'custom'
      updateData['thumbnail.url'] = req.file.path
      updateData['thumbnail.status'] = 'ready'
    }
    
    const project = await projectService.updateProject(req.params.id, updateData)
    
    if (!project) {
      return APIResponse.error(res, 'Project not found', 404, 'PROJECT_NOT_FOUND')
    }

    // Re-generate thumbnail if liveUrl changed and no file uploaded
    if (!req.file && updateData.liveUrl && updateData.liveUrl !== project.liveUrl) {
      enqueue({ projectId: project._id.toString(), url: updateData.liveUrl })
    }
    
    APIResponse.success(res, project, 'Project updated successfully')
  } catch (error) {
    console.error('Error updating project:', error)
    APIResponse.error(res, 'Failed to update project', 500, 'UPDATE_ERROR')
  }
}

// Delete project
const deleteProject = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id)
    
    if (!project) {
      return APIResponse.error(res, 'Project not found', 404, 'PROJECT_NOT_FOUND')
    }
    
    // Delete images from Cloudinary
    if (project.image) {
      const publicId = uploadService.extractPublicId(project.image)
      await uploadService.deleteImage(publicId).catch(() => {})
    }
    if (project.thumbnail?.publicId) {
      await deleteThumbnail(project.thumbnail.publicId)
    }
    
    await projectService.deleteProject(req.params.id)
    APIResponse.success(res, null, 'Project deleted successfully')
  } catch (error) {
    console.error('Error deleting project:', error)
    APIResponse.error(res, 'Failed to delete project', 500, 'DELETE_ERROR')
  }
}

// Regenerate thumbnail for a project
const regenerateThumbnail = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id)
    if (!project) {
      return APIResponse.error(res, 'Project not found', 404, 'PROJECT_NOT_FOUND')
    }
    if (!project.liveUrl) {
      return APIResponse.error(res, 'Project has no liveUrl to screenshot', 400, 'NO_LIVE_URL')
    }

    await projectService.updateProject(req.params.id, { 'thumbnail.status': 'pending' })
    enqueue({ projectId: project._id.toString(), url: project.liveUrl })

    APIResponse.success(res, { status: 'pending' }, 'Thumbnail regeneration queued')
  } catch (error) {
    console.error('Error regenerating thumbnail:', error)
    APIResponse.error(res, 'Failed to queue thumbnail regeneration', 500, 'REGEN_ERROR')
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  regenerateThumbnail,
}