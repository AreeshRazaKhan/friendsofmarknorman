import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { FONTS, TOKENS, PAL, PORTRAITS, STORIES, STAMPS, pad, pick, scaler, logoTag, stamp, ICONFX } from './lib/post-content.mjs'

/**
 * 20 story (1080x1920) posts, each a DISTINCT composition (10 layouts x navy/paper).
 * Rich concept style; story-safe (critical text in center 1080x1420). No CTA/PAC.
 */
const OUT = 'social-stories'
mkdirSync(OUT, { recursive: true })

const dots = (p) => `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;background-image:radial-gradient(${p === 'navy' ? 'rgba(245,242,236,.05)' : 'rgba(11,40,68,.05)'} 1.4px,transparent 1.7px);background-size:15px 15px"></span>`
const stripeCorner = (p, poly) => `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;clip-path:${poly};background-image:repeating-linear-gradient(45deg,rgba(182,32,37,${p === 'navy' ? '.16' : '.8'}) 0 2px,transparent 2px ${p === 'navy' ? 26 : 22}px)"></span>`
const stars = (p, list) => list.map((s) => `<span aria-hidden="true" style="position:absolute;z-index:0;color:${p === 'navy' ? 'var(--red-3)' : 'var(--red)'};font-weight:700;${s}">★</span>`).join('')
const wm = (p, txt, css) => `<span aria-hidden="true" style="position:absolute;z-index:0;font-weight:700;line-height:.7;letter-spacing:-.05em;color:${p === 'navy' ? 'var(--paper)' : 'var(--navy)'};opacity:.05;${css}">${txt}</span>`

const HEAD = (cfg, css, inner) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><title>${pad(cfg.n)} · ${cfg.comp}</title>
${FONTS}
<style>
${TOKENS}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#1a1a1a;font-family:var(--ff)}
.logo{position:absolute;left:96px;top:150px;z-index:6}.logo-slot{display:inline-flex}
.eyebrow{display:flex;align-items:center;gap:18px;font-family:var(--ff-mono);font-size:24px;font-weight:600;letter-spacing:.26em;text-transform:uppercase}
.eyebrow::before{content:"";width:52px;height:5px;flex-shrink:0}
.headline{font-weight:700;letter-spacing:-.03em;line-height:.98}
.headline em{font-style:normal;font-weight:inherit;position:relative;display:inline-block}
.headline em::after{content:"";position:absolute;left:-7px;right:-7px;bottom:9px;height:18px;z-index:-1}
.stamp{position:absolute;z-index:4;background:var(--paper);border:6px solid var(--navy);border-radius:50%;display:grid;place-items:center;box-shadow:14px 14px 0 var(--red)}
.stamp svg{width:54%;height:54%}
${css}
/* emphasis is red color only — no highlight bar under/after the word */
.headline em::after,.title em::after,.quote em::after{display:none}
</style></head>
<body>
  <div class="story" data-fonts="Cabin,JetBrains Mono">
    ${inner}
  </div>
${scaler('.story')}
</body></html>
`
const theme = (p) => `.story{width:1080px;height:1920px;position:relative;overflow:hidden;background:${PAL[p].bg};color:${PAL[p].text}}
.eyebrow{color:${PAL[p].red}}.eyebrow::before{background:${PAL[p].red}}
.headline{color:${PAL[p].text}}.headline em{color:${PAL[p].red}}.headline em::after{background:${PAL[p].hl}}
.body{font-size:36px;line-height:1.5;color:${PAL[p].body}}`

const C = {}

C.edLeft = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.story{display:flex;flex-direction:column;justify-content:center;padding:250px 96px}
.content{position:relative;z-index:3;max-width:820px}
.headline{font-size:118px;margin-top:30px}.body{margin-top:38px;max-width:720px}`,
  `${dots(c.bg)}${stripeCorner(c.bg, 'polygon(60% 0,100% 0,100% 26%)')}${wm(c.bg, pad(c.n), 'right:-30px;bottom:60px;font-size:680px')}
    ${logoTag(p.logo, 140)}
    ${ICONFX.tile(t.icon, 'right:120px;top:300px;width:280px;height:280px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

C.splitH = (c) => {
  const A = c.bg === 'navy' ? 'navy' : 'paper', B = c.bg === 'navy' ? 'paper' : 'navy'
  const pa = PAL[A], pb = PAL[B]
  return HEAD(c, `.story{width:1080px;height:1920px;position:relative;overflow:hidden;background:${pb.bg}}
