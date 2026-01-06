<!-- ChatInput.vue -->
<template>
    <div class="chat-input-wrapper">
        <!-- 工具栏 -->
        <div class="toolbar">
            <div class="toolbar-item" @click="toggleEmojiPicker" :class="{ active: showEmojiPicker }">
                😊
            </div>
            <div class="toolbar-item" @click="uploadImage">
                🖼️
            </div>
        </div>

        <!-- 图片预览区域 -->
        <div v-if="previewImage" class="preview-area">
            <div class="preview-container">
                <img :src="previewImage" alt="图片预览" class="preview-img" />
                <span class="close-btn" @click="clearPreview" title="取消发送">×</span>
            </div>
        </div>

        <!-- 表情选择器 -->
        <div v-if="showEmojiPicker" class="emoji-picker">
            <div class="emoji-picker-header">
                <span>选择表情</span>
                <button class="close-btn" @click="showEmojiPicker = false">×</button>
            </div>

            <div class="emoji-categories">
                <button v-for="category in emojiCategories" :key="category.id"
                    :class="{ active: currentCategory === category.id }" @click="currentCategory = category.id">
                    {{ category.icon }}
                </button>
            </div>

            <div class="emoji-grid">
                <div v-for="emoji in filteredEmojis" :key="emoji.id" class="emoji-item" @click="insertEmoji(emoji)">
                    <div class="emoji-preview" :ref="el => setEmojiRef(el, emoji.id)"></div>
                    <span class="emoji-name">{{ emoji.name }}</span>
                </div>
            </div>
        </div>

        <!-- 输入区域 -->
        <div class="input-area">
            <div ref="editableDiv" class="editable-input" contenteditable="true" @input="onInput" @focus="onFocus"
                @blur="onBlur" @keydown="handleKeydown" @paste="onPaste" :placeholder="textMessagePlaceholder">
            </div>
        </div>

        <!-- 发送按钮 -->
        <div class="submit">
            <button class="btn send-btn" @click="sendMessage" :disabled="!hasContent">
                发送
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue';
import lottie from 'lottie-web';


// 定义事件
const emit = defineEmits(['send']);

/** ------------------------ 图片上传 ------------------------ */
const previewImage = ref(null);
const selectedFile = ref(null);

const uploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;
    input.onchange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('请选择图片文件');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('图片大小不能超过5MB');
                return;
            }

            selectedFile.value = file;
            const reader = new FileReader();
            reader.onload = () => {
                previewImage.value = reader.result;
            };
            reader.onerror = () => {
                alert('图片读取失败，请重试');
                clearPreview();
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
};

const clearPreview = () => {
    previewImage.value = null;
    selectedFile.value = null;
};

/** ------------------------ 表情选择器 ------------------------ */
const showEmojiPicker = ref(false);
const currentCategory = ref('reactions');
const editableDiv = ref(null);
const contentText = ref('');

// 表情分类
const emojiCategories = [
    { id: 'reactions', name: '反应', icon: '👍' },
    { id: 'emotions', name: '情绪', icon: '😊' },
    { id: 'animals', name: '动物', icon: '🐱' },
    { id: 'objects', name: '物品', icon: '🎁' }
];

// 表情数据
const emojis = [
    {
        id: 'cryingCat',
        name: '哭泣',
        category: 'emotions',
        url: '/lottie/LottieCryingCat.json',
        preview: '/lottie/LottieCryingCat.json',
    },
    {
        id: 'loveCat',
        name: '喜欢',
        category: 'emotions',
        url: '/lottie/LottieLoveCat.json',
        preview: '/lottie/LottieLoveCat.json',
    },
];

// 计算属性
const filteredEmojis = computed(() => {
    return emojis.filter(emoji => emoji.category === currentCategory.value);
});

const hasContent = computed(() => {
    return contentText.value.trim().length > 0 || selectedFile.value;
});

const textMessagePlaceholder = computed(() => {
    return '输入回复... (Enter发送 | Shift+Enter换行)';
});

// Lottie实例存储
const emojiRefs = new Map();
const animationInstances = new Map(); // 新增：存储动画实例

const toggleEmojiPicker = () => {
    showEmojiPicker.value = !showEmojiPicker.value;
};

