require('dotenv').config()
require('./config/cloudinary')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const APIResponse = require('./utils/APIResponse')

const { logger } = require('./middleware/logEvents')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
const connectDb = require('./config/dbConn')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3700
const corsOptions = require('./config/corsOptions')

//connect to mongoDB
connectDb()

//custom middleware logger
app.use(logger)

//verify certificate of origin headers
//fetch cookies credentials requirements
app.use(credentials)

//cors
app.use(cors(corsOptions))

// Handle preflight requests
app.options('*', cors(corsOptions))


//handle ur encoding data
app.use(express.urlencoded({ extended: false }))

//built in middleware
app.use(express.json({ limit: '10mb' }))

//serve static files
app.use(cookieParser())

//serve static files from public directory
app.use(express.static(path.join(__dirname, '/public')))

// Health check endpoint
app.get('/health', (req, res) => {
    APIResponse.success(res, {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    }, 'Server is healthy');
});

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/newsletter', require('./routes/newsletter'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/services', require('./routes/services'))
app.use('/api/testimonials', require('./routes/testimonials'))
app.use('/api/feedback', require('./routes/feedback'))
app.use('/api/team', require('./routes/team'))
app.use('/api/blog', require('./routes/blog'))
app.use('/api/categories', require('./routes/category'))
app.use('/api/code-samples', require('./routes/codeSample'))
app.use('/api/search', require('./routes/search'))
app.use('/api/courses', require('./routes/courses'))
app.use('/api/enrollments', require('./routes/enrollments'))
app.use('/api/students', require('./routes/students'))
app.use('/api/instructors', require('./routes/instructors'))
app.use('/api/classes', require('./routes/classes'))
app.use('/api/assignments', require('./routes/assignments'))
app.use('/api/payment-account', require('./routes/paymentAccount'))
app.use('/api/admin/management', require('./routes/adminManagement'))

// SEO routes (no /api prefix)
const sitemapController = require('./controllers/sitemapController')
const rssController = require('./controllers/rssController')
app.get('/sitemap.xml', sitemapController.generateSitemap)
app.get('/rss.xml', rssController.generateRSSFeed)

// Admin routes (protected)
app.use('/api/admin', require('./routes/admin'))
app.use('/api/analytics', require('./routes/analytics'))
app.use('/api/notifications', require('./routes/notifications'))

// Handle 404 for undefined routes
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('json')) {
    APIResponse.error(res, '404 - Route not found', 404, 'ROUTE_NOT_FOUND');
  } else {
    res.type('txt').send('404 - Route not found');
  }
});

// Global error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`KoreLynk Tech server running on port ${PORT}`)
})

// MongoDB connection events
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})