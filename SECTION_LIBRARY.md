# Section library

This inventory is updated as each editor family ships. Every listed section is registered in `twilight.json` and rendered by a real Twig template through Salla's `{% component home %}` flow.

## Hero — Premium

Template: `home.premium-hero`

Variants: Full Screen, Editorial Split, Centered Overlay, Minimal Luxury, Product Spotlight, Video Hero, Collage Hero.

Settings: width, vertical spacing, background, alignment, entrance motion, title, eyebrow, description, desktop/mobile/secondary images, YouTube ID, selected spotlight products, button label and Salla variable link.

Use Full Screen for campaign imagery, Editorial Split for story-led brands, Product Spotlight for a tightly curated launch, Video for a supplied YouTube ID, and Collage for lookbooks. Video uses Lite YouTube rather than eager iframe loading. Images reserve a media ratio and below-fold instances lazy-load.

## Products — Grid or Carousel

Template: `home.product-showcase`

Modes: Product Grid and Product Carousel.

Variants: Editorial, Minimal, Compact, Cards, Marketplace, Luxury, Standard Carousel, Peek Carousel, Full Bleed Carousel, Centered Carousel.

Settings: mode, variant, shared layout controls, title, description, selected Salla products and count.

Products are rendered by `salla-products-list` or `salla-products-slider`; pricing, status, wishlist and cart behavior remain platform-owned. Selected product IDs are passed through the documented `source="selected"` contract.

## Collections — Categories

Template: `home.collection-showcase`

Modes: Category Grid and Category Carousel.

Variants: Portrait, Square, Circle, Editorial, Overlay, Minimal Text.

Settings: mode, variant, shared layout controls, title and selected Salla categories.

Category URLs, names and images come from live Salla editor objects. Images are lazy-loaded with reserved dimensions.

## Editorial — Image + Text

Template: `home.image-text`

Variants: Image Left, Image Right, Overlapping, Full Background, Editorial, Compact.

Settings: variant, shared layout controls, image and alternative text, title, eyebrow, description, button label and Salla variable link.

Use this family for campaign narrative, brand story, founder message, materials or service explanation. Copy is escaped by Twig; it is not treated as executable HTML.

## Shared controls

New system sections consistently expose contained/narrow/wide/full width, none/compact/normal/airy spacing, canvas/soft/inverse surfaces, start/center/end alignment and none/fade/reveal motion. Reduced-motion user preference remains authoritative.

## Existing Twilight feature sections

The theme continues to support existing Salla features and custom components for enhanced slider, main links, animated products with background, enhanced banners, brands, custom testimonials, fixed banners/products, product sliders, photos, store features, YouTube and other enabled `component-*` features. They remain functional while being migrated into the shared section contract.

## Custom — Safe HTML

Template: `home.safe-html`. Supports bounded width, spacing and surface controls plus sanitized merchant markup. It uses a section-only JavaScript entry and the allowlist documented in `CUSTOM_HTML_SECURITY.md`. Raw JavaScript, inline handlers/styles, unsafe URLs, iframes, object/embed and dangerous SVG are not supported.

## Social and media

Editor entries: Instagram Feed (Curated), TikTok Feed (Curated), UGC Gallery, Reels Carousel, Video Gallery, YouTube, and Social Gallery.

Instagram/TikTok/social entries use merchant-selected media and Salla-managed links; they do not claim an undocumented live social API. Variants include grid, horizontal carousel, cards, minimal and masonry compositions. Native video uses `preload="metadata"`; YouTube uses Lite YouTube and does not create an eager iframe.

## Conversion

Editor entries: Announcement Bar, Countdown Banner, Flash Sale Countdown, Trust Badges, Store Features, Shipping Information, Payment Methods, Guarantees, Free Shipping Progress, Sticky Promotion, Floating CTA, WhatsApp CTA, and App Promotion.

Trust, payments, app links, countdown and reviews reuse native Salla web components. Free Shipping Progress progressively loads a 5.6 KiB section entry, reads the real cart summary and listens to Salla cart updates; it hides when the store has no free-shipping rule. Sticky/floating controls remain keyboard-accessible and avoid hover-only interaction.

## Reviews, content and business

Editor entries: Testimonials, Customer Reviews, Video Testimonials, FAQ, Blog Posts, Featured Article, Newsletter CTA, Rich Text, Editorial Text, Comparison Table, Tabs, Accordion, Statistics, Team Members, Contact Information, Store Locations and Opening Hours.

Tabs provide roving tabindex, Home/End and direction-aware arrow navigation in the section-only structured bundle. FAQ/Accordion use native semantic `details` elements. Newsletter is deliberately a provider-link CTA because the documented Twilight storefront API has no native newsletter subscription endpoint.

All structured entries share bounded width, spacing, surface, alignment, mobile-safe layout and multiple composition variants. Defaults include bilingual headings and starter items without category-specific demo products.

## Editorial family

Each entry has its own Add Section item and Twig path while sharing one rendering partial.

| Section | Composition | Performance notes |
| --- | --- | --- |
| Split Banner | Two linked media panels with overlaid content cards. | Lazy images with reserved ratio. |
| Editorial Story | Lead story spans the grid and pairs media with long-form copy. | No section JavaScript. |
| Lookbook | Asymmetric two-column rhythm with periodic full-width looks. | Images lazy-load. |
| Image Hotspots | Responsive primary image with keyboard-focusable linked hotspots and labels. | Coordinates are bounded editor numbers; no JS. |
| Magazine Layout | Twelve-column lead-and-supporting-story hierarchy. | Collapses to one column on mobile. |
| Editorial Quote | Large centered quotation and citation. | Text-only, negligible runtime cost. |
| Timeline | Ordered semantic sequence with real numbering and copy. | No animation dependency. |
| Image Gallery | Responsive equal-ratio grid. | Lazy images. |
| Masonry Gallery | CSS multi-column masonry without a layout library. | No JS/reflow library. |
| Before / After | Two explicitly labeled comparison figures. | Stable side-by-side media; mobile-safe. |
