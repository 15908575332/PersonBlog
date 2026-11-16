<template>
    <form action="#" class="main" :class="{ 'on-start': isOnstart, 'document-loaded': isOnloaded }" @submit.prevent>
        <div class="form">
            <!-- 启动遮罩 -->
            <div class="form__cover"></div>
            <!-- 加载动画 -->
            <div class="form__loader">
                <div class="spinner">
                    <svg class="spinner__circular" viewBox="25 25 50 50">
                        <circle class="spinner__path" cx="50" cy="50" r="20" fill="none" stroke-width="4"
                            stroke-miterlimit="10"></circle>
                    </svg>
                </div>
            </div>
            <!-- 主体 -->
            <div class="form__content">
                <!-- 成功状态 -->
                <template v-if="isSuccess">
                    <div class="success-state">
                        <div class="success-icon">
                            <svg viewBox="0 0 52 52" class="success-icon__checkmark">
                                <circle class="success-icon__circle" cx="26" cy="26" r="25" fill="none" />
                                <path class="success-icon__check" fill="none" d="M14 27l7 7 16-16" />
                            </svg>
                        </div>
                        <h2 class="success-title">密码重置成功</h2>
                        <p class="success-sub">您现在可以使用新密码登录了</p>
                        <button type="button" class="styled-button" @click="goLogin">
                            <span class="styled-button__real-text-holder">
                                <span class="styled-button__real-text">去登录</span>
                                <span class="styled-button__moving-block face">
                                    <span class="styled-button__text-holder">
                                        <span class="styled-button__text">去登录</span>
                                    </span>
                                </span>
                                <span class="styled-button__moving-block back">
                                    <span class="styled-button__text-holder">
                                        <span class="styled-button__text">去登录</span>
                                    </span>
                                </span>
                            </span>
                        </button>
                    </div>
                </template>

                <template v-else>
                    <h1 :class="{ 'title--small': step === 2 }">{{ step === 1 ? '重置密码' : '设置新密码' }}</h1>

                    <!-- 步骤指示器 -->
                    <div class="step-indicator">
                        <span v-for="(s, idx) in ['验证身份', '设置新密码']" :key="idx" class="step-dot"
                            :class="{ active: step === idx + 1, done: step > idx + 1 }"
                            @click="step > idx + 1 ? step = idx + 1 : null">
                            {{ step > idx + 1 ? '&#10003;' : idx + 1 }}
                        </span>
                        <span class="step-line"></span>
                    </div>

                    <!-- Step 1 -->
                    <div v-if="step === 1" class="step-form">
                        <div class="styled-input" :class="{ filled: accountFilled }">
                            <input type="text" class="styled-input__input" v-model="account" ref="accountInputRef"
                                @focus="onAccountFocus" @blur="onAccountBlur">
                            <div class="styled-input__placeholder">
                                <span class="styled-input__placeholder-text">
                                    <span v-for="(char, i) in accountLetters" :key="i" class="letter"
                                        :class="{ active: accountActiveMap[i] }">{{ char }}</span>
                                </span>
                            </div>
                            <div class="styled-input__circle"></div>
                        </div>

                        <div class="form-row">
                            <div class="styled-input form-row__input" :class="{ filled: codeFilled }">
                                <input type="text" class="styled-input__input" v-model="code" ref="codeInputRef"
                                    @focus="onCodeFocus" @blur="onCodeBlur">
                                <div class="styled-input__placeholder">
                                    <span class="styled-input__placeholder-text">
                                        <span v-for="(char, i) in codeLetters" :key="i" class="letter"
                                            :class="{ active: codeActiveMap[i] }">{{ char }}</span>
                                    </span>
                                </div>
                                <div class="styled-input__circle"></div>
                            </div>
                            <button type="button" class="code-btn" :disabled="countdown > 0 || !isAccountValid"
                                @click="sendCode">
                                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                            </button>
                        </div>

                        <div class="form-row">
                            <div class="styled-input form-row__input" :class="{ filled: captchaFilled }">
                                <input type="text" class="styled-input__input captcha-input" v-model="captchaInput"
                                    maxlength="4" ref="captchaInputRef" @focus="onCaptchaFocus" @blur="onCaptchaBlur">
                                <div class="styled-input__placeholder">
                                    <span class="styled-input__placeholder-text">
                                        <span v-for="(char, i) in captchaLetters" :key="i" class="letter"
                                            :class="{ active: captchaActiveMap[i] }">{{ char }}</span>
                                    </span>
                                </div>
                                <div class="styled-input__circle"></div>
                            </div>
                            <span class="captcha-display" @click="generateCaptcha" title="点击刷新">{{ captcha }}</span>
                        </div>

                        <div class="btn-row">
                            <button type="button" class="styled-button styled-button--secondary" @click="goLogin">
                                <span class="styled-button__real-text-holder">
                                    <span class="styled-button__real-text">返回登录</span>
                                    <span class="styled-button__moving-block face">
                                        <span class="styled-button__text-holder">
                                            <span class="styled-button__text">返回登录</span>
                                        </span>
                                    </span>
                                    <span class="styled-button__moving-block back">
                                        <span class="styled-button__text-holder">
                                            <span class="styled-button__text">返回登录</span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button type="button" class="styled-button" @click="onStepOneSubmit">
                                <span class="styled-button__real-text-holder">
                                    <span class="styled-button__real-text">下一步</span>
                                    <span class="styled-button__moving-block face">
                                        <span class="styled-button__text-holder">
                                            <span class="styled-button__text">下一步</span>
                                        </span>
                                    </span>
                                    <span class="styled-button__moving-block back">
                                        <span class="styled-button__text-holder">
                                            <span class="styled-button__text">下一步</span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div v-else class="step-form">
                        <div class="styled-input" :class="{ filled: newPasswordFilled }">
                            <input type="password" class="styled-input__input" v-model="newPassword"
                                ref="newPasswordInputRef" @focus="onNewPasswordFocus" @blur="onNewPasswordBlur">
                            <div class="styled-input__placeholder">
                                <span class="styled-input__placeholder-text">
                                    <span v-for="(char, i) in newPasswordLetters" :key="i" class="letter"
                                        :class="{ active: newPasswordActiveMap[i] }">{{ char }}</span>
                                </span>
                            </div>
                            <div class="styled-input__circle"></div>
                        </div>

                        <div class="styled-input" :class="{ filled: confirmPasswordFilled }">
                            <input type="password" class="styled-input__input" v-model="confirmPassword"
                                ref="confirmPasswordInputRef" @focus="onConfirmPasswordFocus"
                                @blur="onConfirmPasswordBlur">
                            <div class="styled-input__placeholder">
                                <span class="styled-input__placeholder-text">
                                    <span v-for="(char, i) in confirmPasswordLetters" :key="i" class="letter"
                                        :class="{ active: confirmPasswordActiveMap[i] }">{{ char }}</span>
                                </span>
                            </div>
                            <div class="styled-input__circle"></div>
                        </div>

                        <div class="btn-row">
                            <button type="button" class="styled-button styled-button--secondary" @click="step = 1">
                                <span class="styled-button__real-text-holder">
                                    <span class="styled-button__real-text">上一步</span>
                                    <span class="styled-button__moving-block face">
                                        <span class="styled-button__text-holder">
                                            <span class="styled-button__text">上一步</span>
                                        </span>
                                    </span>
                                    <span class="styled-button__moving-block back">
                                        <span class="styled-button__text-holder">
                                            <span class="styled-button__text">上一步</span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button type="button" class="styled-button" @click="onStepTwoSubmit">
                                <span class="styled-button__real-text-holder">
                                    <span class="styled-button__real-text">确认修改</span>
                                    <span class="styled-button__moving-block face">
                                        <span class="styled-button__text-holder">
                                            <span class="styled-button__text">确认修改</span>
                                        </span>
                                    </span>
                                    <span class="styled-button__moving-block back">
                                        <span class="styled-button__text-holder">
                                            <span class="styled-button__text">确认修改</span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { message, notification } from 'ant-design-vue';

