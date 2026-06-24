<template>
  <form action="#" class="main" :class="{ 'on-start': isOnstart, 'document-loaded': isOnloaded }" @submit.prevent>
    <div class="form">
      <!-- 启动遮罩 -->
      <div class="form__cover"></div>
      <!-- 加载动画 -->
      <div class="form__loader">
        <div class="spinner">
          <svg class="spinner__circular" viewBox="25 25 50 50">
            <circle class="spinner__path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10">
            </circle>
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
            <div class="step-item" :class="{ active: step === 1, done: step > 1 }">
              <span class="step-dot"></span>
              <span class="step-label">验证</span>
            </div>
            <div class="step-line">
              <span class="step-line__fill" :class="{ filled: step > 1 }"></span>
            </div>
            <div class="step-item" :class="{ active: step === 2 }">
              <span class="step-dot"></span>
              <span class="step-label">设置</span>
            </div>
          </div>

          <!-- Step 1 -->
          <div v-if="step === 1" class="step-form" :class="{ 'anim-ready': animReady }">
            <div class="styled-input form-row" :class="{ filled: accountFilled }">
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
                <input type="text" class="styled-input__input" v-model="code" ref="codeInputRef" @focus="onCodeFocus"
                  @blur="onCodeBlur">
                <div class="styled-input__placeholder">
                  <span class="styled-input__placeholder-text">
                    <span v-for="(char, i) in codeLetters" :key="i" class="letter"
                      :class="{ active: codeActiveMap[i] }">{{ char }}</span>
                  </span>
                </div>
                <div class="styled-input__circle"></div>
              </div>
              <button type="button" class="code-btn" :disabled="countdown > 0 || !isAccountValid" @click="sendCode">
                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </button>
            </div>

            <div class="form-row">
              <div class="styled-input form-row__input" :class="{ filled: captchaFilled }">
                <input type="text" class="styled-input__input captcha-input" v-model="captchaInput" maxlength="4"
                  ref="captchaInputRef" @focus="onCaptchaFocus" @blur="onCaptchaBlur">
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
            <div class="styled-input form-row" :class="{ filled: newPasswordFilled }">
              <input type="password" class="styled-input__input" v-model="newPassword" ref="newPasswordInputRef"
                @focus="onNewPasswordFocus" @blur="onNewPasswordBlur">
              <div class="styled-input__placeholder">
                <span class="styled-input__placeholder-text">
                  <span v-for="(char, i) in newPasswordLetters" :key="i" class="letter"
                    :class="{ active: newPasswordActiveMap[i] }">{{ char }}</span>
                </span>
              </div>
              <div class="styled-input__circle"></div>
            </div>

            <div class="styled-input form-row" :class="{ filled: confirmPasswordFilled }">
              <input type="password" class="styled-input__input" v-model="confirmPassword" ref="confirmPasswordInputRef"
                @focus="onConfirmPasswordFocus" @blur="onConfirmPasswordBlur">
              <div class="styled-input__placeholder">
                <span class="styled-input__placeholder-text">
                  <span v-for="(char, i) in confirmPasswordLetters" :key="i" class="letter"
                    :class="{ active: confirmPasswordActiveMap[i] }">{{ char }}</span>
                </span>
              </div>
              <div class="styled-input__circle"></div>
            </div>

            <div class="btn-row">
              <button type="button" class="styled-button styled-button--secondary" @click="goStepOne">
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
import { ref, reactive, onMounted, computed, nextTick } from 'vue';
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

/* ===== 动画控制（挂载瞬间抑制，之后 JS 触发） ===== */
const animReady = ref(true);

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

/* ===== 步骤切换时清空 + 恢复动画状态 ===== */
function clearAllAnimStates() {
  [accountFilled, codeFilled, captchaFilled, newPasswordFilled, confirmPasswordFilled]
    .forEach(r => r.value = false);
  [accountActiveMap, codeActiveMap, captchaActiveMap, newPasswordActiveMap, confirmPasswordActiveMap]
    .forEach(m => Object.keys(m).forEach(k => delete m[k]));
}

