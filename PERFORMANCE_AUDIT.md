# Performance audit

## Release measurements

Measurements are uncompressed production artifacts from `pnpm production` on 2026-07-11.

- Global CSS: 519,100 bytes (507 KiB), down from 821,125 bytes (802 KiB).
- Inner-page Salla component CSS: 237,623 bytes (232 KiB), excluded from the homepage.
- Global JavaScript: `app.js` is 117,311 bytes (115 KiB), down from 126,436 bytes before route-scoping blog behavior.
- Theme-owned font files: 0 bytes. The active merchant font and Salla icon font are delivered by Salla's CDN, so their final payload and cache headers cannot be measured from this repository.

| JavaScript entry | Bytes |
| --- | ---: |
| app | 117,311 |
| product | 53,228 |
| home | 37,039 |
| add-product-toast | 17,997 |
| cart-drawer | 16,582 |
| product-card | 16,101 |
| blog | 11,963 |
| checkout | 11,175 |
| testimonials | 9,932 |
| main-menu | 9,870 |
| pages | 6,421 |
| safe-content | 5,791 |
| structured-sections | 5,772 |
| digital-files | 5,720 |
| wishlist-card | 5,142 |
| order | 3,389 |

## Improvements completed

- Replaced the monolithic Salla platform safelist with deterministic global/page inventories; see `CSS_SIZE_AUDIT.md`.
- Safe HTML and structured tabs/free-shipping behavior load only when their sections render.
- Blog behavior is no longer bundled into the global entry and loads only on blog routes.
- Product, collection, checkout, order, testimonial, digital-file, and wishlist-card behaviors remain separate page/component entries.
- Replaced asynchronous menu `setInterval` polling with `MutationObserver`.
- Replaced the brands-page scroll handler with `IntersectionObserver`.
- Existing sticky-header scroll work uses a passive listener; media-query and reduced-motion CSS avoid unnecessary scripted animation.
- New editorial and structured media reserves explicit dimensions/aspect ratios. Below-the-fold images use `loading="lazy"`; videos use `preload="metadata"`; YouTube uses the lightweight lazy embed component.
- No new third-party runtime dependency was added.

## Loading policy

The global entry is limited to behavior required on ordinary storefront pages: navigation, wishlist state, global notifications, shared cart events, and common UI. The cart drawer is global because its trigger is in the global header. Product-card and menu custom elements are global because those elements can be rendered by Salla on several page families and in editor sections.

Section scripts are direct, deferred assets emitted only by the relevant Twig section. No section registers a scroll loop. Native media loading and `IntersectionObserver` are preferred over scroll position polling.

## Known platform limits

Salla injects the current Twilight SDK and web-component runtime and serves merchant-selected fonts. Their transfer size, internal listeners, caching, and component shadow/light DOM are outside the repository bundle. Real LCP, CLS, INP, font transfer, and cache behavior therefore require the connected preview and cannot be truthfully certified from Webpack artifacts alone.

## Live verification remaining

Use the connected preview to record cold/warm network waterfalls, font payload, LCP element, CLS sources, long tasks, duplicate SDK calls, video/iframe requests before intersection, and console errors. Test a content-heavy homepage and product/collection pages with maximum editor sections.
