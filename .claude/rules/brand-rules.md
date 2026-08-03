---
name: Mark Norman for Oregon — Brand Rules
description: Authoritative brand rule set for the Mark Norman for Oregon (HD-27) campaign. Apply to every web page, component, mailer, social asset, and document in this repo.
type: brand-system
source: brand-guidelines.html
version: 1.0
campaign: Friends of Mark Norman · Oregon House District 27 · Republican · 2026
---

# Mark Norman for Oregon — Brand Rules

This file is the canonical brand rule set for everything built in this repo. The full visual specimen lives in `brand-guidelines.html`. This file translates those guidelines into rules an engineer or designer can apply directly. **Read this before writing markup, CSS, or copy.**

---

## 1. Brand Foundation — The Six Principles

Every design decision must reflect one or more of these. They describe the candidate (Navy veteran, longtime veterinarian, small-business owner) and shape tone, color, density, and copy.

1. **Practical, not partisan.** Lead with solutions, not slogans. Frame issues around the family at the kitchen table.
2. **Calm & steady.** Speak plainly. No outrage. Adults in the room.
3. **Experienced.** 30 years of service — Navy, vet, small business. Show it; don't lecture about it.
4. **Accountable.** Spend taxpayer dollars carefully. Measure results.
5. **Respectful.** Disagree without being disagreeable. Every voter, every time.
6. **Honest, brief, and earned.** Assume the reader is busy, smart, and skeptical. Earn the next sentence.

**How to apply:** when in doubt between two options, pick the one a tired voter at the kitchen table would prefer.

---

## 2. Color System

A palette of two. Navy is the foundation. Red is the accent. White breathes. Black anchors.

### Core tokens (use these CSS custom properties)

```css
:root{
  --navy:    #0B2844;  /* Primary · Foundation */
  --navy-2:  #102F4F;
  --navy-3:  #0F3C66;  /* Tint · Hover */
  --red:     #B62025;  /* Secondary · Accent */
  --red-2:   #921A1F;  /* Tint · Press */
  --red-3:   #D63D42;  /* On dark only */
  --white:   #FFFFFF;
  --black:   #000000;
  --paper:   #F5F2EC;  /* Default background */
  --paper-2: #EDE8DD;
  --bone:    #D4CCB7;  /* Surface · borders */
  --stone:   #5F594D;  /* Muted text */
  --stone-d: #3E3A33;  /* Body text on paper */
  --ink-soft:#1B3454;
  --hair:    rgba(11,40,68,0.18);
  --paper-78:rgba(245,242,236,.82);  /* Caption text on dark */
  --paper-65:rgba(245,242,236,.72);
}
```

### Usage ratio (load-bearing — do not deviate)

| Color | Share | Role |
|-------|------:|------|
| Navy  | 60%   | Foundation — backgrounds, primary type, primary CTAs |
| White | 30%   | Breathing room |
| Red   | 8%    | Accent — one thing at a time |
| Black | 2%    | Text anchors only |

**Rules:**
- Red is an accent, never a wash. Never use Red as a background for body copy.
- Critical information must never be conveyed by Red alone — pair with weight, label, or icon.
- Use `--red-3` only on dark (navy/black) backgrounds. On light backgrounds use `--red`.

### Required contrast (WCAG 2.2 AA minimum, AAA where listed)

| Pair                | Ratio | Use |
|---------------------|------:|-----|
| Navy on Paper       | 13.4  | Body + display (AAA) |
| Paper on Navy       | 15.1  | Body on dark canvas (AAA) |
| Black on Paper      | 19.3  | Long-form body (AAA) |
| Navy on White       |  7.8  | Large + body (AAA) |
| Red on Paper        |  5.6  | Body — accents only (AA) |

Any new color pair must clear AA at body size. Verify before shipping.

---

## 3. Typography

