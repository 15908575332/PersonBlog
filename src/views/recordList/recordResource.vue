<template>
    <!-- 导航 -->
    <Navigation></Navigation>
    <div id="recordResource">
        <!-- 背景设置 -->
        <div class="background__img">
            <!-- 背景图 -->
            <div class="backPhoto" :style=videoSrc></div>
            <!-- 遮罩 -->
            <div class="mask"></div>
            <div class="back__text">
                <!-- 一级标题 -->
                <div class="title">{{ back__text_title }}</div>
                <!-- 二级标题 -->
                <div class="subtitle">{{ back__text_subtitle }}</div>
            </div>
        </div>
        <!-- 内容 -->
        <div class="container-content">
            <!-- 按钮导航 -->
            <div class="button__navigate">
                <button class="btn-7" v-for="(item, index) in routeMeta" :key="item.id"
                    @click="toggleMoudle(index, item.id)" :class="{ btn__active: isActive == index }"
                    :style="buttonStyles(index)">
                    <span>{{ item.navBtntitle }}</span>
                </button>
            </div>
            <!-- 主模块 -->
            <div class="moudle__content">
                <!-- 横线 -->
                <div class="br">
                    <img src="@/assets/icon/recordList/leaf.svg" alt="" width="18">
                    <span>发现</span>
                </div>
                <!-- 内容 -->
                <div v-for="(module, index) in selectContent" data-aos="fade-up" :key="index" class="module-container">
                    <div :class="['module', getLayoutClass(index)]">
                        <a @click="listDetail(module.contentId)" class="image">
                            <img v-if="module.mediaType === 'image'" :src="module.mainUrl" alt="Image" />
                            <video v-else :src="module.mainUrl" controls></video>
                        </a>
                        <div class="text__content">
                            <!-- 发布 -->
                            <div class="release">
                                <img src="@/assets/icon/recordList/release.svg" alt="">
                                <span>发布于{{ module.release__time }}</span>
                            </div>
                            <h1>{{ module.title }}</h1>
                            <ul class="funcition">
                                <li>
                                    <img src="@/assets/icon/recordList/heat.svg" alt="heat">
                                    <span>{{ module.heat }}热度</span>
                                </li>
                                <li>
                                    <img src="@/assets/icon/recordList/comment.svg" alt="comment">
                                    <span>{{ module.comment.length }}评论</span>
                                </li>
                                <li>
                                    <img src="@/assets/icon/recordList/like.svg" alt="like">
                                    <span>{{ module.like }}赞</span>
                                </li>
                            </ul>
                            <div class="article__container">
                                <p>{{ module.text[0] }}</p>
                            </div>
                            <div class="footer__tags">
                                <p>
                                    <img src="@/assets/icon/recordList/blog.svg" alt="blog">
                                    <span>{{ module.tag1 }}</span>
                                </p>
                                <p>
                                    <img src="@/assets/icon/recordList/arrange.svg" alt="arrange">
                                    <span>{{ module.tag2 }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部 -->
            <div style="margin: 2rem 0;font-size: 1rem;font-weight: 700;;">
                <span>~到底了~</span>
            </div>
            <Live2d></Live2d>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, computed, watch, nextTick } from 'vue'; //引入vue相关的api
import Live2d from '@/components/Live2d/index.vue'; //引入live2d组件
import Navigation from '@/components/NavigationMenu/index.vue'; //引入导航组件
import utils from '@/utils/getAssetsFile'; //引入获取静态资源的方法
import { useRouter, useRoute } from 'vue-router'; //引入路由相关的api
import { useListDetail } from '@/store/listDetailStore'; // 引入store

