import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Adds a bold, varied footer colour band to each story (text-safe: it lives in
 * the empty lower third; the PAC line is recoloured to sit on it). Gives every
 * story a distinct large colour region so no two read as duplicates.
 *
 * Re-runnable: strips any previously-injected band/override first. Same-bg
 * stories are assigned distinct (colour x height) combos so they never collide.
 * Skips the two-tone split (already distinct).
 *
 * Run: node scripts/inject-story-footer.mjs
 */
const DIR = 'social-stories'
const MARK = 'footer-band'
const heights = [300, 400, 500, 600]
// hex literals (not CSS vars) so bands render regardless of each file's :root
const NAVY = '#0B2844', NAVY3 = '#0F3C66', RED = '#B62025', PAPER = '#F5F2EC', BONE = '#D4CCB7'
const PAC_LIGHT = 'rgba(245,242,236,.82)'
const lightOnBand = new Set([NAVY, RED, NAVY3])

// colour-major order so consecutive picks differ in colour first
const combos = (colors) => {
  const out = []
  for (const h of heights) for (const c of colors) out.push({ c, h })
  return out
}
const lightCombos = combos([NAVY, RED, NAVY3])
const darkCombos = combos([PAPER, RED, BONE])

const files = readdirSync(DIR).filter((f) => /^\d.*\.html$/.test(f)).sort()
let lightN = 0, darkN = 0, done = 0
for (const file of files) {
  const p = path.join(DIR, file)
  let html = readFileSync(p, 'utf8')
  // strip any previous injection so this is re-runnable
  html = html.replace(new RegExp(`\\s*<!-- ${MARK} -->.*?</span>`, 's'), '')
  html = html.replace(/\s*\.pac\{color:[^}]*!important[^}]*\}/g, '')
  if (file.includes('two-tone-split')) { writeFileSync(p, html); continue }

  const m = html.match(/\.story\s*\{[^}]*background:\s*([^;]+);/)
  if (!m) { writeFileSync(p, html); continue }
  const isDark = /navy/.test(m[1]) && !/paper/.test(m[1])
  const { c: color, h: height } = isDark
    ? darkCombos[darkN++ % darkCombos.length]
    : lightCombos[lightN++ % lightCombos.length]
  const pacColor = lightOnBand.has(color) ? PAC_LIGHT : NAVY

  const band = `<!-- ${MARK} --><span aria-hidden="true" style="position:absolute;left:0;right:0;bottom:0;height:${height}px;background:${color};z-index:0;pointer-events:none"></span>`
  html = html.replace(/(<div class="story"[^>]*>)/, `$1\n    ${band}`)
  html = html.replace('</style>', `  .pac{color:${pacColor} !important;position:relative;z-index:1}\n</style>`)
  writeFileSync(p, html)
  done++
}
console.log(`Footer band on ${done} stories (${lightN} light, ${darkN} dark)`)
