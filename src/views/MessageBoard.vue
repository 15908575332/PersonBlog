<template>
    <div id="messageBoard">
        <div class="blog-container">
            <!-- 背景图 -->
            <div class="backPhoto" :style=currentPageBackground></div>
            <!-- 内容 -->
            <div class="content-t">
                <!-- 导航 -->
                <div class="nav-wrapper" :class="[isNavHidden ? 'navHiddenOut' : 'navHiddenIn']">
                    <Navigation></Navigation>
                </div>
            </div>
            <vue-danmaku ref="danmaku" class="message-container" v-model:danmus="danmus" :channels="0" useSlot loop
                random-channel="true" is-suspend="true" speeds="100" debounce="800">
                <template v-slot:dm="{ index, danmu }">
                    <div class="message-img">
                        <img :src="danmu.avatar_url" alt="">
                    </div>
                    <span :style="{ color: danmu.color }">{{ danmu.name }}：{{ danmu.text }}</span>
                </template>
            </vue-danmaku>
            <form class="message-input" @submit.prevent="insertMessage">
                <input type="text" maxlength="40" placeholder="说点什么吧~" v-model="inputValue">
                <button class="send-btn" type="button" @click="insertMessage">发送</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Navigation from "@/components/common/NavigationMenu.vue";
import vueDanmaku from 'vue3-danmaku';
import utils from '@/utils/getAssetsFile';
import axios from 'axios';
const danmaku = ref();
const randomIndex = ref();
const inputValue = ref();
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();

const currentPageBackground = computed(() => {
    return {
        backgroundImage: `url('${backImgaes.value[randomIndex.value]}')`
    }
});
function getRandomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 60%, 55%)`;
}

const danmus = ref([])
const backImgaes = ref([
    utils.getAssetsFile('img/homePage/back1.webp'),
    utils.getAssetsFile('img/homePage/back2.webp'),
    utils.getAssetsFile('img/homePage/back3.webp'),
    utils.getAssetsFile('img/homePage/back4.webp'),
    utils.getAssetsFile('img/homePage/back5.webp'),
]);
if (backImgaes.value.length > 0) {
    randomIndex.value = Math.floor(Math.random() * backImgaes.value.length); //背景图索引值
};

// 在Vue组件中调用
const fetchMessages = async () => {
    try {
        const response = await axios.get('http://localhost:3000/getMessageList');
        danmus.value = response.data.data.map(item => ({
            ...item,
            avatar_url: item.avatar_url,
            name: item.username,
            text: item.content,
            color: getRandomColor() // 前端生成随机颜色
        }));
    } catch (error) {
        console.error('获取留言失败', error);
        message.error('留言加载失败');
    }
}
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
            fetchMessages();
        }
    } catch (error) {
        console.log(error.response.data.message);
    }
}
import { message } from 'ant-design-vue';
onMounted(() => {
    // 顶部全局提示
    message.config({
        duration: 2,
        maxCount: 2,
    });
    fetchMessages();
})
onUnmounted(() => {

})
</script>

<style lang="scss" scoped>
#messageBoard {
    width: 100vw;
    height: 100vh;
    font-family: var(--app-font-family);
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

        &::after {
            content: "";
            @include mask-overlay(rgba(50, 50, 50, 0.2), 100%, absolute, inherit);
            pointer-events: none;
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
            font-family: var(--app-font-family);
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
                font-size: 0.9rem;
                min-height: 36px;
                min-width: 300px;
                background: none;
                border: 1px solid white;
                color: white;
                font-family: inherit;

                &::placeholder {
                    color: #ffffff;
                    font-size: 0.9rem;
                }
            }

            .send-btn {
                border-radius: 50px;
                padding: 0 15px;
                font-size: 0.9rem;
                min-height: 36px;
                background: none;
                border: 1px solid white;
                color: white;
                font-family: inherit;
            }
        }
    }
}
</style>