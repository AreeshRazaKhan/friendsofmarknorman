# Meta Pixel & Analytics Rules

This rule file documents how the Meta (Facebook) Pixel is wired into the
campaign site: how it boots, how it tracks route changes, the event
vocabulary, and the four component wrappers that fire events. Reuse these
patterns when adding tracking to a new page, CTA, or form.

Introduced in `d0371ee` (event tracking across pages and forms) and
`73d451a` (split the loader into a `<head>` component).

---

## Architecture Overview

```
.env.local
  NEXT_PUBLIC_META_PIXEL_ID / NEXT_PUBLIC_META_PIXEL_ENABLED
        ↓
src/app/layout.jsx
  <head>  <MetaPixelHead />     ← injects fbq() bootstrap + fbq('init', ID)
  <body>  <MetaPixel />         ← <noscript> beacon + route-change PageView
          <SiteAnalytics />     ← passive scroll / dwell / link tracking
        ↓
src/lib/analytics/meta.js       ← every event goes through a named helper
        ↓
Consumers:
  <TrackOnMount />        page/section view events
  <TrackedCTALink />      external + donate CTAs
  <TrackedInternalLink /> internal <Link> CTAs
  forms                   trackFormStart / trackLead / trackXComplete
```

### Files

| Purpose | Path |
|---------|------|
| Pixel bootstrap (head) | `src/components/analytics/meta-pixel-head.jsx` |
| Noscript + route tracker | `src/components/analytics/meta-pixel.jsx` |
| Passive site-wide tracking | `src/components/analytics/site-analytics.jsx` |
| Event helper library | `src/lib/analytics/meta.js` |
| Mount-time event emitter | `src/components/analytics/track-on-mount.jsx` |
| External / donate CTA link | `src/components/analytics/tracked-cta-link.jsx` |
| Internal CTA link | `src/components/analytics/tracked-internal-link.jsx` |
| Mount point | `src/app/layout.jsx` |

---

## CRITICAL RULES

### 1. Never call `window.fbq` directly outside `meta.js`

Every event fires through a named helper exported from
`src/lib/analytics/meta.js`. The helpers are the only place that touches
`window.fbq`, so the enabled-check, the `site_name` tag, and the
standard-vs-custom distinction stay in one place.

The two exceptions are `meta-pixel-head.jsx` (which *creates* `fbq`) and
the `RouteTracker` inside `meta-pixel.jsx` (which runs before the helper
layer is meaningful). Do not add a third.

### 2. Two env vars, and both are required

```
NEXT_PUBLIC_META_PIXEL_ID=<numeric pixel id>
NEXT_PUBLIC_META_PIXEL_ENABLED=true
```

- The `NEXT_PUBLIC_` prefix is mandatory — the pixel is a client-side
  script, so the values must be inlined at build time.
- `ENABLED` is compared to the **string** `'true'`. Any other value
  (including `1`, `TRUE`, or unset) disables the pixel.
- Both must be set. `metaEnabled()` requires `ENABLED === 'true'` **and**
  a non-empty `ID`.
- With either missing, `MetaPixelHead` and `MetaPixel` render `null`, and
  every helper is a no-op. **This is the current state of `.env.local` —
  neither var is set locally, so the pixel is inert in dev until they are
  added.** Nothing errors; tracking simply does not fire.
- These values are public by design (a pixel ID is visible in page
  source). They are not secrets — but they still belong in env, not
  hardcoded, so staging and production can differ.

### 3. The bootstrap script lives in `<head>`, the rest in `<body>`

`MetaPixelHead` is a **Server Component** (no `'use client'`). It renders
a raw `<script dangerouslySetInnerHTML>` inside `<head>` so `fbq` exists
before any client component tries to call it. Do not convert it to
`next/script` or move it into the body — that ordering is the entire
point of `73d451a`.

`MetaPixel` is the client half: the `<noscript>` tracking pixel and the
route-change listener. Both components are mounted in
`src/app/layout.jsx` and nowhere else.

