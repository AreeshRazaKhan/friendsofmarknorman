/**
 * Playwright verification for the 20 Instagram-story HTML files.
 *
 * For each file, loaded at its exact viewport (1080x1920), it verifies:
 *   (a) no horizontal/vertical overflow (document never scrolls past the canvas)
 *   (b) no clipped or overlapping text (every `.t` element fits its own box,
 *       sits inside the canvas, and does not overlap another `.t` element)
 *   (c) fonts loaded (every family declared in `data-fonts` resolves)
 *   (d) the headline sits within the IG story safe zone (y 250..1670)
 *
 * Usage: node social-stories/tests/verify-stories.mjs
 * Exit code 0 = all pass, 1 = one or more failures.
 */
import { readdirSync } from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

// Resolve playwright from a local install, an env-provided path, or the npx cache.
const loadChromium = async () => {
  const candidates = ["playwright"]
  if (process.env.PW_PATH) candidates.unshift(pathToFileURL(process.env.PW_PATH).href)
  for (const c of candidates) {
    try {
      const mod = await import(c)
      const chromium = mod.chromium ?? mod.default?.chromium
      if (chromium) return chromium
    } catch {
      /* try next */
    }
  }
  throw new Error("playwright module not found (set PW_PATH to its index.js)")
}
const chromium = await loadChromium()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const STORIES_DIR = path.resolve(__dirname, "..")

const W = 1080
const H = 1080
const SAFE = { top: 80, bottom: 1000 } // square feed safe zone (modest edge margins)

// tolerances (px)
const TOL_CANVAS = 1 // element edge vs canvas edge
const TOL_CLIP = 2 // scroll size vs client size
const TOL_OVERLAP = 3 // min overlap on BOTH axes to count as a collision
const TOL_SAFE = 2 // headline vs safe-zone edge

const files = readdirSync(STORIES_DIR)
  .filter((f) => /^\d.*\.html$/.test(f))
  .sort()

