<template>
    <div id="personalCenter">
        <!-- 背景图 -->
        <div class="backPhoto" :style="{ backgroundImage: `url(${backImgUrl})` }"></div>
        <!-- 导航 -->
        <Navigation></Navigation>

        <div class="layout">
            <div class="content">
                <div class="nav-container" :style="{ backgroundColor: containerBgColor }">
                    <menu class="menu" ref="menuRef">
                        <button v-for="(item, index) in menuItems" :key="item.id" class="menu__item"
                            :class="{ active: activeIndex === index }" :style="`--bgColorItem: ${item.color}`"
                            @click="clickItem(index)" :ref="el => { if (el) menuItemRefs[index] = el }">
                            <svg class="icon" viewBox="0 0 24 24" v-html="item.svgPath"></svg>
                            <span>{{ item.navTitle }}</span>
                        </button>
                        <div class="menu__border" ref="menuBorderRef" :style="{ backgroundColor: containerBgColor }">
                        </div>
                    </menu>

                    <div class="svg-container">
                        <svg viewBox="0 0 202.9 45.5">
                            <clipPath id="menu" clipPathUnits="objectBoundingBox"
                                transform="scale(0.0049285362247413 0.021978021978022)">
                                <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
            c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
            c9.2,3.6,17.6,4.2,23.3,4H6.7z" />
                            </clipPath>
                        </svg>
                    </div>
                </div>
                <!-- 基础信息卡片 -->
                <div class="personalCard card-all" v-if="userStore.user && menuItems[activeIndex]?.id === 'info'">
                    <div class="avatar-left">
                        <div class="levelsbox">
                            <h2>会员等级：</h2>
                            <img class="level"
                                :src="utils.getAssetsFile('icon/level/lv' + userStore.user.vipLevel + '.svg')"
                                alt="level">
                        </div>
                        <div class="avatar">
                            <img :src="userStore.user.avatarUrl" alt="头像">
                        </div>
                        <div class="personal-introduce">
                            文章发布数或者其它数据
                        </div>
                    </div>

                    <!-- detailInfo-right -->
                    <div class="detailInfo-right">
                        <form>
                            <!-- 批量编辑区域 -->
                            <div v-if="isEditingAll" class="batch-edit-area">
                                <div class="item">
                                    <label>U-name：</label>
                                    <input v-model="formData.username" />
                                </div>
                                <div class="item">
                                    <label>E-mail：</label>
                                    <input v-model="formData.email" type="email" />
                                </div>

                                <div class="item">
                                    <label>Gender：</label>
                                    <select v-model="formData.sex">
                                        <option value="男" selected>男</option>
                                        <option value="女">女</option>
                                    </select>
                                </div>
                                <div class="item benefits">
                                    <label>Introduction：</label>
                                    <textarea v-model="formData.introduce" :maxlength="maxlength"
                                        @input="handleInput"></textarea>

                                    <div class="char-counter"
                                        :style="{ color: remainingChars <= 10 ? '#ff0000' : '#666' }">
                                        {{
                                            remainingChars }} / {{ maxlength }}</div>
                                </div>
                            </div>

                            <div v-else class="batch-noedit-area">
                                <!-- 默认展示区域 -->
                                <div class="item username">
                                    <!-- <label for="username">名称：</label> -->
                                    <span>{{ userStore.user.username }}</span>
                                </div>
                                <div class="item">
                                    <label>E-mail：</label>
                                    <span>{{ userStore.user.email }}</span>
                                </div>
                                <div class="item">
                                    <label>Gender：</label>
                                    <div class="boy">
                                        <span class="box"></span>
                                        <span>{{ userStore.user.sex }}</span>
                                    </div>
                                </div>
                                <div class="item">
                                    <label>Registration date：</label>
                                    <span>{{ dayjs(userStore.user.registerTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                                </div>
                                <div class="item">
                                    <label for="introduce">Introduction：</label>
                                    <p v-if="userStore.user.introduce">{{ userStore.user.introduce }}</p>
                                    <p v-else>暂无</p>
                                </div>
                            </div>
                        </form>
                        <!-- 全局编辑控制 -->
                        <div class="submit-item">
                            <button v-if="isEditingAll" class="submitBtn" @click="handleUpdate">提交</button>
                            <button @click="toggleGlobalEdit">
                                {{ isEditingAll ? '取消编辑' : '修改' }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 订阅卡片 -->
                <div class="subscribeCard card-all" v-if="menuItems[activeIndex]?.id === 'subscribe'">
                    <div class="subscribe-content">
                        <div class="subscribe-item">
                            <div class="text-box">
                                <h2 class="title">山景</h2>
                                <p class="copy">看看这些令人惊叹的山地旅行，正如你所猜想的，它们都有美丽的山景</p>
                                <button class="btn">查看</button>
                            </div>
                        </div>
                        <div class="subscribe-item">
                            <div class="text-box">
                                <h2 class="title">山景</h2>
                                <p class="copy">看看这些令人惊叹的山地旅行，正如你所猜想的，它们都有美丽的山景</p>
                                <button class="btn">查看</button>
                            </div>
                        </div>
                        <div class="subscribe-item">
                            <div class="text-box">
                                <h2 class="title">山景</h2>
                                <p class="copy">看看这些令人惊叹的山地旅行，正如你所猜想的，它们都有美丽的山景</p>
                                <button class="btn">查看</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 点赞卡片 -->
                <div class="likeCard card-all" v-if="menuItems[activeIndex]?.id === 'like'">
                    <div class="like-content">
                        <div class="like-item">

                            <div class="wrapper">
                                <img src="@/assets/img/personCenter/dark_rider-cover.jpg" class="cover-image" />
                            </div>
                            <img src="@/assets/img/personCenter/dark_rider-title.png" class="title" />
                            <img src="@/assets/img/personCenter/dark_rider-character.webp" class="character" />

                        </div>

                        <div class="like-item">
                            <div class="wrapper">
                                <img src="@/assets/img/personCenter/force_mage-cover.jpg" class="cover-image" />
                            </div>
                            <img src="@/assets/img/personCenter/force_mage-title.png" class="title" />
                            <img src="@/assets/img/personCenter/force_mage-character.webp" class="character" />
                        </div>

                    </div>
                </div>

                <!-- 会员卡片 -->
                <div class="memberCard card-all" v-if="menuItems[activeIndex]?.id === 'member'">
                    <div class="member-content">
                        <button><a href="/memberCenter" style="color: black;">查看更多</a></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>.
<script setup>
import utils from '@/utils/getAssetsFile';
import Navigation from '../components/NavigationMenu/index.vue';
import { ref, computed, onMounted, reactive, watchEffect, onUnmounted, nextTick } from 'vue';

import dayjs from 'dayjs';

import { useAuthStore } from "@/store/auth";
const userStore = useAuthStore();

import { message } from 'ant-design-vue';
const maxlength = ref(110);

message.config({
    duration: 3,
})

// 响应式数据
const containerBgColor = ref('#ffa3f4');
const activeIndex = ref(0);
const menuRef = ref(null);
const menuBorderRef = ref(null);
const menuItemRefs = ref([]);//所有菜单项
// 菜单配置数据
const bgColorsBody = ['#ffa3f4', '#05b9e3', '#f47870', '#f69f98']
const menuItems = ref([
    {
        id: 'info',
        color: '#f37ee6',
        svgPath: '<path d="M3.8,6.6h16.4" /><path d="M20.2,12.1H3.8" /><path d="M3.8,17.5h16.4" />',
        navTitle: '信息',
        backImgUrl: 'src/assets/img/personCenter/bg1.jpg'
    },
    {
        id: 'subscribe',
        color: '#54b346',
        svgPath: '<path d="M6.7,4.8h10.7c0.3,0,0.6,0.2,0.7,0.5l2.8,7.3c0,0.1,0,0.2,0,0.3v5.6c0,0.4-0.4,0.8-0.8,0.8H3.8C3.4,19.3,3,19,3,18.5v-5.6c0-0.1,0-0.2,0.1-0.3L6,5.3C6.1,5,6.4,4.8,6.7,4.8z" /><path d="M3.4,12.9H8l1.6,2.8h4.9l1.5-2.8h4.6" />',
        navTitle: '订阅',
        backImgUrl: 'src/assets/img/personCenter/bg2.jpg'
    },
    {
        id: 'like',
        color: '#bb9726',
        svgPath: '<path d="M3.4,11.9l8.8,4.4l8.4-4.4" /><path d="M3.4,16.2l8.8,4.5l8.4-4.5" /><path d="M3.7,7.8l8.6-4.5l8,4.5l-8,4.3L3.7,7.8z" />',
        navTitle: '点赞',
        backImgUrl: 'src/assets/img/personCenter/bg3.jpg'
    },
    {
        id: 'member',
        color: '#f66f3b',
        svgPath: '<path d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1C3.9,4.4,4.4,3.9,5.1,3.9z" /><path d="M4.2,9.3h15.6" /><path d="M9.1,9.5v10.3" />',
        navTitle: '会员',
        backImgUrl: 'src/assets/img/personCenter/bg4.jpg'
    },
    // {
    //     id: 'svg5',
    //     color: '#65ddb7',
    //     svgPath: '<path d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5,1.2-1.2V5.1C3.9,4.4,4.4,3.9,5.1,3.9z" /><path d="M5.5,20l9.9-9.9l4.7,4.7" /><path d="M10.4,8.8c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6C7.3,8,8,7.3,8.9,7.3C9.7,7.3,10.4,8,10.4,8.8z" />'
    // }
])

// 背景图
const backImgUrl = ref(menuItems.value[0].backImgUrl)
const clickItem = async (index) => {

    if (activeIndex.value === index) return

    // 移除动画延时属性
    menuRef.value.style.removeProperty("--timeOut")

    // 更新活动项和背景色
    activeIndex.value = index
    containerBgColor.value = bgColorsBody[index]
    backImgUrl.value = menuItems.value[index].backImgUrl // 切换背景图片
    await nextTick(); //DOM更新和动画过渡是异步的
    // 更新菜单边框位置
    offsetMenuBorder()
}

const offsetMenuBorder = () => {
    if (!menuRef.value || !menuBorderRef.value) return

    const activeElement = menuItemRefs.value[activeIndex.value]
    if (!activeElement) return

    const offsetActiveItem = activeElement.getBoundingClientRect()
    const menuRect = menuRef.value.getBoundingClientRect()
    const left = Math.floor(offsetActiveItem.left - menuRect.left -
        (menuBorderRef.value.offsetWidth - offsetActiveItem.width) / 2) + "px"

    menuBorderRef.value.style.transform = `translate3d(${left}, 0 , 0)`
}

const handleResize = () => {
    offsetMenuBorder()
    menuRef.value.style.setProperty("--timeOut", "none")
}

const resetForm = () => {
    if (userStore.user) {
        formData.username = userStore.user.username || '';
        formData.email = userStore.user.email || '';
        formData.sex = userStore.user.sex || '男';
        formData.introduce = userStore.user.introduce || '';
    }
};

const isEditingAll = ref(false);
const toggleGlobalEdit = () => {
    if (isEditingAll.value) {
        resetForm();
    }
    isEditingAll.value = !isEditingAll.value;
    handleInput();
};

// 表单数据（使用响应式代理）
const formData = reactive({
    username: '',
    email: '',
    sex: '',
    introduce: ''

})
// 初始化表单数据
watchEffect(() => {
    if (userStore.user) {
        formData.username = userStore.user.username || '';
        formData.email = userStore.user.email || '';
        formData.sex = userStore.user.sex || '男';
        formData.introduce = userStore.user.introduce || '';
    }
})
// 剩余字数计算
const remainingChars = computed(() => {
    return maxlength.value - (formData.introduce?.length || 0);
});

// 字符截取处理
const handleInput = () => {
    if (formData.introduce && formData.introduce.length > maxlength.value) {
        formData.introduce = formData.introduce.slice(0, maxlength.value);
    }
};
//更新数据
const isSubmitting = ref(false);
const handleUpdate = async () => {
    //避免重复提交
    if (isSubmitting.value) return;
    try {
        isSubmitting.value = true;
        const updateData = {
            username: formData.username,
            email: formData.email,
            sex: formData.sex,
            introduce: formData.introduce,
        }
        await userStore.updateUserProfile(updateData);
        message.success('更新成功');
        isEditingAll.value = false;
    } catch (error) {
        message.error(`更新失败：${error.message}`);
    } finally {
        isSubmitting.value = false;
    }
};
// 生命周期
onMounted(() => {
    backImgUrl.value = menuItems.value[0].backImgUrl // 设置初始背景
    offsetMenuBorder()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

</script>
<style scoped lang="scss">
#personalCenter {
    width: 100vw;
    height: 100vh;

    .backPhoto {
        width: 100%;
        height: 100%;
        background-size: cover;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        color: rgba(255, 140, 0, .5);
    }


    .layout {
        width: 100%;
        height: calc(100% - 6rem);
        @include flexCenter(column, center);

        .content {
            box-shadow: $shadow-card;
            backdrop-filter: blur(10px);
            background-color: rgb(255, 255, 255, .7);
        }

        // 导航
        .nav-container {
            box-sizing: border-box;
            --bgColorMenu: #1d1d27;
            --duration: .7s;
            backdrop-filter: blur(15px);
            border-bottom: 1px solid #f37ee6;

            .menu {
                position: relative;
                @include flexCenter(row, space-between);
                margin: 0;
                width: 50vw;
                min-width: 30rem;
                font-size: 1.5rem;
            }

            .menu__item {
                @include flexCenter(column, center);
                padding: 0.2rem;
                flex-grow: 1;
                z-index: 100;
                cursor: pointer;
                position: relative;
                will-change: transform;
                transition: transform var(--timeOut, var(--duration));

                span {
                    width: fit-content;
                    font-family: 'gtpy';
                    font-size: 14px;
                    color: #ffffff;
                    display: inline-block;
                }
            }

            .menu__item::before {
                display: block;
                content: "";
                z-index: -1;
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                position: absolute;
                transform: scale(0);
                transition: background-color var(--duration), transform var(--duration);
            }

            .menu__item.active {
                transform: translate3d(0, -.8rem, 0);
            }

            .menu__item.active::before {
                transform: scale(1);
                background-color: var(--bgColorItem);
            }

            .icon {
                width: 1.2rem;
                height: 1.2rem;
                stroke: white;
                fill: transparent;
                stroke-width: 1pt;
                stroke-miterlimit: 10;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-dasharray: 400;
            }

            .menu__item.active .icon {
                animation: strok 1.5s reverse;
            }

            @keyframes strok {
                100% {
                    stroke-dashoffset: 400;
                }
            }

            .menu__border {
                left: 0;
                bottom: 99%;
                width: 9.9rem;
                height: 1.5rem;
                position: absolute;
                clip-path: url(#menu);
                will-change: transform;
                transition: transform var(--timeOut, var(--duration));
            }

            .svg-container {
                width: 0;
                height: 0;
            }

            @media screen and (max-width: 50em) {
                .menu {
                    font-size: .8em;
                }
            }
        }

        // 所有卡片公共样式 
        .card-all {
            @include flexCenter(row, space-around);
            height: 45vh;
            min-height: 18rem;
            font-family: 'gtpy';
            overflow-y: scroll
        }

        //会员卡片
        .personalCard {
            .avatar-left {
                @include flexCenter(column, space-around);
                height: 100%;
                padding: 1rem 2rem;
                font-size: 0.8rem;
                background-color: rgb(255, 163, 244, .7);

                .levelsbox {
                    @include flexCenter(row, center);

                    .level {
                        width: 1.2rem;
                        height: 1.2rem;
                        gap: 0.5rem;


                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }

                .avatar {
                    width: 4rem;
                    height: 4rem;
                    border-radius: 0.5rem;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                .personal-introduce {
                    flex-wrap: wrap;
                }
            }

            .detailInfo-right {
                height: 100%;
                flex: 1;
                @include flexCenter(column, space-around);

                // 每行
                .item {
                    @include flexCenter(row, flex-start);
                    gap: 1rem;
                    padding: 0.8rem;
                    position: relative;

                    span,
                    p,
                    input,
                    select {
                        font-size: 0.9rem;
                        color: #7c7873;
                        font-family: inherit;
                        text-shadow: 0px 1px 0px #4e8faf;
                    }

                    p {
                        font-size: 0.9rem;
                        line-height: 1.2;
                    }

                    label {
                        font-size: 0.9rem;
                        color: #191918;
                        font-weight: 700;
                        text-shadow: 0px 1px 0px #4e8faf;
                        display: block;
                        text-wrap: nowrap;
                        width: 8rem;
                        text-align: center;
                    }

                    input,
                    textarea,
                    select {
                        font-family: inherit;
                        color: #4e8faf;
                        background: white;
                        font-size: 0.9rem;
                        padding: 0.25rem 0.5rem;
                        border: none;
                        border-radius: 0.25rem;
                        box-shadow: inset 0px 0px 1px #b3a895;

                        &:focus {
                            border: none;
                        }
                    }

                    select {
                        width: 20%;
                        text-align: center;

                        option {
                            text-align: center;
                            border-radius: inherit;
                        }
                    }

                    textarea {
                        height: 6rem;
                        min-height: 6rem;
                    }
                }


                // 可编辑状态
                .batch-edit-area {
                    .item {
                        padding: 0.5rem 0;
                    }
                }

                // 不可编辑状态
                .batch-noedit-area {

                    // 用户名
                    .username {

                        span {
                            width: 100%;
                            text-align: center;
                            font-size: 1.5rem;
                            color: $general-black;
                        }
                    }
                }

                .benefits {
                    position: relative;

                    .char-counter {
                        position: absolute;
                        bottom: 0;
                        right: -3.5rem;
                        font-size: 14px;
                        text-align: right;
                        transition: color 0.3s;
                    }
                }

                // 提交按钮
                .submit-item {
                    @include flexCenter(row, space-around);
                    gap: 1rem;
                    font-size: 0.8rem;

                    button {
                        display: inline-block;
                        font-family: inherit;
                        background-color: #837bc7;
                        color: #fff;
                        padding: 0.25rem 0.8rem;
                        border-radius: 0.25rem;
                        border: none;
                    }

                    // 修改按钮
                    .submitBtn {
                        text-align: center;
                        color: #fff;
                        font-size: 0.8rem;
                        border-radius: 0.25rem;
                        background-color: #7296de; // 修改按钮
                        cursor: pointer;
                    }
                }
            }
        }

        .subscribeCard,
        .likeCard {

            .subscribe-content,
            .like-content {
                display: grid;
                grid-template-columns: repeat(3, auto);
                gap: 1rem;
                padding: 1rem;

                .subscribe-item,
                .like-item {
                    border: 25px solid #ff7a7a;
                    border-image: url('@/assets/img/personCenter/fIgVPKVXE.png') 120 fill;
                    max-width: 224px;
                    height: 300px;
                    padding: 0.4rem;
                    border-radius: 0.2rem;
                }
            }
        }

        // 订阅卡片
        .subscribeCard {
            .subscribe-content {

                --d: 700ms;
                --e: cubic-bezier(0.19, 1, 0.22, 1);
                font-family: 'gtpy';

                .subscribe-item {
                    position: relative;
                    display: flex;
                    align-items: flex-end;
                    overflow: hidden;
                    text-align: center;
                    color: whitesmoke;

                    &:nth-child(1)::before {
                        background-image: url("@/assets/img/personCenter/subscribe1.jpg");
                    }

                    &:nth-child(2)::before {
                        background-image: url("@/assets/img/personCenter/subscribe2.jpg");
                    }

                    &:nth-child(3)::before {
                        background-image: url("@/assets/img/personCenter/subscribe3.jpg");
                    }
                }

                .subscribe-item:before {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 110%;
                    top: 0;
                    left: 0;
                    z-index: -1;
                    background-size: cover;
                    background-position: 0 0;
                    transition: transform calc(var(--d) * 1.5) var(--e);
                    pointer-events: none;


                }

                // 文字背景遮罩
                .subscribe-item:after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 2px;
                    left: 0;
                    width: 100%;
                    height: 200%;
                    pointer-events: none;
                    background-image: linear-gradient(to bottom,
                            rgba(0, 0, 0, 0) 0%,
                            rgba(0, 0, 0, 0.009) 11.7%,
                            rgba(0, 0, 0, 0.034) 22.1%,
                            rgba(0, 0, 0, 0.072) 31.2%,
                            rgba(0, 0, 0, 0.123) 39.4%,
                            rgba(0, 0, 0, 0.182) 46.6%,
                            rgba(0, 0, 0, 0.249) 53.1%,
                            rgba(0, 0, 0, 0.32) 58.9%,
                            rgba(0, 0, 0, 0.394) 64.3%,
                            rgba(0, 0, 0, 0.468) 69.3%,
                            rgba(0, 0, 0, 0.54) 74.1%,
                            rgba(0, 0, 0, 0.607) 78.8%,
                            rgba(0, 0, 0, 0.668) 83.6%,
                            rgba(0, 0, 0, 0.721) 88.7%,
                            rgba(0, 0, 0, 0.762) 94.1%,
                            rgba(0, 0, 0, 0.79) 100%);
                    transform: translateY(-50%);
                    transition: transform calc(var(--d) * 2) var(--e);
                }

                .text-box {
                    position: relative;
                    @include flexCenter(column, center);
                    width: 100%;
                    padding: 0.5rem;
                    transition: transform var(--d) var(--e);
                    z-index: 1;
                    font-size: 1rem;
                    background-color: transparent;
                }

                .text-box>*+* {
                    margin-top: 1rem;
                }

                .title {
                    font-size: 0.9rem;
                    font-weight: bold;
                }

                // 文字内容
                .copy {
                    font-size: 0.8rem;
                    font-style: italic;
                    line-height: 1.1;
                }

                .btn {
                    cursor: pointer;
                    margin-top: 1.5rem;
                    padding: 0.4rem 1.5rem;
                    font-size: 0.5rem;
                    font-weight: bold;
                    letter-spacing: 0.025rem;
                    text-transform: uppercase;
                    color: white;
                    background-color: $primary-sub;
                    border: none;
                    font-family: inherit;
                }

                // .btn:hover {
                //     background-color: #0d0d0d;
                // }

                // .btn:focus {
                //     outline: 1px dashed yellow;
                //     outline-offset: 3px;
                // }

                @media (hover: hover) and (min-width: 600px) {
                    .subscribe-item:after {
                        transform: translateY(0);
                    }

                    .text-box {
                        transform: translateY(calc(100% - 4.5rem));
                    }

                    .text-box>*:not(.title) {
                        opacity: 0;
                        transform: translateY(1rem);
                        transition:
                            transform var(--d) var(--e),
                            opacity var(--d) var(--e);
                    }

                    .subscribe-item:hover,
                    .subscribe-item:focus-within {
                        align-items: center;
                    }

                    .subscribe-item:hover:before,
                    .subscribe-item:focus-within:before {
                        transform: translateY(-4%);
                    }

                    .subscribe-item:hover:after,
                    .subscribe-item:focus-within:after {
                        transform: translateY(-50%);
                    }

                    .subscribe-item:hover .text-box,
                    .subscribe-item:focus-within .text-box {
                        transform: translateY(0);
                    }

                    .subscribe-item:hover .text-box>*:not(.title),
                    .subscribe-item:focus-within .text-box>*:not(.title) {
                        opacity: 1;
                        transform: translateY(0);
                        transition-delay: calc(var(--d) / 8);
                    }

                    .subscribe-item:focus-within:before,
                    .subscribe-item:focus-within:after,
                    .subscribe-item:focus-within .text-box,
                    .subscribe-item:focus-within .text-box>*:not(.title) {
                        transition-duration: 0s;
                    }

                }
            }
        }

        // 点赞卡片
        .likeCard {
            .like-content {

                // 单个卡片
                .like-item {
                    position: relative;
                    display: flex;
                    align-items: flex-end;
                    perspective: 2500px; //景深
                    border-image: url('@/assets/img/personCenter/fIgWEE8vv.png') 50 fill !important;
                    background-color: #14232b;


                    &:hover {
                        .wrapper {
                            transform: perspective(900px) translateY(-5%) rotateX(20deg) translateZ(0);
                            box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
                            -webkit-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
                            -moz-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);

                            &::before,
                            &::after {
                                opacity: 1;
                            }

                            &::after {
                                height: 120px;
                            }
                        }

                        .title {
                            transform: translate3d(0%, -50px, 100px);
                        }

                        .character {
                            opacity: 1;
                            transform: translate3d(0%, -25%, 100px);
                        }
                    }
                }

                //图片容器
                .wrapper {
                    transition: all 0.5s;
                    position: absolute;
                    width: calc(100% - 0.8rem);
                    /* 减去左右padding */
                    height: calc(100% - 0.8rem);
                    /* 减去上下padding */
                    top: 0.4rem;
                    left: 0.4rem;
                    z-index: -1;

                    //图片
                    .cover-image {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    &::before,
                    &::after {
                        content: "";
                        opacity: 0;
                        width: 100%;
                        height: 80px;
                        transition: all 0.5s;
                        position: absolute;
                        left: 0;
                    }

                    &::before {
                        top: 0;
                        height: 100%;
                        background-image: linear-gradient(to top,
                                transparent 46%,
                                rgba(12, 13, 19, 0.5) 68%,
                                rgba(12, 13, 19) 97%);
                    }

                    &::after {
                        bottom: 0;
                        opacity: 1;
                        background-image: linear-gradient(to bottom,
                                transparent 46%,
                                rgba(12, 13, 19, 0.5) 68%,
                                rgba(12, 13, 19) 97%);
                    }
                }

                .title {
                    width: 100%;
                    transition: transform 0.5s;
                }

                .character {
                    width: 100%;
                    opacity: 0;
                    transition: all 0.5s;
                    position: absolute;
                    z-index: -1;
                }
            }
        }

    }
}
</style>