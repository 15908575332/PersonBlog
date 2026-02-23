<template>
  <div>
    <div class="pagesOption" ref="pagesOption" @click="handlePageClick" :class="currentTheme">
      <!-- 渐变背景色增加过渡动画 -->
      <template v-if="finalShouldShowGlobalBg">
        <div class="background-container">
          <div class="gradient-bg light-bg" :class="{ active: currentTheme === 'light' }"
            :style="{ backgroundImage: currentLightBg }"></div>
          <div class="gradient-bg dark-bg" :class="{ active: currentTheme === 'dark' }"></div>
        </div>
      </template>
      <ClickRipple></ClickRipple>
      <flowerAnimate :is-animating="isAnimating" :sakura-count="sakuraCount" :speed="speed" />
      <router-view></router-view>
    </div>
    <div class="floot_right" v-if="showRippleToggle">
      <!-- 花瓣动画设置 -->
      <div class="ripple__toggle flowerBtn" @click="toggleControlPanel">
        <span class="icon-open" :class="{ active: showControlPanel }">🌸</span>
        <span class="icon-close" :class="{ active: !showControlPanel }">💮</span>
      </div>

      <!-- 鼠标左键特效切换 -->
      <div class="ripple__toggle" @click="rippleStore.toggle">
        <span class="icon-open" :class="{ active: rippleStore.enabled }">🍃</span>
        <span class="icon-close" :class="{ active: !rippleStore.enabled }">🍂</span>
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
    <!-- 控制面板 -->
    <div class="controls" :class="{ 'showFlowersControl': showControlPanel }" ref="controls">
      <div class="flower">
        <div class="slider-flex">
          <!-- 播放/暂停按钮 - 沙漏计时器 -->
          <div class="timekeeper-control" @click="toggleAnimation" :title="isAnimating ? '暂停动画' : '播放动画'">
            <div class="timekeeper-container" :class="{ 'paused': !isAnimating }">
              <!-- 沙漏上半部分 -->
              <div class="hourglass-top">
                <div class="sand-particles">
                  <div v-for="i in 8" :key="i" class="sand-particle" :style="`--delay: ${i * 0.1}s`"></div>
                </div>
              </div>
              <!-- 沙漏中间连接处 -->
              <div class="hourglass-neck"></div>
              <!-- 沙漏下半部分 -->
              <div class="hourglass-bottom">
                <div class="sand-accumulation" :style="{ height: isAnimating ? '60%' : '0%' }"></div>
              </div>
            </div>
            <div class="timekeeper-state-indicator">{{ isAnimating ? 'Ⅱ' : '▶' }}</div>
          </div>

          <!-- 重置按钮 - 回旋镖循环 -->
          <div class="boomerang-control" @click="resetAnimation" title="重置动画设置">
            <div class="boomerang-container">
              <div class="boomerang-arc outer"></div>
              <div class="boomerang-arc middle"></div>
              <div class="boomerang-arc inner"></div>
              <div class="boomerang-arrow"></div>
            </div>
            <div class="boomerang-state-indicator">↺</div>
          </div>
        </div>
        <div class="slider-flex">
          <!-- 数量 -->
          <div class="blossom-control" @click="increaseSignalLevel"
            :title="`Sakura Amount: ${currentLevel}/${maxLevel}`">
            <div class="blossom-container">
              <!-- 堆叠的花瓣层，数量对应 currentLevel -->
              <div class="blossom-layer" v-for="i in maxLevel" :key="i"
                :class="{ 'active': i <= currentLevel, 'layer-1': i === 1, 'layer-2': i === 2, 'layer-3': i === 3, 'layer-4': i === 4, 'layer-5': i === 5 }">
              </div>
            </div>
            <div class="blossom-level-indicator">{{ currentLevel }}</div>
          </div>
          <!-- 速度 -->
          <div class="fan-control" @click="increaseSpeedLevel" :title="`Speed: ${currentSpeedLevel}/${maxSpeedLevel}`">
            <div class="fan-container" :style="{ animationDuration: fanAnimationDuration }">
              <div class="fan-blade" v-for="n in 3" :key="n" :class="`blade-${n}`"></div>
              <div class="fan-center"></div>
            </div>
            <div class="fan-level-indicator">{{ currentSpeedLevel }}</div>
          </div>
        </div>
      </div>

      <!-- 主题 -->
      <div class="theme">
        <button class="toggle" :aria-pressed="isPressd" @click="toggleTheme" title="切换昼夜模式">
          <span class="toggle__content">
            <!-- 白天云层 -->
            <svg aria-hidden="true" class="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 290 228">
              <g class="clouds">
                <path fill="#D9D9D9"
                  d="M335 147.5c0 27.89-22.61 50.5-50.5 50.5a50.78 50.78 0 0 1-9.29-.853c-2.478 12.606-10.595 23.188-21.615 29.011C245.699 243.749 228.03 256 207.5 256a50.433 50.433 0 0 1-16.034-2.599A41.811 41.811 0 0 1 166 262a41.798 41.798 0 0 1-22.893-6.782A42.21 42.21 0 0 1 135 256a41.82 41.82 0 0 1-19.115-4.592A41.84 41.84 0 0 1 88 262c-1.827 0-3.626-.117-5.391-.343C74.911 270.448 63.604 276 51 276c-23.196 0-42-18.804-42-42s18.804-42 42-42c1.827 0 3.626.117 5.391.343C64.089 183.552 75.396 178 88 178a41.819 41.819 0 0 1 19.115 4.592C114.532 176.002 124.298 172 135 172a41.798 41.798 0 0 1 22.893 6.782 42.066 42.066 0 0 1 7.239-.773C174.137 164.159 189.749 155 207.5 155c.601 0 1.199.01 1.794.031A41.813 41.813 0 0 1 234 147h.002c.269-27.66 22.774-50 50.498-50 27.89 0 50.5 22.61 50.5 50.5Z" />
              </g>
            </svg>

            <!-- 白天模式：飞行小熊 -->
            <span aria-hidden="true" class="pilot__container">
              <span class="pilot-bear">
                <img src="https://assets.codepen.io/605876/pilot-bear.svg" alt="飞行小熊" class="pilot" />
              </span>
            </span>

            <!-- 夜晚云层 -->
            <svg aria-hidden="true" class="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 290 228">
              <g class="clouds">
                <path fill="#fff"
                  d="M328 167.5c0 15.214-7.994 28.56-20.01 36.068.007.31.01.621.01.932 0 23.472-19.028 42.5-42.5 42.5-3.789 0-7.461-.496-10.957-1.426C249.671 263.676 233.141 277 213.5 277a42.77 42.77 0 0 1-7.702-.696C198.089 284.141 187.362 289 175.5 289a42.338 42.338 0 0 1-27.864-10.408A42.411 42.411 0 0 1 133.5 281c-4.36 0-8.566-.656-12.526-1.876C113.252 287.066 102.452 292 90.5 292a42.388 42.388 0 0 1-15.8-3.034A42.316 42.316 0 0 1 48.5 298C25.028 298 6 278.972 6 255.5S25.028 213 48.5 213a42.388 42.388 0 0 1 15.8 3.034A42.316 42.316 0 0 1 90.5 207c4.36 0 8.566.656 12.526 1.876C110.748 200.934 121.548 196 133.5 196a42.338 42.338 0 0 1 27.864 10.408A42.411 42.411 0 0 1 175.5 204c2.63 0 5.204.239 7.702.696C190.911 196.859 201.638 192 213.5 192c3.789 0 7.461.496 10.957 1.426 2.824-10.491 9.562-19.377 18.553-24.994-.007-.31-.01-.621-.01-.932 0-23.472 19.028-42.5 42.5-42.5s42.5 19.028 42.5 42.5Z" />
              </g>
            </svg>

            <!-- 切换指示器（太阳/月亮） -->
            <span class="toggle__indicator-wrapper">
              <span class="toggle__indicator">
                <span class="toggle__star">
                  <span class="sun">
                    <span class="moon">
                      <span class="moon__crater"></span>
                      <span class="moon__crater"></span>
                      <span class="moon__crater"></span>
                    </span>
                  </span>
                </span>
              </span>
            </span>

            <!-- 星星背景 -->
            <svg aria-hidden=true class="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 290 228">
              <g>
                <g class="stars">
                  <g>
                    <path fill="#fff" fill-rule="evenodd"
                      d="M61 11.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.749 3.749 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.749 3.749 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.749 3.749 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 61 11.5Z"
                      clip-rule="evenodd" />
                  </g>
                  <g>
                    <path fill="#fff" fill-rule="evenodd"
                      d="M62.5 45.219a.329.329 0 0 1 .315.238l.356 1.245a1.641 1.641 0 0 0 1.127 1.127l1.245.356a.328.328 0 0 1 0 .63l-1.245.356a1.641 1.641 0 0 0-1.127 1.127l-.356 1.245a.328.328 0 0 1-.63 0l-.356-1.245a1.641 1.641 0 0 0-1.127-1.127l-1.245-.356a.328.328 0 0 1 0-.63l1.245-.356a1.641 1.641 0 0 0 1.127-1.127l.356-1.245a.328.328 0 0 1 .315-.238Z"
                      clip-rule="evenodd" />
                  </g>
                  <g>
                    <path fill="#fff" fill-rule="evenodd"
                      d="M32 31.188a.28.28 0 0 1 .27.204l.305 1.067a1.405 1.405 0 0 0 .966.966l1.068.305a.28.28 0 0 1 0 .54l-1.068.305a1.405 1.405 0 0 0-.966.966l-.305 1.068a.28.28 0 0 1-.54 0l-.305-1.068a1.406 1.406 0 0 0-.966-.966l-1.067-.305a.28.28 0 0 1 0-.54l1.067-.305a1.406 1.406 0 0 0 .966-.966l.305-1.068a.281.281 0 0 1 .27-.203Z"
                      clip-rule="evenodd" />
                  </g>
                  <g>
                    <path fill="#fff" fill-rule="evenodd"
                      d="M41.5 74.219a.329.329 0 0 1 .315.238l.356 1.245a1.641 1.641 0 0 0 1.127 1.127l1.245.356a.328.328 0 0 1 0 .63l-1.245.356a1.641 1.641 0 0 0-1.127 1.127l-.356 1.245a.328.328 0 0 1-.63 0l-.356-1.245a1.641 1.641 0 0 0-1.127-1.127l-1.245-.356a.328.328 0 0 1 0-.63l1.245-.356a1.641 1.641 0 0 0 1.127-1.127l.356-1.245a.328.328 0 0 1 .315-.238Z"
                      clip-rule="evenodd" />
                  </g>
                  <g>
                    <path fill="#fff" fill-rule="evenodd"
                      d="M34 83.188a.28.28 0 0 1 .27.203l.305 1.068a1.405 1.405 0 0 0 .966.966l1.068.305a.28.28 0 0 1 0 .54l-1.068.305a1.405 1.405 0 0 0-.966.966l-.305 1.068a.28.28 0 0 1-.54 0l-.305-1.068a1.406 1.406 0 0 0-.966-.966l-1.068-.305a.28.28 0 0 1 0-.54l1.068-.305a1.406 1.406 0 0 0 .966-.966l.305-1.068a.281.281 0 0 1 .27-.204Z"
                      clip-rule="evenodd" />
                  </g>
                  <g>
                    <path fill="#fff" fill-rule="evenodd"
                      d="M63 89.25a.375.375 0 0 1 .36.272l.407 1.423a1.874 1.874 0 0 0 1.288 1.288l1.423.406a.374.374 0 0 1 0 .722l-1.423.406a1.874 1.874 0 0 0-1.288 1.288l-.407 1.423a.374.374 0 0 1-.72 0l-.407-1.423a1.874 1.874 0 0 0-1.288-1.288l-1.423-.406a.374.374 0 0 1 0-.722l1.423-.406a1.874 1.874 0 0 0 1.288-1.288l.407-1.423a.376.376 0 0 1 .36-.272Z"
                      clip-rule="evenodd" />
                  </g>
                  <g>
                    <path fill="#fff" fill-rule="evenodd"
                      d="M110.5 53.156a.236.236 0 0 1 .225.17l.254.89a1.174 1.174 0 0 0 .805.805l.89.254a.23.23 0 0 1 .122.084.233.233 0 0 1-.122.366l-.89.254a1.167 1.167 0 0 0-.805.805l-.254.89a.232.232 0 0 1-.225.17.235.235 0 0 1-.225-.17l-.254-.89a1.174 1.174 0 0 0-.805-.805l-.89-.254a.23.23 0 0 1-.122-.084.233.233 0 0 1 .122-.366l.89-.254a1.167 1.167 0 0 0 .805-.805l.254-.89a.232.232 0 0 1 .225-.17Z"
                      clip-rule="evenodd" />
                  </g>
                  <g>
                    <path fill="#fff" fill-rule="evenodd"
                      d="M120 27.188a.279.279 0 0 1 .27.204l.305 1.067a1.41 1.41 0 0 0 .966.966l1.067.305a.283.283 0 0 1 .148.1.286.286 0 0 1 0 .34.283.283 0 0 1-.148.1l-1.067.305a1.403 1.403 0 0 0-.966.966l-.305 1.067a.279.279 0 0 1-.439.147.275.275 0 0 1-.101-.147l-.305-1.067a1.41 1.41 0 0 0-.966-.966l-1.068-.305a.284.284 0 0 1-.147-.1.286.286 0 0 1 0-.34.284.284 0 0 1 .147-.1l1.068-.305a1.405 1.405 0 0 0 .966-.966l.305-1.067a.279.279 0 0 1 .27-.204Z"
                      clip-rule="evenodd" />
                  </g>
                  <g>
                    <path fill="#fff" fill-rule="evenodd"
                      d="M155 28.5a.753.753 0 0 1 .721.544l.813 2.846a3.746 3.746 0 0 0 2.576 2.576l2.846.813a.747.747 0 0 1 .543.721.75.75 0 0 1-.543.721l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.747.747 0 0 1-.721.543.749.749 0 0 1-.721-.543l-.813-2.846a3.746 3.746 0 0 0-2.576-2.576l-2.846-.813a.747.747 0 0 1-.543-.721.75.75 0 0 1 .543-.721l2.846-.813a3.75 3.75 0 0 0 2.576-2.576l.813-2.846A.751.751 0 0 1 155 28.5Z"
                      clip-rule="evenodd" />
                  </g>
                  <g>
                    <path fill="#fff" fill-rule="evenodd"
                      d="M147 60.25a.377.377 0 0 1 .36.272l.407 1.423a1.883 1.883 0 0 0 1.288 1.288l1.423.407a.375.375 0 0 1 0 .72l-1.423.407a1.875 1.875 0 0 0-1.288 1.288l-.407 1.423a.371.371 0 0 1-.36.272.377.377 0 0 1-.36-.272l-.407-1.423a1.883 1.883 0 0 0-1.288-1.288l-1.423-.406a.375.375 0 0 1 0-.722l1.423-.406a1.875 1.875 0 0 0 1.288-1.288l.407-1.423a.372.372 0 0 1 .36-.272Z"
                      clip-rule="evenodd" />
                  </g>
                  <g>
                    <path fill="#fff" fill-rule="evenodd"
                      d="M125.5 76.344a.513.513 0 0 1 .496.374l.559 1.956a2.574 2.574 0 0 0 1.771 1.771l1.956.56a.514.514 0 0 1 .27.805.514.514 0 0 1-.27.186l-1.956.559a2.57 2.57 0 0 0-1.771 1.77l-.559 1.957a.514.514 0 0 1-.806.27.514.514 0 0 1-.186-.27l-.559-1.956a2.574 2.574 0 0 0-1.771-1.771l-1.956-.56a.514.514 0 0 1-.27-.805.514.514 0 0 1 .27-.186l1.956-.559a2.57 2.57 0 0 0 1.771-1.77l.559-1.957a.515.515 0 0 1 .496-.374Z"
                      clip-rule="evenodd" />
                  </g>
                </g>
              </g>
            </svg>

            <!-- 夜晚模式：太空熊 -->
            <span class="astrobear__container">
              <span class="astrobear">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 316 432">
                  <!-- 太空熊SVG路径（原文档内容） -->
                  <circle cx="158" cy="143" r="140" fill="#444" />
                  <path fill="#AF7128" fill-rule="evenodd"
                    d="M65.98 159.61C49.913 155.643 38 141.134 38 123.842 38 103.495 54.495 87 74.842 87c14.337 0 26.761 8.19 32.85 20.146C119.687 100.674 133.414 97 148 97h20c14.52 0 28.19 3.641 40.146 10.059C214.251 95.15 226.65 87 240.952 87c20.347 0 36.842 16.495 36.842 36.842 0 17.222-11.818 31.685-27.787 35.72A85.104 85.104 0 0 1 253 182v66.56l10.054-10.054c11.325-11.325 29.687-11.325 41.012 0s11.325 29.687 0 41.012l-44.548 44.548a29.004 29.004 0 0 1-6.518 4.906V407c0 12.15-9.85 22-22 22h-44c-12.15 0-22-9.85-22-22v-28.69a41.072 41.072 0 0 1-14 .174V407c0 12.15-9.85 22-22 22H85c-12.15 0-22-9.85-22-22v-77.797a28.99 28.99 0 0 1-6.946-5.137l-44.548-44.548c-11.325-11.325-11.325-29.687 0-41.012 11.326-11.325 29.687-11.325 41.013 0L63 248.988V182a85.106 85.106 0 0 1 2.98-22.39Z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </span>
          </span>
        </button>
        <div class="otherControl">
          <!-- 字体切换按钮 - 活字印刷印章 -->
          <div class="font-control" @click="toggleFontFamily" :title="`字体: ${currentFontName}`">
            <div class="type-block">
              <span class="type-char" :style="{ fontFamily: currentFontValue }">A</span>
            </div>
            <div class="font-state-indicator">{{ currentIndex + 1 }}/{{ fontConfig.length }}</div>
          </div>

          <!-- 背景图切换按钮 - 迷你画廊 -->
          <div class="gallery-control" @click="toggleBackground" :title="`背景: ${currentBgName}`">
            <div class="gallery-container">
              <div class="gallery-window" v-for="(bg, index) in backgroundPreviews" :key="index"
                :class="{ 'active': index === currentBgIndex }">
                <div class="window-content" :style="{ background: bg.color }"></div>
              </div>
            </div>
            <div class="gallery-state-indicator">{{ currentBgIndex + 1 }}/{{ backgroundPreviews.length }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref } from 'vue'

