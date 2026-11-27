<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content" @click.stop :class="animationClass">
            <button class="modal-close" @click="closeModal"><img src="@/assets/icon/base/icons8-close-50.png"
                    style="width: 1rem;" alt="close"></button>
            <div class="modal-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, computed } from 'vue';
const props = defineProps({
    isVisible: Boolean,
    animationType: {
        type: String,
        default: 'clipRectSpIn',
    }
});

const emit = defineEmits(['close']);

// 根据传入的动画类型返回对应的CSS类名
const animationClass = computed(() => {
    return `animation-${props.animationType}`;
});

const closeModal = () => {
    emit('close');
};
watch(() => props.isVisible, (newValue) => {
    if (newValue) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
});
</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(var(--mask-rgb), 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 998;
    cursor: pointer;
    width: 100%;
    height: 100%;

    .modal-content {
        position: relative;
        background-color: var(--bg-surface);
        background-position: center center;
        background-size: cover;
        padding: 2rem;
        border-radius: 8px;
        min-width: 300px;
        box-shadow: 0 5px 15px rgba(var(--mask-rgb), 0.3);
        cursor: auto;
        user-select: none;
        display: flex;
        @include flexCenter(column, center);
        max-width: 80%;
        max-height: 80vh;
        // 弹框本体不再滚动，避免关闭按钮随内容滚走；滚动下沉到 .modal-body
        overflow: hidden;
        overscroll-behavior: contain;

        // 内容滚动区：关闭按钮位于其外层，因而始终固定在面板右上角
        .modal-body {
            // 横向交由 stretch 撑满，避免 width:100% 与 padding 叠加溢出
            width: auto;
            min-width: 0;
            min-height: 0;
            flex: 0 1 auto;
            align-self: stretch;
            overflow-y: auto;
            overflow-x: hidden;
            overscroll-behavior: contain;
        }

        &.animation-clipRectSpIn {
            animation: clipRectSpIn 1s both;
        }

        &.animation-zoomIn {
            animation: zoomIn 1s both;
        }

        &.animation-spaceInUp {
            animation: spaceInUp 1s both;
        }

        &.animation-slideUpFromBottom {
            animation: slideUpFromBottom 0.7s ease forwards;
            will-change: transform, opacity;
            /* 优化性能 */
        }

        button {
            display: inline-block;
            position: absolute;
            top: 0.4rem;
            right: 0.3rem;
            // 始终压在内容之上，不被 sticky 头部/列表覆盖
            z-index: 10;

            img {
                transition: all 0.2s linear;
            }

            &:hover img {
                transform: scale(1.1);
            }
        }
    }

    @keyframes clipRectSpIn {
        0% {
            opacity: 0;
            transform-origin: 50% 50%;
            transform: scale(2, 2);
            -webkit-filter: blur(90px);
        }

        100% {
            opacity: 1;
            transform-origin: 50% 50%;
            transform: scale(1, 1);
            -webkit-filter: blur(0px);
        }

    }

    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
        }

        50% {
            opacity: 1;
        }
    }

    @keyframes spaceInUp {
        0% {
            opacity: 0;
            transform-origin: 50% 0%;
            transform: scale(.2) translate(0%, -200%);
        }

        100% {
            opacity: 1;
            transform-origin: 50% 0%;
            transform: scale(1) translate(0%, 0%);
        }
    }

    @keyframes slideUpFromBottom {
        0% {
            opacity: 0;
            transform: translateY(100vh);
            /* 从屏幕底部开始 */
        }

        100% {
            opacity: 1;
            transform: translateY(0);
            /* 移动到中心 */
        }
    }
}
</style>
