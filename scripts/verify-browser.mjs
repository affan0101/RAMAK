import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'

const base = 'http://127.0.0.1:4173'
const server = spawn(process.execPath, ['./node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'inherit' })
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const output = process.env.RAMAK_TEST_OUTPUT || 'test-results'
let browser

async function scrollPage(page) {
  await page.evaluate(async () => {
    const root = document.documentElement
    const previous = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    for (let y = 0; y < root.scrollHeight; y += innerHeight * .75) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 35))
    }
    root.style.scrollBehavior = previous
  })
  await page.waitForTimeout(500)
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => img.decode().catch(() => {}))))
}
async function noOverflow(page, label) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
  assert.equal(overflow, false, 'Horizontal overflow: ' + label)
}
async function audit(page, label) {
  const result = await new AxeBuilder({ page }).analyze()
  const serious = result.violations.filter((v) => ['serious', 'critical'].includes(v.impact))
  if (serious.length) console.error(JSON.stringify(serious.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => ({ target: n.target, failure: n.failureSummary })) })), null, 2))
  assert.equal(serious.length, 0, 'Accessibility violations: ' + label)
}
try {
  await mkdir(output, { recursive: true })
  let ready = false
  for (let i = 0; i < 40; i++) {
    try { if ((await fetch(base)).ok) { ready = true; break } } catch { /* booting */ }
    await delay(250)
  }
  assert.ok(ready, 'Preview server did not start')
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox', '--disable-dev-shm-usage'] })
  for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
    for (const language of ['en', 'ar']) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
      await context.addInitScript((lang) => localStorage.setItem('ramak-language', lang), language)
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
      await page.goto(base, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      assert.equal(await page.locator('html').getAttribute('dir'), language === 'ar' ? 'rtl' : 'ltr')
      await scrollPage(page)
      await noOverflow(page, language + ' ' + width)
      const broken = await page.locator('img').evaluateAll((imgs) => imgs.filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.src))
      assert.deepEqual(broken, [], 'Broken images')
      if (width >= 768) {
        const contentWidth = await page.locator('.hero-layout').evaluate((node) => node.getBoundingClientRect().width)
        assert.ok(Math.abs(contentWidth - Math.min(width * .8, 1360)) < 1, 'Content should use shared gutters with a 1360px cap')
      }
      if (width < 1280) {
        const trigger = page.locator('.menu-trigger')
        await trigger.click()
        await page.locator('.mobile-menu').waitFor()
        await noOverflow(page, 'open mobile menu')
        assert.ok(await page.locator('dialog').evaluate((node) => node.contains(document.activeElement)), 'Menu focus was not captured')
        await page.keyboard.press('Escape')
        assert.equal(await page.locator('dialog').count(), 0)
        assert.ok(await trigger.evaluate((node) => node === document.activeElement), 'Menu focus was not restored')
        await trigger.click()
        await page.locator('.mobile-menu nav a[href="#contact"]').click()
        assert.equal(await page.locator('dialog').count(), 0)
      }
      await page.locator('.service-card .text-button').first().click()
      await page.locator('.service-modal').waitFor()
      await noOverflow(page, 'service modal')
      assert.ok(await page.locator('dialog').evaluate((node) => node.contains(document.activeElement)))
      await page.keyboard.press('Shift+Tab')
      assert.ok(await page.locator('dialog').evaluate((node) => node.contains(document.activeElement)), 'Focus escaped dialog')
      await page.keyboard.press('Escape')
      const faq = page.locator('.faq-list details').first()
      await faq.locator('summary').click()
      assert.equal(await faq.getAttribute('open'), '')
      await faq.locator('summary').click()
      if ([375, 1440].includes(width)) {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
        await page.waitForTimeout(150)
        await page.screenshot({ path: output + '/' + language + '-' + width + '.png', fullPage: true })
        await audit(page, language + ' ' + width)
      }
      assert.deepEqual(errors, [], 'Browser console/runtime errors')
      await context.close()
      console.log('PASS', language, width + 'px', 'images / capped grid / overflow / modal / menu')
    }
  }
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await context.newPage()
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Switch to Arabic' }).first().click()
  await page.reload()
  assert.equal(await page.locator('html').getAttribute('lang'), 'ar')
  await page.getByRole('button', { name: 'التبديل إلى الإنجليزية' }).first().click()
  const links = await page.locator('a[href^="#"]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href')))
  for (const href of new Set(links)) assert.ok(await page.locator(href).count(), 'Missing target ' + href)
  const submit = page.locator('form button[type="submit"]')
  await submit.click()
  assert.ok(await page.locator('.field-error').count() >= 7)
  await page.waitForFunction(() => document.activeElement?.id === 'fullName')
  assert.equal(await page.locator('#fullName').evaluate((node) => node === document.activeElement), true)
  await page.fill('#fullName', 'Demo Client')
  await page.fill('#phone', '+971 50 123 4567')
  await page.selectOption('#service', { index: 1 })
  await page.selectOption('#propertyType', 'residential')
  await page.fill('#area', 'Abu Dhabi')
  await page.selectOption('#preferredContact', 'email')
  await page.fill('#message', 'Demo installation enquiry.')
  await page.locator('#consent').check()
  await submit.click()
  assert.ok(await page.locator('#email-error').count(), 'Email preference must require an email')
  await page.fill('#email', 'client@example.com')
  await scrollPage(page)
  await submit.scrollIntoViewIfNeeded()
  await page.waitForTimeout(700)
  const requests = []
  const trackRequest = (request) => requests.push(request.url())
  page.on('request', trackRequest)
  await submit.click()
  await page.getByRole('heading', { name: 'Demo form completed' }).waitFor()
  await page.waitForTimeout(250)
  page.off('request', trackRequest)
  assert.deepEqual(requests, [], 'Static submit must produce ZERO network requests')
  assert.equal(await page.inputValue('#fullName'), 'Demo Client', 'Form data should remain until confirmation closes')
  assert.equal(await submit.isDisabled(), true)
  await audit(page, 'form confirmation')
  await page.getByRole('button', { name: 'Close confirmation' }).click()
  assert.equal(await page.inputValue('#fullName'), '')
  assert.equal(await submit.isEnabled(), true)
  assert.equal(await page.locator('a[href^="tel:"],a[href^="mailto:"],a[href*="wa.me"]').count(), 0, 'Demo contacts must not launch real apps')
  await page.locator('.contact-info-content > button').first().click()
  await page.getByRole('heading', { name: 'Demo contact details' }).waitFor()
  await page.keyboard.press('Escape')
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(1800)
  await page.screenshot({ path: output + '/desktop-motion.png' })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const animations = await page.locator('.hero-enter').first().evaluate((node) => getComputedStyle(node).animationName)
  assert.equal(animations, 'none')
  assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/)
  await context.close()
  console.log('PASS language persistence, navigation, validation, focus, static form (zero requests), demo contacts, reduced motion and noindex.')
} finally {
  if (browser) await browser.close()
  server.kill('SIGTERM')
}
