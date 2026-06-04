<template>
  <div>
    <!-- 导航栏 -->
    <div class="navigate">
      <Navigation hoverBgColor="#f0f4f5" textColor="#585858" />
    </div>

    <!-- 视差滚动背景 -->
    <div class="parallax-bg" ref="parallaxBg">
      <img :src="bgImage" alt="parallax-bg" />
    </div>

    <!-- 上层遮罩 -->
    <div class="parallax-overlay">
      <div class="decoration circle-left"></div>
      <div class="decoration circle-right"></div>
      <div class="decoration triangle" ref="triangle"></div>
      <!-- 浮动圆点装饰 -->
      <div class="floating-dot dot-1"></div>
      <div class="floating-dot dot-2"></div>
      <div class="floating-dot dot-3"></div>
      <div class="floating-dot dot-4"></div>
    </div>

    <!-- 主体 -->
    <div id="AlbumCollection" ref="AlbumCollection">
      <!-- 堆叠切换 -->
      <div class="stacking_switch page snap-section">
        <div class="content">
          <h1>人生就像一场旅行，不在于目的地，而在于沿途的风景</h1>
          <p>
            青春的我们，站在时代充满诱惑的阳光地带高喊我心飞翔；青春的我们，站在历史回眸的特定角落审视无限江山；青春的我们，站在大浪淘沙的长江口岸展露风流人生。于是，美丽的梦带走美丽的忧伤，留下美丽的向往。心在远方，梦也在远方。
          </p>
          <button class="btn">查看更多</button>
        </div>
        <div class="stack" ref="stackRef">
          <div v-for="(img, idx) in cards" :key="img" class="card"
            :class="{ swap: idx === cards.length - 1 && !isFirstRun }" @click="onCardClick(idx)"
            :style="{ zIndex: idx + 1 }">
            <img :src="img" alt="" />
          </div>
        </div>
      </div>

      <!-- 连续+缩略 -->
      <div class="second_carousel page snap-section">
        <!-- 无限滚动 -->
        <div class="carousel">
          <div class="carousel__left">
            <CarouselImage :images="imageList_left" scrollDirection="left"></CarouselImage>
          </div>
          <div class="carousel__right">
            <CarouselImage :images="imageList_right" scrollDirection="right"></CarouselImage>
          </div>
        </div>
        <!-- 缩略轮播 -->
        <div class="thumbnail__carousel">
          <ThumbnailCarousel></ThumbnailCarousel>
        </div>
      </div>

      <!-- 常见布局 -->
      <div class="flex_layout page snap-section">
        <div class="nav">
          <ul>
            <li v-for="(item, index) in navs" :key="item.id">
              <button href="#" class="btn-7" :style="buttonStyles(index)">
                <span>
                  {{ item.name }}
                  {{ item.count }}
                </span>
              </button>
            </li>
          </ul>
          <h1>登山</h1>
        </div>
        <div class="flex_body">
          <div class="box" v-for="item in travels" :key="item.id">
            <div class="img__box">
              <img v-lazy="item" alt="tests" />
            </div>
            <div class="text__box">
              <h1>风住尘香花已尽，日晚倦梳头风住尘香花已尽，日晚倦梳头。</h1>
              <h2>日期:2024-12-19</h2>
            </div>
          </div>
        </div>
      </div>

      <!-- vue3-carousel-3d -->
      <div class="vue3-carousel-3d page snap-section">
        <h1 class="special-title">
          <!-- 标题背景底纹 -->
          <div class="title-backdrop"></div>
          <!-- 标题和图标 -->
          <h1 class="gallery-title" id="main-title">轮播图</h1>
          <!-- 标题装饰线条 -->
          <div class="title-decoration"></div>
        </h1>
        <div class="carousel_body">
          <carousel-3d :controlsVisible="true" :height="280" :width="450" :autoplay="true" :autoplayTimeout="4000"
            :autoplayHoverPause="true">
            <slide v-for="(slide, i) in carousel_images" :index="i" :key="i">
              <img :src="slide" alt="carouselImg" style="height: 100%" />
            </slide>
          </carousel-3d>
        </div>
      </div>

      <!-- 图片画廊 -->
      <div class="gallery page snap-section">
        <!-- 标题区域 -->
        <h1 class="special-title">
          <!-- 标题背景底纹 -->
          <div class="title-backdrop"></div>
          <!-- 标题和图标 -->
          <h1 class="gallery-title">💕图片画廊</h1>
          <!-- 标题装饰线条 -->
          <div class="title-decoration"></div>
        </h1>
        <div class="items">
          <div class="item" v-for="value in cardImages" tabindex="0" :style="{ backgroundImage: `url(${value})` }">
          </div>
          <div class="item" v-for="value in cardImages" tabindex="0" :style="{ backgroundImage: `url(${value})` }">
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧导航栏 -->
    <div class="nav-panel">
      <div class="up" @click="scrollToPrevious">
        <img :src="utils.getAssetsFile('icon/albumCollection/upArrow.svg')" alt="upArrow">
      </div>
      <div class="down" @click="scrollToNext">
        <img :src="utils.getAssetsFile('icon/albumCollection/downArrow.svg')" alt="downArrow">
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import CarouselImage from "@/components/AlbumCollection/CarouselImage.vue";
import ThumbnailCarousel from "@/components/AlbumCollection/Thumbnails.vue";
import Navigation from "@/components/common/NavigationMenu.vue";
import utils from "@/utils/getAssetsFile";

