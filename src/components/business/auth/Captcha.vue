<template>
    <div class="captcha-container">
        <div class="captcha-header">
            <span>{{ title }}</span>
            <button class="refresh-btn" :disabled="loading" @click="refreshCaptcha">换一张</button>
        </div>

        <div class="captcha-body">
            <div class="captcha-image" @click="refreshCaptcha">
                <img v-if="codeImage" :src="codeImage" alt="图形验证码" width="120" height="40" />
                <span v-else class="captcha-tip">{{ loading ? '加载中...' : '点击重试' }}</span>
            </div>

            <div class="captcha-input">
                <input type="text" v-model.trim="inputCode" placeholder="请输入验证码" maxlength="4"
                    autocomplete="off" @keyup.enter="submitCaptcha" />
                <button @click="submitCaptcha" class="confirm-btn" :disabled="loading">验证</button>
            </div>
        </div>

        <div class="error-message">{{ errorMessage || '不区分大小写' }}</div>
    </div>
</template>

<script setup>
// 图形验证码组件（服务端版）：图片与答案由后端生成，前端只负责采集并回传 captchaId + captchaCode
import { message } from 'ant-design-vue';
import { ref, onMounted } from 'vue';
import request from '@/api/http';

const props = defineProps({
    title: { type: String, default: '请完成安全验证' },
    onSuccess: Function,
    onCancel: Function
});

const captchaId = ref('');
const codeImage = ref('');
const inputCode = ref('');
const errorMessage = ref('');
const loading = ref(false);

// 重新申请验证码：旧 captchaId 由后端按 TTL 自然淘汰
const refreshCaptcha = async () => {
    loading.value = true;
    errorMessage.value = '';
    inputCode.value = '';
    try {
        const data = await request.get('/user/captcha');
        captchaId.value = data.captchaId;
        codeImage.value = data.codeImage;
    } catch (error) {
        captchaId.value = '';
        codeImage.value = '';
        errorMessage.value = error.response?.data?.message || '加载失败，请点击重试';
    } finally {
        loading.value = false;
    }
};

// 本地只做非空与位数校验，真伪交给登录/注册接口的服务端校验
const submitCaptcha = () => {
    if (loading.value) return;
    if (!inputCode.value) {
        message.warning('请输入验证码');
        return;
    }
    if (inputCode.value.length !== 4) {
        errorMessage.value = '请输入 4 位验证码';
        return;
    }
    if (!captchaId.value) {
        refreshCaptcha();
        return;
    }
    errorMessage.value = '';
    props.onSuccess?.({ captchaId: captchaId.value, captchaCode: inputCode.value });
};

onMounted(refreshCaptcha);
</script>

<style scoped lang="scss">
.captcha-container {
    padding: 20px;
    background: var(--bg-surface);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(var(--mask-rgb), 0.15);
    min-height: 25vh;
    min-width: 30vw;
    @include flexCenter(column, flex-start);
    gap: 1rem;
}

.captcha-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: var(--text-color);
    width: 100%;

    .refresh-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 0.8rem;
        font-family: var(--app-font-family);
        color: var(--primary-sub);

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
}

.captcha-body {
    @include flexCenter(row, space-between);
    padding: 1rem 0;
    width: 100%;
    font-size: 16px;
    font-family: var(--app-font-family);
    gap: 0.5rem;
}

.captcha-image {
    cursor: pointer;
    border-radius: 4px;
    height: 40px;
    min-width: 120px;
    outline: 1px solid var(--border-strong);
    overflow: hidden;

    img {
        display: block;
        height: 40px;
        width: 120px;
    }

    .captcha-tip {
        display: block;
        line-height: 40px;
        text-align: center;
        // font-size: 0.6rem;
        color: var(--text-color);
    }
}

.captcha-input {
    display: flex;
    gap: 0.4rem;
    flex: 1;
    height: 2rem;
    font-family: var(--app-font-family);

    input {
        flex: 1;
        padding: 10px;
        border-radius: 4px;
        outline: 1px solid var(--border-strong);
        height: 100%;
        font-family: inherit;
    }

    .confirm-btn {
        display: inline-block;
        padding: 6px 12px;
        background: var(--primary-sub);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-family: inherit;

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
}

.error-message {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    color: var(--primary-sub);
    font-size: 0.8rem;
}
</style>
