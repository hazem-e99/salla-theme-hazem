const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

class PremiumCartDrawer extends HTMLElement {
  connectedCallback() {
    this.panel = this.querySelector('.premium-cart-drawer__panel');
    this.body = this.querySelector('.premium-cart-drawer__body');
    this.status = this.querySelector('.premium-cart-drawer__status');
    this.footer = this.querySelector('.premium-cart-drawer__footer');
    this.trigger = document.querySelector('[data-cart-drawer-trigger]');
    this.closeButtons = this.querySelectorAll('[data-cart-drawer-close]');
    this.onKeydown = this.onKeydown.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.trigger?.addEventListener('click', this.open);
    this.trigger?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') this.open(event);
    });
    this.closeButtons.forEach((button) => button.addEventListener('click', this.close));
    salla.event.cart.onUpdated(() => this.hasAttribute('open') && this.load());
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  async open(event) {
    event?.preventDefault();
    this.previouslyFocused = document.activeElement;
    this.hidden = false;
    this.setAttribute('open', '');
    document.documentElement.classList.add('has-cart-drawer');
    document.addEventListener('keydown', this.onKeydown);
    this.panel.focus();
    await this.load();
  }

  close() {
    this.removeAttribute('open');
    document.documentElement.classList.remove('has-cart-drawer');
    document.removeEventListener('keydown', this.onKeydown);
    window.setTimeout(() => { this.hidden = true; }, 220);
    this.previouslyFocused?.focus?.();
  }

  onKeydown(event) {
    if (event.key === 'Escape') return this.close();
    if (event.key !== 'Tab') return;
    const focusable = [...this.panel.querySelectorAll(focusableSelector)].filter((node) => node.offsetParent !== null);
    if (!focusable.length) return event.preventDefault();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  async load() {
    this.status.textContent = this.dataset.loading;
    this.body.replaceChildren();
    this.footer.hidden = true;
    try {
      const response = await salla.cart.api.details(null, ['options']);
      this.render(response?.data?.cart || {});
    } catch (error) {
      this.status.textContent = this.dataset.error;
      salla.log('Premium cart drawer failed to load', error);
    }
  }

  render(cart) {
    const items = cart.items || [];
    this.status.textContent = '';
    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'premium-cart-drawer__empty';
      const icon = document.createElement('i');
      icon.className = 'sicon-shopping-bag';
      icon.setAttribute('aria-hidden', 'true');
      const message = document.createElement('p');
      message.textContent = this.dataset.empty;
      const link = document.createElement('a');
      link.href = this.dataset.homeUrl;
      link.textContent = this.dataset.continue;
      empty.append(icon, message, link);
      this.body.replaceChildren(empty);
      return;
    }

    const list = document.createElement('ul');
    list.className = 'premium-cart-drawer__items';
    items.forEach((item) => list.append(this.createItem(item)));
    this.body.replaceChildren(list);
    this.footer.hidden = false;
    this.querySelector('[data-cart-drawer-total]').textContent = salla.money(cart.sub_total || cart.total || 0);
    this.querySelector('.premium-cart-drawer__subtotal span').textContent = this.dataset.subtotal;
    this.renderShipping(cart.free_shipping_bar);
  }

  createItem(item) {
    const row = document.createElement('li');
    row.className = 'premium-cart-drawer__item';
    const imageLink = document.createElement('a');
    imageLink.href = item.url || '#';
    const image = document.createElement('img');
    image.src = item.product_image || salla.url.asset('images/placeholder.png');
    image.alt = item.product_name || '';
    image.loading = 'lazy';
    image.width = 80;
    image.height = 96;
    imageLink.append(image);
    const details = document.createElement('div');
    details.className = 'premium-cart-drawer__item-details';
    const title = document.createElement('a');
    title.href = item.url || '#';
    title.className = 'premium-cart-drawer__item-title';
    title.textContent = item.product_name || '';
    const options = document.createElement('p');
    options.className = 'premium-cart-drawer__options';
    options.textContent = this.optionText(item.options);
    const price = document.createElement('strong');
    price.textContent = salla.money(item.total || item.price || 0);
    const controls = document.createElement('div');
    controls.className = 'premium-cart-drawer__controls';
    if (!item.is_hidden_quantity && item.type !== 'donating') {
      const quantity = document.createElement('salla-quantity-input');
      quantity.setAttribute('cart-item-id', item.id);
      quantity.setAttribute('value', item.quantity || 1);
      if (item.max_quantity) quantity.setAttribute('max', item.max_quantity);
      controls.append(quantity);
    }
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'premium-cart-drawer__remove';
    remove.textContent = this.dataset.remove;
    remove.addEventListener('click', async () => {
      remove.disabled = true;
      try {
        await salla.cart.deleteItem(item.id);
        await this.load();
      } catch (error) {
        remove.disabled = false;
        salla.log('Premium cart drawer failed to remove item', error);
      }
    });
    controls.append(remove);
    details.append(title);
    if (options.textContent) details.append(options);
    details.append(price, controls);
    row.append(imageLink, details);
    return row;
  }

  optionText(options = []) {
    return options.flatMap((option) => {
      const selected = option.details?.filter((detail) => detail.is_selected).map((detail) => detail.name) || [];
      const value = selected.join(', ') || (typeof option.value === 'string' ? option.value : '');
      return value ? [`${option.name}: ${value}`] : [];
    }).join(' · ');
  }

  renderShipping(shipping) {
    const root = this.querySelector('.premium-cart-drawer__shipping');
    if (!shipping) { root.hidden = true; return; }
    root.hidden = false;
    const percent = Math.max(0, Math.min(100, Number(shipping.percent) || 0));
    root.querySelector('.premium-cart-drawer__shipping-copy').textContent = shipping.has_free_shipping
      ? this.dataset.freeShippingSuccess
      : this.dataset.freeShippingRemaining.replace('{amount}', salla.money(shipping.remaining));
    const progress = root.querySelector('[role="progressbar"]');
    progress.setAttribute('aria-valuenow', percent);
    progress.querySelector('span').style.inlineSize = `${percent}%`;
  }
}

if (!customElements.get('premium-cart-drawer')) customElements.define('premium-cart-drawer', PremiumCartDrawer);
