# PROJECT_ANALYSIS.md

> Deep analysis of the current Salla theme (fork of the official **theme-raed**) prior to the premium redesign.
> Generated before any code changes. The build was verified to compile successfully (`pnpm run production` → 9 warnings, 0 errors) so this is our known-good baseline.

---

## 1. Architecture Overview

This is a fork of Salla's official **Raed** starter theme (`"name": "theme-raed"`, `v1.358.0`). It is a mature, professionally-structured theme — **not** amateur code. The redesign strategy is therefore **enhancement, not rescue**: we keep the solid bones (Twig data contracts, Twilight web components, ITCSS layering) and invest almost entirely in the **design layer** (tokens, typography, spacing, color, motion, component polish).

### Tech stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Templating | **Twig** (Salla Twilight server-rendered) | 44 `.twig` files. Data comes from Salla; we must never break the variable contracts documented in each file's header comment. |
| Components | **Twilight web components** (`<salla-*>`) | Cart, search, wishlist, user-menu, product-options, comments, rating, etc. are Salla-owned custom elements. We style *around* them; we don't reimplement them. |
| Styling | **SCSS** in strict **ITCSS** order + **TailwindCSS 3.4** via `@apply` | 37 `.scss` files. Tailwind classes are consumed inside SCSS with `@apply` "to simplify the DOM" (per `app.scss` header). |
| JS | **ES classes**, Babel-transpiled, bundled by **Webpack 5** | 24 source `.js` files. Page-scoped classes extend `BasePage` and self-initialize via `initiateWhenReady([pages])`. |
| Build | **Webpack 5** + `mini-css-extract` + `css-minimizer` + Salla `ThemeWatcher` | Multi-entry (see below). Output → `public/`. |
| Package mgr | **pnpm** (enforced via `only-allow`) | |

### Build entry points (`webpack.config.js`)

`app` (global css+js+wishlist+blog), `home`, `product-card`, `main-menu`, `wishlist-card`, `add-product-toast`, `digital-files`, `checkout` (cart+thankyou), `pages` (loyalty+brands), `product` (product+products), `order`, `testimonials`. **These entry names are contracts** — twig files reference them via `{{ 'name.js'|asset }}`. Renaming an entry breaks a page.

### SCSS layering (ITCSS — already correct)

```
01-settings   → tailwind import, fonts, global CSS vars, breakpoints
02-generic    → reset, common, tooltip, animations, lazyload, rtl, ltr, mixins
03-elements   → form, buttons, radio, radio-images
04-components → header, footer, menus, product, brands, slider, home-blocks, … (18 files)
05-utilities  → chat-bots, swal, safari-fixes, font-customization
```

This is a genuine strength. Our new **design-token layer slots cleanly into `01-settings`** without disturbing the cascade.

### Rendering model (critical to preserve)

- **Homepage** (`pages/index.twig`) is *not* hand-authored. It renders `{% component home %}` — merchant-configured blocks assembled from `views/components/home/*.twig` (21 block templates). We redesign the **blocks**, not a monolithic homepage.
- **Product / cart / customer** pages are server-rendered Twig with embedded `<salla-*>` components + a page-scoped JS class.
- **Theme settings** (`twilight.json`, 53 KB) drive conditional rendering via `theme.settings.get('key')`. These keys are a contract with the merchant dashboard.

---

## 2. Reusable Components (inventory)

### Existing reusable assets (keep & elevate)

