<!-- SpectrumVisualizer.vue -->
<template>
    <canvas ref="canvas" class="spectrum-canvas"></canvas>
</template>

<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    audioElement: {
        type: HTMLAudioElement,
        required: true,
        default: () => {
            throw new Error('audioElement prop is required')
        }
    },
    isPlaying: {
        type: Boolean,
        required: true
    },
    config: {
        type: Object,
        default: () => ({
            fftSize: 712,
            barWidth: 2,
            gap: 2,
            color: 'red',
            height: 45,
            maxBars: 108
        })
    }
})

const canvas = ref(null)

// 音频分析相关变量
let audioContext = null
let analyser = null
let source = null
let animationFrameId = null

// 块状态管理
let blockStates = [] // 存储每个块的状态
let lastUpdateTime = 0

// 验证FFT尺寸
const getValidFFTSize = (size) => {
    let validSize = 32
    while (validSize < size && validSize < 32768) {
        validSize *= 2
    }
    return Math.min(validSize, 32768)
}

// 初始化音频分析器
const initAudioAnalyser = () => {
    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext)()
            // 现代浏览器 AudioContext 默认 suspended，必须 resume
            if (audioContext.state === 'suspended') {
                audioContext.resume()
            }
        }

        analyser = audioContext.createAnalyser()
        analyser.fftSize = getValidFFTSize(props.config.fftSize)

        try {
            source = audioContext.createMediaElementSource(props.audioElement)
        } catch {
            // audio 元素已被其他 AudioContext 绑定，降级处理：直连输出
            analyser.connect(audioContext.destination)
            initializeBlockStates()
            return
        }
        source.connect(analyser)
        analyser.connect(audioContext.destination)

        // 初始化块状态数组
        initializeBlockStates()
    } catch (error) {
        console.error('Audio context error:', error)
    }
}

// 初始化块状态
const initializeBlockStates = () => {
    blockStates = new Array(props.config.maxBars).fill(null).map(() => ({
        currentHeight: 0,        // 当前块的高度
        targetHeight: 0,         // 目标高度（跟随柱状体）
        isAtTop: false,          // 是否到达顶部
        liftOffset: 0,           // 向上抬升的偏移量
        velocity: 0,             // 下落速度
        lastBarHeight: 0         // 上一次柱状体高度
    }))
}

// 创建颜色渐变
const createGradient = (ctx, height) => {
    const gradient = ctx.createLinearGradient(0, height, 0, 0)
    gradient.addColorStop(0, '#4facfe')    // 底部: 蓝色
    gradient.addColorStop(0.3, '#00f2fe')  // 中下部: 青色
    gradient.addColorStop(0.6, '#43e97b')  // 中部: 绿色
    gradient.addColorStop(0.8, '#fa709a')  // 中上部: 粉色
    gradient.addColorStop(1, '#ff6b6b')   // 顶部: 红色
    return gradient
}

// 创建小块颜色渐变
const createBlockGradient = (ctx, x, y, size, intensity) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
    gradient.addColorStop(0, '#ffffff')    // 中心: 白色
    gradient.addColorStop(0.6, `rgba(255, 235, 59, ${0.3 + intensity * 0.7})`)  // 根据强度调整颜色
    gradient.addColorStop(1, 'rgba(255, 235, 59, 0.1)')
    return gradient
}

// 更新块状态
const updateBlockState = (index, barHeight, deltaTime) => {
    const state = blockStates[index]
    const maxLift = 8 // 最大抬升高度

    // 检测柱状体是否到达顶部（比如高度超过85%）
    const isTopReached = barHeight > state.lastBarHeight && barHeight > props.config.height * 0.85

    if (isTopReached && !state.isAtTop) {
        // 柱状体到达顶部，块开始向上抬升
        state.isAtTop = true
        state.liftOffset = maxLift
        state.velocity = -2 // 初始向上速度
    }

    // 更新目标高度
    state.targetHeight = barHeight

    if (state.isAtTop) {
        // 块在顶部状态，应用物理效果
        const gravity = 0.5
        const damping = 0.8

        // 应用重力
        state.velocity += gravity

        // 更新抬升偏移
        state.liftOffset += state.velocity

        // 检查是否应该结束抬升状态
        if (state.liftOffset <= 0) {
            state.liftOffset = 0
            state.isAtTop = false
            state.velocity = 0
        }

        // 弹性碰撞效果
        if (state.liftOffset < 0) {
            state.liftOffset = 0
            state.velocity = -state.velocity * damping
        }
    }

    // 平滑跟随柱状体高度
    const followSpeed = state.isAtTop ? 0.05 : 0.2 // 抬升时跟随较慢
    state.currentHeight += (state.targetHeight - state.currentHeight) * followSpeed

    state.lastBarHeight = barHeight
}

