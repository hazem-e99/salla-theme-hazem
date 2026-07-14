# COMPONENTS.md

> The reusable component library for this theme. Every component is **token-driven**
> (see `DESIGN_SYSTEM.md`), **opt-in**, and **namespaced** (`u-*` / `type-*` /
> `section-title`) so it never collides with existing theme or Salla classes.
>
> Two categories:
> 1. **Theme primitives** — SCSS classes we author (this file).
> 2. **Salla web components** (`<salla-*>`) — platform-owned; we style *around* them, never reimplement them.

---

## Where things live

| Layer | File | Contents |
|-------|------|----------|
| Tokens | `01-settings/_tokens.scss` | All CSS-variable design tokens. |
| Typography | `01-settings/_typography.scss` | `.type-*` roles, `.prose-editorial`. |
| UI kit | `04-components/_ui-kit.scss` | The primitives below. |
| Buttons | `03-elements/buttons.scss` | `.btn` system (+ focus ring). |

---

## Typography utilities (`.type-*`)

| Class | Use |
|-------|-----|
| `.type-display` | Hero / editorial display headline (serif). |
| `.type-h1` … `.type-h4` | Heading scale (h1/h2 serif, h3/h4 sans). |
| `.type-subheading` | Quiet supporting line under a heading. |
| `.type-body-lg` / `.type-body` / `.type-body-sm` | Body copy scale. |
| `.type-caption` | Meta, timestamps, fine print. |
| `.type-eyebrow` | Small uppercase section label. |
| `.type-label` | Form labels, chips. |
| `.type-button` | Button text. |
| `.type-price` | Tabular-numeral pricing. |
| `.prose-editorial` | Long-form container (product desc, blog, pages). |
| `.text-balance` / `.text-pretty` | Headline wrap helpers. |

---

## UI Kit primitives (`.u-*`)

### `.section-title`
Editorial section header. Structure:
```html
<div class="section-title">
  <div class="section-title__group">
    <span class="section-title__eyebrow">New in</span>
    <h2 class="section-title__heading">Featured Products</h2>
  </div>
  <a class="section-title__link" href="…">View all <i class="sicon-arrow-left"></i></a>
</div>
```
Modifier: `.section-title--center`.

### `.u-badge`
Status/label pill. Variants: `--neutral`, `--primary`, `--success`, `--warning`, `--danger`, `--solid`; size `--sm`.

### `.u-discount-badge`
Overlay discount tag (e.g. `-25%`) for product media.

### `.u-stock`
In-stock indicator with dot. Variants: `--in`, `--low`, `--out`.

### `.u-chip`
Selectable pill for filters/tags. Active via `.is-active` or `aria-pressed="true"`.

### `.u-price`
Unified price. Elements: `__current`, `__original` (struck), `__from`. Modifier `--sale`.
```html
<div class="u-price u-price--sale">
  <span class="u-price__current">75.00 SAR</span>
  <span class="u-price__original">100.00 SAR</span>
</div>
```

### `.u-rating`
Compact stars + count (`__count`). Visual only — bind counts from Salla data.

### `.u-skeleton`
Loading placeholder. Variants: `--text`, `--title`, `--image`, `--circle`. Animation auto-disabled under `prefers-reduced-motion`.

### `.u-card`
Elevated surface shell. Modifiers: `--interactive` (hover lift), `--flat`, `--sunken`.

### `.u-empty`
Premium empty/error state. Elements: `__icon`, `__title`, `__text`. (Complements the existing `.no-content-placeholder`.)

### `.u-trust`
Reassurance strip (auto-fit grid). Item: `__item` + `__icon`, `__title`, `__text`.

### `.u-newsletter`
Inline subscribe shell: `__input` + a `.btn`. Wrap around Salla's newsletter form; keep its submit logic.

### `.u-divider`
Hairline rule; `--label` variant for a centered label.

---

## Buttons (`.btn` system — existing, elevated)

Existing modifiers retained: `--primary`, `--outline`, `--outline-primary`, `--danger`, `--icon`, `--rounded-gray`, `--circle-gray`, `--collapse`, `--wishlist`, `--quantity`, `--close`, `--rounded-full`. **Added:** token-based `:focus-visible` ring for keyboard accessibility.

> Prefer `<salla-button>` where Salla expects it (add-to-cart, wishlist toggle). Use `.btn` for theme-level actions.

---

## Accessibility

A global `:focus-visible` ring (`--shadow-focus`) is restored for links, buttons, `salla-button`, inputs, `[tabindex]`, and `summary` — reversing the globally-disabled outline **without** showing rings on mouse/touch. WCAG 2.4.7 compliant.

---

## Salla web components (do NOT reimplement)

Styled around, never rebuilt: `salla-cart-summary`, `salla-search`, `salla-menu`, `salla-user-menu`, `salla-product-options`, `salla-add-product-button`, `salla-quantity-input`, `salla-rating-stars`, `salla-comments`, `salla-installment`, `salla-gifting`, `salla-offer(-modal)`, `salla-localization-modal`, `salla-social(-share)`, `salla-payments`, `salla-trust-badges`, `salla-apps-icons`, `salla-slider`, `salla-products-slider`, `salla-progress-bar`, `salla-count-down`, `salla-breadcrumb`, `salla-login-modal`, `salla-scopes`, `salla-quick-order`, `salla-metadata`, plus the theme's own `custom-salla-product-card` and `custom-main-menu`.
