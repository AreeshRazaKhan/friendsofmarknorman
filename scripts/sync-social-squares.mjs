import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import path from 'node:path'

/**
 * Copies the generated 1080x1080 square posts (and their shared assets) into
 * public/social-squares/ so they are served statically at
 * /social-squares/<file>.html. The generator already embeds the fit-to-viewport
 * scaler, so no injection is needed here.
 *
 * Run after regenerating: node scripts/sync-social-squares.mjs
 */

const SRC_DIR = 'social-squares'
const DEST_DIR = path.join('public', 'social-squares')

mkdirSync(DEST_DIR, { recursive: true })

const files = readdirSync(SRC_DIR).filter((f) => /^\d.*\.html$/.test(f))
for (const file of files) {
  copyFileSync(path.join(SRC_DIR, file), path.join(DEST_DIR, file))
}

const ASSETS_SRC = path.join(SRC_DIR, 'assets')
if (existsSync(ASSETS_SRC)) {
  cpSync(ASSETS_SRC, path.join(DEST_DIR, 'assets'), { recursive: true })
}

console.log(`Synced ${files.length} square posts to ${DEST_DIR}`)
