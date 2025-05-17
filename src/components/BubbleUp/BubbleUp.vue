<template>
    <!-- 气泡容器（固定定位覆盖全屏） -->
    <div class="bubble-container">
        <!-- transition-group 实现气泡动画组 -->
        <transition-group name="bubble" tag="div">
            <!-- 每个气泡元素 -->
            <div v-for="bubble in bubbles" :key="bubble.id" class="bubble" :style="{
                left: bubble.position + 'px',       // 水平随机位置
                backgroundColor: bubble.color,      // 随机HSL颜色
                width: bubble.size + 'px',          // 气泡宽度
                height: bubble.size + 'px',         // 气泡高度
                animationDuration: bubble.duration + 's', // 动画持续时间
                fontSize: bubble.fontSize + 'px',   // 字体大小（随气泡尺寸变化）
                animationDelay: bubble.delay + 's'  // 动画延迟（实现错峰出现）
            }">
                {{ bubble.content }} <!-- 显示随机emoji -->
            </div>
        </transition-group>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 核心变量
const bubbles = ref([]); // 存储所有气泡的响应式数组
let id = 0;             // 气泡唯一ID计数器
let intervalId = null;  // 定时器ID（用于组件卸载时清除）

/**
    * 获取随机emoji表情
    * @returns { string } 随机选择的emoji
*/
const getRandomEmoji = () => {
    const emojis = ['✨', '🌟', '💫', '⚡', '🎈', '💦', '☁️', '❤️', '🔥', '🎯', '🍒'];
    return emojis[Math.floor(Math.random() * emojis.length)];
};

/**
    * 批量生成气泡
    * @param { number } count - 每次生成的气泡数量（默认3个）
*/
const generateBubbles = (count = 3) => {
    // 性能保护：如果气泡超过80个则停止生成
    if (bubbles.value.length > 80) return;

    for (let i = 0; i < count; i++) {
        const size = 10 + Math.random() * 40; // 气泡大小范围10-50px

        // 单个气泡配置对象
        const newBubble = {
            id: id++,                        // 唯一ID（自增）
            content: getRandomEmoji(),        // 随机emoji内容
            position: Math.random() * (window.innerWidth - 100), // 水平随机位置（留出边距）
            color: `hsla(${Math.random() * 360}, 70%, 70%, 0.7)`, // 随机鲜艳颜色
            size: size,                      // 气泡尺寸
            fontSize: size * 0.5,             // 字体大小（尺寸的50%）
            duration: 3 + Math.random() * 4,  // 动画持续时间3-7秒
            delay: Math.random() * 0.5       // 动画延迟0-0.5秒（错峰效果）
        };

        bubbles.value.push(newBubble); // 添加到气泡数组

        // 设置定时器：动画结束后移除气泡
        setTimeout(() => {
            bubbles.value = bubbles.value.filter(b => b.id !== newBubble.id);
        }, newBubble.duration * 1000);
    }
};

// 组件挂载时初始化
onMounted(() => {
    // 初始爆发效果：快速生成6批气泡（共30个）
    for (let i = 0; i < 4; i++) {
        setTimeout(generateBubbles, i * 100); // 每100ms生成一批（count个）
    }

    // 持续生成：每200ms生成一批新气泡（3个）
    intervalId = setInterval(() => {
        generateBubbles(3);
    }, 200);
});

// 组件卸载时清理
onUnmounted(() => {
    clearInterval(intervalId); // 清除定时器
});
</script>

<style scoped>
/* 气泡容器样式（全屏固定定位） */
.bubble-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    /* 覆盖整个视口高度 */
    pointer-events: none;
    /* 穿透点击事件 */
    z-index: 1;
}

/* 单个气泡基础样式 */
.bubble {
    position: absolute;
    bottom: 0;
    /* 从底部开始上升 */
    border-radius: 50%;
    /* 圆形效果 */
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    /* 立体阴影 */
    pointer-events: none;
    transform: translateY(0) scale(0.5);
    /* 初始状态（下方+缩小） */
    opacity: 0;
    /* 初始透明 */
    animation: bubble-up linear forwards;
    /* 应用上升动画 */
}

/* 气泡上升动画关键帧 */
@keyframes bubble-up {
    0% {
        transform: translateY(0) scale(0.5);
        opacity: 0;
    }

    20% {
        opacity: 0.8;
        /* 快速显示 */
        transform: translateY(-20px) scale(1);
        /* 弹跳效果 */
    }

    100% {
        transform: translateY(-100vh) scale(0.8);
        /* 上升到顶部 */
        opacity: 0;
        /* 渐隐消失 */
    }
}
</style>