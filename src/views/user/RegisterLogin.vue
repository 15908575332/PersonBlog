<template>
    <div id="userLogin">
        <!-- 随机图片背景层：6 张图随机取一，置于卡片之下、容器底色之上 -->
        <div class="backPhoto" :style="currentPageBackground"></div>

        <!-- 图形验证码弹窗：登录/注册共用，答案由后端校验，前端只回传 captchaId + captchaCode -->
        <ModalBox :isVisible="isShowModal" @close="handChangeModal" :animationType="selectedAnimation">
            <Captcha :title="captchaTitle" :onSuccess="onCaptchaSuccess" :onCancel="onCaptchaCancel" />
        </ModalBox>

        <!-- 深色品红双面板卡片：isRegisterForm 驱动 active 态，面板内容整体平移翻转 -->
        <div class="auth-card" :class="{ 'is-active': formState.isRegisterForm }">
            <!-- 两块斜切曲面：切换时相互旋转，形成源项目的翻面效果 -->
            <i class="curved-shape"></i>
            <i class="curved-shape2"></i>

            <!-- ================ 登录面板（左半区） ================ -->
            <div class="form-box form-box--login">
                <h2 class="form-title anim" :style="animStyle(21, 0)">登录</h2>
                <form class="form" novalidate @submit.prevent>
                    <div class="input-box anim" :style="animStyle(22, 1)">
                        <input id="login-email" v-model="defaultLoginInfo.loginEmail"
                            class="form__input form-field-input form-field-input--action" type="email" placeholder=" "
                            autocomplete="username">
                        <label for="login-email">电子邮箱</label>
                        <button v-if="defaultLoginInfo.loginEmail" type="button" class="input-clear" aria-label="清空邮箱"
                            @click="clearFields('loginEmail')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M6.6 6.6 17.4 17.4" />
                                <path d="M17.4 6.6 6.6 17.4" />
                            </svg>
                        </button>
                        <span v-else class="input-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
                                <path d="m3.6 7.4 8.4 5.8 8.4-5.8" />
                            </svg>
                        </span>
                    </div>

                    <div class="input-box anim" :style="animStyle(23, 2)">
                        <input id="login-password" v-model="defaultLoginInfo.loginPassword"
                            class="form__input form-field-input form-field-input--action"
                            :type="showLoginPassword ? 'text' : 'password'" placeholder=" "
                            autocomplete="current-password">
                        <label for="login-password">请输入你的密码</label>
                        <PwdToggle v-model="showLoginPassword" />
                    </div>

                    <a href="/resetPassword" class="link-forgot anim" :style="animStyle(24, 3)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                            stroke-linecap="round" stroke-linejoin="round">
                            <rect x="4.6" y="10.2" width="14.8" height="9.6" rx="2.2" />
                            <path d="M8.2 10.2V7.4a3.8 3.8 0 0 1 7.6 0v2.8" />
                        </svg>
                        <span>忘记密码</span>
                    </a>

                    <button type="button" class="btn anim" :style="animStyle(25, 4)"
                        :disabled="isLoginLoading || lockLeft > 0" @click="login">
                        {{ lockLeft > 0 ? `${lockLeft}s 后重试` : '登录' }}
                    </button>

                    <p class="switch-tip anim" :style="animStyle(26, 5)">
                        还没有账号？<a role="button" tabindex="0" @click="toggleForm"
                            @keydown.enter.prevent="toggleForm">立即注册</a>
                    </p>
                </form>
            </div>

            <!-- 登录侧宣传文案（右半区） -->
            <div class="info-content info-content--login">
                <h2 class="anim" :style="animStyle(20, 0)">Welcome</h2>
                <p class="anim" :style="animStyle(21, 1)">很高兴再次见到你。这里始终为你敞开，需要任何帮助，我们随时都在。</p>
            </div>

            <!-- ================ 注册面板（右半区） ================ -->
            <div class="form-box form-box--register">
                <h2 class="form-title anim" :style="animStyle(0, 17, true)">Register</h2>
                <form class="form" novalidate @submit.prevent>
                    <div class="input-box anim" :style="animStyle(1, 18, true)">
                        <input id="register-username" v-model="registerData.userName" max="8"
                            class="form__input form-field-input form-field-input--action" type="text" placeholder=" "
                            autocomplete="username">
                        <label for="register-username">用户名</label>
                        <button v-if="registerData.userName" type="button" class="input-clear" aria-label="清空用户名"
                            @click="clearFields('userName')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M6.6 6.6 17.4 17.4" />
                                <path d="M17.4 6.6 6.6 17.4" />
                            </svg>
                        </button>
                        <span v-else class="input-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="8" r="3.6" />
                                <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
                            </svg>
                        </span>
                    </div>

                    <div class="input-box anim" :style="animStyle(2, 19, true)">
                        <input id="register-email" v-model="registerData.userEmail"
                            class="form__input form-field-input form-field-input--action" type="email" placeholder=" "
                            autocomplete="userEmail">
                        <label for="register-email">邮箱</label>
                        <button v-if="registerData.userEmail" type="button" class="input-clear" aria-label="清空邮箱"
                            @click="clearFields('userEmail')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M6.6 6.6 17.4 17.4" />
                                <path d="M17.4 6.6 6.6 17.4" />
                            </svg>
                        </button>
                        <span v-else class="input-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
                                <path d="m3.6 7.4 8.4 5.8 8.4-5.8" />
                            </svg>
                        </span>
                    </div>

                    <div class="input-box anim" :style="animStyle(3, 19, true)">
                        <input id="register-password" v-model="registerData.userPassword"
                            class="form__input form-field-input form-field-input--action"
                            :type="showRegisterPassword ? 'text' : 'password'" placeholder=" "
                            autocomplete="current-password">
                        <label for="register-password">密码</label>
                        <PwdToggle v-model="showRegisterPassword" />
                    </div>

                    <div class="input-box anim" :style="animStyle(4, 20, true)">
                        <input id="register-repassword" v-model="registerData.rePassword"
                            class="form__input form-field-input form-field-input--action"
                            :type="showRePassword ? 'text' : 'password'" placeholder=" " autocomplete="new-password">
                        <label for="register-repassword">再次输入密码</label>
                        <PwdToggle v-model="showRePassword" />
                    </div>

                    <button type="button" class="btn anim" :style="animStyle(5, 21, true)"
                        @click="UserRegister">注册</button>

                    <p class="switch-tip anim" :style="animStyle(6, 22, true)">
                        已有账号？<a role="button" tabindex="0" @click="toggleForm"
                            @keydown.enter.prevent="toggleForm">请登录</a>
                    </p>
                </form>
            </div>

            <!-- 注册侧宣传文案（左半区） -->
            <div class="info-content info-content--register">
                <h2 class="anim" :style="animStyle(0, 17, true)">Welcome back</h2>
                <p class="anim" :style="animStyle(1, 18, true)">很高兴你来到这里。如有任何疑问或需要协助，随时联系我们。</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount, computed, getCurrentInstance } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import { useAuthStore } from '@/stores/auth';