import ClickRipple from "./components/common/ClickRipple.vue";
import { rippleStore } from "@/store/isEnabledRipple";
import flowerAnimate from "./components/common/FlowerAnimate.vue"
import utils from "@/utils/getAssetsFile";
import { useRoute } from 'vue-router'
import { useMainStore } from '@/store/maincontent'

/** ------------------------ 主题 ------------------------ */
import { initTheme, setTheme, watchSystemTheme } from '@/utils/theme';

const currentTheme = ref(localStorage.getItem('app-theme') || 'light');
const isPressd = computed(() => currentTheme.value === 'dark');

const toggleTheme = () => {
  const newTheme = currentTheme.value === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  currentTheme.value = newTheme; // 确保状态更新
};

window.toggleTheme = toggleTheme;

const noGlobalBgPrefixes = [ // 路由及其所有子路由都会显示全局背景
  '/treasureBox',
  '/recordList',
  '/contactUs',
];

// 计算是否显示全局背景
const shouldShowGlobalBg = computed(() => {
  // 检查当前路由是否以排除前缀开头
  return noGlobalBgPrefixes.some(prefix =>
    route.path === prefix || route.path.startsWith(prefix + '/')
  );
});

// 添加特殊路由的精确匹配不要展示背景的
const specialNoGlobalBgPaths = [
  '/treasureBox/favorites'
];

