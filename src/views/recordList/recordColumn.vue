<template>
    <div id="recordColumn">
        <Navigation hoverBgColor="#f0f4f5" textColor="#585858" />
        <div class="category__content">
            <!-- carousel -->
            <div class="carousel">
                <div class="specific__content">
                    <carousel-3d :disable3d="true" :width="1200" :height="662" :autoplay="true" :autoplayTimeout="5000"
                        :display="true">
                        <slide v-for="(item, index) in spliceData" :key="index" :index="index">
                            <a class="image">
                                <a-badge-ribbon color="#fe3459" text="推荐"></a-badge-ribbon>
                                <img :src="item.cover_image_url" alt="Image" />
                                <div class="item__count">
                                    <h1>{{ item.title }}</h1>
                                    <ul>
                                        <li>
                                            <img src="@/assets/icon/recordList/countCat-icon.svg" alt="cat">
                                            <span>{{ item.heat }}</span>
                                        </li>
                                        <li>
                                            <img src="@/assets/icon/recordList/like.svg" alt="message">
                                            <span>{{ item.like_count }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </a>
                        </slide>
                    </carousel-3d>
                </div>
            </div>
            <section>
                <div class="menu">
                    <div class="flex__layout">
                        <img src="@/assets/icon/recordList/specialColumn-icon.svg" alt=" img">
                        <span>专栏</span>
                    </div>
                    <div class="flex__layout">
                        <img src="@/assets/icon/recordList/orange-icon.svg" alt="img">
                    </div>
                </div>
                <div class="content__container" v-for="module in specialColumn" :key="module.category_id"
                    data-aos="fade-left">
                    <div class="content__container__title">
                        <h1>{{ module.nav_btn_title }}</h1>
                    </div>
                    <div class="content__container__list">
                        <div class="content__items" v-for="(tag, index) in module.tags" :key="tag.master_tag"
                            @click="gotoClomunDetail(tag.master_tag, module.category_id)">
                            <img :src="utils.getAssetsFile(`img/public/public-${tag.randomNumber}.png`)"
                                :alt="tag.randomNumber">
                            {{ tag.randomNumber }}
                            <div class="text">
                                <h1 class="count"
                                    :style="`--btn-color: ${btn_colors[Math.floor(Math.random() * btn_colors.length)]};`">
                                    {{ tag.tag_count }}</h1>
                                <h2 class="intrduce">{{ tag.master_tag }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
import Navigation from '@/components/common/NavigationMenu.vue';
import { getCurrentInstance, ref, onMounted } from 'vue';
const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;
import { useMainStore } from '@/store/maincontent';
const mainStore = useMainStore();
import utils from "@/utils/getAssetsFile";
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

//标题栏
const specialColumn = ref([]);
//轮播数据
const carousel = ref(JSON.parse(localStorage.getItem('mainContent')) || []);
const spliceData = carousel.value.splice(0, 8);

// 在getSpecialColumn方法中修改
const getSpecialColumn = async () => {
    await mainStore.fetchNavData();
    const promises = mainStore.navData.map(async (module) => {
        const response = await $http.get('main/getColumnData', {
            params: {
                category_id: module.category_id
            }
        });

        // 处理数据时优先使用本地存储的随机数
        response.columnData.forEach(tag => {
            const storedNumber = localStorage.getItem(`randomNumber_${tag.master_tag}`);
            if (storedNumber) {
                tag.randomNumber = parseInt(storedNumber, 10);
            } else {
                // 生成新随机数并保存到本地存储
                const randomNumber = Math.floor(Math.random() * 50) + 1;
                tag.randomNumber = randomNumber;
                localStorage.setItem(`randomNumber_${tag.master_tag}`, randomNumber.toString());
            }
        });

        return {
            ...module,
            tags: response.columnData
        };
    });
    specialColumn.value = await Promise.all(promises);
};
const btn_colors = ref([
    '#CC6666',
    '#CC6633',
    '#666666',
    '#3333CC',
    '#ee7752',
    '#6699FF'
])
//跳转详情页
import CryptoJS from 'crypto-js';
const gotoClomunDetail = (tag, category_id) => {
    getCategoryArticles(category_id); // 获取分类下的所有文章
    router.push({
        name: 'columnDetail',
        params: {
            id: encryptTag(tag) // 传递加密后的ID
        }
    });
}
const getCategoryArticles = async (category_id) => {
    await mainStore.fetchMainContent(category_id, authStore.user.userId);
}
//AES加密函数
const encryptTag = (tag) => {
    // 使用 crypto-js 或其他加密库
    return CryptoJS.AES.encrypt(
        tag,
        import.meta.env.VITE_SECRET_KEY // 使用环境变量中的密钥
    ).toString();
}

onMounted(() => {
    getSpecialColumn();
});

</script>
<style scoped lang="scss">
#recordColumn {
    font-family: 'gtpy';
    width: 100%;
    height: 100%;
    //内容盒子宽度
    $category_content_width: 60rem;
    @include flexCenter(column, center);

    &::after {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f0f4f5;
        z-index: -1;
    }

    //导航
    .navigation {
        background-color: #fff;
    }

    //内容
    .category__content {
        width: $category_content_width;
        margin: 4rem 0;

        .carousel {
            animation: clipDiamondIn 1s both;

            .specific__content {
                width: 100%;
                transition: all 0.3s;
                position: relative;

                .carousel-3d-container {
                    .carousel-3d-slide {
                        border-radius: 0.5rem;

                        &::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-image: linear-gradient(0deg, rgb(29, 27, 27, .6), transparent 15%);
                            border-radius: 0.5rem;
                        }
                    }
                }

                .image {
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    background-color: black;

                    &:hover {
                        cursor: pointer;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                &:hover {
                    cursor: grab;
                }
            }

            // 计数
            .item__count {
                position: absolute;
                bottom: 1rem;
                left: 1rem;
                z-index: 1;

                h1 {
                    font-size: 1.3rem;
                    font-weight: 700;
                    padding: 0.5rem 0;
                }

                ul {
                    @include flexCenter(row, flex-start);

                    li {
                        @include flexCenter(row, center);
                        font-size: 1rem;
                        margin-right: 1rem;

                        img {
                            padding-right: 0.1rem;
                            height: 0.8rem !important;
                            transform: scale(1) !important;
                        }
                    }
                }
            }
        }

        section {
            animation: zoomInUp 0.6s ease-out;

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

            .content__container {

                .content__container__title {
                    padding: 1rem 0;

                    h1 {
                        font-size: 1rem;
                        font-weight: 700;
                        width: fit-content;
                        position: relative;

                        &::after {
                            content: '';
                            position: absolute;
                            bottom: -2px;
                            left: 0;
                            width: 2rem;
                            height: 0.1rem;
                            background-color: red;
                        }
                    }
                }

                .content__container__list {
                    @include flexCenter(row, flex-start);
                    gap: 1rem;
                    flex-wrap: wrap;

                    .content__items {
                        position: relative;
                        color: white;
                        height: 5rem;
                        width: 9rem;
                        border-radius: 0.3rem;
                        overflow: hidden;

                        &::after {
                            content: '';
                            position: absolute;
                            z-index: 1;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgb(0, 0, 0, .3);
                        }

                        img {
                            width: 100%;
                            height: 100%;
                        }

                        .text {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 100%;
                            transform: translate(-50%, -50%);
                            z-index: 2;
                            @include flexCenter(column, center);
                            row-gap: 0.5rem;

                            h1 {
                                padding: 0.2rem 0.8rem;
                                background-color: var(--btn-color);
                                border-radius: 4px;
                            }

                            h2 {
                                font-size: 0.9rem;
                                font-weight: 700;
                                width: 100%;
                                text-align: center;
                                max-width: 90%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }

                        }
                    }

                }
            }
        }

    }

    .box__shadow {
        box-shadow: 0px 0px 6px 4px rgba(17, 17, 26, 0.1);
    }
}
</style>