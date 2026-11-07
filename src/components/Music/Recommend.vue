<template>
    <!-- 推荐 -->
    <div class="recommend">
        <h1>推荐</h1>

        <!-- 热门歌曲 -->
        <div class="rec-music">
            <h2>推荐歌曲></h2>
            <div class="rec-music-list">
                <div class="item" v-for="(song, index) in recommendSongs" :key="song.id">
                    <div class="item-content">
                        <!-- 费用角标：仅「会员」「付费」两档，其余用 no-badge 隐藏 ribbon -->
                        <a-badge-ribbon :class="{ 'no-badge': !song.badge }" :text="song.badge?.text"
                            :color="song.badge?.color">
                            <div class="cover-layer">
                                <img :src="song.picture" :alt="song.name">
                                <!-- 专辑名遮罩 -->
                                <span class="cover-album">[{{ song.album }}]</span>
                                <!-- 悬浮播放按钮 -->
                                <button class="play-btn" type="button"
                                    :title="`${isCurrentSong(song, index) && isPlaying ? '暂停' : '播放'} ${song.name}`"
                                    :class="{ active: isCurrentSong(song, index) }" @click.stop="handlePlay(index)">
                                    <svg v-if="isCurrentSong(song, index) && isPlaying"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        width="14" height="14">
                                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor" width="14" height="14">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                            </div>
                        </a-badge-ribbon>
                    </div>
                    <p class="music-introduce">{{ song.name }} - {{ song.artist }}</p>
                </div>
            </div>
        </div>

        <!-- 推荐歌单 -->
        <div class="hot-music">
            <h2>推荐歌单></h2>
            <div class="hot-music-list">
                <div class="item" v-for="value in recommendPlaylist">
                    <div class="item-content">
                        <img class="music-cover" :src="value.picUrl" alt="music-cover">
                        <span class="msk"></span>
                    </div>
                    <p class="music-introduce">{{ value.name }}</p>
                </div>
            </div>
        </div>

        <!-- 推荐电台 -->
        <div class="rec-playlist">
            <h2>推荐电台></h2>
            <div class="rec-menu-list">
                <div class="item">
                    <div class="item-content">
                        <img src="@/assets/img/treasureBox/musicList/recommend/10004.png" alt="">
                    </div>
                    <p class="music-introduce">Next To Me-ImagineDragons-Break Ups To Make Ups》</p>
                </div>
                <div class="item">
                    <div class="item-content">
                        <img src="@/assets/img/treasureBox/musicList/recommend/10011.png" alt="">
                    </div>
                    <p class="music-introduce">Hello Summer (Radio Edit)-Rameez</p>
                </div>
                <div class="item">
                    <div class="item-content">
                        <img src="@/assets/img/treasureBox/musicList/recommend/10005.png" alt="">
                    </div>
                    <p class="music-introduce">We Don't Belong-Dash Berlin/Haneri</p>
                </div>
                <div class="item">
                    <div class="item-content">
                        <img src="@/assets/img/treasureBox/musicList/recommend/10008.png" alt="">
                    </div>
                    <p class="music-introduce">爱就一个字（live）-张信哲/丁芙妮</p>
                </div>
                <div class="item">
                    <div class="item-content">
                        <img src="@/assets/img/treasureBox/musicList/recommend/10009.png" alt="">
                    </div>
                    <p class="music-introduce">Lone Ranger-Rachel Platten</p>
                </div>
                <div class="item">
                    <div class="item-content">
                        <img src="@/assets/img/treasureBox/musicList/recommend/10010.png" alt="">
                    </div>
                    <p class="music-introduce">把回忆拼好给你-王贰浪</p>
                </div>

            </div>
        </div>
        <!-- 推荐mv -->
        <div class="mv-video">
            <h2>推荐mv></h2>
            <div class="mv-video-list">
                <div class="item">
                    <div class="item-content">
                        <img class="music-cover" src="@/assets/img/treasureBox/musicList/treasure/treasure-mv-1.png"
                            alt="mv-cover">
                        <span class="msk"></span>
                    </div>
                    <div class="music-introduce">
                        <p class="music-name">Mute</p>
                        <p class="music-artist">孟美岐</p>
                    </div>
                </div>
                <div class="item">
                    <div class="item-content">
                        <img class="music-cover" src="@/assets/img/treasureBox/musicList/treasure/treasure-mv-2.png"
                            alt="mv-cover">
                        <span class="msk"></span>
                    </div>
                    <div class="music-introduce">
                        <p class="music-name">孟美岐</p>
                        <p class="music-artist">Shawn Mendes</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import musicApi from "@/utils/musicApi";