// 最终计算属性
const finalShouldShowGlobalBg = computed(() => {
  // 先检查特殊路由
  if (specialNoGlobalBgPaths.includes(route.path)) {
    return false;
  }

  // 再检查前缀匹配
  return shouldShowGlobalBg.value;
})

/** ------------------------ 字体切换 ------------------------ */
// 定义字体配置，与 SCSS 中的 $font-families 映射保持同步
const fontConfig = [
  { id: 'default', name: '星星体' },
  { id: 'mmt', name: '喵喵体' },
  { id: 'xxmt', name: '小熊猫体' },
  { id: 'kaiti', name: '楷体' },
];

// 状态：当前选中的字体 ID
const currentFontId = ref(localStorage.getItem('app-font-id') || 'default');

// 计算属性：当前字体的完整 CSS 值（用于直接赋值给 style）
const currentFontValue = computed(() => {
  const config = fontConfig.find(f => f.id === currentFontId.value);
  if (!config) return 'sans-serif';

  // 此处的映射逻辑应严格对应 SCSS 中 $font-families 的定义
  const valueMap = {
    'default': '"lmst"',
    'mmt': '"mmt"',
    'xxmt': '"xxmt"',
    'kaiti': '"楷体", "KaiTi", serif',
  };
  return valueMap[config.id] || 'sans-serif';
});