import ModalBox from '@/components/base/ModalBox.vue';
import PwdToggle from '@/components/base/PwdToggle.vue';

import Captcha from '@/components/business/auth/Captcha.vue';
import useRandomBackground from '@/composables/useRandomBackground';

const $http = getCurrentInstance().appContext.config.globalProperties.$http;
const route = useRouter();

/** ------------------------ 随机背景图 ------------------------ */
const { backgroundStyle: currentPageBackground } = useRandomBackground();

/** ------------------------ 全局配置 ------------------------ */
const isShowModal = ref(false); //验证框
// 密码可见性（小眼睛）：注册、确认密码、登录三处互不干扰
const showRegisterPassword = ref(false);
const showRePassword = ref(false);
const showLoginPassword = ref(false);
// 本次图形验证码的票据：由 Captcha 组件回传，随登录/注册请求提交给后端校验
const captchaTicket = ref({ captchaId: '', captchaCode: '' });

const handChangeModal = () => {
    isShowModal.value = false;
}
message.config({
    duration: 3,
    maxCount: 3,
});

/** ------------------------ 动画切换 ------------------------ */
const formState = ref({
    isRegisterForm: false, // false表示登录表单，true表示注册表单
    currentOption: 'login' // 当前操作类型
});
const toggleForm = () => { //类型切换
    captchaTicket.value = { captchaId: '', captchaCode: '' };
    formState.value.isRegisterForm = !formState.value.isRegisterForm;
    formState.value.currentOption = formState.value.isRegisterForm ? 'register' : 'login';
};
const selectedAnimation = computed(() => { //返回选中动画名
    return formState.value.currentOption === 'register' ? 'spaceInUp' : 'zoomIn';
});
const captchaTitle = computed(() => { //验证码弹窗标题随当前表单变化
    return formState.value.currentOption === 'register' ? '请完成注册安全验证' : '请完成登录安全验证';
});

