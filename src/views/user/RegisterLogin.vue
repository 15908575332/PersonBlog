<template>
    <div id="userLogin">
        <!-- 背景图 -->
        <div class="backPhoto" :style=currentPageBackground></div>
        <!-- 遮罩 -->
        <!-- 验证 -->
        <ModalBox :isVisible="isShowModal" @close="handChangeModal" :animationType="selectedAnimation">
            <!-- 注册验证码组件 -->
            <Captcha v-if="formState.currentOption === 'register'" :onSuccess="onCaptchaSuccess"
                :onCancel="onCaptchaCancel" />
            <!-- 登录验证码组件 -->
            <slide-verify v-else ref="block" :w="400" :h="200" :imgs="customImages" :show="false"
                :slider-text="placeholderText" @again="onAgain" @success="onSuccess" @fail="onFail"
                style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);"></slide-verify>
            <div class="verification-msg" :style="{ color: msgColor }">{{ msg }}</div>
        </ModalBox>

        <div class="layout">
            <div class="main">
                <!-- 注册 sign up -->
                <div class="container a-container" id="a-container">
                    <form class="form" id="a-form" :model="registerData">
                        <h2 class="form_title title incline_en">创建账户</h2>
                        <span class="form__span">或者使用你的邮箱进行注册</span>
                        <div class="login_email">
                            <input class="form__input" type="text" placeholder="用户名" required max="8"
                                v-model="registerData.userName">
                            <img v-if="registerData.userName" @click="clearFields('userName')"
                                src="@/assets/icon/user/input_del.svg" />
                        </div>

                        <div class="login_email">
                            <input class="form__input" type="email" required autocomplete="userEmail" placeholder="邮箱"
                                v-model="registerData.userEmail">
                            <img v-if="registerData.userEmail" @click="clearFields('userEmail')"
                                src="@/assets/icon/user/input_del.svg" />
                        </div>

                        <input class="form__input" type="password" autocomplete="current-password" placeholder="密码"
                            v-model="registerData.userPassword">
                        <input class="form__input" type="password" autocomplete="new-password" placeholder="再次输入密码"
                            v-model="registerData.rePassword">

                        <button class="form__button button submit" type="submit"
                            @click="UserRegister"><span>注册</span></button>
                    </form>
                </div>

                <!-- 登录 sign in -->
                <div class="container b-container" id="b-container">
                    <form class="form" id="b-form" method="" :model="defaultLoginInfo">
                        <h2 class="form_title title incline_en"><span>登录</span></h2>
                        <span class="form__span">或者使用你的电子邮箱账户</span>
                        <div class="login_email">
                            <input class="form__input form__input--email" autocomplete="username" type="email" required
                                placeholder="电子邮箱" v-model="defaultLoginInfo.loginEmail">
                            <img v-if="defaultLoginInfo.loginEmail" @click="clearFields('loginEmail')"
                                src="@/assets/icon/user/input_del.svg" />
                        </div>

                        <input class="form__input" type="password" autocomplete="current-password" placeholder="请输入你的密码"
                            v-model="defaultLoginInfo.loginPassword">
                        <a href="/resetPassword" class="form__link">忘记密码</a>
                        <button class="form__button button submit" @click="login"
                            :disabled="isLoginLoading || lockLeft > 0"><span>{{ lockLeft > 0 ? `${lockLeft}s 后重试` : '登录'
                                }}</span></button>
                    </form>
                </div>
                <!-- login/register 切换按钮 -->
                <div class="switch" id="switch-cnt">
                    <div class="switch__circle"></div>
                    <div class="switch__circle switch__circle--t"></div>
                    <div class="switch__container" id="switch-c1">
                        <h2 class="switch__title title incline_en">没有账号？</h2>
                        <p class="switch__description description">
                            <img src="@/assets/icon/user/register-icon.svg"></img>
                            <span>立即注册吧</span>
                        </p>
                        <button class="switch__button button switch-btn"><span>注册</span></button>
                    </div>
                    <div class="switch__container is-hidden" id="switch-c2">
                        <h2 class="switch__title title incline_en">已有账号？</h2>
                        <p class="switch__description description">
                            <img src="@/assets/icon/user/login-icon.svg"></img>
                            <span>请登录</span>
                        </p>
                        <button class="switch__button button"><span>登录</span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, getCurrentInstance } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import { useAuthStore } from '@/stores/auth';
import ModalBox from '@/components/base/ModalBox.vue';

import Captcha from '@/components/business/auth/Captcha.vue';
import SlideVerify from 'vue3-slide-verify';
import "vue3-slide-verify/dist/style.css";

const $http = getCurrentInstance().appContext.config.globalProperties.$http;
const route = useRouter();

