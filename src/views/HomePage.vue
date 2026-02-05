<template>
  <div id="homePage">
    <div class="blog-container">
      <!-- 背景图 -->
      <div class="backPhoto" :style="currentPageBackgrounds"
        :class="[searchInputFocus ? 'img-background-scale' : 'img-background-reduction']">
      </div>
      <!-- 遮罩 -->
      <div class="mask" :class="{ 'blur-groud': searchInputFocus }"></div>
      <!-- 内容 -->
      <div class="content-t">
        <!-- 导航 -->
        <Navigation></Navigation>
        <!-- 时钟/搜索 -->
        <transition name="fade">
          <div v-if="!isOpenFavorite" class="clock-search"
            :style="{ transform: searchInputFocus ? 'translateY(-25%)' : '' }">
            <!-- 时间 -->
            <div class="timeShow">
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
            </div>
            <!-- 搜索栏 -->
            <div class="search-container" @click="handlePageClick">
              <!-- 按钮组 -->
              <div class="searchIconChoose">
                <button class="webicon" v-for="item in searchEngines" :key="item.id"
                  :class="[item.id, { 'active': currentEngine === item.id }]" :title="item.name"
                  @click.stop="changeEngine(item.id)">
                  <img :src='item.icon' :alt="item.name" />
                </button>
              </div>

              <!--输入框 -->
              <form class="formInput" @submit.prevent="searchEngine">
                <input type="text" @focus="focusInput" @blur="handleBlur" ref="inputAutoFocus" v-model="searchQuery"
                  :placeholder="currentEnginePlaceholder" />
              </form>

              <!-- 搜索按钮 -->
              <button class="searchBtn" title="search" @click.stop="searchEngine">
                <img src=" @/assets/icon/homePage/search-icon.svg" alt="search" />
              </button>
            </div>
          </div>
        </transition>
        <div class="footer-box">
          <!-- 友情链接 -->
          <div class="help-link" :class="{ opacity0: isOpenFavorite }">
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
            <h5>本站源码存于gitee(vue3版本)，部分UI参照<a href="https://poetize.cn/" target="_blank"
                rel="noopener noreferrer">POETIZE-最美博客</a>
            </h5>
          </div>
        </div>
      </div>
      <!-- 收藏夹 -->
      <transition name="fade">
        <div @click="isOutInside" class="favorites" v-show="isOpenFavorite">
          <div class="front-end" ref="favoriteElement">
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
      <div class="weather_info" v-if="!hasShownNotification">
        <WeatherCard></WeatherCard>
      </div>
    </div>
    <live2dModel v-if="showRippleToggle"></live2dModel>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  getCurrentInstance,
  h,
  nextTick
} from "vue";
import { useRoute } from "vue-router";
import WeatherCard from "@/components/common/WeatherCard.vue";
import Navigation from "@/components/common/NavigationMenu.vue";
import utils from "@/utils/getAssetsFile";
import { message, notification } from "ant-design-vue";
import live2dModel from "@/components/common/live2dModel.vue"; //引入live2d组件
import { SmileOutlined } from '@ant-design/icons-vue';
import { Solar } from "lunar-javascript";
const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;
const route = useRoute();

const showRippleToggle = computed(() => {
  const hiddenRoutes = ['/home'] // 根据你的实际路由配置调整
  return hiddenRoutes.includes(route.path)
})

/** ------------------------ 页面背景图 ------------------------ */
const randomIndex = ref(0); // 随机数索引
const currentPageBackgrounds = computed(() => {
  return {
    backgroundImage: `url('${onOtherImgs.value[randomIndex.value]}')`,
  };
});
const onOtherImgs = ref([
  utils.getAssetsFile("img/homePage/back1.webp"),
  utils.getAssetsFile("img/homePage/back2.webp"),
  utils.getAssetsFile("img/homePage/back3.webp"),
  utils.getAssetsFile("img/homePage/back4.webp"),
  utils.getAssetsFile("img/homePage/back5.webp"),
  utils.getAssetsFile("img/homePage/back6.webp"),
]);

