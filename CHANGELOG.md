# Changelog

## 2026-07-10 — Premium theme system foundation

- Added four merchant-selectable visual presets: Editorial Luxe, Modern Minimal, Soft Premium, and Bold Commerce.
- Added editor controls for density, corners, motion, content width, header/footer/card/page layouts, cart layout, and product image ratio.
- Added semantic color aliases, a 2–160 px spacing scale, language-specific font stacks, label/price roles, semantic elevation, deceleration, dropdown layering, and layout spacing tokens.
- Wired preset/control settings to global body modifiers, real containers, storefront surfaces, and custom product-card media.
- Added Arabic typography safeguards for line-height and tracking; reduced-motion preference remains authoritative.
- Replaced the stale project audit and added a contract-first implementation roadmap and typography guide.
- Production build passes with 0 errors; known Sass import and global CSS size warnings remain tracked for the performance phase.

### Header compositions

- Implemented Editorial Centered, Classic Commerce, Minimal Transparent, Mega Navigation, and Compact Sticky as distinct responsive compositions.
- Preserved the existing menu custom element, mobile burger target, search/account/cart components, sticky JavaScript classes, scope and localization controls.
- Desktop composition changes collapse to the proven mobile header grid where appropriate; Compact Sticky keeps a purpose-built 56 px mobile/desktop rail.

### Product-card compositions

- Implemented six real product-card treatments: Editorial Borderless, Premium Card, Compact Commerce, Image Overlay, Minimal Grid, and Marketplace Dense.
- Kept custom-element rendering, product-type branches, price/status logic, wishlist, quantity and add-to-cart behavior unchanged.
- Ensured essential CTAs remain visible for touch/coarse pointers and keyboard focus.
- Made explicit merchant image-ratio selection override each variant's recommended media composition while preserving cover/contain behavior.

### Footer compositions

- Implemented Editorial, Commerce Columns, Minimal, Dark Premium, and Newsletter Focused as distinct responsive hierarchies.
- Added stable structural classes without changing Salla menus, contacts, trust badges, tax certificate, social links, app links, payments, or copyright hooks.
- Did not add an undocumented newsletter form; Salla's current public Twilight documentation exposes no native newsletter subscription component or storefront endpoint.

### Premium editor section foundation

- Registered four bilingual editor components: Premium Hero, Product Grid/Carousel, Collection Grid/Carousel, and Editorial Image + Text.
- Added seven hero compositions, ten product-showcase treatments, six category treatments, and six image/text compositions.
- Wired selected products and categories through native Salla data objects and product/list/slider web components.
- Added consistent width, spacing, surface, alignment and motion controls with responsive, RTL-safe native CSS.
- Added a repeatable schema synchronization script so editor definitions remain deterministic and reviewable.

### Editorial section family

- Added ten individual editor entries and Twig paths for Split Banner, Editorial Story, Lookbook, Image Hotspots, Magazine Layout, Editorial Quote, Timeline, Image Gallery, Masonry Gallery, and Before/After.
- Reused one semantic family partial while retaining distinct composition rules for every section.
- Implemented keyboard-focusable hotspots, semantic timeline/quote markup, lazy media, reserved ratios, RTL coordinates, and CSS-only masonry.

### Product page layouts

- Implemented Editorial Gallery, Classic Sticky Purchase, Full Width Commerce, and Compact Product Focus compositions.
- Added only semantic `product-gallery` and `product-purchase` hooks; preserved the gallery ID, product form, option includes, price-update nodes, sticky bar, wishlist SDK calls, add-product component, hooks, and all existing classes.
- Reset every layout to a full-width mobile flow while retaining the established sticky mobile add-to-cart behavior.

<!-- ============================================================= -->
<!-- PREMIUM REDESIGN (fork by hazem-e99) — Editorial Luxe          -->
<!-- Entries below the upstream banner document this fork's work.   -->
<!-- ============================================================= -->

## ✨ Premium Redesign — Unreleased

### V2 — "Atelier" full editorial identity (complete visual transformation)
A ground-up visual identity replacing the polished-Twilight look with a
Zara/COS editorial system. **Business logic, Salla components, and all JS
hooks preserved; only the visual layer is rebuilt.**

- **Tokens**: monochrome ink-on-paper palette, sharp corners (radius → ~0
  store-wide, incl. Tailwind built-ins), near-flat elevation, wide tracking,
  much larger section rhythm (extreme whitespace).
