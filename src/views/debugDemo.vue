<template>
    <!-- 我喜欢 -->
    <div class="mine-favorite">
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
</template>

<style scoped lang="scss">
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
</style>