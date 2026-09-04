import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'

/**
 * Builds an Excel workbook of every published social asset URL.
 *
 * Carousels, static posts and stories publish as PNG; the feed posts still
 * publish as HTML. Metadata (deck label, headline, type) is read out of the
 * source HTML under the repo root — NOT out of public/, which now holds only
 * the exported PNGs. Writes the raw OOXML parts to a staging dir;
 * scripts/export-social-urls.ps1 zips them into the .xlsx (no spreadsheet
 * dependency in this repo).
 *
 * Run: node scripts/export-social-urls.mjs <stagingDir>
 */
const DOMAIN = 'https://markfororegon.com'

const SETS = [
  { label: 'Carousel', src: 'social-carousels', route: '/social-carousels', ext: '.png' },
  { label: 'Static Post', src: 'social-squares', route: '/social-squares', ext: '.png' },
  { label: 'Story', src: 'social-stories', route: '/social-stories', ext: '.png' },
  { label: 'Feed Post', src: 'social-posts', route: '/social-posts', ext: '.html' },
]

const stage = process.argv[2]
if (!stage) throw new Error('usage: node scripts/export-social-urls.mjs <stagingDir>')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const decode = (s) =>
  String(s)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const TYPE_LABELS = { cover: 'Cover', point: 'Point', closer: 'Closer' }

/** PNG dimensions straight out of the IHDR chunk. */
const pngSize = (file) => {
  const b = readFileSync(file)
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }
}

const headlineOf = (html) => {
  const h1 = html.match(/<h[12] class="[^"]*headline[^"]*"[^>]*>([\s\S]*?)<\/h[12]>/)
  if (h1) return decode(h1[1])
  const hero = html.match(/<div class="hero">([\s\S]*?)<\/div>\s*<div/)
  if (hero) return decode(hero[1])
  const any = html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/)
  return any ? decode(any[1]) : ''
}

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..')
const rows = []

for (const set of SETS) {
  const srcDir = path.join(repoRoot, set.src)
  const pubDir = path.join(repoRoot, 'public', set.src)
  const files = readdirSync(srcDir).filter((f) => f.endsWith('.html')).sort()

  for (const file of files) {
    const html = readFileSync(path.join(srcDir, file), 'utf8')
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '')
    const asset = file.replace(/\.html$/, set.ext)
    const assetPath = path.join(pubDir, asset)

    let ref = ''
    let name = title
    let slide = ''
    let type = ''

    const car = file.match(/^c(\d{2})-s(\d{2})-(\w+)\.html$/)
    if (car) {
      ref = `C${car[1]}`
      name = decode(title.split('·')[1]?.split('—')[0] ?? '')
      slide = Number(car[2])
      type = TYPE_LABELS[car[3]] ?? car[3]
    } else {
      const num = file.match(/^(\d+)-(.+)\.html$/)
      if (num) {
        ref = num[1]
        slide = Number(num[1])
        type = num[2].replace(/-/g, ' · ')
      }
    }

    let format = set.ext === '.html' ? 'HTML' : 'PNG'
    if (set.ext === '.png' && existsSync(assetPath)) {
      const d = pngSize(assetPath)
      if (d) format = `PNG ${d.w}×${d.h}`
    }

    rows.push({
      set: set.label,
      ref,
      name,
      slide,
      type,
      headline: headlineOf(html),
      format,
      file: asset,
      url: `${DOMAIN}${set.route}/${asset}`,
      missing: set.ext === '.png' && !existsSync(assetPath),
      bytes: existsSync(assetPath) ? statSync(assetPath).size : 0,
    })
  }
}

const missing = rows.filter((r) => r.missing)
if (missing.length) {
  console.warn(`WARNING: ${missing.length} published asset(s) not found:`)
  missing.forEach((r) => console.warn('  ' + r.file))
}

const HEADERS = ['Set', 'Ref', 'Title', 'No.', 'Type', 'Headline', 'Format', 'File Name', 'URL']
const COL_WIDTHS = [13, 8, 24, 6, 22, 58, 16, 26, 62]
const URL_COL = 9

const colRef = (n) => String.fromCharCode(64 + n)
const textCell = (col, row, value, style = 0) =>
  `<c r="${colRef(col)}${row}" t="inlineStr"${style ? ` s="${style}"` : ''}><is><t xml:space="preserve">${esc(value)}</t></is></c>`
const numCell = (col, row, value) => `<c r="${colRef(col)}${row}"><v>${value}</v></c>`

const sheetRows = [
  `<row r="1" ht="22" customHeight="1">${HEADERS.map((h, i) => textCell(i + 1, 1, h, 1)).join('')}</row>`,
  ...rows.map((r, i) => {
    const n = i + 2
    return (
      `<row r="${n}">` +
      textCell(1, n, r.set) +
      textCell(2, n, r.ref) +
      textCell(3, n, r.name) +
      (r.slide === '' ? textCell(4, n, '') : numCell(4, n, r.slide)) +
      textCell(5, n, r.type) +
      textCell(6, n, r.headline) +
      textCell(7, n, r.format) +
      textCell(8, n, r.file) +
      textCell(URL_COL, n, r.url, 2) +
      '</row>'
    )
  }),
]

const hyperlinks = rows
  .map((r, i) => `<hyperlink ref="${colRef(URL_COL)}${i + 2}" r:id="rId${i + 1}"/>`)
  .join('')

const sheetRels = rows
  .map(
    (r, i) =>
      `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${esc(r.url)}" TargetMode="External"/>`,
  )
  .join('')

const parts = {
  '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,

  '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,

  'xl/workbook.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Social Post URLs" sheetId="1" r:id="rId1"/></sheets></workbook>`,

  'xl/_rels/workbook.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,

  'xl/styles.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><u/><sz val="11"/><color rgb="FF0B2844"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0B2844"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs></styleSheet>`,

  'xl/worksheets/sheet1.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>${COL_WIDTHS.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols><sheetData>${sheetRows.join('')}</sheetData><autoFilter ref="A1:${colRef(HEADERS.length)}${rows.length + 1}"/><hyperlinks>${hyperlinks}</hyperlinks></worksheet>`,

  'xl/worksheets/_rels/sheet1.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheetRels}</Relationships>`,
}

for (const [name, body] of Object.entries(parts)) {
  const dest = path.join(stage, name)
  mkdirSync(path.dirname(dest), { recursive: true })
  writeFileSync(dest, body, 'utf8')
}

const csv = [
  HEADERS.join(','),
  ...rows.map((r) =>
    [r.set, r.ref, r.name, r.slide, r.type, r.headline, r.format, r.file, r.url]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(','),
  ),
].join('\r\n')
writeFileSync(path.join(stage, 'social-post-urls.csv'), csv, 'utf8')

const bySet = rows.reduce((a, r) => ({ ...a, [r.set]: (a[r.set] || 0) + 1 }), {})
console.log(`Staged ${rows.length} social asset URLs`, bySet)