const setEmojiRef = (el, emojiId) => {
    if (el) {
        emojiRefs.set(emojiId, el);
        const emoji = emojis.find(e => e.id === emojiId);
        if (emoji) {
            // 如果动画实例不存在或者容器不匹配，重新初始化
            if (!animationInstances.has(emojiId) ||
                animationInstances.get(emojiId).container !== el) {
                // 清理旧的动画实例
                if (animationInstances.has(emojiId)) {
                    animationInstances.get(emojiId).destroy();
                    animationInstances.delete(emojiId);
                }
                initAnimation(el, emoji);
            }
        }
    } else {
        // 元素被卸载时清理引用
        emojiRefs.delete(emojiId);
    }
};
// 初始化动画
const initAnimation = (emojiElement, emoji) => {
    if (!emojiElement) return;

    const animation = lottie.loadAnimation({
        container: emojiElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: emoji.preview || emoji.url,
    });
    animation.setSpeed(0.5);

    // 为动画实例添加容器引用，方便后续比较
    animation.container = emojiElement;
    animationInstances.set(emoji.id, animation);
};

// 插入表情函数
const insertEmoji = async (emoji) => {
    if (!editableDiv.value) return;

    editableDiv.value.focus();
    await nextTick();

    const selection = window.getSelection();
    let range;

    if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
    } else {
        range = document.createRange();
        range.selectNodeContents(editableDiv.value);
        range.collapse(false);
    }

    const savedRange = range.cloneRange();

    try {
        range.deleteContents();

        // 创建带有完整数据的span元素
        const span = document.createElement('span');
        span.className = 'emoji-marker';
        span.setAttribute('data-emoji-id', emoji.id);
        span.setAttribute('data-emoji-name', emoji.name);
        span.setAttribute('data-emoji-url', emoji.url);
        span.setAttribute('data-emoji-preview', emoji.preview);
        span.textContent = `[${emoji.name}]`; // 显示友好的名称

        range.insertNode(span);
        range.setStartAfter(span);
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);
    } catch (error) {
        console.error('插入表情失败:', error);
        selection.removeAllRanges();
        selection.addRange(savedRange);
    }

    const event = new Event('input', { bubbles: true });
    editableDiv.value.dispatchEvent(event);
    updateContent();
};
// 新增：更新内容函数
const updateContent = () => {
    if (!editableDiv.value) return;
    contentText.value = editableDiv.value.textContent || '';

};

// 获取内容
const getContent = () => {
    if (!editableDiv.value) return { text: '', emojis: [] };

    const text = editableDiv.value.textContent || '';
    const emojis = [];

    // 从DOM中提取表情数据
    const emojiElements = editableDiv.value.querySelectorAll('.emoji-marker');
    emojiElements.forEach(element => {
        emojis.push({
            id: element.getAttribute('data-emoji-id'),
            name: element.getAttribute('data-emoji-name'),
            url: element.getAttribute('data-emoji-url'),
            preview: element.getAttribute('data-emoji-preview')
        });
    });

    // 纯文本内容（移除表情标记）
    const pureText = Array.from(editableDiv.value.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE ||
            (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('emoji-marker')))
        .map(node => node.textContent)
        .join('')
        .trim();

    return {
        text: pureText,
        emojis: emojis,
        rawText: text
    };
};
// 发送消息
function sendMessage() {
    const content = getContent();
    console.log(content)
    if (!content.text && !content.rawText && !content.emojis.length && !selectedFile.value) {
        alert('消息内容不能为空');
        return;
    }

    const messageData = {
        text: content.text,
        emojis: content.emojis,
        rawText: content.rawText, // 传递原始文本
        image: previewImage.value,
        timestamp: new Date().toISOString()
    };

    console.log('发送消息:', messageData);
    emit('send', messageData);
    clearInput();
    clearPreview();
}

// 输入处理
const onInput = () => {
    updateContent();
};

const onFocus = () => {
    // 输入框获得焦点时的处理
};

const onBlur = () => {
    // 输入框失去焦点时的处理
};

const onPaste = async (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');

    if (!editableDiv.value) return;

    editableDiv.value.focus();
    await nextTick();

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        updateContent(); // 添加内容更新
    }
};



// 清空输入
const clearInput = () => {
    if (editableDiv.value) {
        editableDiv.value.innerHTML = '';
        contentText.value = '';
    }
};

// 键盘快捷键
function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    } else if (e.key === 'Enter' && e.shiftKey) {
        // Shift+Enter 换行
        e.preventDefault();
        document.execCommand('insertLineBreak');
    }
};

