const Visitor = require('../models/Visitor')
const geoip = require('geoip-lite')
const UAParser = require('ua-parser-js')

class VisitorService {
  async trackVisitor(req) {
    const sessionId = req.headers['x-session-id'] || this.generateSessionId()
    const ipAddress = req.ip || req.connection.remoteAddress
    const userAgent = req.headers['user-agent']
    const referrer = req.headers.referer
    
    // Parse user agent
    const parser = new UAParser(userAgent)
    const device = parser.getDevice()
    const browser = parser.getBrowser()
    const os = parser.getOS()
    
    // Get location from IP
    const geo = geoip.lookup(ipAddress)
    
    // Check for existing visitor by IP within 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    let visitor = await Visitor.findOne({ 
      $or: [
        { sessionId },
        { ipAddress, createdAt: { $gte: twentyFourHoursAgo } }
      ]
    })
    
    if (!visitor) {
      visitor = new Visitor({
        sessionId,
        ipAddress,
        userAgent,
        location: geo ? {
          country: geo.country,
          city: geo.city,
          region: geo.region
        } : {},
        device: this.getDeviceType(device.type),
        browser: `${browser.name} ${browser.version}`,
        os: `${os.name} ${os.version}`,
        referrer
      })
    } else {
      // Update session ID for returning visitor
      visitor.sessionId = sessionId
    }
    
    visitor.lastActivity = new Date()
    visitor.isActive = true
    await visitor.save()
    
    return visitor
  }
  
  async updateVisitorPage(sessionId, page) {
    const visitor = await Visitor.findOne({ sessionId })
    if (visitor) {
      visitor.currentPage = page
      visitor.pagesVisited.push({
        page,
        timestamp: new Date()
      })
      visitor.lastActivity = new Date()
      await visitor.save()
    }
    return visitor
  }
  
  async markVisitorInactive(sessionId) {
    await Visitor.findOneAndUpdate(
      { sessionId },
      { isActive: false }
    )
  }
  
  async getActiveVisitors() {
    return await Visitor.find({
      isActive: true,
      lastActivity: { $gte: new Date(Date.now() - 30 * 60 * 1000) } // 30 minutes
    }).sort({ lastActivity: -1 })
  }
  
  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
  
  getDeviceType(type) {
    if (type === 'mobile') return 'mobile'
    if (type === 'tablet') return 'tablet'
    return 'desktop'
  }
}

module.exports = new VisitorService()