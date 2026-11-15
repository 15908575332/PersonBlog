<template>
    <!-- 音乐馆  -->
    <div class="treasure">
        <h1>音乐馆</h1>
        <!-- 推荐节目 -->
        <div class="treasure-music">
            <div class="treasure-music-list">
                <div class="item" v-for="value in recommendProgramList">
                    <div class="item-content">
                        <LazyImage class="music-cover" :src="value.coverUrl" alt="music-cover" />
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
                        <LazyImage class="music-cover" :src="exclusive.coverUrl" alt="music-cover" />
                        <span class="msk"></span>
                    </div>
                    <p class="music-introduce">{{ exclusive.copywriter }}</p>
                </div>
            </div>
        </div>

        <!-- 新歌速递 -->
        <div class="new-music">
            <div class="new-music-header">
                <h2>新歌速递</h2>
                <a-select v-model:value="newSongRegion" class="region-select" size="small" :options="REGION_OPTIONS"
                    :loading="newSongLoading" :disabled="newSongLoading" popup-class-name="region-select-dropdown"
                    @change="handleRegionChange" />
            </div>
            <a-spin :spinning="newSongLoading" size="small">
                <div class="new-music-list">
                    <div class="item" v-for="(song, index) in newSongExpressList.slice(0, 12)" :key="song.id || index">
                        <div class="item-content">
                            <LazyImage class="music-cover" :src="song.coverUrl" alt="music-cover" />
                            <span class="msk"></span>
                        </div>
                        <div class="music-introduce">
                            <p class="music-name">{{ song.name }}</p>
                            <p class="music-artist">{{ song.artistText }}</p>
                        </div>
                    </div>
                </div>
            </a-spin>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import musicApi from "@/utils/musicApi";

/* ------------------------ 视图模型映射 ------------------------ */
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
// 地区筛选项：value 为接口 /top/song 的 type 参数
const REGION_OPTIONS = [
    { value: 0, label: '全部' },
    { value: 7, label: '华语' },
    { value: 96, label: '欧美' },
    { value: 8, label: '日本' },
    { value: 16, label: '韩国' },
];
// 默认地区
const DEFAULT_REGION = 0;
const newSongRegion = ref(DEFAULT_REGION);
const newSongLoading = ref(false);
const newSongExpressList = ref([]);
let newSongRequestId = 0;
const newSongExpressFn = async (type = newSongRegion.value) => {
    const requestId = ++newSongRequestId;
    newSongLoading.value = true;
    try {
        const { data } = await musicApi.newSongExpress(type);
        // 仅采纳最后一次请求结果，避免快速切换时旧响应覆盖新数据
        if (requestId !== newSongRequestId) return;
        newSongExpressList.value = (data?.data || []).map(toNewSongItem);
    } catch (error) {
        // 失败时保留上一次成功的数据
        console.error("[新歌速递] 请求失败:", error);
    } finally {
        if (requestId === newSongRequestId) newSongLoading.value = false;
    }
}
const handleRegionChange = (value) => {
    newSongExpressFn(value);
}

onMounted(async () => {
    await recommendProgramFn();
    await exclusiveReleaseFn();
    await newSongExpressFn();
})

</script>
<style scoped lang="scss">
/* ------------------------ 间距与标题尺度 ------------------------ */
// 间距阶梯（1rem = 20px @1440 视口）
$space-1: 0.5rem;
$space-2: 1rem;
$space-3: 1.5rem;
// 语义变量：区块间距、分隔线后内距、标题与内容间距
$section-gap: $space-3;
$section-pad-top: $space-3;
$section-pad-bottom: $space-2;
$title-to-body: $space-2;
$title-inset: 0.75rem;
$title-size: 1.125rem;
$title-tracking: 0.02em;
// 标题左侧 accent 竖条
$accent-bar-width: 3px;
$accent-bar-height: 1em;
$accent-bar-radius: 2px;
$accent-bar-offset: 0em;

// 大标题
h1 {
    width: 100%;
    font-size: 2rem;
    font-weight: bold;
    @include text-color('text-color');
}

// 二级标题：字号/字重/字距分层，左侧留出 accent 竖条位置
h2 {
    position: relative;
    font-size: $title-size;
    font-weight: bold;
    letter-spacing: $title-tracking;
    padding: 0 0 $title-to-body $title-inset;
    @include text-color('text-color');

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: $accent-bar-offset;
        width: $accent-bar-width;
        height: $accent-bar-height;
        border-radius: $accent-bar-radius;
        background-color: themed('color-accent');
    }
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
    // 区块间距的唯一来源（1.5rem = 30px），不再用 padding-top 二次叠加
    gap: $section-gap;

    // 区块间分隔线：仅从第二个内容区块起生效，上内距只补线下方呼吸量
    >.exclusive-music,
    >.new-music {
        border-top: 1px solid themed('border-default');
        padding-top: $space-1;
        padding-bottom: $section-pad-bottom;
    }

    // 推荐节目
    .treasure-music {
        width: 100%;
        padding-bottom: $section-pad-bottom;

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
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
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
                white-space: wrap;
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

        // 标题行：标题与地区筛选控件同一行、右侧对齐
        .new-music-header {
            padding: 0 0 $title-to-body 0;
            @include flexCenter(row, space-between);
            gap: 1rem;

            h2 {
                // 保留左内距给 accent 竖条，其余方向归零
                padding: 0 0 0 $title-inset;
            }
        }

        // 地区筛选控件（配色统一走 themed() 主题变量）
        .region-select {
            flex: none;
            width: 4.5rem;

            :deep(.ant-select-selector) {
                background-color: themed("card-background") !important;
                border: 1px solid themed("border-default") !important;
                border-radius: 0.5rem !important;
                @include theme-transition();
                border-radius: 0.2rem !important;
                font-family: var(--app-font-family);
                font-size: 0.8rem;

            }

            :deep(.ant-select-selection-item) {
                color: themed("text-color");
            }

            :deep(.ant-select-arrow) {
                color: themed("text-sec-color");
            }

            &:hover :deep(.ant-select-selector) {
                border-color: themed("color-accent") !important;
            }
        }

        // 加载态容器撑满，避免 spinner 包裹导致宽度塌陷
        :deep(.ant-spin-nested-loading),
        :deep(.ant-spin-container) {
            width: 100%;
        }

        .new-music-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            gap: 1rem;
            font-family: var(--app-font-family);
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

// 地区筛选下拉面板挂载在 body 下，需用全局选择器适配主题
:global(.region-select-dropdown) {
    background-color: themed("card-background");
    border-radius: 0.5rem;
    padding: 0.25rem;
    box-shadow: themed("shadow-card");
    @include theme-transition();
}

:global(.region-select-dropdown .ant-select-item) {
    color: themed("text-color");
    font-size: 0.75rem;
    border-radius: 0.25rem;
    border-radius: 0;
    font-family: var(--app-font-family);
    border-radius: 0.2rem;
}

:global(.region-select-dropdown .ant-select-item-option-active) {
    background-color: themed("color-accent-soft");
}

:global(.region-select-dropdown .ant-select-item-option-selected) {
    background-color: themed("color-accent-soft");
    color: themed("color-accent");
    font-weight: 500;
}
</style>