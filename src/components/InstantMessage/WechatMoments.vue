<template>
    <div class="demo-2">
        <main>
            <!-- 菜单打开按钮 -->
            <div class="content--fixed" @click="openMenu">
                加载更多
                <div class="arrows">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <!-- 内容区域使用循环 -->
            <div v-for="(item, index) in contentList" :key="index" :id="`content-${index + 1}`"
                class="content content--switch" :class="{ 'content--switch-current': currentContent === index }">
                <h2 class="content__title">{{ item.content__title }}</h2>
                <div class="content__subtitle">{{ item.content__subtitle }}</div>
            </div>

            <!-- 菜单区域使用循环 -->
            <nav class="grim" :class="{ 'grim--open': isMenuOpen }" ref="grim">
                <div v-for="(menuItem, index) in menuItems" :key="index" class="grim__item">
                    <div :class="['grim__item-bg', `grim__item-bg--${menuItem.bgClass}`]"></div>

                    <!-- 图片区域 -->
                    <!-- :class="['grim__item-img', `grim__item-img--${index + 1}`]" -->
                    <div v-if="menuItem.image" :class="['grim__item-img', `grim__item-img--${menuItem.bgClass}`]"
                        :style="{ backgroundImage: `url('${menuItem.image}')` }"></div>

                    <!-- 内容区域 -->
                    <div v-if="menuItem.content" class="grim__item-content">
                        <div class="grim__item-inner">
                            <button class="menu-trigger menu-trigger--close" @click="closeMenu">
                                close
                            </button>
                        </div>
                    </div>

                    <!-- 链接区域 -->
                    <a v-if="menuItem.link" :href="menuItem.link" class="grim__link grim__item-content"
                        @click.prevent="handleMenuItemClick(menuItem.contentIndex)">
                        <div class="grim__item-inner">
                            <h3 class="grim__item-title">{{ menuItem.title }}</h3>
                            <span v-if="menuItem.desc" class="grim__item-desc">{{
                                menuItem.desc
                                }}</span>
                        </div>
                    </a>

                    <!-- 背景覆盖层 -->
                    <div v-if="menuItem.cover" :class="[
                        'grim__item-bg',
                        'grim__item-bg-cover',
                        `grim__item-bg--${index + 1}`,
                    ]"></div>
                </div>
            </nav>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const emit = defineEmits(['menu-toggle']);

// 响应式数据
const isMenuOpen = ref(false);
const currentContent = ref(0);
const grim = ref(null);
let menuInstance = null;

// 内容列表
const contentList = ref([
    { content__title: "Home", content__subtitle: "explore nature" },
    { content__title: "Beach", content__subtitle: "Lift your spirits" },
    { content__title: "Desert", content__subtitle: "Find yourself" },
    { content__title: "Ocean", content__subtitle: "Uncover beauty" },
    { content__title: "Jungle", content__subtitle: "Feel nature" },
    { content__title: "Mountains", content__subtitle: "Explore your limits" },
]);

// 菜单项配置
const menuItems = ref([
    { bgClass: 1 },
    { bgClass: 2 },
    {
        bgClass: 3,
        content: true
    },
    { bgClass: 4 },
    {
        bgClass: 5,
        link: "#content-1",
        title: "Home",
        image: "src/assets/img/public/public-3.png",
        contentIndex: 0,
    },
    {
        bgClass: 6,
        image: "src/assets/img/public/public-4.png",
        link: "#content-2",
        title: "Beach",
        desc: "Lift your spirits",
        cover: true,
        contentIndex: 1,
    },
    {
        bgClass: 7,
        image: "src/assets/img/public/public-5.png",
        link: "#content-3",
        title: "Desert",
        desc: "Find yourself",
        cover: true,
        contentIndex: 2,
    },
    {
        bgClass: 8,
        image: "src/assets/img/public/public-6.png",
        link: "#content-4",
        title: "Ocean",
        desc: "Uncover beauty",
        cover: true,
        contentIndex: 3,
    },
    {
        bgClass: 9,
        image: "src/assets/img/public/public-7.png",
        link: "#content-5",
        title: "Jungle",
        desc: "Feel nature",
        cover: true,
        contentIndex: 4,
    },
    {
        bgClass: 10,
        image: "src/assets/img/public/public-8.png",
        link: "#content-6",
        title: "Mountains",
        desc: "Explore your limits",
        cover: true,
        contentIndex: 5,
    },
]);

