# Contributing

## Workflow

Work from a feature branch; premium-system work uses `feat/premium-theme-system`. Keep master untouched until review. Commit and push one verified phase at a time.

## Required checks

1. Preserve Salla Twig variables, hooks, forms, IDs, tags and SDK contracts.
2. Trace selectors before renaming/removing them.
3. Wire editor sections to Twig and `twilight.json` with bilingual labels and real variants.
4. Run `node scripts/sync-premium-components.mjs` after generated-definition changes.
5. Run `pnpm production`; it regenerates safelists and both CSS bundles.
6. Parse `twilight.json` and every locale JSON.
7. Run `git diff --check` and inspect generated assets.
8. Complete live Arabic/English responsive QA.

## Security and performance

Never add merchant JavaScript, scripts, handlers, `javascript:` URLs, arbitrary CSS, untrusted iframes, object/embed, executable SVG or eval-like behavior. Do not add section code globally unless used globally. Prefer lazy media, reserved ratios, observers, passive listeners and CSS motion.

If a Salla element is created programmatically, update the explicit safelist generator. Review evidence must include production sizes, routes/variants, RTL/LTR, accessibility, screenshots and console errors separated by theme/platform origin.
