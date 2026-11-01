const Project = require('../models/Project')
const { generateThumbnail } = require('./thumbnailService')

// Simple in-process FIFO queue
const queue = []
let processing = false

/**
 * Enqueue a thumbnail generation job.
 * @param {{ projectId: string, url: string }} job
 */
function enqueue(job) {
  queue.push(job)
  if (!processing) processNext()
}

async function processNext() {
  if (queue.length === 0) {
    processing = false
    return
  }

  processing = true
  const job = queue.shift()

  try {
    // Mark as generating
    await Project.findByIdAndUpdate(job.projectId, {
      'thumbnail.status': 'generating',
    })

    const { url, publicId } = await generateThumbnail(job.url, job.projectId)

    await Project.findByIdAndUpdate(job.projectId, {
      'thumbnail.url':         url,
      'thumbnail.publicId':    publicId,
      'thumbnail.status':      'ready',
      'thumbnail.generatedAt': new Date(),
      'thumbnail.error':       undefined,
      // Also update legacy image field for backward compatibility
      image: url,
    })

    console.log(`[thumbnail] ✓ Generated for project ${job.projectId}`)
  } catch (err) {
    console.error(`[thumbnail] ✗ Failed for project ${job.projectId}:`, err.message)

    await Project.findByIdAndUpdate(job.projectId, {
      'thumbnail.status': 'failed',
      'thumbnail.error':  err.message,
    }).catch(() => {})
  }

  // Process next job after a short delay to avoid hammering
  setTimeout(processNext, 500)
}

const pendingCount = () => queue.length

module.exports = { enqueue, pendingCount }
