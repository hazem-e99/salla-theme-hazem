# DESIGN_SYSTEM.md

> The design language for this premium Salla theme. Direction: **Editorial Luxe**.
> Every value here becomes a token (CSS custom property) consumed by SCSS and Tailwind. **Nothing is hardcoded downstream.**

---

## 0. Design Direction — "Editorial Luxe"

A warm-neutral canvas, near-black ink, and generous whitespace. A refined **serif display** face carries personality in headlines; a clean **grotesque sans** carries the body. Hairline dividers, small crisp radii, soft low shadows. The **merchant's runtime color** (`--color-primary`, injected by Salla per store) is treated as a *disciplined accent* — used for CTAs, active states, and small emphasis, never as large flat fills. The signature move is an **editorial product presentation**: quiet chrome, confident typography, images given room to breathe.

**Boldness is spent in one place** (per the frontend-design skill): the type + image composition. Everything else stays quiet and disciplined.

> **Salla constraint:** `--color-primary` and `--color-primary-dark/-light/-reverse` are injected at runtime in `layouts/master.twig`. Our tokens must *layer on top* of that — we define neutrals, surfaces, semantic colors, and accent *usage*, and we consume the merchant primary as-is. We never hardcode over the merchant's injected primary.

---

## 1. Color Tokens

### 1.1 Brand / Accent (merchant-driven — consumed, not redefined)

| Token | Source | Usage |
|-------|--------|-------|
| `--color-primary` | Salla runtime | Primary accent: CTAs, active nav, links, focus. |
| `--color-primary-dark` | Salla runtime | Hover/pressed accent. |
| `--color-primary-light` | Salla runtime | Tint backgrounds, subtle highlights. |
| `--color-primary-reverse` | Salla runtime | Text/icon color on top of primary. |

