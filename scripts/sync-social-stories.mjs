import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import path from 'node:path'

/**
 * Copies the generated 1080x1920 story posts (and shared assets) into
 * public/social-stories/ so they are served at /social-stories/<file>.html.
 * The generator embeds the fit-to-viewport scaler, so no injection is needed.
 *
 * Run after regenerating: node scripts/sync-social-stories.mjs
 */
const SRC_DIR = 'social-stories'
const DEST_DIR = path.join('public', 'social-stories')
mkdirSync(DEST_DIR, { recursive: true })

const files = readdirSync(SRC_DIR).filter((f) => /^\d.*\.html$/.test(f))
for (const file of files) copyFileSync(path.join(SRC_DIR, file), path.join(DEST_DIR, file))

const ASSETS_SRC = path.join(SRC_DIR, 'assets')
if (existsSync(ASSETS_SRC)) cpSync(ASSETS_SRC, path.join(DEST_DIR, 'assets'), { recursive: true })

console.log(`Synced ${files.length} story posts to ${DEST_DIR}`)
