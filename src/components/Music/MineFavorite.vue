<template>
    <PlayList :current-song-index="currentSongIndex" :is-playing="isPlaying" :playlist-data="playlistData"
        :songs="songList" @play-song="handlePlaySong" />
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useAuthStore } from "@/store/auth";
const userStore = useAuthStore();
import utils from "@/utils/getAssetsFile";
import PlayList from '@/components/Music/common/PlayList.vue'

// 接收父组件传递的 props
const props = defineProps({
    currentSongIndex: {
        type: Number,
        default: -1
    },
    isPlaying: {
        type: Boolean,
        default: false
    }
})

function formatTime(timeString) { //时间格式化
    const date = new Date(timeString)
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const emit = defineEmits(['play-song'])
console.log(userStore.user)
// 歌单头部数据配置
const playlistData = {
    title: "我喜欢的音乐",
    tag: "歌单",
    creatorName: userStore.user.username,
    creatorAvatar: userStore.user.avatarUrl,
    createDate: formatTime(userStore.user.registerTime),
    playCount: 1603,
    coverImage: utils.getAssetsFile("img/treasureBox/0.jpg")
}

// 歌曲数据
import song1 from "@/assets/music/song1.mp3";
import song2 from "@/assets/music/song2.mp3";
import song3 from "@/assets/music/song3.mp3";
import song4 from "@/assets/music/song4.mp3";
import song5 from "@/assets/music/song5.mp3";
import song6 from "@/assets/music/song6.mp3";

const songList = reactive([
    {
        id: 1,
        picture: utils.getAssetsFile("img/treasureBox/0.jpg"),
        name: "美丽的神话",
        artist: "成龙、金喜善",
        url: song1,
        album: '《神话》',
        lrc: utils.getAssetsFile("music/song1.lrc"),
        favorite: true
    },
    {
        id: 2,
        picture: utils.getAssetsFile("img/treasureBox/1.jpg"),
        name: "风中芭蕾",
        artist: "郁可唯",
        url: song2,
        lrc: utils.getAssetsFile("music/song2.lrc"),
    },
    {
        id: 3,
        picture: utils.getAssetsFile("img/treasureBox/2.jpg"),
        name: "梁静茹",
        artist: "宁夏",
        url: song3,
        lrc: utils.getAssetsFile("music/song3.lrc"),
    },
    {
        id: 4,
        picture: utils.getAssetsFile("img/treasureBox/3.jpg"),
        name: "神话情话",
        artist: "齐豫、周华健",
        url: song4,
        lrc: utils.getAssetsFile("music/song4.lrc"),
    },
    {
        id: 5,
        picture: utils.getAssetsFile("img/treasureBox/default.jpg"),
        name: "漂泊的情人",
        artist: "叶微岚",
        url: song5,
    },
    {
        id: 6,
        picture: '',
        name: "我记得你眼里的依恋",
        artist: "音乐磁场",
        url: song6,
    }
])

// 为每首歌曲添加索引
songList.forEach((song, index) => {
    song.index = index;
})

// 处理播放事件
const handlePlaySong = (payload) => {
    emit('play-song', payload)
}

// 音频时长加载
const loadAudioDuration = async () => {
    for (const song of songList) {
        const audio = new Audio(song.url);
        await new Promise((resolve) => {
            audio.addEventListener("loadedmetadata", () => {
                song.duration = audio.duration;
                resolve();
            });
            audio.load();
        });
    }
}

onMounted(async () => {
    await loadAudioDuration();
})
</script>