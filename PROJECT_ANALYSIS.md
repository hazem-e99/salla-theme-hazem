# Project analysis

Audit date: 2026-07-10  
Baseline branch: `feat/premium-theme-system`  
Upstream: Salla Raed/Twilight (`@salla.sa/twilight` 2.14.491)

## Executive summary

This repository is a functioning Salla Twilight theme with a sound server-rendered architecture and an in-progress editorial redesign. The safe path is evolutionary: preserve every Twig contract, Salla web component, hook, setting key, script entry, event, and JavaScript selector while replacing the visual layer with configurable tokens and composition variants.

The current source already contains an Editorial/Atelier token layer, fluid type roles, reusable CSS primitives, redesigned header/footer/product surfaces, reduced-motion rules, and focus styles. It is not yet a theme system: only 22 global settings and 6 custom editor components are declared; there is no merchant-selectable preset, header/footer/product-card/page-layout variant, approved-variable override layer, custom HTML section, or broad categorized section library. The compiled `app.css` is approximately 1.0 MB, so performance work must accompany expansion.

## Architecture and build

| Layer | Implementation | Contract / implication |
| --- | --- | --- |
| Rendering | 44 Twig templates under `src/views` | Server-rendered by Twilight; variables, hooks, includes, and component paths are API contracts. |
| Store UI | Salla web components (`salla-*`) | Cart, search, filters, wishlist, auth, product options, reviews, localization, payments, and related features remain platform-owned. |
| Styling | 41 SCSS files, ITCSS ordering, Tailwind 3/PostCSS | Tokens can be layered before generic/elements/components without rewriting functional markup. |
| Runtime | 24 JavaScript modules and custom elements | Page controllers and custom product/menu/wishlist elements depend on stable selectors and Salla events. |
| Bundling | Webpack 5, Babel, MiniCssExtract, CSS minimizer, CopyPlugin, ThemeWatcher | Output is written to `public/`; entry names are referenced by Twig and must not change. |
| Editor | `twilight.json` | 17 features, 22 settings, 6 custom home components; JSON and existing setting IDs are compatibility contracts. |
| Localization | `src/locales/ar.json`, `src/locales/en.json` | Both must stay valid and key-compatible; theme-editor labels currently mix localized objects and Arabic-only strings. |

### Required webpack entries

`app`, `home`, `product-card`, `main-menu`, `wishlist-card`, `add-product-toast`, `digital-files`, `checkout`, `pages`, `product`, `order`, and `testimonials` are required output contracts. The `checkout` bundle combines cart and thank-you behavior; `product` combines product detail and product listing behavior.

### Rendering model

- `layouts/master.twig` owns document metadata, global assets, runtime CSS variables, body classes, header/footer, global modals, search, and Salla hooks.
- `pages/index.twig` delegates to `{% component home %}`. Merchant section order is platform-driven; home templates must remain independent.
- Product, collection/search, cart, customer, blog, brands, testimonials, landing, static, and order pages are real Twig surfaces rather than SPA routes.
- `public/` is generated output. At audit time it contains uncommitted build changes; source edits must be committed separately so those user-visible generated changes are not accidentally discarded.

## Existing reusable components

- `custom-salla-product-card` is the central product renderer and already supports vertical, horizontal, full-image, minimal, special, and donation paths.
- `custom-main-menu`, wishlist card, add-product toast, `BasePage`, `AppHelpers`, and the global `app` controller are reusable runtime building blocks.
- CSS primitives in `_ui-kit.scss` cover section headings, badges, discount/stock states, chips, prices, ratings, skeletons, cards, empty states, trust items, newsletters, dividers, and focus rings.
- Existing home templates include sliders, product lists, banners, category links, brands, testimonials, YouTube, features, parallax, and fixed/product-feature compositions.
- Header, footer, buttons, forms, filters, menus, product UI, and customer UI are shared style modules.

## Salla component dependencies

