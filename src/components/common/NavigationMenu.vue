<template>
  <div style="width: 100%" v-if="userStore">
    <div class="navigate" :class="{ hoverStyle: isHover }">
      <div class="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <div class="phone_menu">
        <div class="min200">
          <ul class="nav-btn" ref="navBtn">
            <li class="nav-item">
              <a href="/home">
                <img src="@/components/common/icon/NavigationMenu//home-icon.svg" alt="home" />
                <span>首页</span>
              </a>
              <!-- 底部横线 -->
              <div class="br"></div>
            </li>
            <li class="nav-item">
              <a href="/family">
                <img src="@/components/common/icon/NavigationMenu//family-icon.svg" alt="family" />
                <span>家</span>
              </a>
              <div class="br"></div>
            </li>
            <li class="nav-item record">
              <a href="#">
                <img src="@/components/common/icon/NavigationMenu//record-icon.svg" alt="record" />
                <span>记录</span>
              </a>
              <div id="compt" @mouseenter="dropEnter" @mouseleave="dropLeave">
                <DropdoenMenu :options="record_options"></DropdoenMenu>
              </div>
              <div class="br"></div>
            </li>
            <li class="nav-item">
              <a href="/albumCollection">
                <img src="@/components/common/icon/NavigationMenu//album-icon.svg" alt="album" />
                <span>相册集</span>
              </a>
              <div class="br"></div>
            </li>
            <li class="nav-item record">
              <a href="#">
                <img src="@/components/common/icon/NavigationMenu//treasureBox-icon.svg" alt="treasureBox"
                  style="width: 0.9rem" />
                <span>百宝箱</span>
              </a>
              <div id="compt" @mouseenter="dropEnter" @mouseleave="dropLeave">
                <DropdoenMenu :options="treasureBox_options"></DropdoenMenu>
              </div>
              <div class="br"></div>
            </li>
            <li class="nav-item record">
              <a href="/InformalEssay">
                <img src="@/components/common/icon/NavigationMenu/informalEssay-icon.svg" alt="informalEssay" />
                <span>随笔</span>
              </a>
              <div id="compt" @mouseenter="dropEnter" @mouseleave="dropLeave">
                <DropdoenMenu :options="essay_options"></DropdoenMenu>
              </div>
              <div class="br"></div>
            </li>
            <li class="nav-item">
              <a href="/message">
                <img src="@/components/common/icon/NavigationMenu/message-icon.svg" alt="message" />
                <span>留言</span>
              </a>
              <div class="br"></div>
            </li>
            <!-- 已登录 -->
            <li v-if="userStore.isAuthenticated && userStore.user" class="loginSuccess">
              <!-- 头像 -->
              <div class="profilePicture" @click="showModalFun" @mouseleave="dropLeave">
                <img class="avatar-icon" :src="userStore.user.avatarUrl" alt="头像" />
              </div>
              <!-- 个人中心导航 -->
              <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
                <div class="modal-content" @click.stop>
                  <!-- <button class="close-btn" @click="closeModal">
                    <img src="./icon/close.svg" alt="close" />
                  </button> -->
                  <div class="info">
                    <span>{{ userStore.user.username }}</span>
                    <img class="level" :src="utils.getAssetsFile('icon/level/lv' + userStore.user.vipLevel + '.svg')"
                      alt="level">
                  </div>

                  <ul class="info-list">
                    <li class="item" @click="changeRouter('/personalCenter')">
                      <div class="item__left">
                        <img src="@/components/common/icon/NavigationMenu/personCenter.png" alt="peisonal" />
                        <span>个人中心</span>
                      </div>
                      <img class="rightArrowIcon" src="@/components/common/icon/NavigationMenu/rightArrow.svg" alt="" />
                    </li>
                    <li class="item" @click="changeRouter('/contactUs')">
                      <div class="item__left">
                        <img src="@/components/common/icon/NavigationMenu/contactUs.png" alt="contactUs" />
                        <span>联系我们</span>
                      </div>
                      <img class="rightArrowIcon" src="@/components/common/icon/NavigationMenu/rightArrow.svg" alt="" />
                    </li>
                    <li class="item" @click="quitLogin">
                      <img src="@/components/common/icon/NavigationMenu/quite.svg" alt="" />
                      <span>退出登录</span>
                    </li>
                  </ul>
                  <!-- <img class="decoration" src="./img/SantaDeers.gif" alt="logo" /> -->
                </div>
              </div>
            </li>
            <!-- 未登录 -->
            <li v-else class="nav-item login">
              <a href="/userInfo">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M11 14.0619V20H13V14.0619C16.9463 14.554 20 17.9204 20 22H4C4 17.9204 7.05369 14.554 11 14.0619ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z">
                  </path>
                </svg>
                <!-- <img src="@/assets/icon/phone/PhongLogin-icon.svg" alt="login" />
                <span>登录</span> -->
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import DropdoenMenu from "@/components/common/DropdownMenu.vue";
import { ref, onMounted } from "vue";
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
const isVisible = ref(false);
const isHover = ref(false);
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
    value: "option3",
    text: "资源合集",
    router: "recordList/resource",
    engTitle: "resource",
  },
  {
    value: "option4",
    text: "其它",
    router: "recordList/other",
    engTitle: "other",
  }
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
    iconUrl: utils.getAssetsFile("icon/treasureBox/favorites_navigate_icon.svg"),
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
onMounted(async () => { });
</script>
<style scoped lang="scss">
// PC端样式
.navigate {
  width: 100%;
  padding: 0 1rem;
  font-family: var(--app-font-family);
  z-index: 1;
  // background-color: var(--bg-color);
  transition: all 0.3s linear;
  @include flexCenter(row, space-between);

  ul>li {
    a {
      span {
        font-size: 1rem;
        @include text-color('text-color');
        text-shadow: themed('text-shadow');
      }
    }
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

  .mobile {
    display: none;
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
      color: $general-black;

      //头像
      .profilePicture {
        width: 1.9rem;
        height: 1.9rem;
        overflow: hidden;
        border-radius: 50%;
        transition: transform 0.2s, box-shadow 0.3s;

        &:hover {
          box-shadow: 0 0 0 2px #ffa89f;
        }

        .avatar-icon {
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
          position: absolute;
          top: 3rem;
          right: 1rem;
          cursor: auto;
          user-select: none;
          border-radius: 0.5rem;
          background: $general-white;
          box-shadow: 1px 1px 3px #b9b7b7;
          animation: fadeOutBottomRight 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
          background-image: url('./img/view.jpg');
          background-position: center center;
          background-size: cover;

          .info {
            padding: 0.2rem 0;
            @include flexCenter(row, center);
            font-family: var(--app-font-family);
            border-bottom: 2px solid #ee9999;

            span {
              font-size: 0.9rem;
              font-weight: 700;
              padding-right: 0.5rem;
              font-family: inherit;
            }

            .level {
              width: 1rem;
            }
          }

          .info-list {
            width: 100%;
            padding: 0.2rem;
            @include flexCenter(column, space-around);

            .item {
              padding: 0.4rem 0.5rem;
              width: 100%;
              font-size: 0.8rem;
              color: #303132;
              transition: all 0.3s;
              // border-radius: 5px;
              margin: 0.2rem 0;
              @include flexCenter(row, space-between);
              transition: all 0.2s;

              .item__left {
                @include flexCenter(row, flex-start);
                color: #000;
              }

              span {
                display: block;
                height: 100%;
              }

              // 右箭头
              .rightArrowIcon {
                height: 0.5rem;
              }

              //图标
              img {
                width: 0.9rem;
                margin-right: 0.3rem;
              }

              &:hover {
                background-color: pink;
                cursor: pointer;
              }

              &:last-child {
                border-top: 1px solid #e8e8e8;
                @include flexCenter(row, flex-start);
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
      width: 1.9rem;
      height: 1.9rem;
      border-radius: 50%;
      margin: 0.5rem;
      background: linear-gradient(135deg, #ff9ecf, #9a7cff);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(154, 124, 255, 0.3);
      @include flexCenter(center, center);
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
