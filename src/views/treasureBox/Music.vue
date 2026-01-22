<template>
  <div>
    <!-- 导航 -->
    <Navigation hoverBgColor="#f0f4f5" textColor="#585858" />
    <!-- 主体 -->
    <div class="player-container">
      <div class="left-nav">
        <!-- 在线 -->
        <div class="online">
          <h5>在线音乐</h5>
          <ul>
            <li class="">推荐</li>
            <li class="nav-active">宝藏歌曲</li>
          </ul>
        </div>

        <!-- 我的 -->
        <div class="ismine">
          <h5>我的音乐</h5>
          <ul>
            <li>我喜欢</li>
            <li>我的收藏</li>
            <li>最近播放</li>
          </ul>
        </div>
      </div>

      <div class="right-content">
        <!-- 搜索栏 -->
        <div class="search-bar">
          <input type="text" placeholder="搜索音乐、MV、歌单">
        </div>

        <!-- 推荐 -->
        <div class="recommend" v-if="false">
          <h1>推荐</h1>
          <!-- 推荐歌曲 -->
          <div class="rec-music">
            <h2>推荐歌曲></h2>
            <ul>
              <li class="item">1</li>
              <li class="item">2</li>
            </ul>
          </div>
          <!-- 热门歌曲 -->
          <div class="hot-music">
            <h2>热门歌曲></h2>
            <div class="hot-music-list">
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介11111111111111111111555556555555</p>
              </div>
            </div>
          </div>
          <!-- 推荐歌单 -->
          <div class="rec-playlist">
            <h2>推荐歌单></h2>
            <div class="rec-menu-list">
              <div class="item">
                <div class="item-content">
                  <img src="@/assets/img/treasureBox/musicList/10004.png" alt="">
                </div>
                <p class="music-introduce">Next To Me-ImagineDragons-Break Ups To Make Ups》</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img src="@/assets/img/treasureBox/musicList/10011.png" alt="">
                </div>
                <p class="music-introduce">Hello Summer (Radio Edit)-Rameez</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img src="@/assets/img/treasureBox/musicList/10005.png" alt="">
                </div>
                <p class="music-introduce">We Don't Belong-Dash Berlin/Haneri</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img src="@/assets/img/treasureBox/musicList/10008.png" alt="">
                </div>
                <p class="music-introduce">爱就一个字（live）-张信哲/丁芙妮</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img src="@/assets/img/treasureBox/musicList/10009.png" alt="">
                </div>
                <p class="music-introduce">Lone Ranger-Rachel Platten</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img src="@/assets/img/treasureBox/musicList/10010.png" alt="">
                </div>
                <p class="music-introduce">把回忆拼好给你-王贰浪</p>
              </div>

            </div>
          </div>
          <!-- 推荐mv -->
          <div class="hot-music">
            <h2>推荐MV></h2>
            <div class="hot-music-list">
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介11111111111111111111555556555555</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 音乐馆 -->
        <div class="treasure" v-if="false">
          <h1>宝藏</h1>

          <!-- 宝藏歌曲 -->
          <div class="treasure-music">
            <div class="treasure-music-list">
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介11111111111111111111555556555555</p>
              </div>
            </div>
          </div>

          <!-- 独家放送 -->
          <div class="exclusive-music">
            <h2>独家放送></h2>
            <div class="exclusive-music-list">

              <div class="item">
                <div class="item-content">
                  <img class="music-cover" src="@/assets/img/treasureBox/musicList/10024.png" alt="music-cover">
                  <span class="msk"></span>
                </div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img class="music-cover" src="@/assets/img/treasureBox/musicList/10024.png" alt="music-cover">
                  <span class="msk"></span>
                </div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img class="music-cover" src="@/assets/img/treasureBox/musicList/10024.png" alt="music-cover">
                  <span class="msk"></span>
                </div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img class="music-cover" src="@/assets/img/treasureBox/musicList/10024.png" alt="music-cover">
                  <span class="msk"></span>
                </div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img class="music-cover" src="@/assets/img/treasureBox/musicList/10024.png" alt="music-cover">
                  <span class="msk"></span>
                </div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img class="music-cover" src="@/assets/img/treasureBox/musicList/10024.png" alt="music-cover">
                  <span class="msk"></span>
                </div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img class="music-cover" src="@/assets/img/treasureBox/musicList/10024.png" alt="music-cover">
                  <span class="msk"></span>
                </div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">
                  <img class="music-cover" src="@/assets/img/treasureBox/musicList/10024.png" alt="music-cover">
                  <span class="msk"></span>
                </div>
                <p class="music-introduce">这里是简介</p>
              </div>

            </div>
          </div>

          <!-- 新歌速递 -->
          <div class="new-music">
            <h2>新歌速递</h2>
            <div class="new-music-list">
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介11111111111111111111555556555555</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介11111111111111111111555556555555</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介11111111111111111111555556555555</p>
              </div>
            </div>
          </div>

          <!-- 视频 -->
          <div class="mv-video">
            <h2>视频></h2>
            <div class="mv-video-list">
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介</p>
              </div>
              <div class="item">
                <div class="item-content">这里是内容</div>
                <p class="music-introduce">这里是简介11111111111111111111555556555555</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 我喜欢 -->
        <div class="mine-favorite" v-if="false">
          <!-- 歌单头部信息 -->
          <div class="playlist-header">
            <!-- 歌单封面 -->
            <div class="cover-image">
              <img class="favorite-cover" src="@/assets/img/treasureBox/musicList/10024.png" alt="favorite-cover">
              <div class="music-menu-msk"></div>
            </div>
            <!-- 歌单信息 -->
            <div class="playlist-info">
              <div class="playlist-title">
                <h1>我喜欢的音乐</h1>
                <span class="playlist-tag">歌单</span>
              </div>

              <div class="creator-info">
                <div class="creator-avatar"></div>
                <span class="creator-name">Alcastar_RS</span>
                <span class="create-date">2019-01-03 创建</span>
              </div>

              <div class="stats">
                <div class="stat-item">26首歌</div>
                <div class="stat-item">播放：<span class="stat-number">1603</span>次</div>
              </div>

              <div class="action-buttons">
                <button class="btn btn-play">
                  <i class="fas fa-play"></i> 播放
                </button>
                <button class="btn btn-secondary">
                  <i class="far fa-heart"></i> 收藏
                </button>
                <button class="btn btn-secondary">
                  <i class="fas fa-share"></i> 分享
                </button>
                <button class="btn btn-blue">
                  <i class="fas fa-download"></i> 下载
                </button>
              </div>
            </div>
          </div>

          <!-- 歌曲列表 -->
          <div class="songs-container">
            <div class="songs-header">
              <div class="song-index">#</div>
              <div class="song-title">歌曲标题</div>
              <div class="song-duration">时长</div>
              <div class="song-artist">歌手</div>
              <div class="song-album">专辑</div>
            </div>

            <ul class="song-list">
              <!-- 歌曲条目 -->
              <li class="song-item active">
                <div class="song-index">1</div>
                <div class="song-title">
                  <div class="song-title-content">
                    <i class="fas fa-play play-icon"></i>
                    <span class="song-name">New Boy</span>
                  </div>
                </div>
                <div class="song-duration">04:16</div>
                <div class="song-artist">房东的猫/陈</div>
                <div class="song-album">谁是宝藏歌手第8期</div>
              </li>

              <li class="song-item">
                <div class="song-index">2</div>
                <div class="song-title">
                  <div class="song-title-content">
                    <i class="fas fa-play play-icon"></i>
                    <span class="song-name">爱就一个字(Live)</span>
                  </div>
                </div>
                <div class="song-duration">04:32</div>
                <div class="song-artist">张信哲/丁芙妮</div>
                <div class="song-album">为歌而赞第11期</div>
              </li>

              <li class="song-item">
                <div class="song-index">3</div>
                <div class="song-title">
                  <div class="song-title-content">
                    <i class="fas fa-play play-icon"></i>
                    <span class="song-name">I Want My Tears Back</span>
                  </div>
                </div>
                <div class="song-duration">05:07</div>
                <div class="song-artist">Nightwish</div>
                <div class="song-album">Imaginaerum</div>
              </li>

              <li class="song-item">
                <div class="song-index">4</div>
                <div class="song-title">
                  <div class="song-title-content">
                    <i class="fas fa-play play-icon"></i>
                    <span class="song-name">无归</span>
                  </div>
                </div>
                <div class="song-duration">04:42</div>
                <div class="song-artist">叶里</div>
                <div class="song-album">无归</div>
              </li>

              <li class="song-item">
                <div class="song-index">5</div>
                <div class="song-title">
                  <div class="song-title-content">
                    <i class="fas fa-play play-icon"></i>
                    <span class="song-name">虞兮叹</span>
                  </div>
                </div>
                <div class="song-duration">03:30</div>
                <div class="song-artist">闻人听書_</div>
                <div class="song-album">虞兮叹</div>
              </li>

              <li class="song-item">
                <div class="song-index">6</div>
                <div class="song-title">
                  <div class="song-title-content">
                    <i class="fas fa-play play-icon"></i>
                    <span class="song-name">错位时空</span>
                  </div>
                </div>
                <div class="song-duration">03:23</div>
                <div class="song-artist">艾辰</div>
                <div class="song-album">错位时空</div>
              </li>

              <li class="song-item">
                <div class="song-index">7</div>
                <div class="song-title">
                  <div class="song-title-content">
                    <i class="fas fa-play play-icon"></i>
                    <span class="song-name">星辰大海</span>
                  </div>
                </div>
                <div class="song-duration">03:27</div>
                <div class="song-artist">黄霄雲</div>
                <div class="song-album">星辰大海</div>
              </li>

              <li class="song-item">
                <div class="song-index">8</div>
                <div class="song-title">
                  <div class="song-title-content">
                    <i class="fas fa-play play-icon"></i>
                    <span class="song-name">千千万万</span>
                  </div>
                </div>
                <div class="song-duration">04:06</div>
                <div class="song-artist">深海鱼子酱</div>
                <div class="song-album">千千万万</div>
              </li>

              <li class="song-item">
                <div class="song-index">9</div>
                <div class="song-title">
                  <div class="song-title-content">
                    <i class="fas fa-play play-icon"></i>
                    <span class="song-name">Ce Frumoasa E lubirea</span>
                  </div>
                </div>
                <div class="song-duration">03:12</div>
                <div class="song-artist">Giulia</div>
                <div class="song-album">Primul Pas</div>
              </li>

              <li class="song-item">
                <div class="song-index">10</div>
                <div class="song-title">
                  <div class="song-title-content">
                    <i class="play-icon"></i>
                    <span class="song-name">Lovefool</span>
                  </div>
                </div>
                <div class="song-duration">03:10</div>
                <div class="song-artist">twocolors</div>
                <div class="song-album">Lovefool</div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 播放器 -->
        <div class="audio-player">
          <!-- 歌曲图片 -->
          <div class="music-pic" @click="openMore">
            <img :src="currentSong.picture" alt="music-pic" />
            <div class="arrows">
              <!-- <div></div> -->
              <div></div>
              <div></div>
            </div>
          </div>
          <!-- 控制面板 -->
          <div class="play-control">.
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
                <h2>{{ currentSong.title }}</h2>
                -
                <p>{{ currentSong.artist }}</p>
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
                </div>
                <!-- 音量控制 -->
                <div class="volume-control">
                  <img :src="!muted && Math.round(volume) > 0 ? volumeImg : mutedImg" alt="ismute"
                    @click="toggleMute" />
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

              <!-- 频谱组件 -->
              <div class="spectrum-container">
                <Spectrum :audio-element="audioElement" :is-playing="isPlaying"></Spectrum>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 验证 -->
    <ModalBox :isVisible="isShowModal" @close="handChangeModal" animationType="slideUpFromBottom">
      <div class="player-controls">
        <div class="song-info">
          <!-- 专辑图片 -->
          <transition name="album" mode="out-in">
            <div class="album-pic" :key="currentSong.picture" :class="{ playing: isPlaying, paused: !isPlaying }">
              <img :src="currentSong.picture" alt="专辑" />
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
    <!-- 气球 -->
    <!-- <BubbleUp></BubbleUp> -->

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, watch } from "vue";
import utils from "@/utils/getAssetsFile";
import Spectrum from "@/components/Spectrum/index.vue";
import AOS from "aos";
import Navigation from "@/components/NavigationMenu/index.vue";
import ModalBox from '@/components/ModalBox/index.vue';
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