.top{position:absolute;top:0;left:0;right:0;height:1080px;background:${pa.bg};color:${pa.text};padding:250px 96px 0}
.bot{position:absolute;top:1080px;left:0;right:0;bottom:0;color:${pb.text};padding:90px 96px}
.eyebrow{color:${pa.red};margin-top:40px}.eyebrow::before{background:${pa.red}}
.headline{color:${pa.text};font-size:112px;margin-top:24px;max-width:840px}.headline em{color:${pa.red}}.headline em::after{background:${pa.hl}}
.body{font-size:38px;line-height:1.5;color:${pb.body};max-width:760px;margin-top:40px}
.bar{position:absolute;left:96px;top:1072px;width:140px;height:10px;background:var(--red);z-index:5}`,
  `${logoTag(pa.logo, 140)}
    <div class="top"><span class="eyebrow t">${c.t.eb}</span><h1 class="headline t">${c.t.head}</h1></div>
    <span class="bar" aria-hidden="true"></span>
    ${ICONFX.bare(c.t.icon, 'right:120px;bottom:160px;width:260px;height:260px', B)}
    <div class="bot"><p class="body t">${c.t.body}</p></div>`)
}

C.bigNum = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.story{display:flex;flex-direction:column;justify-content:center;padding:250px 96px}
.content{position:relative;z-index:3;max-width:760px}
.headline{font-size:104px;margin-top:26px}.body{margin-top:34px;max-width:700px}`,
  `${dots(c.bg)}<span aria-hidden="true" style="position:absolute;right:-70px;bottom:-110px;z-index:0;font-weight:700;font-size:900px;line-height:.64;letter-spacing:-.06em;color:${p.text};opacity:.9">${pad(c.n)}</span>
    ${logoTag(p.logo, 140)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

C.iconHero = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.story{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:250px 110px}
.content{position:relative;z-index:3;max-width:820px}
.eyebrow{justify-content:center}.eyebrow::before{display:none}
.headline{font-size:128px;margin-top:30px}.body{margin-top:34px;margin-left:auto;margin-right:auto;max-width:680px}`,
  `${dots(c.bg)}${stars(c.bg, ['top:330px;left:170px;font-size:54px', 'top:470px;right:200px;font-size:30px;opacity:.7', 'bottom:380px;left:230px;font-size:34px;opacity:.6'])}
    ${logoTag(p.logo, 140)}
    <div class="content">${ICONFX.bare(t.icon, 'position:relative;width:360px;height:360px;margin:0 auto 50px', c.bg)}<span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1></div>`)
}

C.portrait = (c) => {
  const p = PAL[c.bg], t = c.t, photo = pick(PORTRAITS, c.variant), st = pick(STAMPS, c.variant)
  const pb = c.bg === 'navy' ? 'var(--paper)' : 'var(--navy)'
  return HEAD(c, `${theme(c.bg)}
.story{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:250px 96px}
.content{position:relative;z-index:3;max-width:840px}
.portrait{width:560px;height:700px;border:7px solid ${pb};border-radius:12px;overflow:hidden;box-shadow:18px 18px 0 var(--red);margin-bottom:54px}
.portrait img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
.headline{font-size:104px}
.stamps{display:flex;gap:16px;margin-top:40px;flex-wrap:wrap}
.cs{font-family:var(--ff-mono);font-size:18px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;padding:15px 24px;background:var(--navy);color:var(--paper)}
.cs:nth-child(1){transform:rotate(-2deg)}.cs:nth-child(2){transform:rotate(1.5deg);background:var(--red);color:var(--paper)}`,
  `${dots(c.bg)}${stars(c.bg, ['top:300px;right:160px;font-size:44px;opacity:.7'])}
    ${logoTag(p.logo, 140)}
    <div class="content"><div class="portrait"><img src="${photo}" alt="Mark Norman" /></div><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><div class="stamps"><span class="cs t">${st[0]}</span><span class="cs t">${st[1]}</span></div></div>`)
}