**One typeface: Cabin** (Pablo Impallari, 2010 — SIL OFL, hosted on Google Fonts). Mono companion: **JetBrains Mono** for eyebrows, code, ratios, and tags.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
--ff:      'Cabin', sans-serif;
--ff-mono: 'JetBrains Mono', monospace;
```

### Weights (only these four)

400 Regular · 500 Medium · 600 SemiBold · 700 Bold. Italic is reserved for emphasis and short, human moments — most often italic 400 in red as a one-or-two-word accent in a headline (e.g. *for Oregon.*).

### Type scale

| Token   | Size  | Weight | Tracking | Use |
|---------|------:|--------|---------:|-----|
| Display | 84pt  | 700    | -2.5%    | Yard signs, hero |
| H1      | 54pt  | 700    | -2%      | Section openers, mailers |
| H2      | 34pt  | 600    | -1%      | Card headers |
| H3      | 22pt  | 600    |  0       | Sub-sections |
| Body    | 16pt  | 400    | 1.65 lh  | Paragraphs, web copy |
| Caption | 13pt  | 400    |  0       | Disclosures, captions |
| Eyebrow | 11pt  | 600    | .28em up | Mono · uppercase tags |

### Typography rules

- **Never mix any other typeface with Cabin.** Cabin is the brand.
- **Never drop body type below 12pt in print.** Respects older voters.
- **Web body minimum: 16px.**
- **No italic anywhere on the site.** All copy is upright.
- **Emphasis is red, not italic.** Display headlines use a red phrase at weight 400 (or matching the surrounding weight): `<h1>Mark Norman <em>for Oregon.</em></h1>` with `em { font-style:normal; font-weight:400; color:var(--red); }`.

---

## 4. Logo Usage

The mark is a **single, locked unit**: stacked name, red star, "for", office line ("OREGON HOUSE DISTRICT 27"), party affiliation ("REPUBLICAN"). Reproduce at scale. Never rebuild, redraw, or recompose from parts.

### Approved backgrounds
- On Navy (inverted) — hero
- On White — default
- On Red — sparingly
- On Paper — default printed
- On tinted dark surface (Navy-3) — inverted
- Compact lockup — minimum 70px height

### Clearspace
Minimum clearspace on every side = **X**, where X = the cap-letter height of "MARK NORMAN".

### The six things you must NOT do
1. Don't stretch.
2. Don't rotate.
3. Don't put inside a container/circle/badge that isn't the approved sticker.
4. Don't flip.
5. Don't recolor.
6. Don't apply effects (blur, shadow, gradient, glow).

---

## 5. Layout & Spacing

### Grid
- **12-column asymmetric grid** for every surface (web, mailer, social).
- Layouts are intentionally asymmetric — heavy on one side, breathing on the other.
- Bento composition keeps the eye moving. Different sizes, one rhythm.

### Spacing scale (4pt base)
| Token | Value |
|-------|------:|
| XS    |  4px  |
| SM    |  8px  |
| MD    | 16px  |
| LG    | 32px  |
| XL    | 64px  |
| XXL   | 96px  |

Use these — do not invent intermediate values.

### Diagonal energy
Headlines, badges, and pull-quotes may rotate **2–7°** to inject motion. The grid stays straight; only content leans. **Body copy never rotates.**

### Canvas/page chrome
- Page tag: top-left, mono, 10px, .28em letter-spacing, uppercase, with a 34px red rule before it.
- Page foot: bottom, mono, 10px, .22em, uppercase, top hairline border.
- Section watermark (`.wm`): the section number rendered at ~340px in `rgba(11,40,68,.045)` (or `rgba(182,32,37,.10)` on dark) as a non-interactive backdrop.

---

## 6. UI Components

Every component is built from the same color, type, and spacing tokens. **One primary action per screen.**

### Buttons
- Pill shape: `border-radius: 999px`.
- Padding: `14px 28px` (default) · `10px 22px` (small).
- Type: Cabin 600 · 12px · `.16em` letter-spacing · uppercase.
- Border: `1.5px solid var(--navy)`.
- Variants:
  - `.btn.primary` — Navy bg, Paper text. **The default.**
  - `.btn.red` — Red bg, Paper text, Red border. High-emphasis CTAs (Donate, Sign Up).
  - `.btn.ghost` — transparent, Navy text/border.
  - `.btn.invert` — Paper bg, Navy text, Paper border. For use on Navy.
- Tap target ≥ **44 × 44px**.

### Navigation
- **Always 5 links max.** (Sample set: About · Issues · Endorse · Events · Donate.)
- Logo wordmark on the left, links on the right, hairline divider above.

### Cards / Issue tiles
- White background, Bone 1px border, 28px padding, 6px radius.
- Top-left: 60×3px red accent bar (`::before`).
- Icon: 42×42 navy circle with paper text, 18px below it the title.

### Forms
- Labels are mono · 10px · `.18em` · uppercase · red · 600.
- Inputs: 12×14 padding, Bone border, Paper-2 background, Cabin 14px, 4px radius.
- **Placeholder is never a substitute for a label.** Always provide both.

### Hero tiles
Navy bg, Paper text, oversized 36px H3 with red italic emphasis, supporting paragraph at `--paper-78`, terminal arrow disc 46×46 with 1.5px paper border.

---

## 7. Accessibility (load-bearing)

The brand must be just as legible in a kitchen at dawn as on a phone in bright Oregon sun.

- Web body text **≥ 16px**. Print body **≥ 12pt**.
- Every approved color pair clears **WCAG 2.2 AA** at body size.
- **Focus state visible on every interactive element**: 2px red outline + 2px paper offset. Never `outline:none` without a replacement.
- **Color is never the only signal.** Pair red with weight, label, or icon.
- Tap targets **≥ 44 × 44px** (WCAG 2.5.5).
- Decorative images: `alt=""`. Informative images: a sentence of alt text.
- Every campaign video ships with English captions and a transcript.
- Form labels are never visually hidden without an `aria-label` equivalent.
- Critical information never relies on Red alone — Navy is primary, Red is emphasis.

---

## 8. Photography & Imagery

Authentic, naturally lit, never overproduced.

**Do:**
- Shoot in natural daylight whenever possible.
- Eye-level. Candid. Listening, not posing.
- True skin tones — no orange grading.
- Show the hands of working Oregonians.
- Crop tight. Clean backgrounds.
- Mark in the room with constituents. The dogs (Doug the sheepadoodle leads) when natural.

**Don't:**
- Stiff suit-and-podium shots.
- Heavy color grading or fake skin tones.
- Generic stock photography. **Ever.**
- Background clutter, busy crowds, mid-blink.
- Flag-draped backgrounds. Restraint over rah-rah.

---

## 9. Design Pattern Language

Six unified motifs sharing one rule book: **45° angles · 12–24px rhythm · navy/red palette only.**

| # | Pattern | Spec | When to use |
|---|---------|------|-------------|
| 01 | **Civic Stripe Field** | 45° red pinstripes 2px / 24px gap, layered over halftone 14px | Hero quotes, door hangers, full-bleed event backdrops |
| 02 | **Tilted Stamp** | Sticker rotated `-6deg`, 8/8/0 navy hard shadow, no soft blur | Tagline drops, one-line CTAs |
| 03 | **Ballot Marks** | 2px red corners, 20×20px | Letterheads, briefings, donor packets |
| 04 | **Star Constellation** | Red stars on navy, three sizes (22/14/10px), scattered | Quotes, testimonials |
| 05 | **Diagonal Wedge** | clip-path triangle, 55% area, navy on paper | Cover, business card, Thank You |
| 06 | **Typographic Banner** | Cabin 700 · 56px · -2.5% tracking, paper on navy | Closing of long-form pages, mailer footers |

### Pattern rules (do not break)
- **One motif per layout.** Never combine stripes + halftone + stars in the same frame.
- Patterns sit **behind** copy, never on top of it.
- Decorative density caps at **40% of frame area**.
- All patterns use 45° angles, navy & red only, 12–24px rhythm.

---

## 10. Voice & Copy

- Lead with a verb. Cut adjectives.
- Headlines are short and declarative. Use a red italic emphasis on the most important word/phrase.
- Sample headline pattern: *Practical leadership for Oregon families.*
- Tagline: **Service · Solutions · Accountability.**
- Never speak in outrage. Never ridicule opponents. The candidate is the adult in the room.
- Disclosure on every print piece: **Paid for by Friends of Mark Norman PAC #24927**.

---

## 11. Quick reference (cheat sheet)

**Colors:** Navy `#0B2844` · Red `#B62025` · Paper `#F5F2EC` · Bone `#E2DCCC` · Black `#000000` — ratio 60·30·8·2.

