<template>
  <div id="family">
    <div class="navigate">
      <Navigation></Navigation>
    </div>
    <div class="satic-area">
      <div class="dynamic-area1"></div>
      <div class="dynamic-area2"></div>
    </div>
    <div class="content__container">
      <!-- 头像 -->
      <div class="profile__picture">
        <ul>
          <li class="item">
            <img src="@/assets/img/profile_picture/10025.png" alt="" />
            <h1>Auther</h1>
          </li>
          <li class="item heart"></li>
          <li class="item">
            <img src="@/assets/img/profile_picture/10024.png" alt="" />
            <h1>Abby</h1>
          </li>
        </ul>
      </div>

      <div class="content__col">
        <!-- 计时器 -->
        <div class="title__time">
          <h1>这是我们一起走过的</h1>
          <div class="formattedDateTime">
            <label for="">第</label>
            <span>
              {{ formattedDateTime.years }}
            </span>
            <label for="">年</label>
            <span>
              {{ formattedDateTime.months }}
            </span>
            <label for="">月</label>

            <span>
              {{ formattedDateTime.days }}
            </span>
            <label for="">日</label>
            <span>
              {{ formattedDateTime.hours }}
            </span>
            <label for="">时</label>

            <span>
              {{ formattedDateTime.minutes }}
            </span>
            <label for="">分</label>

            <span>
              {{ formattedDateTime.seconds }}
            </span>
            <label for="">秒</label>
          </div>
          <p>
            春节倒计时： {{ countdown.days }}天{{ countdown.hours }}时{{
              countdown.minutes
            }}分{{ countdown.seconds }}秒
          </p>
        </div>
        <!-- 探索未知 -->
        <div class="letter">
          <h1>探索未知</h1>
          <!-- 图标 -->
          <span>
            <svg data-v-16b23934="" viewBox="0 0 1024 1024" width="40" height="40">
              <path data-v-16b23934=""
                d="M399.502 655.103c0 7.902-6.665 14.311-14.88 14.311H72.188c-8.215 0-14.875-6.407-14.875-14.311v-28.634c0-7.913 6.66-14.315 14.875-14.315h312.435c8.217 0 14.88 6.402 14.88 14.315l-0.001 28.634zM968.167 655.103c0 7.902-6.664 14.311-14.882 14.311H640.851c-8.216 0-14.877-6.407-14.877-14.311v-28.634c0-7.913 6.661-14.315 14.877-14.315h312.436c8.218 0 14.882 6.402 14.882 14.315l-0.002 28.634z"
                fill="#EA0606"></path>
              <path data-v-16b23934=""
                d="M968.097 624.008c0 11.563-17.723 20.937-39.583 20.937H97.263c-21.858 0-39.579-9.372-39.579-20.937v-41.876c0-11.562 17.72-20.935 39.579-20.935h831.25c21.86 0 39.583 9.373 39.583 20.935v41.876zM855.003 526.553h-12c0-161.793-151.025-293.421-336.66-293.421-185.633 0-336.656 131.628-336.656 293.421h-12c0-41.334 9.261-81.425 27.527-119.161 17.612-36.384 42.807-69.046 74.886-97.079 65.813-57.509 153.264-89.181 246.243-89.181 92.981 0 180.434 31.672 246.247 89.181 32.079 28.032 57.274 60.693 74.887 97.079 18.264 37.734 27.526 77.826 27.526 119.161z"
                fill="#EA0606"></path>
              <path data-v-16b23934=""
                d="M1001.996 588.091c-121.146 13.91-980.875 0-980.875 0s-30.62-203.887 241.944-144.555c171.281-1.178 273.436 0 489.644 0 193.07-59.332 283.186 108.642 249.287 144.555z"
                fill="#EA0606"></path>
              <path data-v-16b23934="" d="M500.343 214.379h12v330.342h-12z" fill="#EA0606"></path>
              <path data-v-16b23934=""
                d="M333.217 657.192c0 46.174-38.961 83.602-87.029 83.602-48.056 0-87.021-37.428-87.021-83.602 0-46.172 38.963-83.588 87.021-83.588 48.067 0 87.029 37.417 87.029 83.588z"
                fill="#FFFFFF"></path>
              <path data-v-16b23934=""
                d="M246.188 743.794c-49.638 0-90.021-38.85-90.021-86.602 0-47.745 40.383-86.588 90.021-86.588 49.642 0 90.029 38.843 90.029 86.588 0 47.752-40.387 86.602-90.029 86.602z m0-167.19c-46.329 0-84.021 36.151-84.021 80.588 0 44.444 37.692 80.602 84.021 80.602 46.333 0 84.029-36.157 84.029-80.602 0-44.436-37.696-80.588-84.029-80.588z"
                fill="#440A0A"></path>
              <path data-v-16b23934=""
                d="M309.872 656.757c0 33.159-27.986 60.035-62.491 60.035-34.51 0-62.487-26.876-62.487-60.035 0-33.16 27.977-60.022 62.487-60.022 34.505 0.001 62.491 26.862 62.491 60.022z"
                fill="#440A0A"></path>
              <path data-v-16b23934=""
                d="M271.322 657.558c0 11.747-9.918 21.282-22.151 21.282-12.237 0-22.152-9.535-22.152-21.282 0-11.758 9.916-21.277 22.152-21.277 12.233-0.002 22.151 9.519 22.151 21.277z"
                fill="#FFFFFF"></path>
              <path data-v-16b23934=""
                d="M875.521 642.811c0 46.175-38.963 83.603-87.027 83.603-48.061 0-87.021-37.428-87.021-83.603 0-46.173 38.962-83.587 87.021-83.587 48.066 0 87.027 37.414 87.027 83.587z"
                fill="#FFFFFF"></path>
              <path data-v-16b23934=""
                d="M788.494 729.413c-49.638 0-90.021-38.85-90.021-86.603 0-47.744 40.384-86.587 90.021-86.587 49.642 0 90.027 38.843 90.027 86.587 0 47.753-40.385 86.603-90.027 86.603z m0-167.189c-46.33 0-84.021 36.151-84.021 80.587 0 44.444 37.691 80.603 84.021 80.603 46.333 0 84.027-36.158 84.027-80.603 0-44.436-37.694-80.587-84.027-80.587z"
                fill="#440A0A"></path>
              <path data-v-16b23934=""
                d="M852.174 642.374c0 33.159-27.979 60.037-62.486 60.037-34.512 0-62.487-26.878-62.487-60.037 0-33.161 27.977-60.023 62.487-60.023 34.506-0.001 62.486 26.862 62.486 60.023z"
                fill="#440A0A"></path>
              <path data-v-16b23934=""
                d="M813.628 643.173c0 11.75-9.919 21.278-22.153 21.278-12.233 0-22.151-9.528-22.151-21.278 0-11.759 9.919-21.275 22.151-21.275 12.235-0.002 22.153 9.516 22.153 21.275z"
                fill="#FFFFFF"></path>
              <path data-v-16b23934="" d="M518.135 469.838h56.847v12.556h-56.847z" fill="#FFFFFF"></path>
              <path data-v-16b23934=""
                d="M522.818 468.694c0 7.902-0.648 14.309-1.445 14.309h-30.37c-0.799 0-1.446-6.406-1.446-14.309V440.06c0-7.912 0.647-14.315 1.446-14.315h30.37c0.797 0 1.445 6.403 1.445 14.315v28.634z"
                fill="#EA0606"></path>
            </svg>
          </span>
        </div>
        <!-- 模块导航 -->
        <div class="module">
          <ul>
            <li v-for="(item, index) in module_data" @click="changeModule = item.id" :key="item.id">
              <div class="card__left" :style="{ backgroundImage: `url(${item.img})` }">
                <!-- <img :src="item.img" alt="image" /> -->
              </div>
              <div class="card__right">
                <div class="card__title">{{ item.title }}</div>
                <div class="card__desc">{{ item.desc }}</div>
              </div>
              <!-- 风车 -->
              <div class="windmill" v-if="item.id === changeModule">
                <div class="case">
                  <div class="one">
                    <div class="leaf"></div>
                    <div class="square"></div>
                  </div>
                  <div class="two">
                    <div class="leaf"></div>
                    <div class="square"></div>
                  </div>
                  <div class="three">
                    <div class="leaf"></div>
                    <div class="square"></div>
                  </div>
                  <div class="four">
                    <div class="leaf"></div>
                    <div class="square"></div>
                  </div>
                  <div class="dot"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 模块内容 -->
        <div class="module_content">

          <!-- 模块一 -->
          <section class="main" v-if="changeModule === 'module1'">
            <ul class="lifeCard">
              <li class="event">
                <input type="radio" name="tl-group" checked />
                <label></label>
                <div class="thumb user-1"><span>19 岁</span></div>
                <div class="content-perspective">
                  <div class="content">
                    <div class="content-inner">
                      <h3>
                        <span>I</span>
                        <span>find</span>
                        <span>your</span>
                        <span>lack</span>
                        <span>of</span>
                        <span>faith</span>
                        <span>disturbing</span>
                      </h3>
                      <p>
                        别为你制造的这场科技恐怖感到骄傲。能让我老师傅的存在感。逃跑不是他的计划。我必须面对他独自
                      </p>
                    </div>
                  </div>
                </div>
              </li>

              <li class="event">
                <input type="radio" name="tl-group" />
                <label></label>
                <div class="thumb user-2"><span>18 岁</span></div>
                <div class="content-perspective">
                  <div class="content">
                    <div class="content-inner">
                      <h3>I ain't shooting this thing, I hate guns.</h3>
                      <p>
                        哈，伊利安德兰。你也不能叫我'你'。你永远不会称呼我为'你'。你要叫我'殿下'。我真的得回去了。我不该逃跑。我现在明白了，爱是我负担不起的。
                      </p>
                    </div>
                  </div>
                </div>
              </li>

              <li class="event">
                <input type="radio" name="tl-group" />
                <label></label>
                <div class="thumb user-3"><span>17 岁</span></div>
                <div class="content-perspective">
                  <div class="content">
                    <div class="content-inner">
                      <h3>My brains are going into my feet!</h3>
                      <p>We're done with you. Go back to the golf cou</p>
                    </div>
                  </div>
                </div>
              </li>

              <li class="event">
                <input type="radio" name="tl-group" />
                <label></label>
                <div class="thumb user-4"><span>16 岁</span></div>
                <div class="content-perspective">
                  <div class="content">
                    <div class="content-inner">
                      <h3>Would you please stop calling me that?</h3>
                      <p>
                        有时候你真让我难受。你也有你的时刻。撤离员工的人并不多。
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <!-- 模块二 -->
          <div v-else-if="changeModule === 'module2'">
            <div class="gallery">
              <div class="gallery__image">
                <img src="@/assets/img/albumCollection/travel2.jpg" alt="1" />
              </div>
              <div class="gallery__image">
                <img src="@/assets/img/albumCollection/travel4.jpg" alt="2" />
              </div>
              <div class="gallery__image">
                <img src="@/assets/img/albumCollection/travel5.jpg" alt="3" />
              </div>
            </div>
          </div>
          <!-- 模块三 -->
          <div v-else="changeModule === 'module3'">
            <div class="g-container">
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
              <div class="g-item" data-aos="fade-up"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Navigation from "@/components/NavigationMenu/index.vue";
