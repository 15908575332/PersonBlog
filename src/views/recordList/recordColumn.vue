<template>
    <div id="recordColumn">
        <div class="navigation box__shadow">
            <Navigation></Navigation>
        </div>
        <div class="category__content">
            <!-- carousel -->
            <div class="carousel">
                <div class="specific__content">
                    <carousel-3d :disable3d="true" :width="1200" :height="662" :autoplay="true" :autoplayTimeout="5000"
                        :display="true">
                        <slide v-for="(item, index) in carousel" :key="index" :index="index">
                            <a class="image">
                                <img :src="item.img" alt="Image" />
                                <div class="item__count">
                                    <h1>{{ item.title }}</h1>
                                    <ul>
                                        <li>
                                            <img src="@/assets/icon/recordList/countCat-icon.svg" alt="cat">
                                            <span>{{ item.cat }}</span>
                                        </li>
                                        <li>
                                            <img src="@/assets/icon/recordList/countMessage-icon.svg" alt="message">
                                            <span>{{ item.message }}</span>
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
                <div class="content__container" v-for="module in specialColumn" :key="module.id" data-aos="fade-left">
                    <div class="content__container__title">
                        <h1>{{ module.title }}</h1>
                    </div>
                    <div class="content__container__list">
                        <div class="content__items" v-for="(item, index) in module.content" :key="item.contentId">
                            <img :src="item.tagsImg" alt="图片">
                            <div class="text">
                                <h1 class="count" :style="buttonStyles(index)">{{ item.count }}</h1>
                                <h2 class="intrduce">{{ item.title }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
import Navigation from '@/components/NavigationMenu/index.vue';
import { ref, onMounted } from 'vue';
import utils from "@/utils/getAssetsFile";
import { useListDetail } from '@/store/listDetailStore';
import Aos from 'aos';
const recordStore = useListDetail();
const specialColumn = recordStore.specialColumn;
const carousel = ref([
    {
        img: utils.getAssetsFile("img/albumCollection/cover-1.jpeg"),
        title: 'POTTE-最美博客',
        cat: 31521,
        message: 47,
    },
    {
        img: utils.getAssetsFile("img/albumCollection/cover-2.jpeg"),
        title: 'POTTE-最美博客',
        cat: 31521,
        message: 47,
    },
    {
        img: utils.getAssetsFile("img/albumCollection/cover-3.jpeg"),
        title: 'POTTE-最美博客',
        cat: 31521,
        message: 47,
    },
    {
        img: utils.getAssetsFile("img/albumCollection/cover-4.jpeg"),
        title: 'POTTE-最美博客',
        cat: 31521,
        message: 47,
    },
    {
        img: utils.getAssetsFile("img/albumCollection/cover-5.jpeg"),
        title: 'POTTE-最美博客',
        cat: 31521,
        message: 47,
    },

]);
const btn_colors = ref([
    '#CC6666',
    '#CC6633',
    '#666666',
    '#3333CC',
    '#ee7752',
    '#6699FF'
])
const buttonStyles = (index) => {
    return {
        backgroundColor: btn_colors.value[index % btn_colors.value.length],
    }
};
onMounted(() => {

});
</script>
<style scoped lang="scss">
#recordColumn {
    font-family: 'gtpy';
    background-color: #f0f4f5;
    //内容盒子宽度
    $category_content_width: 60rem;

    //导航
    .navigation {
        background-color: #fff;
    }

    //内容
    .category__content {
        width: $category_content_width;
        margin: auto;
        padding-bottom: 2rem;

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
                        font-size: 1.2rem;
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
                            transform: translate(-50%, -50%);
                            z-index: 2;
                            @include flexCenter(column, center);
                            row-gap: 0.5rem;

                            h1 {
                                padding: 0.2rem 0.8rem;
                                background-color: red;
                                border-radius: 4px;
                            }

                            h2 {
                                font-size: 0.9rem;
                                font-weight: 700;
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