/** ------------------------ 滚动捕捉 ------------------------ */
const AlbumCollection = ref(null);
const currentPage = ref(0);
const totalPages = 5; // 总页面数

// 滚动到指定页面
function scrollToPage(pageIndex) {
  if (AlbumCollection.value && pageIndex >= 0 && pageIndex < totalPages) {
    const pages = AlbumCollection.value.querySelectorAll('.snap-section');
    if (pages[pageIndex]) {
      pages[pageIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      currentPage.value = pageIndex;
    }
  }
}

// 滚动到上一页
function scrollToPrevious() {
  if (currentPage.value > 0) {
    scrollToPage(currentPage.value - 1);
  }
}

// 滚动到下一页
function scrollToNext() {
  if (currentPage.value < totalPages - 1) {
    scrollToPage(currentPage.value + 1);
  }
}

// 键盘控制
function handleKeydown(event) {
  switch (event.key) {
    case 'ArrowUp':
    case 'PageUp':
      event.preventDefault();
      scrollToPrevious();
      break;
    case 'ArrowDown':
    case 'PageDown':
    case ' ':
      event.preventDefault();
      scrollToNext();
      break;
    case 'Home':
      event.preventDefault();
      scrollToPage(0);
      break;
    case 'End':
      event.preventDefault();
      scrollToPage(totalPages - 1);
      break;
  }
}

/** ------------------------ 视差滚动 ------------------------ */
const bgImage = utils.getAssetsFile('img/albumCollection/bg.png'); //背景
const parallaxBg = ref(null); //视差容器
const triangle = ref(null);
function handleParallaxScroll() {
  if (parallaxBg.value) {
    // 视差速度系数，越小越慢
    const speed = 0.3;
    const scrollY = window.scrollY || window.pageYOffset;
    parallaxBg.value.style.transform = `translateY(${scrollY * speed}px)`;
    triangle.value.style.transform = `rotate(${scrollY * 0.1}deg)`;
  }
}

/** ------------------------ 禁用滚轮行为 ------------------------ */
function preventWheelScroll(event) {
  event.preventDefault();
}

/** ------------------------ 堆叠切换 ------------------------ */
const cardImages = Array.from({ length: 7 }, (_, i) =>
  `https://picsum.photos/seed/nns${i + 1}/1080/1920`
);

const cards = ref([...cardImages]);
let autoplayInterval = null;
let isFirstRun = true;
function moveCard() {
  // 首次进入页面不执行 moveCard
  if (isFirstRun) {
    isFirstRun = false;
    return;
  }
  // 将最后一张卡片移到最前面
  cards.value.unshift(cards.value.pop());
}
function onCardClick(idx) {
  // 只有最上面那张卡片可点击
  if (idx === cards.value.length - 1) {
    moveCard();
  }
}

/** ------------------------ 连续+缩略 ------------------------ */
const imageList_left = ref([
  10003, 10004, 10005, 10006, 10007, 10008, 10009, 10010, 10011,
].map(num => utils.getAssetsFile(`img/albumCollection/${num}.jpg`)));

const imageList_right = ref([
  10012, 10013, 10014, 10015, 10016, 10017, 10019, 10020
].map(num => utils.getAssetsFile(`img/albumCollection/${num}.jpg`)));

/** ------------------------ 常见布局 ------------------------ */
const colors = ref([
  "#a3bded",
  "#c4f4fe",
  "#fdefbe",
  "#28C76F",
  "#ee7752",
  "#23a6d5",
]);
const buttonStyles = (index) => {
  return {
    backgroundColor: colors.value[index % colors.value.length],
  };
};
const navs = ref([
  {
    id: "a01",
    name: "登山",
    count: 112,
  },
  {
    id: "b02",
    name: "九寨沟",
    count: 23,
  },
  {
    id: "c03",
    name: "手办",
    count: 56,
  },
  {
    id: "d04",
    name: "积木",
    count: 99,
  },
  {
    id: "e05",
    name: "编织",
  },
]);

const travels = Array.from({ length: 4 }, (_, i) =>
  `https://picsum.photos/seed/nns${i + 74}/1080/1920`
);

/** ------------------------ vue3-carousel-3d ------------------------ */
const carousel_images = Array.from({ length: 5 }, (_, i) => //图片地址
  utils.getAssetsFile(`img/public/public-${i + 45}.png`)
);

// 更新当前页面索引
function updateCurrentPage() {
  const scrollTop = window.pageYOffset;
  const pageHeight = window.innerHeight;
  currentPage.value = Math.floor(scrollTop / pageHeight);
}
onMounted(() => {
  isFirstRun = true;
  autoplayInterval = setInterval(moveCard, 4000);

  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('scroll', updateCurrentPage, { passive: true });

  // 视差滚动监听
  window.addEventListener('scroll', handleParallaxScroll, { passive: true });
  handleParallaxScroll(); // 初始化位置

  // 禁用滚轮
  window.addEventListener('wheel', preventWheelScroll, { passive: false });
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  clearInterval(autoplayInterval);

  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('scroll', updateCurrentPage);

  // 移除视差滚动监听
  window.removeEventListener('scroll', handleParallaxScroll);

  // 恢复滚轮
  window.removeEventListener('wheel', preventWheelScroll);
  document.body.style.overflow = '';
});

</script>
<style scoped lang="scss">
@font-face {
  font-family: "Vampiro One";
  font-style: normal;
  font-weight: 400;
  src: local("Vampiro One"), local("VampiroOne-Regular"),
    url("@/assets/fonts/Ho2Xld8UbQyBA8XLxF1_NYbN6UDyHWBl620a-IRfuBk.woff") format("woff");
}

.navigate {
  width: 100%;
  position: fixed;
  z-index: 99;
}

/* 更新视差背景样式 */
.parallax-bg {
  position: fixed;
  top: -200%;
  left: 0;
  width: 100%;
  height: 500%;
  z-index: -2;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
}

// 添加遮罩层样式
.parallax-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  /* 装饰元素 */
  .decoration {
    position: absolute;
    z-index: 1;
  }

  .circle-left {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, rgba(255, 182, 193, 0.2), rgba(255, 105, 180, 0.1));
    border-radius: 50%;
    bottom: -50px;
    left: -50px;
  }

  .circle-right {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, rgba(154, 124, 255, 0.15), rgba(255, 158, 207, 0.1));
    border-radius: 50%;
    bottom: 100px;
    right: 50px;
  }

  .triangle {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid rgba(255, 182, 193, 0.2);
    top: 30%;
    right: 10%;
    transform-origin: center center;
  }

  /* 浮动圆点装饰 */
  .floating-dot {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF9ECF, #9A7CFF);
    opacity: 0.3;
    z-index: -1;
    animation: float 6s ease-in-out infinite;

  }

  .dot-1 {
    width: 20px;
    height: 20px;
    top: 20%;
    left: 15%;
    animation-delay: 0s;
  }

  .dot-2 {
    width: 15px;
    height: 15px;
    top: 60%;
    left: 10%;
    animation-delay: 1s;
  }

  .dot-3 {
    width: 25px;
    height: 25px;
    top: 30%;
    right: 15%;
    animation-delay: 2s;
  }

  .dot-4 {
    width: 12px;
    height: 12px;
    top: 70%;
    right: 20%;
    animation-delay: 3s;
  }
}

