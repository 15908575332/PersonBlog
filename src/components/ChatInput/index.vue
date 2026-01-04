<!-- ChatInput.vue -->
<!-- 修改模板部分，添加图片预览 -->
<template>
    <div class="chat-input-wrapper">
        <div class="emoji">
            <div class="emoji-item">
                <img src="@/assets/icon/instantMessaging/icons8-emoji-64.png" alt="">
            </div>
            <div class="emoji-item" @click="uploadImage">
                <img src="@/assets/icon/instantMessaging/icons8-image-64.png" alt="">
            </div>
            <div class="emoji-item">
                <img src="@/assets/icon/instantMessaging/icons8-folder-64.png" alt="">
            </div>
            <div class="emoji-item">
                <img src="@/assets/icon/instantMessaging/icons8-screenshot-48.png" alt="">
            </div>
        </div>

        <!-- 图片预览区域 -->
        <div v-if="previewImage" class="preview-area">
            <div class="preview-container">
                <img class="preview-img" :src="previewImage" alt="">
                <span class="close-btn" @click="clearPreview" title="取消发送">×</span>
            </div>
        </div>

        <div class="input-area">
            <textarea v-model="textMessage" placeholder="输入回复..." rows="3" @keydown="handleKeydown"
                @keydown.enter.shift.prevent="textMessage += '\n'"></textarea>
        </div>

        <div class="submit">
            <button class="btn send-btn" @click="sendMessage" :disabled="!textMessage.trim() && !selectedFile">
                发送
            </button>
        </div>
    </div>
</template>

<script setup>
// 完善图片上传和预览逻辑
import { ref } from 'vue';

/** ------------------------ 图片上传 ------------------------ */
const previewImage = ref(null);
const selectedFile = ref(null);

const uploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false; // 单文件选择
    input.onchange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // 检查文件类型和大小
            if (!file.type.startsWith('image/')) {
                alert('请选择图片文件');
                return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB限制
                alert('图片大小不能超过5MB');
                return;
            }

            selectedFile.value = file;
            // 转换为Base64预览
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

/** ------------------------ 消息发送 ------------------------ */
const textMessage = ref('');
const emit = defineEmits(['send']);

function sendMessage() {
    if (!textMessage.value.trim() && !selectedFile.value) {
        alert('消息内容不能为空');
        return;
    }

    // 如果是图片消息，使用Base64数据
    let imageData = null;
    if (selectedFile.value && previewImage.value) {
        imageData = previewImage.value; // 直接使用Base64数据
    }

    const messageData = {
        text: textMessage.value.trim(),
        image: imageData
    };

    // 发送消息（包含文本和图片）
    emit('send', messageData);

    // 重置状态
    textMessage.value = '';
    clearPreview();
}

// 添加键盘快捷键支持
function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}
</script>

<style scoped lang="scss">
.chat-input-wrapper {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    font-family: 'gtpy';

    .emoji {
        @include flexCenter(row, flex-start);
        width: 100%;
        height: 2rem;
        padding: 0.5rem 0;
        gap: 1rem;

        img {
            width: 1.2rem;
            height: 1.2rem;
            cursor: pointer;
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

    .input-area {
        width: 100%;
        height: 5rem;

        textarea {
            width: 100%;
            height: 95%;
            border-radius: 4px;
            font-size: 16px;
            resize: none;
            outline: none;
            border: none;
            font-family: inherit;
        }
    }

    .submit {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .send-btn {
            background-color: #1890ff;
            color: white;
            border: none;
            font-size: 0.8rem;
            padding: 0.1rem 0.6rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }

        .send-btn:hover {
            background-color: #40a9ff;
        }
    }
}
</style>