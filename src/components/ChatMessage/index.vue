<template>
    <div class="chat-messages" ref="scrollContainer" @scroll="handleScroll">
        <div v-for="msg in messages" :key="msg.id" :class="['message-bubble', { 'is-mine': msg.isMine }]">
            <div class="avatar">
                <img :src="msg.avatar" alt="avatar" class="avatar-icon" />
            </div>
            <div class="content-wrapper">
                <!-- 图片消息 -->
                <div v-if="msg.image" class="image-message">
                    <img class="message-image" :src="msg.image" @click="previewImage(msg.image)" alt="img">
                    <div class="image-loading" v-if="imageLoading[msg.id]">加载中...</div>
                </div>

                <!-- 消息内容区域 -->
                <div v-if="msg.content || (msg.emojis && msg.emojis.length)" class="message-content">
                    <!-- 文本内容 -->
                    <span class="text-content">{{ msg.content }}</span>
                    <!-- 表情内容 -->
                    <div v-if="msg.emojis && msg.emojis.length" class="emojis-container">
                        <div v-for="(emoji, index) in msg.emojis" :key="index" class="emoji-item">
                            <div class="lottie-emoji" :ref="el => setEmojiRef(el, msg.id, index, emoji.id, emoji.url)">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, ref, nextTick, onMounted, onUnmounted, defineExpose } from 'vue';
import lottie from 'lottie-web';

const props = defineProps({
    messages: {
        type: Array,
        default: () => []
    }
});
console.log('props:' + props)
// 默认头像
const getDefaultAvatar = () => {
    return '/src/assets/icon/instantMessaging/icons8-people-48.png';
};

// 头像加载错误处理
const handleAvatarError = (event) => {
    event.target.src = getDefaultAvatar();
};

// 图片加载状态
const imageLoading = ref({});

// 图片预览
const previewImage = (imageUrl) => {
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

// 时间格式化
function formatTime(timeString) {
    if (!timeString) return '';

    try {
        const date = new Date(timeString);
        return date.toLocaleString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    } catch (error) {
        console.error('时间格式化错误:', error);
        return '时间错误';
    }
}

// Lottie 动画相关
const emojiRefs = new Map();
const animationInstances = new Map();

// 修改表情引用设置方法
const setEmojiRef = (el, msgId, emojiIndex, emojiId, emojiUrl) => {
    if (el && emojiUrl) {
        const uniqueKey = `${msgId}-${emojiIndex}-${emojiId}`;
        if (!animationInstances.has(uniqueKey)) {
            initAnimation(el, uniqueKey, emojiUrl);
        }
    }
};

// 修改动画初始化方法
const initAnimation = (emojiElement, uniqueKey, emojiUrl) => {
    if (!emojiElement || !emojiUrl) return;

    try {
        const animation = lottie.loadAnimation({
            container: emojiElement,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: emojiUrl,
        });
        animation.setSpeed(0.8);
        animationInstances.set(uniqueKey, animation);
    } catch (error) {
        console.error('表情动画加载失败:', error);
    }
};

// 添加清理特定消息动画的方法
const cleanupMessageAnimations = (msgId) => {
    const keysToDelete = [];
    animationInstances.forEach((animation, key) => {
        if (key.startsWith(`${msgId}-`)) {
            try {
                animation.destroy();
            } catch (error) {
                console.error('清理动画实例失败:', error);
            }
            keysToDelete.push(key);
        }
    });
    keysToDelete.forEach(key => animationInstances.delete(key));
};

// 修改消息监听，清理旧消息的动画
watch(() => props.messages, (newMessages, oldMessages) => {
    // 清理已删除消息的动画
    if (oldMessages.length > newMessages.length) {
        const remainingIds = new Set(newMessages.map(msg => msg.id));
        oldMessages.forEach(oldMsg => {
            if (!remainingIds.has(oldMsg.id)) {
                cleanupMessageAnimations(oldMsg.id);
            }
        });
    }
    forceScrollToBottom();
}, { deep: true });

// 处理滚动事件
const scrollContainer = ref('');
function forceScrollToBottom() {
    nextTick(() => {
        const container = scrollContainer.value;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behvior: 'smooth'
            })
        }
    })
};
function handleScroll() {
    // 可以根据需要实现滚动加载更多
}

// 暴露方法给父组件
defineExpose({
    forceScrollToBottom
});

// 监听消息变化
// watch(() => props.messages, () => {
//     forceScrollToBottom();
// }, { deep: true });

// 组件挂载时滚动到底部
onMounted(() => {
    forceScrollToBottom();
});

// 组件卸载时清理资源
onUnmounted(() => {
    cleanupAnimations();
});
</script>

<style scoped lang="scss">
.chat-messages {
    padding: 0.5rem 1rem;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .message-bubble {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 0.5rem 0;
        margin: 0.5rem 0;

        .avatar {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            .avatar-icon {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                object-fit: cover;
                background-color: #f0f0f0;
            }
        }

        .content-wrapper {
            max-width: 70%;
            min-width: 60px;
            overflow: hidden;

            .message-content {
                background-color: #58f614;
                border-radius: 0.4rem;
                font-size: 0.9rem;
                text-align: center;
                line-height: 1.2;
                padding: 0.4rem;

                .text-content {
                    display: inline;
                    width: 100%;
                }

                .emojis-container {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 0.2rem;
                    vertical-align: middle;

                    // 每个emoji表情
                    .emoji-item {
                        @include flexCenter(row, center);

                        .lottie-emoji {
                            width: 40px;
                            height: 40px;

                            /* 确保SVG正确渲染 */
                            svg {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }

            .time {
                font-size: 0.7rem;
                color: #999;
                margin-top: 0.2rem;
                padding: 0 0.5rem;
            }

            // 图片消息样式
            .image-message {
                margin-bottom: 0.5rem;

                .message-image {
                    max-width: 200px;
                    max-height: 200px;
                    border-radius: 0.5rem;
                    cursor: zoom-in;
                    border: 1px solid #e8e8e8;
                    background-color: #f9f9f9;
                }
            }
        }

        // 自己发送的消息
        &.is-mine {
            flex-direction: row-reverse;
            align-self: flex-end;
            width: 100%;

            .content-wrapper {
                align-items: flex-end;

                .message-content {
                    background-color: #1890ff;
                    color: white;
                }

                .time {
                    text-align: right;
                }
            }
        }
    }
}
</style>