const drawSpectrum = () => {
    if (!canvas.value || !analyser) return

    const ctx = canvas.value.getContext('2d')
    const { width, height } = canvas.value
    const bufferLength = analyser.frequencyBinCount / 2
    const dataArray = new Uint8Array(bufferLength)

    analyser.getByteFrequencyData(dataArray)
    ctx.clearRect(0, 0, width, height)

    const maxBars = props.config.maxBars
    const barGap = props.config.gap
    const samplesPerBar = bufferLength / maxBars

    // 计算时间增量
    const currentTime = Date.now()
    const deltaTime = lastUpdateTime ? (currentTime - lastUpdateTime) / 1000 : 0.016
    lastUpdateTime = currentTime

    // 创建颜色渐变
    const gradient = createGradient(ctx, height)

    const totalGapSpace = (maxBars - 1) * barGap
    const barWidth = Number(((width - totalGapSpace) / maxBars).toFixed(2))

    for (let i = 0; i < maxBars; i++) {
        let sum = 10
        const start = Math.floor(i * samplesPerBar)
        const end = Math.floor((i + 1) * samplesPerBar)
        for (let j = start; j < end; j++) sum += dataArray[j]
        const avgValue = sum / (end - start)

        // 计算柱状体高度
        const barHeight = (avgValue / 255) * height
        const intensity = barHeight / height

        if (barHeight <= 0) continue

        const xPos = i * (barWidth + barGap)
        const finalWidth = i === maxBars - 1 ? width - xPos : barWidth

        // 绘制主频谱条
        ctx.fillStyle = gradient
        ctx.fillRect(xPos, height - barHeight, finalWidth, barHeight)

        // 更新块状态
        updateBlockState(i, barHeight, deltaTime)

        const state = blockStates[i]

        // 绘制顶部小块
        const blockSize = Math.max(3, barWidth * 0.6)
        const blockX = xPos + finalWidth / 2

        // 块的位置基于当前高度和抬升偏移
        const blockY = height - state.currentHeight - blockSize / 2 - state.liftOffset

        // 创建小块渐变
        const blockGradient = createBlockGradient(ctx, blockX, blockY, blockSize, intensity)

        // 绘制小块
        ctx.shadowColor = `rgba(255, 235, 59, ${0.5 + intensity * 0.5})`
        ctx.shadowBlur = 4 + intensity * 8
        ctx.fillStyle = blockGradient

        ctx.beginPath()
        ctx.arc(blockX, blockY, blockSize / 2, 0, Math.PI * 2)
        ctx.fill()

        // 重置阴影
        ctx.shadowBlur = 0
    }

    animationFrameId = requestAnimationFrame(drawSpectrum)
}

// 调整Canvas尺寸
const resizeCanvas = () => {
    if (canvas.value) {
        canvas.value.width = Math.floor(canvas.value.offsetWidth)
        canvas.value.height = props.config.height
        // 重置块状态
        initializeBlockStates()
    }
}

// 响应播放状态变化
watchEffect(() => {
    if (props.isPlaying) {
        if (!audioContext) initAudioAnalyser()
        if (!animationFrameId) drawSpectrum()
    } else {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
        lastUpdateTime = 0
        // 停止时重置块状态
        initializeBlockStates()
    }
})

// 生命周期
onMounted(() => {
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
})

onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrameId)
    window.removeEventListener('resize', resizeCanvas)
    source?.disconnect()
    analyser?.disconnect()
    audioContext?.close()
})
</script>

<style scoped>
.spectrum-canvas {
    width: 100%;
    min-width: 15rem;
    transition: height 0.5s ease;
    transform: translateZ(0);
    box-sizing: border-box;
    image-rendering: crisp-edges;
    border-radius: 0.25rem;
    padding: 0 0.2rem;
}
</style>