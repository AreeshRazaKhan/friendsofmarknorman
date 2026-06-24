import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import { FONTS, TOKENS, PAL, pad, scaler, logoTag, ICONFX } from './lib/post-content.mjs'

/**
 * 10 Instagram carousels (5–7 slides each), every slide a standalone 1080x1080
 * HTML. A carousel is a cohesive SET: all slides in one deck share a template
 * so they read as a sequence (cover → numbered points → closer). Across the 10
 * decks the cover layout, motif, and accent rhythm vary so each deck is its own
 * look. Bookends (cover/closer) are navy; content slides are paper.
 *
 * No CTA, no PAC line, real logo on every slide. A segmented progress bar +
 * "NN / NN" counter signal the set without any swipe/arrow CTA.
 *
 * Output: social-carousels/c{NN}-s{MM}-{type}.html
 */
const OUT = 'social-carousels'
rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

// ---------------------------------------------------------------- backgrounds
const dots = (p) =>
  `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;background-image:radial-gradient(${p === 'navy' ? 'rgba(245,242,236,.05)' : 'rgba(11,40,68,.05)'} 1.4px,transparent 1.7px);background-size:15px 15px"></span>`
const stripeCorner = (p, poly) =>
  `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;clip-path:${poly};background-image:repeating-linear-gradient(45deg,rgba(182,32,37,${p === 'navy' ? '.16' : '.55'}) 0 2px,transparent 2px ${p === 'navy' ? 26 : 22}px)"></span>`
const stars = (p, list) =>
  list
    .map(
      (s) =>
        `<span aria-hidden="true" style="position:absolute;z-index:0;color:${p === 'navy' ? 'var(--red-3)' : 'var(--red)'};font-weight:700;${s}">★</span>`,
    )
    .join('')
const ruled = () =>
  `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;background-image:repeating-linear-gradient(transparent 0 95px,rgba(11,40,68,.06) 95px 96px)"></span>`
const wm = (p, txt, css) =>
  `<span aria-hidden="true" style="position:absolute;z-index:0;font-weight:700;line-height:.7;letter-spacing:-.05em;color:${p === 'navy' ? 'var(--paper)' : 'var(--navy)'};opacity:.05;${css}">${txt}</span>`

const MOTIF = {
  dots: (p) => dots(p),
  stripe: (p) => `${dots(p)}${stripeCorner(p, 'polygon(66% 0,100% 0,100% 42%)')}`,
  stars: (p) =>
    stars(p, [
      'top:140px;right:150px;font-size:42px',
      'top:250px;right:90px;font-size:24px',
      'bottom:220px;left:120px;font-size:30px;opacity:.7',
    ]),
  ruled: (p) => ruled(p),
}

// ---------------------------------------------------------------- chrome
// segmented progress + counter + deck tag, palette-aware. No swipe/arrow CTA.
const chrome = (p, n, total, label) => {
  const on = p === 'navy'
  const ink = on ? 'var(--paper-78)' : 'var(--stone)'
  const acc = on ? 'var(--red-3)' : 'var(--red)'
  const faint = on ? 'rgba(245,242,236,.22)' : 'rgba(11,40,68,.18)'
  const seg = Array.from(
    { length: total },
    (_, i) =>
      `<span style="height:5px;flex:1;border-radius:3px;background:${i === n - 1 ? acc : faint}"></span>`,
  ).join('')
  return `<div class="prog" aria-hidden="true" style="position:absolute;left:96px;right:96px;bottom:118px;z-index:6;display:flex;gap:10px">${seg}</div>
  <div class="counter t" style="position:absolute;left:96px;bottom:78px;z-index:6;font-family:var(--ff-mono);font-size:18px;font-weight:600;letter-spacing:.16em;color:${ink}">${pad(n)} <span style="color:${acc}">/</span> ${pad(total)}</div>
  <div class="decktag t" style="position:absolute;right:96px;bottom:78px;z-index:6;font-family:var(--ff-mono);font-size:14px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:${ink}">${label}</div>`
}

