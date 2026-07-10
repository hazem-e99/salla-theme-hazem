# Premium theme system implementation roadmap

Every phase is independently buildable and commits only its own source/docs. Existing setting IDs, Twig hooks, Salla components, public APIs, JavaScript selectors, and webpack entry names are preserved.

## Phase 0 — Audit and contract baseline

- Current architecture, selectors, Salla dependencies, editor gaps, accessibility, performance, and RTL/LTR risks.
- Validate existing JSON/locales and record asset sizes.
- Deliver `PROJECT_ANALYSIS.md` and this roadmap.
- Commit: `docs: audit current Twilight theme system baseline`

## Phase 1 — Configurable design foundation

- Add Editorial Luxe, Modern Minimal, Soft Premium, and Bold Commerce preset modifiers without duplicating templates.
- Add merchant settings for preset, density, corners, motion, content width, header/footer/card/page layouts, and image ratio.
- Expand semantic color, typography, spacing (2–160 px), border, radius, shadow, motion, container, and z-index tokens.
- Add Arabic/English typography rules and approved CSS-variable overrides via constrained settings.
- Wire settings to `master.twig` body classes and real global surfaces.
- Deliver `TYPOGRAPHY_SYSTEM.md` and update design/architecture docs.
- Verify build, JSON/locales, entries, selector contract, RTL/LTR static rules.
- Commit: `feat: add configurable theme presets and design foundation`

## Phase 2 — Core component library

- Complete buttons, icon buttons, links, badge/chip/tag/status, price/rating, form controls, quantity, breadcrumbs, pagination, tabs, accordion, dropdown, tooltip/popover, modal/drawer/toast, alert, skeleton, states, headings, trust/social/newsletter primitives.
- Prefer wrappers/styles around Salla components; add JS only for behavior the platform does not provide.
- Connect every primitive to at least one real page or section.
- Deliver `COMPONENT_LIBRARY.md`.
- Commit in small groups: forms/actions, navigation/overlays, commerce/states.

## Phase 3 — Header and footer systems

- Header compositions: Editorial Centered, Classic Commerce, Minimal Transparent, Mega Navigation, Compact Sticky.
- Mega-menu treatments: columns, image cards, collection, promotion, mixed content where Salla menu data supports them.
- Footer compositions: Editorial, Commerce Columns, Minimal, Dark Premium, Newsletter Focused.
- Keep `custom-main-menu`, search, localization, auth, wishlist/cart, contact, trust, payments, and menu contracts intact.
- Verify mobile drawer, keyboard, sticky/shrink, RTL direction, and no-hover access.

## Phase 4 — Section framework and starter library

- Add a shared section contract: variant, width, surface, spacing, alignment, ratio/fit, columns, mobile behavior, motion, content, link/button, visibility, and safe custom class.
- Build high-value families first: hero (7), image/text (6), product grid/carousel (5+), categories (5+), brands, trust, testimonials (4+), newsletter (4+), editorial story/gallery/video/blog/FAQ.
- Then add business, social, conversion, and interactive sections only when backed by safe data/behavior.
- Use categories and bilingual editor names/descriptions; replace legacy preview imagery.
- Deliver `SECTION_LIBRARY.md` and `THEME_EDITOR_GUIDE.md`.

## Phase 5 — Product card and merchandising

- Variants: Editorial Borderless, Premium Card, Compact Commerce, Image Overlay, Minimal Grid, Marketplace Dense.
- Settings for ratio/fit, second image, zoom, quick actions, wishlist, rating/vendor/category/status/swatches/title lines, price alignment, and card treatment.
- Preserve custom-element API, product-type branches, Salla cart/wishlist events, sale/availability logic, and touch access.

## Phase 6 — Product page system

- Layouts: Editorial Gallery, Classic Sticky Purchase, Full Width Commerce, Compact Product Focus.
- Compose existing gallery, variants/options, price, availability, quantity, gifting, offers, installments, reviews, recommendations, hooks, and sticky mobile CTA.
- Add accessible information tabs/accordions, delivery/trust, size guide entry, gallery controls, and structured data only where Salla does not already emit it.
- Regression matrix: variants/no variants, sale, out of stock, preorder, files/notes, long names, video/3D media.

## Phase 7 — Collection and search systems

- Collection layouts: Editorial, Commerce Grid, Sidebar Filters, Full Width Minimal.
- Add density controls, filter drawer/sidebar, active-state presentation, sort, loading/empty states, and compatible pagination/infinite behavior around `salla-products-list`/`salla-filters`.
- Upgrade global/predictive search presentation and keyboard states using supported Salla search APIs.

## Phase 8 — Cart and conversion

- Cart treatments: Editorial, Commerce Summary, Compact Mobile (within platform constraints).
- Improve items, quantity/remove, coupon, subtotal, shipping progress, recommendations, trust, empty cart, drawer, and sticky mobile summary without changing checkout behavior.
- Validate shared `checkout` entry and cart event lifecycle.

## Phase 9 — Content, customer, and system pages

- Blog/index/article, brands, static/landing, testimonials, login/register/account/orders/wallet/notifications/wishlist, thank-you, and 404/empty/error states.
- Consistent typography, cards, forms, landmarks, breadcrumbs, and localized accessible labels.

## Phase 10 — Safe custom content

- Determine whether Salla provides server-side sanitization for editor HTML.
- If documented sanitization exists, allowlisted HTML excludes scripts, event attributes, unsafe URLs/iframes, object/embed, and dangerous SVG.
- Otherwise ship structured rich-content blocks, not raw `|raw` HTML.
- Expose only approved custom-property settings; never raw JavaScript.
- Deliver `CUSTOM_HTML_SECURITY.md`.

## Phase 11 — Performance, accessibility, RTL/LTR, and SEO

- Asset budgets, dead-code/style audit, image sizing, lazy media, font strategy, passive/debounced events, and safe code splitting.
- WCAG AA contrast, headings/landmarks, keyboard/focus trap/Escape/restore, errors, carousel semantics, touch targets, reduced motion.
- Logical-property and language typography sweep at 320–1920 px.
- Metadata/structured-data audit without duplicating Salla output.
- Deliver `PERFORMANCE_AUDIT.md`, `ACCESSIBILITY.md`, and `RTL_LTR_GUIDE.md`.

## Phase 12 — Visual QA and release documentation

- Test all requested pages and state permutations in Arabic/English, RTL/LTR, desktop/tablet/mobile, keyboard/touch/reduced-motion.
- Run production build, JSON/locale/schema checks, console/network inspection, and Lighthouse on a realistic preview.
- Finalize `README.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `CONTRIBUTING.md`, and `CHANGELOG.md`.
- Push completed phase commits to `origin/feat/premium-theme-system`; do not merge to master.

## Definition-of-done evidence

Completion requires build logs, validation output, browser screenshots or recordings for critical breakpoints/states, Lighthouse reports from a live preview, a documented platform-limitations list, and a section/settings inventory matching the published guides. Compile success alone is not completion.
