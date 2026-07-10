# IMPLEMENTATION_PLAN.md

> Phased roadmap to transform the theme into a premium, world-class Salla starter.
> **Governing rule:** the build (`pnpm run production`) stays green after every phase, and no Salla functionality is broken. Each phase is independently shippable and committable.

---

## Guiding principles

1. **Foundation before surface.** Tokens → typography → color → components → pages. You cannot make cards premium if there is no spacing/shadow/radius scale to make them *consistently* premium.
2. **Additive, not destructive.** New tokens are introduced *alongside* existing values, then existing values are re-pointed at tokens. Old Tailwind keys are kept as aliases so no class ever 404s.
3. **Spend boldness in one place** (per frontend-design skill). The signature move is a disciplined, editorial product presentation — not effects scattered everywhere.
4. **Verify every phase**: build green + spot-check the changed surface.

---

## Phase 0 — Analysis & Docs ✅ (this commit)

- `PROJECT_ANALYSIS.md`, `IMPLEMENTATION_PLAN.md`, `DESIGN_SYSTEM.md`.
- **No behavioral change.** Build already green.
- **Estimate:** done.

---

## Phase 1 — Design Token Foundation  ← **START HERE**

**Goal:** a single source of truth for every design value, wired through CSS custom properties + Tailwind, with zero visual regression.

- New `01-settings/_tokens.scss`: full CSS-variable token set (color scales, spacing, radius, shadow, border, z-index, transition, container, breakpoints) — see `DESIGN_SYSTEM.md`.
- Fix **D1**: restore an intentional brand color; stop the double-declaration. Keep `--color-primary` merchant-overridable (Salla injects it in `master.twig`), but provide a coherent neutral + accent scale around it.
- Extend `tailwind.config.js` to **reference the tokens** (`colors.brand`, `boxShadow.*`, `borderRadius.*`, `spacing.*`) while **keeping all existing keys** as aliases.
- Import `_tokens.scss` first in `app.scss`.

**Risk:** low (additive). **Verify:** build green; existing pages render identically except intended color correction. **Estimate:** ~0.5 day.

---

## Phase 2 — Typography System

**Goal:** premium, role-based type scale (display / heading / subheading / body / caption / label / button) with responsive steps.

- Populate the empty `01-settings/fonts.scss` → `_typography.scss` with a fluid type scale (`clamp()`), tracking, and weights.
- Utility classes `.type-display`, `.type-h1…h6`, `.type-body`, `.type-caption`, `.type-eyebrow` mapped to tokens.
- Re-point ad-hoc font sizes in header/footer/product to type utilities (non-breaking; same rendered sizes or intentionally improved).

**Risk:** low–medium. **Verify:** visual hierarchy on home/product/cart. **Estimate:** ~0.5 day.

---

## Phase 3 — Core Component Library (primitives)

**Goal:** the reusable UI kit the brief asks for, as tokenized SCSS component classes + a `COMPONENTS.md`.

- Buttons (elevate existing `.btn` system), Badge, Chip/Tag, Price, Rating, Stock badge, Discount badge, Skeleton, Empty-state, Section-title, Card shell, Newsletter, Trust-badge row.
- Consolidate duplicated price/rating logic (**D4**) into a single source where feasible (shared partial/helper) without changing Salla data flow.

**Risk:** medium. **Verify:** each primitive rendered on a real page. **Estimate:** ~1.5 days.

---

## Phase 4 — Header, Footer, Home Blocks

**Goal:** premium chrome + editorial home sections.

- Header: refined sticky behavior, spacing, mega-menu polish, animated search affordance, cart/wishlist/account icon system, mobile drawer polish. (Keep all `<salla-*>` and `custom-main-menu` intact.)
- Footer: fix heading hierarchy, remove dead markup, premium multi-column layout, newsletter + trust + payments.
- Home blocks: shared `s-block` wrapper + `section-title`; elevate hero slider, featured-products, banners, brands, testimonials.

**Risk:** medium. **Verify:** home + all block variants; RTL & LTR. **Estimate:** ~2 days.

---

## Phase 5 — Product Card, Product Page, Collection, Search

**Goal:** the money pages.

- Product card redesign (hover image transition, quick actions, discount/stock badges, skeleton, wishlist micro-interaction) — all within the existing `custom-salla-product-card` render contract.
- Product page: premium gallery, sticky purchase panel, trust/delivery section, related/recently-viewed (Salla sliders), reviews.
- Collection/index: premium filters (sticky + responsive drawer), sort, grid/list toggle.
- Search: elevate `<salla-search>` presentation (suggestions/trending/recent are Salla-driven).
- Additive **SEO**: Product / Breadcrumb JSON-LD.

**Risk:** medium–high (touches conversion). **Verify:** add-to-cart, variants, wishlist, filters all still function. **Estimate:** ~3 days.

---

## Phase 6 — Motion, A11y, RTL/LTR polish

- `prefers-reduced-motion` global guard; elegant, CSS-first micro-interactions.
- Restore **visible focus rings** (token-based) — reverses the global `outline:false` risk safely.
- WCAG AA contrast pass; keyboard nav; ARIA audit.
- Full RTL/LTR sweep across breakpoints (320→1920).

**Risk:** low–medium. **Estimate:** ~1 day.

---

## Phase 7 — Performance & Cleanup

- CSS diet: audit the 707 KiB `app.css`, trim safelist usage, remove unused SCSS/JS (**D7**).
- Image dimensions / `aspect-ratio` to kill CLS; font `preload` + `font-display: swap`.
- Address Sass `@import` deprecation path (**D8**) if low-risk.
- Lighthouse targets: Perf 95+, A11y 100, SEO 100, Best-Practices 100.

**Risk:** medium (purge can remove needed classes). **Verify:** Lighthouse + full regression. **Estimate:** ~1.5 days.

---

## Phase 8 — Documentation & Handover

- Finalize `README.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `COMPONENTS.md`, `THEME_STRUCTURE.md`, `CHANGELOG.md`.
- **Estimate:** ~0.5 day.

---

## Commit / Git strategy

- Conventional commits (`feat:`, `refactor:`, `docs:`, `perf:`, `a11y:`).
- One coherent, buildable commit per sub-milestone.
- Remote is `origin → github.com/hazem-e99/hazem-dev`. **Pushing is gated on explicit user go-ahead** (the brief also names `github.com/hazem-e99/salla-theme-hazem.git`; these differ, so I will confirm the target before any push).

---

## Total estimate

~12 working days across 8 phases. Phase 1 begins immediately after these docs.