#AlbumCollection {
  @include flexCenter(column, center);
  background: transparent;

  // 所有页面
  .page {
    width: 100vw;
    height: 100vh;
    @include flexCenter(column, center);

    // 标题
    h1 {
      padding-top: 2rem;
      text-align: center;
      font-size: 36px;
      font-weight: 700;
      font-family: 'gtpy'
    }

    .special-title {
      text-align: center;
      position: relative;
      padding: 1.5rem 0;

      /* 标题背景底纹 */
      .title-backdrop {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 120%;
        background: linear-gradient(135deg, rgba(255, 158, 207, 0.1), rgba(154, 124, 255, 0.1));
        border-radius: 50% 20% 50% 20%;
        filter: blur(15px);
        opacity: 1;
      }

      .gallery-title {
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #FF9ECF 0%, #9A7CFF 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        display: inline-block;
        margin: 0;
        position: relative;
        padding: 0 20px;
        letter-spacing: 1px;
        transition: all 0.3s ease;
        cursor: pointer;
        text-shadow: 0 2px 10px rgba(154, 124, 255, 0.2);
      }

      /* 标题装饰线条 */
      .title-decoration {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 180px;
        height: 8px;
        background: linear-gradient(90deg, transparent, #FF9ECF, #9A7CFF, transparent);
        border-radius: 4px;
        opacity: 0.8;
      }
    }
  }

  // 堆叠切换
  .stacking_switch {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    place-items: center; // 现代浏览器
    //background-color: rebeccapurple;

    // 兼容性写法
    >* {
      justify-self: center;
      align-self: center;
    }

    .content {
      user-select: none;
      padding-left: 10vw;

      h1 {
        font-family: var(--app-font-family);
        font-size: clamp(2rem, 4vw, 2.5rem);
        font-weight: 700;
        background: -webkit-linear-gradient(0deg, #f76591, #ffc16f);
        background-clip: text;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.1;
        margin-bottom: 36px;
        padding-left: 10px;
      }

      p {
        font-size: clamp(0.9rem, 4vw, 1.2rem);
        line-height: 1.6;
        font-family: var(--app-font-family);
      }

      .btn {
        background-image: linear-gradient(-180deg, #ffc16f, #f76591);
        font-size: clamp(0.8rem, 8vw, 0.9rem);
        font-weight: 600;
        color: $general-white;
        width: max-content;
        outline: 0;
        border: 0;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 10px 20px;
        margin-top: 26px;
        text-align: center;
        transform: scale(1);
        transition: all 0.2s ease-in;
        cursor: pointer;
        touch-action: manipulation;
        user-select: none;
        -webkit-user-select: none;
        pointer-events: auto;
        font-family: var(--app-font-family);

        &:hover {
          box-shadow: 0 4px 10px rgba(247, 101, 145, 0.5);
          transform: scale(0.98);
        }
      }
    }

    .stack {
      position: relative;

      .card {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width: 350px;
        height: 500px;
        border-radius: 2rem;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25),
          0 15px 20px 0 rgba(0, 0, 0, 0.125);
        transition: transform 0.6s;
        user-select: none;

        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          object-fit: cover;
          pointer-events: none;
        }

        &:nth-last-child(n + 5) {
          --x: calc(-50% + 90px);
          transform: translate(var(--x), -50%) scale(0.85);
          box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.01);
        }

        &:nth-last-child(4) {
          --x: calc(-50% + 60px);
          transform: translate(var(--x), -50%) scale(0.9);
        }

        &:nth-last-child(3) {
          --x: calc(-50% + 30px);
          transform: translate(var(--x), -50%) scale(0.95);
        }

        &:nth-last-child(2) {
          --x: calc(-50%);
          transform: translate(var(--x), -50%) scale(1);
        }

        &:nth-last-child(1) {
          --x: calc(-50% - 30px);
          transform: translate(var(--x), -50%) scale(1.05);
        }

        &:nth-last-child(1) img {
          box-shadow: 0 1px 5px 5px rgba(255, 193, 111, 0.5);
        }
      }
    }

    .swap {
      animation: swap 1.3s ease-out forwards;
    }

    @keyframes swap {
      30% {
        transform: translate(calc(var(--x) - 250px), -50%) scale(0.85) rotate(-5deg) rotateY(65deg);
      }

      100% {
        transform: translate(calc(var(--x) - 30px), -50%) scale(0.5);
        z-index: -1;
      }
    }
  }

  // 连续+缩略
  .second_carousel {
    position: relative;
    // background-color: pink;

    // 无限滚动
    .carousel {
      width: 100vw;
      animation: opacityIn 0.5s ease-in forwards;
      overflow-x: hidden;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      .carousel__right {
        padding: 1rem 0;
      }
    }

    .carouselBg {
      width: 100%;
      height: 100%;
      background-image: linear-gradient(0deg,
          rgba(211, 196, 252, 0.9),
          rgba(147, 197, 252, 0.2));
      position: absolute;
    }

    // 缩略轮播
    .thumbnail__carousel {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  //常见布局
  .flex_layout {
    @include flexCenter(column, center);

    .nav {
      padding: 2rem 0;

      ul {
        display: flex;

        li {
          padding: 0 0.5rem;

          /* 7 */
          .btn-7 {
            margin: 0.2rem 0;
            font-family: var(--app-font-family);
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
            box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
              7px 7px 20px 0px rgba(0, 0, 0, 0.1),
              4px 4px 5px 0px rgba(0, 0, 0, 0.1);
            outline: none;
            border-radius: 5px;
            padding: 0;
            border: none;

            &>span {
              position: relative;
              display: block;
              border-radius: 5px;
              width: 100%;
              height: 100%;
              padding: 0.4rem 1rem;
            }

            &::before,
            &::after,
            &>span::before,
            &>span::after {
              position: absolute;
              content: "";
              right: 0;
              bottom: 0;
              background: rgba(251, 75, 2, 1);
              box-shadow: -7px -7px 20px 0px rgba(255, 255, 255, 0.9),
                -4px -4px 5px 0px rgba(255, 255, 255, 0.9),
                7px 7px 20px 0px rgba(0, 0, 0, 0.2),
                4px 4px 5px 0px rgba(0, 0, 0, 0.3);
              transition: all 0.3s ease;
            }

            &>span::before,
            &>span::after {
              left: 0;
              top: 0;
            }

            &::before,
            &>span::before {
              height: 0%;
              width: 2px;
            }

            &::after,
            &>span::after {
              width: 0%;
              height: 2px;
            }

            &:hover {
              color: rgba(251, 75, 2, 1);
              background: transparent !important;

              &::before,
              &>span::before {
                height: 100%;
              }

              &::after,
              &>span::after {
                width: 100%;
              }
            }
          }
        }
      }
    }

    .flex_body {
      @include flexCenter(row, space-around);
      width: 80%;

      .box {
        width: calc(15vw + 1rem);
        padding: 0.5rem;
        border-radius: 15px;
        box-shadow: 0px 0px 3px 1px rgba(17, 17, 26, 0.1);

        .img__box {
          width: 100%;
          height: 36vh;
          overflow: hidden;
          border-radius: 15px;
          box-shadow: 0px 0px 6px 2px rgba(17, 17, 26, 0.1);

          img {
            transition: all 0.5s;
            width: 100%;
            height: 100%;

            &:hover {
              scale: (1.2);
            }
          }
        }

        .text__box {
          font-family: var(--app-font-family);

          h1 {
            font-size: 0.9rem;
            font-weight: 700;
            padding: 1rem 0.5rem;
            max-width: 14.5rem;
            font-family: var(--app-font-family);
            letter-spacing: -1px;
            /* 强制文本在一行内显示 */
            white-space: nowrap;
            /* 隐藏超出容器的内容 */
            overflow: hidden;
            /* 使用省略号表示被截断的文本 */
            text-overflow: ellipsis;
          }

          h2 {
            font-size: 0.8rem;
            color: #b4b4b4;
            padding: 0 0.5rem;
          }
        }
      }
    }
  }

  //vue3-carousel-3d
  .vue3-carousel-3d {
    .carousel_body {
      width: 80vw;
      margin: 0;

      .carousel-3d-container {
        padding: 2rem;
      }
    }

    img {
      border-radius: 0;
    }
  }

  .gallery {
    $index: calc(1vw + 1vh);
    $transition: cubic-bezier(.1, .7, 0, 1);

    .items {
      display: flex;
      gap: 0.4rem;
      perspective: calc($index * 35);
      padding: 2rem;
    }

    .item {
      width: calc($index * 3);
      height: calc($index * 12);
      background-color: #222;
      background-size: cover;
      background-position: center;
      cursor: pointer;
      filter: grayscale(1) brightness(.5);
      transition: transform 1.25s $transition, filter 3s $transition, width 1.25s $transition;
      will-change: transform, filter, rotateY, width;

      &::before,
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 20px;
        right: calc($index * -1);
      }

      &::after {
        left: calc($index * -1);
      }

      &:hover {
        filter: inherit;
        transform: translateZ(calc($index * 10));
      }
    }

    /*Right*/
    .item:hover+* {
      filter: inherit;
      transform: translateZ(calc($index * 8.5)) rotateY(35deg);
      z-index: -1;
    }

    .item:hover+*+* {
      filter: inherit;
      transform: translateZ(calc($index * 5.6)) rotateY(40deg);
      z-index: -2;
    }

    .item:hover+*+*+* {
      filter: inherit;
      transform: translateZ(calc($index * 2.5)) rotateY(30deg);
      z-index: -3;
    }

    .item:hover+*+*+*+* {
      filter: inherit;
      transform: translateZ(calc($index * .6)) rotateY(15deg);
      z-index: -4;
    }


    /*Left*/

    .item:has(+ :hover) {
      filter: inherit;
      transform: translateZ(calc($index * 8.5)) rotateY(-35deg);
    }

    .item:has(+ * + :hover) {
      filter: inherit;
      transform: translateZ(calc($index * 5.6)) rotateY(-40deg);
    }

    .item:has(+ * + * + :hover) {
      filter: inherit;
      transform: translateZ(calc($index * 2.5)) rotateY(-30deg);
    }

    .item:has(+ * + * + * + :hover) {
      filter: inherit;
      transform: translateZ(calc($index * .6)) rotateY(-15deg);
    }

    .item:active,
    .item:focus {
      width: 28vw;
      filter: inherit;
      z-index: 100;
      transform: translateZ(calc($index * 10));
      margin: 0 .45vw;
      transition: transform 1.25s $transition,
        filter 3s $transition,
        width 0.8s $transition; // 单独设置width的过渡时间
    }
  }
}

//右侧导航按钮
.nav-panel {
  position: fixed;
  top: 50%;
  right: 2vw;
  transform: translateY(-50%);
  z-index: 1;
  @include flexCenter(column, space-between);
  padding: 0.5rem 0.3rem;

  //上下箭头
  .up,
  .down {
    width: 2rem;
    height: 2rem;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(0, 0, 0, .5);
    border-radius: 10px;

    img {
      width: 1.1rem;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