// 面板进场/退场的错峰延迟：--S 控制入场、--D / --li 控制出场与进场收尾，取值与源项目一致
const animStyle = (delayIn, delayOut, isRegisterPanel = false) => {
    return isRegisterPanel
        ? { '--S': delayIn, '--li': delayOut }
        : { '--S': delayIn, '--D': delayOut };
};

/** ------------------------ 注册 ------------------------ */
const registerData = ref({
    userName: '',
    userEmail: '',
    userPassword: '',
    rePassword: '' //二次密码
});

const userId = `user-${uuidv4()}`;

// 验证码通过后按当前表单分发：注册走注册接口，登录走登录接口
const onCaptchaSuccess = (ticket) => {
    captchaTicket.value = ticket;
    isShowModal.value = false;
    if (formState.value.currentOption === 'register') {
        handleRegisterAfterCaptcha();
        return;
    }
    handleLoginAfterCaptcha();
};

const onCaptchaCancel = () => {
    isShowModal.value = false;
    captchaTicket.value = { captchaId: '', captchaCode: '' };
};

// 注册请求：携带图形验证码票据，由后端校验通过后建号
const handleRegisterAfterCaptcha = async () => {
    try {
        const atIndex = registerData.value.userEmail.indexOf('@');
        const profileName = atIndex === -1 ? registerData.value.userEmail : registerData.value.userEmail.slice(0, atIndex);

        await $http.post('/user/register', {
            userId: userId,
            userName: registerData.value.userName,
            userEmail: registerData.value.userEmail,
            userPassword: registerData.value.userPassword,
            avatar_url: '/src/assets/img/shared/profile_picture/' + profileName + '.png',
            ...captchaTicket.value
        });

        message.success('注册成功！请使用新账号登录');
        // 注册接口不下发 Token，注册成功后切回登录表单并预填邮箱，避免跳转到需登录的页面
        defaultLoginInfo.value.loginEmail = registerData.value.userEmail;
        registerData.value.userPassword = '';
        registerData.value.rePassword = '';
        captchaTicket.value = { captchaId: '', captchaCode: '' };
        if (formState.value.currentOption === 'register') toggleForm();
    } catch (error) {
        message.error(error?.response?.data?.message || '注册失败，请重试');
        captchaTicket.value = { captchaId: '', captchaCode: '' };
    }
};

async function UserRegister(e) {
    e.preventDefault()  //防止表单默认提交

    if (!registerData.value.userName) {
        alert('用户名不能为空')
        return false
    }
    if (!registerData.value.userEmail) {
        alert('邮箱不能为空')
        return false
    }
    if (!registerData.value.userPassword) {
        alert('密码不能为空')
        return false
    }
    if (registerData.value.userPassword !== registerData.value.rePassword) {
        alert('两次密码不一致')
        return false
    }

    // 每次注册都重新做一次图形验证
    captchaTicket.value = { captchaId: '', captchaCode: '' };
    isShowModal.value = true;
}

/** ------------------------ 登录 ------------------------ */

const defaultLoginInfo = ref({
    loginEmail: '',
    loginPassword: '',
})
const isLoginLoading = ref(false); //登录状态 
const MAX_LOGIN_FAIL = 5; //允许的连续失败次数
const LOCK_SECONDS = 60; //达到失败上限后的冷却时长
const isSubmitting = ref(false); //登录请求重入锁
const failCount = ref(0); //连续失败计数
const lockLeft = ref(0); //冷却剩余秒数
let lockTimer = null;
let lockUntil = 0;

// 冷却计时器清理
const clearLockTimer = () => {
    if (lockTimer) {
        clearInterval(lockTimer);
        lockTimer = null;
    }
};

// 启动冷却倒计时（锁定期间禁止提交）
const startCooldown = () => {
    lockUntil = Date.now() + LOCK_SECONDS * 1000;
    lockLeft.value = LOCK_SECONDS;
    clearLockTimer();
    lockTimer = setInterval(() => {
        lockLeft.value = Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000));
        if (lockLeft.value === 0) clearLockTimer();
    }, 1000);
};

