<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content" @click.stop :class="animationClass">
            <button @click="closeModal"><img src="./img/icons8-close-50.png" style="width: 1rem;" alt="close"></button>
            <slot></slot>
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
    background-color: rgba(0, 0, 0, 0.5);
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
        background-image: url('./img/fH11Fdidh.png');
        background-position: center center;
        background-size: cover;
        padding: 2rem;
        border-radius: 8px;
        min-width: 300px;
        // max-width: 60%;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        cursor: auto;
        user-select: none;
        display: flex;
        @include flexCenter(column, center);

        &.animation-clipRectSpIn {
            animation: clipRectSpIn 1s both;
        }

        &.animation-zoomIn {
            animation: zoomIn 1s both;
        }

        &.animation-spaceInUp {
            animation: spaceInUp 1s both;
        }

        button {
            display: inline-block;
            position: absolute;
            top: 0.4rem;
            right: 0.3rem;

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
}
</style>
