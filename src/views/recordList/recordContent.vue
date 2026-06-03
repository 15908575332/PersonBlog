<template>
  <div class="recordContent" :class="{ 'overflow-hidden': isInputOpen }">

    <Navigation />

    <div class="backVideo">
      <!-- <video src="@/assets/videos/recordContentBack.mp4" autoplay loop></video> -->
    </div>
    <!-- 搜索栏 -->
    <div class="search" :class="{ search__open: isInputOpen }">
      <span class="closeInput" @click="inputBlur">×</span>
      <form class="search__form" @submit.prevent="handleSearch">
        <input type="text" ref="inputSearch" v-model="searchQuery" placeholder="请输入搜索内容" @focus="inputFocus" />
        <img src=" @/assets/icon/informalEssay/informalEssaySearch.svg" @click="handleSearch" />
      </form>
      <div class="search__suggestion">
        <h3>一些有用的建议</h3>
        <div class="suggestion-tags">
          <span v-for="tag in tags.slice(0, 15)" :key="tag" class="suggestion-tag"
            @click="setTagToInput(tag.master_tag)">#{{ tag.master_tag }}</span>
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div v-if="isSearching" class="search__result">
      <div class="menu" style="border-color: #8fcfc4;">
        <div class="flex__layout">
          <img src=" @/assets/icon/recordList/search_result.svg" alt="advocate" style="width: 1.5rem;" />
          <span>“{{ searchTitle }}”</span>
        </div>
        <div class="flex__layout">
          <img src=" @/assets/icon/informalEssay/informalEssayMore.svg" alt="informalEssayMore" />
          <span>MORE</span>
        </div>
      </div>
      <!-- 搜索结果为空 -->
      <div v-if="!searchResult.length > 0" class="noSearchResult">
        <div class="noSearchResult__img">
          <img src=" @/assets/img/recordList/content/noSearchResults.png" alt="noSearchResult" />
          <p>暂无搜索结果</p>
        </div>
      </div>
      <!-- 搜索结果渲染-->
      <div v-else>
        <div class="search_content_aera">
          <div class="search_item" v-for="item in searchResult" :key="item.article_id"
            :style="{ background: generateRandomGradient(item.article_id) }" @click="listDetail(item.article_id)"
            data-aos="zoom-in">
            <!-- 图片和一些数据 -->
            <div class="search_result_image">
              <img v-lazy="item.cover_image_url" @load="onLoad" @error="onError" alt="Image" />
              <ul class="item_count">
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
                  <img src="@/assets/icon/recordList/like.svg" alt="message" />
                  <span>{{ item.like_count }}</span>
                </li>
              </ul>
            </div>
            <h1>{{ item.title }}</h1>
            <div class="box-content">
              <h3 class="title">{{ item.sub_tag }}</h3>
              <span class="post">Web designer</span>
              <ul class="icon">
                <li><a href="#">♥</a></li>
                <li><a href="#">1</a></li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="paginate">
          <vue-awesome-paginate v-if="searchPagination.total > 0" :total-items="searchPagination.total"
            v-model="searchPagination.pageNum" :items-per-page="searchPagination.pageSize" :max-pages-shown="5"
            back-button-class="back-btn" next-button-class="next-btn" :show-ending-buttons="true"
            :show-breakpoint-buttons="true" @click="onClickHandler">
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
    <!-- 内容区域 -->
    <div v-else class="main__content">
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

      <div class="content__container">
        <!-- 推荐位 -->
        <section v-if="advocateItems && advocateItems.length > 0">
          <div class="menu" style="border-color: #ff623e;">
            <div class="flex__layout">
              <img src=" @/assets/icon/recordList/advocate.svg" alt="advocate" style="width: 2.9rem;" />
            </div>
            <div class="flex__layout">
              <img src=" @/assets/icon/informalEssay/informalEssayMore.svg" alt="informalEssayMore" />
              <span style="color: #d81e06;">MORE</span>
            </div>
          </div>
          <div class="content_aera advocate">
            <div class="specific__content" v-for="item in advocateItems" :key="item.id">
              <div v-if="item.has_advocate">
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
                        <img src="@/assets/icon/recordList/like.svg" alt="message" />
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
          </div>
        </section>
        <!-- 常规内容 -->
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
                <div v-if="item.cover_video_url !== null">
                  <img src="" alt="" style="background-color: #8fcfc4;">
                </div>
                <!-- <img v-lazy="item.cover_image_url" @load="onLoad" @error="onError" alt="Image" />
                <button v-if="item.cover_video_url !== null && playButtonReview" class="play-button"></button> -->
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
                      <img src="@/assets/icon/recordList/like.svg" alt="message" />
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
import Navigation from "@/components/common/NavigationMenu.vue";
import { useRouter } from "vue-router"; //引入路由相关的api
const route = useRouter(); // 实例化路由
import { useMainStore } from "@/store/maincontent";
const mainStore = useMainStore();
import utils from "@/utils/getAssetsFile";
import AOS from "aos";
import { useAuthStore } from '@/store/auth';
import {
  onMounted,
  computed,
  ref,
  nextTick,
  getCurrentInstance
} from "vue";
const authStore = useAuthStore();
const $http = getCurrentInstance().appContext.config.globalProperties.$http;