function restoreAnimForStep(target) {
  const map = {
    1: [
      [account, accountFilled, accountActiveMap, accountLetters],
      [code, codeFilled, codeActiveMap, codeLetters],
      [captchaInput, captchaFilled, captchaActiveMap, captchaLetters],
    ],
    2: [
      [newPassword, newPasswordFilled, newPasswordActiveMap, newPasswordLetters],
      [confirmPassword, confirmPasswordFilled, confirmPasswordActiveMap, confirmPasswordLetters],
    ],
  };
  (map[target] || []).forEach(([valRef, filledRef, activeMap, letters]) => {
    if (valRef.value) {
      filledRef.value = true;
      staggerActive(activeMap, letters, true);
    }
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
    style: { color: '#ffffff', fontFamily: 'gtpy' },
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
  if (!validateStepOne()) return;
  animReady.value = false;
  clearAllAnimStates();
  step.value = 2;
  nextTick(() => {
    animReady.value = true;
    restoreAnimForStep(2);
  });
}

function goStepOne() {
  animReady.value = false;
  clearAllAnimStates();
  step.value = 1;
  nextTick(() => {
    animReady.value = true;
    restoreAnimForStep(1);
  });
}

function onStepTwoSubmit() {
  if (!newPassword.value || !confirmPassword.value) { message.warning('请填写所有字段'); return; }
  if (newPassword.value.length < 6) { message.warning('新密码长度不能少于6位'); return; }
  if (newPassword.value !== confirmPassword.value) { message.warning('两次输入的新密码不一致'); return; }
  message.success('密码修改成功');
  isSuccess.value = true;
  goStepOne();
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
@use "@/styles/color.scss" as *;

// ── 页面专属变量（基于参考项目 html5-css3-focus-shining-form 原始色值） ──
$page-bg: #3f2766;
$page-surface: #4d317a;
$page-accent: #714cab;

// ═══════════════════════════════════════════════════════════
// .main — 参考项目 main 完整移植（body.on-start → .main.on-start）
// ═══════════════════════════════════════════════════════════
.main {
  @include flexCenter(row, center);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &.on-start {
    .form__cover::before {
      transform: scale(0.15);
    }
  }

  &.document-loaded {
    .form__loader {
      transform: scale(0);
      opacity: 0;
      visibility: hidden;
    }

    .form__content {
      opacity: 1;
      transform: none;
    }

    .form__cover {
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);

      &::after {
        transform: scale(2);
      }

      &::before {
        transition: transform 2s ease, opacity 0.3s ease 0.8s;
        transform: scale(2);
        opacity: 0;
      }
    }
  }
}

// ═══════════════════════════════════════
// .form + .form__cover — 参考项目完整移植
// ═══════════════════════════════════════
.form {
  @include flexCenter(row, center);
  position: relative;
  width: 500px;
  height: 500px;
  min-height: 400px;
  flex-shrink: 0;
  padding: 0 20px;
  border-radius: 5px;
}

.form__cover {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -4;
  border-radius: 7px;
  overflow: hidden;
  transition: all 0.3s ease 0.8s;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: $page-surface;
    z-index: -4;
    border-radius: 50%;
    transition: all 1.5s ease 0.3s;
    transform: scale(0);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: white;
    z-index: -5;
    border-radius: 50%;
    transition: all 0.5s ease;
    transform: scale(0);
  }
}

// ═══════════════════════════════════
// .form__loader — 参考项目完整移植
// ═══════════════════════════════════
.form__loader {
  @include flexCenter(row, center);
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -4;
  transition: all 0.5s ease;
}

// ═══════════════════════════════════
// .spinner — 参考项目完整移植
// ═══════════════════════════════════
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
    stroke: #7b23ff;
    animation-play-state: running;
  }
}

