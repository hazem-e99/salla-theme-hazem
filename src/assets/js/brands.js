import BasePage from './base-page';
class Brands extends BasePage {
    onReady() {
        // set initial height;
        const nav = document.querySelector('#brands-nav'),
              navWrap = document.querySelector('.brands-nav-wrap');
        navWrap.style.height = nav.clientHeight + 'px';

        app.onClick('.brands-nav__item', ({target:btn}) => {
            app.all('.brands-nav__item', el => app.toggleElementClassIf(el, 'is-selected', 'unselected', () => el == btn));
        });

        const stickySentinel = document.createElement('span');
        stickySentinel.className = 'brands-sticky-sentinel';
        stickySentinel.setAttribute('aria-hidden', 'true');
        navWrap.before(stickySentinel);
        new IntersectionObserver(([entry]) => {
            app.toggleClassIf('#brands-nav', 'is-not-sticky', 'is-sticky', () => entry.isIntersecting);
        }, { rootMargin: '-200px 0px 0px' }).observe(stickySentinel);
    }
}

Brands.initiateWhenReady(['brands.index']);
