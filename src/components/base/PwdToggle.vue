<template>
    <button type="button" class="pwd-toggle" :class="{ 'is-on': modelValue }" :aria-label="modelValue ? '隐藏密码' : '显示密码'"
        :aria-pressed="modelValue" @mousedown.prevent="toggle">
        <svg v-if="modelValue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M1.8 12S5.4 6 12 6s10.2 6 10.2 6-3.6 6-10.2 6S1.8 12 1.8 12Z" />
            <circle cx="12" cy="12" r="3.2" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c6.6 0 10.2 6 10.2 6a15.9 15.9 0 0 1-2.8 3.4" />
            <path d="M6.5 7.8A15.9 15.9 0 0 0 1.8 12s3.6 6 10.2 6c1.4 0 2.7-.3 3.8-.8" />
            <path d="M9.9 10a3 3 0 0 0 4.1 4.1" />
            <path d="M3.2 3.2 20.8 20.8" />
        </svg>
    </button>
</template>

<script setup>
// 密码可见性切换按钮：登录、注册、重置密码页共用，保证三处交互与视觉一致
const props = defineProps({
    modelValue: { type: Boolean, default: false }
});
const emit = defineEmits(['update:modelValue']);

const toggle = () => {
    emit('update:modelValue', !props.modelValue);
};
</script>

<style scoped lang="scss">
.pwd-toggle {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    padding: 0;
    border: none;
    outline: none;
    border-radius: 50%;
    background: transparent;
    color: var(--text-sec-color);
    cursor: pointer;
    z-index: 2;
    transition: color 0.2s ease, background-color 0.2s ease;

    svg {
        width: 15px;
        height: 15px;
        display: block;
        pointer-events: none;
    }

    &:hover {
        color: var(--primary-sub);
        background: rgba(var(--primary-sub-rgb), 0.1);
    }

    &.is-on {
        color: var(--primary-sub);
    }
}
</style>