**Type:** Cabin 400/500/600/700 · Display 84pt -2.5% · H1 54pt · Body 16pt · Eyebrow 11pt mono uppercase.

**Always:**
- One primary action per screen.
- Navy 60% / White 30% / Red 8% / Black 2%.
- Pair Red with weight, label, or icon.
- Hit WCAG 2.2 AA on every color pair.
- Rotate badges 5–8° for energy. Never rotate body copy.
- Sign every print piece with the PAC disclosure.

**Never:**
- Recolor, stretch, rotate, or container the logo.
- Use Red as a background for body copy.
- Put critical info in Red alone.
- Use stock photography or staged podium shots.
- Mix any other typeface with Cabin.
- Drop body type below 12pt in print.

---

## 13. Editorial Micros (v1.1 add-on)

A small set of signature micro-patterns. Use them consistently — they are the "tells" that make every page recognizably ours.

### 13.1 Bracket eyebrows

Every section is labelled with a square-bracket eyebrow in mono caps:

```
[ where mark stands ]
[ about mark / 03 ]
[ questions ]
```

- Lowercase content, single space inside each bracket.
- Optional `/ NN` suffix to carry a section number.
- Style: `font-mono · 11px · 600 · uppercase · tracking-[0.22em] · text-red`.
- The brackets are part of the label, not decoration — never use them around buttons or body copy.