| Component | Location | Reuse status |
|-----------|----------|--------------|
| `custom-salla-product-card` | `js/partials/product-card.js` | **Central reusable unit.** Web component with variants: vertical, horizontal, full-image, minimal, special, donation. Used everywhere products appear. Highest-leverage redesign target. |
| `BasePage` | `js/base-page.js` | Base class for page controllers. Clean pattern — reuse as-is. |
| `AppHelpers` / `app` | `js/app-helpers.js`, `js/app.js` | Global DOM helper toolkit (`toggleElementClassIf`, `onClick`, `watchElements`, `anime`…). Reuse heavily. |
| Header / Footer | `components/header/`, `components/footer/` | Single shared instances via `{% component %}`. Redesign once, applies globally. |
| Home blocks (21) | `components/home/*.twig` | Each is an independent, merchant-composable section. |
| Button system | `03-elements/buttons.scss` | `.btn` + modifiers (`--primary`, `--outline`, `--icon`, `--rounded-gray`…). A de-facto button library already. |

### Missing reusable primitives (to be created)

Badge, Chip/Tag, Skeleton (only header has one), Empty-state (partial), Section-title, Price component (logic is duplicated in twig **and** JS), Rating (twig **and** JS), Stock badge, Discount badge, Toast (uses SweetAlert), Breadcrumb wrapper, Trust-badge row, Newsletter — these currently live as ad-hoc markup repeated across files.

---

## 3. Technical Debt

| # | Debt | Location | Severity | Impact |
|---|------|----------|----------|--------|
| D1 | **Color system is muddy & self-overriding.** `--color-primary` is declared twice in `global.scss` (`#5cd5c4` then immediately `#414042`), so the mint brand is dead-on-arrival and the theme is grey. No semantic color scale (success/warning/danger are one-off Tailwind classes like `text-red-800`). | `01-settings/global.scss` | **High** | The single biggest reason the theme looks generic. |
| D2 | **No typography system.** `01-settings/fonts.scss` is **empty (1 line)**. There is no type scale, no display/heading/body role separation. Font sizes are scattered magic numbers in `tailwind.config.js` (`title-size:42px`, `22px`, `xxs`, `xxxs`). | `fonts.scss`, `tailwind.config.js` | **High** | No consistent visual hierarchy. |
| D3 | **Design values hardcoded everywhere.** Shadows, radii, spacing use one-off pixel values (`#2B2D340D`, `22px`, `232px`, `15px`) instead of a token scale. | `tailwind.config.js`, many `.scss` | **High** | Impossible to reskin consistently. |
| D4 | **Duplicated price + rating logic.** Price rendering exists in `product-card.js` (`getProductPrice`) **and** in `product/single.twig` **and** cart. Rating stars duplicated in twig + JS. | multiple | Medium | Inconsistent behavior, double maintenance. |
| D5 | **`important: false` but liberal `!important` in SCSS** (`#{!important}`, `!text-red-800`, `!mt-0`). | buttons/product scss | Medium | Specificity wars; fragile overrides. |
| D6 | **Inconsistent naming / dead structure.** Trailing empty `<span>` in footer, commented-out code (`// app.anime(...)`), inconsistent indentation (tabs vs spaces in footer.twig). | footer.twig, cart.js | Low | Readability. |
| D7 | **`app.css` is 707 KiB.** Largely the Twilight tailwind safelist (`safe-list-css.txt`) pulled in wholesale via `content`. | build output | Medium | Performance budget blown (see §7). |
| D8 | **SCSS `@import` deprecated** (Dart Sass 3.0 will remove). 31 deprecation warnings on build. | `app.scss` | Low (future) | Will break on a future Sass major. |
| D9 | **Magic timers / polling.** `setInterval(…,100)` for menu direction, `setInterval(…,160)` in `isElementLoaded`. | `app.js` | Low | Wasteful; acceptable but improvable. |

---

## 4. Scalability & Maintainability Issues

- **No token indirection**: because there's no `--space-*`, `--radius-*`, `--shadow-*`, `--text-*` scale, every new component reinvents values. Adding a second brand/skin is currently a find-and-replace nightmare. → **Phase 1 fixes this.**
- **Tailwind `extend` is a junk drawer**: arbitrary `spacing['58']=232px`, `height['banner']=200px`. These leak implementation detail into class names. → migrate to a semantic scale in Phase 1, keep old keys as aliases so nothing breaks.
- **Home blocks share no base partial**: each of the 21 blocks re-declares section title / wrapper markup. → introduce a shared `section-title` + `s-block` wrapper (Phase 4).
- **Documentation drift**: `README.md`/`CHANGELOG.md` describe the upstream Raed theme, not this fork's design intent. → new docs (this file, plan, design system).

