<template>
  <div class="reset-password-container">
    <div class="backPhoto"></div>
    <div class="navigation">
      <navigation></navigation>
    </div>
    <div class="reset-password-card" v-if="!isSuccess">
      <h2>重置密码</h2>
      <div class="steps" :style="`--step: ${step}; --steps: ${steps.length}`">
        <div class="step-line"></div>
        <div
          v-for="(item, idx) in steps"
          :key="idx"
          class="step-dot"
          :class="{
            active: step === idx + 1,
            completed: step > idx + 1,
            clickable: canClickStep(idx + 1),
          }"
          @click="handleStepClick(idx + 1)"
        >
          <div class="dot">
            <span class="step-num">{{ idx + 1 }}</span>
          </div>
        </div>
      </div>
      <form v-if="step === 1" @submit.prevent="onAccountAndCodeSubmit">
        <section class="form-content">
          <div class="input-group">
            <span class="input">
              <input
                class="input__field"
                v-model="account"
                id="account"
                :data-has-value="!!account"
              />
              <label class="input__label" for="account">
                <span class="input__label-content">
                  <img
                    :src="
                      utils.getAssetsFile(
                        'icon/resetPassword/accountNumber.svg'
                      )
                    "
                    alt="accountNumber"
                  />
                  邮箱或手机号</span
                >
              </label>
            </span>
          </div>
          <div class="input-group">
            <span class="input">
              <input
                class="input__field"
                v-model="code"
                id="code"
                :data-has-value="!!code"
              />
              <label class="input__label" for="code">
                <span class="input__label-content">
                  <img
                    :src="
                      utils.getAssetsFile('icon/resetPassword/verification.svg')
                    "
                    alt="verification"
                  />
                  请输入验证码</span
                >
              </label>
            </span>
            <!-- 验证码 -->
            <a-button
              type="button"
              class="send-code-btn"
              :disabled="countdown > 0 || !validateAccount(account)"
              @click="() => sendCode('success')"
            >
              {{ countdown > 0 ? `${countdown}s重发` : "验证码" }}
            </a-button>
          </div>
          <div class="input-group">
            <span class="input">
              <input
                class="input__field"
                id="captchaInput"
                maxlength="4"
                v-model="captchaInput"
                :data-has-value="!!captchaInput"
              />
              <label class="input__label" for="captchaInput">
                <span class="input__label-content">
                  <img
                    :src="
                      utils.getAssetsFile(
                        'icon/resetPassword/imgVerification.svg'
                      )
                    "
                    alt="imgVerification"
                  />图形验证码</span
                >
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
      </form>
      <form v-else @submit.prevent="onSubmit">
        <section class="form-content">
          <div class="input-group">
            <span class="input">
              <input
                v-model="newPassword"
                class="input__field"
                type="password"
                id="newPassword"
                :data-has-value="!!newPassword"
              />
              <label class="input__label" for="newPassword">
                <span class="input__label-content">
                  <img
                    :src="
                      utils.getAssetsFile('icon/resetPassword/password.svg')
                    "
                    alt="password"
                  />
                  新密码</span
                >
              </label>
            </span>
          </div>
          <div class="input-group">
            <span class="input">
              <input
                v-model="confirmPassword"
                class="input__field"
                type="password"
                id="confirmPassword"
                :data-has-value="!!confirmPassword"
              />
              <label class="input__label" for="confirmPassword">
                <span class="input__label-content">
                  <img
                    :src="
                      utils.getAssetsFile('icon/resetPassword/newPassword.svg')
                    "
                    alt="newPassword"
                  />
                  确认新密码</span
                >
              </label>
            </span>
          </div>

          <!-- 按钮 -->
          <div class="btn-row">
            <button type="button" @click="step = 1">上一步</button>
            <button class="confirm-modification" type="submit">确认修改</button>
          </div>
        </section>
      </form>
      <div
        v-if="message"
        :class="{ error: isError, success: !isError }"
        class="msg"
      >
        <!-- {{ codeSent }} -->
      </div>
    </div>
    <template v-else>
      <a-result title="Great, we have done all the operations!">
        <template #icon>
          <smile-twoTone />
        </template>
        <template #extra>
          <a-button type="primary">Next</a-button>
        </template>
      </a-result>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { message, notification } from "ant-design-vue";
