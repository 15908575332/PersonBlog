<template>
  <!-- 导航 -->
  <div id="commemorate">
    <Navigation />
    <!-- 烟花 -->
    <FireWorks />
    <!-- 灯笼 -->
    <div class="denglo">
      <div class="deng-box1">
        <div class="deng">
          <div class="xian"></div>
          <div class="deng-a">
            <div class="deng-b"><div class="deng-t">春</div></div>
          </div>
          <div class="shui shui-a">
            <div class="shui-c"></div>
            <div class="shui-b"></div>
          </div>
        </div>
      </div>
      <div class="deng-box2">
        <div class="deng">
          <div class="xian"></div>
          <div class="deng-a">
            <div class="deng-b"><div class="deng-t">节</div></div>
          </div>
          <div class="shui shui-a">
            <div class="shui-c"></div>
            <div class="shui-b"></div>
          </div>
        </div>
      </div>
      <div class="deng-box3">
        <div class="deng">
          <div class="xian"></div>
          <div class="deng-a">
            <div class="deng-b"><div class="deng-t">乐</div></div>
          </div>
          <div class="shui shui-a">
            <div class="shui-c"></div>
            <div class="shui-b"></div>
          </div>
        </div>
      </div>
      <div class="deng-box4">
        <div class="deng">
          <div class="xian"></div>
          <div class="deng-a">
            <div class="deng-b"><div class="deng-t">快</div></div>
          </div>
          <div class="shui shui-a">
            <div class="shui-c"></div>
            <div class="shui-b"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 求婚动画 -->
    <div class="wedding_animation">
      <div class="w-fls">
        <img :src="utils.getAssetsFile('img/family/flowers1.png')" alt="" />
        <img :src="utils.getAssetsFile('img/family/flowers2.png')" alt="" />
        <img :src="utils.getAssetsFile('img/family/flowers1.png')" alt="" />
        <img :src="utils.getAssetsFile('img/family/flowers2.png')" alt="" />
        <img :src="utils.getAssetsFile('img/family/flowers1.png')" alt="" />
        <img :src="utils.getAssetsFile('img/family/flowers2.png')" alt="" />
      </div>
      <div class="w-fls w-2">
        <img :src="utils.getAssetsFile('img/family/flowers1.png')" alt="" />
        <img :src="utils.getAssetsFile('img/family/flowers2.png')" alt="" />
        <img :src="utils.getAssetsFile('img/family/flowers1.png')" alt="" />
        <img :src="utils.getAssetsFile('img/family/flowers2.png')" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import utils from "@/utils/getAssetsFile";
