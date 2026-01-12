<!-- ChatInput.vue -->
<template>
    <div class="chat-input-wrapper">
        <!-- 工具栏 -->
        <div class="toolbar">
            <div class="toolbar-item" v-for="category in emojiCategories" @click="toggleEmojiPicker(category)"
                :class="{ active: showEmojiPicker && currentCategory === category.id }">
                <span @click="handleCategoryChange(category)">{{ category.icon }}</span>
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

            <div class="emoji-grid" :class="{ 'text-emoji-grid': isTextEmojiCategory }">
                <div v-for="emoji in filteredEmojis" :key="emoji.id" class="emoji-item" @click="insertEmoji(emoji)">
                    <!-- 文字表情显示文字内容 -->
                    <div v-if="emoji.emojiType === 'text'" class="text-emoji-preview">
                        {{ emoji.emojiUrl }}
                    </div>
                    <!-- Lottie表情保持原有逻辑 -->
                    <div v-else class="emoji-preview" :ref="el => setEmojiRef(el, emoji.id)"></div>
                    <span v-if="emoji.name" class="emoji-name">{{ emoji.name }}</span>
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
import { ref, computed, nextTick, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import lottie from 'lottie-web';
const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;

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
const showEmojiPicker = ref(false); //容器
const currentCategory = ref('reactions'); //类别
const editableDiv = ref(null); //输入框结构
const contentText = ref(''); //内容
const loadingEmojis = ref(false); // 加载状态

// 判断当前分类是否为文字表情
const isTextEmojiCategory = computed(() => {
    const category = emojiCategories.find(cat => cat.id === currentCategory.value);
    return category ? category.em_type === 'text' : false;
});

const emojiCategories = [ // 表情分类
    { id: 'reactions', name: '反应', icon: '👍', em_type: 'text' },
    { id: 'emotions', name: '情绪', icon: '😬', em_type: 'text' },
    { id: 'animals', name: '动物', icon: '🐱', em_type: 'lottie' },
    { id: 'space', name: '人物', icon: '🕵🏻', em_type: 'lottie' }
];

const emojiItemList = ref([]); // 表情数据
const loadedCategories = new Set(); // 缓存已加载的分类，避免重复请求

const processEmojiData = (apiData, categoryId) => { // 处理接口返回的表情数据
    const emojiList = apiData.emoji_list || apiData || [];

    return emojiList.map(item => ({
        id: item.code || `${categoryId}_${Date.now()}_${Math.random()}`,
        name: item.name || '', // 不存在名字就为空
        category: categoryId,
        emojiType: item.em_type || 'lottie', // 默认为lottie类型
        preview: item.content,
        emojiUrl: item.content // 文字表情的内容
    }));
};

const getEmojisList = async (category) => {
    const categoryId = category.id || currentCategory.value;
    const emojiType = category.em_type || 'text';

    // 如果已经加载过该分类，直接返回
    if (loadedCategories.has(categoryId.value)) {
        return;
    }
    loadingEmojis.value = true;

    try {
        const response = await $http.get('/instansMessaging/im_emojis', {
            params: {
                category: categoryId,
                em_type: emojiType,
                is_active: 1
            }
        });

        if (response && response.result) {
            // 处理返回的表情数据
            const categoryEmojis = processEmojiData(response.result, categoryId);
            // 添加到表情列表中
            emojiItemList.value = [...emojiItemList.value, ...categoryEmojis];
            // 标记该分类已加载
            loadedCategories.add(categoryId);
        }
    } catch (error) {
        console.error(`获取 ${categoryId} 分类表情失败:`, error);
        // 可以在这里添加错误处理，比如显示错误提示
    } finally {
        loadingEmojis.value = false;
    }
};

//切换分类
const handleCategoryChange = async (category) => {
    currentCategory.value = category.id;
    if (!loadedCategories.has(category.id)) {
        await getEmojisList(category);
    }
}

const filteredEmojis = computed(() => { // 对应分类下的表情内容
    return emojiItemList.value.filter(item => item.category === currentCategory.value);
});

const hasContent = computed(() => { //判断输入框是否为空
    return contentText.value.trim().length > 0 || selectedFile.value;
});

const textMessagePlaceholder = computed(() => { //placeholder值
    return '输入回复... (Enter发送 | Shift+Enter换行)';
});

const toggleEmojiPicker = () => { //容器显示/隐藏控制
    showEmojiPicker.value = !showEmojiPicker.value;
};

const emojiRefs = new Map(); // Lottie实例存储
const animationInstances = new Map(); // 存储动画实例

const setEmojiRef = (el, emojiId) => { //渲染表情数据
    if (el) {
        emojiRefs.set(emojiId, el);
        const emojiItem = emojiItemList.value.find(e => e.id === emojiId);
        if (emojiItem) {
            // 如果动画实例不存在或者容器不匹配，重新初始化
            if (!animationInstances.has(emojiId) ||
                animationInstances.get(emojiId).container !== el) {
                // 清理旧的动画实例
                if (animationInstances.has(emojiId)) {
                    animationInstances.get(emojiId).destroy();
                    animationInstances.delete(emojiId);
                }
                initAnimation(el, emojiItem);
            }
        }
    } else {
        // 元素被卸载时清理引用
        emojiRefs.delete(emojiId);
    }
};

const initAnimation = (emojiElement, emojiItem) => { // 初始化动画
    if (!emojiElement) return;

    const animation = lottie.loadAnimation({
        container: emojiElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: emojiItem.emojiUrl,
    });
    animation.setSpeed(0.5);

    // 为动画实例添加容器引用，方便后续比较
    animation.container = emojiElement;
    animationInstances.set(emojiItem.id, animation);
};

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

        let insertedNode;
        if (emoji.emojiType === 'text') {
            // 文字表情：直接插入文本内容
            insertedNode = document.createTextNode(emoji.preview + ' '); // 加空格方便连续输入
        } else {
            // Lottie表情：插入占位符文本
            insertedNode = document.createTextNode(`[${emoji.name}]`);
        }

        range.insertNode(insertedNode);
        range.setStartAfter(insertedNode);
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

/** ------------------------ 内容处理 ------------------------ */
const updateContent = () => { // 更新内容
    if (!editableDiv.value) return;
    contentText.value = editableDiv.value.textContent || '';

};

const getContent = () => {
    if (!editableDiv.value) return { mixedContent: [] };

    const mixedContent = [];
    const textContent = editableDiv.value.textContent || '';

    // 使用正则表达式匹配占位符 [表情名]
    const emojiPattern = /\[([^\]]+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = emojiPattern.exec(textContent)) !== null) {
        // 添加匹配前的文本
        if (match.index > lastIndex) {
            const text = textContent.substring(lastIndex, match.index).trim();
            if (text) {
                mixedContent.push({
                    type: 'text',
                    content: text
                });
            }
        }

        // 查找对应的表情数据
        const emojiName = match[1];
        const emoji = emojiItemList.value.find(e => e.name === emojiName);

        if (emoji) {
            // 添加表情数据
            mixedContent.push({
                type: 'emoji',
                id: emoji.id,
                name: emoji.name,
                url: emoji.emojiUrl
            });
        } else {
            // 如果没有找到对应的表情，保留为文本
            mixedContent.push({
                type: 'text',
                content: match[0]
            });
        }

        lastIndex = emojiPattern.lastIndex;
    }

    // 添加剩余的文本
    if (lastIndex < textContent.length) {
        const text = textContent.substring(lastIndex).trim();
        if (text) {
            mixedContent.push({
                type: 'text',
                content: text
            });
        }
    }

    return { mixedContent };
};

