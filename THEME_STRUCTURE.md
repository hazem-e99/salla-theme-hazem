# THEME_STRUCTURE.md

> File-and-folder map of the theme. Companion to `ARCHITECTURE.md`.

```
hazem-dev/
├── PROJECT_ANALYSIS.md      Pre-redesign audit (architecture, debt, a11y/SEO/perf)
├── IMPLEMENTATION_PLAN.md   8-phase roadmap
├── DESIGN_SYSTEM.md         Token spec (Editorial Luxe)
├── COMPONENTS.md            Reusable UI-kit reference
├── ARCHITECTURE.md          How it's built & why
├── THEME_STRUCTURE.md       This file
├── README.md                Getting started
├── CHANGELOG.md             Fork redesign log (top) + upstream Raed log
│
├── twilight.json            Theme features + merchant settings (contract)
├── tailwind.config.js       Tailwind theme (token-backed, non-colliding)
├── webpack.config.js        Build entries → public/ (entry names = contract)
├── postcss.config.js        PostCSS (tailwind, nesting, preset-env, autoprefixer)
├── package.json             pnpm scripts & deps
│
├── public/                  ⚙️ BUILD OUTPUT — committed, served by Salla.
│                               Do not hand-edit; regenerate via build.
│
└── src/
    ├── locales/             Theme translation overrides (ar.json, en.json)
    │
    ├── assets/
    │   ├── images/          Static images (copied to public/images)
    │   │
    │   ├── js/
    │   │   ├── app.js               Global App (window.app): sticky, menu, modals…
    │   │   ├── app-helpers.js       DOM helper toolkit (AppHelpers base)
    │   │   ├── base-page.js         BasePage: page-controller base class
    │   │   ├── cart.js              Cart page controller
    │   │   ├── product.js           Product page controller (price/variant UI)
    │   │   ├── products.js          Products/collection behavior
    │   │   ├── home.js              Home page behavior
    │   │   ├── wishlist.js          Wishlist behavior
    │   │   ├── blog.js · brands.js · loyalty.js · order.js · testimonials.js
    │   │   ├── thankyou.js          Thank-you page
    │   │   ├── twilight.js          Salla SDK glue (excluded from babel)
    │   │   └── partials/
    │   │       ├── product-card.js       <custom-salla-product-card> web component
    │   │       ├── main-menu.js          <custom-main-menu> web component
    │   │       ├── wishlist-card.js
    │   │       ├── add-product-toast.js
    │   │       ├── digital-files.js
    │   │       ├── validate-product-options.js
    │   │       ├── image-zoom.js · anime.js · tooltip.js
    │   │
    │   └── styles/                   ITCSS layers (see app.scss)
    │       ├── app.scss              Import manifest (order matters)
    │       ├── 01-settings/
    │       │   ├── tailwind.scss     @tailwind base/components/utilities
    │       │   ├── _tokens.scss      ★ Design tokens (single source of truth)
    │       │   ├── _typography.scss  ★ .type-* roles + .prose-editorial
    │       │   ├── fonts.scss · global.scss · breakpoints.scss
    │       ├── 02-generic/
    │       │   └── reset · common · tooltip · animations · lazyload
    │       │       · rtl · ltr · _mixins
    │       ├── 03-elements/
    │       │   └── form · buttons (+ focus ring) · radio · radio-images
    │       ├── 04-components/
    │       │   ├── _ui-kit.scss      ★ Reusable primitives (u-*, section-title)
    │       │   ├── header · footer · menus · user-menu · user-pages
    │       │   ├── home-blocks · slider · product · brands · filters
    │       │   ├── gifting · loyalty · landing-page · no-content-placeholder
    │       │   └── add-product-toast · virtooal
    │       └── 05-utilities/
    │           ├── _a11y.scss        ★ Reduced-motion guard + skip link
    │           └── chat-bots · swal · safari-fixes · font-customization
    │
    └── views/
        ├── layouts/
        │   ├── master.twig          HTML shell: head, header/footer, hooks,
        │   │                        Salla modals, skip link, JSON-LD block
        │   └── customer.twig        Customer-area layout
        │
        ├── components/
        │   ├── header/header.twig   Store header (top-nav + main-nav)
        │   ├── footer/footer.twig   Store footer
        │   └── home/                21 merchant-composable home blocks:
        │       ├── enhanced-slider · photos-slider · products-slider
        │       ├── slider-products-with-header · featured-products-style{1,2,3}
        │       ├── fixed-banner · fixed-products · latest-products
        │       ├── enhanced-square-banners · square-photos · main-links
        │       ├── parallax-background · store-features · brands
        │       ├── testimonials · custom-testimonials · youtube
        │
        └── pages/
            ├── index.twig           Home ({% component home %})
            ├── product/
            │   ├── single.twig      Product detail (gallery, price, form, JSON-LD)
            │   └── index.twig       Collection / category listing
            ├── cart.twig · thank-you.twig · landing-page.twig
            ├── page-single.twig · loyalty.twig · testimonials.twig
            ├── customer/
            │   ├── profile · wishlist · wallet · notifications
            │   └── orders/{index,single}
            ├── blog/{index,single} · brands/{index,single}
            └── partials/product/{options,reservations}

★ = added or substantially reworked during the premium redesign.
```

## Contracts — do not break

- **`public/` entry names** referenced by `{{ '*.js'|asset }}` / `'app.css'|asset`.
- **`twilight.json`** `features` and `settings[].id` keys (read via `theme.settings.get`).
- **Twig data variables** documented in each template's header comment.
- **`<salla-*>` components**, `{% hook %}`, `{% component %}`, `salla.*` SDK calls,
  and form `onsubmit="return salla.form.onSubmit(...)"` handlers.
