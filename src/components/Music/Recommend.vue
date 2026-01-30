<template>
    <!-- 推荐 -->
    <div class="recommend">
        <h1>推荐</h1>
        <!-- 推荐歌曲 -->
        <div class="rec-music">
            <h2>推荐歌曲></h2>
            <div class="rec-music-list">
                <div class="item">
                    <div class="item-content"><img class="music-cover"
                            src="@/assets/img/treasureBox/musicList/treasure/treasure-carousel-1.png" alt="music-cover">
                    </div>
                </div>
                <div class="item">
                    <div class="item-content"><img class="music-cover"
                            src="@/assets/img/treasureBox/musicList/treasure/treasure-carousel-2.png" alt="music-cover">
                    </div>
                </div>
                <div class="item">
                    <div class="item-content"><img class="music-cover"
                            src="@/assets/img/treasureBox/musicList/treasure/treasure-carousel-3.png" alt="music-cover">
                    </div>
                </div>
                <div class="item">
                    <div class="item-content"><img class="music-cover"
                            src="@/assets/img/treasureBox/musicList/treasure/treasure-carousel-4.png" alt="music-cover">
                    </div>
                </div>
            </div>
        </div>
        <!-- 热门歌曲 -->
        <div class="hot-music">
            <h2>热门歌曲></h2>
            <div class="hot-music-list">
                <div class="item">
                    <div class="item-content">
                        <img class="music-cover" src="@/assets/img/treasureBox/musicList/recommend/recommend-hot-1.png"
                            alt="music-cover">
                        <span class="msk"></span>
                    </div>
                    <p class="music-introduce">《超级面对面》第254期 keshi：我的音乐永远新鲜</p>
                </div>
                <div class="item">
                    <div class="item-content">
                        <img class="music-cover" src="@/assets/img/treasureBox/musicList/recommend/recommend-hot-2.png"
                            alt="music-cover">
                        <span class="msk"></span>
                    </div>
                    <p class="music-introduce">《超级面对面》第253期 Charlie Puth：灵感就在开关之间</p>
                </div>
                <div class="item">
                    <div class="item-content">
                        <img class="music-cover" src="@/assets/img/treasureBox/musicList/recommend/recommend-hot-3.png"
                            alt="music-cover">
                        <span class="msk"></span>
                    </div>
                    <p class="music-introduce">惊喜呈现| 姜贞羽：热爱舞台上的每一个瞬间</p>
                </div>
                <div class="item">
                    <div class="item-content">
                        <img class="music-cover" src="@/assets/img/treasureBox/musicList/recommend/recommend-hot-4.png"
                            alt="music-cover">
                        <span class="msk"></span>
                    </div>
                    <p class="music-introduce">惊喜呈现：Yamy郭颖携手二手玫瑰玩转港味复古风</p>
                </div>
            </div>
        </div>
        <!-- 推荐歌单 -->
        <div class="rec-playlist">
            <h2>推荐歌单></h2>
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
        padding-top: 0.5rem;
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
            grid-template-columns: repeat(3, minmax(400px, 1fr));
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
            grid-template-columns: repeat(4, minmax(200px, 1fr));
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
            grid-template-columns: repeat(6, minmax(120px, 1fr));
            gap: 1rem;

            .item {
                padding: 0.5rem;

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
            grid-template-columns: repeat(3, minmax(250px, 1fr));
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