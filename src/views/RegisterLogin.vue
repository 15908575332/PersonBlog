<template>
    <div id="userLogin">
        <!-- 背景图 -->
        <div class="backPhoto" :style=videoSrc></div>
        <!-- 遮罩 -->
        <div class="mask"></div>
        <div class="main">
            <!-- 注册 sign up -->
            <div class="container a-container" id="a-container">
                <form class="form" id="a-form" :model="registerData">
                    <h2 class="form_title title incline_en">创建账户</h2>
                    <span class="form__span">或者使用你的邮箱进行注册</span>
                    <input class="form__input" type="text" placeholder="用户名" required v-model="registerData.userName">
                    <input class="form__input" type="text" autocomplete="userEmail" placeholder="邮箱"
                        v-model="registerData.userEmail">
                    <input class="form__input" type="password" autocomplete="current-password" placeholder="密码"
                        v-model="registerData.userPassword">
                    <input class="form__input" type="password" autocomplete="new-password" placeholder="再次输入密码"
                        v-model="rePassword" @input="checkRePassword">

                    <button class="form__button button submit" type="submit"
                        @click="UserRegister"><span>注册</span></button>
                </form>
            </div>
            <!-- 登录 sign in -->
            <div class="container b-container" id="b-container">
                <form class="form" id="b-form" method="" :model="defaultLoginInfo">
                    <h2 class="form_title title incline_en"><span>登录</span></h2>
                    <span class="form__span">或者使用你的电子邮箱账户</span>
                    <input class="form__input" autocomplete="username" type="email" required placeholder="电子邮箱"
                        v-model="defaultLoginInfo.loginEmail">
                    <input class="form__input" type="password" autocomplete="current-password" placeholder="请输入你的密码"
                        v-model="defaultLoginInfo.loginPassword">
                    <a href="/resetPassword" class="form__link">忘记密码</a>
                    <button class="form__button button submit" @click="login"><span>登录</span></button>
                </form>
            </div>
            <!-- login/register 切换按钮 -->
            <div class="switch" id="switch-cnt">
                <div class="switch__circle"></div>
                <div class="switch__circle switch__circle--t"></div>
                <div class="switch__container" id="switch-c1">

                    <h2 class="switch__title title incline_en">没有账号？</h2>
                    <p class="switch__description description">
                        <img src="@/assets/icon/registerLogin/register-icon.svg"></img>
                        <span>立即注册吧</span>
                    </p>

                    <button class="switch__button button switch-btn"><span>注册</span></button>
                </div>
                <div class="switch__container is-hidden" id="switch-c2">

                    <h2 class="switch__title title incline_en">已有账号？</h2>
                    <p class="switch__description description">
                        <img src="@/assets/icon/registerLogin/login-icon.svg"></img>
                        <span>请登录</span>
                    </p>
                    <button class="switch__button button"><span>登录</span></button>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const route = useRouter();
const timer = ref();
const randomIndex = ref();
const videoSrc = computed(() => {
    return {
        backgroundImage: `url('${videoUrls.value[randomIndex.value]}')`
    }
});
const videoUrls = ref([
    'src/assets/img/homePage/back1.webp',
    'src/assets/img/homePage/back2.webp',
    'src/assets/img/homePage/back3.webp',
    'src/assets/img/homePage/back4.webp',
    'src/assets/img/homePage/back5.webp',
    'src/assets/img/homePage/back6.webp'
]);

const defaultLoginInfo = ref({
    loginEmail: '15908575332@163.com',
    loginPassword: '123456',
})
//注册
const registerData = ref({
    userName: '',
    userEmail: '',
    userPassword: ''
});

const rePassword = ref(''); //校验二次密码
//校验密码
const checkRePassword = () => {
    if (registerData.value.userPassword !== rePassword.value) {

        console.log('密码不一致')
    } else {
        console.log(true)
    }
}
//用户注册
async function UserRegister() {
    try {
        const response = await axios.post('http://localhost:3000/user/register', {
            userName: registerData.value.userName,
            userEmail: registerData.value.userEmail,
            userPassword: registerData.value.userPassword

        });
        if (response.data.code === '0') {
            // alert('注册成功，请登录');
            // startRes.value = !startRes.value; //切换到登录界面
        } else {
            alert(response.data.msg);
        }
    } catch (error) {
        console.error('注册失败:', error);
        alert('注册失败，请稍后再试');
    }
}
//用户登录
const login = async () => {
    // var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //邮箱校验规则
    // if (!emailPattern.test(registerData.value.email)) {
    //     alert('请输入正确的邮箱地址ecample@xxx.com')
    //     return false
    // }
    if (!defaultLoginInfo.value.loginPassword) {
        alert('密码不能为空')
        return false
    }
    try {
        const response = await axios.post('http://localhost:3000/user/login', {
            loginEmail: defaultLoginInfo.value.loginEmail,
            loginPassword: defaultLoginInfo.value.loginPassword
        });
        if (response) {
            alert('登录成功');
            localStorage.setItem('token', response.data.token);
            route.replace('/home');
        }

    } catch (error) {
        alert(error.response.data.msg);

    }
}

onMounted(() => {
    //背景图索引值
    if (videoUrls.value.length > 0) {
        randomIndex.value = Math.floor(Math.random() * videoUrls.value.length);
    };
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
    clearInterval(timer.value);
})
</script>

<style scoped lang="scss">
#userLogin {
    width: 100vw;
    height: 100vh;
    font-family: 'gtpy';
    font-size: 0.75rem;
    position: relative;
    overflow: hidden;

    .mask {
        background-color: #00000030;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;

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

.main {
    position: relative;
    width: 40rem;
    height: 30rem;
    border-radius: 0.75rem;
    margin: 18vh auto;
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

.form__input {
    width: 17rem;
    height: 2.1rem;
    margin: 0.25rem 0;
    padding-left: 1.56rem;
    font-size: 0.7rem;
    letter-spacing: 0.01rem;
    border: none;
    outline: none;
    font-family: "Montserrat", sans-serif;
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