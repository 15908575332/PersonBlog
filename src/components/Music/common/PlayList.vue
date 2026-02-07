<template>
    <!-- 歌单列表 -->
    <div class="song-list-component">
        <!-- 歌单头部信息 -->
        <div class="playlist-header">
            <!-- 歌单封面 -->
            <div class="cover-image">
                <img class="favorite-cover" :src="playlistData.coverImage || songList[0]?.picture" alt="playlist-cover">
                <div class="music-menu-msk"></div>
            </div>
            <!-- 歌单信息 -->
            <div class="playlist-info">
                <div class="playlist-title">
                    <h1>{{ playlistData.title }}</h1>
                    <span class="playlist-tag">{{ playlistData.tag || '歌单' }}</span>
                </div>

                <div class="creator-info">
                    <img class="creator-avatar" :src=playlistData.creatorAvatar />
                    <span class="creator-name">{{ playlistData.creatorName }}</span>
                    <span class="create-date">{{ playlistData.createDate }}</span>
                </div>

                <div class="stats">
                    <div class="stat-item">{{ songList.length }}首歌</div>
                    <div class="stat-item">播放：<span class="stat-number">{{ playlistData.playCount || 0 }}</span>次</div>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-play" @click="handlePlayAll">
                        <i class="fas fa-play"></i> 播放全部
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
                <div class="song-control">操作</div>
            </div>

            <ul class="song-list">
                <li v-for="(song, index) in songList" :key="song.id" class="song-item kbn-music" :class="{
                    active: activeIndex === index,
                    'pulse-animation': activeIndex === index && isPulsing
                }" @click="handlePlaySong(song, index)">
                    <div class="song-index">{{ index + 1 }}</div>
                    <div class="song-title">
                        <div class="song-title-content ">
                            <img src="@/assets/icon/treasureBox/music-play.png" alt="play-icon" class="play-icon"
                                :class="{ 'playing-animation': activeIndex === index && isPlaying }" />
                            <span class="song-name" :class="{ 'text-glow': activeIndex === index }">{{ song.name
                                }}</span>
                        </div>
                    </div>
                    <div class="song-duration">{{ formatTime(song.duration) }}</div>
                    <div class="song-artist">{{ song.artist }}</div>
                    <div class="song-album">{{ song.album || '未知专辑' }}</div>

                    <!-- 操作按钮 -->
                    <div class="song-control" @click.stop>
                        <a-tooltip placement="leftTop">
                            <template #title>
                                <span>喜欢/取消喜欢</span>
                            </template>
                            <svg class="icon" width="18" height="18" viewBox="0 0 24 24"
                                @click="toggleFavorite(song.index)"
                                :style="{ color: song.favorite ? '#e60026' : '#666' }">
                                <path fill="currentColor"
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </a-tooltip>
                        <a-tooltip placement="leftTop">
                            <template #title>
                                <span>收藏</span>
                            </template>
                            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>
                        </a-tooltip>
                        <a-tooltip placement="leftTop">
                            <template #title>
                                <span>下载</span>
                            </template>
                            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                            </svg>
                        </a-tooltip>
                        <a-tooltip placement="leftTop">
                            <template #title>
                                <span>分享</span>
                            </template>
                            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                            </svg>
                        </a-tooltip>
                        <a-tooltip placement="leftTop">
                            <template #title>
                                <span>删除</span>
                            </template>
                            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </a-tooltip>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch, computed } from 'vue'