- **Header**: markup + SCSS rebuilt into a 3-column bar with a centered,
  letter-spaced wordmark, slim ink utility strip, hairline-only main bar,
  inline search, minimal ink icon buttons. Sticky contract + components kept.
- **Product card**: borderless, image-led 3:4 media, tiny quiet type, minimal
  ink wishlist glyph; add-to-cart recedes until hover (hover-capable ≥768px
  only — never hidden on touch; revealed on focus for keyboard).
- **Home**: full-bleed immersive hero (soft bottom scrim, no dark wash),
  centered tiny uppercase section titles, taller framed editorial banners.
- **Product page**: hairline separations instead of grey card fills, large
  ink tabular price, uppercase micro-labels, sharp gallery, bold ink CTA.
  All price-update JS hooks preserved.
- **Collection**: editorial serif title + hairline head, borderless sort
  select, minimal filter trigger, sparser grid rhythm.
- **Footer & buttons**: spaced uppercase headings; sharp uppercase
  wide-tracked buttons with an ink primary.
- Verified all JS-critical selectors (cart price hooks, product-card render
  classes, `#mainnav`/`#mobile-menu`/`custom-main-menu` sticky + mobile-menu
  flow) remain intact.

### Phase 8 — Documentation & Handover
- Added `ARCHITECTURE.md` (how the theme is built & why), `THEME_STRUCTURE.md`
  (full file map + contracts), and a premium fork section atop `README.md`
  (kept the upstream Raed setup guide as the platform authority).
- Verified all JS asset references in Twig map to real webpack entries
  (no broken references); all locale/config JSON validated.

### Phase 7 — Performance
- Added CDN `preconnect` + `dns-prefetch` to warm the connection for
  fonts/icons/assets before they are requested (faster FCP).
- Investigated the ~730 KiB `app.css`: the bulk is Salla's
  `safe-list-css.txt` (84 KiB of class names) that force-generates the
  utilities Salla's runtime-injected web components depend on. Removing
  it would leave those components unstyled, so it is intentionally kept.
  Our own token/component CSS adds only a small delta. Documented in
  PROJECT_ANALYSIS.md rather than pursued destructively.

### Phase 6 — Motion & Accessibility
- Added `05-utilities/_a11y.scss`: global `prefers-reduced-motion` guard
  that neutralizes all animations/transitions/smooth-scroll (covers the
  legacy keyframes in animations.scss) while preserving opacity end-states.
- Added a keyboard skip-to-content link (visually hidden until focused →
  jumps to `<main id="main-content">`), with `skip_to_content` strings
  added to both `ar.json` and `en.json` so `trans()` always resolves.
- Secondary text now uses the AA-compliant `--color-ink-muted`
  (≈4.7:1 on canvas). Combined with the Phase-3 `:focus-visible` ring,
  this closes the main WCAG gaps (2.4.7 focus, reduced motion, contrast).

### Phase 5 — Product Card, Product Page, Collection & SEO
- Product card (renders via product-card.js, markup contract untouched):
  premium hover lift + hairline, signature quiet image-zoom (reduced-motion
  aware), refined blur wishlist button, tokenized sale/promotion colors
  (`--color-sale` replaces muddy `red-800`); fixed semantically-wrong red
  on "starting price".
- Product page: display-serif `<h1>`, unified `.u-price` presentation for
  both price blocks (all JS hooks `.total-price`/`.before-price`/
  `.price_is_on_sale`/`.starting-or-normal-price` preserved), added
  Product JSON-LD (schema.org) via head_scripts for rich results.
- Collection page: editorial `<h1>`, `.u-chip` filter trigger, tokenized
  sort label. `<salla-filters>`/`<salla-products-list>` untouched.

### Phase 4 — Header, Footer & Home Blocks
- Footer: token-driven premium layout for both merchant dark/light modes;
  refined hairlines, spacing rhythm, corrected heading hierarchy; removed
  dead trailing markup; polished copyright/payments bar.
- Header: main-nav on raised surface with hairline; elevated sticky-pinned
  state (token shadow, z-header); premium cart/user icon buttons with
  primary-tint hover.
- Home blocks: elevated the shared `.s-block__title` (display-serif heading
  + accent hairline underline) so all 21 blocks upgrade at once; premium
  `__display-all` link with gap animation; restrained image-zoom on hover
  for square banners (reduced-motion aware).
- RTL: fixed logical-property lowering (postcss flattened
  `inset/padding/border-inline-start` to physical `left`); added explicit
  `[dir=rtl]` mirrors for the block accent underline and `.prose-editorial`.

