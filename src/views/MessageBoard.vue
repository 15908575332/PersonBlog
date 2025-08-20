<template>
    <div id="messageBoard">
        <div class="blog-container">
            <!-- 背景图 -->
            <div class="backPhoto" :style=videoSrc></div>
            <!-- 遮罩 -->
            <div class="mask"></div>
            <!-- 内容 -->
            <div class="content-t">
                <div class="navidation">
                    <!-- 导航 -->
                    <Navigation></Navigation>
                </div>
            </div>
            <vue-danmaku ref="danmaku" class="message-container" v-model:danmus="danmus" :channels="0" useSlot loop
                random-channel="true" is-suspend="true" speeds="100" debounce="800">
                <template v-slot:dm="{ index, danmu }">
                    <div class="message-img">
                        <img :src="danmu.avatar" alt="">
                    </div>
                    <span :style="{ color: danmu.color }">{{ danmu.name }}：{{ danmu.text }}</span>
                </template>
            </vue-danmaku>
            <form class="message-input" @submit.prevent="insertMessage">
                <input type="text" maxlength="40" placeholder="说点什么吧~" v-model="inputValue">
                <button type="button" @click="insertMessage">发送</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onUpdated, onUnmounted } from 'vue';
import Navigation from '../components/NavigationMenu/index.vue';
import vueDanmaku from 'vue3-danmaku';
import utils from '@/utils/getAssetsFile';
import axios from 'axios';
const danmaku = ref();
const randomIndex = ref();
const inputValue = ref();
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();

const videoSrc = computed(() => {
    return {
        backgroundImage: `url('${videoUrls.value[randomIndex.value]}')`
    }
});
function getRandomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 80%, 55%)`;
}

const danmus = ref([
    { avatar: utils.getAssetsFile('img/profile_picture/10001.png'), name: 'sara', text: '设置一串很长的文字测试留言功能是否正常', color: getRandomColor() },
    { avatar: utils.getAssetsFile('img/profile_picture/10002.png'), name: 'auther', text: '这里是留言', color: getRandomColor() },
    { avatar: utils.getAssetsFile('img/profile_picture/10006.png'), name: 'ff', text: '北风卷地白草折，胡天八月即飞雪。', color: getRandomColor() },
    { avatar: utils.getAssetsFile('img/profile_picture/10053.png'), name: 'homePage', text: '山回路转不见君，雪上空留马行处。', color: getRandomColor() },
    { avatar: utils.getAssetsFile('img/profile_picture/10054.png'), name: 'back1', text: '轮台东门送君去，去时雪满天山路。', color: getRandomColor() },
    { avatar: utils.getAssetsFile('img/profile_picture/10055.png'), name: 'webp', text: '纷纷暮雪下辕门，风掣红旗冻不翻。', color: getRandomColor() },
    { avatar: utils.getAssetsFile('img/profile_picture/10056.png'), name: 'Jqavk', text: '中军置酒饮归客，胡琴琵琶与羌笛。', color: getRandomColor() },
    { avatar: utils.getAssetsFile('img/profile_picture/10057.png'), name: 'utils', text: '瀚海阑干百丈冰，愁云惨淡万里凝。', color: getRandomColor() },
    { avatar: utils.getAssetsFile('img/profile_picture/10058.png'), name: 'getAssetsFile', text: '将军角弓不得控，都护铁衣冷难着。', color: getRandomColor() },
    { avatar: utils.getAssetsFile('img/profile_picture/10059.png'), name: 'randomIndex', text: '散入珠帘湿罗幕，狐裘不暖锦衾薄。', color: getRandomColor() },
    { avatar: utils.getAssetsFile('img/profile_picture/10060.png'), name: '中文名字', text: '忽如一夜春风来，千树万树梨花开。', color: getRandomColor() },
])
const videoUrls = ref([
    utils.getAssetsFile('img/homePage/back1.webp'),
    utils.getAssetsFile('img/homePage/back2.webp'),
    utils.getAssetsFile('img/homePage/back3.webp'),
    utils.getAssetsFile('img/homePage/back4.webp'),
    utils.getAssetsFile('img/homePage/back5.webp'),
]);

// 插入留言
const insertMessage = async () => {
    if (!inputValue.value) {
        message.warn('你还没有填写呢~~');
        return;
    }
    if (inputValue.value.length < 2 || inputValue.value.length > 50) {
        message.warn('留言内容长度(需2-50字符)');
        return;
    }
    try {
        const response = await axios.post('http://localhost:3000/setMessgeContent', {
            userId: authStore.user.id,
            content: inputValue.value
        });
        if (response.status == 201) {
            message.success(response.data.message);
            inputValue.value = '';

        }
    } catch (error) {
        console.log(error.response.data.message);
    }
}
import { message } from 'ant-design-vue';
onMounted(() => {
    if (videoUrls.value.length > 0) {
        randomIndex.value = Math.floor(Math.random() * videoUrls.value.length); //背景图索引值
    };
    // 顶部全局提示
    message.config({
        duration: 2,
        maxCount: 2,
    });


})
onUnmounted(() => {

})
</script>

<style lang="scss" scoped>
#messageBoard {
    width: 100vw;
    height: 100vh;
    font-family: 'lmst';
    font-size: 1.5rem;

    .blog-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .backPhoto {
            width: 100vw;
            height: 100vh;
            background-size: cover;
            background-position: center;
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            animation: fadeIn 1s;
        }

        .mask {
            background-color: rgba(50, 50, 50, 0.3);
            z-index: inherit;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }

        //内容
        .content-t {
            position: absolute;
            left: 0;
            top: 0;
            color: white;
            width: 100%;
        }

        // 留言板
        .message-container {
            position: fixed;
            top: 5rem;
            width: 100%;
            height: 90%;
            will-change: transform;
            transform: translateZ(0);

            .message-img {
                width: 25px;
                height: 25px;
                overflow: hidden;
                background-color: #fff;
                border-radius: 50%;
                display: inline-block;
                margin-right: 10px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        // 输入框
        .message-input {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 380px;
            top: 50%;
            margin-left: auto;
            margin-right: auto;
            @include flexCenter(row, space-between);
            z-index: 2;

            input {
                border-radius: 50px;
                padding: 0 15px;
                font-size: 14px;
                min-height: 36px;
                min-width: 300px;
                background: none;
                border: 1px solid white;
                color: white;

                &::placeholder {
                    color: #ffffff;
                    font-size: 14px;
                }
            }

            button {
                border-radius: 50px;
                padding: 0 15px;
                font-size: 14px;
                min-height: 36px;
                background: none;
                border: 1px solid white;
                color: white;
            }
        }
    }
}
</style>