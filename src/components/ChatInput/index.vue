<!-- ChatInput.vue -->
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
        <div class="input-area">
            <textarea v-model="textMessage" placeholder="输入回复..." rows="3"
                @keydown.enter.prevent="sendMessage"></textarea>
            <div v-if="previewImage" class="preview-image">
                <span class="close-btn" @click="clearPreview"></span>
            </div>
        </div>
        <div class="submit">
            <button class="btn send-btn" @click="sendMessage">发送</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

/** ------------------------ 图片上传 ------------------------ */
const previewImage = ref(null);
const selectedFile = ref(null);

const uploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            selectedFile.value = file;
            // 转换为Base64预览
            const reader = new FileReader();
            console.log(reader);
            reader.onload = () => {
                previewImage.value = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
};
const clearPreview = () => { //关闭预览
    previewImage.value = '';
    selectedFile.value = null;
};

/** ------------------------ 消息发送 ------------------------ */
const textMessage = ref('');
const emit = defineEmits(['send']);
function sendMessage() {
    if (!textMessage.value.trim() && !selectedFile.value) return;

    const messageData = {
        text: textMessage.value.trim(),
        image: selectedFile.value ? selectedFile.value : null
    };

    // 发送消息（包含文本和图片）
    emit('send', messageData);

    // 重置状态
    textMessage.value = '';
    clearPreview();
}
</script>

<style scoped lang="scss">
.chat-input-wrapper {
    @include flexCenter(column, space-between);
    width: 100%;
    background-color: #fff;
    padding: 1rem;

    .emoji {
        @include flexCenter(row, flex-start);
        width: 100%;
        height: 40px;
        padding: 0.5rem 0;
        gap: 1rem;

        img {
            width: 26px;
            height: 26px;
            cursor: pointer;
        }
    }

    .input-area {
        width: 100%;
        height: 5.5rem;
        margin: 0.5rem 0;

        textarea {
            width: 100%;
            height: 95%;
            border-radius: 4px;
            font-size: 14px;
            resize: none;
            outline: none;
            border: none;
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
            padding: 0.2rem 1rem;
            border-radius: 4px;
            cursor: pointer;
        }

        .send-btn:hover {
            background-color: #40a9ff;
        }
    }
}
</style>