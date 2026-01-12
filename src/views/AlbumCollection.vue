<template>
  <div>
    <!-- 导航栏 -->
    <div class="navigate">
      <Navigation hoverBgColor="#f0f4f5" textColor="#585858" bgColor="#fff" />
    </div>

    <div class="active-page1" id="AlbumCollection" ref="AlbumCollection">
      <!-- 堆叠切换 -->
      <div class="stacking_switch page page1">
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
      <div class="second_carousel page page2">
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
      <div class="flex_layout page page3">
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
              <img v-lazy="item.src" alt="tests" />
            </div>
            <div class="text__box">
              <h1>风住尘香花已尽，日晚倦梳头风住尘香花已尽，日晚倦梳头。</h1>
              <h2>Date:2024-12-19</h2>
            </div>
          </div>
        </div>
      </div>

      <!-- vue3-carousel-3d -->
      <div class="vue3-carousel-3d page page4">
        <div class="carousel_title">
          <h1>vue-carousel-3d | 基于vue.js的漂亮3D轮播图组件</h1>
          <div class="thisLogo">
            <span>Personal blog</span>
          </div>
        </div>

        <div class="carousel_body">
          <carousel-3d :controlsVisible="true" :height="280" :width="450" :autoplay="isPageVisible"
            :autoplayTimeout="4000" :autoplayHoverPause="true">
            <slide v-for="(slide, i) in carousel_images" :index="i" :key="i">
              <img :src="slide" alt="carouselImg" style="height: 100%" />
            </slide>
          </carousel-3d>
        </div>
      </div>

      <!-- 图片倒影 -->
      <div class="inverted page page5">
        <div class="inverted_title">
          <h1>通过CSS3的transform和box-reflect属性实现图片的倒影效果</h1>
          <div class="thisLogo">
            <span>Personal blog</span>
          </div>
        </div>
        <!-- 舞台层 -->
        <div class="stage">
          <!-- 控制层 -->
          <div class="control">
            <!-- 图片层 -->
            <div class="imgWrap">
              <div v-for="i in 8" :key="i" :class="`img img${i}`">
                <img :src="utils.getAssetsFile(`img/public/public-${i}.png`)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧导航栏 -->
    <div class="nav-panel">
      <div class="up">
        <img :src="utils.getAssetsFile('icon/albumCollection/upArrow.svg')" alt="upArrow">
      </div>
      <div class="middle">
        <img :src="utils.getAssetsFile('icon/albumCollection/snail.svg')" alt="snail">

      </div>
      <div class="down">
        <img :src="utils.getAssetsFile('icon/albumCollection/downArrow.svg')" alt="downArrow">
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import CarouselImage from "@/components/CarouselImage/index.vue";
import ThumbnailCarousel from "@/components/ThumbnailCarousel/index.vue";
import Navigation from "../components/NavigationMenu/index.vue";
import utils from "@/utils/getAssetsFile";
const cardImages = Array.from({ length: 7 }, (_, i) =>
  utils.getAssetsFile(`img/albumCollection/nns${i + 1}.jpg`)
);
const cards = ref([...cardImages]);
const stackRef = ref(null);
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

// 连续+缩略
const imageList_left = ref([
  10003, 10004, 10006, 10007, 10009, 10010
].map(num => utils.getAssetsFile(`img/albumCollection/${num}.jpg`)));

const imageList_right = ref([
  10013, 10014, 10015, 10016, 10017, 10019, 10020
].map(num => utils.getAssetsFile(`img/albumCollection/${num}.jpg`)));



// 常见布局
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
const travels = ref([
  {
    id: 2,
    src: utils.getAssetsFile("img/albumCollection/travel2.jpg"),
  },
  {
    id: 3,
    src: utils.getAssetsFile("img/albumCollection/travel3.jpg"),
  },
  {
    id: 4,
    src: utils.getAssetsFile("img/albumCollection/travel4.jpg"),
  },
  {
    id: 5,
    src: utils.getAssetsFile("img/albumCollection/travel5.jpg"),
  },
]);