// 关闭验证弹窗并清理本次验证码票据，保证下次可重新取码
const resetCaptchaState = () => {
    isShowModal.value = false;
    captchaTicket.value = { captchaId: '', captchaCode: '' };
};

// 跳转首页：先展示提示，跳转完成后销毁，避免首页残留
const goHome = async () => {
    const hideLoading = message.loading('登录成功，正在前往首页...', 0);
    try {
        await route.replace('/home');
    } finally {
        hideLoading();
        message.destroy();
    }
};

// 登录失败：计数、关闭弹窗、达上限则冷却
const onLoginFail = (error) => {
    failCount.value += 1;
    message.error(error?.response?.data?.message || '登录失败，请重试！');
    defaultLoginInfo.value.loginPassword = '';
    resetCaptchaState();
    if (failCount.value < MAX_LOGIN_FAIL) return;
    failCount.value = 0;
    startCooldown();
    message.warning(`连续登录失败${MAX_LOGIN_FAIL}次，请${LOCK_SECONDS}秒后再试`);
};

// 登录请求：携带图形验证码票据，由后端校验通过后比对账号密码
const handleLoginAfterCaptcha = async () => {
    if (isSubmitting.value) return; //同一时刻只允许一个登录请求
    if (lockLeft.value > 0) {
        message.warning(`登录尝试过于频繁，请${lockLeft.value}秒后再试`);
        resetCaptchaState();
        return;
    }
    isSubmitting.value = true;
    isLoginLoading.value = true;
    try {
        await useAuthStore().login({
            loginEmail: defaultLoginInfo.value.loginEmail,
            loginPassword: defaultLoginInfo.value.loginPassword,
            ...captchaTicket.value
        });
        failCount.value = 0; //成功即清零
        defaultLoginInfo.value.loginPassword = '';
        resetCaptchaState();
        await goHome();
    } catch (error) {
        onLoginFail(error);
    } finally {
        isSubmitting.value = false;
        isLoginLoading.value = false;
    }
};

const login = async (e) => {
    e.preventDefault();
    if (isLoginLoading.value || isSubmitting.value) { //防止频繁点击
        return;
    }
    if (lockLeft.value > 0) {
        message.warning(`请${lockLeft.value}秒后再试`);
        return;
    }
    if (!defaultLoginInfo.value.loginEmail) {
        alert('邮箱不能为空')
        return false
    }
    // 验证邮箱格式
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(defaultLoginInfo.value.loginEmail)) {
        alert('请输入有效的邮箱格式');
        return false;
    }
    if (!defaultLoginInfo.value.loginPassword) {
        alert('密码不能为空')
        return false
    }

    // 每次登录都重新取码验证
    captchaTicket.value = { captchaId: '', captchaCode: '' };
    isShowModal.value = true;
}

/** ------------------------ 输入框一键清空 ------------------------ */
const clearFields = (prop) => {
    switch (prop) {
        case 'userEmail':
            registerData.value.userEmail = '';
            break;
        case 'userName':
            registerData.value.userName = '';
            break;
        case 'loginEmail':
            defaultLoginInfo.value.loginEmail = '';
            break;
    }
};

onBeforeUnmount(() => {
    clearLockTimer();
})
</script>

<style scoped lang="scss">
/* ===================== 皮肤令牌（固定深色品红，不依赖全局主题令牌） ===================== */
$c-bg: rgba(255, 255, 255, 0.9);
/* 卡片底：与 $c-bg 同 RGB，仅降 alpha，让背景图透出 */
$c-card: rgba(37, 37, 43, 0.72);
$c-accent: var(--primary-color);
$c-text: rgba(0, 0, 0, 0.9);
$c-text-dim: rgba(0, 0, 0, 0.72);
$c-path: rgba(0, 0, 0, 0.45);
$c-accent-soft: rgba(72, 171, 229, 0.12);

/* 尺寸：源项目 px 按根字号 20px 换算（750px = 37.5rem，450px = 22.5rem） */
$card-w: 37.5rem;
$card-h: 22.5rem;
$field-h: 2rem;
$field-gap: 0.95rem;
$field-fs: 0.8rem;
$btn-h: 2.25rem;