import utils from "@/utils/getAssetsFile";
import Navigation from "@/components/NavigationMenu/index.vue";

const steps = ["1", "2"];
const step = ref(1);
const account = ref("");
const code = ref("");
const codeSent = ref("");
const countdown = ref(0);
let timer = null;
const newPassword = ref("");
const confirmPassword = ref("");
const isError = ref(false);
const captcha = ref("");
const captchaInput = ref("");

//密码修改状态
const isSuccess = ref(false);

message.config({
  duration: 3,
});
function validateAccount(val) {
  // 简单邮箱或手机号正则
  return (
    /^(1[3-9]\d{9})$/.test(val) || /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(val)
  );
}

function onAccountAndCodeSubmit() {
  isError.value = false;
  if (!account.value) {
    message.warning("请输入邮箱或手机号");
    isError.value = true;
    return;
  }
  if (!validateAccount(account.value)) {
    message.warning("请输入正确的邮箱或手机号");

    isError.value = true;
    return;
  }
  if (!code.value) {
    message.warning("请输入验证码");
    isError.value = true;
    return;
  }
  if (code.value !== codeSent.value) {
    message.error("验证码错误");
    isError.value = true;
    return;
  }
  // 如果验证码为空则提示输入验证码
  if (!captchaInput.value.trim()) {
    message.warning("请输入图形验证码");
    isError.value = true;
    return;
  }
  // 如果图形验证码错误则提示错误
  if (captchaInput.value.toUpperCase() !== captcha.value) {
    message.error("图形验证码错误");
    isError.value = true;
    // generateCaptcha();
    return;
  }

  step.value = 2;
}

function sendCode(type) {
  if (countdown.value > 0) return;
  // 生成6位验证码
  codeSent.value = String(Math.floor(100000 + Math.random() * 900000));
  // message.success(`验证码已发送: ${codeSent.value}`);
  notification[type]({
    message: "验证码已发送",
    description: codeSent.value,
    duration: 6,
    style: {
      color: "green",
      fontFamily: "gtpy",
    },
  });

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
    message.warning("请填写所有字段");
    isError.value = true;
    return;
  }
  if (newPassword.value.length < 6) {
    message.warning("新密码长度不能少于6位");
    isError.value = true;
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    message.warning("两次输入的新密码不一致");
    isError.value = true;
    return;
  }
  // 实际应后端请求，这里仅本地演示
  message.success("密码修改成功");
  isSuccess.value = true;
  isError.value = false;
  step.value = 1;
  account.value = "";
  code.value = "";
  codeSent.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
}

function canClickStep(targetStep) {
  // 只允许前后切换，或根据业务自定义
  return targetStep <= step.value + 1;
}
function handleStepClick(targetStep) {
  if (onAccountAndCodeSubmit() && canClickStep(targetStep)) {
    step.value = targetStep;
  }
}
</script>