// 处理菜单项点击
const handleMenuItemClick = async (contentIndex) => {
    if (
        contentIndex !== undefined &&
        contentIndex >= 0 &&
        contentIndex < contentList.value.length
    ) {
        currentContent.value = contentIndex;
        // 确保 DOM 更新完成
        await nextTick();
        closeMenu();
    }
};

//打开菜单
const openMenu = () => {
    if (menuInstance && !isMenuOpen.value) {
        menuInstance.open();
        isMenuOpen.value = true;
    }
};

// 关闭菜单
const closeMenu = () => {
    if (menuInstance && isMenuOpen.value) {
        menuInstance.close();
        isMenuOpen.value = false;
    }
};
// 原有的Box和Menu类保持不变
class Box {
    constructor(el, pos) {
        this.DOM = { el: el };
        this.DOM.bg = this.DOM.el.querySelector(".grim__item-bg");
        this.DOM.inner = this.DOM.el.querySelector(
            ".grim__item-content > .grim__item-inner"
        );
        this.DOM.img = this.DOM.el.querySelector(".grim__item-img");
        this.DOM.cover = this.DOM.el.querySelector(".grim__item-bg-cover");
        this.DOM.link = this.DOM.el.querySelector("a.grim__link");
        this.pos = pos;
    }

    open() {
        return new Promise((resolve, reject) => {
            this.DOM.bg.style.transformOrigin =
                this.pos % 2 === 0 ? "50% 100%" : "0% 50%";

            anime.remove(this.DOM.bg);
            anime({
                targets: this.DOM.bg,
                duration: this.DOM.bg.dataset.duration || 40 + this.pos * 20,
                easing: this.DOM.bg.dataset.easing || "easeInOutQuad",
                opacity: {
                    value: 1,
                    duration: 1,
                },
                scaleY: this.pos % 2 === 0 ? [0, 1] : 1,
                scaleX: Math.abs(this.pos % 2) == 1 ? [0, 1] : 1,
                complete: () => {

                    if (this.DOM.img && this.DOM.cover) {
                        this.DOM.img.style.opacity = 1;
                        this.DOM.cover.style.opacity = 1;
                        this.DOM.cover.style.transformOrigin = "100% 50%";
                        anime.remove(this.DOM.cover);
                        anime({
                            targets: this.DOM.cover,
                            duration: 700,
                            easing: "easeOutQuint",
                            scaleX: [1, 0],
                        });
                    }

                    if (this.DOM.inner) {
                        anime.remove(this.DOM.inner);
                        anime({
                            targets: this.DOM.inner,
                            duration: 1200,
                            delay: 150,
                            easing: "easeOutQuint",
                            opacity: {
                                value: 1,
                                duration: 1,
                            },
                            translateY: ["100%", "0%"],
                        });
                    }

                    resolve();
                },
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            const animateBoxFn = () => {
                this.DOM.bg.style.transformOrigin =
                    this.pos % 2 === 0 ? "50% 0%" : "100% 50%";

                anime.remove(this.DOM.bg);
                anime({
                    targets: this.DOM.bg,
                    duration: this.DOM.bg.dataset.duration || 80 + this.pos * 10,
                    easing: this.DOM.bg.dataset.easing || "easeInOutQuad",
                    opacity: {
                        value: 0,
                        delay: this.DOM.bg.dataset.duration || 40 + this.pos * 10,
                        duration: 1,
                    },
                    scaleY: this.pos % 2 === 0 ? [1, 0] : 1,
                    scaleX: Math.abs(this.pos % 2) == 1 ? [1, 0] : 1,
                    complete: resolve,
                });
            };

            if (this.DOM.img && this.DOM.cover) {
                anime.remove(this.DOM.img);
                anime({
                    targets: this.DOM.img,
                    duration: 200,
                    easing: "linear",
                    opacity: 0,
                });
            }
            animateBoxFn();

            if (this.DOM.inner) {
                this.DOM.inner.style.opacity = 0;
            }
        });
    }
}

class Menu {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.items = Array.from(this.DOM.el.querySelectorAll(".grim__item"));
        this.itemsTotal = this.DOM.items.length;
        this.boxes = [];
        this.DOM.items.forEach((item, pos) => {
            this.boxes.push(new Box(item, pos));
        });
    }

    open() {
        this.toggle("open");
    }

    close() {
        this.toggle("close");
    }

    toggle(action) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        if (action === "open") {
            this.openBoxes();
        } else {
            this.closeBoxes();
        }
    }

