import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { FONTS, TOKENS, PAL, PORTRAITS, SQUARES, STAMPS, pad, pick, scaler, logoTag, stamp, ICONS, ICONFX } from './lib/post-content.mjs'

/**
 * 50 square (1080x1080) posts, each a DISTINCT composition (no duplicate layouts).
 * ~14 layout families instantiated with varied palette / motif / topic / icon.
 * Rich concept style: layered backgrounds, highlighter headlines, icon-stamps,
 * portraits, big watermarks. No CTA, no PAC, real logo. QA + perceptual-dedupe.
 */
const OUT = 'social-squares'
mkdirSync(OUT, { recursive: true })
const W = 1080

const dots = (p) => `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;background-image:radial-gradient(${p === 'navy' ? 'rgba(245,242,236,.05)' : 'rgba(11,40,68,.05)'} 1.4px,transparent 1.7px);background-size:15px 15px"></span>`
const stripeCorner = (p, poly) => `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;clip-path:${poly};background-image:repeating-linear-gradient(45deg,rgba(182,32,37,${p === 'navy' ? '.16' : '.8'}) 0 2px,transparent 2px ${p === 'navy' ? 26 : 22}px)"></span>`
const stars = (p, list) => list.map((s) => `<span aria-hidden="true" style="position:absolute;z-index:0;color:${p === 'navy' ? 'var(--red-3)' : 'var(--red)'};font-weight:700;${s}">★</span>`).join('')
const ruled = () => `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;background-image:repeating-linear-gradient(transparent 0 95px,rgba(11,40,68,.06) 95px 96px)"></span><span aria-hidden="true" style="position:absolute;top:0;bottom:0;left:150px;width:2px;background:var(--red);z-index:0"></span>`
const wm = (p, txt, css) => `<span aria-hidden="true" style="position:absolute;z-index:0;font-weight:700;line-height:.7;letter-spacing:-.05em;color:${p === 'navy' ? 'var(--paper)' : 'var(--navy)'};opacity:.05;${css}">${txt}</span>`

const HEAD = (cfg, css, inner) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><title>${pad(cfg.n)} · ${cfg.comp}</title>
${FONTS}
<style>
${TOKENS}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#1a1a1a;font-family:var(--ff)}
.logo{position:absolute;left:84px;top:84px;z-index:6}.logo-slot{display:inline-flex}
.eyebrow{display:flex;align-items:center;gap:16px;font-family:var(--ff-mono);font-size:21px;font-weight:600;letter-spacing:.26em;text-transform:uppercase}
.eyebrow::before{content:"";width:46px;height:4px;flex-shrink:0}
.headline{font-weight:700;letter-spacing:-.03em;line-height:.98}
.headline em{font-style:normal;font-weight:400;position:relative;display:inline-block}
.headline em::after{content:"";position:absolute;left:-6px;right:-6px;bottom:8px;height:15px;z-index:-1}
.stamp{position:absolute;z-index:4;background:var(--paper);border:5px solid var(--navy);border-radius:50%;display:grid;place-items:center;box-shadow:12px 12px 0 var(--red)}
.stamp svg{width:54%;height:54%}
${css}
</style></head>
<body>
  <div class="post" data-fonts="Cabin,JetBrains Mono">
    ${inner}
  </div>
