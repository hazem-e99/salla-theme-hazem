# Search capabilities

## Native supported behavior

The theme uses Salla's documented `<salla-search>` web component. Salla owns the product query, loading lifecycle, product-result data, modal behavior, and navigation to the full search result. The theme preserves that component in `layouts/master.twig` and only styles its published light-DOM class names.

## Theme presentation

- Premium modal surface, backdrop, input, loading spinner, empty state, and product-result cards.
- Full-screen mobile layout, RTL/LTR-safe spacing, visible focus treatment, and 44px minimum close target.
- The native modal remains responsible for focus containment, keyboard interaction, Escape-to-close, clear/search actions, and result activation.

## Unsupported without a separate product decision

The documented storefront component exposes product search. It does not document recent searches, popular-search terms, or predictive category results. This theme does not fabricate those datasets and does not make undocumented API calls. Category cards are therefore not injected into the native result list.

## Optional local-only enhancement

Recent terms could be stored per browser with `salla.storage`, but this would be device-local, would require explicit retention/privacy UX, and would not represent merchant analytics. It is intentionally disabled in this release.

## Verification contract

Test the native component in the connected Salla preview because its internal markup and SDK response are platform-delivered. Verify loading, no results, sale/out-of-stock products, keyboard result traversal, clear, close, Escape, focus return, Arabic RTL, English LTR, and the mobile full-screen presentation.
