// useScrollHideNav.ts
import { ref, onMounted, onUnmounted } from 'vue'
import { debounce } from './debounce'

export function useScrollHideNav(options?: {
  threshold?: number     // 滚动阈值，默认 200
  debounceDelay?: number // 防抖延迟(ms)，默认 100
}) {
  const { threshold = 200, debounceDelay = 100 } = options || {}

  const isNavHidden = ref(false)

  const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0
    isNavHidden.value = scrollY > threshold
  }

  const debouncedHandler = debounce(handleScroll, debounceDelay)

  onMounted(() => {
    window.addEventListener('scroll', debouncedHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', debouncedHandler)
  })

  return { isNavHidden }
}