${scaler('.post')}
</body></html>
`
// shared theme rule for a palette
const theme = (p) => `.post{width:1080px;height:1080px;position:relative;overflow:hidden;background:${PAL[p].bg};color:${PAL[p].text}}
.eyebrow{color:${PAL[p].red}}.eyebrow::before{background:${PAL[p].red}}
.headline{color:${PAL[p].text}}.headline em{color:${PAL[p].red}}.headline em::after{background:${PAL[p].hl}}
.body{font-size:28px;line-height:1.5;color:${PAL[p].body}}`

// ---------------------------------------------------------------- compositions
// each returns full HTML. cfg: {n, comp, bg, t (topic), variant}
const C = {}

// 1. editorial — content left, icon-stamp top-right, stripe corner TR, wm BR
C.edLeft = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.content{position:relative;z-index:3;max-width:600px}
.headline{font-size:84px;margin-top:26px}.body{margin-top:30px;max-width:540px}`,
  `${dots(c.bg)}${stripeCorner(c.bg, 'polygon(64% 0,100% 0,100% 40%)')}${wm(c.bg, pad(c.n), 'right:-30px;bottom:-150px;font-size:600px')}
    ${logoTag(p.logo, 104)}
    ${ICONFX.tile(t.icon, 'right:96px;top:330px;width:220px;height:220px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

// 2. editorial centered, framed, icon above
C.edCenter = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px}
.frame{position:absolute;inset:54px;z-index:0;border:2px solid ${c.bg === 'navy' ? 'rgba(245,242,236,.3)' : 'var(--bone)'}}
.content{position:relative;z-index:3;max-width:760px}
.eyebrow{justify-content:center}.eyebrow::before{display:none}
.headline{font-size:78px;margin-top:24px}.body{margin-top:28px;margin-left:auto;margin-right:auto;max-width:600px}
.istamp{position:relative;z-index:3;margin:0 auto 14px;width:150px;height:150px}`,
  `${dots(c.bg)}<span class="frame" aria-hidden="true"></span>
    ${logoTag(p.logo, 100)}
    <div class="content">${ICONFX.ring(t.icon, 'position:relative;width:148px;height:148px;margin:0 auto 30px', c.bg)}<span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

// 3. big faded issue number on the left, content right
C.bigNum = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px 90px 90px 470px}
.content{position:relative;z-index:3;max-width:560px}
.headline{font-size:78px;margin-top:24px}.body{margin-top:28px}`,
  `${dots(c.bg)}${wm(c.bg, pad(c.n), 'left:-30px;top:50%;transform:translateY(-50%);font-size:760px;opacity:.08')}
    ${logoTag(p.logo, 100)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

// 4. horizontal split — color top (eyebrow+headline), base bottom (body + icon)
C.splitH = (c) => {
  const A = c.bg === 'navy' ? 'navy' : 'paper', B = c.bg === 'navy' ? 'paper' : 'navy'
  const pa = PAL[A], pb = PAL[B]
  return HEAD(c, `.post{width:1080px;height:1080px;position:relative;overflow:hidden;background:${pb.bg}}
.top{position:absolute;top:0;left:0;right:0;height:560px;background:${pa.bg};color:${pa.text};padding:80px}
.bot{position:absolute;top:560px;left:0;right:0;bottom:0;color:${pb.text};padding:60px 80px}
.eyebrow{color:${pa.red};margin-top:120px}.eyebrow::before{background:${pa.red}}
.headline{color:${pa.text};font-size:78px;margin-top:18px;max-width:780px}.headline em{color:${pa.red}}.headline em::after{background:${pa.hl}}
.body{font-size:30px;line-height:1.5;color:${pb.body};max-width:620px;margin-top:34px}
.bar{position:absolute;left:80px;top:556px;width:120px;height:8px;background:var(--red);z-index:5}`,
  `${logoTag(pa.logo, 100)}
    <div class="top"><span class="eyebrow t">${c.t.eb}</span><h1 class="headline t">${c.t.head}</h1></div>
    <span class="bar" aria-hidden="true"></span>
    ${ICONFX.tile(c.t.icon, 'right:90px;bottom:90px;width:190px;height:190px', B)}
    <div class="bot"><p class="body t">${c.t.body}</p></div>`)
}

// 5. vertical split — left color panel (icon+eyebrow), right (headline+body)
C.splitV = (c) => {
  const A = c.bg === 'navy' ? 'navy' : 'paper', B = c.bg === 'navy' ? 'paper' : 'navy'
  const pa = PAL[A], pb = PAL[B]
  return HEAD(c, `.post{width:1080px;height:1080px;position:relative;overflow:hidden;background:${pb.bg}}