import utils from "@/utils/getAssetsFile";

import dayjs from "dayjs";
dayjs.locale("zh-cn");
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
dayjs.extend(relativeTime, duration);
// 开始时间
const startTime = "2023-10-01 12:00:00"; // 确保时间格式正确
// 常量定义
const SECONDS_IN_YEAR = 365 * 24 * 60 * 60; // 假设一年365天
const SECONDS_IN_MONTH = 30 * 24 * 60 * 60; // 假设一个月30天
const SECONDS_IN_DAY = 24 * 60 * 60; // 一天24小时
const SECONDS_IN_HOUR = 60 * 60; // 一小时60分钟
const SECONDS_IN_MINUTE = 60; // 一分钟60秒
const formattedDateTime = ref({});
const getTimeDiffrence = () => {
  // 当前时间
  const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  // 计算时间差
  const timeDifference = dayjs(currentTime).diff(dayjs(startTime), "seconds");
  // 计算年月日时分秒
  let remainingSeconds = timeDifference;
  // 计算年
  const years = Math.floor(remainingSeconds / SECONDS_IN_YEAR);
  remainingSeconds %= SECONDS_IN_YEAR;
  // 计算月
  const months = Math.floor(remainingSeconds / SECONDS_IN_MONTH);
  remainingSeconds %= SECONDS_IN_MONTH;
  // 计算日
  const days = Math.floor(remainingSeconds / SECONDS_IN_DAY);
  remainingSeconds %= SECONDS_IN_DAY;
  // 计算小时
  const hours = Math.floor(remainingSeconds / SECONDS_IN_HOUR);
  remainingSeconds %= SECONDS_IN_HOUR;
  // 计算分钟
  const minutes = Math.floor(remainingSeconds / SECONDS_IN_MINUTE);
  remainingSeconds %= SECONDS_IN_MINUTE;
  // 剩余的秒数
  const seconds = remainingSeconds;
  // 格式化输出
  return (formattedDateTime.value = {
    years,
    months,
    days,
    hours: hours.toString(),
    minutes: minutes.toString(),
    seconds: seconds.toString(),
  });
};

