<template>
  <div id="informalEssay">
    <div
      class="navigate"
      :class="[isNavHidden ? 'navHiddenZoomOut' : 'navHiddenZoomIn']"
    >
      <Navigation></Navigation>
    </div>
    <!-- 背景图 -->
    <div class="backPhoto" :style="videoSrc"></div>
    <!-- 遮罩 -->
    <div class="mask"></div>
    <div class="text">
      <div class="text-effect">
        <span>直</span>
        <span>挂</span>
        <span>云</span>
        <span>帆</span>
        <span>济</span>
        <span>沧</span>
        <span>海</span>
      </div>
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
                <img
                  src="@/assets/img/profile_picture/10011.png"
                  alt="profilePicture"
                />
              </div>
              <div class="nickname">
                <h1>Person</h1>
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
                <img
                  src="@/assets/icon/informalEssay/friend.svg"
                  alt="friend"
                />
                <span>朋友圈</span>
              </div>
            </div>
            <!-- 搜索文章 -->
            <div class="search box__shadow">
              <h1>搜索</h1>
              <form class="search__form">
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="搜索文章"
                />
                <img
                  src=" @/assets/icon/informalEssay/informalEssaySearch.svg"
                  alt=""
                />
              </form>
            </div>
            <!-- 友站 -->
            <div class="friendWeb box__shadow">
              <h1>💯友站</h1>
            </div>
            <!-- 留言滚动 -->
            <div class="scrollMessage">
              <scroll-message :containerWidth="300"></scroll-message>
            </div>
            <!-- 推荐位 -->
            <div class="recommend box__shadow">
              <h1>🍃推荐位</h1>
              <div class="recommend__content">
                <div class="recommend__content__box">
                  <img
                    src="@/assets/img/infomalEssay/infomalEssayPicture.jpg"
                    alt=""
                  />
                  <div class="recommend__content__text"></div>
                </div>
              </div>
              <h2>【紫韵数据】我的奋斗</h2>
              <button class="play-button"></button>
            </div>

            <!-- 锚点导航 -->
            <div class="anchorPointNav">
              <ul class="anchorPointList">
                <li>
                  <a
                    href="#"
                    @click.prevent="scrollToSection('lifeReflection')"
                  >
                    <p>速览</p>
                    <p>生活倒影</p>
                    <p>记录美好生活</p>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    @click.prevent="scrollToSection('audiovisualFeast')"
                  >
                    <p>速览</p>
                    <p>视听盛宴</p>
                    <p>听音乐、看书、看电影</p>
                  </a>
                </li>
                <li>
                  <a href="#" @click.prevent="scrollToSection('blog')">
                    <p>速览</p>
                    <p>Blog</p>
                    <p>blog</p>
                  </a>
                </li>
                <li>
                  <a href="#" @click.prevent="scrollToSection('resources')">
                    <p>速览</p>
                    <p>资源</p>
                    <p>寻找有趣的资源</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="right">
            <div class="notice">
              <p>
                <img
                  src="@/components/ListDetail/icon/notice.svg"
                  alt="notice"
                />
                <span
                  >公告：本站为个人博客，用于记录个人学习笔记，如有侵权请联系删除</span
                >
              </p>
            </div>
            <div class="content__container">
              <!-- 生活倒影 -->
              <section
                v-for="module in dataContent"
                :id="module.id"
                :key="module.id"
              >
                <div class="menu">
                  <div class="flex__layout">
                    <img
                      src=" @/assets/icon/informalEssay/informalEssayMenu.svg"
                      alt=""
                    />
                    <span>{{ module.navBtntitle }}</span>
                  </div>
                  <div class="flex__layout">
                    <img
                      src=" @/assets/icon/informalEssay/informalEssayMore.svg"
                      alt=""
                    />
                    <span>MORE</span>
                  </div>
                </div>
                <div class="right__content_aera">
                  <div
                    class="specific__content box__shadow"
                    v-for="(item, index) in module.content"
                    :key="index"
                  >
                    <figure
                      class="image c4-izmir c4-image-pan-down"
                      @click="listDetail(item.contentId, module.id)"
                    >
                      <img v-lazy="item.backImage" alt="Image" />
                      <!-- <video v-else :src="item.mainUrl"></video> -->
                      <button
                        v-if="item.mediaType === 'video'"
                        class="play-button"
                      ></button>
                    </figure>
                    <div class="text__content">
                      <!-- 发布 -->
                      <div class="release">
                        <img
                          src="@/assets/icon/recordList/release.svg"
                          alt=""
                        />
                        <span>发布于{{ item.release__time }}</span>
                      </div>
                      <h1>{{ item.title }}</h1>
                      <ul class="funcition">
                        <li>
                          <img
                            src="@/assets/icon/recordList/heat.svg"
                            alt="heat"
                          />
                          <span>{{ item.heat }}热度</span>
                        </li>
                        <li>
                          <img
                            src="@/assets/icon/recordList/comment.svg"
                            alt="comment"
                          />
                          <span>{{ item.comment.length }}评论</span>
                        </li>
                        <li>
                          <img
                            src="@/assets/icon/recordList/like.svg"
                            alt="like"
                          />
                          <span>{{ item.like }}赞</span>
                        </li>
                      </ul>
                      <div class="footer__tags">
                        <p>
                          <img
                            src="@/assets/icon/recordList/blog.svg"
                            alt="blog"
                          />
                          <span>{{ item.tag1 }}</span>
                        </p>
                        <p>
                          <img
                            src="@/assets/icon/recordList/arrange.svg"
                            alt="arrange"
                          />
                          <span>{{ item.tag2 }}</span>
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import utils from "@/utils/getAssetsFile";
import Navigation from "@/components/NavigationMenu/index.vue";
import scrollMessage from "@/components/scrollMessage/index.vue";
// 获取store定义的公共数组
import { useListDetail } from "@/store/listDetailStore";
const recordStore = useListDetail();
const dataContent = recordStore.dataContent;
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
// 传入id值到详情页ListDetail
import { useRouter } from "vue-router";
const route = useRouter();
const listDetail = (id, currentId) => {
  route.push({
    name: "listDetail",
    query: {
      fatherId: currentId,
    },
    params: {
      id: id,
    },
  });
};
const imgUrls = ref([
  {
    imgSrc: utils.getAssetsFile("img/infomalEssay/infomalEssay.png"),
  },
]);
const videoSrc = computed(() => {
  return {
    backgroundImage: `url('${imgUrls.value[0].imgSrc}')`,
  };
});
import { debounce } from "@/utils/debounce.js"; // 导入防抖函数
const isNavHidden = ref(false);
const scrollThreshold = 200; // 滚动阈值
// 处理滚动事件的函数
const handleScroll = () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  isNavHidden.value = scrollY > scrollThreshold;
};

