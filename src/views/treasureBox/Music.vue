<template>
  <div class="player-container">
    <!-- 导航 -->
    <div class="navigate">
      <Navigation hoverBgColor="#f0f4f5" textColor="#585858" />
    </div>
    <!-- 播放器 -->
    <div class="player-controls">
      <div style="width: 100%">
        <!-- 歌曲信息和控制按钮 -->
        <div class="song-info">
          <!-- 专辑图片 -->
          <transition name="album" mode="out-in">
            <div class="album-pic" :key="currentSong.picture">
              <img :src="currentSong.picture" alt="专辑" />
            </div>
          </transition>

          <!-- 信息和控制按钮 -->
          <div class="text-info-change">
            <!-- 歌名、作者 -->
            <div class="title-auther">
              <h2>{{ currentSong.title }}</h2>
              <p>{{ currentSong.artist }}</p>
            </div>
            <!-- 进度条 -->
            <div class="progress-bar" @click="seek">
              <div class="progress" :style="{ width: progress + '%' }"></div>
            </div>
            <!-- 时间显示 -->
            <div class="time-display">
              <span>{{ formatTime(currentTime) }}</span>
              <span>{{ formatTime(duration) }}</span>
            </div>
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
                <!-- <img src="@/assets/icon/treasureBox/random_default.svg" alt="random"> -->
              </div>
              <!-- 音量控制 -->
              <div class="volume-control">
                <img :src="!muted && Math.round(volume) > 0 ? volumeImg : mutedImg" alt="ismute" @click="toggleMute" />
                <div class="custom-volume" ref="volumeContainer" @click="setVolume">
                  <div class="volume-bar">
                    <div class="current-volume" :style="{ width: muted ? '0%' : volume + '%' }"></div>
                    <div class="volume-handle" :style="{ left: muted ? '0%' : volume + '%' }" @mousedown="startDrag">
                    </div>
                  </div>
                </div>
                <span class="volume-number">{{ muted ? 0 : Math.round(volume) }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 播放列表 -->
        <div class="playlist">
          <div v-for="(song, index) in playlist" :key="index" class="playlist-item"
            :class="{ active: currentSongIndex === index }" @click="playSong(index)">
            <div class="music-introduce">
              <span>
                <img v-if="currentSongIndex === index" :class="{ 'play-active': isPlaying }"
                  src="@/assets/icon/treasureBox/music-play.png" class="icon-playing" alt="播放按钮" />
                {{ song.title }} - {{ song.artist }}
              </span>
              <span> {{ formatTime(song.duration) }}</span>
            </div>
          </div>
        </div>
        <!-- 频谱组件 -->
        <Spectrum :audio-element="audioElement" :is-playing="isPlaying"></Spectrum>
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
    </div>
    <!-- 气球 -->
  </div>
  <BubbleUp></BubbleUp>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, watch } from "vue";
import utils from "@/utils/getAssetsFile";
import Spectrum from "@/components/Spectrum/index.vue";
import AOS from "aos";
import Navigation from "@/components/NavigationMenu/index.vue";
import BubbleUp from "@/components/BubbleUp/BubbleUp.vue";
AOS.init({
  offset: 0,
});
//暂停/播放图标
import playImg from "@/assets/icon/treasureBox/play.png";
import pauseImg from "@/assets/icon/treasureBox/pause.png";
//随机/循环图标
import randomImg from "@/assets/icon/treasureBox/random.svg";
import cycleImg from "@/assets/icon/treasureBox/cycle.svg";

//静音/取消静音图标
import volumeImg from "@/assets/icon/treasureBox/volume.png";
import mutedImg from "@/assets/icon/treasureBox/mute.png";
const audioElement = ref("");
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(80);
const currentSongIndex = ref(0);
const isDragging = ref(false);
const muted = ref(false);
const volumeContainer = ref(null);
//播放模式，默认按顺序
const playMode = ref("order");
//随机播放列表
const shuffleList = ref([]);
// 切换播放模式
const togglePlayMode = () => {
  playMode.value = playMode.value === "order" ? "random" : "order";
  if (playMode.value === "random") {
    generateShuffleList();
  }
};
// 生成随机播放列表（排除当前歌曲）
const generateShuffleList = () => {
  const allIndexes = playlist.map((_, index) => index);
  const current = currentSongIndex.value;
  shuffleList.value = allIndexes
    .filter((i) => i !== current)
    .sort(() => Math.random() - 0.5);
};

