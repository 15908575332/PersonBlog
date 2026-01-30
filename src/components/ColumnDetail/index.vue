<template>
    <div>
        <!-- 专栏 -->
        <div style="position: relative;top: 0; z-index: 1; width: 100%;">
            <Navigation hoverBgColor="#ecf8ff" textColor="#585858" style="z-index: 1;" />
        </div>
        <div id="columnDetail">
            <!-- 左侧目录 -->
            <div class="left-catalogue">
                <div class="column-title">
                    <img src="./icon/deploy.svg" alt="">
                    {{ decryptedId }}
                </div>
                <div class="catalogue-item" v-for="article in columnDetail" :key="article.article_id"
                    @click="getCurrentArticleDetail(article.article_id)">
                    <div class="img_title">
                        <div class="catalogue-cover">
                            <img :src="article.cover_image_url" alt="img">
                        </div>
                        <div class="catalogue-title">{{ article.title }}</div>
                    </div>
                    <div class="release">
                        <img class="release-icon" src="./icon/release-time.svg" alt="release">
                        <p class="release-time">{{ dayjs(article.release_time).format('YYYY-MM-DD HH:mm:ss') }}</p>
                    </div>
                </div>
            </div>

            <!-- 右侧内容区域 -->
            <div class="right-rapper">
                <div class="right-content">
                    <div class="default" v-if="isShowDefault">
                        <!-- 时间轴 -->
                        <div class="time__axis">
                            <h1><span>#</span>UL 时间表卡片</h1>
                            <ul class="ul">
                                <li style="--accent-color:#41516C">
                                    <div class="date">2002</div>
                                    <div class="title">Title 1</div>
                                    <div class="descr">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
                                        itaque
                                        hic
                                        quibusdam
                                        fugiat est numquam harum, accusamus suscipit consequatur laboriosam!</div>
                                </li>
                                <li style="--accent-color:#FBCA3E">
                                    <div class="date">2007</div>
                                    <div class="title">Title 2</div>
                                    <div class="descr">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
                                        adipisci nobis
                                        nostrum
                                        vero nihil veniam.</div>
                                </li>
                                <li style="--accent-color:#E24A68">
                                    <div class="date">2012</div>
                                    <div class="title">Title 3</div>
                                    <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                                        minima
                                        consequuntur
                                        soluta placeat iure totam commodi repellendus ea delectus, libero fugit quod
                                        reprehenderit,
                                        sequi
                                        quo, et dolorum saepe nulla hic.</div>
                                </li>
                                <li style="--accent-color:#1B5F8C">
                                    <div class="date">2017</div>
                                    <div class="title">Title 4</div>
                                    <div class="descr">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Impedit,
                                        cumque.
                                    </div>
                                </li>
                                <li style="--accent-color:#4CADAD">
                                    <div class="date">2022</div>
                                    <div class="title">Title 5</div>
                                    <div class="descr">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit,
                                        non.
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!-- 源代码展示 -->
                        <div class="code__show">
                            <h1><span>#</span>源码展示说明</h1>
                            <highlightjs language="js" code='                  
                import EmojiPicker from " vue3-emoji-picker"; 
                import "vue3-emoji-picker/css" ; const
                _ISshow=ref(false); const emojiIs_show=()=> {
                _ISshow.value = !_ISshow.value;
                    }
                const input__message = ref("");
                const onVue3Emoje = (val) =
  
                input__message.value += val.i;
                    }
                    const onChangeText = () => {
                    return;
                    }' />
                        </div>

                    </div>
                    <div class="content" v-else>
                        <ListDetail :articleId="currentArticleId" :key="currentArticleId" :backTextHeight=20 />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import CryptoJS from 'crypto-js';
const route = useRoute()
import dayjs from "dayjs";
import Navigation from '@/components/common/NavigationMenu.vue'
import ListDetail from '@/components/informalEssay/ListDetail.vue'

// 解密函数
const decryptTag = (encryptedTag) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedTag, import.meta.env.VITE_SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('解密失败:', error);
        return '';
    }
}
const decryptedId = ref(''); // 用于存储解密后的ID

//获取渲染数据
const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;
const columnDetail = ref({});