import Navigation from "@/components/NavigationMenu/index.vue";
import FireWorks from "@/components/FireWorks/index.vue";
</script>
<style lang="scss" scoped>
.wedding_animation {
  @include flexCenter(column, center);
  overflow: hidden;
  /*flowers*/
  .w-fls {
    width: 820px;
    margin: 0 auto;
    position: absolute;
    bottom: 0%;
  }
  .w-fls img {
    height: 120px;
    z-index: 400;
    animation: showFlows 0.4s ease 2.3s both;
  }
  @keyframes showFlows {
    0% {
      opacity: 0;
      transform: translate(0, 200px);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
  }
  .w-2 {
    margin-top: -130px;
    padding-left: 100px;
  }
  .w-2 img {
    animation: showFlows 0.4s ease 2.7s both;
  }
}
//灯笼
.denglo {
  position: releative;
  background-color: rebeccapurple;
  // @include flexCenter(row, center);
  .deng-box1,
  .deng-box2,
  .deng-box3,
  .deng-box4 {
    position: absolute;
    top: 30px;
    pointer-events: none;

    .deng {
      position: relative;
      width: 120px;
      height: 90px;
      margin: 50px;
      background: #d8000f;
      background: rgba(216, 0, 15, 0.8);
      border-radius: 50% 50%;
      -webkit-transform-origin: 50% -100px;
      .deng-a {
        width: 100px;
        height: 90px;
        background: #d8000f;
        background: rgba(216, 0, 15, 0.1);
        margin: 12px 8px 8px 10px;
        border-radius: 50% 50%;
        border: 2px solid #dc8f03;
        .deng-b {
          width: 45px;
          height: 90px;
          background: inherit;
          background: inherit;
          margin: -2px 8px 8px 26px;
          border-radius: inherit;
          border: inherit;
          .deng-t {
            font-family: 华文行楷, Arial, Lucida Grande, Tahoma, sans-serif;
            font-size: 2rem;
            color: #dc8f03;
            font-weight: bold;
            line-height: 85px;
            text-align: center;
          }
        }
      }

      .xian {
        position: absolute;
        top: -5rem;
        left: 60px;
        width: 2px;
        height: 5rem;
        background: #dc8f03;
      }

      .shui-a {
        position: relative;
        width: 5px;
        height: 20px;
        margin: -5px 0 0 59px;
        -webkit-animation: swing 4s infinite ease-in-out;
        -webkit-transform-origin: 50% -45px;
        background: #ffa500;
        border-radius: 0 0 5px 5px;

        .shui-b {
          position: absolute;
          top: 14px;
          left: -2px;
          width: 10px;
          height: 10px;
          background: #dc8f03;
          border-radius: 50%;
        }

        .shui-c {
          position: absolute;
          top: 18px;
          left: -2px;
          width: 10px;
          height: 35px;
          background: #ffa500;
          border-radius: 0 0 0 5px;
        }
      }
      &:before {
        position: absolute;
        top: -7px;
        left: 29px;
        height: 12px;
        width: 60px;
        content: " ";
        display: block;
        z-index: 999;
        border-radius: 5px 5px 0 0;
        border: solid 1px #dc8f03;
        background: #ffa500;
        background: linear-gradient(
          to right,
          #dc8f03,
          #ffa500,
          #dc8f03,
          #ffa500,
          #dc8f03
        );
      }

      &:after {
        position: absolute;
        bottom: -7px;
        left: 10px;
        height: 12px;
        width: 60px;
        content: " ";
        display: block;
        margin-left: 20px;
        border-radius: 0 0 5px 5px;
        border: solid 1px #dc8f03;
        background: #ffa500;
        background: linear-gradient(
          to right,
          #dc8f03,
          #ffa500,
          #dc8f03,
          #ffa500,
          #dc8f03
        );
      }
    }
  }
  .deng-box1 {
    // top: -30px;
    left: 100px;
    .deng {
      -webkit-animation: swing 3s infinite ease-in-out;
      box-shadow: -5px 5px 50px 4px rgba(250, 108, 0, 1);
    }
  }
  .deng-box2 {
    // top: -25px;
    left: 150px;
    .deng {
      -webkit-animation: swing 4s infinite ease-in-out;
      box-shadow: -5px 5px 30px 4px rgba(252, 144, 61, 1);
    }
  }

  .deng-box3 {
    // top: -28px;
    right: 100px;
    .deng {
      -webkit-animation: swing 5s infinite ease-in-out;
      box-shadow: -5px 5px 50px 4px rgba(250, 108, 0, 1);
    }
  }

  .deng-box4 {
    // top: -26px;
    right: 150px;
    .deng {
      -webkit-animation: swing 4s infinite ease-in-out;
      box-shadow: -5px 5px 30px 4px rgba(252, 144, 61, 1);
    }
  }

  @-moz-keyframes swing {
    0% {
      -moz-transform: rotate(-10deg);
    }

    50% {
      -moz-transform: rotate(10deg);
    }

    100% {
      -moz-transform: rotate(-10deg);
    }
  }

  @-webkit-keyframes swing {
    0% {
      -webkit-transform: rotate(-10deg);
    }

    50% {
      -webkit-transform: rotate(10deg);
    }

    100% {
      -webkit-transform: rotate(-10deg);
    }
  }
}
</style>
