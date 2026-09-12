<template>
    <!-- 推荐 -->
    <div class="recommend">
        <h1>推荐</h1>

        <!-- 热门歌曲 -->
        <div class="rec-music">
            <h2>推荐歌曲></h2>
            <div class="rec-music-list">
                <div class="item" v-for="song in recommendSongs" :key="song.id">
                    <div class="item-content">
                        <img :src="song.picture" :alt="song.name">
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

/** ------------------------ 每日推荐歌曲 ------------------------ */
const recommendSongs = ref([]); //歌曲集合

const getRecommendSongs = async () => {
    try {
        const { data } = await musicApi.recommendSongs();
        // 1) 先打印整个响应，确认结构（data 是对象，不是 ref！）
        console.log(JSON.stringify(data, null, 2));   // 打印 data

        // 2) 歌曲在 data.dailySongs 数组，映射成渲染用结构
        recommendSongs.value = (data?.data?.dailySongs || []).map(song => ({
            id: song.id,                       // 歌曲ID（播放/详情用）
            name: song.name,                   // 歌名
            artist: (song.ar || []).map(a => a.name).join('/'),  // 歌手
            picture: song.al?.picUrl,          // 封面图
            duration: song.dt ? song.dt / 1000 : 0,  // 时长（秒）
        }));
    } catch (e) {
        console.error("获取每日推荐失败:", e);
    }
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
        console.log(recommendPlaylist.value)
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
    }

    .item-content {
        border-radius: 0.5rem;

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
            .item-content {
                height: 7rem;
                overflow: hidden;
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