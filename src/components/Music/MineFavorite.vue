<template>
    <div v-if="songs.length" class="mine-favorite">
        <PlayList :current-song-index="currentSongIndex" :is-playing="isPlaying" :playlist-detail="playlistDetail"
            :songs="songs" @play-song="handlePlaySong" />
    </div>
    <div v-else class="loading-state">
        <a-spin tip="加载音乐中..." />
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '@/store/auth';
import utils from '@/utils/getAssetsFile';
import musicApi from '@/utils/musicApi';
import PlayList from '@/components/Music/common/PlayList.vue';

const userStore = useAuthStore();

const props = defineProps({
    currentSongIndex: { type: Number, default: -1 },
    isPlaying: { type: Boolean, default: false },
});

const emit = defineEmits(['play-song']);

function formatTime(timeString) {
    const date = new Date(timeString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
    });
}

// 歌单 ID 从环境变量获取，网易云「我喜欢的音乐」歌单
const PLAYLIST_ID = import.meta.env.VITE_MUSIC_PLAYLIST_ID;

const playlistDetail = reactive({}); //歌单信息
const songs = reactive([]); //歌曲列表

//从 API 加载歌单详情
async function loadPlaylistDetail() {
    const { data } = await musicApi.playlistDetail(PLAYLIST_ID);
    const info = data.playlist || {};
    Object.assign(playlistDetail, {
        title: info.name,
        tag: info.tags?.[0] || '歌单',
        creatorName: info.creator?.nickname || '',
        creatorAvatar: info.creator?.avatarUrl || '',
        createDate: formatTime(info.createTime) || '',
        playCount: info.playCount || 0,
        coverImage: info.coverImgUrl || '',
    });
}

// 从 API 加载歌单歌曲
async function loadFromPlaylist() {
    const { data } = await musicApi.playlistTrackAll(PLAYLIST_ID);
    return data.songs || data.playlist?.tracks || [];
}
// 批量获取播放 URL
async function loadSongUrls(trackIds) {
    const { data } = await musicApi.songUrl(trackIds.join(','));
    const map = {};
    (data.data || []).forEach((item) => { map[item.id] = item.url; });
    return map;
}

// 批量获取歌词
async function loadLyrics(trackIds) {
    const results = await Promise.allSettled(trackIds.map((id) => musicApi.lyric(id)));
    const map = {};
    results.forEach((r, i) => {
        if (r.status === 'fulfilled' && r.value.data?.lrc?.lyric) {
            map[trackIds[i]] = r.value.data.lrc.lyric;
        }
    });
    return map;
}

// 格式化歌曲数据
function formatSongs(tracks, urlMap, lyricMap) {
    return tracks.map((t, i) => ({
        id: t.id,
        picture: t.al?.picUrl || '',
        name: t.name,
        artist: (t.ar || []).map((a) => a.name).join(' / '),
        url: urlMap[t.id] || '',
        album: t.al?.name || '',
        lrc: lyricMap[t.id] || '',
        duration: (t.dt || 0) / 1000,
        index: i,
    }));
}

onMounted(async () => {
    try {
        await loadPlaylistDetail();
        const tracks = await loadFromPlaylist();
        const ids = tracks.map(t => t.id).slice(0, 50);    // 限制 50 首
        const [urlMap, lyricMap] = await Promise.all([
            loadSongUrls(ids),
            loadLyrics(ids),
        ]);
        const formatted = formatSongs(tracks.slice(0, 50), urlMap, lyricMap);
        songs.splice(0, songs.length, ...formatted);
    } catch (e) {
        console.error('歌单加载失败:', e);
    }
});


function handlePlaySong(payload) {
    emit('play-song', payload); //歌曲信息转发到上层组件（Music）触发播放
}
</script>
<style scoped>
.loading-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>