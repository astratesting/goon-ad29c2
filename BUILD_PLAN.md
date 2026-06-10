# Goon — Build Plan

## 1. PRODUCT

Goon is a marketing landing page for an AI-powered landing-page generator that turns a single text prompt into a polished, production-ready landing page for non-technical entrepreneurs. The page itself is the product demo: visitors experience the same dark, analytical aesthetic and luminous-accent language that Goon's output promises, so the marketing site *is* proof-of-capability. The core value is collapsing weeks of back-and-forth with designers, copywriters, and Webflow/Framer consultants into one prompt → one published page. The primary user is the solo operator or 1–10-person business who can describe their offer in a paragraph but cannot (and will not) wireframe, design, or write conversion copy. The specific pain it solves is the multi-day, multi-tool, multi-freelancer tax of getting a credible page live — the marketing site has to answer, in under ten seconds of scroll, "can this thing actually do it for me?"

## 2. WHO IT'S FOR

The ICP is a time-and-money-constrained non-technical founder, freelancer, or local-services operator, 25–45, who has already tried (and abandoned) at least one traditional builder. They are skeptical of hype, allergic to jargon, and judge software by visual polish within the first scroll. The marketing page must therefore:

- Lead with a **concrete outcome** ("describe your offer, get a landing page in 60 seconds") before any feature talk.
- Use the **design system itself as the testimonial** — there are no fake logos or quote cards; instead, the page *looks* like a Goon output.
- Be **densely legible on mobile** (most ICP traffic is mobile) with a single-column fallback and 44px+ tap targets.
- Speak in **plain, direct copy**: short sentences, second person, zero "synergize / leverage / unlock."
- Show the **mechanism** (prompt → generated sections → published URL) in a visual demo, not in abstract feature icons.

Tone: confident, slightly technical, never breathless. Like a senior engineer explaining the tool to a smart friend, not a SaaS growth page.

## 3. LOOK & FEEL

### 3.1 Visual System

- **Vibe / positioning**: dark analytical dashboard aesthetic crossed with a sci-fi cartographic atlas. Think Linear's clarity + Vercel's restraint + the data-viz language of Observable. Luminous accents read as *signal*, not decoration. Generous negative space; content breathes; nothing screams.
- **Color palette** (CSS variables, no inline hex):
  - `--ink-0: #050507` (page background, slightly bluer than pure black)
  - `--ink-1: #0a0a0a` (section surfaces)
  - `--ink-2: #111114` (cards)
  - `--ink-3: #1a1a1f` (borders, hairlines)
  - `--line: #232328` (dividers)
  - `--text-hi: #f4f4f5` (primary text)
  - `--text-mid: #a1a1aa` (secondary)
  - `--text-lo: #52525b` (tertiary / metadata)
  - `--indigo: #4f46e5` (primary accent, brand mark, focus rings)
  - `--cyan: #06b6d4` (data motifs, gradient midpoint)
  - `--teal: #14b8a6` (CTA end-stop, success states)
  - Gradient: `linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #14b8a6 100%)` — used for the wordmark, primary CTA, and the atlas lines.
- **Typography**:
  - Display / H1–H2: **Space Grotesk** 600/700, tight tracking (-0.02em), large sizes (clamp 2.75rem → 5.5rem on hero).
  - Body: **Inter** (fallback to system-ui), 15–17px, leading 1.6, neutral 400, semibold 600 for inline emphasis.
  - Accents / code / timestamps / numerics: **JetBrains Mono** 400/500, used for prompt snippets, version stamps, "1 prompt → 6 sections" labels, footer micro-text.
  - Type scale: 12 / 13 / 14 / 15 / 17 / 20 / 24 / 32 / 40 / 56 / 80 (px), defined as Tailwind theme extensions.
- **Spacing / layout**:
  - 8px base grid. Sections pad `py-20 md:py-32`. Container `max-w-6xl` for content, `max-w-7xl` for the hero.
  - Hairlines (`1px solid var(--ink-3)`) separate sections instead of heavy backgrounds.
  - Two-column layouts collapse to single column at `md` (768px) breakpoint.