const recordStore = useListDetail(); // 实例化store
const dataContent = ref(recordStore.dataContent); // 存储dataContent的数据
const learingLife = ref(recordStore.learingLife); // 存储learingLife的数据
const country = ref(recordStore.country);// 存储country的数据
const routeMeta = ref(); //存储根据路由元信息筛选出的数据
const route = useRouter(); // 实例化路由
const isActive = ref(0); // 用于存储当前选中的按钮索引
const currentId = ref(null); // 用于存储当前选中的item的id
const selectContent = ref([]);// 用于存储当前选中的item的content数组
var imageContainerRef = ref(null); // 用于存储图片容器的引用
let observer = null; // 用于存储 IntersectionObserver 实例
var randomIndex = ref(0); // 用于存储背景选取随机数
const currentRouter = useRoute();
// 导航栏按钮切换模块
const toggleMoudle = (selectBtnIndex = 0, id = routeMeta.value[0].id) => {
    currentId.value = id;
    isActive.value = selectBtnIndex;
    const item = routeMeta.value.find(item => item.id === id);
    if (item) {
        selectContent.value = item.content;
    } else {
        console.log('未找到对应的内容');
    }
}
nextTick(() => {
    toggleMoudle();
})
watch(currentRouter, () => {
    // 根据路由元信息dataKey决定渲染的数据
    const dataKey = currentRouter.meta.dataKey;
    if (dataKey === 'resource') {
        routeMeta.value = dataContent.value;
    } else if (dataKey === 'learning') {
        routeMeta.value = learingLife.value;
    } else if (dataKey === 'country') {
        routeMeta.value = country.value;
    }
    // 在路由改变后调用 toggleMoudle 函数
    if (routeMeta.value.length > 0) {
        toggleMoudle(0, routeMeta.value[0].id);
    }
}, { immediate: true })
//传入需要渲染的id，与查询参数fatherId，跳转到listDetail页面
const listDetail = (id) => {
    route.push({
        name: 'listDetail',
        query: {
            // fatherId: 'lifeReflection'
            fatherId: currentId.value
        },
        params: {
            id: id
        }
    })
}
// 背景图源地址、文本存储数组
const videoUrls = ref([
    {
        imgSrc: utils.getAssetsFile('img/recordList/resource__back1.jpeg'),
        title: 'Florence',
        subtitle: '当遇到你时，大脑连上CSGO都会掉帧'
    },
    {
        imgSrc: utils.getAssetsFile('img/recordList/resource__back2.jpeg'),
        title: '英雄联盟',
        subtitle: '有些错无法犯两次，有些事绝对不会无趣'
    },
    {

        imgSrc: utils.getAssetsFile('img/recordList/resource__back3.jpeg'),
        title: 'Angel Beats!',
        subtitle: '声起立华乐独奏，曲末音无心结弦。'
    },
    {

        imgSrc: utils.getAssetsFile('img/recordList/resource__back4.jpeg'),
        title: '柴郡猫',
        subtitle: '如果你都不知道自己想去哪里，那去哪里都是一样的。'
    },
    {
        imgSrc: utils.getAssetsFile('img/recordList/resource__back5.jpeg'),
        title: '七律·和郭沫若同志',
        subtitle: '今日欢呼孙大圣，只缘妖雾又重来。'
    },

]);
// 返回具体渲染的背景图
const videoSrc = computed(() => {
    return {
        backgroundImage: `url('${videoUrls.value[randomIndex.value].imgSrc}')`
    }
});
// 背景图一级标题
const back__text_title = computed(() => {
    return videoUrls.value[randomIndex.value].title
})
// 背景图二级标题
const back__text_subtitle = computed(() => {
    return videoUrls.value[randomIndex.value].subtitle
})
// 计算发布时间，默认是当前系统时间
const updateTime = computed(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
})
// 改变图片与内容的布局关系（图片/内容--> 左/右）
const getLayoutClass = (index) => {
    // 根据索引的奇偶性返回不同的类名
    return index % 2 === 0 ? 'image-left' : 'image-right';
}
// 导航按钮按序渲染颜色
const colors = ref([
    '#23d5ab',
    '#ff4934',
    '#837bc7',
    '#e73c7e',
    '#ee7752',
    '#23a6d5'
])
// 返回实际按钮样式
const buttonStyles = (index) => {
    return {
        backgroundColor: colors.value[index % colors.value.length],
    }
};
//背景加载
const loadImage = () => {
    if (imageContainerRef.value) {
        imageContainerRef.value.style = videoSrc;
    }
};
// 监听图片容器的可见性变化决定背景图的加载状态
const createObserver = () => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage();
                observer.disconnect(); // 停止观察  
            }
        });
    }, {
        root: null, // 相对于视口进行观察  
        rootMargin: '0px',
        threshold: 0.1 // 当元素的 10% 进入视口时触发  
    });

    if (imageContainerRef.value) {
        observer.observe(imageContainerRef.value);
    }
};