// ---------------------------------------------------------------- wrapper
const HEAD = (meta, css, inner) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><title>${meta}</title>
${FONTS}
<style>
${TOKENS}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#1a1a1a;font-family:var(--ff)}
.logo{position:absolute;left:84px;top:84px;z-index:6}.logo-slot{display:inline-flex}
.eyebrow{display:flex;align-items:center;gap:16px;font-family:var(--ff-mono);font-size:21px;font-weight:600;letter-spacing:.26em;text-transform:uppercase}
.eyebrow::before{content:"";width:46px;height:4px;flex-shrink:0}
.headline{font-weight:700;letter-spacing:-.03em;line-height:1}
.headline em,.title em{font-style:normal;font-weight:400;position:relative;display:inline-block}
.headline em::after,.title em::after{content:"";position:absolute;left:-6px;right:-6px;bottom:8px;height:15px;z-index:-1}
${css}
</style></head>
<body>
  <div class="slide" data-fonts="Cabin,JetBrains Mono">
    ${inner}
  </div>
${scaler('.slide')}
</body></html>
`

const base = (p) => `.slide{width:1080px;height:1080px;position:relative;overflow:hidden;background:${PAL[p].bg};color:${PAL[p].text}}
.eyebrow{color:${PAL[p].red}}.eyebrow::before{background:${PAL[p].red}}
.headline,.title{color:${PAL[p].text}}.headline em,.title em{color:${PAL[p].red}}
.headline em::after,.title em::after{background:${PAL[p].hl}}
.body{font-size:28px;line-height:1.5;color:${PAL[p].body}}`

// ---------------------------------------------------------------- COVERS (navy)
const COVER = {
  editorial: (d, total) => {
    const p = PAL.navy
    return HEAD(`C${pad(d.i)} · ${d.label} — 01/${pad(total)}`, `${base('navy')}
.slide{display:flex;flex-direction:column;justify-content:center;padding:96px}
.content{position:relative;z-index:3;max-width:800px}
.headline{font-size:90px;margin-top:26px}
.lead{font-size:31px;line-height:1.45;color:var(--paper-78);margin-top:30px;max-width:660px}`,
      `${MOTIF[d.motif]('navy')}${wm('navy', `C${pad(d.i)}`, 'right:-20px;bottom:-120px;font-size:560px')}
    ${logoTag(p.logo, 100)}
    <div class="content"><span class="eyebrow t">${d.kicker}</span><h1 class="headline t">${d.cover.h}</h1><p class="lead body t">${d.cover.lead}</p></div>
    ${chrome('navy', 1, total, d.label)}`)
  },
  centered: (d, total) => {
    const p = PAL.navy
    return HEAD(`C${pad(d.i)} · ${d.label} — 01/${pad(total)}`, `${base('navy')}
.slide{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px}
.frame{position:absolute;inset:54px;z-index:0;border:2px solid rgba(245,242,236,.3)}
.content{position:relative;z-index:3;max-width:780px}
.eyebrow{justify-content:center}.eyebrow::before{display:none}
.headline{font-size:84px;margin-top:24px}
.lead{font-size:30px;line-height:1.45;color:var(--paper-78);margin:28px auto 0;max-width:600px}`,
      `${MOTIF[d.motif]('navy')}<span class="frame" aria-hidden="true"></span>
    ${logoTag(p.logo, 96)}
    <div class="content"><span class="eyebrow t">${d.kicker}</span><h1 class="headline t">${d.cover.h}</h1><p class="lead body t">${d.cover.lead}</p></div>
    ${chrome('navy', 1, total, d.label)}`)
  },
  bigType: (d, total) => {
    const p = PAL.navy
    return HEAD(`C${pad(d.i)} · ${d.label} — 01/${pad(total)}`, `${base('navy')}