Fallbacks (only if Salla doesn't inject) resolve to a tasteful graphite so the theme never looks broken in preview.

### 1.2 Ink & Neutral scale (theme-owned)

Warm-tinted neutrals — the "luxe" warmth lives here.

| Token | Value | Role |
|-------|-------|------|
| `--color-ink` | `#14110F` | Primary text / near-black (warm). |
| `--color-ink-soft` | `#413B36` | Secondary text. |
| `--color-ink-muted` | `#78706A` | Tertiary / captions (AA on canvas). |
| `--color-line` | `#E7E2DC` | Hairline dividers / borders. |
| `--color-line-strong` | `#D8D1C8` | Emphasized borders. |
| `--neutral-50` | `#FAF9F7` | Canvas (page background). |
| `--neutral-100` | `#F3F0EB` | Sunken surface. |
| `--neutral-200` | `#E7E2DC` | Border-ish. |
| `--neutral-300` | `#D8D1C8` | |
| `--neutral-400` | `#B4ABA1` | |
| `--neutral-500` | `#8B8178` | |
| `--neutral-600` | `#6B6259` | |
| `--neutral-700` | `#4A433D` | |
| `--neutral-800` | `#2C2723` | |
| `--neutral-900` | `#14110F` | |

### 1.3 Surfaces

| Token | Value | Role |
|-------|-------|------|
| `--surface-canvas` | `var(--neutral-50)` | Page background. |
| `--surface-raised` | `#FFFFFF` | Cards, panels. |
| `--surface-sunken` | `var(--neutral-100)` | Wells, inputs. |
| `--surface-inverse` | `var(--neutral-900)` | Dark sections / footer-dark. |

### 1.4 Semantic (theme-owned, tokenized — replaces ad-hoc `text-red-800` etc.)

| Token | Value | Role |
|-------|-------|------|
| `--color-success` | `#2F7D5B` | In-stock, confirmations. |
| `--color-success-soft` | `#E7F1EC` | Success bg. |
| `--color-warning` | `#B8791B` | Low stock, caution. |
| `--color-warning-soft` | `#FBF1E1` | Warning bg. |
| `--color-danger` | `#B23A2E` | Sale price, errors, out-of-stock. |
| `--color-danger-soft` | `#F7E7E4` | Danger bg. |
| `--color-info` | `#3A5B8C` | Informational. |
| `--color-sale` | `var(--color-danger)` | Discount emphasis (alias, semantic naming). |

---

## 2. Typography Tokens

**Display:** a refined serif (`--font-display`) — falls back through system serifs. **Body:** the merchant/Salla sans (`--font-main`) — already injected. We **do not** override the merchant's Arabic font; the serif display is an *optional accent* used in Latin/editorial contexts and gracefully falls back so RTL Arabic stays in the merchant font.

### 2.1 Families

| Token | Stack |
|-------|-------|
| `--font-display` | `var(--font-main), "Playfair Display", Georgia, "Times New Roman", serif` *(configurable)* |
| `--font-body` | `var(--font-main), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |
| `--font-mono` | `ui-monospace, SFMono-Regular, Menlo, monospace` |

> Note: to keep RTL/Arabic pristine and avoid loading a Latin serif the merchant didn't choose, `--font-display` defaults to the merchant font. A theme setting can opt into a true serif display. This respects the Salla font contract.

### 2.2 Fluid type scale (`clamp(min, vw, max)`)

| Token | Clamp | Role |
|-------|-------|------|
| `--text-display` | `clamp(2.5rem, 1.6rem + 4vw, 4.5rem)` | Hero display. |
| `--text-h1` | `clamp(2rem, 1.4rem + 2.6vw, 3rem)` | Page titles. |
| `--text-h2` | `clamp(1.6rem, 1.2rem + 1.8vw, 2.25rem)` | Section titles. |
| `--text-h3` | `clamp(1.3rem, 1.05rem + 1vw, 1.6rem)` | Card titles. |
| `--text-h4` | `clamp(1.15rem, 1rem + 0.5vw, 1.3rem)` | Sub-headings. |
| `--text-body-lg` | `1.125rem` | Lead paragraph. |
| `--text-body` | `1rem` | Default body. |
| `--text-body-sm` | `0.875rem` | Secondary. |
| `--text-caption` | `0.75rem` | Captions/meta. |
| `--text-eyebrow` | `0.6875rem` | Uppercase eyebrow labels. |

### 2.3 Weights / tracking / leading

| Token | Value |
|-------|-------|
| `--weight-regular` | `400` |
| `--weight-medium` | `500` |
| `--weight-semibold` | `600` |
| `--weight-bold` | `700` |
| `--tracking-tight` | `-0.02em` (display) |
| `--tracking-normal` | `0` |
| `--tracking-wide` | `0.08em` (eyebrows/labels) |
| `--leading-tight` | `1.1` |
| `--leading-snug` | `1.35` |
| `--leading-normal` | `1.6` |
| `--leading-relaxed` | `1.8` (long-form) |

### 2.4 Roles

`display, h1, h2, h3, h4, subheading, body-lg, body, body-sm, caption, eyebrow, label, button` — each maps size + weight + tracking + leading. Utilities: `.type-*`.

---

## 3. Spacing Scale (8px-based, with 4px half-steps)

| Token | Value | | Token | Value |
|-------|-------|---|-------|-------|
| `--space-0` | 0 | | `--space-6` | 24px |
| `--space-px` | 1px | | `--space-8` | 32px |
| `--space-1` | 4px | | `--space-10` | 40px |
| `--space-2` | 8px | | `--space-12` | 48px |
| `--space-3` | 12px | | `--space-16` | 64px |
| `--space-4` | 16px | | `--space-20` | 80px |
| `--space-5` | 20px | | `--space-24` | 96px |
| | | | `--space-32` | 128px |

**Section rhythm:** `--section-y` = `clamp(3rem, 2rem + 4vw, 6rem)`; `--block-gap` = `--space-16`.

---

## 4. Radius

| Token | Value | Role |
|-------|-------|------|
| `--radius-none` | 0 | Sharp editorial edges. |
| `--radius-xs` | 4px | Inputs, chips. |
| `--radius-sm` | 8px | Buttons, small cards. |
| `--radius-md` | 12px | Cards. |
| `--radius-lg` | 16px | Panels. |
| `--radius-xl` | 22px | Feature cards (maps to legacy `large`). |
| `--radius-2xl` | 32px | Hero. |
| `--radius-full` | 9999px | Pills, avatars. |

*(Legacy Tailwind `large:22px`, `big:40px`, `tiny:3px` kept as aliases.)*

---

## 5. Shadow / Elevation

Soft, low, warm-tinted — luxe restraint.

| Token | Value | Elevation |
|-------|-------|-----------|
| `--shadow-none` | none | 0 |
| `--shadow-xs` | `0 1px 2px rgba(20,17,15,.04)` | 1 |
| `--shadow-sm` | `0 2px 8px rgba(20,17,15,.05)` | 2 |
| `--shadow-md` | `0 8px 24px rgba(20,17,15,.06)` | 3 |
| `--shadow-lg` | `0 16px 48px rgba(20,17,15,.08)` | 4 |
| `--shadow-focus` | `0 0 0 3px var(--color-primary-light)` | focus ring |

---

## 6. Border

| Token | Value |
|-------|-------|
| `--border-width` | 1px |
| `--border-width-strong` | 2px |
| `--border-color` | `var(--color-line)` |
| `--border-color-strong` | `var(--color-line-strong)` |
| `--hairline` | `1px solid var(--color-line)` |

---

## 7. Opacity

| Token | Value |
|-------|-------|
| `--opacity-disabled` | 0.45 |
| `--opacity-muted` | 0.7 |
| `--opacity-hover` | 0.85 |
| `--opacity-overlay` | 0.5 |

---

## 8. Transition / Motion

| Token | Value |
|-------|-------|
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--ease-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-elastic` | `cubic-bezier(0.55, 0, 0.1, 1)` (legacy alias) |
| `--duration-fast` | 150ms |
| `--duration-base` | 250ms |
| `--duration-slow` | 400ms |
| `--transition-base` | `all var(--duration-base) var(--ease-standard)` |

**All motion is wrapped in `@media (prefers-reduced-motion: reduce)` guards.**

---

## 9. Breakpoints

Aligned to the brief's device widths. Tailwind screens: `xxs 380`, `xs 480`, `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`. Design QA widths: **320, 375, 390, 414, 768, 1024, 1280, 1440, 1600, 1920**.

---

## 10. Container

| Token | Value |
|-------|-------|
| `--container-max` | 1280px |
| `--container-pad` | `clamp(1rem, 0.5rem + 2vw, 2.5rem)` |
| `--container-narrow` | 768px (long-form/blog) |
| `--container-wide` | 1536px (full-bleed home) |

---

## 11. Z-index

| Token | Value | Role |
|-------|-------|------|
| `--z-base` | 0 | |
| `--z-raised` | 10 | |
| `--z-sticky` | 20 | sticky bars |
| `--z-header` | 30 | header |
| `--z-drawer` | 40 | mobile drawer |
| `--z-overlay` | 50 | overlays/backdrops |
| `--z-modal` | 60 | modals |
| `--z-toast` | 70 | toasts |
| `--z-max` | 9999 | |

---

## 12. Focus (Accessibility)

Global `outline` is disabled in the current Tailwind config (`corePlugins.outline:false`). We **reintroduce visible, token-based focus** via `:focus-visible { box-shadow: var(--shadow-focus) }` on interactive elements — WCAG 2.4.7 compliant without the default browser outline.

---

## 13. Token → Tailwind mapping (Phase 1)

Tailwind `theme.extend` will reference these tokens so utilities and `@apply` stay in sync:

- `colors`: `ink`, `ink-soft`, `ink-muted`, `line`, `neutral-*`, `success`, `warning`, `danger`, `info`, `sale`, and the existing `primary*` (unchanged).
- `boxShadow`: `xs/sm/md/lg/focus` (legacy keys kept).
- `borderRadius`: `xs/sm/md/lg/xl/2xl` (legacy `large/big/tiny` kept as aliases).
- `spacing`, `fontSize`, `lineHeight`, `letterSpacing`, `transitionTimingFunction`, `zIndex`, `screens`: extended, **legacy keys preserved**.

**No existing key is removed** → no class ever breaks → build stays green.
