<template>
    <div id="TravelAlbum">
        <div class="navigation" :class="[isNavHidden ? 'navHiddenZoomOut' : 'navHiddenZoomIn']">
            <Navigation></Navigation>
        </div>
        <!-- 连续滚动轮播 -->
        <div class="carousel">
            <div>
                <div class="carousel__left">
                    <CarouselImage :images="imageList_left" scrollDirection="left"></CarouselImage>
                </div>
                <div class="carousel__right">
                    <CarouselImage :images="imageList_right" scrollDirection="right"></CarouselImage>
                </div>
            </div>
        </div>

        <!-- 缩略图轮播 -->
        <div class="thumbnail__carousel">
            <ThumbnailCarousel></ThumbnailCarousel>
        </div>
        <div class="content__container">
            <div class="title__introduce">
                <h1>时光相册</h1>
                <h2>每一张照片都是一次美好的回忆</h2>
            </div>
            <div class="nav">
                <ul>
                    <li v-for="(item, index) in navs" :key="item.id">
                        <button href="#" class="btn-7" :style="buttonStyles(index)">
                            <span>
                                {{ item.name }}
                                {{ item.count }}
                            </span>
                        </button>
                    </li>
                </ul>
                <h1>四姑娘山</h1>
            </div>

            <div class="container">
                <div class="box" v-for="item in travels" :key="item.id">
                    <div class="img__box">
                        <img v-lazy=item.src alt="tests">
                    </div>
                    <div class="text__box">
                        <h1>风住尘香花已尽，日晚倦梳头风住尘香花已尽，日晚倦梳头。</h1>
                        <h2>Date:2024-12-19</h2>
                    </div>
                </div>
            </div>
            <div class="title__introduce vue-carousel-3d-title">
                <h1>时光相册</h1>
                <h2>每一张照片都是一次美好的回忆</h2>
            </div>
            <!-- 轮播图 -->
            <div class="vue3-carousel-3d">
                <h1>旅游日常</h1>
                <carousel-3d :controlsVisible="true" :height="280" :width="450" :autoplay="isPageVisible"
                    :autoplayTimeout="4000" :autoplayHoverPause="true">
                    <slide v-for="(slide, i) in carousel_images" :index="i" :key="i">
                        <img :src="slide" alt="carouselImg" style="height: 100%;">
                    </slide>
                </carousel-3d>
            </div>

            <!-- 图片倒影 -->
            <div class="inverted">
                <div class="title__introduce nav-bgc">
                    <h1>图片倒影</h1>
                    <h2>每一张照片都是一次美好的回忆</h2>
                </div>
                <!-- 舞台层 -->
                <div class="stage">
                    <!-- 控制层 -->
                    <div class="control">
                        <!-- 图片层 -->
                        <div class="imgWrap">
                            <div class="img img1">
                                <img :src="utils.getAssetsFile('img/travelAlbum/inverted1.png')">
                            </div>
                            <div class="img img2">
                                <img :src="utils.getAssetsFile('img/travelAlbum/inverted2.png')">
                            </div>
                            <div class="img img3">
                                <img :src="utils.getAssetsFile('img/travelAlbum/inverted3.png')">
                            </div>
                            <div class="img img4">
                                <img :src="utils.getAssetsFile('img/travelAlbum/inverted4.png')">
                            </div>
                            <div class="img img5">
                                <img :src="utils.getAssetsFile('img/travelAlbum/inverted5.png')">
                            </div>
                            <div class="img img6">
                                <img :src="utils.getAssetsFile('img/travelAlbum/inverted6.png')">
                            </div>
                            <div class="img img7">
                                <img :src="utils.getAssetsFile('img/travelAlbum/inverted7.png')">
                            </div>
                            <div class="img img8">
                                <img :src="utils.getAssetsFile('img/travelAlbum/inverted8.png')">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部 -->
            <div style="margin: 2rem 0;font-size: 1rem;font-weight: 700;;">
                <span>~到底了~</span>
            </div>
        </div>

        <div class="footer">
            <p>桃李春风一杯酒，江湖夜雨十年灯</p>
            <p>本站源码存于gitee(vue3版本)，UI参考POETIZE-最美博客</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import CarouselImage from "@/components/CarouselImage/index.vue";
