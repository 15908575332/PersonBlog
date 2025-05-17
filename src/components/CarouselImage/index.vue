<template>
    <div class="marquee-container" ref="container">
        <div class="marquee-content" :style="contentStyle">
            <div v-for="(image, index) in extendedImages" :key="index" class="marquee-item">
                <img :src="image" :alt="'Image ' + (index % props.images.length + 1)">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive, watch, onUnmounted } from 'vue';

// 接收父组件传递的props
const props = defineProps({
    images: {
        type: Array,
        required: true
    },
    scrollSpeed: {
        type: Number,
        default: 0.4 // Adjust speed as needed
    },
    scrollDirection: {
        type: String,
        default: 'left' //方向
    }
});

// 响应式数据
const state = reactive({
    scrollPosition: 0, //需要滚动的距离
    containerWidth: 0, //主容器可视窗宽度
    itemWidth: 0 //单个图片宽度
});

const extendedImages = computed(() => [...props.images, ...props.images]);
const contentStyle = computed(() => {

    return {
        transform: `translateX(${state.scrollPosition * (props.scrollDirection === 'left' ? -1 : 1)}px)`
    }
});

const container = ref(null);
let animationFrameId;
function startScrolling() {
    // 注意：这里应该有一个变量来保存requestAnimationFrame的返回值
    animationFrameId = requestAnimationFrame(scroll);
    function scroll() {
        if (props.scrollDirection === 'left') {
            state.scrollPosition += props.scrollSpeed;
            if (state.scrollPosition >= extendedImages.value.length * state.itemWidth / 2) {
                state.scrollPosition = 0;
            }
        }

        if (props.scrollDirection === 'right') {
            state.scrollPosition += props.scrollSpeed;
            if (state.scrollPosition >= 0) {
                state.scrollPosition = -extendedImages.value.length * state.itemWidth / 2;
            }
        }
        // 在滚动逻辑的最后，再次请求下一帧
        animationFrameId = requestAnimationFrame(scroll); //浏览器自带回调函数
    }
}

onMounted(() => {
    state.containerWidth = container.value.clientWidth; //主容器可视窗宽度
    state.itemWidth = container.value.querySelector('.marquee-item').clientWidth; //单个容器宽度
    startScrolling();
});
onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
})

</script>

<style scoped>
.marquee-container {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.marquee-content {
    display: flex;
    width: fit-content;
}

.marquee-item {
    flex-shrink: 0;
    margin-right: 0.5rem;
}

.marquee-item img {
    height: 13rem;
    width: 25.6rem;
    border-radius: 15px;
    background-color: black;
}
</style>