C.quote = (c) => {
  const p = PAL[c.bg], q = c.t
  return HEAD(c, `${theme(c.bg)}
.story{display:flex;flex-direction:column;justify-content:center;padding:250px 96px}
.content{position:relative;z-index:3;max-width:840px}
.mark{font-weight:700;font-size:280px;line-height:.55;height:150px;color:${p.red}}
.quote{font-weight:700;font-size:86px;line-height:1.12;letter-spacing:-.02em;color:${p.text};margin-top:40px}
.quote em{font-style:normal;font-weight:inherit;color:${p.red};position:relative;display:inline-block}.quote em::after{content:"";position:absolute;left:-7px;right:-7px;bottom:9px;height:18px;background:${p.hl};z-index:-1}
.attr{display:flex;align-items:center;gap:20px;margin-top:50px}.attr .line{width:64px;height:3px;background:${p.red}}.attr .name{font-family:var(--ff-mono);font-size:23px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${p.body}}`,
  `${dots(c.bg)}${stripeCorner(c.bg, 'polygon(66% 0,100% 0,100% 22%)')}
    ${logoTag(p.logo, 140)}
    <div class="content"><div class="mark" aria-hidden="true">“</div><blockquote class="quote t">${q.q}</blockquote><div class="attr"><span class="line" aria-hidden="true"></span><span class="name t">Mark Norman</span></div></div>`)
}

C.statStack = (c) => {
  const p = PAL[c.bg], t = c.t, s = c.t
  const rows = (s.nums || []).map((n, k) => `<div class="st"><div class="num t"><span class="plus">${n[0]}</span>${n[1]}</div><div class="desc t">${s.descs[k]}</div></div>`).join('')
  const detail = s.nums ? `<div class="stats">${rows}</div>` : `<p class="body t">${t.body}</p>`
  return HEAD(c, `${theme(c.bg)}
.story{display:flex;flex-direction:column;justify-content:center;padding:250px 96px}
.content{position:relative;z-index:3;max-width:820px}
.headline{font-size:84px;margin-top:22px}
.stats{display:flex;flex-direction:column;gap:30px;margin-top:54px}
.body{margin-top:46px;max-width:740px}
.st{display:flex;align-items:baseline;gap:26px}.num{font-weight:700;font-size:128px;line-height:.82;letter-spacing:-.03em;color:${p.text}}.num .plus{color:${p.red};font-size:68px;vertical-align:super}.desc{font-family:var(--ff-mono);font-size:20px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${p.body}}`,
  `${dots(c.bg)}${stars(c.bg, ['top:320px;right:170px;font-size:44px'])}
    ${logoTag(p.logo, 140)}
    ${ICONFX.tile(t.icon, 'right:120px;top:300px;width:230px;height:230px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1>${detail}</div>`)
}

C.banner = (c) => {
  const p = PAL[c.bg], b = { eb: c.t.eb, h: c.t.head }
  return HEAD(c, `${theme(c.bg)}
.story{display:flex;flex-direction:column;justify-content:center;padding:250px 96px}
.content{position:relative;z-index:3;max-width:900px}
.rt{display:flex;align-items:center;gap:22px;margin-bottom:18px}.rt::after{content:"";flex:1;height:6px;background:${p.red}}
.eyebrow{display:inline-flex}.eyebrow::before{display:none}
.headline{font-size:146px;line-height:.92;text-transform:uppercase;margin-top:14px;word-break:break-word}
.rb{width:170px;height:9px;background:${p.red};margin-top:42px}`,
  `${dots(c.bg)}${stripeCorner(c.bg, 'polygon(60% 0,100% 0,100% 22%)')}${wm(c.bg, pad(c.n), 'right:-30px;bottom:120px;font-size:600px')}
    ${logoTag(p.logo, 140)}
    <div class="content"><div class="rt"><span class="eyebrow t">${b.eb}</span></div><h1 class="headline t">${b.h}</h1><span class="rb" aria-hidden="true"></span></div>`)
}

