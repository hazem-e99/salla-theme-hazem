class ThemeTabs extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.tabs = [...this.querySelectorAll('[role="tab"]')];
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.select(index));
      tab.addEventListener('keydown', event => this.onKeydown(event, index));
    });
    this.dataset.ready = 'true';
  }
  select(index, focus = false) {
    this.tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = this.querySelector(`#${CSS.escape(tab.getAttribute('aria-controls'))}`);
      if (panel) panel.hidden = !active;
    });
    if (focus) this.tabs[index]?.focus();
  }
  onKeydown(event, index) {
    const rtl = getComputedStyle(this).direction === 'rtl';
    const previous = rtl ? 'ArrowRight' : 'ArrowLeft';
    const next = rtl ? 'ArrowLeft' : 'ArrowRight';
    let target = index;
    if (event.key === next) target = (index + 1) % this.tabs.length;
    else if (event.key === previous) target = (index - 1 + this.tabs.length) % this.tabs.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = this.tabs.length - 1;
    else return;
    event.preventDefault(); this.select(target, true);
  }
}

class LiveFreeShipping extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.message = this.querySelector('.structured-shipping__message');
    this.bar = this.querySelector('.structured-shipping__track span');
    this.update = this.update.bind(this);
    salla.event.cart.onUpdated(this.update);
    salla.cart.api.latest().then(response => this.update(response?.data?.cart || response?.data || response)).catch(() => this.hidden = true);
    this.dataset.ready = 'true';
  }
  update(cart) {
    const shipping = cart?.free_shipping_bar;
    if (!shipping) { this.hidden = true; return; }
    this.hidden = false;
    const percent = Math.max(0, Math.min(100, Number(shipping.percent) || 0));
    this.bar.style.width = `${percent}%`;
    this.message.textContent = shipping.has_free_shipping ? this.dataset.success : this.dataset.remaining.replace('{amount}', salla.money(shipping.remaining));
  }
}

if (!customElements.get('theme-tabs')) customElements.define('theme-tabs', ThemeTabs);
if (!customElements.get('live-free-shipping')) customElements.define('live-free-shipping', LiveFreeShipping);
