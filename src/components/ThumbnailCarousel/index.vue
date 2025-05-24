<template>
  <div id="layout">
    <div class="carousel-container">
      <!-- 轮播主体区域（视频） -->
      <video class="carousel-video" ref="videoPlayer" loop autoplay>
        <source :src="currentVideo" type="video/mp4" />
        您的浏览器不支持 HTML5 视频。
      </video>

      <!-- 缩略图区域 -->
      <div class="thumbnail-container">
        <div
          v-for="(thumbnail, index) in thumbnails"
          :key="index"
          class="thumbnail"
          :class="{ selected: index === selectedIndex }"
        >
          <img :src="thumbnail" alt="Thumbnail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import utils from "@/utils/getAssetsFile";

const thumbnails = ref([
  utils.getAssetsFile("img/recordList/videoButton-back8.png"),
  utils.getAssetsFile("img/recordList/videoButton-back9.png"),
  utils.getAssetsFile("img/recordList/videoButton-back10.png"),
  utils.getAssetsFile("img/recordList/videoButton-back11.png"),
]);

const videos = ref([
  utils.getVideoFile("videos/video-back8.mp4"),
  utils.getVideoFile("videos/video-back9.mp4"),
  utils.getVideoFile("videos/video-back10.mp4"),
  utils.getVideoFile("videos/video-back11.mp4"),
  // ... 更多视频链接
]);
const currentVideo = ref(videos.value[0]);
const videoPlayer = ref(null);
const selectedIndex = ref(0);
let autoPlayInterval;
const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    let nextIndex = (selectedIndex.value + 1) % videos.value.length;
    selectThumbnail(nextIndex);
  }, 5000); // 每5秒切换一次
};
// 自动播放
const selectThumbnail = (index) => {
  selectedIndex.value = index;
  currentVideo.value = videos.value[index];
  if (videoPlayer.value.paused || videoPlayer.value.ended) {
    videoPlayer.value.load();
  } else {
    videoPlayer.value.pause();
    videoPlayer.value.currentTime = 0; // 重置到视频开头
    videoPlayer.value.load();
    videoPlayer.value.play();
  }
  // stopAutoPlay();
  // 添加动画类
  videoPlayer.value.classList.add("videoAnimate");
  // 移除动画类，延迟一段时间以确保动画完成
  setTimeout(() => {
    videoPlayer.value.classList.remove("videoAnimate");
  }, 1200); // 假设动画持续时间为1秒
};
// 预加载视频
const preloadVideos = () => {
  videos.value.forEach((video) => {
    const videoElement = document.createElement("video");
    videoElement.src = video;
    videoElement.preload = "auto";
  });
};
// 组件挂载时开始自动播放
onMounted(() => {
  preloadVideos();
  startAutoPlay();
});

// 组件卸载时停止自动播放
onUnmounted(() => {
  clearInterval(autoPlayInterval);
  // clearTimeout(autoStopInterval);
  // stopAutoPlay();
});
</script>
<style scoped>
#layout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-container {
  position: relative;
  width: 45.3rem;
  height: 25.6rem;
  overflow: hidden;
  border-radius: 15px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #fff, #fff),
    linear-gradient(to right, #cef5eb, #286aee);
  border: 3px solid transparent;
}

.carousel-container video {
  width: 100%;
  height: 100%;
}

.carousel-video {
  margin-bottom: 20px;
}

.videoAnimate {
  animation: clipDiamondIn 1s both;
}

.animate {
  transform: scale(0.9);
}

.thumbnail-container {
  display: flex;
  overflow-x: auto;
  /* 允许横向滚动（如果需要的话） */
  scrollbar-width: none;
  /* 隐藏滚动条（可选） */
  -ms-overflow-style: none;
  /* 隐藏滚动条（IE/Edge） */
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}

.thumbnail {
  width: 99px;
  height: 56px;
  margin-right: 10px;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  opacity: 0.7;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.thumbnail img {
  /* border-radius: 8px; */
  width: 100%;
  height: 100%;
  /* height: auto; */
  display: block;
  overflow: hidden;
}

/* 缩略图选中时 */
.selected {
  border-color: white;
  opacity: 1;
}

/* 隐藏滚动条的样式（可选） */
.thumbnail-container::-webkit-scrollbar {
  display: none;
}
</style>
