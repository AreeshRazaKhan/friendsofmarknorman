import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import path from 'node:path'

/**
 * Copies the generated 1080x1080 carousel slides (and shared assets) into
 * public/social-carousels/ so they are served at /social-carousels/<file>.html.
 * The generator embeds the fit-to-viewport scaler, so no injection is needed.
 *
 * Run after regenerating: node scripts/sync-social-carousels.mjs
 */
const SRC_DIR = 'social-carousels'
const DEST_DIR = path.join('public', 'social-carousels')
mkdirSync(DEST_DIR, { recursive: true })

for (const f of readdirSync(DEST_DIR).filter((f) => /\.html$/.test(f))) {
  rmSync(path.join(DEST_DIR, f), { force: true })
}

const files = readdirSync(SRC_DIR).filter((f) => /^c\d.*\.html$/.test(f))
for (const file of files) copyFileSync(path.join(SRC_DIR, file), path.join(DEST_DIR, file))

const ASSETS_SRC = path.join(SRC_DIR, 'assets')
if (existsSync(ASSETS_SRC)) cpSync(ASSETS_SRC, path.join(DEST_DIR, 'assets'), { recursive: true })

console.log(`Synced ${files.length} carousel slides to ${DEST_DIR}`)
