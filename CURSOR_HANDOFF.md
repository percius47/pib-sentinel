# PIB Sentinel — Cursor Handoff

Task list to continue in Cursor. Some work already started — see **Status** section.

**Deployed:** https://pib-sentinel-app.vercel.app
**Repo:** https://github.com/percius47/pib-sentinel
**Framework:** Next.js 16 (App Router, Turbopack), Tailwind CSS v4, Recharts, Lucide

---

## Tasks

### 1. Collapsible sidebar + full mobile responsiveness

**Selected element:**
```html
<aside class="fixed left-0 top-0 bottom-0 w-64 bg-bg-sidebar border-r border-border-subtle flex flex-col z-50">
```
File: `src/components/Sidebar.tsx`

**Requirements:**
- Sidebar should collapse to icon-only rail on desktop (toggle button)
- On mobile (`< md`): hidden by default, hamburger in header opens as overlay drawer
- Persist collapsed state in `localStorage`
- Main content margin should adapt: `ml-64` → `ml-16` when collapsed, `ml-0` on mobile
- All grids on the page need responsive breakpoints:
  - `grid-cols-4` → `grid-cols-2 md:grid-cols-4`
  - `grid-cols-3` → `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - `grid-cols-2` → `grid-cols-1 md:grid-cols-2`
- Header filters should collapse into a drawer on mobile (SlidersHorizontal button)
- Tables should horizontal-scroll on mobile

---

### 2. Sidebar highlighting broken + remove chevron arrow hint

**Symptom:** Only "Command Center" ever gets highlighted; other menu items stay unlit even after scroll.
**Cause:** `IntersectionObserver` in `Sidebar.tsx` sorts by `Math.abs(rect.top)` which almost always picks the top-most visible section. Replace with a simple scroll listener that finds the last section whose `offsetTop <= window.scrollY + 120`.

**Also:**
- Remove `<ChevronRight className="w-3 h-3 ml-auto text-accent-blue/50" />` — reads as "collapsible submenu" hint
- Keep the 3px active left-bar indicator, drop the arrow

---

### 3. Article detail view (click card → modal)

**Selected element:**
```html
<div class="glass-card p-5 animate-slide-in">
```
Path: `main.ml-64 > div > section#media-feed > div.space-y-3`
File: `src/app/page.tsx` → `ArticleCard` component (~line 248)

**Modal contents (rich detail view):**
- Large newspaper clipping placeholder (aspect-ratio 3:4, monochrome mock)
- Full headline + full article body (extended summary)
- **AI Analysis** panel: sentiment reasoning, why keyword systems misclassify
- **Impact:** which ministries affected, estimated reach (impressions), audience segments
- **Spread:** cross-outlet propagation timeline (mini timeline like NarrativeIntelligence has)
- **Related coverage:** 3-4 linked articles from same narrative
- **Historical context:** similar past stories with outcomes
- **Recommended actions:** 2-3 tactical bullets
- Metadata footer: source URL (fake), edition, date, page number, ministry-tag chips with confidence
- Close via X button, ESC key, backdrop click
- Add `role="dialog"`, `aria-modal="true"`

Extend `articles` in `src/data/mockData.ts` with the new fields. Each article needs `impact`, `estimatedReach`, `spreadTimeline`, `relatedArticles`, `historicalContext`, `detailedActions`, `fullBody`.

---

### 4. Narrative cross-reference matrix detail view

**Selected element:**
```html
<div class="glass-card p-5">
```
Path: `main.ml-64 > div > section#narratives > div.space-y-4`
File: `src/app/page.tsx` → `NarrativeIntelligence` component (~line 382)

