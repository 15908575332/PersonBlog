<template>
    <div id="helpLink">
        <!-- 导航栏 -->
        <div class="navigation">
            <Navigation hoverBgColor="#ecf8ff" textColor="#585858"></Navigation>
        </div>

        <div class="trends_nav">
            <h1>友情链接</h1>
            <video src="@/assets/videos/recordContentBack.mp4" autoplay loop></video>
        </div>
        <!-- 信封 -->
        <div id="envelope">
            <div id='form_wrap' @click="click_env">
                <form>
                    <div class="welImg">
                        <img src="@/assets/img/public/envelopeCover.jpg" alt="welImg">
                    </div>
                    <div class="content">
                        <div class="item">
                            <label for="name">名称：</label>
                            <input type="text" name="name" id="name"></input>
                        </div>

                        <div class="item">
                            <label for="introduct">简介：</label>
                            <textarea type="text" name="introduct" id="introduct"></textarea>
                        </div>

                        <div class="item">
                            <label for="cover">封面：</label>
                            <input type="text" name="cover" id="cover" />
                        </div>

                        <div class="item">
                            <label for="cover">网址：</label>
                            <input type="text" name="cover" id="cover" />
                        </div>
                    </div>

                    <div class="img_item">
                        <button>提交</button>
                        <img style="width: 26.5rem;" src="@/assets/img/public/friendLetterBiLi.png" alt="">
                    </div>
                </form>
            </div>
        </div>
        <!-- module -->
        <div class="module_container">
            <!-- 本站信息 -->
            <div class="site_info">
                <div class="title">
                    <h1>🌸本站信息</h1>
                </div>
                <ul>
                    <li>网站名称: POETIZE</li>
                    <li>网址: https://poetize.cn</li>
                    <li>头像: https://s1.ax1x.com/2022/11/10/z9E7X4.jpg</li>
                    <li>描述: 这是一个 Vue2 Vue3 与 SpringBoot 结合的产物～</li>
                    <li> 网站封面: https://s1.ax1x.com/2022/11/10/z9VlHs.png</li>
                </ul>
            </div>
            <!-- 申请方式 -->
            <div class="apply">
                <div class="title">
                    <h1>🌸申请方式</h1>
                </div>
                <ul>
                    <li>点击上方信封✨✨✨</li>
                    <li>不会添加带有广告营销和没有实质性内容的友链🚫🚫🚫</li>
                    <li>申请之前请将本网站添加为您的友链哦🎟️🎟️🎟️</li>
                </ul>
            </div>
        </div>
        <!-- 内容 -->
        <div class="content_container">
            <hr>
            <h1>💯发布订阅</h1>
            <ul>
                <li data-aos="zoom-in">
                    <figure class="c4-izmir c4-border-ccc-3 c4-image-pan-up c4-gradient-bottom-right">
                        <img src="https://www.gerenzhuye.com/static/webAvatar/feiyu11727577846842327.jpg"
                            alt="Sample Image">
                        <figcaption>
                            <div class="c4-reveal-down c4-delay-200">
                                <h4>
                                    个人主页网
                                </h4>
                            </div>
                            <div class="c4-reveal-left c4-delay-400">
                                <h4>
                                    Sample Text
                                </h4>
                            </div>
                        </figcaption>
                    </figure>
                    <div class="info">
                        <h1>个人主页网</h1>
                        <p class="introduce">丰富的个人主页源码和模板</p>
                        <div class="fillIn">
                            <svg data-v-de616464="" viewBox="0 0 1024 1024" width="14" height="14">
                                <path data-v-de616464=""
                                    d="M768 213.333333h-42.666667V170.666667c0-25.6-17.066667-42.666667-42.666666-42.666667s-42.666667 17.066667-42.666667 42.666667v42.666666H384V170.666667c0-25.6-17.066667-42.666667-42.666667-42.666667s-42.666667 17.066667-42.666666 42.666667v42.666666H256C183.466667 213.333333 128 268.8 128 341.333333v426.666667c0 72.533333 55.466667 128 128 128h512c72.533333 0 128-55.466667 128-128V341.333333c0-72.533333-55.466667-128-128-128z m42.666667 554.666667c0 25.6-17.066667 42.666667-42.666667 42.666667H256c-25.6 0-42.666667-17.066667-42.666667-42.666667v-256h597.333334v256zM213.333333 426.666667V341.333333c0-25.6 17.066667-42.666667 42.666667-42.666666h42.666667v42.666666c0 25.6 17.066667 42.666667 42.666666 42.666667s42.666667-17.066667 42.666667-42.666667V298.666667h256v42.666666c0 25.6 17.066667 42.666667 42.666667 42.666667s42.666667-17.066667 42.666666-42.666667V298.666667h42.666667c25.6 0 42.666667 17.066667 42.666667 42.666666v85.333334H213.333333z"
                                    fill="#797979"></path>
                                <path data-v-de616464=""
                                    d="M341.333333 682.666667h341.333334c25.6 0 42.666667-17.066667 42.666666-42.666667s-17.066667-42.666667-42.666666-42.666667H341.333333c-25.6 0-42.666667 17.066667-42.666666 42.666667s17.066667 42.666667 42.666666 42.666667z"
                                    fill="#797979"></path>
                            </svg>
                            <p>2025-03-31</p>
                        </div>
                    </div>
                </li>
                <li data-aos="zoom-in">
                    <figure class="c4-izmir c4-border-ccc-3 c4-image-pan-up c4-gradient-bottom-right">
                        <img src="https://s21.ax1x.com/2024/11/24/pAhC3u9.png" alt="">
                        <figcaption>
                            <div class="c4-reveal-down c4-delay-200">
                                <h4>
                                    巴图虎
                                </h4>
                            </div>
                            <div class="c4-reveal-left c4-delay-400">
                                <h4>
                                    Sample Text
                                </h4>
                            </div>

                        </figcaption>
                    </figure>
                    <div class="info">
                        <h1>巴图虎</h1>
                        <p class="introduce">本站为技术资源分享，致力于网络发展</p>
                        <div class="fillIn">
                            <svg data-v-de616464="" viewBox="0 0 1024 1024" width="14" height="14">
                                <path data-v-de616464=""
                                    d="M768 213.333333h-42.666667V170.666667c0-25.6-17.066667-42.666667-42.666666-42.666667s-42.666667 17.066667-42.666667 42.666667v42.666666H384V170.666667c0-25.6-17.066667-42.666667-42.666667-42.666667s-42.666667 17.066667-42.666666 42.666667v42.666666H256C183.466667 213.333333 128 268.8 128 341.333333v426.666667c0 72.533333 55.466667 128 128 128h512c72.533333 0 128-55.466667 128-128V341.333333c0-72.533333-55.466667-128-128-128z m42.666667 554.666667c0 25.6-17.066667 42.666667-42.666667 42.666667H256c-25.6 0-42.666667-17.066667-42.666667-42.666667v-256h597.333334v256zM213.333333 426.666667V341.333333c0-25.6 17.066667-42.666667 42.666667-42.666666h42.666667v42.666666c0 25.6 17.066667 42.666667 42.666666 42.666667s42.666667-17.066667 42.666667-42.666667V298.666667h256v42.666666c0 25.6 17.066667 42.666667 42.666667 42.666667s42.666667-17.066667 42.666666-42.666667V298.666667h42.666667c25.6 0 42.666667 17.066667 42.666667 42.666666v85.333334H213.333333z"
                                    fill="#797979"></path>
                                <path data-v-de616464=""
                                    d="M341.333333 682.666667h341.333334c25.6 0 42.666667-17.066667 42.666666-42.666667s-17.066667-42.666667-42.666666-42.666667H341.333333c-25.6 0-42.666667 17.066667-42.666666 42.666667s17.066667 42.666667 42.666666 42.666667z"
                                    fill="#797979"></path>
                            </svg>
                            <p>2025-03-31</p>
                        </div>
                    </div>
                </li>
                <li data-aos="zoom-in">
                    <figure class="c4-izmir c4-border-ccc-3 c4-image-pan-up c4-gradient-bottom-right">
                        <img src="https://xn--boqy28c.cn/img/%E5%90%8E%E5%8F%B0/" alt="">
                        <figcaption>
                            <div class="c4-reveal-down c4-delay-200">
                                <h4>
                                    两颗西柚
                                </h4>
                            </div>
                            <div class="c4-reveal-left c4-delay-400">
                                <h4>
                                    Sample Text
                                </h4>
                            </div>
                        </figcaption>
                    </figure>
                    <div class=" info">
                        <h1>两颗西柚</h1>
                        <p class="introduce">一个记录摄影、旅游、生活、程序的个人博客网站</p>
                        <div class="fillIn">
                            <svg data-v-de616464="" viewBox="0 0 1024 1024" width="14" height="14">
                                <path data-v-de616464=""
                                    d="M768 213.333333h-42.666667V170.666667c0-25.6-17.066667-42.666667-42.666666-42.666667s-42.666667 17.066667-42.666667 42.666667v42.666666H384V170.666667c0-25.6-17.066667-42.666667-42.666667-42.666667s-42.666667 17.066667-42.666666 42.666667v42.666666H256C183.466667 213.333333 128 268.8 128 341.333333v426.666667c0 72.533333 55.466667 128 128 128h512c72.533333 0 128-55.466667 128-128V341.333333c0-72.533333-55.466667-128-128-128z m42.666667 554.666667c0 25.6-17.066667 42.666667-42.666667 42.666667H256c-25.6 0-42.666667-17.066667-42.666667-42.666667v-256h597.333334v256zM213.333333 426.666667V341.333333c0-25.6 17.066667-42.666667 42.666667-42.666666h42.666667v42.666666c0 25.6 17.066667 42.666667 42.666666 42.666667s42.666667-17.066667 42.666667-42.666667V298.666667h256v42.666666c0 25.6 17.066667 42.666667 42.666667 42.666667s42.666667-17.066667 42.666666-42.666667V298.666667h42.666667c25.6 0 42.666667 17.066667 42.666667 42.666666v85.333334H213.333333z"
                                    fill="#797979"></path>
                                <path data-v-de616464=""
                                    d="M341.333333 682.666667h341.333334c25.6 0 42.666667-17.066667 42.666666-42.666667s-17.066667-42.666667-42.666666-42.666667H341.333333c-25.6 0-42.666667 17.066667-42.666666 42.666667s17.066667 42.666667 42.666666 42.666667z"
                                    fill="#797979"></path>
                            </svg>
                            <p>2025-03-31</p>
                        </div>
                    </div>
                </li>
                <li data-aos="zoom-in">
                    <figure class="c4-izmir c4-border-ccc-3 c4-image-pan-up c4-gradient-bottom-right">
                        <img src="https://file.corrain.top/bg.jpg" alt="">
                        <figcaption>
                            <div class="c4-reveal-down c4-delay-200">
                                <h4>
                                    星语心迹
                                </h4>
                            </div>
                            <div class="c4-reveal-left c4-delay-400">
                                <h4>
                                    Sample Text
                                </h4>
                            </div>

                        </figcaption>
                    </figure>
                    <div class="info">
                        <h1>星语心迹</h1>
                        <p class="introduce">
                            星语心迹，一个温柔邂逅心灵深处的博客网站，旨在汇聚万千思绪，编织成夜空中最亮的星河。在这里，每一位访客都能找到一片属于自己的心灵栖息地，倾听内心的声音，分享生活的点滴感悟。我们相信，每个人的心灵都有一段独特而深刻的旅程，而文字，则是这趟旅途
                        </p>
                        <div class="fillIn">
                            <svg data-v-de616464="" viewBox="0 0 1024 1024" width="14" height="14">
                                <path data-v-de616464=""
                                    d="M768 213.333333h-42.666667V170.666667c0-25.6-17.066667-42.666667-42.666666-42.666667s-42.666667 17.066667-42.666667 42.666667v42.666666H384V170.666667c0-25.6-17.066667-42.666667-42.666667-42.666667s-42.666667 17.066667-42.666666 42.666667v42.666666H256C183.466667 213.333333 128 268.8 128 341.333333v426.666667c0 72.533333 55.466667 128 128 128h512c72.533333 0 128-55.466667 128-128V341.333333c0-72.533333-55.466667-128-128-128z m42.666667 554.666667c0 25.6-17.066667 42.666667-42.666667 42.666667H256c-25.6 0-42.666667-17.066667-42.666667-42.666667v-256h597.333334v256zM213.333333 426.666667V341.333333c0-25.6 17.066667-42.666667 42.666667-42.666666h42.666667v42.666666c0 25.6 17.066667 42.666667 42.666666 42.666667s42.666667-17.066667 42.666667-42.666667V298.666667h256v42.666666c0 25.6 17.066667 42.666667 42.666667 42.666667s42.666667-17.066667 42.666666-42.666667V298.666667h42.666667c25.6 0 42.666667 17.066667 42.666667 42.666666v85.333334H213.333333z"
                                    fill="#797979"></path>
                                <path data-v-de616464=""
                                    d="M341.333333 682.666667h341.333334c25.6 0 42.666667-17.066667 42.666666-42.666667s-17.066667-42.666667-42.666666-42.666667H341.333333c-25.6 0-42.666667 17.066667-42.666666 42.666667s17.066667 42.666667 42.666666 42.666667z"
                                    fill="#797979"></path>
                            </svg>
                            <p>2025-03-31</p>
                        </div>
                    </div>
                </li>
                <li data-aos="zoom-in">
                    <figure class="c4-izmir c4-border-ccc-3 c4-image-pan-up c4-gradient-bottom-right">
                        <img src="https://blog.qiushaodong.top/static/webAvatar/Sara11719116679859717.jpg" alt="">
                        <figcaption>
                            <div class="c4-reveal-down c4-delay-200">
                                <h4>
                                    三岁就很酷
                                </h4>
                            </div>
                            <div class="c4-reveal-left c4-delay-400">
                                <h4>
                                    Sample Text
                                </h4>
                            </div>
                        </figcaption>
                    </figure>
                    <div class="info">
                        <h1>三岁就很酷</h1>
                        <p class="introduce">个人博客</p>
                        <div class="fillIn">
                            <svg data-v-de616464="" viewBox="0 0 1024 1024" width="14" height="14">
                                <path data-v-de616464=""
                                    d="M768 213.333333h-42.666667V170.666667c0-25.6-17.066667-42.666667-42.666666-42.666667s-42.666667 17.066667-42.666667 42.666667v42.666666H384V170.666667c0-25.6-17.066667-42.666667-42.666667-42.666667s-42.666667 17.066667-42.666666 42.666667v42.666666H256C183.466667 213.333333 128 268.8 128 341.333333v426.666667c0 72.533333 55.466667 128 128 128h512c72.533333 0 128-55.466667 128-128V341.333333c0-72.533333-55.466667-128-128-128z m42.666667 554.666667c0 25.6-17.066667 42.666667-42.666667 42.666667H256c-25.6 0-42.666667-17.066667-42.666667-42.666667v-256h597.333334v256zM213.333333 426.666667V341.333333c0-25.6 17.066667-42.666667 42.666667-42.666666h42.666667v42.666666c0 25.6 17.066667 42.666667 42.666666 42.666667s42.666667-17.066667 42.666667-42.666667V298.666667h256v42.666666c0 25.6 17.066667 42.666667 42.666667 42.666667s42.666667-17.066667 42.666666-42.666667V298.666667h42.666667c25.6 0 42.666667 17.066667 42.666667 42.666666v85.333334H213.333333z"
                                    fill="#797979"></path>
                                <path data-v-de616464=""
                                    d="M341.333333 682.666667h341.333334c25.6 0 42.666667-17.066667 42.666666-42.666667s-17.066667-42.666667-42.666666-42.666667H341.333333c-25.6 0-42.666667 17.066667-42.666666 42.666667s17.066667 42.666667 42.666666 42.666667z"
                                    fill="#797979"></path>
                            </svg>
                            <p>2025-01-16</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 底部 -->
        <div class="footer">
            <p>桃李春风一杯酒，江湖夜雨十年灯</p>
            <p>本站源码存于gitee(vue3版本)，UI参考POETIZE-最美博客</p>
            <p>本网站部分源于网络，仅供学习参考</p>
            <p>如无意中侵犯了某个人的知识产权，请及时通过电子邮件（1590857xxxx@163.com）告知我们，本站将立即给予删除</p>
        </div>
    </div>