const isShowModal = ref(false); // 控制模态框显示
const handChangeModal = () => {
  isShowModal.value = false;
};

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

const openMore = () => {
  isShowModal.value = true;
};

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

// 歌词滚动逻辑
// 更精确的歌词滚动控制
const scrollToLyric = (index) => {
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

// 修改歌词索引监听
watch(currentLyricIndex, (newIndex) => {
  if (newIndex === -1) return

  // 添加延迟，确保DOM更新完成
  setTimeout(() => {
    scrollToLyric(newIndex)
  }, 100)
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
  height: calc(100vh - 3rem);
  width: 100vw;
  @include flexCenter(row, space-between);
  overflow: hidden;

  .left-nav {
    height: 100%;
    width: 10%;
    background-color: #1e8efe;

    .online {
      .nav-active {
        background-color: #fff9f9;
      }
    }

    .ismine {}
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
      padding-left: 1rem;
      background-color: $general-white;

      input {
        border-radius: 2rem;
        padding: 0.3rem 1rem;
        font-size: 0.9rem;
        font-family: 'gtpy';
        background-color: #f1f5f9;
        border: 1px solid #e8eaef;

        &::placeholder {
          font-size: 0.8rem;
          font-family: 'gtpy';
        }
      }
    }

    // 大标题
    h1 {
      width: 100%;
      font-size: 2rem;
      font-weight: bold;
    }

    // 二级标题
    h2 {
      font-size: 1rem;
      font-weight: bold;
      padding: 0.5rem 0;
    }

    // 每项内容
    .item {
      border-radius: 0.5rem;

      .item-content {
        border-radius: 0.5rem;
        background-color: #f61111;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .music-introduce {
        width: 100%;
        display: -webkit-box;
        /* 将元素设置为弹性伸缩盒子模型 */
        -webkit-box-orient: vertical;
        /* 设置伸缩盒子的子元素排列方式 */
        -webkit-line-clamp: 2;
        /* 限制显示的行数 */
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.8rem;
        padding-top: 0.5rem;
      }
    }

    //推荐
    .recommend,
    .treasure {
      padding: 4rem 1rem;
      @include flexCenter(column, flex-start);
      gap: 1rem;

      // 推荐歌曲
      .rec-music {
        width: 100%;

        ul {
          display: grid;
          grid-template-columns: repeat(2, minmax(400px, 1fr));
          gap: 1rem;
        }

        .item {
          height: 8rem;
          background-color: #fff;
        }
      }

      // 热门歌曲
      .hot-music {
        width: 100%;

        .hot-music-list {
          display: grid;
          grid-template-columns: repeat(4, minmax(200px, 1fr));
          gap: 1rem;
        }

        .item {
          .item-content {
            height: 7rem;
          }

        }
      }

      // 推荐歌单
      .rec-playlist {
        width: 100%;

        .rec-menu-list {
          display: grid;
          grid-template-columns: repeat(6, minmax(120px, 1fr));
          gap: 1rem;

          .item {
            padding: 0.5rem;

            .item-content {
              height: 10rem;
              min-height: 5rem;
            }
          }
        }
      }
    }

    // 宝藏歌曲
    .treasure {

      // 宝藏歌曲
      .treasure-music {
        width: 100%;

        .treasure-music-list {
          display: grid;
          grid-template-columns: repeat(4, minmax(200px, 1fr));
          gap: 1rem;
        }

        .item {
          .item-content {
            height: 6rem;
          }

        }
      }

      // 独家放送
      .exclusive-music {
        width: 100%;

        .exclusive-music-list {
          display: grid;
          grid-template-columns: repeat(8, minmax(90px, 1fr));
          gap: 1rem;
        }

        .item {
          .item-content {
            position: relative;
            height: 5rem;
            width: 5rem;

            .music-cover {
              width: 100%;
              height: 100%;
            }

            .msk {
              position: absolute;
              top: 0;
              left: 0;
              width: 6rem;
              height: 100%;
              background: url('@/assets/icon/treasureBox/coverall.png') no-repeat;
              background-position: 0 -570px;
              z-index: 0;

            }
          }


        }
      }

      // 新歌速递
      .new-music {
        width: 100%;

        .new-music-list {
          display: grid;
          grid-template-columns: repeat(5, minmax(180px, 1fr));
          gap: 1rem;
        }

        .item {
          @include flexCenter(row, center);

          .item-content {
            height: 3rem;
          }

        }
      }

      // 视频
      .mv-video {
        width: 100%;

        .mv-video-list {
          display: grid;
          grid-template-columns: repeat(3, minmax(250px, 1fr));
          gap: 1rem;
        }

        .item {
          .item-content {
            height: 12rem;
          }

        }
      }
    }

    // 我喜欢的音乐
    .mine-favorite {
      padding: 3rem 0;
      --primary-red: #e60026;
      --primary-blue: #0c8ed3;
      --light-gray: #f8f8f8;
      --medium-gray: #f2f2f2;
      --dark-gray: #666;
      --text-color: #333;
      --border-color: #e0e0e0;

      /* 歌单头部信息 */
      .playlist-header {
        @include flexCenter(row, flex-start);
        padding: 1rem;
        gap: 1.5rem;
        flex-wrap: nowrap;

        // 歌单封面
        .cover-image {
          @include flexCenter(row, center);
          width: 11rem;
          height: 11rem;
          position: relative;
          overflow: hidden;

          // 我喜欢歌单图片
          .favorite-cover {
            width: 10rem;
            height: 10rem;
            object-fit: cover;
          }

          .music-menu-msk {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 11rem;
            height: 11rem;
            background: url('@/assets/icon/treasureBox/coverall.png') no-repeat;
            background-position: 0 -315px;
          }
        }

        // 歌单信息
        .playlist-info {
          @include flexCenter(column, flex-start);
          align-items: flex-start;
          gap: 1rem;
          flex: 1;
          width: 100%;
          height: 10rem;

          .playlist-title {
            @include flexCenter(row, center);
            gap: 0.5rem;

            h1 {
              font-size: 28px;
              font-weight: bold;
              width: fit-content;
            }

            .playlist-tag {
              background-color: rgba(230, 0, 38, 0.1);
              color: var(--primary-red);
              padding: 3px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 600;
            }
          }

          .creator-info {
            @include flexCenter(row, center);
            color: var(--dark-gray);
            gap: 0.5rem;

            .creator-avatar {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background-color: #ccc;
            }

            .creator-name {
              font-weight: 500;
              color: var(--text-color);
            }

            .create-date {
              font-size: 13px;
            }
          }

          .stats {
            display: flex;
            gap: 1.5rem;
            padding-left: 0.5rem;

            .stat-item {
              color: var(--dark-gray);
              font-size: 14px;
            }

            .stat-number {
              font-weight: 600;
              color: var(--text-color);
            }
          }

          /* 操作按钮 */
          .action-buttons {
            display: flex;
            gap: 1rem;

            .btn {
              padding: 10px 24px;
              border-radius: 20px;
              border: none;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              font-size: 14px;
            }

            .btn-play {
              background-color: var(--primary-red);
              color: white;
              padding: 12px 28px;
            }

            .btn-play:hover {
              background-color: #d10022;
              transform: translateY(-2px);
            }

            .btn-secondary {
              background-color: white;
              color: var(--text-color);
              border: 1px solid var(--border-color);
            }

            .btn-secondary:hover {
              background-color: var(--light-gray);
            }

            .btn-blue {
              background-color: var(--primary-blue);
              color: white;
            }

            .btn-blue:hover {
              background-color: #0b7db8;
            }
          }

        }
      }

      /* 歌曲列表 */
      .songs-container {
        padding: 1rem 0;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        font-size: 0.8rem;

        .songs-header {
          display: flex;
          padding: 15px 20px;
          background-color: var(--medium-gray);
          font-weight: 600;
          border-bottom: 2px solid var(--primary-red);
          font-size: 0.9rem;
        }

        .song-index {
          width: 50px;
          text-align: center;
        }

        // 播放时执行动画
        .play-active {
          animation: rotate 4s linear infinite;
          filter: drop-shadow(0 0 2px $primary-color);
        }
      }

      .song-title {
        flex: 2;
      }

      .song-duration {
        width: 5rem;
      }

      .song-artist {
        flex: 1.5;
      }

      .song-album {
        flex: 1.5;
      }

      .song-list {
        list-style: none;

        .song-item {
          display: flex;
          padding: 15px 20px;
          border-bottom: 1px solid var(--border-color);
          align-items: center;
          transition: background-color 0.2s;

          &:hover {
            background-color: var(--light-gray);

            .play-icon {
              opacity: 1;
            }
          }

          &.active {
            background-color: rgba(255, 0, 43, 0.1);
          }

        }
      }

      .song-index {
        color: var(--dark-gray);
      }

      .song-title-content {
        display: flex;
        align-items: center;
      }

      .play-icon {
        border: 8px solid var(--primary-red);
        border-top: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid transparent;
        margin-left: 10px;
        opacity: 0;
        transition: opacity 0.2s;
      }

      .song-name {
        font-weight: 500;
      }

      .song-artist,
      .song-album {
        color: var(--dark-gray);
      }

      /* 响应式设计 */
      @media (max-width: 900px) {
        .playlist-header {
          flex-direction: column;
        }

        .cover-image {
          width: 100%;
          max-width: 300px;
          margin: 0 auto 20px;
        }

        .playlist-info {
          padding-left: 0;
          text-align: center;
        }

        .action-buttons {
          justify-content: center;
        }

        .stats {
          justify-content: center;
        }
      }

      @media (max-width: 768px) {
        .header {
          flex-direction: column;
          align-items: flex-start;
        }

        .nav-links {
          margin: 15px 0;
        }

        .nav-links a {
          margin-left: 0;
          margin-right: 20px;
        }

        .search-bar {
          width: 100%;
          margin-top: 10px;
        }

        .song-artist,
        .song-album {
          display: none;
        }

        .songs-header .song-artist,
        .songs-header .song-album {
          display: none;
        }
      }
    }

    // 播放器
    .audio-player {
      background: #0c8ed3;
      @include flexCenter(row, center);
      position: fixed;
      bottom: 0;
      width: 90%;
      color: $general-black;
      gap: 0.5rem;
      min-width: 40rem;

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
          @include flexCenter(row, space-between);
          width: 100%;

          // 歌名、作者
          .title-auther {
            @include flexCenter(row, flex-start);
            width: 15rem;

            h2 {
              font-size: 0.9rem;
            }

            p {
              font-size: 0.8rem;
              color: #131010;
            }
          }

          //声音和切换控制
          .voice-play {
            width: 50%;
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

          // 频谱组件
          .spectrum-container {
            width: 27.2rem;
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
  font-family: 'gtpy';
  position: relative;

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
    box-shadow: 0 2px 10px black;

    div {
      cursor: pointer;

      img {
        width: 0.8rem;
      }
    }
  }

  .lyrics-container {
    height: 14rem;
    min-height: 14rem;
    width: 40vw;
    min-width: 20rem;
    scrollbar-width: none;
    overflow-y: auto;
    @include flexCenter(center, center);

    .lyrics-wrapper {
      height: 100%;
      width: 50%;
      max-height: 14rem;
      text-align: center;
      overflow-y: auto;
      overscroll-behavior: contain;
      // background-color: rebeccapurple;


      /* IE 10+ */
      &::-webkit-scrollbar {
        display: none;
        /* Chrome/Safari/Edge */
      }

      .lyric-line {
        font-size: 0.8rem;
        color: rgba(255, 255, 255);
        padding: 0.5rem 0.2rem;
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
  }
}
</style>
