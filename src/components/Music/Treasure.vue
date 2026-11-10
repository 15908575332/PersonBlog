<template>
    <!-- 音乐馆  -->
    <div class="treasure">
        <h1>音乐馆</h1>
        <!-- 推荐节目 -->
        <div class="treasure-music">
            <div class="treasure-music-list">
                <div class="item" v-for="value in recommendProgramList">
                    <div class="item-content"><img class="music-cover" :src="value.coverUrl" alt="music-cover">
                    </div>
                </div>
            </div>
        </div>

        <!-- 独家放送 -->
        <div class="exclusive-music">
            <h2>独家放送></h2>
            <div class="exclusive-music-list">

                <div class="item" v-for="exclusive in exclusiveReleaseList">
                    <div class="item-content">
                        <img class="music-cover" :src="exclusive.coverUrl" alt="music-cover">
                        <span class="msk"></span>
                    </div>
                    <p class="music-introduce">{{ exclusive.copywriter }}</p>
                </div>
            </div>
        </div>

        <!-- 新歌速递 -->
        <div class="new-music">
            <h2>新歌速递</h2>
            <div class="new-music-list">
                <div class="item" v-for="(song, index) in newSongExpressList.slice(0, 12)" :key="song.id || index">
                    <div class="item-content">
                        <img class="music-cover" :src="song.coverUrl" alt="music-cover">
                        <span class="msk"></span>
                    </div>
                    <div class="music-introduce">
                        <p class="music-name">{{ song.name }}</p>
                        <p class="music-artist">{{ song.artistText }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import musicApi from "@/utils/musicApi";

/* ------------------------ 视图模型映射 ------------------------ */
// 模板只消费统一后的 name / artistText / coverUrl / copywriter，接口结构变动只改 mapper
const toProgramItem = (program) => ({
    id: program?.id,
    name: program?.name || '',
    coverUrl: program?.coverUrl || '',
});
const toExclusiveItem = (item) => ({
    id: item?.id,
    name: item?.name || '',
    coverUrl: item?.picUrl || '',
    copywriter: item?.copywriter || '',
});
const toNewSongItem = (song) => ({
    id: song?.id,
    name: song?.name || '',
    artistText: (song?.artists || []).map(item => item?.name).filter(Boolean).join(' / ') || '未知歌手',
    coverUrl: song?.album?.picUrl,
});

/* ------------------------ 推荐节目 ------------------------ */
const recommendProgramList = ref([]);
const recommendProgramFn = async () => {
    const { data } = await musicApi.recommendProgram();
    recommendProgramList.value = (data?.programs || []).map(toProgramItem);
}

/* ------------------------ 独家放送 ------------------------ */
const exclusiveReleaseList = ref([]);
const exclusiveReleaseFn = async () => {
    const { data } = await musicApi.exclusiveRelease();
    exclusiveReleaseList.value = (data?.result || []).map(toExclusiveItem);
}

/* ------------------------ 新歌速递 ------------------------ */
const newSongExpressList = ref([]);
const newSongExpressFn = async () => {
    try {
        const { data } = await musicApi.newSongExpress(8);
        newSongExpressList.value = (data?.data || []).map(toNewSongItem);
    } catch (error) {
        console.error("[新歌速递] 请求失败:", error);
        newSongExpressList.value = [];
    }
}

onMounted(async () => {
    await recommendProgramFn();
    await exclusiveReleaseFn();
    await newSongExpressFn();
})
</script>
<style scoped lang="scss">
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
    overflow: hidden;
    transition: transform 0.3s;

    &:hover {
        transform: translateY(-5px)
    }

    .item-content {
        @include boxshadow('shadow-card');

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .music-introduce {
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.7rem;
        padding-top: 0.5rem;
        @include text-color('text-color');
    }
}

// 推荐节目
.treasure {
    padding: 4rem 4rem 3rem;
    @include flexCenter(column, flex-start);
    gap: 1rem;

    // 推荐节目
    .treasure-music {
        width: 100%;

        .treasure-music-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
        }

        .item {
            position: relative;
            overflow: visible;

            &::after {
                content: '';
                display: block;
                width: 100%;
                height: 100%;
                background-image: url('@/assets/img/treasureBox/fkce44hbh.jpeg');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                border: 1px solid #999;
                position: absolute;
                top: -0.4rem;
                right: -0.4rem;
                z-index: -1;
            }

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
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 2rem;
        }

        .item {

            .item-content {
                position: relative;
                height: 5rem;
                width: 5rem;

                .music-cover {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: 20%;
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

            .music-introduce {
                width: 6rem;
                white-space: nowrap;
                /* 隐藏溢出内容 */
                overflow: hidden;
                /* 显示省略号 */
                text-overflow: ellipsis;
            }
        }
    }

    // 新歌速递
    .new-music {
        width: 100%;

        .new-music-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            gap: 1rem;
        }

        .item {
            @include flexCenter(row, flex-start);

            .item-content {
                height: 3rem;
                width: 3rem;
                overflow: hidden;
                border-radius: 0.2rem;
            }

            .music-introduce {
                display: inline-block;
                width: fit-content;
                font-size: 0.75rem;

                p {
                    padding: 0.2rem 0.5rem;
                }

                .music-artist {
                    @include text-color('text-sec-color');
                }
            }
        }
    }
}
</style>