/** ------------------------ 全局配置 ------------------------ */
const isShowModal = ref(false); //验证框
const captchaVerified = ref(false);

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
    msg.value = '';
    formState.value.isRegisterForm = !formState.value.isRegisterForm;
    formState.value.currentOption = formState.value.isRegisterForm ? 'register' : 'login';
};
const selectedAnimation = computed(() => { //返回选中动画名
    return formState.value.currentOption === 'register' ? 'spaceInUp' : 'zoomIn';
});

/** ------------------------ 背景图切换 ------------------------ */
const randomIndex = ref();
const currentPageBackground = computed(() => {
    return {
        backgroundImage: `url('${backImages.value[randomIndex.value]}')`
    }
});
const backImages = ref([
    'src/assets/img/home/back1.webp',
    'src/assets/img/home/back2.webp',
    'src/assets/img/home/back3.webp',
    'src/assets/img/home/back4.webp',
    'src/assets/img/home/back5.webp',
    'src/assets/img/home/back6.webp'
]);
if (backImages.value.length > 0) {
    randomIndex.value = Math.floor(Math.random() * backImages.value.length);
};

/** ------------------------ 注册 ------------------------ */
const registerData = ref({
    userName: '',
    userEmail: '',
    userPassword: '',
    rePassword: '' //二次密码
});

const userId = `user-${uuidv4()}`;
const onCaptchaSuccess = () => {
    captchaVerified.value = true;
    isShowModal.value = false;
    handleRegisterAfterCaptcha();
};

const onCaptchaCancel = () => {
    isShowModal.value = false;
    captchaVerified.value = false;
};
// 注册后的验证码处理
const handleRegisterAfterCaptcha = async () => {
    try {
        const atIndex = registerData.value.userEmail.indexOf('@');
        const profileName = atIndex === -1 ? registerData.value.userEmail : registerData.value.userEmail.slice(0, atIndex);

        await $http.post('/user/register', {
            userId: userId,
            userName: registerData.value.userName,
            userEmail: registerData.value.userEmail,
            userPassword: registerData.value.userPassword,
            avatar_url: '/src/assets/img/shared/profile_picture/' + profileName + '.png'
        });

        message.success('注册成功！正在跳转登录页面...');
        setTimeout(() => {
            window.location.href = '/userInfo';
        }, 2000);
    } catch (error) {
        message.error(error.response.data.message);
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

    // 设置当前操作类型为注册
    isShowModal.value = true;
}

/** ------------------------ 登录 ------------------------ */

const defaultLoginInfo = ref({
    loginEmail: '',
    loginPassword: '',
})
const msg = ref('向右滑动');
const block = ref('');
const msgColor = ref(); //文本颜色
const placeholderText = ref('按住箭头向右拖动滑块'); //滑块提示文本
const isLoginLoading = ref(false); //登录状态 
const MAX_LOGIN_FAIL = 5; //允许的连续失败次数
const LOCK_SECONDS = 60; //达到失败上限后的冷却时长
const isSubmitting = ref(false); //登录请求重入锁
const failCount = ref(0); //连续失败计数
const lockLeft = ref(0); //冷却剩余秒数
let lockTimer = null;
let lockUntil = 0;
const customImages = ref([ //可滑动图片
    new URL('@/assets/img/shared/public-33.png', import.meta.url).href,
    new URL('@/assets/img/shared/public-34.png', import.meta.url).href,
    new URL('@/assets/img/shared/public-35.png', import.meta.url).href,
    new URL('@/assets/img/shared/public-36.png', import.meta.url).href,
    new URL('@/assets/img/shared/public-37.png', import.meta.url).href,
    new URL('@/assets/img/shared/public-38.png', import.meta.url).href,
])

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

// 关闭验证弹窗并清理滑块/提示残留，保证可再次打开
const resetCaptchaState = () => {
    block.value?.refresh?.();
    isShowModal.value = false;
    captchaVerified.value = false;
    msg.value = '向右滑动';
    msgColor.value = '';
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

const onAgain = () => {
    msg.value = "检测到非人为操作的哦！ try again";
    // 刷新
    block.value?.refresh();
};
// 图形验证码
const onSuccess = async (...args) => {
    if (isSubmitting.value) return; //重复滑动不再触发请求
    msgColor.value = 'green';
    msg.value = `login success, 耗时${(args[0]?.timestamp / 1000).toFixed(1)}s`;
    await handleLoginAfterCaptcha();
};

const onFail = () => { //失败后自动调用刷新方法
    msg.value = "验证不通过";
    msgColor.value = 'red';
};

// 登录后的验证码处理
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
            loginPassword: defaultLoginInfo.value.loginPassword
        });
        failCount.value = 0; //成功即清零
        defaultLoginInfo.value.loginPassword = '';
        isShowModal.value = false;
        captchaVerified.value = false;
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
    
    msg.value = '向右滑动';
    msgColor.value = '';
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

