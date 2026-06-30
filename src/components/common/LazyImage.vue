<template>
  <div ref="wrapperRef" class="lazy-image-wrapper" :style="{ backgroundColor: placeholderColor }">
    <!-- 加载动画层 -->
    <div v-if="status === 'loading'" class="lazy-image-spinner">
      <div class="lazy-image-spinner-inner" style="z-index: 9;" :style="{ width: spinnerSize, height: spinnerSize }" />
    </div>

    <!-- 真实图片 -->
    <img v-show="status === 'loaded'" :src="resolvedSrc" :alt="alt" class="lazy-image-real"
      :class="{ 'lazy-image-fade-in': status === 'loaded' }" @load="onLoad" @error="onError" />

    <!-- 图片加载完成后渲染的插槽内容 -->
    <slot v-if="status === 'loaded'" />

    <!-- 错误降级 -->
    <div v-if="status === 'error'" class="lazy-image-error">
      <svg viewBox="0 0 80 80" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- 头部轮廓 -->
        <circle cx="40" cy="40" r="36" stroke="currentColor" stroke-width="2.5"/>
        <!-- 腮红 -->
        <ellipse cx="22" cy="44" rx="7" ry="4" fill="currentColor" opacity="0.12"/>
        <ellipse cx="58" cy="44" rx="7" ry="4" fill="currentColor" opacity="0.12"/>
        <!-- 左眼 × -->
        <line x1="27" y1="32" x2="35" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="35" y1="32" x2="27" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <!-- 右眼 × -->
        <line x1="45" y1="32" x2="53" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="53" y1="32" x2="45" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        <!-- 汗滴 -->
        <path d="M60 24 Q62 30 58 34 Q54 30 60 24Z" fill="currentColor" opacity="0.25"/>
        <!-- 嘴 -->
        <path d="M33 50 Q40 46 47 50" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <h2>加载失败</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    placeholderColor?: string
    spinnerSize?: string
    loadTimeout?: number
  }>(),
  {
    alt: '',
    placeholderColor: '#f0f0f2',
    spinnerSize: '46px',
    loadTimeout: Number(import.meta.env.VITE_LAZY_IMAGE_LOAD_TIMEOUT) || 15000,
  },
)

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
  timeout: []
}>()

type Status = 'idle' | 'loading' | 'loaded' | 'error'
const status = ref<Status>('idle')
const resolvedSrc = ref('')
const wrapperRef = ref<HTMLDivElement | null>(null)
let observer: IntersectionObserver | null = null
let loadTimer: ReturnType<typeof setTimeout> | null = null

function clearLoadTimer() {
  if (loadTimer !== null) {
    clearTimeout(loadTimer)
    loadTimer = null
  }
}

function onLoad(e: Event) {
  clearLoadTimer()
  status.value = 'loaded'
  emit('load', e)
}

function onError(e: Event) {
  clearLoadTimer()
  status.value = 'error'
  emit('error', e)
}

function startLoad() {
  status.value = 'loading'
  resolvedSrc.value = props.src
  clearLoadTimer()
  loadTimer = setTimeout(() => {
    status.value = 'error'
    emit('timeout')
  }, props.loadTimeout)
}

onMounted(() => {
  if (!wrapperRef.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startLoad()
          observer?.unobserve(entry.target)
          observer?.disconnect()
          observer = null
        }
      })
    },
    {
      rootMargin: '200px',
      threshold: 0,
    },
  )

  observer.observe(wrapperRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  clearLoadTimer()
})

watch(
  () => props.src,
  (newSrc) => {
    if (newSrc && newSrc !== resolvedSrc.value) {
      clearLoadTimer()
      status.value = 'idle'
      resolvedSrc.value = ''
      if (wrapperRef.value) {
        observer?.disconnect()
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                startLoad()
                observer?.unobserve(entry.target)
                observer?.disconnect()
                observer = null
              }
            })
          },
          { rootMargin: '200px', threshold: 0 },
        )
        observer.observe(wrapperRef.value)
      }
    }
  },
)
</script>

<style scoped lang="scss">
.lazy-image-wrapper {
  position: relative;
  // overflow: hidden;
  width: 100%;
  height: 100%;
}

.lazy-image-real {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
}

.lazy-image-real.lazy-image-fade-in {
  animation: lazy-image-fade-in 0.4s ease-in forwards;
}

.lazy-image-spinner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.lazy-image-spinner-inner {
  position: relative;
  border: 3px solid $general-white;
  border-radius: 50%;
  -webkit-animation: rotation 1s linear infinite;
  animation: lazy-image-spin 1s linear infinite;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 3px solid;
    border-color: $primary-sub transparent;
  }
}

.lazy-image-error {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.25);
  z-index: 1;
  @include flexCenter(column, center);
  gap: 0.5rem;
  /* 漫画网点纸风格背景 */
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
  background-size: 12px 12px;

  h2 {
    font-size: 0.8rem;
    @include text-color('text-sec-color');
  }
}

@keyframes lazy-image-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes lazy-image-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
