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
            <div class="step-segment step-segment--left">
              <div class="step-line"></div>
              <div class="step-progress" :style="{ width: leftProgress }"></div>
            </div>
            <div class="step-item" :class="{ active: step === 1, done: step > 1 }">
              <span class="step-label">验证身份</span>
            </div>
            <div class="step-segment step-segment--middle">
              <div class="step-line"></div>
              <div class="step-progress" :style="{ width: middleProgress }"></div>
            </div>
            <div class="step-item" :class="{ active: step === 2 }">
              <span class="step-label">设置密码</span>
            </div>
            <div class="step-segment step-segment--right">
              <div class="step-line"></div>
              <div class="step-progress" :style="{ width: rightProgress }"></div>
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
              <button type="button" class="code-btn" :disabled="countdown > 0 || !isAccountValid || loading"
                @click="sendCode">
                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </button>
            </div>

            <div class="btn-row">
              <button type="button" class="styled-button styled-button--outline" @click="goLogin">
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
          <div v-else class="step-form" :class="{ 'anim-ready': animReady }">
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
              <button type="button" class="styled-button styled-button--outline" @click="goStepOne">
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
import { message } from 'ant-design-vue';
import request from '@/utils/request';

const router = useRouter();

/* ===== 入场动画状态 ===== */
const isOnstart = ref(false);
const isOnloaded = ref(false);

/* ===== 步骤与成功状态 ===== */
const step = ref(1);
const isSuccess = ref(false);

/* ===== 加载状态 ===== */
const loading = ref(false);

/* ===== Step1 数据 ===== */
const account = ref('');
const code = ref('');
const countdown = ref(0);
let timer = null;

/* ===== Step2 数据 ===== */
const newPassword = ref('');
const confirmPassword = ref('');

/* ===== 输入框 letter 数组 ===== */
const accountLetters = [...'邮箱地址'];
const codeLetters = [...'请输入验证码'];
const newPasswordLetters = [...'请输入新密码（不少于6位）'];
const confirmPasswordLetters = [...'请再次输入新密码'];

/* ===== activeMap（逐字母动画） ===== */
const accountActiveMap = reactive({});
const codeActiveMap = reactive({});
const newPasswordActiveMap = reactive({});
const confirmPasswordActiveMap = reactive({});

/* ===== filled 状态 ===== */
const accountFilled = ref(false);
const codeFilled = ref(false);
const newPasswordFilled = ref(false);
const confirmPasswordFilled = ref(false);

/* ===== inputRef ===== */
const accountInputRef = ref(null);
const codeInputRef = ref(null);
const newPasswordInputRef = ref(null);
const confirmPasswordInputRef = ref(null);

/* ===== 动画控制（挂载瞬间抑制，之后 JS 触发） ===== */
const animReady = ref(true);

/* ===== 计算属性 ===== */
const isAccountValid = computed(() => {
  return /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(account.value);
});

const leftProgress = computed(() => {
  return step.value >= 1 ? '100%' : '0%';
});

const middleProgress = computed(() => {
  if (step.value >= 2) return '100%';
  if (step.value === 1) return '50%';
  return '0%';
});