/** ------------------------ 时间/日期（农历年月日） ------------------------ */
const hourString = computed(() => { //时
  return currentTime.value.getHours().toString().padStart(2, "0");
});
const minuteString = computed(() => { //分
  return currentTime.value.getMinutes().toString().padStart(2, "0");
});
const currentTime = ref(new Date());
var solar = Solar.fromDate(new Date());
var lunar = solar.getLunar();
const lunarYearMonth = lunar.toFullString().substring(5, 16);

function getCurrentWeekday() { // 星期
  var date = new Date();
  var day = date.getDay(); // 获取当前是周几的数字表示
  var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const weekday = weeks[day];
  return weekday;
}
const dateSring = computed(() => {
  let now = new Date();
  let month = now.getMonth() + 1; // 月份是从0开始的
  let day = now.getDate();
  return `${month}月${day}日${getCurrentWeekday()}`;
});

/** ------------------------ 搜索框 ------------------------ */
const inputAutoFocus = ref("");
const searchQuery = ref(); //输入内容
const searchInputFocus = ref(false);
const searchContainerRef = ref(null); // 新增：搜索框容器的ref
const ignoreNextBlur = ref(false);
const currentEngine = ref('baidu'); // 当前选中的搜索引擎
const currentEngineIndex = ref(0); // 当前引擎索引（0:baidu, 1:bing, 2:google）
const searchEngines = {
  baidu: {
    id: 'baidu',
    name: '百度',
    url: 'https://www.baidu.com/s?wd=',
    placeholder: '百度',
    icon: 'src/assets/icon/homePage/baidu-icon.svg'
  },
  bing: {
    id: 'bing',
    name: '必应',
    url: 'https://www.bing.com/search?q=',
    placeholder: '必应',
    icon: 'src/assets/icon/homePage/bing-icon.svg'
  },
  google: {
    id: 'google',
    name: '谷歌',
    url: 'https://www.google.com/search?q=',
    placeholder: '谷歌',
    icon: 'src/assets/icon/homePage/google-icon.svg'
  }
};
const currentEnginePlaceholder = computed(() => {
  return searchEngines[currentEngine.value]?.placeholder || '搜索';
});

const focusInput = () => {
  searchInputFocus.value = true;
  ignoreNextBlur.value = false;
};

const handleBlur = () => {
  if (!ignoreNextBlur.value) {
    searchInputFocus.value = false;
    // searchQuery.value = "";
  }
};
// 处理页面点击事件
const handlePageClick = (event) => {
  if (!searchInputFocus.value) return;

  if (searchContainerRef.value && !searchContainerRef.value.contains(event.target)) {
    // 点击了搜索框外部
    searchInputFocus.value = false;
    searchQuery.value = "";

    // 如果输入框有焦点，强制失去焦点
    if (inputAutoFocus.value && document.activeElement === inputAutoFocus.value) {
      inputAutoFocus.value.blur();
    }
  }
};

// 切换搜索引擎
const changeEngine = (engine) => {
  currentEngine.value = engine;

  currentEngine.value = engine;
  const engineIndexMap = { baidu: 0, bing: 1, google: 2 };
  currentEngineIndex.value = engineIndexMap[engine];

  const buttons = document.querySelectorAll('.webicon');
  buttons.forEach((btn, index) => {
    // 计算每个按钮的top值，激活按钮为0，其他依次向上排列
    btn.style.transform = `translateY(${-(index - currentEngineIndex.value) * 100}%)`;
  });
};

// 搜索函数
const searchEngine = (() => {
  console.log(searchQuery.value)
  if (!searchQuery.value || searchQuery.value.trim() === '') {
    message.warning('请输入搜索内容');
    return
  }
  const engineConfig = searchEngines[currentEngine.value];
  const searchUrl = `${engineConfig.url}${encodeURIComponent(searchQuery.value.trim())}`;
  window.open(searchUrl, "_blank");
})

/** ------------------------ 收藏夹 ------------------------ */
const isOpenFavorite = ref(false); //收藏夹状态
const favoriteElement = ref(true); //收藏夹Element
const favoriteData = ref([]); //数据源
const getFavorites = (async () => {
  try {
    const response = await $http.get('/treasureBox/favorite-data', {

    });
    //一步完成映射+展平
    favoriteData.value = response.data.flatMap(item =>
      item.content.map(subItem => ({
        ...subItem,          // 保留子对象原有属性
        title: item.title    // 添加外层 title 字段
      }))
    );
  } catch (error) {
    console.error('请求失败:', error);
  }
});
const isShowAll = computed(() => {
  return favoriteElement.value.length <= 10;
})
const displayedData = computed(() => {
  if (isShowAll.value) {
    return favoriteData.value
  } else {
    return favoriteData.value.slice(0, 10)
  }
})
const openMore = () => { //更多
  isOpenFavorite.value = !isOpenFavorite.value;
};