const getColumnDataCount = async (master_tag) => {
    try {
        const response = await $http.get('main/getColumnArticles', {
            params: {
                master_tag
            }
        });
        columnDetail.value = response.articles || {};
    } catch (error) {
        console.error('获取专栏详情失败:', error);
    }
};
//获取当前点击文章详情
const isShowDefault = ref(true);
const currentArticleId = ref(null);
const getCurrentArticleDetail = (article_id) => {
    currentArticleId.value = article_id; // 直接赋值即可
    isShowDefault.value = !currentArticleId.value;
};
onMounted(() => {
    // 直接从路由参数获取并解密
    const encryptedId = route.params.id;
    decryptedId.value = decryptTag(encryptedId);
    getColumnDataCount(decryptedId.value);
});

</script>

<style scoped lang="scss">
#columnDetail {
    font-family: 'gtpy';
    display: flex;

    // 左侧目录
    .left-catalogue {
        position: absolute;
        left: 0;
        top: 0rem;
        width: 16rem;
        background-color: #ecf8ff;
        overflow-y: auto;
        height: 100vh;
        padding: 1rem 0;
        -webkit-overflow-scrolling: touch;

        //栏目标题
        .column-title {
            font-size: 1.4rem;
            font-weight: bold;
            padding: 4rem 0 1rem 2rem;

            img {
                width: 1.3rem;
                height: 1.3rem;
                margin-right: 0.2rem;
            }
        }

        // 每个目录项
        .catalogue-item {
            padding: 1rem;
            cursor: pointer;

            // 目录图片/标题
            .img_title {
                @include flexCenter(row, flex-start);
                gap: 1rem;

                .catalogue-cover {
                    width: 6rem;
                    min-width: 6rem;
                    height: 4rem;
                    min-height: 4rem;
                    border-radius: 0.2rem;
                    overflow: hidden;
                    background-color: #fff;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .catalogue-title {
                    margin-top: 10px;
                    font-size: 0.9rem;
                    font-weight: bold;
                }
            }

            .release {
                @include flexCenter(row, flex-start);
                margin-top: 0.5rem;

                // 发布图标
                .release-icon {
                    width: 0.7rem;
                    height: 0.8rem;
                    margin-right: 0.2rem;
                }

                // 发布时间
                .release-time {
                    font-size: 0.8rem;
                    color: #444;
                    margin: 0;
                }
            }

            &:hover {
                background-color: #ffffff;
            }
        }
    }

    // 右侧区域
    .right-rapper {
        flex: 1;
        overflow: hidden;

        // 右侧内容区域
        .right-content {
            position: fixed;
            right: 0;
            width: calc(100% - 16rem);
            height: 100%;
            overflow-y: auto;
            z-index: 0;

            // 默认内容
            .default {
                width: 38rem;
                margin: 0 auto;


                // 时间轴
                .time__axis {
                    --color: rgba(30, 30, 30);
                    --bgColor: #ecf8ff;
                    min-height: 100vh;
                    display: grid;
                    align-content: center;
                    gap: 2rem;
                    padding: 2rem 0;
                    font-family: 'gtpy';
                    color: var(--color);

                    h1 {
                        padding: 0.2rem 0.5rem;
                        border-bottom: 1px dashed #ccc;
                        font-size: 1.5rem;
                        font-weight: 600;

                        span {
                            color: #ff6d6d;
                            padding: 0 0.2rem;
                        }
                    }

                    .ul {
                        --col-gap: 1rem;
                        --row-gap: 2rem;
                        --line-w: 0.25rem;
                        display: grid;
                        grid-template-columns: var(--line-w) 1fr;
                        grid-auto-columns: max-content;
                        column-gap: var(--col-gap);
                        list-style: none;
                        // width: min(60rem, 90%);
                        margin-inline: auto;

                        /* line */
                        &::before {
                            content: "";
                            grid-row: 1 / span 10;
                            background: rgb(225, 225, 225);
                            border-radius: calc(var(--line-w) / 2);
                            width: 2px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        /* card */
                        li {
                            grid-column: 2;
                            --inlineP: 1.5rem;
                            margin-inline: var(--inlineP);
                            grid-row: span 2;
                            display: grid;
                            grid-template-rows: min-content min-content min-content;

                            &:not(:last-child) {
                                margin-bottom: var(--row-gap);
                            }

                            /* date */
                            .date {
                                --dateH: auto;
                                padding: 0.2rem 0;
                                height: var(--dateH);
                                margin-inline: calc(var(--inlineP) * -1);
                                background-color: var(--accent-color);

                                color: white;
                                font-size: 1rem;
                                font-weight: 700;

                                display: grid;
                                place-content: center;
                                position: relative;

                                border-radius: calc(var(--dateH) / 2) 0 0 calc(var(--dateH) / 2);

                                /* date flap */
                                &::before {
                                    content: "";
                                    width: var(--inlineP);
                                    aspect-ratio: 1;
                                    background: var(--accent-color);
                                    background-image: linear-gradient(rgba(0, 0, 0, 0.2) 100%, transparent);
                                    position: absolute;
                                    top: 100%;

                                    clip-path: polygon(0 0, 100% 0, 0 100%);
                                    right: 0;
                                }

                                /* circle */
                                &::after {
                                    content: "";
                                    position: absolute;
                                    width: 1rem;
                                    aspect-ratio: 1;
                                    background: var(--bgColor);
                                    border: 0.3rem solid var(--accent-color);
                                    border-radius: 50%;
                                    top: 50%;

                                    transform: translate(50%, -50%);
                                    right: calc(100% + var(--col-gap) + var(--line-w) / 2);


                                }
                            }

                            &:first-child {

                                /* 初始阴影 */
                                .date {
                                    &::after {
                                        box-shadow: 0px 0px 15px 5px var(--accent-color);
                                        animation: breathe 2s infinite;
                                    }
                                }
                            }

                            @keyframes breathe {

                                0%,
                                100% {
                                    box-shadow: 0px 0px 5px 5px var(--accent-color);
                                    animation: breathe 2s infinite;
                                }

                                50% {
                                    box-shadow: 0px 0px 15px 5px var(--accent-color);
                                    animation: breathe 2s infinite;
                                }
                            }
                        }

                        /* title descr */
                        .title,
                        .descr {
                            background: var(--bgColor);
                            position: relative;
                            padding-inline: 1.5rem;
                        }

                        .title {
                            overflow: hidden;
                            padding-block-start: 1.5rem;
                            padding-block-end: 1rem;
                            font-weight: 500;

                            &::before {
                                bottom: calc(100% + 0.125rem);
                            }
                        }

                        .descr {
                            padding-block-end: 1.5rem;
                            font-weight: 300;

                            &::before {
                                z-index: -1;
                                bottom: 0.25rem;
                            }
                        }

                        /* shadows */
                        .title::before,
                        .descr::before {
                            content: "";
                            position: absolute;
                            width: 90%;
                            height: 0.5rem;
                            background: rgba(0, 0, 0, 0.5);
                            left: 50%;
                            border-radius: 50%;
                            filter: blur(4px);
                            transform: translate(-50%, 50%);
                        }
                    }

                    @media (min-width: 40rem) {
                        .ul {
                            grid-template-columns: 1fr var(--line-w) 1fr;
                        }

                        .ul::before {
                            grid-column: 2;
                        }

                        .ul li:nth-child(odd) {
                            grid-column: 1;
                        }

                        .ul li:nth-child(even) {
                            grid-column: 3;
                        }

                        /* start second card */
                        .ul li:nth-child(2) {
                            grid-row: 2/4;
                        }

                        .ul li:nth-child(odd) .date::before {
                            clip-path: polygon(0 0, 100% 0, 100% 100%);
                            left: 0;
                        }

                        .ul li:nth-child(odd) .date::after {
                            transform: translate(-50%, -50%);
                            left: calc(100% + var(--col-gap) + var(--line-w) / 2);
                        }

                        .ul li:nth-child(odd) .date {
                            border-radius: 0 calc(var(--dateH) / 2) calc(var(--dateH) / 2) 0;
                        }
                    }
                }

                // 源代码展示
                .code__show {
                    height: 25rem;

                    h1 {
                        padding: 0.2rem 0.5rem;
                        border-bottom: 1px dashed #ccc;
                        font-size: 1.3rem;
                        font-weight: 600;

                        span {
                            color: #ff6d6d;
                            padding: 0 0.2rem;
                        }
                    }
                }
            }
        }
    }
}
</style>