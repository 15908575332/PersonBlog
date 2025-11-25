<template>
    <div class="ripple__toggle flowerBtn" @click="toggleControlPanel">
        {{ showControlPanel ? "🌸" : "💮" }}

    </div>
    <!-- 其他代码保持不变 -->
    <div class="flowersControl" :class="{ 'showFlowersControl': showControlPanel }">
        <!-- 面板内容保持不变 -->
    </div>
</template>

<script setup>
// 其他代码保持不变
import { ref } from 'vue';
const showControlPanel = ref(false)
// 添加面板状态管理
const panelState = ref('hidden'); // hidden, showing, shown, hiding

const toggleControlPanel = () => {
    if (showControlPanel.value) {
        // 开始隐藏动画
        panelState.value = 'hiding';
        setTimeout(() => {
            showControlPanel.value = false;
            panelState.value = 'hidden';
        }, 300); // 匹配CSS动画时长
    } else {
        // 开始显示动画
        panelState.value = 'showing';
        showControlPanel.value = true;
        setTimeout(() => {
            panelState.value = 'shown';
        }, 300);
    }
};
</script>

<style scoped lang="scss">
// 优化后的控制面板样式
.flowersControl {
    position: fixed;
    right: 5vw;
    bottom: -100%;
    z-index: 998;
    border-radius: 8px;
    padding: 0 1rem;
    box-shadow:
        0px 4px 20px rgba(113, 113, 113, 0.25),
        0px 0px 0px 1px rgba(113, 113, 113, 0.1);
    min-width: 220px;
    min-height: 150px;
    @include flexCenter(row, center);
    gap: 1rem;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    font-size: 0.8rem;
    font-family: 'gtpy';

    // 分离显示和隐藏的动画
    transition:
        transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity 0.3s ease-out,
        bottom 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

    // 初始状态
    transform: translateY(20px) scale(0.95);
    opacity: 0;

    // 内部样式保持不变
    .button-group,
    .slider-group {
        height: 100%;
        text-align: center;
        padding: 0 0.4rem;
    }

    .button-group {
        @include flexCenter(column, space-between);
        padding: 0;
        gap: 0.8rem;

        .control-btn {
            display: block;
            width: 50px;
            height: 50px;
            border: 1px solid #63cdeb;
            border-radius: 0.4rem;
            background: white;
            overflow: hidden;
            transition: all 0.2s ease;
            cursor: pointer;

            &:hover {
                background-color: #e8f7ff;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(99, 205, 235, 0.3);
            }

            &:active {
                transform: translateY(0);
            }

            img {
                width: 100%;
                transition: transform 0.2s ease;
            }
        }
    }

    .slider-flex {
        @include flexCenter(column, flex-start);
        gap: 0.8rem;

        .slider-group {
            @include flexCenter(row, flex-start);
            border: 1px solid #e0e0e0;
            border-radius: 0.4rem;
            gap: 0.5rem;
            background: white;
            width: 220px;
            height: 50px;
            padding: 0 0.8rem;
            transition: border-color 0.2s ease;

            &:hover {
                border-color: #63cdeb;
            }

            label {
                font-weight: 500;
                color: #555;
                min-width: 40px;
            }

            .slider {
                flex: 1;
                height: 4px;
                border-radius: 2px;
                background: #e0e0e0;
                outline: none;
                cursor: pointer;
                transition: background 0.2s ease;

                &:hover {
                    background: #ccc;
                }

                &::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #39C49E;
                    cursor: pointer;
                    transition: all 0.2s ease;

                    &:hover {
                        transform: scale(1.2);
                        background: #2da985;
                    }
                }
            }
        }
    }
}

// 显示状态 - 使用更自然的动画曲线
.showFlowersControl {
    bottom: 2vw;
    transform: translateY(0) scale(1);
    opacity: 1;

    // 为显示状态添加轻微的弹性效果
    transition:
        transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity 0.4s ease-out,
        bottom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

// 添加响应式调整
@media (max-width: 768px) {
    .flowersControl {
        right: 2vw;
        left: 2vw;
        min-width: auto;
        width: auto;

        .slider-flex .slider-group {
            width: 100%;
        }
    }

    .showFlowersControl {
        bottom: 1rem;
    }
}

// 可选：添加微妙的入场动画
@keyframes subtleBounce {
    0% {
        transform: translateY(20px) scale(0.95);
    }

    50% {
        transform: translateY(-5px) scale(1.02);
    }

    100% {
        transform: translateY(0) scale(1);
    }
}

.showFlowersControl {
    animation: subtleBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>