    openBoxes(pos = 0) {
        this.toggleBoxes("open", pos);
    }

    closeBoxes(pos = 0) {
        this.toggleBoxes("close", pos);
    }

    toggleBoxes(action, pos) {
        if (pos >= this.itemsTotal) {
            this.isAnimating = false;
            return;
        }
        this.DOM.el.classList[action === "open" ? "add" : "remove"]("grim--open");
        const box = this.boxes[pos];
        box[action === "open" ? "open" : "close"]().then(() =>
            this[action === "open" ? "openBoxes" : "closeBoxes"](pos + 1)
        );
    }
}

onMounted(() => {
    // 直接初始化，无需等待图片加载
    document.body.classList.remove("loading");
    if (grim.value) {
        menuInstance = new Menu(grim.value);
    }
});

onUnmounted(() => {
    // 清理资源
    menuInstance = null;
});
</script>

<style lang="scss" scoped>
.demo-2 {
    font-family: "Josefin Sans", sans-serif;
    --color-text: #000;
    --color-bg: #9c9c9c;
    --color-link: #8958b1;
    --color-link-hover: #fff;
    --color-info: #000;

    main {
        position: relative;
        width: 100%;
    }

    // 菜单打开按钮
    .content--fixed {
        @include flexCenter(row, center);
        position: absolute;
        z-index: 10;
        bottom: 0.5rem;
        left: 0.5rem;
        min-height: 0;
        padding: 0.5rem;
        color: #fff;
        font-size: 16px;
        font-family: 'gtpy';
        text-align: center;

        // 展开按钮
        .arrows {
            background-color: #fff;
            @include flexCenter(row, flex-start);

            div {
                --arrowSize: 0.4rem;
                --arrowColor: currentColor;

                width: var(--arrowSize);
                height: var(--arrowSize);
                margin: calc(var(--arrowSize) * -1.5) 0;
                background: transparent;
                border: calc(var(--arrowSize) * 0.11) solid;
                border-color: transparent transparent var(--arrowColor) var(--arrowColor);
                transform: rotate(-135deg);
                -webkit-animation: arrow 2s infinite linear;
                animation: arrow 2s infinite linear;

                &:nth-of-type(1) {
                    -webkit-animation-delay: -0.8s;
                    animation-delay: -0.8s;
                }

                &:nth-of-type(2) {
                    -webkit-animation-delay: -0.4s;
                    animation-delay: -0.4s;
                }

                &:nth-of-type(3) {
                    -webkit-animation-delay: 0s;
                    animation-delay: 0s;
                }
            }

            @keyframes arrow {
                0% {
                    opacity: 0;
                }

                40% {
                    opacity: 1;
                }

                80% {
                    opacity: 0;
                }

                100% {
                    opacity: 0;
                }
            }
        }
    }
}

.content {
    position: relative;
    @include flexCenter(column, center);
    height: auto;
    min-height: 0;
    margin: 0 auto;
    min-height: 80vh;
    min-width: 80vw;
    background-position: center center;
    display: none;
    padding: 2.5rem 1rem;
}

#content-1 {
    background-image: url("@/assets/img/public/public-3.png");
}

#content-2 {
    background-image: url("@/assets/img/public/public-4.png");
}

#content-3 {
    background-image: url("@/assets/img/public/public-5.png");
}

#content-4 {
    background-image: url("@/assets/img/public/public-6.png");
}

#content-5 {
    background-image: url("@/assets/img/public/public-7.png");
}

#content-6 {
    background-image: url("@/assets/img/public/public-8.png");
}

//当前激活内容
.content--switch-current {
    display: flex;
}

