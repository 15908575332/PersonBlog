<template>
    <!-- 导航 -->
    <Navigation></Navigation>
    <ModalBox :isVisible="showModal" @close="handClose" class="modal__box">
        <h1>个人博客版权说明</h1>
        <h2>
            欢迎访问我的个人博客（以下简称“本博客”），本博客旨在分享个人见解、技术心得、生活感悟等内容，为访客提供一个交流与学习的平台。在享受本博客提供的内容与服务的同时，请您务必遵守以下版权说明：

        </h2>
        <p>
            1、本博客中的所有原创文章、图片、视频、音频及其他形式的作品（以下简称“内容”），其版权均归作者（即本博客管理员）所有。

        </p>

        <p>
            2、对于非商业用途，且注明作者及来源（即本博客网址）的情况下，允许个人网站、论坛、社交媒体等平台以链接形式分享本博客中的文章。

        </p>
        <p>
            3、本博客可能包含来自第三方的链接或内容，对于这些第三方内容，本博客不承担任何版权审核责任。访客在访问这些链接或内容时，请自行判断其合法性及版权归属。

        </p>
        <p>
            4、本博客的版权说明及访客行为均适用中华人民共和国相关法律法规。
        </p>

        <p>
            5、作者保留随时修改本版权声明的权利，任何修改将在本页面即时生效，无需另行通知。
        </p>
    </ModalBox>
    <div id="recordDetail">
        <!-- 背景设置 -->
        <div class=" background__img">
            <!-- 背景图 -->
            <div class=" backPhoto" :style="{ backgroundImage: `url(${recordDetail.backimg_url})` }"></div>
            <!-- 遮罩 -->
            <div class="mask"></div>
            <div class="back__text">
                <!-- 二级标题 -->
                <div class="subtitle">
                    <span> {{ recordDetail.subtitle }}</span>
                    <div style="display: flex;" class="content">
                        <!-- 作者 -->
                        <div class="auther">
                            <img src='@/assets/icon/recordList/auther.svg' alt="">
                            <span class="name">{{ recordDetail.username }} ·</span>
                        </div>
                        <!-- 发布 -->
                        <div class="release">
                            <img src="@/assets/icon/recordList/release.svg" alt="">
                            <span>发布于{{ release_time_format(recordDetail.release_time) }} ·</span>
                        </div>
                        <ul class="funcition">
                            <li>
                                <img src="@/assets/icon/recordList/heat.svg" alt="heat">
                                <span>{{ recordDetail.heat }}热度 ·</span>
                            </li>
                            <li>
                                <img src="@/assets/icon/recordList/comment.svg" alt="comment">
                                <span>{{ selectComment.length }}评论 ·</span>
                            </li>
                            <li>
                                <img src="@/assets/icon/recordList/like.svg" alt="like">
                                <span>{{ recordDetail.like_count }}赞</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 内容主体 -->
        <div class="content__container">
            <div class="image">

                <video v-if="recordDetail.main_url" :src="recordDetail.main_url" controls ref="videoRef"
                    @play="handlePlay" @pause="handlePause"></video>
                <img v-else :src="recordDetail.backimg_url" alt="backimg">
                <button v-if="recordDetail.main_url && !isPlaying" class="play-button" @click="playVideo"></button>
            </div>
            <div class="moudle__tag">
                {{ recordDetail.title }}
            </div>
            <!-- 时间轴 -->
            <div v-if="recordDetail.timeAxis" class="time__axis">
                <h1><span>#</span>UL timeline cards</h1>
                <ul class="ul">
                    <li style="--accent-color:#41516C">
                        <div class="date">2002</div>
                        <div class="title">Title 1</div>
                        <div class="descr">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas itaque hic
                            quibusdam
                            fugiat est numquam harum, accusamus suscipit consequatur laboriosam!</div>
                    </li>
                    <li style="--accent-color:#FBCA3E">
                        <div class="date">2007</div>
                        <div class="title">Title 2</div>
                        <div class="descr">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos adipisci nobis
                            nostrum
                            vero nihil veniam.</div>
                    </li>
                    <li style="--accent-color:#E24A68">
                        <div class="date">2012</div>
                        <div class="title">Title 3</div>
                        <div class="descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga minima
                            consequuntur
                            soluta placeat iure totam commodi repellendus ea delectus, libero fugit quod reprehenderit,
                            sequi
                            quo, et dolorum saepe nulla hic.</div>
                    </li>
                    <li style="--accent-color:#1B5F8C">
                        <div class="date">2017</div>
                        <div class="title">Title 4</div>
                        <div class="descr">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit, cumque.
                        </div>
                    </li>
                    <li style="--accent-color:#4CADAD">
                        <div class="date">2022</div>
                        <div class="title">Title 5</div>
                        <div class="descr">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit, non.</div>
                    </li>
                </ul>
            </div>
            <!-- 源代码展示 -->
            <div v-if="recordDetail.code" class="code__show">
                <h1><span>#</span>源码展示说明</h1>
                <highlightjs language="js" code='
