<template>
  <div style="width: 100%" v-if="userStore">
    <div class="navigate" :class="{ hoverStyle: isHover }" :style="colorStyles">
      <div class="logo">
        <img src="/logo.png" alt="logo" />
        <!-- <span>BLOG</span> -->
      </div>
      <!-- 导航控制 -->
      <div @click="toggleSidebar" class="button phone-none">
        <img src="@/assets/icon/phone/phone-navigateMenu.svg" alt="navi" />
      </div>
      <div class="phone__menu" :class="{ visible: isSidebarVisible }" @click="isInOutSide">
        <div class="min200">
          <ul class="nav-btn" ref="navBtn" :class="{ visible: isSidebarVisible }">
            <h1 class="phone__navigate-title phone-none">手机端导航</h1>
            <li class="nav-item">
              <a href="/home">
                <img src="@/components/NavigationMenu/icon/home-icon.svg" alt="home" />
                <span>首页</span>
              </a>
              <!-- 底部横线 -->
              <div class="br"></div>
            </li>
            <li class="nav-item">
              <a href="/family">
                <img src="@/components/NavigationMenu/icon/family-icon.svg" alt="family" />
                <span>家</span>
              </a>

              <div class="br"></div>
            </li>
            <li class="nav-item record">
              <a href="#">
                <img src="@/components/NavigationMenu/icon/record-icon.svg" alt="record" />
                <span>记录</span>
              </a>
              <div id="compt" @mouseenter="dropEnter" @mouseleave="dropLeave">
                <DropdoenMenu :options="record_options"></DropdoenMenu>
                <!-- 移动端使用下面组件 -->
                <TreeMenu></TreeMenu>
              </div>
              <div class="br"></div>
            </li>
            <li class="nav-item">
              <a href="/albumCollection">
                <img src="@/components/NavigationMenu/icon/album-icon.svg" alt="album" />
                <span>相册集</span>
              </a>
              <div class="br"></div>
            </li>
            <li class="nav-item record">
              <a href="#">
                <img src="@/components/NavigationMenu/icon/treasureBox-icon.svg" alt="treasureBox"
                  style="width: 0.9rem" />
                <span>百宝箱</span>
              </a>
              <div id="compt" @mouseenter="dropEnter" @mouseleave="dropLeave">
                <DropdoenMenu :options="treasureBox_options"></DropdoenMenu>
                <!-- 移动端使用下面组件 -->
                <TreeMenu></TreeMenu>
              </div>
              <div class="br"></div>
            </li>
            <li class="nav-item record">
              <a href="/InformalEssay">
                <img src="@/components/NavigationMenu/icon/informalEssay-icon.svg" alt="informalEssay" />
                <span>随笔</span>
              </a>
              <div id="compt" @mouseenter="dropEnter" @mouseleave="dropLeave">
                <DropdoenMenu :options="essay_options"></DropdoenMenu>
              </div>
              <div class="br"></div>
            </li>
            <li class="nav-item">
              <a href="/message">
                <img src="@/components/NavigationMenu/icon/message-icon.svg" alt="message" />
                <span>留言</span>
              </a>
              <div class="br"></div>
            </li>
            <!-- 已登录 -->
            <li v-if="userStore.isAuthenticated && userStore.user" class="loginSuccess">
              <div class="profilePicture" @click="showModalFun" @mouseleave="dropLeave">
                <img :src="userStore.user.avatarUrl" alt="头像" />
              </div>
              <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
                <div class="modal-content" @click.stop>
                  <button @click="closeModal">
                    <img src="./icon/close.svg" alt="close" />
                  </button>
                  <div class="info">
                    <span>{{ userStore.user.username }}</span>
                    <img :src="utils.getAssetsFile('icon/level/lv5.svg')" alt="level" />
                  </div>
                  <ul>
                    <li class="item" @click="changeRouter('/personalCenter')">
                      <div class="item__left">
                        <img src="./icon/personCenter.svg" alt="" />
                        <span>个人中心</span>
                      </div>
                      <img src="./icon/rightArrow.svg" alt="" />
                    </li>
                    <li class="item" @click="changeRouter('/memberCenter')">
                      <div class="item__left">
                        <img src="./icon/member.svg" alt="" />
                        <span>会员中心</span>
                      </div>
                      <img src="./icon/rightArrow.svg" alt="" />
                    </li>
                    <li class="item">
                      <div class="item__left">
                        <img src="./icon/like.svg" alt="" />
                        <span>收藏</span>
                      </div>
                      <img src="./icon/rightArrow.svg" alt="" />
                    </li>
                    <li class="item">
                      <div class="item__left">
                        <img src="./icon/collect.svg" alt="" />
                        <span>点赞</span>
                      </div>
                      <img src="./icon/rightArrow.svg" alt="" />
                    </li>
                    <li class="item" @click="quitLogin">
                      <img src="./icon/quite.svg" alt="" />
                      <span>退出登录</span>
                    </li>
                  </ul>
                  <img class="decoration" src="./img/SantaDeers.gif" alt="logo" />
                </div>
              </div>
            </li>
            <!-- 未登录 -->
            <li v-else class="nav-item login">
              <a href="/userInfo">
                <img class="phone-none" src="@/assets/icon/phone/PhongLogin-icon.svg" alt="login" />
                <span>登录</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import DropdoenMenu from "@/components/DropdownMenu/index.vue";