// 计算属性：当前显示的名称
const currentFontName = computed(() => {
  const config = fontConfig.find(f => f.id === currentFontId.value);
  return config ? config.name : '未知';
});

const currentIndex = computed(() => {
  return fontConfig.findIndex(f => f.id === currentFontId.value);
});

// 字体切换函数
const toggleFontFamily = () => {
  const currentIndex = fontConfig.findIndex(f => f.id === currentFontId.value);
  const nextIndex = (currentIndex + 1) % fontConfig.length;
  const nextFontId = fontConfig[nextIndex].id;

  // 更新状态
  currentFontId.value = nextFontId;
  localStorage.setItem('app-font-id', nextFontId);

  // 将选中的字体族名称赋值给根元素的 CSS 变量
  document.documentElement.style.setProperty('--app-font-family', currentFontValue.value);

  // （可选）预加载自定义字体文件
  if (['lmst', 'gtpy'].includes(nextFontId)) {
    preloadFont(nextFontId);
  }
};

// （可选）字体预加载函数
function preloadFont(fontId) {
  // 此映射需要与 SCSS 中的 $font-assets 或实际路径保持一致
  const fontPathMap = {
    'lmst': new URL('@/assets/fonts/langmanstar.ttf', import.meta.url).href,
    'gtpy': new URL('@/assets/fonts/getype.ttf', import.meta.url).href,
  };
  const path = fontPathMap[fontId];
  if (path && !document.querySelector(`link[href="${path}"]`)) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = path;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
}

/** ------------------------ 背景切换 ------------------------ */
const backgroundPreviews = [
  {
    name: '薄荷晴空',
    color: 'radial-gradient(circle,#F3E7E9 0%,#E3EEFF 100%)'
  },
  {
    name: '柔樱初绽',
    color: 'linear-gradient(120deg,#E0C3FC 0%,#8EC5FC 100%)'
  },
  {
    name: '淡雅晨光',
    color: 'linear-gradient(90deg,#FFF1EB 0%,#ACE0F9 100%)'
  },
  {
    name: '清新海风',
    color: 'conic-gradient(from 90deg,#EE82EE 0%,#00D1FF 100%)'
  }
];

const currentBgIndex = ref(Number(localStorage.getItem('app-bg-index')) || 0);
const currentBgName = computed(() => backgroundPreviews[currentBgIndex.value].name);
const currentLightBg = computed(() => backgroundPreviews[currentBgIndex.value].color); //当前背景色

const toggleBackground = () => {
  currentBgIndex.value = (currentBgIndex.value + 1) % backgroundPreviews.length;
  localStorage.setItem('app-bg-index', currentBgIndex.value);
};

/** ------------------------ 全局花瓣飘落动画 ------------------------ */
const showControlPanel = ref(false)
const controls = ref();
const speed = ref(Number(localStorage.getItem('flowerAnimateSpeed')) || 1);
const sakuraCount = ref(Number(localStorage.getItem('flowerAnimateSakuraCount')) || 10);
const toggleControlPanel = () => {
  showControlPanel.value = !showControlPanel.value
}
const isAnimating = ref(true);
const handlePageClick = (event) => {
  if (!showControlPanel.value) return; // 如果面板未显示，直接返回
  if (controls.value && !controls.value.contains(event.target)) {
    showControlPanel.value = false; // 点击面板外部时隐藏面板
  }
};

const toggleAnimation = () => { // 花瓣动画暂停/播放
  isAnimating.value = !isAnimating.value;
};
// 重置按钮点击动画状态
const isResetting = ref(false);

// 修改原有的resetAnimation函数
const resetAnimation = () => {
  isResetting.value = true;

  // 执行重置逻辑
  localStorage.removeItem('flowerAnimateSakuraCount', 'flowerAnimateSpeed');
  isAnimating.value = true;
  sakuraCount.value = 10;
  currentLevel.value = 1;
  speed.value = 1;
  currentSpeedLevel.value = 1; // 如果之前添加了速度控制

  // 重置动画完成后恢复状态
  setTimeout(() => {
    isResetting.value = false;
  }, 600);
};

// 数量调节
const maxLevel = ref(5);
const currentLevel = ref(1);
function increaseSignalLevel() {
  currentLevel.value++;
  if (currentLevel.value > maxLevel.value) {
    currentLevel.value = maxLevel.value;
    return;
  }
  currentLevel.value = currentLevel.value % (maxLevel.value + 1);
  sakuraCount.value = currentLevel.value * 10;
}

