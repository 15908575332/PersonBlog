<template>
  <div>
    <!-- 主体 -->
    <div class="player-container" ref="playerContainer">
      <div class="left-nav">
        <div class="online">
          <h5 class="classification">在线音乐</h5>
          <ul class="nav-list">
            <li :class="{ 'nav-active': $route.name === 'musicRecommend' }">
              <router-link to="/treasureBox/music/recommend">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                <span>推荐</span>
              </router-link>
            </li>
            <li :class="{ 'nav-active': $route.name === 'musicTreasure' }">
              <router-link to="/treasureBox/music/treasure">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                </svg>
                <span>音乐馆</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="ismine">
          <h5 class="classification">我的音乐</h5>
          <ul class="nav-list">
            <li :class="{ 'nav-active': $route.name === 'musicFavorite' }">
              <router-link to="/treasureBox/music/favorite">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <span> 我喜欢</span>
              </router-link>
            </li>
            <li :class="{ 'nav-active': $route.name === 'fff' }">
              <router-link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                </svg>
                我的收藏</router-link>
            </li>
            <li :class="{ 'nav-active': $route.name === 'fff' }">
              <router-link>最近播放</router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="right-content" ref="rightContent" @scroll="debouncedHandleScroll">
        <!-- 搜索栏 -->
        <div class="search-bar" :class="isSearchBarVisible ? 'visible' : 'hidden'" @focus="isSearchBarVisible = true">
          <input type="text" v-model.lazy="searchValue" placeholder="搜索音乐、MV、歌单">
        </div>
        <!-- 内容视图 -->
        <router-view :current-song-index="currentSongIndex" :is-playing="isPlaying" @play-song="handlePlaySong">
        </router-view>
        <!-- 播放器 -->
        <div class="audio-player">
          <div class="player-content">
            <!-- 歌曲图片 -->
            <div class="music-pic" @click="openMore">
              <img v-if="currentSong.picture" :src="currentSong.picture" alt="music-pic" />
              <img v-else src="@/assets/img/treasureBox/default.jpg" alt="default">
              <div class="arrows">
                <!-- <div></div> -->
                <div></div>
                <div></div>
              </div>
            </div>
            <!-- 控制面板 -->
            <div class="play-control">
              <div class="progress-container">
                <span>{{ formatTime(currentTime) }}</span>
                <div class="progress-bar" @click="seek">
                  <div class="progress" :style="{ width: progress + '%' }"></div>
                </div>
                <span>{{ formatTime(duration) }}</span>
              </div>
              <div class="text-info-change">
                <!-- 歌名、作者 -->
                <div class="title-auther">
                  <p v-if="currentSong.name">{{ currentSong.name }}-{{ currentSong.artist }}</p>
                  <p v-else>暂无正在播放的音乐</p>
                </div>
                <!-- 频谱组件 -->
                <Spectrum :audio-element="audioElement" :is-playing="isPlaying"></Spectrum>

                <!-- 声音和切换控制，随机/循环 -->
                <div class="voice-play">
                  <!-- 控制按钮 -->
                  <div class="controls">
                    <div @click="prevSong">
                      <img src="@/assets/icon/treasureBox/rewind.png" alt="" />
                    </div>
                    <div @click="togglePlay">
                      <img :src="isPlaying ? pauseImg : playImg" alt="isplay" />
                    </div>
                    <div @click="nextSong">
                      <img src="" alt="" />
                      <img src="@/assets/icon/treasureBox/fastforward.png" alt="" />
                    </div>
                  </div>
                  <!-- 随机/循环 -->
                  <div class="order-change" @click="togglePlayMode">
                    <img :src="playMode === 'order' ? cycleImg : randomImg" alt="playMode" />
                  </div>
                  <!-- 音量控制 -->
                  <div class="volume-control">
                    <img :src="!muted && Math.round(volume) > 0 ? volumeImg : mutedImg" alt="ismute"
                      @click="toggleMute" />
                    <div class="custom-volume" ref="volumeContainer" @click="setVolume">
                      <div class="volume-bar">
                        <div class="current-volume" :style="{ width: muted ? '0%' : volume + '%' }"></div>
                        <div class="volume-handle" :style="{ left: muted ? '0%' : volume + '%' }"
                          @mousedown="startDrag">
                        </div>
                      </div>
                    </div>
                    <span class="volume-number">{{ muted ? 0 : Math.round(volume) }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 歌词 -->
    <ModalBox :isVisible="isShowModal" @close="handChangeModal" animationType="slideUpFromBottom">
      <div class="player-controls">
        <div class="song-info">
          <!-- 专辑图片 -->
          <transition name="album" mode="out-in">
            <div class="album-pic" :key="currentSong.picture" :class="{ playing: isPlaying, paused: !isPlaying }">
              <img v-if="currentSong.picture" :src="currentSong.picture" alt="music-pic" />
              <img v-else src="@/assets/img/treasureBox/default.jpg" alt="default">
            </div>
          </transition>
        </div>

        <!-- 歌词 -->
        <div class="lyrics-container">
          <div class="lyrics-wrapper" ref="lyricsWrapper">
            <div v-for="(line, index) in currentLyrics" :key="index" ref="lyricLine" class="lyric-line"
              :class="{ active: currentLyricIndex === index }">
              {{ line.text }}
            </div>
            <div v-if="!currentLyrics.length" class="no-lyrics">暂无歌词</div>
          </div>
        </div>
        <!-- 控制按钮 -->
        <div class="controls">
          <div @click="prevSong">
            <img src="@/assets/icon/treasureBox/rewind.png" alt="" />
          </div>
          <div @click="togglePlay">
            <img :src="isPlaying ? pauseImg : playImg" alt="isplay" />
          </div>
          <div @click="nextSong">
            <img src="" alt="" />
            <img src="@/assets/icon/treasureBox/fastforward.png" alt="" />
          </div>
        </div>
      </div>
    </ModalBox>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch, onUnmounted } from "vue";
