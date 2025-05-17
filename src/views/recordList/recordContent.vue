<template>
    <div class="recordContent">
        <div class="navigate">
            <Navigation></Navigation>
        </div>
        <div class="backVideo">
            <video src="@/assets/videos/recordContentBack.mp4" autoplay loop></video>
            <div class="search">
                <form class="search__form">
                    <input type="text" v-model="searchQuery" placeholder="请输入搜索内容">
                    <img src=" @/assets/icon/informalEssay/informalEssaySearch.svg" alt="">
                </form>
            </div>
        </div>
        <div class="main__content">
            <div class="nav__card">
                <ul>
                    <li class="nav__item" v-for="(module, index) in dataContent" :key="module.id"
                        @click="toggleMoudle(index, module.id)" :class="{ nav__itemActive: isActive == index }">
                        <div class="hoverBanner" :style="{ opacity: isActive == index ? 1 : 0 }">
                        </div>
                        <a href="#">
                            <div class="profile__picture">
                                <img :src="module.profile_picture" alt="头像">
                            </div>
                            <div>
                                <h1>{{ module.navBtntitle }}</h1>
                                <p>{{ module.subtitle }}</p>
                            </div>
                        </a>
                    </li>

                </ul>
            </div>
            <div class="content__container">
                <!-- 生活倒影 -->
                <section>
                    <div class="menu">
                        <div class="flex__layout">
                            <img src=" @/assets/icon/informalEssay/informalEssayMenu.svg" alt="">
                            <span>{{ selectContent.navBtntitle }}</span>
                        </div>
                        <div class="flex__layout">
                            <img src=" @/assets/icon/informalEssay/informalEssayMore.svg" alt="">
                            <span>MORE</span>
                        </div>
                    </div>
                    <div class="content_aera">
                        <div class="specific__content" v-for="(item, index) in paginatedItems" :key="index">
                            <a class="image" @click="listDetail(item.contentId, module.id)" data-aos="zoom-in">
                                <img v-lazy="item.backImage" alt="Image" />
                                <button v-if="item.mediaType === 'video'" class="play-button"></button>
                                <div class="item__count">
                                    <ul>
                                        <li v-if="item.mediaType === 'video'">
                                            <img src="@/assets/icon/recordList/countPlay-icon.svg" alt="play">
                                            <span>3</span>
                                        </li>
                                        <li>
                                            <img src="@/assets/icon/recordList/countCat-icon.svg" alt="cat">
                                            <span>9999</span>
                                        </li>
                                        <li>
                                            <img src="@/assets/icon/recordList/countMessage-icon.svg" alt="message">
                                            <span>123</span>
                                        </li>
                                    </ul>

                                </div>
                            </a>
                            <div class="text__content">
                                <!-- 发布 -->
                                <h1>{{ item.title }}</h1>
                                <div class="release">
                                    <span>Sara·{{ item.release__time }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="paginate">
                    <vue-awesome-paginate :total-items="totalItems" v-model="currentPage" :items-per-page="pageSize"
                        :max-pages-shown="5" back-button-class="back-btn" next-button-class="next-btn"
                        :show-ending-buttons="true" :show-breakpoint-buttons="true" @click="onClickHandler">
                        <template #prev-button>
                            <span>
                                <img src="@/assets/icon/recordList/previousPage.svg" height="25" />
                            </span>
                        </template>

                        <template #next-button>
                            <span>
                                <img src="@/assets/icon/recordList/nextPage.svg" height="25" />
                            </span>
                        </template>
                    </vue-awesome-paginate>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navigation from '@/components/NavigationMenu/index.vue';
import { useListDetail } from '@/store/listDetailStore';
import AOS from 'aos';
import {
    onMounted,
    computed,
    onUpdated,
    nextTick,
    onBeforeUpdate,
    ref
} from 'vue';
const recordStore = useListDetail();
const dataContent = recordStore.dataContent;
const isActive = ref();
const currentId = ref();
const selectContent = ref([]);// 用于存储当前选中的item的content数组
const testData = ref([]);
const toggleMoudle = (selectBtnIndex = 0, id = 'lifeReflection') => {
    currentId.value = id;
    isActive.value = selectBtnIndex;
    const item = dataContent.find(item => item.id === id);
    if (item) {
        selectContent.value = item;
        testData.value = item.content;
    } else {
        console.log('未找到对应的内容');
    }
    onClickHandler(1);
}
// 分页
var currentPage = ref(1) // 当前页码
var pageSize = ref(10) // 每页显示的项数
var paginatedItems = ref([]) // 存储分页后的项目列表，实际页面渲染的数据集
var totalItems = computed(() => { // 总项数（通常你会从服务器获取这个值，但在这里我们直接知道）
    return testData.value.length;
})
const onClickHandler = (page) => {
    currentPage.value = page;
    calculatePaginatedItems();
};
const calculatePaginatedItems = () => { //计算和更新分页后的项目列表 
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    //提取数组中从startIndex到endIndex（不包括endIndex）的部分，这部分即为当前页的项目列表
    paginatedItems.value = testData.value.slice(startIndex, endIndex);
}
onMounted(() => {
    toggleMoudle();
    AOS.init(
        {
            offset: 110
        }
    );
});

</script>

<style lang="scss">
.recordContent {
    font-family: 'gtpy';
    background: linear-gradient(to right, rgba(221, 222, 233, 0.77) 0%, rgba(181, 255, 252, 0.56) 100%);
    user-select: none;
    //内容盒子宽度
    $main_content_width: 60rem;

    .navigate {
        position: fixed;
        top: 0;
        z-index: 2;
    }

    // 背景视频
    .backVideo {
        width: 100%;
        height: 18rem;
        overflow: hidden;
        position: relative;
        animation: zoomInDown 0.6s ease-out;

        video {
            // width: 100vw;
            width: 100%;
            height: 100%;
            object-fit: cover;
            background-color: rgb(233, 208, 208);
        }

        .search {
            width: 16rem;
            border-radius: 10px;
            padding: 0.9rem;
            margin-top: 1.5rem;
            position: absolute;
            top: 5rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;

            .search__form {
                position: relative;

                input {
                    border-radius: 1rem;
                    border: 2px solid #4dd5cc;
                    padding: 0.2rem 1rem;
                    padding-right: 2rem;
                    width: 100%;
                    color: #f3efef;
                    font-size: 0.9rem;
                    display: flex;
                    font-family: 'gtpy';
                    align-items: center;
                    background-color: transparent;

                    &::placeholder {
                        color: #f3efef;
                        font-size: 0.8rem;
                    }
                }

                img {
                    width: 1.2rem;
                    transition: all 0.3s;
                    position: absolute;
                    top: 0.2rem;
                    right: 0.5rem;

                    &:hover {
                        cursor: pointer;
                        transform: scale(1.1);
                    }
                }
            }
        }
    }

    //内容
    .main__content {
        width: $main_content_width;
        margin: 0 auto;
        animation: zoomInUp 0.6s ease-out;

        .nav__card {
            ul {
                width: 60rem;
                @include flexCenter(row, space-around);
            }

            .nav__itemActive {
                transform: translateY(-60%) !important;
            }

            .nav__item {
                height: 100%;
                transform: translateY(-50%);
                transition: transform 0.4s;
                border-radius: 0.75rem;
                background-color: rgb(255, 255, 255, .7);
                overflow: hidden;

                p {
                    overflow: hidden;
                }

                .hoverBanner {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    z-index: -1;
                    background-image: url('@/assets/img/recordList/banner-hover.png');
                    background-size: 100% 100%;
                    opacity: 0;
                    transition: all 0.8s;
                }

                &:hover {
                    cursor: pointer;
                    transform: translateY(-60%);

                    .hoverBanner {
                        opacity: 1;
                    }
                }

                .profile__picture {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                    background-color: #4dd5cc;
                    overflow: hidden;
                    margin-right: 0.5rem;

                    img {
                        width: 100%;
                    }
                }

                a {
                    @include flexCenter(row, flex-start);
                    padding: 0.5rem;
                    min-width: 14rem;

                    h1 {
                        font-size: 1.2rem;
                        color: black;
                        padding: 0.5rem 0;
                        font-weight: 700;
                    }

                    p {
                        font-size: 0.9rem;
                        color: #777;
                    }
                }
            }
        }

        .content__container {
            .menu {
                @include flexCenter(row, space-between);
                border-bottom: 1px dashed #ccc;
                padding: 0.2rem;
                padding-top: 2rem;

                .flex__layout {
                    @include flexCenter(row, center);
                    justify-content: flex-start;

                    img {
                        width: 1.2rem;
                        margin-right: 0.5rem;
                    }

                    span {
                        font-size: 1rem;
                        color: #999;
                    }
                }

            }

            .content_aera {
                @include flexCenter(row, flex-start);
                column-gap: 2rem;
                flex-wrap: wrap;
                row-gap: 1.2rem;
                padding: 1.5rem 0.5rem;


                .specific__content {
                    width: 10rem;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    transition: all 0.3s;

                    .image {
                        width: 10rem;
                        height: 8rem;
                        display: inline-block;
                        border-radius: 0.5rem;
                        overflow: hidden;
                        background-color: black;
                        position: relative;

                        &:hover {
                            cursor: pointer;

                            img {
                                transform: scale(1.1);
                            }
                        }

                        img {
                            width: 100%;
                            height: 100%;
                            transition: all 0.3s;
                        }
                    }

                    .text__content {
                        padding: 0.5rem;
                        color: #a2a2a2;

                        img {
                            margin-right: 0.25rem;
                        }

                        // 发布
                        .release {
                            display: flex;
                            align-items: center;
                            font-size: 0.8rem;
                            font-weight: 700;
                            margin: 0.5rem 0;

                        }

                        // 标题
                        h1 {
                            padding: 0rem 0;
                            font-size: 1rem;
                            font-weight: 700;
                            color: black;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap
                        }
                    }
                }

                // 视频播放按钮
                .play-button {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 3rem;
                    /* 按钮的宽度 */
                    height: 2rem;
                    /* 按钮的高度 */
                    background: rgba(0, 0, 0, 0.6);
                    /* 半透明背景 */
                    border: none;
                    border-radius: 10px;
                    /* 圆形按钮 */
                    cursor: pointer;
                    /* 鼠标悬停时显示为可点击 */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s ease;

                    /* 背景过渡效果 */
                    &::before {
                        content: '';
                        width: 0;
                        height: 0;
                        border-left: 20px solid white;
                        /* 三角形左边的颜色和宽度 */
                        border-top: 10px solid transparent;
                        /* 三角形顶部的透明度和宽度 */
                        border-bottom: 10px solid transparent;
                        /* 三角形底部的透明度和宽度 */
                    }
                }

                // 计数
                .item__count {
                    position: absolute;
                    bottom: 0.3rem;
                    left: 0.5rem;

                    ul {
                        @include flexCenter(row, flex-start);

                        li {
                            @include flexCenter(row, center);
                            font-size: 0.7rem;
                            font-weight: 700;
                            margin-right: 0.5rem;

                            img {
                                padding-right: 0.1rem;
                                height: 0.9rem !important;
                                transform: scale(1) !important;
                            }
                        }
                    }
                }
            }

            .paginate {
                @include flexCenter(row, center);
                padding-bottom: 1rem;

                .pagination-container {
                    display: flex;
                    column-gap: 10px;
                }

                .paginate-buttons {
                    height: 25px;
                    width: 35px;
                    font-size: 0.9rem;
                    font-family: 'gtpy';
                    font-weight: 700;
                    margin: 0 0.1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    background-color: rgb(242, 242, 242);
                    color: black;
                }

                .paginate-buttons:hover {
                    background-color: #ff8345;
                }

                .active-page {
                    background-color: #ff8345;
                    border: 1px solid #ff8345;
                    color: white;
                }

                .back-btn,
                .next-btn {
                    background-color: transparent;

                    &:hover {
                        cursor: pointer;
                        background-color: transparent;
                        animation: scale-animation 1.5s infinite linear;
                    }
                }

                .active-page:hover {
                    background-color: #ff8345;
                }

                .first-page-button,
                .last-page-button {
                    width: 50px;
                }
            }
        }
    }
}

@keyframes flipInX {
    from {
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
    }

    40% {
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        animation-timing-function: ease-in;
    }

    60% {
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1;
    }

    80% {
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }

    to {
        transform: perspective(400px);
    }
}
</style>