<template>
  <div class="pagesOption">
    <ClickRipple></ClickRipple>
    <router-view></router-view>
  </div>
  <div class="floot_right">
    <!-- 鼠标左键特效切换 -->
    <div class="ripple__toggle" @click="rippleStore.toggle">
      {{ rippleStore.enabled ? "🍃" : "🍂" }}
    </div>
    <!-- 占位gif -->
    <div class="ripple__toggle secBtn">
      <img :src="utils.getAssetsFile('icon/1479.gif')" alt="" />
    </div>
    <!-- 返回顶部 -->
    <a-back-top shape="">
      <template #icon>
        <svg t="1751354919171" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="6987" width="27" height="27">
          <path
            d="M774.091264 438.6816A500.992 500.992 0 0 0 512.612864 0.4096V0h-0.8704v0.4096a500.7872 500.7872 0 0 0-261.5296 438.272 191.2832 191.2832 0 0 0-95.5392 187.3408c8.448 98.3552 106.3936 163.84 143.9232 160.0512s26.5728-30.72 26.5728-30.72l12.8512-51.2s55.296 81.92 73.0112 81.92c15.9232-1.2288 91.648 0 100.7104 0h0.8704c9.0624 0 84.7872-1.2288 100.7104 0 17.7152 0 73.0112-81.92 73.0112-81.92l12.8 51.2s-10.8544 27.2896 26.624 30.72 135.4752-61.44 143.9232-160.0512a191.3344 191.3344 0 0 0-95.5392-187.3408zM512.100864 434.3296a110.2336 110.2336 0 0 1-108.3904-109.1072 108.3904 108.3904 0 1 1 216.7808 0A110.2336 110.2336 0 0 1 512.100864 434.3808z m-54.784 509.3888a22.1696 22.1696 0 0 1-44.3392 0v-107.52a22.1696 22.1696 0 0 1 44.3392 0v107.52z m81.4592 58.2144a22.4768 22.4768 0 0 1-44.9536 0v-159.7952a22.4768 22.4768 0 0 1 44.9536 0v159.8464z m74.9568-83.5072a22.1696 22.1696 0 0 1-44.3392 0v-76.8a22.1696 22.1696 0 0 1 44.3392 0z"
            fill="#39C49E" p-id="6988"></path>
        </svg>
      </template>
    </a-back-top>
  </div>
</template>

<script setup>
import ClickRipple from "./components/ClickRipple/ClickRipple.vue";
import { rippleStore } from "@/store/isEnabledRipple";
import utils from "@/utils/getAssetsFile";
console.log(`%c ${t} %c ${n} %c`, `background:${vn.typeColor(e)};border:1px solid ${vn.typeColor(e)};
      padding: 1px; border-radius: 4px 0 0 4px; color: #fff;`, `border:1px solid ${vn.typeColor(e)};
      padding: 1px; border-radius: 0 4px 4px 0; color: ${vn.typeColor(e)};`, "background:transparent")
</script>

<style scoped lang="scss">
//工具栏
.floot_right {
  border-radius: 8px;
  position: fixed;
  right: 2vw;
  bottom: 2vw;
  z-index: 999;
  overflow: hidden;
  box-shadow: 0px 0px 0.75rem 0px rgba(113, 113, 113, 0.2);
  @include flexCenter(column, space-around);
  background-color: #fff;
}

.ripple__toggle {
  width: 2rem;
  height: 2.5rem;
  @include flexCenter(center, center);
  font-size: 22px;
  transition: all 0.25s;

  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
}

.secBtn {
  // background-color: rebeccapurple;
  border-top: 1px solid #f0f0f0;

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