#userLogin {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: $c-bg;
    color: $c-text;
    font-family: var(--app-font-family);
    font-size: $field-fs;
    /* 建立独立层叠上下文：使负层级的背景图绘制在容器底色之上、卡片内容之下 */
    isolation: isolate;

    /* 随机背景图：撑满容器，fadeIn 从 scale(1.3) 收到 1，由容器 overflow hidden 兜住 */
    .backPhoto {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        z-index: -2;
        animation: fadeIn 1s ease forwards;
    }
}

/* ===================== 卡片与双曲面 ===================== */
.auth-card {
    position: relative;
    width: $card-w;
    height: $card-h;
    background: $c-bg;
    border: 0.1rem solid $c-accent;
    box-shadow: 0 0 1.25rem $c-accent;
    overflow: hidden;

    /* 斜切曲面 1：登录态斜压在右半区，注册态转正填补中缝 */
    .curved-shape {
        position: absolute;
        top: -0.25rem;
        right: 0;
        width: 42.5rem;
        height: 30rem;
        background: linear-gradient(45deg, $c-bg, $c-accent);
        transform: rotate(10deg) skewY(40deg);
        transform-origin: bottom right;
        transition: 1.5s ease;
        transition-delay: 1.6s;
    }

    /* 斜切曲面 2：注册态反向旋转，形成上下两道弧形分割 */
    .curved-shape2 {
        position: absolute;
        top: 100%;
        left: 12.5rem;
        width: 42.5rem;
        height: 35rem;
        background: $c-bg;
        border-top: 0.15rem solid $c-accent;
        transform: rotate(0deg) skewY(0deg);
        transform-origin: bottom left;
        transition: 1.5s ease;
        transition-delay: 0.5s;
    }

    &.is-active .curved-shape {
        transform: rotate(0deg) skewY(0deg);
        transition-delay: 0.5s;
    }

    &.is-active .curved-shape2 {
        transform: rotate(-11deg) skewY(-41deg);
        transition-delay: 1.2s;
    }
}

/* ===================== 表单面板 ===================== */
.form-box {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    height: 100%;

    &--login {
        left: 0;
        padding: 0 2rem;
    }

    &--register {
        right: 0;
        padding: 0 3rem;
    }
}

/* 未激活的一侧不接受交互，避免隐形控件挡住可见内容 */
.auth-card:not(.is-active) .form-box--register,
.auth-card.is-active .form-box--login {
    pointer-events: none;
}