import TreeMenu from "@/components/TreeMenu/index.vue";
import { ref, onMounted, computed } from "vue";
import utils from "@/utils/getAssetsFile";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/store/auth";
const userStore = useAuthStore();

const route = useRouter();
// 路由跳转函数
const changeRouter = (routeUrl) => {
  route.push(routeUrl);
};
const quitLogin = () => {
  // 退出登录函数
  isVisible.value = false; // 关闭模态框
  userStore.logout();
  route.push("/userInfo");
};
// const { fontColor } = defineProps({
//   fontColor: String,
// });

// 新增颜色props并设置默认值
const props = defineProps({
  bgColor: {
    type: String,
    default: 'rgb(25, 29, 15, 0)' // 默认背景色
  },
  hoverBgColor: {
    type: String,
    default: 'rgb(25, 29, 15, 0.6)' // 默认hover背景色
  },
  textColor: {
    type: String,
    default: '#fcfcfc' // 默认文字颜色
  }
})

// 计算动态样式对象
const colorStyles = computed(() => ({
  '--bg-color': props.bgColor,
  '--hover-bg-color': props.hoverBgColor,
  '--text-color': props.textColor
}))
const isVisible = ref(false);
const isHover = ref(false);
const isSidebarVisible = ref();
const record_options = ref([
  {
    value: "option1",
    text: "内容",
    router: "recordList/content",
    engTitle: "content",
  },
  {
    value: "option2",
    text: "专栏",
    router: "recordList/column",
    engTitle: "column",
  },
  {
    value: "option1",
    text: "资源合集",
    router: "recordList/resource",
    engTitle: "resource",
  },
  {
    value: "option2",
    text: "学习人生",
    router: "recordList/learning",
    engTitle: "learning",
  },
  {
    value: "option3",
    text: "寻国记",
    router: "recordList/country",
    engTitle: "country",
  },
]);
//百宝箱二级目录
const treasureBox_options = ref([
  {
    value: "option1",
    text: "音乐",
    router: "treasureBox/music",
    iconUrl: utils.getAssetsFile("icon/treasureBox/music_navigate_icon.svg"),
  },
  {
    value: "option2",
    text: "收藏夹",
    router: "treasureBox/favorites",
    iconUrl: utils.getAssetsFile(
      "icon/treasureBox/favorites_navigate_icon.svg"
    ),
  },
  {
    value: "option3",
    text: "友情链接",
    router: "treasureBox/friendshipLink",
    iconUrl: utils.getAssetsFile("icon/treasureBox/helpLink_navigate_icon.svg"),
  },
]);
// 随笔二级目录
const essay_options = ref([
  {
    value: "option0",
    text: "博客",
    router: "InformalEssay/InfoContenet",
    iconUrl: utils.getAssetsFile("icon/informalEssay/record.svg"),
  },
  {
    value: "option1",
    text: "纪念日",
    router: "InformalEssay/commemorate",
    iconUrl: utils.getAssetsFile("icon/informalEssay/commemorate.svg"),
  },
  {
    value: "option2",
    text: "生活卡片",
    router: "InformalEssay/lifeCard",
    iconUrl: utils.getAssetsFile("icon/informalEssay/lifeCard.svg"),
  },
]);

