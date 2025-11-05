const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cyberspace',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'ico', 'svg'],
    resource_type: 'auto'
  }
})

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

class UploadService {
  getUploadMiddleware() {
    return upload.single('image')
  }

  getFileUploadMiddleware() {
    return upload.single('file')
  }

  async deleteImage(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId)
      return result
    } catch (error) {
      throw new Error('Failed to delete image')
    }
  }

  extractPublicId(imageUrl) {
    if (!imageUrl) return null
    const parts = imageUrl.split('/')
    const filename = parts[parts.length - 1]
    return filename.split('.')[0]
  }

  get storage() {
    return storage
  }
}

module.exports = new UploadService()