### 4. Guard every helper — SSR-safe by construction

`metaEnabled()` checks `typeof window !== 'undefined'` first. Every
helper calls it and bails before touching `window.fbq`. Any new helper
must do the same:

```js
export const trackMeta = (event, params = {}, eventId) => {
  if (!metaEnabled() || !window.fbq) return
  const opts = eventId ? { eventID: eventId } : undefined
  window.fbq('trackCustom', event, params, opts)
}
```

### 5. Standard events vs custom events

| Helper | fbq call | Use for |
|--------|----------|---------|
| `trackStandard(event, params, eventId)` | `fbq('track', ...)` | Meta's **standard** event names only — `PageView`, `ViewContent`, `Lead`, `CompleteRegistration` |
| `trackMeta(event, params, eventId)` | `fbq('trackCustom', ...)` | Everything campaign-specific — `CTA_Click`, `DonateClick`, `ScrollDepth`, … |

Never pass a non-standard name to `trackStandard` — Meta silently drops
unrecognized standard events and they will not appear in Events Manager.

### 6. Every custom event carries `standardParams()`

```js
export const standardParams = (extra = {}) => ({
  site_name: SITE_NAME,          // 'mark_for_oregon'
  page_path: window.location.pathname,
  page_title: document.title,
  ...extra,
})
```

`SITE_NAME` is the shared tag that lets one Meta ad account segment this
site from the other properties in the account. Every helper except the
bare `trackPageView()` wraps its params in `standardParams`. Keep that
consistent when adding helpers.

### 7. Conversion events get an `eventId` for deduplication

Any event representing a conversion (`Lead`, and its paired custom
completion event) is fired with a freshly generated UUID passed as
Meta's `eventID`:

```js
const eventId =
  typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : undefined
trackLead({ form_name: 'volunteer' }, eventId)
trackVolunteerComplete({ form_name: 'volunteer' }, eventId)
```

**Both calls share the same `eventId` on purpose.** It is how Meta
deduplicates a browser-side pixel event against a future server-side
Conversions API event for the same submission. The `crypto.randomUUID`
existence check is required — it is undefined on non-secure origins.

---

## 1. Pixel Bootstrap — `meta-pixel-head.jsx`

Server component, rendered inside `<head>`:

