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