### Phase 3 — Core Component Library
- Added `04-components/_ui-kit.scss`: token-driven primitives —
  `section-title`, `u-badge`, `u-discount-badge`, `u-stock`, `u-chip`,
  `u-price`, `u-rating`, `u-skeleton`, `u-card`, `u-empty`, `u-trust`,
  `u-newsletter`, `u-divider`. All namespaced, opt-in, no collisions.
- Restored accessible keyboard focus ring (`:focus-visible` +
  `--shadow-focus`) globally and on `.btn`, reversing the globally
  disabled outline (WCAG 2.4.7) without affecting mouse/touch users.
- Added `COMPONENTS.md` documenting the library and the Salla components
  we style around but never reimplement.

### Phase 2 — Typography System
- Added `01-settings/_typography.scss`: role-based type system (`display`, `h1–h4`,
  `subheading`, `body-lg/body/sm`, `caption`, `eyebrow`, `label`, `button`, `price`)
  built on the design tokens, plus `.prose-editorial` long-form styles and
  `text-balance`/`text-pretty` helpers. Opt-in utilities — base heading styles
  unchanged, so no regression.
- Applied to product page `<h1>` (display serif + balanced wrap) and corrected the
  footer heading hierarchy (a11y).

### Phase 1 — Design Token Foundation
- Added `01-settings/_tokens.scss`: single source of truth for color (warm-neutral
  scale, surfaces, semantic), typography, spacing (8px), radius, elevation, motion,
  z-index, container; global `prefers-reduced-motion` guard.
- Fixed the self-overriding `--color-primary` declaration (theme was accidentally grey).
- Extended `tailwind.config.js` with token-backed, non-colliding utilities.

### Phase 0 — Analysis & Docs
- `PROJECT_ANALYSIS.md`, `IMPLEMENTATION_PLAN.md`, `DESIGN_SYSTEM.md`.

---

# Upstream (Salla Theme Raed) Changelog

