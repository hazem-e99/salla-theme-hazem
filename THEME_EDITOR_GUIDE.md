# Theme editor guide

## Starting point

The default composition is intended as an editorial storefront: announcement, hero, categories, image/text story, featured products, brand story, best sellers, lookbook, trust, testimonials, newsletter and footer.

## Global choices

Choose preset, density, corners, motion and width first. Then select header, footer, product-card, product-page, collection and cart variants. Settings map to bounded classes and variables without replacing Salla commerce markup.

## Add Section

The library exposes 58 custom entries with numbered bilingual titles, descriptions, defaults and real layout variants. Relevant sections support width, spacing, background, alignment, image ratio, animation and mobile behavior.

Use one dominant hero, alternate product density with editorial space, and avoid stacking multiple sticky/floating promotions. Social feeds are curated cards unless a Salla-native provider is used; the theme does not invent social APIs.

## Media and safe content

Provide correctly cropped images and meaningful alt text. Use dedicated YouTube/video sections for media. Safe HTML accepts semantic text, links, images and tables; it removes scripts, handlers, styles, iframes, object/embed, SVG, audio/video and unsafe URLs. Visual customization uses approved settings and enumerated token-backed values.

## Publishing checklist

Run `pnpm production`, validate `twilight.json` and locales, preview the pushed feature branch, complete `LIVE_QA_REPORT.md`, and only then open a reviewed merge request. Never merge directly to master.