<style scoped lang="scss">
.reset-password-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("@/assets/img/resetPassword/2.jpeg");
  background-position: 100% 100%;
  font-size: 1rem;
  font-family: "lmst", sans-serif;
  //登录ui宽高
  $formWidth: 600px;
  $formHeight: 500px;
  //form表单与卡片的内间距
  $formPadding: 2rem;

  .reset-password-card {
    background: rgb(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    width: $formWidth;
    height: $formHeight;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: $formPadding;
    //标题
    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #f76d6d;
    }
    // 步骤条
    .steps {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 40px;
      .step-line {
        position: absolute;
        top: 50%;
        left: 18px;
        right: 18px;
        height: 4px;
        background: #eee;
        z-index: 0;
        transform: translateY(-50%);
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 4px;
          width: calc(50% * var(--step));
          background: #f76d6d;
          z-index: 1;
          transition: width 0.3s;
          pointer-events: none;
        }
      }
      .step-dot {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        width: 100%;
        //圆点
        .dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #eee;
          border: 2px solid #eee;
          transition: background 0.2s, border-color 0.2s;
          position: relative;
          .step-num {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 0.85rem;
            color: #f0107a;
            transition: color 0.2s;
            line-height: 2;
          }
        }
        &.active .dot {
          background: #f76d6d;
          border-color: #f76d6d;
          .step-num {
            color: #fff;
          }
        }
        // 新增：高亮所有已完成（当前及之前）圆点
        &.active .dot,
        &.completed .dot {
          background: #f76d6d;
          border-color: #f76d6d;
          .step-num {
            color: #fff;
          }
        }
      }
      &.clickable {
        cursor: pointer;
      }
    }
  }

  // 表单样式
  .form-content {
    @include flexCenter(column, space-between);
    gap: 1rem;
    align-items: flex-start;
    padding: 2rem 0;

    .input-group {
      @include flexCenter(row, space-between);
      width: 100%;
      .input {
        position: relative;
        display: block;
        width: 100%;
        input {
          width: 100%;
          padding: 1.2rem 0 0.2rem 0.5rem;
          border: none;
          border-bottom: 2px solid #918278;
          border-radius: 0;
          background: transparent;
          transition: border-color 0.2s;
          box-shadow: none;
          font-family: inherit;
          letter-spacing: 1px;
          color: #1a1f1f;
          &::placeholder {
            color: transparent;
          }
          &:focus {
            border-bottom: 2px solid #f77b7b;
            outline: none;
          }
          &:focus + .input__label,
          &[data-has-value="true"] + .input__label {
            color: #f77b7b;
            transform: translateY(-1.5em) scale(0.9);
          }
        }
        .input__label {
          position: absolute;
          left: 0;
          bottom: 0rem;
          color: #918278;
          pointer-events: none;
          transition: color 0.2s, transform 0.2s;
          transform-origin: left bottom;
          padding: 0.2em;
          .input__label-content {
            text-align: center;
            @include flexCenter(row, center);
            img {
              width: 24px;
              height: 22px;
              margin-right: 0.5rem;
            }
          }
        }
      }
    }
  }

  //按钮组
  .btn-row {
    display: flex;
    justify-content: space-around;
    gap: 2rem;
    width: calc($formWidth - ($formPadding * 2));
    position: absolute;
    bottom: 2rem;

    button {
      padding: 0.4rem 0;
      width: 40%;
      background: linear-gradient(90deg, #fda085, #f6d365);
      color: #fff;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      font-family: "gtpy";
      transition: background 0.2s;
      &:hover {
        background: linear-gradient(90deg, #f6d365, #fda085);
      }
    }
    //确认修改
    .confirm-modification {
      background: #0483ec;
      &:hover {
        background: #0366c9;
      }
    }
  }

  //数字验证码
  .captcha-img,
  .send-code-btn {
    padding: 0.3rem 0;
    font-family: inherit;
    min-width: 4rem;
    text-align: center;
    max-width: 4rem;
    border: none;
    border-radius: 6px;
    background: #f7787b;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s;
    font-size: 0.85rem;
    font-weight: bold;
    @include flexCenter(row, center);
    &:disabled {
      background: #eee;
      color: #aaa;
      cursor: not-allowed;
    }
  }
  // 图形验证码
  .captcha-img {
    display: inline-block;
    letter-spacing: 2px;
    background: repeating-linear-gradient(
      135deg,
      #f6d365,
      #fda085 10px,
      #fff 20px
    );

    color: #f0057a;
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

  .msg {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    &.error {
      color: #e74c3c;
    }
    &.success {
      color: #27ae60;
    }
  }
}
</style>