function sendMessage() {

    const content = getContent();
    const mixedContent = content.mixedContent;

    if (mixedContent.length === 0 && !selectedFile.value) {
        alert('消息内容不能为空');
        return;
    }

    const messageData = {
        mixedContent: mixedContent, // 使用解析后的混合内容
        image: previewImage.value,
        timestamp: new Date().toISOString()
    };
    showEmojiPicker.value = false;//关闭表情选择器
    emit('send', messageData);
    clearInput();
    clearPreview();
};

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
onMounted(async () => {
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

        .toolbar-item {
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
            transition: background-color 0.2s;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;

            &:hover {
                background-color: #f0f0f0;
            }

            &.active {
                background-color: #e0e0e0;
            }

        }
    }

    // 图片选择预览区域
    .preview-area {
        width: 100%;
        padding: 0.5rem 0;

        .preview-container {
            position: relative;
            display: inline-block;

            .preview-img {
                max-width: 100px;
                max-height: 50px;
                border-radius: 4px;
                border: 1px solid #d9d9d9;
            }

            .close-btn {
                position: absolute;
                top: -4px;
                right: -4px;
                width: 12px;
                height: 12px;
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
        z-index: 100;
        padding: 12px;
        animation: slideDownRetourn 0.5s;

        @keyframes slideDownRetourn {
            from {
                opacity: 0;
                transform: translate3d(-10%, 10%, 0);
            }

            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }

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
                font-size: 16px;
                cursor: pointer;
                color: #ff0c0c;
                padding: 0;
                width: 18px;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: center;

                // &:hover {
                //     color: #ff0000;
                // }
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
                font-size: 18px;
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

        //通用表情布局
        .emoji-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            max-height: 200px;
            overflow-y: auto;
            transition: all ease 5s;

            .emoji-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 4px;
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

                //文字表情
                .text-emoji-preview {
                    font-size: 18px;
                    line-height: 1;
                    padding: 0.4rem 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

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

        //文字表情布局
        .text-emoji-grid {
            grid-template-columns: repeat(5, 1fr);
        }
    }

    .input-area {
        width: 100%;
        min-height: 5rem;

        .editable-input {
            width: 100%;
            min-height: 5rem;
            max-height: 8rem;
            padding: 8px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            font-size: 16px;
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
            font-size: 16px;
            padding: 6px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
            font-family: inherit;

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