const router = useRouter();

/* ===== 入场动画状态 ===== */
const isOnstart = ref(false);
const isOnloaded = ref(false);

/* ===== 步骤与成功状态 ===== */
const step = ref(1);
const isSuccess = ref(false);

/* ===== Step1 数据 ===== */
const account = ref('');
const code = ref('');
const codeSent = ref('');
const countdown = ref(0);
let timer = null;
const captcha = ref('');
const captchaInput = ref('');

/* ===== Step2 数据 ===== */
const newPassword = ref('');
const confirmPassword = ref('');

/* ===== 输入框 letter 数组 ===== */
const accountLetters = [...'邮箱或手机号'];
const codeLetters = [...'请输入验证码'];
const captchaLetters = [...'图形验证码'];
const newPasswordLetters = [...'请输入新密码（不少于6位）'];
const confirmPasswordLetters = [...'请再次输入新密码'];

/* ===== activeMap（逐字母动画） ===== */
const accountActiveMap = reactive({});
const codeActiveMap = reactive({});
const captchaActiveMap = reactive({});
const newPasswordActiveMap = reactive({});
const confirmPasswordActiveMap = reactive({});

/* ===== filled 状态 ===== */
const accountFilled = ref(false);
const codeFilled = ref(false);
const captchaFilled = ref(false);
const newPasswordFilled = ref(false);
const confirmPasswordFilled = ref(false);