const rightProgress = computed(() => {
  return step.value >= 2 ? '50%' : '0%';
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
  [accountFilled, codeFilled, newPasswordFilled, confirmPasswordFilled]
    .forEach(r => r.value = false);
  [accountActiveMap, codeActiveMap, newPasswordActiveMap, confirmPasswordActiveMap]
    .forEach(m => Object.keys(m).forEach(k => { m[k] = false; }));
}

function restoreAnimForStep(target) {
  const map = {
    1: [
      [account, accountFilled, accountActiveMap, accountLetters],
      [code, codeFilled, codeActiveMap, codeLetters],
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

/* ===== 发送验证码 ===== */
async function sendCode() {
  if (countdown.value > 0) return;
  if (!account.value || !isAccountValid.value) {
    message.warning('请输入正确的邮箱地址');
    return;
  }

  loading.value = true;
  try {
    const res = await request.post('/user/send-reset-code', { account: account.value });
    message.success(res.message || '验证码已发送');
    countdown.value = 30;
    timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) { clearInterval(timer); timer = null; }
    }, 1000);
  } catch (error) {
    const msg = error.response?.data?.message || '发送失败，请稍后重试';
    message.error(msg);
  } finally {
    loading.value = false;
  }
}

/* ===== 校验 ===== */
function validateStepOne() {
  if (!account.value) { message.warning('请输入邮箱地址'); return false; }
  if (!isAccountValid.value) { message.warning('请输入正确的邮箱地址'); return false; }
  if (!code.value) { message.warning('请输入验证码'); return false; }
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

async function onStepTwoSubmit() {
  if (!newPassword.value || !confirmPassword.value) { message.warning('请填写所有字段'); return; }
  if (newPassword.value.length < 6) { message.warning('新密码长度不能少于6位'); return; }
  if (newPassword.value !== confirmPassword.value) { message.warning('两次输入的新密码不一致'); return; }

  loading.value = true;
  try {
    const res = await request.post('/user/reset-password', {
      account: account.value,
      code: code.value,
      newPassword: newPassword.value,
    });
    message.success(res.message || '密码重置成功');
    isSuccess.value = true;
  } catch (error) {
    const msg = error.response?.data?.message || '重置失败，请稍后重试';
    message.error(msg);
  } finally {
    loading.value = false;
  }
}

function goLogin() {
  router.push('/userInfo');
}

/* ===== 入场 & 初始化 ===== */
onMounted(() => {
  setTimeout(() => { isOnstart.value = true; }, 100);
  setTimeout(() => { isOnloaded.value = true; }, 1800);
});
</script>

<style scoped lang="scss">
// ═══════════════════════════════════════════════════════════
// .main — 全屏居中布局
// ═══════════════════════════════════════════════════════════
.main {
  @include flexCenter(row, center);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: themed('app-font-family');
  @include theme-transition();

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
      @include boxshadow('shadow-card');

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

// ═══════════════════════════════════
// .form + .form__cover
// ═══════════════════════════════════
.form {
  position: relative;
  width: 380px;
  height: 380px;
  min-height: 380px;
  flex-shrink: 0;
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

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: themed('border-color'); // #fff (light) / #000 (dark)
    z-index: -5;
    border-radius: 50%;
    transition: all 0.5s ease;
    transform: scale(0);
  }
}

// ═══════════════════════════════════
// .form__loader
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
// .spinner
// ═══════════════════════════════════
.spinner {
  position: relative;
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
  }

  .spinner__path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.3s ease forwards 0.5s;
    opacity: 0;
    stroke-linecap: round;
    stroke: themed('primary-color');
    @include theme-transition();
    animation-play-state: running;
  }
}