The theme relies on, among others: `salla-search`, `salla-cart-summary`, `salla-user-menu`, `salla-menu`, `salla-contacts`, `salla-localization-modal`, `salla-products-list`, `salla-products-slider`, `salla-filters`, `salla-product-options`, `salla-quantity-input`, `salla-add-product-button`, `salla-rating-stars`, `salla-comments`, `salla-breadcrumb`, `salla-slider`, `salla-social-share`, `salla-installment`, `salla-gifting`, `salla-offer`, `salla-quick-order`, `salla-trust-badges`, `salla-payments`, and authentication/account/order components. These must be composed and styled, never replaced with static lookalikes.

## JavaScript-critical contracts

The complete selector inventory remains in source and must be checked before each template change. Highest-risk selectors include:

| Area | Stable selectors / attributes / events |
| --- | --- |
| Product detail | `.product-form`, `.total-price`, `.before-price`, `.price_is_on_sale`, `.starting-or-normal-price`, `.out-of-stock`, `.sticky-product-bar`, `#btn-show-more`, `#more-content`, `#details-slider-*`, `[data-fslightbox]`, product option IDs and upload attributes. |
| Product cards | Custom-element attributes, `.add-to-cart`, wishlist `data-id`, quantity controls, image/status/price nodes, `salla-add-product-button`, and Salla cart/wishlist events. |
| Collection/search | `#filters-menu`, `.filters-trigger`, `.close-filters`, `#product-filter`, `salla-products-list[filters-Results]`, and the listing/filter events in `products.js`. |
| Cart/checkout | Cart item IDs, quantity/remove controls, coupon and summary hooks, plus `salla.cart.*` and cart event listeners. |
| Header/navigation | `#mainnav`, `#mobile-menu`, `.mburger`, `custom-main-menu`, `window.header_is_sticky`, `window.enable_more_menu`, scope dispatch, and Salla menu/search/cart components. |
| Shared interactions | `data-show`, modal IDs, tab `data-target` / `data-component-id`, lazy `data-src` / `data-bg`, and `salla.event.*` dispatch/listen calls. |

Inline `onclick`/`onsubmit` attributes that invoke Salla APIs are functional contracts, not candidates for cosmetic cleanup unless equivalently migrated and tested.

## Technical debt and limitations

1. The current design is effectively one hard-coded Editorial Luxe identity. Token values collapse radii and shadows globally, preventing category-appropriate identities.
2. Merchant editor coverage is very small: 22 settings and 6 custom sections cannot deliver the requested store-to-store variation.
3. Several setting labels/default strings show mojibake when read through the current console, and most editor copy is Arabic-only. Encoding and bilingual labels need a controlled migration.
4. Tokens are concentrated in one file rather than split by concern. This is workable now but needs a documented boundary before the library grows.
5. `--font-main` still falls back to DINNextLTArabic while `theme.font.path` is supplied by Salla. The requested Alexandria/IBM Plex + balanced Latin system cannot be guaranteed without licensed/local assets or supported editor font sources.
6. Typography uses wide tracking and uppercase roles that require explicit Arabic overrides.
7. Repeated title/wrapper patterns remain across home templates; not every primitive is connected to real templates.
8. Price and rating presentation exists in both JavaScript-rendered cards and Twig pages. Visual tokens can be shared, but business rendering cannot be blindly consolidated across execution contexts.
9. Sass `@import` is deprecated. Migration to modules is possible but should be isolated from visual work.
10. Tailwind's Salla safelist and legacy utility surface produce a very large stylesheet. Removing it without a rendered-page inventory is high risk.
11. There is no automated test suite. Build success only proves compilation, not Salla runtime behavior.

## High-risk functional areas