.content--switch {
    background-size: cover;

    &::after {
        content: "";
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 20%;
        bottom: 0;
        background: linear-gradient(transparent, #000);
    }
}


@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:400,700|Playfair+Display");

// 内容标题
.content__title {
    font-family: "Playfair Display", serif;
    font-size: 8vw;
    margin: 0;
    position: relative;
    font-weight: normal;
    color: $general-white;
}

// 内容区域副标题
.content__subtitle {
    font-size: 1.45rem;
    padding: 1rem 0;
    letter-spacing: 2px;
    text-indent: 2px;
    color: $general-white;

    &::after {
        content: "\2014";
        position: relative;
        display: block;
        font-size: 2.75rem;
        text-align: center;
    }
}


.grim {
    display: grid;
    position: absolute;
    z-index: 1000;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // 使用 fr 单位实现自适应
    grid-template-columns: repeat(32, minmax(0, 1fr));
    grid-template-rows: repeat(32, minmax(0, 1fr));
    pointer-events: none;

    // 确保不会超出视口
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
}

// 添加响应式媒体查询
@media (max-width: 768px) {
    .grim {
        grid-template-columns: repeat(16, minmax(0, 1fr));
        grid-template-rows: repeat(16, minmax(0, 1fr));
    }

    // 调整网格区域以适应小屏幕
    .grim__item:nth-child(n+5) {
        grid-area: auto / auto / span 4 / span 4;
    }
}

.grim--open {
    pointer-events: auto;
}

.grim__item {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

// menuItems布局位置信息
$grid-areas: (
    (1, 31, 1, 33, 2),
    (2, 31, 2, 33, 3),
    (3, 29, 1, 31, 3),
    (4, 29, 3, 33, 5),
    (5, 25, 1, 29, 5),
    (6, 25, 5, 33, 9),
    (7, 17, 1, 25, 9),
    (8, 17, 9, 33, 17),
    (9, 1, 1, 17, 17),
    (10, 1, 17, 33, 33)
);

@each $area in $grid-areas {
    $child-num: list.nth($area, 1);
    $row-start: list.nth($area, 2);
    $col-start: list.nth($area, 3);
    $row-end: list.nth($area, 4);
    $col-end: list.nth($area, 5);

    .grim__item:nth-child(#{$child-num}) {
        grid-area: #{$row-start} / #{$col-start} / #{$row-end} / #{$col-end};
    }
}

.grim__item-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    box-shadow: 0 0 0 2px currentColor;
    background: currentColor;
}

$grim-bg-colors: (
    1: $assistance-1,
    2: $assistance-2,
    3: $assistance-3,
    4: $assistance-4,
    5: $assistance-5,
    6: $assistance-6,
    7: $assistance-7,
    8: $assistance-8,
    9: $assistance-9,
    10: $assistance-10
);

@each $num, $color in $grim-bg-colors {
    .grim__item-bg--#{$num} {
        color: $color;
    }
}

.grim__item-img {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 50% 100%;
    background-color: currentColor;
}

// $grim-colors: (
//     1: #0055ff,
//     2: #0073ff,
//     3: #9ed4d4,
//     4: #d0bebe,
//     5: #df9e98
// );

// @each $num, $color in $grim-colors {
//     .grim__item-img--#{$num} {
//         color: $color;
//     }
// }

// .grim__item-img--1 {
//     color: #fcfdff;
// }

// .grim__item-img--2 {
//     color: #a9bdd6;
// }

// .grim__item-img--3 {
//     color: #9ed4d4;
// }

// .grim__item-img--4 {
//     color: #d0bebe;
// }

// .grim__item-img--5 {
//     color: #df9e98;
// }

.grim__item-content {
    position: relative;
    color: #000;
    overflow: hidden;
}

.grim__item-content:hover,
.grim__item-content:focus {
    opacity: 0.8;
    color: inherit;
    transition: opacity 0.3s;
}

.grim__item-inner {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    opacity: 0;

    //关闭按钮
    .menu-trigger--close {
        color: #000;
        align-self: center;
        font-size: 14px;
        background-color: rgb(254, 0, 216);
    }
}

.grim__item-title {
    font-weight: normal;
    margin: 0;
    font-size: 4vmax;
    font-family: "Playfair Display", serif;
    color: #fff;
}

.grim__item:nth-child(-n + 6) .grim__item-title {
    font-size: 2vmax;
}

.grim__item:nth-child(5) .grim__item-title {
    color: #fff;
}

.grim__item-desc {
    font-size: 0.85rem;
    margin: 0.5rem 0 0 0;
    color: #fff;
}

.grim__item-desc::after {
    content: "\2014";
    position: relative;
    display: block;
    font-size: 1.75rem;
}
</style>
