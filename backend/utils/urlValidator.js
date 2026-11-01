const dns = require('dns').promises

// Private/reserved IP ranges to block
const BLOCKED_RANGES = [
  /^127\./,                          // loopback
  /^10\./,                           // RFC1918
  /^172\.(1[6-9]|2\d|3[01])\./,     // RFC1918
  /^192\.168\./,                     // RFC1918
  /^169\.254\./,                     // link-local
  /^::1$/,                           // IPv6 loopback
  /^fc00:/i,                         // IPv6 unique local
  /^fe80:/i,                         // IPv6 link-local
  /^0\./,                            // this network
  /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./,  // CGNAT
  /^198\.51\.100\./,                 // TEST-NET-2
  /^203\.0\.113\./,                  // TEST-NET-3
]

const BLOCKED_HOSTS = [
  'localhost',
  'metadata.google.internal',
  '169.254.169.254',  // AWS/GCP metadata
  '100.100.100.200',  // Alibaba metadata
]

/**
 * Validates a URL for screenshot capture.
 * Throws if the URL is invalid, uses a blocked protocol, or resolves to a private IP.
 * @param {string} rawUrl
 * @returns {Promise<string>} normalised URL
 */
async function validateScreenshotUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') {
    throw new Error('URL is required')
  }

  let parsed
  try {
    parsed = new URL(rawUrl.trim())
  } catch {
    throw new Error('Invalid URL format')
  }

  // Only allow http and https
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only HTTP and HTTPS URLs are allowed')
  }

  const hostname = parsed.hostname.toLowerCase()

  // Block known bad hostnames
  if (BLOCKED_HOSTS.includes(hostname)) {
    throw new Error('URL points to a blocked host')
  }

  // Block numeric IPs that fall in private ranges
  const ipv4Pattern = /^\d{1,3}(\.\d{1,3}){3}$/
  if (ipv4Pattern.test(hostname)) {
    if (BLOCKED_RANGES.some(r => r.test(hostname))) {
      throw new Error('URL resolves to a private or reserved IP address')
    }
  }

  // DNS resolve and check the resolved IP
  try {
    const addresses = await dns.lookup(hostname, { all: true })
    for (const { address } of addresses) {
      if (BLOCKED_RANGES.some(r => r.test(address))) {
        throw new Error('URL resolves to a private or reserved IP address')
      }
    }
  } catch (err) {
    if (err.message.includes('private') || err.message.includes('reserved')) throw err
    // DNS failure — let Playwright handle it (will fail gracefully)
  }

  return parsed.href
}

module.exports = { validateScreenshotUrl }
