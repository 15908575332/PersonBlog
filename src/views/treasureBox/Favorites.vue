<template>
    <div id="favorites">
        <div class="navigate" :class="[isNavHidden ? 'navHiddenZoomOut' : 'navHiddenZoomIn']">
            <Navigation></Navigation>
        </div>
        <div class="dynamic__background">
            <div id='surface'></div>
            <div id='caustics'></div>
            <div id='bg'></div>
            <div id='sun'>
                <div id='sun_layer1'></div>
                <div id='sun_layer2'></div>
                <div id='sun_layer3'></div>
            </div>
        </div>
        <div class="nav">
            <h1>收藏夹</h1>
            <video src="@/assets/videos/video-back10.mp4" autoplay loop></video>
        </div>
        <div class="front-end" v-for="item in favoriteData">
            <h3>{{ item.title }}</h3>
            <ul>
                <li v-for="modules in item.content" class="glass-btn" @click.prevent="openLink(modules.href)">
                    <a>
                        <div class="iconImg">
                            <img v-lazy="modules.imgSrc" alt="icon">
                        </div>
                        <div class="text-content">
                            <h5>{{ modules.subtitle }}</h5>
                            <a-typography-paragraph :ellipsis="{ rows: 2, expandable: false }"
                                :content=modules.introduce style="margin:0;" />
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import Navigation from '@/components/common/NavigationMenu.vue';
const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

/** ------------------------ 滚动隐藏导航栏 ------------------------ */
import { debounce } from "@/utils/debounce"; // 导入防抖函数
const isNavHidden = ref(false); //状态
const scrollThreshold = 200; // 滚动阈值
const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    isNavHidden.value = scrollY > scrollThreshold;
};
const debouncedHandleScroll = debounce(handleScroll, 100); // 100ms 防抖延迟

