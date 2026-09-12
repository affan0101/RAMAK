import { spawn } from 'node:child_process'
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'

const port = 4173
const server = spawn(process.execPath, ['./node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port)], {
  stdio: ['ignore', 'pipe', 'pipe'],
})

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
async function waitForServer() {
  for (let i = 0; i < 30; i += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}`)
      if (response.ok) return
    } catch { /* waiting for preview server */ }
    await sleep(250)
  }
  throw new Error('Preview server did not start')
}

try {
  await waitForServer()
  const browser = await chromium.launch({ headless: true })
  const viewports = [
    { width: 320, height: 760 },
    { width: 375, height: 812 },
    { width: 430, height: 880 },
    { width: 768, height: 900 },
    { width: 1024, height: 900 },
    { width: 1280, height: 900 },
    { width: 1440, height: 1000 },
  ]

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport })
    const page = await context.newPage()
    const consoleErrors = []
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
    await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'networkidle' })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
    if (overflow) throw new Error(`Horizontal overflow at ${viewport.width}px`)
    if (consoleErrors.length) throw new Error(`Console errors at ${viewport.width}px: ${consoleErrors.join(' | ')}`)
    await context.close()
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Switch to Arabic' }).first().click()
  if (await page.locator('html').getAttribute('dir') !== 'rtl') throw new Error('Arabic RTL direction did not apply')
  const rtlOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
  if (rtlOverflow) throw new Error('Arabic layout has horizontal overflow')
  await page.reload()
  if (await page.locator('html').getAttribute('dir') !== 'rtl') throw new Error('Language preference did not persist')
  await page.getByRole('button', { name: 'التبديل إلى الإنجليزية' }).first().click()

  const anchors = await page.locator('nav a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')))
  for (const href of new Set(anchors)) {
    if (!href || href === '#') continue
    if (await page.locator(href).count() === 0) throw new Error(`Broken navigation target: ${href}`)
  }

  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.locator('form button[type="submit"]').click()
  if (await page.locator('.field-error').count() === 0) throw new Error('Empty form did not show validation errors')

  const mutations = []
  page.on('request', (request) => {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method())) mutations.push(`${request.method()} ${request.url()}`)
  })
  await page.fill('#fullName', 'Demo Client')
  await page.fill('#phone', '+971 50 123 4567')
  await page.fill('#email', 'demo@example.com')
  await page.selectOption('#service', { index: 1 })
  await page.selectOption('#propertyType', 'residential')
  await page.fill('#area', 'Abu Dhabi City')
  await page.selectOption('#preferredContact', 'phone')
  await page.fill('#message', 'Demo electrical inspection enquiry.')
  await page.locator('.consent input').check()
  await page.locator('form button[type="submit"]').click()
  await page.getByRole('heading', { name: 'Demo form completed' }).waitFor()
  if (mutations.length) throw new Error(`Form created network mutations: ${mutations.join(', ')}`)

  const axeResults = await new AxeBuilder({ page }).analyze()
  const serious = axeResults.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact))
  if (serious.length) throw new Error(`Serious accessibility violations: ${serious.map((item) => item.id).join(', ')}`)

  await context.close()
  await browser.close()
  console.log('Browser verification passed across 7 viewports, EN/AR, form flow, navigation, console, overflow, and serious axe checks.')
} finally {
  server.kill('SIGTERM')
}
