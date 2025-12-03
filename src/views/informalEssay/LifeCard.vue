<template>
  <div class="container" id="life-card">
    <Navigation hoverBgColor="#f0f4f5" textColor="#585858" />
    <!-- 内容 -->
    <div id="sb-container" ref="sbContainer" class="sb-container">
      <div v-for="(item, idx) in sbItems" :key="idx">
        <span v-if="item.icon" class="sb-icon" :class="item.icon"></span>
        <h4>
          <span>{{ item.label }}</span>
        </h4>
      </div>
    </div>
    <!-- logo -->
    <div class="leftBottom" ref="leftBottom">
      <span>放置相关文字</span>
      <span class="closeBtn" @click="closeCard">x</span>
    </div>
  </div>
</template>
// ...existing code...
<script setup>
import { onMounted, ref } from "vue";
import { swatchbook } from "@/utils/swatchbook-native";
import Navigation from "@/components/NavigationMenu/index.vue";
const leftBottom = ref(null);
const sbContainer = ref(null);
const sbItems = [
  { icon: "icon-cog", label: "所有设置" },
  { icon: "icon-flight", label: "用户模式" },
  { icon: "icon-eye", label: "浏览全部" },
  { icon: "icon-install", label: "软件安装" },
  { icon: "icon-bag", label: "Productivity" },
  { icon: "icon-globe", label: "所有选项" },
  { icon: "icon-picture", label: "用户图片" },
  { icon: "icon-video", label: "用户视频" },
  { icon: "icon-download", label: "软件下载" },
  { icon: "icon-mobile", label: "手机主题" },
  { icon: "icon-camera", label: "登录系统" },
  { icon: "", label: "Click me" },
];
const closeCard = () => {
  leftBottom.value.style.opacity = "0";
};
onMounted(() => {
  const el = sbContainer.value;
  if (el) {
    swatchbook(el, {
      angleInc: 15,
      neighbor: 15,
      initclosed: true,
      closeIdx: 11,
    });
  }
});
</script>

<style scoped lang="scss">
#life-card {
  height: 100vh;
  background: $pages-background-color;
}

@font-face {
  font-family: "icons";
  src: url("./fonts/icons.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

/* style3 */
.sb-container {
  position: relative;
  width: 150px;
  height: 400px;
  z-index: 21;
  margin: 15vh auto;
}

.sb-container div {
  position: absolute;
  top: 0;
  left: 0;
  width: 130px;
  background: #fff;
  height: 400px;
  border-radius: 5px;
  box-shadow: -1px -1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;

  -webkit-transform-origin: 25% 90%;
  -moz-transform-origin: 25% 90%;
  -o-transform-origin: 25% 90%;
  -ms-transform-origin: 25% 90%;
  transform-origin: 25% 90%;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  z-index: 20;
}

// 简化彩色卡片样式，使用循环生成不同颜色和阴影
@for $i from 1 through 11 {
  .sb-container div:nth-child(#{$i}) {
    background-color: nth((#ea2a29,
          #f16729,
          #f89322,
          #ffcf14,
          #ffea0d,
          #87b11d,
          #008253,
          #3277b5,
          #4c549f,
          #764394,
          #ca0d86),
        $i );
    box-shadow: -1px -1px 3px rgba(0, 0, 0, 0.1),
    #{$i}px #{$i}px #{($i * 2 - 1)}px rgba(0, 0, 0, if($i < 4, 0.1 + $i * 0.05, 0.1 + $i * 0.1)),
    inset 0 3px 0 rgba(255, 255, 255, 0.2);

    &:hover {
      translate: 0 -1rem;
    }
  }
}

.sb-container div:last-child {
  background: #111 url("/src/assets/img/infomalEssay/dark_leather.jpg") repeat center center;
  box-shadow: -1px -1px 3px rgba(0, 0, 0, 0.2),
    12px 12px 20px rgba(0, 0, 0, 0.6), inset 2px 2px 0 rgba(255, 255, 255, 0.1);
}

.sb-container div:last-child:after {
  content: "";
  position: absolute;
  bottom: 15px;
  left: 15px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #dddddd;
  background: -moz-linear-gradient(-45deg,
      #dddddd 0%,
      #58535e 48%,
      #889396 100%);
  background: -webkit-gradient(linear,
      left top,
      right bottom,
      color-stop(0%, #dddddd),
      color-stop(48%, #58535e),
      color-stop(100%, #889396));
  background: -webkit-linear-gradient(-45deg,
      #dddddd 0%,
      #58535e 48%,
      #889396 100%);
  background: -o-linear-gradient(-45deg, #dddddd 0%, #58535e 48%, #889396 100%);
  background: -ms-linear-gradient(-45deg,
      #dddddd 0%,
      #58535e 48%,
      #889396 100%);
  background: linear-gradient(135deg, #dddddd 0%, #58535e 48%, #889396 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#dddddd', endColorstr='#889396', GradientType=1);
  box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.7),
    1px 1px 1px rgba(255, 255, 255, 0.1);
}

.sb-container div h4 {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
  margin: 5px;
  padding: 5px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.sb-container div:last-child h4 {
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 1px rgba(255, 255, 255, 0.1);
}

span {
  color: white;
  font-family: "gtpy";
}

.sb-container div:last-child h5 {
  font-size: 50px;
  white-space: nowrap;
  text-align: left;
  margin: 0;
  padding: 0;
  position: absolute;
  line-height: 50px;
  top: 0px;
  left: 0px;
  color: #000;
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.1);
  text-transform: uppercase;

  -webkit-transform: rotate(-90deg) translateX(-157%) translateY(73px);
  -moz-transform: rotate(-90deg) translateX(-157%) translateY(73px);
  -o-transform: rotate(-90deg) translateX(-157%) translateY(73px);
  -ms-transform: rotate(-90deg) translateX(-157%) translateY(73px);
  transform: rotate(-90deg) translateX(-157%) translateY(73px);

  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  transform-origin: 0 0;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

span.sb-icon {
  display: block;
  height: 70px;
  width: 70px;
  margin: 20px auto;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

span.sb-icon:before {
  font-family: "icons";
  font-style: normal;
  font-weight: normal;
  display: block;
  text-decoration: inherit;
  text-align: center;
  text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3);
  line-height: 64px;
  width: 100%;
  font-size: 60px;
  color: #000;
  text-shadow: 0 0 1px #000;
}

.icon-cog:before {
  content: "\35";
}

/* '5' */
.icon-flight:before {
  content: "\37";
}

/* '7' */
.icon-eye:before {
  content: "\34";
}

/* '4' */
.icon-install:before {
  content: "\39";
}

/* '9' */
.icon-bag:before {
  content: "\36";
}

/* '6' */
.icon-globe:before {
  content: "\38";
}

/* '8' */
.icon-picture:before {
  content: "\32";
}

/* '2' */
.icon-video:before {
  content: "\30";
}

/* '0' */
.icon-download:before {
  content: "\41";
}

/* 'A' */
.icon-mobile:before {
  content: "\42";
}

/* 'B' */
.icon-camera:before {
  content: "\33";
}

.leftBottom {
  position: fixed;
  width: 298px;
  height: 73px;
  bottom: 0;
  left: 0;
  opacity: 1;
  transition: opacity 0.4s ease-in-out;
  @include flexCenter(row, center);
  margin: 1rem;
  background-image: url("/src/assets/img/infomalEssay/smoke.png");

  .closeBtn {
    position: absolute;
    right: 0.4rem;
    top: 0.2rem;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
