<template>
  <div class="reset-password-container">
    <div class="reset-password-card">
      <h2>重置密码</h2>
      <div class="steps">
        <div :class="['step', { active: step === 1 }]">1. 验证身份</div>
        <div :class="['step', { active: step === 2 }]">2. 修改密码</div>
      </div>
      <form v-if="step === 1" @submit.prevent="onAccountAndCodeSubmit">
        <section class="form-content">
          <div class="input-group">
            <span class="input">
              <input
                class="input__field"
                v-model="account"
                id="account"
                required
                :data-has-value="!!account"
              />
              <label class="input__label" for="account">
                <span class="input__label-conten">邮箱或手机号</span>
              </label>
            </span>
          </div>
          <div class="input-group">
            <span class="input">
              <input
                class="input__field"
                v-model="code"
                id="code"
                required
                :data-has-value="!!code"
              />
              <label class="input__label" for="code">
                <span class="input__label-content">请输入验证码</span>
              </label>
            </span>
            <button
              type="button"
              class="send-code-btn"
              :disabled="countdown > 0 || !validateAccount(account)"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}s重发` : "验证码" }}
            </button>
          </div>
          <div class="input-group">
            <span class="input">
              <input
                class="input__field"
                id="captchaInput"
                maxlength="4"
                required
                v-model="captchaInput"
                :data-has-value="!!captchaInput"
              />
              <label class="input__label" for="captchaInput">
                <span class="input__label-content">图形验证码</span>
              </label>
            </span>
            <span
              class="captcha-img"
              @click="generateCaptcha"
              :title="'点击更换验证码'"
              >{{ captcha }}</span
            >
          </div>
        </section>
        <div class="btn-row">
          <button type="submit">下一步</button>
        </div>
        {{ codeSent }}
      </form>
      <form v-else @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="newPassword">新密码</label>
          <input
            v-model="newPassword"
            type="password"
            id="newPassword"
            placeholder="请输入新密码"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认新密码</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="请再次输入新密码"
            required
          />
        </div>
        <div class="btn-row">
          <button type="button" class="back-btn" @click="step = 1">
            上一步
          </button>
          <button type="submit">确认修改</button>
        </div>
      </form>
      <div
        v-if="message"
        :class="{ error: isError, success: !isError }"
        class="msg"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const step = ref(1);
const account = ref("");
const code = ref("");
const codeSent = ref("");
const countdown = ref(0);
let timer = null;
const newPassword = ref("");
const confirmPassword = ref("");
const message = ref("");
const isError = ref(false);
const captcha = ref("");
const captchaInput = ref("");

function validateAccount(val) {
  // 简单邮箱或手机号正则
  return (
    /^(1[3-9]\d{9})$/.test(val) || /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(val)
  );
}

function onAccountAndCodeSubmit() {
  message.value = "";
  isError.value = false;
  if (!account.value) {
    message.value = "请输入邮箱或手机号";
    isError.value = true;
    return;
  }
  if (!validateAccount(account.value)) {
    message.value = "请输入正确的邮箱或手机号";
    isError.value = true;
    return;
  }
  if (!code.value) {
    message.value = "请输入验证码";
    isError.value = true;
    return;
  }
  if (
    !captchaInput.value ||
    captchaInput.value.toUpperCase() !== captcha.value
  ) {
    message.value = "图形验证码错误";
    isError.value = true;
    generateCaptcha();
    return;
  }
  if (code.value !== codeSent.value) {
    message.value = "验证码错误";
    isError.value = true;
    return;
  }
  step.value = 2;
}

function sendCode() {
  if (countdown.value > 0) return;
  // 生成6位验证码
  codeSent.value = String(Math.floor(100000 + Math.random() * 900000));
  message.value = `验证码已发送: ${codeSent.value}`;
  isError.value = false;
  countdown.value = 30;
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
}

function generateCaptcha() {
  // 生成4位大写字母+数字
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let str = "";
  for (let i = 0; i < 4; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  captcha.value = str;
}
// 初始生成
if (typeof window !== "undefined") generateCaptcha();

function onSubmit() {
  message.value = "";
  isError.value = false;
  if (!newPassword.value || !confirmPassword.value) {
    message.value = "请填写所有字段";
    isError.value = true;
    return;
  }
  if (newPassword.value.length < 6) {
    message.value = "新密码长度不能少于6位";
    isError.value = true;
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    message.value = "两次输入的新密码不一致";
    isError.value = true;
    return;
  }
  // 实际应后端请求，这里仅本地演示
  message.value = "密码修改成功！";
  isError.value = false;
  step.value = 1;
  account.value = "";
  code.value = "";
  codeSent.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
}
</script>

<style scoped lang="scss">
.reset-password-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
}

.reset-password-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 2.5rem 2rem 2rem 2rem;
  width: 700px;
  height: 600px;
  display: flex;
  flex-direction: column;
  position: relative;
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #f76d6d;
  }
  form {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .btn-row {
    margin-top: auto;
    margin-bottom: 0;
    position: absolute;
    left: 2rem;
    right: 2rem;
    bottom: 2rem;
    display: flex;
    justify-content: space-around;
    gap: 2rem;
  }
}

.steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin-top: 0.5rem;
  .step {
    flex: 1;
    text-align: center;
    padding: 0.5rem 0;
    border-bottom: 2px solid #eee;
    color: #aaa;
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s, border-color 0.2s;
    &.active {
      color: #f76d6d;
      border-bottom: 2.5px solid #f76d6d;
    }
  }
}
// 表单样式
.form-content {
  .input-group {
    .input {
      position: relative;
      display: block;
      width: 100%;
      input {
        width: 100%;
        padding: 0.5rem 0 0.2rem 0;
        border: none;
        border-bottom: 2px solid #918278;
        border-radius: 0;
        background: transparent;
        font-size: 1rem;
        transition: border-color 0.2s;
        box-shadow: none;
        &::placeholder {
          color: transparent;
        }
        &:focus {
          border-bottom: 2px solid #ed0707;
          outline: none;
        }
        &:focus + .input__label,
        &[data-has-value="true"] + .input__label {
          color: #ed0707;
          transform: translateY(-1.2em) scale(0.85);
        }
      }
      .input__label {
        position: absolute;
        left: 0;
        bottom: 0.2rem;
        font-size: 1rem;
        color: #918278;
        pointer-events: none;
        transition: color 0.2s, transform 0.2s;
        transform-origin: left bottom;
        background: #fff;
        padding: 0 0.2em;
      }
    }
  }
}
.graphic {
  position: absolute;
  top: 0;
  left: 0;
  fill: none;
  &--nao {
    stroke: #92989e;
    pointer-events: none;
    -webkit-transition: -webkit-transform 0.7s, stroke 0.7s;
    transition: transform 0.7s, stroke 0.7s;
    -webkit-transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
  }
}

//数字验证码
.send-code-btn,
.captcha-img {
  padding: 0.5rem 1rem;
  min-width: 6rem;
  text-align: center;
  max-width: 6rem;
  letter-spacing: 2px;
  border: none;
  border-radius: 6px;
  background: #fda085;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
  &:disabled {
    background: #eee;
    color: #aaa;
    cursor: not-allowed;
  }
}
// 图形验证码
.captcha-img {
  display: inline-block;
  background: repeating-linear-gradient(
    135deg,
    #f6d365,
    #fda085 10px,
    #fff 20px
  );
  color: #f76d6d;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid #fda085;
  transition: background 0.2s;
  &:hover {
    background: repeating-linear-gradient(
      135deg,
      #fda085,
      #f6d365 10px,
      #fff 20px
    );
  }
}

button[type="submit"] {
  width: 50%;
  padding: 0.7rem;
  background: linear-gradient(90deg, #fda085, #f6d365);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #f6d365, #fda085);
  }
}

.msg {
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
  &.error {
    color: #e74c3c;
  }
  &.success {
    color: #27ae60;
  }
}

.btn-row {
  display: flex;
  justify-content: space-around;
  gap: 2rem;
}

.back-btn {
  width: 50%;
  background: #eee;
  color: #f76d6d;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #f6d365;
  }
}
</style>
