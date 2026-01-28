<template>
    <div class="chat-messages" ref="scrollContainer" @scroll="handleScroll">
        <div v-for="msg in messages" :key="msg.id"
            :class="['message-bubble', { 'is-mine': msg.rawMessage.sender_id === userStore.user.userId }]">
            <div class="avatar">
                <img :src="msg.avatar" alt="avatar" @error="handleAvatarError" class="avatar-icon" />
            </div>
            <div class="content-wrapper">
                <p class="sender-name" v-if="showSenderName && !msg.rawMessage.sender_id === userStore.user.userId"
                    :class="{ 'is-mine': msg.rawMessage.sender_id === userStore.user.userId }">{{
                        msg.sender }}
                </p>
                <!-- 图片消息 -->
                <div v-if="msg.image" class="image-message">
                    <img class="message-image" :src="msg.image" @click="previewImage(msg.image)" alt="img">
                    <div class="image-loading" v-if="imageLoading[msg.id]">加载中...</div>
                </div>
                <!-- 混合内容消息 -->
                <div v-if="msg.mixedContent && msg.mixedContent.length" class="message-item">
                    <template v-for="(item, index) in msg.mixedContent" :key="index">
                        <!-- 文本内容 -->
                        <span v-if="item.type === 'text'" class="text-item">{{ item.content }}</span>
                        <!-- 表情内容 - 只显示动画 -->
                        <div v-else-if="item.type === 'emoji'" class="emoji-item">
                            <div class="lottie-emoji" :style="{ width: '100px', height: '100px' }"
                                :ref="el => setEmojiRef(el, msg.id, index, item.id, item.url)">
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, ref, nextTick, onMounted, onUnmounted, defineExpose } from 'vue';
import lottie from 'lottie-web';
import { useAuthStore } from '@/store/auth';
const userStore = useAuthStore(); //当前登录用户信息

const props = defineProps({
    messages: {  //聊天内容
        type: Array,
        default: () => []
    },

    showSenderName: {
        type: Boolean,
        default: false, //默认不显示用户名，在聊天详情中
    }
});

watch(() => props.showSenderName, (newVal) => {
    props.showSenderName = newVal;
})

/** ------------------------ 头像 ------------------------ */
const imageLoading = ref({});  // 图片加载状态

const getDefaultAvatar = () => { //默认头像
    return '/src/assets/icon/instantMessaging/icons8-people-48.png';
};

const handleAvatarError = (event) => { // 头像加载错误处理
    event.target.src = getDefaultAvatar();
};

const previewImage = (imageUrl) => { //图片预览
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

/** ------------------------ 表情相关 ------------------------ */
const animationInstances = new Map(); //动画实例

const setEmojiRef = (el, msgId, emojiIndex, emojiId, emojiUrl) => { // 表情引用设置方法
    if (el && emojiUrl) {
        const uniqueKey = `${msgId}-${emojiIndex}-${emojiId}`;

        if (!animationInstances.has(uniqueKey)) {
            initAnimation(el, uniqueKey, emojiUrl);
        }
    }
};

const initAnimation = (emojiElement, uniqueKey, emojiUrl) => { // 动画初始化
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

const cleanupMessageAnimations = (msgId) => { // 清理特定消息动画的
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

watch(() => props.messages, (newMessages, oldMessages) => { // 修改消息监听，清理旧消息的动画
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

/** ------------------------ 滚动事件 ------------------------ */
const scrollContainer = ref(''); //滚动结构
function forceScrollToBottom() {
    nextTick(() => {
        const container = scrollContainer.value;
        if (container) {
            let retryCount = 0;
            const maxRetries = 3;

            const scroll = () => {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });

                // 检查是否需要重试
                const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
                if (!isAtBottom && retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(scroll, 10 * retryCount); // 递增延迟
                }
            };

            scroll();
        }
    });
}

function handleScroll() {
    // 可以根据需要实现滚动加载更多
}

defineExpose({ // 暴露方法给父组件
    forceScrollToBottom
});

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
};

onMounted(() => {
    forceScrollToBottom(); // 组件挂载时滚动到底部
});

onUnmounted(() => {
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
        padding: 0.4rem 0;

        .avatar {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            .avatar-icon {
                width: 35px;
                height: 35px;
                border-radius: 0.2rem;
                object-fit: cover;
                background-color: #f0f0f0;
            }
        }

        .content-wrapper {
            max-width: 70%;
            min-width: 60px;
            // overflow: hidden;
            display: flex;
            flex-direction: column;

            //消息发送人名
            .sender-name {
                font-size: 0.8rem;
                color: $color-1;
                display: inline-block;
            }

            //每条聊天记录框
            .message-item {
                width: fit-content;
                font-size: 0.8rem;
                padding: 0.2rem 0.4rem;
                @include flexCenter(row, center);
                justify-content: flex-start;
                flex-wrap: wrap;
                max-width: 100%;
                color: $general-black;
                line-height: 25px;
                position: relative;
                border: 10px solid transparent;
                border-image: url('@/assets/img/instantMessaging/fIcEuLlnl.png') 400 round;

                .text-item {
                    display: inline-block;
                    border-radius: 0.5rem;
                }

                .emoji-item {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    max-width: 100px;
                    max-height: 100px;

                    .lottie-emoji {

                        overflow: hidden;

                        svg {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }

            // 图片消息样式
            .image-message {
                margin-bottom: 0.5rem;

                .message-image {
                    max-width: 150px;
                    max-height: 150px;
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

                p {
                    text-align: right;
                    padding: 0 0.2rem;
                }

                .message-item {
                    // border: 10px solid transparent;
                    border-image: url('@/assets/img/instantMessaging/fIgM4RBOc.png') 200 round;

                    &::before {
                        display: none;
                    }

                }
            }
        }
    }
}
</style>