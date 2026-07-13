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
/* emphasis is red color only — no highlight bar under/after the word */
.headline em::after,.title em::after,.quote em::after{display:none}
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
// Content sourced from the "CAROUSEL POSTS" section of the SM copy doc (image
// text only; captions/hashtags omitted). Where a source slide is a single term
// or bare headline (decks 2, 3, 5, 9), a one-line supporting body / cover lead is
// authored so the layouts don't render empty. coverFx/pointFx/motif are kept from
// the prior decks to preserve each deck's distinct visual rhythm.
const decks = [
  {
    label: 'Too Much Power', kicker: '[ government power ]', coverFx: 'editorial', pointFx: 'num', motif: 'stripe',
    cover: { h: 'What happens when government gets <em>too much power?</em>', lead: 'More control over your money, your choices, and your everyday life.' },
    points: [
      { t: 'It starts with <em>more government</em>', b: 'More control over healthcare, housing, taxes, energy, labor, transportation, and the economy.', icon: 'capitol' },
      { t: 'Families pay the <em>price</em>', b: 'Higher taxes, more fees, fewer choices, slower services, and less room for working families to get ahead.', icon: 'store' },
      { t: 'Control is not <em>compassion</em>', b: 'Bigger government can still mean less freedom, more bureaucracy, and weaker accountability.', icon: 'shield' },
      { t: 'Spending is not the same as <em>solving</em>', b: 'Public programs should prove they work before asking taxpayers for more money and more power.', icon: 'check' },
      { t: 'HD-27 deserves a <em>clear choice</em>', b: 'Practical leadership built on accountability, public safety, strong schools, affordability, and freedom.', icon: 'scales' },
    ],
    closer: { eb: '[ the choice ]', h: 'Reject control. <em>Choose accountability.</em>' },
  },
  {
    label: 'What Mark Rejects', kicker: '[ protect oregon’s rights ]', coverFx: 'centered', pointFx: 'stack', motif: 'dots',
    cover: { h: 'See what Mark <em>rejects</em> for Oregon', lead: 'Oregon does not need socialism. It needs service, solutions, and accountability.' },
    points: [
      { t: '<em>Socialism</em>', b: 'A system that shifts control from families toward government.', icon: 'capitol' },
      { t: '<em>Democratic socialism</em>', b: 'Softer language, same push toward centralized power.', icon: 'scales' },
      { t: '<em>Higher taxes</em>', b: 'More of every paycheck sent to fund a larger government.', icon: 'store' },
      { t: '<em>Expanded bureaucracy</em>', b: 'More agencies and delays, less accountability.', icon: 'server' },
      { t: '<em>Centralized control</em>', b: 'Decisions pulled away from local communities.', icon: 'pin' },
    ],
    closer: { eb: '[ what mark rejects ]', h: 'Less freedom is not the <em>answer.</em>' },
  },
  {
    label: 'Why Mark Opposes', kicker: '[ democratic socialism ]', coverFx: 'editorial', pointFx: 'stack', motif: 'stars',
    cover: { h: 'Reasons Mark opposes <em>democratic socialism</em>', lead: 'House District 27 cannot afford that direction.' },
    points: [
      { t: '<em>Higher taxes</em>', b: 'More of every paycheck sent to fund a larger government.', icon: 'store' },
      { t: '<em>More bureaucracy</em>', b: 'More agencies and delays, and less accountability.', icon: 'server' },
      { t: '<em>Centralized control</em>', b: 'Power pulled away from families and local communities.', icon: 'pin' },
    ],
    closer: { eb: '[ democratic socialism ]', h: 'Public ownership. <em>Less freedom.</em>' },
  },
  {
    label: 'Voter Guide', kicker: '[ voter guide ]', coverFx: 'bigType', pointFx: 'num', motif: 'stripe',
    cover: { h: 'What HD-27 voters <em>should know.</em>', lead: 'Understand what is at stake before you vote.' },
    points: [
      { t: 'Socialism means <em>more government power</em>', b: 'More control over taxes, healthcare, housing, and energy.', icon: 'capitol' },
      { t: 'DSA is <em>not just a label</em>', b: 'It describes an agenda, not simply a name.', icon: 'scales' },
      { t: 'Public ownership is part of <em>the agenda</em>', b: 'Government control over major sectors and infrastructure.', icon: 'server' },
      { t: 'Mark rejects <em>that direction</em>', b: 'He supports opportunity, accountability, and freedom.', icon: 'flag' },
    ],
    closer: { eb: '[ house district 27 ]', h: 'HD-27 deserves <em>practical leadership.</em>' },
  },
  {
    label: 'Two Directions', kicker: '[ the choice ]', coverFx: 'editorial', pointFx: 'num', motif: 'dots',
    cover: { h: 'Government control vs. <em>practical leadership</em>', lead: 'This election is about direction.' },
    points: [
      { t: '<em>Larger government</em>', b: 'More decisions made far from your community.', icon: 'capitol' },
      { t: 'Higher <em>taxes and fees</em>', b: 'A growing bill for working families.', icon: 'store' },
      { t: '<em>Expanded bureaucracy</em>', b: 'More red tape, and less accountability.', icon: 'server' },
    ],
    closer: { eb: '[ the choice ]', h: 'Mark believes in <em>practical leadership.</em>' },
  },
  {
    label: 'Breathing Room', kicker: '[ affordability ]', coverFx: 'centered', pointFx: 'stack', motif: 'ruled',
    cover: { h: 'Oregon families need <em>breathing room</em>', lead: 'Life is getting more expensive. Government should not make it worse.' },
    points: [
      { t: 'Costs are rising <em>everywhere</em>', b: 'Housing, utilities, groceries, healthcare, fees, and daily expenses are squeezing families.', icon: 'store' },
      { t: 'Higher taxes are <em>not relief</em>', b: 'You cannot help working families by making it harder for them to afford life.', icon: 'scales' },
      { t: 'Small businesses <em>feel it too</em>', b: 'When businesses face higher costs, families feel it through prices, jobs, and local options.', icon: 'check' },
      { t: 'Mark’s approach is <em>simple</em>', b: 'Control spending. Oppose unnecessary tax and fee increases. Reduce pressure on families.', icon: 'flag' },
    ],
    closer: { eb: '[ affordability ]', h: 'Affordability must <em>come first.</em>' },
  },
  {
    label: 'Stop Funding Failure', kicker: '[ accountability ]', coverFx: 'editorial', pointFx: 'num', motif: 'stripe',
    cover: { h: 'Stop funding <em>failure.</em>', lead: 'Taxpayers deserve results, not excuses.' },
    points: [
      { t: 'Where did the <em>money go?</em>', b: 'Public spending should be transparent and easy to review.', icon: 'scales' },
      { t: 'Did it <em>work?</em>', b: 'Government programs should be measured by outcomes, not size.', icon: 'check' },
      { t: 'More spending is <em>not reform</em>', b: 'If a program fails, giving it more money is not accountability.', icon: 'capitol' },
    ],
    closer: { eb: '[ accountability ]', h: 'Results before <em>more revenue.</em>' },
  },
  {
    label: 'Healthcare Choice', kicker: '[ healthcare choice ]', coverFx: 'bigType', pointFx: 'num', motif: 'dots',
    cover: { h: 'Patients need <em>choice.</em>', lead: 'More bureaucracy does not automatically mean better care.' },
    points: [
      { t: 'Costs are <em>too high</em>', b: 'Families should not delay care because they fear the bill.', icon: 'heartplus' },
      { t: 'Providers are <em>buried too</em>', b: 'Administrative burdens make care harder for patients and professionals.', icon: 'server' },
      { t: 'Government control is <em>not the cure</em>', b: 'Mark does not support a government-run single-payer system for Oregon.', icon: 'shield' },
    ],
    closer: { eb: '[ mark’s approach ]', h: 'Patient-centered. <em>Results-focused.</em>' },
  },
  {
    label: 'What Mark Supports', kicker: '[ where mark stands ]', coverFx: 'centered', pointFx: 'stack', motif: 'stars',
    cover: { h: 'What Mark <em>supports</em>', lead: 'A practical path forward for House District 27.' },
    points: [
      { t: 'Public <em>safety</em>', b: 'Fully funded, accountable, and community-focused.', icon: 'shield' },
      { t: 'Strong <em>schools</em>', b: 'The basics, safe classrooms, and parents in the loop.', icon: 'book' },
      { t: 'Small-business <em>growth</em>', b: 'Partners in the economy, not revenue sources.', icon: 'store' },
      { t: 'Healthcare <em>choice</em>', b: 'Decisions between patients and professionals.', icon: 'heartplus' },
    ],
    closer: { eb: '[ house district 27 ]', h: 'Reliable energy. <em>Vote for Mark.</em>' },
  },
  {
    label: 'Before You Vote', kicker: '[ before 2026 ]', coverFx: 'bigType', pointFx: 'num', motif: 'stripe',
    cover: { h: 'What voters should know <em>before 2026.</em>', lead: 'Democratic socialism sounds soft. The consequences are not.' },
    points: [
      { t: 'It means <em>more government power</em>', b: 'More control over taxes, healthcare, housing, energy, transportation, and the economy.', icon: 'capitol' },
      { t: 'Families pay the <em>price</em>', b: 'Higher taxes, more fees, fewer choices, and less control over everyday life.', icon: 'store' },
      { t: 'Bureaucracy does not equal <em>compassion</em>', b: 'Good intentions do not matter if the system becomes slower, more expensive, and less accountable.', icon: 'server' },
      { t: 'Spending more is <em>not solving more</em>', b: 'Public programs should prove results before asking taxpayers for more money.', icon: 'check' },
      { t: 'HD-27 deserves a <em>clear choice</em>', b: 'More government control, or practical leadership built on accountability, public safety, strong schools, and freedom.', icon: 'scales' },
    ],
    closer: { eb: '[ the choice ]', h: 'Reject control. <em>Choose accountability.</em>' },
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