.form {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.form-title {
    margin-bottom: 0.35rem;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: 0.02rem;
    text-align: center;
}

/* ===================== 下划线输入框 ===================== */
.input-box {
    position: relative;
    width: 100%;
    height: $field-h;
    margin-top: $field-gap;

    /* 皮肤只保留下划线，排版基线仍由全局 .form-field-input 提供 */
    .form__input {
        width: 100%;
        height: 100%;
        padding: 0 1.9rem 0.3rem 0;
        border: none;
        border-bottom: 0.1rem solid $c-path;
        border-radius: 0;
        background: transparent;
        color: $c-text;
        font-size: $field-fs;
        font-weight: 600;
        transition: border-color 0.4s ease;

        &:focus,
        &:not(:placeholder-shown) {
            border-bottom-color: $c-accent;
        }

        /* 浏览器自动填充：保持深色底白字，避免出现浅色块 */
        &:-webkit-autofill {
            -webkit-text-fill-color: $c-text;
            caret-color: $c-text;
            box-shadow: 0 0 0 100rem $c-bg inset;
        }
    }

    /* 占位标签：空值时代替 placeholder，聚焦/有值后上浮变小 */
    label {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        font-size: $field-fs;
        color: $c-text;
        pointer-events: none;
        transition: all 0.35s ease;
    }

    .form__input:focus~label,
    .form__input:not(:placeholder-shown)~label {
        top: -0.1rem;
        transform: translateY(-100%);
        font-size: 0.7rem;
        color: $c-accent;
    }

    .input-icon,
    .input-clear {
        position: absolute;
        top: 50%;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.3rem;
        height: 1.3rem;
        padding: 0;
        border: none;
        border-radius: 50%;
        background: transparent;
        color: $c-text-dim;
        transform: translateY(-50%);
    }

    .input-icon {
        pointer-events: none;

        svg {
            display: block;
            width: 0.9rem;
            height: 0.9rem;
        }
    }

    .input-clear {
        cursor: pointer;
        transition: color 0.2s ease, background-color 0.2s ease;

        svg {
            display: block;
            width: 0.75rem;
            height: 0.75rem;
            pointer-events: none;
        }

        &:hover {
            color: $c-accent;
            background: $c-accent-soft;
        }
    }

    .form__input:focus~.input-icon {
        color: $c-accent;
    }

    /* 小眼睛来自 PwdToggle 组件，此处只覆盖深色皮肤下的配色（重复类名用于压过组件默认样式） */
    :deep(.pwd-toggle.pwd-toggle) {
        color: $c-text-dim;

        &:hover {
            color: $c-accent;
            background: $c-accent-soft;
        }

        &.is-on {
            color: $c-accent;
        }
    }
}

/* ===================== 渐变描边按钮 ===================== */
.btn {
    position: relative;
    z-index: 1;
    width: 100%;
    height: $btn-h;
    margin-top: 1rem;
    overflow: hidden;
    border: 0.1rem solid $c-accent;
    border-radius: 2rem;
    background: transparent;
    color: $c-text;
    font-size: $field-fs;
    font-weight: 600;
    letter-spacing: 0.02rem;
    cursor: pointer;

    /* 悬停时自上而下推入渐变，源项目的按钮动效 */
    &::before {
        content: "";
        position: absolute;
        top: -100%;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 300%;
        background: linear-gradient($c-bg, $c-accent, $c-bg, $c-accent);
        transition: 0.5s;
    }

    &:hover::before {
        top: 0;
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;

        &::before {
            display: none;
        }
    }
}

/* ===================== 辅助链接 ===================== */
.link-forgot {
    display: inline-flex;
    align-items: center;
    align-self: flex-end;
    gap: 0.25rem;
    margin-top: 0.5rem;
    font-size: 0.7rem;
    color: $c-text-dim;
    transition: color 0.2s ease;

    svg {
        width: 0.7rem;
        height: 0.7rem;
    }

    &:hover {
        color: $c-accent;
    }
}

.switch-tip {
    margin-top: 0.9rem;
    font-size: 0.7rem;
    line-height: 1.5;
    text-align: center;
    color: $c-text-dim;

    a {
        color: $c-accent;
        font-weight: 600;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
}

/* ===================== 侧栏宣传文案 ===================== */
.info-content {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    height: 100%;
    pointer-events: none;

    &--login {
        right: 0;
        padding: 0 2rem 3rem 7.5rem;
        text-align: right;
    }

    &--register {
        left: 0;
        padding: 0 7.5rem 3rem 1.9rem;
        text-align: left;
    }

    h2 {
        font-size: 1.8rem;
        font-weight: 700;
        line-height: 1.3;
        text-transform: uppercase;
    }

    p {
        margin-top: 0.6rem;
        font-size: 0.8rem;
        line-height: 1.7;
        color: rgba($c-text, 0.85);
    }
}

/* ===================== 面板进场 / 退场动效 ===================== */
/* 登录表单：默认在场，切走时向左滑出 */
.form-box--login .anim {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
    transition: 0.7s ease;
    transition-delay: calc(0.1s * var(--S));
}

.auth-card.is-active .form-box--login .anim {
    opacity: 0;
    transform: translateX(-120%);
    transition-delay: calc(0.1s * var(--D));
}

/* 登录侧文案：默认在场，切走时向右滑出并虚化 */
.info-content--login .anim {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
    transition: 0.7s ease;
    transition-delay: calc(0.1s * var(--S));
}

.auth-card.is-active .info-content--login .anim {
    opacity: 0;
    filter: blur(0.5rem);
    transform: translateX(120%);
    transition-delay: calc(0.1s * var(--D));
}

/* 注册表单：默认右侧待命并虚化，激活后归位 */
.form-box--register .anim {
    opacity: 0;
    filter: blur(0.5rem);
    transform: translateX(120%);
    transition: 0.7s ease;
    transition-delay: calc(0.1s * var(--S));
}

.auth-card.is-active .form-box--register .anim {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
    transition-delay: calc(0.1s * var(--li));
}

/* 注册侧文案：默认左侧待命，激活后归位 */
.info-content--register .anim {
    opacity: 0;
    filter: blur(0.5rem);
    transform: translateX(-120%);
    transition: 0.7s ease;
    transition-delay: calc(0.1s * var(--S));
}

.auth-card.is-active .info-content--register .anim {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
    transition-delay: calc(0.1s * var(--li));
}
</style>