```jsx
const ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ENABLED = process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === 'true'

const MetaPixelHead = () => {
  if (!ID || !ENABLED) return null

  return (
    <script
      id="meta-pixel"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s){ /* standard Meta snippet */ }
          (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${ID}');
        `,
      }}
    />
  )
}
```

**Rules:**

- The snippet body is Meta's own loader, verbatim. Do not reformat or
  "modernize" it — it is copy-paste from Events Manager.
- It calls `fbq('init', ID)` **only**. It does **not** fire the initial
  `PageView` — that is the route tracker's job (§2), so the first page
  load and every subsequent client navigation take the same code path.
- `dangerouslySetInnerHTML` is correct here and is the one sanctioned use
  of it in this codebase.

## 2. Route Tracking — `meta-pixel.jsx`

```jsx
const RouteTracker = () => {
  const pathname = usePathname()
  const search = useSearchParams()

  useEffect(() => {
    if (!ID || !ENABLED || typeof window === 'undefined' || !window.fbq) return
    window.fbq('track', 'PageView')
    window.fbq('track', 'ViewContent', { site_name, page_path, page_title })
  }, [pathname, search])

  return null
}
```

**Rules:**

- `RouteTracker` **must** stay wrapped in `<Suspense fallback={null}>`.
  `useSearchParams()` opts the subtree into client rendering, and without
  a Suspense boundary it de-opts the whole route to client-side rendering
  at build time.
- The effect depends on `[pathname, search]` — a query-string-only change
  counts as a new page view. That is intentional for UTM-tagged ad
  traffic landing on the same path.
- `PageView` fires here, not in the head snippet, because App Router
  client navigations never re-run the head script.
- The `<noscript>` beacon (`facebook.com/tr?id=…&ev=PageView&noscript=1`)
  is rendered alongside and covers script-blocked visitors on first load.

## 3. Passive Tracking — `site-analytics.jsx`

Mounted once in the layout. Adds three behaviors with **zero markup
changes** anywhere else in the app:

| Behavior | Event | Detail |
|----------|-------|--------|
| Scroll depth | `ScrollDepth` | Fires once each at 25 / 50 / 75 / 90 % |
| Dwell time | `EngagedVisit` | Fires at 30 / 60 / 120 s of *visible* time |
| Link clicks | `EmailClick` · `PhoneClick` · `Download` · `SocialLinkClick` · `OutboundLinkClick` | One delegated document click listener |

**Rules:**

- Scroll handling is throttled through `requestAnimationFrame` — never
  add an unthrottled scroll listener.
- The dwell timer ticks once a second and **skips ticks while
  `document.visibilityState !== 'visible'`**, so a backgrounded tab does
  not inflate engagement.
- All three per-page refs (`firedScrolls`, `engagedSeconds`,
  `firedEngagement`) reset on `[pathname, search]`. Milestones are
  per-page, not per-session.
- The click listener is registered in the **capture** phase on
  `document` so it still sees clicks on handlers that stop propagation.
  It uses `event.target.closest('a[href]')` and therefore covers every
  anchor on the site automatically, including ones inside
  `TrackedCTALink`.
- Link classification order is fixed: `mailto:` → `tel:` → download →
  internal (ignored) → social → outbound. First match wins.
- A link counts as a "download" if it has the `download` attribute, ends
  in a document extension (`pdf|zip|doc|docx|xls|xlsx|ppt|pptx|csv`), or
  lives under `/downloads/`. Keep new lead-magnet PDFs under
  `/downloads/` and they are tracked with no code change.
- Social hosts are derived from `SOCIAL_LINKS` in `src/constants/site.js`
  at module load, with `www.` stripped. Adding a platform to that
  constant is all that is needed — do not hardcode hostnames here.

---

## 4. Event Vocabulary (`src/lib/analytics/meta.js`)

### Standard events

| Helper | Event | Fired from |
|--------|-------|-----------|
| `trackPageView()` | `PageView` | route tracker |
| `trackViewContent(params, id)` | `ViewContent` | route tracker |
| `trackLead(params, id)` | `Lead` | every form on success |
| `trackCompleteRegistration(params, id)` | `CompleteRegistration` | available; not currently wired |

### Custom events

| Helper | Event | Typical params |
|--------|-------|----------------|
| `trackCTA` | `CTA_Click` | `cta_name`, `cta_location`, `destination_url` |
| `trackDonateClick` | `DonateClick` | `cta_location`, `donation_provider`, `destination_url` |
| `trackFormStart` | `FormStart` | `form_name` |
| `trackFormError` | `FormError` | `form_name` |
| `trackOutbound` | `OutboundLinkClick` | `destination_url`, `destination_domain` |
| `trackSocial` | `SocialLinkClick` | `destination_url`, `destination_domain` |
| `trackEmail` | `EmailClick` | `destination_url` |
| `trackPhone` | `PhoneClick` | `destination_url` |
| `trackDownload` | `Download` | `destination_url`, `destination_domain`, `file_name` |
| `trackScrollDepth` | `ScrollDepth` | `percent` |
| `trackEngagedVisit` | `EngagedVisit` | `seconds` |
| `trackIssuesView` | `IssuesView` | `content_category`, `content_name` |
| `trackVoterInfoView` | `VoterInfoView` | `content_category`, `content_name` |
| `trackVolunteerStart` | `VolunteerStart` | `form_name` |
| `trackVolunteerComplete` | `VolunteerComplete` | `form_name` + `eventId` |
| `trackEventRSVPComplete` | `EventRSVPComplete` | `form_name`, `event_name` + `eventId` |
| `trackNewsletterSignup` | `NewsletterSignup` | `form_name` + `eventId` |

**Naming rules:**

- Event names are `PascalCase` (`DonateClick`), except the legacy
  `CTA_Click`. Do not add new underscored names.
- Param keys are `snake_case` (`cta_location`, `form_name`).
- `form_name` values are snake_case and match the API route:
  `contact`, `volunteer`, `event_rsvp`, `ask_mark`, and the lead-magnet
  form's per-funnel `formName`.

---

## 5. Component Wrappers

### `<TrackOnMount />` — view events for a page or section

Fires one event in a `useEffect` on mount. Renders nothing.

```jsx
<TrackOnMount
  event="VoterInfoView"
  params={{ content_category: 'voter_info', content_name: 'five_minute_voter_guide' }}
