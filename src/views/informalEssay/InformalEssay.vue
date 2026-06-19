<template>
  <div id="informalEssay">
    <!-- 导航 -->
    <div class="nav-wrapper" :class="[$isNavHidden ? 'navHiddenOut' : 'navHiddenIn']">
      <Navigation></Navigation>
    </div>

    <!-- 背景图 -->
    <div class="backPhoto"></div>
    <!-- 遮罩 -->
    <div class="mask"></div>
    <div class="text">
      <h1 class="text-effect">直挂云帆济沧海</h1>
    </div>
    <div class="container">
      <!-- 波浪动画 -->
      <div class="waveAnimation">
        <div class="waveWrapperInner bgTop">
          <div class="wave waveTop"></div>
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div class="wave waveMiddle"></div>
        </div>
        <div class="waveWrapperInner bgBottom">
          <div class="wave waveBottom"></div>
        </div>
      </div>
      <div class="content">
        <div class="content__box">
          <div class="left">
            <div class="personCard box__shadow">
              <div class="profilePicture">
                <img :src="authStore.user.avatarUrl" alt="profilePicture" />
              </div>
              <div class="nickname">
                <h1>{{ authStore.user.username }}</h1>
              </div>
              <div class="separate">
                <ul>
                  <li>
                    <span>文章</span>
                    <span>93</span>
                  </li>
                  <li>
                    <span>分类</span>
                    <span>6</span>
                  </li>
                  <li>
                    <span>访问量</span>
                    <span>127038</span>
                  </li>
                </ul>
              </div>
              <div class="interest">
                <img src="@/assets/icon/informalEssay/friend.svg" alt="friend" />
                <span>朋友圈</span>
              </div>
            </div>
            <!-- 搜索文章 -->
            <div class="search box__shadow">
              <h1>搜索</h1>
              <form class="search__form">
                <input type="text" v-model="searchQuery" placeholder="搜索文章" />
                <img src=" @/assets/icon/informalEssay/informalEssaySearch.svg" alt="" />
              </form>
            </div>
            <!-- 友站 -->
            <div class="friendWeb box__shadow">
              <h1>💯友站</h1>
            </div>
            <!-- 留言滚动 -->
            <div class="scrollMessage">
              <scroll-message :containerWidth="295" :messages="messageList"></scroll-message>
            </div>
            <!-- 推荐位 -->
            <div class="recommend box__shadow">
              <h1>🍃推荐位</h1>
              <div class="recommend__content">
                <div class="recommend__content__box">
                  <img src="@/assets/img/infomalEssay/infomalEssayPicture.jpg" alt="" />
                  <div class="recommend__content__text"></div>
                </div>
              </div>
              <h2>【紫韵数据】我的奋斗</h2>
              <button class="play-button"></button>
            </div>

            <!-- 锚点导航 -->
            <div class="anchorPointNav">
              <ul class="anchorPointList">
                <li v-for="module in navData" :key="module.category_id">
                  <a href="#" @click.prevent="scrollToSection(module.category_id)">
                    <p>速览</p>
                    <p>{{ module.nav_btn_title }}</p>
                    <p>{{ module.nav_btn_subtitle }}</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="right">
            <div class="notice">
              <p>
                <img src="@/components/informalEssay/icon/ListDetail/notice.svg" alt="notice" />
                <span>公告：本站为个人博客，用于记录个人学习笔记，如有侵权请联系删除</span>
              </p>
            </div>
            <div class="content__container">
              <!-- 生活倒影 -->
              <section v-for="module in navData" :key="module.category_id" :id="module.category_id">
                <div class="menu">
                  <div class="flex__layout">
                    <img src=" @/assets/icon/informalEssay/informalEssayMenu.svg" alt="" />
                    <span>{{ module.nav_btn_title }}</span>
                  </div>
                  <div class="flex__layout">
                    <img src=" @/assets/icon/informalEssay/informalEssayMore.svg" alt="" />
                    <span>MORE</span>
                  </div>
                </div>
                <div class="right__content_aera">
                  <div class="specific__content box__shadow" v-for="(item, index) in dataContent[module.category_id]"
                    :key="index">
                    <figure class="image c4-izmir c4-image-pan-down" @click="listDetail(item.article_id)">
                      <img v-lazy="item.cover_image_url" @load="onLoad" @error="onError" alt="Image" />
                      <button v-if="item.cover_video_url !== null && playButtonReview" class="play-button"></button>
                    </figure>
                    <div class="text__content">
                      <!-- 发布 -->
                      <div class="release">
                        <img src="@/assets/icon/recordList/release.svg" alt="" />
                        <span>发布于{{ dayjs(item.release_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
                      </div>
                      <h1>{{ item.title }}</h1>
                      <ul class="funcition">
                        <li>
                          <img src="@/assets/icon/recordList/heat.svg" alt="heat" />
                          <span>{{ item.heat }}热度</span>
                        </li>
                        <li>
                          <!-- <img src="@/assets/icon/recordList/comment.svg" alt="comment" /> -->
                          <!-- <span>{{ item.comment.length }}评论</span> -->
                        </li>
                        <li>
                          <img src="@/assets/icon/recordList/like.svg" alt="like" />
                          <span>{{ item.like_count }}赞</span>
                        </li>
                      </ul>
                      <div class="footer__tags">
                        <p>
                          <img src="@/assets/icon/recordList/blog.svg" alt="blog" />
                          <span>{{ item.master_tag }}</span>
                        </p>
                        <p>
                          <img src="@/assets/icon/recordList/arrange.svg" alt="arrange" />
                          <span>{{ item.sub_tag }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <!-- 底部版权 -->
        <div class="footer">
          <p>桃李春风一杯酒，江湖夜雨十年灯</p>
          <p>本站源码存于gitee(vue3版本)，UI参考POETIZE-最美博客</p>
          <p>本网站部分源于网络，仅供学习参考</p>
          <p>
            如无意中侵犯了某个人的知识产权，请及时通过电子邮件（1590857xxxx@163.com）告知我们，本站将立即给予删除
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Navigation from "@/components/common/NavigationMenu.vue";
import scrollMessage from "@/components/informalEssay/scrollMessage.vue";
import { useAuthStore } from "@/store/auth";
import { useMainStore } from "@/store/maincontent";
import dayjs from "dayjs";
import axios from "axios";
import { debounce } from "@/utils/debounce"; // 导入防抖函数
const mainStore = useMainStore();
const authStore = useAuthStore();


/** ------------------------ 获取分类 ------------------------ */
const navData = ref([]);
const getNavData = () => {
  mainStore.fetchNavData();
  navData.value = mainStore.navData;
}

/** ------------------------ 修复数据加载逻辑 ------------------------ */
const loading = ref(true);

// 使用 async/await 确保顺序执行
const initializeData = async () => {
  try {
    loading.value = true;

    // 1. 先获取导航数据
    getNavData();

    console.log(navData.value)
    // 2. 等待导航数据加载完成后，再获取内容数据
    if (navData.value && navData.value.length > 0) {
      await getContentData();
    }

    // 3. 最后获取滚动消息
    await getScrollMessageData();

  } catch (error) {
    console.error('数据初始化失败:', error);
  } finally {
    loading.value = false;
  }
};

/** ------------------------ 获取所有内容，根据分类id分别存储 ------------------------ */
const dataContent = ref([]);
const getContentData = async () => {
  await Promise.all(navData.value.map(async (category) => {
    const categoryId = category.category_id;
    await mainStore.fetchMainContent(categoryId, authStore.user.userId);
    dataContent.value[categoryId] = mainStore.contentData; // 按分类ID存储数据
  }));
}

/** ------------------------ 获取留言（左侧滚动留言） ------------------------ */
const messageList = ref([]);
const getScrollMessageData = (async () => {
  try {
    const response = await axios.get('http://localhost:3000/getMessageList');
    messageList.value = response.data.data.map(item => ({
      avatar: item.avatar_url,
      text: item.message_content,
      username: item.username
    }));
  } catch (error) {
    console.error('获取留言失败', error);
    message.error('留言加载失败');
  }
});

/** ------------------------ 锚点导航------------------------ */
const scrollToSection = (sectionId) => {
  console.log(sectionId);
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

/** ------------------------ 传入文章id值详情页ListDetail ------------------------ */
import { useRouter } from "vue-router";
import NavigationMenu from "../../components/common/NavigationMenu.vue";
const route = useRouter();
const listDetail = (id) => {
  route.push({
    name: 'listDetail',
    params: {
      id: id,
    },
  });
};


/** ------------------------ 图片加载完成后显示播放按钮 ------------------------ */
const
  playButtonReview = ref(false), // 用于控制图片加载状态
  onLoad = () => {
    if (!mainStore.loading) { // 图片加载完成后再显示播放按钮
      playButtonReview.value = true;
    }
  };

onMounted(() => {
  initializeData();
});

onBeforeUnmount(() => {
});
</script>
<style scoped lang="scss">
$count: 10;
$contentWidth: 65rem; // 内容宽度

#informalEssay {

  // 通用阴影
  .box__shadow {
    box-shadow: 0px 0px 6px 4px rgba(17, 17, 26, 0.1);
  }

  // 背景图
  .backPhoto {
    width: 100vw;
    height: 50%;
    min-height: 500px;
    background-size: cover;
    z-index: -2;
    background-position: center;
    position: fixed;
    animation: zoomInDown 0.6s ease-out forwards;
    background-image: url("../../assets/img/infomalEssay/infomalEssay.png");
  }

  // 遮罩
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: #00000010;
    z-index: -1;
  }

  //  文字动画
  .text {
    height: 19rem;
    position: relative;

    .text-effect {
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: 5;
      color: #ffffff;
      font-family: var(--app-font-family);
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 0.2rem;
      text-transform: uppercase;
      text-align: center;
      transform: translate(-50%, -100%);
      border-right: 0.1em solid;
      width: 16rem;
      margin: 2em 1em;
      white-space: nowrap;
      overflow: hidden;
      animation: typing 3s steps(20, end),
        cursor-blink 0.3s step-end infinite alternate;
    }

    @keyframes typing {
      from {
        width: 0;
      }
    }

    @keyframes cursor-blink {
      50% {
        border-color: transparent;
      }
    }
  }

  .container {
    animation: zoomInUp 0.6s ease-out;

    // 波浪动画
    .waveAnimation {
      overflow: hidden;
      margin: auto;

      .waveWrapperInner {
        position: absolute;
        width: 100%;
        overflow: hidden;
        height: 5rem;

        .wave {
          position: absolute;
          left: 0;
          width: 200%;
          height: 100%;
          background-repeat: repeat no-repeat;
          background-position: 0 bottom;
          transform-origin: center bottom;
        }

        .waveTop {
          background-size: 50% 80px;
          background-image: url("@/assets/img/infomalEssay/wave-top.png");
          animation: move_wave 20s linear infinite;
        }

        .waveMiddle {
          background-size: 50% 90px;
          background-image: url("@/assets/img/infomalEssay/wave-mid.png");
          animation: move_wave 15s linear infinite;
        }

        .waveBottom {
          background-size: 50% 70px;
          background-image: url("@/assets/img/infomalEssay/wave-bot.png");
          animation: move_wave 18s linear infinite;
        }
      }

      .bgTop {
        z-index: 15;
        opacity: 0.5;
      }

      .bgMiddle {
        z-index: 10;
        opacity: 0.75;
      }

      .bgBottom {
        z-index: 5;
      }
    }

    .content {
      width: 100%;
      margin-top: 5rem;
      padding: 1rem 0 0 0;
      background-color: #ffffff;

      .content__box {
        font-family: var(--app-font-family);
        width: 100%;
        max-width: $contentWidth;
        margin-left: auto;
        margin-right: auto;
        padding: 0 1rem;
        @include flexCenter(row, space-between);
        align-items: flex-start;

        .left {
          width: 25%;

          .personCard {
            background-image: linear-gradient(135deg,
                #a9e0ec 15%,
                #c0bdf0 100%);
            border-radius: 10px;
            padding: 1rem 0;
            transition: all 0.3s;
            @include flexCenter(column, center);

            &:hover {
              box-shadow: 5px 5px 0px 0px #cacaca;
            }

            .profilePicture {
              width: 6rem;
              height: 6rem;
              border-radius: 50%;
              overflow: hidden;
              background-color: #000;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .nickname {
              padding: 0.5rem 0;

              h1 {
                font-size: 2rem;
                font-weight: 700;
                letter-spacing: -1px;
              }
            }

            .separate {
              ul {
                @include flexCenter(row, space-around);

                li {
                  @include flexCenter(column, space-between);
                  font-size: 0.9rem;
                  padding: 0 0.8rem;

                  span {
                    padding-bottom: 0.5rem;
                  }
                }
              }
            }

            .interest {
              background-color: #4dd5cc;
              @include flexCenter(row, center);
              color: white;
              font-family: var(--app-font-family);
              width: 10rem;
              border-radius: 1rem;
              padding: 0.2rem 0 0.3rem;
              margin-top: 0.8rem;

              img {
                width: 0.8rem;
                margin-top: 0.1rem;
              }
            }
          }

          // 搜索文章
          .search {
            border-radius: 10px;
            padding: 0.8rem;
            margin: 1.5rem 0;

            h1 {
              color: #4dd5cc;
              font-size: 1.1rem;
              font-weight: 700;
              width: 100%;
              padding-bottom: 0.5rem;
            }

            .search__form {
              position: relative;

              input {
                border-radius: 1rem;
                border: 2px solid #4dd5cc;
                padding: 0.2rem 1rem;
                padding-right: 2rem;
                width: 100%;
                color: #666;
                font-size: 0.8rem;
                display: flex;
                font-family: var(--app-font-family);
                align-items: center;

                &::placeholder {
                  color: #666;
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
          }

          // 友站
          .friendWeb {
            border-radius: 10px;
            padding: 1rem;
            margin: 1.5rem 0;
            @include flexCenter(row, center);

            h1 {
              color: #ff416c;
              font-weight: 700;
            }
          }

          //推荐位
          .recommend {
            border-radius: 10px;
            padding: 1rem;
            transition: all 0.3s;
            margin: 1.5rem 0;
            position: relative;

            h1 {
              color: #1ae8c5;
              font-size: 1rem;
              font-weight: 700;
              width: 100%;
            }

            .recommend__content {
              width: 100%;
              overflow: hidden;

              .recommend__content__box {
                position: relative;
                width: 100%;
                height: 100%;
                padding: 0.5rem 0;

                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 10px;
                }

                .recommend__content__text {
                  position: absolute;
                  top: -2rem;
                  left: -2rem;
                  width: calc(100% + $count * 2rem);
                  height: calc(100% + $count * 2rem);
                  border-radius: calc($count * $contentWidth / $contentWidth * 10px);
                  animation-name: move_wave;
                  animation-duration: calc($count * $contentWidth / $contentWidth * 20s);
                  animation-timing-function: linear;
                  animation-iteration-count: infinite;
                }
              }
            }

            h2 {
              font-weight: 700;
            }
          }

          //锚点导航
          .anchorPointNav {
            margin-top: 1.5rem;

            .anchorPointList {
              li {
                border-radius: 0.5rem;
                background-image: linear-gradient(100deg,
                    #348cff 15%,
                    #17c3ff 100%);
                margin-bottom: 1.5rem;

                a {
                  display: block;
                  padding: 0.8rem;
                  flex-wrap: wrap;
                  font-size: 0.9rem;
                  border-radius: 154;

                  p:nth-child(2) {
                    padding: 0.8rem 0;
                    font-size: 1.2rem;
                  }

                  p:nth-child(2),
                  p:nth-child(3) {
                    font-weight: 700;
                  }
                }

                &:nth-child(2) {
                  background-image: linear-gradient(100deg,
                      #18e7af 15%,
                      #1eebe9 100%);
                }

                &:nth-child(3) {
                  background-image: linear-gradient(100deg,
                      #ff6954 15%,
                      #ffbc38 100%);
                }

                &:nth-child(4) {
                  background-image: linear-gradient(100deg,
                      #ff2cda 15%,
                      #ff7816 100%);
                }
              }
            }
          }
        }

        .right {
          width: 73%;

          .notice {
            border: 1px dashed #ccc;
            color: #666;
            font-size: 0.8rem;
            border-radius: 5px;
            padding: 1rem;

            p {
              display: flex;
              align-items: center;
              overflow: hidden;
              width: fit-content;
            }

            img {
              width: 1.2rem;
              margin-right: 0.5rem;
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

            .right__content_aera {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
              gap: 1.2rem;
              padding: 1.5rem 0;

              .specific__content {
                border-radius: 0.5rem;
                overflow: hidden;
                transition: all 0.3s;

                .image {
                  position: relative;
                  display: block;
                  overflow: hidden;
                  height: 9rem;

                  img {
                    width: 100%;
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
                    margin: 0.5rem 0;

                    img {
                      height: 0.8rem;
                    }
                  }

                  // 标题
                  h1 {
                    padding: 0.5rem 0;
                    font-size: 1rem;
                    font-weight: 700;
                    color: black;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }

                  // 信息
                  .funcition {
                    @include flexCenter(row, flex-start);
                    font-size: 0.7rem;
                    align-items: center;
                    margin: 0.5rem 0;

                    li {
                      margin-right: 0.5rem;
                      @include flexCenter(row, center);
                    }
                  }

                  // 底部标签
                  .footer__tags {
                    @include flexCenter(row, flex-start);

                    p {
                      background-color: #eee;
                      font-size: 0.8rem;
                      padding: 0.1rem 0.2rem;
                      border-radius: 0.2rem;
                      margin-right: 0.2rem;
                    }
                  }
                }

                &:hover {
                  box-shadow: rgba(3, 3, 3, 0.498) 0px 1.15244px 19.6189px -5.58078px;
                }
              }
            }
          }
        }
      }
    }

    //底部版权
    .footer {
      width: 100%;
      background-image: url("@/assets/img/treasureBox/helpLinkFooterBG.jpg");
      background-size: cover;
      background-position: 100% 100%;
      @include flexCenter(column, center);
      border-top-left-radius: 3rem;
      border-top-right-radius: 3rem;
      padding: 0.9rem 0;
      position: relative;
      overflow: hidden;
      font-size: 0.8rem;
      z-index: 1;
      font-family: var(--app-font-family);

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        border-top-left-radius: 3rem;
        border-top-right-radius: 3rem;
        z-index: -1;
      }

      p {
        color: white;
        margin-bottom: 1rem;

        &:nth-child(1) {
          color: white;
        }

        &:nth-child(2) {
          color: #cfcfcf;
          font-size: 0.7rem;
        }
      }
    }
  }

  .c4-izmir {
    --image-opacity: 1;
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
  height: 3rem;
  /* 按钮的高度 */
  background: rgba(0, 0, 0, 0.6);
  /* 半透明背景 */
  border: none;
  border-radius: 50%;
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
    border-left: 25px solid white;
    /* 三角形左边的颜色和宽度 */
    border-top: 15px solid transparent;
    /* 三角形顶部的透明度和宽度 */
    border-bottom: 15px solid transparent;
    /* 三角形底部的透明度和宽度 */
  }
}

@keyframes move_wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1);
  }

  50% {
    transform: translateX(-25%) translateZ(0);
  }

  100% {
    transform: translateX(-50%) translateZ(0) scaleY(1);
  }
}
</style>
