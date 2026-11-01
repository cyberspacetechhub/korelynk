/**
 * Migration: Queue thumbnail generation for existing projects
 * Run: node scripts/migrateThumbnails.js
 */
require('dotenv').config()
const mongoose = require('mongoose')
const Project = require('../models/Project')
const { enqueue, pendingCount } = require('../services/thumbnailWorker')

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

async function run() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to MongoDB')

  const projects = await Project.find({
    liveUrl: { $exists: true, $ne: '' },
    $or: [
      { 'thumbnail.status': { $exists: false } },
      { 'thumbnail.status': 'pending' },
      { 'thumbnail.status': 'failed' },
    ],
  }).select('_id liveUrl')

  console.log(`Found ${projects.length} project(s) to process`)

  for (const project of projects) {
    console.log(`Queuing: ${project._id} — ${project.liveUrl}`)
    enqueue({ projectId: project._id.toString(), url: project.liveUrl })
  }

  console.log('Waiting for queue to drain...')
  while (pendingCount() > 0) {
    await wait(2000)
    console.log(`Queue remaining: ${pendingCount()}`)
  }

  await wait(5000) // let last job finish writing to DB
  console.log('Done.')
  await mongoose.disconnect()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