onMounted(() => {
    if (videoUrls.value.length > 0) {
        randomIndex.value = Math.floor(Math.random() * videoUrls.value.length); //背景图索引值
    };
    if (routeMeta.value.length > 0) {
        toggleMoudle(0, routeMeta.value[0].id); // 初始化时选中第一个按钮
    } else {
        console.log('未找到对应的内容');
    }
    getLayoutClass(); // 初始化布局类名
    createObserver(); // 初始化 IntersectionObserver
})
</script>
<style scoped lang="scss">
#recordResource {
    font-family: 'gtpy';
    font-size: 0.75rem;

    // 背景设置
    .background__img {
        height: 18rem;

        // 背景图 
        .backPhoto {
            width: 100vw;
            height: 19rem;
            background-size: cover;
            z-index: -2;
            background-position: center;
            position: absolute;
            top: 0;
            animation: zoomInDown 0.6s ease-out forwards;

            @include media-to('phone') {
                height: 16rem;
            }
        }

        // 遮罩
        .mask {
            width: 100%;
            height: 19rem;
            position: absolute;
            background-color: #00000040;
            top: 0;
            z-index: -1;
            animation: zoomInDown 0.6s ease-out forwards;
        }

        .back__text {
            @include flexCenter(column, center);
            height: 65%;
            color: white;
            font-family: 'gtpy';
            z-index: 2;
            position: relative;
            top: 0;
            padding: 0 1rem;
            animation: zoomInDown 0.6s ease-out forwards;

            .title {
                font-size: 2.2rem;
            }

            .subtitle {
                margin-top: 3.13rem;
                font-size: 1.3rem;
            }


        }

        // 手机样式
        @include media-to ('phone') {
            height: 14rem;

            .mask {
                height: 16rem;
            }

            .back__text {
                .title {
                    font-size: 1.3rem;
                }

                .subtitle {
                    font-size: 0.9rem;
                    margin-top: 2rem;
                }
            }
        }
    }

    .container-content {
        @include flexCenter(column, center);
        animation: zoomInUp 0.6s ease-out;

        // 选择按钮
        .button__navigate {
            padding: 1.5rem 1rem;
            width: 38rem;
            max-width: 40rem;
            border-radius: 10px;
            @include flexCenter(row, space-around);
            flex-wrap: wrap;
            transition: all 0.2s linear;
            box-shadow: 0 0 15px 6px #e5e5e5;
            font-size: 0.9rem;

            /* 7 */
            .btn-7 {
                color: #fff;
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


            &:hover {
                box-shadow: 0 9px 13px 8px #e5e5e5;
            }

        }

        // 主体模块
        .moudle__content {
            @include flexCenter(column, center);

            // 横线
            .br {
                width: 40rem;
                padding: 5px;
                margin-top: 2rem;
                border-bottom: 1px dashed #ccc;

                img {
                    margin-right: 0.5rem;
                }

                span {
                    font-size: 1rem;
                    color: #797979;
                }
            }

            // 内容
            .module-container {
                height: 15rem;
                max-height: 15rem;
                width: 40rem;
                max-width: 40rem;
                width: 100%;
                margin-top: 2rem;
                overflow: hidden;
                box-shadow: 0 0 8px 5px #e5e5e5;
                border-radius: 8px;
                border: 1px solid rgb(0, 0, 0, 0);
            }

            .module {
                display: flex;
                align-items: center;

                .image {
                    max-width: 50%;
                    min-width: 50%;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;

                    img,
                    video {
                        width: 100%;
                    }

                    img {
                        height: 15rem;
                    }
                }

                &.image-right {
                    flex-direction: row-reverse;
                }
            }

            // 文字主体
            .text__content {
                padding: 0.9rem 1.5rem;
                height: 15rem;
                color: #a4a6a4;
                width: 20rem;

                img {
                    margin-right: 0.25rem;
                }

                // 发布
                .release {
                    display: flex;
                    align-items: center;

                    img {
                        height: 0.8rem;
                    }
                }

                // 标题
                h1 {
                    margin: 0.75rem 0;
                    font-size: 1rem;
                    font-weight: 700;
                    color: black;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap
                }

                // 信息
                .funcition {
                    @include flexCenter(row, flex-start);
                    font-size: 0.6rem;
                    align-items: center;

                    li {
                        margin-right: 0.5rem;
                    }
                }

                .article__container {
                    margin: 0.75rem 0;
                    height: 6rem;

                    p {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 4;
                        line-height: 1.5rem;
                        overflow: hidden;
                        color: black;
                        font-size: 0.8rem;
                    }
                }

                // 底部标签
                .footer__tags {
                    @include flexCenter(row, flex-start);

                    p {
                        background-color: #ffa500;
                        color: white;
                        display: flex;
                        justify-content: center;
                        padding: 0.25rem 0.5rem;
                        border-radius: 0.15rem;
                        margin-right: 0.5rem;
                    }
                }
            }
        }

        // 手机样式
        @include media-to('phone') {
            padding: 0.7rem;

            .button__navigate {
                padding: 0.7rem;

                button {
                    margin: 0.5rem;
                }
            }
        }
    }
}

// 导航按钮激活时样式
.btn__active {
    color: rgba(251, 75, 2, 1) !important;
    background: transparent !important;
}
</style>