import Spectrum from "@/components/Music/Spectrum.vue";
import ModalBox from '@/components/common/ModalBox.vue';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

/** ------------------------ 搜索栏 ------------------------ */
const searchValue = ref();
const rightContent = ref(); //主内容容器
//搜索栏滚动隐藏
const isSearchBarVisible = ref(true); // 搜索栏显示状态
const lastScrollTop = ref(0); // 上次滚动位置

// 滚动监听函数
const handleScroll = () => {
  if (!rightContent.value) return;
  const currentScrollTop = rightContent.value.scrollTop;
  // 向下滚动且超过50px时隐藏搜索栏
  if (currentScrollTop > lastScrollTop.value && currentScrollTop > 50) {
    isSearchBarVisible.value = false;
  }
  // 向上滚动或回到顶部时显示搜索栏
  else if (currentScrollTop < lastScrollTop.value || currentScrollTop <= 50) {
    isSearchBarVisible.value = true;
  }
  lastScrollTop.value = currentScrollTop <= 0 ? 0 : currentScrollTop;
};

// 防抖函数优化性能
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// 防抖后的滚动处理
const debouncedHandleScroll = debounce(handleScroll, 10);
/** ------------------------ 播放器 ------------------------ */
import playImg from "@/assets/icon/treasureBox/play.png";
import pauseImg from "@/assets/icon/treasureBox/pause.png";
import randomImg from "@/assets/icon/treasureBox/random.svg";
import cycleImg from "@/assets/icon/treasureBox/cycle.svg";
import volumeImg from "@/assets/icon/treasureBox/volume.png";
import mutedImg from "@/assets/icon/treasureBox/mute.png";

const currentPlaylist = ref([]); // 当前播放列表
const currentSongIndex = ref(null); // 当前播放歌曲索引
const currentSong = ref(''); // 当前播放歌曲
const muted = ref(false); // 静音
const volumeContainer = ref(null);// 音量调节容器
const audioElement = ref(""); // 播放容器
const isPlaying = ref(false); // 歌曲播放状态
const currentTime = ref(0); //歌曲当前播放时间默认0开始
const duration = ref(0); // 歌曲总时长
const volume = ref(80); // 音量
const playMode = ref("order"); //播放模式，默认按顺序
const shuffleList = ref([]); //随机播放列表

const handlePlaySong = (payload) => { // 接收子组件传递的播放参数
  currentPlaylist.value = payload.playlist;
  currentSong.value = payload.song;
  currentSongIndex.value = payload.startIndex;
  playSong(payload.song, payload.startIndex)
}

const togglePlayMode = () => { // 切换播放模式
  playMode.value = playMode.value === "order" ? "random" : "order";
  if (playMode.value === "random") {
    generateShuffleList();
  }
};

const generateShuffleList = () => { // 生成随机播放列表（排除当前歌曲）
  const allIndexes = currentPlaylist.value.map((_, index) => index);
  const current = currentSongIndex.value;
  shuffleList.value = allIndexes
    .filter((i) => i !== current)
    .sort(() => Math.random() - 0.5);
};