.slide{display:flex;flex-direction:column;justify-content:center;padding:96px}
.content{position:relative;z-index:3;max-width:840px}
.headline{font-size:118px;line-height:.94;text-transform:uppercase;margin-top:20px;word-break:break-word}
.lead{font-size:30px;line-height:1.45;color:var(--paper-78);margin-top:34px;max-width:620px}`,
      `${MOTIF[d.motif]('navy')}
    ${logoTag(p.logo, 100)}
    <div class="content"><span class="eyebrow t">${d.kicker}</span><h1 class="headline t">${d.cover.h}</h1><p class="lead body t">${d.cover.lead}</p></div>
    ${chrome('navy', 1, total, d.label)}`)
  },
}

// ---------------------------------------------------------------- POINTS (paper)
const POINT = {
  num: (d, pt, n, total, idx) => {
    const p = PAL.paper
    return HEAD(`C${pad(d.i)} · ${d.label} — ${pad(n)}/${pad(total)}`, `${base('paper')}
.slide{display:flex;flex-direction:column;justify-content:center;padding:96px}
.row{position:relative;z-index:3;display:flex;align-items:flex-start;gap:44px}
.num{font-weight:700;font-size:168px;line-height:.78;letter-spacing:-.05em;color:var(--red);flex-shrink:0}
.col{max-width:660px}
.kick{font-family:var(--ff-mono);font-size:18px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--stone)}
.title{font-weight:700;font-size:58px;line-height:1.02;margin-top:14px}
.body{margin-top:24px;max-width:640px}`,
      `${MOTIF[d.motif]('paper')}${wm('paper', pad(idx), 'right:-10px;bottom:-90px;font-size:460px')}
    ${logoTag(p.logo, 88)}
    <div class="row"><div class="num t">${pad(idx)}</div><div class="col"><div class="kick t">${d.label}</div><h2 class="title headline t">${pt.t}</h2><p class="body t">${pt.b}</p></div></div>
    ${chrome('paper', n, total, d.label)}`)
  },
  stack: (d, pt, n, total, idx) => {
    const p = PAL.paper
    return HEAD(`C${pad(d.i)} · ${d.label} — ${pad(n)}/${pad(total)}`, `${base('paper')}
.slide{display:flex;flex-direction:column;justify-content:center;padding:96px}
.content{position:relative;z-index:3;max-width:740px}
.kick{display:flex;align-items:center;gap:16px;font-family:var(--ff-mono);font-size:19px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--red)}
.kick .n{font-size:22px}
.title{font-weight:700;font-size:60px;line-height:1.02;margin-top:26px}
.body{margin-top:26px;max-width:680px}`,
      `${MOTIF[d.motif]('paper')}
    ${logoTag(p.logo, 88)}
    ${ICONFX.tile(pt.icon, 'right:110px;top:300px;width:200px;height:200px', 'paper')}
    <div class="content"><div class="kick t"><span class="n">${pad(idx)}</span> · ${d.label}</div><h2 class="title headline t">${pt.t}</h2><p class="body t">${pt.b}</p></div>
    ${chrome('paper', n, total, d.label)}`)
  },
}

// ---------------------------------------------------------------- CLOSER (navy)
const closer = (d, total) => {
  const p = PAL.navy
  return HEAD(`C${pad(d.i)} · ${d.label} — ${pad(total)}/${pad(total)}`, `${base('navy')}
