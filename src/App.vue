<template>
  <div class="pagesOption">
    <ClickRipple></ClickRipple>
    <router-view></router-view>
  </div>
  <div class="floot_right">
    <div class="backTop"> <a-back-top /></div>
    <div class="ripple__toggle" @click="rippleStore.toggle">
      {{ rippleStore.enabled ? '🍃' : '🍂' }}
    </div>

    <div class="cssload-wrap">
      <div class="cssload-circle"></div>
      <div class="cssload-circle"></div>
      <div class="cssload-circle"></div>
      <div class="cssload-circle"></div>
      <div class="cssload-circle"></div>
    </div>
  </div>

</template>

<script setup>
import ClickRipple from './components/ClickRipple/ClickRipple.vue';
import { rippleStore } from '@/store/isEnabledRipple';
import utils from './utils/getAssetsFile';
</script>

<style scoped lang="scss">
//工具栏
.floot_right {
  width: 5rem;
  height: 20vh;
  padding: 1rem;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 999;
  @include flexCenter(column, space-around);

  .backTop {
    .ant-float-btn {
      position: absolute;
      top: 3rem;
      left: 1.5rem;
    }
  }

  .ripple__toggle {
    position: absolute;
    top: 0;
    width: 2rem;
    height: 2rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0px 0px 0.75rem 0px rgba(113, 113, 113, 0.2);

    &:hover {
      cursor: pointer;
    }
  }

  .cssload-wrap {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    position: absolute;
    perspective: 3900px;
    bottom: 1.5rem;
    left: 1.5rem;
    border-radius: 50%;
    transform-style: preserve-3d;
    box-shadow: 0px 0px 0.75rem 0px rgba(113, 113, 113, 0.2);

    .cssload-circle {
      transform-style: preserve-3d;
      box-sizing: border-box;
      opacity: 0;
      width: 40px;
      height: 40px;
      border: 2px solid #eb1558;
      border-radius: 146px;
      position: absolute;
      top: 0;
      left: 0;
      animation: cssload-spin 28.5s ease-in-out alternate infinite;

      &:nth-of-type(1) {
        animation-delay: 475ms;
      }

      &:nth-of-type(2) {
        animation-delay: 950ms;
      }

      &:nth-of-type(3) {
        animation-delay: 1425ms;
      }

      &:nth-of-type(4) {
        animation-delay: 1900ms;
      }

      &:nth-of-type(5) {
        animation-delay: 2375ms;
      }
    }

    @keyframes cssload-spin {
      0% {
        transform: rotateY(0deg) rotateX(0deg);
        opacity: 1;
      }

      25% {
        transform: rotateY(180deg) rotateX(360deg);
      }

      50% {
        transform: rotateY(540deg) rotateX(540deg);
      }

      75% {
        transform: rotateY(720deg) rotateX(900deg);
      }

      100% {
        transform: rotateY(900deg) rotateX(1080deg);
        opacity: 1;
      }
    }

  }

}
</style>