const setVolume = (e) => { //音量控制
  if (!volumeContainer.value) return;
  const rect = volumeContainer.value.getBoundingClientRect();
  let newVolume = ((e.clientX - rect.left) / rect.width) * 100;
  newVolume = Math.min(100, Math.max(0, newVolume));
  volume.value = newVolume;
  audioElement.value.volume = newVolume / 100;
  muted.value = false;
};

const toggleMute = () => { //静音状态切换
  muted.value = !muted.value;
  audioElement.value.volume = muted.value ? 0 : volume.value / 100;
};

const progress = computed( //进度条
  () => (currentTime.value / duration.value) * 100 || 0
);


const updateTime = () => { //更新（获取）歌曲时长
  currentTime.value = audioElement.value.currentTime;
  //获取时长
  duration.value = currentSong.value.duration;
};

const seek = (e) => { //调整进度控制歌曲时间
  if (!audioElement.value) return;
  const rect = e.target.getBoundingClientRect();
  const percentage = (e.clientX - rect.left) / rect.width;
  audioElement.value.currentTime = percentage * duration.value;
};

const playSong = (song, index) => { // 播放歌曲
  if (!song || !audioElement.value) {
    console.error('播放参数错误:', { song, audioElement: audioElement.value });
    return;
  }

  // 确保更新当前歌曲索引和歌曲信息
  currentSongIndex.value = index;
  currentSong.value = song;

  try {
    audioElement.value.src = song.url;
    audioElement.value.play().then(() => {
      isPlaying.value = true;
      // 确保界面同步更新
      updateTime();
    }).catch(error => {
      console.error('播放失败:', error);
      isPlaying.value = false;
    });
  } catch (error) {
    console.error('播放异常:', error);
  }
}

const nextSong = () => { // 下一首
  console.log('nextSong 被调用');
  if (currentPlaylist.value.length === 0) {
    console.log('播放列表为空');
    return;
  }

  let nextIndex;
  if (playMode.value === "random") {
    if (shuffleList.value.length === 0) generateShuffleList();
    nextIndex = shuffleList.value.shift();
  } else {
    nextIndex = (currentSongIndex.value + 1) % currentPlaylist.value.length;
  }

  const song = currentPlaylist.value[nextIndex];
  if (song) {
    playSong(song, nextIndex);
  } else {
    console.error('获取下一首歌曲失败，索引:', nextIndex);
  }
};

const prevSong = () => { // 上一首
  if (currentPlaylist.value.length === 0) return;

  let prevIndex;
  if (playMode.value === "random") {
    // 随机模式不支持历史记录，改为顺序上一首
    prevIndex = (currentSongIndex.value - 1 + currentPlaylist.value.length) % currentPlaylist.value.length;
  } else {
    prevIndex = (currentSongIndex.value - 1 + currentPlaylist.value.length) % currentPlaylist.value.length;
  }

  // 使用计算后的新索引获取歌曲
  const song = currentPlaylist.value[prevIndex];
  if (song) {
    playSong(song, prevIndex);
  } else {
    console.error('获取上一首歌曲失败，索引:', prevIndex);
  }
};

const togglePlay = () => { // 播放/暂停
  if (!audioElement.value || !currentSong.value || currentSong.value === '') {
    console.log('无法播放：没有音频元素或当前歌曲');
    return;
  }

  try {
    if (isPlaying.value) {
      // 暂停播放
      audioElement.value.pause();
      isPlaying.value = false;
      console.log('已暂停播放');
    } else {
      // 开始播放
      audioElement.value.play().then(() => {
        isPlaying.value = true;
        console.log('开始播放:', currentSong.value.name);
      }).catch(error => {
        console.error('播放失败:', error);
        isPlaying.value = false;
      });
    }
  } catch (error) {
    console.error('播放异常:', error);
    isPlaying.value = false;
  }
};

/** ------------------------ 歌词 ------------------------ */

const currentLyrics = ref([]); // 当前歌词
const currentLyricIndex = ref(-1); // 当前歌词索引
const lyricsWrapper = ref(null); //容器
const lyricLine = ref(null); // 歌词行
const isShowModal = ref(false); // 歌词框显示

const openMore = () => { //打开
  isShowModal.value = true;
};

const handChangeModal = () => { //关闭
  isShowModal.value = false;
};