// 速度调节
const maxSpeedLevel = ref(5); // 最大速度级别
const currentSpeedLevel = ref(Number(localStorage.getItem('flowerAnimateSpeed')) || 1); // 当前速度级别，持久化

// 计算属性：将速度级别映射为风扇CSS动画的持续时间（值越小转得越快）
const fanAnimationDuration = computed(() => {
  // 级别1最慢（3秒一转），级别5最快（0.3秒一转）
  const durations = ['3s', '1.5s', '1s', '0.6s', '0.3s'];
  return durations[currentSpeedLevel.value - 1] || '1s';
});

// 速度调节函数
function increaseSpeedLevel() {
  currentSpeedLevel.value = (currentSpeedLevel.value % maxSpeedLevel.value) + 1;
  speed.value = currentSpeedLevel.value; // 更新实际的花瓣速度值
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
  // 初始化默认
  document.documentElement.style.setProperty('--app-font-family', currentFontValue.value);

  fetchData() // 页面加载时获取数据
  // 主题切换
  currentTheme.value = initTheme();
  watchSystemTheme();
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
.pagesOption {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  //  渐变背景色增加过渡动画
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    transition: opacity $theme-transition-duration $theme-transition-timing;
  }

  .gradient-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity $theme-transition-duration $theme-transition-timing;
  }

  .light-bg {
    background: linear-gradient(80deg,
        #cef2fa 0%,
        8.44482%,
        rgb(209, 240, 236) 16.8896%,
        38.8796%,
        rgb(250, 239, 243) 60.8696%,
        80.4348%,
        #fbf3ef 100%);

    /* 激活状态 */
    &.active {
      opacity: 1;
    }
  }

  .dark-bg {
    background: linear-gradient(to left, #0f172a 0%, #1e293b 50%, #334155 100%);
    opacity: 0;

    &.active {
      opacity: 1;
    }

    &:not(.active) {
      opacity: 0;
    }
  }
}

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
  position: relative;

  .icon-open,
  .icon-close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    pointer-events: none;

    &.active {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  .icon-open:not(.active) {
    transform: translate(-50%, -50%) scale(0.8) rotateY(-90deg);
  }

  .icon-close:not(.active) {
    transform: translate(-50%, -50%) scale(0.8) rotateY(90deg);
  }

  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
}

.secBtn {
  border-top: 1px solid #f0f0f0;

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
}

//全局控制面板
.controls {
  position: fixed;
  right: 6vw;
  bottom: 0;
  transform: translateY(100%); // 隐藏时向下移动自身高度
  opacity: 0; // 隐藏时透明
  border-radius: 8px;
  min-width: 220px;
  min-height: 140px;
  @include flexCenter(row, flex-start);
  gap: 1rem;
  font-size: 0.8rem;
  font-family: var(--app-font-family);
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out; // 修改过渡属性
  z-index: 998;

  .flower {
    @include flexCenter(row, space-around);
    background-color: #f8b1c4;
    border: 2px solid #fff;
    gap: 0.8rem;
    padding: 0.8rem;
    border-radius: 0.2rem;
  }

  .slider-flex {
    @include flexCenter(column, flex-start);
    padding: 0.2rem;
    gap: 0.8rem;

    // 沙漏计时器 - 播放/暂停控制器
    .timekeeper-control {
      width: 45px;
      height: 45px;
      position: relative;
      border-radius: 0.5rem;
      box-shadow: $insideShadow;
      @include flexCenter(row, center);
      cursor: pointer;
      background-color: #fff9f0; // 沙漏的沙色背景

      &:hover {
        background-color: #fff3e0;
      }

      .timekeeper-container {
        width: 60%;
        height: 70%;
        position: relative;

        // 沙漏上半部分玻璃腔体 - 改为倒梯形
        .hourglass-top {
          position: absolute;
          top: 0;
          left: 15%; // 左偏移更多，形成上宽下窄
          width: 70%; // 总宽度增加
          height: 40%;
          background: linear-gradient(145deg, rgba(255, 216, 166, 0.9), rgba(255, 194, 133, 0.9)); // 增加透明度模拟玻璃
          border-radius: 50% 50% 10% 10%; // 顶部圆，底部平
          overflow: hidden;
          box-shadow:
            inset 0 -3px 5px rgba(0, 0, 0, 0.15), // 内部凹陷阴影
            inset 0 2px 4px rgba(255, 255, 255, 0.7); // 内部高光
          // 使用clip-path创建更精确的梯形
          clip-path: polygon(20% 0%, 80% 0%, 60% 100%, 40% 100%);
          z-index: 2;

          .sand-particles {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // 沙粒从中心点散开
            transform-origin: 50% 100%;

            .sand-particle {
              position: absolute;
              width: 3px;
              height: 3px;
              background: #fff;
              border-radius: 50%;
              bottom: 15%; // 从更下方开始
              left: calc(50% - 1.5px);
              opacity: 0;
              animation: sandFall 2s infinite linear var(--delay);
              // 添加轻微的水平随机偏移
              transform: translateX(calc((var(--delay) - 0.5) * 4px));
            }
          }
        }

        // 沙漏中间细颈 - 变得更细更精致
        .hourglass-neck {
          position: absolute;
          top: 40%;
          left: 50%;
          width: 8%; // 变细
          height: 12%;
          background: #bcaaa4; // 更深的金属/玻璃色
          border-radius: 2px;
          transform: translateX(-50%);
          z-index: 3;
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.5),
            0 0 2px rgba(0, 0, 0, 0.2);
        }

        // 沙漏下半部分玻璃腔体 - 改为正梯形
        .hourglass-bottom {
          position: absolute;
          bottom: 0;
          left: 15%;
          width: 70%;
          height: 40%;
          background: linear-gradient(145deg, rgba(255, 216, 166, 0.9), rgba(255, 194, 133, 0.9));
          border-radius: 10% 10% 50% 50%; // 顶部平，底部圆
          overflow: hidden;
          box-shadow:
            inset 0 3px 5px rgba(0, 0, 0, 0.15),
            inset 0 -2px 4px rgba(255, 255, 255, 0.7);
          // 使用clip-path创建更精确的梯形
          clip-path: polygon(40% 0%, 60% 0%, 80% 100%, 20% 100%);
          z-index: 2;

          .sand-accumulation {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(to top, #fff6a3 0%, #ffcc80 60%, #ffb74d 100%); // 沙堆锥形渐变
            border-radius: 50% 50% 0 0;
            transition: height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

            // 使沙堆顶部形成凹陷中心点
            &::after {
              content: '';
              position: absolute;
              top: 0;
              left: 50%;
              width: 30%;
              height: 20%;
              background: #ffb74d;
              border-radius: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }

        // 暂停状态：停止沙粒下落，保持沙堆状态
        &.paused {
          .sand-particle {
            animation-play-state: paused;
            opacity: 0.3; // 暂停时沙粒半透明
          }

          .sand-accumulation {
            transition: height 0.3s ease;
          }
        }
      }

      .timekeeper-state-indicator {
        position: absolute;
        bottom: 3px;
        right: 3px;
        font-size: 0.6rem;
        font-weight: bold;
        color: #e65100;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        width: 14px;
        height: 14px;
        @include flexCenter(row, center);
      }

      @keyframes sandFall {
        0% {
          transform: translateY(0) scale(0.8);
          opacity: 0;
        }

        10% {
          opacity: 0.9;
          transform: translateY(-5%) scale(1);
        }

        90% {
          opacity: 0.9;
        }

        100% {
          transform: translateY(250%) scale(0.8); // 落得更远
          opacity: 0;
        }
      }
    }

    // 回旋镖循环 - 重置控制器
    .boomerang-control {
      width: 45px;
      height: 45px;
      position: relative;
      border-radius: 0.5rem;
      box-shadow: $insideShadow;
      @include flexCenter(row, center);
      cursor: pointer;
      background-color: #f0f4ff; // 淡蓝色背景

      &:hover {
        background-color: #e1e8ff;
      }

      .boomerang-container {
        width: 70%;
        height: 70%;
        position: relative;

        // 三层回旋镖弧线
        .boomerang-arc {
          position: absolute;
          border: 2px solid transparent;
          border-radius: 50%;
          border-top-color: #5d7af5;
          border-right-color: transparent;
          border-bottom-color: transparent;
          border-left-color: transparent;

          &.outer {
            width: 100%;
            height: 100%;
            animation: rotateArc 4s linear infinite;
          }

          &.middle {
            width: 70%;
            height: 70%;
            top: 15%;
            left: 15%;
            border-top-color: #8a9eff;
            animation: rotateArc 3s linear infinite reverse;
          }

          &.inner {
            width: 40%;
            height: 40%;
            top: 30%;
            left: 30%;
            border-top-color: #b3bfff;
            animation: rotateArc 2s linear infinite;
          }
        }

        // 箭头指示器
        .boomerang-arrow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20%;
          height: 20%;
          transform: translate(-50%, -50%);

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #5d7af5;
            clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
          }
        }

        // 重置时的加强动画
        .boomerang-resetting {
          .boomerang-arc {
            animation-duration: 0.6s !important;
          }
        }
      }

      .boomerang-state-indicator {
        position: absolute;
        bottom: 3px;
        right: 3px;
        font-size: 0.6rem;
        font-weight: bold;
        color: #5d7af5;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        width: 14px;
        height: 14px;
        @include flexCenter(row, center);
      }

      // 点击时的旋转动画
      &:active {
        .boomerang-arc {
          animation-duration: 0.3s !important;
        }
      }

      @keyframes rotateArc {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    }

    // 樱花堆叠数量控制器
    .blossom-control {
      width: 45px;
      height: 45px;
      position: relative;
      border-radius: 0.5rem;
      box-shadow: $insideShadow;
      @include flexCenter(row, center);
      cursor: pointer;
      background-color: #fff5f7; // 淡粉色背景，与樱花主题呼应

      &:hover {
        background-color: #ffeef2;
      }

      .blossom-container {
        width: 70%;
        height: 70%;
        position: relative;
        // 容器用于定位堆叠层

        .blossom-layer {
          position: absolute;
          border-radius: 50% 50% 40% 40%; // 花瓣状的弧形底部
          opacity: 0.3;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55); // 弹性过渡

          // 非激活状态的默认样式
          background-color: #e0e0e0;
          box-shadow: none;

          // 激活状态：填充樱花色并添加内阴影
          &.active {
            opacity: 1;
            background: linear-gradient(to bottom, #ffb7d5, #ff7eb3); // 樱花粉渐变
            box-shadow:
              inset 0 2px 4px rgba(255, 255, 255, 0.8),
              inset 0 -1px 2px rgba(188, 80, 120, 0.4);
          }

          // 定义五个堆叠层的位置和大小（从下往上，从小到大）
          &.layer-1 {
            bottom: 0%;
            left: 20%;
            width: 60%;
            height: 20%;
            z-index: 1;
          }

          &.layer-2 {
            bottom: 15%;
            left: 15%;
            width: 70%;
            height: 22%;
            z-index: 2;
          }

          &.layer-3 {
            bottom: 30%;
            left: 10%;
            width: 80%;
            height: 24%;
            z-index: 3;
          }

          &.layer-4 {
            bottom: 45%;
            left: 5%;
            width: 90%;
            height: 26%;
            z-index: 4;
          }

          &.layer-5 {
            bottom: 60%;
            left: 0%;
            width: 100%;
            height: 28%;
            z-index: 5;
          }
        }
      }

      .blossom-level-indicator {
        position: absolute;
        bottom: 3px;
        right: 3px;
        font-size: 0.6rem;
        font-weight: bold;
        color: #d63384; // 深粉色数字
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        width: 14px;
        height: 14px;
        @include flexCenter(row, center);
      }
    }

    // 速度
    .fan-control {
      width: 45px;
      height: 45px;
      position: relative;
      border-radius: 0.5rem;
      box-shadow: $insideShadow;
      @include flexCenter(row, center);
      cursor: pointer;
      background-color: #e6f7ff; // 淡蓝色背景，暗示“风”

      &:hover {
        background-color: #d1e9ff;
      }

      .fan-container {
        width: 70%; // 调整容器大小，为中央伪元素留出空间
        height: 70%;
        position: relative;
        animation: rotateFan linear infinite;
        transform-origin: center center;

        // 使用 ::before 创建中心内圆（高光/凹陷感）
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20%; // 内圆大小
          height: 20%;
          background: #2e5984; // 深色中心
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
          z-index: 3; // 确保在叶片上方
        }

        // 使用 ::after 创建中心外圆（基座）
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 30%; // 外圆大小
          height: 30%;
          background: #4a6fa5;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 2; // 在叶片和内圆之间
        }

        // 三个风扇叶片
        .fan-blade {
          position: absolute;
          top: 70%; // 改为从中心定位
          left: 50%;
          width: 10%;
          height: 40%;
          background: linear-gradient(to bottom, #34e4db, #1970ea);
          border-radius: 20px 20px 4px 4px;
          transform-origin: center 0; // 绕顶部中心旋转，使叶片从中心“伸出”
          z-index: 1; // 在中心圆下方

          // 通过旋转定义三个叶片的位置
          &.blade-1 {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          &.blade-2 {
            transform: translate(-50%, -50%) rotate(120deg);
          }

          &.blade-3 {
            transform: translate(-50%, -50%) rotate(240deg);
          }
        }
      }

      .fan-level-indicator {
        position: absolute;
        bottom: 3px;
        right: 3px;
        font-size: 0.6rem;
        font-weight: bold;
        color: #2e5984;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        width: 14px;
        height: 14px;
        @include flexCenter(row, center);
      }

      @keyframes rotateFan {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}

//显示控制面板
.showFlowersControl {
  transform: translateY(-2vw); // 显示时不再移动
  opacity: 1;
}

// 主题容器
.theme {
  --slide-ease: cubic-bezier(.4, -0.3, .6, 1.3);
  --easing: var(--slide-ease);
  --speed: 0.5s;
  --width: clamp(90px, 106px, 200px);
  --ar: 8 / 3;
  --ray: hsl(0 0% 100% / 0.5);
  --sun: hsl(47, 91%, 58%);
  --moon: hsl(212, 13%, 82%);
  --crater: hsl(221, 16%, 68%);
  --bg: hsl(219, 30%, 88%);
  --bear-speed: 10s;
  --color: hsl(219 30% 20%);
  border-radius: 0.2rem;
  padding: 1rem;
  background-color: #f8b1c4;
  border: 2px solid $general-white;
  @include flexCenter(column, space-between);
  gap: 0.8rem;

  .toggle {
    display: block;
    -webkit-tap-highlight-color: transparent;
    width: var(--width);
    height: 45px;
    z-index: 10;
    will-change: transform;
    isolation: isolate;
    transform: translate3d(0, 0, 0);
    aspect-ratio: var(--ar);
    border-radius: 10px;
    border: 0;
    position: relative;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    transition: background var(--speed) var(--easing);
    outline-color: transparent;
    background: hsl(calc(204 + (var(--dark, 0) * 25)) calc((53 - (var(--dark, 0) * 28)) * 1%) calc((47 - (var(--dark, 0) * 31)) * 1%));
    box-shadow:
      calc(var(--width) * 0) calc(var(--width) * 0.02) calc(var(--width) * 0.01) calc(var(--width) * -0.0025) hsl(210 10% 100% / 0.95),
      calc(var(--width) * 0) calc(var(--width) * -0.02) calc(var(--width) * 0.01) calc(var(--width) * -0.0025) hsl(210 10% 10% / 0.2),
      calc(var(--width) * 0) calc(var(--width) * 0.02) calc(var(--width) * 0.5) 0 hsl(210 10% 100% / 0.15);

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      box-shadow: $insideShadow;
      border-radius: 10px;
    }

    .toggle__content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      border-radius: 10px;
      display: block;
      clip-path: inset(0 0 0 0 round 10px);

      .toggle__backdrop {
        overflow: visible !important;
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
        transition: translate var(--speed) var(--easing);
        translate: 0 calc(var(--dark, 0) * (100% - (3 / 8 * var(--width))));

        &:first-of-type .clouds path:first-of-type {
          fill: var(--ray);
        }
      }

    }
  }

  .stars {
    path {
      transform-box: fill-box;
      transform-origin: 25% 50%;
      scale: calc(0.25 + (var(--dark, 0) * 0.75));
      transition: scale var(--speed) calc(var(--speed) * 0.5) var(--easing);
    }

    g {
      transform-box: fill-box;
      transform-origin: 50% 50%;
    }

    g:nth-of-type(3) {
      animation: twinkle 4s -2s infinite;
    }

    g:nth-of-type(11) {
      animation: twinkle 6s -2s infinite;
    }

    g:nth-of-type(9) {
      animation: twinkle 4s -1s infinite;
    }

    @keyframes twinkle {

      0%,
      40%,
      60%,
      100% {
        transform: scale(1);
      }

      50% {
        transform: scale(0);
      }
    }
  }

  .toggle__indicator-wrapper {
    position: absolute;
    inset: 0;
    transition: translate var(--speed) var(--slide-ease);
    translate: calc(var(--dark, 0) * (var(--width) - (3 / 8 * var(--width)))) 0;

    .toggle__indicator {
      height: 100%;
      aspect-ratio: 1;
      border-radius: 0%;
      display: grid;
      place-items: center;
      padding: 3%;
    }

    .toggle__star {
      height: 100%;
      aspect-ratio: 1;
      border-radius: 50%;
      position: relative;
      transition: translate var(--speed) var(--easing);
      translate: calc((var(--dark, 0) * -10%) + 5%) 0;

      /* 	translate: calc((var(--dark, 0) * -18%) + 5%) 0; */
      &::before {
        content: "";
        z-index: -1;
        width: 356%;
        background:
          radial-gradient(hsl(0 0% 100% / 0.25) 40%, transparent 40.5%),
          radial-gradient(hsl(0 0% 100% / 0.25) 56%, transparent 56.5%) hsl(0 0% 100% / 0.25);
        border-radius: 50%;
        aspect-ratio: 1;
        position: absolute;
        top: 50%;
        left: 50%;
        transition: translate var(--speed) var(--easing);
        translate: calc((50 - (var(--dark, 0) * 4)) * -1%) -50%;
      }

      &::after {
        content: "";
        position: absolute;
        inset: 0;
        display: block;
        background: hsl(0 0% 0% / 0.5);
        filter: blur(4px);
        translate: 2% 4%;
        border-radius: 50%;
        z-index: -1;
      }
    }

    .sun {
      background: var(--sun);
      position: absolute;
      inset: 0;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: $insideShadow;

      .moon {
        position: absolute;
        inset: -1%;
        border-radius: 50%;
        background: var(--moon);
        transition: translate var(--speed) ease-in-out;
        translate: calc((100 - (var(--dark, 0) * 100)) * 1%) 0%;
        box-shadow:
          calc(var(--width) * 0) calc(var(--width) * -0.025) calc(var(--width) * 0.025) 0 hsl(210 10% 10% / 0.15) inset,
          calc(var(--width) * 0) calc(var(--width) * 0.025) calc(var(--width) * 0.025) 0 hsl(210 10% 10% / 0.65) inset;
      }

      .moon__crater {
        position: absolute;
        background: var(--crater);
        border-radius: 50%;
        width: calc(var(--size, 10) * 1%);
        aspect-ratio: 1;
        left: calc(var(--x) * 1%);
        top: calc(var(--y) * 1%);
        box-shadow:
          calc(var(--width) * 0.01) calc(var(--width) * 0.01) calc(var(--width) * 0.01) 0 hsl(210 10% 6% / 0.25) inset,
          0 calc(var(--width) * 0.005) calc(var(--width) * 0.01) 0 hsl(210 10% 100% / 0.25);
      }

      .moon__crater:nth-of-type(1) {
        --size: 18;
        --x: 40;
        --y: 15;
      }

      .moon__crater:nth-of-type(2) {
        --size: 20;
        --x: 65;
        --y: 58;
      }

      .moon__crater:nth-of-type(3) {
        --size: 34;
        --x: 18;
        --y: 40;
      }
    }
  }

  .astrobear__container {
    position: absolute;
    overflow: hidden;
    inset: 0;
    clip-path: inset(0 0 0 0);
    opacity: var(--dark, 0);
    translate: 0 calc(-200% + (var(--dark, 0) * 200%));
    transition: opacity var(--speed) var(--easing), translate var(--speed) var(--easing);

    .astrobear {
      width: 12%;
      position: absolute;
      top: 100%;
      left: 0%;
      transition: translate calc(var(--speed) + (var(--dark, 0) * (var(--bear-speed) - var(--speed)))) calc(var(--bear-speed) * (0.4 * var(--dark, 0))) linear;
      translate: calc(var(--dark, 0) * 400%) calc(var(--dark, 0) * -350%);
    }

    .astrobear svg {
      transform-origin: 50% 75%;
      scale: var(--dark, 0);
      rotate: calc(var(--dark, 0) * 360deg);
      transition: rotate calc(var(--speed) + (var(--dark, 0) * (var(--bear-speed) - var(--speed)))) calc(var(--bear-speed) * 0.4) linear, scale var(--speed) ease-in-out;
    }
  }

  .pilot__container {
    position: absolute;
    overflow: hidden;
    inset: 0;
    clip-path: inset(0 0 0 0);
    opacity: calc(1 - var(--dark, 0));
    translate: 0 calc(var(--dark, 0) * 200%);
    transition: opacity var(--speed) var(--easing), translate var(--speed) var(--easing);

    .pilot-bear {
      position: absolute;
      width: 25%;
      top: 70%;
      left: 100%;
      transition:
        translate calc(var(--speed) + ((1 - var(--dark, 0)) * ((var(--bear-speed) * 0.5) - var(--speed)))) calc((var(--bear-speed) * 0.5) * ((1 - var(--dark, 0)) * 0.4)) linear;
      translate:
        calc((0 - (1 - var(--dark, 0))) * (var(--width) + 100%)) calc((0 - (1 - var(--dark, 0))) * (200%));
    }

    .pilot {
      rotate: 12deg;
      animation: fly 4s infinite ease-in-out;
    }

    @keyframes fly {
      50% {
        translate: 0 -25%;
      }
    }
  }

  [aria-pressed=false] .toggle__backdrop:last-of-type {
    transition-timing-function: cubic-bezier(.2, -0.6, .7, 1.6);
  }

  [aria-pressed=false] .stars path {
    transition-delay: 0s;
  }

  [aria-pressed=true] {
    --dark: 1;
  }

  .otherControl {
    @include flexCenter(row, flex-start);
    gap: 0.8rem;

    // 活字印刷印章 - 字体切换控制器
    .font-control {
      width: 45px;
      height: 45px;
      position: relative;
      border-radius: 0.5rem;
      box-shadow: $insideShadow;
      @include flexCenter(row, center);
      cursor: pointer;
      background-color: #f5f0e6; // 纸张米黄色
      transition: all 0.3s ease;

      &:hover {
        background-color: #ede6d6;

        .type-block {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      }

      .type-block {
        width: 60%;
        height: 60%;
        background: #fff;
        border: 2px solid #8b4513; // 木纹边框色
        border-radius: 4px;
        @include flexCenter(row, center);
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;

        // 木纹纹理效果
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(90deg,
              transparent 0%,
              rgba(139, 69, 19, 0.1) 25%,
              transparent 50%,
              rgba(139, 69, 19, 0.1) 75%,
              transparent 100%);
          pointer-events: none;
        }

        .type-char {
          font-size: 1.5rem;
          font-weight: bold;
          color: #5d4037;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
      }

      .font-state-indicator {
        position: absolute;
        bottom: 3px;
        right: 3px;
        font-size: 0.6rem;
        font-weight: bold;
        color: #8b4513;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        width: 14px;
        height: 14px;
        @include flexCenter(row, center);
      }

      // 点击时的"盖章"动画
      &:active {
        .type-block {
          transform: scale(0.95);

          .type-char {
            transform: scale(1.1);
            color: #3e2723;
          }
        }
      }
    }

    // 迷你画廊 - 背景切换控制器
    .gallery-control {
      width: 45px;
      height: 45px;
      position: relative;
      border-radius: 0.5rem;
      box-shadow: $insideShadow;
      @include flexCenter(row, center);
      cursor: pointer;
      background-color: #f8f9fa; // 画廊墙面灰色
      transition: all 0.3s ease;

      &:hover {
        background-color: #e9ecef;

        .gallery-container::before {
          opacity: 0.8;
        }
      }

      .gallery-container {
        width: 70%;
        height: 70%;
        position: relative;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 2px;
        padding: 3px;
        background: #fff;
        border-radius: 3px;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

        .gallery-window {
          border-radius: 1px;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;

          .window-content {
            width: 100%;
            height: 100%;
            transition: transform 0.5s ease;
          }

          // 当前选中的背景窗口突出显示
          &.active {
            transform: scale(1.1);
            z-index: 1;
            box-shadow: 0 0 0 2px #5d7af5;

            .window-content {
              transform: scale(1.2);
            }
          }
        }
      }

      .gallery-state-indicator {
        position: absolute;
        bottom: 3px;
        right: 3px;
        font-size: 0.6rem;
        font-weight: bold;
        color: #5d7af5;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        width: 14px;
        height: 14px;
        @include flexCenter(row, center);
      }

      // 点击时的画廊切换动画
      &:active {
        .gallery-container {
          transform: scale(0.95);

          .gallery-window.active {
            transform: scale(1.05);
          }
        }
      }
    }

  }
}
</style>
