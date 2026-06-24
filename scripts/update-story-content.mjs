import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Replaces the lorem-ipsum text in the 20 story posts with real campaign
 * content from the "Socialism 101" issues guide. Each story maps to a topic.
 * No CTA copy is introduced. Run: node scripts/update-story-content.mjs
 */
const DIR = 'social-stories'

const MAP = {
  '01-editorial-navy': { eb: '[ socialism 101 ]', head: 'Why Mark opposes <em>democratic socialism</em>', body: 'Mark does not believe Oregon’s future should depend on larger government, higher taxes, and more centralized control.' },
  '02-editorial-paper': { eb: '[ a different path ]', head: 'Oregon needs <em>a different path</em>', body: 'A path built on opportunity, accountability, public safety, educational excellence, economic growth, and individual freedom.' },
  '03-civic-stripe': { eb: '[ public policy ]', head: 'Not the center of <em>everything</em>', body: 'Socialism shifts decisions away from families and communities toward agencies and centralized planning. Mark believes that is wrong for Oregon.' },
  '04-stat-row-paper': { eb: '[ by the numbers ]', head: 'Experience that <em>delivers</em>', body: 'A retired Navy veteran and longtime veterinarian, serving Oregon communities for three decades.', nums: [['+', '30'], ['', '9'], ['', '27']], descs: ['years of service', 'issue priorities', 'house district'] },
  '05-stat-row-navy': { eb: '[ thirty years of service ]', head: 'Service to <em>Oregon</em>', body: 'Practical leadership rooted in service, solutions, and accountability.', nums: [['', '9'], ['+', '30'], ['', '27']], descs: ['issue priorities', 'years serving', 'district 27'] },
  '06-star-constellation': { eb: '[ service · solutions ]', head: 'Service. Solutions. <em>Accountability.</em>', body: 'Mark believes government should serve people and be measured by results, not by how large it grows.' },
  '07-diagonal-wedge': { eb: '[ public safety ]', head: 'Compassion and safety <em>belong together</em>', body: 'Fully fund public safety, support strong training and community policing, and expand behavioral health partnerships.' },
  '08-wedge-inverse': { eb: '[ healthcare ]', head: 'Healthcare that’s <em>patient-centered</em>', body: 'Decisions should stay between patients and professionals, not centralized through expanding government control.' },
  '09-quote-paper': { quote: 'Oregonians should not have to choose between compassion and safety. <em>We need both.</em>', name: 'Mark Norman' },
  '10-quote-navy': { quote: 'Small businesses should be partners in economic growth, <em>not endless sources of revenue.</em>', name: 'Mark Norman' },
  '11-typographic-banner': { eb: '[ for oregon ]', head: 'A different <em>path.</em>' },
  '12-ballot-brief': { eb: '[ mark’s practical approach ]', head: 'A practical <em>approach</em>', items: ['Responsible spending and local flexibility.', 'Small-business growth and parent transparency.', 'Public safety with real accountability.'] },
  '13-tilted-stamp': { eb: '[ local issues ]', head: 'Oregon problems need <em>Oregon solutions</em>', stamp: 'Oregon HD-27', body: 'People do not need to agree on every national issue to work together on local problems.' },
  '14-two-tone-split': { eb: '[ two philosophies ]', head: 'Two philosophies <em>of government</em>', body: 'One depends on larger government and centralized control. Mark’s depends on opportunity, accountability, and practical leadership.' },
  '15-minimal-bone': { eb: '[ mark’s position ]', head: 'Mark’s position is <em>clear</em>', body: 'Mark trusts House District 27 voters to study the issues and compare the visions.' },
  '16-portrait-feature': { eb: '[ meet mark ]', head: 'A Navy veteran & <em>veterinarian</em>' },
  '17-red-rule-editorial': { eb: '[ education ]', head: 'Strong basics. <em>Parents in the loop.</em>', body: 'Teachers empowered to teach, parents respected as partners, and students prepared for adult life.' },
  '18-paper2-soft': { eb: '[ small business ]', head: 'Small businesses need <em>room to grow</em>', body: 'Treated as partners in economic growth, not endless sources of revenue.' },
  '19-halftone-feature': { eb: '[ veteran support ]', head: 'Veterans deserve <em>real support</em>', body: 'They fulfilled their commitment to this country. Government and society should fulfill their commitment to them.' },
  '20-banner-close': { eb: '[ transportation & energy ]', head: 'Reality, <em>not ideology.</em>', tag: 'Service · Solutions · Accountability' },
}

const replInner = (html, cls, val, tag = 'span') =>
  html.replace(new RegExp(`(<${tag} class="${cls}">)[\\s\\S]*?(</${tag}>)`), `$1${val}$2`)

const replNth = (html, cls, vals, tag = 'span') => {
  let n = 0
  return html.replace(new RegExp(`(<${tag} class="${cls}">)[\\s\\S]*?(</${tag}>)`, 'g'), (m, a, b) =>
    n < vals.length ? `${a}${vals[n++]}${b}` : m,
  )
}

const files = readdirSync(DIR).filter((f) => /^\d.*\.html$/.test(f))
let done = 0
for (const file of files) {
  const key = file.replace('.html', '')
  const c = MAP[key]
  if (!c) continue
  let html = readFileSync(path.join(DIR, file), 'utf8')
  if (c.eb) html = replInner(html, 'eyebrow t', c.eb)
  if (c.head) html = replInner(html, 'headline t', c.head, 'h1')
  if (c.body) html = replInner(html, 'body t', c.body, 'p')
  if (c.quote) html = replInner(html, 'quote t', c.quote, 'blockquote')
  if (c.name) html = replInner(html, 'name t', c.name)
  if (c.stamp) html = replInner(html, 'stamp t', c.stamp)
  if (c.tag) html = replInner(html, 'tag t', c.tag, 'div')
  if (c.items) html = replNth(html, 'tx t', c.items)
  if (c.nums) html = replNth(html, 'num t', c.nums.map((n) => `<span class="plus">${n[0]}</span>${n[1]}`), 'div')
  if (c.descs) html = replNth(html, 'desc t', c.descs, 'div')
  writeFileSync(path.join(DIR, file), html)
  done++
}
console.log(`Updated content in ${done} stories`)