// 留言区>表情管理
    import EmojiPicker from " vue3-emoji-picker"; 
    import "vue3-emoji-picker/css" ; const
    _ISshow=ref(false); const emojiIs_show=()=> {
    _ISshow.value = !_ISshow.value;
        }
    const input__message = ref("");
    const onVue3Emoje = (val) => {

// 表情输入
    input__message.value += val.i;
        }
        const onChangeText = () => {
        return;
        }' />
            </div>
            <div class="introduce" v-for="(item, index) in paragraph" :key="index" v-if="!isContent">
                <span>
                    {{ item }}
                </span>
            </div>
            <!-- 评论可见 -->
            <div class="comment__show" v-else>
                <div class=" text">评论可见</div>
                <div class="warring">
                    <img src="./icon/warring-icon.svg" alt="warring">
                    <span>此处内容已隐藏</span>
                </div>
            </div>
            <ul class="abstract">
                <li>作者：{{ recordDetail.author }}</li>
                <li>1.本网站部分内容可能来源于网络，仅供大家学习与参考，如有侵权，请联系站长(sara@poetize.cn)进行删除处理。</li>
                <li>2.本网站一切内容不代表本站立场，并不代表本站赞同其观点和对其真实性负责</li>
                <li>3.版权&许可请详阅 <a @click="showModal = true">版权声明</a></li>
            </ul>
            <!-- 评论区 -->
            <div class="comment">
                <h1 class="title">
                    <img src="./icon/edit-icon.svg" alt="edit">
                    <span>留言</span>
                </h1>
                <!-- 输入框 -->
                <div class="comment__input__aera">
                    <textarea class="input" name="comment" maxlength="500" placeholder="写下点什么..."
                        v-model="input__message"></textarea>
                    <img class="input__illustration" src="./img/undraw_welcome_cats_thqn.png" alt="picture">
                </div>
                <!-- 表情/提交按钮 -->
                <div class="submit">
                    <div class="emojipicker" v-show="_ISshow">
                        <EmojiPicker hide-search hide-group-names :native="true" @select="onVue3Emoje"
                            @update:text="onChangeText" theme="auto" />
                    </div>
                    <div @click="emojiIs_show" class="emoji__btn">
                        <img src="./img/Rainbow.gif" alt="">
                    </div>
                    <button class="reMessage" @click="addMessage(recordDetail.contentId)">提交
                        <div class="star-1">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="star-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="star-3">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="star-4">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="star-5">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="star-6">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <!-- 留言记录 -->
            <div class="comment__moudle">
                <div class="sum" v-if="selectComment.length">Comments | {{ selectComment.length }}条留言</div>
                <ul v-if="selectComment.length">
                    <li class="comment__item" v-for="(message, index) in paginatedItems" :key="index">
                        <div>
                            <div class="louyt">
                                <div style="display: flex;">
                                    <div class="profile__picture">
                                        <img :src="message.profile__picture" alt="avatar">
                                    </div>
                                    <div class="time__name">
                                        <div class="nickname">
                                            <span>{{ message.nickname }}</span>
                                            <img class="level"
                                                :src="utils.getAssetsFile('icon/level/' + message.level + '.svg')"
                                                alt="level">
                                        </div>
                                        <div class="time">{{ formatTimestamp(message.timestamp) }}</div>
                                    </div>
                                </div>
                                <div class="reply">
                                    <button @click="showReply(message.commentId)">回复</button>
                                </div>
                            </div>
                            <!-- 留言展示 -->
                            <div class="comment__container">
                                <div class="content">{{ message.content }}</div>
                            </div>
                        </div>
                        <!-- 回复展示 -->
                        <div class="reply__container" v-for="(reply, index) in message.replies" :key="reply.replyId">
                            <div class="louyt">
                                <div style="display: flex;">
                                    <div class="profile__picture">
                                        <img :src="reply.profile__picture" alt="avatar">
                                    </div>
                                    <div class="time__name">
                                        <div class="nickname">
                                            <span>{{ reply.nickname }}</span>
                                            <img class="level"
                                                :src="utils.getAssetsFile('icon/level/' + reply.level + '.svg')"
                                                alt="level">
                                        </div>
                                        <div class="time">{{ formatTimestamp(reply.timestamp) }}</div>
                                    </div>
                                </div>

                            </div>
                            <div class="comment__container">
                                <div class="content"><span>@{{ reply.replyUser }}:</span>{{ reply.replyContent }}</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="noComment" v-else>
                    <span>没有更多留言，去留言吧~</span>
                </div>
                <!-- 分页 -->
                <div class="paginate" v-if="totalItems">
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
        <!-- 留言回复回复框 -->
        <div class="reply-modal" v-if="showReplyModal" @click.self="handleReplyClose" @close="handleReplyClose">
            <div class="modal" data-aos="flip-down">
                <!-- 输入框 -->
                <div class="modal__input__aera">
                    <textarea class="input" name="comment" maxlength="500" placeholder="写下点什么..."
                        v-model="replyContent"></textarea>
                    <img class="input__illustration" src="./img/undraw_welcome_cats_thqn.png" alt="picture">
                </div>
                <!--留言提交 -->
                <div class="MessageSubmit">
                    <div class="emojipicker" v-show="_ModalShow">
                        <EmojiPicker hide-search hide-group-names :native="true" @select="getVue3Emoje"
                            @update:text="onChangeText" theme="auto" />
                    </div>
                    <div @click="modalIs_show" class="emoji__btn">
                        <img src="./img/Rainbow.gif" alt="">
                    </div>
                    <button class="modalSubmit" @click="submitReply(recordDetail.contentId)">提交
                        <div class="star-1">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="star-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="star-3">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="star-4">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="star-5">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="star-6">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53"
                                style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                                <defs></defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                    <path
                                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                                        class="fil0"></path>
                                </g>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import Navigation from '@/components/NavigationMenu/index.vue';
