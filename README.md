# Igweagu Udogu Igbonine Gbulugbulu

The public website and membership platform for Igweagu Udogu Igbonine Gbulugbulu —
*The New Covenant · Ndi Gboo*.

**Milestone 1 (complete):** project setup, brand system, typography, logo integration,
responsive navigation, and the full public homepage.

**Milestone 2 (complete):** the remaining twelve public pages, shared editorial components,
a sourced public record, the gallery, membership and contact experiences, and full
documentation of content provenance.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with `@theme` design tokens |
| Motion | Framer Motion (restrained, reduced-motion aware) |
| Auth | **Firebase Authentication** (Milestone 3) |
| Database | **Firebase Firestore** (Milestone 3) |
| File storage | Firebase Storage for member photographs, gated by rules (Milestone 4) |
| Validation | Zod on every server boundary (Milestone 3) |
| Version control | Git |

> **Note on the data layer.** The original brief specified PostgreSQL + Prisma. The project
> owner has directed that this application use **Firebase** for authentication and the backend
> database. Relational guarantees therefore move from database constraints to Firestore
> security rules, server-side Zod validation, and transactional writes in trusted server code.
> Nothing in this repository depends on Prisma or PostgreSQL.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js config, zero warnings tolerated) |
| `npm run typecheck` | `tsc --noEmit` |

Node 20.9+ is required (developed on Node 24).

## Environment

Copy `.env.example` to `.env.local` and set the canonical origin:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

This origin is used for canonical URLs, Open Graph images and the sitemap. Without it the app
falls back to `http://localhost:3000`, which is correct for local development only.
Firebase variables are listed in `.env.example` but are not read until Milestone 3.
**No secrets are committed.**

## Routes

Every route is locale-prefixed; English (`/en`) is the only enabled locale.

| Route | Page |
| --- | --- |
| `/en` | Homepage |
| `/en/about` | About the house |
| `/en/history` | Our history, 1996 → the jubilee |
| `/en/igweagu-udogu` | Igweagu Udogu: prophecy, generation, first seven |
| `/en/vision-mission` | Vision, mission, objectives, principles |
| `/en/heritage` | Igbo heritage |
| `/en/programmes` | Programmes and initiatives, with status labels |
| `/en/leadership` | Leadership and institutional structure |
| `/en/news` | News and announcements, with search and category filters |
| `/en/news/[slug]` | Notice detail (three notices) |
| `/en/events` | Events: an empty upcoming state and the 2021 record |
| `/en/events/[slug]` | Event detail (one recorded event) |
| `/en/gallery` | Gallery with category filters and a keyboard-accessible viewer |
| `/en/membership` | Membership, registration details, first-seven rule |
| `/en/contact` | Channels and an email-draft enquiry form |
| `/en/credits` | Photography attribution (noindex) |
| anything else | Hard 404 (`src/app/404`), `noindex` |

`src/proxy.ts` rejects unsupported locale prefixes, unknown sections and unknown notice/event
slugs before the route renders. Under Cache Components a page-level `notFound()` runs after the
shell has streamed, which leaves a 200; the proxy keeps every missing page a genuine 404 with
server-rendered HTML.

## Architecture

```
src/
  app/
    layout.tsx              Root document, fonts, global metadata, skip link
    [locale]/               Locale segment — the only routable surface
      layout.tsx            Site header + footer, locale validation
      page.tsx              Homepage composition
      about/ history/ igweagu-udogu/ vision-mission/ heritage/
      programmes/ leadership/ news/[slug]/ events/[slug]/
      gallery/ membership/ contact/ credits/
      not-found.tsx         In-layout 404
      [...rest]/            Catch-all → in-layout 404
    404/                    Hard 404 surface used by the proxy
    not-found.tsx           Global 404 (outside locale routing)
    sitemap.ts, robots.ts   SEO endpoints (sitemap includes notices and events)
  proxy.ts                  Request-time 404 guard (locales, sections, slugs)
  components/
    brand/                  Official emblem
    layout/                 Header (dropdowns, mobile menu), footer, language switcher
    home/                   Homepage sections — including the film band and its modal
    editorial/              Page hero, breadcrumbs, sections, cards, timeline,
                            gallery viewer, notice search, contact form, empty state
    ui/                     Reveal, button, heading, icons, ornaments
  content/                  organisation, navigation, records, gallery, contact,
                            page images, media registry
  i18n/                     Locale config, dictionary loader, English dictionaries
  lib/                      cn(), canonical site URL, page metadata helper
```

### Copy and internationalisation

Every visible string lives in `src/i18n/dictionaries/en.ts`, which merges the homepage copy with
`en-pages.ts` (interior pages and shared labels). Components receive a typed slice of the
dictionary as props — none of them hard-code copy. To add Igbo:

1. Create `src/i18n/dictionaries/ig.ts` and `ig-pages.ts` with the same shape, fully translated.
2. Register the dictionary in `src/i18n/get-dictionary.ts`.
3. Add `"ig"` to `enabledLocales` in `src/i18n/config.ts`.

Routes, `hreflang`, the language switcher, sitemap entries and static params all derive from that
config. Until then Igbo renders as an unavailable option — never as partial or machine
translation.

