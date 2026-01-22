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
    /** 配置项
     * @param {Number} fftSize FFT转换尺寸（需为2的幂）
     * @param {Number} barWidth 单个频谱条宽度（像素）
     * @param {Number} gap 频谱条间距（像素）
     * @param {String} color 频谱颜色
     * @param {Number} height 组件高度（像素）
     * @param {Number} maxBars 最大显示频谱条数量
     */
    config: {
        type: Object,
        default: () => ({
            fftSize: 712,
            barWidth: 1,
            gap: 2,
            color: '#5de9e0',
            height: 30,
            maxBars: 108
        })
    }
})

// Canvas引用
const canvas = ref(null)

// 音频分析相关变量
let audioContext = null
let analyser = null
let source = null
let animationFrameId = null

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
        // 创建音频上下文（需用户交互后调用）
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)()
        }

        // 创建分析器
        analyser = audioContext.createAnalyser()
        analyser.fftSize = getValidFFTSize(props.config.fftSize)

        // 连接音频节点
        source = audioContext.createMediaElementSource(props.audioElement)
        source.connect(analyser)
        analyser.connect(audioContext.destination)
    } catch (error) {
        console.error('Audio context error:', error)
    }
}

/**
 * 绘制频谱图
 * 
 * 此函数用于在画布上绘制音频频谱图。它会根据音频分析器的数据，计算并绘制每个频谱条。
 * 频谱条的宽度、间距和颜色由组件的配置属性决定。
 * 
 * @returns {void}
 */
const drawSpectrum = () => {
    // 如果画布或音频分析器未初始化，则不执行绘制操作
    if (!canvas.value || !analyser) return

    // 获取画布的2D绘图上下文
    const ctx = canvas.value.getContext('2d')
    // 获取画布的宽度和高度
    const { width, height } = canvas.value
    // 计算音频数据的缓冲区长度
    const bufferLength = analyser.frequencyBinCount / 2 //如果不除2，高频处是无法显示的
    // 存储音频数据 Uint8Array 类型的数组，其中每个元素表示对应频率的振幅
    const dataArray = new Uint8Array(bufferLength)

    // 从音频分析器中获取当前的频率数据
    analyser.getByteFrequencyData(dataArray)
    // 清除画布上之前绘制的内容
    ctx.clearRect(0, 0, width, height)
    // 从配置中获取最大频谱条数量
    const maxBars = props.config.maxBars;
    // 从配置中获取频谱条之间的间距
    const barGap = props.config.gap;
    // 计算每个频谱条对应的音频数据样本数量
    const samplesPerBar = bufferLength / maxBars

    // 精确计算条宽（保留2位小数减少误差）
    const totalGapSpace = (maxBars - 1) * barGap
    const barWidth = Number(((width - totalGapSpace) / maxBars).toFixed(2))

    // 循环绘制每个频谱条
    for (let i = 0; i < maxBars; i++) {
        // 计算频段平均值
        let sum = 10
        const start = Math.floor(i * samplesPerBar)
        const end = Math.floor((i + 1) * samplesPerBar)
        // 累加当前频段内的所有音频数据
        for (let j = start; j < end; j++) sum += dataArray[j]
        // 计算当前频段的平均值
        const avgValue = sum / (end - start)

        // 绘制条形
        // 根据平均值计算频谱条的高度
        const barHeight = (avgValue / 255) * height * 1 //高度为100%
        // 计算频谱条的x坐标
        const xPos = i * (barWidth + barGap)
        // 最后一条强制右对齐
        const finalWidth = i === maxBars - 1
            ? width - xPos // 剩余空间全部使用
            : barWidth
        // 设置频谱条的填充颜色
        ctx.fillStyle = props.config.color
        // 在画布上绘制频谱条
        ctx.fillRect(
            xPos,
            height - barHeight,
            finalWidth,
            barHeight
        )
    }

    // 请求下一帧动画，持续更新频谱图
    animationFrameId = requestAnimationFrame(drawSpectrum)
}

// 调整Canvas尺寸
const resizeCanvas = () => {
    if (canvas.value) {
        // 精确到整数避免亚像素渲染问题
        canvas.value.width = Math.floor(canvas.value.offsetWidth)
        canvas.value.height = props.config.height
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
    transition: height 0.5s ease;
    transform: translateZ(0);
    box-sizing: border-box;
    image-rendering: crisp-edges;
    /* box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.5); */
    border-radius: 0.25rem;
    padding: 0 0.2rem;
}
</style>