import ThumbnailCarousel from "@/components/ThumbnailCarousel/index.vue";
import Navigation from "../components/NavigationMenu/index.vue";
import utils from "@/utils/getAssetsFile";

const scorllDirection = ref();
const imageList_left = ref([
    utils.getAssetsFile("img/travelAlbum/10003.jpg"),
    utils.getAssetsFile("img/travelAlbum/10004.jpg"),
    utils.getAssetsFile("img/travelAlbum/10006.jpg"),
    utils.getAssetsFile("img/travelAlbum/10007.jpg"),
    utils.getAssetsFile("img/travelAlbum/10009.jpg"),
    utils.getAssetsFile("img/travelAlbum/10010.jpg"),
]);

const imageList_right = ref([
    utils.getAssetsFile("img/travelAlbum/10013.jpg"),
    utils.getAssetsFile("img/travelAlbum/10014.jpg"),
    utils.getAssetsFile("img/travelAlbum/10016.jpg"),
    utils.getAssetsFile("img/travelAlbum/10017.jpg"),
    utils.getAssetsFile("img/travelAlbum/10019.jpg"),
    utils.getAssetsFile("img/travelAlbum/10020.jpg"),
]);

// 按钮颜色组
const colors = ref([
    "#a3bded",
    "#c4f4fe",
    "#fdefbe",
    "#28C76F",
    "#ee7752",
    "#23a6d5",
]);

const buttonStyles = (index) => {
    return {
        backgroundColor: colors.value[index % colors.value.length],
    };
};

// 按钮组
const navs = ref([
    {
        id: "a01",
        name: "四姑娘山",
        count: 112
    },
    {
        id: "b02",
        name: "九寨沟",
        count: 23
    },
    {
        id: "c03",
        name: "手办",
        count: 56
    },
    {
        id: "d04",
        name: "积木",
        count: 99
    },
    {
        id: "e05",
        name: "编织",
    },
]);
//travel
const travels = ref([
    {
        id: 2,
        src: utils.getAssetsFile("img/travelAlbum/travel2.jpg"),
    },
    {
        id: 3,
        src: utils.getAssetsFile("img/travelAlbum/travel3.jpg"),
    },
    {
        id: 4,
        src: utils.getAssetsFile("img/travelAlbum/travel4.jpg"),
    },
    {
        id: 5,
        src: utils.getAssetsFile("img/travelAlbum/travel5.jpg"),
    },
]);
const carousel_images = ref([
    utils.getAssetsFile("img/travelAlbum/cover1.jpg"),
    utils.getAssetsFile("img/travelAlbum/cover2.jpg"),
    utils.getAssetsFile("img/travelAlbum/cover3.jpg"),
    utils.getAssetsFile("img/travelAlbum/cover4.jpg"),
    utils.getAssetsFile("img/travelAlbum/cover5.jpg"),
])
const isPageVisible = ref(true);
const handleVisibilityChange = () => {
    if (document.hidden) {
        this.isPageVisible = false;  // 页面不可见
    } else {
        this.isPageVisible = true;   // 页面可见
        // 如果需要在页面重新变为可见时恢复轮播，可以在这里添加逻辑
        // 例如，重新启动一个计时器或触发轮播的继续播放
    }
}
import { debounce } from '@/utils/debounce.js'; // 导入防抖函数
const isNavHidden = ref(false);
const scrollThreshold = 200; // 滚动阈值
// 处理滚动事件的函数

const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    isNavHidden.value = scrollY > scrollThreshold;
};

// 使用防抖包装滚动事件处理函数
const debouncedHandleScroll = debounce(handleScroll, 100); // 300ms 防抖延迟

