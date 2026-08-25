import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Removes the PAC disclosure line from the story posts (per request).
 * Run: node scripts/strip-pac-stories.mjs
 */
const DIR = 'social-stories'
const files = readdirSync(DIR).filter((f) => /^\d.*\.html$/.test(f))
let n = 0
for (const file of files) {
  const p = path.join(DIR, file)
  let html = readFileSync(p, 'utf8')
  if (!/class="pac t"/.test(html)) continue
  html = html.replace(/\s*<div class="pac t">[\s\S]*?<\/div>/g, '')
  writeFileSync(p, html)
  n++
}
console.log(`Stripped PAC line from ${n} stories`)
