// Generates the print-ready QR codes for the /meet-mark QR funnel.
//
//   node scripts/generate-qr.mjs
//
// Outputs one PNG (1200px, print-safe) and one SVG (vector, for print
// vendors) per print material into public/images/qr/. Each code encodes
// /meet-mark?src={material} so the CRM can attribute every lead to the
// physical piece that drove the scan (see QR_SOURCES in
// src/constants/site.js and src/app/api/qr-funnel/route.js).
//
// QR styling: navy on white, error correction Q (25% damage tolerance —
// safe for print), quiet zone 4 modules. Do not drop below level Q or
// shrink the quiet zone; both hurt scan reliability on textured paper.

import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import QRCode from 'qrcode'

const BASE_URL = 'https://markfororegon.com/meet-mark'
const NAVY = '#0B2844'
const WHITE = '#FFFFFF'

// Keep in sync with QR_SOURCES in src/constants/site.js ('qr' is the
// generic bucket and gets the bare URL below instead of a src param).
const MATERIALS = ['banner', 'flyer', 'mailer', 'door-hanger', 'sign', 'newspaper', 'magazine']

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(repoRoot, 'public', 'images', 'qr')

const OPTS = {
  errorCorrectionLevel: 'Q',
  margin: 4,
  color: { dark: NAVY, light: WHITE },
}

const targets = [
  { name: 'meet-mark-generic', url: BASE_URL },
  ...MATERIALS.map((m) => ({ name: `meet-mark-${m}`, url: `${BASE_URL}?src=${m}` })),
]

await mkdir(outDir, { recursive: true })

for (const { name, url } of targets) {
  await QRCode.toFile(path.join(outDir, `${name}.png`), url, { ...OPTS, width: 1200 })
  await QRCode.toFile(path.join(outDir, `${name}.svg`), url, { ...OPTS, type: 'svg' })
  console.log(`✓ ${name}  →  ${url}`)
}

console.log(`\nDone. Files in public/images/qr/`)