/* ===== inputRef ===== */
const accountInputRef = ref(null);
const codeInputRef = ref(null);
const captchaInputRef = ref(null);
const newPasswordInputRef = ref(null);
const confirmPasswordInputRef = ref(null);

/* ===== 计算属性 ===== */
const isAccountValid = computed(() => {
    const val = account.value;
    return /^(1[3-9]\d{9})$/.test(val) || /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(val);
});

/* ===== 通用 staggerActive（声明式动画） ===== */
function staggerActive(activeMap, letters, action) {
    const indices = action
        ? Array.from({ length: letters.length }, (_, i) => i)
        : Array.from({ length: letters.length }, (_, i) => i).reverse();
    indices.forEach((i, staggerIndex) => {
        setTimeout(() => {
            activeMap[i] = action;
        }, 50 * staggerIndex);
    });
}

/* ===== 各输入框 focus / blur ===== */
function onAccountFocus() {
    accountFilled.value = true;
    staggerActive(accountActiveMap, accountLetters, true);
}
function onAccountBlur() {
    if (accountInputRef.value.value.length) return;
    accountFilled.value = false;
    staggerActive(accountActiveMap, accountLetters, false);
}

function onCodeFocus() {
    codeFilled.value = true;
    staggerActive(codeActiveMap, codeLetters, true);
}
function onCodeBlur() {
    if (codeInputRef.value.value.length) return;
    codeFilled.value = false;
    staggerActive(codeActiveMap, codeLetters, false);
}

function onCaptchaFocus() {
    captchaFilled.value = true;
    staggerActive(captchaActiveMap, captchaLetters, true);
}
function onCaptchaBlur() {
    if (captchaInputRef.value.value.length) return;
    captchaFilled.value = false;
    staggerActive(captchaActiveMap, captchaLetters, false);
}

function onNewPasswordFocus() {
    newPasswordFilled.value = true;
    staggerActive(newPasswordActiveMap, newPasswordLetters, true);
}
function onNewPasswordBlur() {
    if (newPasswordInputRef.value.value.length) return;
    newPasswordFilled.value = false;
    staggerActive(newPasswordActiveMap, newPasswordLetters, false);
}

function onConfirmPasswordFocus() {
    confirmPasswordFilled.value = true;
    staggerActive(confirmPasswordActiveMap, confirmPasswordLetters, true);
}
function onConfirmPasswordBlur() {
    if (confirmPasswordInputRef.value.value.length) return;
    confirmPasswordFilled.value = false;
    staggerActive(confirmPasswordActiveMap, confirmPasswordLetters, false);
}

/* ===== 图形验证码 ===== */
function generateCaptcha() {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    let str = '';
    for (let i = 0; i < 4; i++) str += chars.charAt(Math.floor(Math.random() * chars.length));
    captcha.value = str;
}

/* ===== 发送验证码 ===== */
function sendCode() {
    if (countdown.value > 0) return;
    codeSent.value = String(Math.floor(100000 + Math.random() * 900000));
    notification.success({
        message: '验证码已发送',
        description: codeSent.value,
        duration: 6,
        style: { color: '#5de9e0', fontFamily: 'gtpy' },
    });
    countdown.value = 30;
    timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) { clearInterval(timer); timer = null; }
    }, 1000);
}

/* ===== 校验 ===== */
function validateStepOne() {
    if (!account.value) { message.warning('请输入邮箱或手机号'); return false; }
    if (!isAccountValid.value) { message.warning('请输入正确的邮箱或手机号'); return false; }
    if (!code.value) { message.warning('请输入验证码'); return false; }
    if (code.value !== codeSent.value) { message.error('手机验证码错误'); return false; }
    if (!captchaInput.value.trim()) { message.warning('请输入图形验证码'); return false; }
    if (captchaInput.value.toUpperCase() !== captcha.value) { message.error('图形验证码错误'); return false; }
    return true;
}