.left{position:absolute;top:0;bottom:0;left:0;width:430px;background:${pa.bg};color:${pa.text};padding:80px 50px;display:flex;flex-direction:column;justify-content:space-between}
.right{position:absolute;top:0;bottom:0;left:430px;right:0;color:${pb.text};padding:90px 70px;display:flex;flex-direction:column;justify-content:center}
.eyebrow{color:${pa.red}}.eyebrow::before{background:${pa.red}}
.headline{color:${pb.text};font-size:74px}.headline em{color:${pb.red}}.headline em::after{background:${pb.hl}}
.body{font-size:27px;line-height:1.5;color:${pb.body};margin-top:28px;max-width:520px}`,
  `<div class="left"><div class="logo-slot"><img src="${pa.logo}" alt="Mark Norman for Oregon" style="height:94px;width:auto;display:block"/></div>${ICONFX.bare(c.t.icon, 'position:relative;width:190px;height:190px;margin-top:auto', A)}<span class="eyebrow t" style="margin-top:40px">${c.t.eb}</span></div>
    <div class="right"><h1 class="headline t">${c.t.head}</h1><p class="body t">${c.t.body}</p></div>`)
}

// 6. icon hero — giant centered icon-stamp, headline below
C.iconHero = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:100px}
.content{position:relative;z-index:3;max-width:760px}
.eyebrow{justify-content:center}.eyebrow::before{display:none}
.headline{font-size:88px;margin-top:26px}`,
  `${dots(c.bg)}${stripeCorner(c.bg, 'polygon(0 0,30% 0,0 30%)')}${stars(c.bg, ['bottom:140px;right:160px;font-size:40px', 'bottom:230px;right:260px;font-size:22px;opacity:.7'])}
    ${logoTag(p.logo, 100)}
    ${ICONFX.bare(t.icon, 'position:relative;width:320px;height:320px;margin:0 auto 44px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1></div>`)
}

// 7. portrait right, content left
C.portraitR = (c) => {
  const p = PAL[c.bg], t = c.t, photo = pick(PORTRAITS, c.variant), st = pick(STAMPS, c.variant)
  const pb = c.bg === 'navy' ? 'var(--paper)' : 'var(--navy)'
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.content{position:relative;z-index:3;max-width:500px}
.headline{font-size:84px;margin-top:24px}
.portrait{position:absolute;right:80px;top:280px;width:390px;height:500px;z-index:3;border:6px solid ${pb};border-radius:10px;overflow:hidden;box-shadow:14px 14px 0 var(--red)}
.portrait img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
.stamps{display:flex;gap:14px;margin-top:36px;flex-wrap:wrap}
.cs{font-family:var(--ff-mono);font-size:15px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;padding:13px 20px;background:var(--navy);color:var(--paper)}
.cs:nth-child(1){transform:rotate(-2deg)}.cs:nth-child(2){transform:rotate(1.5deg);background:var(--red);color:var(--paper)}`,
  `${dots(c.bg)}${stars(c.bg, ['top:120px;right:150px;font-size:34px;opacity:.7'])}
    ${logoTag(p.logo, 100)}
    <div class="portrait"><img src="${photo}" alt="Mark Norman" /></div>
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><div class="stamps"><span class="cs t">${st[0]}</span><span class="cs t">${st[1]}</span></div></div>`)
}

// 8. portrait band top (full width), content below
C.portraitBand = (c) => {
  const p = PAL[c.bg], t = c.t, photo = pick(PORTRAITS, c.variant + 2)
  const fade = c.bg === 'navy' ? 'var(--navy)' : 'var(--paper)'
  return HEAD(c, `${theme(c.bg)}
.post{padding:0}
.band{position:absolute;top:0;left:0;right:0;height:520px;overflow:hidden;z-index:1}
.band img{width:100%;height:100%;object-fit:cover;object-position:center 28%;display:block}
.band::after{content:"";position:absolute;inset:0;background:linear-gradient(to bottom,rgba(11,40,68,.1),${fade})}
.content{position:absolute;left:90px;right:90px;top:556px;z-index:3}
.headline{font-size:70px;margin-top:18px}.body{font-size:25px;margin-top:22px;max-width:780px}
.logo{top:auto;bottom:68px;left:90px}
.cap{position:absolute;left:30px;top:470px;z-index:2;font-family:var(--ff-mono);font-size:15px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--paper-78)}`,
  `<div class="band"><img src="${photo}" alt="Mark Norman" /><span class="cap t">Mark Norman · HD-27</span></div>
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>
    ${logoTag(p.logo, 92)}`)
}

// 9. quote
C.quote = (c) => {
  const p = PAL[c.bg], q = c.t
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.content{position:relative;z-index:3;max-width:720px}
.mark{font-weight:700;font-size:200px;line-height:.55;height:110px;color:${p.red}}
.quote{font-weight:700;font-size:60px;line-height:1.12;letter-spacing:-.02em;color:${p.text};margin-top:30px}
.quote em{font-style:normal;font-weight:400;color:${p.red};position:relative;display:inline-block}.quote em::after{content:"";position:absolute;left:-6px;right:-6px;bottom:8px;height:15px;background:${p.hl};z-index:-1}
.attr{display:flex;align-items:center;gap:18px;margin-top:38px}.attr .line{width:56px;height:3px;background:${p.red}}.attr .name{font-family:var(--ff-mono);font-size:19px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${p.body}}`,
  `${dots(c.bg)}${stripeCorner(c.bg, 'polygon(70% 0,100% 0,100% 34%)')}
    ${logoTag(p.logo, 100)}
    <div class="content"><div class="mark" aria-hidden="true">“</div><blockquote class="quote t">${q.q}</blockquote><div class="attr"><span class="line" aria-hidden="true"></span><span class="name t">Mark Norman</span></div></div>`)
}