/* ------------------------ 费用角标映射 ------------------------ */
// fee：1=会员，4=付费；其余（0、8、缺失、未知）不展示角标
const FEE_BADGE_MAP = {
    1: { text: '会员', color: 'volcano' },
    4: { text: '付费', color: 'red' },
};

/* ------------------------ 组件入参 / 出参 ------------------------ */
const props = defineProps({
    currentSongIndex: { type: Number, default: -1 },
    isPlaying: { type: Boolean, default: false },
    // 父级当前播放歌曲 id，用于精确判定「播放中的是哪一张卡片」
    currentSongId: { type: [Number, String], default: null },
});
const emit = defineEmits(['play-song', 'toggle-play']);

/** ------------------------ 每日推荐歌曲 ------------------------ */
const recommendSongs = ref([]); //歌曲集合

// 批量获取播放地址
const getSongUrlMap = async (ids) => {
    if (!ids.length) return {};
    try {
        const { data } = await musicApi.songUrl(ids.join(','));
        const map = {};
        (data?.data || []).forEach(item => {
            map[item.id] = item.url || '';
        });
        return map;
    } catch (e) {
        console.warn("获取歌曲播放地址失败:", e);
        return {};
    }
};

const getRecommendSongs = async () => {
    try {
        const { data } = await musicApi.recommendSongs();
        // 1) 先打印整个响应，确认结构（data 是对象，不是 ref！）
        // console.log(JSON.stringify(data, null, 2));   // 打印 data

        // 2) 歌曲在 data.data.dailySongs 数组，映射成渲染用结构
        const dailySongs = data?.data?.dailySongs || [];
        const urlMap = await getSongUrlMap(dailySongs.map(s => s.id));

        recommendSongs.value = dailySongs.map(song => ({
            id: song.id,                       // 歌曲ID（播放/详情用）
            name: song.name,                   // 歌名
            artist: (song.ar || []).map(a => a.name).join('/'),  // 歌手
            picture: song.al?.picUrl,          // 封面图
            album: song.al?.name || '',        // 专辑名
            duration: song.dt ? song.dt / 1000 : 0,  // 时长（秒）
            fee: song.fee ?? null,             // 费用标识
            badge: FEE_BADGE_MAP[song.fee] || null,  // 角标配置，null 表示不展示
            url: urlMap[song.id] || '',        // 播放地址
        }));
    } catch (e) {
        console.error("获取每日推荐失败:", e);
    }
};

/**
 * 该卡片是否为「当前曲目」（正在播放 或 播放后暂停的那首）
 * 优先用歌曲 id 精确判定；父级未提供 id 时退化为索引判定
 */
const isCurrentSong = (song, index) => {
    if (!song) return false;
    if (props.currentSongId === null || props.currentSongId === undefined) {
        return props.currentSongIndex === index;
    }
    return String(song.id) === String(props.currentSongId);
};

// 点击封面播放按钮
const handlePlay = (index) => {
    const song = recommendSongs.value[index];
    if (!song) return;
    // 点到当前曲目：交给父级切换播放与暂停（暂停后继续，不重新取地址，不从头播）
    if (isCurrentSong(song, index)) {
        emit('toggle-play', {
            song,
            playlist: recommendSongs.value,
            startIndex: index,
        });
        return;
    }
    if (!song.url) {
        console.warn("该歌曲暂无可用播放地址:", song.name);
        return;
    }
    emit('play-song', {
        song,
        playlist: recommendSongs.value,
        startIndex: index,
    });
};


/** ------------------------ 推荐歌单 ------------------------ */
const recommendPlaylist = ref([]); //歌单集合
const loading = ref(false);