- **Key components** (built as primitives in `components/ui/`):
  - `<Button variant="primary|ghost|mono" size="sm|md|lg">` — primary uses the gradient with a subtle inner glow `shadow-[0_0_24px_-6px_rgba(79,70,229,0.6)]`.
  - `<Hairline />` — 1px line with optional gradient variant for emphasis.
  - `<Tag />` — JetBrains Mono, 11px uppercase, `--text-mid` text, `--ink-2` bg, rounded-sm. Used for section labels ("01 / Prompt", "02 / Generate").
  - `<AtlasGrid />` — full-bleed SVG background: faint isometric grid with glowing longitude/latitude lines, animated parallax on scroll (CSS only, no JS).
  - `<PromptMock />` — terminal-styled card showing a sample prompt and the streaming generated output.
  - `<SectionLabel n="01" title="Prompt" />` — numbered section headers in mono.
  - `<FAQItem />` — `<details>`/`<summary>` based, with a JetBrains Mono `+ / −` glyph that rotates.
  - `<Footer />` — three-column with mono micro-text.
- **Iconography**: **Lucide** icons only, 16/20/24px, stroke 1.5, color `--text-mid` default. No filled icons. Icons sit in 1px square rounded outlines when used in feature cards.
- **Imagery**:
  - No stock photos. No fake avatars. No fake logos.
  - All "visuals" are either (a) the atlas grid background, (b) mock UI screenshots built in HTML/CSS, or (c) the prompt-mock demo.
  - Mock UI screenshots use the *same* Tailwind tokens as the page, slightly desaturated, with a soft inner shadow to feel screen-like.
- **Interaction / motion**:
  - All animations are CSS / Framer Motion with `prefers-reduced-motion: reduce` opt-out.
  - Hero headline: gradient text with a slow `background-position` shift (12s loop).
  - Atlas lines: opacity oscillates 0.2 ↔ 0.45 over 8s.
  - Section reveals: 12px translateY + opacity, 600ms ease-out, IntersectionObserver, one-shot.
  - Buttons: 150ms scale 0.98 on press, gradient brightens on hover.
  - Cursor on the atlas region is the default `crosshair` to reinforce the "you are inside the tool" feeling.
  - No parallax scroll-jacking; no autoplay video; no carousels.

### 3.2 Screen-by-Screen Layout

The product is a single long-scroll page with these sections, top to bottom. Each section is a `<section>` with `id`, numbered `aria-label`, and consistent vertical rhythm.

**A. Top Nav (`<Header>`, sticky, `h-14`, `bg-ink-0/80 backdrop-blur-md border-b border-ink-3`)**
- Left: Goon wordmark (gradient text, Space Grotesk 600, 18px) + a JetBrains Mono `v0.1` tag.
- Center: anchor links — Product, How it works, Pricing, FAQ — 14px Inter, `--text-mid`, hover `--text-hi`.
- Right: "Sign in" (ghost) + "Join waitlist" (primary gradient). On mobile, nav links collapse into a sheet triggered by a Lucide `Menu` icon.

**B. Hero (`#hero`, `min-h-[88vh]`)**
- Background: full-bleed `<AtlasGrid />`, fixed attachment, dark vignette at top/bottom.
- Centered content, max-w-3xl:
  - Tag: `// LANDING PAGES · GENERATED` (mono, indigo).
  - H1 (Space Grotesk 700, gradient text): **"Describe your offer. Get a landing page."**
  - Sub (Inter 18px, `--text-mid`): One sentence: "Goon turns one paragraph about your business into a polished, conversion-tested landing page in under a minute — no designer, no Figma, no agency."
  - Inline `<PromptMock />` card beneath the sub: a fake terminal showing
    ```
    > goon generate --prompt "Indie SaaS for solo lawyers, $29/mo"
    ✓ analyzing offer… ✓ drafting 6 sections… ✓ writing copy… ✓ applied design system
    → yourpage.goon.so
    ```
    Text appears with a 1.2s streaming animation on mount (skipped on reduced-motion).
  - Primary CTA row: `<Button size="lg">Join the waitlist</Button>` + secondary "See how it works ↓" (anchors to `#how`).
  - Below CTA, mono micro-line: "no credit card · 3 free generations on launch · cancel anytime".