**Modal contents:**
- Full narrative title + status badge (ESCALATING/SATURATED/STABLE)
- Sentiment breakdown per outlet (small table: Outlet | Tone | Reach)
- Complete percolation timeline (extend beyond what's shown in the card)
- Ministry impact matrix (which ministries mentioned, confidence)
- Velocity chart (bigger version of the sparkline, with X axis dates and Y axis mentions)
- Historical pattern match (from similar past narratives)
- Recommended communication response (priority, timeline, spokesperson)
- List of source articles that make up the cluster (links to open ArticleModal for each)

Add corresponding `narrativeDetails` map in `mockData.ts` keyed by narrative id.

---

### 5. Rebrand: kill the AI-marketing tone

**Header (currently):**
```
AI-Enabled 360° Media Intelligence System
Press Information Bureau • Government of India
```
**Replace with:** just `PIB Sentinel` + `Press Information Bureau • Government of India` subtitle. Nothing else.

**Section title renames (in `src/app/page.tsx` and `src/data/mockData.ts`):**

| Current | New |
| --- | --- |
| `AI Media Feed` | `Media Coverage` |
| `Narrative Intelligence` | `Narratives` |
| `Regional Intelligence` | `Regional Coverage` |
| `Early Warning System` | `Alerts` |
| `Cross-Platform Monitor` | `Cross-Platform` |
| `Message Penetration Analysis` | `Message Penetration` |
| `Misinformation Watch` | keep |
| `Ministry Briefing` | keep |
| `Command Center` | keep |

**Subtitle rewrites (strip marketing-speak):**

| Section | Current subtitle | New subtitle |
| --- | --- | --- |
| Command Center | Real-time media intelligence overview | Overview |
| Media Coverage | Contextually filtered articles with AI relevance scoring — not keyword matching | Filtered coverage across print, digital, and broadcast |
| Narratives | Story clustering, cross-outlet percolation tracking, and risk trajectory analysis | Story clusters and cross-outlet spread |
| Regional Coverage | State and region-wise media landscape with sentiment mapping and coverage gap detection | Regional coverage and gaps |
| Alerts | Predictive alerts with escalation probability and historical pattern matching | Active alerts and predicted escalations |
| Cross-Platform | Unified media intelligence across print, television, digital, and social platforms | Coverage across print, TV, digital, social |
| Message Penetration | Government communication effectiveness — intended message vs actual media pickup | Intended message vs actual media pickup |
| Misinformation Watch | Real-time tracking of false claims, verification pipeline, and counter-narrative recommendations | False claims tracker with verification status |
| Ministry Briefing | AI-generated daily intelligence brief for ministry officers | Daily brief for ministry officers |

**In-card language tweaks:**
- `AI Relevance: 97%` → `Relevance: 97%`
- `AI Analysis:` label → `Analysis:`
- `⚡ Smart Filter:` → `⚡ Filter note:`
- `Powered by PIB Fact Check Unit + AI Verification` → `PIB Fact Check Unit`
- `AI Confidence` KPI label → keep the metric but rename to `Confidence Score`
- `Generated by PIB Sentinel AI` footer in briefing → `PIB Sentinel • Confidence: 94.2%`

`sidebarItems` in `mockData.ts` labels need to change to match.

---

### 6. Theme: dark blue → true black + light mode toggle

**Currently:** Deep navy `#0a0e1a` base with heavy blue accent. Reads "AI startup pitch deck."

**New palette (dark, default):**
```
--bg-primary:   #000000
--bg-sidebar:   #000000
--bg-surface:   #0a0a0a
--bg-card:      #0f0f0f
--bg-card-hover:#161616
--border-subtle: rgba(255,255,255,0.08)
--border-strong: rgba(255,255,255,0.14)
--text-primary: #f5f5f5
--text-secondary:#a1a1aa
--text-muted:   #71717a
```
Keep functional accents (green/amber/red) but stop using accent-blue as the default background tint on cards and buttons. Neutral borders + white text should dominate; color only where it carries meaning (sentiment, risk, ministry chip).

**Light mode palette (activated via `<html data-theme="light">`):**
```
--bg-primary:   #ffffff
--bg-sidebar:   #fafafa
--bg-surface:   #f4f4f5
--bg-card:      #ffffff
--bg-card-hover:#f9fafb
--border-subtle: rgba(0,0,0,0.08)
--border-strong: rgba(0,0,0,0.14)
--text-primary: #09090b
--text-secondary:#52525b
--text-muted:   #a1a1aa
```

**Implementation:**
- Rewrite `src/app/globals.css` using CSS custom properties on `:root` and `:root[data-theme="light"]`, referenced by `@theme inline`
- New `ThemeToggle` button in header (Sun/Moon icon, swaps `data-theme` attribute on `<html>`, persists in `localStorage`)
- Ship a `ThemeProvider` (client component) that reads `localStorage` on mount and hydrates the attribute
- Every `bg-accent-blue/10` type class needs an audit — most should become `bg-white/5` (neutral)

---

### 7. Functional global filters (Ministry / Region / Media Type)

**Currently:** `<select>` elements in the header are dumb — no state, no effect.

**Target behavior:**
- Wire the three selects via a `FilterContext` (React context) at the layout level
- Filter state: `{ ministry: string, region: string, media: string }`
- Filtered datasets:
  - **Articles** (Media Coverage): match `ministryTags[].name` for ministry, `mediaType` for media. Region filter: articles don't have `region` field yet — add one to each article in mockData.
  - **Narratives** (Command Center table + Narrative Intelligence): match `ministries[]` for ministry
  - **Alerts:** filter by keyword-in-title-or-description for ministry (or add explicit `ministries[]` field — cleaner)
  - **Regional Intelligence:** filter to just the selected region
  - **Message Penetration:** if a ministry is selected, add per-message `ministry` field and filter
  - **Misinformation:** if a ministry is selected, filter by `ministries[]` (add field)
  - **Cross-Platform:** the tabs should respect the media filter — auto-select the tab matching the filter, or grey out the others
- Show an "active filter chip strip" below the header when any filter is active (with clear-all)
- Empty states: when filters produce zero results in a section, show "No items match current filters — Clear filters" call-to-action

**Files to touch:**
- Create `src/components/Providers.tsx` (context + provider) — wraps `children` in `layout.tsx`
- Refactor `src/app/page.tsx` to consume `useFilters()` in every section
- Extend `mockData.ts`: add `region: string` to articles, `ministries: string[]` to alerts / misinfo / messagePenetration

---

### 8. Change deployed URL to `pib-sentinel.vercel.app`

**Currently:** `pib-sentinel-app.vercel.app`
**Blocker:** During an earlier failed deploy, a ghost Vercel project called `pib-sentinel` was created that squats the desired domain.

**Steps:**
1. Log into https://vercel.com/dashboard
2. Find the ghost `pib-sentinel` project (likely has 0 or 1 failed deployment) — delete it
3. Open the working `pib-sentinel-app` project → Settings → rename to `pib-sentinel`
4. This auto-remaps the `.vercel.app` subdomain

Alternate: keep `pib-sentinel-app` as project name but add `pib-sentinel.vercel.app` as a domain alias under Settings → Domains.

---

## Status — what's already started

Some scaffolding is already in place from the previous session. Verify each file before editing:

- `src/app/globals.css` — **already rewritten** with black theme + light mode via `data-theme` attribute + responsive utilities. Review, don't re-do.
- `src/components/Providers.tsx` — **already created**. Exports `useTheme()`, `useFilters()`, `useSidebar()` hooks. Wraps three contexts.
- `src/components/Sidebar.tsx` — **already rewritten**. Collapsible desktop, mobile drawer, fixed highlighting via scroll listener (not IntersectionObserver), chevron removed.
- `src/components/Header.tsx` — **already created**. Uses filter context, mobile filter drawer, theme toggle, hamburger.

**NOT yet done:**
- `src/app/layout.tsx` still wraps with old sidebar directly — needs to wrap `{children}` in `<Providers>` and render `<Sidebar />` + `<Header />` alongside `{children}`. Main content class also needs to switch to a dynamic margin based on `useSidebar().collapsed`.
- `src/app/page.tsx` still uses the old inline header and does NOT consume filter/theme context. Needs full rewrite:
  - Delete inline header (move to `<Header />` in layout)
  - Wrap sections in filter-aware wrappers
  - Add `ArticleModal` + `NarrativeModal` state and click handlers
  - Update all grid classes for mobile responsiveness
  - Rename all AI-ish titles per table above
- `src/data/mockData.ts` — needs extension: `region` on articles, `ministries` on alerts/misinfo/messagePenetration, plus `articleDetails` and `narrativeDetails` maps for modal content
- `ArticleModal.tsx` and `NarrativeModal.tsx` — need to be created (new files)

---

## Design notes

- **Icons:** stay with `lucide-react`
- **Charts:** stay with `recharts`. Add `mounted` gate before rendering (SSR mismatch)
- **Icons stay monochrome** — colored icons contribute to the "AI startup" feel. Only use color for sentiment/risk/status indicators.
- **Cards:** subtle 1px border only, no gradient-border on every card. Reserve `gradient-border` for the threat banner and 1-2 focal cards.
- **Animations:** trim to `slide-in`, `fade-in`, `scale-in` for modals. The current `animate-pulse-glow` looks toy-ish.
- **Font:** Geist is fine, keep it.

---

## File map

```
pib-sentinel/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← needs update (wrap in Providers, render Header)
│   │   ├── page.tsx            ← major rewrite (contexts, modals, responsive)
│   │   └── globals.css         ← done
│   ├── components/
│   │   ├── Providers.tsx       ← done (theme, filter, sidebar contexts)
│   │   ├── Sidebar.tsx         ← done (collapsible, mobile, fixed highlight)
│   │   ├── Header.tsx          ← done (filters wired, theme toggle, mobile)
│   │   ├── ArticleModal.tsx    ← TODO
│   │   └── NarrativeModal.tsx  ← TODO
│   └── data/
│       └── mockData.ts         ← needs extension (see task 3, 4, 7)
├── AGENTS.md                   ← reminder: this Next.js has breaking changes; read node_modules/next/dist/docs/ before adding new APIs
└── package.json
```

---

## Quick commands

```bash
cd pib-sentinel
npm run dev              # local dev at http://localhost:3000
npm run build            # verify prod build passes
git add -A && git commit -m "…" && git push   # push triggers Vercel auto-deploy
```
