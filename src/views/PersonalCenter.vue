<template>
    <div id="personalCenter">
        <!-- 背景图 -->
        <div class="backPhoto"></div>
        <!-- 遮罩 -->
        <div class="mask"></div>

        <!-- 导航 -->
        <Navigation></Navigation>
        <!-- 会员卡片 -->
        <div class="personalCard" v-if="userInfo">

            <div class="avatar">
                <img :src="userInfo.data.avatarUrl" alt="头像">
            </div>
            <div class="levelsbox">
                <img class="level" :src="utils.getAssetsFile('icon/level/member.svg')" alt="icon">
                <h2>会员等级：</h2>
                <img class="level" :src="utils.getAssetsFile('icon/level/lv5.svg')" alt="level">
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

                            <div class="char-counter" :style="{ color: remainingChars <= 10 ? '#ff0000' : '#666' }">{{
                                remainingChars }} / {{ maxlength }}</div>
                        </div>
                    </div>

                    <div v-else>
                        <!-- 默认展示区域 -->
                        <div class="item">
                            <label for="username">名称：</label>
                            <span>{{ userInfo.data.username }}</span>
                        </div>
                        <div class="item">
                            <label>邮箱：</label>
                            <span>{{ userInfo.data.email }}</span>
                        </div>
                        <div class="item">
                            <label>性别：</label>
                            <div class="boy">
                                <span class="box"></span>
                                <span>男</span>
                            </div>
                        </div>
                        <div class="item">
                            <label>注册时间：</label>
                            <span>{{ userInfo.data.createTime }}</span>
                        </div>
                        <div class="item">
                            <label for="introduce">简介：</label>
                            <p>{{ userInfo.data.introduce }}</p>
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
</template>.
<script setup>
import utils from '@/utils/getAssetsFile';
import Navigation from '../components/NavigationMenu/index.vue';
import { ref, computed, onMounted, reactive, watchEffect } from 'vue';
const maxlength = ref(110);
import { useUserStore } from '@/store/userInfo';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const token = localStorage.getItem('token');
const isEditingAll = ref(false);
const toggleGlobalEdit = () => {
    isEditingAll.value = !isEditingAll.value;
    console.log(isEditingAll.value);
    handleInput();
};

// 表单数据（使用响应式代理）
const formData = reactive({

})
const originalData = ref({});
// 初始化表单数据
watchEffect(() => {
    if (userInfo.value && !isEditingAll.value) {
        // 深拷贝并保持响应式
        Object.assign(formData, JSON.parse(JSON.stringify(userInfo.value.data)))
        originalData.value = { ...formData }
    }
})
//剩余字数计算
const remainingChars = computed(() => {
    return maxlength.value - formData.introduce.length;

});
//截取处理 
const handleInput = () => {
    if (formData.introduce.length > maxlength.value) {
        formData.introduce = formData.introduce.slice(0, maxlength.value);
    }
};
//更新数据
const handleUpdate = async () => {

    try {
        // 校验数据
        const errors = userStore.validateUpdateInfo(formData);
        if (Object.keys(errors).length > 0) {
            console.error('校验失败:', errors);
            return;
        }
        // 发送更新请求
        await userStore.updateUserProfile(formData);
        // 刷新数据
        await userStore.fetchUserInfo();

        // 切换到默认展示区域
        isEditingAll.value = false;
    } catch (error) {
        console.error('更新失败:', error);
    }
}

onMounted(() => { });
</script>
<style scoped lang="scss">
#personalCenter {
    .backPhoto {
        width: 100vw;
        height: 100vh;
        background-size: cover;
        background-position: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        background-image: url('@/assets/img/personCenter/personCenterBg.jpeg');
    }

    .mask {
        background-color: rgba(50, 50, 50, 0.2);
        z-index: inherit;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }

    .personalCard {
        background-color: rgb(255, 255, 255, .7);
        margin: 5vw auto;
        @include flexCenter(column, center);
        width: 35vw;
        min-width: 25rem;
        border-radius: 0.5rem;
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
                    right: -2.5rem;
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
</style>