Structured records that will move to Firestore — notices, events, gallery images, contact
channels — live in `src/content/` behind exported types. The page components read those types, so
swapping the source from a static module to a Firestore query does not change any page.

### Design tokens

Defined once in `src/app/globals.css` under `@theme`, derived from the official emblem:

| Token | Value | Use |
| --- | --- | --- |
| `--color-royal-800` | `#123B79` | Primary brand, deep sections |
| `--color-gold-500` | `#C6A04A` | Accents, rules, primary buttons |
| `--color-green-700` | `#17633F` | Heritage passages |
| `--color-ivory-100` | `#F8F5EC` | Page canvas |
| `--color-charcoal-900` | `#202521` | Body text, footer |

Gold is deliberately sparse: rules, diamonds, small labels, and calls to action only.

### The emblem

`public/brand/Igweagu.mp4` is the house's own film, supplied with the brand assets. It plays from
`src/components/home/film.tsx`, which sits directly under the hero: the thumbnail shows the film's
own opening frame, and the full recording loads only when the dialog opens. The dialog closes on
Escape, on its close control or on the backdrop, locks background scrolling, and returns focus to
the button that opened it. Nothing about the recording's date or contents is asserted on the page.

`public/brand/igweagu-emblem.jpg` is the supplied artwork, unmodified. Its warm-white ground is
part of the asset, so it is always placed on light surfaces (the header bar) — never masked,
cropped or recoloured. `src/app/icon.png` and `apple-icon.png` are square favicon crops padded
with the artwork's own white ground.

## Content status

The interior pages are written from the house's own public announcement of **23 September 2021**
and from its emblem. No achievements, office holders, dates, venues or contact details are
invented, and no ICSN material was used.

Where the house's record is silent or self-contradictory — the birth-year span, the jubilee year,
zonal directors — the pages say so rather than resolving it.

- [CONTENT-PROVENANCE.md](CONTENT-PROVENANCE.md) — source for every page, what was rewritten, what was omitted.
- [CONTENT-REVIEW.md](CONTENT-REVIEW.md) — claims awaiting confirmation and the editorial wording that needs approval.
- [CREDITS.md](CREDITS.md) — photography licences and attribution.

Contact details live in one place (`src/content/contact.ts`) and are consumed by the footer,
`/contact`, `/leadership` and `/membership`.

## Milestones

| # | Scope | Status |
| --- | --- | --- |
| 1 | Setup, tokens, typography, logo, navigation, homepage | **Complete** |
| 2 | Remaining public pages, content foundations | **Complete** |
| 3 | Firebase Auth, Firestore, membership registration | Not started |
| 4 | Member portal | Not started |
| 5 | Administrative dashboard, zone management | Not started |
| 6 | Security testing, performance, deployment, documentation | Not started |

### Planned Firebase data shape (Milestone 3)

Firestore collections, kept deliberately flat so rules stay auditable:

```
users/{uid}                  role, status, timestamps        (mirrors Auth user)
applications/{applicationId} applicant uid, full registration payload, status, review trail
members/{membershipNumber}   approved record — separate from the applicant account
zones/{zoneId}               senatorial zone, coordinators
locations/{locationId}       state → LGA → town / village
leadership/{appointmentId}   office, zone, term, confirmation reference
news/{postId}, events/{eventId}, media/{assetId}
notifications/{id}           per-user, server-written only
auditLogs/{id}               append-only, server-written only
consents/{id}                policy version, timestamp, user
```

Rules of the road for that milestone: applicants and approved members stay in separate
collections; membership numbers are assigned only by an approved administrative action; every
write that changes status is mirrored into `auditLogs`; Firestore rules enforce per-role and
per-zone access; no collection is publicly readable.

## Verification

Run after changes:

```bash
npm run typecheck
npm run lint
npm run build
```

Milestone 2 was verified against a production build: all 18 public URLs return 200 with a single
`<h1>`, a unique title, canonical and Open Graph metadata; the two 404 surfaces return 404 with
`noindex`; every internal link and every referenced image resolves; and the sitemap lists all
pages plus notice and event details.

Responsive checks ran in the browser against the same production build. `documentElement`
scroll width minus client width was 0 on all thirteen public routes at 375 px, and on `/`,
`/en/history`, `/en/gallery`, `/en/membership` and `/en/contact` at 390, 768, 1024 and 1440 px.
At 1440 px every desktop nav item renders on one line and the bar ends at 1423 px, inside the
viewport; below 1280 px Contact folds into the About menu, and below 1024 px the bar switches to
the mobile menu, which opens with all fifteen links, locks body scroll, and closes on Escape with
scroll restored.

**Known limitations**

- Screenshots were captured for About and History (`screenshots/`); later captures were blocked
  because the browser window was covered, so the remaining pages were verified by measurement and
  DOM inspection rather than by screenshot. A final human look at 375 / 390 / 768 / 1024 / 1440 px
  is still worth doing.
- `src/proxy.ts` lists the routable sections; a new page has to be added there as well as in the
  file-system route and in `src/content/navigation.ts`.
- The contact form deliberately opens a mail draft; it does not post anywhere until Milestone 3.
- Notices, events and gallery entries are static modules until Firestore is wired up.
- Photography is licensed placeholder work, not the house's archive.