/** ------------------------ vue3-carousel-3d ------------------------ */
const isPageVisible = ref(true);
const handleVisibilityChange = () => {
  if (document.hidden) {
    this.isPageVisible = false; // 页面不可见
  } else {
    this.isPageVisible = true; // 页面可见
    // 如果需要在页面重新变为可见时恢复轮播，可以在这里添加逻辑
    // 例如，重新启动一个计时器或触发轮播的继续播放
  }
};
//图片地址
const carousel_images = Array.from({ length: 5 }, (_, i) =>
  utils.getAssetsFile(`img/public/public-${i + 45}.png`)
);

onMounted(() => {
  // 只设置定时器，不主动执行 moveCard，且首次定时器触发时跳过
  isFirstRun = true;
  autoplayInterval = setInterval(moveCard, 4000);

  // 页面切换导航
  const wrap = document.getElementById("AlbumCollection");
  const pages = document.querySelectorAll(".page").length;
  const navPanel = document.querySelector(".nav-panel");
  let scrolling = false;
  let currentPage = 1;
  function manageClasses() {
    wrap.className = wrap.className.replace(/(^|\s)active-page\S+/g, "").trim();
    wrap.classList.add("active-page" + currentPage);
    scrolling = true;
    setTimeout(() => {
      scrolling = false;
    }, 1000);
  }
  function navigateUp() {
    if (currentPage > 1) {
      currentPage--;
      manageClasses();
    }
  }
  function navigateDown() {
    if (currentPage < pages) {
      currentPage++;
      manageClasses();
    }
  }
  // 鼠标滚轮切换
  document.addEventListener("wheel", (e) => {
    if (!scrolling) {
      if (e.deltaY < 0) {
        navigateUp();
      } else {
        navigateDown();
      }
    }
  });
  // 上下按钮点击
  navPanel.querySelector(".up")?.addEventListener("click", navigateUp);
  navPanel.querySelector(".down")?.addEventListener("click", navigateDown);

});

