<template>
  <div id="homePage">
    <div class="blog-container">
      <!-- 背景图 -->
      <div class="backPhoto" :style="videoSrc" :class="[isFocus ? 'img-background-scale' : 'img-background-reduction']">
      </div>
      <!-- 遮罩 -->
      <div class="mask" :class="{ 'blur-groud': isFocus }"></div>
      <!-- 内容 -->
      <div class="content-t">
        <!-- 导航 -->
        <Navigation></Navigation>
        <!-- 时钟/搜索 -->
        <transition name="fade">
          <div v-if="!isOpen" class="clock-search" :style="{ transform: isFocus ? 'translateY(-80%)' : '' }">
            <div class="h-minute">
              <div class="hour">
                {{ hourString }}
              </div>
              <span class="blinking-colon">:</span>
              <div class="minute">
                {{ minuteString }}
              </div>
            </div>
            <!-- 农历年月日 -->
            <div class="lunarday-year">
              <span>{{ lunarYearMonth }}</span>
            </div>
            <!-- 公历年月日 -->
            <div class="day-date">
              {{ dateSring }}
            </div>
            <div class="search-container" :style="{ transform: isFocus ? 'translateY(4rem)' : '' }">
              <form @submit.prevent="searchEngine">
                <input type="text" @focus="focusInput" @blur="focusBlur" ref="inputAutoFocus" v-model="searchQuery"
                  placeholder="搜索" />
              </form>

              <button class="webicon" title="百度图标" @click.stop="ChangeSearchLink">
                <img src="@/assets/icon/homePage/baidu-icon.svg" alt="" />
              </button>
              <button class="seaicon" title="搜索" @click="searchEngine">
                <img src=" @/assets/icon/homePage/search-icon.svg" alt="" />
              </button>
            </div>
          </div>
        </transition>
        <div class="footer-box">
          <!-- 友情链接 -->
          <div class="help-link" :class="{ opacity0: isOpen | isFocus }">
            <a href="https://gitee.com/T-mysrc/personal-blog" class="item">
              <img src="@/assets/icon/homePage/gitee-icon.png" alt="blog" />
              <p>Gitee</p>
            </a>
            <a class="item">
              <img src="@/assets/icon/homePage/blog-icon.jpg" alt="blog" />
              <p>Blog</p>
            </a>

            <a class="item">
              <img src="@/assets/icon/homePage/github-icon.png" alt="blog" />
              <p>GitHub</p>
            </a>
            <a class="item">
              <img src="@/assets/icon/homePage/csdn-icon.png" alt="blog" />
              <p>CSDN</p>
            </a>
            <div class="item" @click="openMore">
              <img src="@/assets/icon/homePage/more-icon.svg" alt="more" />
              <p>更多</p>
            </div>
          </div>

          <!-- 底部 -->
          <div class="footer-intrduce">
            <h5>本站源码存于gitee(vue3版本)，仅UI参考POETIZE-最美博客</h5>
          </div>
        </div>
      </div>
      <!-- 收藏夹 -->
      <transition name="fade">
        <div @click="isOutInside" class="favorites" v-show="isOpen">
          <div class="front-end" ref="favorites">
            <h3 style="
                text-align: center;
                margin-bottom: 1rem;
                font-weight: 700;
                font-size: 1.8rem;
              ">
              收藏夹
            </h3>
            <ul>
              <li v-for="(module, index) in displayedData" :key="index">
                <a :href="module.href" style="display: flex; align-items: center">
                  <div class="iconImg">
                    <img onerror="this.src='/logo.png'" :src="module.imgSrc" alt="" />
                  </div>
                  <div class="text-content">
                    <h5>{{ module.subtitle }}</h5>
                    <a-typography-paragraph :ellipsis="{ rows: 2, expandable: false }" :content="module.introduce"
                      style="margin: 0" />
                  </div>
                </a>
              </li>
            </ul>
            <div class="moreBtn">
              <a href="/treasureBox/favorites">查看更多</a>
            </div>
          </div>
        </div>
      </transition>
      <div class="weather_info">
        <WeatherCard></WeatherCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
} from "vue";
import WeatherCard from "../components/WeatherCard/index.vue";
import Navigation from "../components/NavigationMenu/index.vue";
import utils from "@/utils/getAssetsFile";
import { message } from "ant-design-vue";
const randomIndex = ref();
import axios from "axios";
const videoSrc = computed(() => {
  return {
    backgroundImage: `url('${videoUrls.value[randomIndex.value]}')`,
  };
});

const videoUrls = ref([
  utils.getAssetsFile("img/homePage/back1.webp"),
  utils.getAssetsFile("img/homePage/back2.webp"),
  utils.getAssetsFile("img/homePage/back3.webp"),
  utils.getAssetsFile("img/homePage/back4.webp"),
  utils.getAssetsFile("img/homePage/back5.webp"),
  utils.getAssetsFile("img/homePage/back6.webp"),
]);