</template>
<script setup>
import Navigation from '@/components/NavigationMenu/index.vue';

const click_env = () => {
    const form_wrap = document.getElementById('form_wrap')
    // const form = form_wrap.querySelector('form')
    form_wrap.classList.toggle('click_envelope')
}
</script>
<style lang="scss" scoped>
#helpLink {
    font-family: 'gtpy';
    @include flexCenter(column, center);
    $allContentWidth: 60vw;
    // background: $pages-background-color;

    .trends_nav {
        width: $allContentWidth;
        margin: 4rem auto;
        height: 7rem;
        overflow: hidden;
        position: relative;

        h1 {
            position: absolute;
            color: #fff;
            font-size: 1.5rem;
            top: 1rem;
            left: 1rem;
        }

        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.5rem;
        }

    }

    //信封
    #envelope {
        width: 26.5rem;
        font-family: 'gtpy';

        #form_wrap {
            overflow: hidden;
            height: 22.3rem;
            position: relative;
            top: 0px;
            transition: all 1s ease-in-out .3s;

            form {
                position: relative;
                top: 10rem;
                overflow: hidden;
                height: 10rem;
                width: 90%;
                margin: 0px auto;
                transition: all 1s ease-in-out .3s;

                .welImg {
                    width: 100%;

                    img {
                        width: 100%;
                        border-radius: 0.25rem;
                    }
                }

                .content {
                    margin-top: 1rem;
                    padding: 1rem 1.5rem;
                    background: rgb(171, 183, 223, .9);
                    @include flexCenter(column, center);
                    gap: 0.5rem;
                    border-top-left-radius: 0.25rem;
                    border-top-right-radius: 0.25rem;

                    .item {
                        @include flexCenter(row, center);

                        label {
                            font-size: 0.9rem;
                            color: #191918;
                            text-shadow: 0px 1px 0px #4e8faf;
                            padding: 0 0.5rem;
                        }

                        input[type=text],
                        textarea {
                            color: #7c7873;
                            background: white;
                            width: 16rem;
                            height: 1.8rem;
                            border: none;
                            border-radius: 0.25rem;
                            box-shadow: inset 0px 0px 1px #b3a895;


                            &:focus {
                                border: none;
                            }
                        }

                        textarea {
                            height: 4rem;
                            padding-top: 0.7rem;
                        }
                    }
                }

                .img_item {
                    width: 100%;
                    margin: 0 auto;
                    border-bottom-left-radius: 0.25rem;
                    border-bottom-right-radius: 0.25rem;
                    border: 1px solid #f7f2ec;
                    background: #f8f6f4;
                    @include flexCenter(column, center);

                    button {
                        font-size: 18px;
                        color: #fdfbfb;
                        padding: 0.25rem 0.8rem;
                        background-color: #5d93db;
                        font-family: inherit;
                        border-radius: 0.25rem;
                        margin-top: 0.5rem;
                        background-size: 300% 100%;
                        transition: all .4s ease-in-out;

                        &:hover {
                            background-image: linear-gradient(to right, #6253e1, #852D91, #A3A1FF, #F24645);
                            box-shadow: 0 4px 15px 0 rgba(126, 52, 161, 0.75);
                            transition: all .4s ease-in-out;
                            background-position: 100% 0;
                        }
                    }

                    img {
                        margin: 1rem;
                    }
                }
            }

            &:before {
                content: "";
                position: absolute;
                bottom: 6.4rem;
                left: 0;
                background: url('@/assets/img/public/before.png');
                width: 26.5rem;
                height: 15.8rem;
                z-index: -1;
            }

            &:after {
                content: "";
                position: absolute;
                bottom: 0px;
                left: 0;
                background: url('@/assets/img/public/after.png');
                width: 26.5rem;
                height: 13rem;

            }

            &.hide {

                &:after,
                &:before {
                    display: none;
                }
            }

            &:hover {
                height: 50rem;
                top: -10rem !important;

                form {
                    height: 37.5rem;
                }

            }

        }
    }

    //文本主体
    .module_container {
        margin: 2rem 0;

        .site_info,
        .apply {
            width: $allContentWidth;

            .title {
                h1 {
                    padding: 1.5rem 0;
                }
            }

            ul {
                padding: 1rem;
                background-color: #ffe6fa;
                border-left: 3px solid #ed6ea0;
                border-radius: 0.25rem;
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
                color: #595a5a;
                font-size: 0.9rem;

            }
        }
    }

    //内容主体
    .content_container {
        width: $allContentWidth;

        hr {
            position: relative;
            margin: 40px auto;
            border: 2px dashed #39c5bb;
            overflow: visible;

            &::after {
                position: absolute;
                top: -14px;
                left: 5%;
                color: #39c5bb;
                content: "❄";
                font-size: 30px;
                line-height: 1;
                transition: 1s ease-in-out;
            }

            &:hover::after {
                left: 95%;
            }
        }

        h1 {
            font-size: 1rem;
            transition: color linear 0.2s;

            &:hover {
                color: #39c5bb;
                cursor: pointer;
            }
        }

        ul {
            @include flexCenter(row, flex-start);
            padding: 1rem 0;
            gap: 1.3vw;
            width: 100%;
            flex-wrap: wrap;

            li {
                width: 14vw;
                height: auto;
                flex-wrap: wrap;
                box-shadow: 1px 1px 3px #b9b7b7;
                border-radius: .5rem;

                .c4-izmir {
                    --text-color: #ffffff; //字体颜色
                    --primary-color: #ff3366;
                    --image-opacity: 0.2;
                    --border-color: #CC99CC;
                    --padding: 0.5em;
                    --border-margin: 0.5em;

                    img {
                        height: 10vw;
                        width: 14vw;
                        object-fit: cover;
                        max-width: 14vw;
                    }
                }

                .info {
                    padding: 0.5rem;

                    h1 {
                        font-size: 20px;
                        font-weight: 700;
                    }

                    .introduce {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        height: 2.2rem;
                        line-height: 1.2rem;
                        overflow: hidden;
                        color: black;
                        font-size: 0.8rem;
                        margin: 0.5rem 0;
                    }

                    .fillIn {
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-items: center;

                        p {
                            font-size: 14px;
                            color: #5e5b5b;
                        }
                    }
                }

            }
        }
    }

    //底部
    .footer {
        width: 100%;
        background-image: url('@/assets/img/treasureBox/helpLinkFooterBG.jpg');
        @include flexCenter(column, center);
        border-top-left-radius: 3rem;
        border-top-right-radius: 3rem;
        padding-top: 0.9rem;
        position: relative;
        z-index: -1;
        font-size: 0.8rem;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // background-color: rgba(0, 0, 0, 0.1);
            border-top-left-radius: 3rem;
            border-top-right-radius: 3rem;
            z-index: -1;
        }

        p {
            color: white;
            margin-bottom: 1rem;

            &:nth-child(1) {
                color: white;
            }

            &:nth-child(2) {
                color: #cfcfcf;
                font-size: 0.7rem;
            }
        }
    }
}
</style>