/** ------------------------ 搜索结果处理 ------------------------ */
const isInputOpen = ref(false); // 控制搜索框的打开状态
const isSearching = ref(false); // 控制搜索结果的显示状态
const searchQuery = ref(""); // 搜索关键词
const searchResult = ref([]); // 搜索结果
const searchPagination = ref({ // 搜索结果分页信息
  total: 0,
  pageNum: 1,
  pageSize: 10,
  totalPages: 0
});
const searchTitle = ref('');
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
  handleSearch();
}
const handleSearch = async () => {
  isSearching.value = true; // 开始搜索，显示搜索结果区域
  if (searchQuery.value.trim() === "") {
    return; // 避免空搜索
  }
  try {
    const res = await $http.get('/main/searchTags', {
      params: {
        keyword: searchQuery.value,
        pageNum: searchPagination.value.pageNum,
        pageSize: searchPagination.value.pageSize
      }
    });
    searchResult.value = res.data?.results || [];
    searchTitle.value = res.data?.searchKey || '搜索结果';
    searchPagination.value = res?.pagination || {};
    searchQuery.value = '';
    inputBlur();
    // 输入框失去焦点
    inputSearch.value.blur();

  } catch (error) {
    console.error('搜索失败:', error);
    isSearching.value = false; // 搜索失败，隐藏搜索结果区域
  }
}
//搜索结果随机背景色
const gradientColors = [
  ['#ff9a9e', '#fecfef'],
  ['#a1c4fd', '#c2e9fb'],
  ['#d4fc79', '#96e6a1'],
  ['#84fab0', '#8fd3f4'],
  ['#a6c0fe', '#f68084'],
  ['#fccb90', '#d57eeb'],
  ['#e0c3fc', '#8ec5fc'],
  ['#fad0c4', '#ffd1ff'],
  ['#cd9cf2', '#f6f3ff'],
  ['#92fe9d', '#00c9ff'],
  ['#ffecd2', '#fcb69f'],
  ['#fdbb2d', '#22c1c3'],
  ['#00BFFF', '#00FA9A'],
  ['faeff3', 'd1f0ec']
];

