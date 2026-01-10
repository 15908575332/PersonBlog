<template>
  <div>
    <div class="pagesOption" @click="handlePageClick">
      <ClickRipple></ClickRipple>
      <flowerAnimate :is-animating="isAnimating" :sakura-count="sakuraCount" :speed="speed" />
      <router-view></router-view>
    </div>
    <div class="floot_right" v-if="showRippleToggle">
      <!-- 花瓣动画设置 -->
      <div class="ripple__toggle flowerBtn" @click="toggleControlPanel">
        {{ showControlPanel ? "🌸" : "💮" }}
      </div>

      <!-- 鼠标左键特效切换 -->
      <div class="ripple__toggle" @click="rippleStore.toggle">
        {{ rippleStore.enabled ? "🍃" : "🍂" }}
      </div>

      <!-- 占位gif -->
      <div class="ripple__toggle secBtn">
        <img :src="utils.getAssetsFile('icon/1479.gif')" alt="占位符" />
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
    <!-- 花瓣动画控制面板 -->
    <div class="flowersControl" :class="{ 'showFlowersControl': showControlPanel }" ref="flowersControl">
      <div class="button-group">
        <button @click="toggleAnimation" class="control-btn">
          <img :src="isAnimating ? pauseIcon : playIcon" alt="controlBtn">
        </button>
        <button @click="resetAnimation" class="control-btn">
          <img src="@/assets/icon/public/icons8-reset-100.png" alt="reset">
        </button>
      </div>
      <div class="slider-flex">
        <div class="slider-group">
          <label for="sakuraCount">数量 </label>
          <input type="range" id="sakuraCount" min="10" max="200" v-model.number="sakuraCount"
            @change="changeSakuraCount" class="slider">
          <label for="sakuraCount">{{ sakuraCount }}</label>
        </div>
        <div class="slider-group">
          <label for="speed">速度 </label>
          <input type="range" id="speed" min="1" max="10" v-model.number="speed" class="slider" @change="changeSpeed">
          <label for="speed">{{ speed }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ClickRipple from "./components/ClickRipple/ClickRipple.vue";
import { rippleStore } from "@/store/isEnabledRipple";
import flowerAnimate from "./components/FlowerAnimate/index.vue"
import utils from "@/utils/getAssetsFile";
import { computed, onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/store/maincontent'
import pauseIcon from '@/assets/icon/public/icons8-pause-100.png'
import playIcon from '@/assets/icon/public/icons8-play-100.png'

/** ------------------------ 全局花瓣飘落动画 ------------------------ */
const showControlPanel = ref(false)
const flowersControl = ref();
const toggleControlPanel = () => {
  showControlPanel.value = !showControlPanel.value
}
const isAnimating = ref(true);
const sakuraCount = ref(localStorage.getItem('flowerAnimateSakuraCount') || 50);
const speed = ref(localStorage.getItem('flowerAnimateSpeed') || 5);

const handlePageClick = (event) => {
  if (!showControlPanel.value) return; // 如果面板未显示，直接返回
  if (flowersControl.value && !flowersControl.value.contains(event.target)) {
    showControlPanel.value = false; // 点击面板外部时隐藏面板
  }
};

const toggleAnimation = () => { // 花瓣动画暂停/播放
  isAnimating.value = !isAnimating.value;
};
const resetAnimation = () => { //重置属性
  localStorage.removeItem('flowerAnimateSakuraCount', 'flowerAnimateSpeed');
  isAnimating.value = true;
  sakuraCount.value = 50;
  speed.value = 5;
}
const changeSakuraCount = () => { //修改花瓣数量
  localStorage.setItem('flowerAnimateSakuraCount', sakuraCount.value);
};
const changeSpeed = () => {
  localStorage.setItem('flowerAnimateSpeed', speed.value);

}
watch(() => sakuraCount.value, (newVal) => {
  localStorage.setItem('flowerAnimateSakuraCount', newVal);
});

watch(() => speed.value, (newVal) => {
  localStorage.setItem('flowerAnimateSpeed', newVal);
});

/** ------------------------ 数据获取 ------------------------ */
const mainStore = useMainStore()
const route = useRoute()
watch(() => route.path, () => {
  fetchData()
})
async function fetchData() {
  await mainStore.fetchNavData()
}
onMounted(() => {
  fetchData() // 页面加载时获取数据
})

/** ------------------------ 启动console自动输出 ------------------------ */
// 示例化参数，避免未定义变量报错
const t = 'Blog';
const n = 'App启动';
const e = 'info';
const vn = {
  typeColor(type) {
    switch (type) {
      case 'info': return '#39C49E';
      case 'warn': return '#FFC16F';
      case 'error': return '#F76591';
      default: return '#999';
    }
  }
};
console.log(
  `%c ${t} %c ${n} %c`,
  `background:${vn.typeColor(e)};border:1px solid ${vn.typeColor(e)};padding: 1px; border-radius: 4px 0 0 4px; color: #fff;`,
  `border:1px solid ${vn.typeColor(e)};padding: 1px; border-radius: 0 4px 4px 0; color: ${vn.typeColor(e)};`,
  "background:transparent"
);
const showRippleToggle = computed(() => {
  const hiddenRoutes = ['/', '/home', '/index', '/userInfo'] // 根据你的实际路由配置调整
  return !hiddenRoutes.includes(route.path)
})
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
  user-select: none;
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
}

// 鼠标点击动画
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

//花瓣动画控制面板
.flowersControl {
  position: fixed;
  right: 5vw;
  bottom: 0;
  transform: translateY(100%); // 隐藏时向下移动自身高度
  opacity: 0; // 隐藏时透明
  border-radius: 8px;
  padding: 0 1rem;
  box-shadow: $shadow-card;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  min-width: 220px;
  min-height: 150px;
  @include flexCenter(row, center);
  gap: 1rem;
  font-size: 0.8rem;
  background-color: #fff;
  font-family: 'gtpy';
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out; // 修改过渡属性
  z-index: 998;

  .button-group,
  .slider-group {
    height: 100%;
    text-align: center;
    padding: 0 0.4rem;
  }

  .button-group {
    @include flexCenter(column, space-between);
    padding: 0;
    gap: 0.8rem;

    //暂停、开始、重置
    .control-btn {
      display: block;
      width: 50px;
      height: 50px;
      border: 1px solid #63cdeb;
      border-radius: 0.4rem;
      background-position: center;
      overflow: hidden;
      transition: background 0.3s ease;

      &:hover {
        background-color: #cbeee8;
      }

      img {
        width: 100%;
        transition: all 0.5 ease;
      }
    }
  }

  .slider-flex {
    @include flexCenter(column, flex-start);
    gap: 0.8rem;

    //数量、速度调节
    .slider-group {
      @include flexCenter(row, flex-start);
      border: 1px solid #63cdeb;
      border-radius: 0.4rem;
      gap: 0.2rem;
      background-image: url('@/assets/img/public/bg-set3-B44-On71.jpg');
      background-position: center;
      background-size: cover;
      width: 220px;
      height: 50px;

      .slider {}
    }
  }

}

//显示控制面板
.showFlowersControl {
  transform: translateY(-2vw); // 显示时不再移动
  opacity: 1;
}
</style>
