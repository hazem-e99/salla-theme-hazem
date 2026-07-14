# ARCHITECTURE.md

> How this theme is built and why. Read alongside `THEME_STRUCTURE.md` (file map),
> `DESIGN_SYSTEM.md` (tokens), and `COMPONENTS.md` (UI kit).

---

## 1. Platform model

This is a **Salla Twilight** theme (a fork of the official `theme-raed`). Salla renders **Twig** templates server-side and hydrates a set of **web components** (`<salla-*>`) on the client. The theme provides:

- **Twig views** — layout and page structure, consuming Salla data variables.
- **SCSS** — styling, compiled through Tailwind + PostCSS.
- **JavaScript** — page-scoped controllers and a few custom elements.
- **`twilight.json`** — theme feature flags and merchant-configurable settings.

The build (Webpack) compiles `src/` → `public/`. Salla serves `public/`.

```
          ┌─────────────┐   build (webpack)   ┌──────────┐
   src/ ──►│ scss/js/twig│ ──────────────────► │  public/ │──► served by Salla
          └─────────────┘                     └──────────┘
```

---

## 2. Layers

### 2.1 Styling — ITCSS + Tailwind + Design Tokens

SCSS is organized in **ITCSS** order (`app.scss` imports in this sequence):

```
01-settings   tailwind · tokens · typography · fonts · global · breakpoints
02-generic    reset · common · tooltip · animations · lazyload · rtl · ltr · mixins
03-elements   form · buttons · radio · radio-images
04-components ui-kit · header · footer · menus · … · product · filters · …
05-utilities  a11y · chat-bots · swal · safari-fixes · font-customization
```

The **design-token layer** (`01-settings/_tokens.scss`) is the single source of truth: CSS custom properties for color, type, spacing, radius, shadow, motion, z-index, container. Everything downstream consumes tokens — no hardcoded design values. Tailwind (`tailwind.config.js`) exposes tokens as **non-colliding** utility names (`text-ink`, `rounded-token-md`, `shadow-focus`, `z-header`, …) so it never reshapes Salla/built-in classes.

Tailwind is consumed **inside SCSS via `@apply`** (a deliberate Raed choice to keep the DOM classlists short). New premium components use plain token-driven CSS.

**RTL/LTR:** the theme is bidirectional. `<html dir>` is set from `theme.is_rtl`. Directional styles use Tailwind `rtl:`/`ltr:` variants or `[dir="rtl"]` selectors. ⚠️ PostCSS lowers CSS logical properties (`*-inline-start/end`) to physical `left/right` **without** RTL awareness, so prefer the `rtl:`/`ltr:` variants or explicit `[dir=rtl]` overrides for directional spacing/borders (see `_typography.scss`, `home-blocks.scss` for the pattern).

### 2.2 JavaScript — page controllers + custom elements

- **`BasePage`** (`js/base-page.js`) — base class. Subclasses implement `onReady()` / `registerEvents()` and self-init via `Class.initiateWhenReady([allowedPages])`, which only runs on the matching `page.slug` after `theme::ready`.
- **`App` / `AppHelpers`** (`js/app.js`, `js/app-helpers.js`) — the global `window.app`: DOM helpers (`onClick`, `watchElements`, `toggleElementClassIf`, `anime`…), sticky header, mobile menu, modals, dropdowns, notifier.
- **Custom elements** — `custom-salla-product-card` (`partials/product-card.js`) and `custom-main-menu` (`partials/main-menu.js`) are theme-owned Web Components.
- **Salla SDK** — `salla.*` (cart, wishlist, event, config, lang, money, api…) is provided by the platform; the theme calls it, never reimplements it.

Bundled by Webpack into per-area entries (see `webpack.config.js`); templates load them with `{{ 'name.js'|asset }}`. **Entry names are a contract** — renaming one breaks the page that loads it.

### 2.3 Twig — layouts, pages, components

- **Layouts** (`views/layouts/`): `master.twig` (the HTML shell — head, header/footer components, hooks, Salla modals) and `customer.twig`.
- **Pages** (`views/pages/`): one template per route (product, cart, customer/*, blog/*, brands/*, …). Each declares its data contract in a header comment.
- **Components** (`views/components/`): `header`, `footer`, and the 21 merchant-composable **home blocks** rendered by `{% component home %}`.

**Extension points:** `{% hook 'name' %}` (Salla injects apps/tracking/custom content), `{% component %}`, `{% include %}`. These are contracts — keep them.

---

## 3. Data flow (example: add to cart)

```
product/single.twig  ── <salla-add-product-button product-id> (Salla WC)
        │                         │ click
        │                         ▼
        │                salla.cart.addItem()  (SDK)
        │                         │ emits
        ▼                         ▼
product.js (price/variant UI)   salla.cart.event.onItemAdded → app.js
                                  updates [data-cart-*], animates cart icon
```

The theme owns **presentation and page glue**; Salla owns **business logic and state**.

---

## 4. Design principles enforced

1. **Tokens first** — no hardcoded design values downstream.
2. **Additive & non-colliding** — new utilities/classes never override Salla/built-in names; existing markup renders unchanged unless intentionally upgraded.
3. **Opt-in** — `.type-*` and `.u-*` are applied deliberately, not by overriding base elements.
4. **Salla-safe** — never alter `<salla-*>` internals, Twig data contracts, hooks, form submit handlers, or webpack entry names.
5. **Buildable at every commit** — `pnpm run production` stays green; work is phased.
6. **Accessible & bidirectional by default** — focus rings, reduced motion, AA contrast, RTL/LTR.

---

## 5. Build & scripts

| Command | Purpose |
|---------|---------|
| `pnpm run production` / `prod` | Production build → `public/`. |
| `pnpm run development` | Dev build. |
| `pnpm run watch` | Watch mode (with Salla `ThemeWatcher`). |

Requires **pnpm** (enforced by `preinstall`). Node ≥ 18.

---

## 6. Where to make changes

| I want to… | Edit… |
|------------|-------|
| Change a color/space/shadow globally | `01-settings/_tokens.scss` |
| Add a type style | `01-settings/_typography.scss` |
| Add a reusable UI primitive | `04-components/_ui-kit.scss` (+ document in `COMPONENTS.md`) |
| Restyle a page | that page's `.twig` (+ its `04-components/*.scss`) |
| Add page behavior | the page's JS controller (extend `BasePage`) |
| Add a merchant setting | `twilight.json` `settings` (+ read via `theme.settings.get`) |