onBeforeUnmount(() => {
  clearInterval(autoplayInterval);
  // 其它事件无需移除（页面卸载自动清理），如需更严格可记录事件并移除。
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
  z-index: 1;
}

#AlbumCollection {
  $pagesCount: 10; // 页面数量
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  -webkit-transition: -webkit-transform 1.5s;
  transition: transform 1.5s;
  -webkit-perspective: 3000;
  perspective: 3000;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;

  // 堆叠切换
  .stacking_switch {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    place-items: center; // 现代浏览器

    // 兼容性写法
    >* {
      justify-self: center;
      align-self: center;
    }

    .content {
      user-select: none;
      padding-left: 10vw;

      h1 {
        font-family: 'gtpy';
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
        font-family: 'gtpy';
      }

      .btn {
        background-image: linear-gradient(-180deg, #ffc16f, #f76591);
        font-size: clamp(0.8rem, 8vw, 0.9rem);
        font-weight: 600;
        color: #fff;
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
        font-family: 'lmst';

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
      // width: 100%;
      padding: 2rem 0;

      ul {
        display: flex;

        li {
          padding: 0 0.5rem;

          /* 7 */
          .btn-7 {
            margin: 0.2rem 0;
            font-family: "gtpy";
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

      h1 {
        padding-top: 2rem;
        text-align: center;
        font-size: 36px;
        font-weight: 700;
        font-family: 'gtpy'
      }
    }

    .flex_body {
      @include flexCenter(row, flex-start);
      row-gap: 30px;
      column-gap: 30px;
      flex-wrap: wrap;

      .box {
        padding: 0.5rem;
        border-radius: 15px;
        box-shadow: 0px 0px 3px 1px rgba(17, 17, 26, 0.1);

        .img__box {
          width: 305px;
          height: 340px;
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
          h1 {
            font-size: 1rem;
            font-weight: 700;
            padding: 1rem 0.5rem;
            max-width: 14.5rem;
            font-family: "gtpy";
            letter-spacing: -1px;
            /* 强制文本在一行内显示 */
            white-space: nowrap;
            /* 隐藏超出容器的内容 */
            overflow: hidden;
            /* 使用省略号表示被截断的文本 */
            text-overflow: ellipsis;
          }

          h2 {
            font-size: 0.9rem;
            color: #b4b4b4;
            padding: 0 0.5rem;
          }
        }
      }
    }
  }

  //vue3-carousel-3d
  .vue3-carousel-3d {
    @include flexCenter(column, space-around);
    margin: 0;

    .carousel_title {

      h1 {
        font-size: 38px;
        padding: 1.5rem 0;
        font-family: 'gtpy';
        font-weight: 700;
      }

      .thisLogo {
        @include flexCenter(row, center);

        span {
          font-family: "Vampiro One";
          font-size: 1.6rem;
          background: -webkit-linear-gradient(0deg, $primary-color, $primary-hover);
          background-clip: text;
          -webkit-text-fill-color: transparent;
          height: 2.6rem;
          line-height: 2.6rem;
        }
      }
    }

    .carousel_body {
      width: 75vw;
      margin: 0;

      .carousel-3d-container {
        margin: 0;
      }
    }

    img {
      border-radius: 0;
    }
  }

  //图片倒影
  .inverted {
    $imgCount: 8;
    @include flexCenter(column, center);

    .inverted_title {
      transform: translateY(-20vh);

      h1 {
        font-size: 38px;
        padding: 1.5rem 0;
        font-family: 'gtpy';
        font-weight: 700;
      }

      .thisLogo {
        @include flexCenter(row, center);

        span {
          font-family: "Vampiro One";
          font-size: 1.6rem;
          background: -webkit-linear-gradient(0deg, $primary-color, $primary-hover);
          background-clip: text;
          -webkit-text-fill-color: transparent;
          height: 2.6rem;
          line-height: 2.6rem;
        }
      }
    }

    .stage {
      position: relative;
      width: 1400px;
      height: 200px;
      margin: 0 auto;
      perspective: 2000px;
      transform-style: preserve-3d;
      -webkit-box-reflect: below 0 linear-gradient(transparent, rgba(0, 0, 0, 0.5));

      .control {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transform: translateZ(-2000px) rotateY(30deg) rotateZ(0deg);
        animation: rotate 80s linear infinite;

        .imgWrap {
          position: absolute;
          width: 400px;
          height: 270px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -45%);
          transform-style: preserve-3d;

          .img {
            position: absolute;
            width: 500px;
            height: 270px;
            line-height: 270px;
            text-align: center;
            font-size: 120px;
            top: 0;
            left: 0;
            transform-style: preserve-3d;
            transform-origin: 50% 50% 100px;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
          }

          @for $i from 1 through $imgCount {
            .img#{$i} {
              // transform: rotateY(35 + ($i * 45deg)) translateZ(482.84px);
              transform: rotateY(25 + ($i * 45deg)) translateZ(750px);
            }
          }
        }
      }
    }

    @keyframes rotate {
      0% {
        transform: translateZ(-2000px) rotateY(0deg);
      }

      50% {
        transform: translateZ(-2000px) rotateY(-360deg);
      }

      100% {
        transform: translateZ(-2000px) rotateY(-720deg);
      }
    }
  }

  .page {
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-transform: rotateX(0) scale(0);
    transform: rotateX(90deg) scale(0.3);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: -webkit-transform 1s ease-in-out;
    transition: transform 1s ease-in-out;
    will-change: transform;
  }

  //每一个Page的配置
  @for $i from 1 through $pagesCount {
    $translateY: -($i - 1) * 100%;

    &.active-page#{$i} {
      -webkit-transform: translateY($translateY);
      -ms-transform: translateY($translateY);
      transform: translateY($translateY);

      .page.page#{$i} {
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
      }
    }
  }
}

//右侧导航按钮
.nav-panel {
  position: fixed;
  top: 50%;
  right: 2vw;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: 1;
  -webkit-transition: opacity 0.5s,
    -webkit-transform 0.5s cubic-bezier(0.57, 1.2, 0.68, 2.6);
  transition: opacity 0.5s, transform 0.5s cubic-bezier(0.57, 1.2, 0.68, 2.6);
  will-change: transform, opacity;
  height: 15vh;
  background-color: #fff;
  @include flexCenter(column, space-between);
  box-shadow: 0px 0px 0.75rem 0px rgba(113, 113, 113, 0.2);
  border-radius: 10px;
  padding: 0.5rem 0.3rem;

  //上下箭头
  .up,
  .down,
  .middle {
    transition: all 0.3s ease;

    img {
      width: 1.2rem;
    }

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }
}
</style>