const hourString = computed(() => {
  //时
  return currentTime.value.getHours().toString().padStart(2, "0");
});
const minuteString = computed(() => {
  //分
  return currentTime.value.getMinutes().toString().padStart(2, "0");
});

// 农历年月日
import { Solar, Lunar, HolidayUtil } from "lunar-javascript";
const currentTime = ref(new Date());
var solar = Solar.fromDate(new Date());
var lunar = solar.getLunar();
const lunarYearMonth = lunar.toFullString().substring(5, 16);
// 星期
function getCurrentWeekday() {
  var date = new Date(); // 获取当前日期和时间
  var day = date.getDay(); // 获取当前是周几的数字表示
  var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]; // 定义星期数组
  const weekday = weeks[day]; // 根据数字获取对应的周几中文表示
  return weekday;
}
const dateSring = computed(() => {
  // let year = currentTime.getFullYear();
  let now = new Date();
  let month = now.getMonth() + 1; // 月份是从0开始的
  let day = now.getDate();
  return `${month}月${day}日${getCurrentWeekday()}`;
});
// const updatTime = () => {
//   currentTime.value = new Date();
// };
// 输入框失去焦点
const isFocus = ref(false);
const focusInput = () => {
  isFocus.value = true;
};
// 输入框获得焦点
const focusBlur = () => {
  isFocus.value = false;
  searchQuery.value = null;
};
// 搜索引擎
const inputAutoFocus = ref("");
// 切换搜索引擎
const ChangeSearchLink = () => { };
const searchQuery = ref();
function searchEngine() {
  // 其中，wd是查询参数，表示搜索的关键词
  const baseUrl = "https://www.baidu.com/s?";
  const queryParams = new URLSearchParams({ wd: searchQuery.value }).toString();
  const searchUrl = `${baseUrl}${queryParams}`;
  // 跳转到百度搜索结果页面
  window.open(searchUrl, "_blank");
}
// 打开收藏夹
const isOpen = ref(false);
const favorites = ref(true);
//是否显示全部内容
const isShowAll = computed(() => {
  return favorites.value.length <= 10;
})
console.log(isShowAll);
// 计算属性控制显示数据
const displayedData = computed(() => {
  if (isShowAll.value) {
    return favoriteData.value
  } else {
    return favoriteData.value.slice(0, 10)
  }
})
const openMore = () => {
  isOpen.value = isFocus.value = !isOpen.value;
};
// 点击是否收藏夹本身
const isOutInside = (event) => {
  if (!favorites.value.contains(event.target)) {
    isOpen.value = isFocus.value = false;
  }
};
// 收藏夹数据源
const favoriteData = ref([]);

const getFavorites = (async () => {
  // 调用后端接口获取数据
  try {
    const response = await axios.get('http://localhost:3000/treasureBox/favorite-data');
    if (response.data.code === 200) {
      //一步完成映射+展平
      favoriteData.value = response.data.data.flatMap(item =>
        item.content.map(subItem => ({
          ...subItem,          // 保留子对象原有属性
          title: item.title    // 添加外层 title 字段
        }))
      );
    } else {
      console.error('数据获取失败:', response.data.message);
    }
  } catch (error) {
    console.error('请求失败:', error);
  }
});
onMounted(() => {

  if (videoUrls.value.length > 0) {
    randomIndex.value = Math.floor(Math.random() * videoUrls.value.length); //背景图索引值
  }
  // 顶部全局提示
  message.config({
    duration: 2,
    maxCount: 1,
  });
  getFavorites();
  message.success("下午好，欢迎访问本站~");
});
onUnmounted(() => {
  // clearTimeout(timer.value);
});
</script>