onMounted(() => {
    let switchCtn = document.querySelector("#switch-cnt");
    let switchC1 = document.querySelector("#switch-c1");
    let switchC2 = document.querySelector("#switch-c2");
    let switchCircle = document.querySelectorAll(".switch__circle");
    let switchBtn = document.querySelectorAll(".switch__button");
    let aContainer = document.querySelector("#a-container");
    let bContainer = document.querySelector("#b-container");
    let allButtons = document.querySelectorAll(".submit");
    let getButtons = e => e.preventDefault();
    let changeForm = e => {
        switchCtn.classList.toggle("is-txr");
        switchCircle[0].classList.toggle("is-txr");
        switchCircle[1].classList.toggle("is-txr");
        switchC1.classList.toggle("is-hidden");
        switchC2.classList.toggle("is-hidden");
        aContainer.classList.toggle("is-txl");
        bContainer.classList.toggle("is-txl");
        aContainer.classList.toggle("is-z200");
        switchC2.classList.toggle("is-z200");
        toggleForm();
    };
    let mainF = e => {
        for (var i = 0; i < allButtons.length; i++) {
            allButtons[i].addEventListener("click", getButtons);
        }
        for (var i = 0; i < switchBtn.length; i++) {
            switchBtn[i].addEventListener("click", changeForm);
        }
    };
    window.addEventListener("load", mainF);

})

onBeforeUnmount(() => {
    clearLockTimer();
})
</script>

<style scoped lang="scss">
#userLogin {
    width: 100vw;
    height: 100vh;
    font-family: var(--app-font-family);
    font-size: 0.75rem;
    position: relative;
    overflow: hidden;

    &::after {
        content: "";
        @include mask-overlay(#00000030, 100%, absolute, -1);
        pointer-events: none;
    }

    //验证组件样式
    .verification-msg {
        height: 2rem;
        line-height: 2rem;
        text-align: left;
        width: 100%;
    }

    .backPhoto {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-origin: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        animation: fadeIn 1s;
    }
}

.layout {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .main {
        width: 40rem;
        height: 30rem;
        border-radius: 0.75rem;
        margin: 0 auto;
        z-index: 1;
        position: relative;
    }
}

// 按钮公共样式
.button {
    color: #fff;
    font-size: 0.8rem;
    margin-top: 30px;
    padding: 8px 40px;
    border-radius: 20px;
    transition: all 0.3s ease-out !important;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 20rem;
    height: 100%;
    padding: 1.56rem;
    color: white;
    background-color: #f2405690;
    transition: 1.25s;

    input {
        color: black;
    }
}

.form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .form__button {
        border: 1px solid #fff;

        &:hover {
            background-color: #fff;
            color: black;
        }
    }
}

.login_email {
    position: relative;

    img {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        width: 0.9rem;
    }
}

.form__input {
    width: 17rem;
    height: 2.1rem;
    margin: 0.25rem 0;
    padding: 0 1.4rem;
    font-size: 0.9rem;
    letter-spacing: 0.01rem;
    border: none;
    outline: none;
    font-family: var(--app-font-family);
    background-color: #ecf0f3;
    transition: 0.25s ease;
    border-radius: 0.5rem;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.form__input:focus {
    box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.form__span {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 0.8rem;
}

.form__link {
    font-size: 0.8rem;
    margin-top: 1.56rem;
    border-bottom: 1px solid #f7f7f7;
    line-height: 1;
    cursor: pointer;
}

.title {
    font-size: 1.7rem;
    font-weight: 700;
    line-height: 2;
}

.description {
    font-size: 0.8rem;
    letter-spacing: 0.02rem;
    text-align: center;
    line-height: 1.6;
}


.a-container {
    left: calc(100% - 20rem);
    opacity: 0;
}

.b-container {
    left: calc(100% - 20rem);
}

// 左侧切换板块
.switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 20rem;
    padding: 3.13rem;
    z-index: 200;
    transition: 1.25s;
    background-color: #ffffffe6;
    color: black;
    overflow: hidden;

    .switch__button {
        color: black;
        border: 1px solid #f24056;

        &:hover {
            background-color: #f24056;
            color: #fff;
        }
    }
}

.switch__circle {
    position: absolute;
    width: 22rem;
    height: 24rem;
    border-radius: 50%;
    box-shadow: inset 0.5rem 0.5rem 0.75rem #bfccdf, inset -0.5rem -0.5rem 0.75rem #f9f9f9;
    bottom: -60%;
    left: -30%;
    transition: 1.25s;
}

.switch__circle--t {
    top: -35%;
    left: 60%;
    width: 16rem;
    height: 16rem;
}

.switch__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 25rem;
    padding: 3.13rem 3.44rem;
    transition: 1.25s;
}

/**/
.is-txr {
    left: calc(100% - 20rem);
    transition: 1.25s;
    transform-origin: left;
}

.is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
    opacity: 0;
}

.is-z200 {
    z-index: 1;
    transition: 1.25s;
    opacity: 1;
}

.is-hidden {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    transition: 1.25s;
}
</style>
