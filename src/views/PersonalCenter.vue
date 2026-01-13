<template>
    <div id="personalCenter">
        <!-- 背景图 -->
        <div class="backPhoto" :style="{ backgroundImage: `url(${backImgUrl})` }"></div>
        <!-- 遮罩 -->
        <div class="mask"></div>
        <!-- 导航 -->
        <Navigation></Navigation>
        <!-- 会员卡片 -->
        <div class="layout">
            <div class="content" :style="{ backgroundColor: containerBgColor }">
                <div class="nav-container">
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
                <div class="personalCard" v-if="userStore.user">
                    <div class="avatar">
                        <img :src="userStore.user.avatarUrl" alt="头像">
                    </div>
                    <div class="levelsbox">
                        <img class="level" :src="utils.getAssetsFile('icon/level/member.svg')" alt="icon">
                        <h2>会员等级：</h2>
                        <img class="level"
                            :src="utils.getAssetsFile('icon/level/lv' + userStore.user.vipLevel + '.svg')" alt="level">
                    </div>
                    <div class="form-wrap">
                        <form>
                            <!-- 批量编辑区域 -->
                            <div v-if="isEditingAll" class="batch-edit-area">
                                <div class="item">
                                    <label>名称：</label>
                                    <input v-model="formData.username" />
                                </div>
                                <div class="item">
                                    <label>邮箱：</label>
                                    <input v-model="formData.email" type="email" />
                                </div>

                                <div class="item">
                                    <label>性别：</label>
                                    <select v-model="formData.sex">
                                        <option value="男" selected>男</option>
                                        <option value="女">女</option>
                                    </select>
                                </div>
                                <div class="item benefits">
                                    <label>简介：</label>
                                    <textarea v-model="formData.introduce" :maxlength="maxlength"
                                        @input="handleInput"></textarea>

                                    <div class="char-counter"
                                        :style="{ color: remainingChars <= 10 ? '#ff0000' : '#666' }">
                                        {{
                                            remainingChars }} / {{ maxlength }}</div>
                                </div>
                            </div>

                            <div v-else>
                                <!-- 默认展示区域 -->
                                <div class="item">
                                    <label for="username">名称：</label>
                                    <span>{{ userStore.user.username }}</span>
                                </div>
                                <div class="item">
                                    <label>邮箱：</label>
                                    <span>{{ userStore.user.email }}</span>
                                </div>
                                <div class="item">
                                    <label>性别：</label>
                                    <div class="boy">
                                        <span class="box"></span>
                                        <span>{{ userStore.user.sex }}</span>
                                    </div>
                                </div>
                                <div class="item">
                                    <label>注册时间：</label>
                                    <span>{{ dayjs(userStore.user.registerTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                                </div>
                                <div class="item">
                                    <label for="introduce">简介：</label>
                                    <p>{{ userStore.user.introduce }}</p>
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
import { message } from 'ant-design-vue';
const userStore = useAuthStore();
const maxlength = ref(110);

message.config({
    duration: 3,
})

// 响应式数据
const containerBgColor = ref('#ffb457')
const activeIndex = ref(0)
const menuRef = ref(null)
const menuBorderRef = ref(null)
const menuItemRefs = ref([]);//所有菜单项
// 菜单配置数据
const bgColorsBody = ["#003366", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"]

const menuItems = ref([
    {
        id: 'svg1',
        color: '#ADD8E6',
        svgPath: '<path d="M3.8,6.6h16.4" /><path d="M20.2,12.1H3.8" /><path d="M3.8,17.5h16.4" />',
        navTitle: '首页',
        backImgUrl: 'src/assets/img/public/public-1.png'
    },
    {
        id: 'svg2',
        color: '#f54888',
        svgPath: '<path d="M6.7,4.8h10.7c0.3,0,0.6,0.2,0.7,0.5l2.8,7.3c0,0.1,0,0.2,0,0.3v5.6c0,0.4-0.4,0.8-0.8,0.8H3.8C3.4,19.3,3,19,3,18.5v-5.6c0-0.1,0-0.2,0.1-0.3L6,5.3C6.1,5,6.4,4.8,6.7,4.8z" /><path d="M3.4,12.9H8l1.6,2.8h4.9l1.5-2.8h4.6" />',
        navTitle: '收藏',
        backImgUrl: 'src/assets/img/public/public-2.png'

    },
    {
        id: 'svg3',
        color: '#4343f5',
        svgPath: '<path d="M3.4,11.9l8.8,4.4l8.4-4.4" /><path d="M3.4,16.2l8.8,4.5l8.4-4.5" /><path d="M3.7,7.8l8.6-4.5l8,4.5l-8,4.3L3.7,7.8z" />',
        navTitle: '点赞',
        backImgUrl: 'src/assets/img/public/public-3.png'

    },
    {
        id: 'svg4',
        color: '#e0b115',
        svgPath: '<path d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1C3.9,4.4,4.4,3.9,5.1,3.9z" /><path d="M4.2,9.3h15.6" /><path d="M9.1,9.5v10.3" />',
        navTitle: '会员',
        backImgUrl: 'src/assets/img/public/public-4.png'

    },
    // {
    //     id: 'svg5',
    //     color: '#65ddb7',
    //     svgPath: '<path d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5,1.2-1.2V5.1C3.9,4.4,4.4,3.9,5.1,3.9z" /><path d="M5.5,20l9.9-9.9l4.7,4.7" /><path d="M10.4,8.8c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6C7.3,8,8,7.3,8.9,7.3C9.7,7.3,10.4,8,10.4,8.8z" />'
    // }
])

// 方法
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

    .mask {
        background-color: rgba(50, 50, 50, 0.1);
        z-index: inherit;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }

    .layout {
        width: 100%;
        height: calc(100% - 3rem);
        @include flexCenter(column, center);

        .content {
            box-shadow: $shadow-card;
            backdrop-filter: blur(15px);
            border-radius: 0.2rem;
        }

        // 导航
        .nav-container {
            box-sizing: border-box;
            --bgColorMenu: #1d1d27;
            --duration: .7s;
            backdrop-filter: blur(15px);
            border-bottom: 1px solid #ffffff;
            border-radius: 0.2rem;

            .menu {
                position: relative;
                @include flexCenter(row, space-between);
                margin: 0;
                width: 50vw;
                min-width: 40rem;
                font-size: 1.5rem;

            }

            .menu__item {
                @include flexCenter(column, center);
                padding: 1rem;
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
                width: 3rem;
                height: 3rem;
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
                width: 1.5rem;
                height: 1.5rem;
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
                height: 2rem;
                position: absolute;
                clip-path: url(#menu);
                will-change: transform;
                // background-color: var(--bgColorMenu);
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

        .personalCard {
            @include flexCenter(column, center);
            width: 50vw;
            min-width: 40rem;
            padding: 1rem;

            .avatar {
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .levelsbox {
                @include flexCenter(row, center);

                h2 {
                    font-size: 1rem;
                    font-weight: 700;
                    font-family: 'lmst';
                    color: #ffa500;
                }

                .level {
                    width: 1.5rem;
                    height: 1.5rem;
                    gap: 0.5rem;


                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }


            .form-wrap {
                padding: 1rem;
                min-width: 80%;
                width: 80%;

                font-family: 'gtpy';

                .item {
                    @include flexCenter(row, flex-start);
                    gap: 1rem;
                    margin: 1rem 0;
                    position: relative;

                    span,
                    p,
                    input,
                    select {
                        font-size: 1rem;
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

                    }

                    input,
                    textarea,
                    select {
                        font-family: inherit;
                        color: #4e8faf;
                        background: white;
                        font-size: 0.9rem;
                        padding: 0.25rem 0.5rem;
                        width: 100%;
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

                    &::after {
                        content: '';
                        background-color: #d5cdcd;
                        position: absolute;
                        bottom: -5px;
                        height: 1px;
                        width: 100%;
                        pointer-events: none;

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
                        background-color: #ffa500; // 修改按钮
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>