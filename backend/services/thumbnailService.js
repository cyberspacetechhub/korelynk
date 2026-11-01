const cloudinary = require('../config/cloudinary')
const { captureScreenshot } = require('./screenshotService')
const { validateScreenshotUrl } = require('../utils/urlValidator')

/**
 * Generates a screenshot thumbnail for a project URL and uploads to Cloudinary.
 * @param {string} url
 * @param {string} projectId  — used as Cloudinary public_id
 * @returns {{ url: string, publicId: string }}
 */
async function generateThumbnail(url, projectId) {
  const validatedUrl = await validateScreenshotUrl(url)
  const buffer = await captureScreenshot(validatedUrl)

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'cyberspace/thumbnails',
        public_id: `project_${projectId}`,
        overwrite: true,
        resource_type: 'image',
        format: 'webp',
        transformation: [
          { width: 1440, height: 900, crop: 'fill', quality: 'auto:good' },
        ],
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    uploadStream.end(buffer)
  })

  return {
    url: result.secure_url,
    publicId: result.public_id,
  }
}

/**
 * Deletes a thumbnail from Cloudinary.
 * @param {string} publicId
 */
async function deleteThumbnail(publicId) {
  if (!publicId) return
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (err) {
    console.error('Failed to delete thumbnail from Cloudinary:', err.message)
  }
}

module.exports = { generateThumbnail, deleteThumbnail }
