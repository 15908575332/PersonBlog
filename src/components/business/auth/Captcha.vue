<template>
    <div class="captcha-container">
        <div class="captcha-header">
            <span>请完成安全验证</span>
            <button @click="refreshCaptcha" class="refresh-btn">🔄</button>
        </div>

        <div class="captcha-body">
            <div class="captcha-image" @click="refreshCaptcha">
                <canvas ref="canvasRef" width="120" height="40"></canvas>
            </div>

            <div class="captcha-input">
                <input type="text" v-model="inputCode" placeholder="请输入验证码" maxlength="4"
                    @keyup.enter="validateCaptcha" />
                <button @click="validateCaptcha" class="confirm-btn">验证</button>
            </div>
        </div>

        <div v-if="errorMessage" class="error-message">*{{ errorMessage }}</div>
        <div v-else class="error-message">*不区分大小写</div>
    </div>
</template>

<script setup>
import { message } from 'ant-design-vue';
import { ref, onMounted } from 'vue';

const props = defineProps({
    onSuccess: Function,
    onCancel: Function
});

const canvasRef = ref(null);
const inputCode = ref('');
const captchaCode = ref('');
const errorMessage = ref('');

// 生成随机验证码
function generateCaptcha() {
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    captchaCode.value = code;
    drawCaptcha(code);
}

// 绘制验证码到canvas
function drawCaptcha(code) {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 背景色
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制文字
    for (let i = 0; i < code.length; i++) {
        ctx.save();
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = getRandomColor();
        ctx.translate(20 + i * 25, 25);
        ctx.rotate((Math.random() - 0.5) * 0.4);
        ctx.fillText(code[i], 0, 0);
        ctx.restore();
    }

    // 绘制干扰线
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = getRandomColor();
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function getRandomColor() {
    const colors = ['#f24056', '#409eff', '#67c23a', '#e6a23c', '#909399'];
    return colors[Math.floor(Math.random() * colors.length)];
}


// 错误计数
const errorCount = ref(1);
// 刷新验证码
function refreshCaptcha() {
    inputCode.value = '';
    errorMessage.value = '';
    errorCount.value = 1; // 重置错误计数
    generateCaptcha();
}

// 验证码
function validateCaptcha() {
    if (!inputCode.value) {
        message.warning('请输入验证码');
        return;
    }

    if (inputCode.value.toUpperCase() !== captchaCode.value.toUpperCase()) {
        errorMessage.value = '验证码错误' + errorCount.value + '次';

        inputCode.value = '';

        errorCount.value++;
        if (errorCount.value >= 3) {
            message.loading({
                content: '刷新验证码...',
                duration: 1,
                onClose() {
                    refreshCaptcha();
                }
            })
            errorCount.value = 0;
        }
        return;
    }

    // 验证成功
    errorCount.value = 0;
    errorMessage.value = '';
    props.onSuccess?.(inputCode.value);
}

onMounted(() => {
    generateCaptcha();
});
</script>

<style scoped lang="scss">
.captcha-container {
    padding: 20px;
    background: $general-white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
    color: #333;
    width: 100%;

    .refresh-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
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
        outline: 1px solid #ccc;
        height: 100%;
        font-family: inherit;
    }

    .confirm-btn {
        display: inline-block;
        padding: 6px 12px;
        background: #f24056;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-family: inherit;
    }

}

.error-message {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    color: #f24056;
    font-size: 0.6rem;
}
</style>