---

## 5. Performance Issues

| Issue | Detail | Fix phase |
|-------|--------|-----------|
| CSS weight | `app.css` = 707 KiB (safelist + full twilight theme). | P1/P7 — audit safelist usage, purge. |
| No explicit image dimensions in some blocks | CLS risk. Product card `<img>` has `loading="lazy"` ✓ but no width/height in several home blocks. | P5/P7 |
| Render-blocking font CSS | `theme.font.path` + `sallaicons.css` loaded in `<head>` without `preload`/`font-display` guarantee. | P7 |
| Multiple defer scripts in head | product-card, main-menu, add-product-toast. Acceptable (deferred) but reviewable. | P7 |
| Polling intervals | see D9. | P6 |

**Strengths already present**: `fetchpriority="high"` on logo & first product image, `loading="lazy"` on below-fold images, deferred scripts, lazyload placeholder styles.

---

## 6. Accessibility Issues

- Icon-only buttons mostly have `aria-label` ✓, but some (`.btn--icon` wishlist in card) rely on generic labels ("Add or remove to wishlist") — fine, but focus states are weak (`corePlugins.outline: false` **globally disables outline**). → **Must add visible focus-ring tokens** (WCAG 2.4.7).
- Heading hierarchy is mostly correct (`h1` store name on index, `h1` product name) but footer uses `<h3>` for store name with no `h2` above → hierarchy gap.
- Color contrast: grey-on-grey (`text-gray-400` on white) fails AA for small text in several spots. → token-driven text colors in Phase 1/2.
- `prefers-reduced-motion` is **not** respected anywhere. → add global guard in Phase 6.

---

## 7. SEO Issues

- Semantic landmarks present (`<header>`, `<main role="main">`, `<footer>`, `<nav>`) ✓.
- `h1`/`h2` sr-only pattern on index is correct ✓.
- **Missing**: structured data (Product / BreadcrumbList / Organization JSON-LD) is left to Salla defaults — opportunity to add `schema.org` markup in product/breadcrumb (Phase 5, additive, no risk).
- Meta description / OG tags are injected by Salla hooks (`{% hook head %}`) — leave to platform.

---

## 8. What We Will NOT Touch (Salla contracts)

To honor "never break Salla functionality", these are **off-limits for behavioral change** (styling around them is fine):

- All `<salla-*>` web components (cart, search, wishlist, user-menu, product-options, comments, rating, installment, gifting, offer, localization, payments, social, quantity-input, add-product-button…).
- Twig data variables & the `{% hook %}`, `{% component %}`, `{% include %}` directives.
- `onsubmit="return salla.form.onSubmit(...)"`, `salla.cart.*`, `salla.wishlist.*`, `salla.event.*` calls.
- Webpack **entry names** and the `public/` output contract.
- `theme.settings.get(...)` keys defined in `twilight.json`.
- `twilight.json` `features` array.

---

## 9. Baseline Verification

- ✅ `pnpm run production` compiles: **9 warnings, 0 errors**.
- Warnings are: SCSS `@import` deprecation (cosmetic), and asset-size budget (`app.css` 707 KiB). Both pre-existing, non-breaking.
- This is our **green baseline**. Every phase must keep this green.

---

## 10. Summary Verdict

The theme's **engineering** is solid (ITCSS, component model, data contracts). Its **design** is generic and, worse, actively muted by a broken color declaration (D1). The highest-leverage work is a **design-token foundation → typography → color → component polish**, layered in without touching Salla's rendering. The plan in `IMPLEMENTATION_PLAN.md` sequences this so the build stays green at every commit.