### 13.2 Oversized stat numerals

Credibility statistics use a fat numeral with a `+` prefix and a small descriptor below.

```
+22         +28         +30         +4
years       years        years      dogs
U.S. Navy   vet practice in district at home
```

- Numeral: Cabin 700 · clamp(40px, 4.5vw, 64px) · -2.5% tracking · navy on paper / paper on navy.
- Plus sign: 60% size of the numeral, red, baseline-aligned.
- Descriptor: mono · 10–11px · 600 · uppercase · `tracking-[0.22em]` · stone (or paper-78 on dark).
- Up to four stats per row. Never more.

### 13.3 Soft image masks

Photography wrappers move from sharp 6px corners to soft editorial radii:

| Use | Radius |
|-----|-------:|
| Hero / portrait feature | `rounded-[2rem]` (32px) |
| Card thumbnails | `rounded-2xl` (16px) |
| Inline / tile imagery | `rounded-md` (6px — unchanged) |

Pair with a 1.5px navy or paper border to keep the edges crisp. **Never** combine soft masks with a hard-stamp shadow on the same image — pick one.

### 13.4 Asymmetric ratios

Two-column layouts must lean — never 50/50.

| Pattern | Ratio (text : image) |
|---------|---------------------:|
| Editorial hero/about | 1 : 1.2 (image side wins) |
| Quote + portrait | 1.4 : 1 (text side wins) |
| Form + supporting copy | 1.1 : 1 |

The "heavy" side should also carry the section's pattern motif (halftone, stripe, wedge); the "light" side stays clean.

### 13.5 Text-coded social icons

Footer social links are typeset, not iconographic:

```
FB · IG · X · YT
```

- Mono · 11px · 600 · uppercase · tracking-eyebrow.
- Hover: text-red.
- 44px tap target via `inline-flex min-h-[44px] items-center px-2`.
- Order matches priority of platform for the campaign.

