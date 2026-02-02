<template>
    <div class="vertical-slider-container">
        <div class="slider-title">垂直进度条 (1-10)</div>

        <!-- 进度条轨道 -->
        <div class="slider-track" ref="trackRef" @click="handleTrackClick">
            <!-- 进度填充 -->
            <div class="slider-fill" :style="{ height: `${(progress - 1) * 10}%` }"></div>

            <!-- 可拖拽滑块 -->
            <div class="slider-thumb" ref="thumbRef" :style="{ bottom: `${(progress - 1) * 10}%` }"
                @mousedown="startDrag" @touchstart="startDrag">
                <!-- 当前进度值显示在滑块上 -->
                <div class="thumb-value">{{ progress }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 当前进度值 (1-10)
const progress = ref(5) // 默认值为5
const trackRef = ref(null)
const thumbRef = ref(null)
let isDragging = false

// 将鼠标位置转换为进度值
const getProgressFromPosition = (clientY) => {
    if (!trackRef.value) return 5

    const trackRect = trackRef.value.getBoundingClientRect()
    const trackHeight = trackRect.height

    // 计算鼠标在轨道内的相对位置 (0-1)，从底部开始
    let relativePosition = (trackRect.bottom - clientY) / trackHeight

    // 限制在0-1之间
    relativePosition = Math.max(0, Math.min(1, relativePosition))

    // 将0-1映射到1-10，并四舍五入到最接近的整数
    return Math.round(relativePosition * 9) + 1
}

// 开始拖拽
const startDrag = (e) => {
    e.preventDefault()
    isDragging = true

    // 添加事件监听器
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('touchmove', handleDrag, { passive: false })
    document.addEventListener('touchend', stopDrag)

    // 如果是触摸事件，也更新一次位置
    if (e.type === 'touchstart') {
        const touch = e.touches[0]
        progress.value = getProgressFromPosition(touch.clientY)
    }
}

// 处理拖拽
const handleDrag = (e) => {
    if (!isDragging) return

    e.preventDefault()
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY
    progress.value = getProgressFromPosition(clientY)
}

// 停止拖拽
const stopDrag = () => {
    isDragging = false

    // 移除事件监听器
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchmove', handleDrag)
    document.removeEventListener('touchend', stopDrag)
}

// 点击轨道直接跳转
const handleTrackClick = (e) => {
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY
    progress.value = getProgressFromPosition(clientY)
}

// 监听键盘事件，支持键盘控制
const handleKeydown = (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowRight':
            e.preventDefault()
            progress.value = Math.min(10, progress.value + 1)
            break
        case 'ArrowDown':
        case 'ArrowLeft':
            e.preventDefault()
            progress.value = Math.max(1, progress.value - 1)
            break
        case 'Home':
            e.preventDefault()
            progress.value = 1
            break
        case 'End':
            e.preventDefault()
            progress.value = 10
            break
    }
}

// 组件挂载时添加键盘事件监听
onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

// 组件卸载时清理事件监听
onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchmove', handleDrag)
    document.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped>
.vertical-slider-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif;
    user-select: none;
}

.slider-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
}

.slider-track {
    position: relative;
    width: 24px;
    height: 300px;
    background-color: #f0f0f0;
    border-radius: 12px;
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    overflow: hidden;
    /* 确保滑块不超出轨道 */
    margin-bottom: 20px;
    border: 2px solid #e0e0e0;
}

.slider-fill {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, #007AFF, #00C6FF);
    border-radius: 10px 10px 0 0;
    transition: height 0.1s ease;
    z-index: 1;
}

.slider-thumb {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: grab;
    z-index: 2;
    transition: box-shadow 0.2s ease, transform 0.1s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #007AFF;
    /* 确保滑块不超出轨道边界 */
    bottom: 0%;
    margin-bottom: -20px;
    /* 滑块高度的一半，使其中心对齐轨道边界 */
}

.slider-thumb:active {
    cursor: grabbing;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.25), 0 2px 5px rgba(0, 0, 0, 0.15);
    transform: translateX(-50%) scale(1.1);
}

.thumb-value {
    font-weight: 700;
    font-size: 16px;
    color: #007AFF;
    pointer-events: none;
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
    .slider-thumb {
        width: 44px;
        height: 44px;
    }

    .thumb-value {
        font-size: 18px;
    }
}

/* 悬停效果 */
@media (hover: hover) {
    .slider-thumb:hover {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15);
    }
}
</style>