// 10. stat row (3 across), headline top
C.statRow = (c) => {
  const p = PAL[c.bg], t = c.t, s = c.t
  const cells = s.nums.map((n, k) => `<div class="cell"><div class="num t"><span class="plus">${n[0]}</span>${n[1]}</div><div class="desc t">${s.descs[k]}</div></div>`).join('')
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.content{position:relative;z-index:3;max-width:840px}
.headline{font-size:64px;margin-top:22px}
.row{display:flex;gap:30px;margin-top:54px}
.cell{flex:1}.num{font-weight:700;font-size:104px;line-height:.85;letter-spacing:-.03em;color:${p.text}}.num .plus{color:${p.red};font-size:56px;vertical-align:super}
.desc{font-family:var(--ff-mono);font-size:15px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:${p.body};margin-top:14px}`,
  `${dots(c.bg)}
    ${logoTag(p.logo, 100)}
    ${ICONFX.badge(t.icon, 'right:100px;top:120px;width:190px;height:190px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><div class="row">${cells}</div></div>`)
}

// 11. stat hero — editorial headline + body (large)
C.statHero = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.content{position:relative;z-index:3;max-width:780px}
.headline{font-size:88px;margin-top:26px}
.body{font-size:29px;line-height:1.5;margin-top:34px;max-width:640px}`,
  `${dots(c.bg)}${stripeCorner(c.bg, 'polygon(0 70%,30% 100%,0 100%)')}
    ${logoTag(p.logo, 100)}
    ${ICONFX.badge(t.icon, 'right:100px;top:120px;width:190px;height:190px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

// 12. numbered list
C.list = (c) => {
  const p = PAL[c.bg], s = c.t
  const li = s.items.map((x, k) => `<div class="item"><span class="n t">${pad(k + 1)}</span><span class="tx t">${x}</span></div>`).join('')
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.content{position:relative;z-index:3;max-width:660px}
.headline{font-size:66px;margin-top:20px}
.list{display:flex;flex-direction:column;gap:22px;margin-top:36px}
.item{display:flex;gap:18px;align-items:flex-start}.item .n{font-family:var(--ff-mono);font-size:18px;font-weight:600;color:${p.red};min-width:40px;padding-top:6px}.item .tx{font-size:26px;line-height:1.4;color:${p.body};max-width:500px}`,
  `${dots(c.bg)}
    ${logoTag(p.logo, 100)}
    ${ICONFX.stamp(s.icon, 'right:96px;bottom:120px;width:200px;height:200px', c.bg)}
    <div class="content"><span class="eyebrow t">${s.eb}</span><h1 class="headline t">${s.head}</h1><div class="list">${li}</div></div>`)
}

// 13. banner — giant uppercase, top/bottom rules, stripe field bg
C.banner = (c) => {
  const p = PAL[c.bg], b = { eb: c.t.eb, h: c.t.head }
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.content{position:relative;z-index:3;max-width:900px}
.rt{display:flex;align-items:center;gap:20px;margin-bottom:14px}.rt::after{content:"";flex:1;height:5px;background:${p.red}}
.eyebrow{display:inline-flex}.eyebrow::before{display:none}
.headline{font-size:130px;line-height:.92;text-transform:uppercase;margin-top:10px;word-break:break-word}
.rb{width:150px;height:8px;background:${p.red};margin-top:34px}`,
  `${dots(c.bg)}${stripeCorner(c.bg, 'polygon(62% 0,100% 0,100% 36%)')}${wm(c.bg, pad(c.n), 'right:-30px;bottom:-120px;font-size:480px')}
    ${logoTag(p.logo, 100)}
    <div class="content"><div class="rt"><span class="eyebrow t">${b.eb}</span></div><h1 class="headline t">${b.h}</h1><span class="rb" aria-hidden="true"></span></div>`)
}

// 14. card panel
C.card = (c) => {
  const onNavy = c.bg === 'navy'
  const base = onNavy ? 'navy' : 'paper', cardBg = onNavy ? 'var(--paper)' : 'var(--navy)'
  const cText = onNavy ? 'var(--navy)' : 'var(--paper)', cRed = onNavy ? 'var(--red)' : 'var(--red-3)', cBody = onNavy ? 'var(--stone-d)' : 'var(--paper-78)'
  const p = PAL[base]
  return HEAD(c, `.post{width:1080px;height:1080px;position:relative;overflow:hidden;background:${p.bg};display:flex;flex-direction:column;justify-content:center;padding:90px}
.card{position:relative;z-index:3;background:${cardBg};border-radius:22px;padding:64px 58px;box-shadow:0 24px 50px rgba(11,40,68,.22)}
.card::before{content:"";display:block;width:64px;height:6px;background:${cRed};margin-bottom:28px}
.eyebrow{color:${cRed}}.eyebrow::before{background:${cRed}}
.headline{color:${cText};font-size:70px;margin-top:14px}.headline em{color:${cRed}}.headline em::after{background:rgba(182,32,37,.18)}
.body{font-size:28px;line-height:1.5;color:${cBody};margin-top:26px}`,
  `${dots(base)}
    ${logoTag(p.logo, 100)}
    ${ICONFX.tile(c.t.icon, 'right:104px;top:110px;width:172px;height:172px;z-index:5', onNavy ? 'navy' : 'paper')}
    <div class="card"><span class="eyebrow t">${c.t.eb}</span><h1 class="headline t">${c.t.head}</h1><p class="body t">${c.t.body}</p></div>`)
}

// 15. diagonal two-tone
C.diagonal = (c) => {
  const p = PAL[c.bg], t = c.t
  const wedge = c.bg === 'navy' ? 'var(--paper)' : 'var(--navy)'
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.wedge{position:absolute;inset:0;z-index:0;background:${wedge};clip-path:polygon(0 100%,100% 56%,100% 100%)}
.content{position:relative;z-index:3;max-width:620px}
.headline{font-size:82px;margin-top:24px}.body{margin-top:28px;max-width:560px}`,
  `${dots(c.bg)}<span class="wedge" aria-hidden="true"></span>
    ${logoTag(p.logo, 100)}
    ${ICONFX.bare(t.icon, 'right:96px;bottom:120px;width:230px;height:230px', c.bg === 'navy' ? 'paper' : 'navy')}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

// 16. editorial right-aligned, icon-stamp left
C.edRight = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;align-items:flex-end;justify-content:center;text-align:right;padding:90px}
.content{position:relative;z-index:3;max-width:600px}
.eyebrow{justify-content:flex-end}.eyebrow::before{display:none}.eyebrow::after{content:"";width:46px;height:4px;background:${p.red}}
.headline{font-size:84px;margin-top:24px}.body{margin-top:30px;max-width:540px;margin-left:auto}`,
  `${dots(c.bg)}${stripeCorner(c.bg, 'polygon(0 0,36% 0,0 40%)')}${wm(c.bg, pad(c.n), 'left:-30px;bottom:-150px;font-size:600px')}
    ${logoTag(p.logo, 104)}
    ${ICONFX.badge(t.icon, 'left:96px;top:430px;width:200px;height:200px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

// 17. editorial bottom-anchored, big icon top
C.edBottom = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:flex-end;padding:90px 90px 110px}
.content{position:relative;z-index:3;max-width:660px}
.headline{font-size:82px;margin-top:22px}.body{margin-top:26px;max-width:560px}`,
  `${dots(c.bg)}${stars(c.bg, ['top:300px;left:96px;font-size:46px', 'top:420px;left:210px;font-size:24px;opacity:.7'])}
    ${logoTag(p.logo, 104)}
    ${ICONFX.ghost(t.icon, 'right:-30px;top:120px;width:460px;height:460px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

// 18. civic stripe field + CONTRASTING solid panel
C.stripeField = (c) => {
  const onNavy = c.bg === 'navy'
  const p = PAL[c.bg]
  const panelBg = onNavy ? 'var(--paper)' : 'var(--navy)'
  const pT = onNavy ? 'var(--navy)' : 'var(--paper)'
  const pR = onNavy ? 'var(--red)' : 'var(--red-3)'
  const pB = onNavy ? 'var(--stone-d)' : 'var(--paper-78)'
  return HEAD(c, `.post{width:1080px;height:1080px;position:relative;overflow:hidden;background:${p.bg}}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.panel{position:relative;z-index:3;background:${panelBg};border-left:12px solid var(--red);padding:56px 58px;max-width:720px;box-shadow:0 24px 50px rgba(11,40,68,.22)}
.eyebrow{color:${pR}}.eyebrow::before{background:${pR}}
.headline{color:${pT};font-size:80px;margin-top:20px}.headline em{color:${pR}}.headline em::after{background:rgba(182,32,37,.18)}
.body{color:${pB};font-size:28px;line-height:1.5;margin-top:26px;max-width:600px}`,
  `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;background-image:repeating-linear-gradient(45deg,rgba(182,32,37,${onNavy ? '.18' : '.7'}) 0 2px,transparent 2px ${onNavy ? 26 : 22}px)"></span>
    ${logoTag(p.logo, 104)}
    ${ICONFX.bare(c.t.icon, 'right:110px;top:120px;width:180px;height:180px;z-index:5', c.bg)}
    <div class="panel"><span class="eyebrow t">${c.t.eb}</span><h1 class="headline t">${c.t.head}</h1><p class="body t">${c.t.body}</p></div>`)
}

// 19. ruled notebook (palette-aware)
C.ruled = (c) => {
  const p = PAL[c.bg], t = c.t
  const ruleC = c.bg === 'navy' ? 'rgba(245,242,236,.08)' : 'rgba(11,40,68,.06)'
  const ruledLayer = `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;background-image:repeating-linear-gradient(transparent 0 95px,${ruleC} 95px 96px)"></span><span aria-hidden="true" style="position:absolute;top:0;bottom:0;left:150px;width:2px;background:var(--red);z-index:0"></span>`
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px 90px 90px 210px}
.content{position:relative;z-index:3;max-width:600px}
.headline{font-size:84px;margin-top:22px}.body{margin-top:28px;max-width:560px}
.flag{position:absolute;top:0;left:0;width:150px;height:110px;background:var(--red);z-index:2;clip-path:polygon(0 0,100% 0,100% 100%,50% 80%,0 100%)}`,
  `${ruledLayer}<span class="flag" aria-hidden="true"></span>${wm(c.bg, pad(c.n), 'right:-20px;bottom:-150px;font-size:560px')}
    ${logoTag(p.logo, 104)}
    ${ICONFX.stamp(t.icon, 'right:96px;top:150px;width:180px;height:180px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

// 20. halftone half block on the right
C.halfBlock = (c) => {
  const p = PAL[c.bg], t = c.t
  const block = c.bg === 'navy' ? 'var(--navy-2)' : 'var(--paper-2)'
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.block{position:absolute;top:0;right:0;bottom:0;width:420px;z-index:0;background:${block}}
.content{position:relative;z-index:3;max-width:560px}
.headline{font-size:82px;margin-top:24px}.body{margin-top:28px;max-width:520px}`,
  `${dots(c.bg)}<span class="block" aria-hidden="true"></span>
    ${logoTag(p.logo, 104)}
    ${ICONFX.bare(t.icon, 'right:110px;top:50%;transform:translateY(-50%);width:236px;height:236px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

// 21. star field, centered
C.starField = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:110px}
.content{position:relative;z-index:3;max-width:780px}
.eyebrow{justify-content:center}.eyebrow::before{display:none}
.headline{font-size:90px;margin-top:24px}.body{margin-top:26px;margin-left:auto;margin-right:auto;max-width:600px}`,
  `${dots(c.bg)}${stars(c.bg, ['top:150px;left:150px;font-size:54px', 'top:280px;left:300px;font-size:26px;opacity:.6', 'top:200px;right:170px;font-size:40px;opacity:.8', 'bottom:200px;left:220px;font-size:30px;opacity:.6', 'bottom:170px;right:240px;font-size:46px', 'bottom:300px;right:140px;font-size:22px;opacity:.5'])}
    ${logoTag(p.logo, 100)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><p class="body t">${t.body}</p></div>`)
}

// 22. checklist — centered, 2-column tiles with check icons
C.listChecks = (c) => {
  const p = PAL[c.bg], s = c.t
  const tile = c.bg === 'navy' ? 'var(--navy-2)' : '#FFFFFF'
  const li = s.items.map((x) => `<div class="tile"><svg class="ck" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" fill="none" stroke="${p.red}" stroke-width="8"/><path d="M32 51 l13 14 l25 -30" fill="none" stroke="${p.red}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="tx t">${x}</span></div>`).join('')
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:96px}
.content{position:relative;z-index:3;max-width:880px}
.eyebrow{justify-content:center}.eyebrow::before{display:none}
.headline{font-size:74px;margin-top:22px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:48px}
.tile{display:flex;flex-direction:column;align-items:center;gap:18px;background:${tile};border:1px solid ${c.bg === 'navy' ? 'rgba(245,242,236,.14)' : 'var(--bone)'};border-radius:16px;padding:40px 30px}
.tile:nth-child(3){grid-column:1 / -1}
.ck{width:64px;height:64px}.tx{font-size:26px;line-height:1.3;color:${p.text}}`,
  `${dots(c.bg)}${stars(c.bg, ['top:140px;left:150px;font-size:34px;opacity:.7', 'top:200px;right:170px;font-size:24px;opacity:.6'])}
    ${logoTag(p.logo, 100)}
    <div class="content"><span class="eyebrow t">${s.eb}</span><h1 class="headline t">${s.head}</h1><div class="grid">${li}</div></div>`)
}

// 23. stats stacked + icon right
C.statStack = (c) => {
  const p = PAL[c.bg], t = c.t, s = c.t
  const rows = s.nums.map((n, k) => `<div class="st"><div class="num t"><span class="plus">${n[0]}</span>${n[1]}</div><div class="desc t">${s.descs[k]}</div></div>`).join('')
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.content{position:relative;z-index:3;max-width:600px}
.headline{font-size:58px;margin-top:18px}
.stats{display:flex;flex-direction:column;gap:24px;margin-top:38px}
.st{display:flex;align-items:baseline;gap:22px}.num{font-weight:700;font-size:92px;line-height:.82;letter-spacing:-.03em;color:${p.text}}.num .plus{color:${p.red};font-size:50px;vertical-align:super}.desc{font-family:var(--ff-mono);font-size:16px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${p.body}}`,
  `${dots(c.bg)}${stars(c.bg, ['bottom:150px;right:170px;font-size:40px', 'bottom:260px;right:280px;font-size:22px;opacity:.7'])}
    ${logoTag(p.logo, 100)}
    ${ICONFX.tile(t.icon, 'right:100px;top:120px;width:190px;height:190px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><div class="stats">${rows}</div></div>`)
}

// 24. banner over full stripe field
C.bannerStripe = (c) => {
  const p = PAL[c.bg], b = { eb: c.t.eb, h: c.t.head }
  const panel = c.bg === 'navy' ? 'var(--navy)' : 'var(--paper)'
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.content{position:relative;z-index:3;background:${panel};padding:50px 56px;max-width:880px}
.rt{display:flex;align-items:center;gap:20px;margin-bottom:12px}.rt::after{content:"";flex:1;height:5px;background:${p.red}}
.eyebrow{display:inline-flex}.eyebrow::before{display:none}
.headline{font-size:118px;line-height:.92;text-transform:uppercase;margin-top:8px;word-break:break-word}`,
  `<span aria-hidden="true" style="position:absolute;inset:0;z-index:0;background-image:repeating-linear-gradient(45deg,rgba(182,32,37,${c.bg === 'navy' ? '.18' : '.7'}) 0 2px,transparent 2px ${c.bg === 'navy' ? 26 : 22}px)"></span>
    ${logoTag(p.logo, 100)}
    <div class="content"><div class="rt"><span class="eyebrow t">${b.eb}</span></div><h1 class="headline t">${b.h}</h1></div>`)
}

// 25. two-column magazine
C.twoCol = (c) => {
  const p = PAL[c.bg], t = c.t
  return HEAD(c, `${theme(c.bg)}
.post{display:flex;flex-direction:column;justify-content:center;padding:90px}
.content{position:relative;z-index:3}
.headline{font-size:82px;margin-top:22px;max-width:560px}
.cols{display:flex;gap:50px;margin-top:36px;align-items:flex-start}
.body{font-size:27px;line-height:1.5;color:${p.body};max-width:430px}
.rule{width:6px;align-self:stretch;background:var(--red)}`,
  `${dots(c.bg)}${stars(c.bg, ['top:130px;right:150px;font-size:36px;opacity:.8'])}
    ${logoTag(p.logo, 100)}
    ${ICONFX.bare(t.icon, 'right:80px;bottom:110px;width:250px;height:250px', c.bg)}
    <div class="content"><span class="eyebrow t">${t.eb}</span><h1 class="headline t">${t.head}</h1><div class="cols"><span class="rule" aria-hidden="true"></span><p class="body t">${t.body}</p></div></div>`)
}

// ---------------------------------------------------------------- plan
const COMPS = ['edLeft', 'edCenter', 'bigNum', 'splitH', 'splitV', 'iconHero', 'portraitR', 'portraitBand', 'quote', 'statRow', 'statHero', 'list', 'banner', 'card', 'diagonal', 'edRight', 'edBottom', 'stripeField', 'ruled', 'halfBlock', 'starField', 'listChecks', 'statStack', 'bannerStripe', 'twoCol']
// 25 distinct compositions x 2 palettes (navy/paper) = 50 UNIQUE (comp,palette)
// pairs, so no two posts share both a layout and a light/dark scheme. Topics and
// variants rotate independently to keep content fresh.
// Each square is authored independently in SQUARES (no topic rotation), in the
// same order as COMPS × [navy, paper]: post i uses composition COMPS[floor(i/2)]
// and alternates navy/paper. Editing one post never affects another.
const cfgs = SQUARES.map((t, i) => ({
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
console.log(`Generated ${written} square posts (${COMPS.length} distinct compositions)`)
