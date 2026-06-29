<template>
  <div ref="wrapperRef" class="lazy-image-wrapper" :style="{ backgroundColor: placeholderColor }">
    <!-- 加载动画层 -->
    <div v-if="status === 'loading'" class="lazy-image-spinner">
      <div class="lazy-image-spinner-inner" style="z-index: 9;" :style="{ width: spinnerSize, height: spinnerSize }" />
    </div>

    <!-- 真实图片 -->
    <img v-show="status === 'loaded'" :src="resolvedSrc" :alt="alt" class="lazy-image-real"
      :class="{ 'lazy-image-fade-in': status === 'loaded' }" @load="onLoad" @error="onError" />

    <!-- 错误降级 -->
    <div v-if="status === 'error'" class="lazy-image-error">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
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
  }>(),
  {
    alt: '',
    placeholderColor: '#f0f0f2',
    spinnerSize: '46px',
  },
)

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

type Status = 'idle' | 'loading' | 'loaded' | 'error'
const status = ref<Status>('idle')
const resolvedSrc = ref('')
const wrapperRef = ref<HTMLDivElement | null>(null)
let observer: IntersectionObserver | null = null

function onLoad(e: Event) {
  status.value = 'loaded'
  emit('load', e)
}

function onError(e: Event) {
  status.value = 'error'
  emit('error', e)
}

function startLoad() {
  status.value = 'loading'
  resolvedSrc.value = props.src
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
})

watch(
  () => props.src,
  (newSrc) => {
    if (newSrc && newSrc !== resolvedSrc.value) {
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

  h2 {
    font-size: 0.8rem;
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
