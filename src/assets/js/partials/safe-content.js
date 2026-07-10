const ALLOWED_TAGS = new Set([
  'DIV', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER', 'ASIDE', 'MAIN', 'NAV',
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'IMG', 'FIGURE',
  'FIGCAPTION', 'BLOCKQUOTE', 'STRONG', 'EM', 'B', 'I', 'SMALL', 'MARK',
  'UL', 'OL', 'LI', 'DL', 'DT', 'DD', 'TABLE', 'THEAD', 'TBODY', 'TFOOT',
  'TR', 'TH', 'TD', 'CAPTION', 'VIDEO', 'SOURCE', 'BR', 'HR'
]);
const GLOBAL_ATTRIBUTES = new Set(['class', 'dir', 'lang', 'title', 'role', 'aria-label']);
const TAG_ATTRIBUTES = {
  A: new Set(['href', 'target', 'rel']),
  IMG: new Set(['src', 'alt', 'width', 'height', 'loading']),
  VIDEO: new Set(['src', 'poster', 'controls', 'muted', 'loop', 'preload', 'playsinline', 'width', 'height']),
  SOURCE: new Set(['src', 'type', 'media']),
  TH: new Set(['scope', 'colspan', 'rowspan']),
  TD: new Set(['colspan', 'rowspan']),
};
const URL_ATTRIBUTES = new Set(['href', 'src', 'poster']);
const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const DROP_WITH_CONTENT = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'SVG', 'MATH', 'TEMPLATE']);

function isSafeUrl(value) {
  const candidate = value.trim();
  if (!candidate || candidate.startsWith('#') || candidate.startsWith('/')) return true;
  try { return SAFE_PROTOCOLS.has(new URL(candidate, window.location.origin).protocol); }
  catch { return false; }
}

function sanitizeTree(root) {
  [...root.querySelectorAll('*')].forEach((element) => {
    if (DROP_WITH_CONTENT.has(element.tagName)) {
      element.remove();
      return;
    }
    if (!ALLOWED_TAGS.has(element.tagName)) {
      element.replaceWith(...element.childNodes);
      return;
    }
    [...element.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const allowed = GLOBAL_ATTRIBUTES.has(name) || TAG_ATTRIBUTES[element.tagName]?.has(name);
      if (!allowed || name.startsWith('on') || name === 'style' || (URL_ATTRIBUTES.has(name) && !isSafeUrl(attribute.value))) {
        element.removeAttribute(attribute.name);
      }
    });
    if (element.hasAttribute('class')) {
      const safeClasses = element.className.split(/\s+/).filter((token) => /^[a-zA-Z0-9_-]{1,64}$/.test(token)).slice(0, 20);
      safeClasses.length ? element.setAttribute('class', safeClasses.join(' ')) : element.removeAttribute('class');
    }
    if (element.tagName === 'A') {
      if (!element.hasAttribute('href')) element.replaceWith(...element.childNodes);
      else if (element.getAttribute('target') === '_blank') element.setAttribute('rel', 'noopener noreferrer');
    }
    if (element.tagName === 'IMG') {
      element.setAttribute('loading', 'lazy');
      element.setAttribute('decoding', 'async');
    }
    if (['IMG', 'VIDEO', 'SOURCE'].includes(element.tagName) && !element.hasAttribute('src')) element.remove();
  });
  return root;
}

class SafeHtmlSection extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready === 'true') return;
    const source = this.querySelector('.safe-html-source');
    const output = this.querySelector('.safe-html-output');
    if (!source || !output) return;
    const parsed = new DOMParser().parseFromString(source.value || '', 'text/html');
    output.replaceChildren(...sanitizeTree(parsed.body).childNodes);
    source.remove();
    this.dataset.ready = 'true';
  }
}

if (!customElements.get('safe-html-section')) customElements.define('safe-html-section', SafeHtmlSection);
