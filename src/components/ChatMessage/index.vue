<template>
    <div class="chat-messages" ref="scrollContainer" @scroll="handleScroll">
        <div v-for="msg in messages" :key="msg.id" :class="['message-bubble', { 'is-mine': msg.isMine }]">
            <div class="avatar">
                <img :src="msg.avatar" alt="avatar" class="avatar-icon" />
            </div>
            <div class="content-wrapper">
                <p class="time">{{ formatTime(msg.time) }}</p>
                <p class="message-content">{{ msg.content }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, ref, nextTick, onMounted } from 'vue';

const props = defineProps({
    messages: {
        type: Array,
        default: () => []
    }
});

// 处理图片URL（如果是File对象则创建临时URL）
const getImageUrl = (imageData) => {
    if (typeof imageData === 'string') {
        return imageData // 已经是Base64或URL
    } else if (imageData instanceof File) {
        return URL.createObjectURL(imageData) // 创建临时URL
    }
    return ''
}

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
    const threshold = 100; // 距离底部100px以内算作底部
    return container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;
}

// 平滑滚动到底部
function scrollToBottom() {
    nextTick(() => {
        const container = scrollContainer.value;
        if (container && isNearBottom()) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
}

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
    scrollToBottom();
});
</script>

<style scoped lang="scss">
.chat-messages {
    height: 50vh;
    padding: 0.5rem;
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .message-bubble {
        @include flexCenter(row, flex-start);
        margin-bottom: 0.5rem;
        gap: 0.5rem;

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