onMounted(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', debouncedHandleScroll);
});
</script>
<style scoped lang="scss">
#TravelAlbum {
    background-image: linear-gradient(90deg, rgba(37, 82, 110, .1) 1px, #fff 0), linear-gradient(180deg, rgba(37, 82, 110, .1) 1px, #fff 0);
    background-size: 3rem 3rem;
    font-family: 'gtpy';

    .navigation {
        position: fixed;
        top: 0;
        z-index: 2;
        width: 100vw;
    }

    .navHiddenZoomOut {
        animation: navHiddenZoomOut 0.5s ease forwards;
    }

    .navHiddenZoomIn {
        animation: navHiddenZoomIn 0.5s ease forwards;
    }

    // 无限滚动
    .carousel {
        height: 100vh;
        display: flex;
        align-items: center;
        animation: opacityIn 1s ease-in forwards;
        overflow-x: hidden;

        .carousel__right {
            padding: 1rem 0;
        }
    }


    // 缩略轮播
    .thumbnail__carousel {
        position: absolute;
        top: 49%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }

    // 主体内容
    .content__container {
        @include flexCenter(column, center);
        font-family: "lmst";
        width: 70rem;
        margin-left: auto;
        margin-right: auto;

        // 标题
        .title__introduce {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            height: 6rem;
            overflow: hidden;
            background-image: url('@/assets/img/travelAlbum/navBackimg.jpg');
            background-size: cover;
            color: white;
            letter-spacing: -4px;
            border-radius: 15px;

            h1 {
                padding-left: 0.5rem;
                font-size: 1.1rem;
            }

            h2 {
                font-size: 1.4rem;
                font-weight: 700;
                padding: 0.5rem;
            }
        }

        .vue-carousel-3d-title {
            background-image: url('@/assets/img/travelAlbum/navBackimg1.jpg');
            margin: 4rem 0 2rem;
        }

        .vue3-carousel-3d {
            @include flexCenter(column, center);
            width: 100%;

            h1 {
                font-size: 36px;
                font-weight: 700;
                padding-bottom: 2rem;
            }

            .carousel-3d-container {
                width: 100%;
                margin: 0;


            }

            img {
                border-radius: 0;
            }
        }

        //图片倒影
        .inverted {
            $imgCount : 8;
            height: 32rem;
            background-color: #fff;

            .nav-bgc {
                margin: 4rem 0 2rem;
                background-image: linear-gradient(to right bottom, #60a5fa, #5eead4, #34d399);

                &::before {
                    content: "";
                    position: absolute;
                    top: -3rem;
                    right: -3rem;
                    width: 12rem;
                    height: 12rem;
                    border-radius: 50%;
                    background-color: hsla(0, 0%, 100%, 0.1);
                }

                &::after {
                    content: "";
                    position: absolute;
                    left: -3rem;
                    bottom: -3rem;
                    width: 8rem;
                    height: 8rem;
                    border-radius: 50%;
                    background-color: hsla(0, 0%, 100%, 0.1);
                }
            }

            .stage {
                position: relative;
                width: 1400px;
                height: 200px;
                margin: 20px auto;
                perspective: 2000px;
                transform-style: preserve-3d;
                -webkit-box-reflect: below 0 linear-gradient(transparent, rgba(0, 0, 0, .5));

                .control {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                    transform: translateZ(-2000px) rotateY(50deg) rotateZ(0deg);
                    animation: rotate 30s linear infinite;

                    .imgWrap {
                        position: absolute;
                        width: 400px;
                        height: 270px;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -45%);
                        transform-style: preserve-3d;

                        .img {
                            position: absolute;
                            width: 500px;
                            height: 270px;
                            line-height: 270px;
                            text-align: center;
                            font-size: 120px;
                            top: 0;
                            left: 0;
                            transform-style: preserve-3d;
                            transform-origin: 50% 50% 0px;
                        }

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 10px;
                        }

                        @for $i from 1 through $imgCount {
                            .img#{$i} {
                                // transform: rotateY(35 + ($i * 45deg)) translateZ(482.84px);
                                transform: rotateY(35 + ($i * 45deg)) translateZ(650px);
                            }
                        }
                    }
                }
            }

            @keyframes rotate {
                0% {
                    transform: translateZ(-2000px) rotateY(0deg);
                }

                50% {
                    transform: translateZ(-2000px) rotateY(-360deg);
                }

                100% {
                    transform: translateZ(-2000px) rotateY(-720deg);
                }
            }
        }

        // .container {
        //     position: relative;
        // }

        // 导航
        .nav {
            width: 100%;
            padding: 2rem 0;
            @include flexCenter(column, center);

            ul {
                display: flex;

                li {
                    padding: 0 0.5rem;

                    /* 7 */
                    .btn-7 {
                        margin: 0.2rem 0;
                        font-family: 'gtpy';
                        background: transparent;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        position: relative;
                        display: inline-block;
                        box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
                            7px 7px 20px 0px rgba(0, 0, 0, .1),
                            4px 4px 5px 0px rgba(0, 0, 0, .1);
                        outline: none;
                        border-radius: 5px;
                        padding: 0;
                        border: none;

                        &>span {
                            position: relative;
                            display: block;
                            border-radius: 5px;
                            width: 100%;
                            height: 100%;
                            padding: 0.4rem 1rem;
                        }

                        &::before,
                        &::after,
                        &>span::before,
                        &>span::after {
                            position: absolute;
                            content: "";
                            right: 0;
                            bottom: 0;
                            background: rgba(251, 75, 2, 1);
                            box-shadow:
                                -7px -7px 20px 0px rgba(255, 255, 255, .9),
                                -4px -4px 5px 0px rgba(255, 255, 255, .9),
                                7px 7px 20px 0px rgba(0, 0, 0, .2),
                                4px 4px 5px 0px rgba(0, 0, 0, .3);
                            transition: all 0.3s ease;
                        }

                        &>span::before,
                        &>span::after {
                            left: 0;
                            top: 0;
                        }

                        &::before,
                        &>span::before {
                            height: 0%;
                            width: 2px;
                        }

                        &::after,
                        &>span::after {
                            width: 0%;
                            height: 2px;
                        }

                        &:hover {
                            color: rgba(251, 75, 2, 1);
                            background: transparent !important;

                            &::before,
                            &>span::before {
                                height: 100%;
                            }

                            &::after,
                            &>span::after {
                                width: 100%;
                            }
                        }

                    }
                }
            }

            h1 {
                padding-top: 2rem;
                font-size: 36px;
                font-weight: 700;
            }
        }

        // 内容
        .container {
            @include flexCenter(row, flex-start);
            row-gap: 30px;
            column-gap: 30px;
            flex-wrap: wrap;

            .box {
                padding: 0.5rem;
                border-radius: 15px;
                box-shadow: 0px 0px 3px 1px rgba(17, 17, 26, 0.1);

                .img__box {
                    width: 305px;
                    height: 340px;
                    overflow: hidden;
                    border-radius: 15px;
                    box-shadow: 0px 0px 6px 2px rgba(17, 17, 26, 0.1);

                    img {
                        transition: all 0.5s;
                        width: 100%;
                        height: 100%;

                        &:hover {
                            scale: (1.2);
                        }
                    }
                }

                .text__box {
                    h1 {
                        font-size: 1rem;
                        font-weight: 700;
                        padding: 1rem 0.5rem;
                        max-width: 14.5rem;
                        font-family: 'gtpy';
                        letter-spacing: -1px;
                        /* 强制文本在一行内显示 */
                        white-space: nowrap;
                        /* 隐藏超出容器的内容 */
                        overflow: hidden;
                        /* 使用省略号表示被截断的文本 */
                        text-overflow: ellipsis;
                    }

                    h2 {

                        font-size: 0.9rem;
                        color: #b4b4b4;
                        padding: 0 0.5rem;
                    }
                }

            }
        }
    }



    //底部导航
    .footer {
        background-image: linear-gradient(60deg, #8EC5FC 0%, #E0C3FC 100%);
        animation: hueRotate 10s infinite alternate;
        @include flexCenter(column, center);
        border-top-left-radius: 2rem;
        border-top-right-radius: 2rem;
        padding: 0.9rem 0;

        p {
            &:nth-child(1) {
                color: white;
                margin-bottom: 0.5rem;
            }

            &:nth-child(2) {
                color: #717171;
                font-size: 0.8rem;
            }
        }
    }
}

@keyframes hueRotate {
    100% {
        filter: hue-rotate(360deg);
    }
}
</style>