function onStepOneSubmit() {
    if (validateStepOne()) step.value = 2;
}

function onStepTwoSubmit() {
    if (!newPassword.value || !confirmPassword.value) { message.warning('请填写所有字段'); return; }
    if (newPassword.value.length < 6) { message.warning('新密码长度不能少于6位'); return; }
    if (newPassword.value !== confirmPassword.value) { message.warning('两次输入的新密码不一致'); return; }
    message.success('密码修改成功');
    isSuccess.value = true;
    step.value = 1;
}

function goLogin() {
    router.push('/userInfo');
}

/* ===== 入场 & 初始化 ===== */
onMounted(() => {
    setTimeout(() => { isOnstart.value = true; }, 100);
    setTimeout(() => { isOnloaded.value = true; }, 1800);
    generateCaptcha();
});
</script>

<style scoped lang="scss">
// ── Project Dark 调色板（对齐 color.scss）──
$bg: #1a1d28;
$surface: #242b3b;
$accent: #5de9e0;
$text-primary: #f0f1f5;
$text-muted: #9ca3b2;
$border-subtle: rgba(255, 255, 255, 0.06);
$border-hover: rgba(255, 255, 255, 0.12);

.main {
    @include flexCenter(center, center);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $bg;

    &.on-start {
        .form__cover {
            &::before {
                transform: scale(0.15);
            }
        }
    }

    &.document-loaded {
        .form__cover {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .form__cover {
            &::after {
                transform: scale(2);
            }
        }

        .form__cover {
            &::before {
                transition: transform 2s ease, opacity 0.3s ease 0.8s;
                transform: scale(2);
                opacity: 0;
            }
        }

        .form__loader {
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
            visibility: hidden;
        }

        .form__content {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }
}

.form {
    position: relative;
    width: 420px;
    // min-height: 420px;
    height: 420px;
    flex-shrink: 0;
    padding: 24px;
    border-radius: 8px;
    overflow: visible;

    .form__cover {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: -4;
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s ease 0.8s;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);

        &::after,
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background: $surface;
            z-index: -4;
            border-radius: 50%;
            transition: all 1.5s ease 0.3s;
            -webkit-transform: scale(0);
            transform: scale(0);
        }

        &::before {
            background: white;
            z-index: -5;
            -webkit-transition: all 0.5s ease;
            transition: all 0.5s ease;
        }
    }

    .form__loader {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        z-index: -4;
        transition: all 0.5s ease;

        .spinner {
            position: relative;
            margin: auto;
            width: 50px;
            height: 50px;
            transition: all 0.2s ease 0s;

            .spinner__circular {
                animation: rotate 1.5s linear infinite;
                animation-play-state: paused;
                transform-origin: center center;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                margin: auto;
            }

            .spinner__path {
                stroke-dasharray: 1, 200;
                stroke-dashoffset: 0;
                animation: dash 1.3s ease forwards 0.5s;
                opacity: 0;
                stroke-linecap: round;
                stroke: $accent;
                animation-play-state: running;
            }

            @keyframes rotate {
                100% {
                    transform: rotate(360deg);
                }
            }

            @keyframes dash {
                0% {
                    stroke-dasharray: 1, 200;
                    stroke-dashoffset: 0;
                    opacity: 0;
                }

                50% {
                    stroke-dasharray: 40, 200;
                    opacity: 1;
                }

                100% {
                    stroke-dasharray: 125, 200;
                    opacity: 1;
                }
            }
        }
    }

    .form__content {
        text-align: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        position: relative;
        opacity: 0;
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
        -webkit-transition: all 0.5s ease 0.7s;
        transition: all 0.5s ease 0.7s;

        h1 {
            font-size: 36px;
            margin: 8px 0 20px 0;
            letter-spacing: 0.04em;
            color: $accent;
            font-weight: 700;
            transition: font-size 0.35s cubic-bezier(0.16, 1, 0.3, 1);

            &.title--small {
                font-size: 28px;
            }
        }

        // ── 步骤指示器 ──
        .step-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-bottom: 28px;
            gap: 0;

            .step-dot {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                font-weight: 600;
                color: $text-muted;
                background: $bg;
                border: 2px solid $border-subtle;
                z-index: 1;
                cursor: default;
                transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                user-select: none;

                &.active {
                    background: $accent;
                    border-color: $accent;
                    color: $bg;
                    box-shadow: 0 0 12px rgba($accent, 0.35);
                }

                &.done {
                    background: $accent;
                    border-color: $accent;
                    color: $bg;
                    cursor: pointer;
                }
            }

            .step-line {
                position: absolute;
                top: 15px;
                left: calc(50% - 60px);
                right: calc(50% - 60px);
                height: 2px;
                background: $border-subtle;
                z-index: 0;
            }
        }

        // ── 步骤表单 ──
        .step-form {
            display: flex;
            flex-direction: column;
            gap: 0;
        }

        // ── 表单行（验证码 + 按钮并排） ──
        .form-row {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            margin-bottom: 25px;

            .form-row__input {
                flex: 1;
                margin-bottom: 0;
            }
        }

        // ── styled-input ──
        .styled-input {
            width: 100%;
            position: relative;
            margin-bottom: 25px;
            border: 1px solid $border-subtle;
            border-radius: 4px;
            transition: border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1);

            &:hover {
                border-color: $border-hover;
            }

            &.filled {
                border-color: $border-subtle;

                .styled-input__circle::after {
                    -webkit-transform: scale(37);
                    transform: scale(37);
                    opacity: 0;
                }
            }

            .styled-input__input {
                width: 100%;
                -webkit-appearance: none;
                font-size: 14px;
                outline: none;
                background: none;
                padding: 18px 15px;
                color: $text-primary;
                border: none;
                font-weight: 600;
                letter-spacing: 0.035em;
            }

            .captcha-input {
                letter-spacing: 4px;
            }

            .styled-input__circle {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -2;
                overflow: hidden;
                border-radius: 4px;

                &::after {
                    content: '';
                    position: absolute;
                    left: 16.5px;
                    top: 19px;
                    height: 14px;
                    width: 14px;
                    z-index: -2;
                    border-radius: 50%;
                    background: rgba($accent, 0.18);
                    box-shadow: 0 0 10px rgba($accent, 0);
                    transition: transform 0.6s ease, opacity 1s ease;
                }
            }

            .styled-input__placeholder {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                z-index: -1;
                padding-left: 45px;
                color: $text-muted;
            }

            .styled-input__placeholder-text {
                -webkit-perspective: 500px;
                perspective: 500px;
                display: inline-block;

                .letter {
                    display: inline-block;
                    vertical-align: middle;
                    position: relative;
                    animation: letterAnimOut 0.25s ease forwards;
                    text-shadow: 0 0 5px;

                    &.active {
                        animation: letterAnimIn 0.25s ease forwards;
                    }
                }

                @keyframes letterAnimIn {
                    0% {
                        transform: translate(0, 0);
                    }

                    25% {
                        transform: translate(0, 10px);
                        color: $accent;
                    }

                    45% {
                        transform: translate(0, 10px);
                        opacity: 0;
                        color: $accent;
                    }

                    55% {
                        transform: translate(0, 10px);
                        opacity: 0;
                    }

                    56% {
                        transform: translate(-30px, -27px);
                        opacity: 0;
                        color: $accent;
                    }

                    76% {
                        color: $accent;
                        opacity: 1;
                        transform: translate(-30px, -27px);
                    }

                    100% {
                        transform: translate(-30px, -27px);
                        opacity: 1;
                    }
                }

                @keyframes letterAnimOut {
                    0% {
                        transform: translate(-30px, -27px);
                        opacity: 1;
                    }

                    25% {
                        transform: translate(-30px, -40px);
                        opacity: 0;
                    }

                    45% {
                        transform: translate(0, 10px);
                        opacity: 0;
                    }

                    55% {
                        transform: translate(0, 10px);
                        opacity: 0;
                        color: $accent;
                    }

                    56% {
                        transform: translate(0, 10px);
                        color: $accent;
                    }

                    100% {
                        transform: translate(0, 0);
                    }
                }
            }
        }

        // ── 验证码按钮 ──
        .code-btn {
            flex-shrink: 0;
            height: 54px;
            padding: 0 14px;
            border-radius: 4px;
            border: 1px solid rgba($accent, 0.35);
            background: transparent;
            color: $accent;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

            &:hover:not(:disabled) {
                background: rgba($accent, 0.08);
                border-color: $accent;
                box-shadow: 0 0 12px rgba($accent, 0.15);
            }

            &:disabled {
                border-color: $border-subtle;
                color: $text-muted;
                cursor: not-allowed;
            }
        }

        // ── 图形验证码展示区 ──
        .captcha-display {
            flex-shrink: 0;
            height: 54px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            min-width: 62px;
            border-radius: 4px;
            border: 1px solid $border-subtle;
            background: $bg;
            color: $accent;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 5px;
            font-family: 'Courier New', monospace;
            cursor: pointer;
            user-select: none;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

            &:hover {
                border-color: $accent;
                color: rgba($accent, 0.95);
                box-shadow: 0 0 10px rgba($accent, 0.12);
            }
        }

        // ── 按钮行 ──
        .btn-row {
            display: flex;
            gap: 12px;
            margin-top: 8px;
        }

        // ── styled-button ──
        .styled-button {
            -webkit-appearance: none;
            -webkit-user-select: none;
            cursor: pointer;
            font-size: 14px;
            flex: 1;
            padding: 20px;
            outline: none;
            background: $accent;
            border: none;
            border-radius: 3px;
            position: relative;
            color: #0d1117;
            font-weight: 700;
            letter-spacing: 0.1em;
            overflow: hidden;
            transition: all 0.3s ease;

            &:hover,
            &:active {
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                background: #7eebe6;

                .styled-button__moving-block {
                    &.face {
                        transform: translateX(100%);

                        .styled-button__text-holder {
                            transform: translateX(-100%);
                        }
                    }

                    &.back {
                        transform: translateX(0);

                        .styled-button__text-holder {
                            transform: translateX(0);
                        }
                    }
                }
            }

            &:active {
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            }

            &.styled-button--secondary {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: rgba(255, 255, 255, 0.6);

                .styled-button__moving-block {
                    &.face {
                        .styled-button__text {
                            color: rgba(255, 255, 255, 0.6);
                        }
                    }

                    &.back {
                        .styled-button__text-holder {
                            .styled-button__text {
                                color: white;
                            }
                        }
                    }
                }

                &:hover,
                &:active {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(255, 255, 255, 0.35);
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
                    color: white;

                    .styled-button__moving-block {
                        &.face {
                            .styled-button__text {
                                color: rgba(255, 255, 255, 0.6);
                            }
                        }
                    }
                }
            }

            .styled-button__real-text-holder {
                position: relative;
            }

            .styled-button__real-text {
                color: transparent;
                display: inline-block;
            }

            .styled-button__text-holder {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .styled-button__moving-block {
                transition: all 0.3s ease;
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                overflow: hidden;

                &.face {
                    transform: translateX(0);
                    color: #0d1117;
                }

                &.back {
                    color: white;
                    transform: translateX(-100%);

                    .styled-button__text-holder {
                        transform: translateX(100%);
                    }
                }
            }

            .styled-button__text {
                display: inline-block;
            }
        }

        // ── 成功状态 ──
        .success-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0 10px;
        }

        .success-icon {
            width: 64px;
            height: 64px;
            margin-bottom: 20px;

            &__checkmark {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                display: block;
                stroke-width: 3;
                stroke: $accent;
                stroke-miterlimit: 10;
                animation: successFill 0.4s ease forwards 0.2s;
            }

            &__circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                animation: successStrokeCircle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }

            &__check {
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: successStrokeCheck 0.3s cubic-bezier(0.65, 0, 0.45, 1) forwards 0.4s;
            }
        }

        @keyframes successStrokeCircle {
            100% {
                stroke-dashoffset: 0;
            }
        }

        @keyframes successStrokeCheck {
            100% {
                stroke-dashoffset: 0;
            }
        }

        @keyframes successFill {
            100% {
                box-shadow: inset 0 0 0 100px rgba($accent, 0.06);
            }
        }

        .success-title {
            font-size: 20px;
            font-weight: 700;
            color: $text-primary;
            margin: 0 0 6px 0;
            letter-spacing: 0.03em;
        }

        .success-sub {
            font-size: 14px;
            color: $text-muted;
            margin: 0 0 28px 0;
        }

        // 成功状态下按钮全宽
        .success-state .styled-button {
            flex: none;
            width: 100%;
        }
    }
}
</style>