### 13.6 Whitespace rhythm

Section vertical padding scales with content density:

| Section type | Mobile | Desktop |
|--------------|-------:|--------:|
| Hero | `py-24` | `py-32` |
| Editorial section | `py-20` | `py-28` |
| Compact strip (stats, pillars) | `py-14` | `py-20` |
| FAQ / list | `py-20` | `py-28` |

Generous padding is part of the brand. **Never tighten below these floors** — density is for the data, not the chrome.

---

## 14. A2P 10DLC / TCPA compliance (load-bearing — do not break)

This site is registered (or registers) for A2P 10DLC SMS through The Campaign Registry (TCR). Carrier review checks the live site against an industry checklist. **Every change to a form, footer, or legal page must preserve every item below**, or registration will be rejected and SMS traffic blocked.

### 14.1 Required pages

- `/privacy-policy` — must include the legal entity name (`Friends of Mark Norman`), an SMS section covering what numbers are collected for, how they're used, retention, and deletion requests, and the explicit non-sharing statement.
- `/terms-of-service` — must include all six carrier-required elements: program name + description, STOP, HELP, carrier-liability disclaimer, message/data-rates and frequency, link to Privacy Policy.

Both pages must respond 200 (no 404s) and link to each other. Footer links to both must appear on **every** page.

### 14.2 SMS consent on every form that collects a phone number

- **One optional consent checkbox** carrying the approved combined consent statement. (This supersedes an earlier two-checkbox informational + promotional split — see `peerly-10dlc-compliance.md` §3. Do not restore the two-box pattern.)
- Placed at the **bottom of the form, above the submit button** — never adjacent to the phone field.
- **Not pre-checked.**
- The label must include: legal entity name, use case, message frequency disclosure, message-and-data-rates disclosure, donation-request disclosure, STOP, HELP, and a Privacy Policy link.
- Use the shared `<SmsConsent />` component — never re-implement.

### 14.3 Footer requirements (every page)

- Copyright with legal entity name (`© YEAR Friends of Mark Norman`).
- Phone, email, and mailing address all visible.
- Privacy Policy link.
- Terms of Service link.
- PAC disclosure (`Paid for by Friends of Mark Norman PAC #24927`).

### 14.4 Legal entity name consistency

The legal entity name `Friends of Mark Norman` (single source: `LEGAL.entity` in `src/constants/site.js`) must appear identically in:

1. Privacy Policy
2. Terms of Service
3. SMS consent checkbox language
4. Footer copyright
5. Contact page

DBA/casual names (e.g. "Mark Norman", "the campaign") are fine for marketing copy elsewhere — but never substitute them in the five locations above. Mismatched names are a top A2P rejection reason.

### 14.5 Active opt-in language only

**Superseded — see `peerly-10dlc-compliance.md` §2–§3.** This section previously required **"I agree to receive…"** and forbade passive forms. The consent copy now in use is the client-approved Peerly statement ("By providing your telephone number and checking this box, you consent to…"), which is explicit express consent tied to an affirmative, un-prechecked checkbox action. Do not rewrite it into the active voice to satisfy this section.

### 14.6 Peerly layer

This site also registers for peer-to-peer texting through Peerly, which adds requirements on top of everything above: a verbatim carrier disclaimer next to every phone-collecting form, mandatory donation language, a selectable full Privacy Policy URL, and a ban on marketing/sweepstakes wording sitewide. See **`peerly-10dlc-compliance.md`** before touching any form, footer, or legal page.

---

## 12. Campaign metadata

| | |
|--|--|
| Office | Oregon House District 27 |
| Party | Republican |
| Cycle | 2026 |
| Tagline | Service · Solutions · Accountability |
| Domain | markfororegon.com (canonical; marknormanfororegon.com redirects here) |
| Email | mark@markfororegon.com |
| Committee | CI-0189 |
| PAC | #24927 |
| Disclosure | Paid for by Friends of Mark Norman PAC #24927 |
