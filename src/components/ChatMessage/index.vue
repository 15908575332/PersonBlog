<template>
    <div class="chat-messages" ref="scrollContainer" @scroll="handleScroll">
        <div v-for="msg in messages" :key="msg.id" :class="['message-bubble', { 'is-mine': msg.isMine }]">
            <div class="avatar">
                <img :src="msg.avatar" alt="avatar" class="avatar-icon" />
            </div>
            <div class="content-wrapper">
                <!-- <p class="time">{{ formatTime(msg.time) }}</p> -->
                <!-- 图片消息 -->
                <div v-if="msg.image" class="image-message">
                    <img class="message-image" :src="msg.image" @click="previewImage(msg.image)" alt="img">
                    <div class="image-loading" v-if="imageLoading[msg.id]">加载中...</div>
                </div>
                <!-- 文本消息 -->
                <p v-if="msg.content" class="message-content">{{ msg.content }}</p>

            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, ref, nextTick, onMounted, defineExpose } from 'vue';
const props = defineProps({
    messages: {
        type: Array,
        default: () => []
    }
});

const imageLoading = ref({});

// 处理图片加载
const handleImageLoad = (msgId) => {
    imageLoading.value[msgId] = false;
};

const handleImageError = (msgId) => {
    imageLoading.value[msgId] = false;
    console.error('图片加载失败:', msgId);
};

// 图片预览
const previewImage = (imageUrl) => {
    // 创建图片预览模态框
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: zoom-out;
    `;

    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.cssText = `
        max-width: 80%;
        max-height: 80%;
        border-radius: 8px;
        cursor: default;
    `;

    modal.appendChild(img);
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };

    document.body.appendChild(modal);
};

// 默认头像处理
const getDefaultAvatar = () => {
    return 'src/assets/icon/instantMessaging/icons8-people-48.png';
};

const handleAvatarError = (event) => {
    event.target.src = getDefaultAvatar();
};

function formatTime(timeString) { //时间格式化
    const date = new Date(timeString)
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}
const scrollContainer = ref(null);
let isUserScrolling = false;
let scrollTimeout = null;

// 检查是否在底部附近
function isNearBottom() {
    const container = scrollContainer.value;
    if (!container) return true;
    const threshold = 190; // 距离底部100px以内算作底部
    return container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;
}

// 平滑滚动到底部
function scrollToBottom(force = false) { //force参数强制滚动
    nextTick(() => {
        const container = scrollContainer.value;
        if (container && (force || isNearBottom())) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
}

// 强制滚动到底部（忽略用户滚动状态）
function forceScrollToBottom() {
    nextTick(() => {
        const container = scrollContainer.value;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
}

defineExpose({
    forceScrollToBottom
});
// 处理滚动事件
function handleScroll() {
    isUserScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
    }, 1000);
}

// 监听messages变化
watch(() => props.messages, (newMessages, oldMessages) => {
    if (newMessages.length > oldMessages.length) {
        // 只有新消息增加时才滚动
        scrollToBottom();
    }
}, { deep: true });

onMounted(() => {
    forceScrollToBottom();
});
</script>

<style scoped lang="scss">
.chat-messages {
    padding: 0.5rem 1rem;
    height: 100%;
    overflow-y: auto;

    .message-bubble {
        @include flexCenter(row, flex-start);
        gap: 0.5rem;
        padding: 0.5rem 0;

        .avatar {
            @include flexCenter(row, center);

            .avatar-icon {
                width: 30px;
                height: 35px;
                border-radius: 0.2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }
        }

        .content-wrapper {
            @include flexCenter(column, flex-start);
            max-width: 70%;
            align-items: flex-start;

            .message-content {
                background-color: #e8e8e8;
                padding: 0.2rem 0.5rem;
                border-radius: 0.2rem;
                font-size: 0.85rem;
                line-height: 1rem;
                white-space: pre-wrap;
                /* 允许换行（保留空白符） */
                word-wrap: break-word;
                /* 长单词/URL 自动换行 */
                overflow-wrap: anywhere;
                /* 现代浏览器兼容写法 */
                width: 100%;

            }

            .image-message {
                position: relative;

                .message-image {
                    max-width: 200px;
                    max-height: 200px;
                    border-radius: 8px;
                    cursor: zoom-in;
                    border: 1px solid #e8e8e8;
                    transition: transform 0.2s;

                    &:hover {
                        // transform: scale(1.02);
                    }

                    .image-loading {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: rgba(0, 0, 0, 0.7);
                        color: white;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 0.75rem;
                    }
                }
            }

            .time {
                font-size: 0.7rem;
                color: #999;
                padding-left: 0.2rem;
            }
        }
    }

    .is-mine {
        flex-direction: row-reverse;
    }

    .is-mine .content-wrapper {
        align-items: flex-end;

        .message-content {
            background-color: #c8eec9;
            align-self: flex-end;

        }

        .time {
            padding-left: 0;
            padding-right: 0.2rem !important;
        }

    }
}
</style>