const parseLRC = (lrcText) => { // LRC解析器
  const lyrics = [];
  const lines = lrcText.split("\n");
  const timeRegex = /\[(\d+):(\d+)(\.\d+)?\]/g;

  lines.forEach((line) => {
    const text = line.replace(/\[.*?\]/g, "").trim();
    if (!text) return;

    const timeMatches = [...line.matchAll(timeRegex)];
    timeMatches.forEach((match) => {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const milliseconds = match[3] ? parseFloat(match[3]) * 1000 : 0;
      const time = minutes * 60 + seconds + milliseconds / 1000;

      lyrics.push({
        time: Number(time.toFixed(2)),
        text,
      });
    });
  });
  return lyrics.sort((a, b) => a.time - b.time);
};

watch( // 自动加载歌词
  currentSongIndex,
  async () => {
    if (!currentSong.value.lrc) {
      currentLyrics.value = [];
      return;
    }
    try {
      // 使用 fetch 加载歌词文件
      const response = await fetch(currentSong.value.lrc);
      if (!response.ok) {
        throw new Error("歌词文件加载失败");
      }
      const lrcText = await response.text();
      currentLyrics.value = parseLRC(lrcText); // 解析歌词
    } catch (error) {
      console.error("歌词加载失败:", error);
      currentLyrics.value = []; // 加载失败时清空歌词
    }
  },
  {
    // 立即执行
    immediate: true,
  }
);

const scrollToLyric = (index) => {// 歌词滚动控制
  nextTick(() => {
    if (!lyricsWrapper.value || !currentLyrics.value.length) return

    const targetLine = lyricLine.value[index]
    if (!targetLine) return

    const container = lyricsWrapper.value
    const containerHeight = container.clientHeight
    const lineTop = targetLine.offsetTop
    const lineHeight = targetLine.clientHeight
    const currentScrollTop = container.scrollTop

    // 计算歌词行在容器中的可见性
    const isLineVisible = lineTop >= currentScrollTop &&
      (lineTop + lineHeight) <= (currentScrollTop + containerHeight)

    // 计算歌词行是否在中间区域（中间40%区域）
    const middleZoneStart = currentScrollTop + containerHeight * 0.3
    const middleZoneEnd = currentScrollTop + containerHeight * 0.7
    const isInMiddleZone = lineTop >= middleZoneStart &&
      (lineTop + lineHeight) <= middleZoneEnd

    // 只有当歌词不在中间区域或者不可见时才滚动
    if (!isLineVisible || !isInMiddleZone) {
      const scrollTop = lineTop - containerHeight / 2 + lineHeight / 2
      container.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      })
    }
  })
}

watch(currentLyricIndex, (newIndex) => { // 修改歌词索引监听
  if (newIndex === -1) return

  // 添加延迟，确保DOM更新完成
  setTimeout(() => {
    scrollToLyric(newIndex)
  }, 100)
})

watch(currentTime, (newTime) => { // 歌词同步检测
  if (!currentLyrics.value.length) return

  let newIndex = -1
  for (let i = 0; i < currentLyrics.value.length; i++) {
    if (newTime >= currentLyrics.value[i].time) {
      newIndex = i
    } else {
      break
    }
  }

  if (newIndex !== currentLyricIndex.value) {
    currentLyricIndex.value = newIndex
  }
})

// const startDrag = (e) => {
//   isDragging.value = true;
//   document.addEventListener("mousemove", handleDrag);
//   document.addEventListener("mouseup", stopDrag);
// };

// const handleDrag = (e) => {
//   if (!isDragging.value) return;
//   setVolume(e);
// };

// const stopDrag = () => {
//   isDragging.value = false;
//   document.removeEventListener("mousemove", handleDrag);
//   document.removeEventListener("mouseup", stopDrag);
// };

onMounted(async () => {
  audioElement.value = new Audio();  // 初始化音频元素
  audioElement.value.addEventListener("timeupdate", updateTime);
  audioElement.value.addEventListener("ended", () => {  // 播放结束事件
    if (playMode.value === "random" && shuffleList.value.length === 0) {
      generateShuffleList();
    }
    nextSong();
  });
  audioElement.value.volume = volume.value / 100;  // 设置初始音量
  // 滚动隐藏搜索栏
  // if (rightContent.value) {
  //   rightContent.value.addEventListener('scroll', debouncedHandleScroll);

  // }

});

onUnmounted(() => {
  // // 清理事件监听
  // if (rightContent.value) {
  //   rightContent.value.removeEventListener('scroll', debouncedHandleScroll);
  // }
});
</script>

