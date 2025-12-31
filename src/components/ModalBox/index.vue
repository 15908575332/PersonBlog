<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content" @click.stop>
            <button @click="closeModal"><img src="./img/Plant.gif" alt="close"></button>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { watch } from 'vue';
const props = defineProps({
    isVisible: Boolean,
});

const emit = defineEmits(['close']);

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
    justify-content: center;
    align-items: center;
    z-index: 998;
    cursor: pointer;
    width: 100%;
    height: 100%;

    .modal-content {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        min-width: 300px;
        max-width: 60%;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        cursor: auto;
        position: relative;
        user-select: none;
        animation: clipRectSpIn 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;

        button {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;

            img {
                width: 2rem;
                transition: all 0.2s linear;
            }

            &:hover img {
                transform: scale(1.1);
            }
        }
    }

    @keyframes clipRectSpIn {
        0% {
            clip-path: polygon(50% 20%, 50% 50%, 20% 50%, 50% 50%, 50% 80%, 50% 50%, 80% 50%, 50% 50%);
        }

        100% {
            clip-path: polygon(50% 0%, 0% 0%, 0% 50%, 0% 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0%);
        }
    }
}
</style>