import utils from '@/utils/getAssetsFile';
import { message } from 'ant-design-vue';
import ModalBox from '@/components/ModalBox/index.vue'
import 'highlight.js/lib/common';
import 'highlight.js/styles/stackoverflow-light.css'

// 获取store定义的公共数组
// import { useListDetail } from '@/store/listDetailStore';
// const recordStore = useListDetail();
// const dataContent = ref(recordStore.dataContent); // 存储dataContent的数据
// const learingLife = ref(recordStore.learingLife); // 存储learingLife的数据
// const country = ref(recordStore.country);// 存储country的数据
const selectComment = ref(''); // 留言记录
// const selectContent = ref(''); // 主体记录
// const recordDetail = ref('');// 实际渲染列表
const showReplyModal = ref(false); // 控制回复框的显示/隐藏
const currentReplyId = ref(null); // 当前回复的评论ID
const replyContent = ref(''); // 回复内容
// 显示回复框
const showReply = (commentId) => {
    currentReplyId.value = commentId;
    // 获取对应留言的回复
    showReplyModal.value = true;
    document.body.classList.add('no-scroll'); // 新增
}

// 关闭回复框
const handleReplyClose = () => {
    showReplyModal.value = false;
    replyContent.value = '';
    document.body.classList.remove('no-scroll'); // 新增
}

// 提交回复
const submitReply = () => {
    if (!replyContent.value.trim()) return;

    // 找到回复的留言具体是那一条
    const targetComment = selectComment.value.find(
        c => c.commentId === currentReplyId.value
    );
    // 生成随机两位数 (00-99)
    const randomSuffix = Math.floor(Math.random() * 65)
        .toString()
        .padStart(2, '0');

    // 调用store的addReply方法
    recordStore.addReply(currentReplyId.value, {
        replyId: Date.now(),
        replyContent: replyContent.value,
        timestamp: Date.now(),
        profile__picture: utils.getAssetsFile(
            `img/profile_picture/100${randomSuffix}.png` // 示例: 10003.png -> 100[03].png
        ), nickname: '用户昵称',
        replyUser: targetComment.nickname,
        level: 'lv1'
    });

    // 清空并关闭
    replyContent.value = '';
    showReplyModal.value = false;
    document.body.classList.remove('no-scroll'); // 新增

};
//回复框表情显示/隐藏控制
const _ModalShow = ref(false);
//回复框表情显示/隐藏控制方法
const modalIs_show = () => {
    _ModalShow.value = !_ModalShow.value;
}

//回复框表情输入
const getVue3Emoje = (val) => {
    // 表情输入
    replyContent.value += val.i;
}

// 视频播放
const videoRef = ref(null);
const playVideo = () => {
    const video = videoRef.value;
    if (video && (video.paused || video.ended)) {
        video.play();
    }
};
const isPlaying = ref(false);
const handlePlay = () => {
    isPlaying.value = true;
};
const handlePause = () => {
    isPlaying.value = false;
};
// 控制子组件回复框显示隐藏
const showModal = ref(false);
const handClose = () => {
    showModal.value = false;
}
// 接收组件recordRender传递的路由id
import { useRoute } from 'vue-router';
const route = useRoute();
const paramsId = computed(() => {
    return Number(route.params.id); //默认是字符串类型
});

