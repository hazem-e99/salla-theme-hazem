# Component library

The theme's primitives are token-driven CSS classes and styled Salla web components. Business behavior stays with Salla; the library owns hierarchy, states, spacing, motion and responsive presentation.

## Implemented primitives

| Primitive | Selector / implementation | Connected surfaces |
| --- | --- | --- |
| Button and icon button | Existing `.btn` family and `salla-button` treatments | Product, cart, forms, home sections, account pages. |
| Text link | Existing link/arrow patterns | Section headings, product and content pages. |
| Badge / sale / stock | `.u-badge`, `.u-discount-badge`, `.u-stock` plus product-card status nodes | Product cards and product detail. |
| Chip / tag | `.u-chip` and existing tag/filter markup | Filters and product metadata. |
| Price | `.u-price` roles and shared token styling for Twig/JS price nodes | Product detail and custom product cards. |
| Rating | `.u-rating`, `salla-rating-stars`, product-card rating nodes | Product cards, product detail, testimonials. |
| Forms | Existing form/radio/radio-image modules plus tokenized focus states | Auth, checkout, customer, product options. |
| Quantity | `salla-quantity-input` presentation | Product and cart. |
| Breadcrumb | `salla-breadcrumb` presentation | Product, collection and content pages. |
| Tooltip / modal / toast | Existing tooltip, Salla modal and add-product/SweetAlert treatments | Global commerce interactions. |
| Skeleton | `.u-skeleton` and menu skeletons | Header and reusable loading states. |
| Empty state | `.u-empty` and `.no-content-placeholder` | Cart, wishlist, listings and system pages. |
| Section heading / divider | `.section-title`, `.u-divider` | Home and page sections. |
| Card shell | `.u-card` | Shared panels plus specialized commerce cards. |
| Trust / social / newsletter shell | `.u-trust`, Salla social/trust components, `.u-newsletter` | Footer and conversion sections. |

## Product-card system

The body modifier selected by `product_card_variant` restyles the real `custom-salla-product-card` output. It does not fork product rendering.

| Variant | Meaningful composition change |
| --- | --- |
| Editorial Borderless | Tall image-led tile, quiet metadata, no chrome. |
| Premium Card | Framed/elevated surface, padded content and lift interaction. |
| Compact Commerce | Square media, dense content, persistent CTA. |
| Image Overlay | Full-card media with readable gradient caption and persistent actions. |
| Minimal Grid | Quiet square catalogue tile with reduced secondary metadata. |
| Marketplace Dense | Strong frame, landscape media, two-line title footprint, price emphasis and persistent CTA. |

Merchant image ratio (`adaptive`, square, portrait, landscape) overrides a variant's recommended default. Merchant image fit remains controlled by the existing `s-product-card-image-cover` / `contain` classes. Horizontal, special, donation, minimal and full-image product business types retain their established structural rules.

## State contract

- Keyboard focus uses `:focus-visible` and the high-contrast focus token.
- Touch/coarse-pointer devices always show essential product actions.
- `:focus-within` reveals hover-recessed card actions.
- Disabled controls use the disabled opacity token and retain readable labels.
- Loading motion stops under `prefers-reduced-motion`.
- Sale, warning, success, danger and out-of-stock colors use semantic tokens.
- RTL uses document direction and logical properties; physical icon/legacy fixes stay in the dedicated RTL/LTR modules.

## Remaining Phase 2 components

Dedicated accessible tabs, accordion, dropdown, popover, alert, drawer and form-validation wrappers will be added only alongside a real consuming section/page. Salla-provided modal/search/menu/filter controls will be styled rather than reimplemented. This avoids shipping unused lookalike components or competing focus/event systems.