const isOutInside = (event) => {
  if (!favoriteElement.value.contains(event.target)) { // 判断点击是否收藏夹本身
    isOpenFavorite.value = false;
  }
};

/** ------------------------ 全局通知卡片 ------------------------ */
const hasShownNotification = ref(localStorage.getItem('hasShownNotification'));
const notificationFun = (() => {
  if (!hasShownNotification.value) {
    notification.open({
      message: `欢迎访问本站`,
      description: 'Go and discover more exciting things.',
      placement: 'topLeft',
      duration: 7,
      maxCount: 1,
      icon: h(SmileOutlined, { style: 'color: green' }),
      onClick: () => {
        window.open('https://www.baidu.com', '_blank');
      }
    });
    localStorage.setItem('hasShownNotification', 'true');
  }
})

onMounted(() => {
  notificationFun();
  if (onOtherImgs.value.length > 0) {
    randomIndex.value = Math.floor(Math.random() * onOtherImgs.value.length); //背景图索引值
  }
  getFavorites();
  // 添加定时器：每2秒更新一次时间
  setInterval(() => {
    currentTime.value = new Date();
  }, 2000);
});
onUnmounted(() => {

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
        gap: 2rem;
        transition: all 0.2s linear;
        transform: translateY(-4rem);

        //时间
        .timeShow {
          @include flexCenter(column, center);

          .h-minute {
            font-size: 5rem;
            font-weight: 700;
            padding-bottom: 1rem;
            text-align: center;
            @include flexCenter(row, center);
            letter-spacing: 0.5rem;

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
            font-size: 1rem;
            font-weight: 700;
          }

          // 公历
          .day-date {
            font-weight: 700;
            color: #dce4ed;
            padding: 0.5rem;
            font-size: 1.4rem;
          }
        }

        //搜索
        .search-container {
          @include flexCenter(row, space-between);
          text-align: center;
          width: 35vw;
          min-width: 10rem;
          font-size: 0.8rem;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 0.2rem;

          //按钮组
          .searchIconChoose {
            @include flexCenter(column, flex-start);
            width: 2rem;
            height: 2rem;

            position: relative;
            transition: all 1s ease;

            .webicon {
              display: inline-block;
              transition: all 0.3s ease;
              width: 100%;
              height: 100%;
              position: absolute;
              opacity: 0;

              img {
                width: 1rem;
              }

              &:hover {
                background-color: rgb(0, 0, 0, .6);
              }
            }

            .baidu {
              transform: translateY(0);
            }

            .bing {
              transform: translateY(100%);
            }

            .google {
              transform: translateY(200%);
            }

            &:hover {
              .webicon {
                opacity: 1 !important;
              }
            }

          }

          .searchIconChoose .webicon.active {
            opacity: 1 !important;
          }

          //输入框
          .formInput {
            flex: 1;
            min-width: 0;

            input {
              height: 2rem;
              width: 100%;
              font-family: 'gtpy';
              color: $general-black;
              font-size: 0.9rem;
              padding: 0 0.5rem;
              color: $general-white;
              background-color: transparent;
              border: none;
              outline: none;

              &::placeholder {
                text-align: center;
                color: $color-4;
              }
            }
          }

          //搜索按钮
          .searchBtn {
            min-width: 3rem;
            height: 100%;
            transition: all 0.2s ease;

            img {
              width: 1rem;
            }

            &:hover {
              background-color: rgb(0, 0, 0, .6);
            }
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
            text-align: center;

            a {
              color: $primary-hover;
              text-decoration: underline;
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
      @include flexCenter(column, center);

      .front-end {
        padding: 1rem 1.5rem;
        width: 80vw;
        color: white;
        background-color: rgba(81, 79, 79, 0.3);
        backdrop-filter: blur(0.1rem);
        border-radius: 0.5rem;
        overflow-y: auto;

        ul {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
          gap: 1rem;

          li {
            width: auto;
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

}
</style>
