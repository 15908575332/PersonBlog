<template>
    <div class="body">
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
            <div class=" background__img" :style="backTextStyle">
                <!-- 背景图 -->
                <div class=" backPhoto" :style="{ backgroundImage: `url(${recordDetail.cover_image_url})` }"></div>
                <!-- 遮罩 -->
                <div class="mask"></div>
                <div class="back__text">
                    <!-- 二级标题 -->
                    <div class="subtitle">
                        <span> {{ recordDetail.sub_tag }}</span>
                        <div style="display: flex;" class="content">
                            <!-- 作者 -->
                            <div class="auther">
                                <img src='@/assets/icon/recordList/auther.svg' alt="">
                                <span class="name">{{ recordDetail.username }} ·</span>
                            </div>
                            <!-- 发布 -->
                            <div class="release">
                                <img src="@/assets/icon/recordList/release.svg" alt="">
                                <span>发布于{{ dayjs(recordDetail.release_time).format('YYYY-MM-DD HH:mm:ss') }} ·</span>
                            </div>
                            <ul class="funcition">
                                <li>
                                    <img src="@/assets/icon/recordList/heat.svg" alt="heat">
                                    <span>{{ recordDetail.heat }}热度 ·</span>
                                </li>
                                <li>
                                    <img src="@/assets/icon/recordList/comment.svg" alt="comment">
                                    <span>{{ totals }}评论 ·</span>
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
                <!-- 资源展示 -->
                <div class="image">
                    <video v-if="recordDetail.cover_video_url" :src="recordDetail.cover_video_url" controls
                        ref="videoRef" @play="handlePlay" @pause="handlePause"></video>
                    <img v-else :src="recordDetail.cover_image_url" alt="backimg">
                    <button v-if="recordDetail.cover_video_url && !isPlaying" class="play-button"
                        @click="playVideo"></button>
                </div>
                <!-- 标签 -->
                <div class="module__tag">
                    {{ recordDetail.title }}
                </div>
                <!-- 主内容区域 -->
                <div v-if="!recordDetail.has_comment">
                    <div class="content" v-if="articleSections.length > 0" v-for="content in articleSections"
                        :key="content.title">
                        <div>
                            <h1 class="content_title"><span>#</span>{{ content.title }}</h1>
                            <div class="content_model" v-for="text in splitParagraphs(content.content)">
                                <div>
                                    {{ text }}
                                    <ul v-if="content.level === 200">
                                        <li>123</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div v-else>
                        <div class="introduce" v-for="pre in splitParagraphs(recordDetail.preface)">
                            <span>
                                {{ pre }}
                            </span>
                        </div>
                    </div>
                </div>
                <!-- 评论可见 -->
                <div class="comment__show" v-else>
                    <div class=" text">评论可见</div>
                    <div class="warring">
                        <img src="./icon/warring-icon.svg" alt="warring">
                        <span>此处内容已隐藏</span>
                    </div>
                </div>
                <!-- 提示 -->
                <ul class="abstract">
                    <li>作者：{{ recordDetail.username }}</li>
                    <li>1.本网站部分内容可能来源于网络，仅供大家学习与参考，如有侵权，请联系站长(Blog@blog.cn)进行删除处理。</li>
                    <li>2.本网站一切内容不代表本站立场，并不代表本站赞同其观点和对其真实性负责</li>
                    <li>3.版权&许可请详阅 <a @click="showModal = true">版权声明</a></li>
                </ul>
                <!-- 操作按钮 -->
                <div class="feed">
                    <div class="card">
                        <div class="collectBtn btn" @click="shareLike">
                            <p>收藏</p>
                            <img src="./icon/icons8-favorite-48.png" alt="favorite">
                        </div>
                        <button class="likeBtn btn" @click="handleLikeClick(recordDetail.article_id)">
                            <p style="text-wrap: nowrap;">点赞</p>
                            <div class="heart" :class="{ 'heartAnimation': Boolean(isLiked) }">
                            </div>
                        </button>
                        <div class="shareBtn btn" @click="shareLike">
                            <p>分享</p>
                            <img src="./icon/icons8-share-48.png" alt="share">
                        </div>
                    </div>
                </div>
                <!-- 评论区 -->
                <div class="comment">
                    <h1 class="title">
                        <img src="./icon/icons8-write-64.png" alt="edit">
                        <span>评论</span>
                    </h1>
                    <!-- 输入框 -->
                    <div class="comment__input__aera">
                        <div class="box-inner">
                            <textarea class="input" name="comment" maxlength="500" placeholder="写下点什么..."
                                v-model="input__message"></textarea>
                            <img class="input__illustration" src="./img/undraw_welcome_cats_thqn.png" alt="picture">
                        </div>
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
                <!-- 评论记录 -->
                <div class="comment__module">
                    <div class="sum">Comments | {{ totals }}条评论</div>
                    <ul v-if="messageList.length > 0">
                        <li class="comment__item" :class="{ 'reply__item': message.length > 0 }"
                            v-for="(message, index) in messageList" :key="index">
                            <div>
                                <div class="louyt">
                                    <div style="display: flex;">
                                        <div class="profile__picture">
                                            <img :src="message.user.avatarUrl" alt="avatar">
                                        </div>
                                        <div class="time__name">
                                            <div class="nickname">
                                                <span>{{ message.user.username }}</span>
                                                <img class="level" :src="utils.getAssetsFile('icon/level/lv' + message.user.vip_level
                                                    + '.svg')" alt="level">
                                            </div>
                                            <div class="time">{{ message.createdAt }}</div>
                                        </div>
                                    </div>
                                    <div class="reply">
                                        <button @click="handleReply(message)">回复</button>
                                    </div>
                                </div>
                                <!-- 评论展示 -->
                                <div class="comment__container">
                                    <div class="content">{{ message.content }}</div>
                                </div>
                            </div>
                            <!-- 回复展示 -->
                            <div class="reply__container" v-for="value in message.replies">
                                <div class="louyt">
                                    <div style="display: flex;">
                                        <div class="profile__picture">
                                            <img :src="value.user.avatarUrl" alt="avatar">
                                        </div>
                                        <div class="time__name">
                                            <div class="nickname">
                                                <span>{{ value.user.username }}</span>
                                                <img class="level"
                                                    :src="utils.getAssetsFile('icon/level/lv' + value.user.vip_level + '.svg')"
                                                    alt="level">
                                            </div>
                                            <div class="time">{{ dayjs(message.createdAt).format('YYYY-MM-DD HH:mm:ss')
                                                }}</div>
                                        </div>
                                    </div>

                                </div>
                                <div class="comment__container">
                                    <div class="content"><span>@{{ message.user.username }}:</span>{{ value.content }}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="noComment" v-else>
                        <span>没有更多评论，去评论吧~</span>
                    </div>
                    <!-- 分页 -->
                    <div class="paginate" v-if="totals">
                        <vue-awesome-paginate :total-items="totals" v-model="currentPage" :items-per-page="pageSize"
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

            <!-- 评论回复框 -->
            <div class="reply-modal" v-if="showReplyModal" @click.self="handleReplyClose" @close="handleReplyClose">
                <div class="modal" data-aos="flip-down">
                    <!-- 输入框 -->
                    <div class="modal__input__aera">
                        <textarea class="input" name="comment" maxlength="500" :placeholder='replyUser'
                            v-model="replyContent"></textarea>
                        <img class="input__illustration" src="./img/undraw_welcome_cats_thqn.png" alt="picture">
                    </div>
                    <!--评论提交 -->
                    <div class="MessageSubmit">
                        <div class="emojipicker" v-show="_ModalShow">
                            <EmojiPicker hide-search hide-group-names :native="true" @select="getVue3Emoje"
                                @update:text="onChangeText" theme="auto" />
                        </div>
                        <div @click="modalIs_show" class="emoji__btn">
                            <img src="./img/Rainbow.gif" alt="">
                        </div>
                        <button class="modalSubmit" @click="handleReplyPost()">提交
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

            <!-- 分享卡片 -->
            <div class="share-modal" v-if="showShareModal" @click.self="handleShareClose" @close="handleShareClose">
                <div class="modal" data-aos="fade-up" ref="shareCard">
                    <!-- 标题 -->
                    <p class="modal_title">卡片分享</p>
                    <div class="modal__content">
                        <!-- 头像 -->
                        <div class="modal__avatar">
                            <img :src="userStore.user.avatarUrl" alt="头像">
                        </div>
                        <!-- 分享时间 -->
                        <p class="dateTime">
                            {{ dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') }}
                        </p>
                        <!-- 分享内容 -->
                        <div class="shareContent">
                            <!-- 内容标题 -->
                            <p class="content_title">
                                {{ recordDetail.title }}
                            </p>
                            <!-- 图片展示 -->
                            <div class="content_img">
                                <img :src="recordDetail.cover_image_url" alt="图片">
                            </div>
                            <!-- 作者 -->
                            <p class="content_author">
                                {{ recordDetail.username }}
                            </p>
                            <!-- 二维码生成区域 -->
                            <div class="content_qrcode">
                                <div class="text">
                                    <p>BLOG</p>
                                </div>
                                <div class="code">
                                    <Qrcode :value="currentUrl" width="500" hight="500" margin="0"></Qrcode>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- 下载图片按钮 -->
                    <div class="download">
                        <span class="download-btn" @click="downloadCard">下载卡片</span>
                        <span class="more" @click="moreShare">更多分享</span>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, computed, getCurrentInstance, watch } from 'vue';
import { useAuthStore } from '@/store/auth';
import utils from '@/utils/getAssetsFile';
import { message } from 'ant-design-vue';
import ModalBox from '@/components/ModalBox/index.vue'
import 'highlight.js/lib/common';
import 'highlight.js/styles/stackoverflow-light.css'
import { splitParagraphs } from '@/utils/splitParagraphs'; //引入段落处理函数
import { useRoute } from 'vue-router';
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
import Qrcode from 'vue-qrcode';
import html2canvas from 'html2canvas';
import dayjs from "dayjs";
const route = useRoute();
const instance = getCurrentInstance();
const $http = instance.appContext.config.globalProperties.$http;

/** ------------------------外部参数处理------------------------ */
const props = defineProps({
    articleId: { // 文章article_id，由父组件传入
        type: [String, Number],
        required: true
    },
    backTextHeight: { // 顶部标题高度
        type: [Number, String],
        default: 18
    }
});
const backTextStyle = computed(() => {
    return { '--back-text-height': `${props.backTextHeight}rem` }
});
const paramsId = computed(() => { //本文实际使用唯一参数值
    if (props.articleId != null) {
        return props.articleId;
    }
    if (route.params.id != null) {
        return route.params.id; //文章article_id，由路由参数传入
    }
    return null;
});

/** ------------------------获取数据------------------------ */
const articleSections = ref([]); //文章段落内容
const recordDetail = ref(''); //文章详情（基本信息）
const getColumnDetailData = async () => { // 获取文章详情（基本信息）
    try {
        const response = await $http.get('/main/getColumnDetail', {
            params: {
                article_id: paramsId.value
            }
        });
        if (!response.articleDetail) throw new Error("无效数据");
        recordDetail.value = response.articleDetail[0] || {};
    } catch (error) {
        console.error("请求错误:", error);
        error.value = "数据加载失败";
        recordDetail.value = {}; // 确保错误时清空数据
    }
}
const getArticleContent = async () => { // 获取文章内容段落
    try {
        const response = await $http.get('/main/getArticleSections', {
            params: {
                id: paramsId.value
            }
        });
        if (!response.sections) throw new Error("无效数据");
        articleSections.value = response.sections;
    } catch (error) {
        console.error("请求错误:", error);
        error.value = "数据加载失败";
        articleSections.value = []; // 确保错误时清空数据
    }
}
watch(() => props.articleId, getColumnDetailData, { immediate: true }); // 在组件挂载时和articleId变化时触发

/** ------------------------文章浏览量计数------------------------ */
const updateHeat = async (id) => {
    try {
        const response = await $http.post('/main/updateHeat', { id });
        recordDetail.value.heat = response.heat;
    } catch (error) {
        console.error('更新失败:', error);
    }
}

/** ------------------------点赞量计数------------------------ */
const userStore = useAuthStore(); //当前登录用户信息
const isLiked = ref(false); // 当前用户是否点赞了该文章
const checkLikeStatus = async (article_id) => { //检查当前用户点赞状态
    try {
        const response = await $http.get('/main/checkLikeStatus', {
            params: {
                user_id: userStore.user.userId,
                article_id
            }
        });
        isLiked.value = response.hasLiked;
    } catch (error) {
        console.error('检查点赞状态失败:', error);
    }
}

const updateLike = (async (article_id) => {
    try {
        const response = await $http.post('/main/likeArticle', { user_id: userStore.user.userId, article_id });
        recordDetail.value.like_count = response.likeCount;
        message.success('点赞成功');
        isLiked.value = true;
    } catch (error) {
        console.error('更新失败:', error);
        message.error(error.response.data.message);
    }
})
const handleLikeClick = async (article_id) => { // 点赞/取消点赞函数
    await updateLike(article_id);
}

/** ------------------------ 分享模块 ------------------------ */
const showShareModal = ref(false);
const shareLike = () => {
    showShareModal.value = true;
    document.body.style.overflow = 'hidden';
}
const handleShareClose = () => {
    showShareModal.value = false;
    if (showShareModal) {
        document.body.style.overflow = 'auto';
    }
}
const moreShare = () => {
    // 使用浏览器的分享 API
    if (navigator.share) {
        navigator.share({
            title: '分享标题',
            text: '分享内容',
            url: window.location.href
        }).then(() => {
            // message.success('分享成功');
        }).catch((error) => {
            message.error('分享失败:', error);
        });
    } else {
        // 不支持分享 API 的浏览器可以使用其他分享方式，例如复制链接
        copyToClipboard(window.location.href);
        message.success('链接已复制到剪贴板');
    }
}

/** ------------------------二维码生成/下载按钮------------------------ */
const currentUrl = window.location.href;// 获取当前url
const shareCard = ref(null); //获取元素
const downloadCard = async () => {
    if (!shareCard.value) return;
    try {
        const canvas = await html2canvas(shareCard.value, {
            scale: 2, // 关键：提高分辨率（默认 1，值越大越清晰）
            useCORS: true, // 允许跨域图片
        });
        const imgUrl = canvas.toDataURL('image/png'); // 生成图片 Data URL（PNG 格式）
        downloadImage(imgUrl, '分享卡片.png'); // 调用下载方法
    } catch (error) {
        message.error('生成分享卡片失败:', error);
    }
};
const downloadImage = (url, filename) => { // 下载方法
    const a = document.createElement('a'); // 创建临时 a 标签
    a.href = url;
    a.download = filename; // 下载文件名
    a.style.display = 'none';
    document.body.appendChild(a); // 模拟点击下载
    a.click();
    document.body.removeChild(a); // 清理资源
    URL.revokeObjectURL(url); // 释放 Blob URL（如果是 Blob 类型需要）
}

/** ------------------------评论区------------------------ */
const _ISshow = ref(false); // 表情选择器状态
const emojiIs_show = () => {
    _ISshow.value = !_ISshow.value;
}
const onVue3Emoje = (val) => {
    input__message.value += val.i; // 表情输入
}
const onChangeText = () => {
    return;
}
const messageList = ref([]); //评论列表
const currentPage = ref(1); //当前页
const totalPages = ref(1); //总页数
const pageSize = ref(5);
const totals = ref(0); //总条数
const input__message = ref(''); //评论内容
const getMessageList = async () => { // 获取评论列表
    try {
        const res = await $http.get('/message/getblogmessageList', {
            params: {
                page: currentPage.value,
                pageSize: pageSize.value,
                article_id: paramsId.value,
                parentId: 0
            },
        });
        messageList.value = res.data.list.filter(item => !item.parentId);
        totals.value = res.data.pagination.total;
        totalPages.value = Math.ceil(totals.value / pageSize.value);
    } catch (error) {
        console.error(error.response.data.msg);
    }
}
const addMessage = async () => { // 发布评论
    if (!input__message.value.trim()) return;

    try {
        await $http.post('/message/postmessage', {
            content: input__message.value,
            article_id: paramsId.value
        },
            {
                headers: {
                    'Authorization': `Bearer ${userStore.token}`
                }
            });

        message.success('发布成功');
        getMessageList();
        input__message.value = '';

    } catch (error) {
        message.error(error.response.data.msg)

    }
}
/** ------------------------回复功能------------------------ */
/**
 * @param {Boolean} showReplyModal 回复框状态
 * @param {String} replyUser 被回复用户
 * @param {Number} replyUserId 被回复用户id
 * @param {String} replyContent 回复内容
 * @param {Number} activeParentId 被回复评论id
 * @param {Function} handleReply 回复的函数，参数message为每一篇article
 * @param {Function} handleReplyPost 提交回复函数
 */
const showReplyModal = ref(false);
const replyUser = ref('');
const replyUserId = ref(0);
const replyContent = ref('');
const activeParentId = ref(0);
const handleReply = (message) => {
    showReplyModal.value = true;
    activeParentId.value = message.id;
    replyUserId.value = message.userId;
    replyUser.value = `@${message.user.username}`;
    document.body.classList.add('no-scroll'); // 新增
}
const handleReplyPost = async () => { // 提交回复
    if (!replyContent.value.trim()) return;
    try {
        await $http.post('/message/replies', {
            content: replyContent.value,
            userId: replyUserId.value,
            currentFatherId: activeParentId.value
        },
            {
                headers: {
                    'Authorization': `Bearer ${userStore.token}`
                }
            });
        message.success('回复成功');
        getMessageList();
        replyContent.value = '';
        activeParentId.value = 0;
        showReplyModal.value = false;
        document.body.classList.remove('no-scroll'); // 新增
    } catch (error) {
        message.warning(error.response.data.msg)
    }
}
const handleReplyClose = () => { // 关闭回复框
    showReplyModal.value = false;
    replyContent.value = '';
    document.body.classList.remove('no-scroll'); // 新增
}
const _ModalShow = ref(false);//回复框表情显示/隐藏控制
const modalIs_show = () => { //回复框表情显示/隐藏控制方法
    _ModalShow.value = !_ModalShow.value;
}
const getVue3Emoje = (val) => { //回复框表情输入
    replyContent.value += val.i; // 表情输入
}
const showModal = ref(false); // 控制子组件回复框显示隐藏
const handClose = () => {
    showModal.value = false;
}

/** ------------------------视频播放------------------------ */
/**
 * @param {HtmlElement} videoRef 视频节点
 * @param {Boolean} isPlaying 视频播放状态
 * @param {Function} handlePlay 播放视频
 * @param {Function} handlePause 暂停视频
 */
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

/** ------------------------分页→下一页------------------------ */
const onClickHandler = (page) => {
    currentPage.value = page;
    getMessageList();
}

onMounted(async () => {
    await checkLikeStatus(paramsId.value);
    await updateHeat(paramsId.value);
    await getMessageList();
    await getArticleContent();

})
</script>
<style lang="scss" scoped>
@property --rotate {
    syntax: "<angle>";
    initial-value: 30deg;
    inherits: false;
}

#recordDetail {
    font-family: 'gtpy';
    font-size: 0.75rem;
    // background: $pages-background-color;
    min-height: 100vh;
    width: 100%;
    background-image: linear-gradient(90deg, rgba(147, 157, 163, 0.1) 1px, #fff 0),
        linear-gradient(180deg, rgba(37, 82, 110, 0.1) 1px, #fff 0);
    background-size: 2rem 2rem;

    // 背景设置
    .background__img {
        height: var(--back-text-height);

        // 背景图 
        .backPhoto {
            width: 100vw;
            height: 19rem;
            background-size: cover;
            z-index: 0;
            background-position: center;
            position: absolute;
            top: 0;
            /* 添加初始状态防止闪动 */
            opacity: 0;
            transform: translateY(-1rem);
            animation: zoomInDown 0.6s ease-out forwards;

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
            z-index: 1;
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

    }

    //内容主体
    .content__container {
        width: 38rem;
        margin-left: auto;
        margin-right: auto;
        font-size: 0.9rem;
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


        //标签
        .module__tag {
            padding: 0.5rem;
            background-color: #ecf8ff;
            color: #6b6c6d;
            font-size: 0.9rem;
            border-left: 2px solid #ff6d6d;
            margin: 1rem 0;
        }

        //主内容区域
        .content {
            padding: 1rem 0;

            //标题
            .content_title {
                padding: 0.2rem 0;
                border-bottom: 1px dashed #ccc;
                font-size: 1.5rem;
                font-weight: 600;

                span {
                    color: #ff6d6d;
                    padding: 0 0.2rem;

                }
            }

            //内容
            .content_model {
                padding: 0.7rem 0.5rem;
                text-indent: 1em; //首行缩进
                font-size: 0.9rem;
                line-height: 1.8rem;
            }
        }

        .introduce {
            animation: clipDiamondIn 1s forwards both;

            span {
                display: inline-block;
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
            border-left: 2px solid #ff6d6d;
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
                color: $primary-sub;
                display: flex;
                align-items: center;
                padding: 1rem 0;

                &>img {
                    width: 24px;

                }
            }

            .comment__input__aera {
                $layoutPosition: 0.2rem;
                $outLineWidth: 0.1rem; //外圈线宽
                $innerLineWidth: 0.05rem; //内圈线宽
                $outLineColor: $primary-sub; //外圈颜色
                $innerLineColor: $assistance-8; //内圈颜色
                position: relative;
                padding: $layoutPosition;
                border: $outLineWidth solid $outLineColor;

                &::after,
                &::before {
                    content: "•";
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    font-size: 14px;
                    color: $innerLineColor;
                    border: $innerLineWidth solid $innerLineColor;
                    line-height: 12px;
                    top: $layoutPosition;
                    text-align: center;
                }

                &::before {
                    left: $layoutPosition;
                }

                &::after {
                    right: $layoutPosition;
                }

                .box-inner {
                    position: relative;
                    border: $innerLineWidth dotted $innerLineColor;


                    &::after,
                    &::before {
                        content: "•";
                        position: absolute;
                        width: 14px;
                        height: 14px;
                        font-size: 14px;
                        color: $innerLineColor;
                        border: $innerLineWidth solid $innerLineColor;
                        line-height: 12px;
                        bottom: -2px;
                        text-align: center;
                    }

                    &::before {
                        left: -$innerLineWidth;
                        bottom: -$innerLineWidth;
                    }

                    &::after {
                        right: -$innerLineWidth;
                        bottom: -$innerLineWidth;
                    }
                }

                .input {
                    height: 12rem;
                    width: 100%;
                    resize: none;
                    font-size: 1rem;
                    padding: 1rem;
                    border-radius: 0.25rem;
                    transition: all 0.1s linear;
                    background-color: transparent;
                    border: none;
                    font-family: 'lmst';
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
                padding: 3rem 1rem;
                padding-top: 1.5rem;
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
                    top: 4.8rem;
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
                                        background-color: $primary-sub;
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
                    font-family: 'gtpy';
                    position: relative;
                    padding: 0.2rem 0.8rem;
                    background: $primary-sub;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: rgb(255, 255, 255);
                    border: 1.5px solid $primary-sub;
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

        .comment__module {

            .sum {
                color: #696969;
            }

            //评论记录
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
                        border: 1px solid $color-3;
                        font-size: 0.7rem;
                        color: $primary-sub;
                        border-radius: 0.2rem;
                        padding: 0.1rem 0.2rem;
                        transition: all 0.3s ease;

                        button {
                            font-family: 'gtpy';
                        }

                        &:hover {
                            cursor: pointer;
                            background-color: $primary-sub;
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



            //没有评论
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
                    background-color: $primary-sub;
                }

                .active-page {
                    background-color: $primary-sub;
                    border: 1px solid $color-3;
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
                    background-color: $primary-sub;
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

    //操作按钮
    .feed {
        width: 100%;
        @include flexCenter(column, center);
        position: relative;
        margin: 2rem 0;

        &::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fad0c4, #a1c4fd);
            animation: rotate 4s linear infinite;
        }

        @keyframes rotate {
            0% {
                filter: hue-rotate(0deg);
            }

            100% {
                filter: hue-rotate(360deg);
            }
        }

        .btn,
        .btn:before {
            transition: all 0.35s;
            transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59);
            font-family: 'gtpy';
        }

        .btn {
            display: inline-block;
            background-color: #fff;
            width: 90px;
            height: 40px;
            line-height: 40px;
            margin: 0 10px;
            text-align: center;
            position: relative;
            overflow: hidden;
            border-radius: 5px;
            box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
            opacity: 0.99;
            @include flexCenter(row, center);

            &::before {
                content: "";
                width: 150%;
                height: 150%;
                position: absolute;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                top: 90%;
                left: -110%;
                background-color: $primary-hover;
                z-index: -1;
            }

            &:hover {
                &::before {
                    top: 0%;
                    left: -12%;
                }
            }

            img {
                height: 1.2rem;
                width: 1.1rem;
            }
        }

        .heart {
            background: url(./img/web_heart_animation.png);
            background-position: 0;
            background-repeat: no-repeat;
            background-size: cover;
            height: 1rem;
            width: 1rem;
            transform: scale(2.5);
            cursor: pointer;
            background-size: 2900%;
            transition: transform 0.3s ease;
        }

        @-webkit-keyframes heartBlast {
            0% {
                background-position: left;
            }

            100% {
                background-position: right;
            }
        }

        @keyframes heartBlast {
            0% {
                background-position: left;
            }

            100% {
                background-position: right;
            }
        }

        .heartAnimation {
            display: inline-block;
            -webkit-animation-name: heartBlast;
            animation-name: heartBlast;
            -webkit-animation-duration: .8s;
            animation-duration: .8s;
            -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
            -webkit-animation-timing-function: steps(28);
            animation-timing-function: steps(28);
            background-position: right;
        }

        .card {
            @include flexCenter(row, center);
            width: 100%;
            height: 60%;
            position: relative;
            background-color: #ecf8ff;
            padding: 2rem 0;
        }

    }

    //评论回复框
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
                    $color: $primary-sub;
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

    //分享卡片
    .share-modal {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        @include flexCenter(row, center);
        z-index: 998;
        cursor: pointer;
        width: 100%;
        height: 100%;


        .modal {
            width: 27vw;
            min-height: 27rem;
            background-color: #f5f4ce;
            padding: 1rem 2rem;
            border-radius: 8px;
            cursor: auto;
            position: relative;
            user-select: none;
            padding-bottom: 0;
            transform: translateY(-10%);

            //标题
            .modal_title {
                font-size: 1.1rem;
                font-weight: 700;
                text-align: center;
                padding-bottom: 1rem;
            }


            .modal__content {
                background-color: #ffffff;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                padding: 1rem;
                border-radius: 8px;
                padding-bottom: 0;

                // 头像
                .modal__avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    background-color: #e84343;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                //分享时间
                .dateTime {
                    font-size: 0.8rem;
                    color: #676767;
                    margin-top: 0.5rem;
                }

                //分享内容
                .shareContent {
                    // padding: 1rem 0;

                    // 内容标题
                    .content_title {
                        font-size: 1.1rem;
                        font-weight: 700;
                        padding: 1rem 0;
                    }

                    // 图片展示
                    .content_img {
                        width: 100%;
                        max-height: 10rem;
                        margin: 0 auto;
                        overflow: hidden;

                        img {
                            width: 100%;
                            object-fit: cover;
                            height: 100%;
                        }
                    }

                    // 作者
                    .content_author {
                        font-size: 0.8rem;
                        color: #676767;
                        padding: 1rem 0;
                        text-align: right;
                    }

                    // 二维码生成区域
                    .content_qrcode {
                        border-top: 1px solid #ccc;
                        @include flexCenter(row, space-between);

                        .text {
                            font-size: 1.2rem;
                            color: #999;
                            padding: 1rem 0;
                            font-weight: 700;
                            text-align: right;
                        }

                        .code {
                            width: 2.5rem;
                            height: 2.5rem;
                            // overflow: hidden;
                            background-color: #999393;

                            img {
                                width: 100%;
                                height: auto;
                            }
                        }
                    }
                }
            }

            //卡片下载按钮
            .download {
                width: 100%;
                padding: 1rem 0;
                @include flexCenter(row, center);
                gap: 1rem;

                span {
                    display: inline-block;
                    background-color: #fa9be7;
                    color: #fff;
                    border-radius: 1rem;
                    font-size: 0.8rem;
                    padding: 0.3rem 0.7rem;

                    &:hover {
                        cursor: pointer;
                    }
                }

                .more {
                    background-color: #4400ff6e;
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