/>
```

- The `kind` prop selects the fbq method: `'custom'` (default) or
  `'standard'`.
- Place it as the **first child** of the page fragment or section it
  describes.
- Current usages: `IssuesView` in `home/issue-grid.jsx`, `VoterInfoView`
  in `app/5-minute-voter-guide/page.jsx`.
- `params` sits in the effect's dependency array, so a new object
  identity re-fires it. Pass an object literal (stable across a mount) or
  a memoized object — never a value rebuilt on each render.

### `<TrackedCTALink />` — external links and donations

Wraps a plain `<a>`, forwards its ref, and fires `CTA_Click` on click.
When `ctaKind="donate"` it **also** fires `DonateClick`.

```jsx
<Button asChild variant="red">
  <TrackedCTALink
    ctaName="Donate"
    ctaLocation="meet_mark_donate"
    ctaKind="donate"
    href={donateUrl}
    target="_blank"
    rel="noopener noreferrer"
  >
    Donate
  </TrackedCTALink>
</Button>
```

- It renders an `<a>`, not a `Link` — use it for **external**
  destinations only (WinRed, social, third-party).
- `forwardRef` is required so shadcn/ui's `asChild` slot pattern works.
- Any `onClick` you pass is called *after* the tracking call — tracking
  never swallows the handler.
- `donationProvider` defaults to `'winred'`.

### `<TrackedInternalLink />` — internal navigation CTAs

Same contract, wrapping Next's `<Link>`. Fires `CTA_Click` only.

```jsx
<TrackedInternalLink ctaName="Volunteer" ctaLocation="hero" href="/volunteer">
  Volunteer
</TrackedInternalLink>
```

- Use this, never `TrackedCTALink`, for in-app routes — it preserves
  client-side navigation.
- Only wrap links that are genuinely **calls to action**. Plain nav
  links, footer links, and body-copy links stay as `<Link>`; the event
  stream would drown in `CTA_Click` otherwise.

### `cta_location` vocabulary

Existing values — reuse before inventing:

```
header · mobile_header · mobile_menu · hero
engagement_join · engagement_tier
meet_mark_donate · meet_mark_tier · meet_mark_closing
```

Pattern: `{page_or_section}_{purpose}`, snake_case. Global chrome uses
the bare surface name (`header`, `hero`).

---

## 6. Form Tracking Pattern

Every phone-collecting form follows the same three-beat pattern. The
contact form (`src/components/contact/contact-form.jsx`) is the
reference implementation:

**1. `FormStart` — once per form fill, on first interaction**

```jsx
const formStarted = useRef(false)

const handleFirstInteraction = () => {
  if (formStarted.current) return
  formStarted.current = true
  trackFormStart({ form_name: 'contact' })
}
```

The `useRef` latch is mandatory — without it every keystroke fires an
event. Wire `handleFirstInteraction` to the form's first focus/change.

**2. `Lead` (plus a form-specific completion event) — after a 2xx**

```js
if (!res.ok) throw new Error(`Request failed (${res.status})`)
const eventId =
  typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : undefined