// 使用防抖包装滚动事件处理函数
const debouncedHandleScroll = debounce(handleScroll, 100); // 300ms 防抖延迟

onMounted(() => {
  window.addEventListener("scroll", debouncedHandleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", debouncedHandleScroll);
});
</script>
<style scoped lang="scss">
$count: 10;
$contentWidth: 65rem; // 内容宽度

#informalEssay {
  .navigate {
    width: 100vw;
    position: fixed;
    top: 0;
    z-index: 2;
    background-color: rgb(0, 0, 0, 0.2);
  }

  .navHiddenZoomOut {
    animation: navHiddenZoomOut 0.5s ease forwards;
  }

  .navHiddenZoomIn {
    animation: navHiddenZoomIn 0.5s ease forwards;
  }

  // 通用阴影
  .box__shadow {
    box-shadow: 0px 0px 6px 4px rgba(17, 17, 26, 0.1);
  }

  width: 100%;
  height: 100%;

  // 背景图
  .backPhoto {
    width: 100vw;
    height: 50%;
    background-size: cover;
    z-index: -2;
    background-position:center;
    position: fixed;
    animation: zoomInDown 0.6s ease-out forwards;
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

  //
  .text {
    height: 19rem;
    position: relative;

    .text-effect {
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: 5;
      color: #ffffff;
      font-family: "gtpy";
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 0.2rem;
      text-transform: uppercase;
      text-align: center;
      transform: translate(-50%, -100%);
    }

    .text-effect span {
      animation: animate linear 4000ms infinite;
    }

    .text-effect span:nth-child(1n) {
      animation-delay: 100ms;
    }

    .text-effect span:nth-child(2n) {
      animation-delay: 300ms;
    }

    .text-effect span:nth-child(3n) {
      animation-delay: 500ms;
    }

    .text-effect span:nth-child(4n) {
      animation-delay: 700ms;
    }

    .text-effect span:nth-child(5n) {
      animation-delay: 900ms;
    }

    .text-effect span:nth-child(6n) {
      animation-delay: 1100ms;
    }

    .text-effect span:nth-child(7n) {
      animation-delay: 1300ms;
    }

    @keyframes animate {
      0% {
        opacity: 0.3;
      }

      100% {
        opacity: 1;
        text-shadow: 0 0 80px Red, 0 0 30px orange, 0 0 6px DarkRed;
      }
    }

    @media only screen and (max-width: 990px) {
      .text-effect {
        font-size: 65px;
      }
    }

    @media only screen and (max-width: 767px) {
      .text-effect {
        font-size: 50px;
      }
    }

    @media only screen and (max-width: 479px) {
      .text-effect {
        font-size: 36px;
      }
    }

    @media only screen and (max-width: 359px) {
      .text-effect {
        font-size: 27px;
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
        //bottom: -1px;

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
        font-family: "gtpy";
        width: $contentWidth;
        margin-left: auto;
        margin-right: auto;
        @include flexCenter(row, space-between);
        align-items: flex-start;

        .left {
          width: 25%;

          .personCard {
            background-image: linear-gradient(
              135deg,
              #a9e0ec 15%,
              #c0bdf0 100%
            );
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
              font-family: "lmst";
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
                font-family: "gtpy";
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

            // height: 6rem;
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
                  border-radius: $count * $contentWidth / $contentWidth * 10px;
                  animation-name: move_wave;
                  animation-duration: $count * $contentWidth / $contentWidth *
                    20s;
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
                background-image: linear-gradient(
                  100deg,
                  #348cff 15%,
                  #17c3ff 100%
                );
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
                  background-image: linear-gradient(
                    100deg,
                    #18e7af 15%,
                    #1eebe9 100%
                  );
                }

                &:nth-child(3) {
                  background-image: linear-gradient(
                    100deg,
                    #ff6954 15%,
                    #ffbc38 100%
                  );
                }

                &:nth-child(4) {
                  background-image: linear-gradient(
                    100deg,
                    #ff2cda 15%,
                    #ff7816 100%
                  );
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
              @include flexCenter(row, flex-start);
              flex-wrap: wrap;
              gap: 1.2rem;
              padding: 1.5rem 0;

              .specific__content {
                width: 15rem;
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