// 获取收藏夹数据
const favoriteData = ref([]);
const getFavorites = (async () => {
    // 调用后端接口获取数据
    try {
        const response = await $http.get('/treasureBox/favorite-data', {
            headers: {
                'Authorization': `Bearer ${authStore.token}`
            }
        });
        favoriteData.value = response.data;
    } catch (error) {
        console.error('请求失败:', error);
    };
});
const openLink = ((url) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
})
onMounted(() => {
    getFavorites();
    window.addEventListener("scroll", debouncedHandleScroll);

});
onUnmounted(() => {
    window.removeEventListener("scroll", debouncedHandleScroll);
});
</script>
<style scoped lang="scss">
// 收藏夹
#favorites {
    margin: 0 auto;
    font-family: 'gtpy';
    //内容盒子宽度
    $front_end_width: 75vw;

    .navigate {
        width: 100vw;
        position: fixed;
        top: 0;
        z-index: 2;
        background-color: transparent;
    }

    //背景
    .dynamic__background {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: -1;
        background: linear-gradient(to bottom,
                oklch(60% 0.2 230),
                oklch(60% 0.2 200));
        --ratioW: 1;

        #bg {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-image: linear-gradient(to bottom,
                    white,
                    gray 25%,
                    gray 60%,
                    khaki);
            opacity: 0.5;
            mix-blend-mode: overlay;
        }

        #surface {
            mix-blend-mode: overlay;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;

            &::before,
            &::after {
                content: "";
                display: block;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-image: url('@/assets/img/treasureBox/surface.jpg');
                background-repeat: repeat-y;

                --duration: 10s;
                --lowHeight: 30vh;
                --highHeight: 70vh;
                --layerNum: 2;
                --index: 0;
                --opacity: 0.4;


                animation: surface var(--duration) linear infinite;
                animation-delay: calc((var(--duration) / var(--layerNum)) * var(--index) * -1);
                opacity: 0;
                mask-image: linear-gradient(to top, white, transparent var(--lowHeight));
            }

            &::before {
                --index: 0;
                transform: scale3d(1, -1, 1);
            }

            &::after {
                --index: 1;
                transform: scale3d(-1, -1, 1);
            }
        }

        #caustics {
            position: fixed;
            bottom: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            filter: url(#noise1);

            &::before,
            &::after {
                content: "";
                display: block;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-image: url('@/assets/img/treasureBox/caustics.jpg');
                background-repeat: repeat;
                --duration: 15s;
                --gapY: 0px;
                --ratioW: 1;
                background-size: calc(100vw / var(--ratioW)) 20vh;
                animation: caustics calc(var(--duration) * (var(--ratioW))) linear infinite;
                opacity: 0.3;
                mask-image: linear-gradient(to top,
                        white,
                        transparent,
                        transparent,
                        transparent);
            }

            &::after {
                --duration: 11s;
                --gapY: 10vh;
                animation-delay: -2s;
                transform: scale3d(-1, 1, 1);
            }
        }

        #sun {
            mix-blend-mode: overlay;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;

            div {
                content: "";
                display: block;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transform-origin: 50vw 0;
                animation: sun 7s ease infinite alternate;


                mask-image: linear-gradient(to bottom,
                        transparent 15%,
                        white 50%,
                        white 55%,
                        transparent 80%);
            }

            #sun_layer1 {
                background: linear-gradient(to right,
                        transparent 39%,
                        white 40%,
                        transparent 41%,
                        transparent 48.5%,
                        white 50%,
                        transparent 51.5%,
                        transparent 53%,
                        white 54%,
                        transparent 55%,
                        transparent 70%,
                        white 71%,
                        transparent 72%);
            }

            #sun_layer2 {
                animation-delay: -2s;
                animation-duration: 7.8s;
                animation-direction: alternate-reverse;
                background: linear-gradient(to right,
                        transparent 32%,
                        white 33%,
                        transparent 34%,
                        transparent 38%,
                        white 39%,
                        transparent 40%,
                        transparent 53%,
                        white 54%,
                        transparent 55%,
                        transparent 63.5%,
                        white 65%,
                        transparent 66.5%);
            }

            #sun_layer3 {
                animation-delay: -5s;
                animation-duration: 8.5s;
                background: linear-gradient(to right,
                        transparent 38.5%,
                        white 40%,
                        transparent 41.5%,
                        transparent 47%,
                        white 48%,
                        transparent 49%,
                        transparent 52%,
                        white 53%,
                        transparent 54%,
                        transparent 60%,
                        white 61%,
                        transparent 62%);
            }
        }

        @keyframes surface {
            0% {
                opacity: 0;
                background-position: center bottom;
                background-size: 100% var(--highHeight);
            }

            20% {
                opacity: var(--opacity);
            }

            100% {
                opacity: 0;
                background-position: center bottom calc(-1 * var(--lowHeight));
                background-size: 100% var(--lowHeight);
            }
        }

        @keyframes caustics {
            0% {
                background-position: bottom var(--gapY) left;
            }

            100% {
                background-position: bottom var(--gapY) left -100vw;
            }
        }

        @keyframes sun {
            0% {
                opacity: 0.1;
                transform: skew(5deg) scale3d(3, 1.5, 1);
            }

            50% {
                opacity: 0.08;
                transform: skew(0deg) scale3d(1.5, 1, 1);
            }

            100% {
                opacity: 0.1;
                transform: skew(-5deg) scale3d(3, 1, 1);
            }
        }

        @media (orientation: portrait) {
            :root {
                --ratioW: 1;
            }
        }

        @media (min-aspect-ratio: 1/1) {
            :root {
                --ratioW: 1;
            }
        }

        @media (min-aspect-ratio: 2/1) {
            :root {
                --ratioW: 2;
            }
        }

        @media (min-aspect-ratio: 3/1) {
            :root {
                --ratioW: 3;
            }
        }

        @media (min-aspect-ratio: 4/1) {
            :root {
                --ratioW: 4;
            }
        }

        @media (min-aspect-ratio: 5/1) {
            :root {
                --ratioW: 5;
            }
        }
    }

    // 动态栏
    .nav {
        width: 50%;
        margin: 15vh auto 0 auto;
        height: 7rem;
        min-width: 20rem;
        overflow: hidden;
        position: relative;
        background-color: rgb(189, 189, 189);
        border-radius: 0.5rem;

        h1 {
            position: absolute;
            color: $general-black;
            font-size: 1.5rem;
            top: 1rem;
            left: 1rem;
        }

        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    //内容
    .front-end {
        font-family: 'gtpy';
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        width: $front_end_width;
        margin: 1rem auto;

        h3 {
            font-size: 1.5rem;
            font-weight: 600;
            padding: 1rem;
        }

        ul {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
            gap: 15px;
            flex-wrap: wrap;
            gap: 1.5rem;
            font-weight: 700;

            a {
                min-height: 3.8rem;
                overflow: hidden;
                @include flexCenter(row, space-between);

                .iconImg {
                    height: 3rem;
                    margin: 0.5rem;
                    overflow: hidden;
                    border-radius: 0.5rem;
                    padding: 0.1rem;

                    img {
                        width: 100%;
                        height: 100%;
                    }

                }

                .text-content {
                    width: 100%;

                    h5 {
                        font-size: 1.1rem;
                        padding-left: 0.15rem;
                        color: rgb(0, 0, 0);
                    }

                    .ant-typography {
                        color: #272626;
                    }

                    p {
                        font-size: 0.8rem;
                    }
                }
            }

            .glass-btn {
                --h: 33;
                --s: 90%;
                --l: 100%;
                font-size: clamp(1.2rem, 5vw + 1rem, 2.5rem);
                border-radius: 0.1em;
                // background-image: linear-gradient(#0003, #0000);
                box-shadow:
                    0 -0.125em 0.25em #0002,
                    0 0.25em 0.25em hsl(var(--h) var(--s) var(--l) / 0.5),
                    0 0 0 0.1em hsl(var(--h) var(--s) var(--l) / 0.5),
                    0 0.175em 0.3em hsl(var(--h) var(--s) var(--l) / 0.5) inset,
                    0 -0.025em 0.175em hsl(var(--h) var(--s) var(--l) / 0.4) inset,
                    0 -0.25em 1em 0.3em hsl(var(--h) var(--s) var(--l) / 0.3) inset,
                    0 0.6em 0 hsl(var(--h) var(--s) var(--l) / 0.3) inset,
                    0 1.5em 1em #0004;
                backdrop-filter: blur(0.15em);
                position: relative;
                display: grid;
                place-content: center;
                color: hsl(var(--h) var(--s) var(--l) / .7);
                // text-shadow:
                //     0.03em 0.03em #fff5,
                //     -0.03em -0.03em #0005;
                cursor: pointer;
                transition: 0.1s ease;
                padding: 0.2em 0.2em 0 0;


                &:after {
                    content: '';
                    inset: 0;
                    top: 0.5em;
                    position: absolute;

                    background-image:
                        linear-gradient(105deg,
                            transparent 20%,
                            hsl(var(--h) var(--s) var(--l) / .2) 20%,
                            hsl(var(--h) var(--s) var(--l) / .2) 30%,
                            transparent 30%,
                            transparent 32%,
                            hsl(var(--h) var(--s) var(--l) / .2) 5%,
                            hsl(var(--h) var(--s) var(--l) / .2) 40%,
                            transparent 0%);
                    background-size: 400% 100%;
                    background-position: 100% 0%;
                    transition: .3s ease;
                }

                &:hover {
                    translate: .01em .25em;
                    box-shadow:
                        0 -0.125em 0.25em #0002,
                        0 0.25em 0.25em hsl(var(--h) var(--s) var(--l) / 0.5),
                        0 0 0 0.1em hsl(var(--h) var(--s) var(--l) / 0.5),
                        0 0.175em 0.3em hsl(var(--h) var(--s) var(--l) / 0.8) inset,
                        0 -0.025em 0.175em hsl(var(--h) var(--s) var(--l) / 0.4) inset,
                        0 -0.25em 1em 0.3em hsl(var(--h) var(--s) var(--l) / 0.3) inset,
                        0 0.6em 0 hsl(var(--h) var(--s) var(--l) / 0.3) inset,
                        0 1em 0.5em #0004;
                    backdrop-filter: blur(0.08em);

                    &:before {
                        height: 1em;
                    }

                    &:after {
                        background-position: -50% 0%;
                    }
                }
            }
        }
    }

}
</style>