const { chromium } = require('playwright')

const VIEWPORT = { width: 1440, height: 900 }
const TIMEOUT   = 30_000   // 30s navigation timeout
const MAX_CONCURRENT = 2   // max parallel browser jobs

let activeJobs = 0

/**
 * Captures a screenshot of a URL and returns a Buffer (WebP).
 * @param {string} url  — validated, normalised URL
 * @returns {Promise<Buffer>}
 */
async function captureScreenshot(url) {
  if (activeJobs >= MAX_CONCURRENT) {
    throw new Error('Screenshot queue is full. Try again shortly.')
  }

  activeJobs++
  let browser = null

  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        // Block access to internal metadata endpoints
        '--host-rules=MAP metadata.google.internal 0.0.0.0, MAP 169.254.169.254 0.0.0.0',
      ],
    })

    const context = await browser.newContext({
      viewport: VIEWPORT,
      userAgent: 'Mozilla/5.0 (compatible; InnTechLabBot/1.0; +https://inntechlab.online)',
      // Block internal network requests at browser level
      extraHTTPHeaders: {},
    })

    // Block requests to private IPs at the network level
    await context.route('**/*', (route) => {
      const reqUrl = route.request().url()
      try {
        const { hostname } = new URL(reqUrl)
        const privatePattern = /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.)/
        if (privatePattern.test(hostname)) {
          return route.abort('blockedbyclient')
        }
      } catch { /* ignore parse errors */ }
      route.continue()
    })

    const page = await context.newPage()

    // Navigate with timeout
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUT,
    })

    // Wait a bit for fonts and images to settle
    await page.waitForTimeout(2000)

    // Try to wait for network idle (best effort)
    try {
      await page.waitForLoadState('networkidle', { timeout: 8000 })
    } catch {
      // Not critical — proceed with screenshot
    }

    const buffer = await page.screenshot({
      type: 'webp',
      quality: 85,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
    })

    await context.close()
    return buffer

  } finally {
    activeJobs--
    if (browser) {
      try { await browser.close() } catch { /* ignore */ }
    }
  }
}

module.exports = { captureScreenshot }
