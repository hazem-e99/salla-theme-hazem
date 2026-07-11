
class WishlistCard extends HTMLElement {

    connectedCallback() {

        if (!this.product) {
            return salla.logger.warn('custom-wishlist-card:: product does not exist!');
        }
        salla.onReady(() => this.render())

    }

    escapeHTML(str = '') {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    getPriceFormat(price) {
      if (!price || price == 0) {
        return salla.config.get('store.settings.product.show_price_as_dash') ? '-' : '';
      }
      return salla.money(price);
    }

    getPriceMarkup() {
      if (this.product.is_on_sale) {
        return `
          <div class="space-x-1 rtl:space-x-reverse">
            <h4 class="inline-block text-sm font-bold text-red-400">${this.getPriceFormat(this.product.sale_price)}</h4>
            <span class="text-sm text-gray-500 line-through">${this.getPriceFormat(this.product.regular_price)}</span>
          </div>
        `;
      }
      if (this.product.starting_price) {
        return `
          <div class="flex items-baseline gap-1.5">
            <span class="text-xs text-gray-500">${salla.lang.get('pages.products.starting_price')}</span>
            <h4 class="text-sm font-bold">${this.getPriceFormat(this.product.starting_price)}</h4>
          </div>
        `;
      }
      return `<h4 class="text-sm font-bold">${this.getPriceFormat(this.product.price)}</h4>`;
    }

    render() {
        this.setAttribute('id', `wishlist-product-${this.product.id}`)
        this.classList.add('product-entry', 'product-entry--wishlist')
        this.classList.toggle('product-entry--out-of-stock', !!this.product.is_out_of_stock)

        const image = this.product.image || {};
        const imageUrl = image.url || this.product.thumbnail || salla.url.asset('images/placeholder.png');

        this.innerHTML = `
        <div class="flex items-center mb-4 sm:mb-0">
          <a href="${this.product.url}" class="product-entry__image">
            <img class="object-cover w-full h-full" src="${imageUrl}" loading="lazy" alt="${this.escapeHTML(image.alt || this.product.name)}" />
            ${this.product.is_out_of_stock ? `<span class="product-entry__out-of-stock">${salla.lang.get('pages.products.out_of_stock')}</span>` : ''}
          </a>
          <div class="flex-1 rtl:pr-5 ltr:pl-5">
            <h3 class="text-sm text-gray-800 leading-6 mb-1.5 rtl:pl-5 ltr:pr-5 rtl:md:pl-8 ltr:md:pr-8 line-clamp-1">
              <a href="${this.product.url}">${this.escapeHTML(this.product.name)}</a>
            </h3>
            <div class="w-full center-between">
              ${this.getPriceMarkup()}
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <salla-add-product-button product-status="${this.product.status}" product-id="${this.product.id}" product-type="${this.product.type}" loader-position="center" fill="outline" class="flex-grow w-full sm:grow-0 md:w-40">
          </salla-add-product-button>
          <salla-button loader-position="center" shape="icon" size="small" color="danger" class="btn--delete" onclick="salla.wishlist.remove(${this.product.id})">
            <i class="sicon-cancel"></i>
          </salla-button>
        </div>
  `

    }
}

customElements.define('custom-wishlist-card', WishlistCard);