const getRecommendPlaylist = async () => {
    loading.value = true;
    try {
        const { data } = await musicApi.recommendPlaylist();
        // /personalized 接口返回 data.result 数组，每项含 id / name / picUrl / playCount
        recommendPlaylist.value = data?.result || [];
    } catch (e) {
        console.error("获取推荐歌单失败:", e);
    } finally {
        loading.value = false;
    }
}
/** ------------------------ 推荐MV ------------------------ */
const recommendMV = ref([]);
onMounted(async () => {
    await getRecommendSongs();
    await getRecommendPlaylist();
})
</script>
<style lang="scss" scoped>
// 大标题
h1 {
    width: 100%;
    font-size: 2rem;
    font-weight: bold;
    @include text-color('text-color');
}

// 二级标题
h2 {
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 0;
    @include text-color('text-sec-color');
}

// 每项内容
.item {
    border-radius: 0.5rem;
    @include boxshadow('shadow-card');
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        box-shadow: none;
        transform: translateY(5px);

        // 必须比基础规则（.item .cover-layer .play-btn，特异性 0,4,0）更具体一级，
        // 否则同特异性下会被后面定义的 opacity:0 / translateY(.25rem) 覆盖，导致悬浮不显示
        .cover-layer {

            .cover-album,
            .play-btn {
                opacity: 1;
            }

            .play-btn {
                transform: translateY(0);
            }
        }
    }

    .item-content {
        position: relative;
        border-radius: 0.5rem;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50%;
        }

        // 无角标（免费/未知）时隐藏 ribbon；a-badge-ribbon 的 class 落在 .ant-ribbon 自身
        :deep(.ant-ribbon.no-badge) {
            display: none;
        }
    }

    // 封面层：承载封面图、专辑名遮罩与悬浮播放按钮
    .cover-layer {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
        overflow: hidden;

        img {
            display: block;
        }

        // 专辑名遮罩（悬浮显示）
        .cover-album {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0.25rem 2.8rem 0.25rem 0.5rem;
            font-size: 0.7rem;
            line-height: 1.4;
            color: #fff;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
            font-family: var(--app-font-family);

        }

        // 悬浮播放按钮
        .play-btn {
            position: absolute;
            right: 0.5rem;
            bottom: 0.5rem;
            width: 1.8rem;
            height: 1.8rem;
            padding: 0;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.55);
            opacity: 0;
            transform: translateY(0.25rem);
            transition: opacity 0.3s, transform 0.3s, background-color 0.3s;

            &:hover {
                background-color: rgba(0, 0, 0, 0.8);
            }

            &.active {
                opacity: 1;
                // 播放中的按钮常驻显示，需归位，避免残留 translateY 偏移
                transform: translateY(0);
                background-color: themed('primary-sub');
            }
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
        padding: 0.5rem;
        @include text-color('text-color');
    }
}

//推荐
.recommend {
    padding: 4rem 4rem 3rem;
    @include flexCenter(column, flex-start);
    gap: 1rem;

    // 推荐歌曲
    .rec-music {
        width: 100%;

        .rec-music-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
        }

        .item {
            // 推荐歌曲卡片：悬浮只保留阴影变化，不再整体下移
            transition: box-shadow 0.3s;

            &:hover {
                transform: none;
                box-shadow: none;
            }

            .item-content {
                height: 7rem;
                overflow: visible; // 让 ribbon 折角不被裁切
            }

            // antd ribbon 包裹层撑满封面高度
            :deep(.ant-ribbon-wrapper) {
                height: 100%;
            }

            // 小卡片内 ribbon 字号微调（底色仍交给 antd 预设色）
            :deep(.ant-ribbon) {
                font-size: 0.7rem;
                font-family: var(--app-font-family);

            }
        }
    }

    // 热门歌曲
    .hot-music {
        width: 100%;

        .hot-music-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
        }

        .item {

            .item-content {
                overflow: hidden;
                height: 9rem;
            }

        }
    }

    // 推荐歌单
    .rec-playlist {
        width: 100%;

        .rec-menu-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;

            .item {
                .item-content {
                    height: 10rem;
                    min-height: 5rem;
                    overflow: hidden;
                }
            }
        }
    }

    // 视频MV
    .mv-video {
        width: 100%;

        .mv-video-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 1rem;
        }

        .item {
            .item-content {
                height: 10rem;
                overflow: hidden;

            }

        }
    }
}
</style>