// 播放列表数据
import song1 from "@/assets/music/song1.mp3";
import song2 from "@/assets/music/song2.mp3";
import song3 from "@/assets/music/song3.mp3";
import song4 from "@/assets/music/song4.mp3";
import song5 from "@/assets/music/song5.mp3";
import song6 from "@/assets/music/song6.mp3";
const playlist = reactive([
  {
    picture: utils.getAssetsFile("img/treasureBox/0.jpg"),
    title: "成龙、金喜善",
    artist: "美丽的神话",
    url: song1,
    lrc: utils.getAssetsFile("music/song1.lrc"),
  },

  {
    picture: utils.getAssetsFile("img/treasureBox/1.jpg"),
    title: "风中芭蕾",
    artist: "郁可唯",
    url: song2,
    lrc: utils.getAssetsFile("music/song2.lrc"),
  },

  {
    picture: utils.getAssetsFile("img/treasureBox/2.jpg"),
    title: "梁静茹",
    artist: "宁夏",
    url: song3,
    lrc: utils.getAssetsFile("music/song3.lrc"),
  },
  {
    picture: utils.getAssetsFile("img/treasureBox/3.jpg"),
    title: "神话情话",
    artist: "齐豫、周华健",
    url: song4,
    lrc: utils.getAssetsFile("music/song4.lrc"),
  },

  {
    picture: utils.getAssetsFile("img/treasureBox/default.jpg"),
    title: "漂泊的情人",
    artist: "叶微岚",
    url: song5,
  },
  {
    picture: utils.getAssetsFile("img/treasureBox/default.jpg"),
    title: "我记得你眼里的依恋",
    artist: "音乐磁场",
    url: song6,
  },
]);
// 歌词相关
const currentLyrics = ref([]);
const currentLyricIndex = ref(-1);
const lyricsWrapper = ref(null);
const lyricLine = ref(null);
// LRC解析器
const parseLRC = (lrcText) => {
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
// 自动加载歌词
watch(
  currentSongIndex,
  async (newIndex) => {
    const song = playlist[newIndex];
    if (!song.lrc) {
      currentLyrics.value = [];
      return;
    }
    try {
      // 使用 fetch 加载歌词文件
      const response = await fetch(song.lrc);
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

// 1. 歌词滚动核心逻辑
const scrollToLyric = (index) => {
  nextTick(() => {
    if (!lyricsWrapper.value || !currentLyrics.value.length) return

    const targetLine = lyricLine.value[index]
    if (!targetLine) return

    const container = lyricsWrapper.value
    const lineTop = targetLine.offsetTop
    const containerHeight = container.clientHeight
    const scrollTop = lineTop - containerHeight / 2 + targetLine.clientHeight / 2

    container.scrollTo({
      top: scrollTop,
      behavior: 'smooth'
    })
  })
}

// 2. 优化歌词索引监听
watch(currentLyricIndex, (newIndex) => {
  if (newIndex === -1) return
  scrollToLyric(newIndex)
})

// 3. 修复歌词同步检测
watch(currentTime, (newTime) => {
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

const setVolume = (e) => {
  if (!volumeContainer.value) return;
  const rect = volumeContainer.value.getBoundingClientRect();
  let newVolume = ((e.clientX - rect.left) / rect.width) * 100;
  newVolume = Math.min(100, Math.max(0, newVolume));
  volume.value = newVolume;
  audioElement.value.volume = newVolume / 100;
  muted.value = false;
};

const startDrag = (e) => {
  isDragging.value = true;
  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDrag);
};

const handleDrag = (e) => {
  if (!isDragging.value) return;
  setVolume(e);
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);
};

const toggleMute = () => {
  muted.value = !muted.value;
  audioElement.value.volume = muted.value ? 0 : volume.value / 100;
};

const currentSong = computed(() => playlist[currentSongIndex.value]);
const progress = computed(
  () => (currentTime.value / duration.value) * 100 || 0
);

//预加载音频时长
const loadAudioDuration = async () => {
  for (const song of playlist) {
    const audio = new Audio(song.url);
    await new Promise((resolve) => {
      audio.addEventListener("loadedmetadata", () => {
        song.duration = audio.duration;
        resolve();
      });
      audio.load();
    });
  }
};
const updateTime = () => {
  currentTime.value = audioElement.value.currentTime;
  //从预加载获取时长
  duration.value = playlist[currentSongIndex.value].duration;
};

const seek = (e) => {
  if (!audioElement.value) return;
  const rect = e.target.getBoundingClientRect();
  const percentage = (e.clientX - rect.left) / rect.width;
  audioElement.value.currentTime = percentage * duration.value;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const playSong = (index) => {
  currentSongIndex.value = index;
  if (audioElement.value) {
    //重置时间显示
    duration.value = playlist[index].duration;
    currentTime.value = 0;

    audioElement.value.src = playlist[index].url;
    audioElement.value.play();
    isPlaying.value = true;
  }
};
// 下一首
const nextSong = () => {
  if (playMode.value === "random") {
    if (shuffleList.value.length === 0) generateShuffleList();
    currentSongIndex.value = shuffleList.value.shift();
  } else {
    currentSongIndex.value = (currentSongIndex.value + 1) % playlist.length;
  }
  playSong(currentSongIndex.value);
};

// 上一首
const prevSong = () => {
  if (playMode.value === "random") {
    // 随机模式不支持历史记录，改为顺序上一首
    currentSongIndex.value =
      (currentSongIndex.value - 1 + playlist.length) % playlist.length;
  } else {
    currentSongIndex.value =
      (currentSongIndex.value - 1 + playlist.length) % playlist.length;
  }
  playSong(currentSongIndex.value);
};

//播放/暂停
const togglePlay = () => {
  if (!audioElement.value) return;

  if (isPlaying.value) {
    audioElement.value.pause();
  } else {
    audioElement.value.play();
  }
  isPlaying.value = !isPlaying.value;
};
// 生命周期
onMounted(async () => {
  audioElement.value = new Audio(playlist[currentSongIndex.value].url);
  audioElement.value.addEventListener("timeupdate", updateTime);
  // 播放结束时处理（修改现有代码）
  audioElement.value.addEventListener("ended", () => {
    if (playMode.value === "random" && shuffleList.value.length === 0) {
      generateShuffleList();
    }
    nextSong();
  });
  await loadAudioDuration();
  audioElement.value.volume = volume.value / 100;
});
</script>

<style scoped lang="scss">
.player-container {
  font-family: "gtpy";
  height: 100vh;
  background-image: url("@/assets/img/treasureBox/banner.png");
  background-size: cover;
  @include flexCenter(column, center);
  overflow: hidden;

  //导航
  .navigate {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
  }

  //播放器
  .player-controls {
    width: 45rem;
    min-width: 45rem;
    padding: 1rem;
    background-size: cover;
    background-color: #8faaca90;
    backdrop-filter: blur(0.1rem);
    padding-bottom: 0;
    border-radius: 1rem;
    box-shadow: 0 0 20px rgba(23, 24, 44, 0.72);
    @include flexCenter(row, flex-start);
    gap: 1rem;
    position: relative;
    z-index: 2;

    .song-info {
      @include flexCenter(row, flex-end);

      // 专辑图片
      .album-pic {
        width: 8rem;
        height: 9.5rem;
        border-radius: 0.5rem;
        overflow: hidden;
        border: 1px solid #333;
        box-shadow: 0 2px 10px black;
        @include flexCenter(center, center);
        position: absolute;
        top: -1rem;
        left: -1rem;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }

        img {
          width: 100%;
        }
      }

      //信息和控制按钮
      .text-info-change {
        color: white;
        width: 75%;

        // 歌名、作者
        .title-auther {
          width: 100%;

          h2 {
            font-size: 0.9rem;
          }

          p {
            font-size: 0.7rem;
            color: #d4d4d4;
          }
        }

        //进度条
        .progress-bar {
          width: 90%;
          height: 4px;
          background: #ddd;
          margin: 1rem 0 0.5rem;
          cursor: pointer;
          position: relative;

          .progress {
            height: 100%;
            background: $primary-color;
            transition: width 0.1s linear;
          }
        }

        //时间显示
        .time-display {
          display: flex;
          justify-content: space-between;
          font-size: 0.8em;
          color: #ffffff;
          width: 90%;
          padding: 0 0.5rem;
        }

        //声音和切换控制
        .voice-play {
          width: 100%;
          margin: 1rem 0;
          box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.5);
          padding: 0.5rem;
          border-radius: 0.25rem;
          @include flexCenter(row, space-between);

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

            // background-color: rebeccapurple;
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

    // 播放列表
    .playlist {
      font-size: 0.8rem;
      margin-top: 0.5rem;
      padding: 0.5rem 0;
      border-radius: 0.25rem;
      box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.5);
      color: #ffffff;
      max-height: calc(4 * 2rem);
      overflow-y: auto;
      overflow-x: hidden;
      scroll-behavior: smooth; // 启用平滑滚动
      display: block;

      /* 滚动条整体样式 */
      &::-webkit-scrollbar {
        width: 6px; // 滚动条宽度
        height: 6px; // 横向滚动条高度
      }

      /* 滚动条轨道 */
      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1); // 半透明轨道
        border-radius: 3px; // 匹配容器圆角
      }

      /* 滚动条滑块 */
      &::-webkit-scrollbar-thumb {
        background: $primary-color; // 使用与进度条相同的颜色
        border-radius: 3px; // 圆角匹配
        transition: background 0.3s; // 悬停动画
      }

      /* Firefox兼容样式 */
      scrollbar-width: thin; // auto | thin | none
      scrollbar-color: $primary-color rgba(255, 255, 255, 0.1); // 滑块颜色 轨道颜色

      span {
        @include flexCenter(row, center);
      }

      .icon-playing {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        transition: all 0.3s ease;
      }

      // 播放时执行动画
      .play-active {
        animation: rotate 4s linear infinite;
        filter: drop-shadow(0 0 2px $primary-color);
      }

      .playlist-item {
        padding: 0.5rem;
        padding-right: 1.5rem;
        cursor: pointer;
        flex-shrink: 0;
        border-bottom: 1px solid #333;
        height: 2rem;
        transition: all 0.3s ease;

        &:hover {
          transform: translateX(8px);
          background: rgba(42, 67, 111, 0.6) !important;
        }

        .music-introduce {
          @include flexCenter(row, space-between);
          gap: 1rem;
        }
      }

      .playlist-item.active {
        color: $primary-hover;
        font-weight: bold;
        background-color: #2a436f90;
        animation: pulse 0.6s ease;
      }
    }
  }

  .lyrics-container {
    width: 15rem;
    min-width: 15rem;
    scrollbar-width: none;
    overflow-y: auto;

    .lyrics-wrapper {
      height: 20.5rem;
      text-align: center;
      overflow-y: auto;
      overscroll-behavior: contain;


      /* IE 10+ */
      &::-webkit-scrollbar {
        display: none;
        /* Chrome/Safari/Edge */
      }

      .lyric-line {
        font-size: 0.8rem;
        color: rgba(255, 255, 255);
        padding: 1rem 0.2rem;
        transition: all 0.3s ease;
        line-height: 24px;

        &.active {
          color: $primary-color;
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

    // /* 歌词区域滚动条样式 */
    // &::-webkit-scrollbar {
    //     // width: 6px;
    // }

    // &::-webkit-scrollbar-thumb {
    //     // background: rgba(100, 242, 228, 0.6);
    //     border-radius: 3px;
    // }
  }

  // 播放图标动画
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  /* 专辑图片动画 */
  .album-enter-active,
  .album-leave-active {
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
  }

  .album-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }

  .album-leave-to {
    opacity: 0;
    transform: scale(1.1);
  }

  /* 切换歌曲时的脉冲动画 */

  @keyframes pulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.02);
    }

    100% {
      transform: scale(1);
    }
  }
}
</style>