C.list = (c) => {
  const p = PAL[c.bg], s = c.t
  const numBg = c.bg === 'navy' ? 'var(--paper)' : 'var(--navy)'
  const numFg = c.bg === 'navy' ? 'var(--navy)' : 'var(--paper)'
  const li = s.items.map((x, k) => `<div class="item"><span class="n t">${pad(k + 1)}</span><span class="tx t">${x}</span></div>`).join('')
  return HEAD(c, `${theme(c.bg)}
.story{display:flex;flex-direction:column;justify-content:center;padding:250px 96px}
.content{position:relative;z-index:3;max-width:820px}
.headline{font-size:92px;margin-top:20px}
.list{display:flex;flex-direction:column;gap:34px;margin-top:54px}
.item{display:flex;gap:30px;align-items:center}
.item .n{font-family:var(--ff-mono);font-size:30px;font-weight:600;color:${numFg};background:${numBg};width:84px;height:84px;border-radius:50%;display:grid;place-items:center;flex-shrink:0;box-shadow:8px 8px 0 var(--red)}
.item .tx{font-size:36px;line-height:1.35;color:${p.text};max-width:620px}`,
  `${dots(c.bg)}${stars(c.bg, ['top:330px;right:170px;font-size:50px', 'top:470px;right:300px;font-size:26px;opacity:.7', 'bottom:360px;left:150px;font-size:34px;opacity:.6'])}
    ${logoTag(p.logo, 140)}
    <div class="content"><span class="eyebrow t">${s.eb}</span><h1 class="headline t">${s.head}</h1><div class="list">${li}</div></div>`)
}

C.stripeField = (c) => {
  const onNavy = c.bg === 'navy'
  const p = PAL[c.bg]
  const panelBg = onNavy ? 'var(--paper)' : 'var(--navy)'
  const pT = onNavy ? 'var(--navy)' : 'var(--paper)'
  const pR = onNavy ? 'var(--red)' : 'var(--red-3)'
  const pB = onNavy ? 'var(--stone-d)' : 'var(--paper-78)'
  return HEAD(c, `.story{width:1080px;height:1920px;position:relative;overflow:hidden;background:${p.bg};display:flex;flex-direction:column;justify-content:center;padding:250px 96px}
.panel{position:relative;z-index:3;background:${panelBg};border-left:14px solid var(--red);padding:64px 64px;max-width:840px;box-shadow:0 28px 56px rgba(11,40,68,.24)}
.eyebrow{color:${pR}}.eyebrow::before{background:${pR}}
.headline{color:${pT};font-size:104px;margin-top:24px}.headline em{color:${pR}}.headline em::after{background:rgba(182,32,37,.18)}
.body{color:${pB};font-size:36px;line-height:1.5;margin-top:32px;max-width:680px}`,
  `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;background-image:repeating-linear-gradient(45deg,rgba(182,32,37,${onNavy ? '.18' : '.7'}) 0 2px,transparent 2px ${onNavy ? 26 : 22}px)"></span>
    ${logoTag(p.logo, 140)}
    ${ICONFX.stamp(c.t.icon, 'right:120px;top:300px;width:200px;height:200px;z-index:5', c.bg)}
    <div class="panel"><span class="eyebrow t">${c.t.eb}</span><h1 class="headline t">${c.t.head}</h1><p class="body t">${c.t.body}</p></div>`)
}

const COMPS = ['edLeft', 'splitH', 'bigNum', 'iconHero', 'portrait', 'quote', 'statStack', 'banner', 'list', 'stripeField']
// Each story is authored independently in STORIES (no rotation), in the same
// order as COMPS × [navy, paper]: story i uses COMPS[floor(i/2)], alternating bg.
const cfgs = STORIES.map((t, i) => ({
  n: i + 1,
  comp: COMPS[Math.floor(i / 2)],
  bg: i % 2 === 0 ? 'navy' : 'paper',
  t,
  variant: i,
}))
let written = 0
for (const cfg of cfgs) {
  writeFileSync(path.join(OUT, `${pad(cfg.n)}-${cfg.comp}-${cfg.bg}.html`), C[cfg.comp](cfg))
  written++
}
console.log(`Generated ${written} story posts (${COMPS.length} distinct compositions)`)