On this page, you will find all about Salla's Theme Raed updates, including frequent updates, bug fixes, new features, and deprecated elements. We will be displaying only released updates on [Theme Read's ChangeLog](https://github.com/SallaApp/theme-raed/blob/master/CHANGELOG.md) here on GitHub

> 📝 Note
> 
> Make sure to visit this page regularly for updates before working on your Theme based on Theme Raed, as we will be documenting any notable changes here.

> ℹ️ Info
>The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
>



# ⚡️ [1.352.0]( https://github.com/SallaApp/theme-raed/compare/1.351.0...1.352.0) (23-06-2026)
### Enhancement
- Hide branch pickup section for non-pickable orders.

# 🎶 [1.351.0]( https://github.com/SallaApp/theme-raed/compare/1.342.0...1.351.0) (21-06-2026)
### Enhancement
- Support `is_default` for homepage components

# 🌟 [1.342.0]( https://github.com/SallaApp/theme-raed/compare/1.336.0...1.342.0) (19-05-2026)
### Enhancement
- Reflect option SKU on storefront endpoint.

# 🪮 [1.336.0]( https://github.com/SallaApp/theme-raed/compare/1.322.0...1.336.0) (07-05-2026)
### Enhancement
- Upgraded Twilight to apply a new feature " Login Cycle IP-based Auto-fill for Country, Region, and City".

# 💣 [1.322.0]( https://github.com/SallaApp/theme-raed/compare/1.310.0...1.322.0) (08-04-2026)
### Enhancement
- Upgraded twilight for Delivery Promise v2.

# 📩 [1.310.0]( https://github.com/SallaApp/theme-raed/compare/1.308.0...1.310.0) (25-02-2026)
### Enhancement
- Support Free Product Conditional Offers.

# 📌 [1.308.0]( https://github.com/SallaApp/theme-raed/compare/1.307.0...1.308.0) (15-02-2026)
### Bug Fixes
- Optimize Enhanced Slider when there is only one slide
- Support New Flag `slides.without_overlay`


# ⛱ [1.307.0]( https://github.com/SallaApp/theme-raed/compare/1.306.0...1.307.0) (12-02-2026)
### Bug Fixes
- Enhance digital file calling place.

# ⚓️ [1.306.0]( https://github.com/SallaApp/theme-raed/compare/1.305.0...1.306.0) (12-02-2026)
### Bug Fixes
- Resolve product card images not displaying issue.

# 🔨 [1.305.0]( https://github.com/SallaApp/theme-raed/compare/1.304.0...1.305.0) (11-02-2026)
### Enhancements
- Use native loading="lazy" instead of custom lazyload.
# 🪑 [1.304.0]( https://github.com/SallaApp/theme-raed/compare/1.302.0...1.304.0) (10-02-2026)
### Enhancements
- Support responsive mobile/desktop images for fixed banner.
# 🧸 [1.302.0]( https://github.com/SallaApp/theme-raed/compare/1.301.0...1.302.0) (28-01-2026)
### Enhancements
- Refactor fixed banner image logic and cleanup styles.
# 🧷 [1.301.0]( https://github.com/SallaApp/theme-raed/compare/1.300.0...1.301.0) (27-01-2026)
### Bug Fixes
- Fix payment method logo in bank offer logo.
# 🔆 [1.300.0]( https://github.com/SallaApp/theme-raed/compare/1.299.0...1.300.0) (26-01-2026)
### Enhancements
- Add explicit dimensions to testimonial avatar images to improve Lighthouse performance score.
# 🔍 [1.299.0]( https://github.com/SallaApp/theme-raed/compare/1.298.0...1.299.0) (26-01-2026)
### Bug Fixes
- Fix overflow product option content.
# 🌐 [1.298.0]( https://github.com/SallaApp/theme-raed/compare/1.296.0...1.298.0) (21-01-2026)
### Enhancements
- Remove hero slider controls on single slide to improve LCP.

# 📢 [1.296.0]( https://github.com/SallaApp/theme-raed/compare/1.294.0...1.296.0) (20-01-2026)
### Bug Fixes
- Remove initial loader screen && add crossorigin to app and product-card scripts.

# 📦 [1.294.0]( https://github.com/SallaApp/theme-raed/compare/1.284.0...1.294.0) (07-01-2026)
### Bug Fixes
- Show free product ribbon only for discounted items with zero prices.

# 🪩 [1.284.0]( https://github.com/SallaApp/theme-raed/compare/1.282.0...1.284.0) (31-12-2025)
### Bug Fixes
- Support add product toast component.

# 🔖 [1.282.0]( https://github.com/SallaApp/theme-raed/compare/1.279.0...1.282.0) (21-12-2025)
### Enhancements
- Additional options now support digital files.

# 📭  [1.279.0]( https://github.com/SallaApp/theme-raed/compare/1.278.0...1.279.0) (07-12-2025)
### Enhancements
-  Scopes moved out from header.

# 📕  [1.278.0]( https://github.com/SallaApp/theme-raed/compare/1.276.0...1.278.0) (01-12-2025)
### Enhancements
-  Display donation-amount based on option custom_amount_enabled.

# 📘  [1.276.0]( https://github.com/SallaApp/theme-raed/compare/1.271.0...1.276.0) (20-11-2025)
### Enhancements
-  Build theme assets.

# 📙 [1.271.0]( https://github.com/SallaApp/theme-raed/compare/1.267.0...1.271.0) (11-11-2025)
### Bug Fixes
-  Fix safari `on-paste` issue.

# 🔓 [1.267.0]( https://github.com/SallaApp/theme-raed/compare/1.265.0...1.267.0) (06-11-2025)

### Bug Fixes
-  Fix updating `itemOriginalPrice` if `hasSalePrice`.
-  Fix price icon direction.

# ⭕️ [1.265.0]( https://github.com/SallaApp/theme-raed/compare/1.264.0...1.265.0) (30-10-2025)

### Bug Fixes
-  Partial payment breakdown for the customer.

# 🌀 [1.264.0]( https://github.com/SallaApp/theme-raed/compare/1.263.0...1.264.0) (27-10-2025)

### Bug Fixes
-  Prevent Accumulating Overlays On Data Changes.

# 🗺️ [1.263.0]( https://github.com/SallaApp/theme-raed/compare/1.262.0...1.263.0) (23-10-2025)

### Enhancements
- Added support for multi-item bundle products.

# ⚜️ [1.262.0]( https://github.com/SallaApp/theme-raed/compare/1.256.0...1.262.0) (21-10-2025)

### Bug Fixes
- Update WhatsApp link to use wa.me format

# 🪁 [1.257.0]( https://github.com/SallaApp/theme-raed/compare/1.256.0...1.257.0) (06-10-2025)
## Fixes
- Fix sticky label for mobile by add flag for preorder.


# ♠️ [1.256.0]( https://github.com/SallaApp/theme-raed/compare/1.252.0...1.256.0) (05-10-2025)
### Enhancements
- Profile page changed to twig.


# 🌅 [1.253.0]( https://github.com/SallaApp/theme-raed/compare/1.250.0...1.252.0) (14-09-2025)

### Bug Fixes

- Unify PreOrder and Promotion handling
- Display square banners info in mobile screen

# 🥊 [1.252.0]( https://github.com/SallaApp/theme-raed/compare/1.250.0...1.252.0) (14-09-2025)

### Bug Fixes
Handle PreOrder Label As Promotion label

# 🏁 [1.250.0]( https://github.com/SallaApp/theme-raed/compare/1.249.0...1.250.0) (11-09-2025)
### Enhancements

- Set configs in webpack.config.js to minify css

# 💭 [1.249.0]( https://github.com/SallaApp/theme-raed/compare/1.237.0...1.249.0) (11-09-2025)
### Enhancements

- Added Tiered offer component. This commit as a reference.

#  🪁 [1.229.0](https://github.com/SallaApp/theme-raed/compare/1.228.0...1.229.0) (03-08-2025)

### Bug Fixes

- Avoid Casting a Cart Item to an integer

#  ⚙️ [1.228.0](https://github.com/SallaApp/theme-raed/compare/1.227.0...1.228.0) (30-07-2025)

### Enhancements & Required Updates

- Standardized ID usage as strings in JavaScript calls across theme files to avoid parsing issues.

#### Code changes:

- File: `src/views/pages/cart.twig`

- From:
   - salla.cart.deleteItem({{ item.id }}).then(() => document.querySelector('#item-{{ item.id }}').remove())

- To:
   - salla.cart.deleteItem('{{ item.id }}').then(() => document.querySelector('#item-{{ item.id }}').remove())

- File: `src/views/pages/customer/orders/single.twig`

- From:
   - salla.event.dispatch('rating::edit', {type: 'product', feedback_id: {{item.rating.id}} })
   - salla.event.dispatch('rating::delete', {feedback_id: {{item.rating.id}} })
   - salla.event.dispatch('rating::edit', {type: 'store', feedback_id: {{order.rating.store.id}} })
   - salla.event.dispatch('rating::delete', {feedback_id: {{order.rating.store.id}} })
   - salla.event.dispatch('rating::edit', {type: 'shipping', feedback_id: {{order.rating.shipping.id}} })
   - salla.event.dispatch('rating::delete', {feedback_id: {{order.rating.shipping.id}} })


- To:
   - salla.event.dispatch('rating::edit', {type: 'product', feedback_id: '{{item.rating.id}}' })
   - salla.event.dispatch('rating::delete', {feedback_id: '{{item.rating.id}}' })
   - salla.event.dispatch('rating::edit', {type: 'store', feedback_id: '{{order.rating.store.id}}' })
   - salla.event.dispatch('rating::delete', {feedback_id: '{{order.rating.store.id}}' })
   - salla.event.dispatch('rating::edit', {type: 'shipping', feedback_id: '{{order.rating.shipping.id}}' })
   - salla.event.dispatch('rating::delete', {feedback_id: '{{order.rating.shipping.id}}' })


- File: `src/views/pages/product/single.twig`

- From:
   - salla.wishlist.toggle({{ product.id }})
   - salla.event.dispatch('scopes::open', {mode: 'availability', product_id: {{ product.id }} })

- To:
   - salla.wishlist.toggle('{{ product.id }}')
   - salla.event.dispatch('scopes::open', {mode: 'availability', product_id: '{{ product.id }}' })

- File: `src/views/pages/thank-you.twig`

- From:
   - <salla-button onclick="salla.order.show({order_id:{{ order.id }}, url:'{{ order.url }}'})">

- To:
   - <salla-button onclick="salla.order.show({order_id:'{{ order.id }}', url:'{{ order.url }}'})">

# 📦 [1.227.0](https://github.com/SallaApp/theme-raed/compare/1.226.0...1.227.0)(23-06-2025)
### Enhancements
- Enhance default content for the `customize-testimonials` block

# 🌅 [1.226.0](https://github.com/SallaApp/theme-raed/compare/1.224.0...1.226.0)(23-06-2025)
### Bug Fixes
- Support the product sale within price in cart

# ⛲️ [1.224.0](https://github.com/SallaApp/theme-raed/compare/1.223.0...1.224.0)(17-06-2025)
### Enhancements
- Upgrade outdated packages

# 🪁 [1.223.0](https://github.com/SallaApp/theme-raed/compare/1.222.0...1.223.0)(25-05-2025)
### Bug Fixes
- Add image alternative information for thumbnails in the product details' slider.

# 🥊 [1.222.0](https://github.com/SallaApp/theme-raed/compare/1.220.0...1.222.0)(18-05-2025)
### Enhancements
- Enhanced slider note in options.
- Enhanced preview images for inside blocks.

# ✨ [1.220.0](https://github.com/SallaApp/theme-raed/compare/1.214.0...1.220.0)(13-05-2025)
### Enhancements
- Update default content for homepage elements.

# 🪐 [1.214.0](https://github.com/SallaApp/theme-raed/compare/1.212.0...1.214.0)(21-04-2025)
### Enhancements
- Update preview images to enhance content display and user experience.

# 🎩 [1.212.0](https://github.com/SallaApp/theme-raed/compare/1.210.0...1.212.0)(16-04-2025)
### Bug Fixes
- Show custom fields in a user profile.

# 🧶[1.210.0](https://github.com/SallaApp/theme-raed/compare/1.208.0...1.210.0)(15-04-2025)

### Enhancements
- Support custom testimonials component.

# ⛓️‍💥 [1.218.0](https://github.com/SallaApp/theme-raed/compare/1.208.0...1.218.0)(05-05-2025)
### Enhancement
- Support a new option to select bg-size in square-photos section.



# 🎩 [1.208.0](https://github.com/SallaApp/theme-raed/compare/1.190.0...1.208.0)(12-03-2025)
  ### Bug Fixes
  - Tax amount issue in cart.

# 🏅 [1.190.0](https://github.com/SallaApp/theme-raed/compare/1.189.0...1.190.0)(23-02-2025)
### Feature
- Support the new SAR currency symbol.

# ⛵ [1.189.0](https://github.com/SallaApp/theme-raed/compare/1.187.0...1.189.0)(29-12-2024)
### Feature

- Support the `is_default` property for homepage components as well as default data for some components.
- Add preview images for each component in Theme Raed using the image key in the `twilight.json` file.

# 🧶 [1.187.0](https://github.com/SallaApp/theme-raed/compare/1.185.0...1.187.0)(17-12-2024)
### Enhancement

- Upgrade the `twilight-components` to fix the style of product's options.

# 🪐 [1.185.0](https://github.com/SallaApp/theme-raed/compare/1.184.0...1.185.0)(09-10-2024)
### Enhancement
- Update Preview Images

# 🌪️ [1.184.0](https://github.com/SallaApp/theme-raed/compare/1.183.0...1.184.0)(25-09-2024)
### Feature
- Support Blog Interaction with Comments and Likes:
  - Support for liking and unliking on the blog single page.
  - Display likes count and comments count on blog cards.
  - Enable comments and replies on the blog post page. 

# 🌂 [1.183.0](https://github.com/SallaApp/theme-raed/compare/1.182.0...1.183.0)(25-09-2024)
### Feature
- Support comments and like in the Merchant blog.

# 🎓 [1.182.0](https://github.com/SallaApp/theme-raed/compare/1.181.0...1.182.0)(24-09-2024)
### Bug Fixes
- Display rating in the `product-card`.

# 👔 [1.181.0](https://github.com/SallaApp/theme-raed/compare/1.180.0...1.181.0)(24-09-2024)
### Bug Fixes
- Display rating in the `product-card`.

# 💈 [1.180.0](https://github.com/SallaApp/theme-raed/compare/1.179.0...1.180.0)(31-08-2024)
### Enhancement
- Enhancements in the Menus.

# 🪡 [1.179.0](https://github.com/SallaApp/theme-raed/compare/1.178.0...1.179.0)(30-08-2024)
### Bug Fixes
- Avoid storing menu items in the browser.

# 👣 [1.178.0](https://github.com/SallaApp/theme-raed/compare/1.177.0...1.178.0)(29-08-2024)
### Bug Fixes
- Fix align of text in the My Account page.


# 🃏 [1.177.0](https://github.com/SallaApp/theme-raed/compare/1.176.0...1.177.0)(19-08-2024)
### Bug Fixes
-  Fix memory leak error in the `product-card`.

# 🔅 [1.176.0](https://github.com/SallaApp/theme-raed/compare/1.175.0...1.176.0)(12-08-2024)
### Bug Fixes
- Fix the error message style when a user uploads an avatar with size more than **2MB**.

# 🧮 [1.175.0](https://github.com/SallaApp/theme-raed/compare/1.174.0...1.175.0)(08-08-2024)
### Enhancement
- Enhance the reviews system.

# 📊 [1.174.0](https://github.com/SallaApp/theme-raed/compare/1.173.0...1.174.0)(06-08-2024)
### Bug Fixes
- Fix unavailable options.

# 🪞 [1.173.0](https://github.com/SallaApp/theme-raed/compare/1.172.0...1.173.0)(05-08-2024)
### Bug Fixes
- Update Product Price with unavailable option.

# 🔮 [1.172.0](https://github.com/SallaApp/theme-raed/compare/1.171.0...1.172.0)(01-08-2024)
### Bug Fixes
- Upgrade to the `twilight-components`.

# 🖼️ [1.171.0](https://github.com/SallaApp/theme-raed/compare/1.170.0...1.171.0)(01-08-2024)
### Bug Fixes
- Fix the product's image in the product's details page.

# 🔦 [1.170.0](https://github.com/SallaApp/theme-raed/compare/1.169.0...1.170.0)(25-07-2024)
### Bug Fixes
- Upgrade twilight-components package.


# 🖲️ [1.169.0](https://github.com/SallaApp/theme-raed/compare/1.168.0...1.169.0)(23-07-2024)
### Enhancements 
- Upgrade Twilight & Twilight components.

#💈[1.168.0](https://github.com/SallaApp/theme-raed/compare/1.167.0...1.168.0)(17-07-2024)
### Enhancements 
- Handle protected digital files.

# ⛓️‍💥 [1.167.0](https://github.com/SallaApp/theme-raed/compare/1.165.0...1.167.0)(10-07-2024)
### Features
- Support digital product option.

# 💈 [1.165.0](https://github.com/SallaApp/theme-raed/compare/1.164.0...1.165.0)(02-07-2024)
### Enhancements
- Support order option book appointment field in the `salla-booking-field` JS Web Component.

# 🖼️ [1.164.0](https://github.com/SallaApp/theme-raed/compare/1.163.0...1.164.0)(29-06-2024)
### Bug Fixes
- Update price based on product's options.
  
# 🛎️ [1.163.0](https://github.com/SallaApp/theme-raed/compare/1.162.0...1.163.0)(27-06-2024)
### Bug Fixes
- Fix the product options validation.

# 🎁 [1.162.0](https://github.com/SallaApp/theme-raed/compare/1.161.0...1.162.0)(12-06-2024)
### Bug Fixes
- Fix console errors due to hover action on the `menu-item` variable.

# 🎈 [1.161.0](https://github.com/SallaApp/theme-raed/compare/1.160.0...1.161.0)(12-06-2024)
### Bug Fixes
- Fix Style of the product's description.

# 📎 [1.160.0](https://github.com/SallaApp/theme-raed/compare/1.160.0...1.161.0)(20-06-2024)
### Enhancements
- Enhancements for the Testimonials Page.

# 🧲 [1.158.0](https://github.com/SallaApp/theme-raed/compare/1.154.0...1.158.0)(29-05-2024)
### Bug Fixes
 - Eager Loading on the `WishlistCard`.

# 🏷️ [1.154.0](https://github.com/SallaApp/theme-raed/compare/1.150.0...1.154.0)(23-05-2024)
### Enhancements
 - Support the [`salla-comments`](https://docs.salla.dev/doc-482455/?nav=01HNFTE06J4QC24T0D5BPRYKMD) JS Web component in the product single page.
 - Use the [`salla-products-list`](https://docs.salla.dev/doc-422719/?nav=01HNFTE06J4QC24T0D5BPRYKMD) JS Web component on the Wishlist page using custom components.
 - Cart options fixes and enhancements.
 
### Features
 - Support new component, the [`salla-conditional-offer`](https://docs.salla.dev/doc-537931/?nav=01HNFTE06J4QC24T0D5BPRYKMD) JS Web component.
   
# 📰 [1.149.0](https://github.com/SallaApp/theme-raed/compare/1.149.0...1.150.0)(21-05-2024)
### Enhancement
- Custom Component enabled for the Product Card on the Wishlist page.
### Bug Fixes
- Typographical error found on the Wishlist page.

# 💎 [1.148.0](https://github.com/SallaApp/theme-raed/compare/1.148.0...1.150.0)(21-05-2024)
### Features
- Support the [`salla-comments`](https://docs.salla.dev/doc-482455/?nav=01HNFTE06J4QC24T0D5BPRYKMD) JS Web Component.
- Support cart options total on both cart and order pages.
### Bug Fixes
- Fix the cart options price issue on the order page.

# 🏹 [1.147.0](https://github.com/SallaApp/theme-raed/compare/1.147.0...1.150.0)(16-05-2024)
### Enhancements
- Unused files removed
  - Footer's files 
    - contacts.twig
    - menu.twig
    - mobile-apps.twig
    - payment-methods.twig
    - social.twig
  - Header's files 
    - menu-item.twig
    - breadcrumbs.twig
    - menu.twig
  - Product's file
    - offer.twig
      
# 🛠 [1.146.0](https://github.com/SallaApp/theme-raed/compare/1.145.0...1.147.1)(06-05-2024)
### Bug Fixes
- Fixes and enhancements on the [`salla-reviews`](https://docs.salla.dev/doc-508226/?nav=01HNFTE06J4QC24T0D5BPRYKMD) JS Web component
- Support `salla-notifications` component

# ✨ [1.145.0](https://github.com/SallaApp/theme-raed/compare/1.143.0...1.145.0)(29-04-2024)
### Features:
- Support `main menus` via API
- Support the [`salla-reviews`](https://docs.salla.dev/doc-508226/?nav=01HNFTE06J4QC24T0D5BPRYKMD) JS Web component
- Support the [`salla-breadcrumb`](https://docs.salla.dev/doc-482370/?nav=01HNFTE06J4QC24T0D5BPRYKMD) JS Web component
- Support the [`salla-order`](https://docs.salla.dev/doc-508225/?nav=01HNFTE06J4QC24T0D5BPRYKMD) JS Web component

# 🏎️ 1.144.0 (2024-04-25)
### Features
- Validate all product options before updating the price request with better words such as "`Don't call update price request unless all product options are valid.`"
- Make quantity input as `readonly` when the maximum quantity is equal to the value `1`
  
# 🖌️ [1.143.0](https://github.com/SallaApp/theme-raed/compare/1.142.0...1.143.0) (27-03-2024)
### Features
- Support new Twilight Components using `salla.config` and Ajax requests.

# 🚀 [1.142.0](https://github.com/SallaApp/theme-raed/compare/1.141.0...1.142.0) (21-03-2024)
### Features
- Support the [`salla-offer`](https://docs.salla.dev/doc-440408/?nav=01HNFTE06J4QC24T0D5BPRYKMD) JS Web component

# 🌟 [1.141.0](https://github.com/SallaApp/theme-raed/compare/1.140.8...1.141.0) (19-03-2024)
### Features
- Support product specifications.

# 🔖 [1.140.8](https://github.com/SallaApp/theme-raed/compare/1.140.2...1.140.8) (13-02-2024)
### Features
- Support infinite scroll in the wishlist.
- Replace 'images/s-empty.png' asset to 'images/s-empty.png' CDN.
- Disable loading on the submit button and open the login modal directly if the user is a guest on the cart page.
### Bug Fixes
- Cover missed case of price update on the Product details page.
- Fix off-screen dropdown sub-menus.
  
# ⚡ [1.140.2](https://github.com/SallaApp/theme-raed/compare/1.140.0...1.140.2) (05-03-2024)
### Features
- Enhance best practices score for SEO.

# 🗳️ [1.140.0](https://github.com/SallaApp/theme-raed/compare/1.139.0...1.140.0) (15-02-2024)
### Bug Fixes
- Fix product option price with discount.

# 📜 [1.139.0](https://github.com/SallaApp/theme-raed/compare/1.138.7...1.139.0) (14-02-2024)
### Enhancements
- Enhance Cart options.

# 🔧 [1.138.7](https://github.com/SallaApp/theme-raed/compare/1.138.3...1.138.7) (11-02-2024)
### Features
- Twilight Upgrade, supporting Apple Pay with required shipping property.

# 🌐 [1.138.3](https://github.com/SallaApp/theme-raed/compare/1.138.0...1.138.3) (08-02-2024)
### Features
- Card options feature released.

<!-- # 🔥 [1.137.43](https://github.com/SallaApp/theme-raed/compare/1.137.39...1.137.43) (07-02-2024)
### Added
- Release New Feature: Card options. -->

# 🔄 [1.137.39](https://github.com/SallaApp/theme-raed/compare/1.8.0...1.137.39) (29-01-2024)
### Features
- Start of documentation
