# Live QA report

## Status

**Blocked before visual execution.** Salla's CLI preview infrastructure works, but the browser is redirected to interactive Salla login protected by Cloudflare Turnstile. Automated Chrome cannot complete that human verification, and the challenge must not be bypassed.

This report does not claim that pages, variants, widths, languages, keyboard paths, touch behavior, reduced motion or storefront console output were visually tested.

## Infrastructure verified on 2026-07-11

- CLI can list partner themes and the `hazem-test` demo store.
- Repository, GitHub and theme-ID preview checks pass.
- Salla creates a live draft URL.
- Local assets return HTTP 200; asset and WebSocket servers listen.
- Preview retains `page-components.css` after Webpack clean (a defect found and fixed during this run).
- Production assets were rebuilt after stopping preview.

## Issue fixed

The watch order originally generated `page-components.css` before Webpack's clean, which deleted it. It now writes to `src/assets/generated/`, and Webpack copies it after cleaning.

## External blocker

| Area | Result |
| --- | --- |
| Salla auto-auth | Redirects to interactive login |
| Browser challenge | Cloudflare Turnstile requires a human |
| Theme console errors | Not measurable until storefront loads |
| Platform console errors | Authentication page only; not storefront evidence |

## Required manual execution after login

Test homepage, product, collection, full cart, cart drawer, search, wishlist, account, blog, article, static page and 404. Exercise every header/footer/product-card/product-page/collection layout and every new editor section.

Repeat in Arabic RTL and English LTR at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1600 and 1920 px. Cover keyboard, touch, reduced motion, long Arabic content, missing images, sale/out-of-stock products, and products with/without variants.

For each failure record route, language, viewport, preset/variant, reproduction, screenshot, console stack and whether the source is theme code, injected Twilight runtime, store data or platform. Do not mark release complete until this matrix passes.
