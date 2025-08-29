<template>
    <div class="bg">
        <div class="title">
            <h3>🧨滚动消息</h3>
        </div>
        <div v-if="duplicatedMessages" class="scroll-container" @mouseenter="pause" @mouseleave="resume"
            :style="{ width: `${containerWidth}px `, height: `${containerHeight}px` }">

            <div ref="listRef" class="message-list" :style="{ transform: `translateY(${offset}px)` }">
                <div v-for="(message, index) in duplicatedMessages" :key="index" class="message-item">
                    <!-- 头像 -->
                    <div class="avatar">
                        <img :src="message.avatar" alt="头像">
                    </div>
                    <p class="username">{{ message.username }}</p>
                    <span>:</span>
                    <p class="text">{{ message.text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
const props = defineProps({
    messages: {
        type: Array,
        default: () => [],
        required: true
    },
    speed: {
        type: Number,
        default: 40 // 像素/秒
    },
    containerWidth: {
        type: Number,
        default: 400 // 容器宽度 
    },
    containerHeight: {
        type: Number,
        default: 350 // 容器高度
    }
})

// // 监听 messages 的变化
// watch(() => props.messages, (newVal) => {
//     console.log('子组件接收到新的messages:', newVal);
// }, { immediate: true, deep: true });

const itemHeight = 50 // 每个消息项的高度
const offset = ref(0)
const listRef = ref(null)
const animationFrame = ref(null)
const lastTime = ref(0)
const isPaused = ref(false)
// 生成双倍长度的消息数组用于无缝衔接
const duplicatedMessages = computed(() => [...props.messages, ...props.messages])

// 计算单个完整循环的高度
const cycleHeight = computed(() => props.messages.length * itemHeight)

onMounted(() => {
    startAnimation()
})

onBeforeUnmount(() => {
    stopAnimation()
})

function startAnimation() {
    lastTime.value = performance.now()
    animate()
}

function animate() {
    if (isPaused.value) return

    const now = performance.now()
    const delta = now - lastTime.value
    lastTime.value = now

    // 更新偏移量
    offset.value -= (props.speed * delta) / 1000

    // 当完成一个完整循环时重置位置
    if (Math.abs(offset.value) >= cycleHeight.value) {
        offset.value = 0
    }

    animationFrame.value = requestAnimationFrame(animate)
}

function stopAnimation() {
    cancelAnimationFrame(animationFrame.value)
}

function pause() {
    isPaused.value = true
}

function resume() {
    if (isPaused.value) {
        isPaused.value = false
        startAnimation()
    }
}
</script>

<style scoped lang="scss">
.bg {
    background-image: url('@/assets/img/infomalEssay/springBg.png');
    background-size: cover;
    padding: 1rem;
    border-radius: 0.5rem;
}

// 标题样式
.title {
    height: 30px;
    line-height: 1;
    // padding: 0 16px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    background-color: transparent;
    position: relative;
    z-index: 1;
}

.scroll-container {
    overflow: hidden;
    position: relative;
    font-family: 'gtpy';


    //滚动列表
    .message-list {
        position: absolute;
        width: 100%;


        .message-item {
            min-height: 60px;
            width: 100%;
            line-height: 1.5;
            font-size: 16px;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal; // 允许文本换行

            @include flexCenter(row, flex-start);

            // 头像样式
            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 8px;
                background-color: #33bafb;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            // 用户名
            .username {
                font-weight: bold;
                // margin-right: 4px;
                margin: 0 4px 0 0;
                white-space: nowrap;
                color: rgba(12, 174, 249);
            }

            .text {
                flex: 1; // 允许文本内容占据剩余空间
                white-space: normal; // 允许文本换行
                color: #666;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            // 冒号
            span {
                margin: 0 4px;
                color: #999;
            }
        }
    }
}
</style>