const generateRandomGradient = (seed) => {
  // 使用文章ID作为种子，确保同一文章每次显示相同的渐变
  const seedNum = seed ? String(seed).split('').reduce((a, b) => a + b.charCodeAt(0), 0) : Math.random();
  const colorIndex = Math.floor(seedNum % gradientColors.length);
  const colors = gradientColors[colorIndex];
  const angle = Math.floor(seedNum % 360);
  return `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
};
/** ------------------------ 导航数据 ------------------------ */
const navContent = ref([]);
const fetchNavData = async () => {
  await mainStore.fetchNavData();
  navContent.value = mainStore.navData;
  if (navContent.value.length > 0) {
    toggleMoudle(navContent.value[0].category_id);
  }
}

/** ------------------------格式化时间------------------------ */
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
const release_time_format = ((date) => {
  return dayjs(date).format('YYYY-MM-DD');
})

/** ------------------------内容数据------------------------ */
const mainContent = computed(() => {
  return mainStore.contentData || [];
})
const advocateItems = computed(() =>
  mainContent.value.filter(item => item.has_advocate === 1)
)
const tags = computed(() => {
  return mainStore.tags;
})
const isActive = ref(); //当前激活导航
const currentId = ref(); //设置当前ID
const currentIndex = ref(0); // 当前选中的导航索引

const toggleMoudle = async (category_id = null, index) => {
  isActive.value = category_id;
  currentId.value = category_id;
  currentIndex.value = index;
  await mainStore.fetchMainContent(category_id, authStore.user.userId);
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
  // font-family: var(--app-font-family);
  font-family: var(--app-font-family);
  user-select: none;
  min-height: 100vh;
  //内容盒子宽度
  $main_content_width: 60rem;

  .navigate {
    position: absolute;
    top: 0;
    z-index: 2;
  }

  // 背景视频
  .backVideo {
    width: 100%;
    height: 25rem;
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
    @include flexCenter(center, center);
    height: 100px;
    width: 100%;
    position: absolute;
    top: 15vh;

    .closeInput {
      position: absolute;
      top: 10vh;
      right: 30vw;
      color: #51c492;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 2;
      opacity: 0;
    }

    .search__form {
      transform: scale3d(0.9, 0.9, 1);
      transition: transform 0.5s;
      transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);

      input {
        border-radius: 1rem;
        border: 2px solid #4dd5cc;
        padding: 0.2rem 1rem;
        padding-right: 2rem;
        width: 20rem;
        color: #f3efef;
        font-size: 0.9rem;
        display: flex;
        font-family: var(--app-font-family);
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
      top: 25vh;
      z-index: -1;

      .suggestion-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
        margin-top: 0.5rem;
      }

      .suggestion-tag {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid $primary-color;
        color: #fff;
        border-radius: 1rem;
        padding: 0.2rem 0.8rem;
        font-size: 0.95rem;
        cursor: pointer;
        opacity: 0;
        transform: translate3d(0, 100px, 0);
        transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        pointer-events: none;
      }

      .suggestion-tag:hover {
        background: $primary-sub;
        color: $general-white;
        transition: all ease 0.4s;
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
        color: $primary-color;
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
      background: rgba(0, 0, 0, 0.8);
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
      z-index: 2;
      transform: translate3d(0, 15vh, 0) translate3d(0, -50%, 0) scale3d(1.2, 1.2, 1);
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

  // 搜索结果区域
  .search__result {
    width: $main_content_width;
    margin: 0 auto;
    position: relative;
    z-index: 0;

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
          color: $primary-sub;
        }
      }
    }

    .noSearchResult {
      padding: 2rem 0;

      .noSearchResult__img {
        @include flexCenter(column, center);

        img {
          width: 20rem;
        }

        p {
          font-size: 1rem;
          color: #999;
        }
      }
    }

    // 搜索结果内容区域
    .search_content_aera {
      @include flexCenter(column, flex-start);
      gap: 1rem;
      flex-wrap: wrap;
      padding: 1.5rem 0.5rem;

      .search_item {
        overflow: hidden;
        position: relative;
        @include flexCenter(row, flex-start);
        width: 100%;
        height: 8rem;
        padding: 0.2rem;
        border-radius: 0.2rem;
        z-index: 1;
        transition: all 0.5s;
        background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);

        &:hover {
          box-shadow: 3px 3px 5px #999;

          &::before {
            opacity: 1;
            right: -6%;
          }

          &::after {
            opacity: 1;
            top: -113%;
          }

          .box-content {
            right: 5%;
          }
        }

        &::before,
        &::after {
          content: "";
          background: radial-gradient(circle at 23% 70%, rgba(255, 255, 255, 0.8), #ffffff 30%);
          width: 20%;
          height: 150%;
          opacity: 0;
          transform: rotate(40deg);
          position: absolute;
          top: -20%;
          right: -25%;
          z-index: 1;
          transition: all 0.5s ease;
        }

        &::after {
          background: rgba(255, 255, 255, 0.5);
          right: auto;
          right: 9%;
          top: -131%;
        }

        .search_result_image {
          width: 20%;
          height: 100%;
          position: relative;
          border-radius: 0.2rem;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }

          .item_count {
            position: absolute;
            bottom: 0.2rem;
            left: 0.2rem;
            display: flex;

            li {
              @include flexCenter(row, center);
              margin-right: 0.2rem;

              img {
                width: 0.9rem;
                margin-right: 0.2rem;
              }

              span {
                font-size: 0.8rem;
                color: white;
                font-weight: 700;
              }
            }
          }
        }

        h1 {
          font-weight: 700;
          font-size: 1rem;
          margin-left: 1rem;
        }

        .box-content {
          text-align: right;
          transform: translateY(-50%);
          position: absolute;
          top: 50%;
          right: -100%;
          z-index: 2;
          transition: all .5s;


          .title {
            color: #1e272e;
            font-size: 23px;
            font-weight: 700;
            text-transform: uppercase;
            margin: 0 0 3px 0;
          }

          .post {
            font-size: 16px;
            text-transform: capitalize;
            margin: 0 0 10px;
            display: block;
          }

          .icon {
            padding: 0;
            margin: 0;
            list-style: none;

            li {
              display: inline-block;
              margin: 0 4px;

              a {
                color: #fff;
                background-color: #1e272e;
                font-size: 18px;
                text-align: center;
                line-height: 35px;
                height: 35px;
                width: 35px;
                border-radius: 50%;
                display: block;
                transition: all 0.3s;

                &:hover {
                  color: #1e272e;
                  background-color: #fff;
                  border-radius: 10%;
                  box-shadow: 0 0 5px #1e272e inset;
                }
              }
            }
          }
        }

        @media only screen and (max-width:990px) {
          .box {
            margin: 0 0 30px;
          }
        }

        @media only screen and (max-width:479px) {
          .box .title {
            font-size: 20px;
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
        // left: 0.5rem;

        ul {
          @include flexCenter(row, flex-start);

          li {
            @include flexCenter(row, center);
            font-size: 0.7rem;
            font-weight: 700;
            padding-left: 0.5rem;

            img {
              padding-right: 0.1rem;
              height: 0.9rem !important;
              transform: scale(1) !important;
            }
          }
        }
      }
    }

    // 搜索结果分页
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
        font-family: var(--app-font-family);
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

  // 内容区域
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
            height: 100%;
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

      // 推荐位
      .menu {
        @include flexCenter(row, space-between);
        border-bottom: 1px dashed #ccc;
        padding: 0.2rem;
        padding-top: 2rem;
        position: relative;
        z-index: 1;

        .flex__layout {
          @include flexCenter(row, center);
          justify-content: flex-start;

          img {
            width: 1.2rem;
            margin-right: 0.5rem;
          }

          span {
            font-size: 1rem;
            color: $primary-sub;
          }
        }
      }

      .content_aera {
        @include flexCenter(row, flex-start);
        gap: 1rem;
        flex-wrap: wrap;
        padding: 1.5rem 0.5rem;
        position: relative;
        z-index: 1;

        .specific__content {
          width: 11rem;
          border-radius: 0.5rem;
          overflow: hidden;
          transition: all 0.3s;

          .image {
            width: 100%;
            height: 8rem;
            display: inline-block;
            border-radius: 0.5rem;
            overflow: hidden;
            background-color: rgb(255, 183, 183);
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
              @include text-color('text-sec-color');

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
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              @include text-color('text-color');
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
          // left: 0.5rem;

          ul {
            @include flexCenter(row, flex-start);

            li {
              @include flexCenter(row, center);
              font-size: 0.7rem;
              font-weight: 700;
              padding-left: 0.5rem;

              img {
                padding-right: 0.1rem;
                height: 0.9rem !important;
                transform: scale(1) !important;
              }
            }
          }
        }
      }

      // 推荐位
      .advocate {
        align-items: flex-start;

        .specific__content:first-child {
          width: 23rem;

          .image {
            height: 16rem;
          }
        }
      }

      // 内容分页
      .paginate {
        @include flexCenter(row, center);
        padding-bottom: 1rem;
        position: relative;
        z-index: 1;

        .pagination-container {
          display: flex;
          column-gap: 0.5rem;
          align-items: center;
        }

        .paginate-buttons {
          height: 1rem;
          width: 1.4rem;
          font-size: 0.8rem;
          font-family: var(--app-font-family);
          font-weight: 700;
          margin: 0 0.1rem;
          border-radius: 0.25rem;
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