// 定义组件props
const props = defineProps({
    // 播放状态相关
    currentSongIndex: {
        type: Number,
        default: -1
    },
    isPlaying: {
        type: Boolean,
        default: false
    },
    // 歌单数据
    playlistData: {
        type: Object,
        default: () => ({
            title: '歌单标题',
            tag: '歌单',
            creatorName: '未知用户',
            creatorAvatar: '',
            createDate: '',
            playCount: 0,
            coverImage: ''
        })
    },
    // 歌曲列表
    songs: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['play-song', 'update-playlist'])

// 使用计算属性来管理激活状态，确保与父组件同步
const activeIndex = computed(() => props.currentSongIndex)
const isPulsing = ref(true)

// 创建响应式歌曲列表
const songList = reactive([...props.songs])

// 点击播放单首歌曲
const handlePlaySong = (song, index) => {
    emit('play-song', {
        song,
        playlist: songList,
        startIndex: index
    })

    // 触发脉冲动画
    isPulsing.value = false
    setTimeout(() => {
        isPulsing.value = true
    }, 100)
}

// 播放全部歌曲
const handlePlayAll = () => {
    if (songList.length === 0) return

    emit('play-song', {
        song: songList[0],
        playlist: songList,
        startIndex: 0
    })
}

// 监听父组件传递的 currentSongIndex 变化，确保样式同步
watch(() => props.currentSongIndex, (newIndex) => {
    console.log('歌单组件收到索引更新:', newIndex)
    if (newIndex !== -1) {
        isPulsing.value = false
        setTimeout(() => {
            isPulsing.value = true
        }, 100)
    }
})

// 监听歌曲数据变化
watch(() => props.songs, (newSongs) => {
    songList.splice(0, songList.length, ...newSongs)
}, { deep: true })

const formatTime = (seconds) => {
    if (!seconds) return '0:00'
    const minutes = Math.floor(seconds / 60)
    seconds = Math.floor(seconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

// 切换喜欢状态
const toggleFavorite = (songIndex) => {
    const song = songList.find(s => s.index === songIndex)
    if (song) {
        song.favorite = !song.favorite
        emit('update-playlist', songList)
    }
}

// 为每首歌曲添加索引
onMounted(() => {
    songList.forEach((song, index) => {
        song.index = index
    })
})
</script>

<style scoped lang="scss">
// 原有样式保持不变...
.song-list-component {
    padding: 3rem 0;
    --primary-red: #e60026;
    --primary-blue: #0c8ed3;
    --light-gray: #f8f8f8;
    --medium-gray: #f2f2f2;
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
                    @include text-color('text-color');
                }

                .playlist-tag {
                    background-color: var(--primary-red);
                    color: $general-white;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-size: 0.65rem;
                    font-weight: 600;
                }
            }

            .creator-info {
                @include flexCenter(row, center);
                gap: 0.5rem;
                @include text-color('text-sec-color');

                .creator-avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background-color: #ccc;
                }

                .creator-name {
                    font-weight: 500;
                }

                .create-date {
                    font-size: 13px;
                }
            }

            .stats {
                display: flex;
                gap: 1.5rem;
                padding-left: 0.5rem;
                @include text-color('text-sec-color');

                .stat-item {
                    font-size: 14px;
                }

                .stat-number {
                    font-weight: 600;
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
        font-size: 0.9rem;

        .songs-header {
            display: flex;
            padding: 0.75rem 1rem;
            padding-left: 0;
            font-weight: 600;
            border-bottom: 1px solid $general-white;
            font-size: 0.9rem;
            @include background('bg-gradient-color-start');
            @include text-color('text-color');
        }

        .song-index {
            width: 50px;
            text-align: center;
        }
    }

    .song-title {
        flex: 1.2;
    }

    .song-duration {
        width: 5rem;
        @include text-color('text-sec-color');
    }

    .song-artist {
        flex: 1.1;
        @include text-color('text-sec-color');
    }

    .song-album {
        flex: 1.1;
    }

    .song-control {
        flex: 1;
        @include flexCenter(row, center);
        gap: 0.4rem;
        margin-right: 2rem;

        .ant-tooltip-open {
            font-family: 'lmst' !important;
        }
    }

    .song-list {
        list-style: none;
        @include text-color('text-color');

        .song-item {
            @include flexCenter(row, center);
            padding: 0.6rem 1rem;
            padding-left: 0;
            border-bottom: 1px solid var(--border-color);
            transition: background-color 0.2s;

            &:hover {
                background-color: rgb(12, 142, 211, .2);
            }

            &.active {
                background-color: rgba(255, 0, 43, 0.1);
            }

        }
    }

    .song-index {
        @include text-color('text-sec-color');
    }

    .song-title-content {
        display: flex;
        align-items: center;
    }

    .play-icon {
        opacity: 0;
        transition: opacity 0.2s;
        width: 1.25rem;
        margin: 0 8px;

        img {
            width: 100%;
        }
    }

    .song-name {
        font-weight: 500;
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

// 新增动画样式
@keyframes pulse-glow {
    0% {
        box-shadow: 0 0 3px rgba(230, 0, 38, 0.3);
    }

    50% {
        box-shadow: 0 0 10px rgba(230, 0, 38, 0.6);
    }

    100% {
        box-shadow: 0 0 3px rgba(230, 0, 38, 0.3);
    }
}

@keyframes playing {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes text-glow {
    0% {
        text-shadow: 0 0 1px rgba(230, 0, 38, 0.5);
    }

    50% {
        text-shadow: 0 0 6px rgba(230, 0, 38, 0.8);
    }

    100% {
        text-shadow: 0 0 1px rgba(230, 0, 38, 0.5);
    }
}


// 激活状态样式
.song-item {
    border-left: 4px solid transparent;

    &.active {
        background-color: rgba(255, 0, 43, 0.1);
        border-color: var(--primary-red);


        // 文字发光效果
        .text-glow {
            animation: text-glow 10s ease-in-out infinite;
            color: var(--primary-red);
            font-weight: 600;
        }

        // 播放图标旋转动画
        .playing-animation {
            opacity: 1;
            animation: playing 4s linear infinite;
            filter: drop-shadow(0 0 2px var(--primary-red));
        }
    }

    // 脉冲动画效果
    &.pulse-animation {
        animation: pulse-glow 10s ease-in-out infinite;
    }
}
</style>