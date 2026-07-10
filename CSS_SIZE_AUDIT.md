# CSS size audit

## Result

| Asset | Before | After | Delivery |
| --- | ---: | ---: | --- |
| `app.css` | 821,125 bytes (802 KiB) | 519,100 bytes (507 KiB) | Every storefront page |
| `page-components.css` | n/a | 237,648 bytes (232 KiB) | Non-home pages only |

`app.css` is 36.8% smaller and is below the 600 KiB release ceiling. The homepage no longer downloads Salla component rules that can only be exercised on product, collection, cart, account, order, blog, and other inner pages. Non-home pages load the page component bundle after the global bundle; their combined CSS is 756,748 bytes, still 64,377 bytes below the previous monolithic output.

## Largest source

The dominant source was not theme preset duplication. It was the upstream `@salla.sa/twilight-tailwind-theme/safe-list-css.txt`: 2,443 selector candidates caused CSS for essentially the full platform component catalog to be emitted into every page. A rule-level profile of the reduced intermediate build attributed approximately 439 KiB to Salla-prefixed component rules, versus approximately 172 KiB to theme-authored rules. Media rules accounted for a further approximately 96 KiB across both groups.

## Changes

- Replaced the all-platform content source with a generated component inventory.
- `scripts/sync-salla-safelist.mjs` scans real Twig and JavaScript usage and writes explicit global and page candidate files.
- Shared dependencies (`s-modal`, `s-sheet`, `s-button`, forms, loaders, skeletons, swiper, tabs, product cards, list tiles, and the drawer quantity input) remain in the global inventory.
- Page-only Salla components compile into `page-components.css`; this file is not requested by the homepage.
- Removed the redundant `@tailwindcss/line-clamp` plugin registration because Tailwind 3.4 provides it in core.
- Preset variations continue to use CSS custom properties rather than cloned component rule sets.

## Dynamic-class safety

This is not a wildcard purge. The inventory reads both Twig tags and Salla tags embedded in JavaScript template strings. The cart drawer's programmatically created `salla-quantity-input` is explicitly retained. Shared internal foundations are explicitly retained even when no matching custom-element tag exists in source. The generated files are committed so preview and marketplace builds are deterministic, and every production build refreshes them before compiling.

When adding a Salla component, add the real tag to its Twig/JavaScript implementation and run `pnpm production`; the relevant selector family is then included automatically. If a component is created using `document.createElement`, add its `s-*` selector prefix to the shared dependency list in the generator.

## Preserved behavior

- Salla search/modal, cart, quantity, product-card, slider, reviews, forms, user, checkout, order, and editor-section component families used by this repository.
- Responsive, RTL, state, focus, loading, error, sale, unavailable, and hydrated selectors belonging to those component families.
- All theme-authored utilities referenced by Twig and JavaScript.

The remaining validation gate is live Salla preview QA, because Salla injects the current SDK/web-component implementation at runtime. That QA must confirm no platform-delivered state class falls outside the component families retained here.
