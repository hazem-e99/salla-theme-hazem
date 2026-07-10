# Accessibility audit

## Code-level WCAG AA review

- A keyboard-visible skip link targets the semantic `main` landmark.
- Native page headings and premium section heading levels are preserved; repeated item titles sit below section headings.
- Global focus-visible styles and component-specific focus rings remain visible without relying on color alone.
- Icon-only header and drawer controls have accessible labels and 44px minimum targets.
- The premium cart drawer uses `role="dialog"`, `aria-modal`, an accessible title, initial focus, contained Tab/Shift+Tab behavior, Escape-to-close, focus return, and a polite live status region.
- Tabs implement tab/tablist/tabpanel semantics, roving tabindex, Home/End, and direction-aware arrow keys.
- FAQ/accordion content uses native `details`/`summary` keyboard behavior.
- New images carry alt attributes and dimensions; decorative images use empty alt text. Videos retain native controls and do not autoplay with sound.
- Free-shipping progress exposes min/max/current values and live text.
- Reduced-motion rules disable new transitions/animations when requested.
- Cart removal and CTA controls do not depend on hover; mobile controls meet the target-size baseline.

## Platform-owned behavior

Salla owns the native search modal, quantity input, product option controls, carousels, login, checkout, and other web-component internals. The theme does not replace their keyboard or form contracts. Search focus containment, Escape, clear control, result announcement, and result traversal must be verified against the injected runtime in preview.

## Items requiring live/manual verification

- Automated axe/WAVE pass on all required routes in Arabic and English.
- Screen-reader naming/order for Salla shadow/light DOM components.
- Focus order through header variants, mobile menu, native search, cart drawer, checkout, filters, and product options.
- Contrast using merchant-selected primary colors and every preset/state.
- Error association and live announcements returned by Salla forms/APIs.
- Carousel names, slide counts, disabled states, and touch/keyboard parity.
- 200% zoom/reflow and 320px layout without two-dimensional page scrolling.

No audit is marked finally passed until those checks are performed in the connected Salla preview and recorded in `LIVE_QA_REPORT.md`.
