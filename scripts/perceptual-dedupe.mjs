import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

/**
 * Perceptual near-duplicate detector for the rendered post screenshots.
 *
 * Decodes each PNG, downsamples to a 16x16 grid of mean RGB colours, and scores
 * each pair by how many of the 256 cells differ in colour (Euclidean RGB beyond
 * COLOR_TOL). This is colour-aware, so a navy panel and a red panel read as
 * different (a grayscale hash would not). Lower score = more visually similar.
 * Fails (exit 1) if any pair differs in fewer than THRESHOLD cells.
 *
 * Usage: node scripts/perceptual-dedupe.mjs <screenshots-dir> [threshold]
 */

const dir = process.argv[2]
const THRESHOLD = Number(process.argv[3] ?? 14)
const COLOR_TOL = 44 // per-cell RGB distance to count a cell as "different"
if (!dir) {
  console.error('usage: node scripts/perceptual-dedupe.mjs <dir> [threshold]')
  process.exit(2)
}

const decodePNG = (buf) => {
  let off = 8
  let w = 0, h = 0, colorType = 0
  const idat = []
  while (off < buf.length) {
    const len = buf.readUInt32BE(off)
    const type = buf.toString('ascii', off + 4, off + 8)
    const data = buf.subarray(off + 8, off + 8 + len)
    if (type === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4); colorType = data[9]
    } else if (type === 'IDAT') {
      idat.push(data)
    } else if (type === 'IEND') break
    off += 12 + len
  }
  const raw = zlib.inflateSync(Buffer.concat(idat))
  const ch = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 0 ? 1 : 2
  const stride = w * ch
  const out = Buffer.alloc(h * stride)
  let pos = 0
  for (let y = 0; y < h; y++) {
    const f = raw[pos++]
    const o = y * stride
    for (let x = 0; x < stride; x++) {
      const a = x >= ch ? out[o + x - ch] : 0
      const b = y > 0 ? out[o - stride + x] : 0
      const c = y > 0 && x >= ch ? out[o - stride + x - ch] : 0
      let v = raw[pos++]
      if (f === 1) v = (v + a) & 255
      else if (f === 2) v = (v + b) & 255
      else if (f === 3) v = (v + ((a + b) >> 1)) & 255
      else if (f === 4) {
        const p = a + b - c
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c)
        v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255
      }
      out[o + x] = v
    }
  }
  return { w, h, ch, data: out }
}

const cellColors = (img) => {
  const N = 16
  const { w, h, ch, data } = img
  const cells = new Array(N * N)
  for (let by = 0; by < N; by++) {
    for (let bx = 0; bx < N; bx++) {
      const x0 = Math.floor((bx * w) / N), x1 = Math.floor(((bx + 1) * w) / N)
      const y0 = Math.floor((by * h) / N), y1 = Math.floor(((by + 1) * h) / N)
      let r = 0, g = 0, b = 0, cnt = 0
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * w + x) * ch
          r += data[i]; g += data[i + 1]; b += data[i + 2]; cnt++
        }
      }
      cells[by * N + bx] = [r / cnt, g / cnt, b / cnt]
    }
  }
  return cells
}

const cellDist = (a, b) => {
  let n = 0
  for (let i = 0; i < a.length; i++) {
    const dr = a[i][0] - b[i][0], dg = a[i][1] - b[i][1], db = a[i][2] - b[i][2]
    if (Math.sqrt(dr * dr + dg * dg + db * db) > COLOR_TOL) n++
  }
  return n
}

const files = readdirSync(dir).filter((f) => f.endsWith('.png')).sort()
const hashes = files.map((f) => ({ f, h: cellColors(decodePNG(readFileSync(path.join(dir, f)))) }))

const pairs = []
for (let i = 0; i < hashes.length; i++) {
  for (let j = i + 1; j < hashes.length; j++) {
    pairs.push({ a: hashes[i].f, b: hashes[j].f, d: cellDist(hashes[i].h, hashes[j].h) })
  }
}
pairs.sort((x, y) => x.d - y.d)

console.log(`\n${files.length} images · threshold ${THRESHOLD} differing cells (of 256)`)
console.log('closest 12 pairs:')
for (const p of pairs.slice(0, 12)) {
  const flag = p.d < THRESHOLD ? '  <-- TOO SIMILAR' : ''
  console.log(`  ${String(p.d).padStart(3)}  ${p.a}  ~  ${p.b}${flag}`)
}
const bad = pairs.filter((p) => p.d < THRESHOLD)
console.log(`\n${bad.length} pair(s) below threshold`)
process.exit(bad.length ? 1 : 0)
