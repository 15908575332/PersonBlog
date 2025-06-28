<template>
  <!-- 求婚动画 -->
  <div class="wedding_animation">
    <div class="w-t">
      <div class="w-t-m">此处可替换成其它文字</div>
      <img :src="utils.getAssetsFile('img/family/boom.png')" class="boom1" />
      <img :src="utils.getAssetsFile('img/family/boom.png')" class="boom2" />
      <img :src="utils.getAssetsFile('img/family/boom.png')" class="boom3" />
    </div>
    <div class="w-p">
      <div class="w-m">
        <img :src="utils.getAssetsFile('img/family/man.png')" alt="" />
      </div>
      <div class="w-w">
        <img :src="utils.getAssetsFile('img/family/woman.png')" alt="" />
      </div>
      <div class="w-f">
        <img :src="utils.getAssetsFile('img/family/flower.png')" alt="" />
      </div>
    </div>
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
</template>
<script setup>
import utils from "@/utils/getAssetsFile";
</script>
<style lang="scss" scoped>
//求婚动画
.wedding_animation {
  width: 100vw;
  height: 100vh;
  @include flexCenter(column, center);
  position: relative;
  // background-color: black;
  /* 烟花 和 文字*/
  .w-t {
    margin: 100px auto;
    width: 500px;
    // background-color: rebeccapurple;
    .w-t-m {
      font-family: "lmst";
      position: absolute;
      left: 50%;
      z-index: 10;
      line-height: 80px;
      color: #ff720a;
      letter-spacing: 5px;
      opacity: 0;
      animation: titleBloom 1s linear 1s both;
      font-size: 30px;
      margin-left: -125px;
      font-weight: 700;
      @keyframes titleBloom {
        0% {
          transform: translate(-50px);
        }
        100% {
          opacity: 1;
          transform: translate(0);
        }
      }
    }
    img {
      opacity: 0;
      animation: bloom 2s ease 1.2s infinite;
    }
    img.boom2 {
      float: right;
      animation: bloom 2s ease 1.5s infinite;
    }
    img.boom3 {
      position: absolute;
      margin-top: 40px;
      animation: bloom 2s ease 1.4s infinite;
    }
    @keyframes bloom {
      0% {
        transform: scale(0, 0);
      }
      100% {
        opacity: 1;
        transform: scale(1, 1);
      }
    }
  }
  /*人物类 */
  .w-p {
    // margin: 50px auto;
    width: 1000px;
    overflow: hidden;
  }
  .w-m {
    float: left;
    width: 50%;
  }
  .w-m img {
    margin-right: 0;
    float: right;
    margin-top: 60px;
    animation: toWoman 0.5s ease 0.5s both;
  }
  @keyframes toWoman {
    0% {
      opacity: 0;
      transform: translate(-200px);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
  }
  .w-w {
    float: right;
    width: 50%;
  }
  .w-w img {
    margin-left: 0;
    float: left;
    animation: showW 0.8s ease 0s both;
  }
  @keyframes showW {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .w-f {
    position: absolute;
    z-index: 20;
    left: 50%;
    margin-left: -30px;
    margin-top: 75px;
  }
  .w-f img {
    width: 60px;
    animation: show 0.4s ease 1s both;
  }

  @keyframes show {
    0% {
      opacity: 0;
      transform: scale(0.1, 0.1);
    }
    100% {
      opacity: 1;
      transform: scale(1, 1);
    }
  }
  .w-p:after {
    clear: both;
    clear: both;
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
    overflow: hidden;
  }
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
</style>