<style scoped lang="scss">
.player-container {
  font-family: "lmst";
  height: calc(100vh - 3rem);
  width: 100vw;
  @include flexCenter(row, space-between);
  overflow: hidden;
  @include gradient-background('bg-gradient-color-start', 'bg-gradient-color-end', 135deg);
  transition: all 0.5s;

  .left-nav {
    height: 100%;
    width: 15%;
    padding: 2rem;

    // 导航svg图标
    .size-6 {
      width: 1rem;
    }

    // 导航列表
    .nav-list {
      padding: 0.5rem 0;


      li {
        padding: 0.2rem 0.5rem;
        border-radius: 0.2rem;
        margin: 0.5rem 0;
      }

      a {
        @include text-color('text-color');
        font-size: 0.9rem;
        @include flexCenter(row, flex-start);
        align-items: center;
        gap: 0.5rem;
      }
    }

    // 分类标题
    .classification {
      @include text-color('text-sec-color');
      font-size: 0.8rem;
    }

    // 当前激活导航样式
    .nav-active {
      background-image: linear-gradient(75deg, #e73636 10%, #c20c0c 120%);

      a {
        @include text-color('primary-text-color');
      }
    }

  }

  .right-content {
    flex: 1;
    height: 100%;
    overflow-y: auto;

    .search-bar {
      width: 100%;
      height: 3rem;
      @include flexCenter(row, flex-start);
      position: fixed;
      z-index: 1;
      font-family: 'gtpy';
      padding-left: 2rem;
      background-color: rebeccapurple;
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); // 使用更平滑的缓动函数

      // 隐藏状态 - 宽度变小并隐藏
      &.hidden {
        transform: translateY(-100%) scaleX(0.3); // 水平缩放为30%
        opacity: 0;
        width: 90%; // 宽度变为20%
        padding-left: 0.5rem; // 内边距相应减小
      }

      // 显示状态 - 宽度逐渐变大
      &.visible {
        transform: translateY(0) scaleX(1); // 水平缩放恢复100%
        opacity: 1;
        width: 100%; // 宽度恢复100%
        padding-left: 2rem; // 内边距恢复
      }

      input {
        border-radius: 2rem;
        padding: 0.3rem 1rem;
        font-size: 0.9rem;
        font-family: 'gtpy';
        background-color: #ffffff;
        border: 1px solid #e8eaef;

        &::placeholder {
          font-size: 0.8rem;
          font-family: 'gtpy';
        }
      }
    }

    // 播放器
    .audio-player {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 1;
      gap: 0.5rem;
      min-width: 40rem;
      padding: 1rem;
      @include gradient-background('bg-gradient-color-start', 'bg-gradient-color-end', 182deg);
      @include boxshadow('shadow-card');
      @include flexCenter(row, center);
      @include text-color('text-color');

      .player-content {
        width: 80%;
        @include flexCenter(row, center);
        gap: 1rem;
      }

      .music-pic {
        width: 3rem;
        height: 3rem;
        border-radius: 0.25rem;
        overflow: hidden;
        position: relative;
        background-color: #fff;
        @include flexCenter(row, center);
        cursor: pointer;
        transition: all 0.4s ease;

        &:hover {

          &::before,
          .arrows {
            display: block;
            opacity: 1;
          }
        }

        &::before {
          content: '';
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgb(12, 11, 11, .5);
          z-index: 1;
        }

        //更多按钮
        .arrows {
          display: none;
          opacity: 0;
          color: #ffffff;
          position: absolute;
          z-index: 2;
          @include flexCenter(column, flex-start);

          div {
            --arrowSize: 0.6rem;
            --arrowColor: currentColor;

            width: var(--arrowSize);
            height: var(--arrowSize);
            background: transparent;
            border: calc(var(--arrowSize) * 0.11) solid;
            border-color: transparent transparent var(--arrowColor) var(--arrowColor);
            transform: rotate(135deg);
            -webkit-animation: arrow 2s infinite linear;
            animation: arrow 2s infinite linear;

            // &:nth-of-type(1) {
            //   -webkit-animation-delay: -0.8s;
            //   animation-delay: -0.8s;
            // }

            &:nth-of-type(2) {
              -webkit-animation-delay: -0.4s;
              animation-delay: -0.4s;
            }

            &:nth-of-type(3) {
              -webkit-animation-delay: 0s;
              animation-delay: 0s;
            }
          }

          @keyframes arrow {
            0% {
              opacity: 0;
            }

            40% {
              opacity: 1;
            }

            80% {
              opacity: 0;
            }

            100% {
              opacity: 0;
            }
          }
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .play-control {
        width: 80%;
        @include flexCenter(column, center);

        //进度条
        .progress-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8em;
          width: 100%;

          span {
            transform: translateY(2px);
          }

          //进度条
          .progress-bar {
            height: 5px;
            background: #ddd;
            cursor: pointer;
            position: relative;
            width: 100%;
            flex: 1;

            .progress {
              height: 100%;
              background: $primary-color;
              transition: width 0.1s linear;
            }
          }
        }

        // 歌曲信息和控制
        .text-info-change {
          @include flexCenter(row, space-around);
          width: 100%;
          gap: 1rem;

          // 歌名、作者
          .title-auther {
            @include flexCenter(row, flex-start);

            p {
              width: 8rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 0.8rem;
            }
          }

          //声音和切换控制
          .voice-play {
            padding: 0.5rem;
            border-radius: 0.25rem;
            @include flexCenter(row, flex-start);
            gap: 1rem;

            //切换
            .controls {
              display: flex;
              gap: 1rem;
              // width: 50%;

              img {
                cursor: pointer;
                opacity: 0.8;

                transition: opacity 0.3s ease;

                &:hover {
                  opacity: 1;
                }
              }
            }

            //音量控制
            .volume-control {
              display: flex;
              align-items: center;
              gap: 0.4rem;
              min-width: 167px;
              overflow: hidden;

              span {
                font-size: 16px;
              }

              .custom-volume {
                position: relative;
                width: 5rem;
                height: 1.2rem;
                cursor: pointer;

                .volume-bar {
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 100%;
                  height: 0.3rem;
                  background: rgba(255, 255, 255, 0.3);
                  border-radius: 0.2rem;
                  overflow: hidden;

                  .current-volume {
                    height: 100%;
                    background: $primary-color;
                    transition: width 0.1s ease;
                  }

                  .volume-handle {
                    position: absolute;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 0.6rem;
                    height: 0.8rem;
                    background: #ffffff;
                    border-radius: 50%;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    transition: left 0.1s ease;
                  }
                }
              }

              img {
                cursor: pointer;
              }
            }

            // 随机/循环
            .order-change {
              display: flex;

              img {
                width: 18px;
              }
            }
          }
        }
      }
    }
  }
}

.player-controls {
  padding: 1rem;
  background-size: cover;
  background-color: #8faaca90;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px rgba(23, 24, 44, 0.72);
  gap: 1rem;
  position: relative;
  background-image: linear-gradient(180deg, #2e2e2e 30%, #121212 100%);

  // 专辑图片
  .album-pic {
    width: 6rem;
    height: 6rem;
    position: relative;
    border-radius: 0.5rem;
    position: absolute;
    top: -1rem;
    left: -1rem;

    &::before {
      content: '';
      position: absolute;
      top: -0.25rem;
      left: -0.25rem;
      width: 130%;
      height: 110%;
      background-image: url('@/assets/icon/treasureBox/coverall.png');
      background-position: 0 -845px;
      z-index: 2;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }
  }

  .controls {
    @include flexCenter(row, center);
    gap: 2rem;
    padding: 0.5rem;
    box-shadow: 0 1px 10px rgb(255, 255, 255, .2);

    div {
      cursor: pointer;

      img {
        width: 0.8rem;
      }
    }
  }

  .lyrics-container {
    height: 16rem;
    min-height: 16rem;
    width: 40vw;
    min-width: 20rem;
    scrollbar-width: none;
    overflow-y: auto;
    @include flexCenter(center, center);
    font-family: 'lmst';

    .lyrics-wrapper {
      height: 100%;
      width: 50%;
      max-height: 16rem;
      text-align: center;
      overflow-y: auto;
      overscroll-behavior: contain;

      /* IE 10+ */
      &::-webkit-scrollbar {
        display: none;
        /* Chrome/Safari/Edge */
      }

      .lyric-line {
        font-size: 0.9rem;
        color: rgba(255, 255, 255);
        padding: 0.5rem 0.2rem;
        transition: all 0.3s ease;
        line-height: 24px;

        &.active {
          color: $primary-hover;
          font-size: 0.9rem;
          font-weight: bold;
          transform: scale(1.05);
        }
      }

      .no-lyrics {
        color: rgba(255, 255, 255, 0.5);
        font-style: italic;
        padding: 2rem;
      }
    }
  }
}
</style>