trackLead({ form_name: 'contact' }, eventId)
```

Fire **after** the fetch resolves successfully, never on submit. A failed
submission is not a lead.

**3. Reset the latch in the success branch**

```js
form.reset()
setPhone('')
setSmsConsent(false)
formStarted.current = false
```

So a second submission from the same mounted form starts a fresh funnel.

### Per-form event map

| Form | Component | `form_name` | Events on success |
|------|-----------|-------------|-------------------|
| Contact | `contact/contact-form.jsx` | `contact` | `Lead` |
| Ask Mark | `ask/ask-form.jsx` | `ask_mark` | `Lead` |
| Volunteer | `volunteer/volunteer-signup.jsx` | `volunteer` | `Lead` + `VolunteerComplete` |
| Event RSVP | `events/rsvp-form.jsx` | `event_rsvp` | `Lead` + `EventRSVPComplete` (with `event_name`) |
| Lead magnets | `socialism-101/socialism-101-form.jsx` | per-funnel `formName` | `Lead` + `NewsletterSignup` |

The lead-magnet component is shared by `/socialism-101`,
`/5-minute-voter-guide`, and `/meet-mark` — its `formName` prop is what
distinguishes the three funnels in Events Manager.

### Compliance note

Tracking layers on top of the form pattern in
`forms-compliance-pattern.md` and `peerly-10dlc-compliance.md` — it never
alters it. In particular:

- **Never put PII in pixel params.** No email, phone, name, or ZIP. The
  helpers send `form_name` and page context only. Meta's Advanced
  Matching is **not** enabled and must not be added without legal review.
- Tracking calls never gate submission and never touch consent state.
- Do not fire a pixel event off the SMS consent checkbox.

---

## 7. Adding Tracking to Something New (Checklist)

**A new CTA link:**

1. [ ] Internal route → `<TrackedInternalLink />`; external → `<TrackedCTALink />`
2. [ ] `ctaName` is the visible button label
3. [ ] `ctaLocation` is an existing value from §5, or a new `{section}_{purpose}` snake_case one
4. [ ] Donation destination → add `ctaKind="donate"`
5. [ ] Under a shadcn `<Button asChild>` → the tracked link is the child, `<Button>` stays the parent

**A new page/section view event:**

1. [ ] Add a `trackX` helper to `meta.js` wrapping `trackMeta` + `standardParams`
2. [ ] Drop `<TrackOnMount event="…" params={{ content_category, content_name }} />` in as the first child
3. [ ] `params` is a stable object literal

**A new form:**

1. [ ] `formStarted` ref + `trackFormStart({ form_name })` on first interaction
2. [ ] `trackLead({ form_name }, eventId)` after a 2xx, with a `crypto.randomUUID()` id
3. [ ] Add a form-specific completion helper to `meta.js`, fired with the **same** `eventId`
4. [ ] Reset `formStarted.current = false` in the success branch
5. [ ] No PII in any param
6. [ ] `form_name` matches the API route slug

**A new download or social platform:** nothing to do. Put the file under
`public/downloads/` or add the URL to `SOCIAL_LINKS` — `site-analytics.jsx`
picks up both automatically.

---

## 8. Verifying

1. Set both env vars in `.env.local` and restart the dev server —
   `NEXT_PUBLIC_*` values are inlined at build time, so a hot reload is
   not enough.
2. Install the **Meta Pixel Helper** browser extension; it should show
   the pixel ID and a `PageView` on load.
3. Navigate client-side between routes — a second `PageView` +
   `ViewContent` must fire per navigation. If not, `RouteTracker` is not
   mounted or its Suspense boundary is missing.
4. Scroll to the bottom of a long page — expect four `ScrollDepth`
   events, one per threshold, no repeats.
5. Submit a form against the real API route — expect one `FormStart` and
   exactly one `Lead` carrying an `eventID`.
6. In Meta Events Manager, use **Test Events** with the browser's test
   code to confirm arrival, then check that custom events show the
   `site_name: mark_for_oregon` param.

With the env vars unset, none of the above fires — that is the correct
disabled state, not a bug.