// 春节倒计时
const springFestivalDate = new Date(2026, 1, 17); // 注意：月份从0开始，1代表2月
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});
const updateCountdown = () => {
  const now = new Date();
  const timeDifference = springFestivalDate - now;
  if (timeDifference < 0) {
    // 如果时间已经过了春节，停止倒计时
    clearInterval(interval);
    return;
  }
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  countdown.value = { days, hours, minutes, seconds };
};
// 模块切换
const module_data = [
  {
    id: "module1",
    title: "点点滴滴",
    desc: "☀️今朝有酒今朝醉",
    img: utils.getAssetsFile("img/family/loveWeiYan.jpg"),
  },
  {
    id: "module2",
    title: "时光相册",
    desc: "📸记录美好瞬间",
    img: utils.getAssetsFile("img/family/lovePhoto.jpg"),
  },
  {
    id: "module3",
    title: "祝福板",
    desc: "📋写下你们的祝福",
    img: utils.getAssetsFile("img/family/loveMessage.jpg"),
  },
];
const changeModule = ref("module1");
let interval;
let intervalId;
onMounted(() => {
  updateCountdown();
  interval = setInterval(updateCountdown, 1000);
  getTimeDiffrence();
  intervalId = setInterval(getTimeDiffrence, 1000);
});
onUnmounted(() => {
  clearInterval(intervalId);
  clearInterval(interval);
});
</script>
<style scoped lang="scss">
#family {
  // 主体内容盒子宽度
  $content_container_width: 65vw;

  // 导航
  .navigate {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100vw;
    backdrop-filter: blur(10px);
  }

  // 背景
  .satic-area {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: url(@/assets/img/family/poster-about.jpg) no-repeat center;
    background-size: cover;

    .dynamic-area1 {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: url(@/assets/img/family/poster-drop-animate2.png) repeat-x 0px 0px;
      background-size: cover;
      animation: posterDrop1 6000s linear infinite;
    }

    @keyframes posterDrop1 {
      from {
        background-position: 0 0;
      }

      to {
        background-position: 4000% 0;
      }
    }

    .dynamic-area2 {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: url(@/assets/img/family/poster-drop-animate1.png) repeat-x 0px 0px;
      background-size: cover;
      animation: posterDrop2 8000s linear infinite;
    }

    @keyframes posterDrop2 {
      from {
        background-position: 0 0;
      }

      to {
        background-position: 30000% 0;
      }
    }
  }

  // 内容
  .content__container {
    position: absolute;
    top: 7rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: $content_container_width;
    @include flexCenter(column, flex-start);

    // 头像
    .profile__picture {
      background-color: rgb(255, 255, 255, 0.1);
      backdrop-filter: blur(0.25rem);
      border-radius: 1.5rem;
      padding: 2rem;

      ul {
        @include flexCenter(row, space-between);

        .item {
          width: 10rem;
          height: 10rem; // height: 8.5rem;
          @include flexCenter(column, center);

          img {
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
          }

          h1 {
            padding: 1rem 0;
            color: white;
            font-weight: 700;
            font-size: 1.5rem;
            font-family: "lmst";
          }
        }

        .heart {
          width: 60px;
          height: 60px;
          background-color: #f00;
          margin: 4rem;
          transform: rotate(135deg) scale(0.9);
          animation: love 2s infinite;
          box-shadow: 0 0 30px 5px rgba(255, 0, 0, 0.7);

          &:before,
          &:after {
            content: "";
            position: absolute;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #f00;
            box-shadow: 0 0 30px 5px rgba(255, 0, 0, 0.7);
          }

          &:after {
            left: -36px;
          }

          &:before {
            top: 36px;
          }
        }

        @keyframes love {
          0% {
            transform: rotate(135deg) scale(0.85);
          }

          50% {
            transform: rotate(135deg) scale(1);
          }

          100% {
            transform: rotate(135deg) scale(0.85);
          }
        }
      }
    }

    // 内容
    .content__col {
      background-size: 100% 40px;
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
      margin-top: 2rem;
      @include flexCenter(column, center);

      // 时间相关
      .title__time {
        font-family: "gtpy";
        font-weight: 600;
        color: black;

        h1 {
          font-size: 2rem;
          font-weight: 600;
          letter-spacing: 0.2rem;
          line-height: 3rem;
          text-align: center;
          background-image: linear-gradient(270deg,
              #ff4500,
              orange,
              gold,
              #90ee90,
              #0ff,
              #1e90ff,
              #9370db,
              #ff69b4,
              #ff4500);
          background-clip: text;
          /* Chrome 需要前缀 */
          -webkit-background-clip: text;
          animation: jianBian 60s linear infinite;
          color: transparent;
          font-family: "lmst";

          @keyframes jianBian {
            100% {
              background-position: 2000rem;
            }
          }
        }

        // 累加
        .formattedDateTime {
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          line-height: 4rem;

          label {
            display: inline-block;
          }

          span {
            display: inline-block;
            font-size: 3.5rem;
            width: 90px;
          }
        }

        // 倒计时
        p {
          text-align: center;
          font-size: 1.3rem;
          line-height: 3rem;
          font-weight: 600;
        }
      }

      //探索未知
      .letter {
        background-color: #fff;
        position: relative;
        box-shadow: 1px 1px 3px rgb(0, 0, 0, 0.5);
        width: 16.5rem;
        height: 6.5rem;
        border-radius: 10px;
        background-image: url("@/assets/img/family/love.jpg");
        background-size: 100% 100%;
        font-family: "gtpy";
        margin: 3rem 0;

        h1 {
          position: absolute;
          top: 50%;
          font-size: 1.5rem;
          font-weight: 600;
          padding: 0 1rem;
          color: white;
        }

        span {
          position: absolute;
          margin-left: 200px;
          margin-top: 40px;
          animation: passing 4s linear infinite;
        }

        @keyframes passing {
          0% {
            transform: translateX(-130%);
            opacity: 0;
          }

          50% {
            transform: translateX(0);
            opacity: 1;
          }

          100% {
            transform: translateX(130%);
            opacity: 0;
          }
        }
      }

      //模块导航
      .module {
        width: 100%;
        font-family: "gtpy";
        // background-color: #fff;
        margin: 0.2rem 0;

        ul {
          @include flexCenter(row, space-between);

          li {
            @include flexCenter(row, center);
            position: relative;
            border-radius: 0.6rem;
            padding: 1rem;
            min-width: 18vw;
            box-shadow: 1px 1px 3px rgb(0, 0, 0, 0.5);
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            background: linear-gradient(50deg, #d0e0f7 10%, #eef5f9 100%);

            &:hover {
              cursor: pointer;
              transform: scale(0.95);
            }

            .card__left {
              width: 5rem;
              height: 5rem;
              border-radius: 50%;
              overflow: hidden;
              background-position: center center;
              background-size: cover;
            }

            .card__right {
              .card__title {
                font-size: 1.3rem;
                font-weight: 600;
              }

              .card__desc {
                font-size: 0.9rem;
                color: #34353a;
                padding-top: 1rem;
              }

              padding-left: 1rem;
            }

            // 风车
            .windmill {
              --color1: #fa8073;
              --color2: #34cb32;
              --color3: #e0c27c;
              --color4: #36b6f7;
              position: absolute;
              top: 0.9rem;
              right: 2.1rem;

              .case {
                width: 45px;
                height: 45px;
                display: flex;
                flex-wrap: wrap;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                animation: rotateC 1.8s linear 0s infinite reverse forwards;
              }

              .dot {
                width: calc(100% / 10);
                height: calc(100% / 10);
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                background: white;
                border-radius: 50%;
                z-index: 1;
              }

              .one,
              .two,
              .three,
              .four {
                width: 50%;
                height: 50%;
              }

              .one {
                position: absolute;
                left: 0;
                top: 0;

                .leaf {
                  width: calc(50% - 2px);
                  height: calc(100% - 2px);
                  border: 1px solid black;
                  border-top-left-radius: 120px;
                  border-bottom-left-radius: 120px;
                  background: var(--color1);
                  position: absolute;
                  right: 0;
                  top: 0;
                  z-index: 1;
                }

                .square {
                  width: calc(50% - 2px);
                  height: 50%;
                  border: 1px solid black;
                  border-bottom-color: transparent;
                  background: var(--color1);
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  z-index: 0;
                }
              }

              .two {
                position: absolute;
                right: 0;
                top: 0;

                .leaf {
                  width: calc(100% - 2px);
                  height: calc(50% - 2px);
                  border: 1px solid black;
                  border-top-left-radius: 120px;
                  border-top-right-radius: 120px;
                  background: var(--color2);
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  z-index: 1;
                }

                .square {
                  width: 50%;
                  height: calc(50% - 2px);
                  border: 1px solid black;
                  border-left-color: transparent;
                  background: var(--color2);
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  z-index: 0;
                }
              }

              .three {
                position: absolute;
                left: 0;
                bottom: 0;

                .leaf {
                  width: calc(100% - 2px);
                  height: calc(50% - 2px);
                  border: 1px solid black;
                  border-bottom-left-radius: 120px;
                  border-bottom-right-radius: 120px;
                  background: var(--color3);
                  position: absolute;
                  right: 0;
                  top: 0;
                  z-index: 1;
                }

                .square {
                  width: 50%;
                  height: calc(50% - 2px);
                  border: 1px solid black;
                  border-right-color: transparent;
                  background: var(--color3);
                  position: absolute;
                  right: 0;
                  top: 0;
                  z-index: 0;
                }
              }

              .four {
                position: absolute;
                right: 0;
                bottom: 0;

                .leaf {
                  width: calc(50% - 2px);
                  height: calc(100% - 2px);
                  border: 1px solid black;
                  border-top-right-radius: 120px;
                  border-bottom-right-radius: 120px;
                  background: var(--color4);
                  position: absolute;
                  left: 0;
                  top: 0;
                  z-index: 1;
                }

                .square {
                  width: calc(50% - 2px);
                  height: 50%;
                  border: 1px solid black;
                  border-top-color: transparent;
                  background: var(--color4);
                  position: absolute;
                  left: 0;
                  top: 0;
                  z-index: 0;
                }
              }

              @keyframes rotateC {
                0% {
                  transform: rotateZ(0deg);
                }

                100% {
                  transform: rotateZ(360deg);
                }
              }
            }
          }
        }
      }

      // 模块内容
      .module_content {
        background-color: rgb(139, 179, 213, .1);
        backdrop-filter: blur(0.25rem);
        width: 100vw;
        overflow: hidden;
        // background: $pages-background-color;
        background-color: rgb(255, 255, 255, .8);

        // 模块一
        .main {
          width: 100%;
          margin: 0 auto;
          @include flexCenter(column, center);
          padding: 4rem 0;

          .lifeCard {
            position: relative;
            list-style-type: none;
            font-family: "Gorditas", Arial, sans-serif;

            &:before {
              content: "";
              position: absolute;
              width: 3px;
              height: 95%;
              top: 0;
              left: 165px;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJUlEQVQIW2NkQAP/gYARWQwkAOLDBeECjEAAkkEWAKtEFwAJAgAZEBP+oM1IkwAAAABJRU5ErkJggg==);
              background-color: #f26328;
            }

            .event {
              position: relative;
              margin-bottom: 3rem;
              padding-right: 40px;

              .thumb {
                position: absolute;
                width: 4rem;
                height: 4rem;
                box-shadow: 0 0 0 4px rgb(253, 255, 255),
                  0 1px 1px rgba(255, 255, 255, 0.5);
                background-repeat: no-repeat;
                border-radius: 50%;
                transform: scale(0.8) translateX(50px);
                transition: all 0.6s ease-in-out 0.2s;

                span {
                  color: #41838e;
                  width: 100%;
                  text-align: center;
                  font-weight: 700;
                  font-size: 15px;
                  text-transform: uppercase;
                  position: absolute;
                  bottom: -30px;
                  transition: all 0.6s ease-in-out 0.2s;
                }

                &:before {
                  content: "";
                  position: absolute;
                  height: 0.4rem;
                  z-index: -1;
                  background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAPElEQVQYV2NkQAP/gYARCNDFUQRgirAphitEl0TngxXisg5ZnBGXIpgbYfIYjkb3BNxGbBLYxIgyEaQRAA8KKAWYsZtjAAAAAElFTkSuQmCC);
                  width: 3rem;
                  top: 2.1rem;
                  left: 4rem;
                }
              }

              .content-perspective {
                margin-left: 215px;
                position: relative;
                perspective: 600px;
                width: 30vw;

                &:before {
                  content: "";
                  width: 37px;
                  left: -37px;
                  top: 45px;
                  position: absolute;
                  height: 1px;
                  z-index: -1;
                  background: #fff;
                }

                .content {
                  transform: rotateY(12deg);
                  transform-origin: 0 0;
                  transform-style: preserve-3d;
                  transition: transform 0.8s cubic-bezier(0.59, 1.45, 0.69, 0.98) 0.2s;

                  .content-inner {
                    position: relative;
                    padding: 1rem;
                    width: 40vw;
                    border: none;
                    border-left: 3px solid #41838e;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    background: $pages-background-color;
                    font-family: "lmst";
                    letter-spacing: 1px;
                    transition: box-shadow 0.8s linear 0.2s;

                    &::before {
                      content: "\25b4";
                      left: 33px;
                      top: -32px;
                    }

                    h3 {
                      // font-size: 26px;
                      padding: 5px 0 5px 0;
                      color: black;
                      transition: all 0.6s ease-in-out 0.2s;
                      overflow: hidden;

                      span {
                        transition: all 0.6s ease-in-out 0.2s;
                        padding: 0 0.1rem;
                        // font-size: ;
                      }
                    }

                    p {
                      font-size: 18px;
                      max-height: 0px;
                      overflow: hidden;
                      color: transparent;
                      color: rgba(0, 0, 0, 0);
                      text-align: left;
                      transition: max-height 0.5s linear, color 0.3s linear;
                    }

                    &:before {
                      font-family: "fontawesome-selected";
                      content: "\25c2";
                      font-weight: normal;
                      font-size: 54px;
                      line-height: 54px;
                      position: absolute;
                      width: 30px;
                      height: 30px;
                      color: #41838e;
                      left: -22px;
                      top: 19px;
                      z-index: -1;
                    }
                  }
                }
              }
            }
          }

          .user-1 {
            background-image: url(@/assets/img/profile_picture/10055.png);
            background-size: 100% 100%;
          }

          .user-2 {
            background-image: url(@/assets/img/profile_picture/10008.png);
            background-size: 100% 100%;
          }

          .user-3 {
            background-image: url(@/assets/img/profile_picture/10009.png);
            background-size: 100% 100%;
          }

          .user-4 {
            background-image: url(@/assets/img/profile_picture/10010.png);
            background-size: 100% 100%;
          }

          /*透明复选框/无线电破解：将复选框保留在顶部，用不透明0隐藏它*/

          .event label,
          .event input[type="radio"] {
            width: 24px;
            height: 24px;
            left: 158px;
            top: 36px;
            position: absolute;
            display: block;
            z-index: 2;
          }

          .event input[type="radio"] {
            opacity: 0;
            z-index: 10;
            cursor: pointer;
          }

          .event label:after {
            font-family: "fontawesome-selected";
            content: "✔";
            background: #fff;
            border-radius: 50%;
            color: #41838e;
            font-size: 26px;
            height: 100%;
            width: 100%;
            left: -2px;
            top: -3px;
            line-height: 24px;
            position: absolute;
            text-align: center;
          }

          /* Checked */

          .event input[type="radio"]:checked+label:after {
            content: "\2714";
            color: #f26328;
            box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.8);
          }

          .event input[type="radio"]:checked~.content-perspective:before {
            background: #f26328;
          }

          .event input[type="radio"]:checked~.content-perspective .content-inner h3 {
            color: #f26328;

            span {
              font-family: "Cabin Sketch", cursive;
              // text-transform: uppercase;
              color: #0535f5;

              &:nth-child(1),
              &:nth-child(4),
              &:nth-child(7),
              &:nth-child(10) {
                color: #4cd137;
              }

              &:nth-child(2),
              &:nth-child(5),
              &:nth-child(8) {
                color: #ff0000;
              }
            }
          }

          .event input[type="radio"]:checked~.content-perspective .content {
            -webkit-transform: rotateY(-5deg);
            -moz-transform: rotateY(-5deg);
            -o-transform: rotateY(-5deg);
            -ms-transform: rotateY(-5deg);
            transform: rotateY(-5deg);
          }

          .event input[type="radio"]:checked~.content-perspective .content-inner {
            border-color: #f26328;
            box-shadow: 10px 0px 10px -6px rgba(0, 0, 0, 0.1);
          }

          .event input[type="radio"]:checked~.content-perspective .content-inner p {
            max-height: 13rem;
            /* Add media queries */
            color: rgba(0, 0, 0, 0.8);
            -webkit-transition-delay: 0s, 0.6s;
            -moz-transition-delay: 0s, 0.6s;
            -o-transition-delay: 0s, 0.6s;
            -ms-transition-delay: 0s, 0.6s;
            transition-delay: 0s, 0.6s;
          }

          .event input[type="radio"]:checked~.content-perspective .content-inner:before {
            color: #f26328;
          }

          .event input[type="radio"]:checked~.thumb {
            transform: scale(0.9);
            transform: translateX(10px);
            box-shadow: 0 0 0 2px rgba(242, 99, 40, 1),
              0 1px 1px rgba(255, 255, 255, 0.5);
          }

          .event input[type="radio"]:checked~.thumb span {
            color: #f26328;
          }

          .event input[type="radio"]:checked~.thumb:before {
            background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAPUlEQVQYV2NkQAOfUjX+882+wYgujiIAU4RNMVwhuiQ6H6wQl3XI4oy4FMHcCJPHcDS6J2A2EqUQpJhohQBbNyaHFmzEqgAAAABJRU5ErkJggg==);
          }
        }

        // 模块二
        .gallery {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          margin: 6rem 0;

          .gallery__image {
            padding: 0.5rem 0.5rem 1.5rem;
            // background: rgb(255, 0, 0);
            position: relative;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
            box-shadow: 3px 3px 6px 0px #ccdbe8 inset, -3px -3px 6px 1px #fff inset;
            transform-origin: center -5rem;
            border-radius: 0.25rem;
            // overflow: hidden;

            // 竖线
            &::before {
              content: "";
              display: block;
              height: 10rem;
              width: 2px;
              background: saddlebrown;
              position: absolute;
              bottom: 80%;
              left: 50%;
              z-index: -1;
            }

            &:nth-child(1) {
              animation: 5s infinite bounce;
              animation-name: image1;
              transform: rotate(-10deg);

              img {
                width: 360px;
                height: auto;
                transform: translateY(5%);
              }
            }

            &:nth-child(2) {
              animation: 4.5s infinite bounce;
              animation-name: image2;
              transform: rotate(8deg);

              img {
                height: 280px;
                transform: translateY(10%);
              }
            }

            &:nth-child(3) {
              animation: 4s infinite bounce;
              animation-name: image3;
              transform: rotate(-4deg);

              img {
                width: 320px;
                height: 300px;
              }
            }
          }

          @keyframes image1 {
            50% {
              transform: rotate(10deg);
            }
          }

          @keyframes image2 {
            50% {
              transform: rotate(-5deg);
            }
          }

          @keyframes image3 {
            50% {
              transform: rotate(6deg);
            }
          }
        }

        // 模块三
        .g-container {
          $count: 14;
          margin: 0 auto;
          width: 70%;
          column-count: 4;
          column-gap: 0.5vw;
          padding: 4rem 0;

          @function randomNum($max, $min: 0, $u: 1) {
            @return ($min + math.random($max)) * $u;
          }

          @function randomColor() {
            @return rgb(randomNum(255), randomNum(255), randomNum(255));
          }

          .g-item {
            position: relative;
            width: 17vw;
            margin-bottom: 1vw;
            break-inside: avoid;

            img {
              width: 100%;
              height: 100%;
            }
          }

          @for $i from 1 through ($count + 1) {
            .g-item:nth-child(#{$i}) {
              height: #{randomNum(300, 50)}px;
              background: randomColor();

              &::after {
                content: "#{$i}";
                color: white;
              }
            }
          }
        }
      }
    }
  }
}
</style>