// import { useMainStore } from "@/store/maincontent";
// const mainStore = useMainStore();
// 获取当前渲染数组里面对应的对象id值,id值是唯一的
// const queryId = computed(() => {
//     return route.query.fatherId
// });
const mainContent = computed(() => {
    return JSON.parse(localStorage.getItem('mainContent'));
});

//通过id值计算该对象所在的数组
// const getCurrentArray = computed(() => {
//     if (dataContent.value.some(item => item.id === queryId.value)) {
//         return dataContent.value;
//     } else if (learingLife.value.some(item => item.id === queryId.value)) {
//         return learingLife.value;
//     } else if (country.value.some(item => item.id === queryId.value)) {
//         return country.value;
//     } else {
//         return []; // 如果没有找到，返回空数组
//     }
// });

//段落分割函数（句号/换行）
function splitParagraphs(text) {
    // 处理空输入
    if (typeof text !== 'string' || text.trim() === '') return [];
    // 按换行符分割为初步段落
    const lines = text.split(/\n+/).map(line => line.trim());
    // 过滤空行
    const validLines = lines.filter(line => line !== '');
    // 按句号分割段落（处理边界情况）
    const paragraphs = [];
    for (const line of validLines) {
        // 按句号分割，但排除缩写词和数字小数点
        const parts = line.split(/(?<!\b[A-Za-z]{1,2})\.\s+/);
        paragraphs.push(...parts);
    }
    // 过滤空段落
    return paragraphs.filter(p => p !== '');
}

//渲染内容
const recordDetail = ref('');
//格式化发布时间
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
const release_time_format = ((date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
})
//获取数据
const getFatherdata = () => {
    // 遍历dataContent数组，找到与queryId匹配的对象
    // const recordDetail = mainContent.value.find(obj => obj.id === queryId.value);
    if (mainContent.value) {
        // console.log(mainContent.value)
        // console.log(paramsId.value)

        recordDetail.value = mainContent.value.find(obj => obj.id === paramsId.value);


        // 将匹配的对象赋值给 selectContent
        // selectContent.value = recordDetail;
        // 遍历selectContent数组，找到与paramsId匹配的对象
        // const contentObject = selectContent.value.content.find(obj => obj.contentId === paramsId.value);
        // if (contentObject) {
        // 将匹配的对象赋值给 recordDetail
        // recordDetail.value = contentObject;
        // }
        // 遍历recordDetail数组，找到与contentId匹配的comment对象
        // const commentObject = selectContent.value.content.find(obj => obj.contentId === paramsId.value);
        // if (commentObject) {
        // 将匹配的对象赋值给 selectComment
        // selectComment.value = commentObject.comment;
        // }
        // calculatePaginatedItems();
        return recordDetail.value;
    } else {
        message.error('未找到匹配的对象');
    }
}
getFatherdata();
//段落内容
const paragraph = splitParagraphs(recordDetail.value.main_text);

// watch((mainContent), (newVal, oldVal) => {
//     if (newVal) {
//         getFatherdata();
//     };
//     immediate: true
// })
// 留言区>表情管理2
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
const _ISshow = ref(false);
const emojiIs_show = () => {
    _ISshow.value = !_ISshow.value;
}
const input__message = ref('');
const onVue3Emoje = (val) => {
    // 表情输入
    input__message.value += val.i;
}

const onChangeText = () => {
    return;
}
// 时间格式化函数
const formatTimestamp = (timestamp) => {
    // 将时间戳格式化为可读的日期字符串
    const date = new Date(timestamp);
    return date.toLocaleString();
}
// (提交按钮)留言动态添加函数
const isContent = ref(false); //内容是否需要评价才可查看
const addMessage = (contentId) => {
    _ISshow.value = false;
    if (input__message.value.trim() === '') {
        return;
    }

    recordStore.updateIsContent(contentId, true);
    // // 更新isContent为true，展示需要留言才能查看的内容
    // recordStore.updateIsContent(contentId, !recordStore.dataContent.some(section =>
    //     section.content.some(item => item.contentId === contentId && item.isContent)
    // ));
    // 添加新留言到 messages 数组，并附带当前时间戳
    setTimeout(() => {
        selectComment.value.unshift({
            profile__picture: utils.getAssetsFile('img/infomalEssay/infomalEssayPicture.jpg'),
            nickname: '昵称来自注册数据表',
            level: 'lv1',
            content: input__message.value.toString(),
            timestamp: Date.now(), // 使用 Date.now() 获取当前时间的时间戳
        });
        // 清空输入框
        input__message.value = '';
        calculatePaginatedItems();
    }, 1000);
}
// 分页
var currentPage = ref(1) // 当前页码
var pageSize = ref(10) // 每页显示的项数
var paginatedItems = ref([]) // 存储分页后的项目列表，实际页面渲染的数据集
var totalItems = computed(() => { // 总项数（通常你会从服务器获取这个值，但在这里我们直接知道）
    return selectComment.value.length;
})

