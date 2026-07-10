# RTL / LTR audit

## Code audit completed

The premium system derives document direction from Salla's `theme.is_rtl` contract and keeps one DOM order. New layouts use logical properties (`inline-size`, `block-size`, `inset-inline-*`, `margin-inline`, and `padding-inline`) where direction affects placement.

Reviewed surfaces include header variants, mega navigation, native search styling, cart drawer, product cards, product gallery/layouts, variants, collection filters/layouts, pagination-adjacent styles, accordions, tabs, sliders, breadcrumbs, footer variants, and all premium/editorial/structured sections.

## Direction-sensitive behavior

- The cart drawer enters from inline-end; its fallback transform is explicitly reversed under `[dir='rtl']`.
- Tab arrow-key behavior reads computed direction and reverses previous/next mapping in RTL.
- Header, product, collection, cart, and editor variants use body-level variant classes without changing Salla selectors.
- Directional icons continue to use the existing `theme.is_rtl ? 'flip-x'` or `rtl:-scale-x-100` contracts where an arrow conveys movement.
- Content grids and media layouts avoid left/right assumptions. Mixed Arabic/English text inherits document direction while URLs, money, and numeric progress retain their native bidi behavior.

## Compatibility retained

Existing Tailwind `rtl:`/`ltr:` utilities used by Salla's base templates remain in the generated CSS inventories. No working hook, ID, form name, or JavaScript-critical selector was renamed during the logical-property pass.

## Live verification remaining

The code audit cannot certify platform-rendered web-component internals. Connected preview QA must verify Arabic and English at every required width, including long Arabic labels, mixed-script product names, prices, phone numbers, slider arrows, search results, cart variants, option values, filter chips, pagination, and truncated text. Any platform-originated direction defect should be recorded separately from theme CSS defects in `LIVE_QA_REPORT.md`.