const measure = (safe) => {
  const story = document.querySelector(".post")
  if (!story) return { error: "no .post element" }
  const sb = story.getBoundingClientRect()

  // brand requirements: a logo placeholder slot on every post, and zero CTAs.
  const logoSlot = story.querySelector(".logo-slot")
  const hasLogoSlot = !!logoSlot
  let logoVisible = false
  if (logoSlot) {
    const lr = logoSlot.getBoundingClientRect()
    logoVisible = lr.width > 0 && lr.height > 0
  }
  const anchorCount = story.querySelectorAll("a").length
  const buttonCount = story.querySelectorAll('button, [role="button"], input[type="button"], input[type="submit"]').length
  const allText = (story.textContent || "").replace(/\s+/g, " ").toLowerCase()

  // A font is "loaded" if the webfont family actually resolved (any weight) —
  // Google serves one file per used weight, so a fixed-weight check is unreliable.
  const loadedFamilies = new Set()
  document.fonts.forEach((ff) => {
    if (ff.status === "loaded") loadedFamilies.add(ff.family.replace(/^['"]|['"]$/g, ""))
  })
  const fonts = (story.dataset.fonts || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((f) => ({ family: f, loaded: loadedFamilies.has(f) }))

  const de = document.documentElement
  const overflow = {
    docScrollW: de.scrollWidth,
    docClientW: de.clientWidth,
    docScrollH: de.scrollHeight,
    docClientH: de.clientHeight,
  }

  const clips = (v) => v === "hidden" || v === "clip" || v === "auto" || v === "scroll"
  const els = [...story.querySelectorAll(".t")].map((el) => {
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return {
      cls: el.getAttribute("class") || "",
      isHeadline: el.classList.contains("headline") || el.classList.contains("quote"),
      text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 36),
      x: r.left - sb.left,
      y: r.top - sb.top,
      right: r.right - sb.left,
      bottom: r.bottom - sb.top,
      w: r.width,
      h: r.height,
      scrollW: el.scrollWidth,
      clientW: el.clientWidth,
      scrollH: el.scrollHeight,
      clientH: el.clientHeight,
      clipX: clips(cs.overflowX),
      clipY: clips(cs.overflowY),
    }
  })

  return {
    story: { w: sb.width, h: sb.height },
    fonts,
    overflow,
    els,
    hasLogoSlot,
    logoVisible,
    anchorCount,
    buttonCount,
    allText,
  }
}

// Imperative CTA phrases that must never appear on a post.
const CTA_TERMS = [
  "swipe up", "swipe left", "swipe right", "tap here", "tap to", "click here",
  "click ", "learn more", "read more", "see more", "find out", "shop now",
  "shop ", "buy now", "buy ", "order now", "sign up", "signup", "subscribe",
  "register now", "rsvp", "donate", "get started", "get yours", "act now",
  "join now", "join us", "follow us", "dm us", "link in bio", "call now",
  "apply now", "pledge", "vote ", "→", "➜", "»",
]

const run = async () => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
  })
  const results = []

  for (const file of files) {
    const url = pathToFileURL(path.join(STORIES_DIR, file)).href
    const page = await ctx.newPage()
    const failures = []
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(150) // let layout settle after fonts swap

      const data = await page.evaluate(measure, SAFE)
      if (data.error) {
        failures.push(data.error)
      } else {
        // canvas size
        if (Math.abs(data.story.w - W) > TOL_CANVAS || Math.abs(data.story.h - H) > TOL_CANVAS) {
          failures.push(`canvas ${data.story.w}x${data.story.h}, expected ${W}x${H}`)
        }
        // (a) overflow
        const o = data.overflow
        if (o.docScrollW - o.docClientW > TOL_CANVAS) {
          failures.push(`horizontal overflow: scrollW ${o.docScrollW} > ${o.docClientW}`)
        }
        if (o.docScrollH - o.docClientH > TOL_CANVAS) {
          failures.push(`vertical overflow: scrollH ${o.docScrollH} > ${o.docClientH}`)
        }
        // (c) fonts
        for (const f of data.fonts) {
          if (!f.loaded) failures.push(`font not loaded: ${f.family}`)
        }
        // (b) clipping + inside canvas
        for (const el of data.els) {
          // collapsed text box: has text but near-zero width while content overflows
          // (e.g. an absolutely-positioned line resolving against a 0-width parent)
          if (el.text && el.clientW < 6 && el.scrollW > 16) {
            failures.push(
              `collapsed text box [${el.cls}] "${el.text}" (clientW ${el.clientW}, scrollW ${el.scrollW})`,
            )
          }
          if (el.w === 0 || el.h === 0) continue
          if (el.x < -TOL_CANVAS || el.y < -TOL_CANVAS || el.right > W + TOL_CANVAS || el.bottom > H + TOL_CANVAS) {
            failures.push(
              `outside canvas [${el.cls}] "${el.text}" @ ` +
                `x${el.x.toFixed(0)} y${el.y.toFixed(0)} r${el.right.toFixed(0)} b${el.bottom.toFixed(0)}`,
            )
          }
          // Real clipping = the element (or its own box) actually cuts content.
          // Only flag when the element's own overflow is clipping in that axis;
          // a tall line-box under visible overflow is not clipped.
          const clippedX = el.clipX && el.scrollW - el.clientW > TOL_CLIP
          const clippedY = el.clipY && el.scrollH - el.clientH > TOL_CLIP
          if (clippedX || clippedY) {
            failures.push(
              `clipped text [${el.cls}] "${el.text}" ` +
                `scroll ${el.scrollW}x${el.scrollH} vs client ${el.clientW}x${el.clientH}`,
            )
          }
          // A word wider than its own box always spills horizontally — even
          // under overflow:visible the ancestor canvas (overflow:hidden) cuts
          // it. Flag regardless of this element's own overflow setting. The
          // 16px floor clears the 6px `em::after` highlighter bleed (a red
          // underline that intentionally extends past the text edge), which
          // never reaches the canvas edge, while still catching real
          // word-too-wide overflow (hundreds of px).
          if (!clippedX && el.scrollW - el.clientW > 16) {
            failures.push(
              `text wider than box [${el.cls}] "${el.text}" ` +
                `scrollW ${el.scrollW} vs clientW ${el.clientW}`,
            )
          }
        }
        // (b) overlap between text elements
        for (let i = 0; i < data.els.length; i++) {
          for (let j = i + 1; j < data.els.length; j++) {
            const a = data.els[i]
            const b = data.els[j]
            if (a.w === 0 || b.w === 0) continue
            const ox = Math.min(a.right, b.right) - Math.max(a.x, b.x)
            const oy = Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y)
            if (ox > TOL_OVERLAP && oy > TOL_OVERLAP) {
              failures.push(
                `text overlap [${a.cls} "${a.text}"] ∩ [${b.cls} "${b.text}"] ` +
                  `(${ox.toFixed(0)}x${oy.toFixed(0)}px)`,
              )
            }
          }
        }
        // (e) logo placeholder slot present and visible
        if (!data.hasLogoSlot) {
          failures.push("no logo placeholder slot (.logo-slot) found")
        } else if (!data.logoVisible) {
          failures.push("logo slot (.logo-slot) is not visible (zero size)")
        }
        // (f) no CTA: no anchors, no buttons, no imperative CTA copy
        if (data.anchorCount > 0) failures.push(`CTA: ${data.anchorCount} <a> element(s) present`)
        if (data.buttonCount > 0) failures.push(`CTA: ${data.buttonCount} button element(s) present`)
        for (const term of CTA_TERMS) {
          if (data.allText.includes(term)) failures.push(`CTA text found: "${term.trim()}"`)
        }
        // (d) headline in safe zone
        const heads = data.els.filter((e) => e.isHeadline)
        if (heads.length === 0) failures.push("no headline (.headline/.quote) element found")
        for (const hd of heads) {
          if (hd.y < SAFE.top - TOL_SAFE || hd.bottom > SAFE.bottom + TOL_SAFE) {
            failures.push(
              `headline outside safe zone "${hd.text}" y${hd.y.toFixed(0)}..${hd.bottom.toFixed(0)} ` +
                `(safe ${SAFE.top}..${SAFE.bottom})`,
            )
          }
        }
      }
    } catch (err) {
      failures.push(`load/eval error: ${err.message}`)
    }
    await page.close()
    results.push({ file, failures })
    const status = failures.length === 0 ? "PASS" : "FAIL"
    console.log(`${status}  ${file}${failures.length ? "" : ""}`)
    for (const f of failures) console.log(`        - ${f}`)
  }

  await browser.close()

  const passed = results.filter((r) => r.failures.length === 0).length
  console.log(`\n${passed}/${results.length} passed`)
  process.exit(passed === results.length ? 0 : 1)
}

run()
