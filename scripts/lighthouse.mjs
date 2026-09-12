import { spawn } from 'node:child_process'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

const port = 4173
const server = spawn(process.execPath, ['./node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port)], { stdio: 'ignore' })
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

try {
  for (let i = 0; i < 30; i += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}`)
      if (response.ok) break
    } catch { /* waiting for preview server */ }
    await sleep(250)
  }
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'] })
  try {
    const result = await lighthouse(`http://127.0.0.1:${port}`, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    })
    const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)]))
    console.log('Lighthouse scores:', scores)
    const minimums = { performance: 90, accessibility: 95, 'best-practices': 95, seo: 90 }
    const failed = Object.entries(minimums).filter(([key, minimum]) => scores[key] < minimum)
    if (failed.length) throw new Error(`Lighthouse targets missed: ${failed.map(([key, minimum]) => `${key} ${scores[key]} < ${minimum}`).join(', ')}`)
  } finally {
    await chrome.kill()
  }
} finally {
  server.kill('SIGTERM')
}