const calculatePaginatedItems = () => { //计算和更新分页后的项目列表 
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    //提取数组中从startIndex到endIndex（不包括endIndex）的部分，这部分即为当前页的项目列表
    paginatedItems.value = selectComment.value.slice(startIndex, endIndex);
}
const onClickHandler = (page) => {
    currentPage.value = page;
    calculatePaginatedItems();
};
onMounted(async () => {
})
</script>
<style lang="scss">
#recordDetail {
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
            /* 添加初始状态防止闪动 */
            opacity: 0;
            transform: translateY(-1rem);
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
            animation: zoomInDown 0.6s ease-out forwards;
            z-index: -1;
        }

        .back__text {
            @include flexCenter(column, center);
            height: 85%;
            color: white;
            font-family: 'gtpy';
            z-index: 2;
            position: relative;
            animation: zoomInDown 0.6s ease-out forwards;
            padding: 0 1rem;
            position: relative;

            .subtitle {
                position: absolute;
                bottom: 0;
                transform: translateX(-60%);

                &>span {
                    font-size: 1.5rem;
                }

                .content {
                    font-size: 0.8rem;
                    align-items: center;
                    padding: 0.5rem 0;

                    .auther,
                    .release {
                        margin-right: 0.5rem;
                    }

                    .funcition {
                        display: flex;

                        li {
                            margin-right: 0.5rem;
                        }
                    }

                    img {
                        margin-right: 0.2rem;
                        height: 0.7rem;
                    }
                }

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

    //内容主体
    .content__container {
        width: 38rem;
        margin-left: auto;
        margin-right: auto;
        font-size: 0.9rem;
        max-height: 38rem;
        animation: zoomInUp 0.6s ease-out forwards;

        .image {
            display: flex;
            justify-content: center;
            position: relative;

            img,
            video {
                width: auto;
                max-height: 25rem;
                overflow: hidden;
            }

        }

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

        .code__show {
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

            .hljs {
                // background: #120101;
                // background-color: #343638;
                overflow-x: auto;
                position: relative;
                padding: 3rem 0.5rem 2rem;
                border-radius: 0.5rem;
                margin: 1.5rem 0;
                font-family: 'gtpy';
                font-size: 20px;
                // color: #e9f1ea;


                &::before {
                    content: "";
                    position: absolute;
                    border-radius: 50%;
                    background: #fc625d;
                    width: 12px;
                    height: 12px;
                    left: 12px;
                    top: 30px;
                    margin-top: -18px;
                    box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
                    z-index: 99;
                }

                &::after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 35px;
                    background: #21252b;
                    left: 0;
                    top: 0;
                    z-index: 1;
                }
            }
        }

        .moudle__tag {
            padding: 0.5rem;
            background-color: #ecf8ff;
            color: #6b6c6d;
            font-size: 0.9rem;
            border-left: 3px solid #50bfff;
            margin: 1rem 0;
        }

        .introduce {
            animation: clipDiamondIn 1s forwards both;

            span {
                text-indent: 2em !important;
                letter-spacing: 0.1rem;
                line-height: 1.5;
                margin-top: 1.2rem;
                text-indent: 2em; //首行缩进
            }
        }

        .comment__show {
            border: 2px dashed #ff416c;
            border-radius: 0.4rem;
            padding: 3rem;
            font-weight: 700;
            text-align: center;
            position: relative;
            margin-top: 3rem;

            .text {
                background-color: #ff416c;
                color: white;
                font-size: 1.2rem;
                border-radius: 1rem;
                padding: 0.4rem 0;
                width: 180px;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%, -50%);

            }

            .warring {
                font-size: 0.8rem;
                color: #ff416c;
                display: flex;
                align-items: center;
                justify-content: center;

                &>img {
                    width: 0.9rem;
                }
            }
        }

        .abstract {
            background-color: #ecf8ff;
            border-left: 3px solid #50bfff;
            padding: 0.5rem;
            line-height: 1.5rem;
            margin-top: 2rem;

            li>a {
                color: #3c8dfe;
            }
        }

        //评论区
        .comment {

            .title {
                font-size: 1.2rem;
                font-weight: 700;
                color: #ffa500;
                display: flex;
                align-items: center;
                padding: 1rem 0;

                &>img {
                    width: 24px;

                }
            }

            .comment__input__aera {
                position: relative;
                // z-index: -1;

                .input {
                    height: 12rem;
                    width: 100%;
                    resize: none;
                    font-size: 0.8rem;
                    padding: 1rem;
                    border-radius: 0.25rem;
                    transition: all 0.1s linear;
                    background-color: transparent;
                    border-color: #3f3d56;

                    &::placeholder {
                        font-size: 0.7rem;
                    }

                    &:focus {
                        border-color: #ffa500;
                    }
                }

                .input__illustration {
                    width: 11rem;
                    height: 6rem;
                    border-radius: 0.25rem;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    z-index: -1;
                }
            }

            .submit {
                text-align: right;
                padding: 1rem;
                position: relative;
                @include flexCenter(row, space-between);

                //表情显示隐藏控制按钮
                .emoji__btn {
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    overflow: hidden;

                    img {
                        width: 25px;
                        transition: transform 0.5s ease-in-out;
                        transform: rotate(0deg) scale(1);
                    }

                    &:hover>img {
                        transform: rotate(360deg) scale(1.3);
                    }
                }

                .emojipicker {
                    width: 100%;
                    position: absolute;
                    left: 0;
                    top: 2.8rem;
                    @include flexCenter(row, center);

                    //表情模块
                    .v3-emoji-picker {
                        width: 100%;
                        height: 20rem;

                        //导航栏
                        .v3-header {
                            padding: 0.5rem 2rem;

                            .v3-groups {
                                @include flexCenter(row, space-between);

                                .v3-group {
                                    border-radius: 0.2rem;
                                    flex-grow: 0;
                                    cursor: pointer;
                                    padding: 0.4rem 0.6rem;

                                    &:hover {
                                        background-color: #ff8345;
                                    }

                                    .v3-icon {
                                        img {
                                            width: 30px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                //提交按钮
                .reMessage {
                    $color: #ff8345;
                    font-family: 'gtpy';
                    position: relative;
                    padding: 0.2rem 0.8rem;
                    background: $color;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: rgb(255, 255, 255);
                    border: 1.5px solid $color;
                    border-radius: 8px;
                    // box-shadow: 0 0 0 rgba(255, 138, 159, 0.55);
                    transition: all .3s ease-in-out;
                    cursor: pointer;

                    .star-1 {
                        position: absolute;
                        top: 20%;
                        left: 20%;
                        width: 25px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
                    }

                    .star-2 {
                        position: absolute;
                        top: 45%;
                        left: 45%;
                        width: 15px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
                    }

                    .star-3 {
                        position: absolute;
                        top: 40%;
                        left: 40%;
                        width: 5px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
                    }

                    .star-4 {
                        position: absolute;
                        top: 20%;
                        left: 40%;
                        width: 8px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all .8s cubic-bezier(0, 0.4, 0, 1.01);
                    }

                    .star-5 {
                        position: absolute;
                        top: 25%;
                        left: 45%;
                        width: 15px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all .6s cubic-bezier(0, 0.4, 0, 1.01);
                    }

                    .star-6 {
                        position: absolute;
                        top: 5%;
                        left: 50%;
                        width: 5px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all .8s ease;
                    }

                    //星颜色
                    .fil0 {
                        fill: #f24056
                    }

                    &:hover {
                        background: transparent;
                        color: #f24056;
                        box-shadow: 0 0 25px rgba(254, 149, 205, 0.55);

                        .star-1 {
                            position: absolute;
                            top: -80%;
                            left: -30%;
                            width: 25px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }

                        .star-2 {
                            position: absolute;
                            top: -25%;
                            left: 10%;
                            width: 15px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }

                        .star-3 {
                            position: absolute;
                            top: 55%;
                            left: 25%;
                            width: 5px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }

                        .star-4 {
                            position: absolute;
                            top: 30%;
                            left: 80%;
                            width: 8px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }

                        .star-5 {
                            position: absolute;
                            top: 25%;
                            left: 115%;
                            width: 15px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }

                        .star-6 {
                            position: absolute;
                            top: 5%;
                            left: 60%;
                            width: 5px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }
                    }
                }
            }
        }

        .comment__moudle {

            .sum {
                color: #696969;
            }

            //留言记录
            .comment__item {
                padding: 0.5rem;
                border-bottom: 1px solid #ccc;

                .louyt {
                    @include flexCenter(row, space-between);

                    .profile__picture {
                        width: 1.75rem;
                        height: 1.75rem;
                        border-radius: 0.25rem;
                        background-color: pink;
                        overflow: hidden;
                    }

                    .time__name {
                        display: flex;
                        flex-direction: column;
                        margin: 0 0.5rem;
                        letter-spacing: 1px;
                        line-height: 1.2;
                        font-weight: 700;

                        .nickname {
                            color: #ff7645;
                            width: 100%;
                            @include flexCenter(row, flex-start);

                            span {
                                margin-right: 0.5rem;

                            }

                            .level {
                                height: 1.2rem;
                                width: 1.2rem;
                            }
                        }

                        .time {
                            font-size: 0.75rem;
                            color: #8d8d8d;
                        }

                    }

                    //回复
                    .reply {
                        border: 1px solid #ff8345;
                        font-size: 0.7rem;
                        color: #ff8345;
                        border-radius: 0.2rem;
                        padding: 0.1rem 0.2rem;
                        transition: all 0.3s ease;

                        button {
                            font-family: 'gtpy';
                        }

                        &:hover {
                            cursor: pointer;
                            background-color: #ff8345;
                            color: white;
                        }
                    }

                }

                .comment__container {
                    padding: 0.8rem;
                    padding-left: 1.75rem;

                    .content {
                        background-color: #f7f9fe;
                        padding: 0.7rem;
                        border-radius: 0.25rem;
                        letter-spacing: 1px;
                        line-height: 1.5;
                        word-break: break-all;
                    }
                }

                //回复
                .reply__container {
                    padding: 0.5rem 0;
                    padding-left: 1.5rem;

                    .louyt {
                        @include flexCenter(row, space-between);

                        .profile__picture {
                            width: 1.75rem;
                            height: 1.75rem;
                            border-radius: 0.25rem;
                            background-color: pink;
                            overflow: hidden;
                        }

                        .time__name {
                            display: flex;
                            flex-direction: column;
                            margin: 0 0.5rem;
                            letter-spacing: 1px;
                            line-height: 1.2;
                            font-weight: 700;

                            .nickname {
                                color: #ff7645;
                                width: 100%;
                                @include flexCenter(row, flex-start);

                                span {
                                    margin-right: 0.5rem;

                                }

                                .level {
                                    height: 1.2rem;
                                    width: 1.2rem;
                                }
                            }

                            .time {
                                font-size: 0.75rem;
                                color: #8d8d8d;
                            }

                        }
                    }

                    .comment__container {
                        padding: 0.8rem;
                        padding-left: 1.75rem;

                        .content {
                            background-color: #f7f9fe;
                            padding: 0.7rem;
                            border-radius: 0.25rem;
                            letter-spacing: 1px;
                            line-height: 1.5;
                            word-break: break-all;

                            span {
                                color: #2e82f9;
                            }
                        }
                    }

                }

            }

            //没有留言
            .noComment {
                margin: 1rem 0;
                border-top: dashed 1px #ccc;
                text-align: center;
                padding: 2rem 0;
            }

            .paginate {
                @include flexCenter(row, center);
                padding: 1rem 0;

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

        img {
            width: 100%;
            height: 100%;
        }
    }

    //留言回复框
    .reply-modal {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 998;
        cursor: pointer;
        width: 100%;
        height: 100%;


        .modal {
            background-color: white;
            padding: 1rem;
            padding-bottom: 0;
            border-radius: 8px;
            min-width: 30rem;
            max-width: 40vw;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            cursor: auto;
            position: relative;
            user-select: none;

            .modal__input__aera {
                position: relative;

                .input {
                    height: 10rem;
                    width: 100%;
                    resize: none;
                    font-size: 0.8rem;
                    padding: 1rem;
                    border-radius: 0.25rem;
                    transition: all 0.1s linear;
                    background-color: transparent;
                    border-color: #3f3d56;
                    position: relative;
                    z-index: 2;

                    &::placeholder {
                        font-size: 0.7rem;
                    }

                    &:focus {
                        border-color: #ffa500;
                    }
                }

                .input__illustration {
                    width: 8rem;
                    height: 4rem;
                    border-radius: 0.25rem;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    z-index: 1;
                }
            }

            .MessageSubmit {
                text-align: right;
                padding: 1rem;
                position: relative;
                @include flexCenter(row, space-between);


                .emoji__btn {
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    overflow: hidden;

                    img {
                        width: 25px;
                        transition: transform 0.5s ease-in-out;
                        transform: rotate(0deg) scale(1);
                    }

                    &:hover>img {
                        transform: rotate(360deg) scale(1.3);
                    }
                }

                .emojipicker {
                    width: 28rem;
                    position: absolute;
                    left: 0;
                    top: 2.8rem;
                    @include flexCenter(row, center);

                    //表情模块
                    .v3-emoji-picker {
                        width: 100%;
                        height: 15rem;

                        //导航栏
                        .v3-header {
                            padding: 0.5rem 2rem;

                            .v3-groups {
                                @include flexCenter(row, space-between);

                                .v3-group {
                                    border-radius: 0.2rem;
                                    flex-grow: 0;
                                    cursor: pointer;
                                    padding: 0.4rem 0.6rem;

                                    &:hover {
                                        background-color: rgba(255, 138, 159);
                                    }

                                    .v3-icon {
                                        img {
                                            width: 30px;
                                        }
                                    }
                                }
                            }
                        }

                        //具体表情区域
                        .v3-body {
                            .v3-body-inner {
                                .v3-emojis {
                                    button {
                                        padding: 1rem;
                                    }
                                }
                            }
                        }
                    }
                }

                //提交按钮
                .modalSubmit {
                    $color: #ff8345;
                    font-family: 'gtpy';
                    position: relative;
                    padding: 0.2rem 0.6rem;
                    background: $color;
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: rgb(255, 255, 255);
                    border: 1.5px solid $color;
                    border-radius: 8px;
                    transition: all .3s ease-in-out;
                    cursor: pointer;

                    .star-1 {
                        position: absolute;
                        top: 20%;
                        left: 20%;
                        width: 25px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
                    }

                    .star-2 {
                        position: absolute;
                        top: 45%;
                        left: 45%;
                        width: 15px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
                    }

                    .star-3 {
                        position: absolute;
                        top: 40%;
                        left: 40%;
                        width: 5px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
                    }

                    .star-4 {
                        position: absolute;
                        top: 20%;
                        left: 40%;
                        width: 8px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all .8s cubic-bezier(0, 0.4, 0, 1.01);
                    }

                    .star-5 {
                        position: absolute;
                        top: 25%;
                        left: 45%;
                        width: 15px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all .6s cubic-bezier(0, 0.4, 0, 1.01);
                    }

                    .star-6 {
                        position: absolute;
                        top: 5%;
                        left: 50%;
                        width: 5px;
                        height: auto;
                        filter: drop-shadow(0 0 0 #fffdef);
                        z-index: -5;
                        transition: all .8s ease;
                    }

                    //星颜色
                    .fil0 {
                        fill: #f24056
                    }

                    &:hover {
                        background: transparent;
                        color: #f24056;
                        box-shadow: 0 0 25px rgba(254, 149, 205, 0.55);

                        .star-1 {
                            position: absolute;
                            top: -80%;
                            left: -30%;
                            width: 25px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }

                        .star-2 {
                            position: absolute;
                            top: -25%;
                            left: 10%;
                            width: 15px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }

                        .star-3 {
                            position: absolute;
                            top: 55%;
                            left: 25%;
                            width: 5px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }

                        .star-4 {
                            position: absolute;
                            top: 30%;
                            left: 80%;
                            width: 8px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }

                        .star-5 {
                            position: absolute;
                            top: 25%;
                            left: 115%;
                            width: 15px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }

                        .star-6 {
                            position: absolute;
                            top: 5%;
                            left: 60%;
                            width: 5px;
                            height: auto;
                            filter: drop-shadow(0 0 10px #fffdef);
                            z-index: 2;
                        }
                    }
                }
            }
        }
    }
}

// 版权说明
.modal__box {
    font-family: 'gtpy';

    h1 {
        font-size: 20px;
        display: flex;
        justify-content: center;
        padding-bottom: 1rem;
        font-weight: 700;
    }

    h2 {
        font-size: 20px;
        padding: 1rem 0;
        line-height: 1.5;
    }

    p {
        text-indent: 2em;
        line-height: 2.5;
    }
}

// 视频播放按钮
.play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4rem;
    /* 按钮的宽度 */
    height: 2.5rem;
    /* 按钮的高度 */
    background: rgba(0, 0, 0, 0.6);
    /* 半透明背景 */
    border: none;
    border-radius: 10%;
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
        border-left: 30px solid white;
        /* 三角形左边的颜色和宽度 */
        border-top: 15px solid transparent;
        /* 三角形顶部的透明度和宽度 */
        border-bottom: 15px solid transparent;
        /* 三角形底部的透明度和宽度 */
    }

    &:hover {
        background: rgb(0, 135, 245, 0.6); //
        /* 鼠标悬停时背景变亮 */
    }
}

// 模态框打开时禁止滚动
.no-scroll {
    overflow: hidden !important;
    // position: fixed;
    width: 100%;
}
</style>