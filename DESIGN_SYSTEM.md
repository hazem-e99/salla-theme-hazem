# Design system

The theme uses one semantic token API and one template tree. Merchant settings emit modifier classes on `<body>`; presets remap tokens rather than duplicating Twig or JavaScript.

## Visual strategy

The system is category-neutral but not visually neutral. It offers four deliberate identities:

| Preset | Composition and character | Best fit |
| --- | --- | --- |
| Editorial Luxe | Large section rhythm, fine rules, image-led storytelling, restrained type and near-square surfaces. | Fashion, jewelry, furniture, premium lifestyle. |
| Modern Minimal | Geometric spacing, sharp high contrast, compact precision and fast interactions. | Technology, fashion, books, general retail. |
| Soft Premium | Cool pearl surfaces, generous tactile cards, rounded geometry and quiet elevation. | Beauty, perfumes, gifts, food, home. |
| Bold Commerce | Dense merchandising, decisive borders, heavier hierarchy and price-led scanning. | Electronics, high-SKU stores, promotions, general retail. |

The shared signature is controlled accent color: Salla's merchant primary color marks actions, focus and selected states while surfaces, type and imagery carry the identity. This avoids the generic result of flooding every component with one brand color.

## Token layers

Source files:

- `src/assets/styles/01-settings/_tokens.scss`: default primitives and semantic aliases.
- `src/assets/styles/01-settings/_presets.scss`: preset maps and merchant overrides.
- `src/assets/styles/01-settings/_typography.scss`: reusable role classes.
- `tailwind.config.js`: token-backed utility aliases plus legacy compatibility keys.

### Color

Public semantic tokens are `--color-ink`, `--color-paper`, `--color-surface`, `--color-surface-elevated`, `--color-muted`, `--color-border`, `--color-border-strong`, `--color-primary`, `--color-primary-hover`, `--color-secondary`, `--color-accent`, `--color-success`, `--color-warning`, `--color-danger`, `--color-info`, `--color-sale`, and `--color-out-of-stock`.

`--color-primary`, its light/dark derivatives, and reverse foreground are injected by Salla in `master.twig`. Presets must consume them, not overwrite merchant branding.

### Typography

Family, weight, fluid size, line-height, tracking, display/body/label/caption/price roles are documented in `TYPOGRAPHY_SYSTEM.md`. Arabic and English resolve through separate stacks.

### Spacing and layout

The spacing scale covers 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 80, 96, 128 and 160 px. Semantic tokens include `--section-y`, `--block-gap`, `--card-space`, `--page-space`, `--header-space`, `--footer-space`, `--container-max`, `--container-narrow`, `--container-wide`, and `--container-pad`.

Density controls (`compact`, `balanced`, `airy`) remap section/card rhythm independently from the chosen preset. Content width controls (`narrow`, `standard`, `wide`) remap the real `.container` maximum width.

### Shape, elevation and borders

- Radius: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `full`.
- Merchant corner overrides: preset, square, subtle, soft.
- Shadows: none, xs, sm, md, lg, focus plus semantic soft/floating/overlay aliases.
- Borders: hairline and strong widths with semantic normal/strong colors.

### Motion

Durations are fast, normal/base and slow. Easing includes standard, emphasized and decelerate. Merchant choices are reduced, subtle and expressive. `prefers-reduced-motion: reduce` always wins and collapses non-essential duration tokens globally.

### Layering

Semantic z-index tokens cover base, raised, sticky, header, dropdown, drawer, overlay, modal, toast and emergency maximum. New components must use these tokens rather than arbitrary integers.

## Merchant controls introduced in Phase 1

- `theme_preset`
- `theme_density`
- `theme_corner_style`
- `theme_motion`
- `theme_container_width`
- `header_variant`
- `footer_variant`
- `product_card_variant`
- `product_page_layout`
- `collection_layout`
- `cart_layout`
- `product_image_ratio`

Layout selectors are stable now so later phases can add meaningful compositions without a second editor migration. Product image ratio is already connected to the real custom product card; preset/density/shape/motion/width choices already affect global surfaces.

## Rules for implementation

1. Use semantic tokens in components. Add a token instead of scattering a repeated literal.
2. Preserve a component's functional selectors and Salla attributes when changing composition.
3. Variants must change hierarchy or layout, not only color.
4. Essential actions remain visible without hover and reachable by keyboard.
5. Use logical properties by default and add explicit RTL fixes only where platform output requires physical properties.
6. Merchant primary colors are untrusted for contrast; filled buttons use the Salla-provided reverse foreground and focus uses the dedicated high-contrast ring.
7. A visual preset cannot alter business logic, data sources, APIs, events or Twig contracts.
