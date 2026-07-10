# Safe custom content security

The `14 · Custom — Safe HTML` editor section never renders merchant input with Twig `|raw`.

## Processing model

1. Twig auto-escapes the editor string inside a hidden `<textarea>`, preventing markup from breaking out of the transport element.
2. The section-only `safe-content.js` entry loads only when the section is present.
3. `DOMParser` creates an inert document.
4. A strict tag and attribute allowlist is applied before nodes enter the live document.
5. Sanitized nodes replace the empty output container.

## Removed content

- `script`, `style`, `iframe`, `object`, `embed`, SVG, MathML and template nodes, including their content.
- All unsupported elements.
- Every inline event attribute and inline `style` attribute.
- Unsupported attributes, IDs and data attributes.
- `javascript:`, `data:`, `blob:`, malformed and other unapproved URL protocols.
- Media elements without a valid source.

Allowed URL protocols are HTTP, HTTPS, mailto and tel, plus relative/root/hash links. New-window links receive `noopener noreferrer`. Class tokens are limited to simple alphanumeric/underscore/hyphen names, 64 characters per token and 20 tokens per element.

## Allowed content

Semantic layout/content elements, headings, paragraphs, lists, links, images, figures, quotes, basic inline emphasis, tables and native video/source elements are supported. Images are forced to lazy loading and async decoding. Tables become horizontally scrollable on narrow screens.

Untrusted iframe embeds are intentionally unsupported. Merchants should use the dedicated YouTube/Video sections for provider-controlled media.

## CSS and JavaScript policy

There is no raw JavaScript editor. Merchant CSS customization is limited to approved theme settings that map to bounded body classes and design tokens: preset, density, corners, motion, content width, image ratio and component/page variants. Arbitrary CSS declarations, selectors and URLs are not accepted.