.slide{display:flex;flex-direction:column;justify-content:center;padding:110px}
.content{position:relative;z-index:3;max-width:820px}
.headline{font-size:84px;margin-top:24px}
.tag{display:flex;align-items:center;gap:18px;margin-top:46px}
.tag .line{width:60px;height:3px;background:var(--red-3)}
.tag .name{font-family:var(--ff-mono);font-size:22px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--paper-78)}`,
    `${MOTIF[d.motif]('navy')}${stars('navy', ['bottom:150px;right:130px;font-size:36px', 'bottom:250px;right:220px;font-size:20px;opacity:.7'])}
    ${logoTag(p.logo, 108)}
    <div class="content"><span class="eyebrow t">${d.closer.eb}</span><h1 class="headline t">${d.closer.h}</h1><div class="tag t"><span class="line"></span><span class="name">Service · Solutions · Accountability</span></div></div>
    ${chrome('navy', total, total, d.label)}`)
}

// ---------------------------------------------------------------- decks
const decks = [
  {
    label: 'Socialism 101', kicker: '[ socialism 101 ]', coverFx: 'editorial', pointFx: 'num', motif: 'stripe',
    cover: { h: 'Why Mark opposes <em>democratic socialism</em>', lead: 'Oregon’s future should not depend on larger government, higher taxes, and more centralized control.' },
    points: [
      { t: 'What it really <em>means</em>', b: 'Democratic socialism shifts more decisions, money, and control away from families and toward government.', icon: 'capitol' },
      { t: 'The cost to <em>families</em>', b: 'More central control tends to mean higher taxes, fewer choices, and slower growth for working Oregonians.', icon: 'store' },
      { t: 'A different <em>foundation</em>', b: 'Mark’s vision is built on opportunity, accountability, and individual freedom, not a larger-government agenda.', icon: 'flag' },
      { t: 'Measured by <em>results</em>', b: 'Public programs should be judged by what they actually deliver, not by how large or expensive they grow.', icon: 'check' },
      { t: 'The choice for <em>HD-27</em>', b: 'This race is about two views of government, and which one will best serve Oregon families.', icon: 'scales' },
    ],
    closer: { eb: '[ the choice ]', h: 'Practical leadership, <em>not bigger government</em>' },
  },
  {
    label: 'Where Mark Stands', kicker: '[ where mark stands ]', coverFx: 'centered', pointFx: 'stack', motif: 'dots',
    cover: { h: 'Where Mark <em>stands</em>', lead: 'Nine priorities for House District 27, grounded in opportunity, accountability, and common sense.' },
    points: [
      { t: 'Public safety <em>that works</em>', b: 'Fully fund public safety, support strong training and community policing, and expand behavioral health partnerships.', icon: 'shield' },
      { t: 'Small business <em>growth</em>', b: 'Treat small businesses as partners in economic growth, not endless sources of revenue.', icon: 'store' },
      { t: 'Strong <em>schools</em>', b: 'Teachers empowered to teach, parents respected as partners, and students prepared for adult life.', icon: 'book' },
      { t: 'Patient-centered <em>healthcare</em>', b: 'Decisions should stay between patients and professionals, not be centralized through government control.', icon: 'heartplus' },
      { t: 'Reliable <em>energy</em>', b: 'An all-of-the-above strategy: hydroelectric, natural gas, renewables, and next-generation nuclear power.', icon: 'bolt' },
    ],
    closer: { eb: '[ for oregon ]', h: 'Service. Solutions. <em>Accountability.</em>' },
  },
  {
    label: 'Meet Mark', kicker: '[ meet mark ]', coverFx: 'editorial', pointFx: 'stack', motif: 'stars',
    cover: { h: 'A Navy veteran & <em>veterinarian</em>', lead: 'Thirty years of service to Oregon communities, and a practical approach to getting things done.' },
    points: [
      { t: 'Service to <em>country</em>', b: 'A retired U.S. Navy veteran who learned that steady leadership means listening first and showing up.', icon: 'star' },
      { t: 'Care for the <em>community</em>', b: 'A longtime veterinarian and small-business owner who met working Oregonians where they live and work.', icon: 'paw' },
      { t: 'Practical, <em>not partisan</em>', b: 'Mark leads with solutions, not slogans, and frames every issue around the family at the kitchen table.', icon: 'check' },
    ],
    closer: { eb: '[ meet mark ]', h: 'Experience you can <em>count on</em>' },
  },
  {
    label: 'Two Philosophies', kicker: '[ two philosophies ]', coverFx: 'bigType', pointFx: 'num', motif: 'stripe',
    cover: { h: 'Two paths <em>for Oregon.</em>', lead: 'This election is a choice between two very different views of government.' },
    points: [
      { t: 'One path: <em>more government</em>', b: 'Larger government, centralized control, and higher taxes as the answer to nearly every problem.', icon: 'capitol' },
      { t: 'Mark’s path: <em>opportunity</em>', b: 'Opportunity, accountability, strong families, and local communities making more of their own decisions.', icon: 'flag' },
      { t: 'The real <em>difference</em>', b: 'Not who cares more, but which approach actually delivers results for working Oregon families.', icon: 'scales' },
      { t: 'You <em>decide</em>', b: 'Mark trusts HD-27 voters to study the issues, compare the visions, and choose the better path.', icon: 'check' },
    ],
    closer: { eb: '[ the choice ]', h: 'Opportunity over <em>centralized control</em>' },
  },
  {
    label: 'Public Safety', kicker: '[ public safety ]', coverFx: 'editorial', pointFx: 'num', motif: 'dots',
    cover: { h: 'Compassion and safety <em>belong together</em>', lead: 'Oregonians should not have to choose between compassion and safety. We need both.' },
    points: [
      { t: 'Fully fund <em>public safety</em>', b: 'Give first responders the resources and staffing they need to keep neighborhoods safe.', icon: 'shield' },
      { t: 'Training & <em>community policing</em>', b: 'Support strong training and community policing that builds trust between officers and residents.', icon: 'check' },
      { t: 'Behavioral health <em>partnerships</em>', b: 'Expand behavioral health partnerships so the right responder meets the right situation.', icon: 'heartplus' },
    ],
    closer: { eb: '[ public safety ]', h: 'Safe streets, <em>and real support</em>' },
  },
  {
    label: 'Business & Families', kicker: '[ small business ]', coverFx: 'centered', pointFx: 'stack', motif: 'ruled',
    cover: { h: 'Room to grow for <em>working families</em>', lead: 'Lower costs, a better climate for small business, and a government that respects taxpayers.' },
    points: [
      { t: 'Partners, <em>not revenue</em>', b: 'Small businesses should be treated as partners in economic growth, not endless sources of revenue.', icon: 'store' },
      { t: 'Lower <em>costs</em>', b: 'Focus on lowering the everyday costs that squeeze working families across House District 27.', icon: 'check' },
      { t: 'Respect for <em>taxpayers</em>', b: 'Spend taxpayer dollars carefully and measure programs by the results they actually deliver.', icon: 'scales' },
      { t: 'A climate to <em>build</em>', b: 'A fair, predictable environment where Oregon entrepreneurs can invest, hire, and grow.', icon: 'flag' },
    ],
    closer: { eb: '[ working families ]', h: 'A fair chance for <em>every family</em>' },
  },
  {
    label: 'Education', kicker: '[ education ]', coverFx: 'editorial', pointFx: 'num', motif: 'stripe',
    cover: { h: 'Strong basics. <em>Parents in the loop.</em>', lead: 'Teachers empowered to teach, parents respected as partners, and students ready for adult life.' },
    points: [
      { t: 'Back to the <em>basics</em>', b: 'A focus on reading, writing, math, science, and civics, with discipline and critical thinking.', icon: 'book' },
      { t: 'Parents as <em>partners</em>', b: 'Respect parents as partners and keep them informed and involved in their children’s education.', icon: 'check' },
      { t: 'Safe <em>classrooms</em>', b: 'Safe, focused classrooms where teachers can teach and every student has room to learn.', icon: 'shield' },
    ],
    closer: { eb: '[ schools ]', h: 'Strong schools, <em>safe classrooms</em>' },
  },
  {
    label: 'Energy & Roads', kicker: '[ energy & infrastructure ]', coverFx: 'bigType', pointFx: 'num', motif: 'dots',
    cover: { h: 'Reality, <em>not ideology.</em>', lead: 'Invest in infrastructure people actually use and energy systems that reliably work.' },
    points: [
      { t: 'Energy that <em>works</em>', b: 'An all-of-the-above mix: hydroelectric, natural gas, renewables, and next-generation nuclear.', icon: 'bolt' },
      { t: 'Roads people <em>use</em>', b: 'Invest in the infrastructure Oregonians depend on every day, planned around real needs.', icon: 'pin' },
      { t: 'Plan for <em>reliability</em>', b: 'Require reliable energy planning so the lights stay on and costs stay predictable.', icon: 'server' },
    ],
    closer: { eb: '[ practical leadership ]', h: 'Built on reality, <em>not ideology</em>' },
  },
  {
    label: 'Healthcare & Vets', kicker: '[ healthcare & veterans ]', coverFx: 'centered', pointFx: 'stack', motif: 'stars',
    cover: { h: 'Patient-centered, <em>and earned</em>', lead: 'Healthcare decisions belong between patients and professionals, and veterans deserve real support.' },
    points: [
      { t: 'Patients <em>first</em>', b: 'Decisions should stay between patients and healthcare professionals, not centralized by government.', icon: 'heartplus' },
      { t: 'Real veteran <em>support</em>', b: 'Veterans fulfilled their commitment to this country, and support should fulfill the commitment to them.', icon: 'star' },
      { t: 'Accountable <em>care</em>', b: 'Programs should be accountable, effective, and measured by results, not by spending and size.', icon: 'check' },
      { t: 'Local <em>solutions</em>', b: 'People do not need to agree on every national issue to work together on local problems.', icon: 'pin' },
    ],
    closer: { eb: '[ veteran support ]', h: 'Veterans deserve <em>real support</em>' },
  },
  {
    label: 'The Choice', kicker: '[ house district 27 ]', coverFx: 'bigType', pointFx: 'num', motif: 'stripe',
    cover: { h: 'A different <em>path.</em>', lead: 'Practical leadership for House District 27, built on service, solutions, and accountability.' },
    points: [
      { t: '<em>Service</em>', b: 'Thirty years of service: a Navy veteran, a longtime veterinarian, and a small-business owner.', icon: 'star' },
      { t: '<em>Solutions</em>', b: 'Lead with solutions, not slogans, framed around the family at the kitchen table.', icon: 'check' },
      { t: '<em>Accountability</em>', b: 'Spend taxpayer dollars carefully and measure every program by the results it delivers.', icon: 'scales' },
      { t: 'Opportunity for <em>every family</em>', b: 'A fair chance at affordable healthcare, strong schools, and safe neighborhoods for every family.', icon: 'flag' },
      { t: 'It’s your <em>choice</em>', b: 'Two visions of government are on the ballot. Mark trusts HD-27 voters to choose the better path.', icon: 'capitol' },
    ],
    closer: { eb: '[ for oregon ]', h: 'Practical leadership <em>for Oregon.</em>' },
  },
]

// ---------------------------------------------------------------- generate
let slideCount = 0
decks.forEach((d, di) => {
  d.i = di + 1
  const total = d.points.length + 2
  const files = []
  files.push({ type: 'cover', html: COVER[d.coverFx](d, total) })
  d.points.forEach((pt, pi) => {
    files.push({ type: 'point', html: POINT[d.pointFx](d, pt, pi + 2, total, pi + 1) })
  })
  files.push({ type: 'closer', html: closer(d, total) })

  files.forEach((f, si) => {
    const name = `c${pad(d.i)}-s${pad(si + 1)}-${f.type}.html`
    writeFileSync(path.join(OUT, name), f.html)
    slideCount++
  })
})

console.log(`Generated ${slideCount} carousel slides across ${decks.length} carousels`)