**C. Trust strip (no fake logos — replaced with neutral honesty)**
- A single hairline-bordered row of **what's true right now**: "Built in public · v0.1 · Used by the team · 0 churn because there are 0 customers yet" — this last item is **not** shown. Instead, the strip shows three JetBrains Mono facts: `private beta · 0 third-party trackers · open changelog` separated by `·` dividers. This satisfies the "no fake metrics" rule while still giving the visual rhythm of a trust strip.

**D. How it works (`#how`, 3 numbered steps)**
- Section header: `<SectionLabel n="01" title="How it works" />` + H2 "Three steps. One prompt."
- Three-column grid (stacks on mobile). Each card: `bg-ink-1 border border-ink-3 rounded-lg p-6`, 20px Lucide icon in a 1px square outline at top-left, then `01 / PROMPT` mono tag, then bold title, then 2-line description.
  - 01 — **Describe your offer.** "Type what you sell, who it's for, and the price. A paragraph is enough."
  - 02 — **Goon generates.** "Six sections, written and laid out by the model. You watch it draft in real time."
  - 03 — **Publish in one click.** "Get a `goon.so/your-handle` URL. Custom domain on the Pro plan."

**E. Feature grid (`#features`, 2×3 = 6 cards)**
- Section header: `<SectionLabel n="02" title="What's in the box" />` + H2 "Everything a landing page needs, generated in one pass."
- Six cards, identical structure to the how-it-works cards, but with a small inline mock element (built in HTML/CSS, not an image) at the top:
  1. **Hero & headline** — mock: gradient headline + sub.
  2. **Social proof blocks** — mock: three "logos" rendered as mono-text placeholders `[ LOGO ]` (honest: shows they're placeholders, not fake real brands).
  3. **Pricing table** — mock: 3-tier table with one tier highlighted via the gradient border.
  4. **FAQ accordion** — mock: a collapsed FAQ item showing the same `<details>` styling.
  5. **Email capture** — mock: an input + primary button inside a bordered card.
  6. **SEO & meta** — mock: a code block showing `<title>`, `<meta description>`, OG tags in JetBrains Mono.

**F. Live demo (`#demo`, full-bleed)**
- Section label `03 / DEMO`.
- Heading: "Watch a page write itself."
- Below: a 16:9 aspect-ratio frame, `bg-ink-1 border border-ink-3 rounded-xl overflow-hidden`, containing a side-by-side mock:
  - Left half: a JetBrains Mono prompt input with caret blinking, "Indie SaaS for solo lawyers, $29/mo" typed in.
  - Right half: a streaming preview where the 6 sections appear top-to-bottom with a 300ms stagger on viewport entry.
- Beneath the frame, a mono caption: "→ 18 seconds elapsed · 6 sections drafted · 0 lines of CSS written by a human".

**G. Pricing teaser (`#pricing`)**
- Section label `04 / PRICING`.
- H2: "Simple. Generous on the free tier."
- Two cards, equal height, `bg-ink-1`:
  - **Free** — $0 — 1 published page, goon.so subdomain, Goon watermark, all 6 section types.
  - **Pro** — $19/mo — unlimited pages, custom domain, remove watermark, priority generation queue, export to HTML.
- The **Pro** card has the gradient border (1px solid transparent + `background-clip: padding-box, border-box` trick) and a small mono badge `RECOMMENDED` in the corner.
- Below the cards: "Pricing is final at launch — locked in for everyone on the waitlist." (subtle, in `--text-mid`).

**H. FAQ (`#faq`, `<details>` list, single column, max-w-3xl)**
- Section label `05 / FAQ`.
- 8 questions, plain copy. Topics: who it's for, what it produces (HTML/CSS vs React), can you edit the output, custom domains, refund policy, data handling, roadmap, how to give feedback.
- Each `<FAQItem />` has a top hairline, 20px padding, summary in Inter 16px semibold, content in `--text-mid`.

**I. Final CTA (`#waitlist`)**
- Full-bleed, centered, `py-32`. Atlas grid background at 30% opacity.
- H2: "Stop describing. Start shipping." (gradient text, but more restrained than the hero — single line, no animation).
- Sub: "Get early access. We'll email you when a slot opens."
- Form row: email input (`bg-ink-1 border border-ink-3 rounded-md h-12 px-4`, 320px wide) + primary button "Request access". Below, mono micro-line: "We send 0 marketing emails. One email per release, max."
- On submit, the form row replaces itself with a JetBrains Mono success state: `✓ you're on the list — #00427`. The number is honest: it counts actual waitlist signups, so the first render shows `#?????` until the API responds.

**J. Footer**
- 3-column grid on desktop, stacks on mobile.
  - Col 1: wordmark + one-line "Made by humans, generated by Goon."
  - Col 2: links — Product, Pricing, Changelog, Status, Privacy.
  - Col 3: links — Twitter/X, GitHub, Email.
- Bottom hairline, then mono micro-row: `© 2025 Goon · v0.1.4 · built in [city redacted]`.

### 3.3 Responsive behavior

- `sm` (640px) and below: hero H1 clamps to 2.5rem, single column everywhere, nav collapses to sheet, prompt mock hides the streaming animation and shows final state, pricing cards stack.
- `md` (768px): 2-column grids appear, H1 clamps to 3.5rem.
- `lg` (1024px): full layout, H1 clamps to 4.5–5.5rem.
- All tap targets ≥ 44×44px on mobile.

## 4. USER FLOWS

**Flow 1 — Visitor reads and converts (the only flow)**
1. Land on `/` from any source → Atlas grid + hero fade in within 200ms (no blocking animations).
2. Read H1 + sub in <5s. Optional: watch the prompt mock stream.
3. Scroll past the trust strip → how-it-works → features → demo (some visitors skip, that's fine).
4. Reach pricing → FAQ → final CTA.
5. Submit email at `#waitlist` form.
   - States:
     - **idle**: empty input, primary button enabled.
     - **invalid**: input border turns `#ef4444`, helper text "Enter a valid email" in mono.
     - **submitting**: button shows JetBrains Mono spinner glyph `…` and is disabled.
     - **success**: row swaps to `✓ you're on the list — #00427` (number from API).
     - **error**: row swaps to `! something went wrong — try again` with a "Retry" ghost button.
6. Confirmation persists across reload via localStorage key `goon_waitlisted=1` so the form stays in success state.

**Flow 2 — Returning visitor**
1. Land on `/` → header CTA changes from "Join waitlist" to "You're in ✓" (read from localStorage), links still functional.
2. Anchor deep-links work: `/#pricing`, `/#faq`, `/#demo` all scroll to the right section with a `scroll-margin-top: 56px` to clear the sticky header.

**Flow 3 — Mobile nav**
1. Tap `Menu` icon → sheet slides in from the right (`translate-x-full` → `translate-x-0`, 200ms).
2. Tap a link → sheet closes, page scrolls to anchor.
3. Tap outside or `Esc` → sheet closes.

**Flow 4 — Reduced motion**
- All animations disabled: hero gradient is static, atlas grid is static, prompt mock shows final state, no reveal on scroll, no streaming.

## 5. PAGES / ROUTES

This is a public marketing page — one primary route, plus a tiny set of supporting routes.

| Route | Purpose | Layout / UI |
|---|---|---|
| `/` | The marketing landing page described in §3.2, composed of all sections A–J. | Single long-scroll page, sticky header, sections A–J in order. |
| `/changelog` | Honest, public list of releases. | Two-column: left = version list (mono dates), right = entry. Each entry: version tag, date, bulleted changes. No "improvements" filler — only shipped items. |
| `/privacy` | Privacy policy. | Single column, `prose` typography, `max-w-2xl`. |
| `/api/waitlist` (POST) | Accepts `{ email }`, validates, appends to Supabase `waitlist` table, returns the row's sequential position. | Returns `{ ok: true, position: 427 }` or `{ ok: false, error }`. |
| `/api/waitlist/count` (GET) | Returns the current waitlist size for the `#00427` style display. | Returns `{ count: 427 }`. |
| `/sitemap.xml`, `/robots.txt` | Standard. | Auto-generated by `next-sitemap` or a route handler. |
| `/404` | Not found. | Centered: "This route isn't on the atlas." + "Back to /" link. |

No `/dashboard`, `/login`, `/app` routes — the product is the marketing page itself for v0.1.

## 6. CORE FEATURES

Every feature below must work end-to-end on day one. No placeholders that 404.

1. **Sticky header with anchor navigation**
   - Works: clicking any nav link smoothly scrolls to the section, header remains visible, URL hash updates.
   - Active section is highlighted (Indigo underline) based on IntersectionObserver.
   - Mobile sheet opens/closes with `Esc`, focus trap, restores focus on close.

2. **Atlas grid background**
   - Full-bleed `<svg>` with isometric grid (lon/lat lines) + a few highlighted "data points" (small cyan dots with a soft glow).
   - Two intensities: hero uses `opacity-100`, final CTA uses `opacity-30`.
   - Pure CSS / SVG, no JS, no asset weight beyond the inline SVG.

3. **Prompt-mock terminal (hero)**
   - A static-styled card that simulates a CLI session. On mount, text appears with a staggered typewriter effect (CSS animation, 12ms per char), then a blinking caret persists.
   - Respects `prefers-reduced-motion`: shows final state instantly.

4. **Section reveal on scroll**
   - Each section's children (heading, cards) fade-in + translate-up 12px on first intersection. One-shot per section. Implemented with `IntersectionObserver` in a single `useReveal` hook.

5. **FAQ accordion**
   - Native `<details>`/`<summary>` for accessibility and zero-JS. Custom `+` / `−` glyph in JetBrains Mono, rotates 45° on open.

6. **Pricing teaser**
   - Two cards, Pro card has gradient border via the padding-clip trick. No toggles, no "billed monthly/annually" — kept intentionally simple, honest about the v0.1 product.

7. **Live demo frame**
   - Static HTML/CSS mock of the prompt-to-page flow. Six section stubs stream in on intersection (IntersectionObserver + CSS animation-delay). Caption below updates a JetBrains Mono counter from `00.0s` to `18.4s` during the stream.

8. **Waitlist form**
   - Client-side email regex validation.
   - POST to `/api/waitlist`. On success, shows position `#00427` from server response.
   - Persists `goon_waitlisted=1` in localStorage so the form stays dismissed on reload and the header CTA changes to "You're in ✓".
   - Server-side: rate-limit by IP (5/hr, in-memory bucket is fine for v0.1, but document the upgrade path to Upstash).

9. **Count badge for header / final CTA**
   - On the final CTA success state, the position number comes from `/api/waitlist`. Header reads `/api/waitlist/count` on mount and renders `· 427 on the list` in mono next to the wordmark.

10. **Changelog page**
    - Reads from a local `content/changelog.json` (committed to the repo) — no CMS, no DB.
    - Each entry: `{ version, date, items: string[] }`. Renders newest first.

11. **SEO & meta**
    - Per-route `<title>` and `<meta>` via Next.js Metadata API.
    - OG image generated at build time as a static PNG (or a route handler that renders a React OG card) — shows the gradient wordmark, H1, and the atlas grid.
    - JSON-LD: `Organization` schema on `/`, `FAQPage` schema on `/#faq` (extracted from the FAQ items).

12. **Analytics (privacy-respecting, optional)**
    - Plausible or a self-hosted Umami via a single `<script async>` in the root layout. No cookies, no consent banner needed. If neither is set up at launch, the `<script>` tag is omitted entirely rather than pointing to a fake dashboard.

## 7. DATA MODEL

Only two persistent entities. Storage is Supabase Postgres.

**`waitlist`**
| field | type | notes |
|---|---|---|
| `id` | `uuid` PK | default `gen_random_uuid()` |
| `email` | `citext` UNIQUE NOT NULL | case-insensitive, lowercase |
| `position` | `integer` UNIQUE NOT NULL | assigned by trigger: `nextval('waitlist_position_seq')` |
| `created_at` | `timestamptz` | default `now()` |
| `referrer` | `text` nullable | `Referer` header, truncated to 200 chars |
| `user_agent` | `text` nullable | truncated to 200 chars |
| `ip_hash` | `text` nullable | SHA-256 of IP + a server-side salt, for rate-limit only |

Indexes: unique on `email`, unique on `position`, btree on `created_at`.

**`changelog`** is **not** a DB entity — it's a committed JSON file at `content/changelog.json` because (a) it's written by the team, not users, (b) it should be version-controlled, and (c) it doesn't need a CMS for v0.1.

```json
[
  { "version": "0.1.4", "date": "2025-01-12", "items": ["Added waitlist position numbers", "Fixed mobile nav focus trap"] }
]
```

No users, no sessions, no orgs — the public page has no auth (see §8).

## 8. AUTH

**No auth on this site.** The marketing page is fully public. The "Sign in" button in the header is a stub: it points to `/#waitlist` with the label "Sign in" crossed out and replaced with "Get early access" until a real app exists. This avoids implementing NextAuth.js v5 or Supabase Auth for a surface that has no logged-in state in v0.1.

When the real Goon app ships later, auth will be **Supabase Auth** (email magic link) — explicitly not Clerk, not NextAuth — because the data already lives in Supabase and we want one client, one RLS story. The landing page's `/api/waitlist` endpoint will be the only route that touches Supabase until then, and it will use the **service-role key server-side only** (never exposed to the client).

## 9. FILE TREE

```
goon/
├── app/
│   ├── layout.tsx                  # Root layout: fonts, metadata, theme tokens, atlas background mount
│   ├── page.tsx                    # Marketing landing page, composes sections A–J
│   ├── globals.css                 # Tailwind base + CSS variables (color tokens, gradient, type scale)
│   ├── not-found.tsx               # 404 page
│   ├── changelog/
│   │   └── page.tsx                # Changelog list, reads content/changelog.json
│   ├── privacy/
│   │   └── page.tsx                # Privacy policy
│   ├── api/
│   │   └── waitlist/
│   │       ├── route.ts            # POST: validate, insert, return position
│   │       └── count/
│   │           └── route.ts        # GET: return { count }
│   ├── sitemap.ts                  # next-sitemap or hand-rolled
│   ├── robots.ts                   # robots.txt
│   └── opengraph-image.tsx         # Generated OG image
├── components/
│   ├── ui/
│   │   ├── Button.tsx              # primary/ghost/mono variants
│   │   ├── Hairline.tsx            # 1px divider, plain + gradient variants
│   │   ├── Tag.tsx                 # JetBrains Mono uppercase tag
│   │   ├── SectionLabel.tsx        # "01 / How it works" header
│   │   ├── AtlasGrid.tsx           # SVG isometric background
│   │   ├── PromptMock.tsx          # Hero terminal mock
│   │   ├── FAQItem.tsx             # <details>-based accordion
│   │   ├── FeatureCard.tsx         # Card primitive for features/steps
│   │   └── GradientText.tsx        # Headline with the brand gradient
│   ├── sections/
│   │   ├── Header.tsx              # Sticky nav + mobile sheet
│   │   ├── Hero.tsx                # Section B
│   │   ├── TrustStrip.tsx          # Section C
│   │   ├── HowItWorks.tsx          # Section D
│   │   ├── Features.tsx            # Section E
│   │   ├── Demo.tsx                # Section F (live demo frame)
│   │   ├── Pricing.tsx             # Section G
│   │   ├── FAQ.tsx                 # Section H
│   │   ├── WaitlistCTA.tsx         # Section I (final CTA + form)
│   │   └── Footer.tsx              # Section J
│   └── motion/
│       └── useReveal.ts            # IntersectionObserver hook for one-shot reveals
├── lib/
│   ├── supabase.ts                 # Supabase client (server-side, service role)
│   ├── supabaseAdmin.ts            # Typed admin client for /api/waitlist
│   ├── rateLimit.ts                # In-memory IP bucket (5/hr)
│   ├── waitlist.ts                 # insertWaitlist(), getCount() — server-only
│   └── seo.ts                      # JSON-LD builders (Organization, FAQPage)
├── content/
│   └── changelog.json              # Committed changelog entries
├── public/
│   ├── favicon.svg                 # Wordmark in indigo
│   └── og-fallback.png             # Static OG fallback
├── supabase/
│   └── migrations/
│       └── 0001_waitlist.sql       # Table + sequence + indexes + RLS (deny all to anon)
├── tailwind.config.ts              # Theme extensions: colors, fontFamily, fontSize
├── next.config.mjs
├── package.json
└── .env.local                      # SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (gitignored)
```

## 10. ACCEPTANCE

- [ ] `npm run dev` boots the site at `http://localhost:3000` with no console errors.
- [ ] Lighthouse on `/`: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 100 (mobile, throttled).
- [ ] Hero, how-it-works, features, demo, pricing, FAQ, final CTA, and footer are all visible in that order on a single scroll.
- [ ] Sticky header changes background opacity on scroll past 8px and highlights the active section.
- [ ] All anchor links scroll smoothly, update the URL hash, and respect `scroll-margin-top` so the section header isn't hidden under the sticky bar.
- [ ] Mobile sheet opens/closes via tap, `Esc`, and outside-click; focus is trapped while open and restored on close.
- [ ] Atlas grid renders behind hero (full opacity) and final CTA (30% opacity) as separate instances.
- [ ] Hero prompt-mock streams text on mount and shows the final state instantly under `prefers-reduced-motion: reduce`.
- [ ] Section reveal animations run once and only once per section.
- [ ] FAQ uses native `<details>` and is fully keyboard-operable (Tab to focus summary, Enter/Space to toggle).
- [ ] Pricing teaser renders two cards; Pro card has the gradient border and `RECOMMENDED` badge.
- [ ] Waitlist form:
  - [ ] Rejects invalid emails with an inline error.
  - [ ] POSTs to `/api/waitlist`; success state shows a real position number from the server.
  - [ ] Persists `goon_waitlisted=1` in localStorage; on reload, the form stays dismissed and the header CTA reads "You're in ✓".
  - [ ] Rate limit: 6th submission from the same IP within an hour returns 429 with a mono error message.
- [ ] `/api/waitlist/count` returns a real number from the `waitlist` table.
- [ ] `/changelog` renders entries from `content/changelog.json`, newest first, in mono.
- [ ] `/privacy` renders with `prose` styling.
- [ ] `/404` renders the "off the atlas" copy.
- [ ] `<title>` and `<meta description>` are set per route; `/#faq` page source includes a valid `FAQPage` JSON-LD block.
- [ ] OG image renders the gradient wordmark + H1; `og:image` meta is present and points to a 1200×630 PNG.
- [ ] No testimonials, no customer logos, no avatars, no fabricated user counts anywhere on the page. The header count badge is omitted on first paint and only appears after `/api/waitlist/count` resolves; the final-CTA success position is a real number from the DB.
- [ ] No `Clerk` import anywhere in the repo. No `next-auth` dependency in `package.json`.
- [ ] Supabase service-role key is read only on the server (no `NEXT_PUBLIC_*` prefix, no client import).
- [ ] `prefers-reduced-motion: reduce` disables: hero gradient shift, atlas opacity oscillation, section reveals, prompt-mock streaming, demo section streaming, all transitions.
- [ ] All tap targets ≥ 44×44px on viewports ≤ 640px.
- [ ] All colors used in the UI are defined as CSS variables or Tailwind theme tokens — no inline hex outside `globals.css` and the OG image.
- [ ] Site is fully responsive at 360px, 768px, 1024px, and 1440px without horizontal scroll.

FILES: ["app/layout.tsx","app/page.tsx","app/globals.css","app/not-found.tsx","app/changelog/page.tsx","app/privacy/page.tsx","app/api/waitlist/route.ts","app/api/waitlist/count/route.ts","app/sitemap.ts","app/robots.ts","app/opengraph-image.tsx","components/ui/Button.tsx","components/ui/Hairline.tsx","components/ui/Tag.tsx","components/ui/SectionLabel.tsx","components/ui/AtlasGrid.tsx","components/ui/PromptMock.tsx","components/ui/FAQItem.tsx","components/ui/FeatureCard.tsx","components/ui/GradientText.tsx","components/sections/Header.tsx","components/sections/Hero.tsx","components/sections/TrustStrip.tsx","components/sections/HowItWorks.tsx","components/sections/Features.tsx","components/sections/Demo.tsx","components/sections/Pricing.tsx","components/sections/FAQ.tsx","components/sections/WaitlistCTA.tsx","components/sections/Footer.tsx","components/motion/useReveal.ts","lib/supabase.ts","lib/supabaseAdmin.ts","lib/rateLimit.ts","lib/waitlist.ts","lib/seo.ts","content/changelog.json","supabase/migrations/0001_waitlist.sql","tailwind.config.ts","public/favicon.svg"]