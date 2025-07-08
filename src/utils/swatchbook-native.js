// 原生 JS 版 swatchbook 动画菜单，无 jQuery 依赖
// 用法：import { swatchbook } from './swatchbook-native'; swatchbook(dom, options)

class SwatchBook {
    constructor(element, options = {}) {
        this.el = element;
        this.options = Object.assign({
            center: 6,
            angleInc: 8,
            speed: 700,
            easing: 'ease',
            proximity: 45,
            neighbor: 4,
            onLoadAnim: true,
            initclosed: false,
            closeIdx: -1,
            openAt: -1
        }, options);
        this.items = Array.from(this.el.children);
        this.itemsCount = this.items.length;
        this.current = -1;
        this.isClosed = false;
        this.cache = [];
        this.support = SwatchBook._cssTransitionsSupported();
        if (this.options.onLoadAnim) this._setTransition();
        if (!this.options.initclosed) {
            this._center(this.options.center);
        } else {
            this.isClosed = true;
            if (!this.options.onLoadAnim) this._setTransition();
        }
        if (this.options.openAt >= 0 && this.options.openAt < this.itemsCount) {
            this._openItem(this.items[this.options.openAt]);
        }
        this._initEvents();
    }
    static _cssTransitionsSupported() {
        const style = document.createElement('div').style;
        return 'transition' in style || 'webkitTransition' in style;
    }
    _setTransition() {
        if (this.support) {
            this.items.forEach(item => {
                item.style.transition = `all ${this.options.speed}ms ${this.options.easing}`;
            });
        }
    }
    _openclose() {
        if (typeof this.options.onOpenClose === 'function') {
            this.options.onOpenClose({ isClosed: this.isClosed });
        }
        if (this.isClosed) {
            this._center(this.options.center);
        } else {
            this.items.forEach(item => {
                item.style.transform = 'rotate(0deg)';
            });
        }
        this.isClosed = !this.isClosed;
    }
    _center(idx) {
        this.items.forEach((item, i) => {
            item.style.transform = `rotate(${this.options.angleInc * (i - idx)}deg)`;
        });
    }
    _openItem(item) {
        const itmIdx = this.items.indexOf(item);
        if (itmIdx !== this.current) {
            if (this.options.closeIdx !== -1 && itmIdx === this.options.closeIdx) {
                this._openclose();
                this._setCurrent();
            } else {
                this._setCurrent(item);
                item.style.transform = 'rotate(0deg)';
                this._rotateSiblings(item);
            }
        }
    }
    _initEvents() {
        this.items.forEach(item => {
            item.addEventListener('click', () => this._openItem(item));
        });
    }
    _rotateSiblings(item) {
        const idx = this.items.indexOf(item);
        this.items.forEach((sib, i) => {
            if (sib === item) return;
            let rotateVal;
            if (i < idx) {
                rotateVal = this.options.angleInc * (i - idx);
            } else if (i - idx === 1) {
                rotateVal = this.options.proximity;
            } else {
                rotateVal = this.options.proximity + (i - idx - 1) * this.options.neighbor;
            }
            sib.style.transform = `rotate(${rotateVal}deg)`;
        });
    }
    _setCurrent(item) {
        this.current = item ? this.items.indexOf(item) : -1;
        this.items.forEach(i => i.classList.remove('ff-active'));
        if (item) item.classList.add('ff-active');
    }
}

export function swatchbook(element, options) {
    return new SwatchBook(element, options);
}

export default SwatchBook;
