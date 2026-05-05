# Mark Norman for Oregon

Campaign site for Mark Norman, candidate for **Oregon House District 27** (Republican · 2026).
Built with Next.js (App Router), JavaScript (JSX), Tailwind CSS, and shadcn/ui-style primitives.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project rules

This repo follows two rule files — **read them before contributing**:

- [`.claude/rules/brand-rules.md`](./.claude/rules/brand-rules.md) — brand system: color, type, logo, layout, accessibility, pattern language. Distilled from `brand-guidelines.html`.
- [`.claude/rules/code-style.md`](./.claude/rules/code-style.md) — code style: stack, naming, components, styling, imports, error handling.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript (JSX) — no TypeScript
- **Styling:** Tailwind CSS only (no CSS files except `globals.css`)
- **Components:** shadcn/ui-style primitives in `src/components/ui/`
- **Fonts:** Cabin (display + body) + JetBrains Mono (eyebrows, code) via `next/font/google`

## Folder structure

```
src/
├── app/                  # App Router pages, layout, globals.css
├── components/
│   ├── ui/               # shadcn-style primitives (Button, Input, Label)
│   ├── layout/           # NavBar, SiteFooter
│   ├── brand/            # BrandMark
│   └── home/             # Home-page sections
├── lib/                  # cn() and utilities
└── constants/            # site.js — campaign metadata, nav, issues
```

## Brand at a glance

- **Colors:** Navy `#0B2844` · Red `#B62025` · Paper `#F5F2EC` — ratio 60·30·8·2.
- **Type:** Cabin 400/500/600/700. Display 84pt -2.5%. Body 16pt.
- **Logo:** locked unit. Never stretch, rotate, recolor, or container.
- **A11y:** WCAG 2.2 AA on every color pair. 16px web body. 44×44 tap targets.

## Disclosure

Paid for by Friends of Mark Norman PAC #24927.