- Product option and variant price updates, file/note inputs, availability, preorder, gifting, and sticky add-to-cart.
- Product card custom-element rendering across all Salla product types.
- Filter/sort/list updates and pagination/infinite loading owned by Salla components.
- Cart quantity/removal/coupon/checkout flow and the shared `checkout` entry.
- Header mega-menu/mobile menu behavior and global search/auth/cart overlays.
- Theme editor JSON migrations: removing or renaming existing IDs can invalidate merchant configuration.
- Raw merchant HTML: Twig cannot safely sanitize arbitrary markup by itself. A safe section must use a platform sanitizer/allowlist; otherwise only structured fields can be offered.

## Design and editor gaps

- No global preset selector or preset modifiers.
- No density, radius, motion, image-ratio, card, header, footer, product-page, collection-page, or cart-layout selectors.
- No shared section setting schema; current custom components expose unrelated fields and legacy preview assets.
- No custom HTML or approved custom-property editor.
- No complete starter-home composition defined in this repository; Salla's installation/default-component behavior constrains what can be prepopulated.
- Existing section variants are mostly separate templates or component capabilities, not a coherent merchant-facing system.

## Performance audit baseline

- Production output observed before this phase: `app.css` ~1,006,505 bytes, `app.js` ~349 KB, `product.js` ~123 KB, `home.js` ~65 KB, and several 30–65 KB auxiliary entries.
- Strengths: page-scoped entries, deferred scripts, lazy media in many templates, Lite YouTube, CDN image transforms, and reduced-motion CSS.
- Bottlenecks: broad Tailwind safelist, duplicated/legacy styles, global app bundle composition, font/icon stylesheets in the critical path, missing dimensions/aspect ratios in some merchant sections, and animation/polling legacy code.
- Lighthouse targets cannot be honestly certified without a running Salla preview, production data, network throttling, and browser traces. Build-time budgets and static checks will be added; platform limitations will remain documented.

## Accessibility findings

- A skip link, semantic main/header/footer landmarks, focus-visible styling, and reduced-motion guards now exist.
- Icon labels are inconsistent and some are English-only; localized accessible names are required.
- Native and Salla-component focus trapping must be verified in the live browser rather than assumed from markup.
- Grey utility colors and merchant-selected primary colors can fail AA. Semantic foreground tokens and contrast-safe button treatments are required.
- Touch targets and hover-revealed product actions need a no-hover/mobile pass.
- Heading order, form errors, carousel announcements, dynamic focus restoration, and empty states need page-by-page verification.

## RTL/LTR findings

- Document `dir` is correct and Tailwind RTL/LTR utilities are widely used.
- Legacy physical `left/right`, margins, borders, transforms, icon direction, and drawer placement remain in SCSS/Twig.
- Arabic-specific tracking and line-height are not fully enforced. Wide Latin eyebrow tracking must be neutralized under `lang="ar"`.
- Long Arabic merchant content, mixed numerals/currency, and 320 px layouts need visual verification.

## Recommended refactoring strategy

1. Add merchant-selectable presets and safe global controls as body modifiers and CSS-variable overrides; keep one template tree.
2. Normalize semantic tokens and language-specific typography before expanding components.
3. Introduce shared Twig macros/partials only where no platform component already owns behavior.
4. Build section families from proven Salla data sources, with common layout attributes and meaningful composition variants.
5. Apply variants incrementally to header/footer, cards, product, collection, cart, and search, preserving selectors first and changing composition second.
6. Treat custom HTML as a security feature: use structured safe content unless Salla exposes a documented sanitizer.
7. Add JSON/locales validation, selector-contract checks, and asset budgets to the build workflow.
8. Run browser QA against a real preview for Arabic/English, RTL/LTR, keyboard, touch, reduced motion, empty states, sale/out-of-stock, and product-option permutations before claiming completion.

## Phase 0 acceptance baseline

- Existing source contracts were inventoried.
- `twilight.json`, locale JSON, build entries, SCSS/Twig/JS structure, current documentation, and generated bundle sizes were inspected.
- Production changes have not been made during this analysis.
- The implementation sequence is defined in `IMPLEMENTATION_ROADMAP.md`.