<style scoped lang="scss">
#homePage {
  width: 100vw;
  height: 100vh;
  font-family: "lmst";
  font-size: 1.5rem;

  .blog-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .backPhoto {
      width: 100vw;
      height: 100vh;
      background-size: cover;
      background-position: center;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      animation: fadeIn 1s;
      background-color: #252627;
    }

    .mask {
      background-color: #00000050;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }

    //内容
    .content-t {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      color: white;
      @include flexCenter(column, space-between);

      //时钟/搜索
      .clock-search {
        @include flexCenter(column, center);
        transform: translateY(-70%);
        transition: all 0.2s linear;

        .h-minute {
          font-size: 5rem;
          font-weight: 700;
          padding-bottom: 1rem;
          text-align: center;
          @include flexCenter(row, center);

          .blinking-colon {
            padding: 0 0.4rem;
            animation: blink 1s step-start infinite;
            font-family: "Courier New", Courier, monospace;
            font-size: 3rem;
          }
        }

        // 农历
        .lunarday-year {
          color: #b5c3d1;
          font-size: 0.9rem;
          font-weight: 700;
        }

        // 公历
        .day-date {
          font-weight: 700;
          color: #dce4ed;
          padding: 0.5rem;
          font-size: 1.3rem;
        }

        //搜索框
        .search-container {
          font-size: 0.8rem;
          width: 33rem;
          position: relative;
          transform: translateY(5rem);
          transition: all 0.2s linear;

          @include media-to("phone") {
            width: 20rem;
          }

          input {
            background-color: rgba(21, 21, 22, 0.3);
            backdrop-filter: blur(0.4rem);
            border-radius: 1rem;
            padding: 0.5rem 3rem;
            width: 100%;

            &::placeholder {
              color: white;
              text-align: center;
              font-size: 0.9rem;
              font-family: "gtpy";
            }
          }

          button {
            border-radius: 1rem;
            padding: 0.5rem 1rem;
          }

          button:hover {
            background: rgba(21, 21, 22, 0.7);
            transition: all 0.5s;
          }

          img {
            position: relative;
            top: 0.1rem;
          }

          .webicon {
            position: absolute;
            top: 0;
            left: 0;
          }

          .seaicon {
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }

      //友情链接
      .footer-box {
        width: 100%;
        @include flexCenter(column, center);

        .footer-intrduce {
          display: flex;
          justify-content: center;

          h5 {
            padding: 1rem 0;
            font-weight: 700;
            font-size: 0.9rem;
            // max-width: 80%;
            text-align: center;

            @include media-to("phone") {
              font-size: 0.8rem;
            }
          }
        }
      }

      .help-link {
        background: rgb(78, 73, 72, 0.6);
        @include flexCenter(row, space-between);
        padding: 0.5rem 0.75rem;
        border-radius: 0.75rem;
        font-size: 0.8rem;
        font-weight: 700;
        text-align: center;

        .item {
          transition: all 0.3s linear;
          transform: scale(1);
          margin: 0 0.5rem;
          // background-color: #fff;

          img {
            border-radius: 0.25rem;
          }

          &:hover img {
            transition: all 0.3s linear;
            transform: scale(1.06);
          }
        }

        img {
          width: 2rem;
        }
      }
    }

    // 收藏夹
    .favorites {
      width: 100%;
      height: 100%;
      z-index: 1;
      position: relative;

      .front-end {
        padding: 1rem 1.5rem;
        width: 75rem;
        color: white;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        margin-left: auto;
        margin-right: auto;
        background-color: rgba(81, 79, 79, 0.3);
        backdrop-filter: blur(0.1rem);
        border-radius: 0.5rem;

        ul {
          @include flexCenter(row, flex-start);
          flex-wrap: wrap;
          gap: 1rem;

          li {
            width: 13.5rem;
            font-weight: 700;
            padding: 0.25rem;
            min-height: 3.8rem;
            border-radius: 0.5rem;
            background-color: rgb(185, 181, 181, 0.5);

            &:hover {
              .iconImg {
                animation: imgNone 0.5s forwards;
              }
            }

            @keyframes imgNone {
              0% {
                width: 4rem;
                height: 3rem;
              }

              100% {
                width: 0;
                height: 0;
              }
            }

            .iconImg {
              // width: 4rem;
              height: 3rem;
              background-size: cover;
              overflow: hidden;
              border-radius: 0.25rem;
              margin-right: 0.5rem;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .text-content {
              width: 100%;
            }

            h5 {
              font-size: 1.1rem;
              padding-left: 0.15rem;
            }

            p {
              font-size: 0.8rem;
            }
          }
        }

        //更多按钮
        .moreBtn {
          // background-color: red;
          padding-top: 1rem;
          width: 100%;
          text-align: center;

          a {
            // background-color: #94ea31;
            padding: 0.5rem;
            transition: all 0.3s linear;
            font-size: 1rem;
            background-color: #ffa500;
            border-radius: 0.5rem;

            &:hover {
              background-color: transparent;
            }
          }
        }
      }

    }
  }

  // 手机端样式
  @include media-to("phone") {

    // 时间
    .h-minute {

      .hour,
      .minute,
      .blinking-colon {
        font-size: 3.5rem;
      }
    }
  }
}

// 日期组件 : 闪烁动画
@keyframes blink {

  from,
  to {
    color: rgb(255, 255, 255, 0.2);
  }

  50% {
    color: rgb(255, 255, 255);
  }
}

// 搜索框按钮hover动画
@keyframes btnhover-bgcolor {

  from,
  to {
    color: rgb(66, 61, 70, 0);
  }

  50% {
    color: rgb(66, 61, 70, 0.7);
    /* 或者任何你想要的颜色 */
  }
}

// 获得焦点时背景的变化
.blur-groud {
  backdrop-filter: blur(0.3rem);
}

// 背景放大
.img-background-scale {
  transform: scale(1.08);
  transform-origin: center;
  transition: all 0.3s linear;
}

// 背景还原
.img-background-reduction {
  transform: scale(1);
  transform-origin: center;
  transition: all 0.2s linear;
}

//收藏夹动画
.fade-leave-to {
  opacity: 0;
  transition: all 0.2s;
}

// 打开收藏夹时按钮隐藏
.opacity0 {
  opacity: 0;
  transition: all 0.2s;
}

// 天气组件
.weather_info {
  position: fixed;
  bottom: 15rem;
  left: 1.5rem;

  @include media-to("phone") {
    display: none;
  }
}
</style>
