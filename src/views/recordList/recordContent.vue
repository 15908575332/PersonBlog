<template>
  <div class="recordContent" :class="{ 'overflow-hidden': isInputOpen }">
    <div class="navigate">
      <Navigation></Navigation>
    </div>
    <div class="backVideo">
      <video src="@/assets/videos/recordContentBack.mp4" autoplay loop></video>
    </div>
    <div class="search" :class="{ search__open: isInputOpen }">
      <span class="closeInput" @click="inputBlur">×</span>
      <form class="search__form">
        <input type="text" ref="inputSearch" v-model="searchQuery" placeholder="请输入搜索内容" @focus="inputFocus" />
        <img src=" @/assets/icon/informalEssay/informalEssaySearch.svg" alt="" />
      </form>
      <div class="search__suggestion">
        <h3>一些有用的建议</h3>
        <div class="suggestion-tags">
          <span v-for="tag in mainContent" :key="tag" class="suggestion-tag" @click="setTagToInput(tag.sub_tag)">#{{
            tag.sub_tag
          }}</span>
        </div>
      </div>
    </div>
    <div class="main__content">
      <!-- 导航栏 -->
      <div class="nav__card">
        <ul>
          <li class="nav__item" v-for="(module, index) in navContent" :key="module.order_id"
            @click="toggleMoudle(module.category_id, index)"
            :class="{ nav__itemActive: isActive == module.category_id }">
            <div class="hoverBanner" :style="{ opacity: isActive == module.category_id ? 1 : 0 }"></div>
            <a href="#">
              <div class="profile__picture">
                <img :src="module.category_img_url" alt="icon" />
              </div>
              <div>
                <h1>{{ module.nav_btn_title }}</h1>
                <p>{{ module.nav_btn_subtitle }}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <!-- 内容区域 -->
      <div class="content__container">
        <section>
          <div class="menu">
            <div class="flex__layout" v-if="navContent.length > 0">
              <img src=" @/assets/icon/informalEssay/informalEssayMenu.svg" alt="informalEssayMenu" />
              <span>{{ navContent[currentIndex || 0].nav_btn_title }}</span>
            </div>
            <div class="flex__layout">
              <img src=" @/assets/icon/informalEssay/informalEssayMore.svg" alt="informalEssayMore" />
              <span>MORE</span>
            </div>
          </div>
          <div class="content_aera">
            <div class="specific__content" v-for="item in paginatedItems" :key="item.id">
              <a class="image" @click="listDetail(item.article_id)" data-aos="zoom-in">
                <img v-lazy="item.cover_image_url" @load="onLoad" @error="onError" alt="Image" />
                <button v-if="item.cover_video_url !== null && playButtonReview" class="play-button"></button>
                <div class="item__count">
                  <ul>
                    <li v-if="item.cover_video_url !== null">
                      <img src="@/assets/icon/recordList/countPlay-icon.svg" alt="play" />
                      <span>3</span>
                    </li>
                    <!-- 预览量 -->
                    <li>
                      <img src="@/assets/icon/recordList/countCat-icon.svg" alt="cat" />
                      <span>{{ item.heat }}</span>
                    </li>
                    <!-- 点赞量 -->
                    <li>
                      <img src="@/assets/icon/recordList/countMessage-icon.svg" alt="message" />
                      <span>{{ item.like_count }}</span>
                    </li>
                  </ul>
                </div>
              </a>
              <div class="text__content">
                <!-- 发布 -->
                <h1>{{ item.title }}</h1>
                <div class="release">
                  <span>
                    <img :src="utils.getAssetsFile('icon/recordList/auther.svg')" alt="auther_icon">
                    {{ item.username }}·{{ release_time_format(item.release_time) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- 分页 -->
        <div class="paginate">
          <vue-awesome-paginate v-if="totalItems > 0" :total-items="totalItems" v-model="currentPage"
            :items-per-page="pageSize" :max-pages-shown="5" back-button-class="back-btn" next-button-class="next-btn"
            :show-ending-buttons="true" :show-breakpoint-buttons="true" @click="onClickHandler">
            <template #prev-button>
              <span>
                <img src="@/assets/icon/recordList/previousPage.svg" height="25" />
              </span>
            </template>

            <template #next-button>
              <span>
                <img src="@/assets/icon/recordList/nextPage.svg" height="25" />
              </span>
            </template>
          </vue-awesome-paginate>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navigation from "@/components/NavigationMenu/index.vue";
import { useRouter } from "vue-router"; //引入路由相关的api
const route = useRouter(); // 实例化路由
import { useMainStore } from "@/store/maincontent";
const mainStore = useMainStore();
import utils from "@/utils/getAssetsFile";
import AOS from "aos";
import {
  onMounted,
  computed,
  ref,
  nextTick
} from "vue";
//搜素框
const isInputOpen = ref(false); // 控制搜索框的打开状态
const searchQuery = ref("");

const inputBlur = () => {
  isInputOpen.value = false;
};
const inputFocus = () => {
  isInputOpen.value = true;
};
const inputSearch = ref(null); // 用于获取input元素
function setTagToInput(tag) {
  searchQuery.value = tag;
  isInputOpen.value = true;
  nextTick(() => {
    inputSearch.value && inputSearch.value.focus(); // 确保input元素存在后再聚焦
  })
}

/** ------------------------导航数据------------------------ */
const navContent = ref([]);
const fetchNavData = async () => {
  await mainStore.fetchNavData();
  navContent.value = mainStore.navData;
  if (navContent.value.length > 0) {
    toggleMoudle(navContent.value[0].category_id);
  }
}
/** ------------------------内容数据------------------------ */
const mainContent = computed(() => {
  return mainStore.contentData;
})

//格式化发布时间
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
const release_time_format = ((date) => {
  return dayjs(date).format('YYYY-MM-DD');
})

const isActive = ref(); //当前激活导航
const currentId = ref(); //设置当前ID
const currentIndex = ref(0); // 当前选中的导航索引

const toggleMoudle = async (id = null, index) => {
  isActive.value = id;
  currentId.value = id;
  currentIndex.value = index;
  await mainStore.fetchMainContent(id);
  onClickHandler(1);
};

const
  playButtonReview = ref(false), // 用于控制图片加载状态
  onLoad = () => {
    if (!mainStore.loading) {
      // 图片加载完成后执行的逻辑
      playButtonReview.value = true;
    }
  },
  onError = () => {
    // 图片加载失败后执行的逻辑
    console.error("图片加载失败");
  };



//传入需要渲染的id，与查询参数fatherId，跳转到listDetail页面
const listDetail = (id) => {
  route.push({
    name: "listDetail",
    params: {
      id: id,
    },
  });
};
// 分页
var currentPage = ref(1); // 当前页码
var pageSize = ref(10); // 每页显示的项数
var paginatedItems = ref([]); // 存储分页后的项目列表，实际页面渲染的数据集
var totalItems = computed(() => {
  // 总项数（通常你会从服务器获取这个值，但在这里我们直接知道）
  return mainContent.value.length;
});
const onClickHandler = (page) => {
  currentPage.value = page;
  calculatePaginatedItems();
};
const calculatePaginatedItems = () => {
  //计算和更新分页后的项目列表
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  //提取数组中从startIndex到endIndex（不包括endIndex）的部分，这部分即为当前页的项目列表
  paginatedItems.value = mainContent.value.slice(startIndex, endIndex);
};
onMounted(() => {
  fetchNavData();
  AOS.init({
    offset: 110,
  });
});
</script>

<style lang="scss">
.recordContent {
  font-family: "gtpy";
  background: linear-gradient(to right,
      rgba(221, 222, 233, 0.77) 0%,
      rgba(181, 255, 252, 0.56) 100%);
  user-select: none;
  min-height: 100vh;
  //内容盒子宽度
  $main_content_width: 60rem;

  .navigate {
    position: fixed;
    top: 0;
    z-index: 2;
  }

  // 背景视频
  .backVideo {
    width: 100%;
    height: 18rem;
    overflow: hidden;
    background-color: #4dd5cc;
    animation: zoomInDown 0.6s ease-out;
    border-bottom: none;
    position: relative;

    video {
      width: 100vw;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: #4dd5cc;
      display: block;
    }


  }

  .search {
    @include flexCenter(column, center);

    .closeInput {
      position: absolute;
      top: 20vh;
      right: 25vw;
      color: #51c492;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 2;
      opacity: 0;
    }

    .search__form {
      position: absolute;
      top: 15%;
      left: 50%;
      transform: scale3d(0.9, 0.9, 1) translateX(-60%);
      transition: transform 0.5s;
      transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
      z-index: 2;

      input {
        border-radius: 1rem;
        border: 2px solid #4dd5cc;
        padding: 0.2rem 1rem;
        padding-right: 2rem;
        width: 20rem;
        color: #f3efef;
        font-size: 0.9rem;
        display: flex;
        font-family: "gtpy";
        align-items: center;
        background-color: transparent;

        &::placeholder {
          color: #f3efef;
          font-size: 0.8rem;
        }
      }

      img {
        width: 1.2rem;
        transition: all 0.3s;
        position: absolute;
        top: 0.2rem;
        right: 0.5rem;

        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }

    .search__suggestion {
      width: 40vw;
      position: absolute;
      top: 50%;
      z-index: 0;

      .suggestion-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }

      .suggestion-tag {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid #4dd5cc;
        color: #fff;
        border-radius: 1rem;
        padding: 0.2rem 0.8rem;
        font-size: 0.95rem;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
        opacity: 0;
        transform: translate3d(0, 100px, 0);
        transition: opacity 0.2s, transform 0.5s;
        transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        pointer-events: none;
      }

      .suggestion-tag:hover {
        background: #e85454;
        color: #fff;
      }


      h3,
      .suggestion-tag {
        opacity: 0;
        transform: translate3d(0, 100px, 0);
        transition: opacity 0.2s, transform 0.5s;
        transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        color: #ffffff;
      }

      h3 {
        color: #4dd5cc;
        padding: 1rem 0;
        font-size: 1.2rem;
      }
    }

    &::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none; // 默认不拦截点击
      background: rgba(1, 1, 1, 0.9);
      opacity: 0;
      transition: opacity 0.5s;
      transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
      z-index: 1;
    }
  }

  // 搜索框激活时
  .search__open {
    .closeInput {
      opacity: 1;
      transition: opacity 0.5s;
      transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    }

    .search__form {
      transform: translate3d(0, 30vh, 0) translate3d(-50%, -50%, 0) scale3d(1.2, 1.2, 1);
    }

    .search__suggestion {
      display: block;
      z-index: 2;

      .suggestion-tag,
      h3 {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: opacity 0.5s, transform 0.5s;
        transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        pointer-events: auto;
      }

      .suggestion-tag {
        transition-delay: 0.1s;
      }
    }

    &::before {
      opacity: 1;
      pointer-events: auto; // 激活时才拦截点击
    }
  }

  //内容
  .main__content {
    width: $main_content_width;
    margin: 0 auto;
    animation: zoomInUp 0.6s ease-out;
    background: transparent;
    margin-top: -1px;
    border-top: none;


    .nav__card {
      ul {
        width: 60rem;
        @include flexCenter(row, space-around);
      }

      .nav__itemActive {
        transform: translateY(-60%) !important;
      }

      .nav__item {
        height: 100%;
        transform: translateY(-50%);
        transition: transform 0.4s;
        border-radius: 0.75rem;
        background-color: rgb(255, 255, 255, 0.7);
        overflow: hidden;

        p {
          overflow: hidden;
        }

        .hoverBanner {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          z-index: -1;
          background-image: url("@/assets/img/recordList/banner-hover.png");
          background-size: 100% 100%;
          opacity: 0;
          transition: all 0.8s;
        }

        &:hover {
          cursor: pointer;
          transform: translateY(-60%);

          .hoverBanner {
            opacity: 1;
          }
        }

        .profile__picture {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background-color: #4dd5cc;
          overflow: hidden;
          margin-right: 0.5rem;

          img {
            width: 100%;
          }
        }

        a {
          @include flexCenter(row, flex-start);
          padding: 0.5rem;
          min-width: 14rem;

          h1 {
            font-size: 1.2rem;
            color: black;
            padding: 0.5rem 0;
            font-weight: 700;
          }

          p {
            font-size: 0.9rem;
            color: #777;
          }
        }
      }
    }

    .content__container {
      .menu {
        @include flexCenter(row, space-between);
        border-bottom: 1px dashed #ccc;
        padding: 0.2rem;
        padding-top: 2rem;

        .flex__layout {
          @include flexCenter(row, center);
          justify-content: flex-start;

          img {
            width: 1.2rem;
            margin-right: 0.5rem;
          }

          span {
            font-size: 1rem;
            color: #999;
          }
        }
      }

      .content_aera {
        @include flexCenter(row, flex-start);
        column-gap: 2rem;
        flex-wrap: wrap;
        row-gap: 1.2rem;
        padding: 1.5rem 0.5rem;

        .specific__content {
          width: 10rem;
          border-radius: 0.5rem;
          overflow: hidden;
          transition: all 0.3s;

          .image {
            width: 10rem;
            height: 8rem;
            display: inline-block;
            border-radius: 0.5rem;
            overflow: hidden;
            background-color: black;
            position: relative;

            &:hover {
              cursor: pointer;

              img {
                transform: scale(1.1);
              }
            }

            img {
              width: 100%;
              height: 100%;
              transition: all 0.3s;
            }
          }

          .text__content {
            padding: 0.5rem;
            color: #a2a2a2;

            img {
              margin-right: 0.25rem;
            }

            // 发布
            .release {
              display: flex;
              align-items: center;
              font-size: 0.8rem;
              font-weight: 700;
              margin: 0.5rem 0;

              span {
                img {
                  width: 0.6rem;
                  margin: 0;
                }
              }
            }

            // 标题
            h1 {
              padding: 0rem 0;
              font-size: 1rem;
              font-weight: 700;
              color: black;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }

        // 视频播放按钮
        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 3rem;
          /* 按钮的宽度 */
          height: 2rem;
          /* 按钮的高度 */
          background: rgba(0, 0, 0, 0.6);
          /* 半透明背景 */
          border: none;
          border-radius: 10px;
          /* 圆形按钮 */
          cursor: pointer;
          /* 鼠标悬停时显示为可点击 */
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;

          /* 背景过渡效果 */
          &::before {
            content: "";
            width: 0;
            height: 0;
            border-left: 20px solid white;
            /* 三角形左边的颜色和宽度 */
            border-top: 10px solid transparent;
            /* 三角形顶部的透明度和宽度 */
            border-bottom: 10px solid transparent;
            /* 三角形底部的透明度和宽度 */
          }
        }

        // 计数
        .item__count {
          position: absolute;
          bottom: 0.3rem;
          left: 0.5rem;

          ul {
            @include flexCenter(row, flex-start);

            li {
              @include flexCenter(row, center);
              font-size: 0.7rem;
              font-weight: 700;
              padding-left: 0.8rem;

              img {
                padding-right: 0.1rem;
                height: 0.9rem !important;
                transform: scale(1) !important;
              }
            }
          }
        }
      }

      .paginate {
        @include flexCenter(row, center);
        padding-bottom: 1rem;

        .pagination-container {
          display: flex;
          column-gap: 10px;
        }

        .paginate-buttons {
          height: 25px;
          width: 35px;
          font-size: 0.9rem;
          font-family: "gtpy";
          font-weight: 700;
          margin: 0 0.1rem;
          border-radius: 5px;
          cursor: pointer;
          background-color: rgb(242, 242, 242);
          color: black;
        }

        .paginate-buttons:hover {
          background-color: #ff8345;
        }

        .active-page {
          background-color: #ff8345;
          border: 1px solid #ff8345;
          color: white;
        }

        .back-btn,
        .next-btn {
          background-color: transparent;

          &:hover {
            cursor: pointer;
            background-color: transparent;
            animation: scale-animation 1.5s infinite linear;
          }
        }

        .active-page:hover {
          background-color: #ff8345;
        }

        .first-page-button,
        .last-page-button {
          width: 50px;
        }
      }
    }
  }
}

.recordContent.overflow-hidden {
  overflow: hidden;
  height: 100vh;
  // background-color: red;
}

@keyframes flipInX {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
}
</style>