// ═══════════════════════════════════
// .form__content
// ═══════════════════════════════════
.form__content {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.5s ease 0.7s;
  padding: 1rem;

  h1 {
    font-size: 1.5rem;
    letter-spacing: 0.05em;
    @include text-color('text-color');
    font-weight: 700;
    padding: 0.5rem 0;

    &.title--small {
      font-size: 1.4rem;
    }
  }

  // ═══════════════════════════════════
  // 步骤指示器（贯穿线分布在文字两侧）
  // ═══════════════════════════════════
  .step-indicator {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 0 3rem;
  }

  .step-segment {
    position: relative;
    flex: 1;
    height: 2px;
    min-width: 0;

    .step-line {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 100%;
      background: themed('border-subtle');
      @include theme-transition();
    }

    .step-progress {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: $primary-color;
      transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1);
    }
  }

  .step-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;

    .step-label {
      font-size: 14px;
      font-weight: 600;
      @include text-color('text-sec-color');
      transition: color 0.3s ease;
      white-space: nowrap;
    }

    &.active .step-label {
      color: $primary-color;
      animation: dotPulse 2s ease infinite;
      text-shadow: 0 0 8px rgba($primary-color, 0.4);
    }

    &.done .step-label {
      color: $primary-color;
    }
  }

  // ═══════════════════════════════════
  // 步骤表单
  // ═══════════════════════════════════
  .step-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1.5rem;
    width: 100%;
    height: 80%;
  }

  // ═══════════════════════════════════
  // 表单行
  // ═══════════════════════════════════
  .form-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;

    .form-row__input {
      flex: 1;
    }
  }

  // ═══════════════════════════════════
  // .styled-input
  // ═══════════════════════════════════
  .styled-input {
    width: 100%;
    position: relative;
    border: 1px solid themed('border-subtle');
    border-radius: 3px;
    // @include background('card-background');
    @include theme-transition();

    &:hover {
      border-color: themed('border-default');
    }

    &.filled {
      border-color: themed('border-subtle');

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
        left: 16px;
        top: 16px;
        height: 10px;
        width: 10px;
        z-index: -2;
        border-radius: 50%;
        background: rgba($primary-color, 0.3);
        box-shadow: 0 0 10px rgba($primary-color, 0);
        transition: transform 0.6s ease, opacity 1s ease;
      }
    }

    .styled-input__input {
      width: 100%;
      -webkit-appearance: none;
      font-size: 0.8rem;
      outline: none;
      background: none;
      padding: 11px 15px;
      @include text-color('text-color');
      border: none;
      font-weight: 600;
      letter-spacing: 0.1rem;
      font-family: themed('app-font-family');
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .styled-input__placeholder {
      position: absolute;
      left: 0;
      top: -2px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      z-index: -1;
      padding-left: 40px;
      @include text-color('text-sec-color');
    }

    .styled-input__placeholder-text {
      perspective: 500px;
      display: inline-block;
      font-size: 0.8rem;

      .letter {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        text-shadow: 0 0 1px;

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

    .captcha-input {
      letter-spacing: 2px;
      font-weight: 700;
      font-size: 14px;
      caret-color: $primary-color;
      @include theme-transition();

      &::selection {
        background: rgba($primary-color, 0.18);
        @include text-color('text-color');
      }
    }
  }

  // ═══════════════════════════════════
  // 验证码按钮
  // ═══════════════════════════════════
  .code-btn {
    flex-shrink: 0;
    padding: 11px 14px;
    border-radius: 3px;
    border: 1px solid themed('border-subtle');
    background: transparent;
    @include text-color('text-color');
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    @include theme-transition();
    font-family: themed('app-font-family');

    &:hover:not(:disabled) {
      @include background('bg-tag');
      border-color: rgba($primary-color, 0.35);
      color: $primary-color;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  // ═══════════════════════════════════
  // 图形验证码
  // ═══════════════════════════════════
  .captcha-display {
    flex-shrink: 0;
    padding: 11px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 64px;
    border-radius: 3px;
    border: 1px solid rgba($primary-color, 0.18);
    @include text-color('text-color');
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 6px;
    cursor: pointer;
    user-select: none;
    @include theme-transition();

    &:hover {
      border-color: rgba($primary-color, 0.45);
      @include text-color('text-color');
    }
  }

  // ═══════════════════════════════════
  // 按钮行
  // ═══════════════════════════════════
  .btn-row {
    display: flex;
    gap: 12px;
    @include flexCenter (row, space-around);

    .styled-button {
      flex: 1;
      width: auto;
      font-family: themed('app-font-family');
      max-width: 40%;
    }
  }

  // ═══════════════════════════════════
  // .styled-button
  // ═══════════════════════════════════
  .styled-button {
    cursor: pointer;
    width: 100%;
    padding: 0.5rem;
    outline: none;
    background: none;
    position: relative;
    @include text-color('text-color');
    border-radius: 3px;
    border: none;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.1em;
    background: $primary-color;
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

      &.back {
        color: #fff;
        transform: translateX(-100%);

        .styled-button__text-holder {
          transform: translateX(100%);
        }
      }
    }

    .styled-button__text {
      display: inline-block;
      font-size: 0.8rem;
    }

    &:hover,
    &:active {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      background: $primary-hover;

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

    // Outline 变体
    &.styled-button--outline {
      background: transparent;
      color: $primary-color;
      box-shadow: $shadow-card;
      max-height: 2rem;
      @include flexCenter(center, center);

      .back {
        color: #fff;
      }

      &:hover,
      &:active {
        background: transparent;
      }
    }


  }

  // ═══════════════════════════════════
  // 成功状态
  // ═══════════════════════════════════
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;

    .styled-button {
      flex: none;
      width: 100%;
    }
  }

  .success-icon {
    width: 64px;
    height: 64px;

    &__checkmark {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: block;
      stroke-width: 3;
      stroke: $primary-color;
      @include theme-transition();
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
    @include text-color('text-color');
    letter-spacing: 0.03em;
  }

  .success-sub {
    font-size: 14px;
    @include text-color('text-sec-color');
  }
}

// ═══════════════════════════════════════════
// @keyframes
// ═══════════════════════════════════════════

@keyframes dotPulse {

  0%,
  100% {
    text-shadow: 0 0 4px rgba($primary-color, 0.2);
  }

  50% {
    text-shadow: 0 0 12px rgba($primary-color, 0.6), 0 0 24px rgba($primary-color, 0.15);
  }
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

@keyframes letterAnimIn {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, 10px);
    color: $primary-hover;
  }

  45% {
    transform: translate(0, 10px);
    opacity: 0;
    color: $primary-hover;
  }

  55% {
    transform: translate(0, 10px);
    opacity: 0;
  }

  56% {
    transform: translate(-30px, -27px);
    opacity: 0;
    color: $primary-color;
  }

  76% {
    color: $primary-color;
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
    color: $primary-hover;
  }

  56% {
    transform: translate(0, 10px);
    color: $primary-hover;
  }

  100% {
    transform: translate(0, 0);
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
    box-shadow: inset 0 0 0 100px rgba($primary-color, 0.05);
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