// ═══════════════════════════════════
// .form__content — 参考项目完整移植
// ═══════════════════════════════════
.form__content {
  text-align: center;
  @include flexCenter(column, flex-start);
  position: relative;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.5s ease 0.7s;
  width: 100%;

  // ═══ h1 — 参考项目完整移植 ═══
  h1 {
    font-size: 30px;
    letter-spacing: 0.05em;
    color: $page-accent;
    font-weight: 700;

    &.title--small {
      font-size: 28px;
    }
  }

  // ═══════════════════════════════════
  // 步骤指示器（ResetPassword 专属，深紫调色板风格）
  // ═══════════════════════════════════
  .step-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-bottom: 28px;
    padding: 1.5rem 0;
    gap: 0;

    .step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      position: relative;
      z-index: 1;
    }

    .step-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
      border: 2px solid rgba(255, 255, 255, 0.1);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .step-item.active .step-dot {
      background: $page-accent;
      border-color: $page-accent;
      color: #fff;
      box-shadow: 0 0 16px rgba($page-accent, 0.45), 0 0 32px rgba($page-accent, 0.15);
      animation: dotPulse 2s ease-in-out infinite;
    }

    .step-item.done .step-dot {
      background: $page-accent;
      border-color: $page-accent;
      color: #fff;
      box-shadow: 0 0 8px rgba($page-accent, 0.25);
    }

    .step-label {
      font-size: 0.6rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.25);
      letter-spacing: 0.03em;
      transition: color 0.4s ease;
      white-space: nowrap;
    }

    .step-item.active .step-label {
      color: rgba(255, 255, 255, 0.85);
    }

    .step-item.done .step-label {
      color: rgba(255, 255, 255, 0.45);
    }

    .step-line {
      position: relative;
      width: 80px;
      height: 2px;
      background: rgba(255, 255, 255, 0.06);
      margin: 0 6px;
      margin-bottom: 6px;
      overflow: hidden;
      border-radius: 1px;

      .step-line__fill {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 0%;
        background: $page-accent;
        border-radius: 1px;
        transition: width 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 0 8px rgba($page-accent, 0.5);

        &.filled {
          width: 100%;
        }
      }
    }
  }

  // ═══════════════════════════════════
  // 步骤表单（ResetPassword 专属）
  // ═══════════════════════════════════
  .step-form {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0;
    padding-bottom: 8px;
    width: 100%;
    position: relative;
  }

  // ═══════════════════════════════════
  // 表单行（ResetPassword 专属）
  // ═══════════════════════════════════
  .form-row {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin: 15px 0;

    .form-row__input {
      flex: 1;
      margin-bottom: 0;
    }
  }

  // ═══════════════════════════════════
  // .styled-input — 参考项目完整移植
  // ═══════════════════════════════════
  .styled-input {
    width: 100%;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(255, 255, 255, 0.4);
    }

    &.filled {
      border-color: rgba(255, 255, 255, 0.2);

      .styled-input__circle::after {
        transform: scale(90);
        opacity: 0;
      }
    }

    .styled-input__circle {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      overflow: hidden;
      border-radius: 3px;

      &::after {
        content: '';
        position: absolute;
        left: 16.5px;
        top: 18px;
        height: 10px;
        width: 10px;
        z-index: -2;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0);
        transition: transform 0.6s ease, opacity 1s ease;
      }
    }

    .styled-input__input {
      width: 100%;
      -webkit-appearance: none;
      font-size: 14px;
      outline: none;
      background: none;
      padding: 11px 15px;
      color: #ceafff;
      border: none;
      font-weight: 600;
      letter-spacing: 0.035em;
    }

    .styled-input__placeholder {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      z-index: -1;
      padding-left: 45px;
      color: white;
    }

    .styled-input__placeholder-text {
      perspective: 500px;
      display: inline-block;
      font-size: 0.7rem;

      .letter {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        text-shadow: 0 0 5px;

        .anim-ready & {
          animation: letterAnimOut 0.25s ease forwards;
        }

        &.active {
          .anim-ready & {
            animation: letterAnimIn 0.25s ease forwards;
          }
        }
      }
    }

    // captcha-input 变体（ResetPassword 专属）
    .captcha-input {
      letter-spacing: 2px;
      font-weight: 700;
      font-size: 14px;
      caret-color: $page-accent;

      &::selection {
        background: rgba($page-accent, 0.35);
        color: #fff;
      }
    }
  }

  // ═══════════════════════════════════
  // 验证码按钮（ResetPassword 专属，深紫调色板风格）
  // ═══════════════════════════════════
  .code-btn {
    flex-shrink: 0;
    padding: 11px 14px;
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background: transparent;
    color: $page-accent;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    @include theme-transition();

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  // ═══════════════════════════════════
  // 图形验证码（ResetPassword 专属，深紫调色板风格）
  // ═══════════════════════════════════
  .captcha-display {
    flex-shrink: 0;
    padding: 14px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 64px;
    border-radius: 3px;
    border: 1px solid rgba($page-accent, 0.3);
    background: linear-gradient(160deg, #2d1c4e 0%, $page-surface 40%, #5a3b8a 100%);
    color: $page-accent;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 6px;
    cursor: pointer;
    user-select: none;
    text-shadow: 0 0 6px rgba($page-accent, 0.35);
    @include theme-transition();

    &:hover {
      border-color: rgba($page-accent, 0.6);
      color: #fff;
      text-shadow: 0 0 10px rgba($page-accent, 0.6), 0 0 20px rgba($page-accent, 0.25);
      box-shadow: 0 0 14px rgba($page-accent, 0.25);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0) scale(0.97);
    }
  }

  // ═══════════════════════════════════
  // 按钮行（ResetPassword 专属）
  // ═══════════════════════════════════
  .btn-row {
    display: flex;
    gap: 12px;
    margin-top: 1.5rem;

    .styled-button {
      flex: 1;
      width: auto;
      margin-bottom: 0;
    }
  }

  // ═══════════════════════════════════
  // .styled-button — 参考项目完整移植
  // ═══════════════════════════════════
  .styled-button {
    cursor: pointer;
    font-size: 14px;
    width: 100%;
    padding: 11px 20px;
    outline: none;
    background: none;
    position: relative;
    color: #492e72;
    border-radius: 3px;
    margin-bottom: 25px;
    border: none;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.1em;
    background: #714cac;
    transition: all 0.3s ease;
    overflow: hidden;

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
      @include flexCenter(row, center);
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
        color: #492e72;
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

    &:hover,
    &:active {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      background: #7a51bb;

      .face {
        transform: translateX(100%);

        .styled-button__text-holder {
          transform: translateX(-100%);
        }
      }

      .back {
        transform: translateX(0);

        .styled-button__text-holder {
          transform: translateX(0);
        }
      }
    }

    &:active {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    // ── 次级按钮（ResetPassword 专属，深紫调色板风格） ──
    &.styled-button--secondary {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;

      .styled-button__moving-block {
        &.face {
          color: rgba(255, 255, 255, 0.6);
        }

        &.back {
          color: $page-accent;
        }
      }

      &:hover,
      &:active {
        background: rgba($page-accent, 0.08);
        border-color: rgba($page-accent, 0.4);
        box-shadow: 0 0 10px rgba($page-accent, 0.1);
        color: $page-accent;

        .styled-button__moving-block {
          &.face {
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
    }
  }

  // ═══════════════════════════════════
  // 成功状态（ResetPassword 专属，深紫调色板风格）
  // ═══════════════════════════════════
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0 10px;
    width: 100%;

    .styled-button {
      flex: none;
      width: 100%;
      margin-bottom: 0;
    }
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
      stroke: #7b23ff;
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

  .success-title {
    font-size: 20px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
    margin: 0 0 6px 0;
    letter-spacing: 0.03em;
  }

  .success-sub {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
    margin: 0 0 28px 0;
  }
}

// ═══════════════════════════════════════════
// @keyframes — 参考项目完整移植
// ═══════════════════════════════════════════

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

@keyframes letterAnimIn {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, 10px);
    color: red;
  }

  45% {
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }

  55% {
    transform: translate(0, 10px);
    opacity: 0;
  }

  56% {
    transform: translate(-30px, -27px);
    opacity: 0;
    color: #00ff6b;
  }

  76% {
    color: #00ff6b;
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
    color: red;
  }

  56% {
    transform: translate(0, 10px);
    color: red;
  }

  100% {
    transform: translate(0, 0);
  }
}

// ═══════════════════════════════════════════
// @keyframes — ResetPassword 专属
// ═══════════════════════════════════════════

@keyframes dotPulse {

  0%,
  100% {
    box-shadow: 0 0 16px rgba($page-accent, 0.45), 0 0 32px rgba($page-accent, 0.15);
  }

  50% {
    box-shadow: 0 0 24px rgba($page-accent, 0.6), 0 0 48px rgba($page-accent, 0.25);
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
    box-shadow: inset 0 0 0 100px rgba(255, 255, 255, 0.06);
  }
}

/* 仅在 anim-ready 时启用 letter 动画（防止 v-if 重建时的初始动画闪烁） */
.step-form.anim-ready .letter {
  animation: letterAnimOut 0.25s ease forwards;
}
.step-form.anim-ready .letter.active {
  animation: letterAnimIn 0.25s ease forwards;
}
</style>
