# Typography system

## Goals

Arabic and English should feel designed together: the same hierarchy and density, with language-specific rhythm rather than identical tracking and line-height. Type remains responsive without breakpoint jumps and does not require every component to invent sizes.

## Font resolution

Salla supplies the merchant-selected font stylesheet and sets `--font-main`. The theme does not download unapproved third-party fonts or assume a commercial license.

- Arabic stack: Alexandria, IBM Plex Sans Arabic, Salla `--font-main`, Noto Sans Arabic, sans-serif.
- Latin stack: Inter, Manrope, Salla `--font-main`, system UI sans-serif.
- Monospace stack: system UI monospace faces for data where needed.

The named premium faces are used when available through the merchant/platform or bundled in a future licensed font package. Otherwise the Salla font remains the reliable fallback. This avoids an extra render-blocking font request in Phase 1.

## Language behavior

`html[lang="ar"]` selects the Arabic stack, increases heading/body leading, and sets tracking tokens to zero so Latin-style letter spacing never breaks joined Arabic glyphs. `html[lang="en"]` selects the Latin stack and uses the preset's tighter display and wider label tracking.

Direction comes from `<html dir="rtl|ltr">`; typography does not infer direction from language.

## Roles

| Role class | Token | Use |
| --- | --- | --- |
| `.type-display` | `--text-display` | Hero thesis or one major editorial statement. |
| `.type-h1` | `--text-h1` | One page title. |
| `.type-h2` | `--text-h2` | Major section heading. |
| `.type-h3` | `--text-h3` | Subsection or prominent card heading. |
| `.type-h4` | `--text-h4` | Small section/card heading. |
| `.type-subheading` | body-large | Supporting text under a title. |
| `.type-body-lg` | `--text-body-lg` | Lead copy. |
| `.type-body` | `--text-body` | Default copy. |
| `.type-body-sm` | `--text-body-sm` | Secondary copy. |
| `.type-caption` | `--text-caption` | Metadata and fine print. |
| `.type-eyebrow` | `--text-eyebrow` | Short category/section label; uppercase is meaningful only for Latin. |
| `.type-label` | `--text-label` | Forms, chips and UI labels. |
| `.type-button` | body-small | Action labels. |
| `.type-price` | `--text-price` | Price with tabular numerals. |

The display and heading sizes use `clamp()` so they scale continuously. Body copy stays at or above 16 px by default; smaller roles are reserved for secondary information, never long reading text.

## Weight and rhythm

Available weight tokens are 300, 400, 500, 600, 700 and 800. Components should request only weights actually provided by the selected Salla font; synthetic weights are tolerated as fallback but should not become the main aesthetic.

Line-height tokens are tight, snug, normal and relaxed. Arabic remaps them to 1.25, 1.45, 1.8 and 2.0 respectively. Latin values remain more compact. `text-wrap: balance` and `text-wrap: pretty` helpers improve editorial headings/copy where supported without changing source order.

## Loading and CLS policy

- The theme keeps Salla's font URL contract and does not add redundant weights.
- Any future bundled font must be WOFF2, declare `font-display: swap`, include only used weights, and supply metric overrides (`size-adjust`, ascent/descent/line-gap overrides) when reliable metrics are available.
- Preload at most the critical regular body face, and only when the final asset URL is deterministic.
- Icon fonts are not a substitute for text labels or accessible names.

## Content rules

- One visible H1 per page surface unless Salla's page contract requires otherwise.
- Do not use heading tags solely for visual size; apply a role class to the correct semantic element.
- Product names may wrap; never clip Arabic glyphs with fixed line-height.
- Prices use tabular numerals but inherit direction/currency formatting from Salla.
- Uppercase and wide tracking are Latin treatments and are neutralized in Arabic.
- Long-form merchant HTML uses `.prose-editorial`, with logical/RTL list and quote spacing.