const showModalFun = () => {
  isVisible.value = true;
};

const closeModal = () => {
  isVisible.value = false;
};

const dropEnter = () => {
  isHover.value = !isHover.value;
};
const dropLeave = () => {
  isHover.value = !isHover.value;
};
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
const navBtn = ref();
const isInOutSide = (event) => {
  if (!navBtn.value.contains(event.target)) {
    isSidebarVisible.value = false;
  }
};
onMounted(async () => { });
</script>
<style scoped lang="scss">
.phone-none {
  display: none;

  @include media-to("phone") {
    display: block;
  }
}

// PC端样式
.navigate {
  width: 100%;
  padding: 0 2rem;
  font-family: "lmst";

  z-index: 1;
  background-color: var(--bg-color);
  transition: all 0.3s linear;
  @include flexCenter(row, space-between);

  ul>li {
    a {
      span {
        font-size: 1rem;
        color: var(--text-color);
      }
    }
  }


  &:hover {
    background-color: var(--hover-bg-color);
    transition: all 0.3s linear;
  }

  // logo
  .logo {
    display: flex;
    align-items: center;

    img {
      height: 2.5rem;
    }

    span {
      font-size: 1.1rem;
    }
  }

  // 导航按钮
  .nav-btn {
    width: 100%;
    height: 100%;
    display: block;
    @include flexCenter(row, space-around);

    // 每一个按钮，每一个li
    .nav-item {
      font-size: 1rem;
      font-weight: 700;
      position: relative;

      &:hover a {
        color: #ffa500;
      }

      &:hover .br {
        animation: grow 0.5s forwards;
      }

      // 横线
      .br {
        height: 0.25rem;
        width: 0;
        background: #ffa500;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
      }

      a {
        padding: 0.94rem 0.6rem;
        display: block;
        transition: color 0.1s;
        @include flexCenter(row, center);

        img {
          width: 1rem;
          height: 1rem;
          margin-right: 0.31rem;
        }
      }
    }

    // 已登录样式
    .loginSuccess {
      margin: 0 0.4rem;
      margin-left: 1.5rem;
      position: relative;
      color: black;

      .profilePicture {
        width: 1.9rem;
        height: 1.9rem;
        overflow: hidden;
        border-radius: 50%;
        transition: transform 0.2s, box-shadow 0.3s;

        &:hover {
          box-shadow: 0 0 0 2px #ffa89f;
        }

        img {
          width: 100%;
        }
      }

      // 个人中心
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        cursor: pointer;
        width: 100vw;
        height: 100vh;

        .modal-content {
          background-color: rgb(255, 255, 255);
          top: 3rem;
          right: 1rem;
          width: 12.5rem;
          height: 18rem;
          cursor: auto;
          position: absolute;
          user-select: none;
          border-radius: 0.5rem;
          min-height: 18rem;
          box-shadow: 1px 1px 3px #b9b7b7;
          animation: fadeOutBottomRight 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;

          button {
            position: absolute;
            top: 0;
            right: 0;

            img {
              width: 1rem;

              &:hover {
                filter: invert(3) sepia(1) saturate(10) hue-rotate(180deg);
                cursor: pointer;
              }
            }
          }

          .info {
            padding-top: 1rem;
            @include flexCenter(row, center);
            font-family: "gtpy";
            border-bottom: 2px solid #ee9999;

            span {
              font-size: 1rem;
              font-weight: 700;
              padding-right: 0.5rem;
            }

            img {
              width: 1.2rem;
            }
          }

          ul {
            width: 100%;
            padding: 0.5rem 1rem;
            @include flexCenter(column, space-around);
            background-color: rgba(255, 255, 255);

            .item {
              padding: 0.5rem;
              width: 100%;
              font-size: 0.9rem;
              // font-weight: 500;
              color: #303132;
              transition: all 0.3s;
              border-radius: 5px;
              margin: 0.2rem 0;
              @include flexCenter(row, space-between);
              transition: all 0.3s;

              .item__left {
                @include flexCenter(row, flex-start);
                color: #000;
              }

              span {
                display: block;
                height: 100%;
              }

              img {
                height: 0.9rem;
                margin-right: 0.3rem;
              }

              &:hover {
                background-color: #ffa500;
                cursor: pointer;
              }

              &:last-child {
                border-top: 1px solid #e8e8e8;
                @include flexCenter(row, flex-start);
                margin-top: 0.5rem;
                padding: 1rem 0.5rem;
              }
            }
          }

          .decoration {
            position: absolute;
            bottom: 1rem;
            right: 50%;
            transform: translateX(50%);
          }
        }

        // 个人中心右上进入动画
        @keyframes fadeOutBottomRight {
          from {
            opacity: 0;
            transform: translate3d(100%, -100%, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      }

      &:hover {
        cursor: pointer;
      }
    }

    // 记录按钮
    .record {
      position: relative;
      transition: all 0.4s;

      #compt {
        position: absolute;
        top: -0.2rem;
        left: -1.5rem;
        opacity: 0;
        display: none;
        transition: all 0.4s;
        z-index: 99;
        animation: opacityIn 0.3s ease-in forwards;
      }

      &:hover {
        #compt {
          display: block;
        }
      }
    }

    // 登录按钮
    .login {
      &:hover {
        a {
          color: #fff;
        }
      }

      a {
        background-color: #ff8cb0;
        border-radius: 50%;
        padding: 0.6rem 0.1rem;
        margin: 0 0.74rem;
      }
    }
  }

  // 手机样式
  @include media-to("phone") {
    padding: 0.5rem 0.8rem;

    .logo,
    .button {
      img {
        width: 1.5rem;
      }

      span {
        font-size: 0.9rem;
      }
    }

    .phone__menu {
      width: 100vw;
      height: 100vh;
      position: absolute;
      left: 0;
      top: 0;
      transform: translateX(-100%);
      overflow: hidden;
      transition: all 0.5s ease-in-out;
      background-color: #00000040;
      z-index: 9;

      .min200 {
        width: 65%;
        min-width: 200px;
        background-image: url("@/assets/img/phone/slider-back.jpg");
        height: 100%;
        background-size: cover;
        background-position: center;

        .nav-btn {
          //ul
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          align-content: flex-start;

          transform: translateX(2rem);

          .phone__navigate-title {
            font-size: 1.3rem;
            margin: 1.5rem 0 3rem;
          }

          .nav-item {
            font-size: 1.2rem;
            font-weight: 400;

            a {
              padding: 0.4rem;
            }

            .br {
              height: 0;
            }
          }

          .login {
            a {
              background: none;
              margin: 0;

              span {
                margin-left: 0.1rem;
              }
            }
          }
        }
      }
    }

    // 显示导航栏
    .visible {
      transform: translateX(0%);
    }
  }
}

// 背景变化
@keyframes bgcFade {
  0% {
    background-color: rgb(25, 29, 15, 0);
  }

  100% {
    background-color: rgb(25, 29, 15, 0.6);
  }
}

// 按钮底部横线
@keyframes grow {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}

// 鼠标悬停子组件上时，导航栏无背景色
.hoverStyle {
  background-color: transparent !important;
}
</style>
