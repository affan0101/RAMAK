import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { resolve, join } from 'node:path'

// Optional maintenance utility. The website already includes all optimized images.
// Usage: node scripts/prepare-images.mjs /path/to/approved-originals
// Originals should be named hero.png, residential.png, commercial.png, etc.
const source = process.argv[2]
if (!source) throw new Error('Pass a folder containing the nine approved PNG originals. No generation is needed to run the website.')
const names = ['hero', 'residential', 'commercial', 'ac', 'distribution', 'diagnosis', 'ups', 'maintenance', 'contact']
await mkdir('public/images', { recursive: true })
for (const name of names) {
  for (const width of [640, 1440]) {
    const destination = `public/images/${name}${width === 640 ? '-640' : ''}.webp`
    const info = await sharp(join(resolve(source), name + '.png')).resize({ width }).webp({ quality: 82, effort: 6 }).toFile(destination)
    console.log(destination, info.size)
  }
}