// 清理动画实例
const cleanupAnimations = () => {
    animationInstances.forEach(animation => {
        animation.destroy();
    });
    animationInstances.clear();
    emojiRefs.clear();
};

// 组件卸载时清理资源
onUnmounted(() => {
    cleanupAnimations();
    if (observer) {
        observer.disconnect();
    }
});
// dom观察器
let observer = null;

// MutationObserver
onMounted(() => {
    if (editableDiv.value) {
        editableDiv.value.focus();
    }

    observer = new MutationObserver(() => {
        // 直接调用updateContent，不需要setTimeout
        updateContent();
    });

    if (editableDiv.value) {
        observer.observe(editableDiv.value, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }
});
</script>

<style scoped lang="scss">
.chat-input-wrapper {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    font-family: 'gtpy';
    position: relative;

    .toolbar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 2rem;
        padding: 0.5rem 0;
        gap: 1rem;

        .toolbar-item {
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
            transition: background-color 0.2s;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                background-color: #f0f0f0;
            }

            &.active {
                background-color: #e0e0e0;
            }
        }
    }

    .preview-area {
        width: 100%;
        padding: 0.5rem 0;

        .preview-container {
            position: relative;
            display: inline-block;

            .preview-img {
                max-width: 200px;
                max-height: 150px;
                border-radius: 4px;
                border: 1px solid #d9d9d9;
            }

            .close-btn {
                position: absolute;
                top: -8px;
                right: -8px;
                width: 20px;
                height: 20px;
                background: #ff4d4f;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 14px;
                line-height: 1;
            }
        }
    }

    /* 表情选择器样式 */
    .emoji-picker {
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 300px;
        background: white;
        border: 1px solid #d9d9d9;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        padding: 12px;
        margin-bottom: 10px;

        .emoji-picker-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 14px;
            font-weight: bold;

            .close-btn {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                    color: #333;
                }
            }
        }

        .emoji-categories {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;

            button {
                padding: 6px 12px;
                border: 1px solid #e0e0e0;
                border-radius: 6px;
                background: white;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.2s;

                &:hover {
                    background: #f5f5f5;
                }

                &.active {
                    border-color: #1890ff;
                    background: #e6f7ff;
                }
            }
        }

        .emoji-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            max-height: 200px;
            overflow-y: auto;

            .emoji-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 8px;
                border-radius: 6px;
                cursor: pointer;
                transition: background-color 0.2s;
                -webkit-user-select: none;
                /* Safari */
                -moz-user-select: none;
                /* Firefox */
                -ms-user-select: none;
                /* Internet Explorer/Edge */
                user-select: none;

                &:hover {
                    background-color: #f5f5f5;
                }

                .emoji-preview {
                    width: 40px;
                    height: 40px;
                    margin-bottom: 4px;
                    -webkit-user-select: none;
                    /* Safari */
                    -moz-user-select: none;
                    /* Firefox */
                    -ms-user-select: none;
                    /* Internet Explorer/Edge */
                    user-select: none;
                }

                .emoji-name {
                    font-size: 12px;
                    color: #666;
                    -webkit-user-select: none;
                    /* Safari */
                    -moz-user-select: none;
                    /* Firefox */
                    -ms-user-select: none;
                    /* Internet Explorer/Edge */
                    user-select: none;
                }
            }
        }
    }

    .input-area {
        width: 100%;
        min-height: 5rem;

        .editable-input {
            width: 100%;
            min-height: 4rem;
            max-height: 8rem;
            padding: 8px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            font-size: 14px;
            line-height: 1.5;
            outline: none;
            overflow-y: auto;
            resize: vertical;
            background: white;
            display: flex;
            flex-direction: row;

            &:focus {
                border-color: #1890ff;
                box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
            }

            &:empty:before {
                content: attr(placeholder);
                color: #bfbfbf;
            }
        }
    }

    /* 表情样式 */
    .lottie-emoji {
        width: 40px;
        height: 40px;
    }

    .submit {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 0.5rem;

        .send-btn {
            background-color: #1890ff;
            color: white;
            border: none;
            font-size: 14px;
            padding: 6px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;

            &:hover:not(:disabled) {
                background-color: #40a9ff;
            }

            &:disabled {
                background-color: #d9d9d9;
                cursor: not-allowed;
            }
        }
    }
}
</style>